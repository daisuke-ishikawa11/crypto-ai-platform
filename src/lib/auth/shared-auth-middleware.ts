// 🔐 共有認証ミドルウェア - 4つのアプリ用
// SSO認証、CSRF保護、レート制限を統合

import { NextRequest, NextResponse } from 'next/server';
import { cryptoAuthHub } from './crypto-auth-hub';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

// ========================= Type Definitions =========================

export interface AuthContext {
  user: {
    id: string;
    email: string;
    role: 'user' | 'premium' | 'admin';
    subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled';
    subscriptionTier: 'basic' | 'pro' | 'enterprise';
  };
  session: {
    sessionId: string;
    apps: string[];
    mfaVerified: boolean;
    createdAt: Date;
    lastActivityAt: Date;
  };
  app: {
    id: string;
    name: string;
    permissions: string[];
  };
}

export interface SharedAuthOptions {
  requireAuth?: boolean;
  requireRoles?: ('user' | 'premium' | 'admin')[];
  requireSubscription?: boolean;
  requireMfa?: boolean;
  requirePermissions?: string[];
  rateLimitKey?: string;
  rateLimitMax?: number;
  rateLimitWindow?: number;
  validateCsrf?: boolean;
  allowedOrigins?: string[];
  validateSchema?: z.ZodSchema<unknown>;
}

// ========================= Rate Limiting =========================

class RateLimiter {
  private store: Map<string, { count: number; resetTime: number }> = new Map();
  
  check(key: string, max: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = this.store.get(key);
    
    if (!record || now > record.resetTime) {
      this.store.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (record.count >= max) {
      return false;
    }
    
    record.count++;
    return true;
  }
  
  reset(key: string): void {
    this.store.delete(key);
  }
}

const rateLimiter = new RateLimiter();

// ========================= CSRF Protection =========================

class CsrfProtection {
  private tokenStore: Map<string, { token: string; expiresAt: number }> = new Map();
  
  generateToken(sessionId: string): string {
    const token = createHash('sha256')
      .update(`${sessionId}-${Date.now()}-${Math.random()}`)
      .digest('hex');
    
    this.tokenStore.set(sessionId, {
      token,
      expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
    });
    
    return token;
  }
  
  validateToken(sessionId: string, token: string): boolean {
    const stored = this.tokenStore.get(sessionId);
    
    if (!stored || Date.now() > stored.expiresAt) {
      this.tokenStore.delete(sessionId);
      return false;
    }
    
    return stored.token === token;
  }
  
  cleanup(): void {
    const now = Date.now();
    for (const [sessionId, data] of this.tokenStore) {
      if (data.expiresAt < now) {
        this.tokenStore.delete(sessionId);
      }
    }
  }
}

const csrfProtection = new CsrfProtection();

// Cleanup expired CSRF tokens every 5 minutes (skip in test; unref otherwise)
if (process.env.NODE_ENV !== 'test') {
  const t = setInterval(() => csrfProtection.cleanup(), 5 * 60 * 1000);
  ;(t as { unref?: () => void }).unref?.();
}

// ========================= Main Middleware =========================

/**
 * Shared authentication middleware for all apps
 */
export function withSharedAuth<T = unknown>(
  handler: (
    request: NextRequest,
    context: AuthContext,
    params?: Record<string, unknown>
  ) => Promise<NextResponse<T>>,
  options: SharedAuthOptions = {}
) {
  return async (
    request: NextRequest,
    { params }: { params?: Record<string, unknown> } = {}
  ): Promise<NextResponse> => {
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;
    const origin = request.headers.get('origin') || '';
    
    try {
      // ===== 1. CORS Validation =====
      if (options.allowedOrigins && options.allowedOrigins.length > 0) {
        if (!options.allowedOrigins.includes(origin)) {
          logger.warn('CORS violation', { origin, allowedOrigins: options.allowedOrigins });
          return NextResponse.json(
            { error: 'CORS policy violation' },
            { status: 403 }
          );
        }
      }
      
      // ===== 2. Rate Limiting =====
      if (options.rateLimitKey) {
        const clientIp = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
        const rateLimitKey = `${options.rateLimitKey}:${clientIp}`;
        
        if (!rateLimiter.check(
          rateLimitKey,
          options.rateLimitMax || 100,
          options.rateLimitWindow || 60000
        )) {
          logger.warn('Rate limit exceeded', { 
            rateLimitKey, 
            clientIp, 
            method, 
            url 
          });
          
          return NextResponse.json(
            { 
              error: 'Rate limit exceeded',
              message: 'Too many requests. Please try again later.',
              retryAfter: 60
            },
            { 
              status: 429,
              headers: {
                'Retry-After': '60',
                'X-RateLimit-Limit': String(options.rateLimitMax || 100),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': String(Date.now() + (options.rateLimitWindow || 60000))
              }
            }
          );
        }
      }
      
      // ===== 3. Authentication =====
      let authContext: AuthContext | null = null;
      
      if (options.requireAuth) {
        // Get access token from cookie or header
        const cookieStore = await cookies();
        const tokenFromCookie = cookieStore.get('auth-token')?.value;
        const tokenFromHeader = request.headers.get('authorization')?.replace('Bearer ', '');
        const accessToken = tokenFromCookie || tokenFromHeader;
        
        if (!accessToken) {
          logger.warn('Missing authentication token', { method, url });
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
          );
        }
        
        // Validate token
        const session = await cryptoAuthHub.validateToken(accessToken);
        if (!session) {
          logger.warn('Invalid or expired token', { method, url });
          return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
          );
        }
        
        // Get app ID from header or query
        const appId = request.headers.get('x-app-id') || 
                     new URL(request.url).searchParams.get('appId') ||
                     'cryptolearn-pro'; // Default app
        
        // Check if user has access to this app
        if (!session.apps.includes(appId)) {
          logger.warn('App access denied', { 
            userId: session.userId,
            appId,
            userApps: session.apps
          });
          return NextResponse.json(
            { error: 'Access denied for this application' },
            { status: 403 }
          );
        }
        
        // Build auth context
        authContext = {
          user: {
            id: session.userId,
            email: session.email,
            role: session.role,
            subscriptionStatus: session.subscriptionStatus,
            subscriptionTier: session.subscriptionTier
          },
          session: {
            sessionId: session.sessionId,
            apps: session.apps,
            mfaVerified: session.mfaVerified,
            createdAt: session.createdAt,
            lastActivityAt: session.lastActivityAt
          },
          app: {
            id: appId,
            name: appId, // Would be resolved from config
            permissions: [] // Would be loaded from app config
          }
        };
      }
      
      // ===== 4. Authorization Checks =====
      if (authContext) {
        // Check role requirements
        if (options.requireRoles && options.requireRoles.length > 0) {
          const roleHierarchy: Record<string, number> = {
            'user': 1,
            'premium': 2,
            'admin': 3
          };
          
          const userRank = roleHierarchy[authContext.user.role] || 0;
          const minRequiredRank = Math.min(
            ...options.requireRoles.map(r => roleHierarchy[r] || 99)
          );
          
          if (userRank < minRequiredRank) {
            logger.warn('Insufficient role', { 
              userId: authContext.user.id,
              userRole: authContext.user.role,
              requiredRoles: options.requireRoles
            });
            return NextResponse.json(
              { error: 'Insufficient permissions' },
              { status: 403 }
            );
          }
        }
        
        // Check subscription requirement
        if (options.requireSubscription) {
          if (!['active', 'trial'].includes(authContext.user.subscriptionStatus)) {
            logger.warn('Inactive subscription', { 
              userId: authContext.user.id,
              subscriptionStatus: authContext.user.subscriptionStatus
            });
            return NextResponse.json(
              { 
                error: 'Active subscription required',
                message: 'Please upgrade your subscription to access this feature'
              },
              { status: 402 }
            );
          }
        }
        
        // Check MFA requirement
        if (options.requireMfa && !authContext.session.mfaVerified) {
          logger.warn('MFA required but not verified', { 
            userId: authContext.user.id,
            sessionId: authContext.session.sessionId
          });
          return NextResponse.json(
            { 
              error: 'MFA verification required',
              mfaRequired: true
            },
            { status: 403 }
          );
        }
        
        // Check specific permissions
        if (options.requirePermissions && options.requirePermissions.length > 0) {
          const hasAllPermissions = options.requirePermissions.every(
            perm => authContext!.app.permissions.includes(perm)
          );
          
          if (!hasAllPermissions) {
            logger.warn('Missing required permissions', { 
              userId: authContext.user.id,
              requiredPermissions: options.requirePermissions,
              userPermissions: authContext.app.permissions
            });
            return NextResponse.json(
              { error: 'Missing required permissions' },
              { status: 403 }
            );
          }
        }
      }
      
      // ===== 5. CSRF Protection =====
      if (options.validateCsrf && authContext && !['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const csrfToken = request.headers.get('x-csrf-token');
        
        if (!csrfToken) {
          logger.warn('Missing CSRF token', { 
            userId: authContext.user.id,
            method,
            url
          });
          return NextResponse.json(
            { error: 'CSRF token required' },
            { status: 403 }
          );
        }
        
        if (!csrfProtection.validateToken(authContext.session.sessionId, csrfToken)) {
          logger.warn('Invalid CSRF token', { 
            userId: authContext.user.id,
            method,
            url
          });
          return NextResponse.json(
            { error: 'Invalid CSRF token' },
            { status: 403 }
          );
        }
      }
      
      // ===== 6. Request Validation =====
      let validatedData: unknown = undefined;
      
      if (options.validateSchema && ['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          const body = await request.json();
          validatedData = options.validateSchema.parse(body);
        } catch (error) {
          if (error instanceof z.ZodError) {
          logger.warn('Request validation failed', { 
            method,
            url,
            errors: (error as z.ZodError).issues
          });
            return NextResponse.json(
              { 
                error: 'Invalid request data',
                details: (error as z.ZodError).issues
              },
              { status: 400 }
            );
          }
          
          return NextResponse.json(
            { error: 'Invalid JSON in request body' },
            { status: 400 }
          );
        }
      }
      
      // ===== 7. Execute Handler =====
      const response = await handler(
        request,
        authContext || createAnonymousContext(),
        params
      );
      
      // ===== 8. Add Security Headers =====
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
      
      // Add CORS headers if needed
      if (options.allowedOrigins && origin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-App-Id');
        response.headers.set('Access-Control-Max-Age', '86400');
      }
      
      // ===== 9. Logging =====
      const duration = Date.now() - startTime;
      logger.info('API request completed', {
        method,
        url,
        userId: authContext?.user.id,
        appId: authContext?.app.id,
        duration,
        status: String(response.status)
      });
      
      return response;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error('API request failed', {
        method,
        url,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: process.env.NODE_ENV === 'production' 
            ? 'An unexpected error occurred' 
            : error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Generate CSRF token for a session
 */
export async function generateCsrfToken(sessionId: string): Promise<string> {
  return csrfProtection.generateToken(sessionId);
}

/**
 * Create anonymous context for non-authenticated requests
 */
function createAnonymousContext(): AuthContext {
  return {
    user: {
      id: 'anonymous',
      email: 'anonymous@example.com',
      role: 'user',
      subscriptionStatus: 'inactive',
      subscriptionTier: 'basic'
    },
    session: {
      sessionId: 'anonymous',
      apps: [],
      mfaVerified: false,
      createdAt: new Date(),
      lastActivityAt: new Date()
    },
    app: {
      id: 'public',
      name: 'Public Access',
      permissions: []
    }
  };
}

/**
 * Middleware for handling preflight OPTIONS requests
 */
export function handlePreflight(allowedOrigins: string[]): NextResponse {
  const response = new NextResponse(null, { status: 200 });
  
  // Set CORS headers for preflight
  const origin = allowedOrigins[0]; // Use first allowed origin as default
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-App-Id');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}

/**
 * Extract and validate app context from request
 */
export function getAppContext(request: NextRequest): { appId: string; appName: string } | null {
  const appId = request.headers.get('x-app-id') || 
               new URL(request.url).searchParams.get('appId');
  
  if (!appId) {
    return null;
  }
  
  const appMap: Record<string, string> = {
    'cryptolearn-pro': 'CryptoLearn Pro',
    'cryptotrader-ai': 'CryptoTrader AI',
    'defi-navigator': 'DeFi Navigator',
    'portfolio-guardian': 'Portfolio Guardian'
  };
  
  const appName = appMap[appId];
  if (!appName) {
    return null;
  }
  
  return { appId, appName };
}
