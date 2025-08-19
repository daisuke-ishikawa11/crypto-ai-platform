// 外部DEX統合（拡張用アダプタ）
// 現在は Uniswap V3 のみ実装。他DEXは空配列を返しフェイルソフト。

export type ExternalFarmLike = {
  id: string
  protocol: { id: string; name: string; type: string; blockchain: string; website: string; auditScore: number | null; riskScore: number | null }
  name: string
  address: string
  stakingToken: string
  rewardTokens: string[]
  apy: number
  apr: number
  baseApy: number
  rewardApy: number
  effectiveApy: number
  riskAdjustedApy: number
  netApy: number
  dailyYield: number
  weeklyYield: number
  monthlyYield: number
  totalStakedUsd: number
  participantCount: number
  dailyRewardsUsd: number
  lockPeriodDays: number
  depositFeePercent: number
  withdrawalFeePercent: number
  totalFeePercent: number
  autoCompound: boolean
  compoundFrequencyHours: number | undefined
  compoundFrequencyText: string | null
  riskLevel: 'very_low' | 'low' | 'medium' | 'high' | 'very_high'
  opportunityScore: number
  healthScore: number
  sustainabilityScore: number
  status: string
  isActive: boolean
  startedAt: string | undefined
  endsAt: string | undefined
  timeRemaining: string | null
  trends: { apyTrend: string; apyChange7d: number; apyChange30d: number; tvlTrend: string; tvlChange7d: number; tvlChange30d: number; participantsTrend: string; volatility: number }
  lastUpdated: string
  createdAt: string | undefined
  isHighYield: boolean
  isStable: boolean
  hasLockPeriod: boolean
  hasDepositFee: boolean
  hasWithdrawalFee: boolean
  isNewFarm: boolean
  isEndingSoon: boolean
}

async function fetchUniswapV3TopPools(network?: string): Promise<ExternalFarmLike[]> {
  // 現時点では Ethereum のみ対応
  if (network && network !== 'all' && network !== 'ethereum') return []
  try {
    const gql = `
      query {
        pools(first: 15, orderBy: totalValueLockedUSD, orderDirection: desc) {
          id
          feeTier
          totalValueLockedUSD
          token0 { symbol }
          token1 { symbol }
          poolDayData(first: 1, orderBy: date, orderDirection: desc) { volumeUSD }
        }
      }
    `
    const j = await fetchJsonWithRetry<{ data?: { pools?: Array<{ id: string; feeTier: number; totalValueLockedUSD: string; token0: { symbol: string }; token1: { symbol: string }; poolDayData?: Array<{ volumeUSD?: string }> }> } }>(
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: gql }) },
      { retries: HTTP_RETRIES, backoffMs: HTTP_BACKOFF_MS, timeoutMs: HTTP_TIMEOUT_MS }
    )
    const pools = j?.data?.pools || []
    const mapped: ExternalFarmLike[] = pools.map(p => {
      const tvl = Number(p.totalValueLockedUSD || 0)
      const vol24 = Number(p.poolDayData?.[0]?.volumeUSD || 0)
      const fee = (p.feeTier || 0) / 1_000_000
      const feeApr = tvl > 0 ? ((vol24 * fee) / tvl) * 365 * 100 : 0
      const name = `${p.token0?.symbol || ''}/${p.token1?.symbol || ''}`
      const apy = Math.round(feeApr * 100) / 100
      const toPct = (v: number) => Math.round(v * 100) / 100
      return {
        id: `univ3:${p.id}`,
        protocol: { id: 'uniswap-v3', name: 'Uniswap V3', type: 'DEX', blockchain: 'ethereum', website: 'https://app.uniswap.org', auditScore: null, riskScore: null },
        name,
        address: p.id,
        stakingToken: `${name} LP`,
        rewardTokens: [],
        apy,
        apr: apy,
        baseApy: apy,
        rewardApy: 0,
        effectiveApy: apy,
        riskAdjustedApy: apy,
        netApy: apy,
        dailyYield: toPct((feeApr/100) / 365 * 100),
        weeklyYield: toPct((feeApr/100) / 52 * 100),
        monthlyYield: toPct((feeApr/100) / 12 * 100),
        totalStakedUsd: tvl,
        participantCount: 0,
        dailyRewardsUsd: vol24 * fee,
        lockPeriodDays: 0,
        depositFeePercent: 0,
        withdrawalFeePercent: 0,
        totalFeePercent: 0,
        autoCompound: false,
        compoundFrequencyHours: undefined,
        compoundFrequencyText: null,
        riskLevel: 'medium',
        opportunityScore: 0,
        healthScore: 0,
        sustainabilityScore: 0,
        status: 'active',
        isActive: true,
        startedAt: undefined,
        endsAt: undefined,
        timeRemaining: null,
        trends: { apyTrend: 'stable', apyChange7d: 0, apyChange30d: 0, tvlTrend: 'stable', tvlChange7d: 0, tvlChange30d: 0, participantsTrend: 'stable', volatility: 0 },
        lastUpdated: new Date().toISOString(),
        createdAt: undefined,
        isHighYield: apy > 100,
        isStable: apy < 20,
        hasLockPeriod: false,
        hasDepositFee: false,
        hasWithdrawalFee: false,
        isNewFarm: false,
        isEndingSoon: false
      }
    })
    return mapped
  } catch {
    return []
  }
}

// 簡易キャッシュ（プロセス内）
const cache = new Map<string, { t: number; data: ExternalFarmLike[] }>()
const TTL_MS = (() => {
  const v = Number(process.env.DEX_INTEGRATIONS_TTL_MS)
  return Number.isFinite(v) && v > 0 ? v : 60_000
})()

// HTTP制御（リトライ/タイムアウト/バックオフ）
const HTTP_TIMEOUT_MS = (() => {
  const v = Number(process.env.DEX_HTTP_TIMEOUT_MS)
  return Number.isFinite(v) && v > 0 ? v : 8_000
})()
const HTTP_RETRIES = (() => {
  const v = Number(process.env.DEX_HTTP_RETRIES)
  return Number.isFinite(v) && v >= 0 ? Math.min(5, v) : 2
})()
const HTTP_BACKOFF_MS = (() => {
  const v = Number(process.env.DEX_HTTP_BACKOFF_MS)
  return Number.isFinite(v) && v >= 0 ? v : 400
})()

import { fetchJsonWithRetry } from '@/lib/utils/http'

export async function fetchDexPools(keys: string[], network?: string): Promise<ExternalFarmLike[]> {
  const normKeys = keys.map(s => s.toLowerCase().trim()).filter(Boolean)
  const cacheKey = `${normKeys.sort().join(',')}|${network || 'all'}`
  const now = Date.now()
  const hit = cache.get(cacheKey)
  if (hit && now - hit.t < TTL_MS) return hit.data

  const out: ExternalFarmLike[] = []
  for (const key of normKeys) {
    if (key === 'uniswap-v3' || key === 'uniswap' || key === 'uni') {
      const d = await fetchUniswapV3TopPools(network)
      out.push(...d)
      continue
    }
    // DefiLlama Yields API 経由（実装はベストエフォート、形式不一致時は空配列）
    const llamaProjects = ({
      'pancakeswap-amm-v3': ['pancakeswap'],
      'pancakeswap': ['pancakeswap'],
      'sushiswap': ['sushiswap','sushi'],
      'quickswap-dex': ['quickswap'],
      'quickswap': ['quickswap'],
      'camelot-v3': ['camelot'],
      'camelot': ['camelot'],
      'velodrome-v2': ['velodrome'],
      'velodrome': ['velodrome'],
      'joe-v2.1': ['trader-joe','joe'],
      'trader-joe': ['trader-joe','joe'],
      'raydium-amm': ['raydium'],
      'raydium': ['raydium'],
      'orca-dex': ['orca'],
      'orca': ['orca'],
      'curve': ['curve','curve-dex'],
      'curve-dex': ['curve','curve-dex'],
      'convex': ['convex-finance','convex']
    } as Record<string,string[]>)
    const proj = llamaProjects[key]
    if (proj) {
      const d = await fetchDefiLlamaYields(proj, network)
      out.push(...d)
    }
  }
  cache.set(cacheKey, { t: now, data: out })
  return out
}

async function fetchDefiLlamaYields(projectKeys: string[], network?: string): Promise<ExternalFarmLike[]> {
  try {
    const raw = await fetchJsonWithRetry<unknown>(
      'https://yields.llama.fi/pools',
      { method: 'GET', headers: { 'accept': 'application/json' } },
      { retries: HTTP_RETRIES, backoffMs: HTTP_BACKOFF_MS, timeoutMs: HTTP_TIMEOUT_MS }
    )
    let arr: unknown[] = []
    if (typeof raw === 'object' && raw !== null) {
      const d = (raw as { data?: unknown }).data
      if (Array.isArray(d)) arr = d as unknown[]
    }
    const set = new Set(projectKeys.map(s => s.toLowerCase()))
    const filtered = arr.map(o => (o || {}) as Record<string, unknown>).filter(o => {
      const proj = String(o.project || '').toLowerCase()
      if (!set.has(proj)) return false
      if (network && network !== 'all') {
        const ch = String(o.chain || '').toLowerCase()
        return ch === network.toLowerCase()
      }
      return true
    })
    const out: ExternalFarmLike[] = filtered.map((o) => {
      const apy = typeof o.apy === 'number' ? (o.apy as number) : Number(o.apy || 0)
      const apyBase = typeof o.apyBase === 'number' ? (o.apyBase as number) : Number(o.apyBase || 0)
      const apyReward = typeof o.apyReward === 'number' ? (o.apyReward as number) : Number(o.apyReward || 0)
      const tvl = typeof o.tvlUsd === 'number' ? (o.tvlUsd as number) : Number(o.tvlUsd || 0)
      const rewardTokens = Array.isArray(o.rewardTokens) ? (o.rewardTokens as unknown[]).map(String) : []
      const name = String(o.symbol || o.pool || 'Pool')
      const chain = String(o.chain || 'multi').toLowerCase()
      const protocolName = String(o.project || 'DEX')
      const toPct = (v: number) => Math.round(v * 100) / 100
      const baseApy = apyBase || Math.max(0, apy - apyReward)
      const eff = apy
      return {
        id: `llama:${String(o.pool || Math.random())}`,
        protocol: { id: protocolName.toLowerCase().replace(/\s+/g, '-'), name: protocolName, type: 'DEX', blockchain: chain, website: String(o.url || ''), auditScore: null, riskScore: null },
        name,
        address: String(o.pool || ''),
        stakingToken: name,
        rewardTokens,
        apy: toPct(apy),
        apr: toPct(apy),
        baseApy: toPct(baseApy),
        rewardApy: toPct(apyReward),
        effectiveApy: toPct(eff),
        riskAdjustedApy: toPct(eff),
        netApy: toPct(eff),
        dailyYield: toPct((apy/100) / 365 * 100),
        weeklyYield: toPct((apy/100) / 52 * 100),
        monthlyYield: toPct((apy/100) / 12 * 100),
        totalStakedUsd: tvl,
        participantCount: 0,
        dailyRewardsUsd: tvl * (apy/100) / 365,
        lockPeriodDays: 0,
        depositFeePercent: 0,
        withdrawalFeePercent: 0,
        totalFeePercent: 0,
        autoCompound: false,
        compoundFrequencyHours: undefined,
        compoundFrequencyText: null,
        riskLevel: 'medium',
        opportunityScore: 0,
        healthScore: 0,
        sustainabilityScore: 0,
        status: 'active',
        isActive: true,
        startedAt: undefined,
        endsAt: undefined,
        timeRemaining: null,
        trends: { apyTrend: 'stable', apyChange7d: 0, apyChange30d: 0, tvlTrend: 'stable', tvlChange7d: 0, tvlChange30d: 0, participantsTrend: 'stable', volatility: 0 },
        lastUpdated: new Date().toISOString(),
        createdAt: undefined,
        isHighYield: apy > 100,
        isStable: apy < 20,
        hasLockPeriod: false,
        hasDepositFee: false,
        hasWithdrawalFee: false,
        isNewFarm: false,
        isEndingSoon: false
      }
    })
    return out
  } catch {
    return []
  }
}
