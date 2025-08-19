import { NextRequest, NextResponse } from 'next/server'
import { fetchTopProtocols } from '@/lib/defi/defillama-service'
import { incCounter, setGauge, startTimer } from '@/lib/monitoring/metrics'

export async function GET(_req: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'overview' })
  incCounter('defi_api_requests_total', { endpoint: 'overview', method: 'GET' })
  try {
    // 今はシンプルにトップNプロトコルで概要を形成
    const protocols = await fetchTopProtocols(100)
    const totalTVL = protocols.reduce((sum, p) => sum + (p.tvlUsd || 0), 0)
    const byCategory = new Map<string, number>()
    const byChain = new Map<string, number>()

    for (const p of protocols) {
      const cat = p.categories[0] || 'Unknown'
      byCategory.set(cat, (byCategory.get(cat) || 0) + p.tvlUsd)
      for (const chain of p.chains) {
        byChain.set(chain, (byChain.get(chain) || 0) + p.tvlUsd / Math.max(1, p.chains.length))
      }
    }

    const topCategories = Array.from(byCategory.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, tvlUsd]) => ({ name, tvlUsd }))

    const topChains = Array.from(byChain.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, tvlUsd]) => ({ name, tvlUsd }))

    // Prometheus Gauges
    setGauge('defi_overview_total_tvl_usd', totalTVL)
    for (const c of topCategories) setGauge('defi_overview_tvl_usd', c.tvlUsd, { type: 'category', name: c.name })
    for (const c of topChains) setGauge('defi_overview_tvl_usd', c.tvlUsd, { type: 'chain', name: c.name })

    const res = NextResponse.json({
      data: {
        totalTVL,
        topCategories,
        topChains,
        topProtocols: protocols.slice(0, 20)
      },
      meta: { source: 'defillama', fetchedAt: new Date().toISOString() }
    }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } })
    endTimer()
    return res
  } catch (_e) {
    incCounter('defi_api_errors_total', { endpoint: 'overview', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
