import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { z } from 'zod'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'

const Query = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).max(5000).default(0),
  userId: z.string().optional(),
  type: z.enum(['category_test_grant', 'lesson_completed_grant']).optional(),
  format: z.enum(['json','csv']).optional(),
  startAt: z.string().optional(), // ISO8601 or millis
  endAt: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'learning_audit', method: 'GET' })
  try {
    // 管理専用: トークン必須
    const authHeader = request.headers.get('x-learning-token')
    const expected = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN
    if (!expected || authHeader !== expected) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_audit', reason: 'unauthorized', status: '401' })
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const parsed = Query.safeParse({
      limit: searchParams.get('limit') ?? undefined,
      offset: searchParams.get('offset') ?? undefined,
      userId: searchParams.get('userId') ?? undefined,
      type: searchParams.get('type') ?? undefined,
      format: searchParams.get('format') ?? undefined,
      startAt: searchParams.get('startAt') ?? undefined,
      endAt: searchParams.get('endAt') ?? undefined,
    })
    if (!parsed.success) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_audit', reason: 'bad_request', status: '400' })
      return NextResponse.json({ success: false, error: 'Invalid query', issues: parsed.error.issues }, { status: 400 })
    }
    const { limit, offset, userId, type, format, startAt, endAt } = parsed.data
    const startTs = (() => {
      if (!startAt) return null as number | null
      const n = Number(startAt)
      if (!Number.isNaN(n)) return n
      const d = Date.parse(startAt)
      return Number.isNaN(d) ? null : d
    })()
    const endTs = (() => {
      if (!endAt) return null as number | null
      const n = Number(endAt)
      if (!Number.isNaN(n)) return n
      const d = Date.parse(endAt)
      return Number.isNaN(d) ? null : d
    })()

    const redis = await getRedis()
    if (!redis) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_audit', reason: 'redis_unavailable', status: '500' })
      return NextResponse.json({ success: false, error: 'Redis unavailable' }, { status: 500 })
    }

    const key = 'learning:grant:events'
    const total = await redis.llen(key)
    // 末尾が最新（rpush）なので、末尾から読み出し
    const start = Math.max(0, total - offset - limit)
    const end = Math.max(0, total - offset - 1)
    const slice = total === 0 || start > end ? [] : await redis.lrange(key, start, end)
    const events = slice
      .map((s) => {
        try { return JSON.parse(s) as Record<string, unknown> } catch { return null }
      })
      .filter(Boolean) as Array<Record<string, unknown>>
      ;
    const filtered = (events as Array<Record<string, unknown>>)
      .reverse()
      .filter((e) => (userId ? e.userId === userId : true))
      .filter((e) => (type ? e.type === type : true))
      .filter((e) => (startTs !== null ? (typeof e.at === 'number' && e.at >= startTs) : true))
      .filter((e) => (endTs !== null ? (typeof e.at === 'number' && e.at <= endTs) : true))

    if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_audit', method: 'GET' })
    if (format === 'csv') {
      const header = ['at','type','userId','categoryId','lessonId','testId','score','tickets','balance']
      const lines = [header.join(',')]
      for (const e of filtered) {
        const at = typeof e.at === 'number' ? new Date(e.at).toISOString() : ''
        const row = [
          at,
          String(e.type ?? ''),
          String(e.userId ?? ''),
          String(e.categoryId ?? ''),
          String(e.lessonId ?? ''),
          String(e.testId ?? ''),
          typeof e.score === 'number' ? String(e.score) : '',
          typeof e.tickets === 'number' ? String(e.tickets) : '',
          typeof e.balance === 'number' ? String(e.balance) : '',
        ]
        lines.push(row.map(v => v.includes(',') ? JSON.stringify(v) : v).join(','))
      }
      const csv = lines.join('\n') + '\n'
      return new NextResponse(csv, { status: 200, headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="learning_rewards_audit.csv"' } })
    }
    return NextResponse.json({ success: true, data: filtered, meta: { total, returned: filtered.length, limit, offset } })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_audit', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
