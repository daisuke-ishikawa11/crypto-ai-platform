"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type OverviewResponse = {
  data: {
    totalTVL: number
    topCategories: { name: string; tvlUsd: number }[]
    topChains: { name: string; tvlUsd: number }[]
    topProtocols: { id: string; name: string; tvlUsd: number }[]
  }
}

type AIStats = {
  windowSec: number
  total: number
  success: number
  successRate: number
  failures?: number
  failureRate?: number
  failuresByReason?: Partial<Record<'bad_request'|'rate_limited'|'exception'|'other', number>>
  avgAdjustment: number
  finalSeverity: { low: number; medium: number; high: number; critical: number }
}

function formatUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

type PrefsResp = {
  success: boolean
  data?: { settings?: { aiEvaluate?: { warnSuccessRate?: number; warnOnRateLimited?: boolean } } }
}

export const OverviewWidget: React.FC = () => {
  const { data, isLoading, isError } = useQuery<OverviewResponse>({
    queryKey: ['defi-overview'],
    queryFn: async () => {
      const res = await fetch('/api/defi/overview')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  const prefsQ = useQuery<PrefsResp>({
    queryKey: ['defi-prefs-ai'],
    queryFn: async () => {
      const res = await fetch('/api/defi/prefs', { cache: 'no-store' })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    staleTime: 5 * 60_000,
    retry: 1
  })

  const aiQ = useQuery<{ success: boolean; data?: AIStats }>({
    queryKey: ['defi-ai-stats'],
    queryFn: async () => {
      const res = await fetch('/api/defi/risk/ai-stats', { cache: 'no-store' })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    staleTime: 60_000,
    retry: 1
  })

  const tsQ = useQuery<{ success: boolean; data?: { windowSec: number; bucketSec: number; buckets: number; timestamps: number[]; success: number[]; total: number[]; successRate: number[] } }>({
    queryKey: ['defi-ai-stats-ts'],
    queryFn: async () => {
      const res = await fetch('/api/defi/risk/ai-stats/timeseries?windowSec=86400&bucketSec=300', { cache: 'no-store' })
      if (!res.ok) throw new Error('failed')
      return res.json()
    },
    staleTime: 60_000,
    retry: 1
  })

  const exportTrendCsv = React.useCallback(() => {
    const d = tsQ.data?.data
    if (!d || !Array.isArray(d.timestamps) || !Array.isArray(d.successRate)) return
    const lines: string[] = ['timestamp,successRate']
    for (let i = 0; i < d.timestamps.length; i++) {
      const ts = d.timestamps[i]
      const rate = d.successRate[i]
      lines.push(`${ts},${typeof rate === 'number' ? rate.toFixed(4) : ''}`)
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai_success_rate_${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [tsQ.data])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}><CardContent className="p-6"><div className="h-16 bg-muted rounded" /></CardContent></Card>
        ))}
      </div>
    )
  }
  if (isError || !data?.data) {
    return <div className="text-sm text-red-600">Failed to load DeFi overview.</div>
  }

  const { totalTVL, topCategories, topChains, topProtocols } = data.data
  const ai = aiQ.data?.data
  const rateLimited = (ai?.failuresByReason?.rate_limited || 0) > 0
  const warnRate = Math.max(0.5, Math.min(1, prefsQ.data?.data?.settings?.aiEvaluate?.warnSuccessRate ?? 0.8))
  const warnOnRL = (prefsQ.data?.data?.settings?.aiEvaluate?.warnOnRateLimited ?? true) === true
  const showWarn = ai && ai.total > 0 && ((ai.successRate < warnRate) || (warnOnRL && rateLimited))

  return (
    <div className="space-y-6">
      {/* Warning banner when failure rate high or rate limiting indicated */}
      {showWarn && (
        <div className="rounded border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm">
          {rateLimited && warnOnRL ? (
            <>AI評価APIでレート制限が発生しています。少し時間を空けて再実行してください（成功率 {(ai!.successRate*100).toFixed(1)}% / 閾値 {(warnRate*100).toFixed(0)}%）。</>
          ) : (
            <>AI評価の失敗割合が高い可能性があります（成功率 {(ai!.successRate*100).toFixed(1)}% / 閾値 {(warnRate*100).toFixed(0)}%）。</>
          )}
          <a className="underline ml-2" href="/alerts" aria-label="アラート履歴を開く">アラート履歴</a>
          <span className="mx-1">/</span>
          <a className="underline" href="/docs/ops/runbook#defi-ai-evaluate" aria-label="運用Runbookを開く">運用Runbook</a>
        </div>
      )}
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Total TVL</div>
            <div className="text-2xl font-bold">{formatUsd(totalTVL)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Top Category</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {topCategories[0]?.name || '—'}
              {topCategories[0] && <Badge variant="secondary">{formatUsd(topCategories[0].tvlUsd)}</Badge>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Top Chain</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {topChains[0]?.name || '—'}
              {topChains[0] && <Badge variant="secondary">{formatUsd(topChains[0].tvlUsd)}</Badge>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Top Protocol</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {topProtocols[0]?.name || '—'}
              {topProtocols[0] && <Badge variant="secondary">{formatUsd(topProtocols[0].tvlUsd)}</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">AI Evaluate (24h)</div>
            <div className="text-sm">Success: <strong>{ai ? `${ai.success}/${ai.total}` : '-'}</strong> {ai && <span className="text-muted-foreground">({(ai.successRate*100).toFixed(1)}%)</span>}</div>
            <div className="text-sm">Avg ΔScore: <strong>{ai ? ai.avgAdjustment.toFixed(2) : '-'}</strong></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Final Severity (24h)</div>
            <div className="text-xs flex gap-3">
              <span>low: <strong>{ai?.finalSeverity.low ?? '-'}</strong></span>
              <span>medium: <strong>{ai?.finalSeverity.medium ?? '-'}</strong></span>
              <span>high: <strong>{ai?.finalSeverity.high ?? '-'}</strong></span>
              <span>critical: <strong>{ai?.finalSeverity.critical ?? '-'}</strong></span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Success Rate Trend (24h)</div>
            <div className="h-10 mt-2">
              {tsQ.isSuccess && tsQ.data?.data?.successRate?.length ? (
                <InlineSparkline values={tsQ.data.data.successRate} />
              ) : (
                <div className="h-full bg-muted rounded" />
              )}
            </div>
            <div className="mt-2">
              <button className="px-2 py-1 border rounded text-xs" onClick={exportTrendCsv} disabled={!tsQ.data?.data?.successRate?.length}>Export CSV</button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="font-semibold mb-3">Top Categories</div>
            <ul className="space-y-2 text-sm">
              {topCategories.slice(0, 6).map((c) => (
                <li key={c.name} className="flex items-center justify-between">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{formatUsd(c.tvlUsd)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="font-semibold mb-3">Top Chains</div>
            <ul className="space-y-2 text-sm">
              {topChains.slice(0, 6).map((c) => (
                <li key={c.name} className="flex items-center justify-between">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{formatUsd(c.tvlUsd)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InlineSparkline({ values }: { values: number[] }) {
  // シンプルなSVGスパークライン（0..1の値を想定）
  const width = 160
  const height = 32
  const n = values.length
  if (n <= 1) return <div className="h-full bg-muted rounded" />
  const xs = values.map((_v, i) => (i / (n - 1)) * (width - 2) + 1)
  const ys = values.map(v => {
    const clamped = Math.max(0, Math.min(1, v))
    // successRateが高いほど上に
    return 1 + (1 - clamped) * (height - 2)
  })
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ')
  const last = values[values.length - 1]
  const color = last >= 0.9 ? '#059669' : last >= 0.75 ? '#b45309' : '#b91c1c'
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Success rate trend">
      <rect x="0" y="0" width={width} height={height} rx="4" ry="4" fill="var(--muted)" opacity="0.4" />
      <path d={d} stroke={color} strokeWidth="2" fill="none" />
    </svg>
  )
}
