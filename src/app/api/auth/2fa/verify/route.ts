// 🔐 2FA Verification API Endpoint
// Secure endpoint for verifying 2FA codes with advanced security features

import { NextRequest, NextResponse } from 'next/server';
import { createPerformanceMiddleware } from '@/lib/monitoring/performance-monitor';
import { checkUserRateLimit } from '@/lib/security/rate-limiter';
import { enterprise2FA } from '@/lib/security/enterprise-2fa-service';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';
import { InputValidator } from '@/lib/security/input-validation';
import { cookies } from 'next/headers';


// Rate limiter for verification endpoint
// use user-level rate limiting via checkUserRateLimit; removed local RateLimiter

const perf = createPerformanceMiddleware();

// Request validation schemas
const VerifyTOTPSchema = z.object({
  method: z.literal('totp'),
  token: z.string().regex(/^\d{6,8}$/),
  sessionId: z.string().min(32).max(128),
  trustDevice: z.boolean().optional(),
  deviceFingerprint: z.object({
    userAgent: z.string(),
    screenResolution: z.string(),
    timezone: z.string(),
    language: z.string(),
    platform: z.string(),
    hardwareConcurrency: z.number(),
    deviceMemory: z.number().optional(),
    touchSupport: z.boolean(),
    webGLFingerprint: z.string().optional()
  }).optional()
});

const VerifyCodeSchema = z.object({
  method: z.enum(['sms', 'email']),
  code: z.string().regex(/^\d{6}$/),
  sessionId: z.string().min(32).max(128),
  trustDevice: z.boolean().optional(),
  deviceFingerprint: z.object({
    userAgent: z.string(),
    screenResolution: z.string(),
    timezone: z.string(),
    language: z.string(),
    platform: z.string(),
    hardwareConcurrency: z.number(),
    deviceMemory: z.number().optional(),
    touchSupport: z.boolean(),
    webGLFingerprint: z.string().optional()
  }).optional()
});

const VerifyBackupCodeSchema = z.object({
  method: z.literal('backup_code'),
  code: z.string().regex(/^[A-Z0-9]{8,16}$/),
  deviceFingerprint: z.object({
    userAgent: z.string(),
    screenResolution: z.string(),
    timezone: z.string(),
    language: z.string(),
    platform: z.string(),
    hardwareConcurrency: z.number(),
    deviceMemory: z.number().optional(),
    touchSupport: z.boolean(),
    webGLFingerprint: z.string().optional()
  }).optional()
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  
  try {
    // Security headers
    const headers = new Headers({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Request-ID': requestId
    });

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      logger.warn('Unauthorized 2FA verification attempt', { 
        requestId,
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      });
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers }
      );
    }

    // Get IP address for security tracking
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Rate limiting check (per user and IP)
  const rate = await checkUserRateLimit(user.id, '2fa_verify');
if (rate.blocked) {
  await logSuspiciousActivity(user.id, 'rate_limit_exceeded', { endpoint: '2fa_verify', ipAddress, requestId });
  logger.warn('2FA verification rate limit exceeded', { userId: user.id, ipAddress, requestId });
  return NextResponse.json({ error: 'Too many verification attempts. Your account has been temporarily locked.' }, { status: 429, headers });
}
    // CSRF validation
    try {
      const { validateRequestCsrf } = await import('@/lib/security/csrf');
      const ok = await validateRequestCsrf(request);
      if (!ok) {
        return NextResponse.json(
          { error: 'CSRF validation failed' },
          { status: 403, headers }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { error: 'CSRF validation error' },
        { status: 403, headers }
      );
    }

    // Parse request body

    const body = await request.json();
    const { method } = body;

    let validationResult;
    let verificationResult;

    // Validate based on method
    switch (method) {
      case 'totp':
        validationResult = InputValidator.validateApiInput(body, VerifyTOTPSchema);
        if (!validationResult.success) {
          return NextResponse.json(
            { error: 'Invalid verification data', details: validationResult.error },
            { status: 400, headers }
          );
        }

        verificationResult = await enterprise2FA.verifyCode(
          validationResult.data.sessionId,
          validationResult.data.token
        );
        break;

      case 'sms':
      case 'email':
        validationResult = InputValidator.validateApiInput(body, VerifyCodeSchema);
        if (!validationResult.success) {
          return NextResponse.json(
            { error: 'Invalid verification data', details: validationResult.error },
            { status: 400, headers }
          );
        }

        verificationResult = await enterprise2FA.verifyCode(
          validationResult.data.sessionId,
          validationResult.data.code
        );
        break;

      case 'backup_code':
        validationResult = InputValidator.validateApiInput(body, VerifyBackupCodeSchema);
        if (!validationResult.success) {
          return NextResponse.json(
            { error: 'Invalid backup code format' },
            { status: 400, headers }
          );
        }

        verificationResult = await enterprise2FA.verifyCode(
          '', // Backup codes don't require sessionId
          validationResult.data.code
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid verification method' },
          { status: 400, headers }
        );
    }

    // Handle verification result
    if (verificationResult.success) {
      // Create secure session token
      const sessionToken = await createSecureSessionToken(user.id, method);
      
      // Set secure cookie for 2FA verification
      // Set secure cookie for 2FA verification (Next 13+ headers cookies needs await)
const cookieStore = await cookies();
cookieStore.set('2fa_verified', sessionToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/' });

      // Set trust token if device should be trusted
      if ('trustToken' in verificationResult && verificationResult.trustToken) {
  const cookieStore2 = await cookies();
  cookieStore2.set('device_trust', verificationResult.trustToken as string, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 60 * 60 * 24 * 30, path: '/' });
}

      // Update user's 2FA config if first successful verification
      if (method === 'totp' || method === 'sms' || method === 'email') {
        await supabase.from('user_two_factor_config').upsert({
          user_id: user.id,
          is_enabled: true,
          primary_method: method,
          updated_at: new Date().toISOString()
        });

        // Mark the specific method as verified and enabled
        if (method === 'totp') {
          await supabase.from('user_totp_config')
            .update({
              is_verified: true,
              is_enabled: true,
              verified_at: new Date().toISOString()
            })
            .eq('user_id', user.id);
        } else {
          await supabase.from('user_contact_2fa_config')
            .update({
              is_verified: true,
              is_enabled: true,
              verified_at: new Date().toISOString()
            })
            .eq('user_id', user.id)
            .eq('method', method);
        }
      }

      // Log successful verification
      await supabase.from('two_factor_audit_logs').insert({
        user_id: user.id,
        event_type: 'verify_success',
        method,
        details: {
          requestId,
          ipAddress,
          deviceTrusted: ('trustToken' in verificationResult && !!verificationResult.trustToken),
          remainingBackupCodes: ('remainingCodes' in verificationResult ? verificationResult.remainingCodes : undefined)
        },
        ip_address: ipAddress,
        user_agent: request.headers.get('user-agent'),
        created_at: new Date().toISOString()
      });

      // Performance tracking
      await perf('/api/auth/2fa/verify', 'POST', 200, Date.now() - startTime, user.id);

      logger.info('2FA verification successful', {
        userId: user.id,
        method,
        requestId
      });

      await perf('/api/auth/2fa/verify', 'POST', 200, Date.now() - startTime, user.id);
return NextResponse.json({
  success: true,
  message: '2FA verification successful',
  method,
  deviceTrusted: ('trustToken' in verificationResult && !!verificationResult.trustToken),
  remainingBackupCodes: ('remainingCodes' in verificationResult ? verificationResult.remainingCodes : undefined),
  redirect: '/dashboard'
}, { status: 200, headers });

    } else {
      // Log failed verification
      await supabase.from('two_factor_audit_logs').insert({
        user_id: user.id,
        event_type: 'verify_failure',
        method,
        details: {
          requestId,
          ipAddress,
          remainingAttempts: ('remainingAttempts' in verificationResult ? verificationResult.remainingAttempts : undefined)
        },
        ip_address: ipAddress,
        user_agent: request.headers.get('user-agent'),
        created_at: new Date().toISOString()
      });

      // Check if account should be locked
      if ('remainingAttempts' in verificationResult && verificationResult.remainingAttempts === 0) {
        await lockAccount(user.id, 'too_many_attempts');
        
        return NextResponse.json({
          success: false,
          error: 'Maximum attempts exceeded. Your account has been locked for security.',
          accountLocked: true
        }, { status: 403, headers });
      }

      logger.warn('2FA verification failed', {
        userId: user.id,
        method,
        remainingAttempts: ('remainingAttempts' in verificationResult ? verificationResult.remainingAttempts : undefined),
        requestId
      });

      return NextResponse.json({
        success: false,
        error: 'Invalid verification code',
        remainingAttempts: ('remainingAttempts' in verificationResult ? verificationResult.remainingAttempts : undefined),
        message: ('remainingAttempts' in verificationResult && verificationResult.remainingAttempts) 
          ? `Invalid code. ${verificationResult.remainingAttempts} attempts remaining.`
          : 'Maximum attempts exceeded.'
      }, { status: 400, headers });
    }

  } catch (error) {
    logger.error('2FA verification error', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? (error.stack || '') : ''
    });

    // Don't expose internal errors
    return NextResponse.json(
      { 
        error: 'Verification failed. Please try again.',
        success: false
      },
      { 
        status: 500, 
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Cache-Control': 'no-store',
          'X-Request-ID': requestId
        }
      }
    );
  }
}

// Helper functions
async function createSecureSessionToken(userId: string, method: string): Promise<string> {
  const payload = {
    userId,
    method,
    timestamp: Date.now(),
    nonce: globalThis.crypto.getRandomValues(new Uint8Array(16)).toString()
  };
  
  const token = Buffer.from(JSON.stringify(payload)).toString('base64');
  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(process.env.SESSION_SECRET || 'default-secret'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(token)
  );
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `${token}.${signatureHex}`;
}

async function logSuspiciousActivity(
  userId: string,
  activityType: string,
  details: unknown
): Promise<void> {
  const supabase = await createClient();
  
  await supabase.from('suspicious_activities').insert({
    user_id: userId,
    activity_type: activityType,
    severity: 'medium',
    details,
    action_taken: 'notification_sent',
    created_at: new Date().toISOString()
  });
}

async function lockAccount(userId: string, reason: string): Promise<void> {
  const supabase = await createClient();
  const minutes = parseInt(process.env.TWO_FA_LOCKOUT_MINUTES || '30', 10)
  const lockMs = isFinite(minutes) && minutes > 0 ? minutes * 60 * 1000 : 30 * 60 * 1000
  await supabase.from('account_lockouts').insert({
    user_id: userId,
    lockout_reason: reason,
    lockout_start: new Date().toISOString(),
    lockout_end: new Date(Date.now() + lockMs).toISOString(),
    is_active: true,
    created_at: new Date().toISOString()
  });
  
  // Also log as suspicious activity
  await logSuspiciousActivity(userId, 'account_locked', {
    reason,
    duration: `${Math.floor(lockMs / 60000)} minutes`
  });
}

// OPTIONS method for CORS
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
