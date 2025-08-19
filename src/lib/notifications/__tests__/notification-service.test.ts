/**
 * 🧪 Notification Service Test Suite
 * Comprehensive tests for the notification system
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals'
import { EnhancedNotificationService } from '../enhanced-notification-service'
import type { EnhancedNotificationConfig } from '../enhanced-notification-service'
import { NotificationQueueManager } from '../queue-manager'
import type { QueueConfig } from '../queue-manager'
import { EmailProviderManager } from '../providers/email-providers'
import {
  NotificationChannel,
  NotificationPriority,
  NotificationType,
  NotificationPayload,
  NotificationProvider,
  NotificationQueue,
  NotificationRule,
} from '../types'

// Mock dependencies
jest.mock('../queue-manager')
jest.mock('../providers/email-providers')
jest.mock('../../supabase/client')
jest.mock('../../monitoring/logger')

describe('EnhancedNotificationService', () => {
  let notificationService: EnhancedNotificationService
  let mockConfig: EnhancedNotificationConfig

  beforeEach(() => {
    mockConfig = {
      providers: [
        {
          name: 'resend',
          type: NotificationChannel.EMAIL,
          isActive: true,
          priority: 90,
          rateLimits: { perSecond: 10, perMinute: 600, perHour: 36000, perDay: 864000 },
          configuration: { apiKey: 'test-key', fromEmail: 'test@example.com' },
          healthCheck: { url: undefined, interval: 300000, timeout: 30000, isHealthy: true }
        } as NotificationProvider
      ] as NotificationProvider[],
      queues: [
        {
          id: 'email-high',
          name: 'email_high_priority',
          channel: NotificationChannel.EMAIL,
          priority: NotificationPriority.HIGH,
          maxRetries: 3,
          retryBackoff: 60,
          batchSize: 10,
          processingDelay: 5000,
          isActive: true,
          metrics: { pending: 0, processing: 0, completed: 0, failed: 0, retrying: 0 }
        }
      ] as NotificationQueue[],
      rules: [] as NotificationRule[],
      analytics: { enabled: true, retentionDays: 90, realTimeMetrics: true },
      personalization: { enabled: false, aiModel: '', learningRate: 0 },
      batching: { enabled: true, maxBatchSize: 100, batchDelay: 30000 },
      failover: { enabled: true, healthCheckInterval: 300000, retryBackoffBase: 2, maxRetries: 3 }
    }

    notificationService = new EnhancedNotificationService(mockConfig)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendNotification', () => {
    it('should successfully send a notification', async () => {
      const payload: NotificationPayload = {
        id: 'test-notification-1',
        type: NotificationType.PRICE_ALERT,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.HIGH,
        recipient: {
          userId: 'user-123',
          email: 'user@example.com',
          preferences: {
            userId: 'user-123',
            channels: {
              [NotificationChannel.EMAIL]: {
                enabled: true,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [NotificationType.PRICE_ALERT],
                rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                deliveryOptions: {}
              },
              [NotificationChannel.PUSH]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.SMS]: {
                enabled: false,
                minPriority: NotificationPriority.CRITICAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.WEBHOOK]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.DISCORD]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.TELEGRAM]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              }
            },
            frequency: {
              immediate: [NotificationType.PRICE_ALERT],
              batched: [],
              disabled: []
            },
            quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
            digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
            language: 'en',
            globalOptOut: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        customContent: {
          title: 'Price Alert',
          body: 'BTC has reached your target price of $50,000'
        },
        data: { symbol: 'BTC', price: 50000, targetPrice: 50000 },
        metadata: { source: 'price-monitor', campaign: 'price-alerts' },
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await notificationService.sendNotification(payload)

      expect(result.success).toBe(true)
      expect(result.deliveryTime).toBeGreaterThan(0)
    })

    it('should handle user preferences blocking notification', async () => {
      const payload: NotificationPayload = {
        id: 'test-notification-2',
        type: NotificationType.PRICE_ALERT,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.LOW, // Below minimum priority
        recipient: {
          userId: 'user-123',
          email: 'user@example.com',
          preferences: {
            userId: 'user-123',
            channels: {
              [NotificationChannel.EMAIL]: {
                enabled: true,
                minPriority: NotificationPriority.HIGH, // Higher than notification priority
                allowedTypes: [NotificationType.PRICE_ALERT],
                rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                deliveryOptions: {}
              },
              [NotificationChannel.PUSH]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.SMS]: {
                enabled: false,
                minPriority: NotificationPriority.CRITICAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.WEBHOOK]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.DISCORD]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.TELEGRAM]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              }
            },
            frequency: { immediate: [], batched: [], disabled: [] },
            quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
            digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
            language: 'en',
            globalOptOut: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        customContent: {
          title: 'Price Alert',
          body: 'BTC has reached your target price'
        },
        data: { symbol: 'BTC' },
        metadata: { source: 'test' },
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await notificationService.sendNotification(payload)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Blocked by user preferences')
    })

    it('should handle emergency notifications bypassing quiet hours', async () => {
      const payload: NotificationPayload = {
        id: 'test-notification-3',
        type: NotificationType.SECURITY_ALERT,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.EMERGENCY,
        recipient: {
          userId: 'user-123',
          email: 'user@example.com',
          preferences: {
            userId: 'user-123',
            channels: {
              [NotificationChannel.EMAIL]: {
                enabled: true,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: Object.values(NotificationType),
                rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                deliveryOptions: {}
              },
              [NotificationChannel.PUSH]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.SMS]: {
                enabled: false,
                minPriority: NotificationPriority.CRITICAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.WEBHOOK]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.DISCORD]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.TELEGRAM]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              }
            },
            frequency: { immediate: Object.values(NotificationType), batched: [], disabled: [] },
            quietHours: { enabled: true, start: '22:00', end: '08:00', timezone: 'UTC' },
            digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
            language: 'en',
            globalOptOut: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        customContent: {
          title: 'Security Alert',
          body: 'Suspicious login detected'
        },
        data: { loginAttempt: true },
        metadata: { source: 'security-monitor' },
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await notificationService.sendNotification(payload)

      expect(result.success).toBe(true)
    })
  })

  describe('sendBatch', () => {
    it('should successfully send a batch of notifications', async () => {
      const notifications: NotificationPayload[] = [
        {
          id: 'batch-1',
          type: NotificationType.LESSON_COMPLETED,
          channel: NotificationChannel.EMAIL,
          priority: NotificationPriority.NORMAL,
          recipient: {
            userId: 'user-1',
            email: 'user1@example.com',
            preferences: {
              userId: 'user-1',
              channels: {
                [NotificationChannel.EMAIL]: {
                  enabled: true,
                  minPriority: NotificationPriority.LOW,
                  allowedTypes: Object.values(NotificationType),
                  rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                  deliveryOptions: {}
                },
                [NotificationChannel.PUSH]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.SMS]: {
                  enabled: false,
                  minPriority: NotificationPriority.CRITICAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.WEBHOOK]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.DISCORD]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.TELEGRAM]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                }
              },
              frequency: { immediate: [], batched: Object.values(NotificationType), disabled: [] },
              quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
              digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
              language: 'en',
              globalOptOut: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          },
          customContent: {
            title: 'Lesson Completed',
            body: 'You have completed a lesson'
          },
          data: { lessonId: 'lesson-1' },
          metadata: { source: 'learning-system' },
          scheduling: {},
          retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'batch-2',
          type: NotificationType.LESSON_COMPLETED,
          channel: NotificationChannel.EMAIL,
          priority: NotificationPriority.NORMAL,
          recipient: {
            userId: 'user-2',
            email: 'user2@example.com',
            preferences: {
              userId: 'user-2',
              channels: {
                [NotificationChannel.EMAIL]: {
                  enabled: true,
                  minPriority: NotificationPriority.LOW,
                  allowedTypes: Object.values(NotificationType),
                  rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                  deliveryOptions: {}
                },
                [NotificationChannel.PUSH]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.SMS]: {
                  enabled: false,
                  minPriority: NotificationPriority.CRITICAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.WEBHOOK]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.DISCORD]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.TELEGRAM]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                }
              },
              frequency: { immediate: [], batched: Object.values(NotificationType), disabled: [] },
              quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
              digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
              language: 'en',
              globalOptOut: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          },
          customContent: {
            title: 'Lesson Completed',
            body: 'You have completed a lesson'
          },
          data: { lessonId: 'lesson-2' },
          metadata: { source: 'learning-system' },
          scheduling: {},
          retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      const result = await notificationService.sendBatch(notifications)

      expect(result.status).toBe('completed')
      expect(result.notifications.length).toBe(2)
      expect(result.results.length).toBe(2)
    })

    it('should handle mixed success/failure in batch', async () => {
      const notifications: NotificationPayload[] = [
        {
          id: 'batch-success',
          type: NotificationType.LESSON_COMPLETED,
          channel: NotificationChannel.EMAIL,
          priority: NotificationPriority.NORMAL,
          recipient: {
            userId: 'user-1',
            email: 'valid@example.com',
            preferences: {
              userId: 'user-1',
              channels: {
                [NotificationChannel.EMAIL]: {
                  enabled: true,
                  minPriority: NotificationPriority.LOW,
                  allowedTypes: Object.values(NotificationType),
                  rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                  deliveryOptions: {}
                },
                [NotificationChannel.PUSH]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.SMS]: {
                  enabled: false,
                  minPriority: NotificationPriority.CRITICAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.WEBHOOK]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.DISCORD]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.TELEGRAM]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                }
              },
              frequency: { immediate: [], batched: Object.values(NotificationType), disabled: [] },
              quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
              digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
              language: 'en',
              globalOptOut: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          },
          customContent: { title: 'Success', body: 'This should work' },
          data: {},
          metadata: { source: 'test' },
          scheduling: {},
          retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'batch-failure',
          type: NotificationType.LESSON_COMPLETED,
          channel: NotificationChannel.EMAIL,
          priority: NotificationPriority.NORMAL,
          recipient: {
            userId: 'user-2',
            email: 'invalid-email', // This should fail validation
            preferences: {
              userId: 'user-2',
              channels: {
                [NotificationChannel.EMAIL]: {
                  enabled: true,
                  minPriority: NotificationPriority.LOW,
                  allowedTypes: Object.values(NotificationType),
                  rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                  deliveryOptions: {}
                },
                [NotificationChannel.PUSH]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.SMS]: {
                  enabled: false,
                  minPriority: NotificationPriority.CRITICAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.WEBHOOK]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.DISCORD]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                },
                [NotificationChannel.TELEGRAM]: {
                  enabled: false,
                  minPriority: NotificationPriority.NORMAL,
                  allowedTypes: [],
                  rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                  deliveryOptions: {}
                }
              },
              frequency: { immediate: [], batched: Object.values(NotificationType), disabled: [] },
              quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
              digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
              language: 'en',
              globalOptOut: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          },
          customContent: { title: 'Failure', body: 'This should fail' },
          data: {},
          metadata: { source: 'test' },
          scheduling: {},
          retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      const result = await notificationService.sendBatch(notifications)

      expect(result.notifications.length).toBe(2)
      expect(result.results.length).toBe(2)
      expect(result.results.some(r => r.success)).toBe(true)
      expect(result.results.some(r => !r.success)).toBe(true)
    })
  })

  describe('A/B Testing', () => {
    it('should distribute traffic across A/B test variants', async () => {
      const basePayload: NotificationPayload = {
        id: 'ab-test-base',
        type: NotificationType.LESSON_COMPLETED,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.NORMAL,
        recipient: {
          userId: 'user-123',
          email: 'user@example.com',
          preferences: {
            userId: 'user-123',
            channels: {
              [NotificationChannel.EMAIL]: {
                enabled: true,
                minPriority: NotificationPriority.LOW,
                allowedTypes: Object.values(NotificationType),
                rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                deliveryOptions: {}
              },
              [NotificationChannel.PUSH]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.SMS]: {
                enabled: false,
                minPriority: NotificationPriority.CRITICAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.WEBHOOK]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.DISCORD]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.TELEGRAM]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              }
            },
            frequency: { immediate: [], batched: Object.values(NotificationType), disabled: [] },
            quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
            digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
            language: 'en',
            globalOptOut: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        customContent: { title: 'Base Version', body: 'Original content' },
        data: {},
        metadata: { source: 'ab-test' },
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const variants = [
        {
          id: 'variant-a',
          modifications: {
            customContent: { title: 'Variant A', body: 'Modified content A' }
          },
          trafficPercentage: 50
        },
        {
          id: 'variant-b',
          modifications: {
            customContent: { title: 'Variant B', body: 'Modified content B' }
          },
          trafficPercentage: 50
        }
      ]

      const selectedVariant = await notificationService.runABTest(basePayload, variants)

      expect(['variant-a', 'variant-b', 'control']).toContain(selectedVariant)
    })
  })

  describe('Error Handling', () => {
    it('should handle provider failures gracefully', async () => {
      // Mock provider failure
      const payload: NotificationPayload = {
        id: 'error-test',
        type: NotificationType.SYSTEM_UPDATE,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.NORMAL,
        recipient: {
          userId: 'user-123',
          email: 'user@example.com',
          preferences: {
            userId: 'user-123',
            channels: {
              [NotificationChannel.EMAIL]: {
                enabled: true,
                minPriority: NotificationPriority.LOW,
                allowedTypes: Object.values(NotificationType),
                rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                deliveryOptions: {}
              },
              [NotificationChannel.PUSH]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.SMS]: {
                enabled: false,
                minPriority: NotificationPriority.CRITICAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.WEBHOOK]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.DISCORD]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.TELEGRAM]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              }
            },
            frequency: { immediate: Object.values(NotificationType), batched: [], disabled: [] },
            quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
            digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
            language: 'en',
            globalOptOut: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        customContent: { title: 'Test', body: 'Error handling test' },
        data: {},
        metadata: { source: 'error-test' },
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await notificationService.sendNotification(payload)

      expect(result).toBeDefined()
      expect(typeof result.success).toBe('boolean')
      expect(typeof result.deliveryTime).toBe('number')
    })

    it('should validate notification payload', async () => {
      const invalidPayload = {
        id: '', // Invalid: empty ID
        type: 'INVALID_TYPE' as NotificationType,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.NORMAL,
        recipient: {
          userId: 'user-123',
          preferences: {} // Invalid: missing required preference fields
        },
        data: {},
        metadata: {},
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      } as unknown

      expect(async () => {
        await notificationService.sendNotification(invalidPayload as NotificationPayload)
      }).not.toThrow() // Service should handle validation gracefully
    })
  })

  describe('Analytics', () => {
    it('should collect and return analytics data', async () => {
      const timeRange = {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      }

      const analytics = await notificationService.getAnalytics(timeRange)

      expect(analytics).toBeDefined()
      expect(analytics.timeRange).toEqual(timeRange)
      expect(analytics.overall).toBeDefined()
      expect(analytics.byChannel).toBeDefined()
      expect(analytics.byType).toBeDefined()
    })
  })
})

describe('NotificationQueueManager', () => {
  let queueManager: NotificationQueueManager
  let mockConfig: QueueConfig

  beforeEach(() => {
    mockConfig = {
      redis: {
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: 3
      },
      queues: {
        email: {
          concurrency: 5,
          rateLimiter: { max: 100, duration: 60000 },
          defaultJobOptions: {
            removeOnComplete: 100,
            removeOnFail: 50,
            attempts: 3,
            backoff: { type: 'exponential' as const, delay: 2000 }
          }
        }
      },
      healthCheck: { interval: 60000, timeout: 30000 }
    }

    queueManager = new NotificationQueueManager(mockConfig)
  })

  afterEach(async () => {
    await queueManager.cleanup()
  })

  describe('Queue Operations', () => {
    it('should add notification to queue', async () => {
      const payload: NotificationPayload = {
        id: 'queue-test-1',
        type: NotificationType.PRICE_ALERT,
        channel: NotificationChannel.EMAIL,
        priority: NotificationPriority.HIGH,
        recipient: {
          userId: 'user-123',
          email: 'user@example.com',
          preferences: {
            userId: 'user-123',
            channels: {
              [NotificationChannel.EMAIL]: {
                enabled: true,
                minPriority: NotificationPriority.LOW,
                allowedTypes: Object.values(NotificationType),
                rateLimits: { perMinute: 5, perHour: 50, perDay: 200 },
                deliveryOptions: {}
              },
              [NotificationChannel.PUSH]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.SMS]: {
                enabled: false,
                minPriority: NotificationPriority.CRITICAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.WEBHOOK]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
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
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.DISCORD]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              },
              [NotificationChannel.TELEGRAM]: {
                enabled: false,
                minPriority: NotificationPriority.NORMAL,
                allowedTypes: [],
                rateLimits: { perMinute: 0, perHour: 0, perDay: 0 },
                deliveryOptions: {}
              }
            },
            frequency: { immediate: Object.values(NotificationType), batched: [], disabled: [] },
            quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
            digestSettings: { enabled: false, frequency: 'daily', time: '09:00' },
            language: 'en',
            globalOptOut: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        customContent: { title: 'Queue Test', body: 'Testing queue functionality' },
        data: { symbol: 'BTC' },
        metadata: { source: 'queue-test' },
        scheduling: {},
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, maxBackoffDelay: 300 },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const jobId = await queueManager.addNotification(payload)

      expect(jobId).toBeDefined()
      expect(typeof jobId).toBe('string')
    })

    it('should handle queue metrics collection', async () => {
      const metrics = await queueManager.getQueueMetrics()

      expect(metrics).toBeDefined()
      expect(typeof metrics).toBe('object')
    })

    it('should provide health status', async () => {
      const health = await queueManager.getHealthStatus()

      expect(health).toBeDefined()
      expect(typeof health).toBe('object')
    })
  })
})

describe('EmailProviderManager', () => {
  let providerManager: EmailProviderManager

  beforeEach(() => {
    // Set up test environment variables
    process.env.RESEND_API_KEY = 'test-resend-key'
    process.env.SENDGRID_API_KEY = 'test-sendgrid-key'
    
    providerManager = new EmailProviderManager()
  })

  afterEach(() => {
    providerManager.cleanup()
    delete process.env.RESEND_API_KEY
    delete process.env.SENDGRID_API_KEY
  })

  describe('Provider Management', () => {
    it('should initialize providers from environment variables', () => {
      const status = providerManager.getProviderStatus()

      expect(status.length).toBeGreaterThan(0)
      expect(status.some(p => p.name === 'resend')).toBe(true)
      expect(status.some(p => p.name === 'sendgrid')).toBe(true)
    })

    it('should attempt to send email through available providers', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Email',
        text: 'This is a test email',
        html: '<p>This is a test email</p>'
      }

      const result = await providerManager.sendEmail(message)

      expect(result).toBeDefined()
      expect(typeof result.success).toBe('boolean')
      expect(typeof result.deliveryTime).toBe('number')
    })
  })
})
