/**
 * 📮 Batch Notification API
 * Endpoint for sending multiple notifications efficiently
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { EnhancedNotificationService } from '@/lib/notifications/enhanced-notification-service'
import { NotificationChannel, NotificationPriority, NotificationType, type NotificationProvider as ProviderType, type NotificationQueue as QueueType, type NotificationRule as RuleType, type NotificationPayload } from '@/lib/notifications/types'
import { logger } from '@/lib/monitoring/logger'
import { safeAwait } from '@/lib/supabase/helpers'
import type { PreferencesRow } from '@/lib/notifications/db-types'
import { toUserPreferences } from '@/lib/notifications/transformers'

const batchNotificationSchema = z.object({
  notifications: z.array(z.object({
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
  })).min(1).max(1000), // Limit batch size to 1000
  batchOptions: z.object({
    concurrency: z.number().min(1).max(50).optional().default(10),
    failFast: z.boolean().optional().default(false),
    campaign: z.string().optional(),
    scheduledFor: z.string().datetime().optional()
  }).optional().default({ concurrency: 10, failFast: false })
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
    const validatedData = batchNotificationSchema.parse(body)

    // Check if user has permission to send batch notifications
    const { data: profile } = await safeAwait<{ role?: string } | null>(
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
    )

    if (!profile || (profile.role !== 'admin' && profile.role !== 'system')) {
      return NextResponse.json(
        { error: 'Insufficient permissions for batch notifications' },
        { status: 403 }
      )
    }

    // Get all unique recipient IDs
    const recipientIds = [...new Set(validatedData.notifications.map(n => n.recipientId))]

    // Fetch all recipient preferences in one query
    const { data: recipients } = await safeAwait<PreferencesRow[] | null>(
      supabase
        .from('user_notification_preferences')
        .select('*')
        .in('user_id', recipientIds)
    )

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'No valid recipients found' },
        { status: 404 }
      )
    }

    // Create recipient lookup map
    const recipientMap = new Map(recipients.map(r => [r.user_id, r]))

    // Create notification payloads
    const notificationPayloads = validatedData.notifications
      .map(notification => {
        const recipient = recipientMap.get(notification.recipientId)
        if (!recipient) return null

        return {
          id: crypto.randomUUID(),
          type: notification.type,
          channel: notification.channel,
          priority: notification.priority,
          recipient: {
            userId: notification.recipientId,
            email: recipient.email,
            phoneNumber: recipient.phone_number,
            pushTokens: recipient.push_tokens || [],
            webhookUrl: recipient.webhook_url,
            slackChannelId: recipient.slack_channel_id,
            discordChannelId: recipient.discord_channel_id,
            telegramChatId: recipient.telegram_chat_id,
            preferences: toUserPreferences(recipient)
          },
          templateId: notification.templateId,
          customContent: notification.customContent,
          data: {
            ...notification.data,
            batchId: crypto.randomUUID(), // Add batch tracking
            campaign: validatedData.batchOptions?.campaign
          },
          metadata: {
            ...notification.metadata,
            batchRequest: true,
            campaign: validatedData.batchOptions?.campaign,
            requestedBy: user.id
          },
          scheduling: {
            sendAt: notification.scheduling.sendAt ? new Date(notification.scheduling.sendAt) : 
                   validatedData.batchOptions?.scheduledFor ? new Date(validatedData.batchOptions.scheduledFor) : undefined,
            expireAt: notification.scheduling.expireAt ? new Date(notification.scheduling.expireAt) : undefined,
            timezone: notification.scheduling.timezone
          },
          retryPolicy: {
            maxRetries: 3,
            backoffMultiplier: 2,
            maxBackoffDelay: 300
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
      .filter(Boolean) as Array<{ id: string; recipient: { userId: string } }>

    if (notificationPayloads.length === 0) {
      return NextResponse.json(
        { error: 'No valid notifications to send' },
        { status: 400 }
      )
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
        maxBatchSize: validatedData.batchOptions?.concurrency || 10,
        batchDelay: 5000 // 5 seconds between batches
      },
      failover: {
        enabled: true,
        healthCheckInterval: 300000,
        retryBackoffBase: 2,
        maxRetries: 3
      }
    })

    // Send batch（型安全にキャスト）
    const batchResult = await notificationService.sendBatch(notificationPayloads as NotificationPayload[])

    // Calculate success metrics
    const successCount = batchResult.results.filter(r => r.success).length
    const failureCount = batchResult.results.filter(r => !r.success).length
    const averageDeliveryTime = batchResult.results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.deliveryTime, 0) / Math.max(successCount, 1)

    // Log batch operation
    logger.info('Batch notification completed', {
      batchId: batchResult.id,
      totalNotifications: notificationPayloads.length,
      successCount,
      failureCount,
      averageDeliveryTime,
      campaign: validatedData.batchOptions?.campaign,
      requestedBy: user.id
    })

    // Store batch campaign if specified
    if (validatedData.batchOptions?.campaign) {
      await storeCampaignResults({
        campaignName: validatedData.batchOptions.campaign,
        batchId: batchResult.id,
        totalSent: notificationPayloads.length,
        successCount,
        failureCount,
        createdBy: user.id
      })
    }

    return NextResponse.json({
      success: true,
      batchId: batchResult.id,
      statistics: {
        total: notificationPayloads.length,
        successful: successCount,
        failed: failureCount,
        successRate: successCount / notificationPayloads.length,
        averageDeliveryTime
      },
      results: batchResult.results.map((result, index) => ({
        notificationId: notificationPayloads[index].id,
        recipientId: notificationPayloads[index].recipient.userId,
        success: result.success,
        messageId: result.messageId,
        error: result.error,
        deliveryTime: result.deliveryTime
      }))
    })

  } catch (error) {
    logger.error('Failed to send batch notifications', {
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

// Helper functions
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

async function storeCampaignResults(data: {
  campaignName: string
  batchId: string
  totalSent: number
  successCount: number
  failureCount: number
  createdBy: string
}) {
  const supabase = await createClient()
  
  await safeAwait(
    supabase.from('notification_campaigns').upsert({
    name: data.campaignName,
    type: 'batch',
    status: 'completed',
    metrics: {
      sent: data.totalSent,
      delivered: data.successCount,
      failed: data.failureCount,
      deliveryRate: data.successCount / data.totalSent
    },
    created_by: data.createdBy,
    completed_at: new Date()
    })
  )
}
