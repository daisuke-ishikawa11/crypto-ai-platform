import { NextRequest, NextResponse } from 'next/server'
import { fetchPools } from '@/lib/defi/defillama-yields'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

export async function GET(request: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'pools_export' })
  incCounter('defi_api_requests_total', { endpoint: 'pools_export', method: 'GET' })
  try {
    const { searchParams } = new URL(request.url)
    const chain = searchParams.get('chain') || undefined
    const project = searchParams.get('project') || undefined
    const limit = Number(searchParams.get('limit') || '1000')
    const precision = Math.max(0, Math.min(6, Number(searchParams.get('precision') || '0')))
    const includeMeta = ['1','true','yes'].includes((searchParams.get('meta') || '').toLowerCase())

    const pools = await fetchPools({ chain, project, limit })

    const rows: string[] = []
    if (includeMeta) {
      const metaLine = `# exported_at=${new Date().toISOString()}, source=defillama-yields, filters=${JSON.stringify({ chain, project, limit, precision })}`
      rows.push(metaLine)
    }
    rows.push(['id','project','chain','symbol','tvlUsd','apy','apyBase','apyReward','url'].join(','))
    for (const p of pools) {
      rows.push([
        p.id,
        JSON.stringify(p.project),
        JSON.stringify(p.chain),
        JSON.stringify(p.symbol ?? ''),
        (typeof p.tvlUsd === 'number' ? p.tvlUsd.toFixed(precision) : '0'),
        typeof p.apy === 'number' ? p.apy.toFixed(2) : '',
        typeof p.apyBase === 'number' ? p.apyBase.toFixed(2) : '',
        typeof p.apyReward === 'number' ? p.apyReward.toFixed(2) : '',
        JSON.stringify(p.url ?? ''),
      ].join(','))
    }
    const body = rows.join('\n') + '\n'
    const res = new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="defi_pools.csv"',
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      }
    })
    endTimer()
    return res
  } catch (_e) {
    incCounter('defi_api_errors_total', { endpoint: 'pools_export', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
