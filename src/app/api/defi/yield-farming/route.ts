import { getSupaQuery, type MinimalSupaQuery, safeOrderAndRange } from '@/lib/supabase/helpers'
import { fetchDexPools } from '@/lib/defi/dex-integrations'
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createApiHandler } from '@/lib/utils/api-error-middleware';
import { runAdapter } from '@/lib/sdk/runner'

interface FarmRow {
  id: string
  apy: number
  apr: number
  base_apy?: number | null
  reward_apy?: number | null
  auto_compound: boolean
  compound_frequency_hours?: number | null
  deposit_fee_percent?: number | null
  withdrawal_fee_percent?: number | null
  total_staked_usd: number
  participant_count: number
  risk_level: 'very_low' | 'low' | 'medium' | 'high' | 'very_high'
  lock_period_days: number
  is_active: boolean
  started_at?: string | null
  ends_at?: string | null
  last_updated?: string | null
  created_at?: string | null
  defi_protocols: {
    id: string
    name: string
    protocol_type: string
    blockchain: string
    website_url: string
    audit_score?: number | null
    risk_score?: number | null
    is_active: boolean
  }
  farm_name: string
  farm_address?: string | null
  staking_token?: string | null
  reward_tokens?: string[] | null
  daily_rewards_usd?: number | null
}

interface HistoryRow { apy: number; total_staked_usd: number; participant_count?: number; recorded_at: string }

function calculateFarmOpportunityScore(farm: Pick<FarmRow,'total_staked_usd'|'participant_count'|'auto_compound'|'risk_level'|'lock_period_days'>, effectiveApy: number, totalFees: number): number {
  let score = 0
  score += Math.min(50, effectiveApy * 0.5)
  if (farm.total_staked_usd > 10000000) score += 15
  else if (farm.total_staked_usd > 1000000) score += 10
  else if (farm.total_staked_usd > 100000) score += 5
  if (farm.participant_count > 1000) score += 10
  else if (farm.participant_count > 100) score += 5
  if (farm.auto_compound) score += 10
  const riskPenalties: Record<FarmRow['risk_level'], number> = { very_low: 0, low: 3, medium: 8, high: 15, very_high: 25 }
  score -= riskPenalties[farm.risk_level] || 8
  score -= Math.min(15, totalFees * 3)
  score -= Math.min(10, farm.lock_period_days / 36.5)
  return Math.max(0, Math.min(100, Math.round(score)))
}

function calculateFarmTrends(historicalData: HistoryRow[]) {
  if (!Array.isArray(historicalData) || historicalData.length < 2) {
    return { apyTrend: 'stable', apyChange7d: 0, apyChange30d: 0, tvlTrend: 'stable', tvlChange7d: 0, tvlChange30d: 0, participantsTrend: 'stable', volatility: 0 }
  }
  const latest = historicalData[0]
  const sevenDaysAgo = historicalData.find(d => new Date(d.recorded_at).getTime() <= Date.now() - 7 * 24 * 60 * 60 * 1000) || historicalData[historicalData.length - 1]
  const thirtyDaysAgo = historicalData[historicalData.length - 1]
  const apyChange7d = sevenDaysAgo.apy > 0 ? ((latest.apy - sevenDaysAgo.apy) / sevenDaysAgo.apy) * 100 : 0
  const apyChange30d = thirtyDaysAgo.apy > 0 ? ((latest.apy - thirtyDaysAgo.apy) / thirtyDaysAgo.apy) * 100 : 0
  const tvlChange7d = sevenDaysAgo.total_staked_usd > 0 ? ((latest.total_staked_usd - sevenDaysAgo.total_staked_usd) / sevenDaysAgo.total_staked_usd) * 100 : 0
  const tvlChange30d = thirtyDaysAgo.total_staked_usd > 0 ? ((latest.total_staked_usd - thirtyDaysAgo.total_staked_usd) / thirtyDaysAgo.total_staked_usd) * 100 : 0
  const apyValues = historicalData.map(d => d.apy)
  const avgApy = apyValues.reduce((sum, apy) => sum + apy, 0) / apyValues.length
  const variance = apyValues.reduce((sum, apy) => sum + Math.pow(apy - avgApy, 2), 0) / apyValues.length
  const volatility = Math.sqrt(variance)
  return { apyTrend: apyChange7d > 5 ? 'increasing' : apyChange7d < -5 ? 'decreasing' : 'stable', apyChange7d: Math.round(apyChange7d * 100) / 100, apyChange30d: Math.round(apyChange30d * 100) / 100, tvlTrend: tvlChange7d > 10 ? 'increasing' : tvlChange7d < -10 ? 'decreasing' : 'stable', tvlChange7d: Math.round(tvlChange7d * 100) / 100, tvlChange30d: Math.round(tvlChange30d * 100) / 100, participantsTrend: 'stable', volatility: Math.round(volatility * 100) / 100 }
}

function determineFarmStatus(farm: Pick<FarmRow,'is_active'|'ends_at'|'started_at'>): string {
  if (!farm.is_active) return 'inactive'
  if (farm.ends_at && new Date(farm.ends_at) < new Date()) return 'expired'
  if (farm.started_at && new Date(farm.started_at) > new Date()) return 'upcoming'
  if (farm.ends_at && new Date(farm.ends_at).getTime() < Date.now() + 7 * 24 * 60 * 60 * 1000) { return 'ending_soon' }
  return 'active'
}

function calculateFarmHealthScore(farm: Pick<FarmRow,'risk_level'|'total_staked_usd'>, trends: { apyTrend: string; tvlTrend: string; volatility: number }): number {
  let score = 100
  const riskPenalties: Record<FarmRow['risk_level'], number> = { very_low: 0, low: 5, medium: 15, high: 30, very_high: 50 }
  score -= riskPenalties[farm.risk_level] || 15
  if (farm.total_staked_usd < 100000) score -= 20
  else if (farm.total_staked_usd < 1000000) score -= 10
  if (trends.apyTrend === 'decreasing') score -= 10
  if (trends.tvlTrend === 'decreasing') score -= 15
  if (trends.volatility > 10) score -= 15
  else if (trends.volatility > 5) score -= 8
  return Math.max(0, Math.min(100, score))
}

function getCompoundFrequencyText(hours: number): string {
  if (hours >= 168) return `Weekly (every ${Math.round(hours / 168)} weeks)`
  if (hours >= 24) return `Daily (every ${Math.round(hours / 24)} days)`
  if (hours >= 1) return `Every ${hours} hours`
  return 'Continuously'
}

function calculateTimeRemaining(endDate: string): string {
  const end = new Date(endDate).getTime()
  const now = Date.now()
  const diff = end - now
  if (diff <= 0) return 'Expired'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return `${days} days ${hours} hours`
  if (hours > 0) return `${hours} hours`
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${minutes} minutes`
}

async function handler(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const protocolId = searchParams.get('protocolId');
  const minApy = parseFloat(searchParams.get('minApy') || '0');
  const maxRisk = (searchParams.get('maxRisk') || 'high') as FarmRow['risk_level'] | 'very_low'|'low'|'medium'|'high'|'very_high';
  const maxLockPeriod = parseInt(searchParams.get('maxLockPeriod') || '365');
  const autoCompoundOnly = searchParams.get('autoCompound') === 'true';
  const network = searchParams.get('network') || undefined;
  const includeUniswap = searchParams.get('includeUniswap') === 'true';
  const includeSolanaSdk = searchParams.get('includeSolanaSdk') === 'true';
  const includeDexesParam = searchParams.get('includeDexes') || '';
  const includeDexes = includeDexesParam
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  const sortBy = searchParams.get('sortBy') || 'apy';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const offset = parseInt(searchParams.get('offset') || '0');

  const supabase = await createClient();

  const query = supabase
    .from('defi_yield_farms')
    .select(`*,defi_protocols!inner(id,name,protocol_type,blockchain,website_url,audit_score,risk_score,is_active)`)
  // 型安全なクエリ取得（本番/モック両対応）
  const q0 = getSupaQuery(query)
  if (!q0) {
    return NextResponse.json({ success: true, data: { farms: [], summary: {}, topOpportunities: [], stableHighYield: [], pagination: { total: 0, offset, limit, hasMore: false }, filters: { protocolId, minApy, maxRisk, maxLockPeriod, autoCompoundOnly, sortBy, sortOrder } }, timestamp: new Date() })
  }
  let q: MinimalSupaQuery = q0
  q = q.eq('is_active', true).gte('apy', minApy).lte('lock_period_days', maxLockPeriod)
  if (protocolId) { q = q.eq('protocol_id', protocolId) }
  if (network && network !== 'all') { q = q.eq('defi_protocols.blockchain', network) }
  const riskLevels = { very_low: ['very_low'], low: ['very_low','low'], medium: ['very_low','low','medium'], high: ['very_low','low','medium','high'], very_high: ['very_low','low','medium','high','very_high'] } as const
  q = q.in('risk_level', Array.from(riskLevels[maxRisk] || riskLevels.high))
  if (autoCompoundOnly) { q = q.eq('auto_compound', true) }
  q = q.eq('defi_protocols.is_active', true)
  const serverSortable = { apy: 'apy', apr: 'apr', tvl: 'total_staked_usd', participants: 'participant_count', rewards: 'daily_rewards_usd' } as const
  const canServerSort = Object.keys(serverSortable).includes(sortBy)
  const res = await safeOrderAndRange<FarmRow>(q, canServerSort ? (serverSortable as Record<string,string>)[sortBy] : 'apy', (sortOrder === 'asc'), offset, offset + limit - 1)
  const farms = res.data || []
  const fetchError = res.error
  if (fetchError) { throw new Error(`Database query failed: ${fetchError.message}`) }
  if (!farms || farms.length === 0) {
    return NextResponse.json({ success: true, data: { farms: [], pagination: { total: 0, offset, limit, hasMore: false } } })
  }

  let enhancedFarms = await Promise.all((farms as FarmRow[]).map(async (farm) => {
    try {
      const dailyYield = farm.apy > 0 ? farm.apy / 365 : 0
      const weeklyYield = dailyYield * 7
      const monthlyYield = dailyYield * 30
      let effectiveApy = farm.apy
      if (farm.auto_compound && farm.compound_frequency_hours) {
        const compoundsPerYear = (365 * 24) / farm.compound_frequency_hours
        effectiveApy = (Math.pow(1 + farm.apy / 100 / compoundsPerYear, compoundsPerYear) - 1) * 100
      }
      const totalFeePercent = (farm.deposit_fee_percent || 0) + (farm.withdrawal_fee_percent || 0)
      const netApy = farm.apy - (totalFeePercent * 2)
      const riskMultiplier: Record<FarmRow['risk_level'], number> = { very_low: 1.0, low: 0.95, medium: 0.85, high: 0.7, very_high: 0.5 }
      const riskAdjustedApy = farm.apy * (riskMultiplier[farm.risk_level] || 0.85)
      const opportunityScore = calculateFarmOpportunityScore(farm, effectiveApy, totalFeePercent)
      const { data: historicalData } = await supabase
        .from('defi_yield_farm_history')
        .select('apy, total_staked_usd, participant_count, recorded_at')
        .eq('farm_id', farm.id)
        .gte('recorded_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('recorded_at', { ascending: false })
        .limit(30)
      const trends = calculateFarmTrends((historicalData || []) as HistoryRow[])
      const farmStatus = determineFarmStatus({ is_active: farm.is_active, ends_at: farm.ends_at ?? undefined, started_at: farm.started_at ?? undefined })
      const healthScore = calculateFarmHealthScore({ risk_level: farm.risk_level, total_staked_usd: farm.total_staked_usd }, trends)
      const sustainabilityScore = Math.max(0, Math.min(100,
        100 - ({ very_low: 0, low: 10, medium: 25, high: 40, very_high: 60 }[farm.risk_level] ?? 25)
            - Math.min(50, (trends.volatility || 0) * 5)
      ))

      return {
        id: farm.id,
        protocol: { id: farm.defi_protocols.id, name: farm.defi_protocols.name, type: farm.defi_protocols.protocol_type, blockchain: farm.defi_protocols.blockchain, website: farm.defi_protocols.website_url, auditScore: farm.defi_protocols.audit_score, riskScore: farm.defi_protocols.risk_score },
        name: farm.farm_name,
        address: farm.farm_address,
        stakingToken: farm.staking_token,
        rewardTokens: farm.reward_tokens,
        apy: farm.apy,
        apr: farm.apr,
        baseApy: farm.base_apy || 0,
        rewardApy: farm.reward_apy || 0,
        effectiveApy: Math.round(effectiveApy * 100) / 100,
        netApy: Math.round(netApy * 100) / 100,
        riskAdjustedApy: Math.round(riskAdjustedApy * 100) / 100,
        dailyYield: Math.round(dailyYield * 10000) / 100,
        weeklyYield: Math.round(weeklyYield * 10000) / 100,
        monthlyYield: Math.round(monthlyYield * 10000) / 100,
        totalStakedUsd: farm.total_staked_usd,
        participantCount: farm.participant_count,
        dailyRewardsUsd: farm.daily_rewards_usd,
        lockPeriodDays: farm.lock_period_days,
        depositFeePercent: farm.deposit_fee_percent || 0,
        withdrawalFeePercent: farm.withdrawal_fee_percent || 0,
        totalFeePercent: Math.round(totalFeePercent * 100) / 100,
        autoCompound: farm.auto_compound,
        compoundFrequencyHours: farm.compound_frequency_hours ?? undefined,
        compoundFrequencyText: farm.compound_frequency_hours ? getCompoundFrequencyText(farm.compound_frequency_hours) : null,
        riskLevel: farm.risk_level,
        opportunityScore,
        healthScore,
        sustainabilityScore,
        status: farmStatus,
        isActive: farm.is_active,
        startedAt: farm.started_at ?? undefined,
        endsAt: farm.ends_at ?? undefined,
        timeRemaining: farm.ends_at ? calculateTimeRemaining(farm.ends_at) : null,
        trends,
        lastUpdated: farm.last_updated ?? undefined,
        createdAt: farm.created_at ?? undefined,
        isHighYield: farm.apy > 100,
        isStable: farm.apy < 20 && farm.risk_level === 'low',
        hasLockPeriod: farm.lock_period_days > 0,
        hasDepositFee: (farm.deposit_fee_percent || 0) > 0,
        hasWithdrawalFee: (farm.withdrawal_fee_percent || 0) > 0,
        isNewFarm: !!(farm.created_at && new Date(farm.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000),
        isEndingSoon: !!(farm.ends_at && new Date(farm.ends_at).getTime() < Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    } catch {
      return { id: farm.id, protocol: { name: farm.defi_protocols.name, type: farm.defi_protocols.protocol_type }, name: farm.farm_name, apy: farm.apy, totalStakedUsd: farm.total_staked_usd, riskLevel: farm.risk_level, error: 'Failed to enhance farm data' }
    }
  }))

  // サーバー側で必要に応じて追加ソート
  if (!canServerSort) {
    if (sortBy === 'risk') {
      const rank: Record<FarmRow['risk_level'], number> = { very_low: 5, low: 4, medium: 3, high: 2, very_high: 1 }
      enhancedFarms = enhancedFarms.sort((a, b) => (rank[(String((b as { riskLevel?: string }).riskLevel || 'medium') as FarmRow['risk_level'])] - rank[(String((a as { riskLevel?: string }).riskLevel || 'medium') as FarmRow['risk_level'])]))
    } else if (sortBy === 'sustainability') {
      enhancedFarms = enhancedFarms.sort((a, b) => (((b as { sustainabilityScore?: number }).sustainabilityScore || 0) - ((a as { sustainabilityScore?: number }).sustainabilityScore || 0)))
    }
    if (sortOrder === 'asc') enhancedFarms.reverse()
  }

  // 追加: Uniswap v3 の上位プールをThe Graphから取得して簡易的に利回り化
  if (includeUniswap || includeDexes.length > 0) {
    const keys = [
      ...(includeUniswap ? ['uniswap-v3'] : []),
      ...includeDexes,
    ]
    const ext = await fetchDexPools(keys, network)
    // 既存の拡張後型に合わせる（プロパティ名は同一）
    enhancedFarms = [...enhancedFarms, ...ext.map(e => ({ ...e }))]
  }

  // 追加: Solana SDK直結（Raydium/Orca）データの取り込み（失敗時はnull→何もしない）
  if (includeSolanaSdk && (!network || network === 'all' || network === 'solana')) {
    try {
      const [ray, orca] = await Promise.all([
        runAdapter<Array<{ id?: string; name: string; tvlUsd?: number; apy?: number; chain: 'solana'; address?: string }>>({ name: 'solana.raydium.pools', kind: 'solana', cacheKeyParams: { limit: 50 } }).catch(() => null),
        runAdapter<Array<{ id?: string; name: string; tvlUsd?: number; apy?: number; chain: 'solana'; address?: string }>>({ name: 'solana.orca.pools', kind: 'solana', cacheKeyParams: { limit: 50 } }).catch(() => null)
      ])
      const mapSol = (p: { id?: string; name: string; tvlUsd?: number; apy?: number; chain: 'solana'; address?: string }) => {
        const apy = Number(p.apy || 0)
        const dailyYield = apy > 0 ? apy / 365 : 0
        const weeklyYield = dailyYield * 7
        const monthlyYield = dailyYield * 30
        return {
          id: p.id || `sol:${p.name}`,
          protocol: { id: 'solana-dex', name: p.name.split(' ')[0] || 'Solana DEX', type: 'DEX', blockchain: 'solana', website: '', auditScore: null, riskScore: null },
          name: p.name,
          address: p.address,
          stakingToken: p.name,
          rewardTokens: [],
          apy,
          apr: apy,
          baseApy: apy,
          rewardApy: 0,
          effectiveApy: apy,
          netApy: apy,
          riskAdjustedApy: apy,
          dailyYield: Math.round(dailyYield * 10000) / 100,
          weeklyYield: Math.round(weeklyYield * 10000) / 100,
          monthlyYield: Math.round(monthlyYield * 10000) / 100,
          totalStakedUsd: Number(p.tvlUsd || 0),
          participantCount: 0,
          dailyRewardsUsd: Number(p.tvlUsd || 0) * (apy/100) / 365,
          lockPeriodDays: 0,
          depositFeePercent: 0,
          withdrawalFeePercent: 0,
          totalFeePercent: 0,
          autoCompound: false,
          compoundFrequencyHours: undefined,
          compoundFrequencyText: null,
          riskLevel: 'medium' as const,
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
          isEndingSoon: false,
        }
      }
      const mergedSol = [ ...(ray || []).map(mapSol), ...(orca || []).map(mapSol) ]
      if (mergedSol.length > 0) {
        enhancedFarms = [...enhancedFarms, ...mergedSol]
      }
    } catch {}
  }

  const summary = {
    totalFarms: enhancedFarms.length,
    totalStaked: enhancedFarms.reduce((sum, f) => sum + (f.totalStakedUsd || 0), 0),
    totalDailyRewards: enhancedFarms.reduce((sum, f) => sum + (f.dailyRewardsUsd || 0), 0),
    averageApy: enhancedFarms.length > 0 ? enhancedFarms.reduce((sum, f) => sum + (f.apy || 0), 0) / enhancedFarms.length : 0,
    averageEffectiveApy: enhancedFarms.length > 0 ? enhancedFarms.reduce((sum, f) => sum + (f.effectiveApy || 0), 0) / enhancedFarms.length : 0,
    riskDistribution: enhancedFarms.reduce((acc, farm) => { const risk = farm.riskLevel || 'unknown'; acc[risk] = (acc[risk] || 0) + 1; return acc }, {} as Record<string, number>),
    autoCompoundFarms: enhancedFarms.filter(f => f.autoCompound).length,
    highYieldFarms: enhancedFarms.filter(f => f.isHighYield).length,
    stableFarms: enhancedFarms.filter(f => f.isStable).length,
    farmsWithLockup: enhancedFarms.filter(f => f.hasLockPeriod).length,
    newFarms: enhancedFarms.filter(f => f.isNewFarm).length,
    endingSoonFarms: enhancedFarms.filter(f => f.isEndingSoon).length
  }

  const topOpportunities = enhancedFarms
    .filter(farm => (farm.apy || 0) > 20 && ['very_low','low','medium'].includes(farm.riskLevel || 'high') && (farm.healthScore || 0) > 70)
    .sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0))
    .slice(0, 5)
  const stableHighYield = enhancedFarms
    .filter(farm => (farm.apy || 0) > 15 && (farm.apy || 0) < 50 && ['very_low','low'].includes(farm.riskLevel || 'high') && !farm.hasLockPeriod)
    .sort((a, b) => (b.apy || 0) - (a.apy || 0))
    .slice(0, 5)

  const response = { success: true, data: { farms: enhancedFarms, summary, topOpportunities, stableHighYield, pagination: { total: enhancedFarms.length, offset, limit, hasMore: false }, filters: { protocolId, minApy, maxRisk, maxLockPeriod, autoCompoundOnly, network, sortBy, sortOrder } }, timestamp: new Date() }
  return NextResponse.json(response)
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 60, window: 60000 }, errorOptions: { enableLogging: true, customErrorMessages: { DATABASE_ERROR: 'Failed to fetch yield farming data from database.', RATE_LIMIT: 'Too many yield farming requests. Please wait before trying again.' } } })
