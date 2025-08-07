// 🔔 通知管理システム
// アラートシステムとの統合および通知配信の簡易インターフェース

import { 
  TriggeredAlert, 
  AlertCondition, 
  NotificationMethod 
} from '@/lib/alerts/types';
import { 
  NotificationService, 
  NotificationServiceConfig,
  UserNotificationPreferences 
} from './notification-service';
import { logger } from '@/lib/monitoring/logger';

export interface NotificationManagerConfig {
  enableEmail: boolean;
  enablePush: boolean;
  enableSMS: boolean;
  enableWebhook: boolean;
  enableInApp: boolean;
  defaultPreferences: Partial<UserNotificationPreferences>;
  fallbackMethods: NotificationMethod[];
}

export class NotificationManager {
  private notificationService: NotificationService;

  constructor(
    serviceConfig: NotificationServiceConfig,
    private readonly config: NotificationManagerConfig = {
      enableEmail: true,
      enablePush: true,
      enableSMS: false,
      enableWebhook: true,
      enableInApp: true,
      defaultPreferences: {
        email: {
          enabled: true,
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'risk']
        },
        push: {
          enabled: true,
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'risk']
        },
        inApp: {
          enabled: true,
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'volume', 'risk']
        },
        timezone: 'UTC',
        quietHours: {
          start: '22:00',
          end: '08:00',
          enabled: false
        }
      },
      fallbackMethods: [NotificationMethod.IN_APP, NotificationMethod.EMAIL]
    }
  ) {
    this.notificationService = new NotificationService(serviceConfig);
  }

  /**
   * アラート通知を送信（メインインターフェース）
   */
  async sendAlert(alert: TriggeredAlert, condition: AlertCondition): Promise<void> {
    try {
      // フィルタリングされた通知方法を取得
      const enabledMethods = this.getEnabledNotificationMethods(condition.notificationMethods);
      
      if (enabledMethods.length === 0) {
        logger.warn('No enabled notification methods for alert', {
          alertId: alert.id,
          userId: condition.userId
        });
        return;
      }

      // 通知方法を更新
      const updatedCondition = {
        ...condition,
        notificationMethods: enabledMethods
      };

      // 通知サービスを使用して送信
      const results = await this.notificationService.sendAlertNotification(alert, updatedCondition);
      
      // 結果をログに記録
      const successCount = results.filter(r => r.success).length;
      const failureCount = results.filter(r => !r.success).length;
      
      logger.info('Alert notification completed', {
        alertId: alert.id,
        userId: condition.userId,
        successCount,
        failureCount,
        methods: enabledMethods
      });

      // 失敗した通知がある場合はフォールバック
      if (failureCount > 0 && successCount === 0) {
        await this.sendFallbackNotification(alert, condition);
      }

    } catch (error) {
      logger.error('Error sending alert notification', {
        alertId: alert.id,
        userId: condition.userId,
        wsError: error
      });

      // エラーの場合もフォールバックを試行
      await this.sendFallbackNotification(alert, condition);
    }
  }

  /**
   * システム通知を送信
   */
  async sendSystemNotification(
    userId: string,
    title: string,
    message: string,
    type: 'info' | 'warning' | 'error' | 'success' = 'info',
    methods: NotificationMethod[] = [NotificationMethod.IN_APP, NotificationMethod.EMAIL]
  ): Promise<void> {
    try {
      // システム通知用のアラートオブジェクトを作成
      const systemAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: 'system',
        userId,
        type: 'SYSTEM_NOTIFICATION' as any,
        severity: type === 'error' ? 'critical' : type === 'warning' ? 'warning' : 'info',
        triggeredAt: new Date(),
        currentValue: 0,
        title,
        message,
        acknowledged: false,
        notificationsSent: []
      };

      const systemCondition: AlertCondition = {
        id: 'system',
        userId,
        name: 'System Notification',
        type: 'SYSTEM_NOTIFICATION' as any,
        severity: 'info',
        status: 'active' as any,
        symbol: 'SYSTEM',
        conditions: {},
        notificationMethods: this.getEnabledNotificationMethods(methods),
        cooldownPeriod: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        triggerCount: 0
      };

      await this.notificationService.sendAlertNotification(systemAlert, systemCondition);

      logger.info('System notification sent', {
        userId,
        title,
        type,
        methods
      });

    } catch (error) {
      logger.error('Error sending system notification', {
        userId,
        title,
        type,
        wsError: error
      });
    }
  }

  /**
   * 一括通知送信
   */
  async sendBulkNotifications(
    notifications: Array<{
      alert: TriggeredAlert;
      condition: AlertCondition;
    }>
  ): Promise<void> {
    const batchSize = 10; // 一度に処理する通知数
    
    for (let i = 0; i < notifications.length; i += batchSize) {
      const batch = notifications.slice(i, i + batchSize);
      
      const promises = batch.map(({ alert, condition }) => 
        this.sendAlert(alert, condition).catch(error => {
          logger.error('Error in bulk notification', {
            alertId: alert.id,
            wsError: error
          });
        })
      );

      await Promise.all(promises);
      
      // レート制限を避けるため少し待機
      if (i + batchSize < notifications.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    logger.info('Bulk notifications completed', {
      totalNotifications: notifications.length,
      batchSize
    });
  }

  /**
   * ユーザー通知設定の管理
   */
  async setupUserNotifications(
    userId: string,
    email?: string,
    phoneNumber?: string,
    deviceTokens?: string[],
    webhookUrl?: string,
    preferences?: Partial<UserNotificationPreferences>
  ): Promise<void> {
    try {
      const userPreferences: Partial<UserNotificationPreferences> = {
        ...this.config.defaultPreferences,
        ...preferences,
        userId
      };

      // メール設定
      if (email && this.config.enableEmail) {
        userPreferences.email = {
          enabled: true,
          address: email,
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'risk'],
          ...preferences?.email
        };
      }

      // プッシュ通知設定
      if (deviceTokens?.length && this.config.enablePush) {
        userPreferences.push = {
          enabled: true,
          deviceTokens,
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'risk'],
          ...preferences?.push
        };
      }

      // SMS設定
      if (phoneNumber && this.config.enableSMS) {
        userPreferences.sms = {
          enabled: true,
          phoneNumber,
          frequency: 'critical_only',
          alertTypes: ['price_above', 'price_below'],
          ...preferences?.sms
        };
      }

      // Webhook設定
      if (webhookUrl && this.config.enableWebhook) {
        userPreferences.webhook = {
          enabled: true,
          url: webhookUrl,
          secret: crypto.randomUUID(),
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'volume', 'risk'],
          ...preferences?.webhook
        };
      }

      // アプリ内通知設定（デフォルトで有効）
      if (this.config.enableInApp) {
        userPreferences.inApp = {
          enabled: true,
          frequency: 'immediate',
          alertTypes: ['price_above', 'price_below', 'technical', 'volume', 'risk'],
          ...preferences?.inApp
        };
      }

      await this.notificationService.updateUserPreferences(userId, userPreferences);

      logger.info('User notification setup completed', {
        userId,
        hasEmail: !!email,
        hasPhone: !!phoneNumber,
        hasDeviceTokens: !!deviceTokens?.length,
        hasWebhook: !!webhookUrl
      });

    } catch (error) {
      logger.error('Error setting up user notifications', {
        userId,
        wsError: error
      });
      throw error;
    }
  }

  /**
   * 通知設定の更新
   */
  async updateUserPreferences(
    userId: string, 
    preferences: Partial<UserNotificationPreferences>
  ): Promise<void> {
    try {
      await this.notificationService.updateUserPreferences(userId, preferences);
      
      logger.info('User notification preferences updated', {
        userId,
        updatedFields: Object.keys(preferences)
      });

    } catch (error) {
      logger.error('Error updating user notification preferences', {
        userId,
        wsError: error
      });
      throw error;
    }
  }

  /**
   * 通知テスト送信
   */
  async sendTestNotification(
    userId: string,
    method: NotificationMethod,
    customMessage?: string
  ): Promise<boolean> {
    try {
      const testAlert: TriggeredAlert = {
        id: `test_${Date.now()}`,
        alertConditionId: 'test',
        userId,
        type: 'PRICE_ABOVE' as any,
        severity: 'info',
        triggeredAt: new Date(),
        currentValue: 50000,
        title: 'Test Notification',
        message: customMessage || 'This is a test notification to verify your settings are working correctly.',
        details: {
          symbol: 'BTC',
          testNotification: true,
          sentAt: new Date().toISOString()
        },
        acknowledged: false,
        notificationsSent: []
      };

      const testCondition: AlertCondition = {
        id: 'test',
        userId,
        name: 'Test Alert',
        type: 'PRICE_ABOVE' as any,
        severity: 'info',
        status: 'active' as any,
        symbol: 'BTC',
        conditions: { targetPrice: 50000 },
        notificationMethods: [method],
        cooldownPeriod: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        triggerCount: 0
      };

      const results = await this.notificationService.sendAlertNotification(testAlert, testCondition);
      const success = results.some(r => r.success);

      logger.info('Test notification sent', {
        userId,
        method,
        success
      });

      return success;

    } catch (error) {
      logger.error('Error sending test notification', {
        userId,
        method,
        wsError: error
      });
      return false;
    }
  }

  /**
   * 通知統計の取得
   */
  getNotificationMetrics() {
    return this.notificationService.getMetrics();
  }

  /**
   * プライベートヘルパーメソッド
   */
  private getEnabledNotificationMethods(requestedMethods: NotificationMethod[]): NotificationMethod[] {
    return requestedMethods.filter(method => {
      switch (method) {
        case NotificationMethod.EMAIL:
          return this.config.enableEmail;
        case NotificationMethod.PUSH:
          return this.config.enablePush;
        case NotificationMethod.SMS:
          return this.config.enableSMS;
        case NotificationMethod.WEBHOOK:
          return this.config.enableWebhook;
        case NotificationMethod.IN_APP:
          return this.config.enableInApp;
        default:
          return false;
      }
    });
  }

  private async sendFallbackNotification(alert: TriggeredAlert, condition: AlertCondition): Promise<void> {
    if (this.config.fallbackMethods.length === 0) return;

    try {
      const fallbackCondition = {
        ...condition,
        notificationMethods: this.getEnabledNotificationMethods(this.config.fallbackMethods)
      };

      if (fallbackCondition.notificationMethods.length > 0) {
        await this.notificationService.sendAlertNotification(alert, fallbackCondition);
        
        logger.info('Fallback notification sent', {
          alertId: alert.id,
          userId: condition.userId,
          methods: fallbackCondition.notificationMethods
        });
      }

    } catch (error) {
      logger.error('Fallback notification also failed', {
        alertId: alert.id,
        userId: condition.userId,
        wsError: error
      });
    }
  }

  /**
   * クリーンアップ
   */
  cleanup(): void {
    this.notificationService.cleanup();
    logger.debug('Notification manager cleanup completed');
  }
}