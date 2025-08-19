/**
 * 🔗 Notification Delivery Webhooks
 * Handle delivery status updates from external providers
 */

import { NextRequest, NextResponse } from 'next/server'
import { incCounter, startTimer, isMetricsEnabled, registerHistogram } from '@/lib/monitoring/metrics'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { safeAwait } from '@/lib/supabase/helpers'
import { logger } from '@/lib/monitoring/logger'
import { maskPIIDeep, shouldMaskPII } from '@/lib/security/pii'
import { lookupIp } from '@/lib/network/ip-lookup'
import { verifyProviderSignature } from '@/lib/notifications/webhook-signature'

// Common webhook event schema (documentational, keep here for reference if needed later)
// const webhookEventSchema = z.object({
//   type: z.enum(['delivery', 'bounce', 'complaint', 'open', 'click', 'unsubscribe']),
//   timestamp: z.string().datetime(),
//   messageId: z.string(),
//   recipient: z.string().email().optional(),
//   data: z.record(z.string(), z.unknown()).optional(),
//   provider: z.string()
// })

// Provider-specific schemas
const resendWebhookSchema = z.object({
  type: z.string(),
  created_at: z.string(),
  data: z.object({
    email_id: z.string(),
    to: z.array(z.string()),
    from: z.string(),
    subject: z.string(),
    created_at: z.string()
  })
})

const sendgridWebhookSchema = z.array(z.object({
  email: z.string(),
  timestamp: z.number(),
  event: z.string(),
  'smtp-id': z.string().optional(),
  sg_event_id: z.string(),
  sg_message_id: z.string()
}))

const twilioWebhookSchema = z.object({
  SmsSid: z.string(),
  SmsStatus: z.string(),
  MessageStatus: z.string().optional(),
  To: z.string(),
  MessageSid: z.string(),
  AccountSid: z.string(),
  From: z.string(),
  ApiVersion: z.string()
})

// Generic webhook handler
export async function POST(request: NextRequest) {
  try {
    if (isMetricsEnabled()) registerHistogram('webhook_request_duration_seconds', [0.1, 0.3, 1, 3, 10])
    const stop = startTimer('webhook_request_duration_seconds', { route: 'webhooks_delivery' })
    incCounter('webhook_requests_total', { route: 'webhooks_delivery' }, 1)
    // Note: DB書き込みは下位関数で行うため、ここではSupabaseクライアントは生成しない
    
    // Get provider from URL path or headers
    const url = new URL(request.url)
    const provider = url.searchParams.get('provider') || request.headers.get('x-provider')
    
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not specified' },
        { status: 400 }
      )
    }

    // Read raw body once for signature verification and parsing
    const rawBody = await request.text()

    // Verify webhook signature based on provider using raw body
    const isValidSignature = await verifyProviderSignature(request.headers, rawBody, request.url, provider)
    if (!isValidSignature) {
      const ip = request.headers.get('x-forwarded-for') || 'unknown'
      const ua = request.headers.get('user-agent') || 'unknown'
      logger.warn('Invalid webhook signature', { provider, ip })
      // metrics: invalid signature
      incCounter('webhook_invalid_signature_total', { route: 'webhooks_delivery', provider: String(provider).toLowerCase() }, 1)
      // Store invalid signature event for analytics
      try {
        const ipInfo = await lookupIp(ip).catch(() => null)
        await storeWebhookEvents([
          {
            type: 'invalid_signature',
            timestamp: new Date(),
            messageId: '',
            data: { ip, ua, ipInfo }
          }
        ], provider)
      } catch {}
      const resInvalid = NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
      stop()
      return resInvalid
    }
    // Parse body safely (providers may send JSON array/object)
    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      body = {}
    }
    
    // Process webhook based on provider
    let events: unknown[] = []
    
    switch (provider.toLowerCase()) {
      case 'resend':
        events = await processResendWebhook(body)
        break
      case 'sendgrid':
        events = await processSendGridWebhook(body)
        break
      case 'twilio':
        events = await processTwilioWebhook(body)
        break
      case 'firebase':
        events = await processFirebaseWebhook(body)
        break
      default:
        logger.warn('Unknown webhook provider', { provider })
        const resUnknown = NextResponse.json(
          { error: 'Unknown provider' },
          { status: 400 }
        )
        stop()
        return resUnknown
    }

    // Store webhook events
    await storeWebhookEvents(events, provider)

    // Update notification delivery logs
    await updateDeliveryLogs(events)

    // Process engagement events (opens, clicks, unsubscribes)
    await processEngagementEvents(events)

    logger.info('Webhook processed successfully', {
      provider,
      eventsCount: events.length
    })

    const resOk = NextResponse.json({
      success: true,
      processed: events.length
    })
    stop()
    return resOk

  } catch (error) {
    logger.error('Webhook processing failed', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    incCounter('webhook_requests_errors_total', { route: 'webhooks_delivery' }, 1)
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    )
  }
}

// Provider-specific webhook processors

async function processResendWebhook(body: unknown) {
  const events = []
  
  try {
    const webhookData = resendWebhookSchema.parse(body)
    
    const event = {
      type: mapResendEventType(webhookData.type),
      timestamp: new Date(webhookData.created_at),
      messageId: webhookData.data.email_id,
      recipient: webhookData.data.to[0],
      data: {
        subject: webhookData.data.subject,
        from: webhookData.data.from,
        originalType: webhookData.type
      },
      provider: 'resend'
    }
    
    events.push(event)
  } catch (error) {
    logger.error('Failed to parse Resend webhook', { error })
  }
  
  return events
}

async function processSendGridWebhook(body: unknown) {
  const events = []
  
  try {
    const webhookData = sendgridWebhookSchema.parse(body)
    
    for (const item of webhookData) {
      const event = {
        type: mapSendGridEventType(item.event),
        timestamp: new Date(item.timestamp * 1000),
        messageId: item.sg_message_id,
        recipient: item.email,
        data: {
          eventId: item.sg_event_id,
          smtpId: item['smtp-id'],
          originalEvent: item.event
        },
        provider: 'sendgrid'
      }
      
      events.push(event)
    }
  } catch (error) {
    logger.error('Failed to parse SendGrid webhook', { error })
  }
  
  return events
}

async function processTwilioWebhook(body: unknown) {
  const events = []
  
  try {
    const webhookData = twilioWebhookSchema.parse(body)
    
    const event = {
      type: mapTwilioEventType(String(webhookData.SmsStatus || webhookData.MessageStatus || '')),
      timestamp: new Date(),
      messageId: webhookData.MessageSid || webhookData.SmsSid,
      recipient: webhookData.To,
      data: {
        from: webhookData.From,
        accountSid: webhookData.AccountSid,
        status: webhookData.SmsStatus || webhookData.MessageStatus
      },
      provider: 'twilio'
    }
    
    events.push(event)
  } catch (error) {
    logger.error('Failed to parse Twilio webhook', { error })
  }
  
  return events
}

async function processFirebaseWebhook(body: unknown) {
  const events = []
  
  // Firebase FCM delivery reports
  try {
    const b = body as Record<string, unknown>
    const messageObj = b?.message as Record<string, unknown> || {}
    if (b?.message && messageObj.token) {
      const event = {
        type: (b.eventType as string) || 'delivery',
        timestamp: new Date((b.eventTime as string) || Date.now()),
        messageId: messageObj.name as string,
        recipient: messageObj.token as string,
        data: {
          messageId: messageObj.messageId as string,
          topic: messageObj.topic as string,
          condition: messageObj.condition as string
        },
        provider: 'firebase'
      }
      
      events.push(event)
    }
  } catch (error) {
    logger.error('Failed to parse Firebase webhook', { error })
  }
  
  return events
}

// Event type mappers

function mapResendEventType(resendType: string): string {
  const mapping: Record<string, string> = {
    'email.sent': 'delivery',
    'email.delivered': 'delivery',
    'email.delivery_delayed': 'delivery',
    'email.bounced': 'bounce',
    'email.complained': 'complaint',
    'email.opened': 'open',
    'email.clicked': 'click'
  }
  return mapping[resendType] || 'delivery'
}

function mapSendGridEventType(sgEvent: string): string {
  const mapping: Record<string, string> = {
    'delivered': 'delivery',
    'processed': 'delivery',
    'bounce': 'bounce',
    'dropped': 'bounce',
    'spamreport': 'complaint',
    'unsubscribe': 'unsubscribe',
    'group_unsubscribe': 'unsubscribe',
    'open': 'open',
    'click': 'click'
  }
  return mapping[sgEvent] || 'delivery'
}

function mapTwilioEventType(twilioStatus: string): string {
  const mapping: Record<string, string> = {
    'delivered': 'delivery',
    'sent': 'delivery',
    'failed': 'bounce',
    'undelivered': 'bounce'
  }
  return mapping[twilioStatus] || 'delivery'
}

// Signature verification moved to '@/lib/notifications/webhook-signature'

// Database operations

type NormalizedEvent = {
  type: string
  timestamp: Date
  messageId: string
  data?: Record<string, unknown>
}

async function storeWebhookEvents(events: unknown[], provider: string) {
  const supabase = await createClient()
  
  const webhookEvents = (events as NormalizedEvent[]).map(event => ({
    id: crypto.randomUUID(),
    type: event.type,
    notification_id: null, // Will be populated by updateDeliveryLogs
    timestamp: event.timestamp,
    data: shouldMaskPII() ? maskPIIDeep(event.data) : event.data,
    signature: '', // Already verified
    processed: false,
    created_at: new Date()
  }))

  const { error } = await safeAwait(
    supabase
      .from('notification_webhook_events')
      .insert(webhookEvents)
  )

  if (error) {
    logger.error('Failed to store webhook events', { error, provider })
  }
}

type DeliveryLogUpdates = {
  status?: string
  delivered_at?: Date
  failed_at?: Date
  error?: string
  opened_at?: Date
  clicked_at?: Date
  unsubscribed_at?: Date
  updated_at: Date
}

async function updateDeliveryLogs(events: unknown[]) {
  const supabase = await createClient()
  
  for (const event of events as NormalizedEvent[]) {
    try {
      // Find the delivery log by message ID
      const { data: deliveryLog } = await safeAwait<{ id: string; notification_id: string } | null>(
        supabase
          .from('notification_delivery_logs')
          .select('id, notification_id')
          .eq('message_id', event.messageId)
          .single()
      )

      if (deliveryLog) {
        const updates: DeliveryLogUpdates = { updated_at: new Date() }

        switch (event.type) {
          case 'delivery':
            updates.status = 'delivered'
            updates.delivered_at = event.timestamp
            break
          case 'bounce':
            updates.status = 'failed'
            updates.failed_at = event.timestamp
            updates.error = ((event.data as Record<string, unknown>)?.reason as string) || 'Bounced'
            break
          case 'complaint':
            updates.status = 'failed'
            updates.failed_at = event.timestamp
            updates.error = 'Spam complaint'
            break
          case 'open':
            updates.opened_at = event.timestamp
            break
          case 'click':
            updates.clicked_at = event.timestamp
            break
          case 'unsubscribe':
            updates.unsubscribed_at = event.timestamp
            break
        }

        await safeAwait(
          supabase
            .from('notification_delivery_logs')
            .update(updates)
            .eq('id', deliveryLog.id)
        )

        // Also update the main notification status if needed
        if (["delivery", "bounce", "complaint"].includes(event.type)) {
          await safeAwait(
            supabase
              .from('notifications')
              .update(
                event.type === 'delivery'
                  ? { status: 'delivered', delivered_at: event.timestamp, updated_at: new Date() }
                  : { status: 'failed', failed_at: event.timestamp, updated_at: new Date() }
              )
              .eq('id', deliveryLog.notification_id)
          )
        }
      }
    } catch (error) {
      logger.error('Failed to update delivery log', { 
        messageId: ((event as Record<string, unknown>).messageId as string), 
        error 
      })
    }
  }
}

async function processEngagementEvents(events: unknown[]) {
  const supabase = await createClient()
  
  const engagementEvents = (events as NormalizedEvent[]).filter(event => 
    ['open', 'click', 'unsubscribe'].includes(event.type)
  )

  for (const event of engagementEvents) {
    try {
      // Find the user from the delivery log
      const { data: deliveryLog } = await safeAwait<{ id: string; notification: { id: string; recipient_id: string; type: string } } | null>(
        supabase
          .from('notification_delivery_logs')
          .select(`id, notification:notifications(id, recipient_id, type)`) 
          .eq('message_id', event.messageId)
          .single()
      )

      const notif = ((deliveryLog as Record<string, unknown>)?.notification as Record<string, unknown>) || undefined
      if (notif) {
        // Update user engagement metrics
        await updateUserEngagementMetrics(
          notif.recipient_id as string,
          event.type,
          notif.type as string
        )

        // Store detailed engagement event
        await safeAwait(
          supabase
            .from('notification_engagement_events')
            .insert({
              id: crypto.randomUUID(),
               notification_id: notif.id,
               user_id: notif.recipient_id,
              event_type: event.type,
              timestamp: event.timestamp,
              data: shouldMaskPII() ? maskPIIDeep(event.data) as Record<string, unknown> : event.data as Record<string, unknown>,
              created_at: new Date()
            })
        )
      }
    } catch (error) {
      logger.error('Failed to process engagement event', { 
        messageId: event.messageId,
        type: event.type,
        error 
      })
    }
  }
}

async function updateUserEngagementMetrics(userId: string, eventType: string, notificationType: string) {
  const supabase = await createClient()
  
  try {
    type EngagementMetrics = {
      totalSent: number
      totalOpened: number
      totalClicked: number
      totalUnsubscribed: number
      byType: Record<string, { opened: number; clicked: number; unsubscribed: number }>
      openRate?: number
      clickRate?: number
      unsubscribeRate?: number
    }
    // Get or create user engagement record
    const { data: engagement } = await safeAwait<{ metrics?: EngagementMetrics } | null>(
      supabase
        .from('user_engagement_metrics')
        .select('*')
        .eq('user_id', userId)
        .single()
    )

    const metrics: EngagementMetrics = engagement?.metrics || {
      totalSent: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalUnsubscribed: 0,
      byType: {}
    }

    // Update metrics based on event type
    switch (eventType) {
      case 'open':
        metrics.totalOpened++
        break
      case 'click':
        metrics.totalClicked++
        break
      case 'unsubscribe':
        metrics.totalUnsubscribed++
        break
    }

    // Update type-specific metrics
    if (!metrics.byType[notificationType]) {
      metrics.byType[notificationType] = { opened: 0, clicked: 0, unsubscribed: 0 }
    }
    metrics.byType[notificationType][eventType === 'open' ? 'opened' : 
                                     eventType === 'click' ? 'clicked' : 'unsubscribed']++

    // Calculate rates
    metrics.openRate = metrics.totalSent > 0 ? metrics.totalOpened / metrics.totalSent : 0
    metrics.clickRate = metrics.totalOpened > 0 ? metrics.totalClicked / metrics.totalOpened : 0
    metrics.unsubscribeRate = metrics.totalSent > 0 ? metrics.totalUnsubscribed / metrics.totalSent : 0

    await safeAwait(
      supabase
        .from('user_engagement_metrics')
        .upsert({
          user_id: userId,
          metrics,
          last_engagement: new Date(),
          updated_at: new Date()
        })
    )

  } catch (error) {
    logger.error('Failed to update user engagement metrics', { userId, eventType, error })
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    webhooks: {
      providers: ['resend', 'sendgrid', 'twilio', 'firebase'],
      events: ['delivery', 'bounce', 'complaint', 'open', 'click', 'unsubscribe']
    }
  })
}
 
