import { NextRequest, NextResponse } from 'next/server'
import { getRedis } from '@/lib/redis/client'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type SnapshotPoint = { t: number; tvlUsd?: number; apy?: number }

function k(id: string) { return `defi:pools:hist:${id}` }

// listの形式（;区切り、各要素は | 区切り）
// label|network|dexes|query
// 例: "uni_weth_usdc|ethereum|uniswap-v3|weth-usdc; pcs_wbnb_busd|bsc|pancakeswap|wbnb-busd"
// query は /api/defi/pools/search の q か token(アドレス)に流用されます

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    // 優先順: DB(snapshot_targets) → ENV(SNAPSHOT_BATCH_LIST) → クエリ(list)
    let supabase: Awaited<ReturnType<typeof createClient>> | null = null
    try {
      supabase = await createClient()
    } catch {
      supabase = null
    }
    let dbList = ''
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('snapshot_targets')
          .select('label, network, dexes, query')
          .eq('enabled', true)
          .order('priority', { ascending: true })
        if (!error && Array.isArray(data) && data.length > 0) {
          dbList = data
            .map((r: { label?: string | null; network?: string | null; dexes?: string | null; query?: string | null }) =>
              `${(r.label||'').trim()}|${(r.network||'').trim()}|${(r.dexes||'').trim()}|${(r.query||'').trim()}`
            )
            .filter(s => s.split('|')[0])
            .join(';')
        }
      } catch {}
    }
    const envList = process.env.SNAPSHOT_BATCH_LIST || ''
    const queryList = url.searchParams.get('list') || ''
    const listParam = (dbList && dbList.length > 0) ? dbList : (envList || queryList)
    const keep = Math.max(2, Math.min(200, Number(url.searchParams.get('keep') || '50')))
    const ttlMs = Math.max(10_000, Math.min(120_000, Number(url.searchParams.get('timeoutMs') || process.env.BATCH_SEARCH_TIMEOUT_MS || '60000')))
    const tolApy = Number(process.env.SNAPSHOT_TOL_APY_PCT || 5)
    const tolTvl = Number(process.env.SNAPSHOT_TOL_TVL_PCT || 5)
    const redis = await getRedis()
    if (!redis) return NextResponse.json({ success: false, error: 'redis not configured' }, { status: 501 })

    const entries = listParam.split(';').map(s => s.trim()).filter(Boolean)
    if (entries.length === 0) {
      return NextResponse.json({ success: false, error: 'list required' }, { status: 400 })
    }

    async function withTimeout<T>(p: Promise<T>): Promise<T> {
      return await Promise.race<T>([
        p,
        new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout')), ttlMs))
      ])
    }

    const results: Array<{ id: string; ok: boolean; tvl?: number; apy?: number; reason?: string }> = []
    for (const line of entries) {
      try {
        const [label, network, dexes, query] = line.split('|')
        const id = (label || '').trim()
        const net = (network || 'all').trim()
        const includeDexes = (dexes || '').trim()
        const q = (query || '').trim()
        if (!id || !q) { results.push({ id: id || '(empty)', ok: false, reason: 'invalid entry' }); continue }

        const params = new URLSearchParams()
        params.set('limit', '1')
        params.set('network', net || 'all')
        if (includeDexes) params.set('includeDexes', includeDexes)
        // アドレス優先: 0x or solanaアドレスは token に流す
        if (/^(0x[0-9a-f]{40}|[1-9A-HJ-NP-Za-km-z]{32,44})$/i.test(q)) params.set('token', q)
        else params.set('q', q)

        const searchUrl = `${url.origin}/api/defi/pools/search?${params.toString()}`
        const r = await withTimeout(fetch(searchUrl, { method: 'GET', cache: 'no-store' }))
        if (!r.ok) { results.push({ id, ok: false, reason: `search ${r.status}` }); continue }
        const j = await r.json().catch(() => null) as { data?: { items?: Array<{ tvl?: number; apy?: number }> } } | null
        const first = j?.data?.items && j.data.items[0]
        const tvl = Number(first?.tvl || 0)
        const apy = Number(first?.apy || 0)
        const point: SnapshotPoint = { t: Date.now(), tvlUsd: tvl, apy }
        await redis.lpush(k(id), JSON.stringify(point))
        await redis.ltrim(k(id), 0, keep - 1)
        results.push({ id, ok: true, tvl, apy })
        // 逸脱チェック（メトリクス通知は比較APIが担当）
        try {
          const cmpUrl = `${url.origin}/api/defi/pools/history/compare?id=${encodeURIComponent(id)}&tolerance_apy=${tolApy}&tolerance_tvl=${tolTvl}`
          await withTimeout(fetch(cmpUrl, { cache: 'no-store' }))
        } catch {}
      } catch (e) {
        results.push({ id: line.split('|')[0] || '(unknown)', ok: false, reason: e instanceof Error ? e.message : 'error' })
      }
    }

    return NextResponse.json({ success: true, data: { results, keep } })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
