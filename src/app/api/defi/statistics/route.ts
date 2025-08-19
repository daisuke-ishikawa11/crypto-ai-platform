import { NextRequest, NextResponse } from 'next/server'

// 簡易: Uniswap v3 のThe Graphから主要メトリクスを取得し、ダッシュボード用に正規化
// 注意: 取得できない指標は0や空配列で返却し、モックではないことを明示

type UniswapFactoryResponse = {
  data?: {
    factory?: { totalValueLockedUSD?: string }
    uniswapDayData?: Array<{ volumeUSD?: string; txCount?: string }>
  }
}

type UniswapPoolsResponse = {
  data?: {
    pools?: Array<{
      id: string
      totalValueLockedUSD: string
      volumeUSD: string
      token0: { symbol: string; name: string }
      token1: { symbol: string; name: string }
    }>
  }
}

async function fetchUniswapOverview() {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'

  const overviewQuery = `
    query {
      factory(id: "0x1F98431c8aD98523631AE4a59f267346ea31F984") {
        totalValueLockedUSD
      }
      uniswapDayData(first: 1, orderBy: date, orderDirection: desc) {
        volumeUSD
        txCount
      }
    }
  `

  const r1 = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: overviewQuery })
  })
  const j1 = (await r1.json()) as UniswapFactoryResponse

  const poolsQuery = `
    query {
      pools(first: 20, orderBy: totalValueLockedUSD, orderDirection: desc) {
        id
        totalValueLockedUSD
        volumeUSD
        token0 { symbol name }
        token1 { symbol name }
      }
    }
  `
  const r2 = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: poolsQuery })
  })
  const j2 = (await r2.json()) as UniswapPoolsResponse

  const tvl = parseFloat(j1?.data?.factory?.totalValueLockedUSD || '0')
  const day = j1?.data?.uniswapDayData?.[0]
  const volume24h = parseFloat(day?.volumeUSD || '0')

  return {
    tvl,
    volume24h,
    pools: (j2?.data?.pools || []).map(p => ({
      id: p.id,
      name: `${p.token0.symbol}/${p.token1.symbol}`,
      tvl: parseFloat(p.totalValueLockedUSD),
      volumeUSD: parseFloat(p.volumeUSD)
    }))
  }
}

type DefiLlamaProtocol = {
  name?: string
  symbol?: string
  category?: string
  chain?: string
  chains?: string[]
  tvl?: number
  tvlPrevDay?: number
  tvlPrevWeek?: number
  tvlPrevMonth?: number
}

async function fetchDefiLlamaTop(names: string[]): Promise<DefiLlamaProtocol[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const r = await fetch('https://api.llama.fi/protocols', { signal: controller.signal })
    clearTimeout(timeout)
    const arr = (await r.json()) as unknown
    if (!Array.isArray(arr)) return []
    const set = new Set(names.map(n => n.toLowerCase()))
    const pick = (arr as unknown[]).map(o => (o || {} as unknown) as Record<string, unknown>).filter(o => {
      const nm = String(o.name || '').toLowerCase()
      return set.has(nm)
    })
    // 正規化
    return pick.map(o => ({
      name: typeof o.name === 'string' ? o.name : undefined,
      symbol: typeof o.symbol === 'string' ? o.symbol : undefined,
      category: typeof o.category === 'string' ? o.category : undefined,
      chains: Array.isArray(o.chains) ? (o.chains as unknown[]).map(String) : undefined,
      tvl: typeof o.tvl === 'number' ? (o.tvl as number) : (typeof (o as Record<string, unknown>).tvl === 'string' ? Number((o as Record<string, unknown>).tvl) : undefined),
      tvlPrevDay: typeof (o as Record<string, unknown>).tvlPrevDay === 'number' ? (o as Record<string, number>).tvlPrevDay : undefined,
      tvlPrevWeek: typeof (o as Record<string, unknown>).tvlPrevWeek === 'number' ? (o as Record<string, number>).tvlPrevWeek : undefined,
      tvlPrevMonth: typeof (o as Record<string, unknown>).tvlPrevMonth === 'number' ? (o as Record<string, number>).tvlPrevMonth : undefined,
    }))
  } catch {
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const realTime = url.searchParams.get('realTime') === 'true'
    // metricsフラグは現状未使用（将来の拡張用）
    // const metrics = url.searchParams.get('metrics') === 'true'

    const uni = await fetchUniswapOverview().catch(() => ({ tvl: 0, volume24h: 0, pools: [] as Array<unknown> }))
    const llama = await fetchDefiLlamaTop(['Aave', 'Curve Finance', 'Yearn Finance', 'Lido', 'MakerDAO', 'Compound', 'SushiSwap', 'PancakeSwap'])

    const llamaTvl = llama.reduce((sum, p) => sum + (p.tvl || 0), 0)
    const totalTVL = uni.tvl + llamaTvl
    const protocolCount = 1 + llama.length
    const marketOverview = {
      totalTVL,
      totalVolume24h: uni.volume24h,
      totalUsers: 0,
      totalTransactions: 0,
      protocolCount,
      tvlChange24h: 0,
      tvlChange7d: 0,
      tvlChange30d: 0,
      dominanceIndex: 0,
      avgAPY: 0,
      timestamp: new Date()
    }

    const supportedProtocols = [
      {
        id: 'uniswap-v3',
        name: 'Uniswap V3',
        type: 'DEX',
        blockchain: 'ethereum',
        tvl: uni.tvl,
        volume24h: uni.volume24h,
        riskScore: 85,
        tvlChange24h: 0,
        yieldApr: 0
      },
      ...llama.map(p => ({
        id: (p.name || '').toLowerCase().replace(/\s+/g, '-'),
        name: p.name || 'Unknown',
        type: (p.category || 'Protocol').toUpperCase(),
        blockchain: Array.isArray(p.chains) && p.chains.length > 0 ? String(p.chains[0]).toLowerCase() : 'multi',
        tvl: p.tvl || 0,
        volume24h: 0,
        riskScore: 0,
        tvlChange24h: 0,
        yieldApr: 0,
      }))
    ]

    const totalTvlForShare = supportedProtocols.reduce((sum, p) => sum + (p.tvl || 0), 0) || 1
    const categories: Record<string, { count: number; tvlShare: number }> = {}
    for (const p of supportedProtocols) {
      const key = String((p as { type?: string }).type || 'OTHER').toLowerCase()
      if (!categories[key]) categories[key] = { count: 0, tvlShare: 0 }
      categories[key].count += 1
      categories[key].tvlShare += ((p.tvl || 0) / totalTvlForShare) * 100
    }

    const analysis = {
      trendAnalysis: 'Uniswap v3（The Graph）と主要プロトコル（DefiLlama）の実データから集計。各プロトコルの詳細は順次拡充予定です。',
      riskAssessment: '外部APIの応答やスキーマに依存するため、取得できない指標は0や空配列で返却しています。',
      recommendations: [
        'DEXのTVLとボリューム推移を継続監視',
        'ポートフォリオ分散を検討',
        '他プロトコルの指標（リスク/ヘルス）を拡充後に再評価'
      ],
      opportunities: [
        'Uniswapの上位プールでの流動性提供機会を調査',
        '手数料レンジ戦略の検討（V3集中流動性）'
      ],
      risks: [
        'スマートコントラクト/MEV/価格変動リスク',
        '外部データの網羅性・遅延に起因する分析偏り'
      ]
    }

    const payload = {
      marketOverview,
      supportedProtocols,
      categories,
      analysis
    }

    return NextResponse.json({ success: true, data: payload, meta: { source: 'thegraph:uniswap-v3 + defillama', realTime } }, {
      headers: { 'Cache-Control': realTime ? 'no-store' : 'public, max-age=60, stale-while-revalidate=120' }
    })
  } catch (e) {
    return NextResponse.json({ success: true, data: { marketOverview: { totalTVL: 0, totalVolume24h: 0, totalUsers: 0, totalTransactions: 0, protocolCount: 0, tvlChange24h: 0, tvlChange7d: 0, tvlChange30d: 0, dominanceIndex: 0, avgAPY: 0, timestamp: new Date() }, supportedProtocols: [], categories: {}, analysis: { trendAnalysis: 'データ取得に失敗しました', riskAssessment: '', recommendations: [], opportunities: [], risks: [] } }, meta: { error: e instanceof Error ? e.message : String(e) } }, { status: 200 })
  }
}

// ラップ用ヘルパは未使用（重複エクスポート回避のため削除）
