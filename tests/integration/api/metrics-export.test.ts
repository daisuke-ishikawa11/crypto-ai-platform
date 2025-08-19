import { createMocks } from 'node-mocks-http'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

jest.mock('@supabase/supabase-js')

describe('Metrics integration (export)', () => {
  const mockSupabase = {
    auth: { getUser: jest.fn() },
    from: jest.fn()
  }
  const mockUser = { id: 'admin-user', email: 'admin@example.com' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as any)
    // Enable metrics for test
    ;(process as any).env.METRICS_ENABLED = 'true'
  })

  it('increments counters and observes duration', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }) }
      }
      if (table === 'notification_webhook_events') {
        return { select: jest.fn().mockReturnThis(), gte: jest.fn().mockReturnThis(), lte: jest.fn().mockResolvedValue({ data: [], error: null }) }
      }
      return {}
    })

    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))

    const { POST } = await import('@/app/api/notifications/analytics/export/route')
    const body = { dateRange: { start: '2025-08-01T00:00:00.000Z', end: '2025-08-01T01:00:00.000Z' } }
    const { req } = createMocks({ method: 'POST', headers: { 'content-type': 'application/json' }, body })
    ;(req as any).json = jest.fn().mockResolvedValue(body)
    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(200)

    const { GET } = await import('@/app/api/metrics/route')
    const metricsRes = await GET()
    const text = await metricsRes.text()
    expect(text).toContain('export_requests_total')
    expect(text).toContain('export_request_duration_seconds_bucket')
  })
})
