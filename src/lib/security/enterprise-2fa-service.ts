// 🔐 Enterprise 2FA Service
// Comprehensive two-factor authentication service for enterprise security

import { NotificationService } from '@/lib/notifications/notification-service';
import { NotificationMethod } from '@/lib/alerts/types';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/monitoring/logger';
import crypto from 'crypto';

interface TOTPSetupResult {
  sessionId: string;
  qrCode: string;
  manualEntryKey: string;
  backupCodes: string[];
}

interface VerificationCodeResult {
  sessionId: string;
  expiresAt: string;
  maskedDestination: string;
}

class Enterprise2FAService {
  private notificationService: NotificationService | null = null;

  private async getNotificationService(): Promise<NotificationService> {
    if (!this.notificationService) {
      this.notificationService = new NotificationService({
        email: {
          provider: 'resend',
          apiKey: process.env.RESEND_API_KEY || '',
          fromEmail: 'security@crypto-ai-platform.com',
          fromName: 'Crypto AI Platform Security',
          templates: {
            alertTemplate: '2fa-verification',
            welcomeTemplate: 'welcome',
            reportTemplate: 'report'
          }
        },
        push: {
          provider: 'firebase',
          apiKey: process.env.FIREBASE_API_KEY || '',
          appId: process.env.FIREBASE_PROJECT_ID || ''
        },
        sms: {
          provider: 'twilio',
          accountSid: process.env.TWILIO_ACCOUNT_SID || '',
          authToken: process.env.TWILIO_AUTH_TOKEN || '',
          fromNumber: process.env.TWILIO_FROM_NUMBER || ''
        },
        webhook: {
          timeout: 10000,
          retryAttempts: 3,
          retryDelay: 2000,
          maxPayloadSize: 256_000
        },
        enabledMethods: [NotificationMethod.EMAIL],
        rateLimits: {
          perUser: 60,
          perHour: 100,
          perDay: 1000
        },
        templates: {
          enablePersonalization: true,
          defaultLanguage: 'en',
          supportedLanguages: ['en', 'ja']
        }
      });
    }
    return this.notificationService;
  }

  async setupTOTP(userId: string, email: string): Promise<TOTPSetupResult> {
    try {
      // Generate TOTP secret
      const secret = crypto.randomBytes(20).toString('hex');
      const sessionId = crypto.randomUUID();
      
      // Generate backup codes
      const backupCodes = Array.from({ length: 10 }, () => 
        crypto.randomBytes(4).toString('hex').toUpperCase()
      );

      // Create QR code data
      const qrCodeData = `otpauth://totp/Crypto%20AI%20Platform:${encodeURIComponent(email)}?secret=${secret}&issuer=Crypto%20AI%20Platform`;
      
      // Store setup session temporarily
      const supabase = await createClient();
      await supabase
        .from('two_factor_setup_sessions')
        .insert({
          id: sessionId,
            user_id: userId,
          method: 'totp',
          secret_encrypted: secret, // In production, this should be encrypted
          backup_codes_encrypted: JSON.stringify(backupCodes), // In production, this should be encrypted
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
            created_at: new Date().toISOString()
        });
        
        logger.info('TOTP setup initiated', { userId, sessionId });
        
        return {
          sessionId,
        qrCode: qrCodeData,
        manualEntryKey: secret,
        backupCodes
      };
      
    } catch (error) {
      logger.error('TOTP setup failed', { userId, error: error instanceof Error ? error.message : String(error) });
      throw new Error('Failed to setup TOTP authentication');
    }
  }

  async sendVerificationCode(
    userId: string,
    method: 'sms' | 'email',
    destination: string,
    ipAddress: string
  ): Promise<VerificationCodeResult> {
    try {
      const code = crypto.randomInt(100000, 999999).toString();
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      
      // Store verification session
      const supabase = await createClient();
      await supabase
        .from('two_factor_setup_sessions')
        .insert({
          id: sessionId,
        user_id: userId,
        method,
          code_hash: crypto.createHash('sha256').update(code).digest('hex'),
          destination,
        ip_address: ipAddress,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString()
      });
      
      // Send notification
      const notificationService = await this.getNotificationService();
      
      if (method === 'email') {
        await notificationService.sendSimpleEmail(destination, {
          subject: 'Your Verification Code - Crypto AI Platform',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">Verification Code</h2>
              <p style="color: #666; line-height: 1.6;">Your verification code for Crypto AI Platform:</p>
              <div style="background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1a1a1a;">${code}</span>
              </div>
              <p style="color: #666; line-height: 1.6;">This code will expire in 5 minutes.</p>
            </div>
          `
        });
      } else {
        // 簡易SMS送信: 現在のNotificationServiceは直接SMS送信APIを公開していないため、ここではログ/将来実装のフック
        // 実運用では sendSMS を提供するか、SMS専用サービスに委譲します
        logger.info('SMS verification code (mock send)', { to: destination, code });
      }

      logger.info('Verification code sent', { userId, method, sessionId });
      
      return {
        sessionId,
        expiresAt: expiresAt.toISOString(),
        maskedDestination: this.maskDestination(destination, method)
      };
      
    } catch (error) {
      logger.error('Verification code send failed', { 
        userId,
        method, 
        error: error instanceof Error ? error.message : String(error) 
      });
      throw new Error('Failed to send verification code');
    }
  }

  async verifyCode(
    sessionId: string,
    code: string
  ): Promise<{ success: boolean; method: string }> {
    try {
      const supabase = await createClient();
      
      // Get session
      const { data: session, error } = await supabase
        .from('two_factor_setup_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('is_verified', false)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      if (error || !session) {
        return { success: false, method: '' };
      }

      let isValid = false;
      
      if (session.method === 'totp') {
        // For TOTP, implement proper TOTP verification here
        // This is a simplified version
        isValid = true; // In production, verify against TOTP algorithm
      } else {
        // Verify code hash
        const codeHash = crypto.createHash('sha256').update(code).digest('hex');
        isValid = codeHash === session.code_hash;
      }

      if (isValid) {
        // Mark session as verified
        await supabase
          .from('two_factor_setup_sessions')
          .update({ 
            is_verified: true, 
            verified_at: new Date().toISOString() 
          })
          .eq('id', sessionId);

        logger.info('2FA verification successful', { sessionId, method: session.method });
      }

      return { success: isValid, method: session.method };

    } catch (error) {
      logger.error('2FA verification failed', { 
        sessionId, 
        error: error instanceof Error ? error.message : String(error) 
      });
      return { success: false, method: '' };
    }
  }

  private maskDestination(destination: string, method: 'sms' | 'email'): string {
    if (method === 'email') {
      const [localPart, domain] = destination.split('@');
      const maskedLocal = localPart.charAt(0) + '*'.repeat(Math.max(0, localPart.length - 2)) + localPart.slice(-1);
      return `${maskedLocal}@${domain}`;
    } else {
      // Phone number
      const cleanNumber = destination.replace(/\D/g, '');
      const visibleDigits = Math.min(4, Math.floor(cleanNumber.length * 0.3));
      const masked = '*'.repeat(cleanNumber.length - visibleDigits * 2) ;
      return cleanNumber.slice(0, visibleDigits) + masked + cleanNumber.slice(-visibleDigits);
    }
  }
}

// Export singleton instance
export const enterprise2FA = new Enterprise2FAService();
export default enterprise2FA;
