"use client"

import * as React from "react"
import { useToast } from '@/components/ui/use-toast'
import { useSearchParams } from 'next/navigation'
import { buildLessonPath } from '@/lib/learning/route-utils'

type Row = { id: string; type: string; symbol: string; title?: string; message?: string; severity?: string; createdAt?: string; acknowledged?: boolean }

function AlertsHistoryPageInner() {
  const params = useSearchParams()
  const { success } = useToast()
  const [rows, setRows] = React.useState<Row[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [severity, setSeverity] = React.useState<string>(params.get('severity') || '')
  const [type, setType] = React.useState<string>(params.get('type') || '')
  const [symbol, setSymbol] = React.useState<string>(params.get('symbol') || '')
  const [limit, setLimit] = React.useState<number>(Number(params.get('limit') || 50))
  const [offset, setOffset] = React.useState<number>(Number(params.get('offset') || 0))
  const [from, setFrom] = React.useState<string>(params.get('from') || '')
  const [to, setTo] = React.useState<string>(params.get('to') || '')
  const [ack, setAck] = React.useState<string>(params.get('acknowledged') || '')
  const [total, setTotal] = React.useState<number | null>(null)
  const [selected, setSelected] = React.useState<Row | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      if (severity) qs.set('severity', severity)
      if (type) qs.set('type', type)
      if (symbol) qs.set('symbol', symbol)
      if (from) qs.set('from', from)
      if (to) qs.set('to', to)
      if (ack) qs.set('acknowledged', ack)
      qs.set('limit', String(limit))
      qs.set('offset', String(offset))
      const res = await fetch(`/api/alerts/history?${qs.toString()}`, { cache: 'no-store' })
      const j = await res.json()
      setRows(j?.data || [])
      setTotal(j?.meta?.total ?? null)
      const url = new URL(window.location.href)
      url.search = qs.toString()
      window.history.replaceState({}, '', url.toString())
    } finally { setLoading(false) }
  }, [severity, type, symbol, from, to, limit, offset, ack])

  React.useEffect(() => { load() }, [load])

  const exportCsv = async () => {
    const qs = new URLSearchParams()
    if (severity) qs.set('severity', severity)
    if (type) qs.set('type', type)
    if (symbol) qs.set('symbol', symbol)
    if (from) qs.set('from', from)
    if (to) qs.set('to', to)
    if (ack) qs.set('acknowledged', ack)
    qs.set('limit', String(limit))
    qs.set('offset', String(offset))
    qs.set('format', 'csv')
    window.open(`/api/alerts/history?${qs.toString()}`, '_blank')
    success('CSVをエクスポートしました')
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-semibold">通知履歴</h1>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label className="text-muted-foreground">Severity</label>
        <select aria-label="Filter severity" className="border rounded px-2 py-1 bg-background" value={severity} onChange={(e) => { setSeverity(e.target.value); setOffset(0) }}>
          <option value="">All</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <label className="text-muted-foreground">Type</label>
        <input aria-label="Filter type" className="border rounded px-2 py-1 bg-background w-40" value={type} onChange={(e) => { setType(e.target.value); setOffset(0) }} />
        <label className="text-muted-foreground">Symbol</label>
        <input aria-label="Filter symbol" className="border rounded px-2 py-1 bg-background w-32" value={symbol} onChange={(e) => { setSymbol(e.target.value); setOffset(0) }} />
        <label className="text-muted-foreground">From</label>
        <input aria-label="From date" type="datetime-local" className="border rounded px-2 py-1 bg-background" value={from} onChange={(e) => { setFrom(e.target.value); setOffset(0) }} />
        <label className="text-muted-foreground">To</label>
        <input aria-label="To date" type="datetime-local" className="border rounded px-2 py-1 bg-background" value={to} onChange={(e) => { setTo(e.target.value); setOffset(0) }} />
        <label className="text-muted-foreground">Acknowledged</label>
        <select aria-label="Filter acknowledged" className="border rounded px-2 py-1 bg-background" value={ack} onChange={(e) => { setAck(e.target.value); setOffset(0) }}>
          <option value="">All</option>
          <option value="true">Read</option>
          <option value="false">Unread</option>
        </select>
        <label className="text-muted-foreground">Rows</label>
        <select aria-label="Rows per page" className="border rounded px-2 py-1 bg-background" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setOffset(0) }}>
          {[20, 50, 100, 200, 500].map(n => <option value={n} key={n}>{n}</option>)}
        </select>
        <button onClick={exportCsv} className="px-2 py-1 border rounded">Export CSV</button>
        <ShareFiltersButton severity={severity} type={type} symbol={symbol} from={from} to={to} ack={ack} limit={limit} offset={offset} />
      </div>
      <div className="border rounded">
        <div className="grid grid-cols-7 gap-2 p-2 text-xs font-medium text-muted-foreground border-b bg-muted/40">
          <div>ID</div><div>Type</div><div>Symbol</div><div>Title</div><div>Severity</div><div>Created</div><div>Actions</div>
        </div>
        {loading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading…</div>
        ) : (
          rows.length === 0 ? <div className="p-4 text-sm text-muted-foreground">データがありません</div> :
          rows.map(r => (
            <div key={r.id} className="grid grid-cols-7 gap-2 p-2 text-sm border-t">
              <div className="truncate" title={r.id}>{r.id}</div>
              <div className="truncate" title={r.type}>{r.type}</div>
              <div className="truncate" title={r.symbol}>{r.symbol}</div>
              <a href={`/defi?tab=dashboard&risk_symbol=${encodeURIComponent(r.symbol || '')}#risk-inspector`} className="truncate text-primary hover:underline" title={r.title || ''}>{r.title}</a>
              <div className="truncate" title={r.severity}>{r.severity}</div>
              <div className="truncate" title={r.createdAt}>{r.createdAt}</div>
              <div className="truncate flex gap-2">
                {r.acknowledged ? (
                  <span className="text-xs text-muted-foreground">Read</span>
                ) : (
                  <AckButton id={r.id} onDone={load} />
                )}
                <button onClick={() => setSelected(r)} className="px-2 py-1 border rounded text-xs">View</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 border rounded" onClick={() => setOffset(o => Math.max(0, o - limit))} disabled={offset === 0}>Prev</button>
        <button className="px-2 py-1 border rounded" onClick={() => setOffset(o => o + limit)} disabled={rows.length < limit}>Next</button>
        <span className="text-sm text-muted-foreground">offset {offset}{total !== null ? ` / total ${total}` : ''}</span>
        <MarkAllReadButton onDone={load} />
      </div>
      {selected && (
        <AlertDetailsModal row={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

export default function AlertsHistoryPage() {
  return (
    <React.Suspense fallback={<div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">Loading…</div>}>
      <AlertsHistoryPageInner />
    </React.Suspense>
  )
}

function ShareFiltersButton(props: { severity: string; type: string; symbol: string; from: string; to: string; ack: string; limit: number; offset: number }) {
  const [msg, setMsg] = React.useState<string>("")
  const { success, error } = useToast()
  const onClick = async () => {
    setMsg("")
    try {
      const url = new URL(window.location.href)
      const sp = new URLSearchParams()
      if (props.severity) sp.set('severity', props.severity)
      if (props.type) sp.set('type', props.type)
      if (props.symbol) sp.set('symbol', props.symbol)
      if (props.from) sp.set('from', props.from)
      if (props.to) sp.set('to', props.to)
      if (props.ack) sp.set('acknowledged', props.ack)
      sp.set('limit', String(props.limit))
      sp.set('offset', String(props.offset))
      url.search = sp.toString()
      // Try shortlink first
      let toCopy = url.toString()
      try {
        const r = await fetch('/api/utils/shortlink', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: toCopy, ttlSec: 86400 }) })
        const j = await r.json().catch(()=>null) as { success?: boolean; short?: string } | null
        if (r.ok && j?.success && typeof j.short === 'string') toCopy = j.short
      } catch {}
      await navigator.clipboard.writeText(toCopy)
      setMsg('共有リンクをコピーしました')
      success('共有リンクをコピーしました')
      setTimeout(()=>setMsg(""), 2500)
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e))
      error('共有リンクのコピーに失敗しました')
    }
  }
  return (
    <>
      <button onClick={onClick} onKeyDown={(ev)=>{ if (ev.key==='Enter') { ev.preventDefault(); onClick() } }} aria-label="Share current filters" className="px-2 py-1 border rounded">Share Link</button>
      {msg && <span className="text-xs text-muted-foreground">{msg}</span>}
    </>
  )
}

function AckButton({ id, onDone }: { id: string; onDone: () => void }) {
  const [busy, setBusy] = React.useState(false)
  const { success, error } = useToast()
  const onClick = async () => {
    setBusy(true)
    try {
      const supabase = (await import('@/lib/supabase/client')).createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return
      const qs = new URLSearchParams({ userId: user.id, action: 'ack', id })
      const res = await fetch(`/api/alerts/process?${qs.toString()}`, { method: 'GET' })
      if (res.ok) { success('既読にしました'); onDone() } else { error('既読に失敗しました') }
    } finally { setBusy(false) }
  }
  return <button onClick={onClick} disabled={busy} className="px-2 py-1 border rounded text-xs">{busy ? '...' : 'Mark read'}</button>
}

function MarkAllReadButton({ onDone }: { onDone: () => void }) {
  const [busy, setBusy] = React.useState(false)
  const { success, error } = useToast()
  const onClick = async () => {
    setBusy(true)
    try {
      const supabase = (await import('@/lib/supabase/client')).createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return
      const qs = new URLSearchParams({ userId: user.id, action: 'ack', all: '1' })
      const res = await fetch(`/api/alerts/process?${qs.toString()}`, { method: 'GET' })
      if (res.ok) { success('すべて既読にしました'); onDone() } else { error('既読更新に失敗しました') }
    } finally { setBusy(false) }
  }
  return <button onClick={onClick} disabled={busy} className="px-2 py-1 border rounded text-xs">{busy ? '...' : 'Mark all read'}</button>
}

function AlertDetailsModal({ row, onClose }: { row: Row; onClose: () => void }) {
  const [busy, setBusy] = React.useState(false)
  const [summary, setSummary] = React.useState<string>("")
  const [metaOpen, setMetaOpen] = React.useState<boolean>(false)
  const [errorMsg, setErrorMsg] = React.useState<string>("")
  const [keyPoints, setKeyPoints] = React.useState<string[]>([])
  const [relatedActions, setRelatedActions] = React.useState<Array<{ action?: string; description?: string; category?: string; urgency?: string }>>([])
  const [followUps, setFollowUps] = React.useState<string[]>([])
  const [sources, setSources] = React.useState<string[]>([])
  const [diag, setDiag] = React.useState<Record<string, unknown> | null>(null)
  const { success, error } = useToast()

  const runAISummary = async () => {
    setBusy(true); setErrorMsg("")
    try {
      // Prefer alert_summary (構造化スキーマ対応) → fallback to chat
      const alertText = `Type: ${row.type}\nSymbol: ${row.symbol}\nSeverity: ${row.severity ?? ''}\nTitle: ${row.title ?? ''}\nMessage: ${row.message ?? ''}`
      const res = await fetch('/api/ai/structured', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'alert_summary', data: { text: alertText } }) })
      const j = await res.json()
      if (!res.ok || !j?.success) {
        const res2 = await fetch('/api/ai/structured', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'chat', data: { query: `次の通知を要約し、推奨アクションを日本語で短く提案してください。\n${alertText}`, context: { previousMessages: [] } } }) })
        if (!res2.ok) throw new Error(`AI error ${res2.status}`)
        const j2 = await res2.json()
        const content2 = j2?.result?.response || j2?.result?.summary || JSON.stringify(j2?.result)
        setSummary(typeof content2 === 'string' ? content2 : JSON.stringify(content2))
        setDiag({ mode: 'chat', ok: true, status: res.status, resultKeys: Object.keys(j2?.result || {}) })
        if (Array.isArray(j2?.result?.keyPoints)) setKeyPoints(j2.result.keyPoints as string[])
        if (Array.isArray(j2?.result?.followUpQuestions)) setFollowUps(j2.result.followUpQuestions as string[])
        if (Array.isArray(j2?.result?.sources)) setSources(j2.result.sources as string[])
        if (Array.isArray(j2?.result?.relatedActions)) setRelatedActions(j2.result.relatedActions as Array<{ action?: string; description?: string; category?: string; urgency?: string }>)
        success('AI要約を生成しました')
        return
      }
      const content = j?.result?.summary || j?.result?.response || JSON.stringify(j?.result)
      setSummary(typeof content === 'string' ? content : JSON.stringify(content))
      setDiag({ mode: 'alert_summary', ok: true, status: res.status, schema: 'AlertSummarySchema', keys: Object.keys(j?.result || {}) })
      if (Array.isArray(j?.result?.keyPoints)) setKeyPoints(j.result.keyPoints as string[])
      if (Array.isArray(j?.result?.followUpQuestions)) setFollowUps(j.result.followUpQuestions as string[])
      if (Array.isArray(j?.result?.sources)) setSources(j.result.sources as string[])
      if (Array.isArray(j?.result?.relatedActions)) setRelatedActions(j.result.relatedActions as Array<{ action?: string; description?: string; category?: string; urgency?: string }>)
      success('AI要約を生成しました')
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setErrorMsg(msg)
      error('AI要約の生成に失敗しました')
    } finally { setBusy(false) }
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-xl bg-background rounded shadow-lg">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold">Alert Details</div>
          <button onClick={onClose} className="px-2 py-1 border rounded text-xs" aria-label="Close">Close</button>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{row.id}</span></div>
          <div><span className="text-muted-foreground">Type:</span> {row.type}</div>
          <div><span className="text-muted-foreground">Symbol:</span> {row.symbol}</div>
          <div><span className="text-muted-foreground">Severity:</span> {row.severity}</div>
          <div><span className="text-muted-foreground">Created:</span> {row.createdAt}</div>
          {row.title && (<div><span className="text-muted-foreground">Title:</span> {row.title}</div>)}
          {row.message && (
            <div>
              <div className="text-muted-foreground">Message:</div>
              <div className="whitespace-pre-wrap break-words text-sm mt-1">{row.message}</div>
            </div>
          )}
          <div className="pt-2 border-t">
            <button onClick={runAISummary} disabled={busy} className="px-2 py-1 border rounded text-xs">
              {busy ? 'Analyzing…' : 'AI要約を生成'}
            </button>
            {errorMsg && <div className="text-xs text-red-600 mt-1">{errorMsg}</div>}
            {summary && (
              <div className="mt-2 p-2 rounded border bg-muted/30">
                <div className="text-xs text-muted-foreground mb-1">AI要約</div>
                <div className="whitespace-pre-wrap break-words text-sm">{summary}</div>
                <div className="mt-2">
                  <button onClick={()=> setMetaOpen(o=>!o)} className="px-2 py-1 border rounded text-xs">{metaOpen ? '診断メタを隠す' : '診断メタを表示'}</button>
                  {metaOpen && (
                    <pre className="mt-2 text-[11px] leading-4 p-2 rounded bg-muted/50 overflow-x-auto">{JSON.stringify(diag || {}, null, 2)}</pre>
                  )}
                </div>
                {keyPoints.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground mb-1">要点</div>
                    <ul className="list-disc pl-5 text-sm space-y-0.5">
                      {keyPoints.slice(0,6).map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                )}
                {/* 推奨アクション */}
                {(relatedActions.length > 0 || deriveActions(summary).length > 0) && (
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground mb-1">推奨アクション</div>
                    <ul className="list-disc pl-5 text-sm space-y-0.5">
                      {(relatedActions.length > 0 ? relatedActions.map(a => a.action || a.description || '') : deriveActions(summary))
                        .filter(Boolean)
                        .slice(0,5)
                        .map((a, i) => (<li key={i}>{a}</li>))}
                    </ul>
                  </div>
                )}
                {sources.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground mb-1">参考情報</div>
                    <ul className="list-disc pl-5 text-sm space-y-0.5">
                      {sources.slice(0,5).map((s, i) => (
                        <li key={i}>
                          <a className="text-primary hover:underline" href={s} target="_blank" rel="noreferrer">{s}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {followUps.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground mb-1">フォローアップの質問</div>
                    <ul className="list-disc pl-5 text-sm space-y-0.5">
                      {followUps.slice(0,5).map((q, i) => (<li key={i}>{q}</li>))}
                    </ul>
                  </div>
                )}
                {/* 関連レッスン */}
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground mb-1">関連レッスン</div>
                  <ul className="text-sm space-y-0.5">
                    {deriveRelatedLessons(summary).map((l, i) => (
                      <li key={i}>
                        <a className="text-primary hover:underline" href={buildLessonPath(l.slug)} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      </li>
                    ))}
                    {deriveRelatedLessons(summary).length === 0 && <li className="text-muted-foreground">該当なし</li>}
                  </ul>
                </div>
                {/* DeFiリスクインスペクター */}
                {row.symbol && (
                  <div className="mt-3">
                    <a className="px-2 py-1 border rounded text-xs inline-block" href={`/defi?tab=dashboard&risk_symbol=${encodeURIComponent(row.symbol)}#risk-inspector`}>
                      DeFiリスクインスペクターで確認
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function deriveActions(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .filter(s => s.startsWith('・') || s.startsWith('-') || /推奨|すべき|してください|検討|推奨され/.test(s))
    .map(s => s.replace(/^[-・]\s?/, ''))
}

function deriveRelatedLessons(text: string): Array<{ label: string; slug: string }> {
  const lower = text.toLowerCase()
  const res: Array<{ label: string; slug: string }> = []
  const push = (label: string, slug: string) => {
    if (!res.some(r => r.slug === slug)) res.push({ label, slug })
  }
  if (/(tvl|流動性|liquidity)/i.test(text)) push('TVL・流動性の基礎', 'tvl-signal')
  if (/(apy|利回り|yield)/i.test(text)) push('APYとリスク（入門）', 'apy-and-risk')
  if (/(監査|ラグプル|rug|scam|スキャム)/i.test(lower)) push('監査とリスクの見方', 'defi-audit-basics')
  if (/(ボラ|volatility|急変)/i.test(lower)) push('ボラティリティとリスク管理', 'risk-volatility-basics')
  return res
}
