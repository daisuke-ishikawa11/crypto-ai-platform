// 🔐 SSO Login API Route
// Handles centralized authentication for all apps

import { NextRequest, NextResponse } from 'next/server';
import { cryptoAuthHub } from '@/lib/auth/crypto-auth-hub';
import { withSharedAuth, type AuthContext } from '@/lib/auth/shared-auth-middleware';
import { z } from 'zod';
import { logger } from '@/lib/monitoring/logger';

// Define consistent response types
interface LoginSuccessResponse {
  success: true;
  requiresMfa?: false;
  tokens: unknown;
  session: {
    sessionId: string | undefined;
    userId: string | undefined;
    email: string | undefined;
    role: 'user' | 'premium' | 'admin' | undefined;
    apps: string[] | undefined;
    mfaVerified: boolean;
  };
  redirectUrl: string;
}

interface LoginMfaResponse {
  success: false;
  requiresMfa: true;
  mfaSessionId: string | undefined;
  message: string;
}

interface LoginErrorResponse {
  success: false;
  requiresMfa?: false;
  error: string;
  details?: unknown;
}

type LoginResponse = LoginSuccessResponse | LoginMfaResponse | LoginErrorResponse;

// Define log context interface
interface LogContext {
  [key: string]: string | undefined;
  email?: string;
  appId?: string;
  error?: string;
  userId?: string;
  sessionId?: string;
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  appId: z.enum(['cryptolearn-pro', 'cryptotrader-ai', 'defi-navigator', 'portfolio-guardian']),
  rememberMe: z.boolean().optional().default(false),
  deviceFingerprint: z.string().optional()
});

export async function POST(request: NextRequest) {
  return withSharedAuth<LoginResponse>(
    async (req: NextRequest, _context: AuthContext): Promise<NextResponse<LoginResponse>> => {
      try {
        // Parse and validate request body
        const body = await req.json();
        const validatedData = loginSchema.parse(body);
        
        // Attempt authentication
        const result = await cryptoAuthHub.authenticate(validatedData);
        
        if (result.requiresMfa) {
          // MFA required - return session for MFA verification
          return NextResponse.json<LoginMfaResponse>({
            success: false,
            requiresMfa: true,
            mfaSessionId: result.mfaSessionId || undefined,
            message: 'Multi-factor authentication required'
          }, { status: 200 });
        }
        
        if (!result.success) {
          // Authentication failed
          const logContext: { [key: string]: string | undefined } = { 
            email: validatedData.email, 
            appId: validatedData.appId,
            error: result.error || undefined
          };
          logger.warn('Login failed', logContext);
          
          return NextResponse.json<LoginErrorResponse>({
            success: false,
            requiresMfa: false,
            error: result.error || 'Authentication failed'
          }, { status: 401 });
        }
        
        // Authentication successful
        const logContext: { [key: string]: string | undefined } = { 
          userId: result.session?.userId || undefined,
          appId: validatedData.appId,
          sessionId: result.session?.sessionId || undefined
        };
        logger.info('Login successful', logContext);
        
        // Return tokens and session info
        return NextResponse.json<LoginSuccessResponse>({
          success: true,
          requiresMfa: false,
          tokens: result.tokens,
          session: {
            sessionId: result.session?.sessionId || undefined,
            userId: result.session?.userId || undefined,
            email: result.session?.email || undefined,
            role: result.session?.role || undefined,
            apps: result.session?.apps || undefined,
            mfaVerified: result.session?.mfaVerified || false
          },
          redirectUrl: getAppRedirectUrl(validatedData.appId)
        }, { status: 200 });
        
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json<LoginErrorResponse>({
            success: false,
            requiresMfa: false,
            error: 'Invalid request data',
            details: error.issues
          }, { status: 400 });
        }
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error('SSO login error', { error: errorMessage });
        
        return NextResponse.json<LoginErrorResponse>({
          success: false,
          requiresMfa: false,
          error: 'An unexpected error occurred during login'
        }, { status: 500 });
      }
    },
    {
      requireAuth: false,
      rateLimitKey: 'sso-login',
      rateLimitMax: 10,
      rateLimitWindow: 60000, // 10 attempts per minute
      validateCsrf: true,
      allowedOrigins: [
        'https://learn.crypto-ai-platform.com',
        'https://trade.crypto-ai-platform.com',
        'https://defi.crypto-ai-platform.com',
        'https://portfolio.crypto-ai-platform.com',
        'http://localhost:3000' // Development
      ]
    }
  )(request);
}

export async function OPTIONS(_request: NextRequest) {
  // Handle CORS preflight
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-App-Id');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}

function getAppRedirectUrl(appId: string): string {
  const appUrls: Record<string, string> = {
    'cryptolearn-pro': 'https://learn.crypto-ai-platform.com/dashboard',
    'cryptotrader-ai': 'https://trade.crypto-ai-platform.com/dashboard',
    'defi-navigator': 'https://defi.crypto-ai-platform.com/dashboard',
    'portfolio-guardian': 'https://portfolio.crypto-ai-platform.com/dashboard'
  };
  
  return appUrls[appId] || '/dashboard';
}