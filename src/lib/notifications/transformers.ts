/**
 * 🔄 Notification transformers
 * DB行からアプリ内部の厳密型への変換ロジックを集約
 *
 * 使用レシピ:
 * - ユーザープリファレンス: const prefs = toUserPreferences(row)
 * - プロバイダ設定: const providers = rows.map(toNotificationProvider)
 * - キュー設定: const queues = rows.map(toNotificationQueue)
 * - ルール: const rules = rows.map(toNotificationRule)
 */

import type { PreferencesRow, NotificationProviderRow, NotificationQueueRow, NotificationRuleRow } from './db-types'
import {
  NotificationChannel,
  NotificationPriority,
  NotificationType,
  type UserNotificationPreferences,
  type NotificationProvider,
  type NotificationQueue,
  type NotificationRule,
} from './types'

function createDefaultUserPreferences(userId: string): UserNotificationPreferences {
  return {
    userId,
    channels: {
      [NotificationChannel.EMAIL]: {
        enabled: true,
        minPriority: NotificationPriority.NORMAL,
        allowedTypes: Object.values(NotificationType),
        rateLimits: { perMinute: 1, perHour: 20, perDay: 100 },
        deliveryOptions: {}
      },
      [NotificationChannel.PUSH]: {
        enabled: true,
        minPriority: NotificationPriority.NORMAL,
        allowedTypes: Object.values(NotificationType),
        rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
        deliveryOptions: {}
      },
      [NotificationChannel.SMS]: {
        enabled: false,
        minPriority: NotificationPriority.CRITICAL,
        allowedTypes: [NotificationType.RISK_WARNING],
        rateLimits: { perMinute: 1, perHour: 5, perDay: 10 },
        deliveryOptions: {}
      },
      [NotificationChannel.WEBHOOK]: {
        enabled: false,
        minPriority: NotificationPriority.NORMAL,
        allowedTypes: [],
        rateLimits: { perMinute: 10, perHour: 100, perDay: 1000 },
        deliveryOptions: {}
      },
      [NotificationChannel.IN_APP]: {
        enabled: true,
        minPriority: NotificationPriority.LOW,
        allowedTypes: Object.values(NotificationType),
        rateLimits: { perMinute: 10, perHour: 100, perDay: 500 },
        deliveryOptions: {}
      },
      [NotificationChannel.SLACK]: {
        enabled: false,
        minPriority: NotificationPriority.NORMAL,
        allowedTypes: [],
        rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
        deliveryOptions: {}
      },
      [NotificationChannel.DISCORD]: {
        enabled: false,
        minPriority: NotificationPriority.NORMAL,
        allowedTypes: [],
        rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
        deliveryOptions: {}
      },
      [NotificationChannel.TELEGRAM]: {
        enabled: false,
        minPriority: NotificationPriority.NORMAL,
        allowedTypes: [],
        rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
        deliveryOptions: {}
      }
    },
    frequency: { immediate: [], batched: [], disabled: [] },
    quietHours: { enabled: false, start: '00:00', end: '00:00', timezone: 'UTC' },
    digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
    language: 'en',
    globalOptOut: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

/**
 * user_notification_preferences の行から UserNotificationPreferences へ安全に変換
 */
export function toUserPreferences(row: PreferencesRow): UserNotificationPreferences {
  const base = createDefaultUserPreferences(row.user_id)
  const prefs = row.preferences as Partial<UserNotificationPreferences> | undefined

  // frequency
  if (prefs?.frequency) {
    base.frequency = {
      immediate: Array.isArray(prefs.frequency.immediate) ? prefs.frequency.immediate as NotificationType[] : base.frequency.immediate,
      batched: Array.isArray(prefs.frequency.batched) ? prefs.frequency.batched as NotificationType[] : base.frequency.batched,
      disabled: Array.isArray(prefs.frequency.disabled) ? prefs.frequency.disabled as NotificationType[] : base.frequency.disabled,
    }
  }

  // quietHours
  if (prefs?.quietHours) {
    base.quietHours = {
      enabled: typeof prefs.quietHours.enabled === 'boolean' ? prefs.quietHours.enabled : base.quietHours.enabled,
      start: typeof prefs.quietHours.start === 'string' ? prefs.quietHours.start : base.quietHours.start,
      end: typeof prefs.quietHours.end === 'string' ? prefs.quietHours.end : base.quietHours.end,
      timezone: typeof prefs.quietHours.timezone === 'string' ? prefs.quietHours.timezone : base.quietHours.timezone,
    }
  }

  // digestSettings
  if (prefs?.digestSettings) {
    base.digestSettings = {
      enabled: typeof prefs.digestSettings.enabled === 'boolean' ? prefs.digestSettings.enabled : base.digestSettings.enabled,
      frequency: (prefs.digestSettings.frequency === 'daily' || prefs.digestSettings.frequency === 'weekly' || prefs.digestSettings.frequency === 'monthly')
        ? prefs.digestSettings.frequency
        : base.digestSettings.frequency,
      time: typeof prefs.digestSettings.time === 'string' ? prefs.digestSettings.time : base.digestSettings.time,
    }
  }

  // language/globalOptOut
  if (typeof prefs?.language === 'string') base.language = prefs.language
  if (typeof prefs?.globalOptOut === 'boolean') base.globalOptOut = prefs.globalOptOut

  // channels（各チャネルの部分マージ）
  const channelKeys = Object.values(NotificationChannel)
  for (const ch of channelKeys) {
    const override = prefs?.channels?.[ch as NotificationChannel] as Partial<UserNotificationPreferences['channels'][NotificationChannel]> | undefined
    if (override) {
      const curr = base.channels[ch as NotificationChannel]
      base.channels[ch as NotificationChannel] = {
        enabled: typeof override.enabled === 'boolean' ? override.enabled : curr.enabled,
        minPriority: override.minPriority ?? curr.minPriority,
        allowedTypes: Array.isArray(override.allowedTypes) ? override.allowedTypes as NotificationType[] : curr.allowedTypes,
        rateLimits: override.rateLimits ? {
          perMinute: typeof override.rateLimits.perMinute === 'number' ? override.rateLimits.perMinute : curr.rateLimits.perMinute,
          perHour: typeof override.rateLimits.perHour === 'number' ? override.rateLimits.perHour : curr.rateLimits.perHour,
          perDay: typeof override.rateLimits.perDay === 'number' ? override.rateLimits.perDay : curr.rateLimits.perDay,
        } : curr.rateLimits,
        deliveryOptions: typeof override.deliveryOptions === 'object' && override.deliveryOptions !== null ? override.deliveryOptions : curr.deliveryOptions,
      }
    }
  }

  return base
}

export function toNotificationProvider(row: NotificationProviderRow): NotificationProvider {
  return {
    name: row.name,
    type: (Object.values(NotificationChannel) as string[]).includes(row.type) ? (row.type as NotificationChannel) : NotificationChannel.EMAIL,
    isActive: Boolean(row.is_active),
    priority: typeof row.priority === 'number' ? row.priority : 0,
    rateLimits: row.rate_limits ?? { perSecond: 10, perMinute: 600, perHour: 36000, perDay: 864000 },
    configuration: row.configuration || {},
    healthCheck: {
      url: row.health_check_url ?? undefined,
      interval: row.health_check_interval ?? 300000,
      timeout: row.health_check_timeout ?? 30000,
      lastCheck: row.last_check ? new Date(row.last_check) : undefined,
      isHealthy: row.is_healthy ?? true,
    },
  }
}

export function toNotificationQueue(row: NotificationQueueRow): NotificationQueue {
  // priorityはenumにマッピング
  const priorityMap: Record<string, NotificationPriority> = {
    low: NotificationPriority.LOW,
    normal: NotificationPriority.NORMAL,
    high: NotificationPriority.HIGH,
    critical: NotificationPriority.CRITICAL,
    emergency: NotificationPriority.EMERGENCY,
  }
  return {
    id: row.id,
    name: row.name,
    channel: (Object.values(NotificationChannel) as string[]).includes(row.channel) ? (row.channel as NotificationChannel) : NotificationChannel.EMAIL,
    priority: priorityMap[row.priority] ?? NotificationPriority.NORMAL,
    maxRetries: row.max_retries,
    retryBackoff: row.retry_backoff,
    batchSize: row.batch_size,
    processingDelay: row.processing_delay,
    deadLetterQueue: row.dead_letter_queue ?? undefined,
    isActive: row.is_active,
    metrics: {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      retrying: 0,
      averageProcessingTime: 0,
      throughputPerMinute: 0,
      lastProcessed: undefined,
    },
  }
}

export function toNotificationRule(row: NotificationRuleRow): NotificationRule {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    isActive: row.is_active,
    conditions: row.conditions as NotificationRule['conditions'],
    actions: row.actions as NotificationRule['actions'],
    createdAt: row.created_at ? new Date(row.created_at) : new Date(0),
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(0),
  }
}
