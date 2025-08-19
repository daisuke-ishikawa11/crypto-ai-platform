"use client"

import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'

type Details = {
  name?: string
  url?: string
  chain?: string
  tvl?: { date: number; totalLiquidityUSD: number }[]
  description?: string
  category?: string
  chains?: string[]
}

export const ProtocolDetailsModal: React.FC<{ slug: string | null; onClose: () => void }> = ({ slug, onClose }) => {
  const [details, setDetails] = React.useState<Details | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [history, setHistory] = React.useState<Array<{ date: number; tvlUsd: number }> | null>(null)
  const open = !!slug

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      if (!slug) return
      setLoading(true)
      try {
        const res = await fetch(`/api/defi/protocols/details?slug=${encodeURIComponent(slug)}`)
        if (!res.ok) throw new Error('failed')
        const json = await res.json()
        if (!cancelled) setDetails(json)
        // fetch 90d history for summary
        const h = await fetch(`/api/defi/protocols/history?slug=${encodeURIComponent(slug)}&days=90`)
        if (h.ok) {
          const hj = await h.json() as { data?: Array<{ date: number; tvlUsd: number }> }
          if (!cancelled) setHistory(hj.data ?? null)
        } else if (!cancelled) {
          setHistory(null)
        }
      } catch (_e) {
        if (!cancelled) setDetails(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl bg-background rounded shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Protocol Details</div>
          <button onClick={onClose} aria-label="Close details" className="px-2 py-1 border rounded">Close</button>
        </div>
        <Card className="m-4">
          <CardContent className="p-4 space-y-2">
            {loading && <div className="h-24 bg-muted rounded" />}
            {!loading && details && (
              <div className="space-y-2 text-sm">
                <div className="text-lg font-semibold">{details.name || slug}</div>
                {details.url && <a href={details.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{details.url}</a>}
                {details.category && <div>Category: <span className="font-medium">{details.category}</span></div>}
                {details.chains && details.chains.length > 0 && (
                  <div>Chains: <span className="font-medium">{details.chains.join(', ')}</span></div>
                )}
                {Array.isArray(history) && history.length > 1 && (
                  <SummaryBadges history={history} />
                )}
                {details.description && <p className="text-muted-foreground whitespace-pre-wrap">{details.description}</p>}
                {Array.isArray(details.tvl) && details.tvl.length > 2 && (
                  <Sparkline data={details.tvl} days={90} />
                )}
              </div>
            )}
            {!loading && !details && <div className="text-sm text-red-600">Failed to load details.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const Sparkline: React.FC<{ data: { date: number; totalLiquidityUSD: number }[]; days: number }> = ({ data, days }) => {
  const end = Math.floor(Date.now() / 1000)
  const start = end - days * 86400
  const points = data.filter(p => p.date >= start)
  if (points.length < 2) return null
  const width = 560
  const height = 100
  const padding = 8
  const xs = points.map(p => p.date)
  const ys = points.map(p => p.totalLiquidityUSD)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const toX = (x: number) => padding + (x - xMin) / (xMax - xMin || 1) * (width - padding * 2)
  const toY = (y: number) => height - padding - (y - yMin) / (yMax - yMin || 1) * (height - padding * 2)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.date)} ${toY(p.totalLiquidityUSD)}`).join(' ')
  return (
    <svg width={width} height={height} className="mt-2 border rounded bg-background">
      <path d={d} stroke="hsl(var(--primary))" fill="none" strokeWidth={2} />
    </svg>
  )
}

const SummaryBadges: React.FC<{ history: Array<{ date: number; tvlUsd: number }> }> = ({ history }) => {
  if (!history.length) return null
  const latest = history[history.length - 1]!.tvlUsd
  const nowSec = Math.floor(Date.now() / 1000)
  const findAt = (agoSec: number) => {
    const target = nowSec - agoSec
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].date <= target) return history[i].tvlUsd
    }
    return undefined
  }
  const v1d = findAt(86400)
  const v30d = findAt(86400 * 30)
  const pct = (prev?: number) => (typeof prev === 'number' && prev > 0) ? (((latest - prev) / prev) * 100) : undefined
  const d1 = pct(v1d)
  const d30 = pct(v30d)
  const badge = (label: string, v?: number) => (
    <span className={`inline-block text-xs px-2 py-1 rounded ${typeof v === 'number' ? (v >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700') : 'bg-muted text-foreground'} }`}>
      {label} {typeof v === 'number' ? `${v.toFixed(2)}%` : '—'}
    </span>
  )
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground">Change:</span>
      {badge('1d', d1)}
      {badge('30d', d30)}
    </div>
  )
}
