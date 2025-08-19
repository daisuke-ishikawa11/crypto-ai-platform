"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type MetaResponse = {
  data: {
    protocolProjects: string[]
  }
}

type Point = { date: number; tvlUsd: number }
type HistoryResponse = { data: Point[] }

function formatUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

const dayPresets = [7, 30, 90, 180, 365]

export const ProtocolHistoryPanel: React.FC<{ slug?: string; onSlugChange?: (slug: string) => void }> = ({ slug: externalSlug, onSlugChange }) => {
  const [internalSlug, setInternalSlug] = React.useState<string>(externalSlug || "aave")
  const [days, setDays] = React.useState<number | undefined>(30)
  const [search, setSearch] = React.useState<string>("")

  const params = new URLSearchParams()
  const slug = externalSlug ?? internalSlug
  params.set('slug', slug)
  if (typeof days === 'number') params.set('days', String(days))

  const { data, isLoading, isError } = useQuery<HistoryResponse>({
    queryKey: ['defi-protocol-history', slug, days],
    queryFn: async () => {
      const res = await fetch(`/api/defi/protocols/history?${params.toString()}`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  const meta = useQuery<MetaResponse>({
    queryKey: ['defi-meta-projects'],
    queryFn: async () => {
      const res = await fetch('/api/defi/metadata')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  const points = data?.data ?? []
  const hasData = points.length > 1
  const min = hasData ? Math.min(...points.map(p => p.tvlUsd)) : 0
  const max = hasData ? Math.max(...points.map(p => p.tvlUsd)) : 0

  function summarizeChanges(ps: Point[]) {
    if (ps.length < 2) return { latest: undefined as number | undefined, d1: undefined as number | undefined, d30: undefined as number | undefined }
    const nowSec = Math.floor(Date.now() / 1000)
    const latest = ps[ps.length - 1]?.tvlUsd
    const findAt = (agoSec: number) => {
      const target = nowSec - agoSec
      let candidate: Point | undefined
      for (let i = ps.length - 1; i >= 0; i--) {
        if (ps[i].date <= target) { candidate = ps[i]; break }
      }
      return candidate?.tvlUsd
    }
    const v1d = findAt(86400)
    const v30d = findAt(86400 * 30)
    const pct = (v: number | undefined) => (typeof v === 'number' && typeof latest === 'number' && v > 0) ? ((latest - v) / v) * 100 : undefined
    return { latest, d1: pct(v1d), d30: pct(v30d) }
  }
  const summary = summarizeChanges(points)

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <label htmlFor="proto-slug" className="text-sm text-muted-foreground">Protocol</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search..."
              className="border rounded px-2 py-1 bg-background"
              aria-label="Search protocols"
            />
            <select id="proto-slug" aria-label="Protocol" value={slug} onChange={(e) => (onSlugChange ? onSlugChange(e.target.value) : setInternalSlug(e.target.value))} className="border rounded px-2 py-1 bg-background">
              {((meta.data?.data?.protocolProjects ?? ['aave'])
                .filter(s => !search || s.toLowerCase().includes(search.toLowerCase()))
                ).slice(0, 500).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {dayPresets.map(d => (
              <button key={d} onClick={() => setDays(d)} className={`px-2 py-1 rounded border text-sm ${days === d ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>{d}d</button>
            ))}
            <button onClick={() => setDays(undefined)} className={`px-2 py-1 rounded border text-sm ${typeof days === 'undefined' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>All</button>
          </div>
        </div>

        {isLoading && <div className="h-40 bg-muted rounded" />}
        {isError && <div className="text-sm text-red-600">Failed to load history.</div>}

        {hasData && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <Badge variant="secondary">Min {formatUsd(min)}</Badge>
              <span className="text-muted-foreground">{new Date(points[0].date * 1000).toLocaleDateString()} - {new Date(points[points.length - 1].date * 1000).toLocaleDateString()}</span>
              <Badge variant="secondary">Max {formatUsd(max)}</Badge>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {typeof summary.latest === 'number' && <span>Latest: <strong>{formatUsd(summary.latest)}</strong></span>}
              {typeof summary.d1 === 'number' && <span>1d: <strong className={summary.d1 >= 0 ? 'text-green-600' : 'text-red-600'}>{summary.d1.toFixed(2)}%</strong></span>}
              {typeof summary.d30 === 'number' && <span>30d: <strong className={summary.d30 >= 0 ? 'text-green-600' : 'text-red-600'}>{summary.d30.toFixed(2)}%</strong></span>}
            </div>
            <SimpleLineChart points={points} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const SimpleLineChart: React.FC<{ points: Point[] }> = ({ points }) => {
  const width = 800
  const height = 220
  const padding = 24
  const xs = points.map(p => p.date)
  const ys = points.map(p => p.tvlUsd)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const toX = (x: number) => padding + (x - xMin) / (xMax - xMin || 1) * (width - padding * 2)
  const toY = (y: number) => height - padding - (y - yMin) / (yMax - yMin || 1) * (height - padding * 2)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.date)} ${toY(p.tvlUsd)}`).join(' ')

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="bg-background rounded border">
        <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />
      </svg>
    </div>
  )
}
