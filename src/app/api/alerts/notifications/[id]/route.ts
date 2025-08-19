import { NextRequest, NextResponse } from 'next/server'
import { recordApiUsage } from '@/app/api/_usage'

export async function GET(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const start = Date.now()
  const base = process.env.ALERTS_BASE_URL
  const key = process.env.ALERTS_INTERNAL_API_KEY
  if (!base || !key) {
    const res = NextResponse.json({ success: false, error: 'Alerts service is not configured' }, { status: 500 })
    recordApiUsage({ service: 'alerts', endpoint: '/api/alerts/notifications/[id]', method: 'GET', status: 500, durationMs: Date.now() - start, request: req })
    return res
  }
  const { id } = context.params
  try {
    const upstream = await fetch(`${base}/api/notifications/${encodeURIComponent(id)}`, { headers: { 'x-internal-key': key } })
    const text = await upstream.text()
    const res = new NextResponse(text, { status: upstream.status, headers: { 'content-type': upstream.headers.get('content-type') ?? 'application/json', 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } })
    recordApiUsage({ service: 'alerts', endpoint: '/api/alerts/notifications/[id]', method: 'GET', status: upstream.status, durationMs: Date.now() - start, request: req })
    return res
  } catch (error) {
    const res = NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
    recordApiUsage({ service: 'alerts', endpoint: '/api/alerts/notifications/[id]', method: 'GET', status: 502, durationMs: Date.now() - start, request: req })
    return res
  }
}


