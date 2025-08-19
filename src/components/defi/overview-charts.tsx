"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'

type OverviewResponse = {
  data: {
    topCategories: { name: string; tvlUsd: number }[]
    topChains: { name: string; tvlUsd: number }[]
  }
}

function formatUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

const BarChart: React.FC<{ title: string; items: { name: string; tvlUsd: number }[] }> = ({ title, items }) => {
  const width = 800
  const barH = 22
  const gap = 8
  const padding = 16
  const height = padding * 2 + items.length * (barH + gap)
  const max = Math.max(...items.map(i => i.tvlUsd), 1)
  const toW = (v: number) => (v / max) * (width - padding * 2)
  return (
    <Card>
      <CardContent className="p-4">
        <div className="font-semibold mb-2">{title}</div>
        <div className="w-full overflow-x-auto">
          <svg width={width} height={height} className="bg-background rounded border">
            {items.map((it, idx) => {
              const y = padding + idx * (barH + gap)
              return (
                <g key={it.name}>
                  <rect x={padding} y={y} width={toW(it.tvlUsd)} height={barH} fill="hsl(var(--primary))" opacity={0.9} />
                  <text x={padding + 4} y={y + barH / 2 + 4} fontSize={12} fill="white">{it.name}</text>
                  <text x={padding + toW(it.tvlUsd) + 8} y={y + barH / 2 + 4} fontSize={12} fill="hsl(var(--foreground))">{formatUsd(it.tvlUsd)}</text>
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

export const OverviewCharts: React.FC = () => {
  const [topN, setTopN] = React.useState<number>(10)
  const { data, isLoading, isError } = useQuery<OverviewResponse>({
    queryKey: ['defi-overview'],
    queryFn: async () => {
      const res = await fetch('/api/defi/overview')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })
  if (isLoading) return <Card><CardContent className="p-6"><div className="h-40 bg-muted rounded" /></CardContent></Card>
  if (isError || !data?.data) return <div className="text-sm text-red-600">Failed to load overview charts.</div>
  const cats = data.data.topCategories.slice(0, topN)
  const chains = data.data.topChains.slice(0, topN)
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground" htmlFor="overview-topn">Top</label>
        <select id="overview-topn" aria-label="Top N" value={topN} onChange={(e) => setTopN(Number(e.target.value))} className="border rounded px-2 py-1 bg-background">
          {[5,10,15,20].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChart title="TVL by Category" items={cats} />
        <BarChart title="TVL by Chain" items={chains} />
      </div>
    </div>
  )
}
