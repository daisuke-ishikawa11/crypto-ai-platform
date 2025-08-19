import { NextRequest, NextResponse } from 'next/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'
import { fetchWithTimeout } from '@/lib/utils/http'

async function handler(_request: NextRequest): Promise<NextResponse> {
  try {
    const rpc = process.env.SOLANA_RPC_URL
    if (!rpc || !/^https?:\/\//i.test(rpc)) {
      return NextResponse.json({ success: false, error: 'SOLANA_RPC_URL is not set' }, { status: 400 })
    }
    const payload = { jsonrpc: '2.0', id: 1, method: 'getEpochInfo', params: [] as unknown[] }
    const res = await fetchWithTimeout(rpc, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }, 8000)
    if (!res.ok) {
      return NextResponse.json({ success: false, error: `HTTP ${res.status}` }, { status: 502 })
    }
    const json = await res.json().catch(() => null) as { result?: unknown; error?: unknown } | null
    if (!json || (!('result' in json) && !('error' in json))) {
      return NextResponse.json({ success: false, error: 'Invalid RPC response' }, { status: 502 })
    }
    if ('error' in (json as Record<string, unknown>) && (json as Record<string, unknown>).error) {
      return NextResponse.json({ success: false, error: json.error }, { status: 502 })
    }
    return NextResponse.json({ success: true, data: json.result })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 10, window: 60_000 }, errorOptions: { enableLogging: true } })
