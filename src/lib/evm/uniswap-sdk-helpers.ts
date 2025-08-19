// Uniswap v3/v4 SDK 補助ヘルパー（オンチェーン読み出し）
// - v3: feeGrowthGlobal{0,1}X128 / liquidity / slot0 を読み出し、前回スナップショットとの差分から手数料見積もり
// - 価格: DefiLlamaのprice APIでUSD換算（片足でも取得できれば合算に使用）
// - キャッシュ: cacheManager で直近スナップショットを保存（メモリ/Redis）

import { cacheManager, CacheLayer } from '@/lib/cache/cache-manager'
import { fetchJsonWithRetry } from '@/lib/utils/http'
import type { SupportedNetwork } from '@/lib/sdk/types'
import { performanceMonitor } from '@/lib/monitoring/performance-monitor'

// viem を動的import（ビルド時の依存最小化）
async function getViem() {
  const mod = await import('viem')
  return mod
}

// ランタイム互換重視のため厳密な型参照は避ける
type PublicClient = unknown

function getRpcEnvFor(network: SupportedNetwork): string | null {
  const key = (network || '').toLowerCase()
  if (key === 'ethereum') return process.env.ETHEREUM_RPC_URL || process.env.ETH_RPC_URL || null
  if (key === 'polygon') return process.env.POLYGON_RPC_URL || null
  if (key === 'bsc') return process.env.BSC_RPC_URL || process.env.BINANCE_RPC_URL || null
  if (key === 'optimism') return process.env.OPTIMISM_RPC_URL || null
  if (key === 'arbitrum') return process.env.ARBITRUM_RPC_URL || null
  if (key === 'avalanche') return process.env.AVALANCHE_RPC_URL || null
  if (key === 'base') return process.env.BASE_RPC_URL || null
  return null
}

function getLlamaChainKey(network: SupportedNetwork): string | null {
  const key = (network || '').toLowerCase()
  if (key === 'ethereum') return 'ethereum'
  if (key === 'polygon') return 'polygon'
  if (key === 'bsc') return 'bsc'
  if (key === 'optimism') return 'optimism'
  if (key === 'arbitrum') return 'arbitrum'
  if (key === 'avalanche') return 'avax'
  if (key === 'base') return 'base'
  return null
}

async function createPublicClient(network: SupportedNetwork): Promise<PublicClient | null> {
  const rpcUrl = getRpcEnvFor(network)
  if (!rpcUrl) return null
  const viem = await getViem()
  const timeout = Number(
    (network === 'polygon' && process.env.POLYGON_HTTP_TIMEOUT_MS) ||
    (network === 'arbitrum' && process.env.ARBITRUM_HTTP_TIMEOUT_MS) ||
    (network === 'optimism' && process.env.OPTIMISM_HTTP_TIMEOUT_MS) ||
    (network === 'base' && process.env.BASE_HTTP_TIMEOUT_MS) ||
    process.env.EVM_HTTP_TIMEOUT_MS ||
    5000
  )
  const client = viem.createPublicClient({
    transport: viem.http(rpcUrl, { timeout }),
  }) as unknown as PublicClient
  return client
}

// Uniswap v3 Pool Minimal ABI（必要メソッドのみ）
const UNISWAP_V3_POOL_ABI = [
  { inputs: [], name: 'slot0', outputs: [
      { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
      { internalType: 'int24', name: 'tick', type: 'int24' },
      { internalType: 'uint16', name: 'observationIndex', type: 'uint16' },
      { internalType: 'uint16', name: 'observationCardinality', type: 'uint16' },
      { internalType: 'uint16', name: 'observationCardinalityNext', type: 'uint16' },
      { internalType: 'uint8', name: 'feeProtocol', type: 'uint8' },
      { internalType: 'bool', name: 'unlocked', type: 'bool' },
    ], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'liquidity', outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'feeGrowthGlobal0X128', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'feeGrowthGlobal1X128', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const

type V3PoolState = {
  sqrtPriceX96: bigint
  liquidity: bigint
  feeGrowthGlobal0X128: bigint
  feeGrowthGlobal1X128: bigint
  ts: number
}

async function readV3PoolState(network: SupportedNetwork, pool: `0x${string}`): Promise<V3PoolState | null> {
  try {
    const client = await createPublicClient(network)
    if (!client) return null
    const rc = (client as unknown as { readContract: (args: Record<string, unknown>) => Promise<unknown> }).readContract
    const [slot0Raw, liqRaw, fg0Raw, fg1Raw] = await Promise.all([
      rc({ address: pool, abi: UNISWAP_V3_POOL_ABI, functionName: 'slot0' }),
      rc({ address: pool, abi: UNISWAP_V3_POOL_ABI, functionName: 'liquidity' }),
      rc({ address: pool, abi: UNISWAP_V3_POOL_ABI, functionName: 'feeGrowthGlobal0X128' }),
      rc({ address: pool, abi: UNISWAP_V3_POOL_ABI, functionName: 'feeGrowthGlobal1X128' }),
    ])
    const slot0 = slot0Raw as readonly [bigint, number, number, number, number, number, boolean]
    const liq = liqRaw as bigint
    const fg0 = fg0Raw as bigint
    const fg1 = fg1Raw as bigint
    return {
      sqrtPriceX96: slot0[0],
      liquidity: liq,
      feeGrowthGlobal0X128: fg0,
      feeGrowthGlobal1X128: fg1,
      ts: Math.floor(Date.now() / 1000),
    }
  } catch {
    return null
  }
}

async function fetchTokenPricesUsd(network: SupportedNetwork, token0: string | undefined, token1: string | undefined): Promise<{ p0?: number; p1?: number }> {
  const chain = getLlamaChainKey(network)
  if (!chain) return {}
  const ids: string[] = []
  if (token0) ids.push(`${chain}:${token0}`)
  if (token1) ids.push(`${chain}:${token1}`)
  if (ids.length === 0) return {}
  try {
    const url = `https://coins.llama.fi/prices/current/${ids.join(',')}`
    const r = await fetchJsonWithRetry<{ coins?: Record<string, { price?: number }> }>(url, { method: 'GET' }, { retries: 1, backoffMs: 300, timeoutMs: Number(process.env.PRICE_HTTP_TIMEOUT_MS || 4000) })
    const map = r?.coins || {}
    const k0 = token0 ? `${chain}:${token0}` : ''
    const k1 = token1 ? `${chain}:${token1}` : ''
    const p0 = k0 && typeof map[k0]?.price === 'number' ? Number(map[k0]!.price!) : undefined
    const p1 = k1 && typeof map[k1]?.price === 'number' ? Number(map[k1]!.price!) : undefined
    return { p0, p1 }
  } catch {
    return {}
  }
}

type V3AprInput = {
  network: SupportedNetwork
  poolAddress: string
  tvlUsd: number
  token0Address?: string
  token1Address?: string
}

export async function estimateUniswapV3FeeAprFromOnchain(input: V3AprInput): Promise<number | null> {
  const start = Date.now()
  let statusCode = 500
  try {
    const { network, poolAddress, tvlUsd, token0Address, token1Address } = input
    if (!(tvlUsd > 0)) return null
    const pool = poolAddress.toLowerCase() as `0x${string}`
    const cacheKey = `evm:v3:poolstate:${network}:${pool}`
    const now = Math.floor(Date.now() / 1000)
    const cur = await readV3PoolState(network, pool)
    if (!cur) return null
    const prev = await cacheManager.get<V3PoolState>(cacheKey, { layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
    await cacheManager.set(cacheKey, cur, { ttl: Number(process.env.V3_STATE_TTL_MS || 10 * 60_000), layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
    if (!prev) { statusCode = 204; return null }
    const dt = Math.max(1, now - prev.ts)
    if (dt < Math.max(60, Number(process.env.V3_MIN_INTERVAL_SEC || 300))) return null

    const Q128 = 2n ** 128n
    const liq = cur.liquidity
    if (liq <= 0n) return null
    const dFee0 = (cur.feeGrowthGlobal0X128 - prev.feeGrowthGlobal0X128)
    const dFee1 = (cur.feeGrowthGlobal1X128 - prev.feeGrowthGlobal1X128)
    // fees in token units = (delta feeGrowth per liquidity) * liquidity / 2^128
    const fees0 = Number((dFee0 * liq) / Q128)
    const fees1 = Number((dFee1 * liq) / Q128)
    if (!(Number.isFinite(fees0) || Number.isFinite(fees1))) return null

    const { p0, p1 } = await fetchTokenPricesUsd(network, token0Address, token1Address)
    const usd0 = (typeof p0 === 'number' && p0 > 0) ? fees0 * p0 : 0
    const usd1 = (typeof p1 === 'number' && p1 > 0) ? fees1 * p1 : 0
    const feesUsd = Math.max(usd0, usd1, usd0 + usd1) // 少なくとも片足のUSD合算を利用
    if (!(feesUsd > 0)) return null
    const feesPerDay = feesUsd * (86_400 / dt)
    const dailyApr = feesPerDay / tvlUsd
    const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
    statusCode = apyPct > 0 ? 200 : 204
    return apyPct > 0 ? apyPct : null
  } catch {
    statusCode = 500
    return null
  } finally {
    const responseTime = Date.now() - start
    void performanceMonitor.track('evm.v3.onchain.estimate', {
      endpoint: 'evm.v3.onchain.estimate',
      method: 'READ',
      responseTime,
      statusCode,
      network: input.network,
      poolAddress: input.poolAddress,
    })
  }
}

// v4 は設計が流動的なため、ひな型のみ用意
// 簡易v4 APR推定（v4 Pool ABI/関数名が環境で提供される場合のみ）
export async function estimateUniswapV4FeeAprFromOnchain(input: V3AprInput): Promise<number | null> {
  const start = Date.now()
  let statusCode = 500
  try {
    const { network, poolAddress, tvlUsd, token0Address, token1Address } = input
    if (!(tvlUsd > 0)) return null
    const abiJson = process.env.UNISWAP_V4_POOL_ABI_JSON
    const fee0Fn = process.env.UNISWAP_V4_FEE_GROWTH0_FN || 'feeGrowthGlobal0X128'
    const fee1Fn = process.env.UNISWAP_V4_FEE_GROWTH1_FN || 'feeGrowthGlobal1X128'
    const liqFn = process.env.UNISWAP_V4_LIQUIDITY_FN || 'liquidity'
    if (!abiJson) return null
    const abi = JSON.parse(abiJson)
    const client = await createPublicClient(network)
    if (!client) return null
    const rc = (client as unknown as { readContract: (args: Record<string, unknown>) => Promise<unknown> }).readContract
    const address = poolAddress.toLowerCase() as `0x${string}`
    const [liqRaw, fg0Raw, fg1Raw] = await Promise.all([
      rc({ address, abi, functionName: liqFn }),
      rc({ address, abi, functionName: fee0Fn }),
      rc({ address, abi, functionName: fee1Fn }),
    ])
    const liq = liqRaw as bigint
    const fg0 = fg0Raw as bigint
    const fg1 = fg1Raw as bigint
    const cacheKey = `evm:v4:poolstate:${network}:${address}`
    const now = Math.floor(Date.now() / 1000)
    type V4State = { liq: bigint; fg0: bigint; fg1: bigint; ts: number }
    const cur: V4State = { liq, fg0, fg1, ts: now }
    const prev = await cacheManager.get<V4State>(cacheKey, { layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
    await cacheManager.set(cacheKey, cur, { ttl: Number(process.env.V4_STATE_TTL_MS || 10 * 60_000), layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
    if (!prev || liq <= 0n) { statusCode = 204; return null }
    const dt = Math.max(1, now - prev.ts)
    if (dt < Math.max(60, Number(process.env.V4_MIN_INTERVAL_SEC || 300))) return null
    const Q128 = 2n ** 128n
    const dFee0 = (fg0 - prev.fg0)
    const dFee1 = (fg1 - prev.fg1)
    const fees0 = Number((dFee0 * liq) / Q128)
    const fees1 = Number((dFee1 * liq) / Q128)
    // 価格換算（v3同等のUSD換算）
    const { p0, p1 } = await fetchTokenPricesUsd(network, token0Address, token1Address)
    const usd0 = (typeof p0 === 'number' && p0 > 0) ? fees0 * p0 : 0
    const usd1 = (typeof p1 === 'number' && p1 > 0) ? fees1 * p1 : 0
    const feesUsd = Math.max(usd0, usd1, usd0 + usd1)
    if (!(feesUsd > 0)) { statusCode = 204; return null }
    const feesPerDay = feesUsd * (86_400 / dt)
    const dailyApr = feesPerDay / tvlUsd
    const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
    statusCode = apyPct > 0 ? 200 : 204
    return apyPct > 0 ? apyPct : null
  } catch {
    statusCode = 500
    return null
  } finally {
    const responseTime = Date.now() - start
    void performanceMonitor.track('evm.v4.onchain.estimate', {
      endpoint: 'evm.v4.onchain.estimate',
      method: 'READ',
      responseTime,
      statusCode,
      network: input.network,
      poolAddress: input.poolAddress,
    })
  }
}

// Uniswap v4 Hooks 検出ラッパ（環境変数にABIを渡せる場合のみ動作）
// UNISWAP_V4_POOL_ABI_JSON 環境変数に有効なABI(JSON文字列)を設定し、functionNameに 'getHooks' または 'hooks' がある場合に読み出し
export async function detectUniswapV4Hooks(network: SupportedNetwork, poolAddress: string): Promise<unknown | null> {
  try {
    const abiJson = process.env.UNISWAP_V4_POOL_ABI_JSON
    if (!abiJson) return null
    const abi = JSON.parse(abiJson)
    const viem = await getViem()
    const client = await createPublicClient(network)
    if (!client) return null
    const rc = (client as unknown as { readContract: (args: Record<string, unknown>) => Promise<unknown> }).readContract
    const address = poolAddress.toLowerCase() as `0x${string}`
    // よく使われる名称を順に試行
    const fnCandidates = ['getHooks', 'hooks', 'hookData', 'getHookData']
    for (const fn of fnCandidates) {
      try {
        const out = await rc({ address, abi, functionName: fn })
        if (typeof out !== 'undefined') return out
      } catch {}
    }
    return null
  } catch {
    return null
  }
}
