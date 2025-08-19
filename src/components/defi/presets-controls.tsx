"use client"

import * as React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Filters = Record<string, unknown>
type ProtocolFilters = { chain?: string; category?: string }
type PoolFilters = { chain?: string; project?: string }

export const PresetsControls: React.FC<{
  scope: 'protocols' | 'pools'
  current: Filters
  onApply: (filters: Filters) => void
}> = ({ scope, current, onApply }) => {
  const [name, setName] = React.useState("")
  const [saving, setSaving] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [presets, setPresets] = React.useState<Record<string, Filters>>({})
  const [defaultKey, setDefaultKey] = React.useState<string | null>(null)

  const loadPresets = React.useCallback(async () => {
    setLoading(true); setError("")
    try {
      const res = await fetch('/api/defi/prefs')
      const j = await res.json().catch(() => ({}))
      const all = (j?.data?.presets || {}) as Record<string, unknown>
      const scoped: Record<string, Filters> = {}
      for (const [k, v] of Object.entries(all)) {
        if (k.startsWith(scope + ':') && typeof v === 'object' && v) scoped[k] = v as Filters
      }
      setPresets(scoped)
      const defaults = (j?.data?.defaults || {}) as { protocols?: string; pools?: string }
      const d = scope === 'protocols' ? defaults.protocols : defaults.pools
      setDefaultKey(d || null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally { setLoading(false) }
  }, [scope])

  React.useEffect(() => { loadPresets() }, [loadPresets])

  async function savePreset() {
    if (!name.trim()) return
    setSaving(true); setError("")
    try {
      const key = `${scope}:${name.trim()}`
      const body = { presets: { [key]: current } }
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error || `save failed (${res.status})`)
      } else {
        await loadPresets(); setName("")
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally { setSaving(false) }
  }

  async function applyPreset(k: string) {
    const f = presets[k]
    if (f) onApply(f)
  }

  async function setDefault(k: string) {
    setSaving(true); setError("")
    try {
      const defaults = scope === 'protocols' ? { protocols: k } : { pools: k }
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ defaults }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error || `set default failed (${res.status})`)
      } else {
        setDefaultKey(k)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally { setSaving(false) }
  }

  async function exportPresets() {
    try {
      const res = await fetch('/api/defi/prefs')
      const j = await res.json()
      const all = (j?.data?.presets || {}) as Record<string, unknown>
      // scope別のみを書き出し
      const scoped: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(all)) { if (k.startsWith(scope + ':')) scoped[k] = v }
      downloadBlob(JSON.stringify(scoped, null, 2), `${scope}-presets.json`)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  async function importPresets(file: File) {
    try {
      const text = await readFileAsText(file)
      const obj = JSON.parse(text) as Record<string, unknown>
      const presets: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(obj)) { if (k.startsWith(scope + ':')) presets[k] = v }
      if (Object.keys(presets).length === 0) { setError('インポート対象のプリセットがありません'); return }
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ presets }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error || `import failed (${res.status})`)
      } else {
        await loadPresets()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  function applyDefault() {
    const k = defaultKey
    if (k) applyPreset(k)
  }

  function clearFilters() {
    if (scope === 'protocols') onApply({ chain: '', category: '' })
    else onApply({ chain: '', project: '' })
  }

  async function deletePreset(k: string) {
    setSaving(true); setError("")
    try {
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deletePresets: [k] }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error || `delete failed (${res.status})`)
      } else {
        await loadPresets()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally { setSaving(false) }
  }

  async function overwritePreset(k: string) {
    setSaving(true); setError("")
    try {
      const body = { presets: { [k]: current } }
      const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error || `overwrite failed (${res.status})`)
      } else {
        await loadPresets()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally { setSaving(false) }
  }

  async function copyLink(k: string) {
    try {
      const f = presets[k]
      if (!f) return
      const url = new URL(window.location.origin + '/defi')
      const tab = scope === 'protocols' ? 'protocols' : 'pools'
      url.searchParams.set('tab', tab)
      if (scope === 'protocols') {
        const pf = f as ProtocolFilters
        if (typeof pf.chain === 'string') url.searchParams.set('p_chain', pf.chain)
        if (typeof pf.category === 'string') url.searchParams.set('p_cat', pf.category)
      } else {
        const plf = f as PoolFilters
        if (typeof plf.chain === 'string') url.searchParams.set('pl_chain', plf.chain)
        if (typeof plf.project === 'string') url.searchParams.set('pl_proj', plf.project)
      }
      const link = url.toString()
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(link)
      } else {
        const ta = document.createElement('textarea')
        ta.value = link
        document.body.appendChild(ta)
        ta.select(); document.execCommand('copy'); ta.remove()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <Card>
      <CardContent className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Input placeholder="プリセット名" value={name} onChange={(e) => setName(e.target.value)} className="max-w-xs" />
          <Button size="sm" onClick={savePreset} disabled={saving || !name.trim()}>保存</Button>
          <Button size="sm" variant="secondary" onClick={loadPresets} disabled={loading}>更新</Button>
          <Button size="sm" variant="outline" onClick={() => exportPresets()} title="Export presets as JSON">Export</Button>
          <label className="text-xs">
            <span className="sr-only">Import presets</span>
            <input type="file" accept="application/json" onChange={(e) => {
              const f = e.target.files && e.target.files[0]
              if (f) importPresets(f)
              e.currentTarget.value = ''
            }} />
          </label>
          <Button size="sm" variant="ghost" onClick={applyDefault} title="Apply default preset">Apply default</Button>
          <Button size="sm" variant="ghost" onClick={clearFilters} title="Clear filters">Clear</Button>
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {Object.keys(presets).length === 0 && (
            <span className="text-xs text-muted-foreground">保存済みプリセットはありません</span>
          )}
          {Object.keys(presets).sort().map((k) => {
            const label = k.replace(`${scope}:`, '')
            const isDefault = defaultKey === k
            return (
              <div key={k} className="flex items-center gap-1">
                <Button size="sm" variant={isDefault ? 'default' : 'outline'} onClick={() => applyPreset(k)} title={k}>{label}{isDefault ? ' (default)' : ''}</Button>
                <Button size="sm" variant="ghost" onClick={() => overwritePreset(k)} aria-label={`Overwrite preset ${k}`}>↻</Button>
                <Button size="sm" variant="ghost" onClick={() => copyLink(k)} aria-label={`Copy link for preset ${k}`}>🔗</Button>
                <Button size="sm" variant="ghost" onClick={() => setDefault(k)} aria-label={`Set default preset ${k}`}>★</Button>
                <Button size="sm" variant="ghost" onClick={() => deletePreset(k)} aria-label={`Delete preset ${k}`}>×</Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function downloadBlob(content: string, filename: string, contentType = 'application/json'): void {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// Component-local helpers (outside component to avoid re-creation)
async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.onload = () => resolve(String(reader.result || ''))
    reader.readAsText(file)
  })
}
