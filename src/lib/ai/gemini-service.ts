// 🤖 Gemini API 統合サービス
// 市場分析・投資推奨・リスク評価のAI機能

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { logger } from '@/lib/monitoring/logger';

interface MarketAnalysisRequest {
  symbols: string[];
  timeframe: '1h' | '4h' | '1d' | '7d' | '30d';
  analysisType: 'technical' | 'fundamental' | 'sentiment' | 'comprehensive';
  marketData: {
    prices: Record<string, number>;
    volumes: Record<string, number>;
    marketCaps: Record<string, number>;
    priceChanges: Record<string, number>;
  };
  additionalContext?: {
    news?: string[];
    socialSentiment?: number;
    fearGreedIndex?: number;
    userPortfolio?: {
      assets: Array<{ symbol: string; amount: number; value: number }>;
      totalValue: number;
    };
  };
}

interface MarketAnalysisResponse {
  analysis: {
    summary: string;
    technicalAnalysis: {
      signals: Array<{
        symbol: string;
        signal: 'bullish' | 'bearish' | 'neutral';
        confidence: number;
        reasoning: string;
      }>;
      indicators: Record<string, unknown>;
    };
    fundamentalAnalysis: {
      outlook: string;
      keyFactors: string[];
      riskFactors: string[];
    };
    sentimentAnalysis: {
      overallSentiment: 'positive' | 'negative' | 'neutral';
      sentimentScore: number;
      keyDrivers: string[];
    };
  };
  recommendations: Array<{
    type: 'buy' | 'sell' | 'hold' | 'reduce' | 'increase';
    symbol: string;
    reasoning: string;
    confidence: number;
    targetPrice?: number;
    stopLoss?: number;
    timeHorizon: 'short' | 'medium' | 'long';
  }>;
  riskAssessment: {
    portfolioRisk: 'low' | 'medium' | 'high';
    riskScore: number;
    diversificationScore: number;
    volatilityAssessment: string;
    recommendations: string[];
  };
  createdAt: string;
  model: string;
}

interface PortfolioOptimizationRequest {
  currentPortfolio: Array<{
    symbol: string;
    amount: number;
    currentPrice: number;
    allocation: number;
  }>;
  investmentGoals: {
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    timeHorizon: 'short' | 'medium' | 'long';
    investmentAmount?: number;
    targetReturn?: number;
  };
  constraints: {
    maxAllocationPerAsset?: number;
    excludedAssets?: string[];
    minDiversification?: number;
  };
  marketConditions: {
    volatilityIndex: number;
    marketTrend: 'bull' | 'bear' | 'sideways';
    economicIndicators: Record<string, number>;
  };
}

interface PortfolioOptimizationResponse {
  optimizedPortfolio: Array<{
    symbol: string;
    recommendedAllocation: number;
    currentAllocation: number;
    action: 'buy' | 'sell' | 'hold';
    amount: number;
    reasoning: string;
  }>;
  expectedReturn: number;
  expectedRisk: number;
  sharpeRatio: number;
  diversificationImprovement: number;
  rebalancingSteps: Array<{
    step: number;
    action: string;
    symbol: string;
    amount: number;
    impact: string;
  }>;
  analysis: {
    currentVsOptimized: string;
    keyImprovements: string[];
    riskReduction: number;
    returnImprovement: number;
  };
  createdAt: string;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: { generateContent: (prompt: string) => Promise<{ response: { text(): string } }> };

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });
  }

  /**
   * 包括的市場分析を実行
   */
  async analyzeMarket(request: MarketAnalysisRequest): Promise<MarketAnalysisResponse> {
    try {
      const prompt = this.buildMarketAnalysisPrompt(request);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // レスポンスをJSONとしてパース
      const analysisData = this.parseAnalysisResponse(text);

      logger.info('Market analysis completed', {
        symbols: request.symbols,
        analysisType: request.analysisType,
        model: 'gemini-1.5-pro-latest'
      });

      return {
        ...analysisData,
        createdAt: new Date().toISOString(),
        model: 'gemini-1.5-pro-latest'
      };

    } catch (error) {
      logger.error('Market analysis failed', {
        symbols: request.symbols,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * ポートフォリオ最適化分析
   */
  async optimizePortfolio(request: PortfolioOptimizationRequest): Promise<PortfolioOptimizationResponse> {
    try {
      const prompt = this.buildPortfolioOptimizationPrompt(request);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // レスポンスをJSONとしてパース
      const optimizationData = this.parseOptimizationResponse(text);

      logger.info('Portfolio optimization completed', {
        portfolioSize: request.currentPortfolio.length,
        riskTolerance: request.investmentGoals.riskTolerance,
        model: 'gemini-1.5-pro-latest'
      });

      return {
        ...optimizationData,
        createdAt: new Date().toISOString()
      };

    } catch (error) {
      logger.error('Portfolio optimization failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * リスク分析プロンプト生成
   */
  async analyzeRisk(
    portfolio: Array<{ symbol: string; amount: number; value: number }>,
    marketConditions: Record<string, unknown>
  ): Promise<{
    riskScore: number;
    riskFactors: string[];
    recommendations: string[];
    diversificationAnalysis: string;
  }> {
    try {
      const prompt = `
        暗号通貨ポートフォリオのリスク分析を行ってください。

        ポートフォリオ情報:
        ${portfolio.map(asset => `- ${asset.symbol}: ${asset.amount} (価値: $${asset.value})`).join('\n')}

        市場条件:
        ${JSON.stringify(marketConditions, null, 2)}

        以下の形式でJSONレスポンスを提供してください:
        {
          "riskScore": 数値(0-100),
          "riskFactors": ["リスク要因1", "リスク要因2"],
          "recommendations": ["推奨事項1", "推奨事項2"],
          "diversificationAnalysis": "分散化分析の詳細"
        }

        投資助言ではなく、教育目的の分析として提供してください。
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseJsonResponse<{
        riskScore: number;
        riskFactors: string[];
        recommendations: string[];
        diversificationAnalysis: string;
      }>(text);

    } catch (error) {
      logger.error('Risk analysis failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * ニュース分析とセンチメント評価
   */
  async analyzeNewsAndSentiment(
    news: string[],
    symbols: string[]
  ): Promise<{
    overallSentiment: 'positive' | 'negative' | 'neutral';
    sentimentScore: number;
    keyEvents: string[];
    impactAnalysis: Record<string, {
      sentiment: string;
      impact: number;
      reasoning: string;
    }>;
  }> {
    try {
      const prompt = `
        以下のニュース記事を分析し、暗号通貨市場への影響を評価してください。

        対象シンボル: ${symbols.join(', ')}

        ニュース記事:
        ${news.map((article, index) => `${index + 1}. ${article}`).join('\n')}

        以下の形式でJSONレスポンスを提供してください:
        {
          "overallSentiment": "positive/negative/neutral",
          "sentimentScore": 数値(-100から100),
          "keyEvents": ["重要なイベント1", "重要なイベント2"],
          "impactAnalysis": {
            "シンボル1": {
              "sentiment": "positive/negative/neutral",
              "impact": 数値(0-100),
              "reasoning": "影響の理由"
            }
          }
        }

        客観的な分析を提供し、投資助言は含めないでください。
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseJsonResponse<{
        overallSentiment: 'positive' | 'negative' | 'neutral';
        sentimentScore: number;
        keyEvents: string[];
        impactAnalysis: Record<string, { sentiment: string; impact: number; reasoning: string }>
      }>(text);

    } catch (error) {
      logger.error('News sentiment analysis failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * 市場分析プロンプトを構築
   */
  private buildMarketAnalysisPrompt(request: MarketAnalysisRequest): string {
    return `
      暗号通貨市場の包括的分析を実行してください。

      分析対象:
      - シンボル: ${request.symbols.join(', ')}
      - 時間枠: ${request.timeframe}
      - 分析タイプ: ${request.analysisType}

      市場データ:
      価格: ${JSON.stringify(request.marketData.prices)}
      出来高: ${JSON.stringify(request.marketData.volumes)}
      時価総額: ${JSON.stringify(request.marketData.marketCaps)}
      価格変動: ${JSON.stringify(request.marketData.priceChanges)}

      ${request.additionalContext ? `
      追加コンテキスト:
      ${request.additionalContext.news ? `ニュース: ${request.additionalContext.news.join(', ')}` : ''}
      ${request.additionalContext.socialSentiment ? `ソーシャルセンチメント: ${request.additionalContext.socialSentiment}` : ''}
      ${request.additionalContext.fearGreedIndex ? `Fear & Greed Index: ${request.additionalContext.fearGreedIndex}` : ''}
      ` : ''}

      以下の構造化されたJSONフォーマットで分析結果を提供してください:
      {
        "analysis": {
          "summary": "市場概要の詳細分析",
          "technicalAnalysis": {
            "signals": [
              {
                "symbol": "シンボル",
                "signal": "bullish/bearish/neutral",
                "confidence": 数値(0-100),
                "reasoning": "シグナルの根拠"
              }
            ],
            "indicators": {}
          },
          "fundamentalAnalysis": {
            "outlook": "市場見通し",
            "keyFactors": ["要因1", "要因2"],
            "riskFactors": ["リスク1", "リスク2"]
          },
          "sentimentAnalysis": {
            "overallSentiment": "positive/negative/neutral",
            "sentimentScore": 数値(-100から100),
            "keyDrivers": ["要因1", "要因2"]
          }
        },
        "recommendations": [
          {
            "type": "buy/sell/hold/reduce/increase",
            "symbol": "シンボル",
            "reasoning": "推奨理由",
            "confidence": 数値(0-100),
            "timeHorizon": "short/medium/long"
          }
        ],
        "riskAssessment": {
          "portfolioRisk": "low/medium/high",
          "riskScore": 数値(0-100),
          "diversificationScore": 数値(0-100),
          "volatilityAssessment": "ボラティリティ評価",
          "recommendations": ["推奨事項1", "推奨事項2"]
        }
      }

      重要: これは教育目的の分析であり、投資助言ではありません。必ずこの免責事項を分析に含めてください。
    `;
  }

  /**
   * ポートフォリオ最適化プロンプトを構築
   */
  private buildPortfolioOptimizationPrompt(request: PortfolioOptimizationRequest): string {
    return `
      暗号通貨ポートフォリオの最適化分析を実行してください。

      現在のポートフォリオ:
      ${request.currentPortfolio.map(asset => 
        `- ${asset.symbol}: ${asset.amount} ($${asset.currentPrice}), 配分: ${asset.allocation}%`
      ).join('\n')}

      投資目標:
      - リスク許容度: ${request.investmentGoals.riskTolerance}
      - 投資期間: ${request.investmentGoals.timeHorizon}
      ${request.investmentGoals.investmentAmount ? `- 投資額: $${request.investmentGoals.investmentAmount}` : ''}
      ${request.investmentGoals.targetReturn ? `- 目標リターン: ${request.investmentGoals.targetReturn}%` : ''}

      制約条件:
      ${request.constraints.maxAllocationPerAsset ? `- 資産あたり最大配分: ${request.constraints.maxAllocationPerAsset}%` : ''}
      ${request.constraints.excludedAssets ? `- 除外資産: ${request.constraints.excludedAssets.join(', ')}` : ''}
      ${request.constraints.minDiversification ? `- 最小分散化: ${request.constraints.minDiversification}%` : ''}

      市場状況:
      - ボラティリティ指数: ${request.marketConditions.volatilityIndex}
      - 市場トレンド: ${request.marketConditions.marketTrend}
      - 経済指標: ${JSON.stringify(request.marketConditions.economicIndicators)}

      以下のJSONフォーマットで最適化結果を提供してください:
      {
        "optimizedPortfolio": [
          {
            "symbol": "シンボル",
            "recommendedAllocation": 数値(0-100),
            "currentAllocation": 数値(0-100),
            "action": "buy/sell/hold",
            "amount": 数値,
            "reasoning": "推奨理由"
          }
        ],
        "expectedReturn": 数値,
        "expectedRisk": 数値,
        "sharpeRatio": 数値,
        "diversificationImprovement": 数値,
        "rebalancingSteps": [
          {
            "step": 数値,
            "action": "アクション説明",
            "symbol": "シンボル",
            "amount": 数値,
            "impact": "影響説明"
          }
        ],
        "analysis": {
          "currentVsOptimized": "現在vs最適化の比較",
          "keyImprovements": ["改善点1", "改善点2"],
          "riskReduction": 数値,
          "returnImprovement": 数値
        }
      }

      注意: これは教育目的の分析であり、投資助言ではありません。
    `;
  }

  /**
   * 分析レスポンスをパース
   */
  private parseAnalysisResponse(text: string): Omit<MarketAnalysisResponse, 'createdAt' | 'model'> {
    try {
      // JSONブロックを抽出
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      logger.error('Failed to parse analysis response', { text, error: error instanceof Error ? error.message : String(error) });
      throw new Error('Invalid analysis response format');
    }
  }

  /**
   * 最適化レスポンスをパース
   */
  private parseOptimizationResponse(text: string): Omit<PortfolioOptimizationResponse, 'createdAt'> {
    try {
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      logger.error('Failed to parse optimization response', { text, error: error instanceof Error ? error.message : String(error) });
      throw new Error('Invalid optimization response format');
    }
  }

  /**
   * 汎用JSONレスポンスパース
   */
  private parseJsonResponse<T>(text: string): T {
    try {
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      logger.error('Failed to parse JSON response', { text, error: error instanceof Error ? error.message : String(error) });
      throw new Error('Invalid JSON response format');
    }
  }
}
