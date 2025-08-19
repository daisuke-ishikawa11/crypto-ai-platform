"use client"

import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { detectAnomalies } from '@/lib/defi/anomaly'

export type PoolDetails = {
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

function formatUsd(n?: number): string {
  if (typeof n !== 'number') return '—'
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

export const PoolDetailsModal: React.FC<{ pool: PoolDetails | null; onClose: () => void }> = ({ pool, onClose }) => {
  const poolId = pool?.id ?? ''
  const histQ = useQuery<{ data: { t: number; tvlUsd?: number; apy?: number }[] }>({
    queryKey: ['defi-pool-history', poolId],
    enabled: !!poolId,
    queryFn: async () => {
      if (!poolId) return { data: [] as { t: number; tvlUsd?: number; apy?: number }[] }
      const res = await fetch(`/api/defi/pools/history?id=${encodeURIComponent(poolId)}&days=30`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  if (!pool) return null
  const hist = histQ.data?.data ?? []
  const tvls = hist.filter(h => typeof h.tvlUsd === 'number') as { t: number; tvlUsd: number }[]
  const latest = tvls.at(-1)?.tvlUsd
  const first = tvls[0]?.tvlUsd
  const pct30 = (typeof latest === 'number' && typeof first === 'number' && first > 0) ? ((latest - first) / first) * 100 : undefined
  const apys = hist.filter(h => typeof h.apy === 'number') as { t: number; apy: number }[]
  const anomalies = detectAnomalies(hist, { tvlDropPct: 30, apySpikePct: 100 })
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-xl bg-background rounded shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Pool Details</div>
          <button onClick={onClose} aria-label="Close" className="px-2 py-1 border rounded">Close</button>
        </div>
        <Card className="m-4">
          <CardContent className="p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{pool.symbol || pool.project}</div>
              <Badge variant="secondary">{pool.chain}</Badge>
            </div>
            <div>Project: <span className="font-medium">{pool.project}</span></div>
            <div>TVL: <span className="font-medium">{formatUsd(pool.tvlUsd)}</span></div>
            <div>APY: <span className="font-medium">{typeof pool.apy === 'number' ? `${pool.apy.toFixed(2)}%` : '—'}</span></div>
            {typeof pct30 === 'number' && (
              <div>30d: <span className={`font-medium ${pct30 >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{pct30.toFixed(2)}%</span></div>
            )}
            {typeof pool.apyBase === 'number' && <div>APY (Base): <span className="font-medium">{pool.apyBase.toFixed(2)}%</span></div>}
            {typeof pool.apyReward === 'number' && <div>APY (Reward): <span className="font-medium">{pool.apyReward.toFixed(2)}%</span></div>}
            {pool.url && <a className="text-primary hover:underline" target="_blank" rel="noreferrer" href={pool.url}>View on provider</a>}
            {histQ.isLoading && <div className="h-20 bg-muted rounded" />}
            {!histQ.isLoading && (
              <div className="space-y-2">
                {tvls.length > 1 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">TVL (30d)</div>
                    <PoolSparkline data={tvls.map(h => ({ t: h.t, v: h.tvlUsd }))} />
                  </div>
                )}
                {apys.length > 1 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">APY (30d)</div>
                    <PoolSparkline data={apys.map(h => ({ t: h.t, v: h.apy }))} />
                  </div>
                )}
                {!!anomalies.length && (
                  <div className="text-xs mt-2">
                    <div className="font-medium text-red-600">Anomalies</div>
                    <ul className="list-disc pl-4">
                      {anomalies.slice(0,3).map((a, i) => (
                        <li key={i}>{a.type} [{a.severity}] {a.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const PoolSparkline: React.FC<{ data: { t: number; v: number }[] }> = ({ data }) => {
  const width = 560
  const height = 100
  const padding = 8
  const xs = data.map(p => p.t)
  const ys = data.map(p => p.v)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const toX = (x: number) => padding + (x - xMin) / (xMax - xMin || 1) * (width - padding * 2)
  const toY = (y: number) => height - padding - (y - yMin) / (yMax - yMin || 1) * (height - padding * 2)
  const d = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.t)} ${toY(p.v)}`).join(' ')
  return (
    <svg width={width} height={height} className="mt-2 border rounded bg-background">
      <path d={d} stroke="hsl(var(--primary))" fill="none" strokeWidth={2} />
    </svg>
  )
}
