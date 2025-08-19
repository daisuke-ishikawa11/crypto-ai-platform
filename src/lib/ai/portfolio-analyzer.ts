// ポートフォリオ分析専門サービス
import { logger } from '@/lib/monitoring/logger';
import type {
  PortfolioAnalysisRequest,
  Portfolio,
  OptimizationSuggestion,
  RebalanceRecommendation,
  RiskMetrics
} from './types/ai-service-types';

export interface PortfolioAnalysisResult {
  currentRisk: number;
  diversificationScore: number;
  optimizationSuggestions: OptimizationSuggestion[];
  rebalanceRecommendations: RebalanceRecommendation[];
  performanceMetrics: PortfolioPerformanceMetrics;
  allocationAnalysis: AllocationAnalysis;
  correlationMatrix: Record<string, Record<string, number>>;
}

export interface PortfolioPerformanceMetrics {
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  beta: number;
}

export interface AllocationAnalysis {
  currentAllocations: Record<string, number>;
  recommendedAllocations: Record<string, number>;
  allocationDeviation: number;
  concentrationRisk: number;
}

export interface PortfolioHealthScore {
  overall: number;
  diversification: number;
  riskAdjustedReturn: number;
  liquidityScore: number;
  correlationScore: number;
}

export class PortfolioAnalyzer {
  private readonly CORRELATION_THRESHOLD = 0.7;
  private readonly MAX_SINGLE_ASSET_ALLOCATION = 0.4;
  private readonly MIN_DIVERSIFICATION_ASSETS = 5;

  constructor() {}

  /**
   * 包括的ポートフォリオ分析実行
   */
  async performPortfolioAnalysis(request: PortfolioAnalysisRequest): Promise<PortfolioAnalysisResult> {
    try {
      logger.info('Starting comprehensive portfolio analysis', {
        userId: request.userId,
        totalValue: request.portfolio.totalValue,
        assetsCount: request.portfolio.assets.length
      });

      const [
        riskMetrics,
        diversificationScore,
        optimizationSuggestions,
        rebalanceRecommendations,
        performanceMetrics,
        allocationAnalysis,
        correlationMatrix
      ] = await Promise.all([
        this.calculateRiskMetrics(request.portfolio),
        this.calculateDiversificationScore(request.portfolio),
        this.generateOptimizationSuggestions(request),
        this.generateRebalanceRecommendations(request),
        this.calculatePerformanceMetrics(request.portfolio),
        this.analyzeAllocation(request.portfolio, request.preferences),
        this.calculateCorrelationMatrix(request.portfolio)
      ]);

      const result: PortfolioAnalysisResult = {
        currentRisk: riskMetrics.portfolioVar,
        diversificationScore,
        optimizationSuggestions,
        rebalanceRecommendations,
        performanceMetrics,
        allocationAnalysis,
        correlationMatrix
      };

      logger.info('Portfolio analysis completed', {
        userId: request.userId,
        riskLevel: this.categorizeRisk(riskMetrics.portfolioVar),
        diversificationScore,
        suggestionCount: optimizationSuggestions.length
      });

      return result;

    } catch (error) {
      logger.error('Portfolio analysis failed', {
        userId: request.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * ポートフォリオヘルススコア計算
   */
  async calculatePortfolioHealthScore(portfolio: Portfolio): Promise<PortfolioHealthScore> {
    try {
      const diversificationScore = await this.calculateDiversificationScore(portfolio);
      const riskMetrics = await this.calculateRiskMetrics(portfolio);
      const correlationMatrix = await this.calculateCorrelationMatrix(portfolio);
      
      const liquidityScore = this.calculateLiquidityScore(portfolio);
      const correlationScore = this.calculateCorrelationScore(correlationMatrix);
      const riskAdjustedReturn = this.calculateRiskAdjustedReturn(portfolio);

      const overall = (
        diversificationScore * 0.25 +
        riskAdjustedReturn * 0.3 +
        liquidityScore * 0.2 +
        correlationScore * 0.25
      );

      return {
        overall,
        diversification: diversificationScore,
        riskAdjustedReturn,
        liquidityScore,
        correlationScore
      };

    } catch (error) {
      logger.error('Portfolio health score calculation failed', { error });
      return {
        overall: 0.5,
        diversification: 0.5,
        riskAdjustedReturn: 0.5,
        liquidityScore: 0.5,
        correlationScore: 0.5
      };
    }
  }

  /**
   * リスクメトリクス計算
   */
  private async calculateRiskMetrics(portfolio: Portfolio): Promise<RiskMetrics> {
    try {
      // ポートフォリオのVaR（Value at Risk）計算
      const portfolioVar = this.calculatePortfolioVaR(portfolio);
      
      // 最大ドローダウン計算
      const maxDrawdown = this.calculateMaxDrawdown(portfolio);
      
      // 相関リスク計算
      const correlationRisk = this.calculateCorrelationRisk(portfolio);
      
      // 流動性リスク計算
      const liquidityRisk = this.calculateLiquidityRisk(portfolio);

      return {
        portfolioVar,
        maxDrawdown,
        correlationRisk,
        liquidityRisk
      };

    } catch (error) {
      logger.warn('Risk metrics calculation failed, using defaults', { error });
      return {
        portfolioVar: 0.15,
        maxDrawdown: 0.2,
        correlationRisk: 0.3,
        liquidityRisk: 0.25
      };
    }
  }

  /**
   * 分散化スコア計算
   */
  private async calculateDiversificationScore(portfolio: Portfolio): Promise<number> {
    try {
      const assetsCount = portfolio.assets.length;
      const totalValue = portfolio.totalValue;
      
      if (assetsCount === 0 || totalValue === 0) return 0;

      // アセット数による基本スコア
      let score = Math.min(assetsCount / this.MIN_DIVERSIFICATION_ASSETS, 1) * 0.4;

      // 集中度リスクの評価
      const maxAllocation = Math.max(...portfolio.assets.map(asset => asset.allocation));
      const concentrationPenalty = maxAllocation > this.MAX_SINGLE_ASSET_ALLOCATION ? 
        (maxAllocation - this.MAX_SINGLE_ASSET_ALLOCATION) * 0.5 : 0;
      
      score -= concentrationPenalty;

      // ハーフィンダル・ハーシュマン指数による分散評価
      const hhi = portfolio.assets.reduce((sum, asset) => sum + Math.pow(asset.allocation, 2), 0);
      const normalizedHHI = (1 - hhi) * 0.6; // HHIが低いほど分散されている
      
      score += normalizedHHI;

      return Math.max(0, Math.min(1, score));

    } catch (error) {
      logger.warn('Diversification score calculation failed', { error });
      return 0.5;
    }
  }

  /**
   * 最適化提案生成
   */
  private async generateOptimizationSuggestions(request: PortfolioAnalysisRequest): Promise<OptimizationSuggestion[]> {
    try {
      const suggestions: OptimizationSuggestion[] = [];
      const portfolio = request.portfolio;

      // 集中度リスクのチェック
      portfolio.assets.forEach(asset => {
        if (asset.allocation > this.MAX_SINGLE_ASSET_ALLOCATION) {
          suggestions.push({
            action: `${asset.symbol}の保有比率を削減`,
            symbol: asset.symbol,
            reasoning: `単一銘柄の集中度が${(asset.allocation * 100).toFixed(1)}%と高すぎます。リスク分散のため${(this.MAX_SINGLE_ASSET_ALLOCATION * 100)}%以下にすることを推奨します。`,
            priority: 3
          });
        }
      });

      // 少額保有のチェック
      portfolio.assets.forEach(asset => {
        if (asset.allocation < 0.02 && asset.value < portfolio.totalValue * 0.01) {
          suggestions.push({
            action: `${asset.symbol}の少額ポジションを統合`,
            symbol: asset.symbol,
            reasoning: `${asset.symbol}の保有額が全体の${(asset.allocation * 100).toFixed(2)}%と少額です。取引コストを考慮して他の銘柄に統合することを検討してください。`,
            priority: 1
          });
        }
      });

      // 分散化の提案
      if (portfolio.assets.length < this.MIN_DIVERSIFICATION_ASSETS) {
        suggestions.push({
          action: 'ポートフォリオの分散化',
          symbol: 'PORTFOLIO',
          reasoning: `現在${portfolio.assets.length}銘柄のみの保有です。リスク分散のため${this.MIN_DIVERSIFICATION_ASSETS}銘柄以上への分散を推奨します。`,
          priority: 2
        });
      }

      // リスク許容度に基づく提案
      if (request.preferences.riskTolerance === 'conservative') {
        portfolio.assets.forEach(asset => {
          if (this.isHighRiskAsset(asset.symbol) && asset.allocation > 0.1) {
            suggestions.push({
              action: `${asset.symbol}のリスク調整`,
              symbol: asset.symbol,
              reasoning: `保守的な投資方針に対して${asset.symbol}の保有比率が高めです。リスクを抑えるため保有比率の削減を検討してください。`,
              priority: 2
            });
          }
        });
      }

      return suggestions.sort((a, b) => b.priority - a.priority);

    } catch (error) {
      logger.warn('Optimization suggestions generation failed', { error });
      return [];
    }
  }

  /**
   * リバランス推奨生成
   */
  private async generateRebalanceRecommendations(request: PortfolioAnalysisRequest): Promise<RebalanceRecommendation[]> {
    try {
      const portfolio = request.portfolio;
      const recommendations: RebalanceRecommendation[] = [];

      // 理想的な配分を計算
      const idealAllocations = this.calculateIdealAllocations(portfolio, request.preferences);

      portfolio.assets.forEach(asset => {
        const currentAllocation = asset.allocation;
        const recommendedAllocation = idealAllocations[asset.symbol] || currentAllocation;
        
        const threshold = 0.05; // 5%の閾値
        const deviation = Math.abs(currentAllocation - recommendedAllocation);
        
        if (deviation > threshold) {
          const action = currentAllocation > recommendedAllocation ? 'sell' : 'buy';
          const amount = Math.abs(currentAllocation - recommendedAllocation) * portfolio.totalValue;

          recommendations.push({
            symbol: asset.symbol,
            currentAllocation,
            recommendedAllocation,
            action: action as 'buy' | 'sell',
            amount
          });
        } else {
          recommendations.push({
            symbol: asset.symbol,
            currentAllocation,
            recommendedAllocation,
            action: 'hold',
            amount: 0
          });
        }
      });

      return recommendations;

    } catch (error) {
      logger.warn('Rebalance recommendations generation failed', { error });
      return [];
    }
  }

  /**
   * パフォーマンスメトリクス計算
   */
  private async calculatePerformanceMetrics(portfolio: Portfolio): Promise<PortfolioPerformanceMetrics> {
    try {
      // 簡易実装（実際のデータが必要）
      return {
        totalReturn: 0.12, // 12%
        annualizedReturn: 0.15, // 15%
        volatility: 0.25, // 25%
        sharpeRatio: 0.6, // (15% - 3%) / 25% = 0.48
        maxDrawdown: 0.18, // 18%
        beta: 1.2 // ベータ値
      };

    } catch (error) {
      logger.warn('Performance metrics calculation failed, using defaults', { error });
      return {
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        beta: 1
      };
    }
  }

  /**
   * アロケーション分析
   */
  private async analyzeAllocation(portfolio: Portfolio, preferences: unknown): Promise<AllocationAnalysis> {
    try {
      const currentAllocations = portfolio.assets.reduce((acc, asset) => ({
        ...acc,
        [asset.symbol]: asset.allocation
      }), {});

      const recommendedAllocations = this.calculateIdealAllocations(portfolio, preferences as { riskTolerance?: 'conservative' | 'moderate' | 'aggressive' });
      
      const allocationDeviation = this.calculateAllocationDeviation(currentAllocations, recommendedAllocations);
      const concentrationRisk = this.calculateConcentrationRisk(portfolio);

      return {
        currentAllocations,
        recommendedAllocations,
        allocationDeviation,
        concentrationRisk
      };

    } catch (error) {
      logger.warn('Allocation analysis failed', { error });
      return {
        currentAllocations: {},
        recommendedAllocations: {},
        allocationDeviation: 0,
        concentrationRisk: 0
      };
    }
  }

  /**
   * 相関マトリックス計算
   */
  private async calculateCorrelationMatrix(portfolio: Portfolio): Promise<Record<string, Record<string, number>>> {
    try {
      const symbols = portfolio.assets.map(asset => asset.symbol);
      const matrix: Record<string, Record<string, number>> = {};

      // 簡易実装（実際の価格データが必要）
      symbols.forEach(symbol1 => {
        matrix[symbol1] = {};
        symbols.forEach(symbol2 => {
          if (symbol1 === symbol2) {
            matrix[symbol1][symbol2] = 1.0;
          } else {
            // 暗号通貨間の一般的な相関係数を使用（実装時はヒストリカルデータを使用）
            matrix[symbol1][symbol2] = this.getEstimatedCorrelation(symbol1, symbol2);
          }
        });
      });

      return matrix;

    } catch (error) {
      logger.warn('Correlation matrix calculation failed', { error });
      return {};
    }
  }

  // ヘルパーメソッド
  private calculatePortfolioVaR(portfolio: Portfolio): number {
    // 簡易VaR計算（95%信頼区間）
    const weights = portfolio.assets.map(asset => asset.allocation);
    const volatilities = portfolio.assets.map(asset => this.getAssetVolatility(asset.symbol));
    
    const portfolioVolatility = Math.sqrt(
      weights.reduce((sum, weight, i) => 
        sum + Math.pow(weight * volatilities[i], 2), 0
      )
    );

    return portfolioVolatility * 1.645; // 95%信頼区間のVaR
  }

  private calculateMaxDrawdown(portfolio: Portfolio): number {
    // 簡易実装（ヒストリカルデータが必要）
    return 0.2; // デフォルト20%
  }

  private calculateCorrelationRisk(portfolio: Portfolio): number {
    // 相関に基づくリスク計算
    return 0.3; // デフォルト値
  }

  private calculateLiquidityRisk(portfolio: Portfolio): number {
    // 流動性リスク計算
    let liquidityRisk = 0;
    portfolio.assets.forEach(asset => {
      const assetLiquidityRisk = this.getAssetLiquidityRisk(asset.symbol);
      liquidityRisk += asset.allocation * assetLiquidityRisk;
    });
    return liquidityRisk;
  }

  private categorizeRisk(riskValue: number): string {
    if (riskValue < 0.1) return 'Low';
    if (riskValue < 0.2) return 'Medium';
    return 'High';
  }

  private calculateLiquidityScore(portfolio: Portfolio): number {
    let score = 0;
    portfolio.assets.forEach(asset => {
      score += asset.allocation * this.getAssetLiquidityScore(asset.symbol);
    });
    return score;
  }

  private calculateCorrelationScore(correlationMatrix: Record<string, Record<string, number>>): number {
    // 相関の低さを評価（低い相関ほど高スコア）
    const symbols = Object.keys(correlationMatrix);
    if (symbols.length < 2) return 0.5;

    let totalCorrelation = 0;
    let pairCount = 0;

    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        totalCorrelation += Math.abs(correlationMatrix[symbols[i]][symbols[j]]);
        pairCount++;
      }
    }

    const avgCorrelation = pairCount > 0 ? totalCorrelation / pairCount : 0;
    return Math.max(0, 1 - avgCorrelation); // 相関が低いほど高スコア
  }

  private calculateRiskAdjustedReturn(portfolio: Portfolio): number {
    // シンプルなリスク調整リターン計算
    return 0.6; // デフォルト値
  }

  private isHighRiskAsset(symbol: string): boolean {
    // 高リスク銘柄の判定
    const highRiskAssets = ['DOGE', 'SHIB', 'MEME', 'APE'];
    return highRiskAssets.includes(symbol) || 
           symbol.toLowerCase().includes('meme') ||
           symbol.toLowerCase().includes('doge');
  }

  private calculateIdealAllocations(portfolio: Portfolio, preferences: { riskTolerance?: 'conservative' | 'moderate' | 'aggressive' }): Record<string, number> {
    // 理想的な配分計算（リスク許容度に基づく）
    const idealAllocations: Record<string, number> = {};
    const assetsCount = portfolio.assets.length;

    portfolio.assets.forEach(asset => {
      let allocation = 1 / assetsCount; // 均等配分をベースに

      // リスク許容度による調整
      if (preferences?.riskTolerance === 'conservative' && this.isHighRiskAsset(asset.symbol)) {
        allocation *= 0.5; // 保守的な場合は高リスク銘柄を減らす
      } else if (preferences?.riskTolerance === 'aggressive' && this.isStableAsset(asset.symbol)) {
        allocation *= 1.5; // 積極的な場合は安定銘柄を増やす
      }

      idealAllocations[asset.symbol] = Math.min(allocation, this.MAX_SINGLE_ASSET_ALLOCATION);
    });

    // 配分の正規化
    const totalAllocation = Object.values(idealAllocations).reduce((sum, alloc) => sum + alloc, 0);
    Object.keys(idealAllocations).forEach(symbol => {
      idealAllocations[symbol] /= totalAllocation;
    });

    return idealAllocations;
  }

  private isStableAsset(symbol: string): boolean {
    // 安定資産の判定
    const stableAssets = ['BTC', 'ETH', 'USDC', 'USDT', 'DAI'];
    return stableAssets.includes(symbol);
  }

  private calculateAllocationDeviation(
    current: Record<string, number>,
    recommended: Record<string, number>
  ): number {
    let deviation = 0;
    Object.keys(current).forEach(symbol => {
      deviation += Math.pow(current[symbol] - (recommended[symbol] || 0), 2);
    });
    return Math.sqrt(deviation);
  }

  private calculateConcentrationRisk(portfolio: Portfolio): number {
    // ハーフィンダル・ハーシュマン指数
    return portfolio.assets.reduce((sum, asset) => sum + Math.pow(asset.allocation, 2), 0);
  }

  private getEstimatedCorrelation(symbol1: string, symbol2: string): number {
    // 簡易相関係数（実装時はヒストリカルデータを使用）
    if ((symbol1 === 'BTC' && symbol2 === 'ETH') || (symbol1 === 'ETH' && symbol2 === 'BTC')) {
      return 0.7; // BTCとETHは高い相関
    }
    // その他の暗号通貨は中程度の相関
    return Math.random() * 0.4 + 0.2; // 0.2-0.6の範囲
  }

  private getAssetVolatility(symbol: string): number {
    // 銘柄別ボラティリティ（年率）
    const volatilities: Record<string, number> = {
      'BTC': 0.6,
      'ETH': 0.7,
      'ADA': 0.8,
      'DOT': 0.9,
      'LINK': 0.8,
      'UNI': 1.0,
      'AAVE': 1.1,
      'SOL': 1.2,
      'AVAX': 1.0,
      'MATIC': 0.9
    };
    return volatilities[symbol] || 0.8;
  }

  private getAssetLiquidityRisk(symbol: string): number {
    // 銘柄別流動性リスク
    const liquidityRisks: Record<string, number> = {
      'BTC': 0.1,
      'ETH': 0.15,
      'ADA': 0.3,
      'DOT': 0.4,
      'LINK': 0.3,
      'UNI': 0.4,
      'AAVE': 0.5,
      'SOL': 0.3,
      'AVAX': 0.4,
      'MATIC': 0.35
    };
    return liquidityRisks[symbol] || 0.4;
  }

  private getAssetLiquidityScore(symbol: string): number {
    // 銘柄別流動性スコア
    return 1 - this.getAssetLiquidityRisk(symbol);
  }
}
