/**
 * 📮 Send Notification API
 * Endpoint for sending individual notifications
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { EnhancedNotificationService } from '@/lib/notifications/enhanced-notification-service'
import { NotificationChannel, NotificationPriority, NotificationType } from '@/lib/notifications/types'
import { logger } from '@/lib/monitoring/logger'
import { safeAwait } from '@/lib/supabase/helpers'
import type { PreferencesRow } from '@/lib/notifications/db-types'
import { toUserPreferences } from '@/lib/notifications/transformers'

const sendNotificationSchema = z.object({
  type: z.nativeEnum(NotificationType),
  channel: z.nativeEnum(NotificationChannel),
  priority: z.nativeEnum(NotificationPriority).optional().default(NotificationPriority.NORMAL),
  recipientId: z.string().uuid(),
  templateId: z.string().uuid().optional(),
  customContent: z.object({
    subject: z.string().optional(),
    title: z.string(),
    body: z.string(),
    htmlBody: z.string().optional()
  }).optional(),
  data: z.record(z.string(), z.unknown()).optional().default({}),
  metadata: z.object({
    source: z.string().default('api'),
    campaign: z.string().optional(),
    tracking: z.record(z.string(), z.unknown()).optional(),
    tags: z.array(z.string()).optional()
  }).optional().default({ source: 'api' }),
  scheduling: z.object({
    sendAt: z.string().datetime().optional(),
    expireAt: z.string().datetime().optional(),
    timezone: z.string().optional()
  }).optional().default({})
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = sendNotificationSchema.parse(body)

    // Check if user has permission to send notifications
    const { data: profile } = await safeAwait<{ role?: string } | null>(
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
    )

    if (!profile || (profile.role !== 'admin' && profile.role !== 'system')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Get recipient information
    const { data: recipient } = await safeAwait<PreferencesRow | null>(
      supabase
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', validatedData.recipientId)
        .single()
    )

    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient not found or has no notification preferences' },
        { status: 404 }
      )
    }

    // Create notification payload
    const notificationPayload = {
      id: crypto.randomUUID(),
      type: validatedData.type,
      channel: validatedData.channel,
      priority: validatedData.priority,
      recipient: {
        userId: validatedData.recipientId,
        email: recipient.email ?? undefined,
        phoneNumber: recipient.phone_number ?? undefined,
        pushTokens: recipient.push_tokens || [],
        webhookUrl: recipient.webhook_url ?? undefined,
        slackChannelId: recipient.slack_channel_id ?? undefined,
        discordChannelId: recipient.discord_channel_id ?? undefined,
        telegramChatId: recipient.telegram_chat_id ?? undefined,
        preferences: toUserPreferences(recipient)
      },
      templateId: validatedData.templateId,
      customContent: validatedData.customContent,
      data: validatedData.data,
      metadata: validatedData.metadata,
      scheduling: {
        sendAt: validatedData.scheduling.sendAt ? new Date(validatedData.scheduling.sendAt) : undefined,
        expireAt: validatedData.scheduling.expireAt ? new Date(validatedData.scheduling.expireAt) : undefined,
        timezone: validatedData.scheduling.timezone
      },
      retryPolicy: {
        maxRetries: 3,
        backoffMultiplier: 2,
        maxBackoffDelay: 300
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Initialize notification service
    const notificationService = new EnhancedNotificationService({
      providers: await getNotificationProviders(),
      queues: await getNotificationQueues(),
      rules: await getNotificationRules(),
      analytics: {
        enabled: true,
        retentionDays: 90,
        realTimeMetrics: true
      },
      personalization: {
        enabled: true,
        aiModel: 'gpt-4',
        learningRate: 0.1
      },
      batching: {
        enabled: true,
        maxBatchSize: 100,
        batchDelay: 30000
      },
      failover: {
        enabled: true,
        healthCheckInterval: 300000,
        retryBackoffBase: 2,
        maxRetries: 3
      }
    })

    // Send notification
    const result = await notificationService.sendNotification(notificationPayload)

    // Log the operation
    logger.info('Notification sent via API', {
      notificationId: notificationPayload.id,
      type: validatedData.type,
      channel: validatedData.channel,
      recipientId: validatedData.recipientId,
      success: result.success,
      requestedBy: user.id
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        notificationId: notificationPayload.id,
        messageId: result.messageId,
        deliveryTime: result.deliveryTime
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          notificationId: notificationPayload.id
        },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('Failed to send notification via API', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as z.ZodError).issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions to fetch configuration
import type { NotificationProvider as ProviderType, NotificationQueue as QueueType, NotificationRule as RuleType } from '@/lib/notifications/types'

async function getNotificationProviders(): Promise<ProviderType[]> {
  const supabase = await createClient()
  const { data } = await safeAwait<ProviderType[] | null>(
    supabase
      .from('notification_providers')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
  )

  return data || []
}

async function getNotificationQueues(): Promise<QueueType[]> {
  const supabase = await createClient()
  const { data } = await safeAwait<QueueType[] | null>(
    supabase
      .from('notification_queues')
      .select('*')
      .eq('is_active', true)
  )

  return data || []

}

async function getNotificationRules(): Promise<RuleType[]> {
  const supabase = await createClient()
  const { data } = await safeAwait<RuleType[] | null>(
    supabase
      .from('notification_rules')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
  )

  return data || []
}
