"use client"

import * as React from 'react'
import { createClient } from '@/lib/supabase/client'

type TicketsBadgeProps = { userId?: string }

export const TicketsBadge: React.FC<TicketsBadgeProps> = ({ userId }) => {
  const [resolvedUserId, setResolvedUserId] = React.useState<string>(userId || '')
  const [balance, setBalance] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const fetchBalance = React.useCallback(async () => {
    const uid = resolvedUserId || 'guest'
    try {
      setLoading(true)
      const res = await fetch('/api/defi/risk/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, op: 'get' })
      })
      const json = await res.json()
      if (res.ok && typeof json.balance === 'number') setBalance(json.balance)
    } catch {
      // noop
    } finally {
      setLoading(false)
    }
  }, [resolvedUserId])

  React.useEffect(() => {
    let unsub: (() => void) | undefined
    ;(async () => {
      if (!userId) {
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          if (user?.id) setResolvedUserId(user.id)
        } catch {}
      }
      await fetchBalance()
      // グローバル更新イベントに対応
      const onRefresh = () => { void fetchBalance() }
      window.addEventListener('tickets:refresh', onRefresh as EventListener)
      unsub = () => window.removeEventListener('tickets:refresh', onRefresh as EventListener)
    })()
    return () => { try { if (unsub) unsub() } catch {} }
  }, [userId, fetchBalance])

  return (
    <button onClick={fetchBalance} className="text-xs px-2 py-1 rounded border hover:bg-muted" aria-label="Risk tickets balance">
      {loading ? '...' : `Tickets: ${balance ?? '-'}`}
    </button>
  )
}
