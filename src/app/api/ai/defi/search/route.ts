import { NextRequest, NextResponse } from 'next/server'
import { createApiHandler } from '@/lib/utils/api-error-middleware'

export const dynamic = 'force-dynamic'

// AIブリッジ: /api/defi/pools/search を呼び出し、根拠ソースを同梱
async function handler(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url)
    const sp = url.searchParams
    const passthrough = new URLSearchParams()
    for (const k of ['q','token','network','includeDexes','includeUniswap','minApy','maxApy','minTvl','apyKind','sortBy','sortOrder','limit','offset']) {
      const v = sp.get(k)
      if (v !== null) passthrough.set(k, v)
    }
    const res = await fetch(`${url.origin}/api/defi/pools/search?${passthrough.toString()}`, { method: 'GET', cache: 'no-store' })
    type BaseItem = { source: 'internal'|'external'; name: string; protocol: string; network: string; tvl: number; apy: number; volume24h: number }
    type ExtItem = BaseItem & { feeTier?: number; token0Address?: string; token1Address?: string; graphSourceName?: string; estimatedVolumeUsd24h?: number; graphSourceUrl?: string }
    const j = await res.json().catch(() => null) as { success?: boolean; data?: { items?: Array<ExtItem> } } | null
    if (!res.ok || !j?.success) {
      const je = (j as { error?: string } | null)?.error
      return NextResponse.json({ success: false, error: je || `downstream error ${res.status}` }, { status: 502 })
    }
    const items = Array.isArray(j?.data?.items) ? j!.data!.items! : []
    // 既知プロトコルのGraph URLフォールバック解決
    const resolveGraphUrl = (proto: string): string | undefined => {
      const p = proto.toLowerCase()
      if (p.includes('uniswap')) return process.env.UNISWAP_V3_GRAPH_URL || undefined
      if (p.includes('pancake')) return process.env.PANCAKESWAP_GRAPH_URL || undefined
      if (p.includes('sushi')) return process.env.SUSHISWAP_GRAPH_URL || 'https://defillama.com'
      if (p.includes('quick')) return process.env.QUICKSWAP_GRAPH_URL || process.env.QUICKSWAP_V2_GRAPH_URL || undefined
      if (p.includes('velodrome')) return process.env.VELODROME_GRAPH_URL || undefined
      if (p.includes('camelot')) return process.env.CAMELOT_GRAPH_URL || process.env.CAMELOT_V2_GRAPH_URL || undefined
      if (p.includes('trader')) return process.env.TRADERJOE_GRAPH_URL || process.env.TRADERJOE_V2_GRAPH_URL || undefined
      if (p.includes('curve')) return process.env.CURVE_GRAPH_URL || undefined
      if (p.includes('aave')) return process.env.AAVE_GRAPH_URL || undefined
      return undefined
    }
    // 簡易的な根拠付与（プロトコル名から出典の推定）
    const explained = (items as ExtItem[]).map((it) => {
      const proto = (it.protocol || '').toLowerCase()
      const isGraphish = proto.includes('uniswap') || proto.includes('pancake') || proto.includes('sushi') || proto.includes('quick') || proto.includes('velodrome') || proto.includes('camelot') || proto.includes('trader')
      const isSolana = proto.includes('raydium') || proto.includes('orca')
      const evidence = isGraphish
        ? 'Graph (fee APR)'
        : isSolana
          ? 'Official API/SDK + RPC (fee APR when available)'
          : 'DefiLlama (base/reward/net)'
      const sourceUrl = isGraphish ? (it.graphSourceUrl || it.graphSourceName || resolveGraphUrl(proto) || 'https://defillama.com') : undefined
      // メタ: TVL/APY/feeTier/推定Volume/Graph名（利用可能なら）
      const meta: Record<string, unknown> = { tvl: it.tvl, apy: it.apy }
      if (typeof it.feeTier === 'number') meta.feeTier = it.feeTier
      if (typeof it.estimatedVolumeUsd24h === 'number') meta.estimatedVolumeUsd24h = it.estimatedVolumeUsd24h
      if (typeof it.graphSourceName === 'string') meta.graphSourceName = it.graphSourceName
      if (typeof sourceUrl === 'string') meta.sourceUrl = sourceUrl
      return { ...it, evidence, meta }
    })
    return NextResponse.json({ success: true, data: { items: explained } })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 60, window: 60_000 } })
