/**
 * 📧 Email Provider Integrations
 * Unified email sending with multiple provider support and failover
 */

import { logger } from '@/lib/monitoring/logger'
import { NotificationDeliveryResult } from '../types'
import type { SESv2Client } from '@aws-sdk/client-sesv2'
import type { Transporter } from 'nodemailer'
import type { Resend } from 'resend'

export interface EmailMessage {
  to: string | string[]
  from?: string
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    content: string | Buffer
    contentType?: string
  }>
  metadata?: Record<string, unknown>
  tags?: string[]
  scheduledFor?: Date
}

export interface EmailProvider {
  name: string
  priority: number
  isHealthy: boolean
  rateLimits: {
    perSecond: number
    perMinute: number
    perHour: number
    perDay: number
  }
  costPerEmail: number // in cents
  send(message: EmailMessage): Promise<NotificationDeliveryResult>
  getStatus(): Promise<{ healthy: boolean; lastCheck: Date; error?: string }>
}

// Resend Provider
export class ResendProvider implements EmailProvider {
  name = 'resend'
  priority = 90
  isHealthy = true
  rateLimits = { perSecond: 14, perMinute: 100, perHour: 5000, perDay: 50000 }
  costPerEmail = 0.1 // $0.001 per email

  private client: Resend | null = null
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(message: EmailMessage): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()

    try {
      if (!this.client) {
        const { Resend } = await import('resend')
        this.client = new Resend(this.apiKey)
      }

      const { data, error } = await this.client.emails.send({
        from: message.from || process.env.RESEND_FROM_EMAIL || 'notifications@crypto-ai-platform.com',
        to: Array.isArray(message.to) ? message.to : [message.to],
        subject: message.subject,
        text: message.text || '',
        html: message.html,
        attachments: message.attachments,
        // Resend tags
        tags: (message.tags || []).map(t => ({ name: 'category', value: t })),
        scheduledAt: message.scheduledFor?.toISOString()
      })
      if (error) {
        throw new Error(`Resend API error: ${error.message}`)
      }

      return {
        success: true,
        messageId: data?.id,
        providerId: this.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.costPerEmail
      }

    } catch (error) {
      this.isHealthy = false
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime,
        providerId: this.name
      }
    }
  }

  async getStatus(): Promise<{ healthy: boolean; lastCheck: Date; error?: string }> {
    try {
      if (!this.client) {
        const { Resend } = await import('resend')
        this.client = new Resend(this.apiKey)
      }

      // Test with a minimal request
      await this.client.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'test@crypto-ai-platform.com',
        to: ['test@example.com'],
        subject: 'Health Check',
        text: 'This is a health check email',
        // Resend SDKの型にはdry_runがないため削除（テストはサンドボックスで対応）
      })

      this.isHealthy = true
      return { healthy: true, lastCheck: new Date() }

    } catch (error) {
      this.isHealthy = false
      return {
        healthy: false,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// SendGrid Provider
export class SendGridProvider implements EmailProvider {
  name = 'sendgrid'
  priority = 85
  isHealthy = true
  rateLimits = { perSecond: 100, perMinute: 600, perHour: 12000, perDay: 100000 }
  costPerEmail = 0.095 // $0.00095 per email

  private client: import('@sendgrid/mail').MailService | null = null
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(message: EmailMessage): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()

    try {
      const sgMail = await import('@sendgrid/mail')
      sgMail.default.setApiKey(this.apiKey)

      const msg = {
        to: message.to,
        from: message.from || process.env.SENDGRID_FROM_EMAIL || 'notifications@crypto-ai-platform.com',
        subject: message.subject,
        content: [
          ...(message.text ? [{ type: 'text/plain', value: message.text }] : []),
          ...(message.html ? [{ type: 'text/html', value: message.html }] : [])
        ],
        attachments: message.attachments?.map(att => ({
          content: Buffer.isBuffer(att.content) ? att.content.toString('base64') : (att.content as string),
          filename: att.filename,
          type: att.contentType,
          disposition: 'attachment'
        })),
        customArgs: message.metadata as Record<string, string>,
        categories: message.tags
      }

      const mailData = msg as import('@sendgrid/mail').MailDataRequired
      const [response] = await sgMail.default.send(mailData)

      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
        providerId: this.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.costPerEmail
      }

    } catch (error) {
      this.isHealthy = false

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime,
        providerId: this.name
      }
    }
  }

  async getStatus(): Promise<{ healthy: boolean; lastCheck: Date; error?: string }> {
    try {
      // SendGrid doesn't have a dedicated health check endpoint
      // We'll use the stats endpoint instead
      const response = await fetch('https://api.sendgrid.com/v3/stats', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        this.isHealthy = true
        return { healthy: true, lastCheck: new Date() }
      } else {
        throw new Error(`SendGrid API returned status ${response.status}`)
      }

    } catch (error) {
      this.isHealthy = false
      return {
        healthy: false,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// AWS SES Provider
export class AWSESProvider implements EmailProvider {
  name = 'aws-ses'
  priority = 80
  isHealthy = true
  rateLimits = { perSecond: 14, perMinute: 200, perHour: 1000, perDay: 50000 }
  costPerEmail = 0.01 // $0.0001 per email

  private client: SESv2Client | null = null
  private region: string

  constructor(region = 'us-east-1') {
    this.region = region
  }

  async send(message: EmailMessage): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()

    try {
      if (!this.client) {
        const { SESv2Client } = await import('@aws-sdk/client-sesv2')
        this.client = new SESv2Client({ 
          region: this.region,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
          }
        })
      }

      const { SendEmailCommand } = await import('@aws-sdk/client-sesv2')
      
      const command = new SendEmailCommand({
        FromEmailAddress: message.from || process.env.AWS_SES_FROM_EMAIL,
        Destination: {
          ToAddresses: Array.isArray(message.to) ? message.to : [message.to]
        },
        Content: {
          Simple: {
            Subject: {
              Data: message.subject,
              Charset: 'UTF-8'
            },
            Body: {
              Text: message.text ? {
                Data: message.text,
                Charset: 'UTF-8'
              } : undefined,
              Html: message.html ? {
                Data: message.html,
                Charset: 'UTF-8'
              } : undefined
            }
          }
        },
        EmailTags: message.tags?.map(tag => ({
          Name: 'category',
          Value: tag
        }))
      })

      const response = await this.client.send(command)

      return {
        success: true,
        messageId: response.MessageId,
        providerId: this.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.costPerEmail
      }

    } catch (error) {
      this.isHealthy = false

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime,
        providerId: this.name
      }
    }
  }

  async getStatus(): Promise<{ healthy: boolean; lastCheck: Date; error?: string }> {
    try {
      if (!this.client) {
        const { SESv2Client } = await import('@aws-sdk/client-sesv2')
        this.client = new SESv2Client({ 
          region: this.region,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
          }
        })
      }

      const { GetAccountCommand } = await import('@aws-sdk/client-sesv2')
      await this.client.send(new GetAccountCommand({}))

      this.isHealthy = true
      return { healthy: true, lastCheck: new Date() }

    } catch (error) {
      this.isHealthy = false
      return {
        healthy: false,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// Nodemailer Provider (SMTP)
export class NodemailerProvider implements EmailProvider {
  name = 'nodemailer'
  priority = 75
  isHealthy = true
  rateLimits = { perSecond: 5, perMinute: 100, perHour: 1000, perDay: 10000 }
  costPerEmail = 0 // Self-hosted SMTP

  private transporter: Transporter | null = null
  private config: {
    host: string
    port: number
    secure: boolean
    auth: { user: string; pass: string }
  }

  constructor(config: {
    host: string
    port: number
    secure: boolean
    auth: { user: string; pass: string }
  }) {
    this.config = config
  }

  async send(message: EmailMessage): Promise<NotificationDeliveryResult> {
    const startTime = Date.now()

    try {
      if (!this.transporter) {
        const nodemailer = await import('nodemailer')
        this.transporter = nodemailer.createTransport({
          host: this.config.host,
          port: this.config.port,
          secure: this.config.secure,
          auth: this.config.auth,
          pool: true,
          maxConnections: 5,
          maxMessages: 100
        })
      }

      const info = await this.transporter.sendMail({
        from: message.from || process.env.SMTP_FROM_EMAIL,
        to: Array.isArray(message.to) ? message.to.join(',') : message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments
      })

      return {
        success: true,
        messageId: info.messageId,
        providerId: this.name,
        deliveryTime: Date.now() - startTime,
        costCents: this.costPerEmail
      }

    } catch (error) {
      this.isHealthy = false

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        deliveryTime: Date.now() - startTime,
        providerId: this.name
      }
    }
  }

  async getStatus(): Promise<{ healthy: boolean; lastCheck: Date; error?: string }> {
    try {
      if (!this.transporter) {
        const nodemailer = await import('nodemailer')
        this.transporter = nodemailer.createTransport({
          host: this.config.host,
          port: this.config.port,
          secure: this.config.secure,
          auth: this.config.auth
        })
      }

      await this.transporter.verify()

      this.isHealthy = true
      return { healthy: true, lastCheck: new Date() }

    } catch (error) {
      this.isHealthy = false
      return {
        healthy: false,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// Email Provider Manager
export class EmailProviderManager {
  private providers: EmailProvider[] = []
  private currentProviderIndex = 0
  private healthCheckInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeProviders()
    this.startHealthChecks()
  }

  private initializeProviders() {
    // Initialize providers based on available configuration
    if (process.env.RESEND_API_KEY) {
      this.providers.push(new ResendProvider(process.env.RESEND_API_KEY))
    }

    if (process.env.SENDGRID_API_KEY) {
      this.providers.push(new SendGridProvider(process.env.SENDGRID_API_KEY))
    }

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.providers.push(new AWSESProvider(process.env.AWS_REGION))
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      this.providers.push(new NodemailerProvider({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      }))
    }

    // Sort by priority (higher priority first)
    this.providers.sort((a, b) => b.priority - a.priority)

    logger.info('Email providers initialized', {
      count: this.providers.length,
      providers: this.providers.map(p => ({ name: p.name, priority: p.priority }))
    })
  }

  async sendEmail(message: EmailMessage): Promise<NotificationDeliveryResult> {
    const healthyProviders = this.providers.filter(p => p.isHealthy)
    
    if (healthyProviders.length === 0) {
      logger.error('No healthy email providers available')
      return {
        success: false,
        error: 'No healthy email providers available',
        deliveryTime: 0
      }
    }

    // Try providers in order of priority
    for (const provider of healthyProviders) {
      try {
        const result = await provider.send(message)
        
        if (result.success) {
          logger.debug('Email sent successfully', {
            provider: provider.name,
            messageId: result.messageId,
            deliveryTime: result.deliveryTime
          })
          return result
        } else {
          logger.warn('Provider failed to send email', {
            provider: provider.name,
            error: result.error
          })
        }

      } catch (error) {
        logger.error('Provider threw exception', {
          provider: provider.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
        provider.isHealthy = false
      }
    }

    return {
      success: false,
      error: 'All email providers failed',
      deliveryTime: 0
    }
  }

  private startHealthChecks() {
    if (process.env.NODE_ENV === 'test') return
    this.healthCheckInterval = setInterval(async () => {
      for (const provider of this.providers) {
        try {
          const status = await provider.getStatus()
          provider.isHealthy = status.healthy
          
          if (!status.healthy) {
            logger.warn('Email provider unhealthy', {
              provider: provider.name,
              error: status.error
            })
          }
        } catch (error) {
          provider.isHealthy = false
          logger.error('Health check failed', {
            provider: provider.name,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }
    }, 60000) // Check every minute
    ;(this.healthCheckInterval as { unref?: () => void }).unref?.()
  }

  getProviderStatus(): Array<{
    name: string
    healthy: boolean
    priority: number
    rateLimits: { perSecond: number; perMinute: number; perHour: number; perDay: number }
    costPerEmail: number
  }> {
    return this.providers.map(provider => ({
      name: provider.name,
      healthy: provider.isHealthy,
      priority: provider.priority,
      rateLimits: provider.rateLimits,
      costPerEmail: provider.costPerEmail
    }))
  }

  cleanup() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }
  }
}
