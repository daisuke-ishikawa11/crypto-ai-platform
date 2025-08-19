// API Route: DeFi Portfolio Analysis
import { NextRequest, NextResponse } from 'next/server';
import type { 
  DeFiPortfolioData, 
  DeFiProtocolData
} from '@/types/common';
// Temporarily unused - will be used for specialized DeFi analysis
// import { defiAIAdvisor } from '@/lib/ai/defi-ai-advisor';
import { investmentAlgorithms } from '@/lib/ai/investment-algorithms';
import { aiCacheService } from '@/lib/ai/ai-cache';
import { logger } from '@/lib/monitoring/logger';
import { headers } from 'next/headers';

// Type guard function for DeFiProtocolData
function isDeFiProtocolData(obj: unknown): obj is DeFiProtocolData {
  return (
    typeof obj === 'object' && 
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'category' in obj &&
    'chain' in obj &&
    'tvl' in obj &&
    'apr' in obj &&
    'riskScore' in obj &&
    'risk' in obj &&
    'tokens' in obj &&
    'features' in obj &&
    typeof (obj as DeFiProtocolData).id === 'string' &&
    typeof (obj as DeFiProtocolData).name === 'string' &&
    typeof (obj as DeFiProtocolData).category === 'string' &&
    typeof (obj as DeFiProtocolData).chain === 'string' &&
    typeof (obj as DeFiProtocolData).tvl === 'number' &&
    typeof (obj as DeFiProtocolData).apr === 'number' &&
    typeof (obj as DeFiProtocolData).riskScore === 'number' &&
    typeof (obj as DeFiProtocolData).risk === 'number' &&
    Array.isArray((obj as DeFiProtocolData).tokens) &&
    Array.isArray((obj as DeFiProtocolData).features)
  );
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const userId = headersList.get('x-user-id') || 'anonymous';
    
    const body = await request.json();
    const { portfolio, preferences, protocols, analysis_type } = body;

    if (!portfolio || !preferences) {
      return NextResponse.json(
        { error: 'Portfolio and preferences are required' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const rateLimit = await aiCacheService.checkRateLimit(userId, '/api/ai/defi/analyze');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: rateLimit.resetTime 
        },
        { status: 429 }
      );
    }

    // Generate cache key
    const cacheKey = `defi_analysis:${userId}:${JSON.stringify({ portfolio, preferences, analysis_type })}`;
    const cached = await aiCacheService.get(cacheKey);
    
    if (cached) {
      logger.info('DeFi analysis cache hit', { userId, analysisType: analysis_type });
      return NextResponse.json(cached);
    }

    let analysisResults: unknown = {};

    // Perform different types of analysis based on request
    switch (analysis_type) {
      case 'portfolio_health':
        const healthResult = await investmentAlgorithms.optimizePortfolio(
          portfolio,
          protocols || [],
          preferences
        );
        const riskMetrics = await investmentAlgorithms.calculateRiskMetrics(portfolio);
        
        analysisResults = {
          type: 'portfolio_health',
          optimization: healthResult,
          risk_metrics: riskMetrics,
          recommendations: await generateHealthRecommendations(healthResult, riskMetrics),
          timestamp: new Date()
        };
        break;

      case 'yield_optimization':
        const yieldOptimization = await investmentAlgorithms.optimizeYieldStrategy(
          portfolio,
          protocols || [],
          preferences
        );
        
        analysisResults = {
          type: 'yield_optimization',
          optimization_result: yieldOptimization,
          expected_returns: calculateExpectedReturns(yieldOptimization),
          risk_analysis: await analyzeYieldRisks(yieldOptimization),
          implementation_plan: generateImplementationPlan(yieldOptimization),
          timestamp: new Date()
        };
        break;

      case 'risk_assessment':
        const riskAssessment = await investmentAlgorithms.calculateRiskMetrics(
          portfolio,
          undefined, // historical returns would be fetched in production
          1.2 // market beta estimate
        );
        
        analysisResults = {
          type: 'risk_assessment',
          risk_metrics: riskAssessment,
          risk_breakdown: await analyzeRiskComponents(portfolio, protocols || []),
          mitigation_strategies: generateRiskMitigationStrategies(riskAssessment),
          stress_test: await performStressTest(portfolio),
          timestamp: new Date()
        };
        break;

      case 'impermanent_loss':
        if (!protocols) {
          return NextResponse.json(
            { error: 'Protocols are required for impermanent loss analysis' },
            { status: 400 }
          );
        }
        
        const ilAnalysis = await analyzeImpermanentLossRisk(portfolio, protocols);
        
        analysisResults = {
          type: 'impermanent_loss',
          il_predictions: ilAnalysis,
          break_even_analysis: calculateBreakEvenTimes(ilAnalysis),
          recommendations: generateILRecommendations(ilAnalysis),
          timestamp: new Date()
        };
        break;

      default:
        // Comprehensive analysis
        const [optimization, risk, sentiment] = await Promise.all([
          investmentAlgorithms.optimizePortfolio(portfolio, protocols || [], preferences),
          investmentAlgorithms.calculateRiskMetrics(portfolio),
          investmentAlgorithms.analyzeMarketSentiment(portfolio.assets.map((a: { symbol: string }) => a.symbol))
        ]);

        analysisResults = {
          type: 'comprehensive',
          portfolio_optimization: optimization,
          risk_metrics: risk,
          market_sentiment: sentiment,
          overall_score: calculateOverallScore(optimization, risk, sentiment),
          recommendations: await generateComprehensiveRecommendations(
            optimization, 
            risk, 
            sentiment, 
            preferences
          ),
          timestamp: new Date()
        };
    }

    // Cache the results
    await aiCacheService.set(
      cacheKey,
      analysisResults,
      15 * 60 * 1000, // 15 minutes cache
      {
        model: 'investment-algorithms',
        tokens_used: JSON.stringify(analysisResults).length / 4,
        user_id: userId
      },
      ['defi', 'analysis', analysis_type || 'comprehensive', userId]
    );

    // Log usage
    await aiCacheService.logAPIUsage(
      userId,
      '/api/ai/defi/analyze',
      'portfolio-analyzer',
      JSON.stringify(portfolio).length / 4,
      0.005 // Estimated cost for complex analysis
    );

    logger.info('DeFi portfolio analysis completed', {
      userId,
      analysisType: analysis_type,
      portfolioValue: portfolio.totalValue,
      assetCount: portfolio.assets.length
    });

    return NextResponse.json(analysisResults);

  } catch (error: unknown) {
    logger.error('DeFi analysis API error', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    
    return NextResponse.json(
      { 
        error: 'Portfolio analysis failed',
        message: 'ポートフォリオ分析の実行中にエラーが発生しました。'
      },
      { status: 500 }
    );
  }
}

// Helper functions
async function generateHealthRecommendations(optimization: Record<string, unknown>, riskMetrics: Record<string, unknown>) {
  return {
    high_priority: [
      (optimization.sharpe_ratio as number) < 1 ? '分散化の改善が必要です' : null,
      (riskMetrics.max_drawdown as number) > 0.3 ? 'リスク管理の強化が必要です' : null
    ].filter(Boolean),
    medium_priority: [
      (optimization.rebalance_cost as number) > 1000 ? 'リバランスコストの最適化を検討してください' : null
    ].filter(Boolean),
    low_priority: [
      'ガス効率の改善を検討してください',
      '税務効率の最適化を検討してください'
    ]
  };
}

function calculateExpectedReturns(optimization: Record<string, unknown>) {
  const totalApy = optimization.total_expected_apy as number;
  return {
    conservative: totalApy * 0.7,
    expected: totalApy,
    optimistic: totalApy * 1.3,
    confidence_interval: [
      totalApy * 0.6,
      totalApy * 1.4
    ]
  };
}

async function analyzeYieldRisks(optimization: Record<string, unknown>) {
  const protocols = optimization.protocols as Array<{ name: string }>;
  return {
    protocol_concentration: protocols.length < 3 ? 'high' : 'medium',
    smart_contract_risk: 'medium',
    impermanent_loss_risk: protocols.some((p: { name: string }) => p.name.includes('Uniswap')) ? 'high' : 'low',
    liquidity_risk: 'low'
  };
}

function generateImplementationPlan(optimization: Record<string, unknown>) {
  return {
    steps: [
      {
        step: 1,
        action: 'ポートフォリオの現状確認',
        description: '現在の配分と目標配分の差を確認'
      },
      {
        step: 2,
        action: 'リバランス実行',
        description: '推奨配分に向けた段階的調整'
      },
      {
        step: 3,
        action: 'モニタリング設定',
        description: 'パフォーマンス追跡とアラート設定'
      }
    ],
    estimated_time: '1-2週間',
    estimated_cost: `$${(optimization.suggested_duration as number) * 10}`,
    prerequisites: ['ガス代の準備', 'プロトコル利用規約確認']
  };
}

async function analyzeRiskComponents(portfolio: { assets: { allocation: number }[] }, protocols: { riskScore: number }[]) {
  return {
    smart_contract: protocols.reduce((acc: number, p: { riskScore: number }) => acc + (100 - p.riskScore), 0) / protocols.length,
    market: portfolio.assets.reduce((acc: number, a: { allocation: number }) => acc + (a.allocation * 0.8), 0),
    liquidity: 75, // Placeholder calculation
    operational: 65 // Placeholder calculation
  };
}

function generateRiskMitigationStrategies(riskMetrics: Record<string, unknown>) {
  const strategies = [];
  
  if ((riskMetrics.max_drawdown as number) > 0.3) {
    strategies.push({
      risk: 'Maximum Drawdown',
      strategy: 'ストップロス設定とポジションサイズの調整',
      priority: 'high'
    });
  }
  
  if ((riskMetrics.sharpe_ratio as number) < 0.5) {
    strategies.push({
      risk: 'Poor Risk-Adjusted Returns',
      strategy: 'より高いシャープレシオを持つ資産への配分見直し',
      priority: 'medium'
    });
  }
  
  return strategies;
}

async function performStressTest(_portfolio: Record<string, unknown>) {
  return {
    scenarios: [
      {
        name: 'Market Crash (-50%)',
        portfolio_value_change: -45,
        recovery_time: '12-18 months'
      },
      {
        name: 'DeFi Crisis (-70%)',
        portfolio_value_change: -60,
        recovery_time: '18-24 months'
      },
      {
        name: 'Regulatory Crackdown',
        portfolio_value_change: -30,
        recovery_time: '6-12 months'
      }
    ]
  };
}

async function analyzeImpermanentLossRisk(_portfolio: Record<string, unknown>, protocols: Record<string, unknown>[]) {
  const ilAnalysis = [];
  
  for (const protocol of protocols) {
    // Type guard for DeFi protocol data
    if (isDeFiProtocolData(protocol) && protocol.category === 'dex') {
      try {
        const il = await investmentAlgorithms.predictImpermanentLoss(
          protocol,
          ['ETH', 'USDT'], // Example pair
          0.8 // Historical volatility
        );
        ilAnalysis.push(il);
      } catch (error) {
        console.warn('Failed to predict IL for protocol:', protocol, error);
      }
    }
  }
  
  return ilAnalysis;
}

function calculateBreakEvenTimes(ilAnalysis: { protocol: string; il_scenarios: { price_change_percentage: number; break_even_days?: number }[] }[]) {
  return ilAnalysis.map((analysis: { protocol: string; il_scenarios: { price_change_percentage: number; break_even_days?: number }[] }) => ({
    protocol: analysis.protocol,
    break_even_days: analysis.il_scenarios.find(s => s.price_change_percentage === 0)?.break_even_days || 0
  }));
}

function generateILRecommendations(_ilAnalysis: Record<string, unknown>[]) {
  return [
    '相関性の高い資産ペアの選択を推奨',
    '手数料収入がILを上回るプールの優先',
    '短期的な戦略実行の検討'
  ];
}

function calculateOverallScore(optimization: Record<string, unknown>, risk: Record<string, unknown>, sentiment: Record<string, unknown>) {
  return Math.round(
    (optimization.sharpe_ratio as number) * 30 +
    (1 - (risk.max_drawdown as number)) * 20 +
    (risk.sharpe_ratio as number) * 25 +
    (sentiment.sentiment_score as number) * 0.25
  );
}

async function generateComprehensiveRecommendations(
  _optimization: Record<string, unknown>,
  risk: Record<string, unknown>,
  sentiment: Record<string, unknown>,
  _preferences: Record<string, unknown>
) {
  const recommendations = [];
  
  // Risk-based recommendations
  if ((risk.max_drawdown as number) > 0.25) {
    recommendations.push({
      type: 'risk_management',
      priority: 'high',
      message: 'ポートフォリオのリスクレベルが高すぎます。分散化を改善してください。',
      action: 'リスクの高い資産の配分を減らす'
    });
  }
  
  // Sentiment-based recommendations
  if ((sentiment.overall_sentiment as string) === 'extreme_fear') {
    recommendations.push({
      type: 'market_timing',
      priority: 'medium',
      message: '市場が極度の恐怖状態です。買い増しの機会かもしれません。',
      action: '段階的な投資実行を検討'
    });
  }
  
  return recommendations;
}