// 🚨 統一エラーハンドリングシステム
// アプリケーション全体で一貫したエラー処理を提供

import { logger } from '@/lib/monitoring/logger';

// エラータイプ定義
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SECURITY = 'SECURITY',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  EXTERNAL_API = 'EXTERNAL_API',
  DATABASE = 'DATABASE',
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  AI_SERVICE = 'AI_SERVICE',
  PAYMENT = 'PAYMENT',
  FILE_UPLOAD = 'FILE_UPLOAD',
  UNKNOWN = 'UNKNOWN'
}

// エラー重要度
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// エラーメタデータ
export interface ErrorMetadata {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  url?: string;
  method?: string;
  timestamp: Date;
  stack?: string;
  context?: Record<string, unknown>;
  // Additional fields for error middleware
  validationErrors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  service?: string;
  field?: string;
  operation?: string;
  provider?: string;
  limit?: number;
  window?: string;
}

// カスタムエラークラス
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly severity: ErrorSeverity;
  public readonly code: string;
  public readonly statusCode: number;
  public readonly metadata: ErrorMetadata;
  public readonly isOperational: boolean;
  public readonly userMessage: string;

  constructor(
    message: string,
    type: ErrorType,
    severity: ErrorSeverity,
    code: string,
    statusCode: number = 500,
    userMessage?: string,
    metadata: Partial<ErrorMetadata> = {},
    isOperational: boolean = true
  ) {
    super(message);
    
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.userMessage = userMessage || this.getDefaultUserMessage(type);
    
    this.metadata = {
      timestamp: new Date(),
      stack: this.stack,
      ...metadata
    };

    // スタックトレースをキャプチャ
    Error.captureStackTrace(this, this.constructor);
  }

  private getDefaultUserMessage(type: ErrorType): string {
    const messages: Record<ErrorType, string> = {
      [ErrorType.VALIDATION]: '入力データに問題があります。内容を確認してください。',
      [ErrorType.AUTHENTICATION]: '認証に失敗しました。ログインし直してください。',
      [ErrorType.AUTHORIZATION]: 'この操作を実行する権限がありません。',
      [ErrorType.SECURITY]: 'セキュリティ関連の問題が検出されました。',
      [ErrorType.NOT_FOUND]: 'お探しのリソースが見つかりません。',
      [ErrorType.RATE_LIMIT]: 'リクエスト数が上限に達しました。しばらく待ってから再試行してください。',
      [ErrorType.EXTERNAL_API]: '外部サービスとの通信に失敗しました。しばらく待ってから再試行してください。',
      [ErrorType.DATABASE]: 'データベース操作でエラーが発生しました。',
      [ErrorType.NETWORK]: 'ネットワークエラーが発生しました。接続を確認してください。',
      [ErrorType.SERVER]: 'サーバーエラーが発生しました。しばらく待ってから再試行してください。',
      [ErrorType.CLIENT]: 'クライアントエラーが発生しました。',
      [ErrorType.BUSINESS_LOGIC]: '操作を完了できませんでした。',
      [ErrorType.AI_SERVICE]: 'AI サービスでエラーが発生しました。',
      [ErrorType.PAYMENT]: '決済処理でエラーが発生しました。',
      [ErrorType.FILE_UPLOAD]: 'ファイルのアップロードに失敗しました。',
      [ErrorType.UNKNOWN]: '予期しないエラーが発生しました。'
    };
    
    return messages[type];
  }

  // JSON形式でシリアライズ
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      userMessage: this.userMessage,
      type: this.type,
      severity: this.severity,
      code: this.code,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      metadata: this.metadata
    };
  }
}

// 定義済みエラークラス
export class ValidationError extends AppError {
  constructor(message: string, field?: string, metadata?: Partial<ErrorMetadata>) {
    super(
      message,
      ErrorType.VALIDATION,
      ErrorSeverity.LOW,
      'VALIDATION_ERROR',
      400,
      '入力データに問題があります。',
      { ...metadata, field },
      true
    );
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed', metadata?: Partial<ErrorMetadata>) {
    super(
      message,
      ErrorType.AUTHENTICATION,
      ErrorSeverity.MEDIUM,
      'AUTH_ERROR',
      401,
      '認証に失敗しました。ログインし直してください。',
      metadata,
      true
    );
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Authorization failed', metadata?: Partial<ErrorMetadata>) {
    super(
      message,
      ErrorType.AUTHORIZATION,
      ErrorSeverity.MEDIUM,
      'AUTHZ_ERROR',
      403,
      'この操作を実行する権限がありません。',
      metadata,
      true
    );
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, metadata?: Partial<ErrorMetadata>) {
    super(
      `${resource} not found`,
      ErrorType.NOT_FOUND,
      ErrorSeverity.LOW,
      'NOT_FOUND',
      404,
      'お探しのリソースが見つかりません。',
      metadata,
      true
    );
  }
}

export class RateLimitError extends AppError {
  constructor(limit: number, window: string, metadata?: Partial<ErrorMetadata>) {
    super(
      `Rate limit exceeded: ${limit} requests per ${window}`,
      ErrorType.RATE_LIMIT,
      ErrorSeverity.MEDIUM,
      'RATE_LIMIT',
      429,
      'リクエスト数が上限に達しました。しばらく待ってから再試行してください。',
      { ...metadata, limit, window },
      true
    );
  }
}

export class ExternalAPIError extends AppError {
  constructor(service: string, message: string, statusCode?: number, metadata?: Partial<ErrorMetadata>) {
    super(
      `External API error from ${service}: ${message}`,
      ErrorType.EXTERNAL_API,
      ErrorSeverity.MEDIUM,
      'EXTERNAL_API_ERROR',
      statusCode || 502,
      '外部サービスとの通信に失敗しました。',
      { ...metadata, service },
      true
    );
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string, message: string, metadata?: Partial<ErrorMetadata>) {
    super(
      `Database ${operation} failed: ${message}`,
      ErrorType.DATABASE,
      ErrorSeverity.HIGH,
      'DATABASE_ERROR',
      500,
      'データベース操作でエラーが発生しました。',
      { ...metadata, operation },
      true
    );
  }
}

export class AIServiceError extends AppError {
  constructor(service: string, message: string, metadata?: Partial<ErrorMetadata>) {
    super(
      `AI service ${service} error: ${message}`,
      ErrorType.AI_SERVICE,
      ErrorSeverity.MEDIUM,
      'AI_SERVICE_ERROR',
      500,
      'AI サービスでエラーが発生しました。',
      { ...metadata, service },
      true
    );
  }
}

export class PaymentError extends AppError {
  constructor(message: string, provider: string, metadata?: Partial<ErrorMetadata>) {
    super(
      `Payment error via ${provider}: ${message}`,
      ErrorType.PAYMENT,
      ErrorSeverity.HIGH,
      'PAYMENT_ERROR',
      402,
      '決済処理でエラーが発生しました。',
      { ...metadata, provider },
      true
    );
  }
}

// エラーハンドラークラス
export class ErrorHandler {
  private static instance: ErrorHandler;
  
  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // エラーをログに記録
  async logError(error: Error | AppError, context?: Record<string, unknown>): Promise<void> {
    const isAppError = error instanceof AppError;
    const errorData: Record<string, unknown> = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(isAppError && {
        type: error.type,
        severity: error.severity,
        code: error.code,
        statusCode: error.statusCode,
        metadata: (error as AppError).metadata,
        isOperational: error.isOperational
      }),
      context
    };

    // 重要度に応じてログレベルを決定
    if (isAppError) {
      switch (error.severity) {
        case ErrorSeverity.LOW:
          logger.info('Application error (LOW)', errorData);
          break;
        case ErrorSeverity.MEDIUM:
          logger.warn('Application error (MEDIUM)', errorData);
          break;
        case ErrorSeverity.HIGH:
          logger.error('Application error (HIGH)', errorData);
          break;
        case ErrorSeverity.CRITICAL:
          logger.error('Application error (CRITICAL)', errorData);
          await this.sendCriticalAlert(error);
          break;
      }
    } else {
      logger.error('Unhandled error', errorData);
    }

    // Sentry等の外部サービスに送信
    await this.reportToExternalServices(error, context);
  }

  // 外部サービスへのエラー報告
  private async reportToExternalServices(error: Error | AppError, context?: Record<string, unknown>): Promise<void> {
    try {
      // Sentry
      if (typeof window !== 'undefined' && (window as { Sentry?: unknown }).Sentry) {
        type SentryScope = { setTag: (k: string, v: unknown) => void; setContext: (k: string, v: unknown) => void }
        type SentryLike = { withScope: (cb: (scope: SentryScope) => void) => void; captureException: (e: unknown) => void }
        const anyWin = window as { Sentry?: unknown }
        const sentry: SentryLike | null = ((): SentryLike | null => {
          const s = anyWin.Sentry as { withScope?: unknown; captureException?: unknown } | undefined
          if (s && typeof s.withScope === 'function' && typeof s.captureException === 'function') {
            return s as SentryLike
          }
          return null
        })()
        
        if (sentry) {
          if (error instanceof AppError) {
            sentry.withScope((scope) => {
              scope.setTag('errorType', error.type)
              scope.setTag('errorSeverity', error.severity)
              scope.setTag('errorCode', error.code)
              scope.setContext('metadata', error.metadata)
              scope.setContext('context', context as Record<string, unknown> | undefined)
              sentry.captureException(error)
            })
          } else {
            sentry.withScope((scope) => {
              scope.setContext('context', context as Record<string, unknown> | undefined)
              sentry.captureException(error)
            })
          }
        }
      }

      // その他の外部サービス（DataDog、Bugsnag等）への送信も可能
    } catch (reportError) {
      logger.error('Failed to report error to external services', {
        originalError: error.message,
        reportError: reportError instanceof Error ? reportError.message : reportError
      });
    }
  }

  // 重大エラーのアラート送信
  private async sendCriticalAlert(error: AppError): Promise<void> {
    try {
      // Slack、Teams、メール等への緊急通知
      // 実装例（環境に応じて調整）
      if (process.env.SLACK_WEBHOOK_URL) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚨 CRITICAL ERROR: ${error.message}`,
            attachments: [{
              color: 'danger',
              fields: [
                { title: 'Error Type', value: error.type, short: true },
                { title: 'Code', value: error.code, short: true },
                { title: 'User ID', value: error.metadata.userId || 'N/A', short: true },
                { title: 'Timestamp', value: error.metadata.timestamp.toISOString(), short: true }
              ]
            }]
          })
        });
      }
    } catch (alertError) {
      logger.error('Failed to send critical alert', {
        originalError: error.message,
        alertError: alertError instanceof Error ? alertError.message : alertError
      });
    }
  }

  // エラーからHTTPレスポンスを生成
  createErrorResponse(error: Error | AppError) {
    if (error instanceof AppError) {
      return {
        error: {
          code: error.code,
          message: error.userMessage,
          type: error.type,
          severity: error.severity,
          ...(process.env.NODE_ENV === 'development' && {
            details: error.message,
            stack: error.stack
          })
        },
        statusCode: error.statusCode,
        timestamp: new Date().toISOString()
      };
    }

    // 未知のエラーの場合は詳細を隠す
    return {
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'サーバーエラーが発生しました。しばらく待ってから再試行してください。',
        type: ErrorType.UNKNOWN,
        severity: ErrorSeverity.HIGH,
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message,
          stack: error.stack
        })
      },
      statusCode: 500,
      timestamp: new Date().toISOString()
    };
  }

  // プロセス未処理例外のハンドリング
  setupGlobalErrorHandlers(): void {
    // 未捕捉例外
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
      this.logError(error, { source: 'uncaughtException' });
      
      // グレースフルシャットダウン
      process.exit(1);
    });

    // 未処理Promise拒否
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('Unhandled Rejection', { reason: reason instanceof Error ? reason.message : String(reason) });
      
      if (reason instanceof Error) {
        this.logError(reason, { source: 'unhandledRejection' });
      } else {
        this.logError(new Error(String(reason)), { source: 'unhandledRejection' });
      }
    });
  }
}

// ヘルパー関数
export function handleError(error: Error | AppError, context?: Record<string, unknown>) {
  const handler = ErrorHandler.getInstance();
  return handler.logError(error, context);
}

export function createErrorResponse(error: Error | AppError) {
  const handler = ErrorHandler.getInstance();
  return handler.createErrorResponse(error);
}

// React Hook for Error Handling
export function useErrorHandler() {
  const handler = ErrorHandler.getInstance();
  
  return {
    handleError: (error: Error | AppError, context?: Record<string, unknown>) => 
      handler.logError(error, context),
    createResponse: (error: Error | AppError) => 
      handler.createErrorResponse(error)
  };
}

// エラーハンドリングデコレーター
export function withErrorHandler(target: unknown, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = async function (...args: unknown[]) {
    try {
      return await method.apply(this, args);
    } catch (error) {
      const handler = ErrorHandler.getInstance();
      await handler.logError(error instanceof Error ? error : new Error(String(error)), {
        method: propertyName,
        args: args.length
      });
      throw error;
    }
  };
}

// シングルトンインスタンス
export const errorHandler = ErrorHandler.getInstance();

// グローバルエラーハンドラーを設定（サーバー環境のみ）
if (typeof process !== 'undefined' && process.env.NODE_ENV) {
  errorHandler.setupGlobalErrorHandlers();
}
