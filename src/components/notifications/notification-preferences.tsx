"use client"

import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type NotifSettings = {
  inApp?: boolean
  email?: boolean
  discordWebhook?: string
  quietHours?: string
  dnd?: boolean
}

type AIWarnSettings = {
  warnSuccessRate?: number
  warnOnRateLimited?: boolean
}

export const NotificationPreferences: React.FC = () => {
  const [settings, setSettings] = React.useState<NotifSettings>({ inApp: true, email: false, discordWebhook: '', quietHours: '', dnd: false })
  const [aiWarn, setAiWarn] = React.useState<AIWarnSettings>({ warnSuccessRate: 0.8, warnOnRateLimited: true })
  const [loading, setLoading] = React.useState<boolean>(false)
  const [saving, setSaving] = React.useState<boolean>(false)
  const [msg, setMsg] = React.useState<string>("")
  const [err, setErr] = React.useState<string>("")

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/defi/prefs')
        if (res.ok) {
          const j = await res.json()
          const s = j?.data?.settings?.notifications || {}
          setSettings({ inApp: true, email: false, discordWebhook: '', quietHours: '', dnd: false, ...s })
          const a = j?.data?.settings?.aiEvaluate || {}
          setAiWarn({ warnSuccessRate: typeof a.warnSuccessRate === 'number' ? a.warnSuccessRate : 0.8, warnOnRateLimited: typeof a.warnOnRateLimited === 'boolean' ? a.warnOnRateLimited : true })
        }
      } finally { setLoading(false) }
    })()
  }, [])

  const validate = (): string | null => {
    const url = (settings.discordWebhook || '').trim()
    if (url) {
      const ok = /^https?:\/\//i.test(url) && /discord\.com\/api\/webhooks\//.test(url)
      if (!ok) return 'Discord Webhookの形式が不正です'
      if (url.length > 512) return 'Discord Webhookが長すぎます'
    }
    const qh = (settings.quietHours || '').trim()
    if (qh) {
      const m = qh.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/)
      if (!m) return 'Quiet Hoursは HH:MM-HH:MM 形式で入力してください'
      const [ , h1, m1, h2, m2 ] = m
      const H1 = Number(h1), M1 = Number(m1), H2 = Number(h2), M2 = Number(m2)
      const inRange = (h: number, mm: number) => h >= 0 && h <= 23 && mm >= 0 && mm <= 59
      if (!inRange(H1, M1) || !inRange(H2, M2)) return 'Quiet Hoursの時刻が不正です'
    }
    return null
  }

  const save = async () => {
    setSaving(true); setMsg("")
    try {
      const ve = validate()
      if (ve) { setErr(ve); return }
      setErr("")
      const body = { settings: { notifications: settings, aiEvaluate: aiWarn } }
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setMsg(j?.error || `保存失敗 (${res.status})`)
      } else {
        setMsg('保存しました')
        try {
          if (typeof window !== 'undefined') {
            const ev = new CustomEvent('defi:prefs:updated', { detail: { settings } })
            window.dispatchEvent(ev)
          }
        } catch {}
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e))
    } finally { setSaving(false) }
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-3 text-sm">
        <div className="font-medium">通知設定</div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1"><input type="checkbox" checked={!!settings.inApp} onChange={(e) => setSettings(s => ({ ...s, inApp: e.target.checked }))} />アプリ内</label>
          <label className="flex items-center gap-1"><input type="checkbox" checked={!!settings.email} onChange={(e) => setSettings(s => ({ ...s, email: e.target.checked }))} />メール</label>
          <label className="flex items-center gap-1"><input type="checkbox" checked={!!settings.dnd} onChange={(e) => setSettings(s => ({ ...s, dnd: e.target.checked }))} />DND</label>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-36 text-muted-foreground">Discord Webhook</label>
          <input className="border rounded px-2 py-1 bg-background w-full" placeholder="https://discord.com/api/webhooks/..." value={settings.discordWebhook || ''} onChange={(e) => setSettings(s => ({ ...s, discordWebhook: e.target.value }))} />
          <button className="px-2 py-1 border rounded" type="button" onClick={() => setSettings(s => ({ ...s, discordWebhook: '' }))}>Clear</button>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-36 text-muted-foreground">Quiet Hours</label>
          <input className="border rounded px-2 py-1 bg-background" placeholder="23:00-07:00" value={settings.quietHours || ''} onChange={(e) => setSettings(s => ({ ...s, quietHours: e.target.value }))} />
        </div>
        {err && <div className="text-xs text-red-600">{err}</div>}
        <div className="pt-2 border-t mt-2" />
        <div className="font-medium">AI評価の警告設定</div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1"><input type="checkbox" checked={!!aiWarn.warnOnRateLimited} onChange={(e) => setAiWarn(s => ({ ...s, warnOnRateLimited: e.target.checked }))} />RateLimit発生時に警告</label>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-36 text-muted-foreground">成功率しきい値</label>
          <input
            aria-label="AI評価成功率しきい値"
            type="number"
            min={50}
            max={100}
            step={1}
            className="border rounded px-2 py-1 bg-background w-24"
            value={Math.round(((aiWarn.warnSuccessRate ?? 0.8) * 100))}
            onChange={(e) => {
              const v = Number(e.target.value)
              const pct = Math.max(50, Math.min(100, Number.isFinite(v) ? v : 80))
              setAiWarn(s => ({ ...s, warnSuccessRate: pct / 100 }))
            }}
          />
          <span className="text-muted-foreground">%</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={save} disabled={saving || loading}>{saving ? '保存中…' : '保存'}</Button>
          {msg && <span className="text-xs text-muted-foreground">{msg}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
