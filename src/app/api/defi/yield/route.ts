import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSupaQuery, type MinimalSupaQuery, safeOrderAndRange } from '@/lib/supabase/helpers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const minApy = parseFloat(searchParams.get('minApy') || '0')
  const sortBy = searchParams.get('sortBy') || 'apy'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 100)
  const offset = parseInt(searchParams.get('offset') || '0')
  const network = searchParams.get('network') || undefined
  const maxRisk = searchParams.get('maxRisk') || undefined

  const supabase = await createClient()
  const q0 = getSupaQuery(
    supabase
      .from('defi_yield_farms')
      .select(`*,defi_protocols!inner(id,name,protocol_type,blockchain,website_url,audit_score,risk_score,is_active)`) // inner join for active protocols
  )
  if (!q0) {
    return NextResponse.json({ success: true, data: { items: [], pagination: { total: 0, offset, limit, hasMore: false } } })
  }
  let q: MinimalSupaQuery = q0
  q = q.eq('is_active', true).gte('apy', minApy).eq('defi_protocols.is_active', true)
  if (network) {
    q = q.eq('defi_protocols.blockchain', network)
  }
  if (maxRisk) {
    const riskOrder = ['very_low','low','medium','high','very_high'] as const
    const idx = riskOrder.indexOf(maxRisk as (typeof riskOrder)[number])
    if (idx >= 0) {
      const allowed = riskOrder.slice(0, idx + 1)
      q = q.in('risk_level', allowed as unknown as string[])
    }
  }
  const sortColumn = ({ apy: 'apy', tvl: 'total_staked_usd', participants: 'participant_count' } as Record<string, string>)[sortBy] || 'apy'
  const res = await safeOrderAndRange(q, sortColumn, (sortOrder === 'asc'), offset, offset + limit - 1)
  const farms = (res.data || []) as Array<{
    id: string
    apy: number
    apr: number
    base_apy?: number | null
    reward_apy?: number | null
    total_staked_usd: number
    participant_count: number
    risk_level: string
    lock_period_days: number
    is_active: boolean
    farm_name: string
    farm_address?: string | null
    staking_token?: string | null
    reward_tokens?: string[] | null
    defi_protocols: { id: string; name: string; protocol_type: string; blockchain: string; website_url: string; audit_score?: number | null; risk_score?: number | null; is_active: boolean }
  }>
  if (res.error) {
    return NextResponse.json({ success: false, error: res.error.message }, { status: 500 })
  }
  const items = farms.map(f => ({
    id: f.id,
    protocol: f.defi_protocols.name,
    network: f.defi_protocols.blockchain,
    farmName: f.farm_name,
    stakingToken: f.staking_token || '',
    rewardTokens: f.reward_tokens || [],
    apy: f.apy,
    apr: f.apr,
    baseApy: f.base_apy || 0,
    rewardApy: f.reward_apy || 0,
    tvl: f.total_staked_usd,
    participantCount: f.participant_count,
    dailyRewards: undefined,
    lockPeriod: f.lock_period_days,
    autoCompound: false,
    riskLevel: f.risk_level
  }))
  return NextResponse.json({ success: true, data: { items, pagination: { total: items.length, offset, limit, hasMore: false } } })
}
