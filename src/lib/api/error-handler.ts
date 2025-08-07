import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  context?: Record<string, unknown>;
}

export class ApiErrorHandler {
  static createError(
    message: string,
    statusCode: number = 500,
    code?: string,
    context?: Record<string, unknown>
  ): ApiError {
    const error = new Error(message) as ApiError;
    error.statusCode = statusCode;
    error.code = code;
    error.context = context;
    return error;
  }

  static handleError(error: unknown, context?: Record<string, unknown>): NextResponse {
    // エラーの詳細を取得
    const errorDetails = this.getErrorDetails(error);
    
    // Sentryにエラーを報告（本番環境のみ）
    if (process.env.NODE_ENV === 'production' || process.env.SENTRY_REPORT_IN_DEV === 'true') {
      Sentry.captureException(error, {
        extra: {
          ...errorDetails.context,
          ...context,
          statusCode: errorDetails.statusCode,
          errorCode: errorDetails.code,
        },
        tags: {
          source: 'api',
          statusCode: String(errorDetails.statusCode),
        },
      });
    }
    
    // 開発環境では詳細なエラー情報をログ出力
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        message: errorDetails.message,
        statusCode: errorDetails.statusCode,
        code: errorDetails.code,
        context: { ...errorDetails.context, ...context },
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    
    // クライアントへのレスポンス
    return NextResponse.json(
      {
        error: {
          message: this.getSafeErrorMessage(errorDetails),
          code: errorDetails.code,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              statusCode: errorDetails.statusCode,
              context: errorDetails.context,
            },
          }),
        },
      },
      { status: errorDetails.statusCode }
    );
  }

  private static getErrorDetails(error: unknown): {
    message: string;
    statusCode: number;
    code?: string;
    context?: Record<string, unknown>;
  } {
    // カスタムAPIエラー
    if (error instanceof Error && 'statusCode' in error) {
      const apiError = error as ApiError;
      return {
        message: apiError.message,
        statusCode: apiError.statusCode || 500,
        code: apiError.code,
        context: apiError.context,
      };
    }
    
    // Supabaseエラー
    if (
      error instanceof Error &&
      typeof (error as { status?: unknown }).status !== 'undefined'
    ) {
      const supabaseError = error as {
        message: string;
        status?: number;
        code?: string;
        details?: unknown;
      };
      return {
        message: supabaseError.message,
        statusCode: supabaseError.status ?? 500,
        code: supabaseError.code,
        context: { details: supabaseError.details },
      };
    }
    
    // 通常のエラー
    if (error instanceof Error) {
      return {
        message: error.message,
        statusCode: 500,
        context: { name: error.name },
      };
    }
    
    // 不明なエラー
    return {
      message: 'An unexpected error occurred',
      statusCode: 500,
      context: { error: String(error) },
    };
  }

  private static getSafeErrorMessage(errorDetails: {
    message: string;
    statusCode: number;
    code?: string;
  }): string {
    // 本番環境では機密情報を含む可能性のあるエラーメッセージを隠す
    if (process.env.NODE_ENV === 'production') {
      // クライアントに表示しても安全なエラーメッセージ
      const safeMessages: Record<number, string> = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        429: 'Too Many Requests',
        500: 'Internal Server Error',
        503: 'Service Unavailable',
      };
      
      // 特定のエラーコードに対するカスタムメッセージ
      const codeMessages: Record<string, string> = {
        'auth/invalid-credentials': 'Invalid email or password',
        'auth/user-not-found': 'User not found',
        'auth/email-already-in-use': 'Email already in use',
        'limit/exceeded': 'Usage limit exceeded',
        'api/invalid-key': 'Invalid API key',
      };
      
      if (errorDetails.code && codeMessages[errorDetails.code]) {
        return codeMessages[errorDetails.code];
      }
      
      return safeMessages[errorDetails.statusCode] || 'An error occurred';
    }
    
    // 開発環境では元のエラーメッセージを返す
    return errorDetails.message;
  }

  // 便利なメソッド
  static unauthorized(message = 'Unauthorized', context?: Record<string, unknown>): NextResponse {
    return this.handleError(this.createError(message, 401, 'auth/unauthorized', context));
  }

  static forbidden(message = 'Forbidden', context?: Record<string, unknown>): NextResponse {
    return this.handleError(this.createError(message, 403, 'auth/forbidden', context));
  }

  static notFound(message = 'Not Found', context?: Record<string, unknown>): NextResponse {
    return this.handleError(this.createError(message, 404, 'resource/not-found', context));
  }

  static badRequest(message = 'Bad Request', context?: Record<string, unknown>): NextResponse {
    return this.handleError(this.createError(message, 400, 'request/invalid', context));
  }

  static tooManyRequests(message = 'Too Many Requests', context?: Record<string, unknown>): NextResponse {
    return this.handleError(this.createError(message, 429, 'limit/exceeded', context));
  }

  static serverError(message = 'Internal Server Error', context?: Record<string, unknown>): NextResponse {
    return this.handleError(this.createError(message, 500, 'server/error', context));
  }
} 