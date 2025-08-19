import { NextRequest, NextResponse } from 'next/server'

export function proxyWithCache(path: string, seconds: number) {
  return async (request: NextRequest) => {
    const base = process.env.DEFISUITE_BASE_URL
    if (!base) return NextResponse.json({ success: false, error: 'DEFISUITE_BASE_URL is not configured' }, { status: 501 })
    const url = new URL(request.url)
    const target = `${base}${path}?${url.searchParams.toString()}`
    try {
      const res = await fetch(target, { method: 'GET', headers: { 'x-forwarded-from': 'main-app' } })
      const text = await res.text()
      return new NextResponse(text, { status: res.status, headers: { 'content-type': res.headers.get('content-type') ?? 'application/json', 'Cache-Control': `public, s-maxage=${seconds}, stale-while-revalidate=60` } })
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Upstream error', details: error instanceof Error ? error.message : String(error) }, { status: 502 })
    }
  }
}


