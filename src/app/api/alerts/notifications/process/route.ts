import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.ALERTS_BASE_URL
  const key = process.env.ALERTS_INTERNAL_API_KEY
  if (!base || !key) return NextResponse.json({ success: false, error: 'Alerts service is not configured' }, { status: 500 })
  const url = new URL(req.url)
  const limit = url.searchParams.get('limit')
  const target = `${base}/api/notifications/process${limit ? `?limit=${encodeURIComponent(limit)}` : ''}`
  const res = await fetch(target, {
    method: 'POST',
    headers: { 'x-internal-key': key },
    cache: 'no-store',
  })
  const text = await res.text()
  return new NextResponse(text, { status: res.status, headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' } })
}


