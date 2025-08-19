// EVM DEX SDK adapters (Uniswap v3 hybrid)
// The Graph で上位プールを取得 → 必要に応じてRPCで補完 → 失敗時はDefiLlamaフォールバック

import { fetchJsonWithRetry } from '@/lib/utils/http'
import { resolveSdkOptions, type SupportedNetwork } from '@/lib/sdk/types'
import { fetchDexPools } from '@/lib/defi/dex-integrations'
import { registerAdapter } from '@/lib/sdk/registry'
import { estimateUniswapV3FeeAprFromOnchain } from '@/lib/evm/uniswap-sdk-helpers'
// Aave Graph: reserve/borrow APY を直接取得
function resolveAaveGraphUrlByChain(chain: SupportedNetwork): string | undefined {
  const key = (chain || '').toLowerCase()
  if (key === 'ethereum' || key === 'eth') return process.env.AAVE_GRAPH_URL_ETHEREUM || process.env.AAVE_GRAPH_URL
  if (key === 'polygon' || key === 'matic') return process.env.AAVE_GRAPH_URL_POLYGON || process.env.AAVE_GRAPH_URL
  if (key === 'arbitrum') return process.env.AAVE_GRAPH_URL_ARBITRUM || process.env.AAVE_GRAPH_URL
  if (key === 'optimism') return process.env.AAVE_GRAPH_URL_OPTIMISM || process.env.AAVE_GRAPH_URL
  if (key === 'base') return process.env.AAVE_GRAPH_URL_BASE || process.env.AAVE_GRAPH_URL
  if (key === 'scroll') return process.env.AAVE_GRAPH_URL_SCROLL || process.env.AAVE_GRAPH_URL
  if (key === 'linea') return process.env.AAVE_GRAPH_URL_LINEA || process.env.AAVE_GRAPH_URL
  if (key === 'avalanche' || key === 'avax') return process.env.AAVE_GRAPH_URL_AVALANCHE || process.env.AAVE_GRAPH_URL
  if (key === 'gnosis' || key === 'gno' || key === 'xdai') return process.env.AAVE_GRAPH_URL_GNOSIS || process.env.AAVE_GRAPH_URL
  return process.env.AAVE_GRAPH_URL
}
async function fetchAaveViaGraph(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[] | null> {
  const url = resolveAaveGraphUrlByChain(network)
  if (!url) return null
  try {
    const http = resolveSdkOptions('generic')
    // 公式サブグラフ（protocol-subgraphs想定）
    const queryOfficial = `query TopReserves {
      reserves(first: ${Math.max(1, Math.min(100, limit))}, orderBy: totalLiquidityUSD, orderDirection: desc) {
        id
        name
        underlyingAsset
        totalLiquidityUSD
        liquidityRate
        variableBorrowRate
      }
    }`
    // Messari等のスキーマ差分（reserveに相当するエンティティ名が異なる場合）
    const queryAlt = `query TopMarkets {
      markets(first: ${Math.max(1, Math.min(100, limit))}, orderBy: totalValueLockedUSD, orderDirection: desc) {
        id
        name
        inputTokenAddress
        totalValueLockedUSD
        rates {
          rate
          side
          type
        }
      }
    }`
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (process.env.AAVE_GRAPH_API_KEY) headers['x-api-key'] = process.env.AAVE_GRAPH_API_KEY
    if (process.env.AAVE_GRAPH_HEADERS_JSON) {
      try {
        const extra = JSON.parse(process.env.AAVE_GRAPH_HEADERS_JSON)
        if (extra && typeof extra === 'object') Object.assign(headers, extra)
      } catch {}
    }
    // まず公式スキーマで試行
    const j1 = await fetchJsonWithRetry<{ data?: { reserves?: Array<{ id: string; name?: string; underlyingAsset?: string; totalLiquidityUSD?: string; liquidityRate?: string; variableBorrowRate?: string }> } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query: queryOfficial }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    ).catch(() => null)
    const arr1 = j1?.data?.reserves || []
    if (arr1.length > 0) {
      return arr1.map(r => {
        const tvl = Number(r.totalLiquidityUSD || 0)
        const supplyAprRay = Number(r.liquidityRate || 0)
        const borrowAprRay = Number(r.variableBorrowRate || 0)
        const supplyApy = supplyAprRay > 0 && supplyAprRay < 1 ? supplyAprRay * 100 : (supplyAprRay / 1e27) * 100
        const borrowApy = borrowAprRay > 0 && borrowAprRay < 1 ? borrowAprRay * 100 : (borrowAprRay / 1e27) * 100
        return {
          protocol: 'aave',
          chain: (network || 'ethereum') as SupportedNetwork,
          address: r.id,
          name: r.name || 'Aave Reserve',
          tvlUsd: tvl,
          apy: supplyApy,
          token0: r.underlyingAsset?.slice(0,6),
          token1: undefined,
          sourceGraphUrl: url,
        }
      })
    }
    // 公式で取れない場合は代替（Messari等）
    const j2 = await fetchJsonWithRetry<{ data?: { markets?: Array<{ id: string; name?: string; inputTokenAddress?: string; totalValueLockedUSD?: string; rates?: Array<{ rate?: string | number; side?: string; type?: string }> }> } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query: queryAlt }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    ).catch(() => null)
    const arr2 = j2?.data?.markets || []
    if (arr2.length > 0) return arr2.map(r => {
      const tvl = Number(r.totalValueLockedUSD || 0)
      // rates配列から supply/borrow を抽出（年率%に正規化）
      let supplyApy = 0
      let borrowApy = 0
      const rates = Array.isArray(r.rates) ? r.rates : []
      for (const rt of rates) {
        const side = (rt?.side || '').toLowerCase()
        const t = (rt?.type || '').toLowerCase()
        const val = Number(rt?.rate || 0)
        // Messariは既に年率%のケースが多い。必要に応じて閾値で正規化。
        const pct = val > 0 && val < 1 ? (val * 100) : val
        if (side === 'supply' && (t === 'apy' || t === 'variable' || t === 'deposit')) supplyApy = Math.max(supplyApy, pct)
        if (side === 'borrow' && (t === 'apy' || t === 'variable')) borrowApy = Math.max(borrowApy, pct)
      }
      const underlyingMaybe = ((): string | undefined => {
        const u = (r as { underlyingAsset?: unknown }).underlyingAsset
        return typeof u === 'string' ? u : undefined
      })()
      const inputTokenMaybe = typeof r.inputTokenAddress === 'string' ? r.inputTokenAddress : undefined
      return {
        protocol: 'aave',
        chain: (network || 'ethereum') as SupportedNetwork,
        address: r.id,
        name: r.name || 'Aave Market',
        tvlUsd: tvl,
        apy: supplyApy,
        token0: (underlyingMaybe && underlyingMaybe.slice(0,6)) || (inputTokenMaybe && inputTokenMaybe.slice(0,6)) || undefined,
        token1: undefined,
        sourceGraphUrl: url,
      }
    })
    // 第3分岐: 一部サブグラフで 'pools' 形式などに揺れるケース
    const queryAlt2 = `query TopPools {
      pools(first: ${Math.max(1, Math.min(100, limit))}, orderBy: totalValueLockedUSD, orderDirection: desc) {
        id
        name
        inputTokenAddress
        totalValueLockedUSD
        rates { rate side type }
      }
    }`
    const j3 = await fetchJsonWithRetry<{ data?: { pools?: Array<{ id: string; name?: string; inputTokenAddress?: string; totalValueLockedUSD?: string; rates?: Array<{ rate?: string | number; side?: string; type?: string }> }> } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query: queryAlt2 }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    ).catch(() => null)
    const arr3 = j3?.data?.pools || []
    return arr3.map(r => {
      const tvl = Number(r.totalValueLockedUSD || 0)
      let supplyApy = 0
      let borrowApy = 0
      const rates = Array.isArray(r.rates) ? r.rates : []
      for (const rt of rates) {
        const side = (rt?.side || '').toLowerCase()
        const t = (rt?.type || '').toLowerCase()
        const val = Number(rt?.rate || 0)
        const pct = val > 0 && val < 1 ? (val * 100) : val
        if (side === 'supply' && (t === 'apy' || t === 'variable' || t === 'deposit')) supplyApy = Math.max(supplyApy, pct)
        if (side === 'borrow' && (t === 'apy' || t === 'variable')) borrowApy = Math.max(borrowApy, pct)
      }
      const inputTokenMaybe = typeof r.inputTokenAddress === 'string' ? r.inputTokenAddress : undefined
      return {
        protocol: 'aave',
        chain: (network || 'ethereum') as SupportedNetwork,
        address: r.id,
        name: r.name || 'Aave Pool',
        tvlUsd: tvl,
        apy: supplyApy,
        token0: inputTokenMaybe?.slice(0,6),
        token1: undefined,
        sourceGraphUrl: url,
      }
    })
  } catch {
    return null
  }
}

export type EvmPoolLike = {
  protocol: string
  chain: SupportedNetwork
  address: string
  name: string
  tvlUsd?: number
  apy?: number
  feeTier?: number
  token0?: string
  token1?: string
  token0Address?: string
  token1Address?: string
  estimatedVolumeUsd24h?: number
  sourceGraphUrl?: string
}

type UniswapV3PoolGql = {
  id: string
  feeTier: string
  totalValueLockedUSD: string
  token0: { symbol: string }
  token1: { symbol: string }
  poolDayData?: Array<{ volumeUSD?: string }>
}

function resolveUniswapV3GraphUrlByChain(chain: SupportedNetwork): string {
  const key = (chain || '').toLowerCase()
  if (key === 'polygon' || key === 'matic') return process.env.UNISWAP_V3_GRAPH_URL_POLYGON || process.env.UNISWAP_V3_GRAPH_URL || 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
  if (key === 'arbitrum') return process.env.UNISWAP_V3_GRAPH_URL_ARBITRUM || process.env.UNISWAP_V3_GRAPH_URL || 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
  if (key === 'optimism') return process.env.UNISWAP_V3_GRAPH_URL_OPTIMISM || process.env.UNISWAP_V3_GRAPH_URL || 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
  if (key === 'base') return process.env.UNISWAP_V3_GRAPH_URL_BASE || process.env.UNISWAP_V3_GRAPH_URL || 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
  return process.env.UNISWAP_V3_GRAPH_URL_ETHEREUM || process.env.UNISWAP_V3_GRAPH_URL || 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
}

async function fetchUniswapV3TopPoolsViaGraph(limit = 30, chain: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[] | null> {
  try {
    const http = resolveSdkOptions('generic')
    const url = resolveUniswapV3GraphUrlByChain(chain)
    const query = `query TopPools {
      pools(first: ${Math.max(1, Math.min(100, limit))}, orderBy: totalValueLockedUSD, orderDirection: desc) {
        id
        feeTier
        totalValueLockedUSD
        token0 { id symbol }
        token1 { id symbol }
        poolDayData(orderBy: date, orderDirection: desc, first: 3) { volumeUSD }
      }
    }`
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const uniKey = process.env.UNISWAP_GRAPH_API_KEY || process.env.GRAPH_GATEWAY_API_KEY || process.env.AAVE_GRAPH_API_KEY
    if (uniKey) headers['x-api-key'] = uniKey
    const j = await fetchJsonWithRetry<{ data?: { pools?: UniswapV3PoolGql[] } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    const arr = j?.data?.pools || []
    const mapped: EvmPoolLike[] = arr.map((p) => {
      const tvl = Number(p.totalValueLockedUSD || 0)
      const feeBps = Number(p.feeTier || 0)
      const feeRate = Number.isFinite(feeBps) ? feeBps / 1_000_000 : 0 // 500=0.0005, 3000=0.003, 10000=0.01
      const volumes = (p.poolDayData || []).map(d => Number(d?.volumeUSD || 0)).filter(v => Number.isFinite(v) && v >= 0)
      const vAvg = volumes.length > 0 ? (volumes.reduce((a,b)=>a+b,0) / volumes.length) : 0
      const dailyApr = tvl > 0 ? (vAvg * feeRate) / tvl : 0
      const annualApr = dailyApr * 365
      const apyPct = Number.isFinite(annualApr) ? annualApr * 100 : 0
      return {
        protocol: 'uniswap-v3' as const,
        chain: chain as SupportedNetwork,
        address: p.id,
        name: `${p.token0.symbol}-${p.token1.symbol}`,
        tvlUsd: tvl,
        apy: apyPct,
        feeTier: feeBps,
        token0: p.token0.symbol,
        token1: p.token1.symbol,
        token0Address: (p as UniswapV3PoolGql & { token0: { id: string } }).token0.id,
        token1Address: (p as UniswapV3PoolGql & { token1: { id: string } }).token1.id,
        estimatedVolumeUsd24h: vAvg,
        sourceGraphUrl: url,
      }
    })
    return mapped
  } catch {
    return null
  }
}

async function fetchUniswapV3PoolsFallback(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['uniswap-v3'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'uniswap-v3',
    chain: (network || 'ethereum') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: e.apy,
    sourceGraphUrl: 'https://defillama.com',
  }))
}

async function fetchUniswapV3PoolsHybrid(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[] | null> {
  // 1) The Graph（チェーン別）
  const primaryNet: SupportedNetwork = (!network || network === 'all') ? 'ethereum' : network
  if (['ethereum','polygon','arbitrum','optimism','base'].includes(primaryNet)) {
    const viaGraph = await fetchUniswapV3TopPoolsViaGraph(limit, primaryNet).catch(() => null)
    if (viaGraph && viaGraph.length > 0) {
      // SDKオンチェーン補完（軽結合）: TVLとトークンアドレスがあるものだけ短期で補正
      const applyCount = Number(process.env.UNISWAP_V3_ONCHAIN_APPLY_COUNT || 20)
      const augmented = await Promise.all(viaGraph.slice(0, Math.max(1, Math.min(applyCount, viaGraph.length))).map(async (p) => {
        try {
          const apr = await estimateUniswapV3FeeAprFromOnchain({
            network: primaryNet,
            poolAddress: p.address as string,
            tvlUsd: Number(p.tvlUsd || 0),
            token0Address: p.token0Address,
            token1Address: p.token1Address,
          })
          return (typeof apr === 'number' && apr > 0) ? { ...p, apy: apr } : p
        } catch { return p }
      }))
      return augmented
    }
  }
  // 2) フォールバック（DefiLlama）
  return await fetchUniswapV3PoolsFallback(limit, network)
}

// PancakeSwap: 環境変数のAPI/Graphを優先 → フォールバック
async function fetchPancakePoolsViaApi(limit = 30, network: SupportedNetwork = 'bsc'): Promise<EvmPoolLike[] | null> {
  const url = process.env.PANCAKESWAP_POOLS_URL
  if (!url) return null
  try {
    const http = resolveSdkOptions('generic')
    const raw = await fetchJsonWithRetry<unknown>(
      url,
      { method: 'GET', headers: { 'accept': 'application/json' } },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    type LoosePool = { id?: unknown; address?: unknown; name?: unknown; symbol?: unknown; pair?: unknown; tvlUsd?: unknown; tvl_usd?: unknown; apy?: unknown; feeTier?: unknown; token0?: { symbol?: unknown } | null; token1?: { symbol?: unknown } | null }
    type PossibleRaw = { data?: unknown; pools?: unknown }
    const r = raw as PossibleRaw | unknown
    const dataField = (r as PossibleRaw)?.data
    const poolsField = (r as PossibleRaw)?.pools
    const list = Array.isArray(dataField) ? dataField
      : Array.isArray(raw as unknown[]) ? (raw as unknown[])
      : Array.isArray(poolsField) ? poolsField as unknown[]
      : []
    const arr: LoosePool[] = Array.isArray(list) ? list as LoosePool[] : []
    return arr.slice(0, Math.max(1, limit)).map((p, i) => ({
      protocol: 'uniswap-v3', // 表示互換のため。実質はPancake v3系でもここでは汎用表示
      chain: (network || 'bsc') as SupportedNetwork,
      address: String(p.address ?? p.id ?? `pcs-${i}`),
      name: String(p.name ?? p.symbol ?? p.pair ?? 'PCS Pool'),
      tvlUsd: Number(p.tvlUsd ?? p.tvl_usd ?? 0),
      apy: Number(p.apy ?? 0),
      feeTier: Number(p.feeTier ?? 0),
      token0: (p.token0 && typeof p.token0 === 'object' && typeof (p.token0 as { symbol?: unknown }).symbol === 'string') ? String((p.token0 as { symbol?: unknown }).symbol) : undefined,
      token1: (p.token1 && typeof p.token1 === 'object' && typeof (p.token1 as { symbol?: unknown }).symbol === 'string') ? String((p.token1 as { symbol?: unknown }).symbol) : undefined,
    }))
  } catch {
    return null
  }
}

function resolvePancakeGraphUrlByChain(chain: SupportedNetwork): string | undefined {
  const key = (chain || '').toLowerCase()
  if (key === 'bsc' || key === 'binance-smart-chain') return process.env.PANCAKESWAP_GRAPH_URL_BSC || process.env.PANCAKESWAP_GRAPH_URL
  if (key === 'ethereum' || key === 'eth') return process.env.PANCAKESWAP_GRAPH_URL_ETH || process.env.PANCAKESWAP_GRAPH_URL
  if (key === 'polygon') return process.env.PANCAKESWAP_GRAPH_URL_POLYGON || process.env.PANCAKESWAP_GRAPH_URL
  if (key === 'base') return process.env.PANCAKESWAP_GRAPH_URL_BASE || process.env.PANCAKESWAP_GRAPH_URL
  return process.env.PANCAKESWAP_GRAPH_URL
}

async function fetchPancakePoolsViaGraph(limit = 30, network: SupportedNetwork = 'bsc'): Promise<EvmPoolLike[] | null> {
  const url = resolvePancakeGraphUrlByChain(network)
  if (!url) return null
  try {
    const http = resolveSdkOptions('generic')
    const query = `query TopPools { pools(first: ${Math.max(1, Math.min(100, limit))}, orderBy: totalValueLockedUSD, orderDirection: desc) { id feeTier totalValueLockedUSD token0 { symbol } token1 { symbol } poolDayData(orderBy: date, orderDirection: desc, first: 3) { volumeUSD } } }`
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (process.env.PANCAKESWAP_GRAPH_API_KEY) headers['x-api-key'] = process.env.PANCAKESWAP_GRAPH_API_KEY
    const j = await fetchJsonWithRetry<{ data?: { pools?: UniswapV3PoolGql[] } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    const arr = j?.data?.pools || []
    return arr.map((p) => {
      const tvl = Number(p.totalValueLockedUSD || 0)
      const feeBps = Number(p.feeTier || 0)
      const feeRate = Number.isFinite(feeBps) ? feeBps / 1_000_000 : 0
      const vols = (p.poolDayData || []).map(d => Number(d?.volumeUSD || 0)).filter(v => Number.isFinite(v) && v >= 0)
      const vAvg = vols.length > 0 ? (vols.reduce((a,b)=>a+b,0) / vols.length) : 0
      const dailyApr = tvl > 0 ? (vAvg * feeRate) / tvl : 0
      const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
      return {
        protocol: 'pancakeswap-v3',
        chain: network as SupportedNetwork,
        address: p.id,
        name: `${p.token0.symbol}-${p.token1.symbol}`,
        tvlUsd: tvl,
        apy: apyPct,
        feeTier: feeBps,
        token0: p.token0.symbol,
        token1: p.token1.symbol,
        estimatedVolumeUsd24h: vAvg,
        sourceGraphUrl: url,
      }
    })
  } catch {
    return null
  }
}

async function fetchPancakePoolsHybrid(limit = 30, network: SupportedNetwork = 'bsc'): Promise<EvmPoolLike[] | null> {
  // 1) API
  const viaApi = await fetchPancakePoolsViaApi(limit, network).catch(() => null)
  if (viaApi && viaApi.length > 0) return viaApi
  // 2) Graph（チェーン別URL切替: PANCAKESWAP_GRAPH_URL_BSC/ETH/POLYGON/BASE）
  const viaGraph = await fetchPancakePoolsViaGraph(limit, network).catch(() => null)
  if (viaGraph && viaGraph.length > 0) return viaGraph
  // DefiLlamaフォールバック
  return await fetchUniswapV3PoolsFallback(limit, network)
}

// 共通: V2系Graphからfee APR推定（pairs/reserveUSD/pairDayData.volumeUSD）
async function fetchV2StylePoolsViaGraph(params: {
  url: string
  protocol: string
  chain: SupportedNetwork
  limit?: number
  feeRate?: number // 例: 0.003
}): Promise<EvmPoolLike[] | null> {
  try {
    const { url, protocol, chain } = params
    const limit = Math.max(1, Math.min(100, params.limit || 30))
    const feeRate = typeof params.feeRate === 'number' && params.feeRate >= 0 ? params.feeRate : 0.003
    const http = resolveSdkOptions('generic')
    const query = `query TopPairs {
      pairs(first: ${limit}, orderBy: reserveUSD, orderDirection: desc) {
        id
        reserveUSD
        token0 { id symbol }
        token1 { id symbol }
        pairDayData(orderBy: date, orderDirection: desc, first: 3) { volumeUSD }
      }
    }`
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const protoKeyName = `${protocol.toUpperCase().replace(/[^A-Z0-9_]/g, '_')}_GRAPH_API_KEY`
    const apiKey = (process.env as Record<string, string | undefined>)[protoKeyName] || process.env.GRAPH_GATEWAY_API_KEY || process.env.AAVE_GRAPH_API_KEY
    if (apiKey) headers['x-api-key'] = apiKey
    const j = await fetchJsonWithRetry<{ data?: { pairs?: Array<{ id: string; reserveUSD?: string; token0?: { id: string; symbol: string }; token1?: { id: string; symbol: string }; pairDayData?: Array<{ volumeUSD?: string }> }> } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    const arr = j?.data?.pairs || []
    return arr.map((p, idx) => {
      const tvl = Number(p.reserveUSD || 0)
      const vols = (p.pairDayData || []).map(d => Number(d?.volumeUSD || 0)).filter(v => Number.isFinite(v) && v >= 0)
      const vAvg = vols.length > 0 ? (vols.reduce((a,b)=>a+b,0) / vols.length) : 0
      const dailyApr = tvl > 0 ? (vAvg * feeRate) / tvl : 0
      const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
      const t0 = p.token0?.symbol || 'T0'
      const t1 = p.token1?.symbol || 'T1'
      return {
        protocol,
        chain,
        address: p.id,
        name: `${t0}-${t1}`,
        tvlUsd: tvl,
        apy: apyPct,
        token0: t0,
        token1: t1,
        token0Address: p.token0?.id,
        token1Address: p.token1?.id,
        sourceGraphUrl: url,
      }
    })
  } catch {
    return null
  }
}

// 共通: v3系Graphからfee APR推定（pools/totalValueLockedUSD/poolDayData.volumeUSD/feeTier）
async function fetchV3StylePoolsViaGraph(params: {
  url: string
  protocol: string
  chain: SupportedNetwork
  limit?: number
}): Promise<EvmPoolLike[] | null> {
  try {
    const { url, protocol, chain } = params
    const limit = Math.max(1, Math.min(100, params.limit || 30))
    const http = resolveSdkOptions('generic')
    const query = `query TopPools {
      pools(first: ${limit}, orderBy: totalValueLockedUSD, orderDirection: desc) {
        id
        feeTier
        totalValueLockedUSD
        token0 { id symbol }
        token1 { id symbol }
        poolDayData(orderBy: date, orderDirection: desc, first: 3) { volumeUSD }
      }
    }`
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const protoKeyName = `${protocol.toUpperCase().replace(/[^A-Z0-9_]/g, '_')}_GRAPH_API_KEY`
    const apiKey = (process.env as Record<string, string | undefined>)[protoKeyName] || process.env.GRAPH_GATEWAY_API_KEY || process.env.AAVE_GRAPH_API_KEY || process.env.PANCAKESWAP_GRAPH_API_KEY
    if (apiKey) headers['x-api-key'] = apiKey
    const j = await fetchJsonWithRetry<{ data?: { pools?: Array<{ id: string; feeTier?: string | number; totalValueLockedUSD?: string; token0?: { id: string; symbol: string }; token1?: { id: string; symbol: string }; poolDayData?: Array<{ volumeUSD?: string }> }> } }>(
      url,
      { method: 'POST', headers, body: JSON.stringify({ query }) },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    const arr = j?.data?.pools || []
    return arr.map((p) => {
      const tvl = Number(p.totalValueLockedUSD || 0)
      const feeBps = Number(p.feeTier || 0)
      const feeRate = Number.isFinite(feeBps) ? feeBps / 1_000_000 : 0
      const vols = (p.poolDayData || []).map(d => Number(d?.volumeUSD || 0)).filter(v => Number.isFinite(v) && v >= 0)
      const vAvg = vols.length > 0 ? (vols.reduce((a,b)=>a+b,0) / vols.length) : 0
      const dailyApr = tvl > 0 ? (vAvg * feeRate) / tvl : 0
      const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
      const t0 = p.token0?.symbol || 'T0'
      const t1 = p.token1?.symbol || 'T1'
      return {
        protocol,
        chain,
        address: p.id,
        name: `${t0}-${t1}`,
        tvlUsd: tvl,
        apy: apyPct,
        feeTier: feeBps,
        token0: t0,
        token1: t1,
        token0Address: p.token0?.id,
        token1Address: p.token1?.id,
        sourceGraphUrl: url,
      }
    })
  } catch {
    return null
  }
}

// Sushi (V2系)
async function fetchSushiPools(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[] | null> {
  const url = process.env.SUSHISWAP_GRAPH_URL
  if (!url) return null
  const fee = Number(process.env.SUSHISWAP_FEE_DEFAULT_BPS || '300') / 1_000_00
  return await fetchV2StylePoolsViaGraph({ url, protocol: 'sushiswap', chain: network, limit, feeRate: fee || 0.003 })
}

// QuickSwap（v3優先→v2フォールバック）
async function fetchQuickSwapPools(limit = 30, network: SupportedNetwork = 'polygon'): Promise<EvmPoolLike[] | null> {
  const v3 = process.env.QUICKSWAP_GRAPH_URL
  const v2 = process.env.QUICKSWAP_V2_GRAPH_URL
  const viaV3 = v3 ? await fetchV3StylePoolsViaGraph({ url: v3, protocol: 'quickswap-v3', chain: network, limit }).catch(() => null) : null
  if (viaV3 && viaV3.length > 0) return viaV3
  if (!v2) return null
  const fee = Number(process.env.QUICKSWAP_V2_FEE_DEFAULT_BPS || '300') / 1_000_00
  return await fetchV2StylePoolsViaGraph({ url: v2, protocol: 'quickswap', chain: network, limit, feeRate: fee || 0.003 })
}

// Velodrome v2（V2系、手数料は可変のためデフォルトは環境変数に委譲）
async function fetchVelodromePools(limit = 30, network: SupportedNetwork = 'optimism'): Promise<EvmPoolLike[] | null> {
  const url = process.env.VELODROME_GRAPH_URL
  if (!url) return null
  const fee = Number(process.env.VELODROME_FEE_DEFAULT_BPS || '300') / 1_000_00
  return await fetchV2StylePoolsViaGraph({ url, protocol: 'velodrome', chain: network, limit, feeRate: fee || 0.003 })
}

// Camelot（V3優先→V2フォールバック）
async function fetchCamelotPools(limit = 30, network: SupportedNetwork = 'arbitrum'): Promise<EvmPoolLike[] | null> {
  const v3 = process.env.CAMELOT_GRAPH_URL
  const v2 = process.env.CAMELOT_V2_GRAPH_URL
  const viaV3 = v3 ? await fetchV3StylePoolsViaGraph({ url: v3, protocol: 'camelot-v3', chain: network, limit }).catch(() => null) : null
  if (viaV3 && viaV3.length > 0) return viaV3
  if (!v2) return null
  const fee = Number(process.env.CAMELOT_V2_FEE_DEFAULT_BPS || '300') / 1_000_00
  return await fetchV2StylePoolsViaGraph({ url: v2, protocol: 'camelot', chain: network, limit, feeRate: fee || 0.003 })
}

// Trader Joe（v2.1/LPB優先→V2フォールバック）
async function fetchTraderJoePools(limit = 30, network: SupportedNetwork = 'avalanche'): Promise<EvmPoolLike[] | null> {
  const lb = process.env.TRADERJOE_GRAPH_URL
  const v2 = process.env.TRADERJOE_V2_GRAPH_URL
  // v3/2.1 はスキーマ差異が大きいため、まずはV2様式に漸近（reserveUSD/pairDayData）
  const viaV2 = lb ? await fetchV2StylePoolsViaGraph({ url: lb, protocol: 'trader-joe', chain: network, limit, feeRate: Number(process.env.TRADERJOE_FEE_DEFAULT_BPS || '250') / 1_000_00 || 0.0025 }).catch(() => null) : null
  if (viaV2 && viaV2.length > 0) return viaV2
  if (!v2) return null
  const fee = Number(process.env.TRADERJOE_V2_FEE_DEFAULT_BPS || '250') / 1_000_00
  return await fetchV2StylePoolsViaGraph({ url: v2, protocol: 'trader-joe', chain: network, limit, feeRate: fee || 0.0025 })
}

// Curve（V2系相当、feeRateはチェーン毎に環境変数で上書き可能。デフォルトは0.0004 = 4bps）
async function fetchCurvePools(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[] | null> {
  const url = process.env.CURVE_GRAPH_URL
  if (!url) return null
  const fee = Number(process.env.CURVE_FEE_DEFAULT_BPS || '4') / 1_000_00 // 4bps=0.0004
  return await fetchV2StylePoolsViaGraph({ url, protocol: 'curve', chain: network, limit, feeRate: fee || 0.0004 })
}

// Aave（当面はDefiLlamaフォールバック。後日The Graph V3の利回り指標に置換予定）
async function fetchAavePools(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[] | null> {
  try {
    const items = await fetchDexPools(['aave-v3','aave-v2','aave'], network).catch(() => [])
    return items.slice(0, Math.max(1, limit)).map((e) => ({
      protocol: 'aave',
      chain: (network || 'ethereum') as SupportedNetwork,
      address: e.address || e.id,
      name: e.name,
      tvlUsd: e.totalStakedUsd,
      apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
      sourceGraphUrl: 'https://defillama.com',
    }))
  } catch {
    return null
  }
}

registerAdapter('evm.uniswap.pools', async (options) => {
  const network = (options.network || 'ethereum') as SupportedNetwork
  if (network === 'all') {
    const chains: SupportedNetwork[] = ['ethereum','polygon','arbitrum','optimism','base']
    const lists = await Promise.all(chains.map((ch) => fetchUniswapV3PoolsHybrid(30, ch).catch(() => null)))
    const merged: EvmPoolLike[] = []
    for (const li of lists) { if (Array.isArray(li)) merged.push(...li) }
    return merged
  }
  return await fetchUniswapV3PoolsHybrid(30, network)
})

// 主要EVM DEXの簡易アダプタ（現在はDefiLlamaフォールバック経由）
// Llamaフォールバック（各DEX専用）
async function fetchSushiPoolsFallback(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['sushi','sushiswap'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'sushiswap',
    chain: (network || 'ethereum') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
    sourceGraphUrl: 'https://defillama.com',
  }))
}

async function fetchQuickSwapPoolsFallback(limit = 30, network: SupportedNetwork = 'polygon'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['quickswap','quick'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'quickswap',
    chain: (network || 'polygon') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
    sourceGraphUrl: 'https://defillama.com',
  }))
}

async function fetchVelodromePoolsFallback(limit = 30, network: SupportedNetwork = 'optimism'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['velodrome'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'velodrome',
    chain: (network || 'optimism') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
    sourceGraphUrl: 'https://defillama.com',
  }))
}

async function fetchCamelotPoolsFallback(limit = 30, network: SupportedNetwork = 'arbitrum'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['camelot'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'camelot',
    chain: (network || 'arbitrum') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
    sourceGraphUrl: 'https://defillama.com',
  }))
}

async function fetchTraderJoePoolsFallback(limit = 30, network: SupportedNetwork = 'avalanche'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['trader-joe','traderjoe','joe-v2'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'trader-joe',
    chain: (network || 'avalanche') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
    sourceGraphUrl: 'https://defillama.com',
  }))
}

async function fetchCurvePoolsFallback(limit = 30, network: SupportedNetwork = 'ethereum'): Promise<EvmPoolLike[]> {
  const items = await fetchDexPools(['curve','curve-v2'], network).catch(() => [])
  return items.slice(0, Math.max(1, limit)).map((e) => ({
    protocol: 'curve',
    chain: (network || 'ethereum') as SupportedNetwork,
    address: e.address || e.id,
    name: e.name,
    tvlUsd: e.totalStakedUsd,
    apy: typeof e.netApy === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : 0),
    sourceGraphUrl: 'https://defillama.com',
  }))
}

registerAdapter('evm.sushiswap.pools', async (options) => {
  const network = (options.network || 'ethereum') as SupportedNetwork
  return await fetchSushiPools(30, network) || await fetchSushiPoolsFallback(30, network)
})
registerAdapter('evm.quickswap.pools', async (options) => {
  const network = (options.network || 'polygon') as SupportedNetwork
  return await fetchQuickSwapPools(30, network) || await fetchQuickSwapPoolsFallback(30, network)
})
registerAdapter('evm.velodrome.pools', async (options) => {
  const network = (options.network || 'optimism') as SupportedNetwork
  return await fetchVelodromePools(30, network) || await fetchVelodromePoolsFallback(30, network)
})
registerAdapter('evm.camelot.pools', async (options) => {
  const network = (options.network || 'arbitrum') as SupportedNetwork
  return await fetchCamelotPools(30, network) || await fetchCamelotPoolsFallback(30, network)
})
registerAdapter('evm.traderjoe.pools', async (options) => {
  const network = (options.network || 'avalanche') as SupportedNetwork
  return await fetchTraderJoePools(30, network) || await fetchTraderJoePoolsFallback(30, network)
})
registerAdapter('evm.pancakeswap.pools', async (options) => {
  const network = (options.network || 'bsc') as SupportedNetwork
  return await fetchPancakePoolsHybrid(30, network)
})
registerAdapter('evm.curve.pools', async (options) => {
  const network = (options.network || 'ethereum') as SupportedNetwork
  return await fetchCurvePools(30, network) || await fetchCurvePoolsFallback(30, network)
})
registerAdapter('evm.aave.pools', async (options) => {
  const network = (options.network || 'ethereum') as SupportedNetwork
  return await fetchAaveViaGraph(30, network) || await fetchAavePools(30, network) || await fetchUniswapV3PoolsFallback(30, network)
})
