import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token') || ''
    const expected = process.env.CRON_TOKEN || ''
    if (!expected || token !== expected) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }
    const base = process.env.NEXT_PUBLIC_BASE_URL || ''
    const target = base ? `${base}/api/defi/pools/history/ingest/batch` : `${url.origin}/api/defi/pools/history/ingest/batch`
    const resp = await fetch(target, { method: 'GET', headers: { 'accept': 'application/json' } })
    const text = await resp.text()
    return NextResponse.json({ ok: resp.ok, status: resp.status, body: text })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
