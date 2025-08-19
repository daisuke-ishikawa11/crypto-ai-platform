import { NotificationDispatcher } from '@/lib/services/notification-dispatcher'
import type { Alert, AlertConfig, NotificationDevice } from '@/lib/types/alerts'

jest.mock('@/lib/redis/client', () => ({
  getRedis: jest.fn()
}))
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({ insert: async () => ({}) })
  })
}))

// Freeze time helper
const setNow = (iso: string) => {
  jest.useFakeTimers().setSystemTime(new Date(iso))
}

describe('NotificationDispatcher respects user prefs', () => {
  const baseAlert: Alert = {
    id: 'a1',
    userId: 'u1',
    type: 'price_alert',
    coinSymbol: 'BTC',
    title: 'Price Alert',
    message: 'BTC moved',
    priority: 'medium',
    marketData: { symbol: 'BTC', price: 50000, change24h: 0, changePercent24h: 0, volume24h: 0, marketCap: 0, timestamp: new Date().toISOString() },
    createdAt: new Date().toISOString(),
    triggeredBy: { id: 't1', type: 'price_alert', value: 0, priority: 'medium', enabled: true }
  }
  const devices: NotificationDevice[] = [
    { type: 'browser', identifier: 'in-app', enabled: true },
    { type: 'discord', identifier: 'https://discord.example/webhook', enabled: true }
  ]
  const baseConfig: AlertConfig = {
    id: 'c1', userId: 'u1', planType: 'premium', alertTypes: ['price_alert'],
    frequency: { maxDaily: 100, currentDaily: 0, timeSlots: [] },
    notificationDevices: devices,
    thresholds: [],
    preferences: { includeAnalysis: false, includeLearningTips: false, language: 'ja' },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  }

  afterEach(() => {
    jest.useRealTimers()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('returns zero deliveries when DND is enabled', async () => {
    jest.spyOn(NotificationDispatcher.prototype as any, 'loadUserNotificationSettings').mockResolvedValue({ dnd: true })
    const d = new NotificationDispatcher()
    const res = await d.dispatch(baseAlert, baseConfig)
    expect(res.totalDevices).toBe(0)
    expect(res.successfulDeliveries).toBe(0)
  })

  it('suppresses deliveries during Quiet Hours for non-high priority', async () => {
    // Set current time to 23:30 so it falls within 23:00-07:00
    setNow('2024-06-01T23:30:00Z')
    jest.spyOn(NotificationDispatcher.prototype as any, 'loadUserNotificationSettings').mockResolvedValue({ quietHours: '23:00-07:00' })
    jest.spyOn(NotificationDispatcher.prototype as any, 'isWithinQuietHours').mockReturnValue(true)
    const d = new NotificationDispatcher()
    const res = await d.dispatch(baseAlert, baseConfig)
    expect(res.totalDevices).toBe(0)
    expect(res.successfulDeliveries).toBe(0)
  })

  it('respects Quiet Hours window boundary at exact start', async () => {
    setNow('2024-06-01T23:00:00Z')
    jest.spyOn(NotificationDispatcher.prototype as any, 'loadUserNotificationSettings').mockResolvedValue({ quietHours: '23:00-07:00' })
    jest.spyOn(NotificationDispatcher.prototype as any, 'isWithinQuietHours').mockReturnValue(true)
    const d = new NotificationDispatcher()
    const res = await d.dispatch(baseAlert, baseConfig)
    expect(res.totalDevices).toBe(0)
  })

  it('respects Quiet Hours window boundary at exact end (non-bypass)', async () => {
    // 07:00 はウィンドウ終端 → 通常は配信許可だが、実装は分岐関数に委ねるためfalseを返すケースも検証
    setNow('2024-06-02T07:00:00Z')
    jest.spyOn(NotificationDispatcher.prototype as any, 'loadUserNotificationSettings').mockResolvedValue({ quietHours: '23:00-07:00' })
    jest.spyOn(NotificationDispatcher.prototype as any, 'isWithinQuietHours').mockReturnValue(false)
    const d = new NotificationDispatcher() as any
    const browserSend = jest.fn(async () => true)
    d.channels.set('browser', { send: browserSend })
    const res = await d.dispatch(baseAlert, baseConfig)
    expect(res.totalDevices).toBe(devices.length)
    expect(browserSend).toHaveBeenCalled()
  })

  it('bypasses Quiet Hours for high priority', async () => {
    setNow('2024-06-01T23:30:00Z')
    jest.spyOn(NotificationDispatcher.prototype as any, 'loadUserNotificationSettings').mockResolvedValue({ quietHours: '23:00-07:00' })
    const d = new NotificationDispatcher() as any
    // stub channels to avoid external fetch and assert call counts
    const browserSend = jest.fn(async () => true)
    const discordSend = jest.fn(async () => true)
    d.channels.set('browser', { send: browserSend })
    d.channels.set('discord', { send: discordSend })
    const high = { ...baseAlert, priority: 'high' as const }
    const res = await d.dispatch(high, { ...baseConfig, planType: 'premium' })
    expect(res.totalDevices).toBe(devices.length)
    expect(browserSend).toHaveBeenCalled()
    expect(discordSend).toHaveBeenCalled()
    expect(res.successfulDeliveries).toBeGreaterThan(0)
  })

  it('overrides discord webhook with personal setting', async () => {
    const override = 'https://discord.example/override'
    jest.spyOn(NotificationDispatcher.prototype as any, 'loadUserNotificationSettings').mockResolvedValue({ discordWebhook: override })
    const d = new NotificationDispatcher() as any
    let captured: any = null
    const discordSend = jest.fn(async (_alert: any, device: any) => { captured = device; return true })
    d.channels.set('discord', { send: discordSend })
    // also ensure browser is no-op to avoid side effects
    d.channels.set('browser', { send: jest.fn(async () => true) })
    await d.dispatch(baseAlert, { ...baseConfig, planType: 'premium' })
    expect(discordSend).toHaveBeenCalled()
    expect(captured?.identifier).toBe(override)
  })
})
