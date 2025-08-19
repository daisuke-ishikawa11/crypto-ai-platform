const DEFI_LLAMA_BASE = 'https://api.llama.fi'

export type ProtocolHistoryPoint = {
  date: number // unix seconds
  tvlUsd: number
}

type LlamaProtocolSeriesPoint = { date: number; totalLiquidityUSD: number }

const cache: Record<string, { data: ProtocolHistoryPoint[]; fetchedAt: number }> = {}
const DEFAULT_TTL_MS = 60_000

export async function fetchProtocolTvlHistory(slug: string, days?: number, ttlMs: number = DEFAULT_TTL_MS): Promise<ProtocolHistoryPoint[]> {
  const key = `${slug}|${days ?? 'all'}`
  const now = Date.now()
  const cached = cache[key]
  if (cached && now - cached.fetchedAt < ttlMs) return cached.data

  const resp = await fetch(`${DEFI_LLAMA_BASE}/protocol/${encodeURIComponent(slug)}`)
  if (!resp.ok) return cached?.data ?? []
  const json = await resp.json() as { tvl?: LlamaProtocolSeriesPoint[] }
  const series = Array.isArray(json.tvl) ? json.tvl : []
  let points = series.map<ProtocolHistoryPoint>(p => ({ date: p.date, tvlUsd: p.totalLiquidityUSD }))
  if (typeof days === 'number' && days > 0) {
    const cutoff = Math.floor(Date.now() / 1000) - days * 86400
    points = points.filter(p => p.date >= cutoff)
  }
  cache[key] = { data: points, fetchedAt: now }
  return points
}
