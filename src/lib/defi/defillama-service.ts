import type { ProtocolNormalized } from './types'

const DEFI_LLAMA_BASE = 'https://api.llama.fi'

let cachedProtocols: { data: ProtocolNormalized[]; fetchedAt: number } | null = null
const DEFAULT_TTL_MS = 60_000 // 1 minute cache

type LlamaProtocol = {
  name: string
  slug: string
  tvl: number
  chains: string[]
  category?: string
  url?: string
}

export async function fetchTopProtocols(limit = 50, ttlMs: number = DEFAULT_TTL_MS): Promise<ProtocolNormalized[]> {
  const now = Date.now()
  if (cachedProtocols && now - cachedProtocols.fetchedAt < ttlMs) {
    return cachedProtocols.data.slice(0, limit)
  }
  const resp = await fetch(`${DEFI_LLAMA_BASE}/protocols`)
  if (!resp.ok) return cachedProtocols?.data?.slice(0, limit) ?? []
  const data = (await resp.json()) as LlamaProtocol[]
  const normalizedAll = data
    .filter(p => typeof p.tvl === 'number' && p.tvl > 0)
    .sort((a, b) => b.tvl - a.tvl)
    .map<ProtocolNormalized>(p => ({
      id: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
      name: p.name,
      slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
      chains: p.chains || [],
      categories: p.category ? [p.category] : [],
      tvlUsd: p.tvl,
      url: p.url
    }))
  cachedProtocols = { data: normalizedAll, fetchedAt: now }
  return normalizedAll.slice(0, limit)
}

let protocolsMetaCache: { chains: string[]; categories: string[]; projects: string[]; fetchedAt: number } | null = null

export async function fetchProtocolsMeta(ttlMs: number = DEFAULT_TTL_MS): Promise<{ chains: string[]; categories: string[]; projects: string[] }> {
  const now = Date.now()
  if (protocolsMetaCache && now - protocolsMetaCache.fetchedAt < ttlMs) {
    return { chains: protocolsMetaCache.chains, categories: protocolsMetaCache.categories, projects: protocolsMetaCache.projects }
  }
  const resp = await fetch(`${DEFI_LLAMA_BASE}/protocols`)
  if (!resp.ok) return protocolsMetaCache ? { chains: protocolsMetaCache.chains, categories: protocolsMetaCache.categories, projects: protocolsMetaCache.projects } : { chains: [], categories: [], projects: [] }
  const data = (await resp.json()) as LlamaProtocol[]
  const chainSet = new Set<string>()
  const categorySet = new Set<string>()
  const projectSet = new Set<string>()
  for (const p of data) {
    for (const c of (p.chains || [])) chainSet.add(c)
    if (p.category) categorySet.add(p.category)
    if (p.slug) projectSet.add(p.slug)
  }
  const chains = Array.from(chainSet).sort((a, b) => a.localeCompare(b))
  const categories = Array.from(categorySet).sort((a, b) => a.localeCompare(b))
  const projects = Array.from(projectSet).sort((a, b) => a.localeCompare(b))
  protocolsMetaCache = { chains, categories, projects, fetchedAt: now }
  return { chains, categories, projects }
}
