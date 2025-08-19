import { createMocks } from 'node-mocks-http'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

jest.mock('@supabase/supabase-js')

describe('Notifications Analytics Export API', () => {
  const mockSupabase = {
    auth: { getUser: jest.fn() },
    from: jest.fn()
  }
  const mockUser = { id: 'admin-user', email: 'admin@example.com' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as any)
  })

  it('exports CSV with selected columns', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }) }
      }
      if (table === 'notification_webhook_events') {
        const rows = [
          { type: 'invalid_signature', provider: 'sendgrid', timestamp: '2025-08-01T00:00:00.000Z' },
          { type: 'delivered', provider: 'sendgrid', timestamp: '2025-08-01T01:00:00.000Z' },
          { type: 'invalid_signature', provider: 'twilio', timestamp: '2025-08-01T00:00:00.000Z' }
        ]
        return { select: jest.fn().mockReturnThis(), gte: jest.fn().mockReturnThis(), lte: jest.fn().mockResolvedValue({ data: rows, error: null }) }
      }
      return {}
    })

    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))
    const { POST } = await import('@/app/api/notifications/analytics/export/route')
    const body = {
      dateRange: { start: '2025-08-01T00:00:00.000Z', end: '2025-08-02T00:00:00.000Z' },
      grain: 'day',
      compare: 'none',
      includeProviders: true,
      includeDelta: false,
      columns: {
        total: true,
        invalid: true,
        invalidRate: true,
        providerInvalid: true,
        providerInvalidRate: false
      }
    }
    const { req } = createMocks({ method: 'POST', headers: { 'content-type': 'application/json' }, body })
    ;(req as any).json = jest.fn().mockResolvedValue(body)
    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('date,total,invalid,invalid_rate,provider_sendgrid_invalid,provider_twilio_invalid')
  })

  it('falls back to CSV when gzip requested but CompressionStream unavailable', async () => {
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
    ;(globalThis as any).CompressionStream = undefined
    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))
    const { POST } = await import('@/app/api/notifications/analytics/export/route')
    const body = { compress: 'gzip' }
    const { req } = createMocks({ method: 'POST', headers: { 'content-type': 'application/json' }, body })
    ;(req as any).json = jest.fn().mockResolvedValue(body)
    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/csv')
  })
})
