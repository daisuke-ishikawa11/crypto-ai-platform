import { CooldownService } from '../../src/lib/notifications/cooldown-service'
import { NotificationChannel, NotificationPriority, NotificationType, NotificationPayload } from '../../src/lib/notifications/types'

jest.mock('../../src/lib/supabase/client', () => {
  const fromChain = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    gt: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null }),
    insert: jest.fn().mockResolvedValue({ data: null, error: null }),
    upsert: jest.fn().mockResolvedValue({ data: null, error: null }),
  }
  const client = { from: jest.fn(() => fromChain) }
  return { createClient: jest.fn(() => client) }
})

function makePayload(overrides: Partial<NotificationPayload> = {}): NotificationPayload {
  return {
    id: overrides.id || 'n1',
    type: overrides.type || NotificationType.ANNOUNCEMENT,
    channel: overrides.channel || NotificationChannel.EMAIL,
    priority: overrides.priority || NotificationPriority.NORMAL,
    recipient: overrides.recipient || {
      userId: 'u1',
      email: 'u1@example.com',
      preferences: {
        userId: 'u1',
        channels: {
          email: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          push: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          sms: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          webhook: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          in_app: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          slack: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          discord: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
          telegram: { enabled: true, minPriority: NotificationPriority.LOW, allowedTypes: Object.values(NotificationType), rateLimits: { perMinute: 100, perHour: 1000, perDay: 2000 }, deliveryOptions: {} },
        },
        frequency: { immediate: [], batched: [], disabled: [] },
        quietHours: { enabled: false, start: '00:00', end: '00:00', timezone: 'UTC' },
        digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
        language: 'en',
        globalOptOut: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    },
    data: {},
    metadata: { source: 'test' },
    scheduling: {},
    retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 60000 },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

describe('CooldownService', () => {
  it('should allow send when no active cooldown', async () => {
    const payload = makePayload()
    const ok = await CooldownService.shouldSend(payload)
    expect(ok).toBe(true)
  })

  it('should deny send when active cooldown exists', async () => {
    const { createClient: getClient } = await import('../../src/lib/supabase/client')
    const mocked = getClient() as unknown as { from: () => { single: jest.Mock } }
    ;(mocked.from().single as jest.Mock).mockResolvedValueOnce({ data: { key: 'u1:email:announcement:u1@example.com', expires_at: new Date(Date.now()+60000).toISOString() } })
    const payload = makePayload()
    const ok = await CooldownService.shouldSend(payload)
    expect(ok).toBe(false)
  })

  it('should upsert cooldown on activate', async () => {
    process.env.NOTIF_COOLDOWN_DEFAULT_SEC = '5'
    const payload = makePayload()
    await expect(CooldownService.activateCooldown(payload)).resolves.toBeUndefined()
  })
})
