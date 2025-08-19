import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/server'
import { rateLimit, requireInternalAuth } from '@/lib/security/api-guard'
import { captureError } from '@/lib/monitoring/sentry'
import { z } from 'zod'
import { withCache } from '@/lib/cache'

interface ProtocolRow { id: string; name: string; protocol_type: string; blockchain: string; website_url: string | null; api_endpoint: string | null; current_tvl: number | null; tvl_change_24h: number | null; yield_apr: number | null; risk_score: number | null; is_active: boolean; created_at: string; updated_at: string }

const QuerySchema = z.object({ active: z.enum(['true', 'false']).optional(), limit: z.coerce.number().int().min(1).max(500).default(100) })

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireInternalAuth(request)
  if (auth) return auth
  const limited = rateLimit(request, 'protocols')
  if (limited) return limited

  const supabase = getAdminClient()
  const { searchParams } = new URL(request.url)
  const parse = QuerySchema.safeParse({ active: searchParams.get('active') ?? undefined, limit: searchParams.get('limit') ?? undefined })
  if (!parse.success) { return NextResponse.json({ success: false, error: 'Invalid query', details: parse.error.flatten() }, { status: 400 }) }
  const { active, limit } = parse.data

  let query = supabase.from('defi_protocols').select('*').order('current_tvl', { ascending: false }).limit(limit)
  if (active === 'true') query = (query as unknown as { eq: (c: string, v: unknown) => typeof query }).eq('is_active', true)
  else if (active === 'false') query = (query as unknown as { eq: (c: string, v: unknown) => typeof query }).eq('is_active', false)

  const { data, error } = await query
  if (error) { captureError(error, { scope: 'protocols' }); return NextResponse.json({ success: false, error: error.message }, { status: 500 }) }

  const rows = (data ?? []) as ProtocolRow[]
  const items = rows.map(r => ({ id: r.id, name: r.name, type: r.protocol_type, blockchain: r.blockchain, tvl: Number(r.current_tvl ?? 0), tvlChange24h: Number(r.tvl_change_24h ?? 0), apr: r.yield_apr !== null ? Number(r.yield_apr) : null, riskScore: r.risk_score !== null ? Number(r.risk_score) : null, isActive: Boolean(r.is_active), website: r.website_url, updatedAt: r.updated_at }))
  const totalTVL = items.reduce((s, p) => s + p.tvl, 0)

  return NextResponse.json({ success: true, data: { totalTVL, protocols: items }, timestamp: new Date().toISOString() }, withCache({}, 60))
}


