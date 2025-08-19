// 市場分析専門サービス
import { VoltAgentService } from './volt-agent-service';
import { logger } from '@/lib/monitoring/logger';
import type {
  MarketAnalysisRequest,
  TechnicalSignal,
  PriceTarget,
  MarketContext
} from './types/ai-service-types';

export interface MarketAnalysisResult {
  technicalSignals: TechnicalSignal[];
  fundamentalOutlook: string;
  sentimentAnalysis: {
    score: number;
    sources: string[];
  };
  priceTargets: Record<string, PriceTarget>;
  marketTrend: 'bull' | 'bear' | 'sideways';
  volatilityAssessment: {
    level: 'low' | 'medium' | 'high';
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

export interface SentimentData {
  overallSentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  confidence: number;
  sources: string[];
}

export interface FundamentalData {
  outlook: string;
  keyFactors: string[];
  riskFactors: string[];
  opportunities: string[];
}

export class MarketAnalyzer {
  private voltAgentService: VoltAgentService;

  constructor() {
    this.voltAgentService = new VoltAgentService();
  }

  /**
   * 包括的市場分析実行
   */
  async performMarketAnalysis(request: MarketAnalysisRequest): Promise<MarketAnalysisResult> {
    try {
      logger.info('Starting comprehensive market analysis', {
        userId: request.userId,
        symbols: request.symbols,
        timeframe: request.timeframe
      });

      const [technicalSignals, sentimentData, fundamentalData, priceTargets] = await Promise.allSettled([
        this.analyzeTechnicalSignals(request),
        this.analyzeSentiment(request),
        this.analyzeFundamentals(request),
        this.generatePriceTargets(request)
      ]);

      const result: MarketAnalysisResult = {
        technicalSignals: this.extractTechnicalSignalsResult(technicalSignals),
        fundamentalOutlook: this.extractFundamentalOutlook(fundamentalData),
        sentimentAnalysis: this.extractSentimentAnalysis(sentimentData),
        priceTargets: this.extractPriceTargetsResult(priceTargets, request.symbols),
        marketTrend: this.determineMarketTrend(request.marketContext, technicalSignals),
        volatilityAssessment: this.assessVolatility(request.marketContext, technicalSignals)
      };

      logger.info('Market analysis completed', {
        userId: request.userId,
        signalsCount: result.technicalSignals.length,
        marketTrend: result.marketTrend
      });

      return result;

    } catch (error) {
      logger.error('Market analysis failed', {
        userId: request.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * テクニカル分析実行
   */
  private async analyzeTechnicalSignals(request: MarketAnalysisRequest): Promise<TechnicalSignal[]> {
    try {
      // VoltAgentサービスを使用してテクニカル分析を実行
      const voltAnalysis = await this.voltAgentService.generateTradingSignals({
        symbols: request.symbols,
        timeframe: '1h',
        strategy: request.preferences.tradingStrategy || 'swing',
        riskLevel: request.preferences.riskTolerance,
        marketData: {
          ohlcv: {},
          orderBooks: {},
          indicators: {}
        },
        portfolioContext: {
          currentHoldings: {},
          availableBalance: 0,
          totalPortfolioValue: 0,
          riskBudget: 0.05
        }
      });

      return request.symbols.map((symbol, index) => ({
        symbol,
        signal: this.determineSignal(voltAnalysis, symbol),
        strength: this.calculateSignalStrength(voltAnalysis, symbol),
        indicators: this.extractIndicators(voltAnalysis, symbol)
      }));

    } catch (error) {
      logger.warn('Technical analysis failed, using fallback', { error });
      return this.generateFallbackTechnicalSignals(request.symbols);
    }
  }

  /**
   * センチメント分析実行
   */
  private async analyzeSentiment(request: MarketAnalysisRequest): Promise<SentimentData> {
    try {
      // 市場センチメント分析のロジック
      const fearGreedScore = request.marketContext.fearGreedIndex || 50;
      const newsCount = request.marketContext.news?.length || 0;
      
      let sentimentScore = 0.5; // デフォルトは中立
      
      // Fear & Greed Indexに基づく調整
      if (fearGreedScore > 75) {
        sentimentScore = 0.8; // 貪欲（楽観的）
      } else if (fearGreedScore > 55) {
        sentimentScore = 0.6; // やや楽観的
      } else if (fearGreedScore < 25) {
        sentimentScore = 0.2; // 恐怖（悲観的）
      } else if (fearGreedScore < 45) {
        sentimentScore = 0.4; // やや悲観的
      }

      return {
        overallSentiment: this.classifySentiment(sentimentScore),
        sentimentScore,
        confidence: this.calculateSentimentConfidence(fearGreedScore, newsCount),
        sources: this.getSentimentSources(request.marketContext)
      };

    } catch (error) {
      logger.warn('Sentiment analysis failed, using neutral', { error });
      return {
        overallSentiment: 'neutral',
        sentimentScore: 0.5,
        confidence: 0.5,
        sources: ['Market Data']
      };
    }
  }

  /**
   * ファンダメンタル分析実行
   */
  private async analyzeFundamentals(request: MarketAnalysisRequest): Promise<FundamentalData> {
    try {
      // ファンダメンタル分析のロジック
      const marketTrend = request.marketContext.marketTrend || 'sideways';
      const volatilityIndex = request.marketContext.volatilityIndex || 50;

      let outlook = '';
      let keyFactors: string[] = [];
      let riskFactors: string[] = [];
      let opportunities: string[] = [];

      // 市場トレンドに基づく分析
      switch (marketTrend) {
        case 'bull':
          outlook = '市場は強気トレンドを維持しており、上昇の継続が期待されます。';
          keyFactors = ['強気のモメンタム', '取引量の増加', '機関投資家の参入'];
          opportunities = ['成長銘柄への投資機会', 'アルトコインの選別投資'];
          break;
        case 'bear':
          outlook = '市場は弱気トレンドにあり、慎重な投資戦略が必要です。';
          keyFactors = ['下降トレンド', 'リスク回避の動き', '流動性の低下'];
          riskFactors = ['さらなる下落リスク', '流動性不足'];
          break;
        default:
          outlook = '市場は横ばいトレンドで、方向性を見極める段階です。';
          keyFactors = ['レンジ相場', '不確実性の高まり', '様子見の姿勢'];
          break;
      }

      // ボラティリティに基づく追加分析
      if (volatilityIndex > 70) {
        riskFactors.push('高ボラティリティ環境', '価格変動の激化');
      } else if (volatilityIndex < 30) {
        keyFactors.push('安定した価格推移', '低リスク環境');
      }

      return {
        outlook,
        keyFactors,
        riskFactors,
        opportunities
      };

    } catch (error) {
      logger.warn('Fundamental analysis failed, using default', { error });
      return {
        outlook: '市場分析を継続中です。最新のデータに基づく分析をお待ちください。',
        keyFactors: ['市場動向の監視が必要'],
        riskFactors: ['不確実性'],
        opportunities: ['長期投資機会の探索']
      };
    }
  }

  /**
   * 価格目標生成
   */
  private async generatePriceTargets(request: MarketAnalysisRequest): Promise<Record<string, PriceTarget>> {
    try {
      const targets: Record<string, PriceTarget> = {};

      for (const symbol of request.symbols) {
        try {
          const prediction = await this.voltAgentService.generatePrediction({
            symbol,
            horizon: ((): '1h' | '4h' | '24h' | '7d' | '30d' => {
              const map: Record<string, '1h' | '4h' | '24h' | '7d' | '30d'> = {
                '1h': '1h', '4h': '4h', '24h': '24h', '1d': '24h', '7d': '7d', '30d': '30d'
              }
              return map[String(request.timeframe)] || '24h'
            })(),
            features: {
              technical: {},
              fundamental: {},
              sentiment: {},
              macroeconomic: {},
              onchain: {}
            },
            modelEnsemble: ['lstm', 'transformer', 'ensemble'],
            confidenceThreshold: 0.7
          });

          const basePrice = prediction?.predictions?.price?.value || this.getEstimatedCurrentPrice(symbol);
          targets[symbol] = {
            short: basePrice * (1 + this.getShortTermAdjustment(request.preferences.riskTolerance)),
            medium: basePrice * (1 + this.getMediumTermAdjustment(request.preferences.riskTolerance)),
            long: basePrice * (1 + this.getLongTermAdjustment(request.preferences.riskTolerance)),
            confidence: prediction?.predictions?.price?.confidence || 0.6
          };

        } catch (error) {
          logger.warn(`Price target generation failed for ${symbol}`, { error });
          targets[symbol] = this.generateFallbackPriceTarget(symbol);
        }
      }

      return targets;

    } catch (error) {
      logger.warn('Price targets generation failed, using fallback', { error });
      return this.generateFallbackPriceTargets(request.symbols);
    }
  }

  // ヘルパーメソッド
  private extractTechnicalSignalsResult(result: PromiseSettledResult<TechnicalSignal[]>): TechnicalSignal[] {
    return result.status === 'fulfilled' ? result.value : [];
  }

  private extractFundamentalOutlook(result: PromiseSettledResult<FundamentalData>): string {
    return result.status === 'fulfilled' ? result.value.outlook : '市場分析を継続中です。';
  }

  private extractSentimentAnalysis(result: PromiseSettledResult<SentimentData>): { score: number; sources: string[] } {
    if (result.status === 'fulfilled') {
      return {
        score: result.value.sentimentScore,
        sources: result.value.sources
      };
    }
    return {
      score: 0.5,
      sources: ['Market Data']
    };
  }

  private extractPriceTargetsResult(
    result: PromiseSettledResult<Record<string, PriceTarget>>,
    symbols: string[]
  ): Record<string, PriceTarget> {
    return result.status === 'fulfilled' ? result.value : this.generateFallbackPriceTargets(symbols);
  }

  private determineSignal(voltAnalysis: unknown, symbol: string): 'buy' | 'sell' | 'hold' {
    // VoltAgent結果からシグナルを判定
    return 'hold'; // デフォルト
  }

  private calculateSignalStrength(voltAnalysis: unknown, symbol: string): number {
    // シグナルの強度を計算
    return 0.5; // デフォルト
  }

  private extractIndicators(voltAnalysis: unknown, symbol: string): Record<string, number | string> {
    // インジケーター値を抽出
    return {};
  }

  private classifySentiment(score: number): 'positive' | 'negative' | 'neutral' {
    if (score > 0.6) return 'positive';
    if (score < 0.4) return 'negative';
    return 'neutral';
  }

  private calculateSentimentConfidence(fearGreedScore: number, newsCount: number): number {
    // データの質と量に基づいて信頼度を計算
    let confidence = 0.5;
    if (fearGreedScore > 0) confidence += 0.2;
    if (newsCount > 0) confidence += Math.min(newsCount * 0.1, 0.3);
    return Math.min(confidence, 1.0);
  }

  private getSentimentSources(marketContext: MarketContext): string[] {
    const sources = ['Market Data'];
    if (marketContext.fearGreedIndex) sources.push('Fear & Greed Index');
    if (marketContext.news && marketContext.news.length > 0) sources.push('News Analysis');
    return sources;
  }

  private determineMarketTrend(
    marketContext: MarketContext,
    technicalSignals: PromiseSettledResult<TechnicalSignal[]>
  ): 'bull' | 'bear' | 'sideways' {
    return marketContext.marketTrend || 'sideways';
  }

  private assessVolatility(
    marketContext: MarketContext,
    technicalSignals: PromiseSettledResult<TechnicalSignal[]>
  ): { level: 'low' | 'medium' | 'high'; trend: 'increasing' | 'decreasing' | 'stable' } {
    const volatilityIndex = marketContext.volatilityIndex || 50;
    let level: 'low' | 'medium' | 'high' = 'medium';
    
    if (volatilityIndex > 70) level = 'high';
    else if (volatilityIndex < 30) level = 'low';

    return {
      level,
      trend: 'stable' // 簡易実装
    };
  }

  private generateFallbackTechnicalSignals(symbols: string[]): TechnicalSignal[] {
    return symbols.map(symbol => ({
      symbol,
      signal: 'hold' as const,
      strength: 0.5,
      indicators: {}
    }));
  }

  private getEstimatedCurrentPrice(symbol: string): number {
    // 簡易的な価格推定（実際の実装では市場データAPIを使用）
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

  private getShortTermAdjustment(riskTolerance: string): number {
    switch (riskTolerance) {
      case 'aggressive': return 0.1;
      case 'moderate': return 0.05;
      case 'conservative': return 0.02;
      default: return 0.05;
    }
  }

  private getMediumTermAdjustment(riskTolerance: string): number {
    switch (riskTolerance) {
      case 'aggressive': return 0.25;
      case 'moderate': return 0.15;
      case 'conservative': return 0.08;
      default: return 0.15;
    }
  }

  private getLongTermAdjustment(riskTolerance: string): number {
    switch (riskTolerance) {
      case 'aggressive': return 0.5;
      case 'moderate': return 0.3;
      case 'conservative': return 0.15;
      default: return 0.3;
    }
  }

  private generateFallbackPriceTarget(symbol: string): PriceTarget {
    const basePrice = this.getEstimatedCurrentPrice(symbol);
    return {
      short: basePrice * 1.05,
      medium: basePrice * 1.15,
      long: basePrice * 1.3,
      confidence: 0.5
    };
  }

  private generateFallbackPriceTargets(symbols: string[]): Record<string, PriceTarget> {
    return symbols.reduce((acc, symbol) => ({
      ...acc,
      [symbol]: this.generateFallbackPriceTarget(symbol)
    }), {});
  }
}
