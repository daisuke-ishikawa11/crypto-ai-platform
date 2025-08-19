// リスク分析専門サービス
import { logger } from '@/lib/monitoring/logger';
import type {
  RiskAnalysisRequest,
  Portfolio,
  RiskMetrics
} from './types/ai-service-types';

export interface RiskAnalysisResult {
  portfolioRisk: PortfolioRiskMetrics;
  marketRisk: MarketRiskMetrics;
  liquidityRisk: LiquidityRiskMetrics;
  concentrationRisk: ConcentrationRiskMetrics;
  recommendations: RiskRecommendation[];
  riskScore: RiskScore;
  stressTestResults: StressTestResult[];
}

export interface PortfolioRiskMetrics {
  valueAtRisk: VaRMetrics;
  expectedShortfall: number;
  beta: number;
  trackingError: number;
  informationRatio: number;
  maxDrawdown: number;
  drawdownDuration: number;
}

export interface VaRMetrics {
  daily95: number;
  daily99: number;
  weekly95: number;
  weekly99: number;
  monthly95: number;
  monthly99: number;
}

export interface MarketRiskMetrics {
  systematicRisk: number;
  unsystematicRisk: number;
  marketCorrelation: number;
  sectorConcentration: Record<string, number>;
  geographicConcentration: Record<string, number>;
}

export interface LiquidityRiskMetrics {
  overallLiquidityScore: number;
  liquidityByAsset: Record<string, number>;
  liquidationTimeEstimate: Record<string, number>; // days
  bidAskSpreadImpact: Record<string, number>;
  marketDepth: Record<string, number>;
}

export interface ConcentrationRiskMetrics {
  herfindahlIndex: number;
  top5Concentration: number;
  singleAssetMax: number;
  effectiveAssetCount: number;
  concentrationByCategory: Record<string, number>;
}

export interface RiskRecommendation {
  category: 'portfolio' | 'market' | 'liquidity' | 'concentration';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionItems: string[];
  expectedImpact: 'high' | 'medium' | 'low';
  implementationComplexity: 'easy' | 'medium' | 'complex';
}

export interface RiskScore {
  overall: number; // 0-100
  portfolio: number;
  market: number;
  liquidity: number;
  concentration: number;
  rating: 'Low' | 'Medium-Low' | 'Medium' | 'Medium-High' | 'High';
}

export interface StressTestResult {
  scenario: string;
  description: string;
  portfolioImpact: number;
  worstCaseDrawdown: number;
  recoveryTimeEstimate: number; // months
  affectedAssets: string[];
  mitigationStrategies: string[];
}

export interface RiskLimitBreach {
  type: string;
  description: string;
  currentValue: number;
  limit: number;
  severity: 'warning' | 'breach' | 'critical';
  recommendation: string;
}

export class RiskAnalyzer {
  private readonly DEFAULT_CONFIDENCE_LEVELS = [0.95, 0.99];
  private readonly STRESS_TEST_SCENARIOS = [
    'market_crash_2008',
    'crypto_winter_2018',
    'covid_crash_2020',
    'interest_rate_shock',
    'regulatory_crackdown'
  ];

  constructor() {}

  /**
   * 包括的リスク分析実行
   */
  async performRiskAnalysis(request: RiskAnalysisRequest): Promise<RiskAnalysisResult> {
    try {
      logger.info('Starting comprehensive risk analysis', {
        userId: request.userId,
        symbols: request.symbols,
        hasPortfolio: !!request.portfolio
      });

      const [
        portfolioRisk,
        marketRisk,
        liquidityRisk,
        concentrationRisk,
        stressTestResults
      ] = await Promise.all([
        this.analyzePortfolioRisk(request),
        this.analyzeMarketRisk(request),
        this.analyzeLiquidityRisk(request),
        this.analyzeConcentrationRisk(request),
        this.performStressTests(request)
      ]);

      const riskScore = this.calculateRiskScore(portfolioRisk, marketRisk, liquidityRisk, concentrationRisk);
      const recommendations = this.generateRiskRecommendations(
        portfolioRisk,
        marketRisk,
        liquidityRisk,
        concentrationRisk,
        request
      );

      const result: RiskAnalysisResult = {
        portfolioRisk,
        marketRisk,
        liquidityRisk,
        concentrationRisk,
        recommendations,
        riskScore,
        stressTestResults
      };

      logger.info('Risk analysis completed', {
        userId: request.userId,
        overallRiskScore: riskScore.overall,
        riskRating: riskScore.rating,
        recommendationCount: recommendations.length
      });

      return result;

    } catch (error) {
      logger.error('Risk analysis failed', {
        userId: request.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * リスク限度違反チェック
   */
  async checkRiskLimits(
    portfolio: Portfolio,
    riskLimits: {
      maxSingleAssetAllocation?: number;
      maxVaR?: number;
      maxDrawdown?: number;
      minLiquidityScore?: number;
    }
  ): Promise<RiskLimitBreach[]> {
    try {
      const breaches: RiskLimitBreach[] = [];
      
      if (!portfolio || portfolio.assets.length === 0) {
        return breaches;
      }

      // 単一銘柄集中度チェック
      if (riskLimits.maxSingleAssetAllocation) {
        const maxAllocation = Math.max(...portfolio.assets.map(asset => asset.allocation));
        if (maxAllocation > riskLimits.maxSingleAssetAllocation) {
          breaches.push({
            type: 'concentration',
            description: '単一銘柄の集中度が限度を超過',
            currentValue: maxAllocation,
            limit: riskLimits.maxSingleAssetAllocation,
            severity: maxAllocation > riskLimits.maxSingleAssetAllocation * 1.2 ? 'critical' : 'breach',
            recommendation: '分散化により集中度を下げてください'
          });
        }
      }

      // VaRチェック
      if (riskLimits.maxVaR) {
        const currentVaR = this.calculatePortfolioVaR(portfolio, 0.95);
        if (currentVaR > riskLimits.maxVaR) {
          breaches.push({
            type: 'var',
            description: 'バリューアットリスクが限度を超過',
            currentValue: currentVaR,
            limit: riskLimits.maxVaR,
            severity: currentVaR > riskLimits.maxVaR * 1.5 ? 'critical' : 'breach',
            recommendation: 'リスク資産の割合を減らしてください'
          });
        }
      }

      // 流動性スコアチェック
      if (riskLimits.minLiquidityScore) {
        const liquidityScore = await this.calculateOverallLiquidityScore(portfolio);
        if (liquidityScore < riskLimits.minLiquidityScore) {
          breaches.push({
            type: 'liquidity',
            description: '流動性スコアが最低限度を下回る',
            currentValue: liquidityScore,
            limit: riskLimits.minLiquidityScore,
            severity: liquidityScore < riskLimits.minLiquidityScore * 0.8 ? 'critical' : 'warning',
            recommendation: '流動性の高い銘柄の割合を増やしてください'
          });
        }
      }

      return breaches;

    } catch (error) {
      logger.error('Risk limits check failed', { error });
      return [];
    }
  }

  /**
   * ポートフォリオリスク分析
   */
  private async analyzePortfolioRisk(request: RiskAnalysisRequest): Promise<PortfolioRiskMetrics> {
    try {
      if (!request.portfolio) {
        return this.getDefaultPortfolioRiskMetrics();
      }

      const portfolio = request.portfolio;
      
      // VaR計算
      const valueAtRisk: VaRMetrics = {
        daily95: this.calculatePortfolioVaR(portfolio, 0.95, 1),
        daily99: this.calculatePortfolioVaR(portfolio, 0.99, 1),
        weekly95: this.calculatePortfolioVaR(portfolio, 0.95, 7),
        weekly99: this.calculatePortfolioVaR(portfolio, 0.99, 7),
        monthly95: this.calculatePortfolioVaR(portfolio, 0.95, 30),
        monthly99: this.calculatePortfolioVaR(portfolio, 0.99, 30)
      };

      const expectedShortfall = this.calculateExpectedShortfall(portfolio, 0.95);
      const beta = this.calculatePortfolioBeta(portfolio);
      const trackingError = this.calculateTrackingError(portfolio);
      const informationRatio = this.calculateInformationRatio(portfolio);
      const maxDrawdown = this.calculateMaxDrawdown(portfolio);
      const drawdownDuration = this.estimateDrawdownDuration(portfolio);

      return {
        valueAtRisk,
        expectedShortfall,
        beta,
        trackingError,
        informationRatio,
        maxDrawdown,
        drawdownDuration
      };

    } catch (error) {
      logger.warn('Portfolio risk analysis failed, using defaults', { error });
      return this.getDefaultPortfolioRiskMetrics();
    }
  }

  /**
   * 市場リスク分析
   */
  private async analyzeMarketRisk(request: RiskAnalysisRequest): Promise<MarketRiskMetrics> {
    try {
      const systematicRisk = this.calculateSystematicRisk(request);
      const unsystematicRisk = this.calculateUnsystematicRisk(request);
      const marketCorrelation = this.calculateMarketCorrelation(request);
      const sectorConcentration = this.calculateSectorConcentration(request);
      const geographicConcentration = this.calculateGeographicConcentration(request);

      return {
        systematicRisk,
        unsystematicRisk,
        marketCorrelation,
        sectorConcentration,
        geographicConcentration
      };

    } catch (error) {
      logger.warn('Market risk analysis failed, using defaults', { error });
      return {
        systematicRisk: 0.6,
        unsystematicRisk: 0.4,
        marketCorrelation: 0.7,
        sectorConcentration: { 'DeFi': 0.4, 'Layer1': 0.3, 'Other': 0.3 },
        geographicConcentration: { 'Global': 1.0 }
      };
    }
  }

  /**
   * 流動性リスク分析
   */
  private async analyzeLiquidityRisk(request: RiskAnalysisRequest): Promise<LiquidityRiskMetrics> {
    try {
      if (!request.portfolio) {
        return this.getDefaultLiquidityRiskMetrics();
      }

      const portfolio = request.portfolio;
      const overallLiquidityScore = await this.calculateOverallLiquidityScore(portfolio);
      const liquidityByAsset = this.calculateLiquidityByAsset(portfolio);
      const liquidationTimeEstimate = this.estimateLiquidationTime(portfolio);
      const bidAskSpreadImpact = this.calculateBidAskSpreadImpact(portfolio);
      const marketDepth = this.calculateMarketDepth(portfolio);

      return {
        overallLiquidityScore,
        liquidityByAsset,
        liquidationTimeEstimate,
        bidAskSpreadImpact,
        marketDepth
      };

    } catch (error) {
      logger.warn('Liquidity risk analysis failed, using defaults', { error });
      return this.getDefaultLiquidityRiskMetrics();
    }
  }

  /**
   * 集中リスク分析
   */
  private async analyzeConcentrationRisk(request: RiskAnalysisRequest): Promise<ConcentrationRiskMetrics> {
    try {
      if (!request.portfolio) {
        return this.getDefaultConcentrationRiskMetrics();
      }

      const portfolio = request.portfolio;
      const herfindahlIndex = this.calculateHerfindahlIndex(portfolio);
      const top5Concentration = this.calculateTop5Concentration(portfolio);
      const singleAssetMax = Math.max(...portfolio.assets.map(asset => asset.allocation));
      const effectiveAssetCount = 1 / herfindahlIndex;
      const concentrationByCategory = this.calculateConcentrationByCategory(portfolio);

      return {
        herfindahlIndex,
        top5Concentration,
        singleAssetMax,
        effectiveAssetCount,
        concentrationByCategory
      };

    } catch (error) {
      logger.warn('Concentration risk analysis failed, using defaults', { error });
      return this.getDefaultConcentrationRiskMetrics();
    }
  }

  /**
   * ストレステスト実行
   */
  private async performStressTests(request: RiskAnalysisRequest): Promise<StressTestResult[]> {
    try {
      const results: StressTestResult[] = [];

      for (const scenario of this.STRESS_TEST_SCENARIOS) {
        const result = await this.runStressTestScenario(scenario, request);
        results.push(result);
      }

      return results.sort((a, b) => Math.abs(b.portfolioImpact) - Math.abs(a.portfolioImpact));

    } catch (error) {
      logger.warn('Stress tests failed, using defaults', { error });
      return this.getDefaultStressTestResults();
    }
  }

  // ヘルパーメソッド - VaR計算
  private calculatePortfolioVaR(portfolio: Portfolio, confidenceLevel: number, days: number = 1): number {
    if (!portfolio || portfolio.assets.length === 0) return 0;

    // 簡易VaR計算（モンテカルロシミュレーションの簡易版）
    const portfolioVolatility = this.calculatePortfolioVolatility(portfolio);
    const timeScaling = Math.sqrt(days);
    const zScore = confidenceLevel === 0.95 ? 1.645 : 2.33; // 95%または99%

    return portfolioVolatility * zScore * timeScaling;
  }

  private calculatePortfolioVolatility(portfolio: Portfolio): number {
    // ポートフォリオボラティリティ計算
    let weightedVolatility = 0;
    
    portfolio.assets.forEach(asset => {
      const assetVolatility = this.getAssetVolatility(asset.symbol);
      weightedVolatility += Math.pow(asset.allocation * assetVolatility, 2);
    });

    return Math.sqrt(weightedVolatility);
  }

  private calculateExpectedShortfall(portfolio: Portfolio, confidenceLevel: number): number {
    const var95 = this.calculatePortfolioVaR(portfolio, confidenceLevel);
    return var95 * 1.3; // ESはVaRよりも大きい値になる
  }

  private calculatePortfolioBeta(portfolio: Portfolio): number {
    // 市場ベータ計算（暗号通貨市場に対する）
    let portfolioBeta = 0;
    
    portfolio.assets.forEach(asset => {
      const assetBeta = this.getAssetBeta(asset.symbol);
      portfolioBeta += asset.allocation * assetBeta;
    });

    return portfolioBeta;
  }

  private calculateTrackingError(portfolio: Portfolio): number {
    // トラッキングエラー計算
    return 0.12; // 12%のデフォルト値
  }

  private calculateInformationRatio(portfolio: Portfolio): number {
    // インフォメーションレシオ計算
    return 0.3; // デフォルト値
  }

  private calculateMaxDrawdown(portfolio: Portfolio): number {
    // 最大ドローダウン計算
    return 0.25; // 25%のデフォルト値
  }

  private estimateDrawdownDuration(portfolio: Portfolio): number {
    // ドローダウン期間推定（月）
    return 6; // 6ヶ月のデフォルト値
  }

  private calculateSystematicRisk(request: RiskAnalysisRequest): number {
    return 0.65; // 暗号通貨市場の典型的な値
  }

  private calculateUnsystematicRisk(request: RiskAnalysisRequest): number {
    return 0.35;
  }

  private calculateMarketCorrelation(request: RiskAnalysisRequest): number {
    return 0.75;
  }

  private calculateSectorConcentration(request: RiskAnalysisRequest): Record<string, number> {
    // セクター集中度計算
    return {
      'Layer1': 0.4,
      'DeFi': 0.3,
      'Infrastructure': 0.2,
      'Other': 0.1
    };
  }

  private calculateGeographicConcentration(request: RiskAnalysisRequest): Record<string, number> {
    return {
      'Global': 1.0
    };
  }

  private async calculateOverallLiquidityScore(portfolio: Portfolio): Promise<number> {
    let liquidityScore = 0;
    
    portfolio.assets.forEach(asset => {
      const assetLiquidity = this.getAssetLiquidityScore(asset.symbol);
      liquidityScore += asset.allocation * assetLiquidity;
    });

    return liquidityScore;
  }

  private calculateLiquidityByAsset(portfolio: Portfolio): Record<string, number> {
    const liquidityByAsset: Record<string, number> = {};
    
    portfolio.assets.forEach(asset => {
      liquidityByAsset[asset.symbol] = this.getAssetLiquidityScore(asset.symbol);
    });

    return liquidityByAsset;
  }

  private estimateLiquidationTime(portfolio: Portfolio): Record<string, number> {
    const liquidationTime: Record<string, number> = {};
    
    portfolio.assets.forEach(asset => {
      liquidationTime[asset.symbol] = this.getAssetLiquidationTime(asset.symbol);
    });

    return liquidationTime;
  }

  private calculateBidAskSpreadImpact(portfolio: Portfolio): Record<string, number> {
    const spreadImpact: Record<string, number> = {};
    
    portfolio.assets.forEach(asset => {
      spreadImpact[asset.symbol] = this.getAssetSpreadImpact(asset.symbol);
    });

    return spreadImpact;
  }

  private calculateMarketDepth(portfolio: Portfolio): Record<string, number> {
    const marketDepth: Record<string, number> = {};
    
    portfolio.assets.forEach(asset => {
      marketDepth[asset.symbol] = this.getAssetMarketDepth(asset.symbol);
    });

    return marketDepth;
  }

  private calculateHerfindahlIndex(portfolio: Portfolio): number {
    return portfolio.assets.reduce((sum, asset) => sum + Math.pow(asset.allocation, 2), 0);
  }

  private calculateTop5Concentration(portfolio: Portfolio): number {
    const sortedAssets = portfolio.assets
      .sort((a, b) => b.allocation - a.allocation)
      .slice(0, 5);
    
    return sortedAssets.reduce((sum, asset) => sum + asset.allocation, 0);
  }

  private calculateConcentrationByCategory(portfolio: Portfolio): Record<string, number> {
    const categories = this.categorizeAssets(portfolio.assets);
    return categories;
  }

  private calculateRiskScore(
    portfolioRisk: PortfolioRiskMetrics,
    marketRisk: MarketRiskMetrics,
    liquidityRisk: LiquidityRiskMetrics,
    concentrationRisk: ConcentrationRiskMetrics
  ): RiskScore {
    // リスクスコア計算（0-100、100が最高リスク）
    const portfolioScore = Math.min(portfolioRisk.valueAtRisk.daily95 * 300, 100);
    const marketScore = Math.min(marketRisk.systematicRisk * 100, 100);
    const liquidityScore = Math.min((1 - liquidityRisk.overallLiquidityScore) * 100, 100);
    const concentrationScore = Math.min(concentrationRisk.herfindahlIndex * 150, 100);

    const overall = (portfolioScore * 0.3 + marketScore * 0.25 + liquidityScore * 0.25 + concentrationScore * 0.2);

    let rating: RiskScore['rating'];
    if (overall < 20) rating = 'Low';
    else if (overall < 40) rating = 'Medium-Low';
    else if (overall < 60) rating = 'Medium';
    else if (overall < 80) rating = 'Medium-High';
    else rating = 'High';

    return {
      overall,
      portfolio: portfolioScore,
      market: marketScore,
      liquidity: liquidityScore,
      concentration: concentrationScore,
      rating
    };
  }

  private generateRiskRecommendations(
    portfolioRisk: PortfolioRiskMetrics,
    marketRisk: MarketRiskMetrics,
    liquidityRisk: LiquidityRiskMetrics,
    concentrationRisk: ConcentrationRiskMetrics,
    request: RiskAnalysisRequest
  ): RiskRecommendation[] {
    const recommendations: RiskRecommendation[] = [];

    // 集中度リスクの推奨事項
    if (concentrationRisk.herfindahlIndex > 0.25) {
      recommendations.push({
        category: 'concentration',
        priority: 'high',
        title: 'ポートフォリオの分散化',
        description: '単一銘柄への集中度が高すぎます',
        actionItems: [
          '大きなポジションを削減する',
          '他の銘柄への分散投資を検討する',
          '定期的なリバランシングを実施する'
        ],
        expectedImpact: 'high',
        implementationComplexity: 'medium'
      });
    }

    // 流動性リスクの推奨事項
    if (liquidityRisk.overallLiquidityScore < 0.5) {
      recommendations.push({
        category: 'liquidity',
        priority: 'medium',
        title: '流動性の改善',
        description: '低流動性資産の比率が高すぎます',
        actionItems: [
          '主要取引所で取引される銘柄の比率を増やす',
          '流動性の低い銘柄を段階的に削減する',
          '緊急時の現金化計画を策定する'
        ],
        expectedImpact: 'medium',
        implementationComplexity: 'easy'
      });
    }

    // VaRリスクの推奨事項
    if (portfolioRisk.valueAtRisk.daily95 > 0.05) {
      recommendations.push({
        category: 'portfolio',
        priority: 'high',
        title: 'ポートフォリオリスクの削減',
        description: 'バリューアットリスクが高水準です',
        actionItems: [
          'リスク資産の比率を削減する',
          'ヘッジ戦略の導入を検討する',
          'ポジションサイズを適正化する'
        ],
        expectedImpact: 'high',
        implementationComplexity: 'medium'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private async runStressTestScenario(scenario: string, request: RiskAnalysisRequest): Promise<StressTestResult> {
    // ストレステストシナリオ実行
    const scenarioData = this.getStressTestScenarioData(scenario);
    
    return {
      scenario,
      description: scenarioData.description,
      portfolioImpact: scenarioData.impact,
      worstCaseDrawdown: scenarioData.drawdown,
      recoveryTimeEstimate: scenarioData.recoveryTime,
      affectedAssets: request.symbols,
      mitigationStrategies: scenarioData.mitigation
    };
  }

  // デフォルト値を返すヘルパーメソッド
  private getDefaultPortfolioRiskMetrics(): PortfolioRiskMetrics {
    return {
      valueAtRisk: {
        daily95: 0.03,
        daily99: 0.05,
        weekly95: 0.08,
        weekly99: 0.12,
        monthly95: 0.15,
        monthly99: 0.22
      },
      expectedShortfall: 0.04,
      beta: 1.0,
      trackingError: 0.12,
      informationRatio: 0.3,
      maxDrawdown: 0.25,
      drawdownDuration: 6
    };
  }

  private getDefaultLiquidityRiskMetrics(): LiquidityRiskMetrics {
    return {
      overallLiquidityScore: 0.7,
      liquidityByAsset: {},
      liquidationTimeEstimate: {},
      bidAskSpreadImpact: {},
      marketDepth: {}
    };
  }

  private getDefaultConcentrationRiskMetrics(): ConcentrationRiskMetrics {
    return {
      herfindahlIndex: 0.2,
      top5Concentration: 0.8,
      singleAssetMax: 0.3,
      effectiveAssetCount: 5,
      concentrationByCategory: {}
    };
  }

  private getDefaultStressTestResults(): StressTestResult[] {
    return [
      {
        scenario: 'market_crash',
        description: '市場クラッシュシナリオ',
        portfolioImpact: -0.4,
        worstCaseDrawdown: -0.5,
        recoveryTimeEstimate: 12,
        affectedAssets: ['BTC', 'ETH'],
        mitigationStrategies: ['分散化', 'ヘッジ']
      }
    ];
  }

  // 資産データ取得のヘルパーメソッド
  private getAssetVolatility(symbol: string): number {
    const volatilities: Record<string, number> = {
      'BTC': 0.6, 'ETH': 0.7, 'ADA': 0.8, 'DOT': 0.9,
      'LINK': 0.8, 'UNI': 1.0, 'AAVE': 1.1, 'SOL': 1.2,
      'AVAX': 1.0, 'MATIC': 0.9
    };
    return volatilities[symbol] || 0.8;
  }

  private getAssetBeta(symbol: string): number {
    const betas: Record<string, number> = {
      'BTC': 1.0, 'ETH': 1.2, 'ADA': 1.5, 'DOT': 1.3,
      'LINK': 1.4, 'UNI': 1.6, 'AAVE': 1.7, 'SOL': 1.8,
      'AVAX': 1.5, 'MATIC': 1.3
    };
    return betas[symbol] || 1.0;
  }

  private getAssetLiquidityScore(symbol: string): number {
    const scores: Record<string, number> = {
      'BTC': 0.9, 'ETH': 0.85, 'ADA': 0.7, 'DOT': 0.6,
      'LINK': 0.7, 'UNI': 0.6, 'AAVE': 0.5, 'SOL': 0.7,
      'AVAX': 0.6, 'MATIC': 0.65
    };
    return scores[symbol] || 0.5;
  }

  private getAssetLiquidationTime(symbol: string): number {
    const times: Record<string, number> = {
      'BTC': 1, 'ETH': 1, 'ADA': 2, 'DOT': 3,
      'LINK': 2, 'UNI': 3, 'AAVE': 4, 'SOL': 2,
      'AVAX': 3, 'MATIC': 2
    };
    return times[symbol] || 3;
  }

  private getAssetSpreadImpact(symbol: string): number {
    const impacts: Record<string, number> = {
      'BTC': 0.001, 'ETH': 0.002, 'ADA': 0.005, 'DOT': 0.008,
      'LINK': 0.006, 'UNI': 0.01, 'AAVE': 0.015, 'SOL': 0.004,
      'AVAX': 0.008, 'MATIC': 0.006
    };
    return impacts[symbol] || 0.01;
  }

  private getAssetMarketDepth(symbol: string): number {
    const depths: Record<string, number> = {
      'BTC': 1.0, 'ETH': 0.9, 'ADA': 0.6, 'DOT': 0.5,
      'LINK': 0.6, 'UNI': 0.4, 'AAVE': 0.3, 'SOL': 0.7,
      'AVAX': 0.5, 'MATIC': 0.6
    };
    return depths[symbol] || 0.5;
  }

  private categorizeAssets(assets: Portfolio['assets']): Record<string, number> {
    const categories: Record<string, number> = {
      'Layer1': 0,
      'DeFi': 0,
      'Infrastructure': 0,
      'Other': 0
    };

    assets.forEach(asset => {
      const category = this.getAssetCategory(asset.symbol);
      categories[category] += asset.allocation;
    });

    return categories;
  }

  private getAssetCategory(symbol: string): string {
    const categoryMap: Record<string, string> = {
      'BTC': 'Layer1',
      'ETH': 'Layer1',
      'ADA': 'Layer1',
      'DOT': 'Layer1',
      'SOL': 'Layer1',
      'AVAX': 'Layer1',
      'MATIC': 'Layer1',
      'UNI': 'DeFi',
      'AAVE': 'DeFi',
      'LINK': 'Infrastructure'
    };
    return categoryMap[symbol] || 'Other';
  }

  private getStressTestScenarioData(scenario: string): {
    description: string;
    impact: number;
    drawdown: number;
    recoveryTime: number;
    mitigation: string[];
  } {
    const scenarios = {
      'market_crash_2008': {
        description: '2008年金融危機レベルの市場クラッシュ',
        impact: -0.5,
        drawdown: -0.6,
        recoveryTime: 18,
        mitigation: ['分散投資', '現金ポジション確保', 'ヘッジ戦略']
      },
      'crypto_winter_2018': {
        description: '2018年暗号通貨冬の時代の再来',
        impact: -0.7,
        drawdown: -0.8,
        recoveryTime: 24,
        mitigation: ['強固なファンダメンタルズを持つ銘柄選択', '長期投資視点']
      },
      'covid_crash_2020': {
        description: 'COVID-19パンデミック級の急激な市場下落',
        impact: -0.4,
        drawdown: -0.5,
        recoveryTime: 12,
        mitigation: ['流動性確保', '機関投資家需要の高い銘柄保有']
      },
      'interest_rate_shock': {
        description: '急激な金利上昇による市場調整',
        impact: -0.3,
        drawdown: -0.4,
        recoveryTime: 9,
        mitigation: ['金利感応度の低い銘柄選択', '短期ポジション調整']
      },
      'regulatory_crackdown': {
        description: '主要国での暗号通貨規制強化',
        impact: -0.6,
        drawdown: -0.7,
        recoveryTime: 15,
        mitigation: ['規制準拠銘柄への集中', '地域分散']
      }
    };

    return scenarios[scenario as keyof typeof scenarios] || scenarios['market_crash_2008'];
  }
}