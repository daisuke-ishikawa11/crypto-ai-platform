import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'
import { z } from 'zod'

const Query = z.object({
  startAt: z.string().optional(), // ISO8601 or millis
  endAt: z.string().optional(),
  bucket: z.enum(['hour', 'day']).default('day'),
  type: z.enum(['category_test_grant', 'lesson_completed_grant']).optional(),
  userId: z.string().optional(),
  maxBuckets: z.coerce.number().int().min(1).max(366).default(31),
})

function toTs(v?: string | null): number | null {
  if (!v) return null
  const n = Number(v); if (!Number.isNaN(n)) return n
  const d = Date.parse(v); return Number.isNaN(d) ? null : d
}

function floorBucket(ts: number, bucket: 'hour' | 'day'): number {
  const d = new Date(ts)
  if (bucket === 'day') {
    d.setUTCHours(0,0,0,0)
  } else {
    d.setUTCMinutes(0,0,0)
  }
  return d.getTime()
}

export async function GET(request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'learning_timeseries', method: 'GET' })
  try {
    // 管理専用: トークン必須
    const authHeader = request.headers.get('x-learning-token')
    const expected = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN
    if (!expected || authHeader !== expected) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_timeseries', reason: 'unauthorized', status: '401' })
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const parsed = Query.safeParse({
      startAt: searchParams.get('startAt') ?? undefined,
      endAt: searchParams.get('endAt') ?? undefined,
      bucket: (searchParams.get('bucket') ?? undefined) as 'hour' | 'day' | undefined,
      type: (searchParams.get('type') ?? undefined) as 'category_test_grant' | 'lesson_completed_grant' | undefined,
      userId: searchParams.get('userId') ?? undefined,
      maxBuckets: searchParams.get('maxBuckets') ?? undefined,
    })
    if (!parsed.success) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_timeseries', reason: 'bad_request', status: '400' })
      return NextResponse.json({ success: false, error: 'Invalid query', issues: parsed.error.issues }, { status: 400 })
    }
    const { bucket, type, userId, maxBuckets } = parsed.data
    const startTs = toTs(parsed.data.startAt)
    const endTs = toTs(parsed.data.endAt)

    const redis = await getRedis()
    if (!redis) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_timeseries', reason: 'redis_unavailable', status: '500' })
      return NextResponse.json({ success: false, error: 'Redis unavailable' }, { status: 500 })
    }

    const key = 'learning:grant:events'
    const total = await redis.llen(key)
    const slice = total === 0 ? [] : await redis.lrange(key, 0, -1)

    const buckets = new Map<number, { events: number; tickets: number }>()
    let minTs = Number.POSITIVE_INFINITY
    let maxTs = 0
    for (const s of slice) {
      try {
        const e = JSON.parse(s) as { at?: number; userId?: string; type?: 'category_test_grant' | 'lesson_completed_grant'; tickets?: number }
        const ts = typeof e.at === 'number' ? e.at : null
        if (ts === null) continue
        if (startTs !== null && ts < startTs) continue
        if (endTs !== null && ts > endTs) continue
        if (userId && e.userId !== userId) continue
        if (type && e.type !== type) continue
        const b = floorBucket(ts, bucket)
        const cur = buckets.get(b) ?? { events: 0, tickets: 0 }
        cur.events += 1
        if (typeof e.tickets === 'number') cur.tickets += e.tickets
        buckets.set(b, cur)
        if (b < minTs) minTs = b
        if (b > maxTs) maxTs = b
      } catch { /* ignore */ }
    }

    // Build series sorted by time, cap to maxBuckets from end
    const keys = Array.from(buckets.keys()).sort((a,b) => a-b)
    const capped = keys.length > maxBuckets ? keys.slice(keys.length - maxBuckets) : keys
    const series = capped.map(t => ({ t, events: buckets.get(t)!.events, tickets: buckets.get(t)!.tickets }))

    if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_timeseries', method: 'GET' })
    return NextResponse.json({ success: true, data: series, meta: { count: series.length, bucket, totalScanned: slice.length } })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_timeseries', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
