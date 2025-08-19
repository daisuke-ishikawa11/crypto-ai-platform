import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

type FailureReason = 'bad_request' | 'rate_limited' | 'exception' | 'other'
type EventRow = { t?: number; outcome?: string; adj?: number; sev?: 'low'|'medium'|'high'|'critical'; rsn?: FailureReason }

export async function GET(req: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'risk_ai_stats' })
  incCounter('defi_api_requests_total', { endpoint: 'risk_ai_stats', method: 'GET' })
  try {
    // optional: windowSec override (default 24h, max 7d)
    const url = new URL(req.url)
    const winParam = url.searchParams.get('windowSec')
    const windowSec = (() => {
      const v = Number(winParam)
      if (!Number.isFinite(v) || v <= 0) return 24 * 60 * 60
      return Math.min(Math.floor(v), 7 * 24 * 60 * 60)
    })()
    const redis = await getRedis()
    if (!redis) {
      endTimer();
      return NextResponse.json({ success: true, data: { windowSec, total: 0, success: 0, successRate: 0, failures: 0, failureRate: 0, failuresByReason: {}, avgAdjustment: 0, finalSeverity: { low: 0, medium: 0, high: 0, critical: 0 } }, meta: { source: 'redis:disabled' } }, { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' } })
    }
    const rows = await redis.lrange('defi:ai:evaluate:events', -5000, -1)
    const now = Date.now()
    const windowMs = windowSec * 1000
    let total = 0
    let success = 0
    let failures = 0
    let adjSum = 0
    const sev: Record<'low'|'medium'|'high'|'critical', number> = { low: 0, medium: 0, high: 0, critical: 0 }
    const failuresByReason: Partial<Record<FailureReason, number>> = {}
    for (const r of rows) {
      try {
        const e = JSON.parse(r) as EventRow
        if (!e || typeof e.t !== 'number' || now - e.t > windowMs) continue
        total++
        if (e.outcome === 'success') {
          success++
          if (typeof e.adj === 'number') adjSum += e.adj
          if (e.sev && sev[e.sev] !== undefined) sev[e.sev]++
        } else if (e.outcome === 'failure') {
          failures++
          const reason: FailureReason = e.rsn && ['bad_request','rate_limited','exception','other'].includes(e.rsn) ? e.rsn : 'other'
          failuresByReason[reason] = (failuresByReason[reason] || 0) + 1
        }
      } catch {}
    }
    const successRate = total > 0 ? success / total : 0
    const failureRate = total > 0 ? failures / total : 0
    const avgAdjustment = success > 0 ? adjSum / success : 0
    const data = { windowSec: 86400, total, success, successRate, failures, failureRate, failuresByReason, avgAdjustment, finalSeverity: sev }
    endTimer()
    return NextResponse.json({ success: true, data }, { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' } })
  } catch (e) {
    incCounter('defi_api_errors_total', { endpoint: 'risk_ai_stats', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
