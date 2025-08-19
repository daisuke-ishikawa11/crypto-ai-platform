import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { rateLimit, requireInternalAuth } from '@/lib/security/api-guard'
import { z } from 'zod'
import { withCache } from '@/lib/cache'

type RiskLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high'

interface PoolRow { id: string; protocol_id: string; pool_address: string; pool_name: string; pool_type: string; token_0_address: string; token_0_symbol: string; token_0_name: string; token_1_address: string; token_1_symbol: string; token_1_name: string; total_liquidity_usd: number | null; volume_24h_usd: number | null; volume_7d_usd: number | null; fees_24h_usd: number | null; apy: number | null; apr: number | null; fee_tier: number | null; impermanent_loss_risk: RiskLevel | null; last_updated: string; created_at: string; defi_protocols: { id: string; name: string; protocol_type: string; blockchain: string; website_url: string | null; is_active: boolean } }

const QuerySchema = z.object({ protocolId: z.string().uuid().optional(), minTvl: z.coerce.number().min(0).default(0), minApy: z.coerce.number().min(0).default(0), maxRisk: z.enum(['very_low', 'low', 'medium', 'high', 'very_high']).default('high'), sortBy: z.enum(['tvl', 'apy', 'volume', 'fees']).default('tvl'), sortOrder: z.enum(['asc', 'desc']).default('desc'), limit: z.coerce.number().int().min(1).max(100).default(50), offset: z.coerce.number().int().min(0).default(0) })

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request); if (auth) return auth
  const limited = rateLimit(request, 'pools'); if (limited) return limited
  const supabase = getAdminClient()
  const { searchParams } = new URL(request.url)
  const parse = QuerySchema.safeParse({ protocolId: searchParams.get('protocolId') ?? undefined, minTvl: searchParams.get('minTvl') ?? undefined, minApy: searchParams.get('minApy') ?? undefined, maxRisk: searchParams.get('maxRisk') ?? undefined, sortBy: searchParams.get('sortBy') ?? undefined, sortOrder: searchParams.get('sortOrder') ?? undefined, limit: searchParams.get('limit') ?? undefined, offset: searchParams.get('offset') ?? undefined })
  if (!parse.success) return NextResponse.json({ success: false, error: 'Invalid query', details: parse.error.flatten() }, { status: 400 })
  const { protocolId, minTvl, minApy, maxRisk, sortBy, sortOrder, limit, offset } = parse.data

  let query = supabase.from('defi_liquidity_pools').select(`*, defi_protocols!inner(id,name,protocol_type,blockchain,website_url,is_active)`, { count: 'exact' }).gte('total_liquidity_usd', minTvl).eq('defi_protocols.is_active', true)
  if (protocolId) query = query.eq('protocol_id', protocolId)
  if (minApy > 0) query = query.gte('apy', minApy)
  const riskLevels: Record<RiskLevel, RiskLevel[]> = { very_low: ['very_low'], low: ['very_low', 'low'], medium: ['very_low', 'low', 'medium'], high: ['very_low', 'low', 'medium', 'high'], very_high: ['very_low', 'low', 'medium', 'high', 'very_high'] }
  query = query.in('impermanent_loss_risk', riskLevels[maxRisk])
  const sortColumn = ({ tvl: 'total_liquidity_usd', apy: 'apy', volume: 'volume_24h_usd', fees: 'fees_24h_usd' } as const)[sortBy]
  query = query.order(sortColumn, { ascending: sortOrder === 'asc' }).range(offset, offset + limit - 1)
  const { data, error, count } = await query
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  const rows = (data ?? []) as PoolRow[]
  const enhanced = await Promise.all(rows.map(async (pool) => enhancePool(supabase, pool)))
  const summary = { totalPools: enhanced.length, totalLiquidity: enhanced.reduce((s, p) => s + (p.totalLiquidityUsd ?? 0), 0), totalVolume24h: enhanced.reduce((s, p) => s + (p.volume24hUsd ?? 0), 0), totalFees24h: enhanced.reduce((s, p) => s + (p.fees24hUsd ?? 0), 0), averageApy: enhanced.length ? enhanced.reduce((s, p) => s + (p.apy ?? 0), 0) / enhanced.length : 0 }
  const response = { success: true, data: { pools: enhanced, summary, pagination: { total: count ?? enhanced.length, offset, limit, hasMore: (count ?? 0) > offset + limit }, filters: { protocolId, minTvl, minApy, maxRisk, sortBy, sortOrder } }, timestamp: new Date().toISOString() }
  return NextResponse.json(response, withCache({}, 30))
}

async function enhancePool(supabase: ReturnType<typeof getAdminClient>, pool: PoolRow) {
  const liquidity = Number(pool.total_liquidity_usd ?? 0)
  const vol24 = Number(pool.volume_24h_usd ?? 0)
  const fees24 = Number(pool.fees_24h_usd ?? 0)
  const liquidityUtilization = liquidity > 0 ? (vol24 / liquidity) * 100 : 0
  const feeYield = liquidity > 0 ? (fees24 * 365 / liquidity) * 100 : 0
  const { data: historical } = await supabase.from('defi_liquidity_pool_history').select('total_liquidity_usd, apy, volume_24h_usd, recorded_at').eq('pool_id', pool.id).gte('recorded_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).order('recorded_at', { ascending: false }).limit(7)
  const performance = calculatePerformanceMetrics((historical ?? []) as Array<{ total_liquidity_usd: number; apy: number; volume_24h_usd: number; recorded_at: string }>)
  const opportunityScore = ((): number => {
    let score = 0
    score += Math.min(40, Number(pool.apy ?? 0) * 2)
    score += Math.min(20, liquidityUtilization * 2)
    score += Math.min(20, feeYield)
    const riskPenalties: Record<RiskLevel, number> = { very_low: 0, low: 2, medium: 8, high: 20, very_high: 30 }
    score -= riskPenalties[pool.impermanent_loss_risk ?? 'medium'] ?? 8
    const tvl = liquidity
    if (tvl > 10_000_000) score += 20
    else if (tvl > 1_000_000) score += 15
    else if (tvl > 100_000) score += 10
    else if (tvl > 10_000) score += 5
    return Math.max(0, Math.min(100, Math.round(score)))
  })()
  return { id: pool.id, protocol: { id: pool.defi_protocols.id, name: pool.defi_protocols.name, type: pool.defi_protocols.protocol_type, blockchain: pool.defi_protocols.blockchain, website: pool.defi_protocols.website_url }, address: pool.pool_address, name: pool.pool_name, type: pool.pool_type, token0: { address: pool.token_0_address, symbol: pool.token_0_symbol, name: pool.token_0_name }, token1: { address: pool.token_1_address, symbol: pool.token_1_symbol, name: pool.token_1_name }, totalLiquidityUsd: liquidity, volume24hUsd: vol24, volume7dUsd: Number(pool.volume_7d_usd ?? 0), fees24hUsd: fees24, apy: Number(pool.apy ?? 0), apr: Number(pool.apr ?? 0), feeTier: Number(pool.fee_tier ?? 0), liquidityUtilization: Math.round(liquidityUtilization * 100) / 100, feeYield: Math.round(feeYield * 100) / 100, volumeToTvlRatio: liquidity > 0 ? Math.round((vol24 / liquidity) * 10000) / 100 : 0, impermanentLossRisk: pool.impermanent_loss_risk ?? 'medium', riskScore: calculatePoolRiskScore({ impermanent_loss_risk: pool.impermanent_loss_risk ?? 'medium', total_liquidity_usd: liquidity, volume_24h_usd: vol24 }), priceImpactEstimates: [1000, 10000, 100000].map(tradeSize => ({ tradeSize, impact: calculatePriceImpact({ total_liquidity_usd: liquidity }, tradeSize) })), performance, lastUpdated: pool.last_updated, createdAt: pool.created_at, isHighYield: Number(pool.apy ?? 0) > 50, isStable: pool.pool_type === 'stable', isNewPool: new Date(pool.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000, opportunityScore }
}

function calculatePriceImpact(pool: { total_liquidity_usd?: number }, tradeSize: number): number { const liquidity = pool.total_liquidity_usd ?? 1; const impact = (tradeSize / liquidity) * 100; return Math.min(impact, 50) }
function calculatePoolRiskScore(pool: { impermanent_loss_risk: RiskLevel; total_liquidity_usd: number; volume_24h_usd: number }): number { let score = 100; const riskPenalties: Record<RiskLevel, number> = { very_low: 0, low: 5, medium: 15, high: 30, very_high: 50 }; score -= riskPenalties[pool.impermanent_loss_risk] ?? 15; if (pool.total_liquidity_usd < 100000) score -= 20; else if (pool.total_liquidity_usd < 1000000) score -= 10; const volumeRatio = pool.volume_24h_usd / Math.max(pool.total_liquidity_usd, 1); if (volumeRatio < 0.01) score -= 15; else if (volumeRatio > 5) score -= 10; return Math.max(0, Math.min(100, score)) }
function calculatePerformanceMetrics(h: Array<{ total_liquidity_usd: number; apy: number; volume_24h_usd: number; recorded_at: string }>) { if (h.length < 2) return { tvlChange7d: 0, apyChange7d: 0, volumeChange7d: 0, volatility: 0, consistency: 0 }; const latest = h[0]; const oldest = h[h.length - 1]; const tvlChange7d = oldest.total_liquidity_usd > 0 ? ((latest.total_liquidity_usd - oldest.total_liquidity_usd) / oldest.total_liquidity_usd) * 100 : 0; const apyChange7d = oldest.apy > 0 ? ((latest.apy - oldest.apy) / oldest.apy) * 100 : 0; const volumeChange7d = oldest.volume_24h_usd > 0 ? ((latest.volume_24h_usd - oldest.volume_24h_usd) / oldest.volume_24h_usd) * 100 : 0; const apyValues = h.map(d => d.apy); const avgApy = apyValues.reduce((s, v) => s + v, 0) / apyValues.length; const variance = apyValues.reduce((s, v) => s + Math.pow(v - avgApy, 2), 0) / apyValues.length; const volatility = Math.sqrt(variance); const consistency = Math.max(0, 100 - volatility * 10); return { tvlChange7d: round2(tvlChange7d), apyChange7d: round2(apyChange7d), volumeChange7d: round2(volumeChange7d), volatility: round2(volatility), consistency: round2(consistency) } }
function round2(n: number): number { return Math.round(n * 100) / 100 }
