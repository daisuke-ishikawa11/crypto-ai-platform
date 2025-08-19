"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PoolDetailsModal, PoolDetails } from '@/components/defi/pool-details-modal'

type Protocol = { id: string; name: string; slug: string; tvlUsd: number; chains: string[]; url?: string }
type Pool = PoolDetails

type ProtocolsResponse = { data: Protocol[] }
type PoolsResponse = { data: Pool[] }

export const DeFiWatchlist: React.FC<{ onSelectProtocol?: (slug: string) => void }> = ({ onSelectProtocol }) => {
  const [favProtocols, setFavProtocols] = React.useState<Record<string, true>>({})
  const [favPools, setFavPools] = React.useState<Record<string, true>>({})
  const [selectedPool, setSelectedPool] = React.useState<Pool | null>(null)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try { setFavProtocols(JSON.parse(localStorage.getItem('defi-fav-protocols') || '{}') as Record<string, true>) } catch {}
    try { setFavPools(JSON.parse(localStorage.getItem('defi-fav-pools') || '{}') as Record<string, true>) } catch {}
  }, [])

  const protQ = useQuery<ProtocolsResponse>({
    queryKey: ['defi-protocols', 'watchlist'],
    queryFn: async () => {
      const res = await fetch(`/api/defi/protocols?limit=200`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  const poolQ = useQuery<PoolsResponse>({
    queryKey: ['defi-pools', 'watchlist'],
    queryFn: async () => {
      const res = await fetch(`/api/defi/pools?limit=200`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  const protFavList = (protQ.data?.data || []).filter(p => favProtocols[p.slug])
  const poolFavList = (poolQ.data?.data || []).filter(p => favPools[p.id])

  if (!Object.keys(favProtocols).length && !Object.keys(favPools).length) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Watchlist</div>
          <div className="text-xs text-muted-foreground">Protocols {protFavList.length} • Pools {poolFavList.length}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Protocols</div>
            {protQ.isLoading && <div className="h-10 bg-muted rounded" />}
            {!protQ.isLoading && protFavList.length === 0 && <div className="text-sm text-muted-foreground">No favorites</div>}
            <div className="flex flex-wrap gap-2">
              {protFavList.map(p => (
                <button key={p.slug} onClick={() => onSelectProtocol && onSelectProtocol(p.slug)} className="px-2 py-1 border rounded text-sm hover:bg-muted">
                  {p.name}
                  <span className="ml-2 text-xs text-muted-foreground">{Math.round(p.tvlUsd).toLocaleString()} TVL</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Pools</div>
            {poolQ.isLoading && <div className="h-10 bg-muted rounded" />}
            {!poolQ.isLoading && poolFavList.length === 0 && <div className="text-sm text-muted-foreground">No favorites</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {poolFavList.map(p => (
                <div key={p.id} className="border rounded p-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{p.symbol || p.project}</div>
                    <Badge variant="secondary">{p.chain}</Badge>
                  </div>
                  <div className="text-muted-foreground">{p.project}</div>
                  <div>TVL: <span className="font-medium">{typeof p.tvlUsd === 'number' ? Math.round(p.tvlUsd).toLocaleString() : '—'}</span></div>
                  <div>APY: <span className="font-medium">{typeof p.apy === 'number' ? p.apy.toFixed(2) + '%' : '—'}</span></div>
                  <div className="flex items-center gap-2 mt-1">
                    {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View</a>}
                    <button onClick={() => setSelectedPool(p)} className="text-xs px-2 py-1 border rounded hover:bg-muted">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PoolDetailsModal pool={selectedPool} onClose={() => setSelectedPool(null)} />
      </CardContent>
    </Card>
  )
}
