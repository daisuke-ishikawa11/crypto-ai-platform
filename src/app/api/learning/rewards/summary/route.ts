import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'
import { z } from 'zod'

const Query = z.object({
  startAt: z.string().optional(), // ISO8601 or millis
  endAt: z.string().optional(),
  userId: z.string().optional(),
  type: z.enum(['category_test_grant', 'lesson_completed_grant']).optional(),
})

export async function GET(request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'learning_summary', method: 'GET' })
  try {
    // 管理専用: トークン必須
    const authHeader = request.headers.get('x-learning-token')
    const expected = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN
    if (!expected || authHeader !== expected) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_summary', reason: 'unauthorized', status: '401' })
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const parsed = Query.safeParse({
      startAt: searchParams.get('startAt') ?? undefined,
      endAt: searchParams.get('endAt') ?? undefined,
      userId: searchParams.get('userId') ?? undefined,
      type: searchParams.get('type') ?? undefined,
    })
    if (!parsed.success) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_summary', reason: 'bad_request', status: '400' })
      return NextResponse.json({ success: false, error: 'Invalid query', issues: parsed.error.issues }, { status: 400 })
    }
    const { startAt, endAt, userId, type } = parsed.data
    const toTs = (v?: string | null): number | null => {
      if (!v) return null
      const n = Number(v); if (!Number.isNaN(n)) return n
      const d = Date.parse(v); return Number.isNaN(d) ? null : d
    }
    const startTs = toTs(startAt)
    const endTs = toTs(endAt)

    const redis = await getRedis()
    if (!redis) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_summary', reason: 'redis_unavailable', status: '500' })
      return NextResponse.json({ success: false, error: 'Redis unavailable' }, { status: 500 })
    }

    const key = 'learning:grant:events'
    const total = await redis.llen(key)
    const slice = total === 0 ? [] : await redis.lrange(key, 0, -1)

    let totalEvents = 0
    let totalTickets = 0
    const uniqueUsers = new Set<string>()
    const byType: Record<string, number> = { category_test_grant: 0, lesson_completed_grant: 0 }

    for (const s of slice) {
      try {
        const e = JSON.parse(s) as { userId?: string; type?: string; at?: number; tickets?: number }
        if (userId && e.userId !== userId) continue
        if (type && e.type !== type) continue
        if (startTs !== null && !(typeof e.at === 'number' && e.at >= startTs)) continue
        if (endTs !== null && !(typeof e.at === 'number' && e.at <= endTs)) continue
        totalEvents++
        if (typeof e.tickets === 'number') totalTickets += e.tickets
        if (typeof e.userId === 'string') uniqueUsers.add(e.userId)
        if (typeof e.type === 'string') byType[e.type] = (byType[e.type] ?? 0) + 1
      } catch { /* ignore */ }
    }

    if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_summary', method: 'GET' })
    return NextResponse.json({
      success: true,
      data: {
        totalEvents,
        totalTickets,
        uniqueUsers: uniqueUsers.size,
        byType,
        scanned: slice.length,
      }
    })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_summary', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
