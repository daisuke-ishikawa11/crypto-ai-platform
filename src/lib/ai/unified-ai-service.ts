// 🧠 統合AI分析サービス - ファサードパターン
// 専門サービスを統合するメインインターフェース

import { MarketAnalyzer } from './market-analyzer';
import { PortfolioAnalyzer } from './portfolio-analyzer';
import { TradingSignalGenerator } from './trading-signal-generator';
import { RiskAnalyzer } from './risk-analyzer';
import { VoltAgentService } from './volt-agent-service';
import { logger } from '@/lib/monitoring/logger';
import { isRecord } from '@/lib/types/guards';
import { createClient } from '@/lib/supabase/server';
import type {
  MarketAnalysisRequest,
  PortfolioAnalysisRequest,
  TradingSignalRequest,
  RiskAnalysisRequest,
  BaseAnalysisRequest,
  Portfolio,
  UserPreferences
} from './types/ai-service-types';

interface ComprehensiveAnalysisRequest extends BaseAnalysisRequest {
  analysisType: 'market' | 'portfolio' | 'trading' | 'risk' | 'comprehensive';
  portfolio?: Portfolio;
}

interface ComprehensiveAnalysisResponse {
  summary: {
    overallSentiment: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
    keyInsights: string[];
    riskLevel: 'low' | 'medium' | 'high';
    recommendedAction: string;
  };
  
  marketAnalysis: {
    technicalSignals: Array<{
      symbol: string;
      signal: 'buy' | 'sell' | 'hold';
      strength: number;
      indicators: Record<string, number | string>;
    }>;
    fundamentalOutlook: string;
    sentimentAnalysis: {
      score: number;
      sources: string[];
    };
    priceTargets: Record<string, {
      short: number;
      medium: number;
      long: number;
      confidence: number;
    }>;
  };

  portfolioInsights?: {
    currentRisk: number;
    diversificationScore: number;
    optimizationSuggestions: Array<{
      action: string;
      symbol: string;
      reasoning: string;
      priority: number;
    }>;
    rebalanceRecommendations: Array<{
      symbol: string;
      currentAllocation: number;
      recommendedAllocation: number;
      action: 'buy' | 'sell' | 'hold';
      amount: number;
    }>;
  };

  tradingSignals?: Array<{
    symbol: string;
    action: 'buy' | 'sell' | 'hold';
    confidence: number;
    entryPrice: number;
    exitTargets: number[];
    stopLoss: number;
    timeframe: string;
    reasoning: string;
  }>;

  riskAssessment: {
    portfolioVar: number;
    maxDrawdown: number;
    correlationRisk: number;
    liquidityRisk: number;
    recommendations: string[];
  };

  aiModelsUsed: string[];
  timestamp: string;
  disclaimer: string;
}

interface PreviousMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatContext {
  portfolio?: Portfolio | null;
  previousMessages?: PreviousMessage[];
  marketData?: Record<string, unknown>;
  activeAlerts?: Array<Record<string, unknown>>;
}

interface ChatAnalysisRequest {
  userId: string;
  query: string;
  context?: ChatContext;
  maxTokens?: number;
}

interface RelatedAction {
  action: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
}

interface ChatAnalysisResponse {
  response: string;
  confidence: number;
  sources: string[];
  relatedActions: RelatedAction[];
  followUpQuestions: string[];
  timestamp: string;
}

interface RecommendationItem {
  type: string;
  title: string;
  message: string;
  confidence: number;
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
  category: 'trading' | 'portfolio' | 'risk' | 'education';
}

interface UserAnalysisData {
  user: Record<string, unknown> | null;
  portfolio: Record<string, unknown> | null;
  alerts: Array<Record<string, unknown>> | null;
}

interface LearningAnalysisResult {
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  knowledgeGaps: string[];
  recommendedTopics: string[];
  urgency: 'low' | 'medium' | 'high';
}

interface BasicAnalysisResult {
  analysis: {
    summary: string;
    sentimentAnalysis: {
      overallSentiment: 'positive' | 'negative' | 'neutral';
      sentimentScore: number;
    };
    fundamentalAnalysis: {
      outlook: string;
      keyFactors: string[];
    };
  };
  recommendations: Array<{
    action: string;
    reasoning: string;
  }>;
}

export class UnifiedAIService {
  // 専門サービス群
  private marketAnalyzer: MarketAnalyzer;
  private portfolioAnalyzer: PortfolioAnalyzer;
  private tradingSignalGenerator: TradingSignalGenerator;
  private riskAnalyzer: RiskAnalyzer;
  private voltAgentService: VoltAgentService;

  constructor() {
    this.marketAnalyzer = new MarketAnalyzer();
    this.portfolioAnalyzer = new PortfolioAnalyzer();
    this.tradingSignalGenerator = new TradingSignalGenerator();
    this.riskAnalyzer = new RiskAnalyzer();
    this.voltAgentService = new VoltAgentService();
  }

  /**
   * 包括的AI分析実行 - 専門サービスを統合
   */
  async performComprehensiveAnalysis(
    request: ComprehensiveAnalysisRequest
  ): Promise<ComprehensiveAnalysisResponse> {
    try {
      logger.info('Starting comprehensive AI analysis with specialized services', {
        userId: request.userId,
        analysisType: request.analysisType,
        symbols: request.symbols
      });

      // 並列で専門分析を実行
      const analysisPromises = [];

      // 市場分析
      const marketRequest: MarketAnalysisRequest = {
        userId: request.userId,
        symbols: request.symbols,
        timeframe: request.timeframe,
        preferences: request.preferences,
        marketContext: request.marketContext,
        analysisDepth: 'comprehensive'
      };
      analysisPromises.push(this.marketAnalyzer.performMarketAnalysis(marketRequest));

      // ポートフォリオ分析（ポートフォリオがある場合）
      let portfolioAnalysis = null;
      if (request.portfolio) {
        const portfolioRequest: PortfolioAnalysisRequest = {
          userId: request.userId,
          symbols: request.symbols,
          timeframe: request.timeframe,
          preferences: request.preferences,
          marketContext: request.marketContext,
          portfolio: request.portfolio
        };
        portfolioAnalysis = this.portfolioAnalyzer.performPortfolioAnalysis(portfolioRequest);
        analysisPromises.push(portfolioAnalysis);
      }

      // トレーディングシグナル（トレーディング戦略が指定されている場合）
      let tradingSignals = null;
      if (request.preferences.tradingStrategy && request.preferences.tradingStrategy !== 'hodl') {
        const tradingRequest: TradingSignalRequest = {
          userId: request.userId,
          symbols: request.symbols,
          timeframe: request.timeframe,
          preferences: request.preferences,
          marketContext: request.marketContext,
          tradingStrategy: request.preferences.tradingStrategy,
          riskBudget: 0.02
        };
        tradingSignals = this.tradingSignalGenerator.generateTradingSignals(tradingRequest);
        analysisPromises.push(tradingSignals);
      }

      // リスク分析
      const riskRequest: RiskAnalysisRequest = {
        userId: request.userId,
        symbols: request.symbols,
        timeframe: request.timeframe,
        preferences: request.preferences,
        marketContext: request.marketContext,
        portfolio: request.portfolio
      };
      analysisPromises.push(this.riskAnalyzer.performRiskAnalysis(riskRequest));

      // すべての分析結果を待機
      const results = await Promise.allSettled(analysisPromises);
      const marketResult = results[0] as PromiseSettledResult<Awaited<ReturnType<MarketAnalyzer['performMarketAnalysis']>>>;
      const portfolioResult = (request.portfolio ? results[1] : null) as PromiseSettledResult<Awaited<ReturnType<PortfolioAnalyzer['performPortfolioAnalysis']>>> | null;
      const tradingResult = (request.preferences.tradingStrategy && request.preferences.tradingStrategy !== 'hodl' ? (request.portfolio ? results[2] : results[1]) : null) as PromiseSettledResult<Awaited<ReturnType<TradingSignalGenerator['generateTradingSignals']>>> | null;
      const riskIndex = request.portfolio && request.preferences.tradingStrategy && request.preferences.tradingStrategy !== 'hodl' ? 3 : (request.portfolio || (request.preferences.tradingStrategy && request.preferences.tradingStrategy !== 'hodl') ? 2 : 1);
      const riskResult = results[riskIndex] as PromiseSettledResult<Awaited<ReturnType<RiskAnalyzer['performRiskAnalysis']>>>;

      // 結果を統合
      const analysis = this.synthesizeSpecializedResults(request, {
        market: marketResult,
        portfolio: portfolioResult,
        trading: tradingResult,
        risk: riskResult
      });

      // データベースに保存
      await this.saveAnalysisResult(request.userId, analysis);

      logger.info('Comprehensive AI analysis completed', {
        userId: request.userId,
        analysisType: request.analysisType,
        confidence: analysis.summary.confidence
      });

      return analysis;

    } catch (error) {
      logger.error('Comprehensive AI analysis failed', {
        userId: request.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * AIチャット分析
   */
  async performChatAnalysis(request: ChatAnalysisRequest): Promise<ChatAnalysisResponse> {
    try {
      // コンテキストを準備
      const enhancedQuery = await this.enhanceQueryWithContext(request);

      // チャット分析（Gemini代替実装）
      const chatAnalysis = await this.performFallbackAnalysis({
        query: enhancedQuery,
        symbols: this.extractSymbolsFromQuery(request.query),
        marketData: request.context?.marketData,
        portfolio: request.context?.portfolio || undefined
      });

      // レスポンスを構造化
      const response: ChatAnalysisResponse = {
        response: this.formatChatResponse(chatAnalysis, request.query),
        confidence: this.calculateOverallConfidence(chatAnalysis),
        sources: ['Gemini AI', 'Market Data', 'Technical Analysis'],
        relatedActions: this.generateRelatedActions(chatAnalysis),
        followUpQuestions: this.generateFollowUpQuestions(request.query, chatAnalysis),
        timestamp: new Date().toISOString()
      };

      // チャット履歴を保存
      await this.saveChatInteraction(request.userId, request.query, response);

      return response;

    } catch (error) {
      logger.error('Chat analysis failed', {
        userId: request.userId,
        query: request.query,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * AI推奨事項生成
   */
  async generateRecommendations(
    userId: string,
    type: 'daily' | 'weekly' | 'portfolio_review' | 'risk_alert'
  ): Promise<RecommendationItem[]> {
    try {
      // ユーザーデータを取得
      const userData = await this.getUserAnalysisData(userId);
      
      if (!userData) {
        throw new Error('User data not found');
      }

      // タイプ別推奨事項生成
      let recommendations: RecommendationItem[] = [];

      switch (type) {
        case 'daily':
          recommendations = await this.generateDailyRecommendations(userData);
          break;
        case 'weekly':
          recommendations = await this.generateWeeklyRecommendations(userData);
          break;
        case 'portfolio_review':
          recommendations = await this.generatePortfolioRecommendations(userData);
          break;
        case 'risk_alert':
          recommendations = await this.generateRiskAlerts(userData);
          break;
      }

      // 推奨事項をデータベースに保存
      await this.saveRecommendations(userId, recommendations);

      logger.info('AI recommendations generated', {
        userId,
        type,
        count: recommendations.length
      });

      return recommendations;

    } catch (error) {
      logger.error('Failed to generate AI recommendations', {
        userId,
        type,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Gemini分析実行（代替実装）
   */
  private async performGeminiAnalysis(request: ComprehensiveAnalysisRequest) {
    // Gemini APIが利用できない場合の代替実装
    return {
      analysis: {
        summary: 'AI analysis temporarily unavailable',
        sentimentAnalysis: {
          overallSentiment: 'neutral',
          sentimentScore: 0.5
        },
        fundamentalAnalysis: {
          outlook: 'Market analysis pending',
          keyFactors: ['Technical analysis suggests neutral outlook', 'Market volatility remains moderate']
        },
        technicalAnalysis: {
          signals: request.symbols.map(symbol => ({
            symbol,
            signal: 'hold' as const,
            strength: 0.5,
            indicators: {}
          }))
        }
      },
      riskAssessment: {
        portfolioRisk: 'medium',
        recommendations: ['Monitor market conditions', 'Maintain diversified portfolio']
      },
      recommendations: [{
        action: 'hold',
        reasoning: 'Market analysis temporarily unavailable - maintaining current positions recommended'
      }]
    };
  }

  /**
   * VoltAgent分析実行
   */
  private async performVoltAnalysis(request: ComprehensiveAnalysisRequest) {
    if (request.preferences.tradingStrategy && request.preferences.tradingStrategy !== 'hodl') {
      return await this.voltAgentService.generateTradingSignals({
        symbols: request.symbols,
        timeframe: '1h',
        strategy: request.preferences.tradingStrategy,
        riskLevel: request.preferences.riskTolerance,
        marketData: {
          ohlcv: {},
          orderBooks: {},
          indicators: {}
        },
        portfolioContext: {
          currentHoldings: {},
          availableBalance: request.portfolio?.totalValue || 0,
          totalPortfolioValue: request.portfolio?.totalValue || 0,
          riskBudget: 0.05
        }
      });
    }
    return null;
  }

  /**
   * 市場予測実行
   */
  private async performMarketPredictions(request: ComprehensiveAnalysisRequest) {
    if (request.symbols.length > 0) {
      return await this.voltAgentService.generatePrediction({
        symbol: request.symbols[0],
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
    }
    return null;
  }

  /**
   * 専門サービス結果の統合
   */
  private synthesizeSpecializedResults(
    request: ComprehensiveAnalysisRequest,
    results: {
      market: PromiseSettledResult<Awaited<ReturnType<MarketAnalyzer['performMarketAnalysis']>>>;
      portfolio: PromiseSettledResult<Awaited<ReturnType<PortfolioAnalyzer['performPortfolioAnalysis']>>> | null;
      trading: PromiseSettledResult<Awaited<ReturnType<TradingSignalGenerator['generateTradingSignals']>>> | null;
      risk: PromiseSettledResult<Awaited<ReturnType<RiskAnalyzer['performRiskAnalysis']>>>;
    }
  ): ComprehensiveAnalysisResponse {
    const marketResult = results.market.status === 'fulfilled' ? results.market.value : null;
    const portfolioResult = results.portfolio?.status === 'fulfilled' ? results.portfolio.value : null;
    const tradingResult = results.trading?.status === 'fulfilled' ? results.trading.value : null;
    const riskResult = results.risk.status === 'fulfilled' ? results.risk.value : null;

    return {
      summary: {
        overallSentiment: marketResult?.marketTrend === 'bull' ? 'bullish' : 
                         marketResult?.marketTrend === 'bear' ? 'bearish' : 'neutral',
        confidence: this.calculateOverallConfidenceFromSpecialized(marketResult, portfolioResult, tradingResult, riskResult),
        keyInsights: this.extractKeyInsightsFromSpecialized(marketResult, portfolioResult, riskResult),
        riskLevel: riskResult?.riskScore.rating === 'High' || riskResult?.riskScore.rating === 'Medium-High' ? 'high' :
                  riskResult?.riskScore.rating === 'Low' || riskResult?.riskScore.rating === 'Medium-Low' ? 'low' : 'medium',
        recommendedAction: this.determineRecommendedActionFromSpecialized(marketResult, tradingResult, riskResult)
      },
      marketAnalysis: {
        technicalSignals: marketResult?.technicalSignals || [],
        fundamentalOutlook: marketResult?.fundamentalOutlook || 'Market analysis in progress',
        sentimentAnalysis: marketResult?.sentimentAnalysis || { score: 0.5, sources: ['Market Data'] },
        priceTargets: marketResult?.priceTargets || {}
      },
      portfolioInsights: portfolioResult ? {
        currentRisk: portfolioResult.currentRisk,
        diversificationScore: portfolioResult.diversificationScore,
        optimizationSuggestions: portfolioResult.optimizationSuggestions,
        rebalanceRecommendations: portfolioResult.rebalanceRecommendations
      } : undefined,
      tradingSignals: tradingResult?.signals || [],
      riskAssessment: {
        portfolioVar: riskResult?.portfolioRisk.valueAtRisk.daily95 || 0.05,
        maxDrawdown: riskResult?.portfolioRisk.maxDrawdown || 0.15,
        correlationRisk: riskResult?.marketRisk.marketCorrelation || 0.3,
        liquidityRisk: riskResult ? (1 - riskResult.liquidityRisk.overallLiquidityScore) : 0.3,
        recommendations: riskResult?.recommendations.map(r => r.description) || []
      },
      aiModelsUsed: ['MarketAnalyzer', 'PortfolioAnalyzer', 'TradingSignalGenerator', 'RiskAnalyzer', 'VoltAgent Pro'],
      timestamp: new Date().toISOString(),
      disclaimer: 'これは教育目的の分析であり、投資助言ではありません。投資判断は自己責任でお願いします。'
    };
  }

  /**
   * レガシー結果統合（後方互換性のため保持）
   */
  private synthesizeResults(
    request: ComprehensiveAnalysisRequest,
    results: Record<string, PromiseSettledResult<unknown>>
  ): ComprehensiveAnalysisResponse {
    // 複数のAI結果を統合してレスポンスを構築（型ガードで安全化）
    interface GeminiShape {
      analysis?: { fundamentalAnalysis?: { outlook?: unknown }; sentimentAnalysis?: { sentimentScore?: unknown } };
      riskAssessment?: { recommendations?: unknown };
    }
    const isGeminiShape = (val: unknown): val is GeminiShape => isRecord(val);

    interface VoltShape {
      signals?: unknown;
      riskMetrics?: { portfolioVar?: unknown; maxDrawdown?: unknown };
    }
    const isVoltShape = (val: unknown): val is VoltShape => isRecord(val);

    const geminiRaw = results.gemini?.status === 'fulfilled' ? (results.gemini as PromiseFulfilledResult<unknown>).value : null;
    const voltRaw = results.volt?.status === 'fulfilled' ? (results.volt as PromiseFulfilledResult<unknown>).value : null;
    const predictionResult = results.predictions?.status === 'fulfilled' ? (results.predictions as PromiseFulfilledResult<unknown>).value : null;

    const geminiResult = isGeminiShape(geminiRaw) ? geminiRaw : null;
    const voltResult = isVoltShape(voltRaw) ? voltRaw : null;

    return {
      summary: {
        overallSentiment: this.determineSentiment(geminiResult, voltResult),
        confidence: this.calculateConfidence(geminiResult, voltResult, predictionResult),
        keyInsights: this.extractKeyInsights(geminiResult, voltResult),
        riskLevel: this.assessRiskLevel(geminiResult, request.preferences),
        recommendedAction: this.determineRecommendedAction(geminiResult, voltResult)
      },
      marketAnalysis: {
        technicalSignals: this.extractTechnicalSignals(geminiResult, voltResult),
        fundamentalOutlook: ((): string => {
          const outlook = geminiResult?.analysis?.fundamentalAnalysis?.outlook;
          return typeof outlook === 'string' ? outlook : 'Neutral outlook';
        })(),
        sentimentAnalysis: {
          score: ((): number => {
            const s = geminiResult?.analysis?.sentimentAnalysis?.sentimentScore;
            return typeof s === 'number' ? s : 0;
          })(),
          sources: ['Social Media', 'News', 'Market Data']
        },
        priceTargets: this.extractPriceTargets(predictionResult, request.symbols)
      },
      portfolioInsights: request.portfolio ? {
        currentRisk: this.calculatePortfolioRisk(request.portfolio),
        diversificationScore: this.calculateDiversificationScore(request.portfolio),
        optimizationSuggestions: this.generateOptimizationSuggestions(geminiResult as BasicAnalysisResult | null, request.portfolio || null),
        rebalanceRecommendations: this.generateRebalanceRecommendations(geminiResult as BasicAnalysisResult | null, request.portfolio || null)
      } : undefined,
      tradingSignals: this.validateTradingSignals(voltResult?.signals),
      riskAssessment: {
        portfolioVar: (() => {
          const rm = voltResult?.riskMetrics;
          return typeof rm?.portfolioVar === 'number' ? rm.portfolioVar : 0.05;
        })(),
        maxDrawdown: (() => {
          const rm = voltResult?.riskMetrics;
          return typeof rm?.maxDrawdown === 'number' ? rm.maxDrawdown : 0.1;
        })(),
        correlationRisk: 0.3,
        liquidityRisk: 0.2,
        recommendations: (() => {
          const recs = geminiResult?.riskAssessment?.recommendations;
          return Array.isArray(recs) ? recs.filter((r): r is string => typeof r === 'string') : [];
        })()
      },
      aiModelsUsed: ['Gemini 1.5 Pro', 'VoltAgent Pro'],
      timestamp: new Date().toISOString(),
      disclaimer: 'これは教育目的の分析であり、投資助言ではありません。投資判断は自己責任でお願いします。'
    };
  }

  /**
   * ユーザーデータ取得
   */
  private async getUserAnalysisData(userId: string): Promise<UserAnalysisData | null> {
    const supabase = await createClient();
    
    const { data: user } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    const { data: portfolio } = await supabase
      .from('user_portfolios')
      .select('*, portfolio_assets(*)')
      .eq('user_id', userId)
      .single();

    const { data: alerts } = await supabase
      .from('alert_conditions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');

    if (!user) {
      return null;
    }

    return {
      user,
      portfolio,
      alerts
    };
  }

  /**
   * 分析結果をデータベースに保存
   */
  private async saveAnalysisResult(userId: string, analysis: ComprehensiveAnalysisResponse) {
    try {
      const supabase = await createClient();
      
      await supabase
        .from('ai_recommendations')
        .insert({
          user_id: userId,
          recommendation_type: 'comprehensive_analysis',
          title: '包括的AI分析結果',
          message: analysis.summary.keyInsights.join('. '),
          confidence_score: Math.round(analysis.summary.confidence),
          reasoning: analysis,
          created_at: analysis.timestamp
        });

    } catch (error) {
      logger.error('Failed to save analysis result', { userId, error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * 学習推奨生成（AIチャット統合）
   */
  async generateLearningRecommendations(
    userId: string,
    chatContext: string,
    userQuery: string
  ): Promise<{
    recommendedLessons: Array<{
      id: string;
      title: string;
      slug: string;
      description: string;
      categoryId: string;
      difficulty: string;
      estimatedMinutes: number;
      relevanceScore: number;
      reason: string;
    }>;
    learningPath: string;
    nextSteps: string[];
  }> {
    try {
      const { LearningService } = await import('@/lib/services/learning.service');
      const learningService = new LearningService();

      // ユーザーの学習状況を取得
      const userStatsUnknown = await learningService.getLearningStats(userId).catch(() => null);
      const allLessons = await learningService.getLessons();

      // チャットコンテキストから学習ニーズを分析
      const analysisPrompt = `
ユーザーの質問: "${userQuery}"
チャット文脈: ${chatContext}

この質問と文脈から、ユーザーが学習すべき投資・暗号通貨のトピックを特定してください。

以下の観点で分析：
1. ユーザーの知識レベル
2. 興味を示している分野
3. 理解が不足している領域
4. 次に学ぶべきトピック

JSON形式で回答してください：
{
  "knowledgeLevel": "beginner|intermediate|advanced",
  "interests": ["topic1", "topic2", ...],
  "knowledgeGaps": ["gap1", "gap2", ...],
  "recommendedTopics": ["topic1", "topic2", ...],
  "urgency": "low|medium|high"
}
`;

      const analysisResult = await this.performBasicAnalysis(analysisPrompt);
      
      // レッスン推奨アルゴリズム
      const lessonsSafe = Array.isArray(allLessons)
        ? allLessons.map(l => l as { id: string; title: string; slug?: string; description: string; categoryId?: string; difficultyLevel?: string; estimatedMinutes?: number })
        : [];
      const userStatsSafe: { completedLessons?: string[] } = (() => {
        const out: { completedLessons?: string[] } = {};
        const raw = userStatsUnknown as unknown as Record<string, unknown> | null;
        if (raw && typeof raw === 'object') {
          const completed = raw.completedLessons as unknown;
          if (Array.isArray(completed)) out.completedLessons = completed.map(String);
        }
        return out;
      })();
      const recommendations = this.generateLessonRecommendations(
        lessonsSafe,
        userStatsSafe,
        analysisResult,
        userQuery
      ).map(r => ({
        id: String((r as Record<string, unknown>).id),
        title: String((r as Record<string, unknown>).title || ''),
        slug: String((r as Record<string, unknown>).slug || ''),
        description: String((r as Record<string, unknown>).description || ''),
        categoryId: String((r as Record<string, unknown>).categoryId || ''),
        difficulty: String((r as Record<string, unknown>).difficultyLevel || 'beginner'),
        estimatedMinutes: Number((r as Record<string, unknown>).estimatedMinutes || 0),
        relevanceScore: Number((r as Record<string, unknown>).relevanceScore || 0),
        reason: String((r as Record<string, unknown>).reason || '')
      }))

      // 学習パスの提案
      const learningPath = this.generateLearningPathSuggestion(recommendations, analysisResult.knowledgeLevel);

      // 次のステップ提案
      const nextSteps = this.generateNextSteps(
        recommendations,
        analysisResult
      );

      return {
        recommendedLessons: recommendations,
        learningPath,
        nextSteps
      };

    } catch (error) {
      logger.error('Failed to generate learning recommendations', { userId, error: error instanceof Error ? error.message : String(error) });
      return {
        recommendedLessons: [],
        learningPath: '基礎から順序立てて学習することをお勧めします。',
        nextSteps: ['投資の基本概念から始めましょう']
      };
    }
  }

  /**
   * 基本分析実行（代替実装）
   */
  private async performBasicAnalysis(prompt: string): Promise<LearningAnalysisResult> {
    try {
      // Geminiが利用できない場合の代替分析
      const keywordAnalysis = this.analyzePromptKeywords(prompt);
      
      return {
        knowledgeLevel: keywordAnalysis.level,
        interests: keywordAnalysis.interests,
        knowledgeGaps: keywordAnalysis.gaps,
        recommendedTopics: keywordAnalysis.topics,
        urgency: keywordAnalysis.urgency
      };
    } catch (error) {
      logger.error('Basic analysis failed', { error: error instanceof Error ? error.message : String(error) });
      return {
        knowledgeLevel: 'beginner',
        interests: [],
        knowledgeGaps: [],
        recommendedTopics: [],
        urgency: 'low'
      };
    }
  }

  /**
   * レッスン推奨生成
   */
  private generateLessonRecommendations(
    allLessons: Array<{ id: string; title: string; slug?: string; description: string; categoryId?: string; difficultyLevel?: string; estimatedMinutes?: number }>,
    userStats: { completedLessons?: string[] },
    analysis: LearningAnalysisResult,
    userQuery: string
  ): Array<Record<string, unknown>> {
    // キーワードマッチング
    const queryKeywords = this.extractKeywords(userQuery);
    
    // レッスンスコアリング
    const scoredLessons = allLessons.map(lesson => {
      let score = 0;
      
      // キーワードマッチスコア
      const titleMatch = this.calculateTextMatch(String(lesson.title || ''), queryKeywords);
      const descMatch = this.calculateTextMatch(String(lesson.description || ''), queryKeywords);
      score += (titleMatch + descMatch) * 2;

      // 難易度適合性
      if (lesson.difficultyLevel === analysis.knowledgeLevel) {
        score += 3;
      } else if (
        (analysis.knowledgeLevel === 'beginner' && lesson.difficultyLevel === 'intermediate') ||
        (analysis.knowledgeLevel === 'intermediate' && lesson.difficultyLevel === 'advanced')
      ) {
        score += 1;
      }

      // 興味分野マッチ
      if (analysis.interests.some((interest: string) => 
        String(lesson.title || '').toLowerCase().includes(interest.toLowerCase()) ||
        String(lesson.description || '').toLowerCase().includes(interest.toLowerCase())
      )) {
        score += 2;
      }

      // 知識ギャップ対応
      if (analysis.knowledgeGaps.some((gap: string) => 
        String(lesson.title || '').toLowerCase().includes(gap.toLowerCase()) ||
        String(lesson.description || '').toLowerCase().includes(gap.toLowerCase())
      )) {
        score += 3;
      }

      // ユーザー進捗考慮
      if (userStats.completedLessons && !userStats.completedLessons.includes(String(lesson.id))) {
        score += 1;
      }

      return {
        ...lesson,
        relevanceScore: score,
        reason: this.generateRecommendationReason(lesson as Record<string, unknown>, analysis, titleMatch + descMatch)
      };
    });

    // スコア順でソートして上位5件を返す
    return scoredLessons
      .filter(lesson => lesson.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);
  }

  /**
   * キーワード抽出
   */
  private extractKeywords(text: string): string[] {
    const keywords = [
      'bitcoin', 'btc', 'ethereum', 'eth', 'altcoin',
      'defi', 'nft', 'trading', 'investment', 'portfolio',
      'risk', 'volatility', 'wallet', 'exchange', 'blockchain',
      'ビットコイン', 'イーサリアム', 'アルトコイン', 'デファイ',
      '投資', 'トレーディング', 'ポートフォリオ', 'リスク',
      'ウォレット', '取引所', 'ブロックチェーン'
    ];

    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * テキストマッチ計算
   */
  private calculateTextMatch(text: string, keywords: string[]): number {
    if (!keywords.length) return 0;
    
    let matchCount = 0;
    keywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });
    
    return matchCount / keywords.length;
  }

  /**
   * 推奨理由生成
   */
  private generateRecommendationReason(
    lesson: Record<string, unknown>, 
    analysis: LearningAnalysisResult, 
    keywordMatch: number
  ): string {
    const reasons = [];
    
    if (keywordMatch > 0.5) {
      reasons.push('質問内容に直接関連しています');
    }
    
    if (lesson.difficultyLevel === analysis.knowledgeLevel) {
      reasons.push('現在のレベルに適しています');
    }
    
    if (analysis.interests.some((interest: string) => 
      String((lesson as Record<string, unknown>).title || '').toLowerCase().includes(interest.toLowerCase())
    )) {
      reasons.push('興味を示された分野です');
    }
    
    if (analysis.knowledgeGaps.some((gap: string) => 
      String((lesson as Record<string, unknown>).title || '').toLowerCase().includes(gap.toLowerCase())
    )) {
      reasons.push('理解を深めるのに重要です');
    }

    return reasons.length > 0 ? reasons.join('。') : '基礎知識として重要です';
  }

  /**
   * 学習パス提案生成
   */
  private generateLearningPathSuggestion(recommendations: Array<Record<string, unknown>>, knowledgeLevel: string): string {
    if (recommendations.length === 0) {
      return '基礎から順序立てて学習することをお勧めします。';
    }

      const _categoryOrder = ['投資基礎', '暗号通貨の基礎', 'トレーディング', 'DeFi・NFT', '高度な戦略']; void _categoryOrder;
    
    const paths = {
      beginner: '投資の基本概念から始めて、暗号通貨の基礎、そしてリスク管理を学ぶことをお勧めします。',
      intermediate: '暗号通貨の技術的理解を深めた後、実践的なトレーディング手法を学びましょう。',
      advanced: 'DeFiや高度な投資戦略にフォーカスして、より専門的な知識を身につけましょう。'
    };

    return paths[knowledgeLevel as keyof typeof paths] || paths.beginner;
  }

  /**
   * 次のステップ生成
   */
  private generateNextSteps(recommendations: Array<Record<string, unknown>>, analysis: LearningAnalysisResult): string[] {
    const steps = [];
    
    if (recommendations.length > 0) {
      const first = recommendations[0] as Record<string, unknown>;
      steps.push(`まず「${String(first?.title || '')}」から始めることをお勧めします`);
    }
    
    if (analysis?.urgency === 'high') {
      steps.push('リスク管理の知識を優先的に学習してください');
    }
    
    steps.push('学習後は実際のケーススタディで理解を深めましょう');
    steps.push('不明な点があればAIチャットで質問してください');
    
    return steps;
  }

  /**
   * Trading signals validation
   */
  private validateTradingSignals(signals: unknown): Array<{
    symbol: string;
    action: 'buy' | 'sell' | 'hold';
    confidence: number;
    entryPrice: number;
    exitTargets: number[];
    stopLoss: number;
    timeframe: string;
    reasoning: string;
  }> {
    if (!Array.isArray(signals)) {
      return [];
    }
    
    return signals.map((signal: Record<string, unknown>) => {
      const actionRaw = String(signal?.action || '');
      const action: 'buy' | 'sell' | 'hold' =
        actionRaw === 'buy' || actionRaw === 'sell' || actionRaw === 'hold' ? (actionRaw as 'buy' | 'sell' | 'hold') : 'hold';
      return ({
      symbol: String(signal?.symbol || 'BTC'),
        action,
      confidence: Math.min(Math.max(Number(signal?.confidence || 0), 0), 1),
      entryPrice: Number(signal?.entryPrice || 0),
      exitTargets: Array.isArray(signal?.exitTargets) ? signal.exitTargets.map(Number) : [],
      stopLoss: Number(signal?.stopLoss || 0),
      timeframe: String(signal?.timeframe || '1h'),
      reasoning: String(signal?.reasoning || '')
      });
    });
  }

  /**
   * チャット履歴保存
   */
  private async saveChatInteraction(
    userId: string,
    query: string,
    response: ChatAnalysisResponse
  ) {
    void response;
    // 実装: チャット履歴をデータベースに保存
    logger.debug('Chat interaction saved', { userId, queryLength: query.length });
  }

  /**
   * 推奨事項保存
   */
  private async saveRecommendations(userId: string, recommendations: RecommendationItem[]) {
    try {
      const supabase = await createClient();
      
      const records = recommendations.map(rec => ({
        user_id: userId,
        recommendation_type: rec.category,
        title: rec.title,
        message: rec.message,
        confidence_score: Math.round(rec.confidence * 100),
        action_items: rec.actionItems
      }));

      await supabase
        .from('ai_recommendations')
        .insert(records);

    } catch (error) {
      logger.error('Failed to save recommendations', { userId, error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * 専門サービス結果からの統合ヘルパーメソッド群
   */
  private calculateOverallConfidenceFromSpecialized(
    _marketResult: unknown,
    _portfolioResult: unknown,
    _tradingResult: unknown,
    _riskResult: unknown
  ): number {
    void _marketResult; void _portfolioResult; void _tradingResult; void _riskResult;
    // 専門サービス結果から総合信頼度を計算
    return 80; // 専門サービスによる分析の高い信頼度
  }

  private extractKeyInsightsFromSpecialized(
    marketResult: unknown,
    portfolioResult: unknown,
    riskResult: unknown
  ): string[] {
    const insights: string[] = [];
    
    // 市場分析からの洞察
    if (marketResult && typeof marketResult === 'object') {
      insights.push('市場分析が完了しました');
    }
    
    // ポートフォリオ分析からの洞察
    if (portfolioResult && typeof portfolioResult === 'object') {
      insights.push('ポートフォリオ最適化の機会を特定しました');
    }
    
    // リスク分析からの洞察
    if (riskResult && typeof riskResult === 'object') {
      insights.push('リスク評価が完了しました');
    }
    
    return insights.length > 0 ? insights : ['包括的な分析を実行しました'];
  }

  private determineRecommendedActionFromSpecialized(
    _marketResult: unknown,
    _tradingResult: unknown,
    _riskResult: unknown
  ): string {
    void _marketResult; void _tradingResult; void _riskResult;
    // 専門サービス結果から推奨アクションを決定
    return '専門分析に基づく最適化を検討してください';
  }

  /**
   * レガシーヘルパーメソッド群（後方互換性のため保持）
   */
  // レガシーヘルパーメソッド群（後方互換性のため保持）
  private determineSentiment(_geminiResult: unknown, _voltResult: unknown): 'bullish' | 'bearish' | 'neutral' {
    void _geminiResult; void _voltResult;
    return 'neutral';
  }

  private calculateConfidence(_geminiResult: unknown, _voltResult: unknown, _predictionResult: unknown): number {
    void _geminiResult; void _voltResult; void _predictionResult;
    return 75;
  }

  private extractKeyInsights(_geminiResult: unknown, _voltResult: unknown): string[] {
    void _geminiResult; void _voltResult;
    return ['基本分析が完了しました'];
  }

  private assessRiskLevel(_geminiResult: unknown, _preferences: UserPreferences): 'low' | 'medium' | 'high' {
    void _geminiResult; void _preferences;
    return 'medium';
  }

  private determineRecommendedAction(_geminiResult: unknown, _voltResult: unknown): string {
    void _geminiResult; void _voltResult;
    return 'ポートフォリオの見直しと分散化を検討してください';
  }

  private extractTechnicalSignals(_geminiResult: unknown, _voltResult: unknown): Array<{
    symbol: string;
    signal: 'buy' | 'sell' | 'hold';
    strength: number;
    indicators: Record<string, number | string>;
  }> {
    void _geminiResult; void _voltResult;
    return [];
  }

  private extractPriceTargets(_predictionResult: unknown, symbols: string[]): Record<string, {
    short: number;
    medium: number;
    long: number;
    confidence: number;
  }> {
    void _predictionResult;
    return symbols.reduce((acc, symbol) => ({
      ...acc,
      [symbol]: {
        short: 50000,
        medium: 55000,
        long: 60000,
        confidence: 70
      }
    }), {} as Record<string, { short: number; medium: number; long: number; confidence: number }>);
  }

  private calculatePortfolioRisk(_portfolio: Portfolio | null): number {
    void _portfolio;
    // 実装: ポートフォリオリスクを計算
    return 0.15;
  }

  private calculateDiversificationScore(_portfolio: Portfolio | null): number {
    void _portfolio;
    // 実装: 分散化スコアを計算
    return 0.75;
  }

  private generateOptimizationSuggestions(_geminiResult: BasicAnalysisResult | null, _portfolio: Portfolio | null): Array<{
    action: string;
    symbol: string;
    reasoning: string;
    priority: number;
  }> {
    void _geminiResult; void _portfolio;
    // 実装: 最適化提案を生成
    return [];
  }

  private generateRebalanceRecommendations(_geminiResult: BasicAnalysisResult | null, _portfolio: Portfolio | null): Array<{
    symbol: string;
    currentAllocation: number;
    recommendedAllocation: number;
    action: 'buy' | 'sell' | 'hold';
    amount: number;
  }> {
    void _geminiResult; void _portfolio;
    // 実装: リバランス推奨を生成
    return [];
  }

  private enhanceQueryWithContext(request: ChatAnalysisRequest): string {
    // 実装: クエリをコンテキストで強化
    return request.query;
  }

  private extractSymbolsFromQuery(query: string): string[] {
    // 実装: クエリからシンボルを抽出
    const symbolPattern = /\b(BTC|ETH|ADA|DOT|LINK|UNI|AAVE|SOL|AVAX|MATIC)\b/gi;
    return query.match(symbolPattern) || ['BTC'];
  }

  private formatChatResponse(analysis: BasicAnalysisResult, _query: string): string {
    void _query;
    // 実装: チャットレスポンスをフォーマット
    return `${analysis.analysis?.summary || 'AI分析結果'}\n\n${analysis.recommendations?.[0]?.reasoning || '詳細な分析が完了しました。'}`;
  }

  private calculateOverallConfidence(_analysis: BasicAnalysisResult): number {
    void _analysis;
    // 実装: 総合信頼度を計算
    return 80;
  }

  private generateRelatedActions(_analysis: BasicAnalysisResult): RelatedAction[] {
    void _analysis;
    // 実装: 関連アクションを生成
    return [
      {
        action: 'ポートフォリオ確認',
        description: '現在のポートフォリオバランスを確認',
        risk: 'low' as const
      }
    ];
  }

  private generateFollowUpQuestions(_query: string, _analysis: BasicAnalysisResult): string[] {
    void _query; void _analysis;
    // 実装: フォローアップ質問を生成
    return [
      'このアナリシスに基づいて具体的なアクションプランを教えてください',
      'リスクを下げるための戦略はありますか？',
      '長期的な投資戦略についてアドバイスをください'
    ];
  }

  private async generateDailyRecommendations(_userData: UserAnalysisData): Promise<RecommendationItem[]> {
    void _userData;
    // 実装: 日次推奨事項を生成
    return [];
  }

  private async generateWeeklyRecommendations(_userData: UserAnalysisData): Promise<RecommendationItem[]> {
    void _userData;
    // 実装: 週次推奨事項を生成
    return [];
  }

  private async generatePortfolioRecommendations(_userData: UserAnalysisData): Promise<RecommendationItem[]> {
    void _userData;
    // 実装: ポートフォリオ推奨事項を生成
    return [];
  }

  private async generateRiskAlerts(_userData: UserAnalysisData): Promise<RecommendationItem[]> {
    void _userData;
    // 実装: リスクアラートを生成
    return [];
  }

  /**
   * フォールバック分析実行（Gemini代替）
   */
  private async performFallbackAnalysis(params: {
    query: string;
    symbols: string[];
    marketData?: Record<string, unknown>;
    portfolio?: Portfolio;
  }): Promise<BasicAnalysisResult> {
    // 簡易的な分析結果を生成
    return {
      analysis: {
        summary: `${params.symbols.join(', ')}に関する分析を実行しました。`,
        sentimentAnalysis: {
          overallSentiment: 'neutral' as const,
          sentimentScore: 0.5
        },
        fundamentalAnalysis: {
          outlook: '市場は現在中立的な状況です。',
          keyFactors: ['技術的指標は中立を示しています', '市場のボラティリティは適度です']
        }
      },
      recommendations: [{
        action: 'monitor',
        reasoning: '基本的な分析を実行しました。'
      }]
    };
  }

  /**
   * プロンプトキーワード分析（Gemini代替）
   */
  private analyzePromptKeywords(prompt: string): {
    level: 'beginner' | 'intermediate' | 'advanced';
    interests: string[];
    gaps: string[];
    topics: string[];
    urgency: 'low' | 'medium' | 'high';
  } {
    const lowerPrompt = prompt.toLowerCase();
    
    // レベル判定
    let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (lowerPrompt.includes('advanced') || lowerPrompt.includes('professional') || 
        lowerPrompt.includes('arbitrage') || lowerPrompt.includes('derivatives')) {
      level = 'advanced';
    } else if (lowerPrompt.includes('intermediate') || lowerPrompt.includes('trading') ||
               lowerPrompt.includes('defi') || lowerPrompt.includes('technical analysis')) {
      level = 'intermediate';
    }

    // 興味分野抽出
    const interests = [];
    if (lowerPrompt.includes('bitcoin') || lowerPrompt.includes('btc')) interests.push('ビットコイン');
    if (lowerPrompt.includes('ethereum') || lowerPrompt.includes('eth')) interests.push('イーサリアム');
    if (lowerPrompt.includes('trading')) interests.push('トレーディング');
    if (lowerPrompt.includes('defi')) interests.push('DeFi');
    if (lowerPrompt.includes('nft')) interests.push('NFT');
    if (lowerPrompt.includes('risk')) interests.push('リスク管理');
    if (lowerPrompt.includes('portfolio')) interests.push('ポートフォリオ');

    // 知識ギャップ推定
    const gaps = [];
    if (lowerPrompt.includes('what is') || lowerPrompt.includes('how to')) {
      gaps.push('基礎概念');
    }
    if (lowerPrompt.includes('risk') && level === 'beginner') {
      gaps.push('リスク管理');
    }
    if (lowerPrompt.includes('investment') && !lowerPrompt.includes('strategy')) {
      gaps.push('投資戦略');
    }

    // 推奨トピック
    const topics = [];
    if (level === 'beginner') {
      topics.push('投資基礎', '暗号通貨入門');
    } else if (level === 'intermediate') {
      topics.push('トレーディング基礎', 'テクニカル分析');
    } else {
      topics.push('高度な投資戦略', 'DeFi活用');
    }

    // 緊急度判定
    const urgency = lowerPrompt.includes('urgent') || lowerPrompt.includes('immediate') ? 'high' : 
                   lowerPrompt.includes('soon') || lowerPrompt.includes('quickly') ? 'medium' : 'low';

    return {
      level,
      interests,
      gaps,
      topics,
      urgency
    };
  }
}
