// note: createMocks not needed after refactor
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

jest.mock('@supabase/supabase-js')

describe('Notifications Analytics Settings API', () => {
  const mockSupabase = {
    auth: { getUser: jest.fn() },
    from: jest.fn()
  }
  const mockUser = { id: 'admin-user', email: 'admin@example.com' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as unknown as ReturnType<typeof createClient>)
  })

  it('GET returns merged thresholds for authorized roles', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }) }
      }
      if (table === 'notification_settings') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { value: { sendgrid: 3 } }, error: null }) }
      }
      return {}
    })

    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))
    const { GET } = await import('../../../src/app/api/notifications/analytics/settings/route')
    const res = await GET()
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.thresholds.sendgrid).toBe(3)
    expect(typeof data.defaultPct).toBe('number')
  })

  it('PUT validates and saves thresholds for authorized roles', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
    const chain = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }) }
    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') return chain
      if (table === 'notification_settings') {
        const ns = {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: { value: {} }, error: null }),
          upsert: jest.fn().mockResolvedValue({ data: null, error: null })
        }
        return ns
      }
      return {}
    })

    const payload = { sendgrid: 2, twilio: 1 }
    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))
    const { PUT } = await import('../../../src/app/api/notifications/analytics/settings/route')
    const mockReq = { json: jest.fn().mockResolvedValue(payload) } as unknown as NextRequest
    const res = await PUT(mockReq)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('rejects unauthorized', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: { message: 'no' } })
    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))
    const { GET } = await import('../../../src/app/api/notifications/analytics/settings/route')
    const res = await GET()
    expect(res.status).toBe(401)
  })
})
