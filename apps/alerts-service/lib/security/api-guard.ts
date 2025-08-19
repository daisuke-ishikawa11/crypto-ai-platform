import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'

type RateKey = string
const windowMs = Number(config.rateLimitWindowMs)
const maxRequests = Number(config.rateLimitMaxRequests)
const buckets: Map<RateKey, { windowStart: number; count: number }> = new Map()

export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return '127.0.0.1'
}

export function rateLimit(req: NextRequest, keySuffix: string): NextResponse | null {
  const ip = getClientIp(req)
  const key = `${ip}:${keySuffix}`
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { windowStart: now, count: 1 })
    return null
  }
  if (bucket.count >= maxRequests) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
  }
  bucket.count += 1
  return null
}

export function requireInternalAuth(req: NextRequest | { headers: Headers }): NextResponse | null {
  const configured = config.internalApiKey
  if (!configured) return null
  const provided = 'headers' in req ? req.headers.get('x-internal-key') : null
  if (provided !== configured) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  return null
}


