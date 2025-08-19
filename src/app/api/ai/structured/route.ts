// 🧠 AI Structured Outputs API
// OpenAI Structured Outputs による高精度・型安全な AI 分析

import { NextRequest, NextResponse } from 'next/server'
import { withApiHandler, ApiContext } from '@/lib/auth/middleware'
import { structuredAI } from '@/lib/ai/structured-ai-service'
import { logger } from '@/lib/monitoring/logger'
import { incCounter, startTimer, registerHistogram, isMetricsEnabled } from '@/lib/monitoring/metrics'
import { z } from 'zod'
import type { SupabaseClient } from '@supabase/supabase-js'

// Request validation schemas
const StructuredAnalysisSchema = z.object({
  type: z.enum(['market', 'portfolio', 'trading', 'risk', 'chat', 'learning', 'price_prediction', 'defi', 'news', 'alert_summary']),
  data: z.record(z.string(), z.unknown()) // Flexible data object for different analysis types
})

const MarketAnalysisDataSchema = z.object({
  symbols: z.array(z.string()).min(1).max(10),
  timeframe: z.string().default('1d'),
  analysisDepth: z.enum(['basic', 'comprehensive']).default('comprehensive'),
  userContext: z.object({
    riskTolerance: z.enum(['low', 'medium', 'high']).optional(),
    investmentHorizon: z.enum(['short', 'medium', 'long']).optional(),
    tradingExperience: z.enum(['beginner', 'intermediate', 'advanced']).optional()
  }).optional()
})

const PortfolioAnalysisDataSchema = z.object({
  includePortfolio: z.boolean().default(true),
  userGoals: z.array(z.string()).optional(),
  riskTolerance: z.enum(['low', 'medium', 'high']).optional()
})

const TradingSignalsDataSchema = z.object({
  symbols: z.array(z.string()).min(1).max(10),
  strategy: z.enum(['scalping', 'day_trading', 'swing_trading', 'position_trading']).default('swing_trading'),
  riskLevel: z.enum(['low', 'medium', 'high']).default('medium'),
  timeframes: z.array(z.string()).default(['1d'])
})

const RiskAnalysisDataSchema = z.object({
  includePortfolio: z.boolean().default(true),
  timeHorizon: z.string().default('medium'),
  scenarios: z.array(z.string()).default(['bear_market', 'normal_volatility', 'black_swan'])
})

const ChatAnalysisDataSchema = z.object({
  query: z.string().min(1).max(2000),
  context: z.object({
    previousMessages: z.array(z.object({
      role: z.string(),
      content: z.string()
    })).optional(),
    userProfile: z.object({
      experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      interests: z.array(z.string()).optional()
    }).optional()
  }).optional()
})

const AlertSummaryDataSchema = z.object({
  text: z.string().min(1).max(8000)
})

const LearningAnalysisDataSchema = z.object({
  userQuery: z.string().min(1).max(1000),
  currentLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  completedLessons: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([])
})

const PricePredictionDataSchema = z.object({
  symbol: z.string(),
  timeframes: z.array(z.string()).default(['24h', '7d', '30d']),
  analysisType: z.enum(['technical', 'fundamental', 'hybrid']).default('hybrid')
})

const DeFiAnalysisDataSchema = z.object({
  protocol: z.string(),
  strategy: z.string(),
  userRiskProfile: z.enum(['conservative', 'moderate', 'aggressive']).default('moderate'),
  amount: z.number().positive().optional()
})

const NewsAnalysisDataSchema = z.object({
  newsContent: z.string().min(10).max(5000),
  relevantAssets: z.array(z.string()).optional(),
  analysisType: z.enum(['sentiment', 'impact', 'comprehensive']).default('comprehensive')
})

/**
 * Main structured analysis handler
 */
async function handleStructuredAnalysis(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context
  let rawBody: unknown = null
  
  let endTimer: (() => void) | null = null
  try {
    if (isMetricsEnabled()) {
      registerHistogram('ai_structured_request_duration_seconds', [0.1, 0.3, 1, 3, 10])
    }
    // Metrics: request received
    incCounter('ai_structured_requests_total', { type: 'unknown', method: 'POST' })
    const body = await request.json()
    rawBody = body
    const { type, data } = StructuredAnalysisSchema.parse(body)
    // Metrics: known type label
    incCounter('ai_structured_requests_total', { type, method: 'POST' })

    logger.info('Processing structured AI analysis', {
      userId: user.id,
      analysisType: type,
      dataKeys: Object.keys(data)
    })

    let result
    let analysisData
    endTimer = startTimer('ai_structured_request_duration_seconds', { type })

    switch (type) {
      case 'market':
        analysisData = MarketAnalysisDataSchema.parse(data)
        const marketAnalysisRequest: {
          symbols: string[];
          timeframe: string;
          analysisDepth: 'basic' | 'comprehensive';
          userContext?: {
            riskTolerance: 'low' | 'medium' | 'high';
            investmentHorizon: 'short' | 'medium' | 'long';
            tradingExperience: 'beginner' | 'intermediate' | 'advanced';
          };
        } = {
          symbols: analysisData.symbols.map(s => s.toUpperCase()),
          timeframe: analysisData.timeframe,
          analysisDepth: analysisData.analysisDepth
        }
        
        if (analysisData.userContext && 
            analysisData.userContext.riskTolerance &&
            analysisData.userContext.investmentHorizon &&
            analysisData.userContext.tradingExperience) {
          marketAnalysisRequest.userContext = {
            riskTolerance: analysisData.userContext.riskTolerance,
            investmentHorizon: analysisData.userContext.investmentHorizon,
            tradingExperience: analysisData.userContext.tradingExperience
          }
        }
        
        result = await structuredAI.analyzeMarket(marketAnalysisRequest)
        break

      case 'portfolio':
        analysisData = PortfolioAnalysisDataSchema.parse(data)
        const portfolio = analysisData.includePortfolio 
          ? await getPortfolioForAnalysis(user.id, context.supabase)
          : null
        
        if (!portfolio) {
          return NextResponse.json(
            { error: 'Portfolio data required for portfolio analysis' }, 
            { status: 400 }
          )
        }

        const portfolioAnalysisRequest: {
          portfolio: {
            holdings: Array<{
              symbol: string;
              amount: number;
              value: number;
              costBasis?: number;
            }>;
            totalValue: number;
          };
          userGoals?: string[];
          riskTolerance?: 'low' | 'medium' | 'high';
        } = {
          portfolio: portfolio
        }
        
        if (analysisData.userGoals) {
          portfolioAnalysisRequest.userGoals = analysisData.userGoals
        }
        
        if (analysisData.riskTolerance) {
          portfolioAnalysisRequest.riskTolerance = analysisData.riskTolerance
        }
        
        result = await structuredAI.analyzePortfolio(portfolioAnalysisRequest)
        break

      case 'trading':
        analysisData = TradingSignalsDataSchema.parse(data)
        result = await structuredAI.generateTradingSignals({
          symbols: analysisData.symbols.map(s => s.toUpperCase()),
          strategy: analysisData.strategy,
          riskLevel: analysisData.riskLevel,
          timeframes: analysisData.timeframes
        })
        break

      case 'risk':
        analysisData = RiskAnalysisDataSchema.parse(data)
        const riskPortfolio = analysisData.includePortfolio 
          ? await getPortfolioForAnalysis(user.id, context.supabase)
          : undefined

        result = await structuredAI.analyzeRisk({
          ...(riskPortfolio && { portfolio: riskPortfolio }),
          timeHorizon: analysisData.timeHorizon,
          scenarios: analysisData.scenarios
        })
        break

      case 'chat':
        analysisData = ChatAnalysisDataSchema.parse(data)
        result = await structuredAI.generateChatResponse({
          query: analysisData.query,
          ...(analysisData.context ? { context: {
            ...(analysisData.context.previousMessages && { 
              previousMessages: analysisData.context.previousMessages 
            }),
            ...(analysisData.context.userProfile && 
              analysisData.context.userProfile.experienceLevel &&
              analysisData.context.userProfile.interests && {
                userProfile: {
                  experienceLevel: analysisData.context.userProfile.experienceLevel,
                  interests: analysisData.context.userProfile.interests
                }
              })
          }} : {})
        })
        break

      case 'alert_summary':
        analysisData = AlertSummaryDataSchema.parse(data)
        result = await structuredAI.summarizeAlert({ text: analysisData.text })
        break

      case 'learning':
        analysisData = LearningAnalysisDataSchema.parse(data)
        result = await structuredAI.generateLearningRecommendations({
          userQuery: analysisData.userQuery,
          currentLevel: analysisData.currentLevel,
          completedLessons: analysisData.completedLessons,
          interests: analysisData.interests
        })
        break

      case 'price_prediction':
        analysisData = PricePredictionDataSchema.parse(data)
        result = await structuredAI.predictPrice({
          symbol: analysisData.symbol.toUpperCase(),
          timeframes: analysisData.timeframes,
          analysisType: analysisData.analysisType
        })
        break

      case 'defi':
        analysisData = DeFiAnalysisDataSchema.parse(data)
        result = await structuredAI.analyzeDeFi({
          protocol: analysisData.protocol,
          strategy: analysisData.strategy,
          userRiskProfile: analysisData.userRiskProfile,
          ...(analysisData.amount && { amount: analysisData.amount })
        })
        break

      case 'news':
        analysisData = NewsAnalysisDataSchema.parse(data)
        result = await structuredAI.analyzeNews({
          newsContent: analysisData.newsContent,
          ...(analysisData.relevantAssets && { relevantAssets: analysisData.relevantAssets }),
          analysisType: analysisData.analysisType
        })
        break

      default:
        return NextResponse.json(
          { error: `Unsupported analysis type: ${type}` }, 
          { status: 400 }
        )
    }

    // Record usage
    await recordStructuredAnalysisUsage(user.id, type, context.supabase)

    logger.info('Structured AI analysis completed', {
      userId: user.id,
      analysisType: type,
      resultSize: JSON.stringify(result).length
    })

    const okResponse = NextResponse.json({
      success: true,
      type,
      result,
      structured: true,
      timestamp: new Date().toISOString(),
      meta: {
        model: 'gpt-4o-2024-08-06',
        structured_outputs: true,
        schema_validated: true
      }
    })
    endTimer?.()
    return okResponse

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Structured analysis validation failed', {
        userId: user.id,
        errors: error.issues
      })

      try {
        const maybeType = rawBody && typeof rawBody === 'object' ? (rawBody as Record<string, unknown>).type : undefined
        if (typeof maybeType === 'string') {
          incCounter('ai_structured_errors_total', { reason: 'validation', status: '400', type: maybeType })
        } else {
          incCounter('ai_structured_errors_total', { reason: 'validation', status: '400' })
        }
      } catch {
        incCounter('ai_structured_errors_total', { reason: 'validation', status: '400' })
      }
      endTimer?.()
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.issues
      }, { status: 400 })
    }

    logger.error('Structured AI analysis failed', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    // Best-effort include type if it was parsed earlier
    try {
      const cloned = await request.clone().json().catch(() => null) as unknown
      const maybeType = cloned && typeof cloned === 'object' ? (cloned as Record<string, unknown>).type : undefined
      if (typeof maybeType === 'string') {
        incCounter('ai_structured_errors_total', { reason: 'exception', type: maybeType, status: '500' })
      } else {
        incCounter('ai_structured_errors_total', { reason: 'exception', status: '500' })
      }
    } catch {
      incCounter('ai_structured_errors_total', { reason: 'exception', status: '500' })
    }
    endTimer?.()
    throw error
  }
}

/**
 * Get available analysis types and schemas
 */
async function getAnalysisTypes(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  // Use params to satisfy linter and for minimal access logging
  try { logger.info('Structured AI types info requested', { method: request.method }) } catch {}
  void context
  const analysisTypes = {
    market: {
      description: 'Market analysis with technical and fundamental insights',
      requiredFields: ['symbols'],
      optionalFields: ['timeframe', 'analysisDepth', 'userContext'],
      schema: 'MarketAnalysisDataSchema'
    },
    portfolio: {
      description: 'Portfolio optimization and risk assessment',
      requiredFields: [],
      optionalFields: ['includePortfolio', 'userGoals', 'riskTolerance'],
      schema: 'PortfolioAnalysisDataSchema'
    },
    trading: {
      description: 'Trading signals and strategy recommendations',
      requiredFields: ['symbols'],
      optionalFields: ['strategy', 'riskLevel', 'timeframes'],
      schema: 'TradingSignalsDataSchema'
    },
    risk: {
      description: 'Risk analysis and stress testing',
      requiredFields: [],
      optionalFields: ['includePortfolio', 'timeHorizon', 'scenarios'],
      schema: 'RiskAnalysisDataSchema'
    },
    chat: {
      description: 'AI chat responses with structured output',
      requiredFields: ['query'],
      optionalFields: ['context'],
      schema: 'ChatAnalysisDataSchema'
    },
    learning: {
      description: 'Learning recommendations and path suggestions',
      requiredFields: ['userQuery'],
      optionalFields: ['currentLevel', 'completedLessons', 'interests'],
      schema: 'LearningAnalysisDataSchema'
    },
    price_prediction: {
      description: 'Price predictions with confidence intervals',
      requiredFields: ['symbol'],
      optionalFields: ['timeframes', 'analysisType'],
      schema: 'PricePredictionDataSchema'
    },
    defi: {
      description: 'DeFi protocol analysis and yield farming strategies',
      requiredFields: ['protocol', 'strategy'],
      optionalFields: ['userRiskProfile', 'amount'],
      schema: 'DeFiAnalysisDataSchema'
    },
    news: {
      description: 'News sentiment and market impact analysis',
      requiredFields: ['newsContent'],
      optionalFields: ['relevantAssets', 'analysisType'],
      schema: 'NewsAnalysisDataSchema'
    },
    alert_summary: {
      description: 'Summarize alert text into key points/actions/sources/questions',
      requiredFields: ['text'],
      optionalFields: [],
      schema: 'AlertSummaryDataSchema'
    }
  }

  return NextResponse.json({
    success: true,
    analysisTypes,
    usage: {
      endpoint: '/api/ai/structured',
      method: 'POST',
      format: {
        type: 'string (analysis type)',
        data: 'object (analysis-specific data)'
      }
    },
    features: {
      structuredOutputs: true,
      schemaValidation: true,
      typesSafety: true,
      openaiModel: 'gpt-4o-2024-08-06'
    }
  })
}

// Helper functions

/**
 * Get portfolio data formatted for analysis
 */
async function getPortfolioForAnalysis(userId: string, supabase: SupabaseClient) {
  try {
    const { data: portfolio } = await supabase
      .from('user_portfolios')
      .select(`
        *,
        portfolio_assets (
          symbol,
          amount,
          current_price,
          current_value,
          purchase_price
        )
      `)
      .eq('user_id', userId)
      .single()

    if (!portfolio) return null

    return {
      holdings: portfolio.portfolio_assets.map((asset: Record<string, unknown>) => {
        const symbol = typeof asset?.symbol === 'string' ? asset.symbol : ''
        const amount = typeof asset?.amount === 'number' ? asset.amount : Number(asset?.amount ?? 0)
        const currentValue = typeof asset?.current_value === 'number' ? asset.current_value : Number(asset?.current_value ?? 0)
        const purchasePrice = typeof asset?.purchase_price === 'number' ? asset.purchase_price : Number(asset?.purchase_price ?? 0)
        return {
          symbol,
          amount,
          value: currentValue,
          costBasis: purchasePrice * amount
        }
      }),
      totalValue: portfolio.total_value
    }
  } catch (error) {
    logger.error('Failed to get portfolio for analysis', { userId, error: error instanceof Error ? error.message : String(error) })
    return null
  }
}

/**
 * Record structured analysis usage
 */
async function recordStructuredAnalysisUsage(
  userId: string,
  analysisType: string,
  supabase: SupabaseClient
) {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7)
    
    await supabase
      .from('ai_usage_tracking')
      .upsert({
        user_id: userId,
        month: currentMonth,
        service_type: 'structured_analysis',
        sub_type: analysisType,
        usage_count: 1
      }, {
        onConflict: 'user_id,month,service_type,sub_type'
      })
  } catch (error) {
    logger.error('Failed to record structured analysis usage', { userId, analysisType, error: error instanceof Error ? error.message : String(error) })
  }
}

// Route handlers
export const POST = withApiHandler(handleStructuredAnalysis, {
  requireAuth: true,
  requireSubscription: true,
  rateLimitKey: 'ai-structured',
  requireCSRF: true
})

export const GET = withApiHandler(getAnalysisTypes, {
  requireAuth: true,
  rateLimitKey: 'ai-info'
})

export const OPTIONS = async () => {
  const originEnv = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.VERCEL_URL || 'http://localhost:3000'
  const allowOrigin = originEnv.startsWith('http') ? originEnv : `https://${originEnv}`
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}
