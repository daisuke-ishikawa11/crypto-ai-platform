/**
 * 統一エラー型定義
 * 一貫性のあるエラーハンドリングのための型システム
 */

export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT = 'RATE_LIMIT',
  EXTERNAL_API = 'EXTERNAL_API',
  DATABASE = 'DATABASE',
  NETWORK = 'NETWORK',
  SYSTEM = 'SYSTEM',
  UNKNOWN = 'UNKNOWN'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ErrorContext {
  userId?: string
  requestId?: string
  endpoint?: string
  method?: string
  userAgent?: string
  ipAddress?: string
  timestamp: Date
  correlationId?: string
  [key: string]: unknown
}

export interface ApplicationError extends Error {
  type: ErrorType
  code: string
  severity: ErrorSeverity
  context?: ErrorContext
  originalError?: Error
  isOperational: boolean
  statusCode: number
  userMessage?: string
  retryable: boolean
  metadata?: Record<string, unknown>
}

export interface ErrorResponse {
  error: {
    type: ErrorType
    code: string
    message: string
    details?: unknown
    requestId?: string
    timestamp: string
    retryable?: boolean
  }
}

export interface ErrorLogEntry {
  id: string
  type: ErrorType
  code: string
  severity: ErrorSeverity
  message: string
  stack?: string
  context: ErrorContext
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface ErrorMetrics {
  errorCount: number
  errorRate: number
  errorsByType: Record<ErrorType, number>
  errorsBySeverity: Record<ErrorSeverity, number>
  topErrors: Array<{
    code: string
    count: number
    lastOccurred: Date
  }>
  timeRange: {
    start: Date
    end: Date
  }
}

export interface ErrorHandlerConfig {
  logLevel: ErrorSeverity
  enableStackTrace: boolean
  enableSentry: boolean
  sentryDsn?: string
  enableDatadog: boolean
  datadogApiKey?: string
  maxErrorsPerMinute: number
  circuitBreakerThreshold: number
  errorRetentionDays: number
  notificationWebhooks: string[]
}

export interface ErrorRecoveryStrategy {
  type: 'retry' | 'fallback' | 'circuit-break' | 'ignore'
  maxRetries?: number
  retryDelay?: number
  fallbackAction?: () => Promise<unknown>
  circuitBreakerTimeout?: number
}

export interface ErrorNotification {
  severity: ErrorSeverity
  recipients: string[]
  channels: ('email' | 'sms' | 'slack' | 'webhook')[]
  template: string
  metadata: Record<string, unknown>
}
