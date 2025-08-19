//
import { logger } from '@/lib/monitoring/logger'
import { structuredOutputs, StructuredOutputConfig } from './structured-outputs'
import {
  MarketAnalysisSchema,
  PortfolioAnalysisSchema,
  TradingSignalsSchema,
  RiskAnalysisSchema,
  AIChatResponseSchema,
  AlertSummarySchema,
  LearningRecommendationSchema,
  PricePredictionSchema,
  DeFiAnalysisSchema,
  NewsAnalysisSchema,
} from './schemas/structured-schemas'
import type {
  MarketAnalysis,
  PortfolioAnalysis,
  TradingSignals,
  RiskAnalysis,
  AIChatResponse,
  AlertSummary,
  LearningRecommendation,
  PricePrediction,
  DeFiAnalysis,
  NewsAnalysis,
  ComprehensiveAnalysis
} from './schemas/structured-schemas'

// Request interfaces for different analysis types
export interface MarketAnalysisRequest {
  symbols: string[]
  timeframe: string
  analysisDepth: 'basic' | 'comprehensive'
  userContext?: {
    riskTolerance: 'low' | 'medium' | 'high'
    investmentHorizon: 'short' | 'medium' | 'long'
    tradingExperience: 'beginner' | 'intermediate' | 'advanced'
  }
}

export interface PortfolioAnalysisRequest {
  portfolio: {
    holdings: Array<{
      symbol: string
      amount: number
      value: number
      costBasis?: number
    }>
    totalValue: number
  }
  userGoals?: string[]
  riskTolerance?: 'low' | 'medium' | 'high'
}

export interface TradingSignalsRequest {
  symbols: string[]
  strategy: 'scalping' | 'day_trading' | 'swing_trading' | 'position_trading'
  riskLevel: 'low' | 'medium' | 'high'
  timeframes: string[]
}

export interface RiskAnalysisRequest {
  portfolio?: {
    holdings: Array<{
      symbol: string
      amount: number
      value: number
    }>
    totalValue: number
  }
  timeHorizon: string
  scenarios: string[]
}

export interface ChatAnalysisRequest {
  query: string
  context?: {
    previousMessages?: Array<{ role: string; content: string }>
    userProfile?: {
      experienceLevel: 'beginner' | 'intermediate' | 'advanced'
      interests: string[]
    }
    marketContext?: Record<string, unknown>
  }
}

export interface LearningAnalysisRequest {
  userQuery: string
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
  completedLessons: string[]
  interests: string[]
}

export interface PricePredictionRequest {
  symbol: string
  timeframes: string[]
  analysisType: 'technical' | 'fundamental' | 'hybrid'
}

export interface DeFiAnalysisRequest {
  protocol: string
  strategy: string
  userRiskProfile: 'conservative' | 'moderate' | 'aggressive'
  amount?: number
}

export interface NewsAnalysisRequest {
  newsContent: string
  relevantAssets?: string[]
  analysisType: 'sentiment' | 'impact' | 'comprehensive'
}

// Structured AI Service class
export class StructuredAIService {
  private config: StructuredOutputConfig

  constructor(config: StructuredOutputConfig = {}) {
    this.config = {
      model: 'gpt-4o-2024-08-06',
      temperature: 0.1,
      max_tokens: 4000,
      ...config
    }
  }

  /**
   * Market Analysis with structured output
   */
  async analyzeMarket(request: MarketAnalysisRequest): Promise<MarketAnalysis> {
    const prompt = this.buildMarketAnalysisPrompt(request)
    
    logger.info('Generating market analysis with structured output', {
      symbols: request.symbols,
      timeframe: request.timeframe,
      depth: request.analysisDepth
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      MarketAnalysisSchema,
      this.config
    )

    return result.data
  }

  /**
   * Portfolio Analysis with structured output
   */
  async analyzePortfolio(request: PortfolioAnalysisRequest): Promise<PortfolioAnalysis> {
    const prompt = this.buildPortfolioAnalysisPrompt(request)
    
    logger.info('Generating portfolio analysis with structured output', {
      totalValue: request.portfolio.totalValue,
      holdingsCount: request.portfolio.holdings.length
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      PortfolioAnalysisSchema,
      this.config
    )

    return result.data
  }

  /**
   * Trading Signals with structured output
   */
  async generateTradingSignals(request: TradingSignalsRequest): Promise<TradingSignals> {
    const prompt = this.buildTradingSignalsPrompt(request)
    
    logger.info('Generating trading signals with structured output', {
      symbols: request.symbols,
      strategy: request.strategy,
      riskLevel: request.riskLevel
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      TradingSignalsSchema,
      this.config
    )

    return result.data
  }

  /**
   * Risk Analysis with structured output
   */
  async analyzeRisk(request: RiskAnalysisRequest): Promise<RiskAnalysis> {
    const prompt = this.buildRiskAnalysisPrompt(request)
    
    logger.info('Generating risk analysis with structured output', {
      hasPortfolio: !!request.portfolio,
      timeHorizon: request.timeHorizon,
      scenarios: request.scenarios
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      RiskAnalysisSchema,
      this.config
    )

    return result.data
  }

  /**
   * AI Chat Response with structured output
   */
  async generateChatResponse(request: ChatAnalysisRequest): Promise<AIChatResponse> {
    const prompt = this.buildChatAnalysisPrompt(request)
    
    logger.info('Generating chat response with structured output', {
      queryLength: request.query.length,
      hasContext: !!request.context
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      AIChatResponseSchema,
      this.config
    )

    return result.data
  }

  /**
   * Alert Summary with structured output (for user notifications)
   */
  async summarizeAlert(request: { text: string }): Promise<AlertSummary> {
    const prompt = `あなたは暗号資産のアラート説明を要約する専門アシスタントです。以下のテキストから、短い要約（日本語）、要点、推奨アクション（簡潔に）、参考情報URL、フォローアップ質問を構造化して返してください。\n\n---\n${request.text}\n---\n`
    const result = await structuredOutputs.generateWithSchema(
      prompt,
      AlertSummarySchema,
      this.config
    )
    return result.data
  }

  /**
   * Learning Recommendations with structured output
   */
  async generateLearningRecommendations(request: LearningAnalysisRequest): Promise<LearningRecommendation> {
    const prompt = this.buildLearningAnalysisPrompt(request)
    
    logger.info('Generating learning recommendations with structured output', {
      currentLevel: request.currentLevel,
      completedLessons: request.completedLessons.length,
      interests: request.interests
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      LearningRecommendationSchema,
      this.config
    )

    return result.data
  }

  /**
   * Price Prediction with structured output
   */
  async predictPrice(request: PricePredictionRequest): Promise<PricePrediction> {
    const prompt = this.buildPricePredictionPrompt(request)
    
    logger.info('Generating price prediction with structured output', {
      symbol: request.symbol,
      timeframes: request.timeframes,
      analysisType: request.analysisType
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      PricePredictionSchema,
      this.config
    )

    return result.data
  }

  /**
   * DeFi Analysis with structured output
   */
  async analyzeDeFi(request: DeFiAnalysisRequest): Promise<DeFiAnalysis> {
    const prompt = this.buildDeFiAnalysisPrompt(request)
    
    logger.info('Generating DeFi analysis with structured output', {
      protocol: request.protocol,
      strategy: request.strategy,
      riskProfile: request.userRiskProfile
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      DeFiAnalysisSchema,
      this.config
    )

    return result.data
  }

  /**
   * News Analysis with structured output
   */
  async analyzeNews(request: NewsAnalysisRequest): Promise<NewsAnalysis> {
    const prompt = this.buildNewsAnalysisPrompt(request)
    
    logger.info('Generating news analysis with structured output', {
      contentLength: request.newsContent.length,
      relevantAssets: request.relevantAssets,
      analysisType: request.analysisType
    })

    const result = await structuredOutputs.generateWithSchema(
      prompt,
      NewsAnalysisSchema,
      this.config
    )

    return result.data
  }

  /**
   * Comprehensive Analysis combining multiple structured outputs
   */
  async performComprehensiveAnalysis(
    marketRequest: MarketAnalysisRequest,
    portfolioRequest?: PortfolioAnalysisRequest,
    riskRequest?: RiskAnalysisRequest
  ): Promise<ComprehensiveAnalysis> {
    try {
      // Run analyses in parallel
      const promises = [
        this.analyzeMarket(marketRequest),
        portfolioRequest ? this.analyzePortfolio(portfolioRequest) : Promise.resolve(undefined),
        riskRequest ? this.analyzeRisk(riskRequest) : Promise.resolve(undefined)
      ] as const

      const [marketAnalysis, portfolioAnalysis, riskAnalysis] = await Promise.all(promises)

      if (!riskAnalysis) {
        throw new Error('Risk analysis is required for comprehensive analysis')
      }

      return {
        marketAnalysis,
        portfolioAnalysis,
        riskAnalysis,
        timestamp: new Date().toISOString(),
        disclaimer: 'これは教育目的の分析であり、投資助言ではありません。投資判断は自己責任でお願いします。'
      }
    } catch (error) {
      logger.error('Comprehensive analysis failed', { error })
      throw error
    }
  }

  // Private prompt building methods
  private buildMarketAnalysisPrompt(request: MarketAnalysisRequest): string {
    return `あなたは暗号通貨市場の専門アナリストです。以下の条件で市場分析を行ってください：

分析対象: ${request.symbols.join(', ')}
時間軸: ${request.timeframe}
分析レベル: ${request.analysisDepth}
${request.userContext ? `ユーザー情報: リスク許容度 ${request.userContext.riskTolerance}, 投資期間 ${request.userContext.investmentHorizon}, 経験レベル ${request.userContext.tradingExperience}` : ''}

現在の市場状況を分析し、技術的指標、センチメント、価格目標、リスク要因、機会、および具体的な推奨事項を含む包括的な分析を提供してください。

重要: すべての価格目標と数値は現実的で、現在の市場価格に基づいて設定してください。信頼度は分析の確実性に基づいて設定してください。`
  }

  private buildPortfolioAnalysisPrompt(request: PortfolioAnalysisRequest): string {
    const holdings = request.portfolio.holdings.map(h => 
      `${h.symbol}: ${h.amount} (${h.value}ドル相当)`
    ).join(', ')

    return `あなたは投資ポートフォリオ最適化の専門家です。以下のポートフォリオを分析してください：

保有資産: ${holdings}
総額: ${request.portfolio.totalValue}ドル
${request.userGoals ? `投資目標: ${request.userGoals.join(', ')}` : ''}
${request.riskTolerance ? `リスク許容度: ${request.riskTolerance}` : ''}

ポートフォリオのリスク評価、分散度、パフォーマンス、最適な資産配分、リバランシング推奨、および具体的な最適化提案を提供してください。

現実的な数値を使用し、実際の市場データに基づいて分析してください。`
  }

  private buildTradingSignalsPrompt(request: TradingSignalsRequest): string {
    return `あなたは暗号通貨トレーディングの専門家です。以下の条件でトレーディングシグナルを生成してください：

対象銘柄: ${request.symbols.join(', ')}
戦略: ${request.strategy}
リスクレベル: ${request.riskLevel}
時間軸: ${request.timeframes.join(', ')}

各銘柄について、エントリーポイント、ストップロス、利益確定目標、リスクリワード比、および詳細な根拠を含むトレーディングシグナルを提供してください。

現在の市場状況と技術的指標に基づいて、実践的で実行可能なシグナルを生成してください。`
  }

  private buildRiskAnalysisPrompt(request: RiskAnalysisRequest): string {
    const portfolioInfo = request.portfolio ? 
      `ポートフォリオ: ${request.portfolio.holdings.map(h => `${h.symbol}: ${h.value}ドル`).join(', ')} (総額: ${request.portfolio.totalValue}ドル)` :
      'ポートフォリオ情報なし'

    return `あなたはリスク管理の専門家です。以下の条件でリスク分析を行ってください：

${portfolioInfo}
投資期間: ${request.timeHorizon}
分析シナリオ: ${request.scenarios.join(', ')}

包括的なリスク評価、ストレステスト結果、リスク要因の特定、軽減戦略、および具体的な推奨事項を提供してください。

確率と数値は現実的で、過去の市場データに基づいて設定してください。`
  }

  private buildChatAnalysisPrompt(request: ChatAnalysisRequest): string {
    const contextInfo = request.context ? [
      request.context.userProfile ? `ユーザーレベル: ${request.context.userProfile.experienceLevel}` : '',
      request.context.userProfile?.interests ? `関心分野: ${request.context.userProfile.interests.join(', ')}` : '',
      request.context.previousMessages ? `過去の会話: ${request.context.previousMessages.length}件` : ''
    ].filter(Boolean).join(', ') : ''

    return `あなたは暗号通貨投資の専門アドバイザーです。以下のユーザーの質問に回答してください：

質問: "${request.query}"
${contextInfo ? `コンテキスト: ${contextInfo}` : ''}

専門的で実用的な回答を提供し、キーポイント、情報源、フォローアップ質問、および関連する行動項目を含めてください。

回答は教育的で、適切な免責事項を含めてください。投資助言ではなく、教育情報であることを明確にしてください。`
  }

  private buildLearningAnalysisPrompt(request: LearningAnalysisRequest): string {
    return `あなたは暗号通貨・投資教育の専門家です。以下のユーザーの学習ニーズを分析してください：

ユーザーの質問: "${request.userQuery}"
現在のレベル: ${request.currentLevel}
完了済みレッスン数: ${request.completedLessons.length}
関心分野: ${request.interests.join(', ')}

ユーザーの知識ギャップを特定し、適切なレッスンを推奨し、学習パスを提案し、次のステップと学習のモチベーションを提供してください。

推奨は個人の学習レベルと進捗に合わせてカスタマイズしてください。`
  }

  private buildPricePredictionPrompt(request: PricePredictionRequest): string {
    return `あなたは暗号通貨価格予測の専門家です。以下の条件で価格予測を行ってください：

銘柄: ${request.symbol}
予測期間: ${request.timeframes.join(', ')}
分析手法: ${request.analysisType}

技術的分析、ファンダメンタル分析、市場センチメントを組み合わせて、複数のシナリオでの価格予測を提供してください。

予測は現実的で、適切な信頼度スコアと主要な価格推進要因を含めてください。リスクも明記してください。`
  }

  private buildDeFiAnalysisPrompt(request: DeFiAnalysisRequest): string {
    return `あなたはDeFi（分散型金融）の専門アナリストです。以下の条件でDeFi分析を行ってください：

プロトコル: ${request.protocol}
戦略: ${request.strategy}
リスクプロファイル: ${request.userRiskProfile}
${request.amount ? `投資予定額: ${request.amount}ドル` : ''}

プロトコルの安全性、収益機会、リスク要因、推奨戦略、および監視すべき指標を含む包括的な分析を提供してください。

スマートコントラクトリスク、流動性リスク、インパーマネントロスなど、DeFi特有のリスクを詳細に分析してください。`
  }

  private buildNewsAnalysisPrompt(request: NewsAnalysisRequest): string {
    return `あなたは暗号通貨ニュース分析の専門家です。以下のニュース内容を分析してください：

ニュース内容: "${request.newsContent}"
${request.relevantAssets ? `関連資産: ${request.relevantAssets.join(', ')}` : ''}
分析タイプ: ${request.analysisType}

ニュースの市場インパクト、センチメント、関連する暗号資産への影響、トレーディング機会、および推奨アクションを分析してください。

分析は客観的で、短期・中期・長期の市場への影響を時系列で評価してください。`
  }
}

// Export singleton instance
export const structuredAI = new StructuredAIService()

// Helper functions for common operations
export async function analyzeMarketWithStructure(request: MarketAnalysisRequest): Promise<MarketAnalysis> {
  return structuredAI.analyzeMarket(request)
}

export async function generateStructuredChatResponse(request: ChatAnalysisRequest): Promise<AIChatResponse> {
  return structuredAI.generateChatResponse(request)
}

export async function getStructuredTradingSignals(request: TradingSignalsRequest): Promise<TradingSignals> {
  return structuredAI.generateTradingSignals(request)
}
