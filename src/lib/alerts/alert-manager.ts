// 🚨 包括的アラート管理システム
// 全てのアラートタイプの統合管理と高度な通知機能

import { 
  AlertCondition, 
  TriggeredAlert, 
  AlertType, 
  AlertStatus, 
  AlertStatistics,
  AlertEngineConfig,
  NotificationMethod,
  NotificationStatus
} from './types';
import { PriceAlertEngine, PriceData } from './price-alert-engine';
import { TechnicalAlertEngine, TechnicalIndicatorData } from './technical-alert-engine';
import { VolumeAlertEngine, VolumeData } from './volume-alert-engine';
import { RiskAlertEngine, RiskData } from './risk-alert-engine';
import { NotificationManager } from '@/lib/notifications/notification-manager';
import { logger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/server';

export interface AlertManagerConfig extends AlertEngineConfig {
  enableRealtime: boolean;
  enableBatching: boolean;
  batchInterval: number; // ミリ秒
  enablePriceAlerts: boolean;
  enableTechnicalAlerts: boolean;
  enableVolumeAlerts: boolean;
  enableRiskAlerts: boolean;
  enableDeFiAlerts: boolean;
}

export class AlertManager {
  private priceEngine: PriceAlertEngine;
  private technicalEngine: TechnicalAlertEngine;
  private volumeEngine: VolumeAlertEngine;
  private riskEngine: RiskAlertEngine;
  private notificationManager: NotificationManager | null = null;
  private activeAlerts: Map<string, AlertCondition> = new Map();
  private recentTriggers: Map<string, Date> = new Map();
  private processingQueue: TriggeredAlert[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private isProcessing = false;

  constructor(
    private readonly config: AlertManagerConfig = {
      maxAlertsPerUser: 50,
      maxTriggersPerHour: 100,
      defaultCooldownPeriod: 15,
      dataRefreshInterval: 60,
      notificationRetryAttempts: 3,
      batchSize: 20,
      parallelProcessing: true,
      cacheEnabled: true,
      spamPrevention: true,
      duplicateDetection: true,
      noiseReduction: true,
      enableRealtime: true,
      enableBatching: true,
      batchInterval: 30000, // 30秒
      enablePriceAlerts: true,
      enableTechnicalAlerts: true,
      enableVolumeAlerts: true,
      enableRiskAlerts: true,
      enableDeFiAlerts: true
    }
  ) {
    this.priceEngine = new PriceAlertEngine({
      defaultCooldownPeriod: config.defaultCooldownPeriod,
      maxPriceHistory: 100,
      priceValidityPeriod: 5
    });

    this.technicalEngine = new TechnicalAlertEngine({
      maxHistorySize: 200,
      calculationInterval: config.dataRefreshInterval,
      smoothingFactor: 0.1
    });

    this.volumeEngine = new VolumeAlertEngine({
      spikeThreshold: 3.0,
      dropThreshold: 0.3,
      abnormalZScore: 2.5,
      minDataPoints: 50,
      updateInterval: config.dataRefreshInterval
    });

    this.riskEngine = new RiskAlertEngine({
      confidenceLevels: [0.95, 0.99],
      lookbackPeriods: [30, 90, 252],
      rebalanceFrequency: 30,
      riskFreeRate: 0.02,
      updateInterval: config.dataRefreshInterval
    });

    this.initializeBatchProcessing();
  }

  /**
   * 通知マネージャーを設定
   */
  setNotificationManager(notificationManager: NotificationManager): void {
    this.notificationManager = notificationManager;
    logger.info('Notification manager configured for alert system');
  }

  /**
   * アラートシステムを初期化
   */
  async initialize(): Promise<void> {
    try {
      // データベースからアクティブなアラートを読み込み
      await this.loadActiveAlerts();
      
      // バッチ処理を開始
      if (this.config.enableBatching) {
        this.startBatchProcessing();
      }

      logger.info('Alert Manager initialized', {
        activeAlerts: this.activeAlerts.size,
        enabledFeatures: {
          realtime: this.config.enableRealtime,
          batching: this.config.enableBatching,
          priceAlerts: this.config.enablePriceAlerts,
          technicalAlerts: this.config.enableTechnicalAlerts
        }
      });
    } catch (error) {
      logger.error('Failed to initialize Alert Manager', {
        wsError: error
      });
      throw error;
    }
  }

  /**
   * 新しいアラートを作成
   */
  async createAlert(alert: Omit<AlertCondition, 'id' | 'createdAt' | 'updatedAt' | 'triggerCount'>): Promise<AlertCondition> {
    try {
      // ユーザーのアラート数制限チェック
      const userAlertCount = Array.from(this.activeAlerts.values())
        .filter(a => a.userId === alert.userId).length;
      
      if (userAlertCount >= this.config.maxAlertsPerUser) {
        throw new Error(`User has reached maximum alert limit of ${this.config.maxAlertsPerUser}`);
      }

      // アラート条件の検証
      this.validateAlertCondition(alert);

      const newAlert: AlertCondition = {
        ...alert,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        triggerCount: 0
      };

      // データベースに保存
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from('alert_conditions')
        .insert([{
          id: newAlert.id,
          user_id: newAlert.userId,
          name: newAlert.name,
          description: newAlert.description,
          type: newAlert.type,
          severity: newAlert.severity,
          status: newAlert.status,
          symbol: newAlert.symbol,
          exchange: newAlert.exchange,
          conditions: newAlert.conditions,
          notification_methods: newAlert.notificationMethods,
          cooldown_period: newAlert.cooldownPeriod,
          expires_at: newAlert.expiresAt,
          timeframe: newAlert.timeframe,
          markets: newAlert.markets
        }]);

      if (dbError) {
        throw new Error(`Failed to save alert: ${dbError.message}`);
      }

      // メモリに追加
      this.activeAlerts.set(newAlert.id, newAlert);

      logger.info('Alert created', {
        alertId: newAlert.id,
        userId: newAlert.userId,
        type: newAlert.type,
        symbol: newAlert.symbol
      });

      return newAlert;
    } catch (error) {
      logger.error('Failed to create alert', {
        userId: alert.userId,
        type: alert.type,
        symbol: alert.symbol,
        wsError: error
      });
      throw error;
    }
  }

  /**
   * アラートを更新
   */
  async updateAlert(alertId: string, updates: Partial<AlertCondition>): Promise<AlertCondition> {
    const existingAlert = this.activeAlerts.get(alertId);
    if (!existingAlert) {
      throw new Error('Alert not found');
    }

    const updatedAlert: AlertCondition = {
      ...existingAlert,
      ...updates,
      id: alertId, // IDは変更不可
      updatedAt: new Date()
    };

    // 条件が変更された場合は検証
    if (updates.conditions) {
      this.validateAlertCondition(updatedAlert);
    }

    // データベースを更新
    const supabase = createClient();
    const { error: dbError } = await supabase
      .from('alert_conditions')
      .update({
        name: updatedAlert.name,
        description: updatedAlert.description,
        type: updatedAlert.type,
        severity: updatedAlert.severity,
        status: updatedAlert.status,
        symbol: updatedAlert.symbol,
        exchange: updatedAlert.exchange,
        conditions: updatedAlert.conditions,
        notification_methods: updatedAlert.notificationMethods,
        cooldown_period: updatedAlert.cooldownPeriod,
        expires_at: updatedAlert.expiresAt,
        timeframe: updatedAlert.timeframe,
        markets: updatedAlert.markets,
        updated_at: updatedAlert.updatedAt
      })
      .eq('id', alertId);

    if (dbError) {
      throw new Error(`Failed to update alert: ${dbError.message}`);
    }

    // メモリを更新
    this.activeAlerts.set(alertId, updatedAlert);

    logger.info('Alert updated', {
      alertId,
      updates: Object.keys(updates)
    });

    return updatedAlert;
  }

  /**
   * アラートを削除
   */
  async deleteAlert(alertId: string): Promise<void> {
    const alert = this.activeAlerts.get(alertId);
    if (!alert) {
      throw new Error('Alert not found');
    }

    // データベースから削除
    const supabase = createClient();
    const { error: dbError } = await supabase
      .from('alert_conditions')
      .delete()
      .eq('id', alertId);

    if (dbError) {
      throw new Error(`Failed to delete alert: ${dbError.message}`);
    }

    // メモリから削除
    this.activeAlerts.delete(alertId);

    logger.info('Alert deleted', {
      alertId,
      userId: alert.userId,
      type: alert.type
    });
  }

  /**
   * 価格データを処理してアラートをチェック
   */
  async processPriceData(pricesData: PriceData[]): Promise<TriggeredAlert[]> {
    if (!this.config.enablePriceAlerts && !this.config.enableTechnicalAlerts) {
      return [];
    }

    const triggeredAlerts: TriggeredAlert[] = [];

    try {
      // 価格エンジンを更新
      if (this.config.enablePriceAlerts) {
        await this.priceEngine.updatePrices(pricesData);
      }

      // 各価格データに対してアラートをチェック
      for (const priceData of pricesData) {
        const symbolAlerts = Array.from(this.activeAlerts.values())
          .filter(alert => 
            alert.symbol.toUpperCase() === priceData.symbol.toUpperCase() &&
            alert.status === AlertStatus.ACTIVE &&
            this.isAlertTypeEnabled(alert.type)
          );

        for (const alert of symbolAlerts) {
          // クールダウン期間チェック
          if (this.isInCooldown(alert)) {
            continue;
          }

          let result = null;

          // アラートタイプに応じて処理
          if (this.isPriceAlert(alert.type) && this.config.enablePriceAlerts) {
            result = await this.priceEngine.checkPriceAlert(alert, priceData);
          }

          if (result && result.triggered && result.alert) {
            // 重複検出
            if (this.config.duplicateDetection && this.isDuplicate(result.alert)) {
              continue;
            }

            // スパム防止
            if (this.config.spamPrevention && this.isSpam(alert)) {
              continue;
            }

            triggeredAlerts.push(result.alert);
            this.recordTrigger(alert);

            // トリガー回数を更新
            alert.triggerCount++;
            alert.lastTriggered = new Date();
          }
        }
      }

      // 技術指標アラートのチェック
      if (this.config.enableTechnicalAlerts) {
        const technicalAlerts = Array.from(this.activeAlerts.values())
          .filter(alert => this.isTechnicalAlert(alert.type));
        
        const techTriggered = await this.technicalEngine.calculateAndCheckIndicators(pricesData, technicalAlerts);
        triggeredAlerts.push(...techTriggered);
      }

      // バッチ処理に追加またはリアルタイム処理
      if (this.config.enableBatching) {
        this.processingQueue.push(...triggeredAlerts);
      } else if (this.config.enableRealtime) {
        await this.processTriggeredAlerts(triggeredAlerts);
      }

      return triggeredAlerts;
    } catch (error) {
      logger.error('Error processing price data for alerts', {
        symbolsCount: pricesData.length,
        wsError: error
      });
      return [];
    }
  }

  /**
   * ボリュームデータを処理してアラートをチェック
   */
  async processVolumeData(volumeData: VolumeData[]): Promise<TriggeredAlert[]> {
    if (!this.config.enableVolumeAlerts) {
      return [];
    }

    const triggeredAlerts: TriggeredAlert[] = [];

    try {
      // ボリュームエンジンを更新
      await this.volumeEngine.updateVolumeData(volumeData);

      // 各ボリュームデータに対してアラートをチェック
      for (const data of volumeData) {
        const symbolAlerts = Array.from(this.activeAlerts.values())
          .filter(alert => 
            alert.symbol.toUpperCase() === data.symbol.toUpperCase() &&
            alert.status === AlertStatus.ACTIVE &&
            this.isVolumeAlert(alert.type)
          );

        for (const alert of symbolAlerts) {
          // クールダウン期間チェック
          if (this.isInCooldown(alert)) {
            continue;
          }

          const result = await this.volumeEngine.checkVolumeAlert(alert, data);
          
          if (result && result.triggered && result.alert) {
            // 重複検出
            if (this.config.duplicateDetection && this.isDuplicate(result.alert)) {
              continue;
            }

            // スパム防止
            if (this.config.spamPrevention && this.isSpam(alert)) {
              continue;
            }

            triggeredAlerts.push(result.alert);
            this.recordTrigger(alert);

            // トリガー回数を更新
            alert.triggerCount++;
            alert.lastTriggered = new Date();
          }
        }
      }

      // バッチ処理に追加またはリアルタイム処理
      if (this.config.enableBatching) {
        this.processingQueue.push(...triggeredAlerts);
      } else if (this.config.enableRealtime) {
        await this.processTriggeredAlerts(triggeredAlerts);
      }

      return triggeredAlerts;
    } catch (error) {
      logger.error('Error processing volume data for alerts', {
        symbolsCount: volumeData.length,
        wsError: error
      });
      return [];
    }
  }

  /**
   * リスクデータを処理してアラートをチェック
   */
  async processRiskData(riskData: RiskData[], benchmarkData?: Map<string, number>): Promise<TriggeredAlert[]> {
    if (!this.config.enableRiskAlerts) {
      return [];
    }

    const triggeredAlerts: TriggeredAlert[] = [];

    try {
      // リスクエンジンを更新
      await this.riskEngine.updateRiskData(riskData, benchmarkData);

      // 各リスクデータに対してアラートをチェック
      for (const data of riskData) {
        const symbolAlerts = Array.from(this.activeAlerts.values())
          .filter(alert => 
            alert.symbol.toUpperCase() === data.symbol.toUpperCase() &&
            alert.status === AlertStatus.ACTIVE &&
            this.isRiskAlert(alert.type)
          );

        for (const alert of symbolAlerts) {
          // クールダウン期間チェック
          if (this.isInCooldown(alert)) {
            continue;
          }

          const result = await this.riskEngine.checkRiskAlert(alert, data);
          
          if (result && result.triggered && result.alert) {
            // 重複検出
            if (this.config.duplicateDetection && this.isDuplicate(result.alert)) {
              continue;
            }

            // スパム防止
            if (this.config.spamPrevention && this.isSpam(alert)) {
              continue;
            }

            triggeredAlerts.push(result.alert);
            this.recordTrigger(alert);

            // トリガー回数を更新
            alert.triggerCount++;
            alert.lastTriggered = new Date();
          }
        }
      }

      // バッチ処理に追加またはリアルタイム処理
      if (this.config.enableBatching) {
        this.processingQueue.push(...triggeredAlerts);
      } else if (this.config.enableRealtime) {
        await this.processTriggeredAlerts(triggeredAlerts);
      }

      return triggeredAlerts;
    } catch (error) {
      logger.error('Error processing risk data for alerts', {
        symbolsCount: riskData.length,
        wsError: error
      });
      return [];
    }
  }

  /**
   * トリガーされたアラートを処理
   */
  private async processTriggeredAlerts(alerts: TriggeredAlert[]): Promise<void> {
    if (alerts.length === 0) return;

    try {
      // データベースに保存
      await this.saveTriggeredAlerts(alerts);

      // 通知送信
      await this.sendNotifications(alerts);

      logger.info('Triggered alerts processed', {
        alertsCount: alerts.length
      });
    } catch (error) {
      logger.error('Error processing triggered alerts', {
        alertsCount: alerts.length,
        wsError: error
      });
    }
  }

  /**
   * トリガーされたアラートをデータベースに保存
   */
  private async saveTriggeredAlerts(alerts: TriggeredAlert[]): Promise<void> {
    const supabase = createClient();
    
    const records = alerts.map(alert => ({
      id: alert.id,
      alert_condition_id: alert.alertConditionId,
      user_id: alert.userId,
      type: alert.type,
      severity: alert.severity,
      triggered_at: alert.triggeredAt,
      triggered_price: alert.triggeredPrice,
      current_value: alert.currentValue,
      previous_value: alert.previousValue,
      change_percent: alert.changePercent,
      title: alert.title,
      message: alert.message,
      details: alert.details,
      acknowledged: alert.acknowledged
    }));

    const { error } = await supabase
      .from('triggered_alerts')
      .insert(records);

    if (error) {
      throw new Error(`Failed to save triggered alerts: ${error.message}`);
    }
  }

  /**
   * 通知を送信
   */
  private async sendNotifications(alerts: TriggeredAlert[]): Promise<void> {
    if (!this.notificationManager) {
      logger.warn('Notification manager not configured, skipping notifications');
      return;
    }

    const notificationPromises = alerts.map(alert => this.sendAlertNotifications(alert));
    await Promise.all(notificationPromises);
  }

  /**
   * 個別アラートの通知を送信
   */
  private async sendAlertNotifications(alert: TriggeredAlert): Promise<void> {
    const alertCondition = this.activeAlerts.get(alert.alertConditionId);
    if (!alertCondition || !this.notificationManager) return;

    try {
      // 通知マネージャーを使用してアラートを送信
      await this.notificationManager.sendAlert(alert, alertCondition);

      // 成功した通知ステータスを記録
      for (const method of alertCondition.notificationMethods) {
        alert.notificationsSent.push({
          method,
          sentAt: new Date(),
          success: true,
          retryCount: 0
        });
      }

      logger.debug('Alert notifications sent successfully', {
        alertId: alert.id,
        userId: alertCondition.userId,
        methods: alertCondition.notificationMethods
      });

    } catch (error) {
      // 失敗した通知ステータスを記録
      for (const method of alertCondition.notificationMethods) {
        alert.notificationsSent.push({
          method,
          sentAt: new Date(),
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          retryCount: 0
        });
      }

      logger.error('Failed to send alert notifications', {
        alertId: alert.id,
        userId: alertCondition.userId,
        wsError: error
      });
    }
  }

  /**
   * バッチ処理を初期化
   */
  private initializeBatchProcessing(): void {
    if (!this.config.enableBatching) return;

    this.batchTimer = setInterval(() => {
      this.processBatch();
    }, this.config.batchInterval);
  }

  /**
   * バッチ処理を実行
   */
  private async processBatch(): Promise<void> {
    if (this.isProcessing || this.processingQueue.length === 0) return;

    this.isProcessing = true;
    const batch = this.processingQueue.splice(0, this.config.batchSize);

    try {
      await this.processTriggeredAlerts(batch);
    } catch (error) {
      logger.error('Batch processing failed', {
        batchSize: batch.length,
        wsError: error
      });
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * バッチ処理を開始
   */
  private startBatchProcessing(): void {
    if (this.batchTimer) return;
    
    this.batchTimer = setInterval(() => {
      this.processBatch();
    }, this.config.batchInterval);

    logger.info('Batch processing started', {
      interval: this.config.batchInterval,
      batchSize: this.config.batchSize
    });
  }

  /**
   * バッチ処理を停止
   */
  stopBatchProcessing(): void {
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }
  }

  /**
   * アクティブなアラートをデータベースから読み込み
   */
  private async loadActiveAlerts(): Promise<void> {
    const supabase = createClient();
    
    const { data: alerts, error } = await supabase
      .from('alert_conditions')
      .select('*')
      .eq('status', AlertStatus.ACTIVE);

    if (error) {
      throw new Error(`Failed to load active alerts: ${error.message}`);
    }

    if (alerts) {
      this.activeAlerts.clear();
      
      for (const alert of alerts) {
        const alertCondition: AlertCondition = {
          id: alert.id,
          userId: alert.user_id,
          name: alert.name,
          description: alert.description,
          type: alert.type as AlertType,
          severity: alert.severity,
          status: alert.status as AlertStatus,
          symbol: alert.symbol,
          exchange: alert.exchange,
          conditions: alert.conditions,
          notificationMethods: alert.notification_methods,
          cooldownPeriod: alert.cooldown_period,
          createdAt: new Date(alert.created_at),
          updatedAt: new Date(alert.updated_at),
          lastTriggered: alert.last_triggered ? new Date(alert.last_triggered) : undefined,
          triggerCount: alert.trigger_count || 0,
          expiresAt: alert.expires_at ? new Date(alert.expires_at) : undefined,
          timeframe: alert.timeframe,
          markets: alert.markets
        };

        this.activeAlerts.set(alertCondition.id, alertCondition);
      }
    }
  }

  /**
   * アラート条件を検証
   */
  private validateAlertCondition(alert: Partial<AlertCondition>): void {
    if (!alert.type) {
      throw new Error('Alert type is required');
    }

    if (!alert.symbol) {
      throw new Error('Symbol is required');
    }

    if (!alert.conditions) {
      throw new Error('Alert conditions are required');
    }

    if (!alert.notificationMethods || alert.notificationMethods.length === 0) {
      throw new Error('At least one notification method is required');
    }

    // タイプ固有の検証
    switch (alert.type) {
      case AlertType.PRICE_ABOVE:
      case AlertType.PRICE_BELOW:
        // 価格アラートの検証ロジック
        break;
      case AlertType.RSI_OVERBOUGHT:
      case AlertType.RSI_OVERSOLD:
        // RSIアラートの検証ロジック
        break;
      // 他のタイプも同様に...
    }
  }


  /**
   * ヘルパーメソッド
   */
  private isAlertTypeEnabled(type: AlertType): boolean {
    switch (type) {
      case AlertType.PRICE_ABOVE:
      case AlertType.PRICE_BELOW:
      case AlertType.PRICE_CHANGE:
      case AlertType.PRICE_BREAKOUT:
        return this.config.enablePriceAlerts;
      case AlertType.RSI_OVERBOUGHT:
      case AlertType.RSI_OVERSOLD:
      case AlertType.MACD_CROSSOVER:
      case AlertType.BOLLINGER_BREAKOUT:
      case AlertType.MA_CROSSOVER:
        return this.config.enableTechnicalAlerts;
      case AlertType.VOLUME_SPIKE:
      case AlertType.VOLUME_DROP:
      case AlertType.VOLUME_ABNORMAL:
        return this.config.enableVolumeAlerts;
      default:
        return true;
    }
  }

  private isPriceAlert(type: AlertType): boolean {
    return [
      AlertType.PRICE_ABOVE,
      AlertType.PRICE_BELOW,
      AlertType.PRICE_CHANGE,
      AlertType.PRICE_BREAKOUT
    ].includes(type);
  }

  private isTechnicalAlert(type: AlertType): boolean {
    return [
      AlertType.RSI_OVERBOUGHT,
      AlertType.RSI_OVERSOLD,
      AlertType.MACD_CROSSOVER,
      AlertType.BOLLINGER_BREAKOUT,
      AlertType.MA_CROSSOVER
    ].includes(type);
  }

  private isVolumeAlert(type: AlertType): boolean {
    return [
      AlertType.VOLUME_SPIKE,
      AlertType.VOLUME_DROP,
      AlertType.VOLUME_ABNORMAL
    ].includes(type);
  }

  private isRiskAlert(type: AlertType): boolean {
    return [
      AlertType.VAR_EXCEEDED,
      AlertType.SHARPE_DECLINE,
      AlertType.CORRELATION_BREAKDOWN,
      AlertType.BETA_SHIFT,
      AlertType.DRAWDOWN_ALERT
    ].includes(type);
  }

  private isInCooldown(alert: AlertCondition): boolean {
    if (!alert.lastTriggered) return false;
    
    const cooldownMs = alert.cooldownPeriod * 60 * 1000;
    const timeSinceLastTrigger = Date.now() - alert.lastTriggered.getTime();
    
    return timeSinceLastTrigger < cooldownMs;
  }

  private isDuplicate(alert: TriggeredAlert): boolean {
    // 重複検出ロジック（シンプルな実装）
    const key = `${alert.alertConditionId}-${alert.type}-${alert.currentValue}`;
    const recentTrigger = this.recentTriggers.get(key);
    
    if (recentTrigger && Date.now() - recentTrigger.getTime() < 60000) { // 1分以内
      return true;
    }
    
    this.recentTriggers.set(key, new Date());
    return false;
  }

  private isSpam(alert: AlertCondition): boolean {
    // スパム検出ロジック
    return alert.triggerCount > this.config.maxTriggersPerHour;
  }

  private recordTrigger(alert: AlertCondition): void {
    const key = `${alert.id}-${Date.now()}`;
    this.recentTriggers.set(key, new Date());
  }

  /**
   * システムの統計情報を取得
   */
  async getStatistics(): Promise<AlertStatistics> {
    const supabase = createClient();
    
    // 統計データの集計
    const { data: totalAlerts } = await supabase
      .from('alert_conditions')
      .select('*', { count: 'exact' });

    const { data: activeAlerts } = await supabase
      .from('alert_conditions')
      .select('*', { count: 'exact' })
      .eq('status', AlertStatus.ACTIVE);

    const { data: triggeredToday } = await supabase
      .from('triggered_alerts')
      .select('*', { count: 'exact' })
      .gte('triggered_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    return {
      totalAlerts: totalAlerts?.length || 0,
      activeAlerts: activeAlerts?.length || 0,
      triggeredToday: triggeredToday?.length || 0,
      triggeredThisWeek: 0, // TODO: 実装
      triggeredThisMonth: 0, // TODO: 実装
      byType: {} as any, // TODO: 実装
      bySeverity: {} as any, // TODO: 実装
      averageResponseTime: 0, // TODO: 実装
      falsePositiveRate: 0, // TODO: 実装
      acknowledgeRate: 0 // TODO: 実装
    };
  }

  /**
   * クリーンアップ処理
   */
  async cleanup(): Promise<void> {
    this.stopBatchProcessing();
    
    // キャッシュクリーンアップ
    this.priceEngine.cleanupPriceHistory();
    this.technicalEngine.cleanupCache();
    this.volumeEngine.cleanup();
    this.riskEngine.cleanup();
    
    // 通知マネージャーのクリーンアップ
    if (this.notificationManager) {
      this.notificationManager.cleanup();
    }
    
    // 古いトリガー記録を削除
    const now = Date.now();
    for (const [key, timestamp] of this.recentTriggers.entries()) {
      if (now - timestamp.getTime() > 60 * 60 * 1000) { // 1時間以上古い
        this.recentTriggers.delete(key);
      }
    }

    logger.info('Alert Manager cleanup completed');
  }
}