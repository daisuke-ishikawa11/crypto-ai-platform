import { NextRequest, NextResponse } from 'next/server'
import { fetchTopProtocols } from '@/lib/defi/defillama-service'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || '50')
  const chain = searchParams.get('chain')?.toLowerCase()
  const category = searchParams.get('category')?.toLowerCase()
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'protocols' })
  incCounter('defi_api_requests_total', { endpoint: 'protocols', method: 'GET', has_chain: chain ? '1' : '0', has_category: category ? '1' : '0' })
  try {
    const protocols = await fetchTopProtocols(Math.min(Math.max(limit, 1), 200))
    const filtered = protocols.filter(p => {
      const okChain = chain ? p.chains.map(c => c.toLowerCase()).includes(chain) : true
      const okCat = category ? p.categories.map(c => c.toLowerCase()).includes(category) : true
      return okChain && okCat
    })

    const res = NextResponse.json({
      data: filtered,
      meta: { count: filtered.length, source: 'defillama' }
    }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } })
    endTimer()
    return res
  } catch (e) {
    incCounter('defi_api_errors_total', { endpoint: 'protocols', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
