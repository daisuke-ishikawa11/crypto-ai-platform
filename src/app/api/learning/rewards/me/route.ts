import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'
import { z } from 'zod'
import { createClient as createServerSupabase } from '@/lib/supabase/server'

const Query = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  type: z.enum(['category_test_grant', 'lesson_completed_grant']).optional(),
})

export async function GET(request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'learning_rewards_me', method: 'GET' })
  try {
    const supabase = await createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.id) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_rewards_me', reason: 'unauthorized', status: '401' })
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const parsed = Query.safeParse({
      limit: searchParams.get('limit') ?? undefined,
      type: searchParams.get('type') ?? undefined,
    })
    if (!parsed.success) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_rewards_me', reason: 'bad_request', status: '400' })
      return NextResponse.json({ success: false, error: 'Invalid query', issues: parsed.error.issues }, { status: 400 })
    }
    const { limit, type } = parsed.data

    const redis = await getRedis()
    if (!redis) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_rewards_me', reason: 'redis_unavailable', status: '500' })
      return NextResponse.json({ success: false, error: 'Redis unavailable' }, { status: 500 })
    }

    const key = 'learning:grant:events'
    const total = await redis.llen(key)
    const chunk = 1000
    const results: Array<Record<string, unknown>> = []
    // 末尾（最新）からチャンクで探索
    for (let start = Math.max(0, total - chunk), end = total - 1; start >= 0 && results.length < limit; start -= chunk, end -= chunk) {
      const slice = await redis.lrange(key, Math.max(0, start), Math.max(0, end))
      for (let i = slice.length - 1; i >= 0 && results.length < limit; i--) {
        const s = slice[i]
        try {
          const e = JSON.parse(s) as { userId?: string; type?: string }
          if (e.userId === user.id && (!type || e.type === type)) {
            results.push(e)
          }
        } catch {}
      }
      if (start === 0) break
    }

    if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_rewards_me', method: 'GET' })
    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_rewards_me', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
