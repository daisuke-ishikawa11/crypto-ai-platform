// 🔐 2FA（二要素認証）システム
// TOTP、SMS、Email による多要素認証を実装

import { randomBytes, createHash, timingSafeEqual } from 'crypto';
import { authenticator } from 'otplib';
import type { HashAlgorithms } from 'otplib/core';
import QRCode from 'qrcode';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/monitoring/logger';
import { AppError, ErrorType, ErrorSeverity } from '@/lib/errors/error-handler';

export interface TwoFactorAuthConfig {
  issuer: string;
  serviceName: string;
  window: number; // TOTP verification window
  digits: number; // Number of digits in TOTP
  period: number; // TOTP period in seconds
  algorithm: HashAlgorithms; // Hash algorithm
}

export interface TwoFactorAuthMethod {
  id: string;
  type: 'totp' | 'sms' | 'email' | 'backup_codes';
  enabled: boolean;
  verified: boolean;
  createdAt: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface BackupCode {
  code: string;
  used: boolean;
  usedAt?: Date;
}

export interface TwoFactorSession {
  sessionId: string;
  userId: string;
  method: string;
  verified: boolean;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
}

// 🏗️ 二要素認証マネージャー
export class TwoFactorAuthManager {
  private config: TwoFactorAuthConfig;
  private supabase!: Awaited<ReturnType<typeof createClient>>;

  constructor(config?: Partial<TwoFactorAuthConfig>) {
    this.config = {
      issuer: 'Crypto AI Platform',
      serviceName: 'crypto-ai-platform.com',
      window: 1, // Allow 1 time step before/after current time
      digits: 6,
      period: 30,
      algorithm: 'sha1' as HashAlgorithms,
      ...config
    };
    // OTPLIB 設定（アルゴリズムは HashAlgorithms に適合）
    authenticator.options = {
      window: this.config.window,
      digits: this.config.digits,
      step: this.config.period,
      algorithm: this.config.algorithm
    };
  }

  async init(): Promise<void> {
    this.supabase = await createClient();
  }

  // 📱 TOTP設定の生成
  async generateTOTPSecret(userId: string, userEmail: string): Promise<{
    secret: string;
    qrCodeUrl: string;
    manualEntryKey: string;
    backupCodes: string[];
  }> {
    try {
      // 新しい秘密鍵を生成
      const secret = authenticator.generateSecret();
      
      // QRコード用のOTPAuth URLを生成
      const otpAuthUrl = authenticator.keyuri(
        userEmail,
        this.config.issuer,
        secret
      );
      
      // QRコードを生成
      const qrCodeUrl = await QRCode.toDataURL(otpAuthUrl);
      
      // バックアップコードを生成
      const backupCodes = this.generateBackupCodes();
      
      // データベースに保存
      await this.saveTOTPConfig(userId, secret, backupCodes);
      
      logger.info('TOTP configuration generated', { 
        userId,
        hasSecret: !!secret,
        backupCodesCount: backupCodes.length 
      });
      
      return {
        secret,
        qrCodeUrl,
        manualEntryKey: secret,
        backupCodes
      };
      
    } catch (error) {
      logger.error('Failed to generate TOTP secret', { 
        userId, 
        error: error instanceof Error ? error.message : error 
      });
      throw new AppError(
        'TOTP設定の生成に失敗しました',
        ErrorType.SERVER,
        ErrorSeverity.HIGH,
        'TOTP_GENERATION_FAILED'
      );
    }
  }

  // 📱 TOTP検証
  async verifyTOTP(userId: string, token: string, sessionId?: string): Promise<{
    isValid: boolean;
    method: string;
    remainingAttempts?: number;
  }> {
    try {
      // セッション確認（必要な場合）
      if (sessionId) {
        const session = await this.getTwoFactorSession(sessionId);
        if (!session || session.userId !== userId) {
          throw new AppError(
            'セッションが無効です',
            ErrorType.AUTHENTICATION,
            ErrorSeverity.MEDIUM,
            'INVALID_2FA_SESSION'
          );
        }
        
        if (session.attempts >= session.maxAttempts) {
          throw new AppError(
            '認証試行回数が上限に達しました',
            ErrorType.RATE_LIMIT,
            ErrorSeverity.MEDIUM,
            'MAX_2FA_ATTEMPTS'
          );
        }
      }
      
      // TOTP設定を取得
      const totpConfig = await this.getTOTPConfig(userId);
      if (!totpConfig || !totpConfig.enabled) {
        throw new AppError(
          'TOTP認証が設定されていません',
          ErrorType.AUTHENTICATION,
          ErrorSeverity.MEDIUM,
          'TOTP_NOT_CONFIGURED'
        );
      }
      
      // トークン検証
      const isValid = authenticator.verify({
        token,
        secret: totpConfig.secret
      });
      
      // 試行回数を記録
      if (sessionId) {
        await this.updateTwoFactorSession(sessionId, !isValid);
      }
      
      if (isValid) {
        // 最終使用日時を更新
        await this.updateTOTPLastUsed(userId);
        
        logger.info('TOTP verification successful', { userId });
        
        return {
          isValid: true,
          method: 'totp'
        };
      } else {
        logger.warn('TOTP verification failed', { userId, sessionId });
        
        const session = sessionId ? await this.getTwoFactorSession(sessionId) : null;
        return {
          isValid: false,
          method: 'totp',
          remainingAttempts: session ? session.maxAttempts - session.attempts : undefined
        };
      }
      
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      logger.error('TOTP verification error', { 
        userId, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        'TOTP認証中にエラーが発生しました',
        ErrorType.SERVER,
        ErrorSeverity.HIGH,
        'TOTP_VERIFICATION_ERROR'
      );
    }
  }

  // 📧 SMS/Email 2FA の送信
  async sendTwoFactorCode(
    userId: string, 
    method: 'sms' | 'email',
    destination: string
  ): Promise<{
    sessionId: string;
    expiresAt: Date;
    method: string;
  }> {
    try {
      // 6桁の確認コードを生成
      const code = this.generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10分後
      
      // セッションを作成
      const sessionId = randomBytes(32).toString('hex');
      await this.createTwoFactorSession({
        sessionId,
        userId,
        method,
        verified: false,
        expiresAt,
        attempts: 0,
        maxAttempts: 5
      });
      
      // コードをハッシュ化して保存
      const hashedCode = this.hashVerificationCode(code);
      await this.saveVerificationCode(sessionId, hashedCode);
      
      // 通知を送信
      if (method === 'email') {
        await this.sendEmailCode(destination, code);
      } else if (method === 'sms') {
        await this.sendSMSCode(destination, code);
      }
      
      logger.info('2FA code sent', { userId, method, sessionId });
      
      return {
        sessionId,
        expiresAt,
        method
      };
      
    } catch (error) {
      logger.error('Failed to send 2FA code', { 
        userId, 
        method, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        '認証コードの送信に失敗しました',
        ErrorType.EXTERNAL_API,
        ErrorSeverity.MEDIUM,
        'CODE_SEND_FAILED'
      );
    }
  }

  // 📧 SMS/Email コードの検証
  async verifyTwoFactorCode(
    sessionId: string,
    code: string
  ): Promise<{
    isValid: boolean;
    method: string;
    remainingAttempts?: number;
  }> {
    try {
      const session = await this.getTwoFactorSession(sessionId);
      if (!session) {
        throw new AppError(
          'セッションが見つかりません',
          ErrorType.AUTHENTICATION,
          ErrorSeverity.MEDIUM,
          'SESSION_NOT_FOUND'
        );
      }
      
      if (new Date() > session.expiresAt) {
        throw new AppError(
          'セッションの有効期限が切れています',
          ErrorType.AUTHENTICATION,
          ErrorSeverity.MEDIUM,
          'SESSION_EXPIRED'
        );
      }
      
      if (session.attempts >= session.maxAttempts) {
        throw new AppError(
          '認証試行回数が上限に達しました',
          ErrorType.RATE_LIMIT,
          ErrorSeverity.MEDIUM,
          'MAX_2FA_ATTEMPTS'
        );
      }
      
      // 保存されたコードを取得
      const savedCodeHash = await this.getVerificationCode(sessionId);
      if (!savedCodeHash) {
        throw new AppError(
          '認証コードが見つかりません',
          ErrorType.AUTHENTICATION,
          ErrorSeverity.MEDIUM,
          'CODE_NOT_FOUND'
        );
      }
      
      // コードを検証
      const inputCodeHash = this.hashVerificationCode(code);
      const isValid = timingSafeEqual(
        Buffer.from(savedCodeHash, 'hex'),
        Buffer.from(inputCodeHash, 'hex')
      );
      
      // 試行回数を記録
      await this.updateTwoFactorSession(sessionId, !isValid);
      
      if (isValid) {
        // セッションを認証済みにマーク
        await this.markSessionVerified(sessionId);
        
        logger.info('2FA code verification successful', { 
          sessionId, 
          method: session.method 
        });
        
        return {
          isValid: true,
          method: session.method
        };
      } else {
        logger.warn('2FA code verification failed', { sessionId });
        
        const updatedSession = await this.getTwoFactorSession(sessionId);
        return {
          isValid: false,
          method: session.method,
          remainingAttempts: updatedSession ? 
            updatedSession.maxAttempts - updatedSession.attempts : 0
        };
      }
      
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      logger.error('2FA code verification error', { 
        sessionId, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        '認証コードの確認中にエラーが発生しました',
        ErrorType.SERVER,
        ErrorSeverity.HIGH,
        'CODE_VERIFICATION_ERROR'
      );
    }
  }

  // 🔑 バックアップコードの検証
  async verifyBackupCode(userId: string, code: string): Promise<{
    isValid: boolean;
    remainingCodes: number;
  }> {
    try {
      const backupCodes = await this.getBackupCodes(userId);
      
      for (const backupCode of backupCodes) {
        if (!backupCode.used && 
            timingSafeEqual(
              Buffer.from(backupCode.code),
              Buffer.from(code)
            )) {
          
          // バックアップコードを使用済みにマーク
          await this.markBackupCodeUsed(userId, code);
          
          const remaining = backupCodes.filter(bc => !bc.used).length - 1;
          
          logger.info('Backup code verification successful', { 
            userId, 
            remainingCodes: remaining 
          });
          
          return {
            isValid: true,
            remainingCodes: remaining
          };
        }
      }
      
      logger.warn('Backup code verification failed', { userId });
      
      return {
        isValid: false,
        remainingCodes: backupCodes.filter(bc => !bc.used).length
      };
      
    } catch (error) {
      logger.error('Backup code verification error', { 
        userId, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        'バックアップコードの確認中にエラーが発生しました',
        ErrorType.SERVER,
        ErrorSeverity.HIGH,
        'BACKUP_CODE_VERIFICATION_ERROR'
      );
    }
  }

  // 🔧 ユーザーの2FA設定を取得
  async getUserTwoFactorMethods(userId: string): Promise<TwoFactorAuthMethod[]> {
    try {
      const { data, error } = await this.supabase
        .from('user_two_factor_auth')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      interface TwoFactorAuthRecord {
        id: string
        method_type: 'totp' | 'sms' | 'email' | 'backup_codes'
        enabled: boolean
        verified: boolean
        created_at: string
        last_used_at?: string
        metadata?: Record<string, unknown>
      }
      
      return data.map((record: TwoFactorAuthRecord) => ({
        id: record.id,
        type: record.method_type,
        enabled: record.enabled,
        verified: record.verified,
        createdAt: new Date(record.created_at),
        lastUsedAt: record.last_used_at ? new Date(record.last_used_at) : undefined,
        metadata: record.metadata || {}
      }));
      
    } catch (error) {
      logger.error('Failed to get user 2FA methods', { 
        userId, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        '2FA設定の取得に失敗しました',
        ErrorType.DATABASE,
        ErrorSeverity.MEDIUM,
        'GET_2FA_METHODS_FAILED'
      );
    }
  }

  // 🗑️ 2FA方法の無効化
  async disableTwoFactorMethod(userId: string, methodType: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('user_two_factor_auth')
        .update({ 
          enabled: false,
          disabled_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('method_type', methodType);

      if (error) {
        throw error;
      }

      logger.info('2FA method disabled', { userId, methodType });
      
    } catch (error) {
      logger.error('Failed to disable 2FA method', { 
        userId, 
        methodType, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        '2FA設定の無効化に失敗しました',
        ErrorType.DATABASE,
        ErrorSeverity.MEDIUM,
        'DISABLE_2FA_FAILED'
      );
    }
  }

  // 🔄 新しいバックアップコードを生成
  async regenerateBackupCodes(userId: string): Promise<string[]> {
    try {
      const newCodes = this.generateBackupCodes();
      await this.replaceBackupCodes(userId, newCodes);
      
      logger.info('Backup codes regenerated', { userId });
      
      return newCodes;
      
    } catch (error) {
      logger.error('Failed to regenerate backup codes', { 
        userId, 
        error: error instanceof Error ? error.message : error 
      });
      
      throw new AppError(
        'バックアップコードの再生成に失敗しました',
        ErrorType.DATABASE,
        ErrorSeverity.MEDIUM,
        'REGENERATE_BACKUP_CODES_FAILED'
      );
    }
  }

  // 🔐 プライベートメソッド

  private generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      // 8桁のランダムなバックアップコード
      const code = randomBytes(4).toString('hex').toUpperCase();
      codes.push(code);
    }
    
    return codes;
  }

  private generateVerificationCode(): string {
    // 6桁の数字コード
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private hashVerificationCode(code: string): string {
    return createHash('sha256').update(code + process.env.TOTP_SECRET_KEY).digest('hex');
  }

  private async saveTOTPConfig(
    userId: string, 
    secret: string, 
    backupCodes: string[]
  ): Promise<void> {
    const { error: totpError } = await this.supabase
      .from('user_two_factor_auth')
      .upsert({
        user_id: userId,
        method_type: 'totp',
        secret_key: secret,
        enabled: false,
        verified: false,
        created_at: new Date().toISOString()
      }, { 
        onConflict: 'user_id,method_type' 
      });

    if (totpError) {
      throw totpError;
    }

    // バックアップコードを保存
    const backupCodeRecords = backupCodes.map(code => ({
      user_id: userId,
      code: code,
      used: false,
      created_at: new Date().toISOString()
    }));

    const { error: backupError } = await this.supabase
      .from('user_backup_codes')
      .upsert(backupCodeRecords, { onConflict: 'user_id,code' });

    if (backupError) {
      throw backupError;
    }
  }

  private async getTOTPConfig(userId: string): Promise<{
    secret: string;
    enabled: boolean;
    verified: boolean;
  } | null> {
    const { data, error } = await this.supabase
      .from('user_two_factor_auth')
      .select('secret_key, enabled, verified')
      .eq('user_id', userId)
      .eq('method_type', 'totp')
      .single();

    if (error && error.code !== 'PGRST116') { // Not found is OK
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      secret: data.secret_key,
      enabled: data.enabled,
      verified: data.verified
    };
  }

  private async updateTOTPLastUsed(userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_two_factor_auth')
      .update({ last_used_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('method_type', 'totp');

    if (error) {
      throw error;
    }
  }

  private async createTwoFactorSession(session: TwoFactorSession): Promise<void> {
    const { error } = await this.supabase
      .from('two_factor_sessions')
      .insert({
        session_id: session.sessionId,
        user_id: session.userId,
        method: session.method,
        verified: session.verified,
        expires_at: session.expiresAt.toISOString(),
        attempts: session.attempts,
        max_attempts: session.maxAttempts,
        created_at: new Date().toISOString()
      });

    if (error) {
      throw error;
    }
  }

  private async getTwoFactorSession(sessionId: string): Promise<TwoFactorSession | null> {
    const { data, error } = await this.supabase
      .from('two_factor_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      sessionId: data.session_id,
      userId: data.user_id,
      method: data.method,
      verified: data.verified,
      expiresAt: new Date(data.expires_at),
      attempts: data.attempts,
      maxAttempts: data.max_attempts
    };
  }

  private async updateTwoFactorSession(sessionId: string, incrementAttempts: boolean): Promise<void> {
    if (incrementAttempts) {
      const { error } = await this.supabase
        .rpc('increment_2fa_attempts', { session_id: sessionId });

      if (error) {
        throw error;
      }
    }
  }

  private async markSessionVerified(sessionId: string): Promise<void> {
    const { error } = await this.supabase
      .from('two_factor_sessions')
      .update({ 
        verified: true,
        verified_at: new Date().toISOString()
      })
      .eq('session_id', sessionId);

    if (error) {
      throw error;
    }
  }

  private async saveVerificationCode(sessionId: string, hashedCode: string): Promise<void> {
    const { error } = await this.supabase
      .from('verification_codes')
      .insert({
        session_id: sessionId,
        code_hash: hashedCode,
        created_at: new Date().toISOString()
      });

    if (error) {
      throw error;
    }
  }

  private async getVerificationCode(sessionId: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('verification_codes')
      .select('code_hash')
      .eq('session_id', sessionId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data?.code_hash || null;
  }

  private async getBackupCodes(userId: string): Promise<BackupCode[]> {
    const { data, error } = await this.supabase
      .from('user_backup_codes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    interface BackupCodeRecord {
      code: string
      used: boolean
      used_at?: string
    }
    
    return data.map((record: BackupCodeRecord) => ({
      code: record.code,
      used: record.used,
      usedAt: record.used_at ? new Date(record.used_at) : undefined
    }));
  }

  private async markBackupCodeUsed(userId: string, code: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_backup_codes')
      .update({ 
        used: true,
        used_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('code', code);

    if (error) {
      throw error;
    }
  }

  private async replaceBackupCodes(userId: string, newCodes: string[]): Promise<void> {
    // 古いバックアップコードを削除
    const { error: deleteError } = await this.supabase
      .from('user_backup_codes')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      throw deleteError;
    }

    // 新しいバックアップコードを追加
    const backupCodeRecords = newCodes.map(code => ({
      user_id: userId,
      code: code,
      used: false,
      created_at: new Date().toISOString()
    }));

    const { error: insertError } = await this.supabase
      .from('user_backup_codes')
      .insert(backupCodeRecords);

    if (insertError) {
      throw insertError;
    }
  }

  private async sendEmailCode(email: string, code: string): Promise<void> {
    // Email送信の実装（NotificationServiceを使用）
    const { NotificationService } = await import('@/lib/notifications/notification-service');
    const notificationService = new NotificationService({
      email: {
        provider: 'resend',
        apiKey: process.env.RESEND_API_KEY || '',
        fromEmail: 'noreply@crypto-ai-platform.com',
        fromName: 'Crypto AI Platform',
        templates: { alertTemplate: '', welcomeTemplate: '', reportTemplate: '' }
      },
      push: { provider: 'firebase', apiKey: '', appId: '' },
      sms: { provider: 'twilio', fromNumber: '' },
      webhook: { timeout: 10000, retryAttempts: 0, retryDelay: 0, maxPayloadSize: 256 * 1024 },
      enabledMethods: [],
      rateLimits: { perUser: 0, perHour: 0, perDay: 0 },
      templates: { enablePersonalization: false, defaultLanguage: 'ja', supportedLanguages: ['ja'] }
    });

    await notificationService.sendSimpleEmail(email, {
      subject: '認証コード - Crypto AI Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>認証コード</h2>
          <p>Crypto AI Platformにログインするための認証コードです：</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
            ${code}
          </div>
          <p>このコードは10分間有効です。</p>
          <p>このメールに心当たりがない場合は、無視してください。</p>
        </div>
      `
    });
  }

  private async sendSMSCode(phoneNumber: string, code: string): Promise<void> {
    // SMS送信の実装（Twilioを使用）
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const twilioModule = await import('twilio');
      const twilio = twilioModule.default(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      await twilio.messages.create({
        body: `Crypto AI Platform認証コード: ${code} (10分間有効)`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
    }
  }
}

// エクスポート用のシングルトンインスタンス
export const twoFactorAuthManager = new TwoFactorAuthManager();
