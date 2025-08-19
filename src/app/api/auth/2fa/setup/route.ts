// 🔐 2FA Setup API Endpoint
// Secure endpoint for initiating 2FA setup with comprehensive validation

import { NextRequest, NextResponse } from 'next/server';
import { enterprise2FA } from '@/lib/security/enterprise-2fa-service';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';
import { InputValidator, SecuritySchemas } from '@/lib/security/input-validation';
import { RateLimiter } from '@/lib/security/rate-limiter';
import { performanceMonitor } from '@/lib/monitoring/performance-monitor';

// Rate limiter for setup endpoint
const rateLimiter = new RateLimiter();

// Request validation schema
const SetupRequestSchema = z.object({
  method: z.enum(['totp', 'sms', 'email']),
  destination: z.string().optional(), // For SMS/Email
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
      logger.warn('Unauthorized 2FA setup attempt', { 
        requestId,
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      });
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers }
      );
    }

    // Rate limiting check
    const rateLimitKey = `2fa_setup_${user.id}`;
    const isAllowed = await rateLimiter.isAllowed(rateLimitKey, 5, 15 * 60 * 1000);
    
    if (!isAllowed) {
      logger.warn('2FA setup rate limit exceeded', { 
        userId: user.id,
        requestId
      });
      
      return NextResponse.json(
        { error: 'Too many setup attempts. Please try again later.' },
        { status: 429, headers }
      );
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
    } catch {
      return NextResponse.json(
        { error: 'CSRF validation error' },
        { status: 403, headers }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = InputValidator.validateApiInput(body, SetupRequestSchema);
    
    if (!validation.success) {
      logger.warn('Invalid 2FA setup request', {
        userId: user.id,
        requestId,
        error: validation.error
      });
      
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error },
        { status: 400, headers }
      );
    }

    const { method, destination, deviceFingerprint } = validation.data;

    // Check if 2FA is already enabled
    const { data: existingConfig } = await supabase
      .from('user_two_factor_config')
      .select('is_enabled, primary_method')
      .eq('user_id', user.id)
      .single();

    if (existingConfig?.is_enabled && existingConfig.primary_method === method) {
      return NextResponse.json(
        { error: `${method.toUpperCase()} authentication is already enabled` },
        { status: 400, headers }
      );
    }

    // Get user's IP for security tracking
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') ||
                     'unknown';

    let response;

    switch (method) {
      case 'totp':
        // Setup TOTP
        const totpResult = await enterprise2FA.setupTOTP(user.id, user.email!);
        
        response = {
          success: true,
          method: 'totp',
          sessionId: totpResult.sessionId,
          qrCode: totpResult.qrCode,
          secret: totpResult.manualEntryKey,
          backupCodes: totpResult.backupCodes,
          message: 'Please scan the QR code with your authenticator app and verify the code'
        };
        break;

      case 'sms':
      case 'email':
        // Validate destination
        if (!destination) {
          return NextResponse.json(
            { error: `${method === 'sms' ? 'Phone number' : 'Email'} is required` },
            { status: 400, headers }
          );
        }

        // Additional validation for phone/email
        if (method === 'sms') {
          const phoneValidation = z.string().regex(/^\+?[1-9]\d{1,14}$/).safeParse(destination);
          if (!phoneValidation.success) {
            return NextResponse.json(
              { error: 'Invalid phone number format' },
              { status: 400, headers }
            );
          }
        } else {
          const emailValidation = SecuritySchemas.email.safeParse(destination);
          if (!emailValidation.success) {
            return NextResponse.json(
              { error: 'Invalid email format' },
              { status: 400, headers }
            );
          }
        }

        // Send verification code
        const codeResult = await enterprise2FA.sendVerificationCode(
          user.id,
          method,
          destination,
          ipAddress
        );

        // Store contact info (encrypted) for later use
        const { encrypted, iv } = await encryptContactInfo(destination);
        await supabase.from('user_contact_2fa_config').upsert({
          user_id: user.id,
          method,
          contact_value_encrypted: encrypted,
          contact_value_hash: await hashContactInfo(destination),
          contact_iv: iv,
          is_verified: false,
          is_enabled: false,
          created_at: new Date().toISOString()
        });

        response = {
          success: true,
          method,
          sessionId: codeResult.sessionId,
          expiresAt: codeResult.expiresAt,
          maskedDestination: codeResult.maskedDestination,
          message: `Verification code sent to ${codeResult.maskedDestination}`
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Unsupported authentication method' },
          { status: 400, headers }
        );
    }

    // Log successful setup initiation
    await supabase.from('two_factor_audit_logs').insert({
      user_id: user.id,
      event_type: 'enable_2fa',
      method,
      details: {
        requestId,
        ipAddress,
        deviceFingerprint: deviceFingerprint ? await hashDeviceFingerprint(deviceFingerprint) : null
      },
      ip_address: ipAddress,
      user_agent: request.headers.get('user-agent'),
      created_at: new Date().toISOString()
    });

    // Performance tracking
    performanceMonitor.recordApiCall('api_2fa_setup', Date.now() - startTime, true);

    logger.info('2FA setup initiated', {
      userId: user.id,
      method,
      requestId
    });

    return NextResponse.json(response, { status: 200, headers });

  } catch (error) {
    logger.error('2FA setup error', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? (error.stack || '') : ''
    });

    // Don't expose internal errors
    return NextResponse.json(
      { error: 'An error occurred during setup. Please try again.' },
      { status: 500, headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Cache-Control': 'no-store'
      }}
    );
  }
}

// Helper functions
async function encryptContactInfo(data: string): Promise<{ encrypted: string; iv: string }> {
  const crypto = await import('node:crypto');
  const algorithm = 'aes-256-cbc';
  const keyHex = process.env.CONTACT_ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error('CONTACT_ENCRYPTION_KEY is required');
  }
  if (keyHex.length !== 64) {
    throw new Error('CONTACT_ENCRYPTION_KEY must be 32 bytes (64 hex chars)');
  }
  const key = Buffer.from(keyHex, 'hex');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { encrypted, iv: iv.toString('hex') };
}
async function hashContactInfo(data: string): Promise<string> {
  const crypto = await import('node:crypto');
  const salt = process.env.CONTACT_HASH_SALT;
  if (!salt) {
    throw new Error('CONTACT_HASH_SALT is required');
  }
  return crypto.createHash('sha256').update(data + salt).digest('hex');
}
async function hashDeviceFingerprint(fingerprint: unknown): Promise<string> {
  const crypto = await import('node:crypto');
  return crypto.createHash('sha256')
    .update(JSON.stringify(fingerprint))
    .digest('hex');
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
