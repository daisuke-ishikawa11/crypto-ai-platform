import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const base = process.env.DEFISUITE_BASE_URL
  const internalKey = process.env.DEFISUITE_INTERNAL_API_KEY
  if (!base) return NextResponse.json({ success: false, error: 'DEFISUITE_BASE_URL is not configured' }, { status: 501 })
  if (!internalKey) return NextResponse.json({ success: false, error: 'DEFISUITE_INTERNAL_API_KEY is not configured' }, { status: 501 })

  try {
    const res = await fetch(`${base}/api/defi/engine/stop`, { method: 'POST', headers: { 'x-forwarded-from': 'main-app', 'x-internal-key': internalKey } })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
  }
}
