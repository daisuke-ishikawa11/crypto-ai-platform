import { NextRequest, NextResponse } from 'next/server'

export const GET = async (_request: NextRequest) => {
  const base = process.env.DEFISUITE_BASE_URL
  const internalKey = process.env.DEFISUITE_INTERNAL_API_KEY
  if (!base || !internalKey) return NextResponse.json({ success: false, error: 'Upstream not configured' }, { status: 501 })
  try {
    const res = await fetch(`${base}/api/defi/engine`, { method: 'GET', headers: { 'x-forwarded-from': 'main-app', 'x-internal-key': internalKey } })
    const text = await res.text()
    return new NextResponse(text, { status: res.status, headers: { 'content-type': res.headers.get('content-type') ?? 'application/json', 'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=60' } })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
  }
}

export const POST = async (_request: NextRequest) => {
  const base = process.env.DEFISUITE_BASE_URL
  const internalKey = process.env.DEFISUITE_INTERNAL_API_KEY
  if (!base || !internalKey) return NextResponse.json({ success: false, error: 'Upstream not configured' }, { status: 501 })
  try {
    const res = await fetch(`${base}/api/defi/engine`, { method: 'POST', headers: { 'x-forwarded-from': 'main-app', 'x-internal-key': internalKey } })
    const text = await res.text()
    return new NextResponse(text, { status: res.status, headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' } })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
  }
}


