import { createClient } from '@/lib/supabase/client'
import { getEnvInt } from '@/lib/config/env'
import { NotificationChannel, NotificationPayload, NotificationType } from './types'
import { getRedis, getRedisKeyPrefix } from '@/lib/redis/client'

interface CooldownRow {
  key: string
  user_id: string
  channel: string
  type?: string
  target?: string
  expires_at: string
  created_at?: string
}

function buildTargetFromRecipient(payload: NotificationPayload): string {
  const r = payload.recipient
  switch (payload.channel) {
    case NotificationChannel.EMAIL:
      return r.email ?? ''
    case NotificationChannel.SMS:
      return r.phoneNumber ?? ''
    case NotificationChannel.PUSH:
      return (r.pushTokens && r.pushTokens.length > 0) ? r.pushTokens.join(',') : ''
    case NotificationChannel.WEBHOOK:
      return r.webhookUrl ?? ''
    case NotificationChannel.SLACK:
      return r.slackChannelId ?? ''
    case NotificationChannel.DISCORD:
      return r.discordChannelId ?? ''
    case NotificationChannel.TELEGRAM:
      return r.telegramChatId ?? ''
    case NotificationChannel.IN_APP:
    default:
      return r.userId
  }
}

function buildKey(payload: NotificationPayload): string {
  const user = payload.recipient.userId
  const ch = payload.channel
  const ty = payload.type
  const target = buildTargetFromRecipient(payload)
  return `${user}:${ch}:${ty}:${target}`
}

function getCooldownSeconds(payload: NotificationPayload): number {
  // Priority: type-specific > channel-specific > global default
  const globalDefault = getEnvInt('NOTIF_COOLDOWN_DEFAULT_SEC', 60)
  const typeKey = `NOTIF_COOLDOWN_TYPE_${String(payload.type).toUpperCase()}_SEC`
  const channelKey = `NOTIF_COOLDOWN_${String(payload.channel).toUpperCase()}_SEC`
  const typeVal = Number(process.env[typeKey] || '')
  if (Number.isFinite(typeVal) && typeVal >= 0) return typeVal
  const channelVal = Number(process.env[channelKey] || '')
  if (Number.isFinite(channelVal) && channelVal >= 0) return channelVal
  return globalDefault
}

export class CooldownService {
  static async shouldSend(payload: NotificationPayload): Promise<boolean> {
    try {
      const key = buildKey(payload)
      // Redis fast-path lock check
      try {
        const redis = await getRedis()
        if (redis) {
          const ttlSec = getCooldownSeconds(payload)
          if (ttlSec > 0) {
            const rKey = `${getRedisKeyPrefix()}${key}`
            const setResult = await redis.setnx(rKey, '1')
            if (setResult === 0) return false // already set -> within cooldown
            await redis.expire(rKey, ttlSec)
          }
        }
      } catch {}
      const supabase = createClient()
      const nowIso = new Date().toISOString()
      const { data } = await supabase
        .from('notification_cooldowns')
        .select('key, expires_at')
        .eq('key', key)
        .gt('expires_at', nowIso)
        .limit(1)
        .single<CooldownRow>()

      const canSend = !data // no active record => can send
      if (!canSend) {
        // Log suppression event (best-effort)
        try {
          await supabase
            .from('notification_suppression_events')
            .insert({
              id: crypto.randomUUID(),
              notification_id: payload.id,
              user_id: payload.recipient.userId,
              channel: String(payload.channel),
              type: String(payload.type),
              reason: 'cooldown',
              key,
              created_at: new Date()
            })
        } catch {}
      }
      return canSend
    } catch {
      // Fail-open on any DB error to avoid blocking delivery
      return true
    }
  }

  static async activateCooldown(payload: NotificationPayload): Promise<void> {
    try {
      const key = buildKey(payload)
      const supabase = createClient()
      const ttlSec = getCooldownSeconds(payload)
      if (ttlSec <= 0) return
      const expiresAt = new Date(Date.now() + ttlSec * 1000).toISOString()
      // Redis set/extend TTL (best-effort)
      try {
        const redis = await getRedis()
        if (redis) {
          const rKey = `${getRedisKeyPrefix()}${key}`
          await redis.set(rKey, '1', 'EX', ttlSec)
        }
      } catch {}
      const row: CooldownRow = {
        key,
        user_id: payload.recipient.userId,
        channel: String(payload.channel),
        type: String(payload.type as NotificationType),
        target: buildTargetFromRecipient(payload),
        expires_at: expiresAt,
      }
      await supabase
        .from('notification_cooldowns')
        .upsert(row, { onConflict: 'key' })
    } catch {
      // noop
    }
  }
}
