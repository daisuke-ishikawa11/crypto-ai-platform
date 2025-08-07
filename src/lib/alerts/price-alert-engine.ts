// 🚨 高性能価格アラートエンジン
// リアルタイム価格監視と高精度アラート判定

import { 
  AlertCondition, 
  AlertType, 
  AlertSeverity, 
  PriceAlertParams,
  TriggeredAlert,
  NotificationMethod
} from './types';
import { logger } from '@/lib/monitoring/logger';

export interface PriceData {
  symbol: string;
  price: number;
  timestamp: Date;
  volume?: number;
  change24h?: number;
  changePercent24h?: number;
  high24h?: number;
  low24h?: number;
  marketCap?: number;
}

export interface TriggerResult {
  triggered: boolean;
  alert?: TriggeredAlert;
  reason?: string;
  metadata?: Record<string, any>;
}

export class PriceAlertEngine {
  private priceCache: Map<string, PriceData[]> = new Map();
  private readonly maxCacheSize = 1000; // 最大1000個の価格データを保持
  private readonly maxHistorySize = 100; // シンボル毎に最大100個の履歴を保持

  constructor(
    private readonly config: {
      defaultCooldownPeriod: number;
      maxPriceHistory: number;
      priceValidityPeriod: number; // 価格データの有効期間（分）
    } = {
      defaultCooldownPeriod: 15,
      maxPriceHistory: 100,
      priceValidityPeriod: 5
    }
  ) {}

  /**
   * 価格データを更新し、アラート条件をチェック
   */
  async updatePrice(priceData: PriceData): Promise<void> {
    const symbol = priceData.symbol.toUpperCase();
    
    // 価格履歴を更新
    if (!this.priceCache.has(symbol)) {
      this.priceCache.set(symbol, []);
    }
    
    const history = this.priceCache.get(symbol)!;
    history.push(priceData);
    
    // 履歴サイズを制限
    if (history.length > this.config.maxPriceHistory) {
      history.splice(0, history.length - this.config.maxPriceHistory);
    }

    logger.debug('Price updated', {
      symbol,
      price: priceData.price,
      change: priceData.changePercent24h,
      volume: priceData.volume
    });
  }

  /**
   * 複数価格の一括更新
   */
  async updatePrices(pricesData: PriceData[]): Promise<void> {
    const updatePromises = pricesData.map(price => this.updatePrice(price));
    await Promise.all(updatePromises);
  }

  /**
   * 価格アラート条件をチェック
   */
  async checkPriceAlert(
    alert: AlertCondition, 
    currentPrice: PriceData
  ): Promise<TriggerResult> {
    try {
      if (alert.type !== AlertType.PRICE_ABOVE && 
          alert.type !== AlertType.PRICE_BELOW &&
          alert.type !== AlertType.PRICE_CHANGE &&
          alert.type !== AlertType.PRICE_BREAKOUT) {
        return { triggered: false, reason: 'Not a price alert type' };
      }

      const params = alert.conditions as PriceAlertParams;
      const symbol = alert.symbol.toUpperCase();
      
      // 価格履歴を取得
      const priceHistory = this.priceCache.get(symbol) || [];
      if (priceHistory.length === 0) {
        return { triggered: false, reason: 'No price history available' };
      }

      // 最新価格データの有効性チェック
      const latestPrice = priceHistory[priceHistory.length - 1];
      const priceAge = Date.now() - latestPrice.timestamp.getTime();
      if (priceAge > this.config.priceValidityPeriod * 60 * 1000) {
        return { triggered: false, reason: 'Price data is stale' };
      }

      // アラートタイプ別チェック
      switch (alert.type) {
        case AlertType.PRICE_ABOVE:
          return this.checkPriceAbove(alert, currentPrice, params);
          
        case AlertType.PRICE_BELOW:
          return this.checkPriceBelow(alert, currentPrice, params);
          
        case AlertType.PRICE_CHANGE:
          return this.checkPriceChange(alert, currentPrice, params, priceHistory);
          
        case AlertType.PRICE_BREAKOUT:
          return this.checkPriceBreakout(alert, currentPrice, params, priceHistory);
          
        default:
          return { triggered: false, reason: 'Unknown price alert type' };
      }
    } catch (error) {
      logger.error('Error checking price alert', {
        alertId: alert.id,
        symbol: alert.symbol,
        wsError: error
      });
      return { triggered: false, reason: 'Error occurred during check' };
    }
  }

  /**
   * 価格上昇アラートチェック
   */
  private checkPriceAbove(
    alert: AlertCondition,
    currentPrice: PriceData,
    params: PriceAlertParams
  ): TriggerResult {
    if (!params.targetPrice) {
      return { triggered: false, reason: 'Target price not specified' };
    }

    if (currentPrice.price >= params.targetPrice) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentPrice.price,
        title: `${alert.symbol} Price Alert`,
        message: `${alert.symbol} has reached $${currentPrice.price.toFixed(4)}, above your target of $${params.targetPrice.toFixed(4)}`,
        details: {
          symbol: alert.symbol,
          targetPrice: params.targetPrice,
          currentPrice: currentPrice.price,
          change: currentPrice.changePercent24h,
          volume: currentPrice.volume
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          priceChange: currentPrice.price - params.targetPrice,
          percentChange: ((currentPrice.price - params.targetPrice) / params.targetPrice) * 100
        }
      };
    }

    return { triggered: false, reason: 'Price below target' };
  }

  /**
   * 価格下降アラートチェック
   */
  private checkPriceBelow(
    alert: AlertCondition,
    currentPrice: PriceData,
    params: PriceAlertParams
  ): TriggerResult {
    if (!params.targetPrice) {
      return { triggered: false, reason: 'Target price not specified' };
    }

    if (currentPrice.price <= params.targetPrice) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentPrice.price,
        title: `${alert.symbol} Price Alert`,
        message: `${alert.symbol} has dropped to $${currentPrice.price.toFixed(4)}, below your target of $${params.targetPrice.toFixed(4)}`,
        details: {
          symbol: alert.symbol,
          targetPrice: params.targetPrice,
          currentPrice: currentPrice.price,
          change: currentPrice.changePercent24h,
          volume: currentPrice.volume
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          priceChange: params.targetPrice - currentPrice.price,
          percentChange: ((params.targetPrice - currentPrice.price) / params.targetPrice) * 100
        }
      };
    }

    return { triggered: false, reason: 'Price above target' };
  }

  /**
   * 価格変動アラートチェック
   */
  private checkPriceChange(
    alert: AlertCondition,
    currentPrice: PriceData,
    params: PriceAlertParams,
    priceHistory: PriceData[]
  ): TriggerResult {
    if (!params.changePercent && !params.changeAmount) {
      return { triggered: false, reason: 'Change threshold not specified' };
    }

    // 基準価格を決定（指定されていない場合は前の価格を使用）
    let basePrice = params.basePrice;
    if (!basePrice && priceHistory.length >= 2) {
      // タイムフレームに基づいて基準価格を選択
      const timeframeMinutes = this.parseTimeframe(params.timeframe || '1h');
      const cutoffTime = new Date(Date.now() - timeframeMinutes * 60 * 1000);
      
      // 指定期間内の最初の価格を基準とする
      const baseData = priceHistory.find(p => p.timestamp >= cutoffTime);
      basePrice = baseData?.price || priceHistory[priceHistory.length - 2].price;
    }

    if (!basePrice) {
      return { triggered: false, reason: 'Base price not available' };
    }

    const actualChange = currentPrice.price - basePrice;
    const actualChangePercent = (actualChange / basePrice) * 100;

    // パーセントベースの変動チェック
    if (params.changePercent && Math.abs(actualChangePercent) >= Math.abs(params.changePercent)) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentPrice.price,
        previousValue: basePrice,
        changePercent: actualChangePercent,
        title: `${alert.symbol} Price Change Alert`,
        message: `${alert.symbol} has ${actualChangePercent > 0 ? 'increased' : 'decreased'} by ${Math.abs(actualChangePercent).toFixed(2)}% (${actualChangePercent > 0 ? '+' : ''}$${actualChange.toFixed(4)})`,
        details: {
          symbol: alert.symbol,
          basePrice,
          currentPrice: currentPrice.price,
          changeAmount: actualChange,
          changePercent: actualChangePercent,
          threshold: params.changePercent,
          timeframe: params.timeframe
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          actualChange,
          actualChangePercent,
          basePrice,
          direction: actualChangePercent > 0 ? 'up' : 'down'
        }
      };
    }

    // 金額ベースの変動チェック
    if (params.changeAmount && Math.abs(actualChange) >= Math.abs(params.changeAmount)) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentPrice.price,
        previousValue: basePrice,
        changePercent: actualChangePercent,
        title: `${alert.symbol} Price Change Alert`,
        message: `${alert.symbol} has changed by $${actualChange.toFixed(4)} (${actualChangePercent.toFixed(2)}%)`,
        details: {
          symbol: alert.symbol,
          basePrice,
          currentPrice: currentPrice.price,
          changeAmount: actualChange,
          changePercent: actualChangePercent,
          threshold: params.changeAmount,
          timeframe: params.timeframe
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          actualChange,
          actualChangePercent,
          basePrice,
          direction: actualChange > 0 ? 'up' : 'down'
        }
      };
    }

    return { triggered: false, reason: 'Change threshold not met' };
  }

  /**
   * 価格ブレイクアウトアラートチェック
   */
  private checkPriceBreakout(
    alert: AlertCondition,
    currentPrice: PriceData,
    params: PriceAlertParams,
    priceHistory: PriceData[]
  ): TriggerResult {
    if (!params.resistanceLevel && !params.supportLevel) {
      return { triggered: false, reason: 'Resistance or support level not specified' };
    }

    let breakoutType = '';
    let breakoutLevel = 0;
    let triggered = false;

    // 抵抗線ブレイクアウトチェック
    if (params.resistanceLevel && currentPrice.price > params.resistanceLevel) {
      // 過去の価格が抵抗線以下だったかチェック
      const recentPrices = priceHistory.slice(-5); // 直近5つの価格
      const wasBelow = recentPrices.some(p => p.price <= params.resistanceLevel!);
      
      if (wasBelow) {
        triggered = true;
        breakoutType = 'resistance';
        breakoutLevel = params.resistanceLevel;
      }
    }

    // サポート線ブレイクダウンチェック
    if (params.supportLevel && currentPrice.price < params.supportLevel) {
      // 過去の価格がサポート線以上だったかチェック
      const recentPrices = priceHistory.slice(-5); // 直近5つの価格
      const wasAbove = recentPrices.some(p => p.price >= params.supportLevel!);
      
      if (wasAbove) {
        triggered = true;
        breakoutType = 'support';
        breakoutLevel = params.supportLevel;
      }
    }

    if (triggered) {
      const isUpBreakout = breakoutType === 'resistance';
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentPrice.price,
        title: `${alert.symbol} ${isUpBreakout ? 'Breakout' : 'Breakdown'} Alert`,
        message: `${alert.symbol} has broken ${isUpBreakout ? 'above' : 'below'} ${breakoutType} level of $${breakoutLevel.toFixed(4)} at $${currentPrice.price.toFixed(4)}`,
        details: {
          symbol: alert.symbol,
          breakoutType,
          breakoutLevel,
          currentPrice: currentPrice.price,
          direction: isUpBreakout ? 'up' : 'down',
          volume: currentPrice.volume
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          breakoutType,
          breakoutLevel,
          direction: isUpBreakout ? 'up' : 'down',
          volumeConfirmation: currentPrice.volume ? currentPrice.volume > 0 : false
        }
      };
    }

    return { triggered: false, reason: 'No breakout detected' };
  }

  /**
   * タイムフレームを分に変換
   */
  private parseTimeframe(timeframe: string): number {
    const match = timeframe.match(/^(\d+)([mhd])$/);
    if (!match) return 60; // デフォルト1時間

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 'm': return value;
      case 'h': return value * 60;
      case 'd': return value * 60 * 24;
      default: return 60;
    }
  }

  /**
   * 価格履歴をクリーンアップ
   */
  cleanupPriceHistory(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24時間

    for (const [symbol, history] of this.priceCache.entries()) {
      const filteredHistory = history.filter(
        price => now - price.timestamp.getTime() < maxAge
      );
      
      if (filteredHistory.length === 0) {
        this.priceCache.delete(symbol);
      } else {
        this.priceCache.set(symbol, filteredHistory);
      }
    }

    logger.debug('Price history cleanup completed', {
      symbols: this.priceCache.size,
      totalDataPoints: Array.from(this.priceCache.values()).reduce((sum, history) => sum + history.length, 0)
    });
  }

  /**
   * 特定シンボルの最新価格を取得
   */
  getLatestPrice(symbol: string): PriceData | null {
    const history = this.priceCache.get(symbol.toUpperCase());
    return history && history.length > 0 ? history[history.length - 1] : null;
  }

  /**
   * 特定シンボルの価格履歴を取得
   */
  getPriceHistory(symbol: string, limit?: number): PriceData[] {
    const history = this.priceCache.get(symbol.toUpperCase()) || [];
    return limit ? history.slice(-limit) : history;
  }

  /**
   * キャッシュ統計を取得
   */
  getCacheStats(): {
    totalSymbols: number;
    totalDataPoints: number;
    memoryUsage: number;
    oldestData: Date | null;
    newestData: Date | null;
  } {
    const allPrices = Array.from(this.priceCache.values()).flat();
    
    return {
      totalSymbols: this.priceCache.size,
      totalDataPoints: allPrices.length,
      memoryUsage: JSON.stringify(Array.from(this.priceCache.entries())).length,
      oldestData: allPrices.length > 0 ? new Date(Math.min(...allPrices.map(p => p.timestamp.getTime()))) : null,
      newestData: allPrices.length > 0 ? new Date(Math.max(...allPrices.map(p => p.timestamp.getTime()))) : null
    };
  }
}