import { createMocks } from 'node-mocks-http'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

jest.mock('@supabase/supabase-js')

describe('Notifications Analytics Export Presets API', () => {
  const mockSupabase = {
    auth: { getUser: jest.fn() },
    from: jest.fn()
  }
  const mockUser = { id: 'admin-user', email: 'admin@example.com' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.MockedFunction<typeof createClient>).mockReturnValue(mockSupabase as any)
  })

  it('PUT saves user preset and GET returns it', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
    const key = `export_presets_user_${mockUser.id}`
    const profilesChain = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }) }
    const settingsChain = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { value: {} }, error: null }),
      upsert: jest.fn().mockResolvedValue({ data: null, error: null })
    }
    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') return profilesChain
      if (table === 'notification_settings') return settingsChain
      if (table === 'notification_settings_audit') return { insert: jest.fn().mockResolvedValue({ data: null, error: null }) }
      return {}
    })

    jest.doMock('@/lib/supabase/server', () => ({ createClient: jest.fn(async () => mockSupabase) }))
    const { PUT, GET } = await import('@/app/api/notifications/analytics/export/presets/route')
    const preset = { columns: { total: true, invalid: false }, precision: 3, compress: 'gzip' as const }

    const putReq = createMocks({ method: 'PUT', headers: { 'content-type': 'application/json' }, body: preset }).req
    ;(putReq as any).json = jest.fn().mockResolvedValue(preset)
    const putRes = await PUT(putReq as unknown as NextRequest)
    expect(putRes.status).toBe(200)

    // GET should return what we upserted
    settingsChain.single = jest.fn().mockResolvedValue({ data: { value: preset }, error: null })
    const getReq = createMocks({ method: 'GET' }).req
    const getRes = await GET(getReq as unknown as NextRequest)
    expect(getRes.status).toBe(200)
    const data = await getRes.json()
    expect(data.preset.compress).toBe('gzip')
    expect(data.preset.columns.invalid).toBe(false)
    expect(data.preset.precision).toBe(3)
  })
})
