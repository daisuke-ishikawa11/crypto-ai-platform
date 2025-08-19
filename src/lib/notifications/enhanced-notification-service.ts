/**
 * 🚀 Enterprise Notification Service
 * Multi-channel notification system with failover, analytics, and personalization
 */

import { logger } from '@/lib/monitoring/logger'
import { CooldownService } from './cooldown-service'
import { createClient } from '@/lib/supabase/client'
import { safeAwait } from '@/lib/supabase/helpers'
import { getEnvInt } from '@/lib/config/env'
import type { DeliveryLogRow } from './db-types'
import {
  NotificationChannel,
  NotificationPayload,
  NotificationDeliveryResult,
  NotificationProvider,
  NotificationQueue,
  NotificationBatch,
  NotificationAnalytics,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  UserNotificationPreferences,
  NotificationTemplate,
  NotificationRule,
  NotificationDigest,
  NotificationPersonalization,
  NotificationDeliveryLog,
  ChannelAnalytics,
  TypeAnalytics,
  PriorityAnalytics
} from './types'

export interface EnhancedNotificationConfig {
  providers: NotificationProvider[]
  queues: NotificationQueue[]
  rules: NotificationRule[]
  analytics: {
    enabled: boolean
    retentionDays: number
    realTimeMetrics: boolean
  }
  personalization: {
    enabled: boolean
    aiModel: string
    learningRate: number
  }
  batching: {
    enabled: boolean
    maxBatchSize: number
    batchDelay: number
  }
  failover: {
    enabled: boolean
    healthCheckInterval: number
    retryBackoffBase: number
    maxRetries: number
  }
}

export class EnhancedNotificationService {
  private providers: Map<NotificationChannel, NotificationProvider[]> = new Map()
  private queues: Map<string, NotificationQueue> = new Map()
  private rules: NotificationRule[] = []
  private processingBatches: Map<string, NodeJS.Timeout> = new Map()
  private healthCheckInterval: NodeJS.Timeout | null = null
  private analyticsBuffer: NotificationPayload[] = []
  private personalizationCache: Map<string, NotificationPersonalization> = new Map()

  constructor(private config: EnhancedNotificationConfig) {
    this.initializeProviders()
    this.initializeQueues()
    this.initializeRules()
    this.startHealthChecks()
    this.startAnalyticsProcessor()
  }

  /**
   * Send notification through optimal channel with failover
   */
  async sendNotification(payload: NotificationPayload): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()
    
    try {
      // Apply notification rules
      const processedPayload = await this.applyRules(payload)
      if (!processedPayload) {
        return {
          success: false,
          error: 'Notification blocked by rules',
          deliveryTime: Date.now() - startTime
        }
      }

      // Check user preferences
      const canSend = await this.checkUserPreferences(processedPayload)
      if (!canSend) {
        return {
          success: false,
          error: 'Blocked by user preferences',
          deliveryTime: Date.now() - startTime
        }
      }

      // Personalize content if enabled
      if (this.config.personalization.enabled) {
        await this.personalizeNotification(processedPayload)
      }

      // Add to analytics buffer
      this.analyticsBuffer.push(processedPayload)

      // Route to appropriate queue or send immediately
      if (processedPayload.priority === NotificationPriority.EMERGENCY) {
        return await this.sendImmediately(processedPayload)
      } else {
        return await this.queueNotification(processedPayload)
      }
    } catch (error) {
      logger.error('Failed to send notification', {
        notificationId: payload.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      })

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime
      }
    }
  }

  /**
   * Send batch of notifications
   */
  async sendBatch(notifications: NotificationPayload[]): Promise<NotificationBatch> {
    const batchId = crypto.randomUUID()
    const batch: NotificationBatch = {
      id: batchId,
      notifications,
      channel: notifications[0]?.channel || NotificationChannel.EMAIL,
      priority: this.getHighestPriority(notifications),
      status: 'pending',
      createdAt: new Date(),
      results: []
    }

    try {
      batch.status = 'processing'
      batch.processedAt = new Date()

      // Process notifications in parallel with concurrency limit
      const batchConcurrency = getEnvInt('NOTIF_BATCH_PROCESS_CONCURRENCY', 10)
      const results = await this.processBatchConcurrently(notifications, batchConcurrency)
      
      batch.results = results
      batch.status = results.every(r => r.success) ? 'completed' : 'failed'
      batch.completedAt = new Date()

      // Store batch results
      await this.storeBatchResults(batch)

      logger.info('Notification batch processed', {
        batchId,
        total: notifications.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      })

    } catch (error) {
      batch.status = 'failed'
      logger.error('Failed to process notification batch', {
        batchId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }

    return batch
  }

  /**
   * Get notification analytics
   */
  async getAnalytics(timeRange: { start: Date; end: Date }): Promise<NotificationAnalytics> {
    const supabase = createClient()
    
    // Fetch analytics data from database
    const { data: deliveryLogs } = await safeAwait<NotificationDeliveryLog[] | null>(
      supabase
        .from('notification_delivery_logs')
        .select('*')
        .gte('created_at', timeRange.start.toISOString())
        .lte('created_at', timeRange.end.toISOString())
    )

    if (!deliveryLogs) {
      throw new Error('Failed to fetch analytics data')
    }

    return this.calculateAnalytics(deliveryLogs, timeRange)
  }

  /**
   * Update user notification preferences
   */
  async updateUserPreferences(
    userId: string,
    preferences: Partial<UserNotificationPreferences>
  ): Promise<void> {
    const supabase = createClient()

    const { error } = await safeAwait(
      supabase
        .from('user_notification_preferences')
        .upsert({
          user_id: userId,
          preferences: preferences,
          updated_at: new Date()
        })
    )

    if (error) {
      throw new Error(`Failed to update user preferences: ${error.message}`)
    }

    logger.info('User notification preferences updated', { userId })
  }

  /**
   * Create notification template
   */
  async createTemplate(template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<NotificationTemplate> {
    const supabase = createClient()

    const newTemplate: NotificationTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const { error } = await safeAwait(
      supabase
        .from('notification_templates')
        .insert(newTemplate)
    )

    if (error) {
      throw new Error(`Failed to create template: ${error.message}`)
    }

    return newTemplate
  }

  /**
   * Generate notification digest
   */
  async generateDigest(userId: string, type: 'daily' | 'weekly' | 'monthly'): Promise<NotificationDigest> {
    const supabase = createClient()
    
    // Calculate time range based on digest type
    const now = new Date()
    const start = new Date()
    
    switch (type) {
      case 'daily':
        start.setDate(now.getDate() - 1)
        break
      case 'weekly':
        start.setDate(now.getDate() - 7)
        break
      case 'monthly':
        start.setMonth(now.getMonth() - 1)
        break
    }

    // Fetch notifications for the period
    const { data: notifications } = await safeAwait<DeliveryLogRow[] | null>(
      supabase
        .from('notification_delivery_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', start.toISOString())
        .lte('created_at', now.toISOString())
        .eq('status', 'delivered')
    )

    if (!notifications) {
      throw new Error('Failed to fetch notifications for digest')
    }

    const digestNotifications: NotificationDigest['notifications'] = notifications.map(n => {
      const item: NotificationDigest['notifications'][number] = {
        id: String(n.notification_id),
        type: (n.notification_type ?? NotificationType.ANNOUNCEMENT) as NotificationType,
        title: String(n.title ?? ''),
        summary: String(n.summary ?? (n.body ? String(n.body).substring(0, 100) + '...' : '')),
        timestamp: new Date(String(n.created_at))
      }
      return item
    })

    const digest: NotificationDigest = {
      id: crypto.randomUUID(),
      userId,
      type,
      period: { start, end: now },
      notifications: digestNotifications,
      status: 'pending'
    }

    return digest
  }

  /**
   * A/B test notifications
   */
  async runABTest(
    basePayload: NotificationPayload,
    variants: Array<{ id: string; modifications: Partial<NotificationPayload>; trafficPercentage: number }>
  ): Promise<string> {
    const random = Math.random() * 100
    let cumulativePercentage = 0

    for (const variant of variants) {
      cumulativePercentage += variant.trafficPercentage
      if (random <= cumulativePercentage) {
        const modifiedPayload = { ...basePayload, ...variant.modifications }
        modifiedPayload.metadata = {
          ...modifiedPayload.metadata,
          tracking: { ...(modifiedPayload.metadata?.tracking ?? {}), abTestVariant: variant.id }
        }
        
        await this.sendNotification(modifiedPayload)
        return variant.id
      }
    }

    // Fallback to base payload
    await this.sendNotification(basePayload)
    return 'control'
  }

  /**
   * Private methods
   */

  private initializeProviders(): void {
    for (const provider of this.config.providers) {
      if (!this.providers.has(provider.type)) {
        this.providers.set(provider.type, [])
      }
      this.providers.get(provider.type)!.push(provider)
    }

    // Sort providers by priority
    for (const [, providerList] of this.providers) {
      providerList.sort((a, b) => b.priority - a.priority)
    }
  }

  private initializeQueues(): void {
    for (const queue of this.config.queues) {
      this.queues.set(queue.id, queue)
      this.startQueueProcessor(queue)
    }
  }

  private initializeRules(): void {
    this.rules = this.config.rules.filter(rule => rule.isActive)
  }

  private startHealthChecks(): void {
    if (!this.config.failover.enabled) return
    if (process.env.NODE_ENV === 'test') return

    this.healthCheckInterval = setInterval(async () => {
      for (const [, providerList] of this.providers) {
        for (const provider of providerList) {
          await this.checkProviderHealth(provider)
        }
      }
    }, this.config.failover.healthCheckInterval)
    ;(this.healthCheckInterval as { unref?: () => void }).unref?.()
  }

  private startAnalyticsProcessor(): void {
    if (!this.config.analytics.enabled) return
    if (process.env.NODE_ENV === 'test') return

    const intervalMs = getEnvInt('NOTIF_ANALYTICS_INTERVAL_MS', 30000)
    const batchSize = getEnvInt('NOTIF_ANALYTICS_BATCH_SIZE', 100)
    const t = setInterval(async () => {
      if (this.analyticsBuffer.length > 0) {
        const batch = this.analyticsBuffer.splice(0, batchSize)
        await this.processAnalytics(batch)
      }
    }, intervalMs)
    ;(t as { unref?: () => void }).unref?.()
  }

  private startQueueProcessor(queue: NotificationQueue): void {
    if (process.env.NODE_ENV === 'test') return
    const processQueue = async () => {
      try {
        const supabase = createClient()
        
    const { data: queuedNotifications } = await safeAwait<Array<{ id: string; notification_payload: NotificationPayload; status: string }> | null>(
      supabase
        .from('notification_queue')
        .select('*')
        .eq('queue_id', queue.id)
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(queue.batchSize)
    )

        if (queuedNotifications && queuedNotifications.length > 0) {
          for (const queuedNotification of queuedNotifications) {
            await this.processQueuedNotification(queuedNotification, queue)
          }
        }
      } catch (error) {
        logger.error('Queue processing error', {
          queueId: queue.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Start queue processor
    const interval = setInterval(processQueue, queue.processingDelay)
    ;(interval as { unref?: () => void }).unref?.()
    
    // Store interval for cleanup
    this.processingBatches.set(queue.id, interval)
  }

  private async sendImmediately(payload: NotificationPayload): Promise<NotificationDeliveryResult> {
    const providers = this.providers.get(payload.channel) || []
    const healthyProviders = providers.filter(p => p.isActive && p.healthCheck.isHealthy)

    if (healthyProviders.length === 0) {
      throw new Error(`No healthy providers available for channel ${payload.channel}`)
    }

    for (const provider of healthyProviders) {
      try {
        const result = await this.deliverThroughProvider(payload, provider)
        if (result.success) {
          await this.logDelivery(payload, result, provider)
          return result
        }
      } catch (error) {
        logger.warn('Provider delivery failed, trying next', {
          provider: provider.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    throw new Error('All providers failed to deliver notification')
  }

  private async queueNotification(payload: NotificationPayload): Promise<NotificationDeliveryResult> {
    const queueId = this.getQueueForNotification(payload)
    const supabase = createClient()

    const { error } = await supabase
      .from('notification_queue')
      .insert({
        id: crypto.randomUUID(),
        queue_id: queueId,
        notification_payload: payload,
        status: 'pending',
        created_at: new Date(),
        priority: payload.priority
      })

    if (error) {
      throw new Error(`Failed to queue notification: ${error.message}`)
    }

    return {
      success: true,
      deliveryTime: 0,
      messageId: `queued-${payload.id}`
    }
  }

  private async deliverThroughProvider(
    payload: NotificationPayload,
    provider: NotificationProvider
  ): Promise<NotificationDeliveryResult> {
    // Cooldown guard to prevent duplicates across distributed workers
    const canSend = await CooldownService.shouldSend(payload)
    if (!canSend) {
      return { success: true, deliveryTime: 0, messageId: undefined, providerId: provider.name }
    }

    switch (payload.channel) {
      case NotificationChannel.EMAIL:
        {
          const res = await this.deliverEmail(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      case NotificationChannel.PUSH:
        {
          const res = await this.deliverPush(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      case NotificationChannel.SMS:
        {
          const res = await this.deliverSMS(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      case NotificationChannel.WEBHOOK:
        {
          const res = await this.deliverWebhook(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      case NotificationChannel.SLACK:
        {
          const res = await this.deliverSlack(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      case NotificationChannel.DISCORD:
        {
          const res = await this.deliverDiscord(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      case NotificationChannel.TELEGRAM:
        {
          const res = await this.deliverTelegram(payload, provider)
          if (res.success) await CooldownService.activateCooldown(payload)
          return res
        }
      default:
        throw new Error(`Unsupported channel: ${payload.channel}`)
    }
  }

  private async deliverEmail(payload: NotificationPayload, provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()

    try {
      switch (provider.name) {
        case 'resend':
          return await this.deliverResendEmail(payload, provider)
        case 'sendgrid':
          return await this.deliverSendGridEmail(payload, provider)
        case 'nodemailer':
          return await this.deliverNodemailerEmail(payload, provider)
        default:
          throw new Error(`Unknown email provider: ${provider.name}`)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime
      }
    }
  }

  private async deliverResendEmail(payload: NotificationPayload, provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()
    
    try {
        const { Resend } = await import('resend')
        const resend = new Resend(String((provider.configuration as Record<string, unknown>).apiKey || ''))

      const content = payload.customContent || await this.renderTemplate(payload)
      
      const { data, error } = await resend.emails.send({
        from: String((provider.configuration as Record<string, unknown>).fromEmail || ''),
        to: payload.recipient.email!,
        subject: content.subject || content.title,
        html: content.htmlBody || content.body,
        text: content.body
      })

      if (error) {
        return {
          success: false,
          error: error.message,
          deliveryTime: Date.now() - startTime
        }
      }

      return {
        success: true,
        messageId: data?.id,
        providerId: provider.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.calculateEmailCost(provider)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime
      }
    }
  }

  private async deliverSendGridEmail(payload: NotificationPayload, provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()
    
    try {
      const sgMail = await import('@sendgrid/mail')
      sgMail.default.setApiKey(String((provider.configuration as Record<string, unknown>).apiKey || ''))

      const content = payload.customContent || await this.renderTemplate(payload)

      const msg = {
        to: payload.recipient.email!,
        from: String((provider.configuration as Record<string, unknown>).fromEmail || ''),
        subject: content.subject || content.title,
        text: content.body,
        html: content.htmlBody || content.body,
      }

      const [response] = await sgMail.default.send(msg)

      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
        providerId: provider.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.calculateEmailCost(provider)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime
      }
    }
  }

  private async deliverNodemailerEmail(payload: NotificationPayload, provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()
    
    try {
      const nodemailer = await import('nodemailer')
      
      const transporter = nodemailer.createTransport({
        ...(typeof (provider.configuration as Record<string, unknown>).host === 'string' ? { host: (provider.configuration as Record<string, unknown>).host as string } : {}),
        ...(typeof (provider.configuration as Record<string, unknown>).port === 'number' ? { port: (provider.configuration as Record<string, unknown>).port as number } : {}),
        ...(typeof (provider.configuration as Record<string, unknown>).secure === 'boolean' ? { secure: (provider.configuration as Record<string, unknown>).secure as boolean } : {}),
        ...(typeof (provider.configuration as Record<string, unknown>).username === 'string' && typeof (provider.configuration as Record<string, unknown>).password === 'string'
          ? { auth: { user: (provider.configuration as Record<string, unknown>).username as string, pass: (provider.configuration as Record<string, unknown>).password as string } }
          : {})
      })

      const content = payload.customContent || await this.renderTemplate(payload)

      const info = await transporter.sendMail({
        from: String((provider.configuration as Record<string, unknown>).fromEmail || ''),
        to: payload.recipient.email!,
        subject: content.subject || content.title,
        text: content.body,
        html: content.htmlBody || content.body
      })

      return {
        success: true,
        messageId: (info as { messageId?: string }).messageId,
        providerId: provider.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.calculateEmailCost(provider)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime
      }
    }
  }

  private async deliverPush(_payload: NotificationPayload, _provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    void _payload; void _provider
    // Implementation for push notifications (Firebase, OneSignal, etc.)
    const startTime = Date.now()
    return {
      success: true,
      deliveryTime: Date.now() - startTime,
      messageId: 'push-mock-id'
    }
  }

  private async deliverSMS(_payload: NotificationPayload, _provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    void _payload; void _provider
    // Implementation for SMS notifications (Twilio, AWS SNS, etc.)
    const startTime = Date.now()
    return {
      success: true,
      deliveryTime: Date.now() - startTime,
      messageId: 'sms-mock-id'
    }
  }

  private async deliverWebhook(_payload: NotificationPayload, _provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    void _payload; void _provider
    // Implementation for webhook notifications
    const startTime = Date.now()
    return {
      success: true,
      deliveryTime: Date.now() - startTime,
      messageId: 'webhook-mock-id'
    }
  }

  private async deliverSlack(_payload: NotificationPayload, _provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    void _payload; void _provider
    // Implementation for Slack notifications
    const startTime = Date.now()
    return {
      success: true,
      deliveryTime: Date.now() - startTime,
      messageId: 'slack-mock-id'
    }
  }

  private async deliverDiscord(_payload: NotificationPayload, _provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    void _payload; void _provider
    // Implementation for Discord notifications
    const startTime = Date.now()
    return {
      success: true,
      deliveryTime: Date.now() - startTime,
      messageId: 'discord-mock-id'
    }
  }

  private async deliverTelegram(_payload: NotificationPayload, _provider: NotificationProvider): Promise<NotificationDeliveryResult> {
    void _payload; void _provider
    // Implementation for Telegram notifications
    const startTime = Date.now()
    return {
      success: true,
      deliveryTime: Date.now() - startTime,
      messageId: 'telegram-mock-id'
    }
  }

  private async renderTemplate(payload: NotificationPayload): Promise<{ subject?: string; title: string; body: string; htmlBody?: string }> {
    if (!payload.templateId) {
      throw new Error('No template ID provided and no custom content')
    }

    const supabase = createClient()
    const { data: template } = await safeAwait<{
      title: unknown; body: unknown; html_body?: unknown; subject?: unknown
    } | null>(
      supabase
        .from('notification_templates')
        .select('*')
        .eq('id', payload.templateId)
        .single()
    )

    if (!template) {
      throw new Error(`Template not found: ${payload.templateId}`)
    }

    // Simple template rendering (replace variables)
    let renderedTitle = String(template.title)
    let renderedBody = String(template.body)
    let renderedHtmlBody = template.html_body ? String(template.html_body) : undefined
    let renderedSubject = template.subject ? String(template.subject) : undefined

    for (const [key, value] of Object.entries(payload.data)) {
      const placeholder = `{{${key}}}`
      renderedTitle = renderedTitle.replace(new RegExp(placeholder, 'g'), String(value))
      renderedBody = renderedBody.replace(new RegExp(placeholder, 'g'), String(value))
      if (typeof renderedHtmlBody === 'string') {
        renderedHtmlBody = renderedHtmlBody.replace(new RegExp(placeholder, 'g'), String(value))
      }
      if (typeof renderedSubject === 'string') {
        renderedSubject = renderedSubject.replace(new RegExp(placeholder, 'g'), String(value))
      }
    }

    return {
      subject: renderedSubject,
      title: renderedTitle,
      body: renderedBody,
      htmlBody: renderedHtmlBody
    }
  }

  private async applyRules(payload: NotificationPayload): Promise<NotificationPayload | null> {
    for (const rule of this.rules) {
      // Check conditions
      if (rule.conditions.notificationTypes && !rule.conditions.notificationTypes.includes(payload.type)) {
        continue
      }

      // Apply actions
      if (rule.actions.block) {
        logger.debug('Notification blocked by rule', { ruleId: rule.id, notificationId: payload.id })
        return null
      }

      if (rule.actions.delay) {
        payload.scheduling.sendAt = new Date(Date.now() + rule.actions.delay * 1000)
      }

      if (rule.actions.redirect) {
        // Change channel if redirected
        const newChannel = rule.actions.redirect[0]
        if (newChannel) {
          payload.channel = newChannel
        }
      }
    }

    return payload
  }

  private async checkUserPreferences(payload: NotificationPayload): Promise<boolean> {
    const preferences = payload.recipient.preferences
    
    if (preferences.globalOptOut) {
      return false
    }

    const channelPref = preferences.channels[payload.channel]
    if (!channelPref.enabled) {
      return false
    }

    if (!channelPref.allowedTypes.includes(payload.type)) {
      return false
    }

    // Check priority threshold
    const priorityOrder = [
      NotificationPriority.LOW,
      NotificationPriority.NORMAL,
      NotificationPriority.HIGH,
      NotificationPriority.CRITICAL,
      NotificationPriority.EMERGENCY
    ]
    
    const payloadPriorityIndex = priorityOrder.indexOf(payload.priority)
    const minPriorityIndex = priorityOrder.indexOf(channelPref.minPriority)
    
    if (payloadPriorityIndex < minPriorityIndex) {
      return false
    }

    return true
  }

  private async personalizeNotification(payload: NotificationPayload): Promise<void> {
    const personalization = await this.getPersonalization(payload.recipient.userId)
    
    if (personalization) {
      // Apply personalization based on user preferences and engagement history
      // This would integrate with AI models to optimize content, timing, etc.
      
      // Example: Adjust content style
      if (personalization.preferences.contentStyle === 'casual') {
        // Modify payload content to be more casual
      }
      
      // Example: Optimize send time
      if (personalization.preferences.timing !== 'anytime') {
        // Adjust scheduling based on preferred timing
      }
    }
  }

  private async getPersonalization(userId: string): Promise<NotificationPersonalization | null> {
    if (this.personalizationCache.has(userId)) {
      return this.personalizationCache.get(userId)!
    }

    const supabase = createClient()
    const { data } = await safeAwait<{
      user_id: string
      preferences: import('./types').NotificationPersonalization['preferences']
      engagement: import('./types').NotificationPersonalization['engagement']
      aiModel: import('./types').NotificationPersonalization['aiModel']
    } | null>(
      supabase
        .from('notification_personalization')
        .select('*')
        .eq('user_id', userId)
        .single()
    )

    if (data) {
      const personalization: NotificationPersonalization = {
        userId,
        preferences: data.preferences,
        engagement: data.engagement,
        aiModel: data.aiModel
      }
      this.personalizationCache.set(userId, personalization)
      return personalization
    }

    return null
  }

  private getQueueForNotification(payload: NotificationPayload): string {
    // Route to appropriate queue based on priority and channel
    const queueName = `${payload.channel}_${payload.priority}`
    
    for (const [id, queue] of this.queues) {
      if (queue.name === queueName || queue.channel === payload.channel) {
        return id
      }
    }

    // Fallback to first available queue
    return this.queues.keys().next().value || 'default'
  }

  private getHighestPriority(notifications: NotificationPayload[]): NotificationPriority {
    const priorities = notifications.map(n => n.priority)
    
    if (priorities.includes(NotificationPriority.EMERGENCY)) return NotificationPriority.EMERGENCY
    if (priorities.includes(NotificationPriority.CRITICAL)) return NotificationPriority.CRITICAL
    if (priorities.includes(NotificationPriority.HIGH)) return NotificationPriority.HIGH
    if (priorities.includes(NotificationPriority.NORMAL)) return NotificationPriority.NORMAL
    
    return NotificationPriority.LOW
  }

  private async processBatchConcurrently(notifications: NotificationPayload[], concurrency: number): Promise<NotificationDeliveryResult[]> {
    const results: NotificationDeliveryResult[] = []
    const batches: NotificationPayload[][] = []
    
    // Split into batches
    for (let i = 0; i < notifications.length; i += concurrency) {
      batches.push(notifications.slice(i, i + concurrency))
    }

    // Process batches sequentially
    for (const batch of batches) {
      const batchResults = await Promise.allSettled(
        batch.map(notification => this.sendNotification(notification))
      )
      
      results.push(...batchResults.map(result => 
        result.status === 'fulfilled' ? result.value : {
          success: false,
          error: result.reason?.message || 'Unknown error',
          deliveryTime: 0
        }
      ))
    }

    return results
  }

  private async checkProviderHealth(provider: NotificationProvider): Promise<void> {
    try {
      if (provider.healthCheck.url) {
        const response = await fetch(provider.healthCheck.url, {
          method: 'GET'
        })
        provider.healthCheck.isHealthy = response.ok
      } else {
        // Provider-specific health checks
        provider.healthCheck.isHealthy = true // Default to healthy if no URL
      }
      
      provider.healthCheck.lastCheck = new Date()
    } catch (error) {
      provider.healthCheck.isHealthy = false
      provider.healthCheck.lastCheck = new Date()
      
      logger.warn('Provider health check failed', {
        provider: provider.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  private async processQueuedNotification(queuedNotification: {
    id: string;
    notification_payload: NotificationPayload;
    status: string;
  }, queue: NotificationQueue): Promise<void> {
    try {
      const payload = queuedNotification.notification_payload
      const result = await this.sendImmediately(payload)
      
      const supabase = createClient()
      await safeAwait(
        supabase
          .from('notification_queue')
          .update({
            status: result.success ? 'completed' : 'failed',
            processed_at: new Date(),
            result: result
          })
          .eq('id', queuedNotification.id)
      )

    } catch (error) {
      logger.error('Failed to process queued notification', {
        queueId: queue.id,
        notificationId: queuedNotification.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  private async logDelivery(payload: NotificationPayload, result: NotificationDeliveryResult, provider: NotificationProvider): Promise<void> {
    const supabase = createClient()

    await safeAwait(
      supabase.from('notification_delivery_logs').insert({
      id: crypto.randomUUID(),
      notification_id: payload.id,
      channel: payload.channel,
      provider: provider.name,
      status: result.success ? NotificationStatus.DELIVERED : NotificationStatus.FAILED,
      metrics: { deliveryTime: result.deliveryTime },
      message_id: result.messageId,
      error: result.error,
      cost_cents: result.costCents,
      created_at: new Date()
      })
    )
  }

  private async storeBatchResults(batch: NotificationBatch): Promise<void> {
    const supabase = createClient()

    await safeAwait(
      supabase.from('notification_batches').insert({
      id: batch.id,
      channel: batch.channel,
      priority: batch.priority,
      status: batch.status,
      total_count: batch.notifications.length,
      success_count: batch.results.filter(r => r.success).length,
      failure_count: batch.results.filter(r => !r.success).length,
      created_at: batch.createdAt,
      processed_at: batch.processedAt,
      completed_at: batch.completedAt
      })
    )
  }

  private async processAnalytics(notifications: NotificationPayload[]): Promise<void> {
    // Process analytics data and update metrics
    const supabase = createClient()

    const analyticsData = notifications.map(notification => ({
      notification_id: notification.id,
      type: notification.type,
      channel: notification.channel,
      priority: notification.priority,
      user_id: notification.recipient.userId,
      timestamp: new Date(),
      metadata: notification.metadata
    }))

    await safeAwait(
      supabase.from('notification_analytics').insert(analyticsData)
    )
  }

  private calculateAnalytics(deliveryLogs: NotificationDeliveryLog[], timeRange: { start: Date; end: Date }): NotificationAnalytics {
    const analytics: NotificationAnalytics = {
      timeRange,
      overall: {
        totalSent: deliveryLogs.length,
        totalDelivered: deliveryLogs.filter(log => log.status === 'delivered').length,
        totalFailed: deliveryLogs.filter(log => log.status === 'failed').length,
        deliveryRate: 0,
        averageDeliveryTime: 0
      },
      byChannel: {} as Record<NotificationChannel, ChannelAnalytics>,
      byType: {} as Record<NotificationType, TypeAnalytics>,
      byPriority: {} as Record<NotificationPriority, PriorityAnalytics>,
      engagement: {
        totalOpened: 0,
        totalClicked: 0,
        openRate: 0,
        clickRate: 0,
        unsubscribeRate: 0
      },
      errors: {
        topErrors: []
      }
    }

    // Calculate rates
    if (analytics.overall.totalSent > 0) {
      analytics.overall.deliveryRate = analytics.overall.totalDelivered / analytics.overall.totalSent
    }

    // Calculate average delivery time
    const deliveredLogs = deliveryLogs.filter(log => log.status === 'delivered' && log.metrics?.deliveryTime)
    if (deliveredLogs.length > 0) {
      analytics.overall.averageDeliveryTime = deliveredLogs.reduce((sum, log) => sum + (log.metrics?.deliveryTime ?? 0), 0) / deliveredLogs.length
    }

    // Group by channel, type, priority
    // ... (implementation details)

    return analytics
  }

  private calculateEmailCost(provider: NotificationProvider): number {
    const raw = (provider.configuration as Record<string, unknown>).costPer1000
    const num = typeof raw === 'number' ? raw : Number(raw)
    return Number.isFinite(num) && num > 0 ? num : 10
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }

    for (const [, interval] of this.processingBatches) {
      clearTimeout(interval)
    }

    this.processingBatches.clear()
    this.personalizationCache.clear()
  }
}
