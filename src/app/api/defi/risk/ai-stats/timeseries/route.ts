import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

type FailureReason = 'bad_request' | 'rate_limited' | 'exception' | 'other'
type EventRow = { t?: number; outcome?: 'success'|'failure'; adj?: number; sev?: 'low'|'medium'|'high'|'critical'; rsn?: FailureReason }

function clamp(n: number, min: number, max: number): number { return Math.max(min, Math.min(max, n)) }

export async function GET(request: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'risk_ai_stats_timeseries' })
  incCounter('defi_api_requests_total', { endpoint: 'risk_ai_stats_timeseries', method: 'GET' })
  try {
    const url = new URL(request.url)
    const windowParam = url.searchParams.get('windowSec') || url.searchParams.get('window')
    const bucketParam = url.searchParams.get('bucketSec') || url.searchParams.get('bucket')
    const windowSec = (() => {
      const v = Number(windowParam)
      return Number.isFinite(v) && v > 0 ? Math.min(v, 7 * 24 * 60 * 60) : 24 * 60 * 60
    })()
    const bucketSec = (() => {
      const v = Number(bucketParam)
      const def = 5 * 60
      if (!Number.isFinite(v) || v <= 0) return def
      return clamp(Math.floor(v), 60, 6 * 60 * 60)
    })()
    const windowMs = windowSec * 1000
    const bucketMs = bucketSec * 1000
    const buckets = clamp(Math.ceil(windowMs / bucketMs), 1, 10_000)
    const start = Date.now() - windowMs

    const redis = await getRedis()
    if (!redis) {
      endTimer();
      return NextResponse.json({ success: true, data: { windowSec, bucketSec, buckets, timestamps: [], success: [], total: [], successRate: [], failuresByReason: { bad_request: [], rate_limited: [], exception: [], other: [] } }, meta: { source: 'redis:disabled' } })
    }

    const rows = await redis.lrange('defi:ai:evaluate:events', -5000, -1)
    const timestamps: number[] = Array.from({ length: buckets }, (_v, i) => start + i * bucketMs)
    const success: number[] = Array.from({ length: buckets }, () => 0)
    const total: number[] = Array.from({ length: buckets }, () => 0)
    const failuresByReason: { bad_request: number[]; rate_limited: number[]; exception: number[]; other: number[] } = {
      bad_request: Array.from({ length: buckets }, () => 0),
      rate_limited: Array.from({ length: buckets }, () => 0),
      exception: Array.from({ length: buckets }, () => 0),
      other: Array.from({ length: buckets }, () => 0),
    }

    for (const r of rows) {
      try {
        const e = JSON.parse(r) as EventRow
        if (!e || typeof e.t !== 'number' || e.t < start) continue
        const idx = clamp(Math.floor((e.t - start) / bucketMs), 0, buckets - 1)
        total[idx] += 1
        if (e.outcome === 'success') {
          success[idx] += 1
        } else if (e.outcome === 'failure') {
          const reason: FailureReason = e.rsn && ['bad_request','rate_limited','exception','other'].includes(e.rsn) ? e.rsn : 'other'
          failuresByReason[reason][idx] += 1
        }
      } catch {}
    }

    const successRate: number[] = total.map((t, i) => (t > 0 ? success[i] / t : 0))
    const data = { windowSec, bucketSec, buckets, timestamps, success, total, successRate, failuresByReason }
    endTimer()
    return NextResponse.json({ success: true, data }, { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' } })
  } catch (e) {
    incCounter('defi_api_errors_total', { endpoint: 'risk_ai_stats_timeseries', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
