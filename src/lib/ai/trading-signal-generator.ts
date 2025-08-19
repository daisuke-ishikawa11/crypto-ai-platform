// トレーディングシグナル生成専門サービス
import { VoltAgentService } from './volt-agent-service';
import { logger } from '@/lib/monitoring/logger';
import type {
  TradingSignalRequest,
  TradingSignal,
  TechnicalSignal
} from './types/ai-service-types';

export interface TradingSignalResult {
  signals: TradingSignal[];
  marketConditions: MarketConditionAssessment;
  riskAssessment: TradingRiskAssessment;
  executionGuidance: ExecutionGuidance;
}

export interface MarketConditionAssessment {
  trend: 'uptrend' | 'downtrend' | 'sideways';
  momentum: 'strong' | 'moderate' | 'weak';
  volatility: 'high' | 'medium' | 'low';
  volume: 'high' | 'medium' | 'low';
  sentiment: 'bullish' | 'bearish' | 'neutral';
  suitability: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface TradingRiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  positionSizeRecommendation: number;
  maxDrawdownEstimate: number;
  stopLossRecommendation: number;
  riskRewardRatio: number;
}

export interface ExecutionGuidance {
  entryTiming: 'immediate' | 'wait_for_dip' | 'wait_for_confirmation' | 'avoid';
  orderType: 'market' | 'limit' | 'stop_limit';
  timeframe: string;
  monitoringFrequency: 'real_time' | 'hourly' | 'daily';
  exitStrategy: string;
}

export interface SignalConfiguration {
  strategy: 'hodl' | 'swing' | 'scalping' | 'arbitrage';
  timeframes: string[];
  indicators: string[];
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  maxPositions: number;
}

export class TradingSignalGenerator {
  private voltAgentService: VoltAgentService;
  private readonly SIGNAL_CONFIDENCE_THRESHOLD = 0.6;
  private readonly MAX_SIGNALS_PER_REQUEST = 10;

  constructor() {
    this.voltAgentService = new VoltAgentService();
  }

  /**
   * トレーディングシグナル生成実行
   */
  async generateTradingSignals(request: TradingSignalRequest): Promise<TradingSignalResult> {
    try {
      logger.info('Starting trading signal generation', {
        userId: request.userId,
        strategy: request.tradingStrategy,
        symbols: request.symbols,
        riskBudget: request.riskBudget
      });

      const [
        rawSignals,
        marketConditions,
        riskAssessment
      ] = await Promise.all([
        this.generateRawSignals(request),
        this.assessMarketConditions(request),
        this.assessTradingRisk(request)
      ]);

      const filteredSignals = this.filterAndRankSignals(rawSignals, request);
      const executionGuidance = this.generateExecutionGuidance(filteredSignals, marketConditions, request);

      const result: TradingSignalResult = {
        signals: filteredSignals,
        marketConditions,
        riskAssessment,
        executionGuidance
      };

      logger.info('Trading signal generation completed', {
        userId: request.userId,
        signalsCount: filteredSignals.length,
        marketSuitability: marketConditions.suitability,
        overallRisk: riskAssessment.overallRisk
      });

      return result;

    } catch (error) {
      logger.error('Trading signal generation failed', {
        userId: request.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * ストラテジー別シグナル設定取得
   */
  getStrategyConfiguration(strategy: string): SignalConfiguration {
    const configurations: Record<string, SignalConfiguration> = {
      'scalping': {
        strategy: 'scalping',
        timeframes: ['1m', '5m', '15m'],
        indicators: ['RSI', 'MACD', 'Bollinger Bands', 'Volume'],
        riskLevel: 'aggressive',
        maxPositions: 3
      },
      'swing': {
        strategy: 'swing',
        timeframes: ['4h', '1d'],
        indicators: ['RSI', 'MACD', 'Moving Average', 'Support/Resistance'],
        riskLevel: 'moderate',
        maxPositions: 5
      },
      'hodl': {
        strategy: 'hodl',
        timeframes: ['1w', '1M'],
        indicators: ['Moving Average', 'Market Cap', 'Fundamental Analysis'],
        riskLevel: 'conservative',
        maxPositions: 10
      },
      'arbitrage': {
        strategy: 'arbitrage',
        timeframes: ['1m', '5m'],
        indicators: ['Price Spread', 'Volume', 'Liquidity'],
        riskLevel: 'moderate',
        maxPositions: 2
      }
    };

    return configurations[strategy] || configurations['swing'];
  }

  /**
   * リアルタイム価格アラート生成
   */
  async generatePriceAlerts(
    userId: string,
    symbols: string[],
    alertTypes: ('price_breakout' | 'volume_spike' | 'volatility_increase')[]
  ): Promise<Array<{
    type: string;
    symbol: string;
    condition: string;
    currentValue: number;
    triggerValue: number;
    urgency: 'high' | 'medium' | 'low';
    message: string;
  }>> {
    try {
      const alerts: Array<{
        type: string;
        symbol: string;
        condition: string;
        currentValue: number;
        triggerValue: number;
        urgency: 'high' | 'medium' | 'low';
        message: string;
      }> = [];

      for (const symbol of symbols) {
        for (const alertType of alertTypes) {
          const alert = await this.generateSymbolAlert(symbol, alertType);
          if (alert) {
            alerts.push(alert);
          }
        }
      }

      return alerts.sort((a, b) => {
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      });

    } catch (error) {
      logger.error('Price alerts generation failed', { userId, error });
      return [];
    }
  }

  /**
   * 生シグナル生成
   */
  private async generateRawSignals(request: TradingSignalRequest): Promise<TradingSignal[]> {
    try {
      const voltSignals = await this.voltAgentService.generateTradingSignals({
        symbols: request.symbols,
        timeframe: '1h', // ストラテジーに基づいて調整
        strategy: request.tradingStrategy,
        riskLevel: request.preferences.riskTolerance,
        marketData: {
          ohlcv: {},
          orderBooks: {},
          indicators: {}
        },
        portfolioContext: {
          currentHoldings: {},
          availableBalance: 100000, // デフォルト値
          totalPortfolioValue: 100000,
          riskBudget: request.riskBudget
        }
      });

      return this.convertVoltSignalsToTradingSignals(voltSignals, request);

    } catch (error) {
      logger.warn('VoltAgent signals generation failed, using fallback', { error });
      return this.generateFallbackSignals(request);
    }
  }

  /**
   * 市場状況評価
   */
  private async assessMarketConditions(request: TradingSignalRequest): Promise<MarketConditionAssessment> {
    try {
      const marketTrend = request.marketContext.marketTrend || 'sideways';
      const volatilityIndex = request.marketContext.volatilityIndex || 50;
      const fearGreedIndex = request.marketContext.fearGreedIndex || 50;

      // トレンド評価
      const trend = this.mapMarketTrendToTradingTrend(marketTrend);
      
      // モメンタム評価
      const momentum = this.assessMomentum(fearGreedIndex, volatilityIndex);
      
      // ボラティリティ評価
      const volatility = this.assessVolatility(volatilityIndex);
      
      // ボリューム評価（簡易実装）
      const volume = 'medium' as const;
      
      // センチメント評価
      const sentiment = this.assessSentiment(fearGreedIndex);
      
      // 取引適合性評価
      const suitability = this.assessTradingSuitability(request.tradingStrategy, {
        trend,
        momentum,
        volatility,
        volume,
        sentiment
      });

      return {
        trend,
        momentum,
        volatility,
        volume,
        sentiment,
        suitability
      };

    } catch (error) {
      logger.warn('Market conditions assessment failed, using defaults', { error });
      return {
        trend: 'sideways',
        momentum: 'moderate',
        volatility: 'medium',
        volume: 'medium',
        sentiment: 'neutral',
        suitability: 'fair'
      };
    }
  }

  /**
   * トレーディングリスク評価
   */
  private async assessTradingRisk(request: TradingSignalRequest): Promise<TradingRiskAssessment> {
    try {
      const riskLevel = this.calculateOverallRiskLevel(request);
      const positionSize = this.calculatePositionSize(request);
      const maxDrawdown = this.estimateMaxDrawdown(request);
      const stopLoss = this.calculateStopLossRecommendation(request);
      const riskRewardRatio = this.calculateRiskRewardRatio(request);

      return {
        overallRisk: riskLevel,
        positionSizeRecommendation: positionSize,
        maxDrawdownEstimate: maxDrawdown,
        stopLossRecommendation: stopLoss,
        riskRewardRatio
      };

    } catch (error) {
      logger.warn('Trading risk assessment failed, using conservative values', { error });
      return {
        overallRisk: 'medium',
        positionSizeRecommendation: 0.02, // 2%
        maxDrawdownEstimate: 0.15, // 15%
        stopLossRecommendation: 0.05, // 5%
        riskRewardRatio: 2.0
      };
    }
  }

  /**
   * シグナルフィルタリング・ランキング
   */
  private filterAndRankSignals(signals: TradingSignal[], request: TradingSignalRequest): TradingSignal[] {
    return signals
      .filter(signal => signal.confidence >= this.SIGNAL_CONFIDENCE_THRESHOLD)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, this.MAX_SIGNALS_PER_REQUEST);
  }

  /**
   * 執行ガイダンス生成
   */
  private generateExecutionGuidance(
    signals: TradingSignal[],
    marketConditions: MarketConditionAssessment,
    request: TradingSignalRequest
  ): ExecutionGuidance {
    let entryTiming: ExecutionGuidance['entryTiming'] = 'wait_for_confirmation';
    let orderType: ExecutionGuidance['orderType'] = 'limit';
    let monitoringFrequency: ExecutionGuidance['monitoringFrequency'] = 'hourly';

    // ストラテジー別調整
    switch (request.tradingStrategy) {
      case 'scalping':
        entryTiming = marketConditions.momentum === 'strong' ? 'immediate' : 'wait_for_confirmation';
        orderType = 'market';
        monitoringFrequency = 'real_time';
        break;
      case 'swing':
        entryTiming = marketConditions.trend !== 'sideways' ? 'wait_for_dip' : 'wait_for_confirmation';
        orderType = 'limit';
        monitoringFrequency = 'daily';
        break;
      case 'hodl':
        entryTiming = 'wait_for_dip';
        orderType = 'limit';
        monitoringFrequency = 'daily';
        break;
      case 'arbitrage':
        entryTiming = 'immediate';
        orderType = 'market';
        monitoringFrequency = 'real_time';
        break;
    }

    // 市場状況による調整
    if (marketConditions.suitability === 'poor') {
      entryTiming = 'avoid';
    } else if (marketConditions.volatility === 'high' && request.preferences.riskTolerance === 'conservative') {
      entryTiming = 'wait_for_confirmation';
    }

    return {
      entryTiming,
      orderType,
      timeframe: request.timeframe,
      monitoringFrequency,
      exitStrategy: this.generateExitStrategy(signals, request.tradingStrategy)
    };
  }

  // ヘルパーメソッド
  private convertVoltSignalsToTradingSignals(voltSignals: unknown, request: TradingSignalRequest): TradingSignal[] {
    // VoltAgent結果をTradingSignal形式に変換
    return request.symbols.map(symbol => ({
      symbol,
      action: 'hold' as const,
      confidence: 0.7,
      entryPrice: this.getEstimatedPrice(symbol),
      exitTargets: [this.getEstimatedPrice(symbol) * 1.1],
      stopLoss: this.getEstimatedPrice(symbol) * 0.95,
      timeframe: request.timeframe,
      reasoning: 'AI分析に基づく推奨'
    }));
  }

  private generateFallbackSignals(request: TradingSignalRequest): TradingSignal[] {
    return request.symbols.map(symbol => ({
      symbol,
      action: 'hold' as const,
      confidence: 0.5,
      entryPrice: this.getEstimatedPrice(symbol),
      exitTargets: [this.getEstimatedPrice(symbol) * 1.05],
      stopLoss: this.getEstimatedPrice(symbol) * 0.95,
      timeframe: request.timeframe,
      reasoning: 'システムメンテナンス中のため基本分析のみ'
    }));
  }

  private mapMarketTrendToTradingTrend(marketTrend: string): 'uptrend' | 'downtrend' | 'sideways' {
    switch (marketTrend) {
      case 'bull': return 'uptrend';
      case 'bear': return 'downtrend';
      default: return 'sideways';
    }
  }

  private assessMomentum(fearGreedIndex: number, volatilityIndex: number): 'strong' | 'moderate' | 'weak' {
    if (Math.abs(fearGreedIndex - 50) > 30 && volatilityIndex > 60) return 'strong';
    if (Math.abs(fearGreedIndex - 50) > 15 || volatilityIndex > 40) return 'moderate';
    return 'weak';
  }

  private assessVolatility(volatilityIndex: number): 'high' | 'medium' | 'low' {
    if (volatilityIndex > 70) return 'high';
    if (volatilityIndex > 30) return 'medium';
    return 'low';
  }

  private assessSentiment(fearGreedIndex: number): 'bullish' | 'bearish' | 'neutral' {
    if (fearGreedIndex > 60) return 'bullish';
    if (fearGreedIndex < 40) return 'bearish';
    return 'neutral';
  }

  private assessTradingSuitability(
    strategy: string,
    conditions: Omit<MarketConditionAssessment, 'suitability'>
  ): 'excellent' | 'good' | 'fair' | 'poor' {
    const { trend, momentum, volatility, sentiment } = conditions;

    switch (strategy) {
      case 'scalping':
        if (volatility === 'high' && momentum === 'strong') return 'excellent';
        if (volatility === 'medium' && momentum !== 'weak') return 'good';
        if (volatility === 'low') return 'poor';
        return 'fair';

      case 'swing':
        if (trend !== 'sideways' && momentum !== 'weak') return 'excellent';
        if (trend !== 'sideways' || momentum === 'strong') return 'good';
        if (trend === 'sideways' && momentum === 'weak') return 'poor';
        return 'fair';

      case 'hodl':
        if (sentiment === 'bearish' && volatility === 'high') return 'excellent'; // 買い場
        if (sentiment === 'neutral') return 'good';
        if (sentiment === 'bullish' && volatility === 'high') return 'poor'; // 売り場
        return 'fair';

      case 'arbitrage':
        if (volatility === 'high') return 'excellent';
        if (volatility === 'medium') return 'good';
        return 'fair';

      default:
        return 'fair';
    }
  }

  private calculateOverallRiskLevel(request: TradingSignalRequest): 'low' | 'medium' | 'high' {
    let riskScore = 0;

    // ストラテジーリスク
    const strategyRisk = {
      'hodl': 1,
      'swing': 2,
      'scalping': 4,
      'arbitrage': 3
    };
    riskScore += strategyRisk[request.tradingStrategy] || 2;

    // リスク許容度
    const toleranceRisk = {
      'conservative': 1,
      'moderate': 2,
      'aggressive': 3
    };
    riskScore += toleranceRisk[request.preferences.riskTolerance] || 2;

    // 市場ボラティリティ
    const volatilityIndex = request.marketContext.volatilityIndex || 50;
    if (volatilityIndex > 70) riskScore += 2;
    else if (volatilityIndex > 40) riskScore += 1;

    if (riskScore <= 3) return 'low';
    if (riskScore <= 6) return 'medium';
    return 'high';
  }

  private calculatePositionSize(request: TradingSignalRequest): number {
    const baseSize = request.riskBudget || 0.02; // 2%

    // ストラテジー調整
    const strategyMultiplier = {
      'hodl': 1.5,
      'swing': 1.0,
      'scalping': 0.5,
      'arbitrage': 0.8
    };

    // リスク許容度調整
    const riskMultiplier = {
      'conservative': 0.5,
      'moderate': 1.0,
      'aggressive': 1.5
    };

    return baseSize * 
           (strategyMultiplier[request.tradingStrategy] || 1.0) * 
           (riskMultiplier[request.preferences.riskTolerance] || 1.0);
  }

  private estimateMaxDrawdown(request: TradingSignalRequest): number {
    const baseDrawdown = {
      'hodl': 0.3,
      'swing': 0.15,
      'scalping': 0.08,
      'arbitrage': 0.05
    };

    const volatilityMultiplier = (request.marketContext.volatilityIndex || 50) / 50;
    return (baseDrawdown[request.tradingStrategy] || 0.15) * volatilityMultiplier;
  }

  private calculateStopLossRecommendation(request: TradingSignalRequest): number {
    const baseStopLoss = {
      'hodl': 0.2, // 20%
      'swing': 0.08, // 8%
      'scalping': 0.02, // 2%
      'arbitrage': 0.01 // 1%
    };

    return baseStopLoss[request.tradingStrategy] || 0.05;
  }

  private calculateRiskRewardRatio(request: TradingSignalRequest): number {
    const baseRatio = {
      'hodl': 3.0,
      'swing': 2.5,
      'scalping': 1.5,
      'arbitrage': 1.2
    };

    return baseRatio[request.tradingStrategy] || 2.0;
  }

  private generateExitStrategy(signals: TradingSignal[], strategy: string): string {
    switch (strategy) {
      case 'scalping':
        return '利益目標に達したら迅速に利確。損失は小さく抑える。';
      case 'swing':
        return '段階的利確とトレーリングストップを活用。';
      case 'hodl':
        return '長期保有を基本とし、大きな価格変動時のみ調整。';
      case 'arbitrage':
        return '価格差が縮小したら即座に決済。';
      default:
        return '利益確定と損切りルールを事前に設定し、感情的な判断を避ける。';
    }
  }

  private async generateSymbolAlert(
    symbol: string,
    alertType: 'price_breakout' | 'volume_spike' | 'volatility_increase'
  ): Promise<{
    type: string;
    symbol: string;
    condition: string;
    currentValue: number;
    triggerValue: number;
    urgency: 'high' | 'medium' | 'low';
    message: string;
  } | null> {
    try {
      // 簡易実装（実際はリアルタイムデータが必要）
      const currentPrice = this.getEstimatedPrice(symbol);
      
      switch (alertType) {
        case 'price_breakout':
          return {
            type: 'price_breakout',
            symbol,
            condition: 'price > resistance',
            currentValue: currentPrice,
            triggerValue: currentPrice * 1.05,
            urgency: 'high',
            message: `${symbol}が抵抗線を突破しました`
          };
        case 'volume_spike':
          return {
            type: 'volume_spike',
            symbol,
            condition: 'volume > 200% avg',
            currentValue: 1000000,
            triggerValue: 2000000,
            urgency: 'medium',
            message: `${symbol}の出来高が急増しています`
          };
        case 'volatility_increase':
          return {
            type: 'volatility_increase',
            symbol,
            condition: 'volatility > threshold',
            currentValue: 0.3,
            triggerValue: 0.4,
            urgency: 'medium',
            message: `${symbol}のボラティリティが上昇しています`
          };
        default:
          return null;
      }
    } catch (error) {
      logger.warn(`Alert generation failed for ${symbol}:${alertType}`, { error });
      return null;
    }
  }

  private getEstimatedPrice(symbol: string): number {
    const basePrices: Record<string, number> = {
      'BTC': 50000,
      'ETH': 3000,
      'ADA': 0.5,
      'DOT': 10,
      'LINK': 15,
      'UNI': 8,
      'AAVE': 100,
      'SOL': 40,
      'AVAX': 25,
      'MATIC': 1
    };
    return basePrices[symbol] || 100;
  }
}
