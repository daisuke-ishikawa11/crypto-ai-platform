// Local type to avoid touching global types (user rejected global changes)
interface LocalPoolNormalized {
  id: string
  project: string
  chain: string
  symbol?: string
  tvlUsd?: number
  apy?: number
  apyBase?: number
  apyReward?: number
  rewardTokens?: string[]
  url?: string
  underlyingTokens?: string[]
}

const DEFI_LLAMA_YIELDS = 'https://yields.llama.fi'

type LlamaPool = {
  chain: string
  project: string
  symbol?: string
  tvlUsd?: number
  apy?: number
  apyBase?: number
  apyReward?: number
  rewardTokens?: string[]
  url?: string
  underlyingTokens?: string[]
}

let poolsCache: { data: LlamaPool[]; fetchedAt: number } | null = null
const DEFAULT_TTL_MS = 60_000

export async function fetchPools(options?: { chain?: string; project?: string; limit?: number; ttlMs?: number }): Promise<LocalPoolNormalized[]> {
  const ttlMs = options?.ttlMs ?? DEFAULT_TTL_MS
  const now = Date.now()
  if (!poolsCache || now - poolsCache.fetchedAt >= ttlMs) {
    const resp = await fetch(`${DEFI_LLAMA_YIELDS}/pools`)
    if (!resp.ok) return []
    const parsed = (await resp.json()) as { data?: LlamaPool[] }
    poolsCache = { data: parsed.data || [], fetchedAt: now }
  }
  const json = { data: poolsCache.data } as { data?: LlamaPool[] }
  const pools = (json.data || []).map<LocalPoolNormalized>(p => ({
    id: `${(p.project || 'unknown')}-${(p.chain || 'unknown')}-${(p.symbol || 'pool')}`.toLowerCase(),
    project: p.project,
    chain: p.chain,
    symbol: p.symbol,
    tvlUsd: p.tvlUsd,
    apy: p.apy,
    apyBase: p.apyBase,
    apyReward: p.apyReward,
    rewardTokens: p.rewardTokens,
    url: p.url,
    underlyingTokens: p.underlyingTokens,
  }))

  const chain = options?.chain?.toLowerCase()
  const project = options?.project?.toLowerCase()
  let filtered = pools.filter(p => {
    const okChain = chain ? p.chain?.toLowerCase() === chain : true
    const okProject = project ? p.project?.toLowerCase() === project : true
    return okChain && okProject
  })
  const limit = options?.limit && options.limit > 0 ? options.limit : 200
  if (filtered.length > limit) {
    filtered = filtered.slice(0, limit)
  }
  return filtered
}

let poolsMetaCache: { chains: string[]; projects: string[]; fetchedAt: number } | null = null
const META_TTL_MS = 60_000

export async function fetchPoolsMeta(ttlMs: number = META_TTL_MS): Promise<{ chains: string[]; projects: string[] }> {
  const now = Date.now()
  if (poolsMetaCache && now - poolsMetaCache.fetchedAt < ttlMs) {
    return { chains: poolsMetaCache.chains, projects: poolsMetaCache.projects }
  }
  const resp = await fetch(`${DEFI_LLAMA_YIELDS}/pools`)
  if (!resp.ok) return poolsMetaCache ? { chains: poolsMetaCache.chains, projects: poolsMetaCache.projects } : { chains: [], projects: [] }
  const json = (await resp.json()) as { data?: LlamaPool[] }
  const pools = json.data || []
  const chainSet = new Set<string>()
  const projectSet = new Set<string>()
  for (const p of pools) {
    if (p.chain) chainSet.add(p.chain)
    if (p.project) projectSet.add(p.project)
  }
  const chains = Array.from(chainSet).sort((a, b) => a.localeCompare(b))
  const projects = Array.from(projectSet).sort((a, b) => a.localeCompare(b))
  poolsMetaCache = { chains, projects, fetchedAt: now }
  return { chains, projects }
}
