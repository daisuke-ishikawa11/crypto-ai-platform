// 🔐 SSO MFA Verification API Route
// Handles multi-factor authentication verification

import { NextRequest, NextResponse } from 'next/server';
import { cryptoAuthHub } from '@/lib/auth/crypto-auth-hub';
import { withSharedAuth, type AuthContext } from '@/lib/auth/shared-auth-middleware';
import { z } from 'zod';
import { logger } from '@/lib/monitoring/logger';

// Define consistent response types
interface MfaSuccessResponse {
  success: true;
  tokens: unknown;
  session: {
    sessionId: string | undefined;
    userId: string | undefined;
    email: string | undefined;
    role: 'user' | 'premium' | 'admin' | undefined;
    apps: string[] | undefined;
    mfaVerified: boolean;
  };
  message: string;
}

interface MfaErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

type MfaResponse = MfaSuccessResponse | MfaErrorResponse;

const mfaVerificationSchema = z.object({
  mfaSessionId: z.string().min(1, 'MFA session ID is required'),
  code: z.string().min(6, 'Verification code must be at least 6 characters'),
  method: z.enum(['totp', 'sms', 'email', 'backup'])
});

export async function POST(request: NextRequest) {
  return withSharedAuth<MfaResponse>(
    async (req: NextRequest, _context: AuthContext): Promise<NextResponse<MfaResponse>> => {
      try {
        // Parse and validate request body
        const body = await req.json();
        const validatedData = mfaVerificationSchema.parse(body);
        
        // Verify MFA code
        const result = await cryptoAuthHub.verifyMfa(
          validatedData.mfaSessionId,
          validatedData.code,
          validatedData.method
        );
        
        if (!result.success) {
          const logContext: { [key: string]: string | undefined } = { 
            mfaSessionId: validatedData.mfaSessionId,
            method: validatedData.method,
            error: result.error || undefined
          };
          logger.warn('MFA verification failed', logContext);
          
          return NextResponse.json<MfaErrorResponse>({
            success: false,
            error: result.error || 'Invalid verification code'
          }, { status: 401 });
        }
        
        // MFA verification successful
        const successLogContext: { [key: string]: string | undefined } = { 
          userId: result.session?.userId || undefined,
          sessionId: result.session?.sessionId || undefined,
          method: validatedData.method
        };
        logger.info('MFA verification successful', successLogContext);
        
        // Return tokens and session info
        return NextResponse.json<MfaSuccessResponse>({
          success: true,
          tokens: result.tokens,
          session: {
            sessionId: result.session?.sessionId || undefined,
            userId: result.session?.userId || undefined,
            email: result.session?.email || undefined,
            role: result.session?.role || undefined,
            apps: result.session?.apps || undefined,
            mfaVerified: true
          },
          message: 'Multi-factor authentication successful'
        }, { status: 200 });
        
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json<MfaErrorResponse>({
            success: false,
            error: 'Invalid request data',
            details: error.issues
          }, { status: 400 });
        }
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error('MFA verification error', { error: errorMessage });
        
        return NextResponse.json<MfaErrorResponse>({
          success: false,
          error: 'An unexpected error occurred during MFA verification'
        }, { status: 500 });
      }
    },
    {
      requireAuth: false,
      rateLimitKey: 'mfa-verify',
      rateLimitMax: 5,
      rateLimitWindow: 60000, // 5 attempts per minute
      validateCsrf: true
    }
  )(request);
}

export async function OPTIONS(_request: NextRequest) {
  // Handle CORS preflight
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}