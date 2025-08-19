import { NextRequest, NextResponse } from 'next/server'

const DEFI_LLAMA_BASE = 'https://api.llama.fi'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || searchParams.get('protocol')
  if (!slug) return NextResponse.json({ success: false, error: 'slug is required' }, { status: 400 })
  try {
    const res = await fetch(`${DEFI_LLAMA_BASE}/protocol/${encodeURIComponent(slug)}`, { method: 'GET' })
    const text = await res.text()
    return new NextResponse(text, {
      status: res.status,
      headers: {
        'content-type': res.headers.get('content-type') ?? 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60',
      }
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
  }
}
