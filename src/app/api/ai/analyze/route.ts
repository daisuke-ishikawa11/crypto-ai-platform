// 🧠 AI分析API
// Gemini + VoltAgent統合による包括的AI投資分析

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { UnifiedAIService } from '@/lib/ai/unified-ai-service';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// バリデーションスキーマ
const analyzeRequestSchema = z.object({
  analysisType: z.enum(['market', 'portfolio', 'trading', 'risk', 'comprehensive']),
  symbols: z.array(z.string()).min(1).max(10),
  timeframe: z.enum(['1h', '4h', '1d', '7d', '30d']).default('1d'),
  preferences: z.object({
    riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
    investmentHorizon: z.enum(['short', 'medium', 'long']),
    tradingStrategy: z.enum(['hodl', 'swing', 'scalping', 'arbitrage']).optional()
  }),
  marketContext: z.object({
    fearGreedIndex: z.number().min(0).max(100).optional(),
    volatilityIndex: z.number().min(0).max(100).optional(),
    marketTrend: z.enum(['bull', 'bear', 'sideways']).optional(),
    news: z.array(z.string()).optional()
  }).optional(),
  includePortfolio: z.boolean().default(true)
});

const chatRequestSchema = z.object({
  query: z.string().min(1).max(1000),
  context: z.object({
    previousMessages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
      timestamp: z.string()
    })).optional(),
    includePortfolio: z.boolean().default(true),
    includeMarketData: z.boolean().default(true)
  }).optional(),
  maxTokens: z.number().min(100).max(4000).default(1000)
});

const recommendationsRequestSchema = z.object({
  type: z.enum(['daily', 'weekly', 'portfolio_review', 'risk_alert']),
  forceRefresh: z.boolean().default(false)
});

const aiService = new UnifiedAIService();

/**
 * 包括的AI分析実行
 */
async function performAnalysis(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = analyzeRequestSchema.parse(body);

    // ポートフォリオデータを取得（必要に応じて）
    let portfolio = undefined;
    if (validatedData.includePortfolio) {
      portfolio = await getUserPortfolio(user.id, context.supabase) || undefined;
    }

    // AI分析を実行
    const analysisResult = await aiService.performComprehensiveAnalysis({
      userId: user.id,
      portfolio,
      analysisType: validatedData.analysisType,
      symbols: validatedData.symbols.map(s => s.toUpperCase()),
      timeframe: validatedData.timeframe,
      preferences: validatedData.preferences,
      marketContext: validatedData.marketContext || {}
    });

    // 使用量を記録
    await recordAIUsage(user.id, 'analysis', validatedData.analysisType, context.supabase);

    logger.info('AI analysis completed via API', {
      userId: user.id,
      analysisType: validatedData.analysisType,
      symbols: validatedData.symbols.length,
      confidence: analysisResult.summary.confidence
    });

    return NextResponse.json(analysisResult);

  } catch (error) {
    logger.error('AI analysis failed via API', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * AIチャット分析
 */
async function performChatAnalysis(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = chatRequestSchema.parse(body);

    // コンテキストデータを準備
    const contextData: any = {};
    
    if (validatedData.context?.includePortfolio) {
      contextData.portfolio = await getUserPortfolio(user.id, context.supabase);
    }
    
    if (validatedData.context?.includeMarketData) {
      contextData.marketData = await getLatestMarketData(context.supabase);
    }

    // チャット分析を実行
    const chatResult = await aiService.performChatAnalysis({
      userId: user.id,
      query: validatedData.query,
      context: {
        ...contextData,
        previousMessages: validatedData.context?.previousMessages
      },
      maxTokens: validatedData.maxTokens
    });

    // 使用量を記録
    await recordAIUsage(user.id, 'chat', 'query', context.supabase);

    logger.info('AI chat analysis completed', {
      userId: user.id,
      query: validatedData.query.substring(0, 100) + (validatedData.query.length > 100 ? '...' : ''),
      confidence: chatResult.confidence
    });

    return NextResponse.json(chatResult);

  } catch (error) {
    logger.error('AI chat analysis failed', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * AI推奨事項取得
 */
async function getRecommendations(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') as 'daily' | 'weekly' | 'portfolio_review' | 'risk_alert' || 'daily';
    const forceRefresh = url.searchParams.get('forceRefresh') === 'true';

    // キャッシュされた推奨事項をチェック（forceRefreshがfalseの場合）
    if (!forceRefresh) {
      const cachedRecommendations = await getCachedRecommendations(user.id, type, context.supabase);
      if (cachedRecommendations && cachedRecommendations.length > 0) {
        logger.debug('Returning cached AI recommendations', {
          userId: user.id,
          type,
          count: cachedRecommendations.length
        });
        
        return NextResponse.json({
          recommendations: cachedRecommendations,
          cached: true,
          generated_at: cachedRecommendations[0]?.created_at
        });
      }
    }

    // 新しい推奨事項を生成
    const recommendations = await aiService.generateRecommendations(user.id, type);

    // 使用量を記録
    await recordAIUsage(user.id, 'recommendations', type, context.supabase);

    logger.info('AI recommendations generated', {
      userId: user.id,
      type,
      count: recommendations.length
    });

    return NextResponse.json({
      recommendations,
      cached: false,
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Failed to get AI recommendations', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * AI使用量制限チェック
 */
async function checkUsageLimits(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    const usage = await getAIUsageStats(user.id, context.supabase);
    const limits = getUsageLimits(user.subscription_tier);

    const response = {
      usage,
      limits,
      remaining: {
        analysis: Math.max(0, limits.analysis - usage.analysis),
        chat: Math.max(0, limits.chat - usage.chat),
        recommendations: Math.max(0, limits.recommendations - usage.recommendations)
      },
      resetDate: getUsageResetDate()
    };

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Failed to check AI usage limits', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * ヘルパー関数群
 */

/**
 * ユーザーポートフォリオ取得
 */
async function getUserPortfolio(userId: string, supabase: any) {
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
          change_percent_24h
        )
      `)
      .eq('user_id', userId)
      .single();

    if (!portfolio) return null;

    return {
      totalValue: portfolio.total_value,
      assets: portfolio.portfolio_assets.map((asset: any) => ({
        symbol: asset.symbol,
        amount: asset.amount,
        currentPrice: asset.current_price,
        value: asset.current_value,
        allocation: (asset.current_value / portfolio.total_value) * 100
      }))
    };

  } catch (error) {
    logger.error('Failed to get user portfolio', { 
      userId, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return null;
  }
}

/**
 * 最新市場データ取得
 */
async function getLatestMarketData(supabase: any) {
  try {
    const { data: marketData } = await supabase
      .from('market_data')
      .select('symbol, price_usd, volume_24h, price_change_percent_24h, fear_greed_index')
      .order('recorded_at', { ascending: false })
      .limit(50);

    if (!marketData) return {};

    return {
      prices: marketData.reduce((acc: any, item: any) => ({
        ...acc,
        [item.symbol]: item.price_usd
      }), {}),
      volumes: marketData.reduce((acc: any, item: any) => ({
        ...acc,
        [item.symbol]: item.volume_24h
      }), {}),
      priceChanges: marketData.reduce((acc: any, item: any) => ({
        ...acc,
        [item.symbol]: item.price_change_percent_24h
      }), {}),
      fearGreedIndex: marketData[0]?.fear_greed_index
    };

  } catch (error) {
    logger.error('Failed to get market data', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {};
  }
}

/**
 * AI使用量記録
 */
async function recordAIUsage(
  userId: string,
  serviceType: 'analysis' | 'chat' | 'recommendations',
  subType: string,
  supabase: any
) {
  try {
    // 今月の使用量を更新
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    
    await supabase
      .from('ai_usage_tracking')
      .upsert({
        user_id: userId,
        month: currentMonth,
        service_type: serviceType,
        sub_type: subType,
        usage_count: 1
      }, {
        onConflict: 'user_id,month,service_type',
        ignoreDuplicates: false
      });

  } catch (error) {
    logger.error('Failed to record AI usage', { 
      userId, 
      serviceType, 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}

/**
 * キャッシュされた推奨事項取得
 */
async function getCachedRecommendations(
  userId: string,
  type: string,
  supabase: any
) {
  try {
    const { data: recommendations } = await supabase
      .from('ai_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('recommendation_type', type)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // 24時間以内
      .order('created_at', { ascending: false });

    return recommendations || [];

  } catch (error) {
    logger.error('Failed to get cached recommendations', { 
      userId, 
      type, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return [];
  }
}

/**
 * AI使用量統計取得
 */
async function getAIUsageStats(userId: string, supabase: any) {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    
    const { data: usage } = await supabase
      .from('ai_usage_tracking')
      .select('service_type, usage_count')
      .eq('user_id', userId)
      .eq('month', currentMonth);

    return {
      analysis: usage?.find((u: any) => u.service_type === 'analysis')?.usage_count || 0,
      chat: usage?.find((u: any) => u.service_type === 'chat')?.usage_count || 0,
      recommendations: usage?.find((u: any) => u.service_type === 'recommendations')?.usage_count || 0
    };

  } catch (error) {
    logger.error('Failed to get AI usage stats', { 
      userId, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return { analysis: 0, chat: 0, recommendations: 0 };
  }
}

/**
 * 使用量制限取得
 */
function getUsageLimits(subscriptionTier: string) {
  const limits = {
    basic: { analysis: 10, chat: 50, recommendations: 5 },
    pro: { analysis: 100, chat: 500, recommendations: 20 },
    enterprise: { analysis: 1000, chat: 5000, recommendations: 100 }
  };

  return limits[subscriptionTier as keyof typeof limits] || limits.basic;
}

/**
 * 使用量リセット日取得
 */
function getUsageResetDate() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.toISOString();
}

// API Route Handlers
export const POST = withApiHandler(performAnalysis, {
  requireAuth: true,
  requireSubscription: true,
  rateLimitKey: 'ai-analysis',
  validateSchema: analyzeRequestSchema
});

export const GET = withApiHandler(getRecommendations, {
  requireAuth: true,
  requireSubscription: true,
  rateLimitKey: 'ai-recommendations'
});

export const OPTIONS = async () => {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
};