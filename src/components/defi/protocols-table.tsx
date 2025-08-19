"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getDexInfo } from '@/lib/defi/dex-registry'

type Protocol = {
  id: string
  name: string
  slug: string
  chains: string[]
  categories: string[]
  tvlUsd: number
  url?: string
}

type ProtocolsResponse = { data: Protocol[] }
type MetaResponse = { data: { protocolProjects: string[]; protocolCategories: string[]; protocolChains: string[] } }

function formatUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

export const ProtocolsTable: React.FC<{ chain?: string; category?: string; limit?: number; onSelectProtocol?: (slug: string) => void }> = ({ chain, category, limit = 50, onSelectProtocol }) => {
  const [sortBy, setSortBy] = React.useState<'name' | 'tvlUsd'>('tvlUsd')
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc')
  const [pageSize, setPageSize] = React.useState<number>(20)
  const [page, setPage] = React.useState<number>(1)
  const [query, setQuery] = React.useState<string>("")
  const [favOnly, setFavOnly] = React.useState<boolean>(false)
  const [favorites, setFavorites] = React.useState<Record<string, true>>(() => {
    if (typeof window === 'undefined') return {}
    try { return JSON.parse(localStorage.getItem('defi-fav-protocols') || '{}') as Record<string, true> } catch { return {} }
  })
  React.useEffect(() => {
    // try loading server prefs (authenticated users)
    (async () => {
      try {
        const res = await fetch('/api/defi/prefs')
        if (res.ok) {
          const j = await res.json()
          if (j?.data?.favProtocols) setFavorites(j.data.favProtocols as Record<string, true>)
        }
      } catch {}
    })()
  }, [])
  const toggleFav = async (slugKey: string) => {
    setFavorites(prev => {
      const next = { ...prev }
      if (next[slugKey]) delete next[slugKey]; else next[slugKey] = true
      if (typeof window !== 'undefined') localStorage.setItem('defi-fav-protocols', JSON.stringify(next))
      return next
    })
    try { await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ favProtocols: { [slugKey]: true } }) }) } catch {}
  }
  // Sync page state with URL (p_page, p_rows)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const p = Number(url.searchParams.get('p_page') || '1')
    const r = Number(url.searchParams.get('p_rows') || '20')
    if (Number.isFinite(p) && p > 0) setPage(p)
    if (Number.isFinite(r) && [10,20,50,100].includes(r)) setPageSize(r)
  }, [])
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('p_page', String(page))
    url.searchParams.set('p_rows', String(pageSize))
    window.history.replaceState({}, '', url.toString())
  }, [page, pageSize])
  const params = new URLSearchParams()
  if (chain) params.set('chain', chain)
  if (category) params.set('category', category)
  params.set('limit', String(limit))

  const { data, isLoading, isError } = useQuery<ProtocolsResponse>({
    queryKey: ['defi-protocols', chain, category, limit],
    queryFn: async () => {
      const res = await fetch(`/api/defi/protocols?${params.toString()}`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  const metaQ = useQuery<MetaResponse>({
    queryKey: ['defi-meta-protocols'],
    queryFn: async () => {
      const res = await fetch('/api/defi/metadata')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-64 bg-muted rounded" />
        </CardContent>
      </Card>
    )
  }
  if (isError || !data?.data) return <div className="text-sm text-red-600">Failed to load protocols.</div>

  const filtered = [...data.data].filter(p => {
    if (!query) return true
    const q = query.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.chains.some(c => c.toLowerCase().includes(q))
  })
  .filter(p => !favOnly || Boolean(favorites[p.slug]))
  const sorted = filtered.sort((a, b) => {
    if (sortBy === 'name') {
      const cmp = a.name.localeCompare(b.name)
      return sortDir === 'asc' ? cmp : -cmp
    }
    const av = a.tvlUsd ?? 0
    const bv = b.tvlUsd ?? 0
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const toggleSort = (key: 'name' | 'tvlUsd') => {
    if (sortBy !== key) {
      setSortBy(key)
      setSortDir(key === 'name' ? 'asc' : 'desc')
      setPage(1)
    } else {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
    }
  }

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const pageItems = sorted.slice(start, start + pageSize)

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-3 py-2 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">{total.toLocaleString()} protocols</div>
            <label className="text-sm text-muted-foreground" htmlFor="proto-search">Search</label>
            <input id="proto-search" aria-label="Search protocols" list="proto-suggest" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="name/slug/chain" className="border rounded px-2 py-1 bg-background" />
            <datalist id="proto-suggest">
              {((metaQ.data?.data.protocolProjects ?? []).slice(0, 50)).map(p => (
                <option key={`proj-${p}`} value={p} />
              ))}
              {((metaQ.data?.data.protocolChains ?? []).slice(0, 50)).map(c => (
                <option key={`chain-${c}`} value={c} />
              ))}
              {((metaQ.data?.data.protocolCategories ?? []).slice(0, 50)).map(ca => (
                <option key={`cat-${ca}`} value={ca} />
              ))}
            </datalist>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="proto-page-size">Rows</label>
            <select id="proto-page-size" aria-label="Rows per page" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1 bg-background">
              {[10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <div className="text-sm text-muted-foreground">Page {currentPage}/{totalPages}</div>
            <button aria-label="Previous page" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
            <button aria-label="Next page" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
            <a className="px-2 py-1 border rounded text-sm hover:bg-muted" href={`/api/defi/protocols/export?meta=1&precision=0&limit=${encodeURIComponent(String(limit))}${chain ? `&chain=${encodeURIComponent(chain)}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}`}>Export CSV</a>
            <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={favOnly} onChange={(e) => { setFavOnly(e.target.checked); setPage(1) }} />Fav only</label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-medium">
                  <button onClick={() => toggleSort('name')} className="hover:underline">
                    Protocol {sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </button>
                </th>
                <th className="p-3 font-medium">Chains</th>
                <th className="p-3 font-medium">Categories</th>
                <th className="p-3 font-medium text-right">
                  <button onClick={() => toggleSort('tvlUsd')} className="hover:underline">
                    TVL {sortBy === 'tvlUsd' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </button>
                </th>
                <th className="p-3 font-medium text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button aria-label={favorites[p.slug] ? 'Remove favorite' : 'Add favorite'} onClick={() => toggleFav(p.slug)} className="px-1 py-0.5 border rounded hover:bg-muted text-xs">{favorites[p.slug] ? '★' : '☆'}</button>
                      {p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="font-medium hover:underline">{p.name}</a> : <span className="font-medium">{p.name}</span>}
                    </div>
                    <DexInline project={p.slug} />
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {p.chains.slice(0, 6).map(c => (
                        <Badge key={c} variant="secondary">{c}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {p.categories.slice(0, 3).map(c => (
                        <Badge key={c} variant="outline">{c}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right font-semibold">{formatUsd(p.tvlUsd)}</td>
                  <td className="p-3 text-right">
                    {onSelectProtocol && (
                      <button aria-label={`Show details for ${p.name}`} onClick={() => onSelectProtocol(p.slug)} className="px-2 py-1 border rounded hover:bg-muted text-xs">Details</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

const DexInline: React.FC<{ project: string }> = ({ project }) => {
  const dex = getDexInfo(project)
  if (!dex) return null
  return (
    <div className="text-xs text-muted-foreground">
      DEX: <a href={dex.homeUrl} target="_blank" rel="noreferrer" className="hover:underline">{dex.name}</a>
      {dex.appUrl && (
        <>
          {' '}
          <a href={dex.appUrl} target="_blank" rel="noreferrer" className="hover:underline">Open</a>
        </>
      )}
    </div>
  )
}
