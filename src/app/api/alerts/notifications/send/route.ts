import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = process.env.ALERTS_BASE_URL
  const key = process.env.ALERTS_INTERNAL_API_KEY
  if (!base || !key) return NextResponse.json({ success: false, error: 'Alerts service is not configured' }, { status: 500 })
  let body: string
  try { body = await req.text() } catch { return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 }) }
  const res = await fetch(`${base}/api/notifications/send`, {
    method: 'POST',
    headers: { 'x-internal-key': key, 'content-type': 'application/json' },
    body,
    cache: 'no-store',
  })
  const text = await res.text()
  return new NextResponse(text, { status: res.status, headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' } })
}


