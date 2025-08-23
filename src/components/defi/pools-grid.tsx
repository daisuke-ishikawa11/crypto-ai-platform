"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PoolDetailsModal, PoolDetails } from '@/components/defi/pool-details-modal'
import { getDexInfo } from '@/lib/defi/dex-registry'
import { assessPoolRiskLight } from '@/lib/defi/risk-heuristics'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { buildLessonPath } from '@/lib/learning/route-utils'

type Pool = {
  id: string
  project: string
  chain: string
  symbol?: string
  tvlUsd?: number
  apy?: number
  apyBase?: number
  apyReward?: number
  url?: string
}

type PoolsResponse = { data: Pool[] }
type MetaResponse = { data: { poolChains: string[]; poolProjects: string[] } }

function formatUsd(n?: number): string {
  if (typeof n !== 'number') return '—'
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

export const PoolsGrid: React.FC<{ chain?: string; project?: string; limit?: number }> = ({ chain, project, limit = 60 }) => {
  const { success, error } = useToast()
  const [sortBy, setSortBy] = React.useState<'tvlUsd' | 'apy' | 'risk'>('tvlUsd')
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc')
  const [pageSize, setPageSize] = React.useState<number>(18)
  const [page, setPage] = React.useState<number>(1)
  const [query, setQuery] = React.useState<string>("")
  const [riskFilter, setRiskFilter] = React.useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all')
  const [favOnly, setFavOnly] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<PoolDetails | null>(null)

  // Advanced search (integrates /api/defi/pools/search)
  type SearchItem = { source: 'internal' | 'external'; name: string; protocol: string; network: string; tvl: number; apy: number; volume24h: number; graphSourceUrl?: string; meta?: { latencyMs?: number; fetchedAt?: number } }
  const [advOpen, setAdvOpen] = React.useState(false)
  const [advQ, setAdvQ] = React.useState("")
  const [advToken, setAdvToken] = React.useState("")
  const [tokenSuggest, setTokenSuggest] = React.useState<string[]>([])
  const [advNetwork, setAdvNetwork] = React.useState('all')
  const [advIncludeUniswap, setAdvIncludeUniswap] = React.useState(true)
  const [advIncludeDexes, setAdvIncludeDexes] = React.useState('pancakeswap,sushiswap,quickswap,camelot,velodrome,trader-joe,raydium,orca,curve,convex')
  const [advMinApy, setAdvMinApy] = React.useState<number>(0)
  const [advMaxApy, setAdvMaxApy] = React.useState<number>(100000)
  const [advMinTvl, setAdvMinTvl] = React.useState<number>(0)
  const [advApyKind, setAdvApyKind] = React.useState<'fee'|'reward'|'net'>('fee')
  const [advSortBy, setAdvSortBy] = React.useState<'tvl'|'volume'|'apy'|'latency'|'freshness'>('tvl')
  const [advSortOrder, setAdvSortOrder] = React.useState<'asc'|'desc'>('desc')
  const [searchItems, setSearchItems] = React.useState<SearchItem[] | null>(null)
  const [searchTotal, setSearchTotal] = React.useState<number>(0)
  const [searchLoading, setSearchLoading] = React.useState<boolean>(false)
  const [searchError, setSearchError] = React.useState<string | null>(null)
  // Alert settings (threshold/notification methods)
  const [alertApyThreshold, setAlertApyThreshold] = React.useState<number>(0)
  const [alertCooldownMin, setAlertCooldownMin] = React.useState<number>(60)
  const [alertNotifyInApp, setAlertNotifyInApp] = React.useState<boolean>(true)
  const [alertNotifyEmail, setAlertNotifyEmail] = React.useState<boolean>(false)
  const [alertNotifyWebhook, setAlertNotifyWebhook] = React.useState<boolean>(false)
  const [csrfToken, setCsrfToken] = React.useState<string | null>(null)
  const getSelectedNotificationMethods = () => {
    const methods: Array<'in_app' | 'email' | 'webhook'> = []
    if (alertNotifyInApp) methods.push('in_app')
    if (alertNotifyEmail) methods.push('email')
    if (alertNotifyWebhook) methods.push('webhook')
    return methods
  }

  // Load defaults from prefs
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/defi/prefs', { cache: 'no-store' })
        if (!res.ok) return
        const j = await res.json().catch(() => null) as { data?: { settings?: { notifications?: { inApp?: boolean; email?: boolean; discordWebhook?: string } } } } | null
        const n = j?.data?.settings?.notifications
        if (n) {
          if (typeof n.inApp === 'boolean') setAlertNotifyInApp(n.inApp)
          if (typeof n.email === 'boolean') setAlertNotifyEmail(n.email)
          if (typeof n.discordWebhook === 'string' && n.discordWebhook.trim().startsWith('http')) setAlertNotifyWebhook(true)
        }
      } catch {}
    })()
    const onPrefs = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail as { settings?: { inApp?: boolean; email?: boolean } } | undefined
        const ns = detail?.settings
        if (ns) {
          if (typeof ns.inApp === 'boolean') setAlertNotifyInApp(ns.inApp)
          if (typeof ns.email === 'boolean') setAlertNotifyEmail(ns.email)
        }
      } catch {}
    }
    if (typeof window !== 'undefined') window.addEventListener('defi:prefs:updated', onPrefs as EventListener)
    return () => { if (typeof window !== 'undefined') window.removeEventListener('defi:prefs:updated', onPrefs as EventListener) }
  }, [])

  // Ensure CSRF token for POST endpoints that require it
  const ensureCsrf = React.useCallback(async (): Promise<string> => {
    if (csrfToken) return csrfToken
    try {
      const r = await fetch('/api/csrf', { method: 'GET', cache: 'no-store' })
      if (!r.ok) throw new Error('csrf fetch failed')
      const j = await r.json().catch(() => null) as { csrfToken?: string } | null
      if (j?.csrfToken) { setCsrfToken(j.csrfToken); return j.csrfToken }
    } catch {}
    throw new Error('CSRF token unavailable')
  }, [csrfToken])
  const mkSearchFavId = (it: SearchItem) => `ext:${it.protocol}:${it.name}:${it.network}`
  const toggleSearchFav = async (it: SearchItem) => {
    const id = mkSearchFavId(it)
    setFavorites(prev => {
      const next = { ...prev }
      if (next[id]) delete next[id]; else next[id] = true
      if (typeof window !== 'undefined') localStorage.setItem('defi-fav-pools', JSON.stringify(next))
      return next
    })
    try { await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ favPools: { [id]: true } }) }) } catch {}
  }
  const createAlertForSearchItem = async (it: SearchItem) => {
    try {
      const body = {
        type: 'yield_change',
        description: `APY alert for ${it.name} (${it.protocol} on ${it.network})`,
        conditions: [{ metric: 'apy', op: 'gte', value: (typeof alertApyThreshold === 'number' && alertApyThreshold > 0 ? alertApyThreshold : (advMinApy || it.apy || 0)), target: { protocol: it.protocol, network: it.network, name: it.name } }],
        cooldownPeriod: alertCooldownMin,
        notificationMethods: getSelectedNotificationMethods()
      }
      const token = await ensureCsrf()
      const res = await fetch('/api/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-csrf-token': token }, body: JSON.stringify(body) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        error(j?.error || `Alert create failed (${res.status})`)
        return
      }
      success('アラートを作成しました')
    } catch (e) {
      error(e instanceof Error ? e.message : String(e))
    }
  }
  const createAlertForPool = async (p: Pool) => {
    try {
      const body = {
        type: 'yield_change',
        description: `APY alert for ${p.symbol || p.project} (${p.chain})`,
        conditions: [{ metric: 'apy', op: 'gte', value: (typeof alertApyThreshold === 'number' && alertApyThreshold > 0 ? alertApyThreshold : (typeof p.apy === 'number' ? p.apy : 0)), target: { protocol: p.project, network: p.chain, name: p.symbol || p.project } }],
        cooldownPeriod: alertCooldownMin,
        notificationMethods: getSelectedNotificationMethods()
      }
      const token = await ensureCsrf()
      const res = await fetch('/api/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-csrf-token': token }, body: JSON.stringify(body) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        error(j?.error || `Alert create failed (${res.status})`)
        return
      }
      success('アラートを作成しました')
    } catch (e) {
      error(e instanceof Error ? e.message : String(e))
    }
  }
  
  const submitAdvancedSearch = async () => {
    try {
      setSearchLoading(true); setSearchError(null)
      const sp = new URLSearchParams()
      if (advQ) sp.set('q', advQ)
      if (advToken) sp.set('token', advToken)
      if (advNetwork) sp.set('network', advNetwork)
      if (advIncludeDexes) sp.set('includeDexes', advIncludeDexes)
      if (advIncludeUniswap) sp.set('includeUniswap', 'true')
      sp.set('minApy', String(advMinApy))
      sp.set('maxApy', String(advMaxApy))
      sp.set('minTvl', String(advMinTvl))
      sp.set('apyKind', advApyKind)
      // サーバ側はtvl/volume/apyのみ。latency/freshnessはクライアントで並べ替え。
      const mappedSort = ['latency','freshness'].includes(advSortBy) ? 'tvl' : advSortBy
      sp.set('sortBy', mappedSort)
      sp.set('sortOrder', advSortOrder)
      sp.set('limit', '60')
      sp.set('offset', '0')
      const res = await fetch(`/api/defi/pools/search?${sp.toString()}`, { cache: 'no-store' })
      const j = await res.json()
      if (!res.ok || !j?.success) throw new Error(j?.error || 'search failed')
      let items = Array.isArray(j?.data?.items) ? (j.data.items as SearchItem[]) : []
      if (advSortBy === 'latency') {
        items = [...items].sort((a, b) => {
          const av = (a.meta?.latencyMs ?? Number.POSITIVE_INFINITY)
          const bv = (b.meta?.latencyMs ?? Number.POSITIVE_INFINITY)
          return advSortOrder === 'asc' ? av - bv : bv - av
        })
      } else if (advSortBy === 'freshness') {
        items = [...items].sort((a, b) => {
          const av = (a.meta?.fetchedAt ?? 0)
          const bv = (b.meta?.fetchedAt ?? 0)
          return advSortOrder === 'asc' ? av - bv : bv - av
        })
      }
      setSearchItems(items)
      setSearchTotal(Number(j?.data?.total || 0))
      // URLに高度検索条件を保存
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const usp = url.searchParams
        const setOrDel = (k: string, v: string | number | boolean) => {
          const s = String(v)
          if (s && s !== '0' && s !== 'false') usp.set(k, s); else usp.delete(k)
        }
        setOrDel('as_active', 1)
        setOrDel('as_q', advQ)
        setOrDel('as_token', advToken)
        setOrDel('as_net', advNetwork)
        setOrDel('as_dexes', advIncludeDexes)
        setOrDel('as_uni', advIncludeUniswap)
        setOrDel('as_min', advMinApy)
        setOrDel('as_max', advMaxApy)
        setOrDel('as_min_tvl', advMinTvl)
        setOrDel('as_apy_kind', advApyKind)
        setOrDel('as_sort', advSortBy)
        setOrDel('as_order', advSortOrder)
        url.search = usp.toString()
        window.history.replaceState({}, '', url.toString())
      }
      setAdvOpen(false)
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : String(e))
    } finally {
      setSearchLoading(false)
    }
  }

  // トークンサジェスト取得
  React.useEffect(() => {
    let aborted = false
    const run = async () => {
      try {
        const params = new URLSearchParams()
        if (advToken) params.set('q', advToken)
        if (advNetwork) params.set('chain', advNetwork)
        params.set('limit', '8')
        const r = await fetch(`/api/defi/tokens/suggest?${params.toString()}`, { cache: 'no-store' })
        const j = await r.json().catch(() => null) as { success?: boolean; data?: { items?: Array<{ symbol: string }> } } | null
        if (!aborted && j?.success) setTokenSuggest((j.data?.items || []).map(i => i.symbol))
      } catch {
        if (!aborted) setTokenSuggest([])
      }
    }
    const t = setTimeout(run, 150)
    return () => { aborted = true; clearTimeout(t) }
  }, [advToken, advNetwork])

  // URL から高度検索条件を復元（as_*）
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const p = url.searchParams
    const active = p.get('as_active') === '1'
    const qv = p.get('as_q') || ''
    const tk = p.get('as_token') || ''
    const net = p.get('as_net') || 'all'
    const dexes = p.get('as_dexes') || advIncludeDexes
    const uni = p.get('as_uni') === 'true' || p.get('as_uni') === '1'
    const min = parseFloat(p.get('as_min') || '0')
    const max = parseFloat(p.get('as_max') || '100000')
    const mt = parseFloat(p.get('as_min_tvl') || '0')
    const ak = (p.get('as_apy_kind') || 'fee') as 'fee'|'reward'|'net'
    const sb = (p.get('as_sort') || 'tvl') as 'tvl'|'volume'|'apy'|'latency'|'freshness'
    const so = (p.get('as_order') || 'desc') as 'asc'|'desc'
    setAdvQ(qv)
    setAdvToken(tk)
    setAdvNetwork(net)
    setAdvIncludeDexes(dexes)
    setAdvIncludeUniswap(uni)
    if (Number.isFinite(min)) setAdvMinApy(min)
    if (Number.isFinite(max)) setAdvMaxApy(max)
    if (Number.isFinite(mt)) setAdvMinTvl(mt)
    if (['fee','reward','net'].includes(ak)) setAdvApyKind(ak)
    if (['tvl','volume','apy'].includes(sb)) setAdvSortBy(sb)
    if (['asc','desc'].includes(so)) setAdvSortOrder(so)
    if (active) {
      // 自動検索（非同期）
      setTimeout(() => { submitAdvancedSearch().catch(()=>{}) }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Deep-link support from anomalies panel (pl_id)
  const pendingPoolIdRef = React.useRef<string | null>(null)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const id = url.searchParams.get('pl_id')
    if (id) pendingPoolIdRef.current = id
  }, [])
  const [favorites, setFavorites] = React.useState<Record<string, true>>(() => {
    if (typeof window === 'undefined') return {}
    try { return JSON.parse(localStorage.getItem('defi-fav-pools') || '{}') as Record<string, true> } catch { return {} }
  })
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/defi/prefs')
        if (res.ok) {
          const j = await res.json()
          if (j?.data?.favPools) setFavorites(j.data.favPools as Record<string, true>)
        }
      } catch {}
    })()
  }, [])
  const toggleFav = async (id: string) => {
    setFavorites(prev => {
      const next = { ...prev }
      if (next[id]) delete next[id]; else next[id] = true
      if (typeof window !== 'undefined') localStorage.setItem('defi-fav-pools', JSON.stringify(next))
      return next
    })
    try { await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ favPools: { [id]: true } }) }) } catch {}
  }
  const metaQ = useQuery<MetaResponse>({
    queryKey: ['defi-meta-pools'],
    queryFn: async () => {
      const res = await fetch('/api/defi/metadata')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  // Sync page state with URL (pl_page, pl_rows)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const p = Number(url.searchParams.get('pl_page') || '1')
    const r = Number(url.searchParams.get('pl_rows') || '18')
    const s = (url.searchParams.get('pl_sort') || 'tvlUsd') as 'tvlUsd' | 'apy' | 'risk'
    const d = (url.searchParams.get('pl_dir') || 'desc') as 'asc' | 'desc'
    const rf = (url.searchParams.get('pl_risk') || 'all') as 'all' | 'low' | 'medium' | 'high' | 'critical'
    if (Number.isFinite(p) && p > 0) setPage(p)
    if (Number.isFinite(r) && [12,18,24,36].includes(r)) setPageSize(r)
    if (['tvlUsd','apy','risk'].includes(s)) setSortBy(s)
    if (['asc','desc'].includes(d)) setSortDir(d)
    if (['all','low','medium','high','critical'].includes(rf)) setRiskFilter(rf)
  }, [])
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('pl_page', String(page))
    url.searchParams.set('pl_rows', String(pageSize))
    url.searchParams.set('pl_sort', sortBy)
    url.searchParams.set('pl_dir', sortDir)
    url.searchParams.set('pl_risk', riskFilter)
    window.history.replaceState({}, '', url.toString())
  }, [page, pageSize, sortBy, sortDir, riskFilter])
  const params = new URLSearchParams()
  if (chain) params.set('chain', chain)
  if (project) params.set('project', project)
  params.set('limit', String(limit))

  const { data, isLoading, isError } = useQuery<PoolsResponse>({
    queryKey: ['defi-pools', chain, project, limit],
    queryFn: async () => {
      const res = await fetch(`/api/defi/pools?${params.toString()}`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  React.useEffect(() => {
    if (!data?.data || !pendingPoolIdRef.current) return
    const found = data.data.find(p => p.id === pendingPoolIdRef.current)
    if (found) {
      const selected: PoolDetails = {
        id: found.id,
        project: found.project,
        chain: found.chain,
        symbol: found.symbol,
        tvlUsd: found.tvlUsd,
        apy: found.apy,
        apyBase: found.apyBase,
        apyReward: found.apyReward,
        url: found.url
      }
      setSelected(selected)
      pendingPoolIdRef.current = null
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}><CardContent className="p-6"><div className="h-40 bg-muted rounded" /></CardContent></Card>
        ))}
      </div>
    )
  }
  if (isError || !data?.data) return <div className="text-sm text-red-600">Failed to load pools.</div>

  const filtered = [...data.data].filter(p => {
    if (!query) return true
    const q = query.toLowerCase()
    return (p.symbol?.toLowerCase().includes(q) || p.project.toLowerCase().includes(q) || p.chain.toLowerCase().includes(q))
  })
  .filter(p => !favOnly || Boolean(favorites[p.id]))
  const riskScore = (p: Pool) => assessPoolRiskLight(p).score
  const filteredByRisk = filtered.filter(p => {
    if (riskFilter === 'all') return true
    const r = assessPoolRiskLight(p).severity
    return r === riskFilter
  })
  const sorted = filteredByRisk.sort((a, b) => {
    if (sortBy === 'tvlUsd') {
      const av = a.tvlUsd ?? 0
      const bv = b.tvlUsd ?? 0
      return sortDir === 'asc' ? av - bv : bv - av
    }
    if (sortBy === 'risk') {
      const av = riskScore(a)
      const bv = riskScore(b)
      return sortDir === 'asc' ? av - bv : bv - av
    }
    const av = typeof a.apy === 'number' ? a.apy : -Infinity
    const bv = typeof b.apy === 'number' ? b.apy : -Infinity
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const pageItems = sorted.slice(start, start + pageSize)

  return (
    <>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <label className="text-sm text-muted-foreground">Sort by</label>
        <select aria-label="Sort pools by" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'tvlUsd' | 'apy' | 'risk')} className="border rounded px-2 py-1 bg-background">
          <option value="tvlUsd">TVL</option>
          <option value="apy">APY</option>
          <option value="risk">Risk</option>
        </select>
        <select aria-label="Sort direction" value={sortDir} onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')} className="border rounded px-2 py-1 bg-background">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
        <label className="text-sm text-muted-foreground">Risk</label>
        <select aria-label="Filter by risk severity" value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value as 'all' | 'low' | 'medium' | 'high' | 'critical'); setPage(1) }} className="border rounded px-2 py-1 bg-background">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <label className="text-sm text-muted-foreground" htmlFor="pool-search">Search</label>
        <input id="pool-search" aria-label="Search pools" list="pool-suggest" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="symbol/project/chain" className="border rounded px-2 py-1 bg-background" />
        <datalist id="pool-suggest">
          {((metaQ.data?.data.poolProjects ?? []).slice(0, 50)).map(p => (
            <option key={`proj-${p}`} value={p} />
          ))}
          {((metaQ.data?.data.poolChains ?? []).slice(0, 50)).map(c => (
            <option key={`chain-${c}`} value={c} />
          ))}
        </datalist>
        <label className="text-sm text-muted-foreground" htmlFor="pool-page-size">Cards</label>
        <select id="pool-page-size" aria-label="Cards per page" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1 bg-background">
          {[12,18,24,36].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={favOnly} onChange={(e) => { setFavOnly(e.target.checked); setPage(1) }} />Fav only</label>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <button
            aria-label="Advanced search"
            className="px-2 py-1 border rounded hover:bg-muted"
            onClick={() => setAdvOpen(true)}
          >Advanced search</button>
          <span>{filtered.length.toLocaleString()} pools • Page {currentPage}/{totalPages}</span>
          <button aria-label="Previous page" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
          <button aria-label="Next page" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
          <a className="px-2 py-1 border rounded hover:bg-muted" href={`/api/defi/pools/export?meta=1&precision=0&limit=${encodeURIComponent(String(limit))}${chain ? `&chain=${encodeURIComponent(chain)}` : ''}${project ? `&project=${encodeURIComponent(project)}` : ''}`}>Export CSV</a>
          <button
            aria-label="Share current pool filters"
            className="px-2 py-1 border rounded hover:bg-muted"
            onClick={async () => {
              try {
                const url = new URL(window.location.href)
                const sp = new URLSearchParams(url.search)
                sp.set('pl_page', String(currentPage))
                sp.set('pl_rows', String(pageSize))
                sp.set('pl_sort', sortBy)
                sp.set('pl_dir', sortDir)
                sp.set('pl_risk', riskFilter)
                if (query) sp.set('pl_q', query); else sp.delete('pl_q')
                if (chain) sp.set('chain', chain)
                if (project) sp.set('project', project)
                url.search = sp.toString()
                let toCopy = url.toString()
                try {
                  const r = await fetch('/api/utils/shortlink', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: toCopy, ttlSec: 86400 }) })
                  const j = await r.json().catch(()=>null) as { success?: boolean; short?: string } | null
                  if (r.ok && j?.success && typeof j.short === 'string') toCopy = j.short
                } catch {}
                await navigator.clipboard.writeText(toCopy)
                success('プールの共有リンクをコピーしました')
              } catch {
                error('共有リンクのコピーに失敗しました')
              }
            }}
            onKeyDown={(ev) => { if (ev.key === 'Enter') { ev.preventDefault(); (ev.currentTarget as HTMLButtonElement).click() } }}
          >Share Link</button>
        </div>
      </div>
      {searchItems && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Advanced search results ({searchTotal.toLocaleString()})</div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded hover:bg-muted text-sm" onClick={() => setSearchItems(null)}>Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchItems.map((it, i) => (
              <Card key={`sr-${i}`}>
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold truncate" title={it.name}>{it.name}</div>
                    <Badge variant="secondary">{it.network}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="px-2 py-0.5 border rounded">{it.source}</span>
                    <span className="truncate" title={it.protocol}>{it.protocol}</span>
                  </div>
                  <div className="text-sm">TVL: <span className="font-medium">{formatUsd(it.tvl)}</span></div>
                  <div className="text-sm">APY: <span className="font-medium">{typeof it.apy === 'number' ? `${it.apy.toFixed(2)}%` : '—'}</span></div>
                  <div className="text-xs text-muted-foreground">Vol(approx): {formatUsd(it.volume24h)}</div>
                  {it.graphSourceUrl && (
                    <div className="text-xs">
                      Source: <a href={it.graphSourceUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">{it.graphSourceUrl}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <button aria-label={favorites[mkSearchFavId(it)] ? 'Remove favorite' : 'Add favorite'} onClick={() => toggleSearchFav(it)} className="px-1 py-0.5 border rounded hover:bg-muted">{favorites[mkSearchFavId(it)] ? '★' : '☆'}</button>
                    <button
                      aria-label="Share current search"
                      className="px-2 py-1 border rounded hover:bg-muted"
                      onClick={async () => {
                        try {
                          const url = new URL(window.location.href)
                          let toCopy = url.toString()
                          try {
                            const r = await fetch('/api/utils/shortlink', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: toCopy, ttlSec: 86400 }) })
                            const j = await r.json().catch(()=>null) as { success?: boolean; short?: string } | null
                            if (r.ok && j?.success && typeof j.short === 'string') toCopy = j.short
                          } catch {}
                          await navigator.clipboard.writeText(toCopy)
                          success('検索リンクをコピーしました')
                        } catch { error('コピーに失敗しました') }
                      }}
                    >Share</button>
                    <button
                      aria-label="Create alert"
                      className="px-2 py-1 border rounded hover:bg-muted"
                      onClick={() => createAlertForSearchItem(it)}
                    >Create alert</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pageItems.map((p) => (
        <Card key={p.id}>
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.symbol || p.project}</div>
              <Badge variant="secondary">{p.chain}</Badge>
            </div>
            <PoolMiniSparkline poolId={p.id} />
            <RiskBadge pool={p} />
            <div className="flex items-center gap-2 text-xs">
              <button aria-label={favorites[p.id] ? 'Remove favorite' : 'Add favorite'} onClick={() => toggleFav(p.id)} className="px-1 py-0.5 border rounded hover:bg-muted">{favorites[p.id] ? '★' : '☆'}</button>
              <span className="text-muted-foreground">{favorites[p.id] ? 'Favorited' : 'Mark favorite'}</span>
            </div>
            <div className="text-sm text-muted-foreground">{p.project}</div>
            <DexLinks project={p.project} />
            <div className="text-sm">TVL: <span className="font-medium">{formatUsd(p.tvlUsd)}</span></div>
            <div className="text-sm">APY: <span className="font-medium">{typeof p.apy === 'number' ? `${p.apy.toFixed(2)}%` : '—'}</span></div>
            <div className="flex items-center gap-2">
              {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View</a>}
              <button aria-label="Pool details" onClick={() => setSelected(p)} className="text-xs px-2 py-1 border rounded hover:bg-muted">Details</button>
              <a
                href={`/defi?tab=dashboard&risk_symbol=${encodeURIComponent(p.symbol || '')}&risk_project=${encodeURIComponent(p.project)}&risk_chain=${encodeURIComponent(p.chain)}${typeof p.tvlUsd === 'number' ? `&risk_tvl=${encodeURIComponent(String(p.tvlUsd))}` : ''}${typeof p.apy === 'number' ? `&risk_apy=${encodeURIComponent(String(p.apy))}` : ''}#risk-inspector`}
                className="text-xs px-2 py-1 border rounded hover:bg-muted"
              >Inspect risk</a>
              <button
                aria-label="Create alert"
                className="text-xs px-2 py-1 border rounded hover:bg-muted"
                onClick={() => createAlertForPool(p)}
              >Create alert</button>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
      <PoolDetailsModal pool={selected} onClose={() => setSelected(null)} />
      <Dialog open={advOpen} onOpenChange={setAdvOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advanced Pool Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            {searchError && <div className="text-red-600">{searchError}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Keyword</span>
                <input className="border rounded px-2 py-1 bg-background" value={advQ} onChange={e => setAdvQ(e.target.value)} placeholder="symbol/project/protocol" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Token address / symbol</span>
                <input
                  list="token-suggest"
                  className="border rounded px-2 py-1 bg-background"
                  value={advToken}
                  onChange={e => {
                    const v = e.target.value.trim()
                    const normalized = (/^[0-9a-fA-F]{40}$/).test(v) ? `0x${v}` : v
                    setAdvToken(normalized)
                  }}
                  placeholder="0x... or token symbol"
                />
                <datalist id="token-suggest">
                  {tokenSuggest.map(s => (<option key={s} value={s} />))}
                </datalist>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Network</span>
                <select className="border rounded px-2 py-1 bg-background" value={advNetwork} onChange={e => setAdvNetwork(e.target.value)}>
                  {['all','ethereum','polygon','arbitrum','optimism','base','bsc','avalanche','solana'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-muted-foreground">Include DEXes (comma)</span>
                <input className="border rounded px-2 py-1 bg-background" value={advIncludeDexes} onChange={e => setAdvIncludeDexes(e.target.value)} />
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={advIncludeUniswap} onChange={e => setAdvIncludeUniswap(e.target.checked)} />
                <span className="text-muted-foreground">Include Uniswap V3</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Min APY</span>
                  <input type="number" min={0} step={0.1} className="border rounded px-2 py-1 bg-background" value={advMinApy} onChange={e => setAdvMinApy(Number(e.target.value))} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Max APY</span>
                  <input type="number" min={0} step={0.1} className="border rounded px-2 py-1 bg-background" value={advMaxApy} onChange={e => setAdvMaxApy(Number(e.target.value))} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Min TVL (USD)</span>
                  <input type="number" min={0} step={100} className="border rounded px-2 py-1 bg-background" value={advMinTvl} onChange={e => setAdvMinTvl(Number(e.target.value))} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">APY Type</span>
                  <select className="border rounded px-2 py-1 bg-background" value={advApyKind} onChange={e => setAdvApyKind(e.target.value as 'fee'|'reward'|'net')}>
                    <option value="fee">Fee (LP fee APR)</option>
                    <option value="reward">Reward (incentives)</option>
                    <option value="net">Net (base+reward)</option>
                  </select>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">APY Typeの説明: Feeは取引手数料起因の利回り、Rewardはインセンティブ報酬、Netは両者の合算です。Graph由来はFeeのみ算出、報酬がある場合はDefiLlamaの推定で補完します。</p>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Sort By</span>
                <select className="border rounded px-2 py-1 bg-background" value={advSortBy} onChange={e => setAdvSortBy(e.target.value as 'tvl'|'volume'|'apy'|'latency'|'freshness')}>
                  <option value="tvl">TVL</option>
                  <option value="volume">Volume</option>
                  <option value="apy">APY</option>
                  <option value="latency">Latency (placeholder)</option>
                  <option value="freshness">Freshness (placeholder)</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Order</span>
                <select className="border rounded px-2 py-1 bg-background" value={advSortOrder} onChange={e => setAdvSortOrder(e.target.value as 'asc'|'desc')}>
                  <option value="desc">Desc</option>
                  <option value="asc">Asc</option>
                </select>
              </label>
            </div>
            <div className="pt-2 border-t mt-2 space-y-2">
              <div className="font-medium">Alert settings (optional)</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">APY threshold (%)</span>
                  <div className="flex items-center gap-2">
                    <input type="number" min={0} step={0.1} className="border rounded px-2 py-1 bg-background w-full" value={alertApyThreshold} onChange={e => setAlertApyThreshold(Number(e.target.value))} />
                    <button className="px-2 py-1 border rounded" type="button" onClick={() => setAlertApyThreshold(advMinApy)}>Use Min</button>
                  </div>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Cooldown (min)</span>
                  <input type="number" min={0} step={1} className="border rounded px-2 py-1 bg-background" value={alertCooldownMin} onChange={e => setAlertCooldownMin(Number(e.target.value))} />
                </label>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Notify via</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alertNotifyInApp} onChange={e => setAlertNotifyInApp(e.target.checked)} />In-app</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alertNotifyEmail} onChange={e => setAlertNotifyEmail(e.target.checked)} />Email</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alertNotifyWebhook} onChange={e => setAlertNotifyWebhook(e.target.checked)} />Webhook</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="px-3 py-1 border rounded" onClick={() => setAdvOpen(false)}>Close</button>
              <button className="px-3 py-1 border rounded bg-primary text-primary-foreground disabled:opacity-50" disabled={searchLoading} onClick={submitAdvancedSearch}>{searchLoading ? 'Searching…' : 'Search'}</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const PoolMiniSparkline: React.FC<{ poolId: string }> = ({ poolId }) => {
  const { data, isLoading, isError } = useQuery<{ data: { t: number; tvlUsd?: number }[] }>({
    queryKey: ['defi-pool-mini-history', poolId],
    queryFn: async () => {
      const res = await fetch(`/api/defi/pools/history?id=${encodeURIComponent(poolId)}&days=7`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  if (isLoading) return <div className="h-8 bg-muted/50 rounded" />
  if (isError || !data?.data?.length) return <div className="text-xs text-muted-foreground">No history yet</div>
  const points = data.data.filter(p => typeof p.tvlUsd === 'number') as { t: number; tvlUsd: number }[]
  if (points.length < 2) return <div className="text-xs text-muted-foreground">No history yet</div>
  const nowSec = Math.floor(Date.now() / 1000)
  const base24 = (() => {
    const target = nowSec - 86400
    for (let i = points.length - 1; i >= 0; i--) { if (points[i].t <= target) return points[i].tvlUsd }
    return undefined
  })()
  const latest = points.at(-1)!.tvlUsd
  const pct24 = (typeof base24 === 'number' && base24 > 0) ? ((latest - base24) / base24) * 100 : undefined
  return (
    <div className="flex items-center gap-2">
      <MiniSparklineSvg points={points.map(p => ({ x: p.t, y: p.tvlUsd }))} />
      {typeof pct24 === 'number' && (
        <span className={`text-xs font-medium ${pct24 >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{pct24.toFixed(2)}%</span>
      )}
    </div>
  )
}

const MiniSparklineSvg: React.FC<{ points: { x: number; y: number }[] }> = ({ points }) => {
  const width = 120
  const height = 28
  const padding = 2
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const toX = (x: number) => padding + (x - xMin) / (xMax - xMin || 1) * (width - padding * 2)
  const toY = (y: number) => height - padding - (y - yMin) / (yMax - yMin || 1) * (height - padding * 2)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x)} ${toY(p.y)}`).join(' ')
  return (
    <svg width={width} height={height} aria-hidden="true">
      <path d={d} stroke="hsl(var(--primary))" fill="none" strokeWidth={1.5} />
    </svg>
  )
}

const DexLinks: React.FC<{ project: string }> = ({ project }) => {
  const dex = getDexInfo(project)
  if (!dex) return null
  return (
    <div className="text-xs flex items-center gap-2 text-muted-foreground">
      <span>DEX:</span>
      <a href={dex.homeUrl} target="_blank" rel="noreferrer" className="hover:underline">{dex.name}</a>
      {dex.appUrl && (
        <a href={dex.appUrl} target="_blank" rel="noreferrer" className="hover:underline">Open</a>
      )}
    </div>
  )
}

const RiskBadge: React.FC<{ pool: Pool }> = ({ pool }) => {
  const r = assessPoolRiskLight(pool)
  const color = r.severity === 'critical' ? 'bg-red-100 text-red-700' : r.severity === 'high' ? 'bg-orange-100 text-orange-700' : r.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
  const related = (() => {
    const reasons = r.reasons.join(' ').toLowerCase()
    const links: { label: string; href: string }[] = []
    if (reasons.includes('audit') || reasons.includes('監査') || reasons.includes('rug') || reasons.includes('honeypot')) {
      links.push({ label: '監査とリスクの見方', href: '/learning' })
    }
    if (reasons.includes('apy') || reasons.includes('yield') || reasons.includes('利回り')) {
      links.push({ label: 'APYとリスクの本質(入門)', href: buildLessonPath('technical-analysis-basics') })
    }
    if (reasons.includes('tvl') || reasons.includes('低tvl') || reasons.includes('ボラ') || reasons.includes('変動')) {
      links.push({ label: 'TVL・流動性の基礎', href: buildLessonPath('defi-protocols-guide') })
    }
    if (links.length === 0) {
      links.push({ label: '学習センターへ', href: '/learning' })
    }
    return links.slice(0, 3)
  })()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 text-xs cursor-help">
            <span className={`px-2 py-0.5 rounded ${color}`}>Risk: {r.severity} (score {r.score})</span>
            {r.reasons.length > 0 && (
              <span className="text-muted-foreground">{r.reasons[0]}{r.reasons.length > 1 ? '…' : ''}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-xs space-y-1">
            <div className="font-medium">理由</div>
            <ul className="list-disc pl-4">
              {r.reasons.slice(0, 6).map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
            <div className="pt-2 border-t mt-2">
              <div className="font-medium mb-1">関連レッスン</div>
              <div className="flex flex-col gap-1">
                {related.map((l, i) => (
                  <Link key={i} className="text-primary hover:underline" href={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
