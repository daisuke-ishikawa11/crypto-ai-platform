import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSupaQuery, type MinimalSupaQuery, safeOrderAndRange } from '@/lib/supabase/helpers'

type RiskLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high' | 'critical'

interface RiskRow {
  id: string
  protocol_id: string
  overall_score: number
  risk_level: RiskLevel
  smart_contract_score: number | null
  liquidity_score: number | null
  market_score: number | null
  governance_score: number | null
  regulatory_score: number | null
  operational_score: number | null
  risk_factors: unknown[] | null
  recommendations: string[] | null
  peer_comparison: unknown[] | null
  assessed_at: string
  defi_protocols: {
    id: string
    name: string
    protocol_type: string | null
    blockchain: string | null
    is_active: boolean
  }
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()

    const baseQuery = supabase
      .from('defi_risk_assessments')
      .select(`*,defi_protocols!inner(id,name,protocol_type,blockchain,is_active)`) // inner join for protocol meta

    const q0 = getSupaQuery(baseQuery)
    if (!q0) {
      return NextResponse.json({ success: true, data: { assessments: [] }, timestamp: new Date() })
    }

    let q: MinimalSupaQuery = q0
    q = q.eq('defi_protocols.is_active', true)

    const res = await safeOrderAndRange<RiskRow>(
      q,
      'assessed_at',
      false,
      0,
      199,
    )
    const rows = (res.data || []) as RiskRow[]

    const toLevel = (score: number | null | undefined): RiskLevel => {
      const s = typeof score === 'number' ? score : 0
      if (s >= 90) return 'very_low'
      if (s >= 75) return 'low'
      if (s >= 60) return 'medium'
      if (s >= 45) return 'high'
      return 'very_high'
    }

    const defaultWeight = {
      smart: 0.25,
      liquidity: 0.2,
      market: 0.2,
      governance: 0.15,
      regulatory: 0.1,
      operational: 0.1,
    }

    const assessments = rows.map((r) => {
      const smartScore = r.smart_contract_score ?? 0
      const liquidityScore = r.liquidity_score ?? 0
      const marketScore = r.market_score ?? 0
      const governanceScore = r.governance_score ?? 0
      const regulatoryScore = r.regulatory_score ?? 0
      const operationalScore = r.operational_score ?? 0

      return {
        protocolId: r.defi_protocols.id,
        protocolName: r.defi_protocols.name,
        overallScore: r.overall_score,
        riskLevel: r.risk_level,
        smartContractRisk: {
          score: smartScore,
          level: toLevel(smartScore),
          weight: defaultWeight.smart,
          factors: [],
          mitigation: []
        },
        liquidityRisk: {
          score: liquidityScore,
          level: toLevel(liquidityScore),
          weight: defaultWeight.liquidity,
          factors: [],
          mitigation: []
        },
        marketRisk: {
          score: marketScore,
          level: toLevel(marketScore),
          weight: defaultWeight.market,
          factors: [],
          mitigation: []
        },
        governanceRisk: {
          score: governanceScore,
          level: toLevel(governanceScore),
          weight: defaultWeight.governance,
          factors: [],
          mitigation: []
        },
        regulatoryRisk: {
          score: regulatoryScore,
          level: toLevel(regulatoryScore),
          weight: defaultWeight.regulatory,
          factors: [],
          mitigation: []
        },
        operationalRisk: {
          score: operationalScore,
          level: toLevel(operationalScore),
          weight: defaultWeight.operational,
          factors: [],
          mitigation: []
        },
        riskFactors: Array.isArray(r.risk_factors) ? r.risk_factors : [],
        recommendations: Array.isArray(r.recommendations) ? r.recommendations : [],
        peerComparison: Array.isArray(r.peer_comparison) ? r.peer_comparison : [],
        riskHistory: [],
        timestamp: new Date(r.assessed_at),
      }
    })

    return NextResponse.json({ success: true, data: { assessments }, timestamp: new Date() })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load risk overview', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
