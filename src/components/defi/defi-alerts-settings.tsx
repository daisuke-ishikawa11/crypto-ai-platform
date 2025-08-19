"use client"

import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Result = { slug: string; pct24h?: number; latest?: number; base24h?: number; alerted: boolean; reason?: string }
type Severity = 'critical'|'high'|'normal'|'low'

function isSeverity(value: string): value is Severity {
  return value === 'critical' || value === 'high' || value === 'normal' || value === 'low'
}

export const DeFiAlertsSettings: React.FC<{ selectedSlug?: string }> = ({ selectedSlug }) => {
  const [slugs, setSlugs] = React.useState<string>('aave,uniswap')
  const [threshold, setThreshold] = React.useState<number>(10)
  const [minIncrease, setMinIncrease] = React.useState<number | ''>('')
  const [minDecrease, setMinDecrease] = React.useState<number | ''>('')
  const [severity, setSeverity] = React.useState<Severity>('high')
  const [dryRun, setDryRun] = React.useState<boolean>(true)
  const [bypassDnd, setBypassDnd] = React.useState<boolean>(false)
  const [token, setToken] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [results, setResults] = React.useState<Result[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('defi-alerts-settings')
    if (saved) {
      try {
        const json = JSON.parse(saved) as Partial<{ slugs: string; threshold: number; severity: string; dryRun: boolean; bypassDnd: boolean; token: string }>
        if (json.slugs) setSlugs(json.slugs)
        if (typeof json.threshold === 'number') setThreshold(json.threshold)
        if (json.severity && isSeverity(json.severity)) setSeverity(json.severity)
        if (typeof json.dryRun === 'boolean') setDryRun(json.dryRun)
        if (typeof json.bypassDnd === 'boolean') setBypassDnd(json.bypassDnd)
        if (typeof json.token === 'string') setToken(json.token)
      } catch { /* ignore */ }
    }
  }, [])

  const persist = React.useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('defi-alerts-settings', JSON.stringify({ slugs, threshold, minIncrease, minDecrease, severity, dryRun, bypassDnd, token }))
  }, [slugs, threshold, minIncrease, minDecrease, severity, dryRun, bypassDnd, token])

  React.useEffect(() => { persist() }, [persist])

  async function run() {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const res = await fetch('/api/defi/alerts/changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-alerts-token': token },
        body: JSON.stringify({ slugs: slugs.split(',').map(s => s.trim()).filter(Boolean), thresholdPct: threshold, minIncreasePct: (minIncrease === '' ? undefined : Number(minIncrease)), minDecreasePct: (minDecrease === '' ? undefined : Number(minDecrease)), severity, bypassDnd, dryRun })
      })
      const json = await res.json()
      if (!res.ok || !json?.success) {
        setError(json?.error || `Request failed (${res.status})`)
        return
      }
      setResults(json.data as Result[])
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">DeFi TVL変化監視（Discord送信）</div>
          <Badge variant={dryRun ? 'secondary' : 'default'}>{dryRun ? 'DRY-RUN' : 'LIVE'}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="slugs" className="text-sm text-muted-foreground">Protocol slugs（カンマ区切り）</label>
            <input id="slugs" value={slugs} onChange={(e) => setSlugs(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" />
          </div>
          <div className="space-y-1">
            <label htmlFor="threshold" className="text-sm text-muted-foreground">閾値（±%）</label>
            <input id="threshold" type="number" min={0} max={100} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-background" />
          </div>
          <div className="space-y-1">
            <label htmlFor="minInc" className="text-sm text-muted-foreground">上昇閾値（%）</label>
            <input id="minInc" type="number" min={0} max={100} value={minIncrease} onChange={(e) => setMinIncrease(e.target.value === '' ? '' : Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-background" />
          </div>
          <div className="space-y-1">
            <label htmlFor="minDec" className="text-sm text-muted-foreground">下落閾値（%）</label>
            <input id="minDec" type="number" min={0} max={100} value={minDecrease} onChange={(e) => setMinDecrease(e.target.value === '' ? '' : Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-background" />
          </div>
          <div className="space-y-1">
            <label htmlFor="severity" className="text-sm text-muted-foreground">Severity</label>
            <select id="severity" value={severity} onChange={(e) => { const v = e.target.value; if (isSeverity(v)) setSeverity(v) }} className="w-full border rounded px-3 py-2 bg-background">
              <option value="critical">critical</option>
              <option value="high">high</option>
              <option value="normal">normal</option>
              <option value="low">low</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="token" className="text-sm text-muted-foreground">管理トークン（x-alerts-token）</label>
            <input id="token" value={token} onChange={(e) => setToken(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={dryRun} onChange={(e) => setDryRun(e.target.checked)} />Dry run</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={bypassDnd} onChange={(e) => setBypassDnd(e.target.checked)} />DNDバイパス</label>
          <button onClick={() => { if (selectedSlug) setSlugs(selectedSlug) }} disabled={!selectedSlug} className="px-2 py-1 border rounded hover:bg-muted disabled:opacity-50 text-sm">選択中のProtocolを適用</button>
          <button onClick={run} disabled={loading} className="px-3 py-2 border rounded hover:bg-muted disabled:opacity-50">{loading ? '実行中...' : '実行'}</button>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        {Array.isArray(results) && (
          <div className="text-sm">
            <div className="font-semibold mb-1">結果</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {results.map(r => (
                <div key={r.slug} className="border rounded p-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.slug}</div>
                    <Badge variant={r.alerted ? 'default' : 'secondary'}>{r.alerted ? 'ALERTED' : (r.reason || 'SKIPPED')}</Badge>
                  </div>
                  <div className="text-muted-foreground">24h: {typeof r.pct24h === 'number' ? r.pct24h.toFixed(2) + '%' : '—'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
