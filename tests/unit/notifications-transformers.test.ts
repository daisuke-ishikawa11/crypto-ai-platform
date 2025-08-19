import { toUserPreferences, toNotificationProvider, toNotificationQueue, toNotificationRule } from '../../src/lib/notifications/transformers'
import { NotificationChannel, NotificationPriority, NotificationType } from '../../src/lib/notifications/types'

describe('notifications/transformers', () => {
  it('toUserPreferences returns defaults and merges overrides', () => {
    const row = {
      user_id: 'u1',
      preferences: {
        language: 'ja',
        globalOptOut: true,
        frequency: { immediate: [NotificationType.PRICE_ALERT] },
        quietHours: { enabled: true, start: '22:00', end: '07:00', timezone: 'Asia/Tokyo' },
        channels: {
          [NotificationChannel.EMAIL]: { enabled: false, minPriority: NotificationPriority.HIGH },
        }
      }
    }
    const prefs = toUserPreferences(row as unknown as import('../../src/lib/notifications/db-types').PreferencesRow)
    expect(prefs.userId).toBe('u1')
    expect(prefs.language).toBe('ja')
    expect(prefs.globalOptOut).toBe(true)
    expect(prefs.frequency.immediate).toContain(NotificationType.PRICE_ALERT)
    expect(prefs.quietHours.enabled).toBe(true)
    expect(prefs.channels[NotificationChannel.EMAIL].enabled).toBe(false)
    expect(prefs.channels[NotificationChannel.EMAIL].minPriority).toBe(NotificationPriority.HIGH)
  })

  it('toNotificationProvider maps DB row to runtime provider', () => {
    const row = {
      name: 'resend',
      type: 'email',
      is_active: true,
      priority: 90,
      configuration: { apiKey: 'x' },
      health_check_interval: 1000,
      health_check_timeout: 2000,
      is_healthy: true
    }
    const p = toNotificationProvider(row as unknown as import('../../src/lib/notifications/db-types').NotificationProviderRow)
    expect(p.name).toBe('resend')
    expect(p.type).toBe(NotificationChannel.EMAIL)
    expect(p.isActive).toBe(true)
    expect(p.priority).toBe(90)
    expect(p.healthCheck.interval).toBe(1000)
  })

  it('toNotificationQueue maps DB row to runtime queue', () => {
    const row = {
      id: 'q1',
      name: 'notifications:email:normal',
      channel: 'email',
      priority: 'normal',
      max_retries: 3,
      retry_backoff: 2,
      batch_size: 10,
      processing_delay: 5000,
      is_active: true
    }
    const q = toNotificationQueue(row as unknown as import('../../src/lib/notifications/db-types').NotificationQueueRow)
    expect(q.id).toBe('q1')
    expect(q.channel).toBe(NotificationChannel.EMAIL)
    expect(q.priority).toBe(NotificationPriority.NORMAL)
    expect(q.maxRetries).toBe(3)
    expect(q.processingDelay).toBe(5000)
  })

  it('toNotificationRule maps DB row to runtime rule', () => {
    const row = {
      id: 'r1',
      name: 'Block AI analysis at night',
      description: 'Example',
      is_active: true,
      conditions: { timeConstraints: { hours: { start: '22:00', end: '06:00' } } },
      actions: { block: true },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const r = toNotificationRule(row as unknown as import('../../src/lib/notifications/db-types').NotificationRuleRow)
    expect(r.id).toBe('r1')
    expect(r.isActive).toBe(true)
    expect(r.actions?.block).toBe(true)
  })
})
