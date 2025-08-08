// API Route: DeFi Smart Alerts
import { NextRequest, NextResponse } from 'next/server';
import { smartAlertsEngine } from '@/lib/ai/smart-alerts';
import { aiCacheService } from '@/lib/ai/ai-cache';
import { logger } from '@/lib/monitoring/logger';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id') || 'anonymous';
    
    const body = await request.json();
    const { action, ...params } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const rateLimit = await aiCacheService.checkRateLimit(userId, '/api/ai/defi/alerts');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: rateLimit.resetTime 
        },
        { status: 429 }
      );
    }

    let result: any;

    switch (action) {
      case 'create_custom_alert':
        const { condition } = params;
        if (!condition) {
          return NextResponse.json(
            { error: 'Condition is required for custom alerts' },
            { status: 400 }
          );
        }
        
        result = await smartAlertsEngine.createCustomAlert(userId, condition);
        
        logger.info('Custom alert created', {
          userId,
          condition: condition.substring(0, 100)
        });
        break;

      case 'evaluate_portfolio_health':
        const { portfolio, protocols } = params;
        if (!portfolio) {
          return NextResponse.json(
            { error: 'Portfolio is required for health evaluation' },
            { status: 400 }
          );
        }
        
        result = await smartAlertsEngine.evaluatePortfolioHealth(
          userId,
          portfolio,
          protocols || []
        );
        
        logger.info('Portfolio health evaluated', {
          userId,
          portfolioValue: portfolio.totalValue,
          healthScore: result.score.overall_score
        });
        break;

      case 'discover_opportunities':
        const { portfolio: userPortfolio, available_protocols } = params;
        if (!userPortfolio) {
          return NextResponse.json(
            { error: 'Portfolio is required for opportunity discovery' },
            { status: 400 }
          );
        }
        
        result = await smartAlertsEngine.discoverOpportunities(
          userId,
          userPortfolio,
          available_protocols || []
        );
        
        logger.info('Opportunities discovered', {
          userId,
          opportunitiesFound: result.length
        });
        break;

      case 'process_market_data':
        const { market_data } = params;
        if (!market_data) {
          return NextResponse.json(
            { error: 'Market data is required' },
            { status: 400 }
          );
        }
        
        // This is typically called by internal systems
        result = await smartAlertsEngine.processMarketData(market_data);
        
        logger.info('Market data processed', {
          alertsGenerated: result.length,
          criticalAlerts: result.filter((a: any) => a.severity === 'critical').length
        });
        break;

      case 'provide_feedback':
        const { alert_id, feedback } = params;
        if (!alert_id || !feedback) {
          return NextResponse.json(
            { error: 'Alert ID and feedback are required' },
            { status: 400 }
          );
        }
        
        await smartAlertsEngine.learnFromUserFeedback(alert_id, feedback);
        result = { success: true, message: 'Feedback recorded successfully' };
        
        logger.info('Alert feedback processed', {
          userId,
          alertId: alert_id,
          helpful: feedback.helpful
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    // Log API usage
    await aiCacheService.logAPIUsage(
      userId,
      '/api/ai/defi/alerts',
      'smart-alerts',
      JSON.stringify(body).length / 4,
      0.003
    );

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('DeFi alerts API error', { error });
    
    return NextResponse.json(
      { 
        error: 'Smart alerts service temporarily unavailable',
        message: 'アラートサービスは一時的に利用できません。'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id') || 'anonymous';
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'user_alerts';
    const status = searchParams.get('status') || 'active';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    switch (type) {
      case 'user_alerts':
        // In production, this would fetch from database
        const mockAlerts = await generateMockUserAlerts(userId, status, limit, offset);
        
        return NextResponse.json({
          alerts: mockAlerts,
          total: mockAlerts.length,
          has_more: mockAlerts.length === limit,
          pagination: {
            limit,
            offset,
            next_offset: mockAlerts.length === limit ? offset + limit : null
          }
        });

      case 'alert_stats':
        const stats = await generateAlertStats(userId);
        return NextResponse.json(stats);

      case 'supported_conditions':
        return NextResponse.json({
          condition_types: [
            {
              type: 'price_movement',
              description: '資産価格の変動に基づくアラート',
              parameters: ['asset', 'threshold', 'operator', 'timeframe'],
              example: 'ETHが5%以上上昇した時'
            },
            {
              type: 'apy_change',
              description: 'プロトコルAPYの変動に基づくアラート',
              parameters: ['protocol', 'threshold', 'timeframe'],
              example: 'AaveのAPYが2%以上変動した時'
            },
            {
              type: 'tvl_change',
              description: 'TVLの大幅変動に基づくアラート',
              parameters: ['protocol', 'threshold'],
              example: 'プロトコルのTVLが20%以上変動した時'
            },
            {
              type: 'risk_score_change',
              description: 'リスクスコアの変動に基づくアラート',
              parameters: ['protocol', 'threshold'],
              example: 'プロトコルのリスクスコアが10ポイント以上変動した時'
            },
            {
              type: 'custom_ai',
              description: '自然言語によるカスタムアラート条件',
              parameters: ['custom_logic'],
              example: 'ビットコインが急落してDeFi市場全体が不安定になった時'
            }
          ],
          natural_language_examples: [
            'USDCが1ドルから0.95ドル以下に下がったら教えて',
            'Uniswap V3のETH/USDTプールのAPYが15%を超えたらアラート',
            'DeFi市場全体のTVLが10%以上減少したら警告',
            '新しい高APYの機会が見つかったら通知',
            'ポートフォリオのリスクレベルが高くなったらアラート'
          ]
        });

      case 'opportunity_types':
        return NextResponse.json({
          opportunity_categories: [
            {
              type: 'high_yield',
              description: '高利回り機会の発見',
              typical_apy: '15%+',
              risk_level: 'medium_to_high'
            },
            {
              type: 'arbitrage',
              description: '価格差を利用した裁定取引機会',
              potential_profit: '1-3%',
              time_window: '5-30 minutes'
            },
            {
              type: 'new_pool',
              description: '新しい流動性プールの早期参加機会',
              benefits: ['Early adopter rewards', 'Low competition'],
              risks: ['Unproven protocols', 'High volatility']
            },
            {
              type: 'liquidation',
              description: '清算機会（上級者向け）',
              potential_profit: '5-15%',
              requirements: ['Flash loan capability', 'Advanced knowledge']
            },
            {
              type: 'governance',
              description: 'ガバナンス参加による報酬機会',
              benefits: ['Voting rewards', 'Governance tokens'],
              time_commitment: 'Regular participation required'
            }
          ]
        });

      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }

  } catch (error) {
    logger.error('DeFi alerts GET error', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id') || 'anonymous';
    
    const { searchParams } = new URL(request.url);
    const alertId = searchParams.get('alert_id');
    const conditionId = searchParams.get('condition_id');

    if (!alertId && !conditionId) {
      return NextResponse.json(
        { error: 'Alert ID or Condition ID is required' },
        { status: 400 }
      );
    }

    // In production, this would delete from database
    logger.info('Alert/Condition deleted', {
      userId,
      alertId,
      conditionId
    });

    return NextResponse.json({
      success: true,
      message: alertId ? 'Alert deleted successfully' : 'Alert condition deleted successfully'
    });

  } catch (error) {
    logger.error('DeFi alerts DELETE error', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions for mock data generation
async function generateMockUserAlerts(userId: string, status: string, limit: number, offset: number) {
  const mockAlerts = [
    {
      id: 'alert_001',
      user_id: userId,
      type: 'opportunity',
      severity: 'info',
      title: '高利回り機会発見：Curve stETH/ETHプール',
      description: 'CurveのstETH/ETHプールで通常より高いAPY（18.5%）を検出しました。現在の流動性も十分で、参加に適したタイミングです。',
      conditions_met: [
        {
          condition: 'APY threshold exceeded',
          value: 18.5,
          threshold: 15,
          operator: 'gt'
        }
      ],
      metadata: {
        protocol: 'Curve Finance',
        action_required: true,
        estimated_impact: 2500,
        time_sensitivity: 'hours',
        confidence: 0.85
      },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      is_read: false,
      is_dismissed: false
    },
    {
      id: 'alert_002',
      user_id: userId,
      type: 'risk',
      severity: 'warning',
      title: 'リスク警告：Compound DAI利用率上昇',
      description: 'Compound DAI市場の利用率が90%を超えました。流動性逼迫により出金困難になる可能性があります。ポジション調整を検討してください。',
      conditions_met: [
        {
          condition: 'Utilization rate high',
          value: 92,
          threshold: 85,
          operator: 'gt'
        }
      ],
      metadata: {
        protocol: 'Compound',
        asset: 'DAI',
        action_required: true,
        time_sensitivity: 'immediate',
        confidence: 0.92
      },
      created_at: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      is_read: false,
      is_dismissed: false
    },
    {
      id: 'alert_003',
      user_id: userId,
      type: 'portfolio_health',
      severity: 'info',
      title: 'ポートフォリオ健全性改善のお知らせ',
      description: '過去7日間でポートフォリオのリスクスコアが5ポイント改善しました。分散化戦略が効果を発揮しています。',
      conditions_met: [],
      metadata: {
        action_required: false,
        confidence: 0.9
      },
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      is_read: true,
      is_dismissed: false
    }
  ];

  return status === 'active' 
    ? mockAlerts.filter(alert => !alert.is_dismissed).slice(offset, offset + limit)
    : mockAlerts.slice(offset, offset + limit);
}

async function generateAlertStats(userId: string) {
  return {
    total_alerts: 15,
    unread_alerts: 3,
    active_conditions: 8,
    opportunities_found_this_week: 5,
    alerts_by_severity: {
      critical: 1,
      warning: 4,
      info: 10
    },
    alerts_by_type: {
      opportunity: 7,
      risk: 5,
      portfolio_health: 2,
      market_event: 1
    },
    success_metrics: {
      opportunities_acted_upon: 3,
      average_user_rating: 4.2,
      false_positive_rate: 0.15
    },
    performance_this_month: {
      alerts_generated: 28,
      user_satisfaction: 0.87,
      opportunities_value: '$3,250',
      risks_avoided: 2
    }
  };
}