import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'

type AuditRow = {
  id: string
  key: string
  before: Record<string, unknown> | null
  after: Record<string, unknown> | null
  changed_by: string
  changed_at: string
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await safeAwait<{ role?: string }>(
      supabase.from('profiles').select('role').eq('id', user.id).single()
    )
    if (!profile || !['admin', 'analyst', 'system'].includes(profile.role ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const limitParam = Number(searchParams.get('limit') || '100')
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 1000) : 100
    const pageParam = Number(searchParams.get('page') || '1')
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
    const offset = (page - 1) * limit
    const format = (searchParams.get('format') || 'json').toLowerCase()
    const start = searchParams.get('start') || ''
    const end = searchParams.get('end') || ''
    const key = (searchParams.get('key') || '').trim()
    const changedBy = (searchParams.get('changedBy') || '').trim()

    let query = supabase
      .from('notification_settings_audit')
      .select('id,key,before,after,changed_by,changed_at')
      .order('changed_at', { ascending: false })

    if (start) {
      query = query.gte('changed_at', start)
    }
    if (end) {
      query = query.lte('changed_at', end)
    }
    if (key) {
      query = query.eq('key', key)
    }
    if (changedBy) {
      query = query.eq('changed_by', changedBy)
    }

    // Data page
    const { data: rows, error } = await safeAwait<AuditRow[] | null>(query.range(offset, Math.max(offset + limit - 1, offset)))
    // Total count (best-effort)
    let total = 0
    try {
      const countRes = await supabase
        .from('notification_settings_audit')
        .select('id', { count: 'exact', head: true })
        .order('changed_at', { ascending: false })
        .limit(1)
      // re-apply filters for count
      // Supabase client is immutable after call; rebuild with filters
      let cq = supabase
        .from('notification_settings_audit')
        .select('id', { count: 'exact', head: true })
      if (start) cq = cq.gte('changed_at', start)
      if (end) cq = cq.lte('changed_at', end)
      if (key) cq = cq.eq('key', key)
      if (changedBy) cq = cq.eq('changed_by', changedBy)
      const { count } = await cq
      total = typeof count === 'number' && count > 0 ? count : 0
      void countRes // silence unused
    } catch {}

    if (error) {
      logger.error('Failed to fetch notification settings audit', { error: error.message })
      return NextResponse.json({ error: 'Failed to load audit logs' }, { status: 500 })
    }

    const list = Array.isArray(rows) ? rows : []

    // Resolve changed_by labels (best-effort)
    let byLabel: Record<string, string> = {}
    try {
      const ids = Array.from(new Set(list.map(r => r.changed_by).filter(Boolean)))
      if (ids.length > 0) {
        const { data: profilesData } = await safeAwait<Array<{ id: string; email?: string }> | null>(
          supabase
            .from('profiles')
            .select('id,email')
            .in('id', ids as string[])
        )
        const profs = profilesData || []
        byLabel = profs.reduce((acc, p) => { acc[p.id] = (p.email || p.id); return acc }, {} as Record<string, string>)
      }
    } catch {}

    if (format === 'csv') {
      const header = ['changed_at', 'changed_by', 'key', 'before', 'after']
      const lines = [header.join(',')]
      for (const r of list) {
        const beforeJson = JSON.stringify(r.before ?? null).replaceAll('"', '""')
        const afterJson = JSON.stringify(r.after ?? null).replaceAll('"', '""')
        const row = [
          r.changed_at,
          byLabel[r.changed_by] || r.changed_by,
          r.key,
          `"${beforeJson}"`,
          `"${afterJson}"`
        ]
        lines.push(row.join(','))
      }
      const csv = lines.join('\n')
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="notification_settings_audit.csv"'
        }
      })
    }

    const jsonItems = list.map(r => ({ ...r, changed_by_label: byLabel[r.changed_by] || r.changed_by }))
    return NextResponse.json({ items: jsonItems, total, page, pageSize: limit })
  } catch (error) {
    logger.error('GET /api/notifications/analytics/settings/audit failed', { error: error instanceof Error ? error.message : String(error) })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
