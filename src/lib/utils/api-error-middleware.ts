// 🚨 API エラーハンドリングミドルウェア
// Next.js API Routes用の統一エラーハンドリング

import { NextRequest, NextResponse } from 'next/server';
import { 
  AppError, 
  ErrorHandler, 
  ValidationError, 
  AuthenticationError,
  RateLimitError,
  ExternalAPIError,
  DatabaseError,
  ErrorType,
  type ErrorMetadata
} from '@/lib/errors/error-handler';
import { z } from 'zod';

// Define Zod types for compatibility (used in createCustomZodErrorMap)
type $ZodIssue = {
  [x: string]: unknown;
  readonly input?: unknown;
  readonly code: string;
  readonly expected?: string | number | boolean | symbol | undefined | null;
  readonly received?: string | number | boolean | symbol | undefined | null;
  readonly minimum?: unknown;
  readonly maximum?: unknown;
  readonly path: PropertyKey[];
  readonly message?: string;
};

// type $ZodErrorMap<T extends $ZodIssue = $ZodIssue> = (
//   issue: T,
//   _ctx?: { defaultError: string; data?: unknown }
// ) => { message: string }; // Unused type temporarily commented out

type ApiHandler = (request: NextRequest) => Promise<NextResponse>;

interface ErrorMiddlewareOptions {
  enableLogging?: boolean;
  enableSentry?: boolean;
  hideStack?: boolean;
  customErrorMessages?: Record<string, string>;
}

// 🔧 エラーハンドリングミドルウェア
export function withErrorHandling(
  handler: ApiHandler,
  options: ErrorMiddlewareOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const errorHandler = ErrorHandler.getInstance();
    
    try {
      return await handler(request);
    } catch (error) {
      // エラーをログに記録
      if (options.enableLogging !== false) {
        await errorHandler.logError(
          error instanceof Error ? error : new Error(String(error)),
          {
            url: request.url,
            method: request.method,
            userAgent: request.headers.get('user-agent') || undefined,
            ip: request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || undefined,
            timestamp: new Date().toISOString()
          }
        );
      }

      // エラーレスポンスを生成
      const errorResponse = errorHandler.createErrorResponse(
        error instanceof Error ? error : new Error(String(error))
      );

      // カスタムエラーメッセージを適用
      if (options.customErrorMessages && error instanceof AppError) {
        const customMessage = options.customErrorMessages[error.code];
        if (customMessage) {
          errorResponse.error.message = customMessage;
        }
      }

      // 本番環境ではスタックトレースを隠す
      if (options.hideStack || process.env.NODE_ENV === 'production') {
        const errorObj = errorResponse.error as Record<string, unknown>;
        delete errorObj.stack;
        delete errorObj.details;
      }

      return NextResponse.json(errorResponse, { 
        status: errorResponse.statusCode,
        headers: {
          'Content-Type': 'application/json',
          'X-Error-Code': error instanceof AppError ? error.code : 'UNKNOWN_ERROR',
          'X-Error-Type': error instanceof AppError ? error.type : ErrorType.UNKNOWN
        }
      });
    }
  };
}

// 🛡️ バリデーション付きエラーハンドリング
export function withValidation<T>(
  handler: (request: NextRequest, data: T) => Promise<NextResponse>,
  schema: z.ZodSchema<T>,
  options: ErrorMiddlewareOptions = {}
) {
  return withErrorHandling(async (request: NextRequest) => {
    let data: T;

    try {
      const body = await request.json();
      data = schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code
        }));

        throw new ValidationError(
          'リクエストデータのバリデーションに失敗しました',
          validationErrors[0]?.field,
          { validationErrors } as Partial<ErrorMetadata>
        );
      }
      throw error;
    }

    return await handler(request, data);
  }, options);
}

// 🔐 認証付きエラーハンドリング
export function withAuth(
  handler: (request: NextRequest, user: { id: string; email?: string }) => Promise<NextResponse>,
  options: ErrorMiddlewareOptions = {}
) {
  return withErrorHandling(async (request: NextRequest) => {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('認証トークンが必要です');
    }

    const token = authHeader.substring(7);
    
    try {
      // JWT検証（実装に応じて調整）
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        throw new AuthenticationError('無効な認証トークンです');
      }

      return await handler(request, user);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AuthenticationError('認証処理中にエラーが発生しました');
    }
  }, options);
}

// ⏱️ レート制限付きエラーハンドリング
export function withRateLimit(
  handler: ApiHandler,
  limit: number,
  window: number, // ミリ秒
  options: ErrorMiddlewareOptions = {}
) {
  const requests = new Map<string, number[]>();

  return withErrorHandling(async (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown';
    
    const now = Date.now();
    const windowStart = now - window;
    
    // 現在のリクエスト履歴を取得
    const requestTimes = requests.get(ip) || [];
    
    // 古いリクエストを除去
    const validRequests = requestTimes.filter(time => time > windowStart);
    
    // レート制限チェック
    if (validRequests.length >= limit) {
      throw new RateLimitError(limit, `${window}ms`, { ip } as Partial<ErrorMetadata>);
    }
    
    // 新しいリクエストを記録
    validRequests.push(now);
    requests.set(ip, validRequests);
    
    return await handler(request);
  }, options);
}

// 🔧 ヘルパー関数：よく使われるエラーパターン

// データベースエラーのラッピング
export function handleDatabaseError(operation: string) {
  return (error: { code?: string; message: string }) => {
    if (error.code === '23505') { // PostgreSQL unique violation
      throw new ValidationError('データが既に存在します', 'unique_constraint');
    }
    if (error.code === '23503') { // PostgreSQL foreign key violation
      throw new ValidationError('参照整合性エラーです', 'foreign_key');
    }
    if (error.code === '23514') { // PostgreSQL check violation
      throw new ValidationError('データの制約に違反しています', 'check_constraint');
    }
    
    throw new DatabaseError(operation, error.message);
  };
}

// 外部APIエラーのラッピング  
export function handleExternalApiError(service: string) {
  return (error: {
    response?: { status: number; data?: { message?: string } };
    code?: string;
    message: string;
  }) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      if (status === 401) {
        throw new ExternalAPIError(service, 'API認証エラー', 401);
      }
      if (status === 403) {
        throw new ExternalAPIError(service, 'APIアクセス権限エラー', 403);
      }
      if (status === 429) {
        throw new RateLimitError(0, 'unknown', { service } as Partial<ErrorMetadata>);
      }
      if (status >= 500) {
        throw new ExternalAPIError(service, 'APIサーバーエラー', status);
      }
      
      throw new ExternalAPIError(service, message, status);
    }
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new ExternalAPIError(service, 'API接続エラー', 503);
    }
    
    if (error.code === 'ETIMEDOUT') {
      throw new ExternalAPIError(service, 'APIタイムアウト', 408);
    }
    
    throw new ExternalAPIError(service, error.message);
  };
}

// Zodエラーのカスタマイズ
export function createCustomZodErrorMap(): unknown {
  return (issue: unknown, _ctx?: { defaultError: string; data?: unknown }): { message: string } => {
    const i = issue as z.ZodIssue
    switch (i.code) {
      case z.ZodIssueCode.invalid_type:
        const invalidTypeIssue = i as { expected?: unknown };
        if (invalidTypeIssue.expected === 'string') {
          return { message: '文字列を入力してください' };
        }
        if (invalidTypeIssue.expected === 'number') {
          return { message: '数値を入力してください' };
        }
        if (invalidTypeIssue.expected === 'boolean') {
          return { message: 'true/falseを指定してください' };
        }
        if (invalidTypeIssue.expected === 'date') {
          return { message: '有効な日付を入力してください' };
        }
        break;
      
      case z.ZodIssueCode.too_small:
        const tooSmallIssue = i as { minimum?: unknown };
        if (typeof tooSmallIssue.minimum === 'number') {
          return { message: `${tooSmallIssue.minimum}以上の値または文字数が必要です` };
        }
        break;
      
      case z.ZodIssueCode.too_big:
        const tooBigIssue = i as { maximum?: unknown };
        if (typeof tooBigIssue.maximum === 'number') {
          return { message: `${tooBigIssue.maximum}以下の値または文字数にしてください` };
        }
        break;
      
      case z.ZodIssueCode.invalid_format:
        // In Zod v4, string validations are handled through invalid_format
        if (i.path.length > 0) {
          const fieldName = i.path[i.path.length - 1];
          if (typeof fieldName === 'string') {
            if (fieldName.includes('email')) {
              return { message: '有効なメールアドレスを入力してください' };
            }
            if (fieldName.includes('url')) {
              return { message: '有効なURLを入力してください' };
            }
            if (fieldName.includes('uuid')) {
              return { message: '有効なUUIDを入力してください' };
            }
          }
        }
        return { message: '入力形式が正しくありません' };
      
      case z.ZodIssueCode.unrecognized_keys:
        return { message: '不正なキーが含まれています' };
      
      default:
        return { message: 'バリデーションエラーが発生しました' };
    }
    
    return { message: 'バリデーションエラーが発生しました' };
  };
}

// Zodエラーマップを設定
// Zod configuration - commented out to avoid type errors
// z.setErrorMap(createCustomZodErrorMap());

// 使用例用の統合ミドルウェア
export function createApiHandler(options: {
  handler: ApiHandler;
  schema?: z.ZodSchema<unknown>;
  requireAuth?: boolean;
  rateLimit?: { limit: number; window: number };
  errorOptions?: ErrorMiddlewareOptions;
}) {
  let wrappedHandler = options.handler;

  // レート制限
  if (options.rateLimit) {
    wrappedHandler = withRateLimit(
      wrappedHandler, 
      options.rateLimit.limit, 
      options.rateLimit.window,
      options.errorOptions
    );
  }

  // 認証
  if (options.requireAuth) {
    wrappedHandler = withAuth(wrappedHandler as (request: NextRequest, user: { id: string; email?: string }) => Promise<NextResponse>, options.errorOptions);
  }

  // バリデーション
  if (options.schema) {
    wrappedHandler = withValidation(wrappedHandler as <T>(request: NextRequest, data: T) => Promise<NextResponse>, options.schema, options.errorOptions);
  }

  // エラーハンドリング（最外層）
  return withErrorHandling(wrappedHandler, options.errorOptions);
}
