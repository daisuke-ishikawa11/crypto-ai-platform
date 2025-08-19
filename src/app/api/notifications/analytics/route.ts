/**
 * 📊 Notification Analytics API
 * Comprehensive analytics and reporting for notification system
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getSupaQuery } from '@/lib/supabase/helpers'
import { safeAwait } from '@/lib/supabase/helpers'
import { NotificationChannel, NotificationPriority, NotificationType } from '@/lib/notifications/types'
import { logger } from '@/lib/monitoring/logger'
import { incCounter, startTimer, isMetricsEnabled, registerHistogram, observeHistogram } from '@/lib/monitoring/metrics'
import { sendSlackWebhook, sendDiscordWebhook } from '@/lib/monitoring/alerting'
// Simple in-process cooldown for Slack alerts to avoid spamming
let lastInvalidSigSlackAlertAt = 0

import { getEnvInt } from '@/lib/config/env'

// Type definitions for analytics data
interface DeliveryLog {
  id: string
  created_at: string
  status: 'pending' | 'delivered' | 'failed'
  channel: string
  delivery_time?: number
  cost_cents?: number
  opened_at?: string
  clicked_at?: string
  unsubscribed_at?: string
  error?: string
  notification?: {
    type: string
    channel: string
    priority: string
    recipient_id: string
    data: Record<string, unknown>
    metadata: Record<string, unknown>
  }
}

interface GroupedMetrics {
  key: string
  sent: number
  delivered: number
  failed: number
  opened: number
  clicked: number
  totalDeliveryTime: number
  deliveryCount: number
  deliveryRate: number
  openRate: number
  clickRate: number
  averageDeliveryTime: number
}

interface ChannelMetrics {
  sent: number
  delivered: number
  failed: number
  opened: number
  clicked: number
  totalDeliveryTime: number
  deliveryCount: number
  totalCost: number
  deliveryRate: number
  openRate: number
  clickRate: number
  averageDeliveryTime: number
  costPer1000: number
}

const analyticsQuerySchema = z.object({
  timeRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }),
  filters: z.object({
    channels: z.array(z.nativeEnum(NotificationChannel)).optional(),
    types: z.array(z.nativeEnum(NotificationType)).optional(),
    priorities: z.array(z.nativeEnum(NotificationPriority)).optional(),
    userIds: z.array(z.string().uuid()).optional(),
    campaigns: z.array(z.string()).optional()
  }).optional(),
  groupBy: z.enum(['channel', 'type', 'priority', 'hour', 'day', 'week', 'month']).optional().default('day'),
  metrics: z.array(z.enum([
    'sent', 'delivered', 'failed', 'opened', 'clicked', 'unsubscribed',
    'deliveryTime', 'cost', 'engagement'
  ])).optional().default(['sent', 'delivered', 'failed'])
})

// GET - Retrieve notification analytics
export async function GET(request: NextRequest) {
  try {
    if (isMetricsEnabled()) registerHistogram('analytics_request_duration_seconds', [0.1, 0.3, 1, 3, 10])
    const stop = startTimer('analytics_request_duration_seconds', { route: 'analytics_GET' })
    incCounter('analytics_requests_total', { route: 'analytics_GET' }, 1)
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has analytics access
    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    )

    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json(
        { error: 'Insufficient permissions for analytics access' },
        { status: 403 }
      )
    }

    // Parse query parameters
    const url = new URL(request.url)
    const queryParams = Object.fromEntries(url.searchParams)
    
    // Set default time range if not provided (last 7 days)
    const defaultStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const defaultEnd = new Date().toISOString()
    
    const query = {
      timeRange: {
        start: queryParams.startDate || defaultStart,
        end: queryParams.endDate || defaultEnd
      },
      filters: {
        channels: queryParams.channels ? JSON.parse(queryParams.channels) : undefined,
        types: queryParams.types ? JSON.parse(queryParams.types) : undefined,
        priorities: queryParams.priorities ? JSON.parse(queryParams.priorities) : undefined,
        userIds: queryParams.userIds ? JSON.parse(queryParams.userIds) : undefined,
        campaigns: queryParams.campaigns ? JSON.parse(queryParams.campaigns) : undefined
      },
      groupBy: queryParams.groupBy || 'day',
      metrics: queryParams.metrics ? JSON.parse(queryParams.metrics) : ['sent', 'delivered', 'failed']
    }

    const validatedQuery = analyticsQuerySchema.parse(query)

    // Build analytics data
  const analytics = await buildAnalytics(validatedQuery)

    const resOk = NextResponse.json({
      success: true,
      analytics,
      query: validatedQuery,
      generatedAt: new Date()
    })
    stop()
    return resOk

  } catch (error) {
    logger.error('Error in GET /api/notifications/analytics', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: (error as z.ZodError).issues },
        { status: 400 }
      )
    }

    incCounter('analytics_requests_errors_total', { route: 'analytics_GET' }, 1)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Generate custom analytics report
export async function POST(request: NextRequest) {
  try {
    if (isMetricsEnabled()) registerHistogram('analytics_request_duration_seconds', [0.1, 0.3, 1, 3, 10])
    const stop = startTimer('analytics_request_duration_seconds', { route: 'analytics_POST' })
    incCounter('analytics_requests_total', { route: 'analytics_POST' }, 1)
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'analyst', 'system'].includes(profile.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions for custom analytics' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedQuery = analyticsQuerySchema.parse(body)

    // Generate comprehensive analytics report
  const report = await generateAnalyticsReport(validatedQuery)

    // Store report for future reference
    const reportId = crypto.randomUUID()
    await supabase.from('analytics_reports').insert({
      id: reportId,
      type: 'notifications',
      query: validatedQuery,
      report,
      generated_by: user.id,
      created_at: new Date()
    })

    logger.info('Custom analytics report generated', {
      reportId,
      userId: user.id,
      timeRange: validatedQuery.timeRange,
      metrics: validatedQuery.metrics
    })

    const resOk2 = NextResponse.json({
      success: true,
      reportId,
      report,
      generatedAt: new Date()
    })
    stop()
    return resOk2

  } catch (error) {
    logger.error('Error in POST /api/notifications/analytics', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as z.ZodError).issues },
        { status: 400 }
      )
    }

    incCounter('analytics_requests_errors_total', { route: 'analytics_POST' }, 1)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to build analytics data
type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>
async function buildAnalytics(query: AnalyticsQuery) {
  const supabase = await createClient()

  // Build base query
  let baseQuery = supabase
    .from('notification_delivery_logs')
    .select(`
      *,
      notification:notifications(
        type,
        channel,
        priority,
        recipient_id,
        data,
        metadata
      )
    `)
    .gte('created_at', query.timeRange.start)
    .lte('created_at', query.timeRange.end)

  // Guard: ensure query builder has required methods in this environment
  const q0 = getSupaQuery(baseQuery, { required: ['gte','lte','in'] })
  if (!q0) {
    const typedLogs: DeliveryLog[] = []
    const groupedData = groupAnalyticsData(typedLogs, query.groupBy)
    const analytics = {
      timeRange: query.timeRange,
      overall: calculateOverallMetrics(typedLogs),
      byChannel: calculateChannelMetrics(typedLogs),
      byType: calculateTypeMetrics(typedLogs),
      byPriority: calculatePriorityMetrics(typedLogs),
      timeSeries: groupedData,
      engagement: calculateEngagementMetrics(typedLogs),
      performance: calculatePerformanceMetrics(typedLogs),
      costs: calculateCostMetrics(typedLogs),
      errors: calculateErrorMetrics(typedLogs)
    }
    return analytics
  }

  // Apply filters
  if (query.filters?.channels) {
    baseQuery = baseQuery.in('channel', query.filters.channels)
  }
  
  if (query.filters?.userIds) {
    baseQuery = baseQuery.in('notification.recipient_id', query.filters.userIds)
  }

  const { data: deliveryLogs, error } = await safeAwait<unknown[]>(baseQuery)

  if (error) {
    throw new Error(`Failed to fetch analytics data: ${error.message}`)
  }

  // Process data based on groupBy
  const typedLogs = (deliveryLogs || []) as DeliveryLog[]
  const groupedData = groupAnalyticsData(typedLogs, query.groupBy)

  // Calculate metrics
  const analytics = {
    timeRange: query.timeRange,
    overall: calculateOverallMetrics(typedLogs),
    byChannel: calculateChannelMetrics(typedLogs),
    byType: calculateTypeMetrics(typedLogs),
    byPriority: calculatePriorityMetrics(typedLogs),
    timeSeries: groupedData,
    engagement: calculateEngagementMetrics(typedLogs),
    performance: calculatePerformanceMetrics(typedLogs),
    costs: calculateCostMetrics(typedLogs),
    errors: calculateErrorMetrics(typedLogs)
  }

  // Enrich with webhook signature metrics
  try {
    const { data: webhookEvents } = await safeAwait<Array<{ type?: string; provider?: string; timestamp?: string; data?: Record<string, unknown> }> | null>(
      supabase
        .from('notification_webhook_events')
        .select('type, provider, timestamp, data')
        .gte('timestamp', query.timeRange.start)
        .lte('timestamp', query.timeRange.end)
    )
    const events = webhookEvents || []
    const total = events.length
    const invalidCount = events.filter(e => (e.type || '') === 'invalid_signature').length
    const byProvider: Record<string, { total: number; invalid: number; rate: number }> = {}
    const bySource: { ip: Record<string, number>; ua: Record<string, number>; asn: Record<string, number> } = { ip: {}, ua: {}, asn: {} }
    for (const e of events) {
      const p = (e.provider || 'unknown') as string
      if (!byProvider[p]) byProvider[p] = { total: 0, invalid: 0, rate: 0 }
      byProvider[p].total++
      if ((e.type || '') === 'invalid_signature') byProvider[p].invalid++

      // aggregate sources
      const d = (e as { data?: Record<string, unknown> }).data || {}
      const ip = typeof d.ip === 'string' ? d.ip : undefined
      const ua = typeof d.ua === 'string' ? d.ua : undefined
      const asn = typeof ((d.ipInfo as Record<string, unknown> | undefined)?.asn) === 'string' ? String((d.ipInfo as Record<string, unknown>).asn) : undefined
      if (ip) bySource.ip[ip] = (bySource.ip[ip] || 0) + 1
      if (ua) bySource.ua[ua] = (bySource.ua[ua] || 0) + 1
      if (asn) bySource.asn[asn] = (bySource.asn[asn] || 0) + 1
    }
    Object.values(byProvider).forEach(v => { v.rate = v.total > 0 ? v.invalid / v.total : 0 })
    // Metrics: record overall and per-provider invalid rate (percentage points)
    try {
      if (isMetricsEnabled()) {
        registerHistogram('analytics_invalid_signature_rate_pp', [0, 1, 2, 5, 10, 20, 50, 100])
        const overallPct = total > 0 ? (invalidCount / total) * 100 : 0
        observeHistogram('analytics_invalid_signature_rate_pp', overallPct, { scope: 'overall' })
        for (const [prov, stats] of Object.entries(byProvider)) {
          observeHistogram('analytics_invalid_signature_rate_pp', (stats.rate || 0) * 100, { scope: 'provider', provider: prov })
        }
      }
    } catch {}
    // Time series by selected grain (day/week/month)
    const pad = (n: number) => (n < 10 ? `0${n}` : String(n))
    const getWeekKey = (iso: string) => {
      const d = new Date(iso)
      const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
      const dayNum = (date.getUTCDay() + 6) % 7
      date.setUTCDate(date.getUTCDate() - dayNum + 3)
      const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
      const diff = (date.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)
      const week = 1 + Math.floor(diff)
      return `${date.getUTCFullYear()}-W${pad(week)}`
    }
    const getMonthKey = (iso: string) => {
      const d = new Date(iso)
      return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`
    }
    const getKey = (iso?: string) => {
      const s = (iso || '').toString()
      if (!s) return new Date().toISOString().substring(0, 10)
      if (query.groupBy === 'week') return getWeekKey(s)
      if (query.groupBy === 'month') return getMonthKey(s)
      return s.substring(0, 10)
    }
    const seriesGrouped: Record<string, { total: number; invalid: number; byProvider: Record<string, { total: number; invalid: number }> }> = {}
    for (const e of events) {
      const key = getKey(e.timestamp)
      if (!seriesGrouped[key]) seriesGrouped[key] = { total: 0, invalid: 0, byProvider: {} }
      seriesGrouped[key].total++
      const provider = (e.provider || 'unknown') as string
      if (!seriesGrouped[key].byProvider[provider]) seriesGrouped[key].byProvider[provider] = { total: 0, invalid: 0 }
      seriesGrouped[key].byProvider[provider].total++
      if ((e.type || '') === 'invalid_signature') {
        seriesGrouped[key].invalid++
        seriesGrouped[key].byProvider[provider].invalid++
      }
    }
    const timeSeries = Object.entries(seriesGrouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        key,
        total: val.total,
        invalid: val.invalid,
        invalidRate: val.total > 0 ? val.invalid / val.total : 0,
        byProvider: Object.fromEntries(
          Object.entries(val.byProvider).map(([prov, v]) => [prov, {
            total: v.total,
            invalid: v.invalid,
            rate: v.total > 0 ? v.invalid / v.total : 0
          }])
        )
      }))

    const thresholdPct = getEnvInt('WEBHOOK_INVALID_SIG_ALERT_PCT', 5)
    const thresholdBreached = (total > 0 ? (invalidCount / total) * 100 : 0) >= thresholdPct

    // Provider-specific thresholds (e.g., WEBHOOK_INVALID_SIG_ALERT_PCT_SENDGRID=3)
    const providerThresholdPctByName: Record<string, number> = {}

    // Optional DB overrides: notification_settings(key='webhook_invalid_sig_thresholds') with JSON
    try {
      const { data: settingsRow } = await safeAwait<{ value?: unknown } | null>(
        supabase
          .from('notification_settings')
          .select('value')
          .eq('key', 'webhook_invalid_sig_thresholds')
          .single()
      )
      if (settingsRow && settingsRow.value && typeof settingsRow.value === 'object') {
        const map = settingsRow.value as Record<string, unknown>
        for (const [k, v] of Object.entries(map)) {
          const num = Number(v)
          if (Number.isFinite(num) && num >= 0) {
            providerThresholdPctByName[k.toLowerCase()] = num
          }
        }
      }
    } catch {
      // Ignore optional DB override errors
    }
    for (const providerName of Object.keys(byProvider)) {
      const envKey = `WEBHOOK_INVALID_SIG_ALERT_PCT_${providerName.toUpperCase()}`
      const val = Number(process.env[envKey] ?? '')
      if (Number.isFinite(val) && val >= 0) {
        providerThresholdPctByName[providerName] = val
      }
      if (!(providerThresholdPctByName[providerName] >= 0)) {
        providerThresholdPctByName[providerName] = thresholdPct
      }
    }

    const providerBreaches: Array<{ provider: string; ratePct: number; thresholdPct: number }> = []
    for (const [providerName, stats] of Object.entries(byProvider)) {
      const ratePct = (stats.rate || 0) * 100
      const pThresh = providerThresholdPctByName[providerName] ?? thresholdPct
      if (ratePct >= pThresh) {
        providerBreaches.push({ provider: providerName, ratePct, thresholdPct: pThresh })
      }
    }
    // Metrics: count threshold breaches
    try {
      if (isMetricsEnabled()) {
        if ((total > 0 ? (invalidCount / total) * 100 : 0) >= thresholdPct) {
          incCounter('analytics_invalid_signature_threshold_breaches_total', { scope: 'overall' }, 1)
        }
        for (const b of providerBreaches) {
          incCounter('analytics_invalid_signature_threshold_breaches_total', { scope: 'provider', provider: b.provider }, 1)
        }
      }
    } catch {}

    // Simple anomaly detection: spike if today invalid > mean + sigma*std over series
    const sigma = getEnvInt('WEBHOOK_INVALID_SIG_ANOMALY_SIGMA', 3)
    const minSamples = getEnvInt('WEBHOOK_INVALID_SIG_ANOMALY_MIN_SAMPLES', 5)
    const invalidSeries = timeSeries.map(s => s.invalid)
    const mean = invalidSeries.length ? invalidSeries.reduce((a,b)=>a+b,0) / invalidSeries.length : 0
    const variance = invalidSeries.length ? invalidSeries.reduce((a,b)=>a + Math.pow(b-mean,2),0) / invalidSeries.length : 0
    const stddev = Math.sqrt(variance)
    const todayKey = getKey(new Date().toISOString())
    const today = timeSeries.find(s => s.key === todayKey)
    const anomaly = invalidSeries.length >= minSamples && today ? today.invalid > (mean + sigma * stddev) : false

    const topN = (rec: Record<string, number>, n = 5) => Object.entries(rec).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([k,v])=>({ key:k, count:v }))

    // Previous period comparison for signature invalid rate
    const curInvalidRate = total > 0 ? invalidCount / total : 0
    let prevInvalidRate = 0
    let deltaPct = 0
    const providerPrevRate: Record<string, number> = {}
    const providerDeltaPct: Record<string, number> = {}
    try {
      const curStartMs = new Date(query.timeRange.start).getTime()
      const curEndMs = new Date(query.timeRange.end).getTime()
      const periodMs = Math.max(0, curEndMs - curStartMs)
      const prevStart = new Date(curStartMs - periodMs).toISOString()
      const prevEnd = new Date(curStartMs).toISOString()
      const { data: prevEvents } = await safeAwait<Array<{ type?: string; provider?: string }>|null>(
        supabase
          .from('notification_webhook_events')
          .select('type,provider')
          .gte('timestamp', prevStart)
          .lte('timestamp', prevEnd)
      )
      const prev = prevEvents || []
      const prevTotal = prev.length
      const prevInvalid = prev.filter(e => (e.type || '') === 'invalid_signature').length
      prevInvalidRate = prevTotal > 0 ? prevInvalid / prevTotal : 0
      deltaPct = (curInvalidRate - prevInvalidRate) * 100

      // Provider-level previous period rates
      const prevProvAgg: Record<string, { total: number; invalid: number }> = {}
      for (const e of prev) {
        const p = (e.provider || 'unknown') as string
        if (!prevProvAgg[p]) prevProvAgg[p] = { total: 0, invalid: 0 }
        prevProvAgg[p].total++
        if ((e.type || '') === 'invalid_signature') prevProvAgg[p].invalid++
      }
      Object.keys(byProvider).forEach((p) => {
        const prevStats = prevProvAgg[p]
        const prevRate = prevStats ? (prevStats.total > 0 ? prevStats.invalid / prevStats.total : 0) : 0
        providerPrevRate[p] = prevRate
        providerDeltaPct[p] = ((byProvider[p].rate || 0) - prevRate) * 100
      })
    } catch {}

    const signature = {
      total,
      invalidCount,
      invalidRate: curInvalidRate,
      byProvider,
      timeSeries,
      thresholdPct,
      thresholdBreached,
      providerThresholdPctByName,
      providerBreaches,
      sources: {
        topIp: topN(bySource.ip),
        topUserAgent: topN(bySource.ua),
        topAsn: topN(bySource.asn)
      },
      anomaly,
      prevInvalidRate,
      deltaPct,
      providerPrevRateByName: providerPrevRate,
      providerDeltaPctByName: providerDeltaPct
    }
    ;(analytics as Record<string, unknown>).signature = signature

    // Optional Slack alert when threshold breached
    try {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL || ''
      const alertsEnabled = (process.env.WEBHOOK_INVALID_SIG_SLACK_ALERT || 'false').toLowerCase() === 'true'
      const target = (process.env.ALERTS_WEBHOOK_TARGET || 'slack').toLowerCase() as 'slack'|'discord'|'both'
      const discordUrl = process.env.DISCORD_WEBHOOK_URL || ''
      const slackEnabled = (target === 'slack' || target === 'both') && !!webhookUrl
      const discordEnabled = (target === 'discord' || target === 'both') && !!discordUrl
      if (alertsEnabled && (slackEnabled || discordEnabled)) {
        const globalPct = (signature.invalidRate * 100)
        const hasProviderBreaches = signature.providerBreaches.length > 0
        // Compute previous period (same duration immediately before current range)
        const curStartMs = new Date(query.timeRange.start).getTime()
        const curEndMs = new Date(query.timeRange.end).getTime()
        const periodMs = Math.max(0, curEndMs - curStartMs)
        const prevStart = new Date(curStartMs - periodMs).toISOString()
        const prevEnd = new Date(curStartMs).toISOString()
        let prevTotal = 0
        let prevInvalid = 0
        try {
          const { data: prevEvents } = await safeAwait<Array<{ type?: string }>|null>(
            supabase
              .from('notification_webhook_events')
              .select('type')
              .gte('timestamp', prevStart)
              .lte('timestamp', prevEnd)
          )
          const prev = prevEvents || []
          prevTotal = prev.length
          prevInvalid = prev.filter(e => (e.type || '') === 'invalid_signature').length
        } catch {}
        const prevPct = prevTotal > 0 ? (prevInvalid / prevTotal) * 100 : 0
        const deltaPct = globalPct - prevPct
        const periodLabel = `${String(query.timeRange.start).substring(0,10)}→${String(query.timeRange.end).substring(0,10)}`
        if (signature.thresholdBreached || hasProviderBreaches) {
          const parts = [
            `Invalid signature rate alert`,
            `Period ${periodLabel}`,
            `Global: ${globalPct.toFixed(2)}% (threshold ${signature.thresholdPct}%)`,
            `Prev: ${prevPct.toFixed(2)}% (Δ ${deltaPct.toFixed(2)} pp)` ,
            signature.anomaly ? `Anomaly: spike detected today` : undefined,
            signature.sources?.topAsn?.length ? `Top ASN: ${signature.sources.topAsn.slice(0,3).map((r: { key: string; count: number })=>`${String(r.key)}(${Number(r.count)})`).join(', ')}` : undefined,
            signature.sources?.topIp?.length ? `Top IP: ${signature.sources.topIp.slice(0,3).map((r: { key: string; count: number })=>`${String(r.key)}(${Number(r.count)})`).join(', ')}` : undefined
          ].filter(Boolean) as string[]
          if (hasProviderBreaches) {
            const detail = signature.providerBreaches
              .map(b => {
                const prevFrac = (signature.providerPrevRateByName as Record<string, number> | undefined)?.[b.provider] ?? 0
                const prevPct = prevFrac * 100
                const deltaPP = (signature.providerDeltaPctByName as Record<string, number> | undefined)?.[b.provider] ?? (b.ratePct - prevPct)
                return `${b.provider}: ${b.ratePct.toFixed(2)}% (>= ${b.thresholdPct}%) prev ${prevPct.toFixed(2)}% Δ ${deltaPP.toFixed(2)} pp`
              })
              .join(', ')
            parts.push(`Providers: ${detail}`)
          }
          const cooldownSec = Number(process.env.WEBHOOK_INVALID_SIG_ALERT_COOLDOWN_SEC || '300')
          // Set severity and DND bypass policy
          const severity: 'critical'|'high'|'normal' = signature.anomaly ? 'critical' : ((signature.thresholdBreached || hasProviderBreaches) ? 'high' : 'normal')
          const bypassDnd = severity === 'critical'
          const now = Date.now()
          if (Number.isFinite(cooldownSec) && cooldownSec > 0) {
            if (now - lastInvalidSigSlackAlertAt >= cooldownSec * 1000) {
              const msg = parts.join(' | ')
              if (target === 'slack' || target === 'both') {
                await sendSlackWebhook(webhookUrl, msg, { alert: 'invalid_signature', scope: 'cooldown' }, { severity, bypassDnd })
              }
              if (target === 'discord' || target === 'both') {
                await sendDiscordWebhook(discordUrl, msg, { alert: 'invalid_signature', scope: 'cooldown' }, { severity, bypassDnd })
              }
              try { if (isMetricsEnabled()) incCounter('alerts_invalid_signature_sent_total', { scope: 'cooldown' }, 1) } catch {}
              lastInvalidSigSlackAlertAt = now
            }
          } else {
            const msg = parts.join(' | ')
            if (target === 'slack' || target === 'both') {
              await sendSlackWebhook(webhookUrl, msg, { alert: 'invalid_signature', scope: 'immediate' }, { severity, bypassDnd })
            }
            if (target === 'discord' || target === 'both') {
              await sendDiscordWebhook(discordUrl, msg, { alert: 'invalid_signature', scope: 'immediate' }, { severity, bypassDnd })
            }
            try { if (isMetricsEnabled()) incCounter('alerts_invalid_signature_sent_total', { scope: 'immediate' }, 1) } catch {}
          }
        }
      }
    } catch {}
  } catch {
    // noop: signature metrics optional
  }

  return analytics
}

// Helper function to generate comprehensive report
async function generateAnalyticsReport(query: AnalyticsQuery) {
  const analytics = await buildAnalytics(query)

  // Generate insights and recommendations
  const insights = generateInsights(analytics)
  const recommendations = generateRecommendations(analytics)

  return {
    analytics,
    insights,
    recommendations,
    summary: {
      totalNotifications: analytics.overall.totalSent,
      deliveryRate: analytics.overall.deliveryRate,
      averageDeliveryTime: analytics.overall.averageDeliveryTime,
      totalCost: analytics.costs.total,
      topPerformingChannel: analytics.byChannel ? 
        Object.entries(analytics.byChannel)
          .sort(([,a], [,b]) => b.deliveryRate - a.deliveryRate)[0]?.[0] : null
    }
  }
}

// Data processing helper functions
function groupAnalyticsData(logs: DeliveryLog[], groupBy: string): GroupedMetrics[] {
  const grouped: Record<string, GroupedMetrics> = {}

  logs.forEach((log: DeliveryLog) => {
    let key: string
    const date = new Date(log.created_at)

    switch (groupBy) {
      case 'hour':
        key = date.toISOString().substring(0, 13) + ':00:00.000Z'
        break
      case 'day':
        key = date.toISOString().substring(0, 10)
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        key = weekStart.toISOString().substring(0, 10)
        break
      case 'month':
        const monthStart = new Date(date)
        monthStart.setHours(0, 0, 0, 0)
        monthStart.setDate(1)
        key = monthStart.toISOString().substring(0, 7)
        break
      case 'channel':
        key = log.channel
        break
      case 'type':
        key = log.notification?.type || 'unknown'
        break
      case 'priority':
        key = log.notification?.priority || 'normal'
        break
      default:
        key = date.toISOString().substring(0, 10)
    }

    if (!grouped[key]) {
      grouped[key] = {
        key,
        sent: 0,
        delivered: 0,
        failed: 0,
        opened: 0,
        clicked: 0,
        totalDeliveryTime: 0,
        deliveryCount: 0,
        deliveryRate: 0,
        openRate: 0,
        clickRate: 0,
        averageDeliveryTime: 0
      }
    }

    grouped[key].sent++
    if (log.status === 'delivered') {
      grouped[key].delivered++
      if (log.delivery_time) {
        grouped[key].totalDeliveryTime += log.delivery_time
        grouped[key].deliveryCount++
      }
    } else if (log.status === 'failed') {
      grouped[key].failed++
    }
    
    if (log.opened_at) grouped[key].opened++
    if (log.clicked_at) grouped[key].clicked++
  })

  // Calculate derived metrics
  Object.values(grouped).forEach((group: GroupedMetrics) => {
    group.deliveryRate = group.sent > 0 ? group.delivered / group.sent : 0
    group.openRate = group.delivered > 0 ? group.opened / group.delivered : 0
    group.clickRate = group.opened > 0 ? group.clicked / group.opened : 0
    group.averageDeliveryTime = group.deliveryCount > 0 ? 
      group.totalDeliveryTime / group.deliveryCount : 0
  })

  return Object.values(grouped).sort((a: GroupedMetrics, b: GroupedMetrics) => a.key.localeCompare(b.key))
}

function calculateOverallMetrics(logs: DeliveryLog[]) {
  const delivered = logs.filter(log => log.status === 'delivered')
  const failed = logs.filter(log => log.status === 'failed')
  const opened = logs.filter(log => log.opened_at)
  const clicked = logs.filter(log => log.clicked_at)
  
  const totalDeliveryTime = delivered
    .filter(log => typeof log.delivery_time === 'number')
    .reduce((sum, log) => sum + (log.delivery_time as number), 0)

  return {
    totalSent: logs.length,
    totalDelivered: delivered.length,
    totalFailed: failed.length,
    totalOpened: opened.length,
    totalClicked: clicked.length,
    deliveryRate: logs.length > 0 ? delivered.length / logs.length : 0,
    openRate: delivered.length > 0 ? opened.length / delivered.length : 0,
    clickRate: opened.length > 0 ? clicked.length / opened.length : 0,
    averageDeliveryTime: delivered.length > 0 ? totalDeliveryTime / delivered.length : 0
  }
}

function calculateChannelMetrics(logs: DeliveryLog[]) {
  const byChannel: Record<string, ChannelMetrics> = {}

  logs.forEach(log => {
    const channel = log.channel
    if (!byChannel[channel]) {
      byChannel[channel] = {
        sent: 0,
        delivered: 0,
        failed: 0,
        opened: 0,
        clicked: 0,
        totalDeliveryTime: 0,
        deliveryCount: 0,
        totalCost: 0,
        deliveryRate: 0,
        openRate: 0,
        clickRate: 0,
        averageDeliveryTime: 0,
        costPer1000: 0
      }
    }

    byChannel[channel].sent++
    if (log.status === 'delivered') {
      byChannel[channel].delivered++
      if (log.delivery_time) {
        byChannel[channel].totalDeliveryTime += log.delivery_time
        byChannel[channel].deliveryCount++
      }
    } else if (log.status === 'failed') {
      byChannel[channel].failed++
    }

    if (log.opened_at) byChannel[channel].opened++
    if (log.clicked_at) byChannel[channel].clicked++
    if (log.cost_cents) byChannel[channel].totalCost += log.cost_cents
  })

  // Calculate derived metrics
  Object.values(byChannel).forEach((channel: ChannelMetrics) => {
    channel.deliveryRate = channel.sent > 0 ? channel.delivered / channel.sent : 0
    channel.openRate = channel.delivered > 0 ? channel.opened / channel.delivered : 0
    channel.clickRate = channel.opened > 0 ? channel.clicked / channel.opened : 0
    channel.averageDeliveryTime = channel.deliveryCount > 0 ? 
      channel.totalDeliveryTime / channel.deliveryCount : 0
    channel.costPer1000 = channel.sent > 0 ? 
      (channel.totalCost / channel.sent) * 1000 : 0
  })

  return byChannel
}

function calculateTypeMetrics(logs: DeliveryLog[]) {
  const byType: Record<string, { sent: number; delivered: number; opened: number; clicked: number; deliveryRate: number; openRate: number; clickRate: number }> = {}

  logs.forEach(log => {
    const type = log.notification?.type || 'unknown'
    if (!byType[type]) {
      byType[type] = { sent: 0, delivered: 0, opened: 0, clicked: 0, deliveryRate: 0, openRate: 0, clickRate: 0 }
    }

    byType[type].sent++
    if (log.status === 'delivered') byType[type].delivered++
    if (log.opened_at) byType[type].opened++
    if (log.clicked_at) byType[type].clicked++
  })

  // Calculate rates
  Object.values(byType).forEach((t) => {
    t.deliveryRate = t.sent > 0 ? t.delivered / t.sent : 0
    t.openRate = t.delivered > 0 ? t.opened / t.delivered : 0
    t.clickRate = t.opened > 0 ? t.clicked / t.opened : 0
  })

  return byType
}

function calculatePriorityMetrics(logs: DeliveryLog[]) {
  const byPriority: Record<string, { sent: number; delivered: number; failed: number; totalDeliveryTime: number; deliveryCount: number; deliveryRate: number; averageDeliveryTime: number }> = {}

  logs.forEach(log => {
    const priority = log.notification?.priority || 'normal'
    if (!byPriority[priority]) {
      byPriority[priority] = {
        sent: 0,
        delivered: 0,
        failed: 0,
        totalDeliveryTime: 0,
        deliveryCount: 0,
        deliveryRate: 0,
        averageDeliveryTime: 0
      }
    }

    byPriority[priority].sent++
    if (log.status === 'delivered') {
      byPriority[priority].delivered++
      if (log.delivery_time) {
        byPriority[priority].totalDeliveryTime += log.delivery_time
        byPriority[priority].deliveryCount++
      }
    } else if (log.status === 'failed') {
      byPriority[priority].failed++
    }
  })

  // Calculate derived metrics
  Object.values(byPriority).forEach((p) => {
    p.deliveryRate = p.sent > 0 ? p.delivered / p.sent : 0
    p.averageDeliveryTime = p.deliveryCount > 0 ? 
      p.totalDeliveryTime / p.deliveryCount : 0
  })

  return byPriority
}

function calculateEngagementMetrics(logs: DeliveryLog[]) {
  const totalDelivered = logs.filter(log => log.status === 'delivered').length
  const totalOpened = logs.filter(log => log.opened_at).length
  const totalClicked = logs.filter(log => log.clicked_at).length
  const totalUnsubscribed = logs.filter(log => log.unsubscribed_at).length

  return {
    totalOpened,
    totalClicked,
    totalUnsubscribed,
    openRate: totalDelivered > 0 ? totalOpened / totalDelivered : 0,
    clickRate: totalOpened > 0 ? totalClicked / totalOpened : 0,
    unsubscribeRate: totalDelivered > 0 ? totalUnsubscribed / totalDelivered : 0,
    engagementScore: totalDelivered > 0 ? 
      (totalOpened * 1 + totalClicked * 2 - totalUnsubscribed * 3) / totalDelivered : 0
  }
}

function calculatePerformanceMetrics(logs: DeliveryLog[]) {
  const deliveredLogs = logs.filter(log => log.status === 'delivered' && log.delivery_time)
  
  if (deliveredLogs.length === 0) {
    return { averageDeliveryTime: 0, medianDeliveryTime: 0, p95DeliveryTime: 0 }
  }

  const deliveryTimes = deliveredLogs.map((log: DeliveryLog) => Number(log.delivery_time)).sort((a: number, b: number) => a - b)
  const average = deliveryTimes.reduce((sum, time) => sum + time, 0) / deliveryTimes.length
  const median = deliveryTimes[Math.floor(deliveryTimes.length / 2)]
  const p95 = deliveryTimes[Math.floor(deliveryTimes.length * 0.95)]

  return {
    averageDeliveryTime: average,
    medianDeliveryTime: median,
    p95DeliveryTime: p95,
    samples: deliveryTimes.length
  }
}

function calculateCostMetrics(logs: DeliveryLog[]) {
  const totalCost = logs
    .filter(log => log.cost_cents)
    .reduce((sum: number, log: DeliveryLog) => sum + Number(log.cost_cents), 0)

  const byCurrency = { cents: totalCost }
  
  return {
    total: totalCost,
    byCurrency,
    averageCostPerNotification: logs.length > 0 ? totalCost / logs.length : 0,
    costPer1000: logs.length > 0 ? (totalCost / logs.length) * 1000 : 0
  }
}

function calculateErrorMetrics(logs: DeliveryLog[]) {
  const failedLogs = logs.filter(log => log.status === 'failed' && log.error)
  const errorCounts: Record<string, number> = {}

  failedLogs.forEach(log => {
    const error = log.error || 'Unknown error'
    errorCounts[error] = (errorCounts[error] || 0) + 1
  })

  const topErrors = Object.entries(errorCounts)
    .map(([error, count]) => ({
      error,
      count,
      percentage: failedLogs.length > 0 ? (count / failedLogs.length) * 100 : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return {
    totalErrors: failedLogs.length,
    uniqueErrors: Object.keys(errorCounts).length,
    topErrors
  }
}

// Insight generation functions
type AnalyticsForInsights = { overall: { deliveryRate: number }; costs: { costPer1000: number; total: number }; engagement: { openRate: number }; byChannel?: Record<string, ChannelMetrics> }
function generateInsights(analytics: AnalyticsForInsights) {
  const insights = []

  // Delivery rate insights
  if (analytics.overall.deliveryRate < 0.95) {
    insights.push({
      type: 'warning',
      title: 'Low Delivery Rate',
      description: `Overall delivery rate of ${(analytics.overall.deliveryRate * 100).toFixed(1)}% is below recommended 95%`,
      impact: 'high'
    })
  }

  // Channel performance insights
  const channels = Object.entries(analytics.byChannel || {}) as Array<[string, ChannelMetrics]>
  const bestChannel = channels.sort(([,a], [,b]) => b.deliveryRate - a.deliveryRate)[0]
  const worstChannel = channels.sort(([,a], [,b]) => a.deliveryRate - b.deliveryRate)[0]

  if (bestChannel && worstChannel && bestChannel[1].deliveryRate - worstChannel[1].deliveryRate > 0.1) {
    insights.push({
      type: 'info',
      title: 'Channel Performance Variance',
      description: `${bestChannel[0]} performs ${(((bestChannel[1].deliveryRate - worstChannel[1].deliveryRate) * 100)).toFixed(1)}% better than ${worstChannel[0]}`,
      impact: 'medium'
    })
  }

  // Cost efficiency insights
  if (analytics.costs.costPer1000 > 50) { // More than 50 cents per 1000 notifications
    insights.push({
      type: 'warning',
      title: 'High Cost Per Notification',
      description: `Average cost of $${(analytics.costs.costPer1000 / 100).toFixed(2)} per 1000 notifications is above recommended threshold`,
      impact: 'medium'
    })
  }

  return insights
}

function generateRecommendations(analytics: Record<string, unknown>) {
  const recommendations = []

  // Channel optimization recommendations
  const channels = Object.entries((analytics as Record<string, unknown>).byChannel || {}) as Array<[string, ChannelMetrics]>
  const lowPerformingChannels = channels.filter(([, metrics]) => metrics.deliveryRate < 0.9)

  lowPerformingChannels.forEach(([channel]) => {
    recommendations.push({
      category: 'optimization',
      title: `Optimize ${channel} Channel`,
      description: `Review provider configuration and consider switching to backup provider`,
      priority: 'high',
      estimatedImpact: 'Potential 5-10% improvement in delivery rate'
    })
  })

  // Engagement recommendations
  const engagementOpenRate = (analytics as { engagement?: { openRate?: unknown } }).engagement?.openRate;
  if (typeof engagementOpenRate === 'number' && engagementOpenRate < 0.2) {
    recommendations.push({
      category: 'engagement',
      title: 'Improve Subject Lines and Content',
      description: 'Low open rate suggests content optimization needed',
      priority: 'medium',
      estimatedImpact: 'Could improve engagement by 15-25%'
    })
  }

  // Cost optimization recommendations
  const totalCost = (analytics as { costs?: { total?: unknown } }).costs?.total;
  if (typeof totalCost === 'number' && totalCost > 1000) { // More than $10 total cost
    recommendations.push({
      category: 'cost',
      title: 'Review Notification Frequency',
      description: 'Consider implementing digest notifications to reduce costs',
      priority: 'low',
      estimatedImpact: 'Potential 20-30% cost reduction'
    })
  }

  return recommendations
}
