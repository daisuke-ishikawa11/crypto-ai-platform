"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ThresholdMap = Record<string, number>

// ----- Diff helpers (module scope: stable across renders) -----
const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

const stableStringify = (v: unknown): string => {
  const helper = (x: unknown): unknown => {
    if (Array.isArray(x)) return x.map(helper)
    if (isPlainObject(x)) {
      const out: Record<string, unknown> = {}
      for (const key of Object.keys(x).sort()) out[key] = helper(x[key])
      return out
    }
    return x
  }
  try {
    return JSON.stringify(helper(v))
  } catch {
    return String(v)
  }
}

const deepEqual = (a: unknown, b: unknown): boolean => stableStringify(a) === stableStringify(b)

type GetResponse = {
  thresholds: ThresholdMap
  defaultPct: number
  error?: string
}

type AuditItem = {
  id: string
  key: string
  before: Record<string, unknown> | null
  after: Record<string, unknown> | null
  changed_by: string
  changed_at: string
  changed_by_label?: string
}

export const NotificationSettings: React.FC = () => {
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
  const [thresholds, setThresholds] = React.useState<ThresholdMap>({})
  const [defaultPct, setDefaultPct] = React.useState<number>(5)
  const [newProvider, setNewProvider] = React.useState<string>("")
  const [auditItems, setAuditItems] = React.useState<AuditItem[]>([])
  const [auditLoading, setAuditLoading] = React.useState<boolean>(false)
  const [auditTotal, setAuditTotal] = React.useState<number>(0)
  const [auditPage, setAuditPage] = React.useState<number>(1)
  const [auditPageSize, setAuditPageSize] = React.useState<number>(100)
  const [expandedAuditId, setExpandedAuditId] = React.useState<string | null>(null)
  const [sigma, setSigma] = React.useState<number>(3)
  const [minSamples, setMinSamples] = React.useState<number>(5)

  const load = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const res = await fetch('/api/notifications/analytics/settings', { method: 'GET' })
      const json = await res.json() as GetResponse
      if (!res.ok) {
        setError(json?.error || '設定の取得に失敗しました')
        return
      }
      setThresholds(json.thresholds)
      setDefaultPct(typeof json.defaultPct === 'number' ? json.defaultPct : 5)
    } catch {
      setError('設定の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  const [filterStart, setFilterStart] = React.useState<string>("")
  const [filterEnd, setFilterEnd] = React.useState<string>("")
  const [filterKey, setFilterKey] = React.useState<string>("")
  const [filterChangedBy, setFilterChangedBy] = React.useState<string>("")

  const loadAudit = React.useCallback(async () => {
    try {
      setAuditLoading(true)
      const params = new URLSearchParams()
      params.set('limit', String(auditPageSize))
      params.set('page', String(auditPage))
      if (filterStart) params.set('start', filterStart)
      if (filterEnd) params.set('end', filterEnd)
      if (filterKey.trim()) params.set('key', filterKey.trim())
      if (filterChangedBy.trim()) params.set('changedBy', filterChangedBy.trim())
      const res = await fetch(`/api/notifications/analytics/settings/audit?${params.toString()}`)
      const json = await res.json().catch(() => ({})) as { items?: AuditItem[]; total?: number; page?: number; pageSize?: number; error?: string }
      if (!res.ok) {
        setError(json?.error || '監査ログの取得に失敗しました')
        return
      }
      setAuditItems(Array.isArray(json.items) ? json.items : [])
      setAuditTotal(typeof json.total === 'number' ? json.total : 0)
      setAuditPage(typeof json.page === 'number' ? json.page : 1)
      setAuditPageSize(typeof json.pageSize === 'number' ? json.pageSize : auditPageSize)
    } catch {
      setError('監査ログの取得に失敗しました')
    } finally {
      setAuditLoading(false)
    }
  }, [filterStart, filterEnd, filterKey, filterChangedBy, auditPage, auditPageSize])

  const loadAnomaly = React.useCallback(async () => {
    try {
      const res = await fetch('/api/notifications/analytics/settings/anomaly')
      const json = await res.json().catch(() => ({})) as { anomaly?: { sigma?: number; minSamples?: number } }
      if (res.ok && json.anomaly) {
        if (typeof json.anomaly.sigma === 'number') setSigma(json.anomaly.sigma)
        if (typeof json.anomaly.minSamples === 'number') setMinSamples(json.anomaly.minSamples)
      }
    } catch {}
  }, [])

  React.useEffect(() => {
    void load()
    void loadAudit()
    void loadAnomaly()
  }, [load, loadAudit, loadAnomaly])

  const save = React.useCallback(async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      // 入力値バリデーション (0-100)
      const normalized: ThresholdMap = {}
      for (const [k, v] of Object.entries(thresholds)) {
        const key = k.trim().toLowerCase()
        if (!key) continue
        const num = Number(v)
        if (!Number.isFinite(num) || num < 0 || num > 100) {
          setError('しきい値は0〜100の数値で入力してください')
          setSaving(false)
          return
        }
        normalized[key] = Number(num.toFixed(2))
      }

      const res = await fetch('/api/notifications/analytics/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized)
      })
      const json = await res.json().catch(() => ({})) as { success?: boolean; error?: string }
      if (!res.ok || json?.success !== true) {
        setError(json?.error || '保存に失敗しました')
        return
      }
      setSuccess('保存しました')
      await load()
    } catch {
      setError('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }, [thresholds, load])

  const addProvider = React.useCallback(() => {
    const key = newProvider.trim().toLowerCase()
    if (!key) return
    if (thresholds[key] !== undefined) return
    setThresholds(prev => ({ ...prev, [key]: defaultPct }))
    setNewProvider("")
  }, [newProvider, thresholds, defaultPct])

  const removeProvider = React.useCallback((key: string) => {
    setThresholds(prev => {
      const next: ThresholdMap = {}
      for (const [k, v] of Object.entries(prev)) if (k !== key) next[k] = v
      return next
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-label="loading" />
      </div>
    )
  }

  if (error && Object.keys(thresholds).length === 0) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>通知設定</CardTitle>
            <CardDescription>権限がないか、設定の取得に失敗しました。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-red-600 text-sm" role="alert">{error}</div>
            <div className="mt-4">
              <Button onClick={() => void load()} aria-label="再読み込み">再読み込み</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>アノマリ検知感度</CardTitle>
            <CardDescription>
              無効署名のスパイク検知に用いる感度を設定します（σ係数と最小サンプル数）。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-3">
              <div className="md:col-span-4">
                <Label htmlFor="sigma">σ（シグマ）</Label>
                <Input id="sigma" type="number" inputMode="decimal" min={0} step={0.1} value={sigma}
                  onChange={(e)=> setSigma(Number(e.target.value))} aria-label="シグマ" />
              </div>
              <div className="md:col-span-4">
                <Label htmlFor="minSamples">最小サンプル数</Label>
                <Input id="minSamples" type="number" inputMode="numeric" min={1} step={1} value={minSamples}
                  onChange={(e)=> setMinSamples(Number(e.target.value))} aria-label="最小サンプル数" />
              </div>
              <div className="md:col-span-4">
                <Button onClick={async ()=>{
                  const payload = { sigma: Number(sigma), minSamples: Number(minSamples) }
                  const res = await fetch('/api/notifications/analytics/settings/anomaly', {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
                  })
                  if (!res.ok) {
                    setError('アノマリ設定の保存に失敗しました')
                  }
                }} aria-label="アノマリ設定を保存">保存</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Webhook 署名しきい値</CardTitle>
          <CardDescription>
            プロバイダ別の「無効な署名率」アラートしきい値をパーセンテージで設定します（0〜100）。
            値はDBで保存され、設定が存在しない場合は既定値 {defaultPct}% が適用されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm text-gray-600">既定値: {defaultPct}%</div>

          <div className="grid gap-4">
            {Object.entries(thresholds).sort((a, b) => a[0].localeCompare(b[0])).map(([provider, value]) => (
              <div key={provider} className="grid grid-cols-1 md:grid-cols-12 items-end gap-3">
                <div className="md:col-span-4">
                  <Label htmlFor={`provider-${provider}`}>プロバイダ</Label>
                  <Input id={`provider-${provider}`} value={provider} readOnly aria-readonly className="bg-muted" />
                </div>
                <div className="md:col-span-4">
                  <Label htmlFor={`value-${provider}`}>しきい値（%）</Label>
                  <Input
                    id={`value-${provider}`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step={0.1}
                    value={value}
                    onChange={(e) => {
                      const next = Number(e.target.value)
                      setThresholds(prev => ({ ...prev, [provider]: next }))
                    }}
                    aria-label={`${provider} のしきい値`}
                  />
                </div>
                <div className="md:col-span-4 flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => removeProvider(provider)}
                    aria-label={`${provider} を一覧から削除`}
                  >削除</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 items-end gap-3">
            <div className="md:col-span-4">
              <Label htmlFor="new-provider">新規プロバイダ名</Label>
              <Input
                id="new-provider"
                placeholder="例: firebase"
                value={newProvider}
                onChange={(e) => setNewProvider(e.target.value)}
                aria-label="新規プロバイダ名"
              />
            </div>
            <div className="md:col-span-4">
              <Label htmlFor="new-provider-default">初期しきい値（%）</Label>
              <Input id="new-provider-default" value={defaultPct} readOnly aria-readonly className="bg-muted" />
            </div>
            <div className="md:col-span-4">
              <Button onClick={addProvider} aria-label="プロバイダを追加">追加</Button>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button onClick={() => void save()} disabled={saving} aria-label="保存">
              {saving ? '保存中…' : '保存'}
            </Button>
            <Button variant="secondary" onClick={() => void load()} aria-label="元に戻す">
              元に戻す
            </Button>
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-sm" role="alert">{error}</div>
          )}
          {success && (
            <div className="mt-4 text-green-600 text-sm" role="status">{success}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>しきい値変更の監査ログ</CardTitle>
          <CardDescription>
            最近の設定変更履歴を表示します。CSVでエクスポートも可能です。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4 items-end">
            <div className="md:col-span-3">
              <Label htmlFor="audit-start">開始</Label>
              <Input id="audit-start" type="datetime-local" value={filterStart}
                onChange={(e)=> setFilterStart(e.target.value)} aria-label="監査開始日時" />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="audit-end">終了</Label>
              <Input id="audit-end" type="datetime-local" value={filterEnd}
                onChange={(e)=> setFilterEnd(e.target.value)} aria-label="監査終了日時" />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="audit-key">キー</Label>
              <Input id="audit-key" placeholder="webhook_invalid_sig_thresholds 等" value={filterKey}
                onChange={(e)=> setFilterKey(e.target.value)} aria-label="監査キー" />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="audit-user">変更者</Label>
              <Input id="audit-user" placeholder="ユーザーID" value={filterChangedBy}
                onChange={(e)=> setFilterChangedBy(e.target.value)} aria-label="監査変更者" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Button variant="secondary" onClick={() => void loadAudit()} aria-label="監査ログを再読み込み" disabled={auditLoading}>
              {auditLoading ? '読み込み中…' : '更新'}
            </Button>
            <Button
              onClick={async () => {
                const params = new URLSearchParams()
                params.set('limit', '1000')
                params.set('format', 'csv')
                if (filterStart) params.set('start', filterStart)
                if (filterEnd) params.set('end', filterEnd)
                if (filterKey.trim()) params.set('key', filterKey.trim())
                if (filterChangedBy.trim()) params.set('changedBy', filterChangedBy.trim())
                const res = await fetch(`/api/notifications/analytics/settings/audit?${params.toString()}`)
                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'notification_settings_audit.csv'
                document.body.appendChild(a)
                a.click()
                a.remove()
                URL.revokeObjectURL(url)
              }}
              aria-label="CSVとしてエクスポート"
            >CSVエクスポート</Button>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div>合計: {auditTotal.toLocaleString()} 件</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled={auditPage <= 1} onClick={()=> setAuditPage(p=> Math.max(1, p-1))} aria-label="前のページ">前へ</Button>
              <span>{auditPage}</span>
              <Button variant="outline" disabled={(auditPage * auditPageSize) >= auditTotal} onClick={()=> setAuditPage(p=> p+1)} aria-label="次のページ">次へ</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">変更日時</th>
                  <th className="py-2 pr-4">変更者</th>
                  <th className="py-2 pr-4">キー</th>
                  <th className="py-2 pr-4">変更前</th>
                  <th className="py-2 pr-4">変更後</th>
                </tr>
              </thead>
              <tbody>
                {auditItems.length === 0 && (
                  <tr>
                    <td className="py-3 text-gray-500" colSpan={5}>履歴がありません。</td>
                  </tr>
                )}
                {auditItems.map((item) => (
                  <>
                    <tr key={item.id} className="border-b align-top">
                      <td className="py-2 pr-4 whitespace-nowrap">{new Date(item.changed_at).toLocaleString()}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{item.changed_by_label || item.changed_by}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{item.key}</td>
                      <td className="py-2 pr-4">
                        <pre className="max-w-md whitespace-pre-wrap break-words">{JSON.stringify(item.before, null, 2)}</pre>
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex items-start justify-between gap-2">
                          <pre className="max-w-md whitespace-pre-wrap break-words">{JSON.stringify(item.after, null, 2)}</pre>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedAuditId(expandedAuditId === item.id ? null : item.id)}
                            aria-label="差分を表示"
                          >{expandedAuditId === item.id ? '閉じる' : '差分'}</Button>
                        </div>
                      </td>
                    </tr>
                    {expandedAuditId === item.id && (
                      <tr className="bg-muted/30">
                        <td className="py-2 px-4" colSpan={5}>
                          <AuditDiff before={item.before} after={item.after} />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AuditDiff({ before, after }: { before: Record<string, unknown> | null; after: Record<string, unknown> | null }) {
  type DiffKind = 'added' | 'removed' | 'changed' | 'unchanged'
  type DiffRow = { path: string; before?: unknown; after?: unknown; kind: DiffKind }

  // moved to module scope

  const flattenDiff = React.useCallback((b: unknown, a: unknown, basePath: string[] = []): DiffRow[] => {
    if (isPlainObject(b) || isPlainObject(a)) {
      const bObj = isPlainObject(b) ? b : {}
      const aObj = isPlainObject(a) ? a : {}
      const keys = Array.from(new Set([...Object.keys(bObj), ...Object.keys(aObj)])).sort()
      const rows: DiffRow[] = []
      for (const key of keys) {
        const nextPath = [...basePath, key]
        const bv = bObj[key]
        const av = aObj[key]
        if (bv === undefined && av !== undefined) {
          rows.push({ path: nextPath.join('.'), before: undefined, after: av, kind: 'added' })
        } else if (bv !== undefined && av === undefined) {
          rows.push({ path: nextPath.join('.'), before: bv, after: undefined, kind: 'removed' })
        } else if (!deepEqual(bv, av)) {
          if (isPlainObject(bv) || isPlainObject(av)) {
            rows.push(...flattenDiff(bv, av, nextPath))
          } else {
            rows.push({ path: nextPath.join('.'), before: bv, after: av, kind: 'changed' })
          }
        } else {
          rows.push({ path: nextPath.join('.'), before: bv, after: av, kind: 'unchanged' })
        }
      }
      return rows
    }
    if (!deepEqual(b, a)) return [{ path: basePath.join('.') || '(root)', before: b, after: a, kind: 'changed' }]
    return [{ path: basePath.join('.') || '(root)', before: b, after: a, kind: 'unchanged' }]
  }, [])

  const rows = React.useMemo(() => flattenDiff(before || {}, after || {}), [before, after, flattenDiff])

  const formatValue = (v: unknown): string => {
    if (v === undefined) return ''
    if (typeof v === 'string') return v
    if (typeof v === 'number' || typeof v === 'boolean') return String(v)
    try { return JSON.stringify(v, null, 2) } catch { return String(v) }
  }

  const badge = (kind: DiffKind) => {
    const common = 'inline-block text-[10px] px-1.5 py-0.5 rounded border mr-2'
    if (kind === 'added') return <span className={common + ' text-green-700 border-green-300 bg-green-50 dark:bg-green-900/20'}>+</span>
    if (kind === 'removed') return <span className={common + ' text-red-700 border-red-300 bg-red-50 dark:bg-red-900/20'}>-</span>
    if (kind === 'changed') return <span className={common + ' text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20'}>~</span>
    return <span className={common + ' text-gray-600 border-gray-300 bg-gray-50 dark:bg-gray-900/20'}>&nbsp;</span>
  }

  const rowClass = (kind: DiffKind): string => {
    if (kind === 'added') return 'bg-green-50 dark:bg-green-900/10'
    if (kind === 'removed') return 'bg-red-50 dark:bg-red-900/10'
    if (kind === 'changed') return 'bg-yellow-50 dark:bg-yellow-900/10'
    return ''
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 text-xs text-gray-600">
        <span className="mr-3">{badge('added')}追加</span>
        <span className="mr-3">{badge('removed')}削除</span>
        <span className="mr-3">{badge('changed')}変更</span>
        <span>{badge('unchanged')}変更なし</span>
      </div>
      <table className="min-w-full text-xs">
        <thead>
          <tr className="text-left border-b">
            <th className="py-1 pr-4">キー</th>
            <th className="py-1 pr-4">変更前</th>
            <th className="py-1 pr-4">変更後</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.path} className={rowClass(r.kind)}>
              <td className="py-1 pr-4 align-top font-medium">
                {badge(r.kind)}{r.path}
              </td>
              <td className="py-1 pr-4 align-top"><pre className="whitespace-pre-wrap break-words">{formatValue(r.before)}</pre></td>
              <td className="py-1 pr-4 align-top"><pre className="whitespace-pre-wrap break-words">{formatValue(r.after)}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
