import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

function toCsvRow(values: (string | number | boolean | null | undefined)[]): string {
  return values.map((v) => {
    if (v === null || v === undefined) return ''
    const s = String(v)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"'
    }
    return s
  }).join(',')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(500, Math.max(1, Number(searchParams.get('limit') || '50')))
  const offset = Math.max(0, Number(searchParams.get('offset') || '0'))
  const severity = searchParams.get('severity') || undefined
  const type = searchParams.get('type') || undefined
  const symbol = searchParams.get('symbol') || undefined
  const from = searchParams.get('from') || undefined
  const to = searchParams.get('to') || undefined
  const acknowledged = searchParams.get('acknowledged') || undefined
  const format = (searchParams.get('format') || 'json').toLowerCase()

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    let q = supabase.from('alert_history')
      .select(`
        id,
        alert_type as type,
        coin_symbol as symbol,
        title,
        message,
        priority as severity,
        sent_at as createdAt,
        acknowledged
      `, { count: 'exact', head: false })
      .eq('user_id', user.id)
      .order('sent_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (severity) q = q.eq('priority', severity)
    if (type) q = q.eq('alert_type', type)
    if (symbol) q = q.eq('coin_symbol', symbol)
    if (from) q = q.gte('sent_at', new Date(from).toISOString())
    if (to) q = q.lte('sent_at', new Date(to).toISOString())
    if (acknowledged === 'true') q = q.eq('acknowledged', true)
    if (acknowledged === 'false') q = q.eq('acknowledged', false)

    const resp = await q
    if (resp.error) {
      return NextResponse.json({ success: false, error: resp.error.message }, { status: 500 })
    }
    const RowSchema = z.object({
      id: z.string(),
      type: z.string(),
      symbol: z.string().optional().default(''),
      title: z.string().optional().nullable(),
      message: z.string().optional().nullable(),
      severity: z.string().optional().nullable(),
      createdAt: z.string().optional().nullable(),
      acknowledged: z.boolean().optional().nullable()
    })
    type Row = z.infer<typeof RowSchema>
    const parsedRows: Row[] = Array.isArray(resp.data)
      ? resp.data.map((r) => {
          const v = RowSchema.safeParse(r)
          if (v.success) return v.data
          const o = r as unknown as Record<string, unknown>
          return {
            id: String(o.id ?? ''),
            type: String(o.type ?? ''),
            symbol: typeof o.symbol === 'string' ? o.symbol : '',
            title: typeof o.title === 'string' ? o.title : null,
            message: typeof o.message === 'string' ? o.message : null,
            severity: typeof o.severity === 'string' ? o.severity : null,
            createdAt: typeof o.createdAt === 'string' ? o.createdAt : null,
            acknowledged: typeof o.acknowledged === 'boolean' ? o.acknowledged : null
          }
        })
      : []
    const count = (resp as { count?: number | null }).count ?? null
    if (format === 'csv') {
      const headersRow = toCsvRow(['id', 'type', 'symbol', 'title', 'message', 'severity', 'createdAt'])
      const rows = parsedRows.map((r) => toCsvRow([r.id, r.type, r.symbol, r.title ?? '', r.message ?? '', r.severity ?? '', r.createdAt ?? '']))
      const csv = [headersRow, ...rows].join('\n')
      return new NextResponse(csv, { status: 200, headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Cache-Control': 'no-store' } })
    }
    return NextResponse.json({ success: true, data: parsedRows, meta: { limit, offset, total: count } }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
