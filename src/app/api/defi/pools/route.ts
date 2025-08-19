import { NextRequest, NextResponse } from 'next/server'
import { fetchPools } from '@/lib/defi/defillama-yields'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const chain = searchParams.get('chain') || undefined
  const project = searchParams.get('project') || undefined
  const limit = Number(searchParams.get('limit') || '200')
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'pools' })
  incCounter('defi_api_requests_total', { endpoint: 'pools', method: 'GET', has_chain: chain ? '1' : '0', has_project: project ? '1' : '0' })
  try {
    const pools = await fetchPools({ chain: chain || undefined, project: project || undefined, limit })
    const res = NextResponse.json({ data: pools, meta: { count: pools.length, source: 'defillama-yields' } }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } })
    endTimer()
    return res
  } catch (e) {
    incCounter('defi_api_errors_total', { endpoint: 'pools', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
