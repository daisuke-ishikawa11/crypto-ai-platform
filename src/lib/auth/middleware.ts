// 🔐 API認証・認可ミドルウェア
// Next.js API Routes用の認証・認可システム

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'premium';
  subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled';
  subscription_tier: 'basic' | 'pro' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface ApiContext {
  user: AuthenticatedUser;
  supabase: Awaited<ReturnType<typeof createClient>>;
}

export interface ApiHandlerOptions {
  requireAuth?: boolean;
  requireRoles?: ('user' | 'admin' | 'premium')[];
  requireSubscription?: boolean;
  rateLimitKey?: string;
  validateSchema?: z.ZodSchema<any>;
}

/**
 * API認証ミドルウェア
 * Supabase JWTトークンを検証してユーザー情報を取得
 */
export async function authenticateUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const supabase = await createClient();
    
    // Authorization headerからJWTトークンを取得
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return null;
    }

    const token = authorization.replace('Bearer ', '');
    
    // Supabaseでユーザーを取得
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      logger.warn('Invalid or expired token', { authError });
      return null;
    }

    // ユーザープロファイル情報を取得
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select(`
        role,
        subscription_status,
        subscription_tier,
        created_at,
        updated_at
      `)
      .eq('id', user.id)
      .single();

    if (profileError) {
      logger.error('Failed to fetch user profile', { 
        userId: user.id, 
        error: profileError 
      });
      return null;
    }

    return {
      id: user.id,
      email: user.email!,
      role: profile.role || 'user',
      subscription_status: profile.subscription_status || 'inactive',
      subscription_tier: profile.subscription_tier || 'basic',
      created_at: profile.created_at,
      updated_at: profile.updated_at
    };

  } catch (error) {
    logger.error('Authentication error', { error });
    return null;
  }
}

/**
 * ロールベース認可チェック
 */
export function hasRequiredRole(user: AuthenticatedUser, requiredRoles: string[]): boolean {
  return requiredRoles.includes(user.role);
}

/**
 * サブスクリプション状態チェック
 */
export function hasActiveSubscription(user: AuthenticatedUser): boolean {
  return ['active', 'trial'].includes(user.subscription_status);
}

/**
 * レート制限チェック（基本実装）
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  key: string, 
  maxRequests: number = 100, 
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * APIハンドラーラッパー
 * 認証・認可・バリデーション・エラーハンドリングを統合
 */
export function withApiHandler<T = any>(
  handler: (
    request: NextRequest,
    context: ApiContext,
    params?: any
  ) => Promise<NextResponse<T>>,
  options: ApiHandlerOptions = {}
) {
  return async (
    request: NextRequest,
    { params }: { params?: any } = {}
  ): Promise<NextResponse> => {
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;

    try {
      // レート制限チェック
      if (options.rateLimitKey) {
        const clientIp = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
        const rateLimitKey = `${options.rateLimitKey}:${clientIp}`;
        
        if (!checkRateLimit(rateLimitKey)) {
          logger.warn('Rate limit exceeded', { 
            rateLimitKey, 
            clientIp, 
            method, 
            url 
          });
          
          return NextResponse.json(
            { 
              error: 'Rate limit exceeded',
              message: 'Too many requests. Please try again later.'
            },
            { status: 429 }
          );
        }
      }

      // 認証チェック
      let user: AuthenticatedUser | null = null;
      
      if (options.requireAuth) {
        user = await authenticateUser(request);
        
        if (!user) {
          logger.warn('Unauthorized API access attempt', { method, url });
          return NextResponse.json(
            { 
              error: 'Unauthorized',
              message: 'Valid authentication token required'
            },
            { status: 401 }
          );
        }

        // ロールチェック
        if (options.requireRoles && !hasRequiredRole(user, options.requireRoles)) {
          logger.warn('Insufficient role for API access', { 
            userId: user.id,
            userRole: user.role,
            requiredRoles: options.requireRoles,
            method,
            url
          });
          
          return NextResponse.json(
            { 
              error: 'Forbidden',
              message: 'Insufficient permissions'
            },
            { status: 403 }
          );
        }

        // サブスクリプションチェック
        if (options.requireSubscription && !hasActiveSubscription(user)) {
          logger.warn('Inactive subscription for API access', { 
            userId: user.id,
            subscriptionStatus: user.subscription_status,
            method,
            url
          });
          
          return NextResponse.json(
            { 
              error: 'Subscription Required',
              message: 'Active subscription required for this feature'
            },
            { status: 402 }
          );
        }
      }

      // リクエストボディのバリデーション（POST/PUT/PATCHの場合）
      let validatedData: any = undefined;
      
      if (options.validateSchema && ['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          const body = await request.json();
          validatedData = options.validateSchema.parse(body);
        } catch (validationError) {
          logger.warn('Request validation failed', { 
            method,
            url,
            validationError
          });
          
          if (validationError instanceof z.ZodError) {
            return NextResponse.json(
              { 
                error: 'Validation Error',
                message: 'Invalid request data',
                details: validationError.errors
              },
              { status: 400 }
            );
          }
          
          return NextResponse.json(
            { 
              error: 'Bad Request',
              message: 'Invalid JSON in request body'
            },
            { status: 400 }
          );
        }
      }

      // コンテキストを準備
      const context: ApiContext = {
        user: user!,
        supabase: await createClient()
      };

      // メインハンドラーを実行
      const response = await handler(request, context, params);

      // 成功ログ
      const duration = Date.now() - startTime;
      logger.info('API request completed', {
        method,
        url,
        userId: user?.id,
        duration,
        status: response.status
      });

      return response;

    } catch (error) {
      // エラーログ
      const duration = Date.now() - startTime;
      logger.error('API request failed', {
        method,
        url,
        userId: user?.id,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      // 本番環境では詳細なエラー情報を隠す
      const isProduction = process.env.NODE_ENV === 'production';
      
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: isProduction 
            ? 'An unexpected error occurred' 
            : error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  };
}

/**
 * CORS設定
 */
export function setCorsHeaders(response: NextResponse): NextResponse {
  // 許可するオリジン（本番では適切に設定）
  const allowedOrigins = [
    'http://localhost:3000',
    'https://your-domain.com' // 本番ドメインに変更
  ];

  response.headers.set('Access-Control-Allow-Origin', allowedOrigins.join(','));
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');

  return response;
}

/**
 * OPTIONSリクエスト用ハンドラー
 */
export function handleOptions(): NextResponse {
  const response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response);
}

/**
 * ページネーション用ヘルパー
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function parsePaginationParams(request: NextRequest): PaginationParams {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20')));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * ソート用ヘルパー
 */
export interface SortParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export function parseSortParams(
  request: NextRequest, 
  allowedFields: string[] = []
): SortParams {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get('sortBy') || 'created_at';
  const sortOrder = (url.searchParams.get('sortOrder')?.toLowerCase() === 'asc') ? 'asc' : 'desc';

  // 許可されたフィールドのみソート可能
  const finalSortBy = allowedFields.length > 0 && !allowedFields.includes(sortBy) 
    ? allowedFields[0] 
    : sortBy;

  return { sortBy: finalSortBy, sortOrder };
}