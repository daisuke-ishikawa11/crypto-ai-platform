import { NextRequest, NextResponse } from 'next/server'
import { fetchProtocolTvlHistory } from '@/lib/defi/defillama-history'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || searchParams.get('protocol')
  const daysRaw = searchParams.get('days')
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'protocols_history' })
  if (!slug) {
    incCounter('defi_api_errors_total', { endpoint: 'protocols_history', reason: 'bad_request', status: '400' })
    endTimer()
    return NextResponse.json({ success: false, error: 'slug is required' }, { status: 400 })
  }
  const days = daysRaw ? Number(daysRaw) : undefined
  const data = await fetchProtocolTvlHistory(slug, days)
  const res = NextResponse.json({ data, meta: { count: data.length, source: 'defillama' } }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } })
  endTimer()
  return res
}
