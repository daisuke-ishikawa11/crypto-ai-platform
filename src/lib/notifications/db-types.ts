/**
 * 📦 Notifications DB Row Types (centralized)
 * Supabaseテーブルのスキーマに沿った行型を集約
 */

import type { NotificationType, NotificationStatus, NotificationChannel } from './types'

// user_notification_preferences 行型
export type PreferencesRow = {
  user_id: string
  preferences?: Record<string, unknown>
  email?: string | null
  phone_number?: string | null
  push_tokens?: string[] | null
  webhook_url?: string | null
  slack_channel_id?: string | null
  discord_channel_id?: string | null
  telegram_chat_id?: string | null
  created_at?: string
  updated_at?: string
}

// notification_templates 行型（DBのsnake_caseに準拠）
export type TemplateRow = {
  id: string
  name: string
  type: string
  channel: string
  subject?: string | null
  title: string | null
  body: string | null
  html_body?: string | null
  variables?: Record<string, string> | Record<string, unknown> | null
  locale: string | null
  is_active: boolean
  version: number
  created_at: string
  updated_at?: string | null
  created_by?: string | null
}

// notification_delivery_logs 行型（必要フィールドの上位互換）
export type DeliveryLogRow = {
  id?: string
  user_id?: string
  notification_id: string
  notification_type?: NotificationType
  channel?: NotificationChannel | string
  provider?: string | null
  status?: NotificationStatus | string
  title?: string
  summary?: string | null
  body?: string | null
  metrics?: Record<string, unknown>
  message_id?: string | null
  error?: string | null
  cost_cents?: number | null
  created_at: string
}

// notification_providers 行型
export type NotificationProviderRow = {
  name: string
  type: string
  is_active: boolean
  priority: number
  configuration: Record<string, unknown>
  // optional health columns
  health_check_url?: string | null
  health_check_interval?: number | null
  health_check_timeout?: number | null
  is_healthy?: boolean | null
  last_check?: string | null
  // optional rate limits aggregate field
  rate_limits?: { perSecond: number; perMinute: number; perHour: number; perDay: number } | null
}

// notification_queues 行型
export type NotificationQueueRow = {
  id: string
  name: string
  channel: string
  priority: string
  max_retries: number
  retry_backoff: number
  batch_size: number
  processing_delay: number
  dead_letter_queue?: string | null
  is_active: boolean
}

// notification_rules 行型
export type NotificationRuleRow = {
  id: string
  name: string
  description?: string | null
  is_active: boolean
  conditions: Record<string, unknown>
  actions: Record<string, unknown>
  created_at?: string
  updated_at?: string
}

// notification_queue（ジョブテーブル）行型（フォールバック用の最低限型）
export type NotificationQueueDbEntry = {
  id: string
  queue_id: string
  notification_payload: Record<string, unknown>
  priority: string | number
  status: string
  retry_count: number
  max_retries: number
  next_retry_at: string
  created_at: string
}

// notification_batches 行型（保存用の最低限型）
export type NotificationBatchRow = {
  id: string
  channel: string
  priority: string
  status: string
  total_count: number
  success_count: number
  failure_count: number
  created_at: string
  processed_at?: string | null
  completed_at?: string | null
}
