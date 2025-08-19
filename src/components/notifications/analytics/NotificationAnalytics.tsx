/**
 * 📊 Notification Analytics Component
 * Comprehensive analytics dashboard for notification performance
 */

'use client'

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api/fetcher'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { DatePickerWithRange } from '@/components/ui/date-range-picker'
// import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter,
  // BarChart3,
  // PieChart as PieChartIcon,
  Activity,
  // Users,
  Mail,
  Smartphone,
  MessageSquare,
  Webhook,
  AlertCircle,
  CheckCircle,
  Clock,
  MousePointer,
  Eye
} from 'lucide-react'
import { NotificationChannel, NotificationAnalytics as AnalyticsData } from '@/lib/notifications/types'
import { toRecord } from '@/lib/types/guards'

// type TimeSeriesPoint = { date: string; value: number }
type PerformanceMetrics = { averageDeliveryTime?: number; medianDeliveryTime?: number; p95DeliveryTime?: number }
type ErrorTop = { error: string; count: number; percentage: number }
type ErrorMetrics = { totalErrors?: number; uniqueErrors?: number; topErrors?: ErrorTop[] }
type CostMetrics = { total?: number; averageCostPerNotification?: number; costPer1000?: number }
// type EngagementMetrics = { totalUnsubscribed?: number }
type ChannelAgg = { deliveryRate: number; sent: number; delivered: number; failed: number }
// type AnalyticsSafe = {
//   timeSeries?: TimeSeriesPoint[]
//   performance?: PerformanceMetrics
//   errors?: ErrorMetrics
//   costs?: CostMetrics
//   engagement?: EngagementMetrics
//   byChannel?: Record<string, ChannelAgg>
// }

interface AnalyticsFilters {
  dateRange: {
    start: Date
    end: Date
  }
  channels: NotificationChannel[]
  types: string[]
  campaigns: string[]
}

const CHART_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#06B6D4', '#84CC16', '#EC4899'
]

export function NotificationAnalytics() {
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null)
  const [filters, setFilters] = React.useState<AnalyticsFilters>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    channels: [],
    types: [],
    campaigns: []
  })
  const [loading, setLoading] = React.useState(true)
  const [prevSignatureSeries, setPrevSignatureSeries] = React.useState<Array<Record<string, unknown>>>([])
  const [activeTab, setActiveTab] = React.useState('overview')
  const [compareMode, setCompareMode] = React.useState<'none' | 'previous' | 'year-ago'>('previous')
  const [alignMode, setAlignMode] = React.useState<'index' | 'date'>('index')
  const [showPrev, setShowPrev] = React.useState<boolean>(true)
  // export options
  const [exportGrain, setExportGrain] = React.useState<'day'|'week'|'month'>('day')
  const [exportCompare, setExportCompare] = React.useState<'none'|'previous'|'year-ago'>('previous')
  const [exportAlign, setExportAlign] = React.useState<'index'|'date'>('index')
  const [exportIncludeProviders, setExportIncludeProviders] = React.useState<boolean>(true)
  const [exportStream, setExportStream] = React.useState<boolean>(false)
  const [csvIncludeDelta, setCsvIncludeDelta] = React.useState<boolean>(true)
  const [csvPrecision, setCsvPrecision] = React.useState<number>(2)
  const [csvCompress, setCsvCompress] = React.useState<'none'|'gzip'>('none')
  const [csvColumns, setCsvColumns] = React.useState({
    total: true,
    invalid: true,
    invalidRate: true,
    prevInvalidRate: true,
    deltaPp: true,
    providerInvalid: true,
    providerInvalidRate: true,
    providerPrevRate: true,
    providerDeltaPp: true,
  })
  // 設定の保存/復元（ローカル）
  React.useEffect(()=>{
    try {
      const raw = localStorage.getItem('notif_export_columns')
      if (raw) setCsvColumns(prev => ({ ...prev, ...JSON.parse(raw) }))
    } catch {}
  }, [])
  const persistColumns = React.useCallback(()=>{
    try { localStorage.setItem('notif_export_columns', JSON.stringify(csvColumns)) } catch {}
  }, [csvColumns])

  // サーバープリセットの読み込み/保存
  const loadServerPreset = React.useCallback(async () => {
    try {
      const res = await apiFetch('/api/notifications/analytics/export/presets')
      if (!res.ok) return
      const json = await res.json()
      if (json && json.preset && typeof json.preset === 'object') {
        setCsvColumns(prev => ({ ...prev, ...(json.preset.columns || {}) }))
        if (typeof json.preset.precision === 'number') setCsvPrecision(json.preset.precision)
        if (json.preset.compress === 'gzip' || json.preset.compress === 'none') setCsvCompress(json.preset.compress)
      }
    } catch {}
  }, [])
  const saveServerPreset = React.useCallback(async () => {
    try {
      await apiFetch('/api/notifications/analytics/export/presets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columns: csvColumns, precision: csvPrecision, compress: csvCompress })
      })
    } catch {}
  }, [csvColumns, csvPrecision, csvCompress])

  // Back-compat aliases for linter/tools referencing older names
  // const exportIncludeDelta = csvIncludeDelta
  // const exportPrecision = csvPrecision

  // Tick/label formatter for day/week/month
  const formatTick = React.useCallback((v: unknown): string => {
    const s = String(v ?? '')
    if (exportGrain === 'month') {
      // prefer YYYY-MM
      return s.length >= 7 ? s.substring(0, 7) : s
    }
    if (exportGrain === 'week') {
      // Convert date to ISO week label YYYY-Www when possible
      const d = new Date(s)
      if (!isNaN(d.getTime())) {
        const utc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
        const dayNum = (utc.getUTCDay() + 6) % 7
        utc.setUTCDate(utc.getUTCDate() - dayNum + 3)
        const firstThursday = new Date(Date.UTC(utc.getUTCFullYear(), 0, 4))
        const diff = (utc.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)
        const week = 1 + Math.floor(diff)
        const pad = (n: number) => (n < 10 ? `0${n}` : String(n))
        return `${utc.getUTCFullYear()}-W${pad(week)}`
      }
    }
    // day or fallback
    return s.length >= 10 ? s.substring(0, 10) : s
  }, [exportGrain])

  // Tooltip label formatter: add week range when exportGrain === 'week'
  const formatTooltipLabel = React.useCallback((label: unknown): string => {
    const key = String(label ?? '')
    if (exportGrain === 'week') {
      const m = key.match(/^(\d{4})-W(\d{2})$/)
      if (m) {
        const year = Number(m[1])
        const week = Number(m[2])
        // Compute Thursday of the ISO week
        const firstThursday = new Date(Date.UTC(year, 0, 4))
        const thursday = new Date(firstThursday)
        thursday.setUTCDate(firstThursday.getUTCDate() + (week - 1) * 7)
        // Monday is Thursday - 3 days, Sunday is Monday + 6 days
        const monday = new Date(thursday)
        monday.setUTCDate(thursday.getUTCDate() - 3)
        const sunday = new Date(monday)
        sunday.setUTCDate(monday.getUTCDate() + 6)
        const fmt = (d: Date) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`
        return `${key} (${fmt(monday)} ~ ${fmt(sunday)})`
      }
    }
    return `Date: ${formatTick(label)}`
  }, [exportGrain, formatTick])

  // 安全な参照用にナロイング
  const analyticsRec = React.useMemo(() => toRecord(analytics), [analytics])

  const byChannelSafe: Record<string, ChannelAgg> = React.useMemo(() => {
    const val = analyticsRec['byChannel']
    return typeof val === 'object' && val !== null ? (val as Record<string, ChannelAgg>) : {}
  }, [analyticsRec])

  const performanceSafe: PerformanceMetrics = React.useMemo(() => {
    const val = analyticsRec['performance']
    return typeof val === 'object' && val !== null ? (val as PerformanceMetrics) : {}
  }, [analyticsRec])

  const errorsSafe: ErrorMetrics = React.useMemo(() => {
    const val = analyticsRec['errors']
    return typeof val === 'object' && val !== null ? (val as ErrorMetrics) : {}
  }, [analyticsRec])

  const costsSafe: CostMetrics = React.useMemo(() => {
    const val = analyticsRec['costs']
    return typeof val === 'object' && val !== null ? (val as CostMetrics) : {}
  }, [analyticsRec])

  const engagementRec: Record<string, unknown> = React.useMemo(() => {
    const val = analyticsRec['engagement']
    return typeof val === 'object' && val !== null ? (val as Record<string, unknown>) : {}
  }, [analyticsRec])

  const engagementSafe = React.useMemo(() => ({
    openRate: typeof engagementRec['openRate'] === 'number' ? (engagementRec['openRate'] as number) : 0,
    clickRate: typeof engagementRec['clickRate'] === 'number' ? (engagementRec['clickRate'] as number) : 0,
    unsubscribeRate: typeof engagementRec['unsubscribeRate'] === 'number' ? (engagementRec['unsubscribeRate'] as number) : 0,
    totalOpened: typeof engagementRec['totalOpened'] === 'number' ? (engagementRec['totalOpened'] as number) : 0,
    totalClicked: typeof engagementRec['totalClicked'] === 'number' ? (engagementRec['totalClicked'] as number) : 0,
    totalUnsubscribed: typeof engagementRec['totalUnsubscribed'] === 'number' ? (engagementRec['totalUnsubscribed'] as number) : 0
  }), [engagementRec])

  // Signature metrics safe access
  const signatureRec: Record<string, unknown> = React.useMemo(() => {
    const val = analyticsRec['signature']
    return typeof val === 'object' && val !== null ? (val as Record<string, unknown>) : {}
  }, [analyticsRec])
  const signatureSourcesRec: Record<string, unknown> = React.useMemo(() => {
    const val = toRecord(signatureRec['sources'])
    return val
  }, [signatureRec])
  const signatureSafe = React.useMemo(() => ({
    total: Number(signatureRec['total'] ?? 0),
    invalidCount: Number(signatureRec['invalidCount'] ?? 0),
    invalidRate: Number(signatureRec['invalidRate'] ?? 0),
    thresholdPct: Number(signatureRec['thresholdPct'] ?? 5),
    thresholdBreached: Boolean(signatureRec['thresholdBreached'] ?? false),
    timeSeries: Array.isArray(signatureRec['timeSeries']) ? signatureRec['timeSeries'] as Array<Record<string, unknown>> : [],
    byProvider: typeof signatureRec['byProvider'] === 'object' && signatureRec['byProvider'] !== null ? signatureRec['byProvider'] as Record<string, { total: number; invalid: number; rate: number }> : {},
    providerThresholdPctByName: typeof signatureRec['providerThresholdPctByName'] === 'object' && signatureRec['providerThresholdPctByName'] !== null ? signatureRec['providerThresholdPctByName'] as Record<string, number> : {},
    providerPrevRateByName: typeof signatureRec['providerPrevRateByName'] === 'object' && signatureRec['providerPrevRateByName'] !== null ? signatureRec['providerPrevRateByName'] as Record<string, number> : {},
    providerDeltaPctByName: typeof signatureRec['providerDeltaPctByName'] === 'object' && signatureRec['providerDeltaPctByName'] !== null ? signatureRec['providerDeltaPctByName'] as Record<string, number> : {},
    providerBreaches: Array.isArray(signatureRec['providerBreaches']) ? signatureRec['providerBreaches'] as Array<Record<string, unknown>> : [],
    anomaly: Boolean(signatureRec['anomaly'] ?? false),
    sources: {
      topIp: Array.isArray(signatureSourcesRec['topIp']) ? signatureSourcesRec['topIp'] as Array<Record<string, unknown>> : [],
      topUserAgent: Array.isArray(signatureSourcesRec['topUserAgent']) ? signatureSourcesRec['topUserAgent'] as Array<Record<string, unknown>> : [],
      topAsn: Array.isArray(signatureSourcesRec['topAsn']) ? signatureSourcesRec['topAsn'] as Array<Record<string, unknown>> : []
    },
    prevInvalidRate: typeof signatureRec['prevInvalidRate'] === 'number' ? (signatureRec['prevInvalidRate'] as number) : 0,
    deltaPct: typeof signatureRec['deltaPct'] === 'number' ? (signatureRec['deltaPct'] as number) : 0
  }), [signatureRec, signatureSourcesRec])

  const signatureSeries = React.useMemo(() => {
    return signatureSafe.timeSeries.map(item => {
      const o = toRecord(item)
      return {
        key: String(o.key ?? ''),
        invalidRate: Number(o.invalidRate ?? 0)
      }
    })
  }, [signatureSafe])

  const seriesRaw = React.useMemo(() => analyticsRec['timeSeries'], [analyticsRec])
  const seriesVolume = React.useMemo(() => {
    if (!Array.isArray(seriesRaw)) return [] as Array<{ key: string; sent: number; delivered: number; failed: number }>
    return seriesRaw.map((v) => {
      const obj = toRecord(v)
      return {
        key: String(obj.key ?? ''),
        sent: typeof obj.sent === 'number' ? obj.sent : Number(obj.sent ?? 0),
        delivered: typeof obj.delivered === 'number' ? obj.delivered : Number(obj.delivered ?? 0),
        failed: typeof obj.failed === 'number' ? obj.failed : Number(obj.failed ?? 0),
      }
    })
  }, [seriesRaw])
  const seriesEngagement = React.useMemo(() => {
    if (!Array.isArray(seriesRaw)) return [] as Array<{ key: string; openRate: number; clickRate: number }>
    return seriesRaw.map((v) => {
      const obj = toRecord(v)
      return {
        key: String(obj.key ?? ''),
        openRate: typeof obj.openRate === 'number' ? obj.openRate : Number(obj.openRate ?? 0),
        clickRate: typeof obj.clickRate === 'number' ? obj.clickRate : Number(obj.clickRate ?? 0),
      }
    })
  }, [seriesRaw])

  React.useEffect(() => {
    void loadAnalytics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams({
        startDate: filters.dateRange.start.toISOString(),
        endDate: filters.dateRange.end.toISOString(),
        groupBy: exportGrain === 'week' ? 'week' : exportGrain === 'month' ? 'month' : 'day',
        ...(filters.channels.length > 0 && { channels: JSON.stringify(filters.channels) }),
        ...(filters.types.length > 0 && { types: JSON.stringify(filters.types) }),
        ...(filters.campaigns.length > 0 && { campaigns: JSON.stringify(filters.campaigns) })
      })

      const response = await fetch(`/api/notifications/analytics?${params}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
        // 比較データの取得
        try {
          if (compareMode === 'none') {
            setPrevSignatureSeries([])
          } else {
            const curStart = new Date(filters.dateRange.start)
            const curEnd = new Date(filters.dateRange.end)
            let prevStartDate: Date
            let prevEndDate: Date
            if (compareMode === 'previous') {
              const periodMs = Math.max(0, curEnd.getTime() - curStart.getTime())
              prevStartDate = new Date(curStart.getTime() - periodMs)
              prevEndDate = new Date(curStart)
            } else {
              prevStartDate = new Date(curStart)
              prevStartDate.setFullYear(prevStartDate.getFullYear() - 1)
              prevEndDate = new Date(curEnd)
              prevEndDate.setFullYear(prevEndDate.getFullYear() - 1)
            }
            const prevParams = new URLSearchParams({
              startDate: prevStartDate.toISOString(),
              endDate: prevEndDate.toISOString(),
              groupBy: exportGrain === 'week' ? 'week' : exportGrain === 'month' ? 'month' : 'day',
              ...(filters.channels.length > 0 && { channels: JSON.stringify(filters.channels) }),
              ...(filters.types.length > 0 && { types: JSON.stringify(filters.types) }),
              ...(filters.campaigns.length > 0 && { campaigns: JSON.stringify(filters.campaigns) })
            })
            const respPrev = await fetch(`/api/notifications/analytics?${prevParams}`)
            if (respPrev.ok) {
              const prevData = await respPrev.json()
              const sig = toRecord(toRecord(prevData).analytics).signature
              const prevSig = toRecord(sig)
              const ts = Array.isArray(prevSig.timeSeries) ? prevSig.timeSeries as Array<Record<string, unknown>> : []
              setPrevSignatureSeries(ts)
            } else {
              setPrevSignatureSeries([])
            }
          }
        } catch {
          setPrevSignatureSeries([])
        }
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = async () => {
    try {
      const response = await apiFetch('/api/notifications/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRange: {
            start: filters.dateRange.start.toISOString(),
            end: filters.dateRange.end.toISOString()
          },
          grain: exportGrain,
          compare: exportCompare,
          align: exportAlign,
          includeProviders: exportIncludeProviders,
          stream: exportStream,
          includeDelta: csvIncludeDelta,
          precision: csvPrecision,
          compress: csvCompress,
          columns: csvColumns,
          channels: filters.channels,
          types: filters.types,
          campaigns: filters.campaigns
        })
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `notification-analytics-${Date.now()}.csv`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to export report:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Analytics Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <label htmlFor="analytics-date-start" className="sr-only">
                開始日
              </label>
              <input
                id="analytics-date-start"
                type="date"
                value={filters.dateRange.start.toISOString().slice(0, 10)}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange,
                      start: new Date(e.target.value),
                    },
                  }))
                }
                className="border rounded px-2 py-1 text-sm"
                placeholder="開始日"
                title="開始日"
                aria-label="開始日"
              />
              <span className="text-gray-500">~</span>
              <label htmlFor="analytics-date-end" className="sr-only">
                終了日
              </label>
              <input
                id="analytics-date-end"
                type="date"
                value={filters.dateRange.end.toISOString().slice(0, 10)}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange,
                      end: new Date(e.target.value),
                    },
                  }))
                }
                className="border rounded px-2 py-1 text-sm"
                placeholder="終了日"
                title="終了日"
                aria-label="終了日"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Channels" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(NotificationChannel).map(channel => (
                  <SelectItem key={channel} value={channel}>
                    {channel.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Compare mode / Align / Toggle */}
            <div className="flex items-center gap-2">
              <label htmlFor="compare-mode" className="text-sm text-gray-600">Compare</label>
              <select
                id="compare-mode"
                className="border rounded px-2 py-1 text-sm"
                value={compareMode}
                onChange={(e)=> setCompareMode(e.target.value as 'none'|'previous'|'year-ago')}
                aria-label="比較モード"
                title="比較モード"
              >
                <option value="none">None</option>
                <option value="previous">Previous period</option>
                <option value="year-ago">Year-ago</option>
              </select>
            </div>
            {/* Group by for charts (sync with exportGrain day/week) */}
            <div className="flex items-center gap-2">
              <label htmlFor="group-by" className="text-sm text-gray-600">Group</label>
              <select
                id="group-by"
                className="border rounded px-2 py-1 text-sm"
                value={exportGrain}
                onChange={(e)=> setExportGrain(e.target.value as 'day'|'week'|'month')}
                aria-label="集計粒度"
                title="集計粒度"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="align-mode" className="text-sm text-gray-600">Align</label>
              <select
                id="align-mode"
                className="border rounded px-2 py-1 text-sm"
                value={alignMode}
                onChange={(e)=> setAlignMode(e.target.value as 'index'|'date')}
                aria-label="整列方式"
                title="整列方式"
                disabled={compareMode === 'none'}
              >
                <option value="index">Index</option>
                <option value="date">Date key</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="show-prev" className="text-sm text-gray-600">Prev</label>
              <input id="show-prev" type="checkbox" checked={showPrev} onChange={(e)=> setShowPrev(e.target.checked)} aria-label="前期間の表示切替" />
            </div>

            {/* Export options */}
            <div className="flex items-center gap-2">
              <label htmlFor="export-grain" className="text-sm text-gray-600">Grain</label>
              <select id="export-grain" className="border rounded px-2 py-1 text-sm" value={exportGrain} onChange={(e)=> setExportGrain(e.target.value as 'day'|'week'|'month')}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-compare" className="text-sm text-gray-600">Compare</label>
              <select id="export-compare" className="border rounded px-2 py-1 text-sm" value={exportCompare} onChange={(e)=> setExportCompare(e.target.value as 'none'|'previous'|'year-ago')}>
                <option value="none">None</option>
                <option value="previous">Previous</option>
                <option value="year-ago">Year-ago</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-align" className="text-sm text-gray-600">Align</label>
              <select id="export-align" className="border rounded px-2 py-1 text-sm" value={exportAlign} onChange={(e)=> setExportAlign(e.target.value as 'index'|'date')}>
                <option value="index">Index</option>
                <option value="date">Date key</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-prov" className="text-sm text-gray-600">Providers</label>
              <input id="export-prov" type="checkbox" checked={exportIncludeProviders} onChange={(e)=> setExportIncludeProviders(e.target.checked)} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-stream" className="text-sm text-gray-600">Stream</label>
              <input
                id="export-stream"
                type="checkbox"
                checked={exportStream}
                onChange={(e)=> setExportStream(e.target.checked)}
                disabled={csvCompress==='gzip'}
                title={csvCompress==='gzip' ? 'Gzip時はサーバ側で非ストリームにフォールバックします' : undefined}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-compress" className="text-sm text-gray-600">Gzip</label>
              <input id="export-compress" type="checkbox" checked={csvCompress==='gzip'} onChange={(e)=> setCsvCompress(e.target.checked ? 'gzip' : 'none')} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-delta" className="text-sm text-gray-600">Δpp</label>
              <input id="export-delta" type="checkbox" checked={csvIncludeDelta} onChange={(e)=> setCsvIncludeDelta(e.target.checked)} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="export-precision" className="text-sm text-gray-600">Precision</label>
              <input id="export-precision" type="number" min={0} max={6} value={csvPrecision} onChange={(e)=> setCsvPrecision(Math.max(0, Math.min(6, Number(e.target.value) || 0)))} className="border rounded px-2 py-1 text-sm w-16" />
              <div className="flex items-center gap-1" role="radiogroup" aria-label="Precision presets">
                {[0,1,2,3].map(p => (
                  <label key={`prec-${p}`} className="cursor-pointer">
                    <input
                      type="radio"
                      name="precision-presets"
                      value={p}
                      checked={csvPrecision===p}
                      onChange={() => setCsvPrecision(p)}
                      className="sr-only"
                    />
                    <span className={`px-2 py-1 text-xs rounded border ${csvPrecision===p ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-900'}`}>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 列選択 */}
            <div className="flex flex-wrap items-center gap-3">
              {/* クイックプリセット */}
              <div className="flex items-center gap-1" role="group" aria-label="Column presets">
                <button
                  type="button"
                  className="px-2 py-1 text-xs rounded border"
                  onClick={()=> setCsvColumns({
                    total: true,
                    invalid: true,
                    invalidRate: true,
                    prevInvalidRate: true,
                    deltaPp: true,
                    providerInvalid: true,
                    providerInvalidRate: true,
                    providerPrevRate: true,
                    providerDeltaPp: true,
                  })}
                  title="標準（すべての列）"
                >Standard</button>
                <button
                  type="button"
                  className="px-2 py-1 text-xs rounded border"
                  onClick={()=> setCsvColumns({
                    total: true,
                    invalid: true,
                    invalidRate: true,
                    prevInvalidRate: false,
                    deltaPp: false,
                    providerInvalid: false,
                    providerInvalidRate: false,
                    providerPrevRate: false,
                    providerDeltaPp: false,
                  })}
                  title="最小（全体の基本列のみ）"
                >Minimal</button>
                <button
                  type="button"
                  className="px-2 py-1 text-xs rounded border"
                  onClick={()=> setCsvColumns({
                    total: false,
                    invalid: false,
                    invalidRate: false,
                    prevInvalidRate: false,
                    deltaPp: false,
                    providerInvalid: true,
                    providerInvalidRate: true,
                    providerPrevRate: true,
                    providerDeltaPp: true,
                  })}
                  title="プロバイダ中心（プロバイダ列のみ）"
                >Providers</button>
              </div>

              {(() => {
                const items: Array<{ label: string; key: keyof typeof csvColumns; disabled?: boolean; title?: string }> = [
                  { label: 'Total', key: 'total' },
                  { label: 'Invalid', key: 'invalid' },
                  { label: 'Invalid rate', key: 'invalidRate' },
                  { label: 'Prev invalid rate', key: 'prevInvalidRate', disabled: compareMode==='none', title: compareMode==='none' ? '比較モードがNoneのため無効' : undefined },
                  { label: 'Δpp', key: 'deltaPp', disabled: compareMode==='none' || !csvIncludeDelta, title: compareMode==='none' ? '比較モードがNoneのため無効' : (!csvIncludeDelta ? 'Δpp表示がOFFのため無効' : undefined) },
                  { label: 'Prov invalid', key: 'providerInvalid', disabled: !exportIncludeProviders, title: !exportIncludeProviders ? 'Provider列が無効' : undefined },
                  { label: 'Prov rate', key: 'providerInvalidRate', disabled: !exportIncludeProviders, title: !exportIncludeProviders ? 'Provider列が無効' : undefined },
                  { label: 'Prov prev rate', key: 'providerPrevRate', disabled: compareMode==='none' || !exportIncludeProviders, title: compareMode==='none' ? '比較モードがNoneのため無効' : (!exportIncludeProviders ? 'Provider列が無効' : undefined) },
                  { label: 'Prov Δpp', key: 'providerDeltaPp', disabled: compareMode==='none' || !exportIncludeProviders || !csvIncludeDelta, title: compareMode==='none' ? '比較モードがNoneのため無効' : (!exportIncludeProviders ? 'Provider列が無効' : (!csvIncludeDelta ? 'Δpp表示がOFFのため無効' : undefined)) },
                ]
                return items.map(({ label, key, disabled, title }) => (
                  <label key={`col-${key}`} className={`inline-flex items-center gap-1 text-sm ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`} title={title}>
                    <input
                      type="checkbox"
                      checked={(csvColumns as Record<string, boolean>)[key]}
                      onChange={(e)=> setCsvColumns(s=> ({...s, [key]: e.target.checked}))}
                      disabled={disabled}
                    />
                    <span>{label}</span>
                  </label>
                ))
              })()}
              <button type="button" onClick={persistColumns} className="px-2 py-1 text-xs rounded border">保存</button>
              <button type="button" onClick={()=>{
                try { const raw = localStorage.getItem('notif_export_columns'); if (raw) setCsvColumns(prev => ({...prev, ...JSON.parse(raw)})) } catch {}
              }} className="px-2 py-1 text-xs rounded border">復元</button>
              <button type="button" onClick={saveServerPreset} className="px-2 py-1 text-xs rounded border">サーバ保存</button>
              <button type="button" onClick={loadServerPreset} className="px-2 py-1 text-xs rounded border">サーバ読込</button>
            </div>
            <Button variant="outline" onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Sent"
          value={analytics.overall.totalSent.toLocaleString()}
          change={12.5}
          icon={Activity}
          color="text-blue-600"
        />
        <MetricCard
          title="Delivery Rate"
          value={`${(analytics.overall.deliveryRate * 100).toFixed(1)}%`}
          change={-2.1}
          icon={CheckCircle}
          color="text-green-600"
        />
        <MetricCard
          title="Open Rate"
            value={`${(engagementSafe.openRate * 100).toFixed(1)}%`}
          change={5.3}
          icon={Eye}
          color="text-purple-600"
        />
        <MetricCard
          title="Click Rate"
            value={`${(engagementSafe.clickRate * 100).toFixed(1)}%`}
          change={8.7}
          icon={MousePointer}
          color="text-orange-600"
        />
        <MetricCard
          title="Invalid Signature Rate"
          value={`${(signatureSafe.invalidRate * 100).toFixed(1)}%`}
          change={Number(signatureSafe.deltaPct.toFixed(1))}
          icon={AlertCircle}
          color="text-red-600"
        />
        {signatureSafe.thresholdBreached && (
          <MetricCard
            title={`Signature Alert (>${signatureSafe.thresholdPct}%)`}
            value={`${(signatureSafe.invalidRate * 100).toFixed(1)}%`}
            change={0}
            icon={AlertCircle}
            color="text-red-700"
          />
        )}
        {signatureSafe.anomaly && (
          <MetricCard
            title="Anomaly Detected"
            value="Today"
            change={0}
            icon={AlertCircle}
            color="text-red-700"
          />
        )}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Webhook Signature Failure Rate (Daily)</CardTitle>
          <CardDescription>プロバイダを跨いだ日次の無効署名率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={signatureSeries} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" tickFormatter={formatTick} />
                <YAxis tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} domain={[0, 1]} />
                <Tooltip
                  labelFormatter={formatTooltipLabel}
                  formatter={(v: number) => `${(v * 100).toFixed(1)}%`}
                />
                <Legend />
                <Line type="monotone" dataKey="invalidRate" name="Invalid Signature Rate" stroke="#EF4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Thresholds & Breaches */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Provider Thresholds</CardTitle>
          <CardDescription>現在のプロバイダ別しきい値と超過状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(signatureSafe.providerThresholdPctByName).length === 0 && (
              <p className="text-sm text-gray-500">No provider-specific thresholds configured.</p>
            )}
            {Object.entries(signatureSafe.providerThresholdPctByName).map(([prov, thr]) => {
              const breach = signatureSafe.providerBreaches.find(b => String((b as Record<string, unknown>).provider) === prov)
              const rate = breach ? Number((breach as Record<string, unknown>).ratePct ?? 0) : null
              const breached = Boolean(breach)
              return (
                <div key={prov} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{prov.toUpperCase()}</span>
                  <span>
                    Threshold: {thr}%
                    {breached ? ` | Current: ${rate?.toFixed(2)}%` : ''}
                    {csvIncludeDelta && typeof signatureSafe.providerDeltaPctByName[prov] === 'number' && (
                      <> | Δ {(signatureSafe.providerDeltaPctByName[prov]).toFixed(1)} pp</>
                    )}
                  </span>
                  <span className={breached ? 'text-red-600 font-semibold' : 'text-green-600'}>
                    {breached ? 'BREACHED' : 'OK'}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Invalid Signature Sources */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top Invalid Signature Sources</CardTitle>
          <CardDescription>IP / User-Agent / ASN の上位発生元</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium mb-2">Top IP</p>
              <ul className="space-y-1">
                {signatureSafe.sources.topIp.slice(0, 5).map((r, i) => {
                  const o = toRecord(r)
                  return (
                    <li key={`ip-${i}`} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-[220px]" title={String(o.key ?? '')}>{String(o.key ?? '')}</span>
                      <span className="text-gray-600">{Number(o.count ?? 0)}</span>
                    </li>
                  )
                })}
                {signatureSafe.sources.topIp.length === 0 && (
                  <li className="text-sm text-gray-500">No data</li>
                )}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Top User-Agent</p>
              <ul className="space-y-1">
                {signatureSafe.sources.topUserAgent.slice(0, 5).map((r, i) => {
                  const o = toRecord(r)
                  return (
                    <li key={`ua-${i}`} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-[220px]" title={String(o.key ?? '')}>{String(o.key ?? '')}</span>
                      <span className="text-gray-600">{Number(o.count ?? 0)}</span>
                    </li>
                  )
                })}
                {signatureSafe.sources.topUserAgent.length === 0 && (
                  <li className="text-sm text-gray-500">No data</li>
                )}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Top ASN</p>
              <ul className="space-y-1">
                {signatureSafe.sources.topAsn.slice(0, 5).map((r, i) => {
                  const o = toRecord(r)
                  return (
                    <li key={`asn-${i}`} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-[220px]" title={String(o.key ?? '')}>{String(o.key ?? '')}</span>
                      <span className="text-gray-600">{Number(o.count ?? 0)}</span>
                    </li>
                  )
                })}
                {signatureSafe.sources.topAsn.length === 0 && (
                  <li className="text-sm text-gray-500">No data</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stacked by provider (daily) */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Invalid Signatures by Provider (Daily)</CardTitle>
          <CardDescription>プロバイダ別の無効署名件数（スタック）</CardDescription>
        </CardHeader>
        <CardContent>
          {(() => {
            const providerSet = new Set<string>()
            const curSeries = signatureSafe.timeSeries
            const prevSeries = prevSignatureSeries
            curSeries.forEach(item => {
              const pmap = toRecord((item as Record<string, unknown>).byProvider)
              Object.keys(pmap).forEach(p => providerSet.add(p))
            })
            prevSeries.forEach(item => {
              const pmap = toRecord((item as Record<string, unknown>).byProvider)
              Object.keys(pmap).forEach(p => providerSet.add(p))
            })
            const providers = Array.from(providerSet)
            // 整列方式に応じて前期間を整列
            const prevMapByDate: Record<string, Record<string, number>> = {}
            if (alignMode === 'date') {
              prevSeries.forEach((item) => {
                const o = toRecord(item)
                const key = String(o.key ?? '')
                const byProv = toRecord(o.byProvider)
                const m: Record<string, number> = {}
                providers.forEach(p => {
                  const pv = toRecord(byProv[p])
                  m[p] = Number(pv.invalid ?? 0)
                })
                prevMapByDate[key] = m
              })
            }
            // 現在期間のインデックス検索用マップ
            const curIndexByDate = new Map<string, number>(
              curSeries.map((item, idx) => [String(toRecord(item).key ?? ''), idx])
            )
            const data = curSeries.map((item, idx) => {
              const o = toRecord(item)
              const byProv = toRecord(o.byProvider)
              const key = String(o.key ?? '')
              const row: Record<string, unknown> = { key }
              providers.forEach(p => {
                const pv = toRecord(byProv[p])
                row[p] = Number(pv.invalid ?? 0)
                let prevVal = 0
                if (alignMode === 'index') {
                  const prevItem = prevSeries[idx]
                  if (prevItem) {
                    const prevByProv = toRecord(toRecord(prevItem).byProvider)
                    const ppv = toRecord(prevByProv[p])
                    prevVal = Number(ppv.invalid ?? 0)
                  }
                } else {
                  const m = prevMapByDate[key]
                  if (m && typeof m[p] === 'number') prevVal = Number(m[p])
                }
                row[`${p}_prev`] = prevVal
              })
              return row
            })

            // カスタムツールチップ（Δppオフ時は簡略表示）
            // recharts Tooltip content props: we only rely on 'active' and 'label'
            const renderTooltip = (props: { active?: boolean; label?: string | number }) => {
              const { active, label } = props
              if (!active) return null
              const dateKey = String(label ?? '')
              const idx = curIndexByDate.get(dateKey) ?? -1
              const curItem = idx >= 0 ? toRecord(curSeries[idx]) : {}
              const curByProv = toRecord(curItem.byProvider)
              const prevItem = alignMode === 'index' ? (idx >= 0 ? toRecord(prevSeries[idx]) : {}) : {}
              const prevByProvIndex = toRecord(toRecord(prevItem).byProvider)
              const prevByProvDate = prevMapByDate[dateKey] || {}
              return (
                <div className="rounded border bg-white p-2 text-xs shadow-sm dark:bg-gray-900 dark:border-gray-700">
                  <div className="font-medium mb-1">{dateKey}</div>
                  <div className="space-y-1">
                    {providers.map((p) => {
                      const curStats = toRecord(curByProv[p])
                      const curInvalid = Number(curStats.invalid ?? 0)
                      const curTotal = Number(curStats.total ?? 0)
                      const curRate = curTotal > 0 ? (curInvalid / curTotal) : 0
                      let prevInvalid = 0
                      let prevTotal = 0
                      if (alignMode === 'index') {
                        const prevStats = toRecord(prevByProvIndex[p])
                        prevInvalid = Number(prevStats.invalid ?? 0)
                        prevTotal = Number(prevStats.total ?? 0)
                      } else {
                        const prevInvalidNum = (prevByProvDate as Record<string, number>)[p]
                        prevInvalid = Number(prevInvalidNum ?? 0)
                        // 前期間のtotalは把握困難のため rateΔppはinvalidのみからは算出不可。prevのrateは不明時0とする
                        prevTotal = 0
                      }
                      const prevRate = prevTotal > 0 ? (prevInvalid / prevTotal) : 0
                      const deltaPp = (curRate - prevRate) * 100
                      return (
                        <div key={`tt-${p}`} className="flex items-center justify-between gap-2">
                          <span className="font-semibold">{p.toUpperCase()}</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            cur: {curInvalid} ({(curRate * 100).toFixed(2)}%)
                            { showPrev && (
                              csvIncludeDelta
                                ? (<>
                                    {` | prev: ${prevInvalid}`}
                                    {prevTotal>0 ? ` (${(prevRate*100).toFixed(2)}%)` : ''}
                                    {` | Δ ${(deltaPp).toFixed(2)} pp`}
                                  </>)
                                : (<>
                                    {` | prev: ${prevInvalid}`}
                                  </>)
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
            return (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="key" tickFormatter={formatTick} />
                    <YAxis />
                    <Tooltip content={renderTooltip} labelFormatter={formatTooltipLabel} />
                    <Legend />
                    {providers.map((p, idx) => (
                      <Bar
                        key={`cur-${p}`}
                        dataKey={p}
                        stackId="a"
                        fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        name={csvIncludeDelta ? `${p.toUpperCase()} (cur)` : `${p.toUpperCase()}`}
                      />
                    ))}
                    {showPrev && providers.map((p, idx) => (
                      <Bar key={`prev-${p}`} dataKey={`${p}_prev`} stackId="b" fill={CHART_COLORS[idx % CHART_COLORS.length]} fillOpacity={0.35} name={`${p.toUpperCase()} (prev)`} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )
          })()}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Time Series Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Volume Over Time</CardTitle>
              <CardDescription>
                Daily notification sending and delivery trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={seriesVolume}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" tickFormatter={formatTick} />
                  <YAxis />
                  <Tooltip labelFormatter={formatTooltipLabel} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="sent" 
                    stackId="1" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                    name="Sent"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="delivered" 
                    stackId="2" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                    name="Delivered"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="failed" 
                    stackId="3" 
                    stroke="#EF4444" 
                    fill="#EF4444" 
                    fillOpacity={0.6}
                    name="Failed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Signature Failures Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Signature Failures Over Time</CardTitle>
              <CardDescription>
                Invalid signature counts and total webhook events per day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signatureSafe.timeSeries.map((v) => { const o = toRecord(v); return { key: String(o.key ?? ''), invalid: Number(o.invalid ?? 0), total: Number(o.total ?? 0) } })}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" tickFormatter={formatTick} />
                  <YAxis />
                  <Tooltip labelFormatter={formatTooltipLabel} />
                  <Legend />
                  <Line type="monotone" dataKey="invalid" stroke="#EF4444" name="Invalid" />
                  <Line type="monotone" dataKey="total" stroke="#3B82F6" name="Total" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Channel Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>
                Notification volume by delivery channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={Object.entries(byChannelSafe).map(([channel, data], index) => ({
                        name: channel,
                        value: data.sent,
                        color: CHART_COLORS[index % CHART_COLORS.length]
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {Object.entries(byChannelSafe).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip labelFormatter={(label)=> String(label ?? '')} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {Object.entries(analytics.byChannel).map(([channel, data], index) => (
                    <ChannelSummary
                      key={channel}
                      channel={channel}
                      data={data}
                      color={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          {/* Channel Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Comparison</CardTitle>
              <CardDescription>
                Delivery rates and performance metrics by channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={Object.entries(byChannelSafe).map(([channel, data]: [string, { deliveryRate: number; sent: number; delivered: number; failed: number }]) => ({
                  channel,
                  deliveryRate: (data.deliveryRate * 100).toFixed(1),
                  sent: data.sent,
                  delivered: data.delivered,
                  failed: data.failed
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip labelFormatter={formatTooltipLabel} />
                  <Legend />
                  <Bar dataKey="sent" fill="#3B82F6" name="Sent" />
                  <Bar dataKey="delivered" fill="#10B981" name="Delivered" />
                  <Bar dataKey="failed" fill="#EF4444" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Channel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(byChannelSafe).map(([channel, data]) => (
              <ChannelDetailCard key={channel} channel={channel} data={data} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Funnel</CardTitle>
              <CardDescription>
                User engagement journey from delivery to action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FunnelStep label="Delivered" percentage={100} />
                <FunnelStep label="Opened" percentage={(engagementSafe.openRate * 100)} />
                <FunnelStep label="Clicked" percentage={(engagementSafe.clickRate * 100)} />
                <FunnelStep label="Unsubscribed" percentage={(engagementSafe.unsubscribeRate * 100)} />
              </div>
            </CardContent>
          </Card>

          {/* Engagement Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>
                Open and click rates over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={seriesEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" tickFormatter={formatTick} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="openRate" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Open Rate (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clickRate" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    name="Click Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Delivery Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Average</span>
                    <span className="font-semibold">
                       {(((performanceSafe.averageDeliveryTime ?? 0) / 1000).toFixed(1))}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Median</span>
                    <span className="font-semibold">
                       {(((performanceSafe.medianDeliveryTime ?? 0) / 1000).toFixed(1))}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">95th Percentile</span>
                    <span className="font-semibold">
                       {(((performanceSafe.p95DeliveryTime ?? 0) / 1000).toFixed(1))}s
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Errors</span>
                    <span className="font-semibold text-red-600">
                       {(errorsSafe.totalErrors ?? ((errorsSafe.topErrors || []).reduce((sum: number, e: ErrorTop) => sum + (e.count ?? 0), 0)))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Unique Errors</span>
                    <span className="font-semibold">
                       {(errorsSafe.uniqueErrors ?? ((errorsSafe.topErrors || []).length))}
                    </span>
                  </div>
                </div>
                {((errorsSafe.topErrors || []).slice(0, 3)).map((error: ErrorTop, index: number) => (
                  <div key={index} className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <p className="text-xs font-medium text-red-800 dark:text-red-200">
                      {error.error}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {error.count} occurrences ({error.percentage.toFixed(1)}%)
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="font-semibold">
                       ${(((costsSafe.total ?? 0) / 100).toFixed(2))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Per Notification</span>
                    <span className="font-semibold">
                       ${(((costsSafe.averageCostPerNotification ?? 0) / 100).toFixed(4))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Per 1,000</span>
                    <span className="font-semibold">
                       ${(((costsSafe.costPer1000 ?? 0) / 100).toFixed(2))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper Components

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  const isPositive = change > 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}% vs last period
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChannelSummary({ channel, data, color }: { channel: string; data: ChannelAgg; color: string }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill={color} />
          </svg>
        </div>
        <div>
          <p className="font-medium capitalize">{channel}</p>
          <p className="text-sm text-gray-500">
            {(data.deliveryRate * 100).toFixed(1)}% delivery rate
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{data.sent.toLocaleString()}</p>
        <p className="text-sm text-gray-500">sent</p>
      </div>
    </div>
  )
}

function ChannelDetailCard({ channel, data }: { channel: string; data: ChannelAgg & { averageDeliveryTime?: number } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize flex items-center gap-2">
          {getChannelIcon(channel as NotificationChannel)}
          {channel}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Sent</p>
            <p className="text-xl font-bold">{data.sent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-xl font-bold text-green-600">{data.delivered.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Rate</p>
            <p className="text-xl font-bold">{((data.deliveryRate) * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Time</p>
            <p className="text-xl font-bold">{(((data.averageDeliveryTime ?? 0) / 1000).toFixed(1))}s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FunnelStep({ label, percentage }: {
  label: string
  percentage: number
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-right">
        <p className="font-semibold">{label}</p>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <progress
              value={Math.max(percentage, 5)}
              max={100}
              aria-label={`${label} progress`}
              className={`w-full h-2 rounded overflow-hidden [appearance:none] [&::-webkit-progress-bar]:bg-gray-200 dark:[&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500 ${
                percentage >= 50 ? '[&::-webkit-progress-value]:bg-green-500' : percentage >= 20 ? '[&::-webkit-progress-value]:bg-yellow-500' : '[&::-webkit-progress-value]:bg-red-500'
              }`}
            />
            <div className="sr-only" aria-live="polite">{percentage.toFixed(1)}%</div>
          </div>
          <div className="w-16 text-right">
            <span className="text-sm font-medium">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getChannelIcon(channel: NotificationChannel) {
  switch (channel) {
    case NotificationChannel.EMAIL:
      return <Mail className="h-5 w-5" />
    case NotificationChannel.PUSH:
      return <Smartphone className="h-5 w-5" />
    case NotificationChannel.SMS:
      return <MessageSquare className="h-5 w-5" />
    case NotificationChannel.WEBHOOK:
      return <Webhook className="h-5 w-5" />
    default:
      return <Activity className="h-5 w-5" />
  }
}
