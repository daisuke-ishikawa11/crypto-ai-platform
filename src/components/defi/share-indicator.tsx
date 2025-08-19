"use client"

import * as React from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const ShareIndicator: React.FC<{ scope: 'protocols' | 'pools' }> = ({ scope }) => {
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const hasProto = url.searchParams.get('p_chain') || url.searchParams.get('p_cat')
    const hasPool = url.searchParams.get('pl_chain') || url.searchParams.get('pl_proj')
    setActive(scope === 'protocols' ? Boolean(hasProto) : Boolean(hasPool))
  }, [scope])

  const clearShared = React.useCallback(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (scope === 'protocols') {
      url.searchParams.delete('p_chain')
      url.searchParams.delete('p_cat')
    } else {
      url.searchParams.delete('pl_chain')
      url.searchParams.delete('pl_proj')
    }
    window.history.replaceState({}, '', url.toString())
    setActive(false)
  }, [scope])

  if (!active) return null
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary">Shared filters</Badge>
      <Button size="sm" variant="ghost" onClick={clearShared} aria-label="Clear shared filters">Clear</Button>
    </div>
  )
}
