"use client"

import * as React from "react"
import { Bell } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type AlertItem = { id: string; title?: string; message?: string; severity?: string; createdAt?: string }

export const NotificationBell: React.FC = () => {
  const [count, setCount] = React.useState<number>(0)
  const [items, setItems] = React.useState<AlertItem[]>([])
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [busy, setBusy] = React.useState<boolean>(false)
  const [userId, setUserId] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) { setUserId(null); setCount(0); setItems([]); return }
      setUserId(user.id)
      const base = '/api/alerts/process'
      const qsHistory = new URLSearchParams({ userId: user.id, action: 'history' })
      const resH = await fetch(`${base}?${qsHistory.toString()}`, { cache: 'no-store' })
      if (!resH.ok) { setCount(0); setItems([]); return }
      const jH = await resH.json().catch(() => ({}))
      const list: AlertItem[] = Array.isArray(jH?.data) ? jH.data : []
      setItems(list.slice(0, 10))
      const qsStatus = new URLSearchParams({ userId: user.id, action: 'status' })
      const resS = await fetch(`${base}?${qsStatus.toString()}`, { cache: 'no-store' })
      if (resS.ok) {
        const jS = await resS.json().catch(() => ({}))
        const c = Number(jS?.data?.unreadCount ?? 0)
        if (Number.isFinite(c)) setCount(c)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { load() }, [load])

  // Realtime subscription for new alerts
  React.useEffect(() => {
    if (!userId) return
    const supabase = createClient()
    const ch = supabase.channel(`alerts_${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alert_history', filter: `user_id=eq.${userId}` }, () => {
        void load()
      })
      .subscribe()
    return () => { try { ch.unsubscribe() } catch {} }
  }, [userId, load])

  const ack = async (id?: string) => {
    setBusy(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.id) return
      const qs = new URLSearchParams({ userId: user.id, action: 'ack', ...(id ? { id } : { all: '1' }) })
      const res = await fetch(`/api/alerts/process?${qs.toString()}`, { method: 'GET', cache: 'no-store' })
      if (res.ok) await load()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative">
      <button aria-label="Notifications" onClick={() => { setOpen(o => !o); if (!open) load() }} className="relative p-2 rounded hover:bg-muted">
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-background border rounded shadow-lg z-50">
          <div className="p-2 text-sm font-semibold flex items-center justify-between">
            <span>通知</span>
            <div className="flex items-center gap-2">
              <button className="text-xs text-primary hover:underline" onClick={load} disabled={loading}>{loading ? '更新中…' : '更新'}</button>
              <button className="text-xs text-primary hover:underline" onClick={() => ack()} disabled={busy}>全て既読</button>
              <a className="text-xs text-primary hover:underline" href="/alerts" onClick={() => setOpen(false)}>すべて表示</a>
            </div>
          </div>
          <div className="max-h-80 overflow-auto">
            {items.length === 0 && (
              <div className="p-3 text-sm text-muted-foreground">新しい通知はありません。</div>
            )}
            {items.map((it) => (
              <div key={it.id} className="p-3 border-t text-sm">
                <div className="flex items-center justify-between">
                  <a href={`/alerts?symbol=${encodeURIComponent(it.message?.match(/\b[A-Z]{2,10}\b/)?.[0] || '')}`} className="font-medium truncate text-primary hover:underline" onClick={() => setOpen(false)}>{it.title || 'Alert'}</a>
                  <div className="flex items-center gap-2">
                    {it.severity && <span className="text-xs text-muted-foreground">{it.severity}</span>}
                    <button className="text-xs text-primary hover:underline" onClick={() => ack(it.id)} disabled={busy}>既読</button>
                  </div>
                </div>
                {it.message && <div className="text-muted-foreground mt-0.5 line-clamp-2">{it.message}</div>}
                {it.createdAt && <div className="text-[11px] text-muted-foreground mt-1">{new Date(it.createdAt).toLocaleString()}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
