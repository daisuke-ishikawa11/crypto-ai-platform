import { NextRequest, NextResponse } from 'next/server'
import { getGasInfo } from '@/lib/defi/gas-service'

// 簡易メモリキャッシュ（プロセス内）
const cache = new Map<number, { t: number; data: { chainId: number; baseFeeGwei: number; priorityFeeGwei: number; suggestedMaxFeeGwei: number } }>()
const TTL_MS = 15_000
const RETRIES = 2
const RETRY_DELAY_MS = 400

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const chainIdStr = searchParams.get('chainId')
  const chainId = Number(chainIdStr)
  if (!chainId || Number.isNaN(chainId)) {
    return NextResponse.json({ error: 'chainId is required' }, { status: 400 })
  }
  // キャッシュヒット
  const now = Date.now()
  const hit = cache.get(chainId)
  if (hit && now - hit.t < TTL_MS) {
    return NextResponse.json({ data: hit.data })
  }

  // リトライ付き取得
  let raw = await getGasInfo(chainId)
  let attempts = 0
  while (!raw && attempts < RETRIES) {
    attempts += 1
    await delay(RETRY_DELAY_MS)
    raw = await getGasInfo(chainId)
  }
  if (!raw) {
    return NextResponse.json({ error: 'Unsupported chain or RPC unreachable' }, { status: 404 })
  }
  const base = raw.baseFeeGwei ?? raw.gasPriceGwei ?? 0
  const tip = raw.priorityFeeGwei ?? 0
  const suggestedMaxFeeGwei = base + tip
  const data = {
    chainId: raw.chainId,
    baseFeeGwei: raw.baseFeeGwei ?? raw.gasPriceGwei ?? 0,
    priorityFeeGwei: tip,
    suggestedMaxFeeGwei
  }
  cache.set(chainId, { t: now, data })
  return NextResponse.json({ data })
}
