// 🚨 高度な技術指標アラートエンジン
// RSI、MACD、ボリンジャーバンド、移動平均線などの包括的な技術分析アラート

import { 
  AlertCondition, 
  AlertType, 
  AlertSeverity, 
  TechnicalIndicatorParams,
  TriggeredAlert
} from './types';
import { PriceData, TriggerResult } from './price-alert-engine';
import { logger } from '@/lib/monitoring/logger';

// 技術指標データ
export interface TechnicalIndicatorData {
  symbol: string;
  timestamp: Date;
  
  // RSI
  rsi?: {
    value: number;
    period: number;
    overbought: boolean;
    oversold: boolean;
  };
  
  // MACD
  macd?: {
    macd: number;
    signal: number;
    histogram: number;
    fastEMA: number;
    slowEMA: number;
    bullishCrossover: boolean;
    bearishCrossover: boolean;
  };
  
  // ボリンジャーバンド
  bollinger?: {
    upper: number;
    middle: number;
    lower: number;
    bandwidth: number;
    percentB: number;
    squeeze: boolean;
  };
  
  // 移動平均線
  movingAverages?: {
    sma20: number;
    sma50: number;
    sma200: number;
    ema12: number;
    ema26: number;
    goldenCross: boolean;
    deathCross: boolean;
  };
  
  // ストキャスティクス
  stochastic?: {
    k: number;
    d: number;
    overbought: boolean;
    oversold: boolean;
  };
  
  // その他の指標
  volume?: {
    current: number;
    sma20: number;
    spike: boolean;
  };
}

export class TechnicalAlertEngine {
  private indicatorCache: Map<string, TechnicalIndicatorData[]> = new Map();
  private readonly maxCacheSize = 500;
  private readonly maxHistorySize = 200;

  constructor(
    private readonly config: {
      maxHistorySize: number;
      calculationInterval: number; // 計算間隔（秒）
      smoothingFactor: number;
    } = {
      maxHistorySize: 200,
      calculationInterval: 60,
      smoothingFactor: 0.1
    }
  ) {}

  /**
   * 価格データから技術指標を計算し、アラートをチェック
   */
  async calculateAndCheckIndicators(
    prices: PriceData[],
    alerts: AlertCondition[]
  ): Promise<TriggeredAlert[]> {
    const triggeredAlerts: TriggeredAlert[] = [];

    for (const priceData of prices) {
      // 技術指標を計算
      const indicators = await this.calculateTechnicalIndicators(priceData.symbol, prices);
      
      if (indicators) {
        // インジケーターキャッシュに保存
        this.updateIndicatorCache(priceData.symbol, indicators);
        
        // 関連するアラートをチェック
        const symbolAlerts = alerts.filter(alert => 
          alert.symbol.toUpperCase() === priceData.symbol.toUpperCase() &&
          this.isTechnicalAlert(alert.type)
        );

        for (const alert of symbolAlerts) {
          const result = await this.checkTechnicalAlert(alert, indicators, priceData);
          if (result.triggered && result.alert) {
            triggeredAlerts.push(result.alert);
          }
        }
      }
    }

    return triggeredAlerts;
  }

  /**
   * 技術指標アラートをチェック
   */
  async checkTechnicalAlert(
    alert: AlertCondition,
    indicators: TechnicalIndicatorData,
    currentPrice: PriceData
  ): Promise<TriggerResult> {
    try {
      const params = alert.conditions as TechnicalIndicatorParams;

      switch (alert.type) {
        case AlertType.RSI_OVERBOUGHT:
        case AlertType.RSI_OVERSOLD:
          return this.checkRSIAlert(alert, indicators, params, currentPrice);
          
        case AlertType.MACD_CROSSOVER:
          return this.checkMACDAlert(alert, indicators, params, currentPrice);
          
        case AlertType.BOLLINGER_BREAKOUT:
          return this.checkBollingerAlert(alert, indicators, params, currentPrice);
          
        case AlertType.MA_CROSSOVER:
          return this.checkMovingAverageAlert(alert, indicators, params, currentPrice);
          
        default:
          return { triggered: false, reason: 'Unknown technical alert type' };
      }
    } catch (error) {
      logger.error('Error checking technical alert', {
        alertId: alert.id,
        symbol: alert.symbol,
        wsError: error
      });
      return { triggered: false, reason: 'Error occurred during check' };
    }
  }

  /**
   * RSIアラートチェック
   */
  private checkRSIAlert(
    alert: AlertCondition,
    indicators: TechnicalIndicatorData,
    params: TechnicalIndicatorParams,
    currentPrice: PriceData
  ): TriggerResult {
    if (!indicators.rsi || !params.rsi) {
      return { triggered: false, reason: 'RSI data not available' };
    }

    const rsi = indicators.rsi;
    const config = params.rsi;
    
    let triggered = false;
    let message = '';

    if (alert.type === AlertType.RSI_OVERBOUGHT && rsi.value >= config.overboughtThreshold) {
      triggered = true;
      message = `${alert.symbol} RSI is overbought at ${rsi.value.toFixed(2)} (threshold: ${config.overboughtThreshold})`;
    } else if (alert.type === AlertType.RSI_OVERSOLD && rsi.value <= config.oversoldThreshold) {
      triggered = true;
      message = `${alert.symbol} RSI is oversold at ${rsi.value.toFixed(2)} (threshold: ${config.oversoldThreshold})`;
    }

    if (triggered) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: rsi.value,
        title: `${alert.symbol} RSI Alert`,
        message,
        details: {
          symbol: alert.symbol,
          rsi: rsi.value,
          threshold: alert.type === AlertType.RSI_OVERBOUGHT ? config.overboughtThreshold : config.oversoldThreshold,
          period: config.period,
          price: currentPrice.price,
          recommendation: alert.type === AlertType.RSI_OVERBOUGHT ? 'Consider selling' : 'Consider buying'
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          rsiValue: rsi.value,
          condition: alert.type === AlertType.RSI_OVERBOUGHT ? 'overbought' : 'oversold',
          period: config.period
        }
      };
    }

    return { triggered: false, reason: 'RSI condition not met' };
  }

  /**
   * MACDアラートチェック
   */
  private checkMACDAlert(
    alert: AlertCondition,
    indicators: TechnicalIndicatorData,
    params: TechnicalIndicatorParams,
    currentPrice: PriceData
  ): TriggerResult {
    if (!indicators.macd || !params.macd) {
      return { triggered: false, reason: 'MACD data not available' };
    }

    const macd = indicators.macd;
    const config = params.macd;
    
    let triggered = false;
    let crossoverType = '';

    // 履歴からクロスオーバーを検出
    const history = this.indicatorCache.get(alert.symbol.toUpperCase()) || [];
    if (history.length < 2) {
      return { triggered: false, reason: 'Insufficient MACD history for crossover detection' };
    }

    const previousMACD = history[history.length - 2].macd;
    if (!previousMACD) {
      return { triggered: false, reason: 'Previous MACD data not available' };
    }

    // ブリッシュクロスオーバー（MACD > Signal）
    const bullishCrossover = previousMACD.macd <= previousMACD.signal && macd.macd > macd.signal;
    
    // ベアリッシュクロスオーバー（MACD < Signal）
    const bearishCrossover = previousMACD.macd >= previousMACD.signal && macd.macd < macd.signal;

    if (config.crossoverDirection === 'bullish' && bullishCrossover) {
      triggered = true;
      crossoverType = 'bullish';
    } else if (config.crossoverDirection === 'bearish' && bearishCrossover) {
      triggered = true;
      crossoverType = 'bearish';
    } else if (config.crossoverDirection === 'both' && (bullishCrossover || bearishCrossover)) {
      triggered = true;
      crossoverType = bullishCrossover ? 'bullish' : 'bearish';
    }

    if (triggered) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: macd.macd,
        title: `${alert.symbol} MACD Crossover Alert`,
        message: `${alert.symbol} MACD ${crossoverType} crossover detected: MACD ${macd.macd.toFixed(4)} vs Signal ${macd.signal.toFixed(4)}`,
        details: {
          symbol: alert.symbol,
          macd: macd.macd,
          signal: macd.signal,
          histogram: macd.histogram,
          crossoverType,
          price: currentPrice.price,
          recommendation: crossoverType === 'bullish' ? 'Consider buying' : 'Consider selling'
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          crossoverType,
          macdValue: macd.macd,
          signalValue: macd.signal,
          histogram: macd.histogram
        }
      };
    }

    return { triggered: false, reason: 'No MACD crossover detected' };
  }

  /**
   * ボリンジャーバンドアラートチェック
   */
  private checkBollingerAlert(
    alert: AlertCondition,
    indicators: TechnicalIndicatorData,
    params: TechnicalIndicatorParams,
    currentPrice: PriceData
  ): TriggerResult {
    if (!indicators.bollinger || !params.bollinger) {
      return { triggered: false, reason: 'Bollinger Bands data not available' };
    }

    const bollinger = indicators.bollinger;
    const config = params.bollinger;
    
    let triggered = false;
    let breakoutType = '';
    let breakoutLevel = 0;

    // 上部バンドブレイクアウト
    if ((config.breakoutDirection === 'upper' || config.breakoutDirection === 'both') && 
        currentPrice.price > bollinger.upper) {
      triggered = true;
      breakoutType = 'upper';
      breakoutLevel = bollinger.upper;
    }
    
    // 下部バンドブレイクアウト
    if ((config.breakoutDirection === 'lower' || config.breakoutDirection === 'both') && 
        currentPrice.price < bollinger.lower) {
      triggered = true;
      breakoutType = 'lower';
      breakoutLevel = bollinger.lower;
    }

    if (triggered) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentPrice.price,
        title: `${alert.symbol} Bollinger Bands Breakout`,
        message: `${alert.symbol} has broken ${breakoutType} Bollinger Band at $${currentPrice.price.toFixed(4)} (band: $${breakoutLevel.toFixed(4)})`,
        details: {
          symbol: alert.symbol,
          price: currentPrice.price,
          breakoutType,
          upperBand: bollinger.upper,
          lowerBand: bollinger.lower,
          middleBand: bollinger.middle,
          percentB: bollinger.percentB,
          bandwidth: bollinger.bandwidth,
          squeeze: bollinger.squeeze,
          recommendation: breakoutType === 'upper' ? 'Strong uptrend signal' : 'Strong downtrend signal'
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
          percentB: bollinger.percentB,
          bandwidth: bollinger.bandwidth,
          squeeze: bollinger.squeeze
        }
      };
    }

    return { triggered: false, reason: 'No Bollinger Bands breakout detected' };
  }

  /**
   * 移動平均線アラートチェック
   */
  private checkMovingAverageAlert(
    alert: AlertCondition,
    indicators: TechnicalIndicatorData,
    params: TechnicalIndicatorParams,
    currentPrice: PriceData
  ): TriggerResult {
    if (!indicators.movingAverages || !params.movingAverage) {
      return { triggered: false, reason: 'Moving Average data not available' };
    }

    const ma = indicators.movingAverages;
    const config = params.movingAverage;
    
    // 履歴からクロスオーバーを検出
    const history = this.indicatorCache.get(alert.symbol.toUpperCase()) || [];
    if (history.length < 2) {
      return { triggered: false, reason: 'Insufficient MA history for crossover detection' };
    }

    const previousMA = history[history.length - 2].movingAverages;
    if (!previousMA) {
      return { triggered: false, reason: 'Previous MA data not available' };
    }

    // 使用するMAを決定（設定に基づく）
    let currentFast = 0, currentSlow = 0, previousFast = 0, previousSlow = 0;

    if (config.type === 'sma') {
      // SMMAの場合の処理
      if (config.fastPeriod === 20) currentFast = ma.sma20;
      if (config.fastPeriod === 50) currentFast = ma.sma50;
      if (config.slowPeriod === 50) currentSlow = ma.sma50;
      if (config.slowPeriod === 200) currentSlow = ma.sma200;
      
      if (config.fastPeriod === 20) previousFast = previousMA.sma20;
      if (config.fastPeriod === 50) previousFast = previousMA.sma50;
      if (config.slowPeriod === 50) previousSlow = previousMA.sma50;
      if (config.slowPeriod === 200) previousSlow = previousMA.sma200;
    } else if (config.type === 'ema') {
      // EMAの場合の処理
      if (config.fastPeriod === 12) currentFast = ma.ema12;
      if (config.fastPeriod === 26) currentFast = ma.ema26;
      if (config.slowPeriod === 26) currentSlow = ma.ema26;
      
      if (config.fastPeriod === 12) previousFast = previousMA.ema12;
      if (config.fastPeriod === 26) previousFast = previousMA.ema26;
      if (config.slowPeriod === 26) previousSlow = previousMA.ema26;
    }

    if (currentFast === 0 || currentSlow === 0) {
      return { triggered: false, reason: 'Required MA periods not available' };
    }

    let triggered = false;
    let crossoverType = '';

    // ゴールデンクロス（高速MA > 低速MA）
    const goldenCross = previousFast <= previousSlow && currentFast > currentSlow;
    
    // デッドクロス（高速MA < 低速MA）
    const deathCross = previousFast >= previousSlow && currentFast < currentSlow;

    if (config.crossoverDirection === 'bullish' && goldenCross) {
      triggered = true;
      crossoverType = 'golden';
    } else if (config.crossoverDirection === 'bearish' && deathCross) {
      triggered = true;
      crossoverType = 'death';
    } else if (config.crossoverDirection === 'both' && (goldenCross || deathCross)) {
      triggered = true;
      crossoverType = goldenCross ? 'golden' : 'death';
    }

    if (triggered) {
      const triggeredAlert: TriggeredAlert = {
        id: crypto.randomUUID(),
        alertConditionId: alert.id,
        userId: alert.userId,
        type: alert.type,
        severity: alert.severity,
        triggeredAt: new Date(),
        triggeredPrice: currentPrice.price,
        currentValue: currentFast,
        title: `${alert.symbol} Moving Average Crossover`,
        message: `${alert.symbol} ${crossoverType} cross detected: ${config.type.toUpperCase()}${config.fastPeriod} (${currentFast.toFixed(4)}) crossed ${crossoverType === 'golden' ? 'above' : 'below'} ${config.type.toUpperCase()}${config.slowPeriod} (${currentSlow.toFixed(4)})`,
        details: {
          symbol: alert.symbol,
          crossoverType,
          fastMA: currentFast,
          slowMA: currentSlow,
          fastPeriod: config.fastPeriod,
          slowPeriod: config.slowPeriod,
          maType: config.type,
          price: currentPrice.price,
          recommendation: crossoverType === 'golden' ? 'Bullish signal - Consider buying' : 'Bearish signal - Consider selling'
        },
        acknowledged: false,
        notificationsSent: []
      };

      return { 
        triggered: true, 
        alert: triggeredAlert,
        metadata: {
          crossoverType,
          fastMA: currentFast,
          slowMA: currentSlow,
          maType: config.type,
          periods: `${config.fastPeriod}/${config.slowPeriod}`
        }
      };
    }

    return { triggered: false, reason: 'No MA crossover detected' };
  }

  /**
   * 技術指標を計算
   */
  private async calculateTechnicalIndicators(
    symbol: string,
    prices: PriceData[]
  ): Promise<TechnicalIndicatorData | null> {
    if (prices.length < 50) { // 最低50個のデータポイントが必要
      return null;
    }

    const latestPrice = prices[prices.length - 1];
    const pricesOnly = prices.map(p => p.price);
    const volumes = prices.map(p => p.volume || 0);

    try {
      // RSI計算
      const rsi = this.calculateRSI(pricesOnly, 14);
      
      // MACD計算
      const macd = this.calculateMACD(pricesOnly, 12, 26, 9);
      
      // ボリンジャーバンド計算
      const bollinger = this.calculateBollingerBands(pricesOnly, 20, 2);
      
      // 移動平均線計算
      const movingAverages = this.calculateMovingAverages(pricesOnly);
      
      // ボリューム分析
      const volume = volumes.length > 0 ? this.calculateVolumeAnalysis(volumes) : undefined;

      const indicators: TechnicalIndicatorData = {
        symbol: symbol.toUpperCase(),
        timestamp: latestPrice.timestamp,
        rsi,
        macd,
        bollinger,
        movingAverages,
        volume
      };

      return indicators;
    } catch (error) {
      logger.error('Error calculating technical indicators', {
        symbol,
        pricesCount: prices.length,
        wsError: error
      });
      return null;
    }
  }

  /**
   * RSI計算
   */
  private calculateRSI(prices: number[], period: number = 14): TechnicalIndicatorData['rsi'] | undefined {
    if (prices.length < period + 1) return undefined;

    const gains: number[] = [];
    const losses: number[] = [];

    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }

    if (gains.length < period) return undefined;

    // 最初のRS計算（SMA使用）
    let avgGain = gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period;
    let avgLoss = losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period;

    // 以降はEMA風に計算
    for (let i = period; i < gains.length; i++) {
      avgGain = (avgGain * (period - 1) + gains[i]) / period;
      avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    }

    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    return {
      value: rsi,
      period,
      overbought: rsi >= 70,
      oversold: rsi <= 30
    };
  }

  /**
   * MACD計算
   */
  private calculateMACD(prices: number[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9): TechnicalIndicatorData['macd'] | undefined {
    if (prices.length < slowPeriod + signalPeriod) return undefined;

    // EMA計算ヘルパー
    const calculateEMA = (data: number[], period: number): number[] => {
      const ema: number[] = [];
      const multiplier = 2 / (period + 1);
      
      ema[0] = data[0]; // 最初の値はSMAの代わり
      
      for (let i = 1; i < data.length; i++) {
        ema[i] = (data[i] * multiplier) + (ema[i - 1] * (1 - multiplier));
      }
      
      return ema;
    };

    const fastEMA = calculateEMA(prices, fastPeriod);
    const slowEMA = calculateEMA(prices, slowPeriod);
    
    if (fastEMA.length < slowPeriod || slowEMA.length < slowPeriod) return undefined;

    // MACD線計算
    const macdLine: number[] = [];
    for (let i = slowPeriod - 1; i < fastEMA.length; i++) {
      macdLine.push(fastEMA[i] - slowEMA[i]);
    }

    // Signal線計算
    const signalLine = calculateEMA(macdLine, signalPeriod);
    
    if (macdLine.length < signalPeriod || signalLine.length === 0) return undefined;

    const latestIndex = macdLine.length - 1;
    const signalIndex = signalLine.length - 1;
    
    const macd = macdLine[latestIndex];
    const signal = signalLine[signalIndex];
    const histogram = macd - signal;

    // クロスオーバー検出
    const prevMacd = latestIndex > 0 ? macdLine[latestIndex - 1] : macd;
    const prevSignal = signalIndex > 0 ? signalLine[signalIndex - 1] : signal;
    
    const bullishCrossover = prevMacd <= prevSignal && macd > signal;
    const bearishCrossover = prevMacd >= prevSignal && macd < signal;

    return {
      macd,
      signal,
      histogram,
      fastEMA: fastEMA[fastEMA.length - 1],
      slowEMA: slowEMA[slowEMA.length - 1],
      bullishCrossover,
      bearishCrossover
    };
  }

  /**
   * ボリンジャーバンド計算
   */
  private calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2): TechnicalIndicatorData['bollinger'] | undefined {
    if (prices.length < period) return undefined;

    const recentPrices = prices.slice(-period);
    const sma = recentPrices.reduce((sum, price) => sum + price, 0) / period;
    
    // 標準偏差計算
    const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
    const standardDeviation = Math.sqrt(variance);
    
    const upper = sma + (standardDeviation * stdDev);
    const lower = sma - (standardDeviation * stdDev);
    const currentPrice = prices[prices.length - 1];
    
    // %Bの計算
    const percentB = (currentPrice - lower) / (upper - lower);
    
    // バンド幅の計算
    const bandwidth = (upper - lower) / sma;
    
    // スクイーズの判定（バンド幅が狭い状態）
    const squeeze = bandwidth < 0.1; // 10%以下をスクイーズとする

    return {
      upper,
      middle: sma,
      lower,
      bandwidth,
      percentB,
      squeeze
    };
  }

  /**
   * 移動平均線計算
   */
  private calculateMovingAverages(prices: number[]): NonNullable<TechnicalIndicatorData['movingAverages']> {
    const calculateSMA = (data: number[], period: number): number => {
      if (data.length < period) return 0;
      const recentData = data.slice(-period);
      return recentData.reduce((sum, price) => sum + price, 0) / period;
    };

    const calculateEMA = (data: number[], period: number): number => {
      if (data.length < period) return 0;
      
      const multiplier = 2 / (period + 1);
      let ema = data[0];
      
      for (let i = 1; i < data.length; i++) {
        ema = (data[i] * multiplier) + (ema * (1 - multiplier));
      }
      
      return ema;
    };

    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    const sma200 = calculateSMA(prices, 200);
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);

    // ゴールデンクロス・デッドクロスの判定
    const goldenCross = sma20 > sma50 && sma50 > sma200;
    const deathCross = sma20 < sma50 && sma50 < sma200;

    return {
      sma20,
      sma50,
      sma200,
      ema12,
      ema26,
      goldenCross,
      deathCross
    };
  }

  /**
   * ボリューム分析
   */
  private calculateVolumeAnalysis(volumes: number[]): TechnicalIndicatorData['volume'] | undefined {
    if (volumes.length < 20) return undefined;

    const currentVolume = volumes[volumes.length - 1];
    const recentVolumes = volumes.slice(-20);
    const sma20 = recentVolumes.reduce((sum, vol) => sum + vol, 0) / 20;
    
    // ボリュームスパイクの判定（平均の2倍以上）
    const spike = currentVolume > sma20 * 2;

    return {
      current: currentVolume,
      sma20,
      spike
    };
  }

  /**
   * インジケーターキャッシュを更新
   */
  private updateIndicatorCache(symbol: string, indicators: TechnicalIndicatorData): void {
    const key = symbol.toUpperCase();
    
    if (!this.indicatorCache.has(key)) {
      this.indicatorCache.set(key, []);
    }
    
    const history = this.indicatorCache.get(key)!;
    history.push(indicators);
    
    // 履歴サイズを制限
    if (history.length > this.config.maxHistorySize) {
      history.splice(0, history.length - this.config.maxHistorySize);
    }
  }

  /**
   * 技術指標アラートタイプかチェック
   */
  private isTechnicalAlert(alertType: AlertType): boolean {
    return [
      AlertType.RSI_OVERBOUGHT,
      AlertType.RSI_OVERSOLD,
      AlertType.MACD_CROSSOVER,
      AlertType.BOLLINGER_BREAKOUT,
      AlertType.MA_CROSSOVER
    ].includes(alertType);
  }

  /**
   * 特定シンボルの最新技術指標を取得
   */
  getLatestIndicators(symbol: string): TechnicalIndicatorData | null {
    const history = this.indicatorCache.get(symbol.toUpperCase());
    return history && history.length > 0 ? history[history.length - 1] : null;
  }

  /**
   * キャッシュクリーンアップ
   */
  cleanupCache(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24時間

    for (const [symbol, history] of this.indicatorCache.entries()) {
      const filteredHistory = history.filter(
        indicator => now - indicator.timestamp.getTime() < maxAge
      );
      
      if (filteredHistory.length === 0) {
        this.indicatorCache.delete(symbol);
      } else {
        this.indicatorCache.set(symbol, filteredHistory);
      }
    }

    logger.debug('Technical indicators cache cleanup completed', {
      symbols: this.indicatorCache.size
    });
  }
}
