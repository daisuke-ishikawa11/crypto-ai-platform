import { NextRequest, NextResponse } from 'next/server'
import { fetchTopProtocols } from '@/lib/defi/defillama-service'
import { incCounter, startTimer } from '@/lib/monitoring/metrics'

export async function GET(request: NextRequest) {
  const endTimer = startTimer('defi_api_request_duration_seconds', { endpoint: 'protocols_export' })
  incCounter('defi_api_requests_total', { endpoint: 'protocols_export', method: 'GET' })
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit') || '200')
    const chain = searchParams.get('chain')?.toLowerCase()
    const category = searchParams.get('category')?.toLowerCase()
    const precision = Math.max(0, Math.min(6, Number(searchParams.get('precision') || '0')))
    const includeMeta = ['1','true','yes'].includes((searchParams.get('meta') || '').toLowerCase())

    const protocols = await fetchTopProtocols(Math.min(Math.max(limit, 1), 1000))
    const filtered = protocols.filter(p => {
      const okChain = chain ? p.chains.map(c => c.toLowerCase()).includes(chain) : true
      const okCat = category ? p.categories.map(c => c.toLowerCase()).includes(category) : true
      return okChain && okCat
    })

    const rows: string[] = []
    if (includeMeta) {
      const metaLine = `# exported_at=${new Date().toISOString()}, source=defillama, filters=${JSON.stringify({ chain, category, limit, precision })}`
      rows.push(metaLine)
    }
    rows.push(['id','name','slug','tvlUsd','chains','categories','url'].join(','))
    for (const p of filtered) {
      rows.push([
        p.id,
        JSON.stringify(p.name),
        p.slug,
        (typeof p.tvlUsd === 'number' ? p.tvlUsd.toFixed(precision) : '0'),
        JSON.stringify(p.chains.join('|')),
        JSON.stringify(p.categories.join('|')),
        JSON.stringify(p.url ?? ''),
      ].join(','))
    }
    const body = rows.join('\n') + '\n'
    const res = new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="defi_protocols.csv"',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60',
      }
    })
    endTimer()
    return res
  } catch (_e) {
    incCounter('defi_api_errors_total', { endpoint: 'protocols_export', reason: 'exception' })
    endTimer()
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
