/**
 * 🔔 Enterprise Notification System Types
 * Type definitions for comprehensive multi-channel notification system
 */

export enum NotificationChannel {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  WEBHOOK = 'webhook',
  IN_APP = 'in_app',
  SLACK = 'slack',
  DISCORD = 'discord',
  TELEGRAM = 'telegram'
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency'
}

export enum NotificationStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  RETRYING = 'retrying',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum NotificationType {
  // Learning notifications
  LESSON_COMPLETED = 'lesson_completed',
  LEARNING_STREAK = 'learning_streak',
  ACHIEVEMENT_EARNED = 'achievement_earned',
  COURSE_COMPLETED = 'course_completed',
  QUIZ_RESULT = 'quiz_result',
  
  // Trading alerts
  PRICE_ALERT = 'price_alert',
  PORTFOLIO_UPDATE = 'portfolio_update',
  RISK_WARNING = 'risk_warning',
  MARKET_ANALYSIS = 'market_analysis',
  DEFI_ALERT = 'defi_alert',
  
  // Security notifications
  LOGIN_ATTEMPT = 'login_attempt',
  PASSWORD_CHANGED = 'password_changed',
  TWO_FA_ENABLED = 'two_fa_enabled',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  DEVICE_LOGIN = 'device_login',
  SECURITY_ALERT = 'security_alert',
  
  // System notifications
  MAINTENANCE = 'maintenance',
  SYSTEM_UPDATE = 'system_update',
  ANNOUNCEMENT = 'announcement',
  BILLING_UPDATE = 'billing_update',
  
  // AI analysis
  AI_ANALYSIS_COMPLETE = 'ai_analysis_complete',
  PREDICTION_UPDATE = 'prediction_update',
  SENTIMENT_ALERT = 'sentiment_alert'
}

export interface NotificationTemplate {
  id: string
  name: string
  type: NotificationType
  channel: NotificationChannel
  subject?: string
  title: string
  body: string
  htmlBody?: string
  variables: Record<string, string>
  locale: string
  isActive: boolean
  version: number
  createdAt: Date
  updatedAt: Date
}

export interface NotificationRecipient {
  userId: string
  email?: string
  phoneNumber?: string
  pushTokens?: string[]
  webhookUrl?: string
  slackChannelId?: string
  discordChannelId?: string
  telegramChatId?: string
  preferences: UserNotificationPreferences
}

export interface UserNotificationPreferences {
  userId: string
  channels: {
    [NotificationChannel.EMAIL]: ChannelPreference
    [NotificationChannel.PUSH]: ChannelPreference
    [NotificationChannel.SMS]: ChannelPreference
    [NotificationChannel.WEBHOOK]: ChannelPreference
    [NotificationChannel.IN_APP]: ChannelPreference
    [NotificationChannel.SLACK]: ChannelPreference
    [NotificationChannel.DISCORD]: ChannelPreference
    [NotificationChannel.TELEGRAM]: ChannelPreference
  }
  frequency: {
    immediate: NotificationType[]
    batched: NotificationType[]
    disabled: NotificationType[]
  }
  quietHours: {
    enabled: boolean
    start: string // HH:mm format
    end: string   // HH:mm format
    timezone: string
  }
  digestSettings: {
    enabled: boolean
    frequency: 'daily' | 'weekly' | 'monthly'
    time: string // HH:mm format
  }
  language: string
  globalOptOut: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ChannelPreference {
  enabled: boolean
  minPriority: NotificationPriority
  allowedTypes: NotificationType[]
  rateLimits: {
    perMinute: number
    perHour: number
    perDay: number
  }
  deliveryOptions: Record<string, unknown>
}

export interface NotificationPayload {
  id: string
  type: NotificationType
  channel: NotificationChannel
  priority: NotificationPriority
  recipient: NotificationRecipient
  templateId?: string
  customContent?: {
    subject?: string
    title: string
    body: string
    htmlBody?: string
  }
  data: Record<string, unknown>
  metadata: {
    source: string
    campaign?: string
    tracking?: Record<string, unknown>
    tags?: string[]
  }
  scheduling: {
    sendAt?: Date
    expireAt?: Date
    timezone?: string
  }
  retryPolicy: {
    maxRetries: number
    backoffMultiplier: number
    maxBackoffDelay: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface NotificationDeliveryLog {
  id: string
  notificationId: string
  channel: NotificationChannel
  status: NotificationStatus
  attempt: number
  sentAt?: Date
  deliveredAt?: Date
  failedAt?: Date
  error?: string
  providerResponse?: Record<string, unknown>
  metrics: {
    deliveryTime?: number
    openedAt?: Date
    clickedAt?: Date
    unsubscribedAt?: Date
  }
  createdAt: Date
  updatedAt: Date
}

export interface NotificationProvider {
  name: string
  type: NotificationChannel
  isActive: boolean
  priority: number // Higher number = higher priority for failover
  rateLimits: {
    perSecond: number
    perMinute: number
    perHour: number
    perDay: number
  }
  configuration: Record<string, unknown>
  healthCheck: {
    url?: string
    interval: number
    timeout: number
    lastCheck?: Date
    isHealthy: boolean
  }
}

export interface NotificationQueue {
  id: string
  name: string
  channel: NotificationChannel
  priority: NotificationPriority
  maxRetries: number
  retryBackoff: number
  batchSize: number
  processingDelay: number
  deadLetterQueue?: string
  isActive: boolean
  metrics: QueueMetrics
}

export interface QueueMetrics {
  pending: number
  processing: number
  completed: number
  failed: number
  retrying: number
  averageProcessingTime: number
  throughputPerMinute: number
  lastProcessed?: Date
}

export interface NotificationCampaign {
  id: string
  name: string
  description: string
  type: 'broadcast' | 'targeted' | 'triggered'
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled'
  templateId: string
  audience: {
    userIds?: string[]
    segments?: string[]
    filters?: Record<string, unknown>
  }
  channels: NotificationChannel[]
  scheduling: {
    startAt: Date
    endAt?: Date
    timezone: string
    frequency?: 'once' | 'daily' | 'weekly' | 'monthly'
  }
  abTesting?: {
    enabled: boolean
    variants: Array<{
      id: string
      templateId: string
      trafficPercentage: number
    }>
  }
  metrics: CampaignMetrics
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface CampaignMetrics {
  sent: number
  delivered: number
  failed: number
  opened: number
  clicked: number
  unsubscribed: number
  conversionRate: number
  deliveryRate: number
  openRate: number
  clickRate: number
  unsubscribeRate: number
}

export interface NotificationAnalytics {
  timeRange: {
    start: Date
    end: Date
  }
  overall: {
    totalSent: number
    totalDelivered: number
    totalFailed: number
    deliveryRate: number
    averageDeliveryTime: number
  }
  byChannel: Record<NotificationChannel, ChannelAnalytics>
  byType: Record<NotificationType, TypeAnalytics>
  byPriority: Record<NotificationPriority, PriorityAnalytics>
  engagement: {
    totalOpened: number
    totalClicked: number
    openRate: number
    clickRate: number
    unsubscribeRate: number
  }
  errors: {
    topErrors: Array<{
      error: string
      count: number
      percentage: number
    }>
  }
}

export interface ChannelAnalytics {
  sent: number
  delivered: number
  failed: number
  deliveryRate: number
  averageDeliveryTime: number
  costPer1000: number
}

export interface TypeAnalytics {
  sent: number
  delivered: number
  opened: number
  clicked: number
  openRate: number
  clickRate: number
}

export interface PriorityAnalytics {
  sent: number
  delivered: number
  failed: number
  averageDeliveryTime: number
}

export interface NotificationWebhookEvent {
  id: string
  type: 'delivery' | 'open' | 'click' | 'unsubscribe' | 'bounce' | 'complaint'
  notificationId: string
  timestamp: Date
  data: Record<string, unknown>
  signature: string
}

export interface NotificationAuditLog {
  id: string
  action: 'created' | 'sent' | 'updated' | 'cancelled' | 'failed' | 'delivered'
  notificationId: string
  userId?: string
  details: Record<string, unknown>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

export interface NotificationDeliveryResult {
  success: boolean
  messageId?: string
  providerId?: string
  deliveryTime: number
  error?: string
  retryAfter?: number
  costCents?: number
}

export interface NotificationBatch {
  id: string
  notifications: NotificationPayload[]
  channel: NotificationChannel
  priority: NotificationPriority
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  processedAt?: Date
  completedAt?: Date
  results: NotificationDeliveryResult[]
}

export interface NotificationRule {
  id: string
  name: string
  description: string
  isActive: boolean
  conditions: {
    userSegments?: string[]
    notificationTypes?: NotificationType[]
    timeConstraints?: {
      days: number[]
      hours: { start: string; end: string }
    }
    rateLimits?: {
      maxPerHour: number
      maxPerDay: number
    }
  }
  actions: {
    block?: boolean
    delay?: number
    redirect?: NotificationChannel[]
    transform?: Record<string, unknown>
  }
  createdAt: Date
  updatedAt: Date
}

export interface NotificationDigest {
  id: string
  userId: string
  type: 'daily' | 'weekly' | 'monthly'
  period: {
    start: Date
    end: Date
  }
  notifications: Array<{
    id: string
    type: NotificationType
    title: string
    summary: string
    timestamp: Date
  }>
  sentAt?: Date
  status: 'pending' | 'sent' | 'failed'
}

export interface NotificationPersonalization {
  userId: string
  preferences: {
    contentStyle: 'formal' | 'casual' | 'technical'
    frequency: 'minimal' | 'moderate' | 'comprehensive'
    timing: 'morning' | 'afternoon' | 'evening' | 'anytime'
    topics: string[]
  }
  engagement: {
    openRate: number
    clickRate: number
    unsubscribeRate: number
    lastEngagement: Date
  }
  aiModel: {
    version: string
    personalizationScore: number
    lastTrainingDate: Date
  }
}