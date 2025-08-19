import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'
import { getRedis } from '@/lib/redis/client'

const Body = z.object({ userId: z.string(), op: z.enum(['get','add','consume']), amount: z.number().optional() })

function k(userId: string): string { return `risk:tickets:${userId}` }

export async function POST(request: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'risk_tickets' })
  incCounter('defi_api_requests_total', { endpoint: 'risk_tickets', method: 'POST' })
  try {
    const json = await request.json()
    const parsed = Body.safeParse(json)
    if (!parsed.success) {
      incCounter('defi_api_errors_total', { endpoint: 'risk_tickets', reason: 'bad_request', status: '400' })
      endTimer()
      return NextResponse.json({ success: false, error: 'Invalid body', issues: parsed.error.issues }, { status: 400 })
    }
    const { userId, op, amount } = parsed.data
    const redis = await getRedis()
    if (!redis) {
      incCounter('defi_api_errors_total', { endpoint: 'risk_tickets', reason: 'not_configured' })
      endTimer(); return NextResponse.json({ success: false, error: 'Tickets store not configured' }, { status: 501 })
    }
    // ユーザー単位レート制限: 60秒あたり最大30回
    const rlKey = `risk:tickets:rate:${userId}`
    const cnt = await redis.incr(rlKey)
    if (cnt === 1) { await redis.expire(rlKey, 60) }
    if (cnt > 30) {
      incCounter('defi_api_errors_total', { endpoint: 'risk_tickets', reason: 'rate_limited', status: '429' })
      endTimer(); return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
    }
    if (op === 'get') {
      const v = await redis.get(k(userId))
      const cur = v ? Number(v) : 0
      endTimer(); return NextResponse.json({ success: true, balance: cur })
    }
    if (op === 'add') {
      const add = Math.max(0, Math.floor(amount || 0))
      const n = await redis.incrby(k(userId), add)
      endTimer(); return NextResponse.json({ success: true, balance: n })
    }
    // consume
    const v = await redis.get(k(userId))
    const cur = v ? Number(v) : 0
    if (cur <= 0) {
      endTimer(); return NextResponse.json({ success: false, error: 'Insufficient tickets' }, { status: 402 })
    }
    const n = await redis.incrby(k(userId), -1)
    endTimer(); return NextResponse.json({ success: true, balance: n })
  } catch {
    incCounter('defi_api_errors_total', { endpoint: 'risk_tickets', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
