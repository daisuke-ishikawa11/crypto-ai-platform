import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSupaQuery, safeOrderAndRange } from '@/lib/supabase/helpers'
import { fetchDexPools } from '@/lib/defi/dex-integrations'
import { createApiHandler } from '@/lib/utils/api-error-middleware'
import { runAdapter } from '@/lib/sdk/runner'
import { detectUniswapV4Hooks } from '@/lib/evm/uniswap-sdk-helpers'
import { computeRiskScoreSummary } from '@/lib/defi/risk-scoring'

async function handler(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const q = (searchParams.get('q') || '').trim().toLowerCase()
    const token = (searchParams.get('token') || '').trim().toLowerCase() // 追加: トークン/アドレス検索
    const network = searchParams.get('network') || 'all'
    const includeDexesParam = searchParams.get('includeDexes') || ''
    const includeHooks = searchParams.get('includeHooks') === 'true'
    const protocolFilter = (searchParams.get('protocolFilter') || 'uniswap-v3').toLowerCase()
    const includeUniswap = searchParams.get('includeUniswap') === 'true'
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)
    const offset = parseInt(searchParams.get('offset') || '0')
    const minApy = parseFloat(searchParams.get('minApy') || '0')
    const minTvl = parseFloat(searchParams.get('minTvl') || '0')
    const apyKind = (searchParams.get('apyKind') || 'fee').toLowerCase() // fee | reward | net（現状はfee計算に相当）
    const maxApy = parseFloat(searchParams.get('maxApy') || '100000')
    const sortBy = (searchParams.get('sortBy') || 'tvl').toLowerCase()
    const sortOrder = (searchParams.get('sortOrder') || 'desc').toLowerCase()
    const includeRisk = (searchParams.get('includeRisk') || 'summary').toLowerCase() !== 'none'

    type PoolItem = {
      source: 'internal' | 'external'
      name: string
      protocol: string
      network: string
      address?: string
      tvl: number
      apy: number
      volume24h: number
      // 追加メタ（AIブリッジ用に拡張）
      feeTier?: number
      token0Address?: string
      token1Address?: string
      graphSourceName?: string
      estimatedVolumeUsd24h?: number
      graphSourceUrl?: string
      meta?: Record<string, unknown>
    }
    type DbPoolRow = {
      pool_name?: string | null
      token_0_symbol?: string | null
      token_1_symbol?: string | null
      total_liquidity_usd?: number | null
      apy?: number | null
      volume_24h_usd?: number | null
      defi_protocols?: { name?: string | null; blockchain?: string | null; is_active?: boolean | null }
    }

    // 1) 内部DB
    const supabase = await createClient()
    const base = supabase
      .from('defi_liquidity_pools')
      .select('pool_name, token_0_symbol, token_1_symbol, total_liquidity_usd, apy, volume_24h_usd, defi_protocols!inner(name,blockchain)')
    const q0 = getSupaQuery(base)

    let dbResults: Array<PoolItem> = []
    if (q0) {
      const { data } = await safeOrderAndRange<DbPoolRow>(q0.eq('defi_protocols.is_active', true), 'total_liquidity_usd', false, 0, 99)
      const arr = Array.isArray(data) ? data : []
      dbResults = arr
        .filter(r => {
          if (!q) return true
          const name = String(r.pool_name || '').toLowerCase()
          const t0 = String(r.token_0_symbol || '').toLowerCase()
          const t1 = String(r.token_1_symbol || '').toLowerCase()
          const proto = String(r.defi_protocols?.name || '').toLowerCase()
          return name.includes(q) || t0.includes(q) || t1.includes(q) || proto.includes(q)
        })
        .map(r => ({
          source: 'internal' as const,
          name: String(r.pool_name || ''),
          protocol: String(r.defi_protocols?.name || ''),
          network: String(r.defi_protocols?.blockchain || ''),
          tvl: Number(r.total_liquidity_usd || 0),
          apy: Number(r.apy || 0),
          volume24h: Number(r.volume_24h_usd || 0)
        }))
        .filter(x => x.apy >= minApy && x.apy <= maxApy)
    }

    // 2) 外部DEX（Llama/The Graph）
    const includeDexes = includeDexesParam.split(',').map(s => s.trim()).filter(Boolean)
    const keys = [ ...(includeUniswap ? ['uniswap-v3'] : []), ...includeDexes ]
    const ext = keys.length > 0 ? await fetchDexPools(keys, network) : []
    // Llama由来データを突合用に保持（name/protocol/networkは小文字化）
    const llamaItems = ext.map(e => ({
      name: e.name.toLowerCase(),
      protocol: e.protocol.name.toLowerCase(),
      network: e.protocol.blockchain.toLowerCase(),
      baseApy: Number.isFinite(e.baseApy) ? e.baseApy : (Number.isFinite(e.apy) ? e.apy : 0),
      rewardApy: Number.isFinite(e.rewardApy) ? e.rewardApy : 0,
      netApy: Number.isFinite(e.netApy) ? e.netApy : (Number.isFinite(e.apy) ? e.apy : 0),
    }))
    let extResults: Array<PoolItem> = ext
      .filter(e => {
        if (!q && !token) return true
        const name = e.name.toLowerCase()
        const st = e.stakingToken.toLowerCase()
        const proto = e.protocol.name.toLowerCase()
        const addr = (e.address || '').toLowerCase()
        return (q && (name.includes(q) || st.includes(q) || proto.includes(q))) || (token && (addr.includes(token) || name.includes(token)))
      })
      .filter(e => (e.apy || 0) >= minApy && (e.apy || 0) <= maxApy)
      .filter(e => (e.totalStakedUsd || 0) >= minTvl)
      .map(e => {
        const base = typeof (e.baseApy) === 'number' ? e.baseApy : e.apy
        const reward = typeof (e.rewardApy) === 'number' ? e.rewardApy : 0
        const net = typeof (e.netApy) === 'number' ? e.netApy : (typeof e.apy === 'number' ? e.apy : (base + reward))
        const chosen = apyKind === 'reward' ? reward : apyKind === 'net' ? net : base
        return {
          source: 'external' as const,
          name: e.name,
          protocol: e.protocol.name,
          network: e.protocol.blockchain,
          address: (e.address || '') as string,
          tvl: e.totalStakedUsd,
          apy: chosen,
          volume24h: e.dailyRewardsUsd * 365, // 近似
          feeTier: undefined,
          token0Address: undefined,
          token1Address: undefined,
          graphSourceName: undefined,
          estimatedVolumeUsd24h: undefined,
          // 主要Graph環境変数の一部をメタとして返却
          graphSourceUrl: 'https://defillama.com',
        }
      })

    // 2b) Solana SDK直結（任意、runner経由で短期キャッシュ）
    if (network === 'solana' || network === 'all') {
      try {
        const [ray, orca] = await Promise.all([
          runAdapter<{ name: string; tvlUsd?: number; apy?: number; chain: 'solana' }[]>({ name: 'solana.raydium.pools', kind: 'solana', cacheKeyParams: { limit: 50 } }),
          runAdapter<{ name: string; tvlUsd?: number; apy?: number; chain: 'solana' }[]>({ name: 'solana.orca.pools', kind: 'solana', cacheKeyParams: { limit: 50 } })
        ])
        const toItem = (p: { name: string; tvlUsd?: number; apy?: number; chain: 'solana' }): PoolItem => ({
          source: 'external',
          name: p.name,
          protocol: p.name.split(' ')[0] || 'solana',
          network: p.chain,
          tvl: p.tvlUsd || 0,
          apy: p.apy || 0,
          volume24h: 0
        })
        if (Array.isArray(ray)) extResults = [...extResults, ...ray.map(r => toItem(r))]
        if (Array.isArray(orca)) extResults = [...extResults, ...orca.map(o => toItem(o))]
      } catch {}
    }

    // 2c) EVM: Uniswap v3（ハイブリッド: Ethereum/Polygon/Arbitrum/Optimism/Base）
    const uniTargets = ['ethereum','polygon','arbitrum','optimism','base']
    if ((network === 'all' || uniTargets.includes(network)) && extResults.length < limit) {
      try {
        const uni = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; feeTier?: number; token0Address?: string; token1Address?: string; estimatedVolumeUsd24h?: number }>>({
          name: 'evm.uniswap.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'ethereum' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(uni)) {
          const items = uni.map((u) => {
            const match = llamaItems.find(x => x.name === u.name.toLowerCase() && x.protocol.includes('uniswap'))
            const apy = apyKind === 'reward' ? (match?.rewardApy || 0)
              : apyKind === 'net' ? (match?.netApy || (u.apy || 0))
              : (u.apy || match?.baseApy || 0)
            return {
              source: 'external' as const,
              name: u.name,
              protocol: 'uniswap-v3',
              network: (network === 'all' ? 'ethereum' : network),
              address: (u as unknown as { address?: string }).address,
              tvl: u.tvlUsd || 0,
              apy,
              volume24h: 0,
              feeTier: u.feeTier,
              token0Address: u.token0Address,
              token1Address: u.token1Address,
              graphSourceName: 'uniswap-v3',
              estimatedVolumeUsd24h: u.estimatedVolumeUsd24h,
              graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
            }
          })
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2d) EVM: PancakeSwap（BSC、ハイブリッド）
    if ((network === 'bsc' || network === 'all') && extResults.length < limit) {
      try {
        const pcs = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; feeTier?: number; token0Address?: string; token1Address?: string; estimatedVolumeUsd24h?: number }>>({
          name: 'evm.pancakeswap.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'bsc' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(pcs)) {
          const items = pcs.map((u) => {
            const match = llamaItems.find(x => x.network === 'bsc' && x.name === u.name.toLowerCase() && x.protocol.includes('pancake'))
            const apy = apyKind === 'reward' ? (match?.rewardApy || 0)
              : apyKind === 'net' ? (match?.netApy || (u.apy || 0))
              : (u.apy || match?.baseApy || 0)
            return {
              source: 'external' as const,
              name: u.name,
              protocol: 'pancakeswap',
              network: 'bsc',
              address: (u as unknown as { address?: string }).address,
              tvl: u.tvlUsd || 0,
              apy,
              volume24h: 0,
              feeTier: u.feeTier,
              token0Address: u.token0Address,
              token1Address: u.token1Address,
              graphSourceName: 'pancakeswap-v3',
              estimatedVolumeUsd24h: u.estimatedVolumeUsd24h,
              graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
            }
          })
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2e) EVM: SushiSwap（Graph経由）
    if (extResults.length < limit) {
      try {
        const sushi = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; token0Address?: string; token1Address?: string; sourceGraphUrl?: string }>>({
          name: 'evm.sushiswap.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'ethereum' : (network as string) },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(sushi)) {
          const items = sushi.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: 'sushiswap',
            network: (network === 'all' ? 'ethereum' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            token0Address: u.token0Address,
            token1Address: u.token1Address,
            graphSourceName: 'sushiswap',
            estimatedVolumeUsd24h: undefined,
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2f) EVM: QuickSwap（Graph v3優先→v2フォールバック）
    if (extResults.length < limit && (network === 'polygon' || network === 'all')) {
      try {
        const qs = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; feeTier?: number; token0Address?: string; token1Address?: string; sourceGraphUrl?: string }>>({
          name: 'evm.quickswap.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'polygon' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(qs)) {
          const items = qs.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: (u.feeTier ? 'quickswap-v3' : 'quickswap'),
            network: (network === 'all' ? 'polygon' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            feeTier: u.feeTier,
            token0Address: u.token0Address,
            token1Address: u.token1Address,
            graphSourceName: 'quickswap',
            estimatedVolumeUsd24h: undefined,
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2g) EVM: Velodrome（Optimism）
    if (extResults.length < limit && (network === 'optimism' || network === 'all')) {
      try {
        const velo = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; token0Address?: string; token1Address?: string; sourceGraphUrl?: string }>>({
          name: 'evm.velodrome.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'optimism' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(velo)) {
          const items = velo.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: 'velodrome',
            network: (network === 'all' ? 'optimism' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            token0Address: u.token0Address,
            token1Address: u.token1Address,
            graphSourceName: 'velodrome',
            estimatedVolumeUsd24h: undefined,
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2h) EVM: Camelot（Arbitrum）
    if (extResults.length < limit && (network === 'arbitrum' || network === 'all')) {
      try {
        const cam = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; feeTier?: number; token0Address?: string; token1Address?: string; sourceGraphUrl?: string }>>({
          name: 'evm.camelot.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'arbitrum' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(cam)) {
          const items = cam.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: (u.feeTier ? 'camelot-v3' : 'camelot'),
            network: (network === 'all' ? 'arbitrum' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            feeTier: u.feeTier,
            token0Address: u.token0Address,
            token1Address: u.token1Address,
            graphSourceName: 'camelot',
            estimatedVolumeUsd24h: undefined,
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2i) EVM: Trader Joe（Avalanche）
    if (extResults.length < limit && (network === 'avalanche' || network === 'all')) {
      try {
        const tj = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; token0Address?: string; token1Address?: string; sourceGraphUrl?: string }>>({
          name: 'evm.traderjoe.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'avalanche' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(tj)) {
          const items = tj.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: 'trader-joe',
            network: (network === 'all' ? 'avalanche' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            token0Address: u.token0Address,
            token1Address: u.token1Address,
            graphSourceName: 'trader-joe',
            estimatedVolumeUsd24h: undefined,
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2j) EVM: Curve
    if (extResults.length < limit && (network === 'ethereum' || network === 'all')) {
      try {
        const cv = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; token0Address?: string; token1Address?: string; sourceGraphUrl?: string }>>({
          name: 'evm.curve.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'ethereum' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(cv)) {
          const items = cv.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: 'curve',
            network: (network === 'all' ? 'ethereum' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            token0Address: u.token0Address,
            token1Address: u.token1Address,
            graphSourceName: 'curve',
            estimatedVolumeUsd24h: undefined,
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // 2k) EVM: Aave（フォールバック由来）
    if (extResults.length < limit && (network === 'ethereum' || network === 'all')) {
      try {
        const av = await runAdapter<Array<{ name: string; tvlUsd?: number; apy?: number; chain: string; sourceGraphUrl?: string }>>({
          name: 'evm.aave.pools',
          kind: 'generic',
          options: { network: network === 'all' ? 'ethereum' : network },
          cacheKeyParams: { limit: 50, net: network }
        })
        if (Array.isArray(av)) {
          const items = av.map((u) => ({
            source: 'external' as const,
            name: u.name,
            protocol: 'aave',
            network: (network === 'all' ? 'ethereum' : network),
            address: (u as unknown as { address?: string }).address,
            tvl: u.tvlUsd || 0,
            apy: u.apy || 0,
            volume24h: 0,
            graphSourceName: 'aave',
            graphSourceUrl: (u as { sourceGraphUrl?: string }).sourceGraphUrl,
          }))
          extResults = [...extResults, ...items]
        }
      } catch {}
    }

    // Optional: Uniswap v4 hooks detection (throttled)
    if (includeHooks) {
      const hookTimeoutMs = Number(process.env.V4_HOOKS_TIMEOUT_MS || 1500)
      const hookMax = Math.max(0, Math.min(Number(process.env.V4_HOOKS_MAX_ITEMS || 5), extResults.length))
      const tasks = extResults.slice(0, hookMax).map(async (item) => {
        try {
          // 将来v4以外のプロトコルにも対応できるように可変化
          if (item.protocol.toLowerCase() !== protocolFilter || item.network !== 'ethereum') return null
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), hookTimeoutMs)
          try {
            const hooks = await detectUniswapV4Hooks('ethereum', (item as unknown as { token0Address?: string }).token0Address || (item as unknown as { address?: string }).address || '')
            return { idx: extResults.indexOf(item), hooks }
          } finally {
            clearTimeout(timer)
          }
        } catch { return null }
      })
      const results = await Promise.all(tasks)
      results.filter((v): v is { idx: number; hooks: unknown } => !!v && typeof (v as { idx?: unknown }).idx === 'number').forEach((r) => {
        if (r.idx >= 0 && typeof r.hooks !== 'undefined') {
          // 既存構造を崩さず、graphSourceNameと同階層にmeta拡張
          const curr: Record<string, unknown> = (extResults[r.idx] as unknown as { meta?: Record<string, unknown> }).meta || {}
          ;(extResults[r.idx] as unknown as { meta?: Record<string, unknown> }).meta = { ...curr, hooks: r.hooks }
        }
      })
    }

    // 3) マージ＆ソート
    let merged: Array<PoolItem & { meta?: Record<string, unknown> }> = [...dbResults, ...extResults]
      .filter(x => x.tvl >= minTvl)
      .sort((a, b) => {
        const key = sortBy === 'apy' ? 'apy' : (sortBy === 'volume' ? 'volume24h' : 'tvl')
        const av = a[key] || 0
        const bv = b[key] || 0
        return sortOrder === 'asc' ? av - bv : bv - av
      })
      .slice(offset, offset + limit)

    // リスクサマリ（減点方式: 低スコア=要警戒）を必要時に付与
    if (includeRisk) {
      merged = merged.map((it) => {
        try {
          const risk = computeRiskScoreSummary({
            protocol: it.protocol,
            network: it.network,
            tvl: it.tvl,
            apy: it.apy,
            volume24h: it.volume24h,
            graphSourceUrl: it.graphSourceUrl,
            feeTier: (it as { feeTier?: number }).feeTier,
          })
          const currMeta = (it as { meta?: Record<string, unknown> }).meta || {}
          return { ...it, meta: { ...currMeta, risk } }
        } catch {
          return it
        }
      })
    }

    return NextResponse.json({ success: true, data: { items: merged, total: dbResults.length + extResults.length, offset, limit, filters: { q, token, network, includeDexes: includeDexesParam, includeUniswap, minApy, maxApy, minTvl, apyKind, sortBy, sortOrder } } })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export const GET = createApiHandler({ handler, rateLimit: { limit: 30, window: 60_000 }, errorOptions: { enableLogging: true } })
