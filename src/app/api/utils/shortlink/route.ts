import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { randomBytes } from 'crypto'

function genId(len = 8): string {
  return randomBytes(Math.ceil(len/2)).toString('hex').slice(0, len)
}

export async function POST(request: NextRequest) {
  try {
    const redis = await getRedis()
    if (!redis) return NextResponse.json({ success: false, error: 'Redis not configured' }, { status: 501 })
    const body = await request.json().catch(() => ({} as Record<string, unknown>))
    const url = typeof body.url === 'string' ? body.url : ''
    const ttl = typeof body.ttlSec === 'number' && body.ttlSec > 0 ? Math.min(60 * 60 * 24 * 7, body.ttlSec) : 60 * 60 * 24
    if (!url || !/^https?:\/\//i.test(url)) {
      return NextResponse.json({ success: false, error: 'Invalid url' }, { status: 400 })
    }
    let id = genId(8)
    // Try a few times to avoid collisions
    for (let i = 0; i < 3; i++) {
      const exists = await redis.get(`short:${id}`)
      if (!exists) break
      id = genId(8)
    }
    await redis.set(`short:${id}`, url, 'EX', ttl)
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.VERCEL_URL || ''
    const base = origin ? (origin.startsWith('http') ? origin : `https://${origin}`) : ''
    const short = base ? `${base}/api/utils/shortlink/${id}` : `/api/utils/shortlink/${id}`
    return NextResponse.json({ success: true, id, short, url, ttl })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
