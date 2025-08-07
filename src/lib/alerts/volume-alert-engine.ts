// 🚨 高度なボリュームアラートエンジン
// ボリュームスパイク、異常検知、統計分析による高精度アラート

import { 
  AlertCondition, 
  AlertType, 
  AlertSeverity, 
  VolumeAlertParams,
  TriggeredAlert
} from './types';
import { PriceData, TriggerResult } from './price-alert-engine';
import { logger } from '@/lib/monitoring/logger';

export interface VolumeData extends PriceData {
  volume: number;
  volumeUSD?: number;
  trades?: number;
  buyers?: number;
  sellers?: number;
}

export interface VolumeAnalysis {
  symbol: string;
  timestamp: Date;
  
  // 現在のボリューム情報
  currentVolume: number;
  currentVolumeUSD: number;
  
  // 統計情報
  averageVolume: number;
  medianVolume: number;
  volumeStdDev: number;
  
  // 比較指標
  volumeRatio: number; // 現在/平均
  zScore: number; // 標準化スコア
  percentile: number; // パーセンタイル
  
  // 異常検知
  isSpike: boolean;
  isDrop: boolean;
  isAbnormal: boolean;
  
  // トレンド分析
  trend: 'increasing' | 'decreasing' | 'stable';
  trendStrength: number; // 0-1
  
  // 時間別分析
  hourlyPattern: number[]; // 24時間のパターン
  weeklyPattern: number[]; // 7日間のパターン
  
  // 市場活動
  marketActivity: 'low' | 'normal' | 'high' | 'extreme';
  liquidityScore: number; // 0-100
}

export class VolumeAlertEngine {
  private volumeCache: Map<string, VolumeData[]> = new Map();
  private analysisCache: Map<string, VolumeAnalysis[]> = new Map();
  private readonly maxHistorySize = 1000;
  private readonly analysisWindow = 100; // 分析に使用するデータポイント数

  constructor(
    private readonly config: {
      spikeThreshold: number; // 平均の何倍をスパイクとするか
      dropThreshold: number; // 何パーセント以下を急落とするか
      abnormalZScore: number; // 異常とするZスコア閾値
      minDataPoints: number; // 分析に必要な最小データ数
      updateInterval: number; // 更新間隔（秒）
    } = {
      spikeThreshold: 3.0,
      dropThreshold: 0.3,
      abnormalZScore: 2.5,
      minDataPoints: 50,
      updateInterval: 60
    }
  ) {}

  /**
   * ボリュームデータを更新し、アラートをチェック
   */
  async updateVolumeData(volumeData: VolumeData[]): Promise<void> {
    for (const data of volumeData) {
      const symbol = data.symbol.toUpperCase();
      
      if (!this.volumeCache.has(symbol)) {
        this.volumeCache.set(symbol, []);
      }
      
      const history = this.volumeCache.get(symbol)!;
      history.push(data);
      
      // 履歴サイズを制限
      if (history.length > this.maxHistorySize) {
        history.splice(0, history.length - this.maxHistorySize);
      }
      
      // ボリューム分析を更新
      if (history.length >= this.config.minDataPoints) {
        const analysis = this.performVolumeAnalysis(symbol, history);
        this.updateAnalysisCache(symbol, analysis);
      }
    }
  }

  /**
   * ボリュームアラートをチェック
   */
  async checkVolumeAlert(
    alert: AlertCondition,
    currentData: VolumeData
  ): Promise<TriggerResult> {
    try {
      if (!this.isVolumeAlert(alert.type)) {
        return { triggered: false, reason: 'Not a volume alert type' };
      }

      const params = alert.conditions as VolumeAlertParams;
      const analysis = this.getLatestAnalysis(alert.symbol);
      
      if (!analysis) {
        return { triggered: false, reason: 'Volume analysis not available' };
      }

      switch (alert.type) {
        case AlertType.VOLUME_SPIKE:
          return this.checkVolumeSpikeAlert(alert, currentData, params, analysis);
          
        case AlertType.VOLUME_DROP:
          return this.checkVolumeDropAlert(alert, currentData, params, analysis);
          
        case AlertType.VOLUME_ABNORMAL:
          return this.checkVolumeAbnormalAlert(alert, currentData, params, analysis);
          
        default:
          return { triggered: false, reason: 'Unknown volume alert type' };
      }
    } catch (error) {
      logger.error('Error checking volume alert', {
        alertId: alert.id,
        symbol: alert.symbol,
        wsError: error
      });
      return { triggered: false, reason: 'Error occurred during check' };
    }
  }

  /**
   * ボリュームスパイクアラートをチェック
   */
  private checkVolumeSpikeAlert(
    alert: AlertCondition,
    currentData: VolumeData,
    params: VolumeAlertParams,
    analysis: VolumeAnalysis
  ): TriggerResult {
    const spikeMultiplier = params.spikeMultiplier || this.config.spikeThreshold;
    const minimumVolume = params.minimumVolume || 0;
    
    // 最小ボリューム要件チェック
    if (currentData.volume < minimumVolume) {
      return { triggered: false, reason: 'Volume below minimum threshold' };
    }

    // スパイク判定
    const isSpike = analysis.volumeRatio >= spikeMultiplier;
    const isSignificant = analysis.zScore >= this.config.abnormalZScore;
    
    if (isSpike && isSignificant) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: this.calculateVolumeSeverity(analysis.volumeRatio, analysis.zScore),
        triggeredAt: new Date(),
        triggeredPrice: currentData.price,
        currentValue: currentData.volume,
        previousValue: analysis.averageVolume,
        changePercent: ((currentData.volume - analysis.averageVolume) / analysis.averageVolume) * 100,
        title: `${alert.symbol} Volume Spike Alert`,
        message: `${alert.symbol} volume spike detected: ${currentData.volume.toLocaleString()} (${analysis.volumeRatio.toFixed(1)}x average)`,
        details: {
          symbol: alert.symbol,
          currentVolume: currentData.volume,
          averageVolume: analysis.averageVolume,
          volumeRatio: analysis.volumeRatio,
          zScore: analysis.zScore,
          percentile: analysis.percentile,
          marketActivity: analysis.marketActivity,
          liquidityScore: analysis.liquidityScore,
          price: currentData.price,
          volumeUSD: currentData.volumeUSD,
          interpretation: this.interpretVolumeSpike(analysis)
        },
        acknowledged: false,
        notificationsSent: []
      };

      return {
        triggered: true,
        alert: triggeredAlert,
        metadata: {
          volumeRatio: analysis.volumeRatio,
          zScore: analysis.zScore,
          spikeType: 'volume_spike',
          significance: this.categorizeSpikeSignificance(analysis.volumeRatio)
        }
      };
    }

    return { triggered: false, reason: 'Volume spike threshold not met' };
  }

  /**
   * ボリューム急落アラートをチェック
   */
  private checkVolumeDropAlert(
    alert: AlertCondition,
    currentData: VolumeData,
    params: VolumeAlertParams,
    analysis: VolumeAnalysis
  ): TriggerResult {
    const dropThreshold = params.dropThreshold || this.config.dropThreshold;
    
    const isDrop = analysis.volumeRatio <= dropThreshold;
    const isSignificant = Math.abs(analysis.zScore) >= this.config.abnormalZScore;
    
    if (isDrop && isSignificant) {
      const dropPercent = ((analysis.averageVolume - currentData.volume) / analysis.averageVolume) * 100;
      
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: this.calculateVolumeSeverity(1 / analysis.volumeRatio, Math.abs(analysis.zScore)),
        triggeredAt: new Date(),
        triggeredPrice: currentData.price,
        currentValue: currentData.volume,
        previousValue: analysis.averageVolume,
        changePercent: -dropPercent,
        title: `${alert.symbol} Volume Drop Alert`,
        message: `${alert.symbol} volume drop detected: ${currentData.volume.toLocaleString()} (${dropPercent.toFixed(1)}% below average)`,
        details: {
          symbol: alert.symbol,
          currentVolume: currentData.volume,
          averageVolume: analysis.averageVolume,
          volumeRatio: analysis.volumeRatio,
          dropPercent,
          zScore: analysis.zScore,
          marketActivity: analysis.marketActivity,
          liquidityScore: analysis.liquidityScore,
          price: currentData.price,
          interpretation: this.interpretVolumeDrop(analysis)
        },
        acknowledged: false,
        notificationsSent: []
      };

      return {
        triggered: true,
        alert: triggeredAlert,
        metadata: {
          volumeRatio: analysis.volumeRatio,
          dropPercent,
          zScore: analysis.zScore,
          dropType: 'volume_drop'
        }
      };
    }

    return { triggered: false, reason: 'Volume drop threshold not met' };
  }

  /**
   * 異常ボリュームアラートをチェック
   */
  private checkVolumeAbnormalAlert(
    alert: AlertCondition,
    currentData: VolumeData,
    params: VolumeAlertParams,
    analysis: VolumeAnalysis
  ): TriggerResult {
    const abnormalThreshold = this.config.abnormalZScore;
    
    const isAbnormal = Math.abs(analysis.zScore) >= abnormalThreshold;
    const isOutlier = analysis.percentile <= 5 || analysis.percentile >= 95;
    
    if (isAbnormal && isOutlier) {
      const anomalyType = analysis.zScore > 0 ? 'high' : 'low';
      
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: this.calculateAnomalySeverity(Math.abs(analysis.zScore), analysis.percentile),
        triggeredAt: new Date(),
        triggeredPrice: currentData.price,
        currentValue: currentData.volume,
        previousValue: analysis.averageVolume,
        title: `${alert.symbol} Abnormal Volume Alert`,
        message: `${alert.symbol} abnormal volume detected: ${anomalyType} volume anomaly (Z-score: ${analysis.zScore.toFixed(2)})`,
        details: {
          symbol: alert.symbol,
          currentVolume: currentData.volume,
          averageVolume: analysis.averageVolume,
          medianVolume: analysis.medianVolume,
          zScore: analysis.zScore,
          percentile: analysis.percentile,
          anomalyType,
          marketActivity: analysis.marketActivity,
          trend: analysis.trend,
          trendStrength: analysis.trendStrength,
          price: currentData.price,
          interpretation: this.interpretVolumeAnomaly(analysis)
        },
        acknowledged: false,
        notificationsSent: []
      };

      return {
        triggered: true,
        alert: triggeredAlert,
        metadata: {
          zScore: analysis.zScore,
          percentile: analysis.percentile,
          anomalyType,
          significance: this.categorizeAnomalySignificance(Math.abs(analysis.zScore))
        }
      };
    }

    return { triggered: false, reason: 'Volume not sufficiently abnormal' };
  }

  /**
   * ボリューム分析を実行
   */
  private performVolumeAnalysis(symbol: string, history: VolumeData[]): VolumeAnalysis {
    const volumes = history.map(d => d.volume);
    const recent = history.slice(-this.analysisWindow);
    const current = history[history.length - 1];
    
    // 基本統計
    const averageVolume = this.calculateMean(volumes);
    const medianVolume = this.calculateMedian(volumes);
    const volumeStdDev = this.calculateStdDev(volumes, averageVolume);
    
    // 比較指標
    const volumeRatio = current.volume / averageVolume;
    const zScore = (current.volume - averageVolume) / volumeStdDev;
    const percentile = this.calculatePercentile(current.volume, volumes);
    
    // 異常検知
    const isSpike = volumeRatio >= this.config.spikeThreshold;
    const isDrop = volumeRatio <= this.config.dropThreshold;
    const isAbnormal = Math.abs(zScore) >= this.config.abnormalZScore;
    
    // トレンド分析
    const trend = this.analyzeTrend(recent.map(d => d.volume));
    const trendStrength = this.calculateTrendStrength(recent.map(d => d.volume));
    
    // パターン分析
    const hourlyPattern = this.analyzeHourlyPattern(history);
    const weeklyPattern = this.analyzeWeeklyPattern(history);
    
    // 市場活動評価
    const marketActivity = this.evaluateMarketActivity(current.volume, averageVolume, zScore);
    const liquidityScore = this.calculateLiquidityScore(current, recent);

    return {
      symbol: symbol.toUpperCase(),
      timestamp: current.timestamp,
      currentVolume: current.volume,
      currentVolumeUSD: current.volumeUSD || 0,
      averageVolume,
      medianVolume,
      volumeStdDev,
      volumeRatio,
      zScore,
      percentile,
      isSpike,
      isDrop,
      isAbnormal,
      trend,
      trendStrength,
      hourlyPattern,
      weeklyPattern,
      marketActivity,
      liquidityScore
    };
  }

  /**
   * 統計計算ヘルパーメソッド
   */
  private calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];
  }

  private calculateStdDev(values: number[], mean: number): number {
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  private calculatePercentile(value: number, values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = sorted.findIndex(v => v >= value);
    return (index / sorted.length) * 100;
  }

  /**
   * トレンド分析
   */
  private analyzeTrend(volumes: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (volumes.length < 10) return 'stable';
    
    const firstHalf = volumes.slice(0, Math.floor(volumes.length / 2));
    const secondHalf = volumes.slice(Math.floor(volumes.length / 2));
    
    const firstAvg = this.calculateMean(firstHalf);
    const secondAvg = this.calculateMean(secondHalf);
    
    const changePercent = ((secondAvg - firstAvg) / firstAvg) * 100;
    
    if (changePercent > 10) return 'increasing';
    if (changePercent < -10) return 'decreasing';
    return 'stable';
  }

  private calculateTrendStrength(volumes: number[]): number {
    if (volumes.length < 5) return 0;
    
    let increasingCount = 0;
    let decreasingCount = 0;
    
    for (let i = 1; i < volumes.length; i++) {
      if (volumes[i] > volumes[i - 1]) increasingCount++;
      if (volumes[i] < volumes[i - 1]) decreasingCount++;
    }
    
    const total = volumes.length - 1;
    const strongestDirection = Math.max(increasingCount, decreasingCount);
    
    return strongestDirection / total;
  }

  /**
   * パターン分析
   */
  private analyzeHourlyPattern(history: VolumeData[]): number[] {
    const hourlyVolumes: number[][] = Array.from({ length: 24 }, () => []);
    
    history.forEach(data => {
      const hour = data.timestamp.getHours();
      hourlyVolumes[hour].push(data.volume);
    });
    
    return hourlyVolumes.map(volumes => 
      volumes.length > 0 ? this.calculateMean(volumes) : 0
    );
  }

  private analyzeWeeklyPattern(history: VolumeData[]): number[] {
    const weeklyVolumes: number[][] = Array.from({ length: 7 }, () => []);
    
    history.forEach(data => {
      const dayOfWeek = data.timestamp.getDay();
      weeklyVolumes[dayOfWeek].push(data.volume);
    });
    
    return weeklyVolumes.map(volumes => 
      volumes.length > 0 ? this.calculateMean(volumes) : 0
    );
  }

  /**
   * 市場活動評価
   */
  private evaluateMarketActivity(
    currentVolume: number, 
    averageVolume: number, 
    zScore: number
  ): 'low' | 'normal' | 'high' | 'extreme' {
    const ratio = currentVolume / averageVolume;
    
    if (Math.abs(zScore) > 3 || ratio > 5 || ratio < 0.2) return 'extreme';
    if (Math.abs(zScore) > 2 || ratio > 2.5 || ratio < 0.4) return 'high';
    if (Math.abs(zScore) > 1 || ratio > 1.5 || ratio < 0.7) return 'normal';
    return 'low';
  }

  private calculateLiquidityScore(current: VolumeData, recent: VolumeData[]): number {
    // 流動性スコア計算（0-100）
    const volumeConsistency = this.calculateVolumeConsistency(recent);
    const volumeDepth = Math.min(current.volume / 1000000, 1); // 1M基準で正規化
    const priceStability = this.calculatePriceStability(recent);
    
    return Math.round((volumeConsistency * 0.4 + volumeDepth * 0.4 + priceStability * 0.2) * 100);
  }

  private calculateVolumeConsistency(recent: VolumeData[]): number {
    if (recent.length < 5) return 0.5;
    
    const volumes = recent.map(d => d.volume);
    const mean = this.calculateMean(volumes);
    const stdDev = this.calculateStdDev(volumes, mean);
    
    // 変動係数の逆数（低いほど一貫性が高い）
    const cv = stdDev / mean;
    return Math.max(0, 1 - cv);
  }

  private calculatePriceStability(recent: VolumeData[]): number {
    if (recent.length < 5) return 0.5;
    
    const prices = recent.map(d => d.price);
    const mean = this.calculateMean(prices);
    const stdDev = this.calculateStdDev(prices, mean);
    
    const cv = stdDev / mean;
    return Math.max(0, 1 - cv * 2); // 価格変動を重く評価
  }

  /**
   * 重要度評価
   */
  private calculateVolumeSeverity(ratio: number, zScore: number): AlertSeverity {
    if (ratio > 10 || Math.abs(zScore) > 4) return AlertSeverity.EMERGENCY;
    if (ratio > 5 || Math.abs(zScore) > 3) return AlertSeverity.CRITICAL;
    if (ratio > 3 || Math.abs(zScore) > 2) return AlertSeverity.WARNING;
    return AlertSeverity.INFO;
  }

  private calculateAnomalySeverity(zScore: number, percentile: number): AlertSeverity {
    if (zScore > 4 || percentile <= 1 || percentile >= 99) return AlertSeverity.EMERGENCY;
    if (zScore > 3 || percentile <= 2.5 || percentile >= 97.5) return AlertSeverity.CRITICAL;
    if (zScore > 2.5 || percentile <= 5 || percentile >= 95) return AlertSeverity.WARNING;
    return AlertSeverity.INFO;
  }

  private categorizeSpikeSignificance(ratio: number): string {
    if (ratio > 10) return 'extreme';
    if (ratio > 5) return 'very_high';
    if (ratio > 3) return 'high';
    if (ratio > 2) return 'moderate';
    return 'low';
  }

  private categorizeAnomalySignificance(zScore: number): string {
    if (zScore > 4) return 'extreme';
    if (zScore > 3) return 'very_high';
    if (zScore > 2.5) return 'high';
    if (zScore > 2) return 'moderate';
    return 'low';
  }

  /**
   * 解釈メッセージ生成
   */
  private interpretVolumeSpike(analysis: VolumeAnalysis): string {
    const ratio = analysis.volumeRatio;
    const activity = analysis.marketActivity;
    
    if (ratio > 10) {
      return `Extremely high volume spike indicating major market event or news. ${activity} market activity detected.`;
    } else if (ratio > 5) {
      return `Significant volume spike suggesting strong interest or institutional activity. ${activity} market conditions.`;
    } else if (ratio > 3) {
      return `Notable volume increase indicating increased trading interest. ${activity} market activity.`;
    }
    return `Moderate volume spike detected. Monitor for continued activity.`;
  }

  private interpretVolumeDrop(analysis: VolumeAnalysis): string {
    const ratio = analysis.volumeRatio;
    
    if (ratio < 0.1) {
      return `Severe volume drop indicating potential liquidity crisis or market disinterest.`;
    } else if (ratio < 0.3) {
      return `Significant volume decrease suggesting reduced market participation.`;
    } else if (ratio < 0.5) {
      return `Notable volume decline indicating cooling market interest.`;
    }
    return `Moderate volume decrease detected.`;
  }

  private interpretVolumeAnomaly(analysis: VolumeAnalysis): string {
    const zScore = analysis.zScore;
    const trend = analysis.trend;
    
    if (Math.abs(zScore) > 4) {
      return `Extreme volume anomaly detected. This is a rare event requiring immediate attention. Trend: ${trend}.`;
    } else if (Math.abs(zScore) > 3) {
      return `Significant volume anomaly indicating unusual market conditions. Trend: ${trend}.`;
    }
    return `Volume anomaly detected outside normal patterns. Current trend: ${trend}.`;
  }

  /**
   * ヘルパーメソッド
   */
  private isVolumeAlert(alertType: AlertType): boolean {
    return [
      AlertType.VOLUME_SPIKE,
      AlertType.VOLUME_DROP,
      AlertType.VOLUME_ABNORMAL
    ].includes(alertType);
  }

  private updateAnalysisCache(symbol: string, analysis: VolumeAnalysis): void {
    const key = symbol.toUpperCase();
    
    if (!this.analysisCache.has(key)) {
      this.analysisCache.set(key, []);
    }
    
    const history = this.analysisCache.get(key)!;
    history.push(analysis);
    
    // 履歴サイズを制限
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }
  }

  /**
   * 公開メソッド
   */
  getLatestAnalysis(symbol: string): VolumeAnalysis | null {
    const history = this.analysisCache.get(symbol.toUpperCase());
    return history && history.length > 0 ? history[history.length - 1] : null;
  }

  getVolumeHistory(symbol: string, limit?: number): VolumeData[] {
    const history = this.volumeCache.get(symbol.toUpperCase()) || [];
    return limit ? history.slice(-limit) : history;
  }

  /**
   * クリーンアップ
   */
  cleanup(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24時間

    // ボリュームキャッシュのクリーンアップ
    for (const [symbol, history] of this.volumeCache.entries()) {
      const filteredHistory = history.filter(
        data => now - data.timestamp.getTime() < maxAge
      );
      
      if (filteredHistory.length === 0) {
        this.volumeCache.delete(symbol);
      } else {
        this.volumeCache.set(symbol, filteredHistory);
      }
    }

    // 分析キャッシュのクリーンアップ
    for (const [symbol, history] of this.analysisCache.entries()) {
      const filteredHistory = history.filter(
        analysis => now - analysis.timestamp.getTime() < maxAge
      );
      
      if (filteredHistory.length === 0) {
        this.analysisCache.delete(symbol);
      } else {
        this.analysisCache.set(symbol, filteredHistory);
      }
    }

    logger.debug('Volume alert engine cleanup completed', {
      volumeSymbols: this.volumeCache.size,
      analysisSymbols: this.analysisCache.size
    });
  }
}