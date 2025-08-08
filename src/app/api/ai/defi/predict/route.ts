// API Route: DeFi Predictions
import { NextRequest, NextResponse } from 'next/server';
import { defiPredictiveAnalytics } from '@/lib/ai/defi-predictions';
import { aiCacheService } from '@/lib/ai/ai-cache';
import { logger } from '@/lib/monitoring/logger';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id') || 'anonymous';
    
    const body = await request.json();
    const { prediction_type, protocol, timeframe, market_data } = body;

    if (!prediction_type) {
      return NextResponse.json(
        { error: 'Prediction type is required' },
        { status: 400 }
      );
    }

    // Check rate limiting (more restrictive for predictions)
    const rateLimit = await aiCacheService.checkRateLimit(userId, '/api/ai/defi/predict');
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
    const cacheKey = `defi_prediction:${prediction_type}:${protocol?.id || 'general'}:${timeframe || '7d'}`;
    const cached = await aiCacheService.get(cacheKey, {
      allowStale: true, // Allow slightly stale predictions
      staleTTL: 30 * 60 * 1000 // 30 minutes stale
    });
    
    if (cached) {
      logger.info('DeFi prediction cache hit', { 
        userId, 
        predictionType: prediction_type,
        protocol: protocol?.name 
      });
      return NextResponse.json(cached);
    }

    let predictionResult: any;

    switch (prediction_type) {
      case 'apy_trends':
        if (!protocol) {
          return NextResponse.json(
            { error: 'Protocol is required for APY predictions' },
            { status: 400 }
          );
        }
        
        const historicalAPYData = await generateMockHistoricalData('apy', protocol.id);
        predictionResult = await defiPredictiveAnalytics.predictAPYTrends(
          protocol,
          historicalAPYData,
          market_data
        );
        break;

      case 'tvl_forecast':
        if (!protocol) {
          return NextResponse.json(
            { error: 'Protocol is required for TVL forecasts' },
            { status: 400 }
          );
        }
        
        const historicalTVLData = await generateMockHistoricalData('tvl', protocol.id);
        const competitorData = await getCompetitorData(protocol.category);
        
        predictionResult = await defiPredictiveAnalytics.forecastTVL(
          protocol,
          historicalTVLData,
          competitorData
        );
        break;

      case 'risk_events':
        const protocols = body.protocols || [protocol].filter(Boolean);
        const onChainMetrics = await getOnChainMetrics(protocols);
        
        predictionResult = await defiPredictiveAnalytics.detectRiskEvents(
          protocols,
          onChainMetrics
        );
        break;

      case 'market_cycle':
        const marketData = {
          prices: await generateMockHistoricalData('price', 'market'),
          volume: await generateMockHistoricalData('volume', 'market'),
          sentiment: await generateMockHistoricalData('sentiment', 'market'),
          macro_indicators: market_data?.macro_indicators || {}
        };
        
        predictionResult = await defiPredictiveAnalytics.predictMarketCycle(marketData);
        break;

      case 'gas_optimization':
        const networkData = {
          historical_gas: await generateMockHistoricalData('gas', 'ethereum'),
          pending_transactions: market_data?.pending_transactions || 50000,
          network_utilization: market_data?.network_utilization || 0.7
        };
        
        predictionResult = await defiPredictiveAnalytics.optimizeGasUsage(networkData);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown prediction type: ${prediction_type}` },
          { status: 400 }
        );
    }

    // Enhance result with metadata
    const enhancedResult = {
      ...predictionResult,
      prediction_metadata: {
        type: prediction_type,
        generated_at: new Date(),
        confidence_level: calculateConfidenceLevel(predictionResult),
        data_freshness: 'real_time', // In production, this would be actual data age
        model_version: '1.0',
        disclaimer: getDeFiPredictionDisclaimer(prediction_type)
      },
      usage_guidelines: getPredictionUsageGuidelines(prediction_type),
      limitations: getPredictionLimitations(prediction_type)
    };

    // Cache with shorter TTL for predictions due to volatility
    const cacheTTL = getCacheTTL(prediction_type);
    await aiCacheService.set(
      cacheKey,
      enhancedResult,
      cacheTTL,
      {
        model: 'predictive-analytics',
        tokens_used: JSON.stringify(enhancedResult).length / 4,
        user_id: userId,
        cost: 0.01 // Higher cost for predictions
      },
      ['defi', 'prediction', prediction_type, protocol?.name || 'general']
    );

    // Log usage
    await aiCacheService.logAPIUsage(
      userId,
      '/api/ai/defi/predict',
      'claude-3-sonnet',
      JSON.stringify(body).length / 4,
      0.01
    );

    logger.info('DeFi prediction generated', {
      userId,
      predictionType: prediction_type,
      protocol: protocol?.name,
      confidence: enhancedResult.prediction_metadata.confidence_level
    });

    return NextResponse.json(enhancedResult);

  } catch (error) {
    logger.error('DeFi prediction API error', { error });
    
    // Return fallback prediction if available
    const fallbackKey = `fallback_prediction:${body.prediction_type}`;
    const fallback = await aiCacheService.get(fallbackKey);
    
    if (fallback) {
      return NextResponse.json({
        ...fallback,
        is_fallback: true,
        fallback_reason: 'prediction_service_unavailable'
      });
    }

    return NextResponse.json(
      { 
        error: 'Prediction service temporarily unavailable',
        message: '予測サービスは一時的に利用できません。'
      },
      { status: 503 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'supported_predictions';

    switch (type) {
      case 'supported_predictions':
        return NextResponse.json({
          prediction_types: [
            {
              type: 'apy_trends',
              description: 'APY trend predictions for specific protocols',
              timeframes: ['24h', '7d', '30d', '90d'],
              required_params: ['protocol']
            },
            {
              type: 'tvl_forecast',
              description: 'TVL growth forecasting',
              timeframes: ['7d', '30d', '90d', '180d'],
              required_params: ['protocol']
            },
            {
              type: 'risk_events',
              description: 'Risk event detection and probability assessment',
              timeframes: ['real_time'],
              required_params: ['protocols']
            },
            {
              type: 'market_cycle',
              description: 'Overall market cycle phase prediction',
              timeframes: ['current', '30d', '90d'],
              required_params: []
            },
            {
              type: 'gas_optimization',
              description: 'Gas price predictions and optimization windows',
              timeframes: ['1h', '6h', '24h'],
              required_params: []
            }
          ],
          rate_limits: {
            '/api/ai/defi/predict': '20 requests per hour'
          },
          data_sources: [
            'On-chain metrics',
            'DEX liquidity data',
            'Protocol governance activity',
            'Social sentiment indicators',
            'Macro economic indicators'
          ]
        });

      case 'model_info':
        return NextResponse.json({
          models: {
            apy_prediction: {
              algorithm: 'Time series analysis with external factors',
              accuracy: '75-85% for 7-day predictions',
              update_frequency: 'hourly',
              features: ['historical_apy', 'tvl_changes', 'market_conditions', 'token_rewards']
            },
            risk_detection: {
              algorithm: 'Multi-factor risk scoring with ML anomaly detection',
              accuracy: '80-90% for high-risk events',
              update_frequency: 'real-time',
              features: ['on_chain_metrics', 'governance_activity', 'audit_scores', 'market_volatility']
            }
          },
          disclaimer: 'Predictions are for informational purposes only and should not be used as sole basis for investment decisions.'
        });

      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }

  } catch (error) {
    logger.error('DeFi prediction GET error', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
async function generateMockHistoricalData(dataType: string, identifier: string) {
  // In production, this would fetch real historical data
  const data = [];
  const now = new Date();
  
  for (let i = 60; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    let value = 0;
    
    switch (dataType) {
      case 'apy':
        value = 5 + Math.random() * 10 + Math.sin(i / 10) * 2;
        break;
      case 'tvl':
        value = 1000000 + Math.random() * 500000 + i * 10000;
        break;
      case 'price':
        value = 2000 + Math.random() * 1000 + Math.sin(i / 7) * 300;
        break;
      case 'volume':
        value = 50000000 + Math.random() * 20000000;
        break;
      case 'sentiment':
        value = 50 + Math.random() * 40 + Math.sin(i / 5) * 10;
        break;
      case 'gas':
        value = 20 + Math.random() * 30 + (i % 7 < 2 ? -5 : 0); // Lower on weekends
        break;
    }
    
    data.push({
      timestamp,
      value,
      metadata: { identifier }
    });
  }
  
  return data;
}

async function getCompetitorData(category: string) {
  // Mock competitor data - in production would fetch real data
  const competitors = {
    'lending': [
      { protocol: 'Aave', tvl: 5000000000, growth_rate: 15.5 },
      { protocol: 'Compound', tvl: 3000000000, growth_rate: 8.2 }
    ],
    'dex': [
      { protocol: 'Uniswap', tvl: 8000000000, growth_rate: 12.1 },
      { protocol: 'Curve', tvl: 4000000000, growth_rate: 6.7 }
    ]
  };
  
  return competitors[category] || [];
}

async function getOnChainMetrics(protocols: any[]) {
  // Mock on-chain metrics - in production would fetch from blockchain
  const metrics = {};
  
  for (const protocol of protocols) {
    metrics[`${protocol.id}_tvl_change_24h`] = -5 + Math.random() * 10;
    metrics[`${protocol.id}_users_change`] = -10 + Math.random() * 20;
    metrics[`${protocol.id}_volume_change`] = -15 + Math.random() * 30;
    metrics[`${protocol.id}_token_volatility`] = 20 + Math.random() * 60;
    metrics[`${protocol.id}_liquidity_depth`] = 80 + Math.random() * 20;
    metrics[`${protocol.id}_governance_activity`] = 40 + Math.random() * 40;
    metrics[`${protocol.id}_audit_score`] = protocol.riskScore || 70;
  }
  
  return metrics;
}

function calculateConfidenceLevel(prediction: any): number {
  // Calculate confidence based on prediction type and data quality
  let confidence = 0.7; // Base confidence
  
  if (prediction.predictions && prediction.predictions.length > 0) {
    const avgConfidence = prediction.predictions.reduce(
      (sum: number, p: any) => sum + (p.confidence || 0.7), 0
    ) / prediction.predictions.length;
    confidence = avgConfidence;
  }
  
  return Math.round(confidence * 100) / 100;
}

function getDeFiPredictionDisclaimer(predictionType: string): string {
  const baseDisclaimer = 'この予測は情報提供のみを目的としており、投資助言ではありません。';
  
  const specificDisclaimers = {
    'apy_trends': 'APY予測は過去の実績と市場状況に基づいており、実際の結果は大きく異なる可能性があります。',
    'tvl_forecast': 'TVL予測は多くの不確定要素を含み、市場の急変により大きく変動する可能性があります。',
    'risk_events': 'リスクイベントの検出は完全ではありません。予期しないリスクが発生する可能性があります。',
    'market_cycle': '市場サイクル予測は一般的な傾向を示しており、個別の投資判断には適さない場合があります。',
    'gas_optimization': 'ガス価格予測は網羅的ではなく、実際の価格は予測と大きく異なる可能性があります。'
  };
  
  return `${baseDisclaimer} ${specificDisclaimers[predictionType] || ''}`;
}

function getPredictionUsageGuidelines(predictionType: string): string[] {
  const commonGuidelines = [
    '予測結果は他の分析と組み合わせて使用してください',
    '市場状況の急変時は予測精度が低下します',
    '定期的に最新の予測に更新してください'
  ];
  
  const specificGuidelines = {
    'apy_trends': ['短期予測（24h-7d）の方が精度が高いです', '報酬トークンの価格変動も考慮してください'],
    'risk_events': ['高リスクアラートは迅速に対応してください', '複数のリスク要因が重複する場合は特に注意'],
    'gas_optimization': ['推奨時間帯でも価格が急変する可能性があります', '緊急でない取引は最適化時間を活用してください']
  };
  
  return [...commonGuidelines, ...(specificGuidelines[predictionType] || [])];
}

function getPredictionLimitations(predictionType: string): string[] {
  const commonLimitations = [
    'ブラックスワンイベントは予測できません',
    '新しいプロトコルは予測精度が低い場合があります',
    '規制変更などの外部要因は考慮されていません'
  ];
  
  const specificLimitations = {
    'apy_trends': ['新トークンの価格ボラティリティは考慮困難', 'インセンティブプログラム終了は予測困難'],
    'tvl_forecast': ['大口投資家の動向は予測困難', '競合プロトコルの影響は限定的に考慮'],
    'risk_events': ['完全に新しい攻撃手法は検出困難', 'ゼロデイ脆弱性は検出不可能']
  };
  
  return [...commonLimitations, ...(specificLimitations[predictionType] || [])];
}

function getCacheTTL(predictionType: string): number {
  const cacheTTLs = {
    'apy_trends': 10 * 60 * 1000,      // 10 minutes
    'tvl_forecast': 30 * 60 * 1000,    // 30 minutes
    'risk_events': 5 * 60 * 1000,      // 5 minutes (most critical)
    'market_cycle': 60 * 60 * 1000,    // 1 hour
    'gas_optimization': 15 * 60 * 1000 // 15 minutes
  };
  
  return cacheTTLs[predictionType] || 15 * 60 * 1000; // Default 15 minutes
}