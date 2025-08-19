"use client"

import * as React from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, CartesianGrid } from 'recharts'

type EventRow = {
  type: string
  userId?: string
  lessonId?: string
  categoryId?: string
  testId?: string | null
  tickets?: number
  score?: number | null
  balance?: number
  at?: number
}

export default function LearningRewardsAuditPage() {
  const [token, setToken] = React.useState<string>("")
  const [limit, setLimit] = React.useState<number>(50)
  const [offset, setOffset] = React.useState<number>(0)
  const [userId, setUserId] = React.useState<string>("")
  const [type, setType] = React.useState<string>("")
  const [rows, setRows] = React.useState<EventRow[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")
  const [downloading, setDownloading] = React.useState<boolean>(false)
  const [startAt, setStartAt] = React.useState<string>("")
  const [endAt, setEndAt] = React.useState<string>("")
  const [health, setHealth] = React.useState<string>("")
  const [healthAuth, setHealthAuth] = React.useState<string>("")
  const [summary, setSummary] = React.useState<{ totalEvents: number; totalTickets: number; uniqueUsers: number; byType: Record<string, number> }|null>(null)
  const [tsData, setTsData] = React.useState<Array<{ t: number; events: number; tickets: number }>>([])
  const [bucket, setBucket] = React.useState<'day'|'hour'>('day')

  const fetchAudit = async () => {
    setLoading(true); setError("")
    try {
      const params = new URLSearchParams()
      params.set('limit', String(limit))
      params.set('offset', String(offset))
      if (userId) params.set('userId', userId)
      if (type) params.set('type', type)
      if (startAt) params.set('startAt', new Date(startAt).toISOString())
      if (endAt) params.set('endAt', new Date(endAt).toISOString())
      const res = await fetch(`/api/learning/rewards/audit?${params.toString()}`, {
        headers: token ? { 'x-learning-token': token } : undefined
      })
      const json = await res.json()
      if (!res.ok) { setError(json?.error || 'failed'); setRows([]); return }
      setRows(Array.isArray(json?.data) ? json.data as EventRow[] : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  const downloadCsv = async () => {
    setDownloading(true); setError("")
    try {
      const params = new URLSearchParams()
      params.set('limit', String(limit))
      params.set('offset', String(offset))
      if (userId) params.set('userId', userId)
      if (type) params.set('type', type)
      if (startAt) params.set('startAt', new Date(startAt).toISOString())
      if (endAt) params.set('endAt', new Date(endAt).toISOString())
      params.set('format', 'csv')
      const res = await fetch(`/api/learning/rewards/audit?${params.toString()}`, {
        headers: token ? { 'x-learning-token': token } : undefined
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json?.error || `download failed (${res.status})`)
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'learning_rewards_audit.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setDownloading(false)
    }
  }

  // Supabase health status
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/health/supabase')
        const json = await res.json()
        if (json?.success) setHealth(`OK (${json.status})`)
        else setHealth(`NG (${json?.status ?? '500'})`)
      } catch { setHealth('NG') }
    })()
  }, [])

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/health/supabase-auth')
        const json = await res.json()
        if (json?.success) setHealthAuth(`OK (${json.status})`)
        else setHealthAuth(`NG (${json?.status ?? '500'})`)
      } catch { setHealthAuth('NG') }
    })()
  }, [])

  // Summary loader
  const loadSummary = async () => {
    try {
      const params = new URLSearchParams()
      if (startAt) params.set('startAt', new Date(startAt).toISOString())
      if (endAt) params.set('endAt', new Date(endAt).toISOString())
      if (userId) params.set('userId', userId)
      if (type) params.set('type', type)
      const res = await fetch(`/api/learning/rewards/summary?${params.toString()}`, { headers: token ? { 'x-learning-token': token } : undefined })
      const json = await res.json()
      if (res.ok && json?.success) {
        setSummary(json.data)
      }
    } catch { /* ignore */ }
  }

  const loadTimeseries = async () => {
    try {
      const params = new URLSearchParams()
      if (startAt) params.set('startAt', new Date(startAt).toISOString())
      if (endAt) params.set('endAt', new Date(endAt).toISOString())
      if (userId) params.set('userId', userId)
      if (type) params.set('type', type)
      params.set('bucket', bucket)
      const res = await fetch(`/api/learning/rewards/timeseries?${params.toString()}`, { headers: token ? { 'x-learning-token': token } : undefined })
      const json = await res.json()
      if (res.ok && json?.success && Array.isArray(json.data)) setTsData(json.data)
    } catch { /* ignore */ }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-semibold">Learning Rewards Audit</h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground">x-learning-token</label>
          <input value={token} onChange={(e)=>setToken(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" placeholder="管理トークン" />
        </div>
        <div>
          <label htmlFor="startAt-input" className="block text-sm text-muted-foreground">startAt</label>
          <input id="startAt-input" type="datetime-local" value={startAt} onChange={(e)=>setStartAt(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label htmlFor="endAt-input" className="block text-sm text-muted-foreground">endAt</label>
          <input id="endAt-input" type="datetime-local" value={endAt} onChange={(e)=>setEndAt(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label htmlFor="limit-input" className="block text-sm text-muted-foreground">limit</label>
          <input id="limit-input" type="number" value={limit} onChange={(e)=>setLimit(Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-background" placeholder="1-200" />
        </div>
        <div>
          <label htmlFor="offset-input" className="block text-sm text-muted-foreground">offset</label>
          <input id="offset-input" type="number" value={offset} onChange={(e)=>setOffset(Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-background" placeholder="0-5000" />
        </div>
        <div>
          <label htmlFor="userid-input" className="block text-sm text-muted-foreground">userId</label>
          <input id="userid-input" value={userId} onChange={(e)=>setUserId(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" placeholder="optional" />
        </div>
        <div>
          <label htmlFor="type-select" className="block text-sm text-muted-foreground">type</label>
          <select id="type-select" value={type} onChange={(e)=>setType(e.target.value)} className="w-full border rounded px-3 py-2 bg-background" title="Event type">
            <option value="">(all)</option>
            <option value="category_test_grant">category_test_grant</option>
            <option value="lesson_completed_grant">lesson_completed_grant</option>
          </select>
        </div>
        <div className="md:col-span-6 flex gap-2">
          <button onClick={fetchAudit} className="px-3 py-2 border rounded hover:bg-muted">ロード</button>
          <button onClick={downloadCsv} disabled={downloading} className="px-3 py-2 border rounded hover:bg-muted disabled:opacity-50">CSVダウンロード</button>
          <button onClick={() => { loadSummary(); loadTimeseries(); }} className="px-3 py-2 border rounded hover:bg-muted">サマリー</button>
          <div className="ml-auto text-sm text-muted-foreground">SB: {health || '...'} / Auth: {healthAuth || '...'}</div>
        </div>
      </div>
      {loading && <div className="text-sm">読み込み中...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {/* 簡易サマリー */}
      <div className="text-sm text-muted-foreground flex items-center gap-4">
        <span>取得件数: {rows.length}</span>
        <span>付与合計: {rows.reduce((acc, r) => acc + (typeof r.tickets === 'number' ? r.tickets : 0), 0)}</span>
        <span>ユニークユーザー: {Array.from(new Set(rows.map(r => r.userId || ''))).filter(Boolean).length}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => { const d=new Date(); const s=new Date(d.getTime()-24*3600*1000); setStartAt(s.toISOString().slice(0,16)); setEndAt(d.toISOString().slice(0,16)); }} className="px-2 py-1 border rounded hover:bg-muted">過去24h</button>
          <button onClick={() => { const d=new Date(); const s=new Date(d.getTime()-7*24*3600*1000); setStartAt(s.toISOString().slice(0,16)); setEndAt(d.toISOString().slice(0,16)); }} className="px-2 py-1 border rounded hover:bg-muted">過去7日</button>
          <button onClick={() => { setStartAt(''); setEndAt(''); }} className="px-2 py-1 border rounded hover:bg-muted">期間クリア</button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setOffset(Math.max(0, offset - limit))} className="px-2 py-1 border rounded hover:bg-muted" disabled={offset === 0}>Prev</button>
          <button onClick={() => setOffset(offset + limit)} className="px-2 py-1 border rounded hover:bg-muted">Next</button>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3 text-sm">
          <div className="p-3 border rounded bg-card">イベント総数: <span className="font-semibold">{summary.totalEvents}</span></div>
          <div className="p-3 border rounded bg-card">付与合計: <span className="font-semibold">{summary.totalTickets}</span></div>
          <div className="p-3 border rounded bg-card">ユニークユーザー: <span className="font-semibold">{summary.uniqueUsers}</span></div>
          <div className="p-3 border rounded bg-card">内訳: <span className="font-semibold">cat={summary.byType?.category_test_grant ?? 0}, lesson={summary.byType?.lesson_completed_grant ?? 0}</span></div>
        </div>
      )}

      {/* Timeseries chart */}
      <div className="mt-4 border rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">時系列（{bucket}）</div>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="bucket-select" className="text-muted-foreground">粒度</label>
            <select id="bucket-select" value={bucket} onChange={(e)=>setBucket(e.target.value as 'day'|'hour')} className="border rounded px-2 py-1 bg-background">
              <option value="day">日</option>
              <option value="hour">時</option>
            </select>
            <button onClick={loadTimeseries} className="px-2 py-1 border rounded hover:bg-muted">再読込</button>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tsData.map(d => ({ t: new Date(d.t).toLocaleString(), events: d.events, tickets: d.tickets }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" hide={tsData.length > 40} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
              <RTooltip />
              <Bar yAxisId="left" dataKey="events" name="events" fill="#4f46e5" />
              <Bar yAxisId="right" dataKey="tickets" name="tickets" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-3">時刻</th>
              <th className="py-2 pr-3">type</th>
              <th className="py-2 pr-3">userId</th>
              <th className="py-2 pr-3">categoryId</th>
              <th className="py-2 pr-3">lessonId</th>
              <th className="py-2 pr-3">testId</th>
              <th className="py-2 pr-3">score</th>
              <th className="py-2 pr-3">tickets</th>
              <th className="py-2 pr-3">balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 pr-3">{r.at ? new Date(r.at).toLocaleString() : ''}</td>
                <td className="py-2 pr-3">{r.type}</td>
                <td className="py-2 pr-3">{r.userId || ''}</td>
                <td className="py-2 pr-3">{r.categoryId || ''}</td>
                <td className="py-2 pr-3">{r.lessonId || ''}</td>
                <td className="py-2 pr-3">{r.testId || ''}</td>
                <td className="py-2 pr-3">{typeof r.score === 'number' ? r.score : ''}</td>
                <td className="py-2 pr-3">{typeof r.tickets === 'number' ? r.tickets : ''}</td>
                <td className="py-2 pr-3">{typeof r.balance === 'number' ? r.balance : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
