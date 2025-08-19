"use client"

import * as React from "react"
import { createClient } from '@/lib/supabase/client'
import { assessPoolRiskLight, type LightPool } from '@/lib/defi/risk-heuristics'
import { Card, CardContent } from '@/components/ui/card'

export const RiskInspector: React.FC = () => {
  const [symbol, setSymbol] = React.useState("")
  const [project, setProject] = React.useState("")
  const [chain, setChain] = React.useState("")
  const [tvl, setTvl] = React.useState<string>("")
  const [apy, setApy] = React.useState<string>("")
  const [result, setResult] = React.useState<ReturnType<typeof assessPoolRiskLight> | null>(null)
  const [auditUrls, setAuditUrls] = React.useState<string>("")
  const [docsUrls, setDocsUrls] = React.useState<string>("")
  const [communityUrls, setCommunityUrls] = React.useState<string>("")
  type AiRespType = { error?: string } | { success?: boolean; data?: { base?: { score: number; severity: string; reasons?: string[] }; ai?: { enabled: boolean; adjustments: number; reasons?: string[]; keyPoints?: string[]; sources?: string[]; suggestedSeverity?: string }; final?: { score: number; severity: string; reasons?: string[] } } } | null
  const [aiResp, setAiResp] = React.useState<AiRespType>(null)
  const [userId, setUserId] = React.useState<string>("")
  const [balance, setBalance] = React.useState<number | null>(null)
  // Prefill from URL query
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const u = new URL(window.location.href)
    const get = (k: string) => u.searchParams.get(k) || ''
    const s = get('risk_symbol'); if (s) setSymbol(s)
    const pr = get('risk_project'); if (pr) setProject(pr)
    const ch = get('risk_chain'); if (ch) setChain(ch)
    const tv = get('risk_tvl'); if (tv) setTvl(tv)
    const ap = get('risk_apy'); if (ap) setApy(ap)
  }, [])

  // Try resolve userId from Supabase session
  React.useEffect(() => {
    (async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) setUserId(prev => prev || user.id)
      } catch {}
    })()
  }, [])

  function run() {
    const pool: LightPool = {
      id: 'manual',
      project: project.trim(),
      chain: chain.trim(),
      symbol: symbol.trim(),
      tvlUsd: tvl ? Number(tvl) : undefined,
      apy: apy ? Number(apy) : undefined,
    }
    setResult(assessPoolRiskLight(pool))
  }

  async function refreshBalance() {
    if (!userId) return
    const res = await fetch('/api/defi/risk/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, op: 'get' }) })
    const j = await res.json(); setBalance(typeof j.balance === 'number' ? j.balance : null)
  }

  async function addTickets(n: number) {
    if (!userId) return
    const res = await fetch('/api/defi/risk/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, op: 'add', amount: n }) })
    const j = await res.json(); setBalance(typeof j.balance === 'number' ? j.balance : null)
  }

  async function buyTickets(n: number) {
    try {
      const res = await fetch('/api/defi/risk/tickets/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tickets: n, currency: 'jpy' }) })
      const j = await res.json()
      if (res.ok && j?.url) {
        window.location.href = j.url
      }
    } catch {}
  }

  async function runAI() {
    if (!userId) return
    // consume 1 ticket first
    const c = await fetch('/api/defi/risk/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, op: 'consume' }) })
    if (!c.ok) { setAiResp({ error: 'チケットが不足しています。チャージしてください。' }); return }
    const pool = { id: 'manual', project: project.trim(), chain: chain.trim(), symbol: symbol.trim(), tvlUsd: tvl ? Number(tvl) : undefined, apy: apy ? Number(apy) : undefined }
    const evi = {
      auditUrls: auditUrls ? auditUrls.split(',').map(s=>s.trim()).filter(Boolean) : [],
      docsUrls: docsUrls ? docsUrls.split(',').map(s=>s.trim()).filter(Boolean) : [],
      communityUrls: communityUrls ? communityUrls.split(',').map(s=>s.trim()).filter(Boolean) : [],
    }
    let _refunded = false; void _refunded
    try {
      const res = await fetch('/api/defi/risk/ai-evaluate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pool, evidence: evi, userId }) })
      const j = await res.json().catch(() => ({}))
      // Rate-limit補助メッセージ
      if (res.status === 429) {
        const retryAfter = Number((j as { retryAfterSec?: number }).retryAfterSec ?? 0) || Number(res.headers.get('Retry-After') || 0) || undefined
        setAiResp({ error: `Rate limited. ${retryAfter ? `再試行まで約${retryAfter}秒` : ''}` })
      } else {
        setAiResp(j)
      }
      if (!res.ok || (typeof (j as { success?: boolean }).success === 'boolean' && !(j as { success?: boolean }).success)) {
        await fetch('/api/defi/risk/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, op: 'add', amount: 1 }) })
        _refunded = true
      }
    } catch (e) {
      setAiResp({ error: e instanceof Error ? e.message : String(e) })
      try {
        await fetch('/api/defi/risk/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, op: 'add', amount: 1 }) })
        _refunded = true
      } catch {}
    }
    try {
      await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inspectHistory: [{ at: Date.now(), pool, evidence: evi }] }) })
    } catch {}
    // refresh balance after refund or success
    refreshBalance()
  }

  return (
    <Card id="risk-inspector">
      <CardContent className="p-4 space-y-3">
        <div className="font-semibold">スキャム/ラグプル簡易チェック（ヒューリスティック）</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2 bg-background" placeholder="Symbol (e.g., WETH-PEPE)" value={symbol} onChange={(e)=>setSymbol(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-background" placeholder="Project (e.g., uniswap-v3)" value={project} onChange={(e)=>setProject(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-background" placeholder="Chain (e.g., Ethereum)" value={chain} onChange={(e)=>setChain(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-background" placeholder="TVL USD (optional)" value={tvl} onChange={(e)=>setTvl(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-background" placeholder="APY % (optional)" value={apy} onChange={(e)=>setApy(e.target.value)} />
          <button onClick={run} className="px-3 py-2 border rounded hover:bg-muted">チェック</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2 bg-background" placeholder="Audit URLs (comma)" value={auditUrls} onChange={(e)=>setAuditUrls(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-background" placeholder="Docs URLs (comma)" value={docsUrls} onChange={(e)=>setDocsUrls(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-background" placeholder="Community URLs (comma)" value={communityUrls} onChange={(e)=>setCommunityUrls(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <input className="border rounded px-3 py-2 bg-background" placeholder="User ID (tickets)" value={userId} onChange={(e)=>setUserId(e.target.value)} />
          <div className="text-sm">Balance: {balance ?? '-'}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={refreshBalance} className="px-2 py-1 border rounded hover:bg-muted text-sm">残高確認</button>
            <button onClick={()=>addTickets(1)} className="px-2 py-1 border rounded hover:bg-muted text-sm">+1 チケット</button>
            <button onClick={()=>addTickets(10)} className="px-2 py-1 border rounded hover:bg-muted text-sm">+10 チケット</button>
            <button onClick={()=>buyTickets(10)} className="px-2 py-1 border rounded hover:bg-muted text-sm">チケットを購入（10）</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={runAI} className="px-3 py-2 border rounded hover:bg-muted">AIで統合評価（1チケット消費）</button>
        </div>
        {result && (
          <div className="text-sm">
            <div>Score: <strong>{result.score}</strong> / Severity: <strong>{result.severity}</strong></div>
            {result.reasons.length > 0 && (
              <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                {result.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
              </ul>
            )}
            <div className="text-xs text-muted-foreground mt-2">注意: これはヒューリスティックによる簡易判定です。公式ドキュメント・監査・コミュニティ情報なども併せて必ず確認してください。</div>
          </div>
        )}
        {aiResp && (
          <div className="text-sm space-y-2">
            {'error' in (aiResp as Record<string, unknown>) ? (
              <div className="text-red-600 text-xs">{String((aiResp as { error?: string }).error || 'AIエラー')}</div>
            ) : (
              (() => {
                const d = (aiResp as { data?: Record<string, unknown> }).data || {}
                const base = d.base as { score?: number; severity?: string; reasons?: string[] } | undefined
                const ai = d.ai as { enabled?: boolean; adjustments?: number; reasons?: string[]; keyPoints?: string[]; sources?: string[]; suggestedSeverity?: string } | undefined
                const fin = d.final as { score?: number; severity?: string; reasons?: string[] } | undefined
                return (
                  <div className="border rounded p-2 bg-muted/30">
                    <div className="font-medium mb-1">AI統合評価</div>
                    <div className="text-xs text-muted-foreground">最終スコア/重大度</div>
                    <div className="text-sm mb-2">Score: <strong>{fin?.score ?? '-'}</strong> / Severity: <strong>{fin?.severity ?? '-'}</strong></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground">ベース（ヒューリスティック）</div>
                        <div className="text-xs">Score: <strong>{base?.score ?? '-'}</strong> / Severity: <strong>{base?.severity ?? '-'}</strong></div>
                        {Array.isArray(base?.reasons) && base!.reasons!.length > 0 && (
                          <ul className="list-disc pl-5 text-xs mt-1">
                            {base!.reasons!.slice(0,5).map((r,i)=>(<li key={i}>{r}</li>))}
                          </ul>
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">AI補助</div>
                        <div className="text-xs">Enabled: <strong>{ai?.enabled ? 'yes' : 'no'}</strong> / ΔScore: <strong>{ai?.adjustments ?? 0}</strong> / Suggest: <strong>{ai?.suggestedSeverity ?? '-'}</strong></div>
                        {Array.isArray(ai?.keyPoints) && ai!.keyPoints!.length > 0 && (
                          <ul className="list-disc pl-5 text-xs mt-1">
                            {ai!.keyPoints!.slice(0,6).map((r,i)=>(<li key={i}>{r}</li>))}
                          </ul>
                        )}
                        {Array.isArray(ai?.sources) && ai!.sources!.length > 0 && (
                          <div className="text-xs mt-1"><span className="text-muted-foreground">参考:</span> {ai!.sources!.slice(0,3).map((s,i)=>(<a key={i} className="text-primary hover:underline mr-2" href={s} target="_blank" rel="noreferrer">link{i+1}</a>))}</div>
                        )}
                      </div>
                    </div>
                    {Array.isArray(fin?.reasons) && fin!.reasons!.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground">統合理由</div>
                        <ul className="list-disc pl-5 text-xs">
                          {fin!.reasons!.slice(0,8).map((r,i)=>(<li key={i}>{r}</li>))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })()
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
