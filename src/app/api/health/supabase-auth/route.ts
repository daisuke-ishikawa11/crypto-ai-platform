import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { incCounter, isMetricsEnabled, startTimer } from '@/lib/monitoring/metrics'

export async function GET(_request: NextRequest) {
  const stop = startTimer('defi_api_request_duration_seconds', { endpoint: 'health_supabase_auth', method: 'GET' })
  try {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!base || !anon) {
      if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'health_supabase_auth', reason: 'not_configured', status: '500' })
      return NextResponse.json({ success: false, error: 'Supabase URL or Anon key not set' }, { status: 500 })
    }
    const url = base.endsWith('/') ? `${base}auth/v1/health` : `${base}/auth/v1/health`
    const res = await fetch(url, { method: 'GET', headers: { apikey: anon, Authorization: `Bearer ${anon}` } })
    const text = await res.text()
    if (isMetricsEnabled()) incCounter('defi_api_requests_total', { endpoint: 'health_supabase_auth', method: 'GET', status: String(res.status) })
    return NextResponse.json({ success: res.ok, status: res.status, body: text })
  } catch (error) {
    if (isMetricsEnabled()) incCounter('defi_api_errors_total', { endpoint: 'health_supabase_auth', reason: 'exception' })
    return NextResponse.json({ success: false, error: 'Failed to reach Supabase auth', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  } finally {
    stop()
  }
}
