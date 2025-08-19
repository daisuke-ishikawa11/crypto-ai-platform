// 🔔 包括的通知サービス
// メール、プッシュ通知、SMS、Webhook、アプリ内通知の統合管理

import { 
  TriggeredAlert, 
  AlertCondition, 
  NotificationMethod, 
  NotificationStatus 
} from '@/lib/alerts/types';
import { logger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/client';
import { safeAwait } from '@/lib/supabase/helpers';

export interface EmailConfig {
  provider: 'resend' | 'sendgrid' | 'nodemailer';
  apiKey: string;
  fromEmail: string;
  fromName: string;
  templates: {
    alertTemplate: string;
    welcomeTemplate: string;
    reportTemplate: string;
  };
}

export interface PushConfig {
  provider: 'firebase' | 'onesignal' | 'expo';
  apiKey: string;
  appId: string;
  certificates?: {
    ios?: string;
    android?: string;
  };
}

export interface SMSConfig {
  provider: 'twilio' | 'aws-sns';
  accountSid?: string;
  authToken?: string;
  fromNumber: string;
}

export interface WebhookConfig {
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  maxPayloadSize: number;
}

export interface NotificationServiceConfig {
  email: EmailConfig;
  push: PushConfig;
  sms: SMSConfig;
  webhook: WebhookConfig;
  enabledMethods: NotificationMethod[];
  rateLimits: {
    perUser: number;
    perHour: number;
    perDay: number;
  };
  templates: {
    enablePersonalization: boolean;
    defaultLanguage: string;
    supportedLanguages: string[];
  };
}

export interface NotificationMetrics {
  sent: number;
  failed: number;
  pending: number;
  successRate: number;
  averageDeliveryTime: number;
  byMethod: Record<NotificationMethod, { sent: number; failed: number }>;
  lastUpdate: Date;
}

export interface UserNotificationPreferences {
  userId: string;
  email?: {
    enabled: boolean;
    address: string;
    frequency: 'immediate' | 'hourly' | 'daily';
    alertTypes: string[];
  };
  push?: {
    enabled: boolean;
    deviceTokens: string[];
    frequency: 'immediate' | 'hourly' | 'daily';
    alertTypes: string[];
  };
  sms?: {
    enabled: boolean;
    phoneNumber: string;
    frequency: 'immediate' | 'critical_only';
    alertTypes: string[];
  };
  webhook?: {
    enabled: boolean;
    url: string;
    secret: string;
    frequency: 'immediate' | 'batch';
    alertTypes: string[];
  };
  inApp?: {
    enabled: boolean;
    frequency: 'immediate';
    alertTypes: string[];
  };
  timezone: string;
  quietHours?: {
    start: string; // HH:MM
    end: string; // HH:MM
    enabled: boolean;
  };
}

// Strict message types
export interface EmailMessage {
  to: string | string[];
  from: { email: string; name?: string };
  subject: string;
  html: string;
  text?: string;
  attachments?: unknown[];
}

export interface PushMessage {
  token?: string;
  tokens?: string[];
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, string>;
  priority?: 'high' | 'normal';
}

export interface SMSMessage {
  to: string;
  from?: string;
  body: string;
  mediaUrl?: string;
}

export interface RealtimeNotification {
  id?: string;
  type: string;
  title: string;
  message: string;
  additionalData?: Record<string, unknown>;
}

export class NotificationService {
  private metrics: NotificationMetrics;
  private rateLimiters: Map<string, { count: number; resetTime: Date }> = new Map();
  private notificationQueue: Array<{
    alert: TriggeredAlert;
    condition: AlertCondition;
    method: NotificationMethod;
    preferences: UserNotificationPreferences;
    retryCount: number;
  }> = [];
  private isProcessing = false;

  constructor(
    private readonly config: NotificationServiceConfig
  ) {
    this.metrics = {
      sent: 0,
      failed: 0,
      pending: 0,
      successRate: 0,
      averageDeliveryTime: 0,
      byMethod: {} as Record<NotificationMethod, { sent: number; failed: number }>,
      lastUpdate: new Date()
    };

    // Initialize metrics for each method
    Object.values(NotificationMethod).forEach(method => {
      this.metrics.byMethod[method] = { sent: 0, failed: 0 };
    });

    this.startProcessingQueue();
  }

  /**
   * アラート通知を送信
   */
  async sendAlertNotification(
    alert: TriggeredAlert, 
    condition: AlertCondition
  ): Promise<NotificationStatus[]> {
    const results: NotificationStatus[] = [];

    try {
      // ユーザーの通知設定を取得
      const preferences = await this.getUserNotificationPreferences(condition.userId);
      if (!preferences) {
        logger.warn('No notification preferences found for user', { 
          userId: condition.userId 
        });
        return results;
      }

      // レート制限チェック
      if (await this.isRateLimited(condition.userId)) {
        logger.warn('User notification rate limit exceeded', { 
          userId: condition.userId 
        });
        return results;
      }

      // 静寂時間チェック
      if (this.isInQuietHours(preferences)) {
        logger.debug('Notification suppressed due to quiet hours', { 
          userId: condition.userId 
        });
        // 緊急アラート以外は後で送信
        if (alert.severity !== 'emergency') {
          return results;
        }
      }

      // 各通知方法を処理
      for (const method of condition.notificationMethods) {
        if (!this.config.enabledMethods.includes(method)) {
          continue;
        }

        const status: NotificationStatus = {
          method,
          sentAt: new Date(),
          success: false,
          retryCount: 0
        };

        try {
          const deliveryTime = Date.now();

          switch (method) {
            case NotificationMethod.EMAIL:
              await this.sendEmailNotification(alert, condition, preferences);
              break;
            case NotificationMethod.PUSH:
              await this.sendPushNotification(alert, condition, preferences);
              break;
            case NotificationMethod.SMS:
              await this.sendSMSNotification(alert, condition, preferences);
              break;
            case NotificationMethod.WEBHOOK:
              await this.sendWebhookNotification(alert, condition, preferences);
              break;
            case NotificationMethod.IN_APP:
              await this.sendInAppNotification(alert, condition, preferences);
              break;
          }

          status.success = true;
          this.updateMetrics(method, true, Date.now() - deliveryTime);
          
          logger.info('Notification sent successfully', {
            alertId: alert.id,
            userId: condition.userId,
            method
          });

        } catch (error) {
          status.success = false;
          status.error = error instanceof Error ? error.message : 'Unknown error';
          this.updateMetrics(method, false, 0);

          logger.error('Failed to send notification', {
            alertId: alert.id,
            userId: condition.userId,
            method,
            error: error instanceof Error ? error.message : String(error)
          });

          // リトライキューに追加
          if (status.retryCount < 3) {
            this.queueForRetry(alert, condition, method, preferences);
          }
        }

        results.push(status);
      }

      // レート制限カウンターを更新
      await this.updateRateLimit(condition.userId);

    } catch (error) {
      logger.error('Error sending alert notifications', {
        alertId: alert.id,
        userId: condition.userId,
        error: error instanceof Error ? error.message : String(error)
      });
    }

    return results;
  }

  /**
   * メール通知の送信
   */
  private async sendEmailNotification(
    alert: TriggeredAlert,
    condition: AlertCondition,
    preferences: UserNotificationPreferences
  ): Promise<void> {
    if (!preferences.email?.enabled || !preferences.email.address) {
      throw new Error('Email notifications not enabled for user');
    }

    const emailData: EmailMessage = {
      to: preferences.email.address,
      from: {
        email: this.config.email.fromEmail,
        name: this.config.email.fromName
      },
      subject: this.generateEmailSubject(alert),
      html: this.generateEmailContent(alert, condition, preferences),
      text: this.generateEmailTextContent(alert, condition)
    };

    switch (this.config.email.provider) {
      case 'resend':
        await this.sendResendEmail(emailData);
        break;
      case 'sendgrid':
        await this.sendSendGridEmail(emailData);
        break;
      case 'nodemailer':
        await this.sendNodemailerEmail(emailData);
        break;
      default:
        throw new Error(`Unsupported email provider: ${this.config.email.provider}`);
    }
  }

  /**
   * プッシュ通知の送信
   */
  private async sendPushNotification(
    alert: TriggeredAlert,
    condition: AlertCondition,
    preferences: UserNotificationPreferences
  ): Promise<void> {
    if (!preferences.push?.enabled || !preferences.push.deviceTokens?.length) {
      throw new Error('Push notifications not enabled for user');
    }

    const pushData: PushMessage = {
      tokens: preferences.push.deviceTokens,
      title: this.generatePushTitle(alert),
      body: this.generatePushBody(alert, condition),
      data: {
        alertId: alert.id,
        type: alert.type,
        severity: alert.severity,
        symbol: condition.symbol
      },
      priority: alert.severity === 'emergency' ? 'high' : 'normal'
    };

    switch (this.config.push.provider) {
      case 'firebase':
        await this.sendFirebasePush(pushData);
        break;
      case 'onesignal':
        await this.sendOneSignalPush(pushData);
        break;
      case 'expo':
        await this.sendExpoPush(pushData);
        break;
      default:
        throw new Error(`Unsupported push provider: ${this.config.push.provider}`);
    }
  }

  /**
   * SMS通知の送信
   */
  private async sendSMSNotification(
    alert: TriggeredAlert,
    condition: AlertCondition,
    preferences: UserNotificationPreferences
  ): Promise<void> {
    if (!preferences.sms?.enabled || !preferences.sms.phoneNumber) {
      throw new Error('SMS notifications not enabled for user');
    }

    // SMS通知は緊急アラートのみまたは明示的に設定されている場合のみ
    if (preferences.sms.frequency === 'critical_only' && alert.severity !== 'emergency') {
      return;
    }

    const smsData: SMSMessage = {
      to: preferences.sms.phoneNumber,
      from: this.config.sms.fromNumber,
      body: this.generateSMSContent(alert, condition)
    };

    switch (this.config.sms.provider) {
      case 'twilio':
        await this.sendTwilioSMS(smsData);
        break;
      case 'aws-sns':
        await this.sendAWSSNS(smsData);
        break;
      default:
        throw new Error(`Unsupported SMS provider: ${this.config.sms.provider}`);
    }
  }

  /**
   * Webhook通知の送信
   */
  private async sendWebhookNotification(
    alert: TriggeredAlert,
    condition: AlertCondition,
    preferences: UserNotificationPreferences
  ): Promise<void> {
    if (!preferences.webhook?.enabled || !preferences.webhook.url) {
      throw new Error('Webhook notifications not enabled for user');
    }

    const webhookData = {
      timestamp: new Date().toISOString(),
      event: 'alert.triggered',
      alert: {
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        title: alert.title,
        message: alert.message,
        details: alert.details,
        triggeredAt: alert.triggeredAt,
        currentValue: alert.currentValue,
        previousValue: alert.previousValue,
        changePercent: alert.changePercent
      },
      condition: {
        id: condition.id,
        name: condition.name,
        symbol: condition.symbol,
        type: condition.type
      }
    };

    const signature = await this.generateWebhookSignature(
      JSON.stringify(webhookData),
      preferences.webhook.secret
    );

    const response = await fetch(preferences.webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'User-Agent': 'CryptoAI-Platform/1.0'
      },
      body: JSON.stringify(webhookData),
      signal: AbortSignal.timeout(this.config.webhook.timeout)
    });

    if (!response.ok) {
      throw new Error(`Webhook delivery failed: ${response.status} ${response.statusText}`);
    }
  }

  /**
   * アプリ内通知の送信
   */
  private async sendInAppNotification(
    alert: TriggeredAlert,
    condition: AlertCondition,
    preferences: UserNotificationPreferences
  ): Promise<void> {
    if (!preferences.inApp?.enabled) {
      throw new Error('In-app notifications not enabled for user');
    }

    // データベースにアプリ内通知を保存
    const supabase = await createClient();
    await safeAwait(
      supabase.from('in_app_notifications').insert({
      user_id: condition.userId,
      alert_id: alert.id,
      title: alert.title,
      message: alert.message,
      type: alert.type,
      severity: alert.severity,
      data: {
        symbol: condition.symbol,
        currentValue: alert.currentValue,
        details: alert.details
      },
      read: false,
      created_at: new Date()
      })
    );

    // リアルタイム通知（WebSocket経由）
    await this.sendRealtimeNotification(condition.userId, {
      type: 'alert',
      title: alert.title,
      message: alert.message,
      additionalData: { severity: alert.severity, alertId: alert.id }
    });
  }

  /**
   * プロバイダー固有の実装（プレースホルダー）
   */
  private async sendResendEmail(emailData: EmailMessage): Promise<void> {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: `${emailData.from.name ? `${emailData.from.name} ` : ''}<${emailData.from.email}>`,
        to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text
      });

      if (error) {
        throw new Error(`Resend API error: ${error.message}`);
      }

      logger.info('Resend email sent successfully', { 
        to: Array.isArray(emailData.to) ? emailData.to.join(',') : emailData.to, 
        messageId: data?.id 
      });
    } catch (error) {
      logger.error('Failed to send Resend email', { 
        to: Array.isArray(emailData.to) ? emailData.to.join(',') : emailData.to, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  private async sendSendGridEmail(emailData: EmailMessage): Promise<void> {
    // TODO: SendGrid API integration
    const toCount = Array.isArray(emailData.to) ? emailData.to.length : 1;
    logger.debug('SendGrid email sent', { to: toCount });
  }

  private async sendNodemailerEmail(emailData: EmailMessage): Promise<void> {
    try {
      const nodemailer = await import('nodemailer');

      // SMTPトランスポート設定
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: `${emailData.from.name ? `${emailData.from.name} ` : ''}<${emailData.from.email}>`,
        to: Array.isArray(emailData.to) ? emailData.to.join(',') : emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        attachments: Array.isArray(emailData.attachments) ? (emailData.attachments as import('nodemailer/lib/mailer').Attachment[]) : undefined
      } as import('nodemailer/lib/mailer').Options;

      const info = await transporter.sendMail(mailOptions);
      
      logger.info('Nodemailer email sent successfully', { 
        to: Array.isArray(emailData.to) ? emailData.to.join(',') : emailData.to, 
        messageId: (info as { messageId?: string }).messageId
      });
    } catch (error) {
      logger.error('Failed to send Nodemailer email', { 
        to: Array.isArray(emailData.to) ? emailData.to.join(',') : emailData.to, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  private async sendFirebasePush(pushData: PushMessage): Promise<void> {
    try {
      const { getMessaging } = await import('firebase-admin/messaging');
      const { initializeApp, getApps, cert } = await import('firebase-admin/app');

      // Firebase Admin初期化（まだ初期化されていない場合）
      if (getApps().length === 0) {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
          ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
          : {
              projectId: process.env.FIREBASE_PROJECT_ID,
              privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL
            };

        initializeApp({
          credential: cert(serviceAccount),
          projectId: process.env.FIREBASE_PROJECT_ID
        });
      }

      const messaging = getMessaging();

      // 単一トークンの場合
      if (typeof pushData.token === 'string') {
        const message = {
          token: pushData.token,
          notification: {
            title: pushData.title,
            body: pushData.body,
            imageUrl: pushData.imageUrl
          },
          data: pushData.data || {},
          android: {
            priority: 'high' as const,
            notification: {
              icon: 'ic_notification',
              color: '#007bff',
              sound: 'default'
            }
          },
          apns: {
            payload: {
              aps: {
                sound: 'default',
                badge: 1
              }
            }
          },
          webpush: {
            notification: {
              icon: '/icons/icon-192x192.png',
              badge: '/icons/icon-96x96.png'
            }
          }
        } as const;

        const response = await messaging.send(message);
        logger.info('Firebase push notification sent successfully', { 
          token: pushData.token, 
          messageId: response 
        });
      } 
      // 複数トークンの場合
      else if (Array.isArray(pushData.tokens) && pushData.tokens.length > 0) {
        const message = {
          tokens: pushData.tokens,
          notification: {
            title: pushData.title,
            body: pushData.body,
            imageUrl: pushData.imageUrl
          },
          data: pushData.data || {},
          android: {
            priority: 'high' as const,
            notification: {
              icon: 'ic_notification',
              color: '#007bff',
              sound: 'default'
            }
          },
          apns: {
            payload: {
              aps: {
                sound: 'default',
                badge: 1
              }
            }
          },
          webpush: {
            notification: {
              icon: '/icons/icon-192x192.png',
              badge: '/icons/icon-96x96.png'
            }
          }
        } as const;

        const response = await messaging.sendEachForMulticast(message);
        logger.info('Firebase push notifications sent successfully', { 
          tokens: pushData.tokens.length,
          successCount: response.successCount,
          failureCount: response.failureCount
        });

        // 失敗したトークンをログ出力
        if (response.failureCount > 0) {
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              logger.warn('Firebase push notification failed for token', {
                token: pushData.tokens![idx],
                error: resp.error?.message
              });
            }
          });
        }
      }
    } catch (error) {
      const tokensCount = Array.isArray(pushData.tokens) ? pushData.tokens.length : (pushData.token ? 1 : 0);
      logger.error('Failed to send Firebase push notification', { 
        tokens: tokensCount, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  private async sendOneSignalPush(pushData: PushMessage): Promise<void> {
    // TODO: OneSignal API integration
    const tokensCount = Array.isArray(pushData.tokens) ? pushData.tokens.length : (pushData.token ? 1 : 0);
    logger.debug('OneSignal push sent', { tokens: tokensCount });
  }

  private async sendExpoPush(pushData: PushMessage): Promise<void> {
    // TODO: Expo Push Notifications integration
    const tokensCount = Array.isArray(pushData.tokens) ? pushData.tokens.length : (pushData.token ? 1 : 0);
    logger.debug('Expo push sent', { tokens: tokensCount });
  }

  private async sendTwilioSMS(smsData: SMSMessage): Promise<void> {
    try {
      const { Twilio } = await import('twilio');
      
      const client = new Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const message = await client.messages.create({
        body: smsData.body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: smsData.to,
        mediaUrl: smsData.mediaUrl ? [smsData.mediaUrl] : undefined
      });

      logger.info('Twilio SMS sent successfully', { 
        to: smsData.to, 
        messageSid: message.sid,
        status: message.status
      });
    } catch (error) {
      logger.error('Failed to send Twilio SMS', { 
        to: smsData.to, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  private async sendAWSSNS(smsData: SMSMessage): Promise<void> {
    // TODO: AWS SNS integration
    logger.debug('AWS SNS sent', { to: smsData.to });
  }

  private async sendRealtimeNotification(userId: string, data: RealtimeNotification): Promise<void> {
    try {
      const supabase = await createClient();
      
      // Supabaseのリアルタイム機能を使用してブロードキャスト
      const channel = supabase.channel(`user_notifications_${userId}`)
        .on('broadcast', { event: 'notification' }, (_payload) => {
          // クライアント側での受信処理は別途実装
        });

      // 通知データをブロードキャスト
      await channel.send({
        type: 'broadcast',
        event: 'notification',
        payload: {
          id: data.id || crypto.randomUUID(),
          userId: userId,
          type: data.type,
          title: data.title,
          message: data.message,
          data: data.additionalData || {},
          timestamp: new Date().toISOString(),
          read: false
        }
      });

      // データベースにも保存（履歴管理用）
      await safeAwait(
        supabase.from('user_notifications').insert({
          id: data.id || crypto.randomUUID(),
          user_id: userId,
          type: data.type,
          title: data.title,
          message: data.message,
          data: data.additionalData || {},
          read: false,
          created_at: new Date()
        })
      );

      logger.info('Realtime notification sent successfully', { 
        userId, 
        type: data.type,
        title: data.title
      });
    } catch (error) {
      logger.error('Failed to send realtime notification', { 
        userId, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  /**
   * コンテンツ生成メソッド
   */
  private generateEmailSubject(alert: TriggeredAlert): string {
    const severityPrefix = alert.severity === 'emergency' ? '🚨 URGENT: ' : 
                          alert.severity === 'critical' ? '⚠️ CRITICAL: ' : 
                          alert.severity === 'warning' ? '⚠️ WARNING: ' : '';
    return `${severityPrefix}${alert.title}`;
  }

  private generateEmailContent(
    alert: TriggeredAlert, 
    condition: AlertCondition,
    preferences: UserNotificationPreferences
  ): string {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="background-color: ${this.getSeverityColor(alert.severity)}; color: white; padding: 20px;">
              <h1 style="margin: 0; font-size: 24px;">${alert.title}</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">${alert.message}</p>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Alert Details</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li><strong>Symbol:</strong> ${condition.symbol}</li>
                  <li><strong>Type:</strong> ${alert.type}</li>
                  <li><strong>Severity:</strong> ${alert.severity}</li>
                  <li><strong>Current Value:</strong> ${alert.currentValue}</li>
                  ${alert.previousValue ? `<li><strong>Previous Value:</strong> ${alert.previousValue}</li>` : ''}
                  ${alert.changePercent ? `<li><strong>Change:</strong> ${alert.changePercent.toFixed(2)}%</li>` : ''}
                  <li><strong>Triggered At:</strong> ${alert.triggeredAt.toLocaleString()}</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/alerts" 
                   style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View in Dashboard
                </a>
              </div>
              
              <div style="border-top: 1px solid #dee2e6; margin-top: 30px; padding-top: 20px; text-align: center; color: #6c757d; font-size: 14px;">
                <p>You received this alert because you have notifications enabled for ${condition.name}.</p>
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/settings/notifications" style="color: #007bff;">Manage notification preferences</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateEmailTextContent(alert: TriggeredAlert, condition: AlertCondition): string {
    return `
${alert.title}

${alert.message}

Alert Details:
- Symbol: ${condition.symbol}
- Type: ${alert.type}
- Severity: ${alert.severity}
- Current Value: ${alert.currentValue}
${alert.previousValue ? `- Previous Value: ${alert.previousValue}` : ''}
${alert.changePercent ? `- Change: ${alert.changePercent.toFixed(2)}%` : ''}
- Triggered At: ${alert.triggeredAt.toLocaleString()}

View in Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/alerts
Manage notifications: ${process.env.NEXT_PUBLIC_APP_URL}/settings/notifications
    `;
  }

  private generatePushTitle(alert: TriggeredAlert): string {
    return alert.title.length > 50 ? alert.title.substring(0, 47) + '...' : alert.title;
  }

  private generatePushBody(alert: TriggeredAlert, condition: AlertCondition): string {
    const body = `${condition.symbol}: ${alert.message}`;
    return body.length > 120 ? body.substring(0, 117) + '...' : body;
  }

  private generateSMSContent(alert: TriggeredAlert, condition: AlertCondition): string {
    return `🚨 ${condition.symbol} Alert: ${alert.message.substring(0, 100)}${alert.message.length > 100 ? '...' : ''}`;
  }

  /**
   * ユーティリティメソッド
   */
  private getSeverityColor(severity: string): string {
    switch (severity) {
      case 'emergency': return '#dc3545';
      case 'critical': return '#fd7e14';
      case 'warning': return '#ffc107';
      default: return '#007bff';
    }
  }

  private async generateWebhookSignature(payload: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async getUserNotificationPreferences(userId: string): Promise<UserNotificationPreferences | null> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error || !data) return null;

      return {
        userId: data.user_id,
        email: data.email_preferences,
        push: data.push_preferences,
        sms: data.sms_preferences,
        webhook: data.webhook_preferences,
        inApp: data.in_app_preferences,
        timezone: data.timezone || 'UTC',
        quietHours: data.quiet_hours
      };
    } catch (error) {
      logger.error('Error fetching user notification preferences', { userId, error: error instanceof Error ? error.message : String(error) });
      return null;
    }
  }

  private async isRateLimited(userId: string): Promise<boolean> {
    const key = `rate_limit_${userId}`;
    const now = new Date();
    
    if (!this.rateLimiters.has(key)) {
      this.rateLimiters.set(key, { count: 0, resetTime: new Date(now.getTime() + 60 * 60 * 1000) });
    }

    const limiter = this.rateLimiters.get(key)!;
    
    if (now > limiter.resetTime) {
      limiter.count = 0;
      limiter.resetTime = new Date(now.getTime() + 60 * 60 * 1000);
    }

    return limiter.count >= this.config.rateLimits.perHour;
  }

  private async updateRateLimit(userId: string): Promise<void> {
    const key = `rate_limit_${userId}`;
    const limiter = this.rateLimiters.get(key);
    if (limiter) {
      limiter.count++;
    }
  }

  private isInQuietHours(preferences: UserNotificationPreferences): boolean {
    if (!preferences.quietHours?.enabled) return false;

    const now = new Date();
    const userTime = new Date(now.toLocaleString("en-US", { timeZone: preferences.timezone }));
    const currentTime = userTime.getHours() * 60 + userTime.getMinutes();
    
    const [startHour, startMin] = preferences.quietHours.start.split(':').map(Number);
    const [endHour, endMin] = preferences.quietHours.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    if (startTime <= endTime) {
      return currentTime >= startTime && currentTime <= endTime;
    } else {
      // Spans midnight
      return currentTime >= startTime || currentTime <= endTime;
    }
  }

  private queueForRetry(
    alert: TriggeredAlert,
    condition: AlertCondition,
    method: NotificationMethod,
    preferences: UserNotificationPreferences
  ): void {
    this.notificationQueue.push({
      alert,
      condition,
      method,
      preferences,
      retryCount: 0
    });
  }

  private startProcessingQueue(): void {
    if (process.env.NODE_ENV === 'test') return;
    const t = setInterval(async () => {
      if (this.isProcessing || this.notificationQueue.length === 0) return;

      this.isProcessing = true;
      
      try {
        const batch = this.notificationQueue.splice(0, 10); // Process in batches of 10
        
        for (const item of batch) {
          if (item.retryCount >= 3) continue; // Skip if max retries exceeded
          
          try {
            await this.sendAlertNotification(item.alert, item.condition);
          } catch (_error) {
            item.retryCount++;
            if (item.retryCount < 3) {
              this.notificationQueue.push(item); // Re-queue for retry
            }
          }
        }
      } finally {
        this.isProcessing = false;
      }
    }, 30000); // Process every 30 seconds
    ;(t as { unref?: () => void }).unref?.();
  }

  private updateMetrics(method: NotificationMethod, success: boolean, deliveryTime: number): void {
    if (success) {
      this.metrics.sent++;
      this.metrics.byMethod[method].sent++;
    } else {
      this.metrics.failed++;
      this.metrics.byMethod[method].failed++;
    }

    this.metrics.successRate = this.metrics.sent / (this.metrics.sent + this.metrics.failed);
    this.metrics.pending = this.notificationQueue.length;
    this.metrics.lastUpdate = new Date();

    if (success && deliveryTime > 0) {
      // Simple moving average for delivery time
      this.metrics.averageDeliveryTime = 
        (this.metrics.averageDeliveryTime * 0.9) + (deliveryTime * 0.1);
    }
  }

  /**
   * 公開メソッド
   */
  getMetrics(): NotificationMetrics {
    return { ...this.metrics };
  }

  // Public method for sending simple emails (for 2FA, etc.)
  async sendSimpleEmail(to: string, emailContent: { subject: string; html: string }): Promise<void> {
    const emailData: EmailMessage = {
      to,
      from: {
        email: this.config.email.fromEmail,
        name: this.config.email.fromName
      },
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.html.replace(/<[^>]*>/g, '') // Simple HTML to text conversion
    };

    try {
      switch (this.config.email.provider) {
        case 'resend':
          await this.sendResendEmail(emailData);
          break;
        case 'sendgrid':
          await this.sendSendGridEmail(emailData);
          break;
        case 'nodemailer':
          await this.sendNodemailerEmail(emailData);
          break;
        default:
          throw new Error(`Unsupported email provider: ${this.config.email.provider}`);
      }

      logger.info('Simple email sent successfully', { to, subject: emailContent.subject });
    } catch (error) {
      logger.error('Failed to send simple email', { 
        to, 
        subject: emailContent.subject,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserNotificationPreferences>): Promise<void> {
    try {
      const supabase = await createClient();
      await supabase.from('user_notification_preferences')
        .upsert({
          user_id: userId,
          email_preferences: preferences.email,
          push_preferences: preferences.push,
          sms_preferences: preferences.sms,
          webhook_preferences: preferences.webhook,
          in_app_preferences: preferences.inApp,
          timezone: preferences.timezone,
          quiet_hours: preferences.quietHours,
          updated_at: new Date()
        });

      logger.info('User notification preferences updated', { userId });
    } catch (error) {
      logger.error('Error updating user notification preferences', { userId, error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }

  // Public method for sending emails (for 2FA, etc.)
  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<void> {
    const emailData: EmailMessage = {
      to,
      from: {
        email: this.config.email.fromEmail,
        name: this.config.email.fromName
      },
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Simple HTML to text conversion
    };

    try {
      switch (this.config.email.provider) {
        case 'resend':
          await this.sendResendEmail(emailData);
          break;
        case 'sendgrid':
          await this.sendSendGridEmail(emailData);
          break;
        case 'nodemailer':
          await this.sendNodemailerEmail(emailData);
          break;
        default:
          throw new Error(`Unsupported email provider: ${this.config.email.provider}`);
      }

      logger.info('Email sent successfully', { to, subject });
    } catch (error) {
      logger.error('Failed to send email', { 
        to, 
        subject,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  // Public method for sending SMS (for 2FA, etc.)
  async sendSMS(to: string, message: string): Promise<void> {
    const smsData: SMSMessage = {
      to,
      from: this.config.sms.fromNumber,
      body: message
    };

    try {
      switch (this.config.sms.provider) {
        case 'twilio':
          await this.sendTwilioSMS(smsData);
          break;
        case 'aws-sns':
          await this.sendAWSSNS(smsData);
          break;
        default:
          throw new Error(`Unsupported SMS provider: ${this.config.sms.provider}`);
      }

      logger.info('SMS sent successfully', { to });
    } catch (error) {
      logger.error('Failed to send SMS', { 
        to, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  /**
   * クリーンアップ
   */
  cleanup(): void {
    // Clear old rate limiters
    const now = new Date();
    for (const [key, limiter] of this.rateLimiters.entries()) {
      if (now > limiter.resetTime) {
        this.rateLimiters.delete(key);
      }
    }

    logger.debug('Notification service cleanup completed', {
      queueSize: this.notificationQueue.length,
      rateLimiters: this.rateLimiters.size
    });
  }
}
