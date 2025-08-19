/**
 * カスタムアプリケーションエラークラス
 * 統一されたエラー処理のための基底クラス
 */

import { 
  ErrorType, 
  ErrorSeverity, 
  ErrorContext, 
  ApplicationError as IApplicationError 
} from './types'

export class ApplicationError extends Error implements IApplicationError {
  public readonly type: ErrorType
  public readonly code: string
  public readonly severity: ErrorSeverity
  public readonly context?: ErrorContext
  public readonly originalError?: Error
  public readonly isOperational: boolean
  public readonly statusCode: number
  public readonly userMessage?: string
  public readonly retryable: boolean
  public readonly metadata?: Record<string, unknown>

  constructor(params: {
    type: ErrorType
    code: string
    message: string
    severity?: ErrorSeverity
    context?: ErrorContext
    originalError?: Error
    isOperational?: boolean
    statusCode?: number
    userMessage?: string
    retryable?: boolean
    metadata?: Record<string, unknown>
  }) {
    super(params.message)
    
    this.name = 'ApplicationError'
    this.type = params.type
    this.code = params.code
    this.severity = params.severity || ErrorSeverity.MEDIUM
    this.context = params.context
    this.originalError = params.originalError
    this.isOperational = params.isOperational ?? true
    this.statusCode = params.statusCode || this.getDefaultStatusCode()
    this.userMessage = params.userMessage || this.getDefaultUserMessage()
    this.retryable = params.retryable ?? false
    this.metadata = params.metadata

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor)
  }

  private getDefaultStatusCode(): number {
    switch (this.type) {
      case ErrorType.VALIDATION:
        return 400
      case ErrorType.AUTHENTICATION:
        return 401
      case ErrorType.AUTHORIZATION:
        return 403
      case ErrorType.NOT_FOUND:
        return 404
      case ErrorType.CONFLICT:
        return 409
      case ErrorType.RATE_LIMIT:
        return 429
      case ErrorType.EXTERNAL_API:
      case ErrorType.DATABASE:
      case ErrorType.NETWORK:
      case ErrorType.SYSTEM:
        return 503
      default:
        return 500
    }
  }

  private getDefaultUserMessage(): string {
    switch (this.type) {
      case ErrorType.VALIDATION:
        return 'The request contains invalid data. Please check and try again.'
      case ErrorType.AUTHENTICATION:
        return 'Authentication failed. Please log in and try again.'
      case ErrorType.AUTHORIZATION:
        return 'You do not have permission to perform this action.'
      case ErrorType.NOT_FOUND:
        return 'The requested resource was not found.'
      case ErrorType.CONFLICT:
        return 'The request conflicts with the current state.'
      case ErrorType.RATE_LIMIT:
        return 'Too many requests. Please try again later.'
      case ErrorType.EXTERNAL_API:
        return 'An external service is temporarily unavailable.'
      case ErrorType.DATABASE:
        return 'A database error occurred. Please try again.'
      case ErrorType.NETWORK:
        return 'A network error occurred. Please check your connection.'
      case ErrorType.SYSTEM:
        return 'A system error occurred. Our team has been notified.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  toJSON() {
    return {
      type: this.type,
      code: this.code,
      message: this.message,
      severity: this.severity,
      statusCode: this.statusCode,
      userMessage: this.userMessage,
      retryable: this.retryable,
      context: this.context,
      metadata: this.metadata,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
    }
  }
}

// Convenience factory functions
export const ValidationError = (code: string, message: string, context?: ErrorContext) =>
  new ApplicationError({
    type: ErrorType.VALIDATION,
    code,
    message,
    severity: ErrorSeverity.LOW,
    context
  })

export const AuthenticationError = (code: string, message: string, context?: ErrorContext) =>
  new ApplicationError({
    type: ErrorType.AUTHENTICATION,
    code,
    message,
    severity: ErrorSeverity.MEDIUM,
    context
  })

export const AuthorizationError = (code: string, message: string, context?: ErrorContext) =>
  new ApplicationError({
    type: ErrorType.AUTHORIZATION,
    code,
    message,
    severity: ErrorSeverity.MEDIUM,
    context
  })

export const NotFoundError = (code: string, message: string, context?: ErrorContext) =>
  new ApplicationError({
    type: ErrorType.NOT_FOUND,
    code,
    message,
    severity: ErrorSeverity.LOW,
    context
  })

export const ConflictError = (code: string, message: string, context?: ErrorContext) =>
  new ApplicationError({
    type: ErrorType.CONFLICT,
    code,
    message,
    severity: ErrorSeverity.MEDIUM,
    context
  })

export const RateLimitError = (code: string, message: string, context?: ErrorContext) =>
  new ApplicationError({
    type: ErrorType.RATE_LIMIT,
    code,
    message,
    severity: ErrorSeverity.LOW,
    context,
    retryable: true
  })

export const ExternalApiError = (
  code: string, 
  message: string, 
  originalError?: Error,
  context?: ErrorContext
) =>
  new ApplicationError({
    type: ErrorType.EXTERNAL_API,
    code,
    message,
    severity: ErrorSeverity.HIGH,
    context,
    originalError,
    retryable: true
  })

export const DatabaseError = (
  code: string,
  message: string,
  originalError?: Error,
  context?: ErrorContext
) =>
  new ApplicationError({
    type: ErrorType.DATABASE,
    code,
    message,
    severity: ErrorSeverity.HIGH,
    context,
    originalError,
    retryable: true
  })

export const SystemError = (
  code: string,
  message: string,
  originalError?: Error,
  context?: ErrorContext
) =>
  new ApplicationError({
    type: ErrorType.SYSTEM,
    code,
    message,
    severity: ErrorSeverity.CRITICAL,
    context,
    originalError,
    isOperational: false
  })
