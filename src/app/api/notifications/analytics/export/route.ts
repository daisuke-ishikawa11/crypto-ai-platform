import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'
import { incCounter, startTimer, isMetricsEnabled, registerHistogram } from '@/lib/monitoring/metrics'

const exportSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional()
  }).optional(),
  grain: z.enum(['day', 'week', 'month']).optional().default('day'),
  compare: z.enum(['none', 'previous', 'year-ago']).optional().default('none'),
  align: z.enum(['index', 'date']).optional().default('index'),
  includeProviders: z.boolean().optional().default(true),
  stream: z.boolean().optional().default(false),
  includeDelta: z.boolean().optional().default(true),
  precision: z.number().min(0).max(6).optional().default(2),
  compress: z.enum(['none','gzip']).optional().default('none'),
  columns: z.object({
    total: z.boolean().optional(),
    invalid: z.boolean().optional(),
    invalidRate: z.boolean().optional(),
    prevInvalidRate: z.boolean().optional(),
    deltaPp: z.boolean().optional(),
    providerInvalid: z.boolean().optional(),
    providerInvalidRate: z.boolean().optional(),
    providerPrevRate: z.boolean().optional(),
    providerDeltaPp: z.boolean().optional(),
  }).optional(),
  // Reserved for future filters
  channels: z.array(z.string()).optional(),
  types: z.array(z.string()).optional(),
  campaigns: z.array(z.string()).optional()
})

export async function POST(request: NextRequest) {
  try {
    if (isMetricsEnabled()) registerHistogram('export_request_duration_seconds', [0.1, 0.3, 1, 3, 10])
    const stop = startTimer('export_request_duration_seconds', { route: 'notifications_export' })
    incCounter('export_requests_total', { route: 'notifications_export' }, 1)
    const supabase = await createClient()

    // AuthN/AuthZ
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes((profile.role ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      body = {}
    }
    const parsed = exportSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.issues }, { status: 400 })
    }

    const start = parsed.data.dateRange?.start || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const end = parsed.data.dateRange?.end || new Date().toISOString()
    const grain = parsed.data.grain || 'day'
    const compare = parsed.data.compare || 'none'
    const align = parsed.data.align || 'index'
    const includeProviders = parsed.data.includeProviders !== false
    let stream = parsed.data.stream === true
    const includeDelta = parsed.data.includeDelta !== false
    const precision = Number(parsed.data.precision ?? 2)
    const compress = parsed.data.compress || 'none'
    const channels = parsed.data.channels || []
    const types = parsed.data.types || []
    const campaigns = parsed.data.campaigns || []
    const columns = parsed.data.columns || {}

    // Fetch webhook events in range
    const { data: webhookEvents, error } = await safeAwait<Array<{ type?: string; provider?: string; timestamp?: string }> | null>(
      supabase
        .from('notification_webhook_events')
        .select('type, provider, timestamp')
        .gte('timestamp', start)
        .lte('timestamp', end)
    )
    if (error) {
      logger.error('Export analytics: failed to fetch webhook events', { error: error.message })
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    const events = webhookEvents || []

    // helpers
    const pad = (n: number) => (n < 10 ? `0${n}` : String(n))
    const getWeekKey = (iso: string) => {
      const d = new Date(iso)
      const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
      // ISO week: Thursday-based
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
      if (grain === 'day') return s.substring(0, 10)
      if (grain === 'week') return getWeekKey(s)
      return getMonthKey(s)
    }

    type SeriesBucket = { total: number; invalid: number; providers: Record<string, { total: number; invalid: number }> }
    const buildSeries = (rows: Array<{ type?: string; provider?: string; timestamp?: string }>) => {
      const buckets: Record<string, SeriesBucket> = {}
      const providersSet = new Set<string>()
      for (const e of rows) {
        const key = getKey(e.timestamp)
        if (!buckets[key]) buckets[key] = { total: 0, invalid: 0, providers: {} }
        buckets[key].total++
        const prov = (e.provider || 'unknown').toLowerCase()
        if (!buckets[key].providers[prov]) buckets[key].providers[prov] = { total: 0, invalid: 0 }
        buckets[key].providers[prov].total++
        providersSet.add(prov)
        if ((e.type || '') === 'invalid_signature') {
          buckets[key].invalid++
          buckets[key].providers[prov].invalid++
        }
      }
      const keysSorted = Object.keys(buckets).sort((a,b)=> a.localeCompare(b))
      return { buckets, keysSorted, providers: Array.from(providersSet).sort() }
    }

    const cur = buildSeries(events)

    // previous period/year-ago
    let prev: { buckets: Record<string, SeriesBucket>; keysSorted: string[]; providers: string[] } | null = null
    if (compare !== 'none') {
      let prevStartIso = ''
      let prevEndIso = ''
      const curStart = new Date(start)
      const curEnd = new Date(end)
      if (compare === 'previous') {
        const periodMs = Math.max(0, curEnd.getTime() - curStart.getTime())
        prevStartIso = new Date(curStart.getTime() - periodMs).toISOString()
        prevEndIso = curStart.toISOString()
      } else {
        const s = new Date(curStart)
        s.setUTCFullYear(s.getUTCFullYear() - 1)
        const e = new Date(curEnd)
        e.setUTCFullYear(e.getUTCFullYear() - 1)
        prevStartIso = s.toISOString()
        prevEndIso = e.toISOString()
      }
      const { data: prevEvents, error: prevErr } = await safeAwait<Array<{ type?: string; provider?: string; timestamp?: string }> | null>(
        supabase
          .from('notification_webhook_events')
          .select('type, provider, timestamp')
          .gte('timestamp', prevStartIso)
          .lte('timestamp', prevEndIso)
      )
      if (!prevErr) {
        prev = buildSeries(prevEvents || [])
      }
    }

    // Prepare CSV meta + header
    const metaLines: string[] = []
    metaLines.push(`# start=${start}`)
    metaLines.push(`# end=${end}`)
    metaLines.push(`# grain=${grain}`)
    metaLines.push(`# compare=${compare}`)
    metaLines.push(`# align=${align}`)
    metaLines.push(`# includeProviders=${includeProviders}`)
    metaLines.push(`# includeDelta=${includeDelta}`)
    metaLines.push(`# precision=${precision}`)
    metaLines.push(`# compress=${compress}`)
    if (channels.length) metaLines.push(`# channels=${channels.join('|')}`)
    if (types.length) metaLines.push(`# types=${types.join('|')}`)
    if (campaigns.length) metaLines.push(`# campaigns=${campaigns.join('|')}`)

    // Column include flags
    const incTotal = columns.total ?? true
    const incInvalid = columns.invalid ?? true
    const incInvalidRate = columns.invalidRate ?? true
    const incPrevInvalidRate = compare !== 'none' ? (columns.prevInvalidRate ?? true) : false
    const incDeltaPp = includeDelta && (columns.deltaPp ?? true)
    const incProvInvalid = includeProviders ? (columns.providerInvalid ?? true) : false
    const incProvInvalidRate = includeProviders ? (columns.providerInvalidRate ?? true) : false
    const incProvPrevRate = includeProviders && compare !== 'none' ? (columns.providerPrevRate ?? true) : false
    const incProvDeltaPp = includeProviders && compare !== 'none' && includeDelta ? (columns.providerDeltaPp ?? true) : false

    const headers: string[] = ['date']
    if (incTotal) headers.push('total')
    if (incInvalid) headers.push('invalid')
    if (incInvalidRate) headers.push('invalid_rate')
    const providerList = includeProviders ? cur.providers : []
    for (const p of providerList) {
      if (incProvInvalid) headers.push(`provider_${p}_invalid`)
      if (incProvInvalidRate) headers.push(`provider_${p}_invalid_rate`)
    }
    if (compare !== 'none') {
      if (incPrevInvalidRate) headers.push('prev_invalid_rate')
      if (incDeltaPp) headers.push('delta_pp')
      for (const p of providerList) {
        if (incProvPrevRate) headers.push(`provider_${p}_prev_rate`)
        if (incProvDeltaPp) headers.push(`provider_${p}_delta_pp`)
      }
    }
    const lines: string[] = [...metaLines, headers.join(',')]

    // Rows aligned by index or date over sorted keys
    const maxRows = cur.keysSorted.length
    const prevKeys = prev?.keysSorted || []
    const prevBucketByKey = prev ? prev.buckets : {}
    const pct = (v: number) => `${(v * 100).toFixed(precision)}%`
    const pp = (v: number) => `${v.toFixed(precision)} pp`
    const buildRow = (idx: number): string => {
      const key = cur.keysSorted[idx]
      const b = cur.buckets[key]
      const total = b?.total || 0
      const invalid = b?.invalid || 0
      const rate = total > 0 ? invalid / total : 0
      const row: (string|number)[] = [key]
      if (incTotal) row.push(String(total))
      if (incInvalid) row.push(String(invalid))
      if (incInvalidRate) row.push(pct(rate))
      for (const p of providerList) {
        const pb = b?.providers[p]
        const pinvalid = pb ? pb.invalid : 0
        const ptotal = pb ? pb.total : 0
        const prate = ptotal > 0 ? pinvalid / ptotal : 0
        if (incProvInvalid) row.push(String(pinvalid))
        if (incProvInvalidRate) row.push(pct(prate))
      }
      if (compare !== 'none') {
        const pKey = align === 'date' ? key : prevKeys[idx]
        const pbuck = pKey ? (prevBucketByKey as Record<string, SeriesBucket | undefined>)[pKey] : undefined
        const pTotal = pbuck?.total || 0
        const pInvalid = pbuck?.invalid || 0
        const pRate = pTotal > 0 ? pInvalid / pTotal : 0
        const deltaPp = (rate - pRate) * 100
        if (incPrevInvalidRate) row.push(pct(pRate))
        if (incDeltaPp) row.push(pp(deltaPp))
        for (const p of providerList) {
          const ppb = pbuck?.providers[p]
          const pptotal = ppb?.total || 0
          const ppinvalid = ppb?.invalid || 0
          const pprate = pptotal > 0 ? ppinvalid / pptotal : 0
          const pDeltaPp = ((b?.providers[p]?.total || 0) > 0
            ? ((b?.providers[p]?.invalid || 0) / (b?.providers[p]?.total || 1))
            : 0) - pprate
          if (incProvPrevRate) row.push(pct(pprate))
          if (incProvDeltaPp) row.push(pp(pDeltaPp * 100))
        }
      }
      return row.join(',')
    }

    // If gzip requested, disable streaming for simplicity
    if (compress === 'gzip') stream = false
    if (stream) {
      const encoder = new TextEncoder()
      const readable = new ReadableStream<Uint8Array>({
        start(controller) {
          for (const m of metaLines) controller.enqueue(encoder.encode(m + '\n'))
          controller.enqueue(encoder.encode(headers.join(',') + '\n'))
          for (let idx = 0; idx < maxRows; idx++) {
            controller.enqueue(encoder.encode(buildRow(idx) + '\n'))
          }
          controller.close()
        }
      })
      const fname = `notifications-analytics_${start.substring(0,10)}_to_${end.substring(0,10)}_${grain}_${compare}_${align}.csv`
      const resp = new NextResponse(readable, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${fname}"`
        }
      })
      stop()
      return resp
    }

    for (let idx = 0; idx < maxRows; idx++) {
      lines.push(buildRow(idx))
    }

    const csv = lines.join('\n')
    const safe = (s: string) => s.replace(/[^a-zA-Z0-9_\-]/g, '_')
    const base = `notifications-analytics_${safe(start.substring(0,10))}_to_${safe(end.substring(0,10))}_${grain}_${compare}_${align}`
    if (compress === 'gzip') {
      const hasCompression = typeof (globalThis as { CompressionStream?: unknown }).CompressionStream === 'function'
      if (hasCompression) {
        const encoder = new TextEncoder()
        const source = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode(csv))
            controller.close()
          }
        })
        // @ts-expect-error: CompressionStream is available in runtime
        const compressed = source.pipeThrough(new CompressionStream('gzip'))
        const resp = new NextResponse(compressed, {
          status: 200,
          headers: {
            'Content-Type': 'application/gzip',
            'Content-Encoding': 'gzip',
            'Content-Disposition': `attachment; filename="${base}.csv.gz"`
          }
        })
        try {
          if (isMetricsEnabled()) {
            incCounter('export_csv_raw_bytes_total', { compress: 'gzip' }, 0) // size unknown in stream
          }
        } catch {}
        stop()
        return resp
      } else {
        // Fallback: no compression available at runtime
        const fname = `${base}.csv`
        const resp = new NextResponse(csv, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${fname}"`
          }
        })
        try {
          if (isMetricsEnabled()) {
            const bytes = new TextEncoder().encode(csv).length
            incCounter('export_csv_raw_bytes_total', { compress: 'none' }, bytes)
          }
        } catch {}
        stop()
        return resp
      }
    }
    const fname = `${base}.csv`
    const res = new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fname}"`
      }
    })
    try {
      if (isMetricsEnabled()) {
        const bytes = new TextEncoder().encode(csv).length
        incCounter('export_csv_raw_bytes_total', { compress: 'none' }, bytes)
      }
    } catch {}
    stop()
    return res
  } catch (error) {
    logger.error('POST /api/notifications/analytics/export failed', { error: error instanceof Error ? error.message : String(error) })
    incCounter('export_requests_errors_total', { route: 'notifications_export' }, 1)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
