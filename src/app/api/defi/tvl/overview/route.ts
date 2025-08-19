import { NextRequest, NextResponse } from 'next/server'
import { recordApiUsage } from '@/app/api/_usage'

export const GET = async (request: NextRequest) => {
  const start = Date.now()
  const base = process.env.DEFISUITE_BASE_URL
  const internalKey = process.env.DEFISUITE_INTERNAL_API_KEY
  if (!base || !internalKey) {
    const res = NextResponse.json({ success: false, error: 'DeFi upstream not configured' }, { status: 501 })
    recordApiUsage({ service: 'defi', endpoint: '/api/defi/tvl/overview', method: 'GET', status: 501, durationMs: Date.now() - start, request })
    return res
  }
  const url = new URL(request.url)
  const target = `${base}/api/defi/tvl/overview?${url.searchParams.toString()}`
  try {
    const upstream = await fetch(target, { method: 'GET', headers: { 'x-forwarded-from': 'main-app', 'x-internal-key': internalKey } })
    const text = await upstream.text()
    const res = new NextResponse(text, { status: upstream.status, headers: { 'content-type': upstream.headers.get('content-type') ?? 'application/json', 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } })
    recordApiUsage({ service: 'defi', endpoint: '/api/defi/tvl/overview', method: 'GET', status: upstream.status, durationMs: Date.now() - start, request })
    return res
  } catch (error) {
    const res = NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
    recordApiUsage({ service: 'defi', endpoint: '/api/defi/tvl/overview', method: 'GET', status: 502, durationMs: Date.now() - start, request })
    return res
  }
}


