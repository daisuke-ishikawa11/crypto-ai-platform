"use client"

import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'
import { detectAnomalies } from '@/lib/defi/anomaly'

type HistoryPoint = { t: number; tvlUsd?: number; apy?: number }

type PrefsResponse = { success: boolean; data?: { favPools?: Record<string, true> } }

async function loadFavPools(): Promise<string[]> {
  try {
    const res = await fetch('/api/defi/prefs')
    if (res.ok) {
      const j = await res.json() as PrefsResponse
      const ids = Object.keys(j?.data?.favPools || {})
      if (ids.length) return ids
    }
  } catch {}
  if (typeof window !== 'undefined') {
    try { const local = JSON.parse(localStorage.getItem('defi-fav-pools') || '{}') as Record<string, true>; return Object.keys(local) } catch {}
  }
  return []
}

async function fetchHistory(poolId: string, days: number): Promise<HistoryPoint[]> {
  const r = await fetch(`/api/defi/pools/history?id=${encodeURIComponent(poolId)}&days=${days}`)
  if (!r.ok) return []
  const j = await r.json()
  return (j?.data || []) as HistoryPoint[]
}

type Severity = 'all' | 'critical' | 'high' | 'medium' | 'low'

export const AnomaliesPanel: React.FC<{ days?: number; limit?: number }> = ({ days = 7, limit = 10 }) => {
  const { success, error } = useToast()
  const [favIds, setFavIds] = React.useState<string[]>([])
  const [anoms, setAnoms] = React.useState<Array<{ poolId: string; type: string; severity: Severity | 'low'; message: string; ts?: number }>>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [sevFilter, setSevFilter] = React.useState<Severity>('all')
  const [sortBy, setSortBy] = React.useState<'severity' | 'recent'>('severity')
  const [rangeDays, setRangeDays] = React.useState<number>(days)
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'tvl_drop' | 'apy_spike'>('all')
  const [selected, setSelected] = React.useState<Record<string, true>>({})
  const [notifyToken, setNotifyToken] = React.useState<string>("")
  const [notifyBusy, setNotifyBusy] = React.useState<boolean>(false)
  const [notifyMsg, setNotifyMsg] = React.useState<string>("")
  const [tvlDropPct, setTvlDropPct] = React.useState<number>(30)
  const [apySpikePct, setApySpikePct] = React.useState<number>(100)
  const [lastResults, setLastResults] = React.useState<Array<{ poolId: string; ok: boolean; status?: number; anomalies?: number; type?: string; timestamp?: number }>>([])
  // presets
  const [presetName, setPresetName] = React.useState<string>("")
  const [presets, setPresets] = React.useState<Record<string, Record<string, unknown>>>({})
  const [shareMsg, setShareMsg] = React.useState<string>("")
  const [defaultBusy, setDefaultBusy] = React.useState<boolean>(false)

  // Load user settings (anomalies) and presets from prefs + URL overrides
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/defi/prefs')
        if (!res.ok) return
        const j = await res.json()
        const s = j?.data?.settings?.anomalies || {}
        if (typeof s.tvlDropPct === 'number') setTvlDropPct(s.tvlDropPct)
        if (typeof s.apySpikePct === 'number') setApySpikePct(s.apySpikePct)
        if (typeof s.rangeDays === 'number') setRangeDays(s.rangeDays)
        if (typeof s.sevFilter === 'string') setSevFilter(s.sevFilter as Severity)
        if (typeof s.sortBy === 'string') setSortBy(s.sortBy as 'severity' | 'recent')
        if (typeof s.typeFilter === 'string') setTypeFilter(s.typeFilter as 'all' | 'tvl_drop' | 'apy_spike')
        const all = (j?.data?.presets || {}) as Record<string, Record<string, unknown>>
        const scoped: Record<string, Record<string, unknown>> = {}
        for (const [k, v] of Object.entries(all)) { if (k.startsWith('anoms:') && v && typeof v === 'object') scoped[k] = v }
        setPresets(scoped)
      } catch {}
      // URL overrides (share link)
      try {
        const sp = new URLSearchParams(window.location.search)
        const d = Number(sp.get('anom_days') || '')
        const tvl = Number(sp.get('anom_tvl') || '')
        const apy = Number(sp.get('anom_apy') || '')
        const sev = sp.get('anom_sev')
        const sort = sp.get('anom_sort')
        const typ = sp.get('anom_type')
        if (!Number.isNaN(d) && d >= 1 && d <= 90) setRangeDays(d)
        if (!Number.isNaN(tvl) && tvl >= 5 && tvl <= 95) setTvlDropPct(tvl)
        if (!Number.isNaN(apy) && apy >= 10 && apy <= 500) setApySpikePct(apy)
        if (sev && ['all','critical','high','medium','low'].includes(sev)) setSevFilter(sev as Severity)
        if (sort && ['severity','recent'].includes(sort)) setSortBy(sort as 'severity'|'recent')
        if (typ && ['all','tvl_drop','apy_spike'].includes(typ)) setTypeFilter(typ as 'all'|'tvl_drop'|'apy_spike')
      } catch {}
    })()
  }, [])

  // Persist settings (debounced)
  React.useEffect(() => {
    const t = setTimeout(() => {
      ;(async () => {
        try {
          const settings = { anomalies: { tvlDropPct, apySpikePct, rangeDays, sevFilter, sortBy, typeFilter } }
          await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }) })
        } catch {}
      })()
    }, 700)
    return () => clearTimeout(t)
  }, [tvlDropPct, apySpikePct, rangeDays, sevFilter, sortBy, typeFilter])

  // Save current settings as preset
  const savePreset = async () => {
    const name = presetName.trim()
    if (!name) return
    const key = `anoms:${name}`
    const value = { tvlDropPct, apySpikePct, rangeDays, sevFilter, sortBy, typeFilter }
    try {
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ presets: { [key]: value } }) })
      if (!res.ok) { try { error('プリセットの保存に失敗しました') } catch {}; return }
      setPresets(prev => ({ ...prev, [key]: value }))
      setPresetName("")
      try { success('プリセットを保存しました') } catch {}
    } catch {}
  }

  const applyPreset = (key: string) => {
    const p = presets[key]
    if (!p) return
    if (typeof p.tvlDropPct === 'number') setTvlDropPct(p.tvlDropPct as number)
    if (typeof p.apySpikePct === 'number') setApySpikePct(p.apySpikePct as number)
    if (typeof p.rangeDays === 'number') setRangeDays(p.rangeDays as number)
    if (typeof p.sevFilter === 'string') setSevFilter(p.sevFilter as Severity)
    if (typeof p.sortBy === 'string') setSortBy(p.sortBy as 'severity' | 'recent')
    if (typeof p.typeFilter === 'string') setTypeFilter(p.typeFilter as 'all' | 'tvl_drop' | 'apy_spike')
  }

  const deletePreset = async (key: string) => {
    try {
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deletePresets: [key] }) })
      if (!res.ok) { try { error('プリセットの削除に失敗しました') } catch {}; return }
      setPresets(prev => {
        const n = { ...prev }; delete (n as Record<string, unknown>)[key]; return n
      })
      try { success('プリセットを削除しました') } catch {}
    } catch {}
  }

  // Build share link and copy to clipboard
  const copyShareLink = async () => {
    setShareMsg("")
    try {
      const url = new URL(window.location.href)
      const sp = new URLSearchParams(url.search)
      sp.set('anom_days', String(rangeDays))
      sp.set('anom_tvl', String(tvlDropPct))
      sp.set('anom_apy', String(apySpikePct))
      sp.set('anom_sev', sevFilter)
      sp.set('anom_sort', sortBy)
      sp.set('anom_type', typeFilter)
      url.search = sp.toString()
      let toCopy = url.toString()
      try {
        const r = await fetch('/api/utils/shortlink', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: toCopy, ttlSec: 86400 }) })
        const j = await r.json().catch(()=>null) as { success?: boolean; short?: string } | null
        if (r.ok && j?.success && typeof j.short === 'string') toCopy = j.short
      } catch {}
      await navigator.clipboard.writeText(toCopy)
      setShareMsg('共有リンクをコピーしました')
      try { success('共有リンクをコピーしました') } catch {}
    } catch (e) {
      setShareMsg(e instanceof Error ? e.message : String(e))
      try { error('共有リンクのコピーに失敗しました') } catch {}
    }
  }

  // Apply current settings as default (persist in prefs.defaults.anomalies)
  const applyAsDefault = async () => {
    setShareMsg("")
    setDefaultBusy(true)
    try {
      const defaults = { anomalies: { tvlDropPct, apySpikePct, rangeDays, sevFilter, sortBy, typeFilter } }
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ defaults }) })
      if (!res.ok) { setShareMsg('デフォルト保存に失敗しました'); try { error('デフォルト保存に失敗しました') } catch {}; return }
      setShareMsg('現在の設定をデフォルトとして保存しました')
      try { success('デフォルトを保存しました') } catch {}
    } catch (e) {
      setShareMsg(e instanceof Error ? e.message : String(e))
      try { error('デフォルト保存中にエラーが発生しました') } catch {}
    } finally { setDefaultBusy(false) }
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      const ids = await loadFavPools()
      setFavIds(ids)
      const results: Array<{ poolId: string; type: string; severity: Severity | 'low'; message: string; ts?: number }> = []
      for (const id of ids.slice(0, 30)) { // limit fan-out
        try {
          const hist = await fetchHistory(id, rangeDays)
          const a = detectAnomalies(hist, { tvlDropPct, apySpikePct })
          const ts = Array.isArray(hist) && hist.length ? hist[hist.length - 1].t : undefined
          for (const x of a) {
            results.push({ poolId: id, type: x.type, severity: x.severity as Severity, message: x.message, ts })
          }
          // short delay to avoid burst
          await new Promise(r => setTimeout(r, 60))
        } catch {}
      }
      const order = { critical: 3, high: 2, medium: 1, low: 0 } as Record<string, number>
      results.sort((a, b) => (order[String(b.severity)] - order[String(a.severity)]))
      setAnoms(results.slice(0, limit))
      setLoading(false)
    })()
  }, [rangeDays, limit, tvlDropPct, apySpikePct])

  const view = React.useMemo(() => {
    const order = { critical: 3, high: 2, medium: 1, low: 0 } as Record<string, number>
    let arr = anoms
    if (sevFilter !== 'all') arr = arr.filter(a => a.severity === sevFilter)
    if (typeFilter !== 'all') arr = arr.filter(a => a.type === typeFilter)
    const sorted = [...arr]
    if (sortBy === 'severity') sorted.sort((a, b) => order[String(b.severity)] - order[String(a.severity)])
    else sorted.sort((a, b) => (b.ts || 0) - (a.ts || 0))
    return sorted
  }, [anoms, sevFilter, sortBy, typeFilter])

  const toggleSelect = (poolId: string, checked: boolean) => {
    setSelected(prev => {
      const next = { ...prev }
      if (checked) next[poolId] = true; else delete next[poolId]
      return next
    })
  }

  const notifySelected = async () => {
    setNotifyMsg("")
    const ids = Object.keys(selected)
    if (!ids.length) { setNotifyMsg('選択がありません'); return }
    if (!notifyToken.trim()) { setNotifyMsg('管理トークンを入力してください'); return }
    setNotifyBusy(true)
    try {
      const res = await fetch('/api/defi/alerts/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-alerts-token': notifyToken.trim() },
        body: JSON.stringify({ poolIds: ids, days: rangeDays, thresholds: { tvlDropPct, apySpikePct } })
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j?.success) {
        setNotifyMsg(`失敗しました (${res.status}) ${j?.error || ''}`)
      } else {
        const arr = Array.isArray(j.results) ? j.results as Array<{ ok: boolean; status?: number; poolId: string; anomalies?: number }> : []
        const ok = arr.filter(r => r && r.ok).length
        const details = arr.slice(0, 5).map(r => `${r.poolId}:${r.status ?? '-'}(anom:${r.anomalies ?? 0})`).join(', ')
        setLastResults(arr)
        setNotifyMsg(`通知実行: ${ok}/${ids.length} 件${details ? ' [' + details + ']' : ''}`)
      }
    } catch (e) {
      setNotifyMsg(e instanceof Error ? e.message : String(e))
    } finally {
      setNotifyBusy(false)
    }
  }

  const toggleSelectAll = (checked: boolean) => {
    if (!checked) { setSelected({}); return }
    const next: Record<string, true> = {}
    for (const a of view) next[a.poolId] = true
    setSelected(next)
  }

  const [csvOrder, setCsvOrder] = React.useState<'severity'|'type'|'timestamp'>('severity')
  const exportResultsCsv = () => {
    if (!lastResults.length) { setNotifyMsg('エクスポート対象がありません'); return }
    const lines = [
      ['poolId', 'ok', 'status', 'anomalies', 'type', 'timestamp', 'days', 'tvlDropPct', 'apySpikePct'].join(',')
    ]
    const items = [...lastResults]
    if (csvOrder === 'severity') {
      // keep as-is (上流でseverity順)
    } else if (csvOrder === 'timestamp') {
      items.sort((a, b) => (Number(b.timestamp || 0) - Number(a.timestamp || 0)))
    } else if (csvOrder === 'type') {
      items.sort((a, b) => String(a.type || '').localeCompare(String(b.type || '')))
    }
    for (const r of items) {
      lines.push([
        r.poolId,
        String(r.ok),
        String(r.status ?? ''),
        String(r.anomalies ?? 0),
        String(r.type ?? ''),
        String(r.timestamp ?? ''),
        String(rangeDays),
        String(tvlDropPct),
        String(apySpikePct)
      ].join(','))
    }
    const csv = lines.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `anomalies_notify_${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <div className="font-semibold">Anomalies (favorites)</div>
          <div className="flex items-center gap-2 text-xs">
            <label className="text-muted-foreground">Severity</label>
            <select aria-label="Filter by severity" className="border rounded px-1 py-0.5 bg-background" value={sevFilter} onChange={(e) => setSevFilter(e.target.value as Severity)}>
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <label className="text-muted-foreground">Type</label>
            <select aria-label="Filter by anomaly type" className="border rounded px-1 py-0.5 bg-background" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'all'|'tvl_drop'|'apy_spike')}>
              <option value="all">All</option>
              <option value="tvl_drop">TVL drop</option>
              <option value="apy_spike">APY spike</option>
            </select>
            <label className="text-muted-foreground">Sort</label>
            <select aria-label="Sort anomalies" className="border rounded px-1 py-0.5 bg-background" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'severity'|'recent')}>
              <option value="severity">Severity</option>
              <option value="recent">Recent</option>
            </select>
            <label className="text-muted-foreground">Days</label>
            <input aria-label="Anomalies lookback days" className="border rounded px-1 py-0.5 bg-background w-16" type="number" min={1} max={90} value={rangeDays} onChange={(e) => setRangeDays(Math.max(1, Math.min(90, Number(e.target.value) || days)))} />
            <label className="text-muted-foreground">TVL drop %</label>
            <input aria-label="TVL drop percent" className="border rounded px-1 py-0.5 bg-background w-16" type="number" min={5} max={95} value={tvlDropPct} onChange={(e) => setTvlDropPct(Math.max(5, Math.min(95, Number(e.target.value) || 30)))} />
            <label className="text-muted-foreground">APY spike %</label>
            <input aria-label="APY spike percent" className="border rounded px-1 py-0.5 bg-background w-16" type="number" min={10} max={500} value={apySpikePct} onChange={(e) => setApySpikePct(Math.max(10, Math.min(500, Number(e.target.value) || 100)))} />
            <Badge variant="secondary">{loading ? 'Loading…' : `${view.length}`}</Badge>
          </div>
        </div>

        {/* Presets controls */}
        <div className="flex items-center gap-2 mb-3 flex-wrap text-xs">
          <input aria-label="Preset name" className="border rounded px-2 py-1 bg-background w-48" placeholder="Preset name" value={presetName} onChange={(e) => setPresetName(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter' && presetName.trim()) { e.preventDefault(); savePreset() } }} />
          <button aria-label="Save preset" className="px-2 py-1 border rounded" onClick={savePreset} onKeyDown={(e)=>{ if (e.key==='Enter'){ e.preventDefault(); savePreset() } }} disabled={!presetName.trim()}>Save</button>
          <label className="text-muted-foreground">Load</label>
          <select aria-label="Load preset" className="border rounded px-2 py-1 bg-background w-52" onChange={(e) => e.target.value && applyPreset(e.target.value)} defaultValue="">
            <option value="" disabled>Choose…</option>
            {Object.keys(presets).sort().map(k => (
              <option key={k} value={k}>{k.replace('anoms:', '')}</option>
            ))}
          </select>
          <label className="text-muted-foreground">Delete</label>
          <select aria-label="Delete preset" className="border rounded px-2 py-1 bg-background w-52" onChange={(e) => { const v = e.target.value; if (v) { deletePreset(v); e.currentTarget.selectedIndex = 0 } }} defaultValue="">
            <option value="" disabled>Choose…</option>
            {Object.keys(presets).sort().map(k => (
              <option key={k} value={k}>{k.replace('anoms:', '')}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <input aria-label="Admin token" className="border rounded px-2 py-1 bg-background w-64" type="password" placeholder="x-alerts-token (admin)" value={notifyToken} onChange={(e) => setNotifyToken(e.target.value)} />
          <label className="text-xs flex items-center gap-1"><input type="checkbox" aria-label="Select all" onChange={(e) => toggleSelectAll(e.target.checked)} />Select all</label>
          <button aria-label="Notify selected" onClick={notifySelected} disabled={notifyBusy} className="px-2 py-1 border rounded text-sm disabled:opacity-50">{notifyBusy ? 'Notifying…' : 'Notify selected'}</button>
          <label className="text-xs text-muted-foreground">CSV order</label>
          <select aria-label="CSV order" className="border rounded px-1 py-0.5 bg-background" value={csvOrder} onChange={(e)=> setCsvOrder(e.target.value as 'severity'|'type'|'timestamp')}>
            <option value="severity">severity</option>
            <option value="type">type</option>
            <option value="timestamp">timestamp</option>
          </select>
          <button aria-label="Export results CSV" onClick={exportResultsCsv} className="px-2 py-1 border rounded text-sm">Export CSV</button>
          <button aria-label="Share link" onClick={copyShareLink} onKeyDown={(e)=>{ if (e.key==='Enter'){ e.preventDefault(); copyShareLink() } }} className="px-2 py-1 border rounded text-sm">Share Link</button>
          <button aria-label="Apply as default" onClick={applyAsDefault} onKeyDown={(e)=>{ if (e.key==='Enter'){ e.preventDefault(); applyAsDefault() } }} disabled={defaultBusy} className="px-2 py-1 border rounded text-sm disabled:opacity-50">{defaultBusy ? 'Saving…' : 'Apply default'}</button>
          {notifyMsg && <span className="text-xs text-muted-foreground">{notifyMsg}</span>}
          {shareMsg && <span className="text-xs text-muted-foreground">{shareMsg}</span>}
        </div>
        {!favIds.length && (
          <div className="text-sm text-muted-foreground">お気に入りのプールがありません。お気に入りに追加するとここに異常が表示されます。</div>
        )}
        {!!favIds.length && !loading && view.length === 0 && (
          <div className="text-sm text-muted-foreground">直近{days}日で検出された異常はありません。</div>
        )}
        {!!view.length && (
          <ul className="text-sm space-y-1">
            {view.map((a, i) => {
              const ts = a.ts ? new Date(a.ts * 1000) : null
              const when = ts ? `${ts.getMonth()+1}/${ts.getDate()} ${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}` : ''
              return (
                <li key={`${a.poolId}-${i}`} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <input aria-label={`select ${a.poolId}`} type="checkbox" checked={Boolean(selected[a.poolId])} onChange={(e) => toggleSelect(a.poolId, e.target.checked)} />
                    <a href={`/defi?tab=pools&pl_id=${encodeURIComponent(a.poolId)}`} className="truncate text-primary hover:underline">
                      {a.poolId} — {a.type}: {a.message}
                    </a>
                    {when && <span className="ml-2 text-xs text-muted-foreground">{when}</span>}
                  </div>
                  <Badge className={a.severity === 'critical' ? 'bg-red-600' : a.severity === 'high' ? 'bg-orange-600' : a.severity === 'medium' ? 'bg-amber-600' : 'bg-slate-600'}>
                    {a.severity}
                  </Badge>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
