/**
 * 🔄 Notification Queue Manager
 * Redis-based queue system for reliable notification delivery
 */

import { logger } from '@/lib/monitoring/logger'
import { createClient } from '@/lib/supabase/client'
import { getEnvInt } from '@/lib/config/env'
import type { NotificationProviderRow, NotificationQueueRow, NotificationRuleRow } from './db-types'
import { toNotificationProvider, toNotificationQueue, toNotificationRule } from './transformers'
import {
  NotificationPayload,
  NotificationChannel,
  NotificationPriority,
} from './types'
import type {
  Queue as BullQueue,
  Worker as BullWorker,
  QueueEvents as BullQueueEvents,
  Job as BullJob,
  ConnectionOptions,
} from 'bullmq'
import type { Redis as IORedisClient } from 'ioredis'

type RedisConnection = IORedisClient | ConnectionOptions

interface SingleJobData {
  id: string
  type: 'single' | 'scheduled'
  payload: NotificationPayload
  createdAt: Date
  metadata?: Record<string, unknown>
  scheduledFor?: Date
}

interface BatchJobData {
  id: string
  type: 'batch'
  payload: NotificationPayload[]
  createdAt: Date
  metadata?: Record<string, unknown>
}

export interface QueueConfig {
  redis: {
    host: string
    port: number
    password?: string
    db?: number
    maxRetriesPerRequest: number
  }
  queues: {
    [key: string]: {
      concurrency: number
      rateLimiter: {
        max: number
        duration: number
      }
      defaultJobOptions: {
        removeOnComplete: number
        removeOnFail: number
        attempts: number
        backoff: {
          type: 'exponential' | 'fixed'
          delay: number
        }
      }
    }
  }
  healthCheck: {
    interval: number
    timeout: number
  }
}

export interface QueueJob {
  id: string
  type: 'single' | 'batch'
  payload: NotificationPayload | NotificationPayload[]
  priority: NotificationPriority
  attempts: number
  maxAttempts: number
  createdAt: Date
  scheduledFor?: Date
  metadata: Record<string, unknown>
}

export interface QueueMetrics {
  waiting: number
  active: number
  completed: number
  failed: number
  delayed: number
  paused: boolean
  workers: number
  throughput: {
    perSecond: number
    perMinute: number
    perHour: number
  }
  avgProcessingTime: number
  errorRate: number
  lastUpdated: Date
}

export class NotificationQueueManager {
  private queues: Map<string, BullQueue> = new Map()
  private workers: Map<string, BullWorker> = new Map()
  private metrics: Map<string, QueueMetrics> = new Map()
  private healthCheckInterval: NodeJS.Timeout | null = null
  private metricsInterval: NodeJS.Timeout | null = null

  constructor(private config: QueueConfig) {
    // テスト環境ではバックグラウンド動作を抑止
    if (process.env.NODE_ENV !== 'test') {
      this.initializeQueues()
      this.startHealthChecks()
      this.startMetricsCollection()
    }
  }

  /**
   * Initialize Redis-based queues with BullMQ
   */
  private async initializeQueues() {
    try {
      // Dynamically import BullMQ to avoid issues if Redis is not available
      const { Queue, Worker, QueueEvents } = await import('bullmq')
      const { default: IORedis } = await import('ioredis')

      // Create Redis connection
      const redis = new IORedis({
        host: this.config.redis.host,
        port: this.config.redis.port,
        password: this.config.redis.password,
        db: this.config.redis.db || 0,
        maxRetriesPerRequest: this.config.redis.maxRetriesPerRequest || 3,
        enableReadyCheck: false,
        lazyConnect: true
      })

      // Test Redis connection
      await redis.ping()
      logger.info('Redis connection established for notification queues')

      // Create queues for each channel and priority combination
      const channels = Object.values(NotificationChannel)
      const priorities = Object.values(NotificationPriority)

      for (const channel of channels) {
        for (const priority of priorities) {
          const queueName = `notifications:${channel}:${priority}`
          
          const queue: BullQueue = new Queue(queueName, {
            connection: redis,
            defaultJobOptions: {
              removeOnComplete: getEnvInt('NOTIF_DEFAULT_REMOVE_ON_COMPLETE', 100),
              removeOnFail: getEnvInt('NOTIF_DEFAULT_REMOVE_ON_FAIL', 50),
              attempts: this.config.queues[channel]?.defaultJobOptions?.attempts ?? getEnvInt('NOTIF_DEFAULT_ATTEMPTS', 3),
              backoff: {
                type: (this.config.queues[channel]?.defaultJobOptions?.backoff?.type
                  ?? (process.env.NOTIF_DEFAULT_BACKOFF_TYPE === 'fixed' ? 'fixed' : 'exponential')) as 'exponential' | 'fixed',
                delay: this.config.queues[channel]?.defaultJobOptions?.backoff?.delay ?? getEnvInt('NOTIF_DEFAULT_BACKOFF_DELAY', 2000)
              }
            }
          })

          this.queues.set(queueName, queue)

          // Create worker for processing jobs
          const worker: BullWorker = new Worker(
            queueName,
            async (job) => this.processJob(job as BullJob<SingleJobData>),
            {
              connection: redis,
              concurrency: this.config.queues[channel]?.concurrency ?? getEnvInt('NOTIF_DEFAULT_CONCURRENCY', 5),
              limiter: this.config.queues[channel]?.rateLimiter ?? {
                max: getEnvInt('NOTIF_DEFAULT_RATE_LIMIT_MAX', 100),
                duration: getEnvInt('NOTIF_DEFAULT_RATE_LIMIT_DURATION_MS', 60000)
              }
            }
          )

          this.workers.set(queueName, worker)

          // Set up event listeners
          const events: BullQueueEvents = new QueueEvents(queueName, { connection: redis })
          this.setupEventListeners(events, queueName)

          logger.info('Queue initialized', { queueName })
        }
      }

      // Create special queues
      await this.createSpecialQueues(redis)

    } catch (error) {
      logger.error('Failed to initialize notification queues', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      // Fall back to database-only queuing if Redis is not available
      await this.initializeFallbackQueues()
    }
  }

  /**
   * Create special purpose queues
   */
  private async createSpecialQueues(redis: RedisConnection) {
    const { Queue, Worker } = await import('bullmq')

    // High-priority emergency queue
    const emergencyQueue: BullQueue = new Queue('notifications:emergency', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: getEnvInt('NOTIF_EMERGENCY_REMOVE_ON_COMPLETE', 200),
        removeOnFail: getEnvInt('NOTIF_EMERGENCY_REMOVE_ON_FAIL', 100),
        attempts: getEnvInt('NOTIF_EMERGENCY_ATTEMPTS', 5),
        backoff: { type: (process.env.NOTIF_EMERGENCY_BACKOFF_TYPE === 'exponential' ? 'exponential' : 'fixed'), delay: getEnvInt('NOTIF_EMERGENCY_BACKOFF_DELAY', 1000) }
      }
    })

    const emergencyWorker: BullWorker = new Worker(
      'notifications:emergency',
      async (job) => this.processJob(job as BullJob<SingleJobData>),
      {
        connection: redis,
        concurrency: getEnvInt('NOTIF_EMERGENCY_CONCURRENCY', 10),
        limiter: { max: getEnvInt('NOTIF_EMERGENCY_RATE_LIMIT_MAX', 1000), duration: getEnvInt('NOTIF_EMERGENCY_RATE_LIMIT_DURATION_MS', 60000) }
      }
    )

    this.queues.set('emergency', emergencyQueue)
    this.workers.set('emergency', emergencyWorker)

    // Batch processing queue
    const batchQueue: BullQueue = new Queue('notifications:batch', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: getEnvInt('NOTIF_BATCH_REMOVE_ON_COMPLETE', 50),
        removeOnFail: getEnvInt('NOTIF_BATCH_REMOVE_ON_FAIL', 25),
        attempts: getEnvInt('NOTIF_BATCH_ATTEMPTS', 3),
        backoff: { type: (process.env.NOTIF_BATCH_BACKOFF_TYPE === 'fixed' ? 'fixed' : 'exponential'), delay: getEnvInt('NOTIF_BATCH_BACKOFF_DELAY', 5000) }
      }
    })

    const batchWorker: BullWorker = new Worker(
      'notifications:batch',
      async (job) => this.processBatchJob(job as BullJob<BatchJobData>),
      {
        connection: redis,
        concurrency: getEnvInt('NOTIF_BATCH_CONCURRENCY', 3),
        limiter: { max: getEnvInt('NOTIF_BATCH_RATE_LIMIT_MAX', 50), duration: getEnvInt('NOTIF_BATCH_RATE_LIMIT_DURATION_MS', 60000) }
      }
    )

    this.queues.set('batch', batchQueue)
    this.workers.set('batch', batchWorker)

    // Scheduled/delayed notifications queue
    const scheduledQueue: BullQueue = new Queue('notifications:scheduled', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: getEnvInt('NOTIF_SCHEDULED_REMOVE_ON_COMPLETE', 100),
        removeOnFail: getEnvInt('NOTIF_SCHEDULED_REMOVE_ON_FAIL', 50),
        attempts: getEnvInt('NOTIF_SCHEDULED_ATTEMPTS', 2),
        backoff: { type: (process.env.NOTIF_SCHEDULED_BACKOFF_TYPE === 'exponential' ? 'exponential' : 'fixed'), delay: getEnvInt('NOTIF_SCHEDULED_BACKOFF_DELAY', 10000) }
      }
    })

    const scheduledWorker: BullWorker = new Worker(
      'notifications:scheduled',
      async (job) => this.processScheduledJob(job as BullJob<SingleJobData>),
      {
        connection: redis,
        concurrency: getEnvInt('NOTIF_SCHEDULED_CONCURRENCY', 2),
        limiter: { max: getEnvInt('NOTIF_SCHEDULED_RATE_LIMIT_MAX', 20), duration: getEnvInt('NOTIF_SCHEDULED_RATE_LIMIT_DURATION_MS', 60000) }
      }
    )

    this.queues.set('scheduled', scheduledQueue)
    this.workers.set('scheduled', scheduledWorker)
  }

  /**
   * Fallback to database-only queuing if Redis is unavailable
   */
  private async initializeFallbackQueues() {
    logger.warn('Initializing fallback database-only queuing system')
    
    // Start database polling for queued notifications
    if (process.env.NODE_ENV !== 'test') {
      const t = setInterval(async () => {
        await this.processDatabaseQueue()
      }, 5000)
      ;(t as { unref?: () => void }).unref?.()
    }
  }

  /**
   * Add notification to appropriate queue
   */
  async addNotification(payload: NotificationPayload): Promise<string> {
    try {
      let queueName: string

      // Determine queue based on priority and channel
      if (payload.priority === NotificationPriority.EMERGENCY) {
        queueName = 'emergency'
      } else {
        queueName = `notifications:${payload.channel}:${payload.priority}`
      }

      const queue = this.queues.get(queueName)
      if (!queue) {
        // Fallback to database queuing
        return await this.addToDatabase(payload)
      }

      // Calculate delay for scheduled notifications
      const delay = payload.scheduling.sendAt 
        ? Math.max(0, payload.scheduling.sendAt.getTime() - Date.now())
        : 0

      const job = await queue.add(
        'process_notification',
        {
          id: payload.id,
          type: 'single',
          payload,
          createdAt: new Date(),
          metadata: payload.metadata
        },
        {
          priority: this.getPriorityWeight(payload.priority),
          delay,
          jobId: payload.id
        }
      )

      logger.debug('Notification added to queue', {
        notificationId: payload.id,
        queueName,
        jobId: job.id,
        delay
      })

      return job.id || payload.id

    } catch (error) {
      logger.error('Failed to add notification to queue', {
        notificationId: payload.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      })

      // Fallback to database
      return await this.addToDatabase(payload)
    }
  }

  /**
   * Add batch of notifications to queue
   */
  async addBatch(notifications: NotificationPayload[]): Promise<string> {
    try {
      const batchQueue = this.queues.get('batch')
      if (!batchQueue) {
        return await this.addBatchToDatabase(notifications)
      }

      const batchId = crypto.randomUUID()
      const job = await batchQueue.add(
        'process_batch',
        {
          id: batchId,
          type: 'batch',
          payload: notifications,
          createdAt: new Date(),
          metadata: { batchSize: notifications.length }
        },
        {
          priority: (() => {
            const highest: NotificationPriority = notifications.reduce<NotificationPriority>((acc, n) => {
              return this.getPriorityWeight(n.priority) > this.getPriorityWeight(acc) ? n.priority : acc
            }, NotificationPriority.LOW)
            return this.getPriorityWeight(highest)
          })()
        }
      )

      logger.info('Notification batch added to queue', {
        batchId,
        count: notifications.length,
        jobId: job.id
      })

      return job.id || batchId

    } catch (error) {
      logger.error('Failed to add batch to queue', {
        count: notifications.length,
        error: error instanceof Error ? error.message : 'Unknown error'
      })

      return await this.addBatchToDatabase(notifications)
    }
  }

  /**
   * Schedule notification for later delivery
   */
  async scheduleNotification(payload: NotificationPayload, sendAt: Date): Promise<string> {
    try {
      const scheduledQueue = this.queues.get('scheduled')
      if (!scheduledQueue) {
        return await this.addToDatabase({
          ...payload,
          scheduling: { ...payload.scheduling, sendAt }
        })
      }

      const delay = Math.max(0, sendAt.getTime() - Date.now())
      
      const job = await scheduledQueue.add(
        'process_scheduled',
        {
          id: payload.id,
          type: 'scheduled',
          payload,
          scheduledFor: sendAt,
          createdAt: new Date(),
          metadata: payload.metadata
        },
        {
          delay,
          jobId: payload.id
        }
      )

      logger.debug('Notification scheduled', {
        notificationId: payload.id,
        sendAt,
        delay,
        jobId: job.id
      })

      return job.id || payload.id

    } catch (error) {
      logger.error('Failed to schedule notification', {
        notificationId: payload.id,
        sendAt,
        error: error instanceof Error ? error.message : 'Unknown error'
      })

      return await this.addToDatabase({
        ...payload,
        scheduling: { ...payload.scheduling, sendAt }
      })
    }
  }

  /**
   * Process individual notification job
   */
  private async processJob(job: BullJob<SingleJobData>): Promise<unknown> {
    const startTime = Date.now()
    
    try {
      const { payload } = job.data
      
      // Update job status
      await job.updateProgress(25)

      // Import and use notification service
      const { EnhancedNotificationService } = await import('./enhanced-notification-service')
      const notificationService = new EnhancedNotificationService({
        providers: await this.getProviders(),
        queues: await this.getQueues(),
        rules: await this.getRules(),
        analytics: { enabled: true, retentionDays: 90, realTimeMetrics: true },
        personalization: { enabled: true, aiModel: 'gpt-4', learningRate: 0.1 },
        batching: { enabled: false, maxBatchSize: 1, batchDelay: 0 },
        failover: { enabled: true, healthCheckInterval: 300000, retryBackoffBase: 2, maxRetries: 3 }
      })

      await job.updateProgress(50)

      // Send notification
      const result = await notificationService.sendNotification(payload)

      await job.updateProgress(75)

      // Update database
      await this.updateNotificationStatus(payload.id, result.success ? 'sent' : 'failed', result.error)

      await job.updateProgress(100)

      const processingTime = Date.now() - startTime
      
      logger.debug('Notification job processed', {
        jobId: job.id,
        notificationId: payload.id,
        success: result.success,
        processingTime
      })

      return result

    } catch (error) {
      const processingTime = Date.now() - startTime
      
      logger.error('Notification job failed', {
        jobId: job.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime
      })

      throw error
    }
  }

  /**
   * Process batch notification job
   */
  private async processBatchJob(job: BullJob<BatchJobData>): Promise<unknown> {
    const startTime = Date.now()
    
    try {
      const { payload: notifications } = job.data
      
      await job.updateProgress(10)

      const { EnhancedNotificationService } = await import('./enhanced-notification-service')
      const notificationService = new EnhancedNotificationService({
        providers: await this.getProviders(),
        queues: await this.getQueues(),
        rules: await this.getRules(),
        analytics: { enabled: true, retentionDays: 90, realTimeMetrics: true },
        personalization: { enabled: true, aiModel: 'gpt-4', learningRate: 0.1 },
        batching: { enabled: true, maxBatchSize: 50, batchDelay: 5000 },
        failover: { enabled: true, healthCheckInterval: 300000, retryBackoffBase: 2, maxRetries: 3 }
      })

      await job.updateProgress(25)

      // Process batch
      const batchResult = await notificationService.sendBatch(notifications)

      await job.updateProgress(75)

      // Update database with results
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i]
        const result = batchResult.results[i]
        
        await this.updateNotificationStatus(
          notification.id, 
          result.success ? 'sent' : 'failed', 
          result.error
        )
      }

      await job.updateProgress(100)

      const processingTime = Date.now() - startTime
      
      logger.info('Batch job processed', {
        jobId: job.id,
        batchId: batchResult.id,
        count: notifications.length,
        successCount: batchResult.results.filter(r => r.success).length,
        processingTime
      })

      return batchResult

    } catch (error) {
      const processingTime = Date.now() - startTime
      
      logger.error('Batch job failed', {
        jobId: job.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime
      })

      throw error
    }
  }

  /**
   * Process scheduled notification job
   */
  private async processScheduledJob(job: BullJob<SingleJobData>): Promise<unknown> {
    const { scheduledFor } = job.data
    
    // Check if it's time to send
    if (scheduledFor && new Date() < new Date(scheduledFor)) {
      logger.warn('Scheduled job executed too early', {
        jobId: job.id,
        scheduledFor,
        currentTime: new Date()
      })
      throw new Error('Job executed too early')
    }

    // Process as regular notification
    return await this.processJob(job)
  }

  /**
   * Process database queue (fallback)
   */
  private async processDatabaseQueue() {
    try {
      const supabase = createClient()
      
      // Get pending notifications from database queue
      const { data: queuedNotifications } = await supabase
        .from('notification_queue')
        .select('*')
        .eq('status', 'pending')
        .lte('next_retry_at', new Date().toISOString())
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(10)

      if (!queuedNotifications || queuedNotifications.length === 0) {
        return
      }

      for (const queuedNotification of queuedNotifications) {
        try {
          // Mark as processing
          await supabase
            .from('notification_queue')
            .update({ status: 'processing' })
            .eq('id', queuedNotification.id)

          // Process notification
          const payload = queuedNotification.notification_payload as NotificationPayload
          
          const { EnhancedNotificationService } = await import('./enhanced-notification-service')
          const notificationService = new EnhancedNotificationService({
            providers: await this.getProviders(),
            queues: [],
            rules: [],
            analytics: { enabled: true, retentionDays: 90, realTimeMetrics: true },
            personalization: { enabled: false, aiModel: '', learningRate: 0 },
            batching: { enabled: false, maxBatchSize: 1, batchDelay: 0 },
            failover: { enabled: true, healthCheckInterval: 300000, retryBackoffBase: 2, maxRetries: 3 }
          })

          const result = await notificationService.sendNotification(payload)

          if (result.success) {
            // Remove from queue
            await supabase
              .from('notification_queue')
              .delete()
              .eq('id', queuedNotification.id)
          } else {
            // Update retry count and schedule next retry
            const backoffBase = getEnvInt('NOTIF_DB_BACKOFF_BASE', 2)
            const backoffUnitMs = getEnvInt('NOTIF_DB_BACKOFF_UNIT_MS', 60000)
            const nextRetry = new Date(Date.now() + Math.pow(backoffBase, queuedNotification.retry_count) * backoffUnitMs)
            
            if (queuedNotification.retry_count >= queuedNotification.max_retries) {
              // Mark as failed
              await supabase
                .from('notification_queue')
                .update({ status: 'failed', result })
                .eq('id', queuedNotification.id)
            } else {
              // Schedule retry
              await supabase
                .from('notification_queue')
                .update({
                  status: 'pending',
                  retry_count: queuedNotification.retry_count + 1,
                  next_retry_at: nextRetry,
                  result
                })
                .eq('id', queuedNotification.id)
            }
          }

        } catch (error) {
          logger.error('Failed to process queued notification', {
            queuedId: queuedNotification.id,
            error: error instanceof Error ? error.message : 'Unknown error'
          })

          // Update retry logic
          const backoffBase = getEnvInt('NOTIF_DB_BACKOFF_BASE', 2)
          const backoffUnitMs = getEnvInt('NOTIF_DB_BACKOFF_UNIT_MS', 60000)
          const nextRetry = new Date(Date.now() + Math.pow(backoffBase, queuedNotification.retry_count) * backoffUnitMs)
          
          await supabase
            .from('notification_queue')
            .update({
              status: queuedNotification.retry_count >= queuedNotification.max_retries ? 'failed' : 'pending',
              retry_count: queuedNotification.retry_count + 1,
              next_retry_at: nextRetry,
              result: { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
            })
            .eq('id', queuedNotification.id)
        }
      }

    } catch (error) {
      logger.error('Failed to process database queue', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  /**
   * Get queue metrics
   */
  async getQueueMetrics(queueName?: string): Promise<QueueMetrics | Record<string, QueueMetrics>> {
    if (queueName) {
      return this.metrics.get(queueName) || this.createEmptyMetrics()
    }

    const allMetrics: Record<string, QueueMetrics> = {}
    for (const [name, metrics] of this.metrics) {
      allMetrics[name] = metrics
    }

    return allMetrics
  }

  /**
   * Pause/Resume queue
   */
  async pauseQueue(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName)
    if (queue) {
      await queue.pause()
      logger.info('Queue paused', { queueName })
    }
  }

  async resumeQueue(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName)
    if (queue) {
      await queue.resume()
      logger.info('Queue resumed', { queueName })
    }
  }

  /**
   * Get queue health status
   */
  async getHealthStatus(): Promise<Record<string, unknown>> {
    const health: Record<string, unknown> = {}

    for (const [name, queue] of this.queues) {
      try {
        const waiting = await queue.getWaiting()
        const active = await queue.getActive()
        const failed = await queue.getFailed()
        
        health[name] = {
          status: 'healthy',
          waiting: waiting.length,
          active: active.length,
          failed: failed.length,
          isPaused: await queue.isPaused()
        }
      } catch (error) {
        health[name] = {
          status: 'unhealthy',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }

    return health
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }
    
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval)
    }

    // Close all workers
    for (const [name, worker] of this.workers) {
      try {
        await worker.close()
        logger.debug('Worker closed', { workerName: name })
      } catch (error) {
        logger.warn('Failed to close worker', { workerName: name, error: error instanceof Error ? error.message : String(error) })
      }
    }

    // Close all queues
    for (const [name, queue] of this.queues) {
      try {
        await queue.close()
        logger.debug('Queue closed', { queueName: name })
      } catch (error) {
        logger.warn('Failed to close queue', { queueName: name, error: error instanceof Error ? error.message : String(error) })
      }
    }

    logger.info('Notification queue manager cleaned up')
  }

  // Private helper methods

  private getPriorityWeight(priority: NotificationPriority): number {
    switch (priority) {
      case NotificationPriority.EMERGENCY: return 100
      case NotificationPriority.CRITICAL: return 80
      case NotificationPriority.HIGH: return 60
      case NotificationPriority.NORMAL: return 40
      case NotificationPriority.LOW: return 20
      default: return 40
    }
  }

  private setupEventListeners(events: BullQueueEvents, queueName: string) {
    events.on('completed', () => {
      this.updateMetrics(queueName, 'completed')
    })

    events.on('failed', (args) => {
      this.updateMetrics(queueName, 'failed')
      logger.warn('Job failed', { queueName, jobId: (args as { jobId?: string }).jobId, error: (args as { failedReason?: string }).failedReason })
    })

    events.on('active', () => {
      this.updateMetrics(queueName, 'active')
    })

    events.on('waiting', () => {
      this.updateMetrics(queueName, 'waiting')
    })
  }

  private updateMetrics(queueName: string, event: string) {
    let metrics = this.metrics.get(queueName)
    if (!metrics) {
      metrics = this.createEmptyMetrics()
      this.metrics.set(queueName, metrics)
    }

    switch (event) {
      case 'completed':
        metrics.completed++
        break
      case 'failed':
        metrics.failed++
        break
      case 'active':
        metrics.active++
        break
      case 'waiting':
        metrics.waiting++
        break
    }

    metrics.lastUpdated = new Date()
  }

  private createEmptyMetrics(): QueueMetrics {
    return {
      waiting: 0,
      active: 0,
      completed: 0,
      failed: 0,
      delayed: 0,
      paused: false,
      workers: 0,
      throughput: { perSecond: 0, perMinute: 0, perHour: 0 },
      avgProcessingTime: 0,
      errorRate: 0,
      lastUpdated: new Date()
    }
  }

  private startHealthChecks() {
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.collectQueueMetrics()
      } catch (error) {
        logger.error('Health check failed', { error: error instanceof Error ? error.message : String(error) })
      }
    }, this.config.healthCheck.interval)
    ;(this.healthCheckInterval as { unref?: () => void }).unref?.()
  }

  private startMetricsCollection() {
    const metricsIntervalMs = getEnvInt('NOTIF_METRICS_INTERVAL_MS', 30000)
    this.metricsInterval = setInterval(async () => {
      try {
        await this.collectDetailedMetrics()
      } catch (error) {
        logger.error('Metrics collection failed', { error: error instanceof Error ? error.message : String(error) })
      }
    }, metricsIntervalMs)
    ;(this.metricsInterval as { unref?: () => void }).unref?.()
  }

  private async collectQueueMetrics() {
    for (const [name, queue] of this.queues) {
      try {
        const [waiting, active, completed, failed, delayed] = await Promise.all([
          queue.getWaiting(),
          queue.getActive(),
          queue.getCompleted(),
          queue.getFailed(),
          queue.getDelayed()
        ])

        const metrics = this.metrics.get(name) || this.createEmptyMetrics()
        
        metrics.waiting = waiting.length
        metrics.active = active.length
        metrics.completed = completed.length
        metrics.failed = failed.length
        metrics.delayed = delayed.length
        metrics.paused = await queue.isPaused()
        metrics.lastUpdated = new Date()

        this.metrics.set(name, metrics)

      } catch (error) {
        logger.warn('Failed to collect metrics for queue', { queueName: name, error: error instanceof Error ? error.message : String(error) })
      }
    }
  }

  private async collectDetailedMetrics() {
    // Collect throughput and processing time metrics
    // This would involve analyzing completed jobs over time periods
    // Implementation depends on specific BullMQ features and requirements
  }

  // Database fallback methods

  private async addToDatabase(payload: NotificationPayload): Promise<string> {
    const supabase = createClient()
    const id = crypto.randomUUID()

    const { error } = await supabase
      .from('notification_queue')
      .insert({
        id,
        queue_id: 'fallback',
        notification_payload: payload,
        priority: payload.priority,
        status: 'pending',
        retry_count: 0,
        max_retries: 3,
        next_retry_at: new Date(),
        created_at: new Date()
      })

    if (error) {
      throw new Error(`Failed to add to database queue: ${error.message}`)
    }

    return id
  }

  private async addBatchToDatabase(notifications: NotificationPayload[]): Promise<string> {
    const supabase = createClient()
    const batchId = crypto.randomUUID()

    const queueEntries = notifications.map(payload => ({
      id: crypto.randomUUID(),
      queue_id: 'batch_fallback',
      notification_payload: payload,
      priority: payload.priority,
      status: 'pending',
      retry_count: 0,
      max_retries: 3,
      next_retry_at: new Date(),
      created_at: new Date(),
      // Store batch ID in metadata
      metadata: { batchId }
    }))

    const { error } = await supabase
      .from('notification_queue')
      .insert(queueEntries)

    if (error) {
      throw new Error(`Failed to add batch to database queue: ${error.message}`)
    }

    return batchId
  }

  private async updateNotificationStatus(notificationId: string, status: string, error?: string) {
    const supabase = createClient()

    const updates: { status: string; updated_at: Date; sent_at?: Date; failed_at?: Date; error?: string } = {
      status,
      updated_at: new Date(),
    }

    if (status === 'sent') {
      updates.sent_at = new Date()
    } else if (status === 'failed') {
      updates.failed_at = new Date()
      if (error) {
        updates.error = error
      }
    }

    await supabase
      .from('notifications')
      .update(updates)
      .eq('id', notificationId)
  }

  // Configuration getters
  private async getProviders() {
    const supabase = createClient()
    const { data } = await supabase
      .from('notification_providers')
      .select('*')
      .eq('is_active', true)
    const rows = (data || []) as NotificationProviderRow[]
    return rows.map(toNotificationProvider)
  }

  private async getQueues() {
    const supabase = createClient()
    const { data } = await supabase
      .from('notification_queues')
      .select('*')
      .eq('is_active', true)
    const rows = (data || []) as NotificationQueueRow[]
    return rows.map(toNotificationQueue)
  }

  private async getRules() {
    const supabase = createClient()
    const { data } = await supabase
      .from('notification_rules')
      .select('*')
      .eq('is_active', true)
    const rows = (data || []) as NotificationRuleRow[]
    return rows.map(toNotificationRule)
  }
}
