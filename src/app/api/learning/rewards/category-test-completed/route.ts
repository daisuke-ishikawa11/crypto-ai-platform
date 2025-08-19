import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getRedis } from '@/lib/redis/client'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'

// リクエストボディ
const Body = z.object({
  userId: z.string().min(1),
  categoryId: z.string().min(1),
  testId: z.string().optional(),
  score: z.number().int().min(0).max(100).optional(),
  tickets: z.number().int().positive().max(20).optional(),
})

function tKey(userId: string): string { return `risk:tickets:${userId}` }
function markKey(userId: string, categoryId: string): string { return `learning:grant:category:${userId}:${categoryId}` }
function rlKey(userId: string): string { return `learning:grant:category:rate:${userId}` }

export async function POST(request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'learning_category_test_completed', method: 'POST' })
  try {
    // 認証ルート: Supabaseユーザーが存在し、bodyのuserIdと一致する場合はトークン不要

    const json = await request.json()
    const parsed = Body.safeParse(json)
    if (!parsed.success) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_category_test_completed', reason: 'bad_request', status: '400' })
      return NextResponse.json({ success: false, error: 'Invalid body', issues: parsed.error.issues }, { status: 400 })
    }
    const { userId, categoryId, score } = parsed.data
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
        if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_category_test_completed', reason: 'unauthorized', status: '401' })
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }
    }
    const tickets = parsed.data.tickets ?? 3

    const redis = await getRedis()
    if (!redis) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_category_test_completed', reason: 'redis_unavailable', status: '500' })
      return NextResponse.json({ success: false, error: 'Redis unavailable' }, { status: 500 })
    }

    // レート制限（60秒で30回）
    const rc = await redis.incr(rlKey(userId))
    if (rc === 1) await redis.expire(rlKey(userId), 60)
    if (rc > 30) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_category_test_completed', reason: 'rate_limited', status: '429' })
      return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
    }

    // パス基準の評価（環境変数で設定されている場合）
    const defaultPassingRaw = process.env.LEARNING_CATEGORY_PASSING_SCORE
    const defaultPassing = defaultPassingRaw ? Number(defaultPassingRaw) : NaN
    let passing: number | null = Number.isFinite(defaultPassing) ? defaultPassing : null
    const mapRaw = process.env.LEARNING_CATEGORY_PASSING_SCORES
    if (mapRaw) {
      try {
        const m = JSON.parse(mapRaw) as Record<string, number>
        if (typeof m[categoryId] === 'number') passing = m[categoryId]
      } catch {}
    }
    if (typeof passing === 'number') {
      if (typeof score !== 'number') {
        return NextResponse.json({ success: true, passed: false, granted: 0, reason: 'missing_score' }, { status: 200 })
      }
      if (score < passing) {
        if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_category_test_completed', method: 'POST', passed: 'false' })
        return NextResponse.json({ success: true, passed: false, granted: 0, required: passing, score }, { status: 200 })
      }
    }

    // 冪等付与チェック
    const mk = markKey(userId, categoryId)
    const already = await redis.get(mk)
    if (already) {
      if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'learning_category_test_completed', method: 'POST', idempotent: 'true' })
      const bal = Number(await redis.get(tKey(userId))) || 0
      return NextResponse.json({ success: true, granted: 0, balance: bal })
    }

    await redis.set(mk, '1')
    const newBal = await redis.incrby(tKey(userId), tickets)
    // 監査ログ（最新5000件まで保持）
    try {
      const evt = JSON.stringify({
        type: 'category_test_grant',
        userId,
        categoryId,
        testId: parsed.data.testId || null,
        tickets,
        score: typeof score === 'number' ? score : null,
        balance: newBal,
        at: Date.now()
      })
      await redis.rpush('learning:grant:events', evt)
      await redis.ltrim('learning:grant:events', -5000, -1)
    } catch {}
    if (isMetricsEnabled()) {
      incCounter('defi_api_requests_total', { endpoint: 'learning_category_test_completed', method: 'POST', passed: 'true' })
      incCounter('defi_tickets_granted_total', { source: 'category_test' }, tickets)
    }
    return NextResponse.json({ success: true, granted: tickets, balance: newBal })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'learning_category_test_completed', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Internal error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
