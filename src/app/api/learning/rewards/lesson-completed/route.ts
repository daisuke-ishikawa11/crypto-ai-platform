import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getRedis } from '@/lib/redis/client'
import { incCounter, startTimer, isMetricsEnabled } from '@/lib/monitoring/metrics'
import { createClient as createServerSupabase } from '@/lib/supabase/server'

const Body = z.object({
  userId: z.string().min(1),
  lessonId: z.string().min(1),
  tickets: z.number().int().positive().max(10).optional(),
})

function ticketsKey(userId: string): string { return `risk:tickets:${userId}` }
function grantMarkKey(userId: string, lessonId: string): string { return `learning:grant:lesson:${userId}:${lessonId}` }

export async function POST(request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'learning_reward_lesson_completed', method: 'POST' })
  try {
    // 認証ルート: Supabaseユーザーが一致する場合はトークン不要
    const json = await request.json()
    const parsed = Body.safeParse(json)
    if (!parsed.success) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_reward_lesson_completed', reason: 'bad_request', status: '400' })
      return NextResponse.json({ success: false, error: 'Invalid body', issues: parsed.error.issues }, { status: 400 })
    }
    const { userId, lessonId } = parsed.data
    let authorized = false
    try {
      const supabase = await createServerSupabase()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id && user.id === userId) authorized = true
    } catch {}
    if (!authorized) {
      const authHeader = request.headers.get('x-learning-token')
      const expected = process.env.ALERTS_ADMIN_TOKEN || process.env.METRICS_TOKEN
      if (!expected || authHeader !== expected) {
        if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_reward_lesson_completed', reason: 'unauthorized', status: '401' })
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }
    }
    const amount = parsed.data.tickets ?? 1

    const redis = await getRedis()
    if (!redis) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_reward_lesson_completed', reason: 'redis_unavailable', status: '500' })
      return NextResponse.json({ success: false, error: 'Redis unavailable' }, { status: 500 })
    }

    const markKey = grantMarkKey(userId, lessonId)
    const already = await redis.get(markKey)
    if (already) {
      if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_reward_lesson_completed', method: 'POST', idempotent: 'true' })
      return NextResponse.json({ success: true, granted: 0, balance: Number(await redis.get(ticketsKey(userId))) || 0 })
    }

    // set idempotent mark (no TTL by default so再付与なし。将来要件でTTL付与可)
    await redis.set(markKey, '1')

    const newBalance = await redis.incrby(ticketsKey(userId), amount)
    // 監査ログ（最新5000件まで保持）
    try {
      const evt = JSON.stringify({
        type: 'lesson_completed_grant',
        userId,
        lessonId,
        tickets: amount,
        balance: newBalance,
        at: Date.now()
      })
      await redis.rpush('learning:grant:events', evt)
      await redis.ltrim('learning:grant:events', -5000, -1)
    } catch {}
    if (isMetricsEnabled()) {
      incCounter('defi_api_requests_total', { endpoint: 'learning_reward_lesson_completed', method: 'POST', granted: String(amount) })
      incCounter('defi_tickets_granted_total', { source: 'lesson_completed' }, amount)
    }
    return NextResponse.json({ success: true, granted: amount, balance: newBalance })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_reward_lesson_completed', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
