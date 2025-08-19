import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const base = process.env.DEFISUITE_BASE_URL
  const internalKey = process.env.DEFISUITE_INTERNAL_API_KEY
  if (!base) return NextResponse.json({ success: false, error: 'DEFISUITE_BASE_URL is not configured' }, { status: 501 })
  if (!internalKey) return NextResponse.json({ success: false, error: 'DEFISUITE_INTERNAL_API_KEY is not configured' }, { status: 501 })

  const url = new URL(request.url)
  const target = `${base}/api/defi/risk-assessment?${url.searchParams.toString()}`
  try {
    const res = await fetch(target, { method: 'GET', headers: { 'x-forwarded-from': 'main-app', 'x-internal-key': internalKey } })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
  }
}


