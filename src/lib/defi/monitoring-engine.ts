// 🏦 DeFiダッシュボードエンジン
// プロトコルダッシュボード、TVL追跡、リスク分析、アラート生成の統合システム

import {
  DeFiProtocol,
  BlockchainNetwork,
  ProtocolInfo,
  TVLData,
  LiquidityPool,
  DeFiMarketOverview,
  DeFiRiskAssessment,
  DeFiAlertCondition,
  GovernanceInfo,
  GasInfo
} from './types';
import { DeFiProtocolConnector, DataFetchOptions } from './protocol-connector';
import { logger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/server';

export interface MonitoringConfig {
  updateInterval: number; // 秒
  enabledProtocols: DeFiProtocol[];
  enabledNetworks: BlockchainNetwork[];
  riskThresholds: {
    tvlDropPercent: number;
    liquidityDropPercent: number;
    gasSpike: number; // Gwei
    riskScoreThreshold: number;
  };
  alertingEnabled: boolean;
  dataRetentionDays: number;
}

export interface MonitoringMetrics {
  protocolsMonitored: number;
  totalTVL: number;
  alertsGenerated: number;
  dataPointsCollected: number;
  lastUpdateTime: Date;
  errorRate: number;
  averageResponseTime: number;
}

export class DeFiMonitoringEngine {
  private connector: DeFiProtocolConnector;
  private monitoringTimer: NodeJS.Timeout | null = null;
  private isRunning = false;
  private metrics: MonitoringMetrics;
  private protocolData: Map<string, ProtocolInfo> = new Map();
  private tvlHistory: Map<string, TVLData[]> = new Map();
  private riskAssessments: Map<string, DeFiRiskAssessment> = new Map();
  private alertConditions: Map<string, DeFiAlertCondition[]> = new Map();

  constructor(
    private readonly config: MonitoringConfig = {
      updateInterval: 300, // 5分
      enabledProtocols: [
        DeFiProtocol.UNISWAP_V3,
        DeFiProtocol.AAVE,
        DeFiProtocol.COMPOUND,
        DeFiProtocol.CURVE,
        DeFiProtocol.YEARN
      ],
      enabledNetworks: [
        BlockchainNetwork.ETHEREUM,
        BlockchainNetwork.POLYGON,
        BlockchainNetwork.ARBITRUM
      ],
      riskThresholds: {
        tvlDropPercent: 10,
        liquidityDropPercent: 15,
        gasSpike: 100,
        riskScoreThreshold: 30
      },
      alertingEnabled: true,
      dataRetentionDays: 30
    }
  ) {
    this.connector = new DeFiProtocolConnector();
    this.metrics = {
      protocolsMonitored: 0,
      totalTVL: 0,
      alertsGenerated: 0,
      dataPointsCollected: 0,
      lastUpdateTime: new Date(),
      errorRate: 0,
      averageResponseTime: 0
    };
  }

  /**
   * ダッシュボードシステムを開始
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('DeFi monitoring engine is already running');
      return;
    }

    try {
      this.isRunning = true;

      // 初期データ収集
      await this.performInitialDataCollection();

      // アラート条件を読み込み
      await this.loadAlertConditions();

      // 定期監視を開始
      this.startPeriodicMonitoring();

      logger.info('DeFi monitoring engine started', {
        updateInterval: this.config.updateInterval,
        protocolsEnabled: this.config.enabledProtocols.length,
        networksEnabled: this.config.enabledNetworks.length
      });
    } catch (error) {
      this.isRunning = false;
      logger.error('Failed to start DeFi monitoring engine', { wsError: error });
      throw error;
    }
  }

  /**
   * ダッシュボードシステムを停止
   */
  async stop(): Promise<void> {
    if (!this.isRunning) return;

    this.isRunning = false;

    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
      this.monitoringTimer = null;
    }

    // 最終データを保存
    await this.saveCurrentState();

    logger.info('DeFi monitoring engine stopped');
  }

  /**
   * 初期データ収集
   */
  private async performInitialDataCollection(): Promise<void> {
    const startTime = Date.now();
    let successCount = 0;
    let errorCount = 0;

    logger.info('Starting initial DeFi data collection');

    for (const protocol of this.config.enabledProtocols) {
      try {
        // プロトコル基本情報を取得
        const protocolInfo = await this.connector.getProtocolInfo(protocol);
        if (protocolInfo) {
          this.protocolData.set(protocolInfo.id, protocolInfo);
          successCount++;

          // TVLデータを取得
          for (const network of this.config.enabledNetworks) {
            const tvlData = await this.connector.getTVLData(protocol, { network });
            if (tvlData) {
              const key = `${protocol}_${network}`;
              if (!this.tvlHistory.has(key)) {
                this.tvlHistory.set(key, []);
              }
              this.tvlHistory.get(key)!.push(tvlData);
            }
          }

          // リスク評価を実行
          const riskAssessment = await this.assessProtocolRisk(protocolInfo);
          if (riskAssessment) {
            this.riskAssessments.set(protocolInfo.id, riskAssessment);
          }
        }
      } catch (error) {
        errorCount++;
        logger.error('Error collecting initial data for protocol', {
          protocol,
          wsError: error
        });
      }
    }

    const duration = Date.now() - startTime;
    this.metrics.protocolsMonitored = successCount;
    this.metrics.dataPointsCollected = successCount;
    this.metrics.errorRate = errorCount / (successCount + errorCount);
    this.metrics.averageResponseTime = duration / (successCount + errorCount);
    this.metrics.lastUpdateTime = new Date();

    logger.info('Initial DeFi data collection completed', {
      successCount,
      errorCount,
      duration: `${duration}ms`,
      errorRate: `${(this.metrics.errorRate * 100).toFixed(2)}%`
    });
  }

  /**
   * 定期監視を開始
   */
  private startPeriodicMonitoring(): void {
    this.monitoringTimer = setInterval(async () => {
      if (!this.isRunning) return;

      try {
        await this.performMonitoringCycle();
      } catch (error) {
        logger.error('Error in monitoring cycle', { wsError: error });
      }
    }, this.config.updateInterval * 1000);
  }

  /**
   * 監視サイクルを実行
   */
  private async performMonitoringCycle(): Promise<void> {
    const startTime = Date.now();
    const cycleMetrics = {
      protocolsUpdated: 0,
      alertsGenerated: 0,
      errors: 0
    };

    logger.debug('Starting DeFi monitoring cycle');

    // プロトコルデータの更新
    for (const protocol of this.config.enabledProtocols) {
      try {
        await this.updateProtocolData(protocol);
        cycleMetrics.protocolsUpdated++;
      } catch (error) {
        cycleMetrics.errors++;
        logger.error('Error updating protocol data', { protocol, wsError: error });
      }
    }

    // ガス価格の監視
    for (const network of this.config.enabledNetworks) {
      try {
        await this.monitorGasPrices(network);
      } catch (error) {
        logger.error('Error monitoring gas prices', { network, wsError: error });
      }
    }

    // アラート条件のチェック
    if (this.config.alertingEnabled) {
      try {
        const alerts = await this.checkAlertConditions();
        cycleMetrics.alertsGenerated = alerts;
      } catch (error) {
        logger.error('Error checking alert conditions', { wsError: error });
      }
    }

    // リスク評価の更新
    try {
      await this.updateRiskAssessments();
    } catch (error) {
      logger.error('Error updating risk assessments', { wsError: error });
    }

    // データのクリーンアップ
    await this.cleanupOldData();

    // メトリクスの更新
    const duration = Date.now() - startTime;
    this.metrics.dataPointsCollected += cycleMetrics.protocolsUpdated;
    this.metrics.alertsGenerated += cycleMetrics.alertsGenerated;
    this.metrics.errorRate = cycleMetrics.errors / Math.max(cycleMetrics.protocolsUpdated, 1);
    this.metrics.averageResponseTime = duration / Math.max(cycleMetrics.protocolsUpdated, 1);
    this.metrics.lastUpdateTime = new Date();

    // 総TVLを計算
    this.metrics.totalTVL = Array.from(this.protocolData.values())
      .reduce((sum, protocol) => sum + protocol.tvl, 0);

    logger.debug('DeFi monitoring cycle completed', {
      ...cycleMetrics,
      duration: `${duration}ms`,
      totalTVL: this.metrics.totalTVL
    });
  }

  /**
   * プロトコルデータを更新
   */
  private async updateProtocolData(protocol: DeFiProtocol): Promise<void> {
    // プロトコル基本情報を更新
    const protocolInfo = await this.connector.getProtocolInfo(protocol, { forceRefresh: true });
    if (protocolInfo) {
      this.protocolData.set(protocolInfo.id, protocolInfo);
    }

    // 各ネットワークのTVLデータを更新
    for (const network of this.config.enabledNetworks) {
      const tvlData = await this.connector.getTVLData(protocol, { 
        network, 
        forceRefresh: true 
      });
      
      if (tvlData) {
        const key = `${protocol}_${network}`;
        if (!this.tvlHistory.has(key)) {
          this.tvlHistory.set(key, []);
        }
        
        const history = this.tvlHistory.get(key)!;
        history.push(tvlData);
        
        // 履歴サイズを制限（最大1000エントリ）
        if (history.length > 1000) {
          history.splice(0, history.length - 1000);
        }
      }
    }
  }

  /**
   * ガス価格を監視
   */
  private async monitorGasPrices(network: BlockchainNetwork): Promise<void> {
    const gasInfo = await this.connector.getGasInfo(network, { forceRefresh: true });
    
    if (gasInfo && gasInfo.gasPrice > this.config.riskThresholds.gasSpike) {
      // ガススパイクアラートを生成
      await this.generateGasSpikeAlert(network, gasInfo);
    }
  }

  /**
   * アラート条件をチェック
   */
  private async checkAlertConditions(): Promise<number> {
    let alertCount = 0;

    for (const [userId, conditions] of this.alertConditions) {
      for (const condition of conditions) {
        if (!condition.enabled) continue;

        try {
          const shouldTrigger = await this.evaluateAlertCondition(condition);
          if (shouldTrigger) {
            await this.triggerAlert(condition);
            alertCount++;
          }
        } catch (error) {
          logger.error('Error evaluating alert condition', {
            alertId: condition.id,
            userId,
            wsError: error
          });
        }
      }
    }

    return alertCount;
  }

  /**
   * アラート条件を評価
   */
  private async evaluateAlertCondition(condition: DeFiAlertCondition): Promise<boolean> {
    // クールダウンペリオドをチェック
    if (condition.lastTriggered) {
      const timeSinceLastTrigger = Date.now() - condition.lastTriggered.getTime();
      const cooldownMs = 60 * 60 * 1000; // 1時間のクールダウン
      if (timeSinceLastTrigger < cooldownMs) {
        return false;
      }
    }

    switch (condition.type) {
      case 'tvl_change':
        return this.checkTVLChangeCondition(condition);
      case 'liquidity_drop':
        return this.checkLiquidityDropCondition(condition);
      case 'risk_increase':
        return this.checkRiskIncreaseCondition(condition);
      case 'gas_spike':
        return this.checkGasSpikeCondition(condition);
      case 'governance_proposal':
        return this.checkGovernanceProposalCondition(condition);
      default:
        return false;
    }
  }

  /**
   * TVL変動アラートをチェック
   */
  private checkTVLChangeCondition(condition: DeFiAlertCondition): boolean {
    if (!condition.protocolId || !condition.thresholds.tvlChangePercent) return false;

    const protocolData = this.protocolData.get(condition.protocolId);
    if (!protocolData) return false;

    const key = `${protocolData.protocol}_${condition.network || BlockchainNetwork.ETHEREUM}`;
    const tvlHistory = this.tvlHistory.get(key);
    
    if (!tvlHistory || tvlHistory.length < 2) return false;

    const current = tvlHistory[tvlHistory.length - 1];
    const previous = tvlHistory[tvlHistory.length - 2];
    
    const changePercent = ((current.totalTVL - previous.totalTVL) / previous.totalTVL) * 100;
    
    return Math.abs(changePercent) >= condition.thresholds.tvlChangePercent;
  }

  /**
   * 流動性減少アラートをチェック
   */
  private checkLiquidityDropCondition(condition: DeFiAlertCondition): boolean {
    // 流動性プールデータを使用して判定
    // 実装の詳細は省略
    return false;
  }

  /**
   * リスク増加アラートをチェック
   */
  private checkRiskIncreaseCondition(condition: DeFiAlertCondition): boolean {
    if (!condition.protocolId || !condition.thresholds.riskScoreIncrease) return false;

    const riskAssessment = this.riskAssessments.get(condition.protocolId);
    if (!riskAssessment) return false;

    const baselineScore = 70; // ベースラインリスクスコア
    const currentScore = riskAssessment.overallScore;
    
    return (baselineScore - currentScore) >= condition.thresholds.riskScoreIncrease;
  }

  /**
   * ガススパイクアラートをチェック
   */
  private checkGasSpikeCondition(condition: DeFiAlertCondition): boolean {
    // ガス価格データを使用して判定（既に monitorGasPrices で実装済み）
    return false;
  }

  /**
   * ガバナンス提案アラートをチェック
   */
  private checkGovernanceProposalCondition(condition: DeFiAlertCondition): boolean {
    // ガバナンス提案データを使用して判定
    // 実装の詳細は省略
    return false;
  }

  /**
   * アラートをトリガー
   */
  private async triggerAlert(condition: DeFiAlertCondition): Promise<void> {
    try {
      // データベースにアラートを保存
      const supabase = createClient();
      await supabase.from('defi_alerts').insert({
        condition_id: condition.id,
        user_id: condition.userId,
        protocol_id: condition.protocolId,
        network: condition.network,
        type: condition.type,
        triggered_at: new Date(),
        details: {
          thresholds: condition.thresholds,
          currentValues: {
            // 現在の値を記録
          }
        }
      });

      // 通知を送信
      if (condition.notifications.email) {
        await this.sendEmailNotification(condition);
      }
      if (condition.notifications.push) {
        await this.sendPushNotification(condition);
      }
      if (condition.notifications.webhook) {
        await this.sendWebhookNotification(condition);
      }

      // アラート条件を更新
      condition.lastTriggered = new Date();
      condition.triggerCount++;

      logger.info('DeFi alert triggered', {
        alertId: condition.id,
        type: condition.type,
        userId: condition.userId,
        protocolId: condition.protocolId
      });
    } catch (error) {
      logger.error('Error triggering DeFi alert', {
        alertId: condition.id,
        wsError: error
      });
    }
  }

  /**
   * ガススパイクアラートを生成
   */
  private async generateGasSpikeAlert(network: BlockchainNetwork, gasInfo: GasInfo): Promise<void> {
    logger.warn('Gas spike detected', {
      network,
      gasPrice: gasInfo.gasPrice,
      threshold: this.config.riskThresholds.gasSpike
    });

    // システムアラートとして記録
    const supabase = createClient();
    await supabase.from('system_alerts').insert({
      type: 'gas_spike',
      network,
      severity: 'warning',
      details: {
        gasPrice: gasInfo.gasPrice,
        threshold: this.config.riskThresholds.gasSpike,
        networkCongestion: gasInfo.networkCongestion
      },
      created_at: new Date()
    });
  }

  /**
   * リスク評価を更新
   */
  private async updateRiskAssessments(): Promise<void> {
    for (const [protocolId, protocolInfo] of this.protocolData) {
      try {
        const riskAssessment = await this.assessProtocolRisk(protocolInfo);
        if (riskAssessment) {
          this.riskAssessments.set(protocolId, riskAssessment);
        }
      } catch (error) {
        logger.error('Error updating risk assessment', {
          protocolId,
          wsError: error
        });
      }
    }
  }

  /**
   * プロトコルリスク評価
   */
  private async assessProtocolRisk(protocolInfo: ProtocolInfo): Promise<DeFiRiskAssessment> {
    // 基本的なリスク評価実装
    const overallScore = protocolInfo.riskScore;
    const riskLevel = this.categorizeRiskLevel(overallScore);

    return {
      protocolId: protocolInfo.id,
      protocol: protocolInfo.protocol,
      overallScore,
      riskLevel,
      smartContractRisk: {
        score: overallScore,
        level: riskLevel,
        weight: 0.3,
        factors: ['audit_history', 'code_complexity', 'upgrade_mechanism'],
        mitigation: ['formal_verification', 'time_locks', 'multi_sig']
      },
      liquidityRisk: {
        score: Math.max(0, overallScore - 10),
        level: this.categorizeRiskLevel(Math.max(0, overallScore - 10)),
        weight: 0.25,
        factors: ['tvl_concentration', 'liquidity_depth', 'withdrawal_limits'],
        mitigation: ['diversification', 'emergency_pause', 'gradual_withdrawal']
      },
      marketRisk: {
        score: Math.max(0, overallScore - 5),
        level: this.categorizeRiskLevel(Math.max(0, overallScore - 5)),
        weight: 0.2,
        factors: ['market_volatility', 'correlation_risk', 'external_dependencies'],
        mitigation: ['hedging', 'risk_limits', 'monitoring']
      },
      governanceRisk: {
        score: overallScore,
        level: riskLevel,
        weight: 0.15,
        factors: ['governance_token_distribution', 'voting_participation', 'proposal_process'],
        mitigation: ['decentralization', 'time_delays', 'community_oversight']
      },
      regulatoryRisk: {
        score: 60, // 中程度のリスク
        level: 'medium' as any,
        weight: 0.05,
        factors: ['regulatory_uncertainty', 'compliance_requirements', 'jurisdiction'],
        mitigation: ['legal_review', 'compliance_framework', 'regulatory_engagement']
      },
      operationalRisk: {
        score: overallScore,
        level: riskLevel,
        weight: 0.05,
        factors: ['team_experience', 'infrastructure', 'key_person_dependency'],
        mitigation: ['redundancy', 'documentation', 'succession_planning']
      },
      riskFactors: [],
      recommendations: this.generateRiskRecommendations(overallScore),
      peerComparison: [],
      riskHistory: [],
      timestamp: new Date()
    };
  }

  private categorizeRiskLevel(score: number): any {
    if (score >= 90) return 'very_low';
    if (score >= 70) return 'low';
    if (score >= 50) return 'medium';
    if (score >= 30) return 'high';
    if (score >= 10) return 'very_high';
    return 'critical';
  }

  private generateRiskRecommendations(score: number): string[] {
    const recommendations = [];
    
    if (score < 30) {
      recommendations.push('Consider reducing exposure to this protocol');
      recommendations.push('Monitor protocol developments closely');
      recommendations.push('Implement additional risk controls');
    } else if (score < 50) {
      recommendations.push('Maintain cautious approach');
      recommendations.push('Review risk tolerance settings');
    } else if (score < 70) {
      recommendations.push('Standard monitoring recommended');
      recommendations.push('Consider diversification benefits');
    } else {
      recommendations.push('Protocol appears relatively safe');
      recommendations.push('Continue regular monitoring');
    }
    
    return recommendations;
  }

  /**
   * アラート条件を読み込み
   */
  private async loadAlertConditions(): Promise<void> {
    try {
      const supabase = createClient();
      const { data: conditions, error } = await supabase
        .from('defi_alert_conditions')
        .select('*')
        .eq('enabled', true);

      if (error) throw error;

      this.alertConditions.clear();
      
      for (const condition of conditions || []) {
        const userId = condition.user_id;
        if (!this.alertConditions.has(userId)) {
          this.alertConditions.set(userId, []);
        }
        
        this.alertConditions.get(userId)!.push({
          id: condition.id,
          userId: condition.user_id,
          name: condition.name,
          protocolId: condition.protocol_id,
          poolId: condition.pool_id,
          network: condition.network,
          type: condition.type,
          thresholds: condition.thresholds,
          notifications: condition.notifications,
          enabled: condition.enabled,
          lastTriggered: condition.last_triggered ? new Date(condition.last_triggered) : undefined,
          triggerCount: condition.trigger_count || 0,
          createdAt: new Date(condition.created_at),
          updatedAt: new Date(condition.updated_at)
        });
      }

      logger.info('DeFi alert conditions loaded', {
        conditionsCount: conditions?.length || 0,
        usersCount: this.alertConditions.size
      });
    } catch (error) {
      logger.error('Error loading DeFi alert conditions', { wsError: error });
    }
  }

  /**
   * 通知メソッド（プレースホルダー）
   */
  private async sendEmailNotification(condition: DeFiAlertCondition): Promise<void> {
    // TODO: メール通知の実装
    logger.debug('Email notification sent', { alertId: condition.id });
  }

  private async sendPushNotification(condition: DeFiAlertCondition): Promise<void> {
    // TODO: プッシュ通知の実装
    logger.debug('Push notification sent', { alertId: condition.id });
  }

  private async sendWebhookNotification(condition: DeFiAlertCondition): Promise<void> {
    // TODO: Webhook通知の実装
    logger.debug('Webhook notification sent', { alertId: condition.id });
  }

  /**
   * データクリーンアップ
   */
  private async cleanupOldData(): Promise<void> {
    const cutoffDate = new Date(Date.now() - this.config.dataRetentionDays * 24 * 60 * 60 * 1000);

    // TVL履歴のクリーンアップ
    for (const [key, history] of this.tvlHistory) {
      const filteredHistory = history.filter(data => data.timestamp > cutoffDate);
      this.tvlHistory.set(key, filteredHistory);
    }
  }

  /**
   * 現在の状態を保存
   */
  private async saveCurrentState(): Promise<void> {
    try {
      const supabase = createClient();
      
      // プロトコルデータを保存
      for (const [protocolId, protocolInfo] of this.protocolData) {
        await supabase.from('defi_protocol_data').upsert({
          protocol_id: protocolId,
          protocol_name: protocolInfo.name,
          protocol_type: protocolInfo.protocol,
          network: protocolInfo.network,
          tvl: protocolInfo.tvl,
          volume_24h: protocolInfo.volume24h,
          risk_score: protocolInfo.riskScore,
          risk_level: protocolInfo.riskLevel,
          updated_at: new Date()
        });
      }

      // リスク評価を保存
      for (const [protocolId, assessment] of this.riskAssessments) {
        await supabase.from('defi_risk_assessments').upsert({
          protocol_id: protocolId,
          overall_score: assessment.overallScore,
          risk_level: assessment.riskLevel,
          smart_contract_risk: assessment.smartContractRisk,
          liquidity_risk: assessment.liquidityRisk,
          market_risk: assessment.marketRisk,
          recommendations: assessment.recommendations,
          updated_at: new Date()
        });
      }

      logger.debug('DeFi monitoring state saved to database');
    } catch (error) {
      logger.error('Error saving DeFi monitoring state', { wsError: error });
    }
  }

  /**
   * 市場概要を取得
   */
  async getMarketOverview(): Promise<DeFiMarketOverview> {
    const totalTVL = Array.from(this.protocolData.values())
      .reduce((sum, protocol) => sum + protocol.tvl, 0);

    const protocolsByCategory: Record<string, number> = {};
    for (const protocol of this.protocolData.values()) {
      for (const category of protocol.category) {
        protocolsByCategory[category] = (protocolsByCategory[category] || 0) + 1;
      }
    }

    const topProtocols = Array.from(this.protocolData.values())
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 10)
      .map((protocol, index) => ({
        rank: index + 1,
        protocolId: protocol.id,
        name: protocol.name,
        tvl: protocol.tvl,
        change24h: 0, // TODO: Calculate from history
        marketShare: totalTVL > 0 ? (protocol.tvl / totalTVL) * 100 : 0
      }));

    return {
      totalTVL,
      totalVolume24h: 0, // TODO: Calculate
      totalUsers: 0, // TODO: Calculate
      totalTransactions: 0, // TODO: Calculate
      protocolCount: this.protocolData.size,
      protocolsByCategory,
      topProtocols,
      networkDistribution: [], // TODO: Calculate
      crossChainVolume: 0, // TODO: Calculate
      tvlChange24h: 0, // TODO: Calculate
      tvlChange7d: 0, // TODO: Calculate
      tvlChange30d: 0, // TODO: Calculate
      dominanceIndex: topProtocols.length > 0 ? topProtocols[0].marketShare : 0,
      newProtocols30d: 0, // TODO: Calculate
      activeGovernance: 0, // TODO: Calculate
      avgAPY: 0, // TODO: Calculate
      timestamp: new Date()
    };
  }

  /**
   * 統計情報を取得
   */
  getMetrics(): MonitoringMetrics {
    return { ...this.metrics };
  }

  /**
   * プロトコルデータを取得
   */
  getProtocolData(protocolId: string): ProtocolInfo | undefined {
    return this.protocolData.get(protocolId);
  }

  /**
   * TVL履歴を取得
   */
  getTVLHistory(protocol: DeFiProtocol, network?: BlockchainNetwork): TVLData[] {
    const key = `${protocol}_${network || BlockchainNetwork.ETHEREUM}`;
    return this.tvlHistory.get(key) || [];
  }

  /**
   * リスク評価を取得
   */
  getRiskAssessment(protocolId: string): DeFiRiskAssessment | undefined {
    return this.riskAssessments.get(protocolId);
  }

  /**
   * クリーンアップ
   */
  async cleanup(): Promise<void> {
    await this.stop();
    this.connector.cleanup();

    logger.info('DeFi monitoring engine cleanup completed');
  }
}