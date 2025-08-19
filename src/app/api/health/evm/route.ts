import { NextRequest, NextResponse } from 'next/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'
import { fetchWithTimeout } from '@/lib/utils/http'

export const dynamic = 'force-dynamic'

type ChainKey =
  | 'ethereum'
  | 'arbitrum'
  | 'optimism'
  | 'polygon'
  | 'base'
  | 'bsc'
  | 'avalanche'
  | 'fantom'

const CHAIN_ENV: Record<ChainKey, string> = {
  ethereum: 'ETHEREUM_RPC_URL',
  arbitrum: 'ARBITRUM_RPC_URL',
  optimism: 'OPTIMISM_RPC_URL',
  polygon: 'POLYGON_RPC_URL',
  base: 'BASE_RPC_URL',
  bsc: 'BSC_RPC_URL',
  avalanche: 'AVALANCHE_RPC_URL',
  fantom: 'FANTOM_RPC_URL',
}

type RpcCheckOk = { name: ChainKey; present: true; ok: true; latencyMs: number; blockNumber: number }
type RpcCheckErr = { name: ChainKey; present: true; ok: false; latencyMs: number; error: string }
type RpcCheckMissing = { name: ChainKey; present: false }
type RpcCheck = RpcCheckOk | RpcCheckErr | RpcCheckMissing

function isPresent(d: RpcCheck): d is RpcCheckOk | RpcCheckErr { return d.present === true }
function isOk(d: RpcCheck): d is RpcCheckOk { return 'ok' in d && d.ok === true }

async function checkRpc(name: ChainKey, url: string): Promise<RpcCheckOk | RpcCheckErr> {
  const started = Date.now()
  const payload = { jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] as unknown[] }
  try {
    const res = await fetchWithTimeout(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }, 8000)
    const latencyMs = Date.now() - started
    if (!res.ok) return { name, present: true, ok: false, latencyMs, error: `HTTP ${res.status}` }
    const j = (await res.json()) as { result?: string; error?: { message?: string } }
    if (j?.error) return { name, present: true, ok: false, latencyMs, error: j.error.message || 'RPC error' }
    const blockHex = j?.result || '0x0'
    const blockNumber = Number.parseInt(String(blockHex), 16)
    if (Number.isFinite(blockNumber)) {
      return { name, present: true, ok: true, latencyMs, blockNumber }
    }
    return { name, present: true, ok: false, latencyMs, error: 'Invalid block number' }
  } catch (e) {
    const latencyMs = Date.now() - started
    return { name, present: true, ok: false, latencyMs, error: e instanceof Error ? e.message : String(e) }
  }
}

async function handler(_req: NextRequest): Promise<NextResponse> {
  const entries = Object.entries(CHAIN_ENV) as Array<[ChainKey, string]>
  const results: Array<Promise<RpcCheck>> = []
  for (const [name, envKey] of entries) {
    const url = process.env[envKey]
    if (typeof url === 'string' && url.trim()) {
      results.push(checkRpc(name, url.trim()))
    } else {
      results.push(Promise.resolve({ name, present: false as const }))
    }
  }
  const data: RpcCheck[] = await Promise.all(results)
  const presentItems = data.filter(isPresent)
  const okItems = data.filter(isOk)
  const presentCount = presentItems.length
  const okCount = okItems.length
  const avgLatencyMs = presentItems.length > 0
    ? Math.round(presentItems.reduce((s, d) => s + (d as RpcCheckOk | RpcCheckErr).latencyMs, 0) / presentItems.length)
    : 0
  const summary = {
    total: data.length,
    present: presentCount,
    ok: okCount,
    avgLatencyMs,
  }
  return NextResponse.json({ success: true, summary, data })
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 30, window: 60_000 }, errorOptions: { enableLogging: true } })
