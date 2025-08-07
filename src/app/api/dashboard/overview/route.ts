// 📊 ダッシュボード概要データAPI
// アラート、ポートフォリオ、DeFi、市場、AI分析の統合データを提供

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext } from '@/lib/auth/middleware';
import { AlertManager } from '@/lib/alerts/alert-manager';
import { DeFiMonitoringEngine } from '@/lib/defi/monitoring-engine';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// レスポンス型定義
interface DashboardOverviewResponse {
  alerts: {
    active: number;
    triggered: number;
    severity: {
      critical: number;
      warning: number;
      info: number;
    };
  };
  portfolio: {
    totalValue: number;
    change24h: number;
    changePercent: number;
    topAssets: Array<{
      symbol: string;
      value: number;
      change: number;
    }>;
  };
  defi: {
    totalTVL: number;
    protocolsMonitored: number;
    riskScore: number;
    topProtocols: Array<{
      name: string;
      tvl: number;
      risk: string;
    }>;
  };
  market: {
    fearGreedIndex: number;
    btcPrice: number;
    ethPrice: number;
    totalMarketCap: number;
  };
  ai: {
    recommendations: Array<{
      type: string;
      message: string;
      confidence: number;
    }>;
    signals: {
      bullish: number;
      bearish: number;
      neutral: number;
    };
  };
}

/**
 * ダッシュボード概要データを取得
 */
async function getDashboardOverview(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse<DashboardOverviewResponse>> {
  const { user, supabase } = context;
  
  try {
    // 並列でデータ取得
    const [
      alertsData,
      portfolioData,
      defiData,
      marketData,
      aiData
    ] = await Promise.all([
      getAlertsOverview(user.id, supabase),
      getPortfolioOverview(user.id, supabase),
      getDeFiOverview(user.id, supabase),
      getMarketOverview(),
      getAIOverview(user.id, supabase)
    ]);

    const response: DashboardOverviewResponse = {
      alerts: alertsData,
      portfolio: portfolioData,
      defi: defiData,
      market: marketData,
      ai: aiData
    };

    logger.debug('Dashboard overview data generated', {
      userId: user.id,
      activeAlerts: alertsData.active,
      portfolioValue: portfolioData.totalValue,
      defiTVL: defiData.totalTVL
    });

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Failed to generate dashboard overview', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * アラート概要データを取得
 */
async function getAlertsOverview(userId: string, supabase: any) {
  try {
    // アクティブなアラート数
    const { count: activeCount } = await supabase
      .from('alert_conditions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'active');

    // 本日トリガーされたアラート数
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { count: triggeredCount } = await supabase
      .from('triggered_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('triggered_at', today.toISOString());

    // 重要度別アラート統計
    const { data: severityData } = await supabase
      .from('triggered_alerts')
      .select('severity')
      .eq('user_id', userId)
      .gte('triggered_at', today.toISOString());

    const severityCounts = {
      critical: 0,
      warning: 0,
      info: 0
    };

    severityData?.forEach((alert: any) => {
      if (alert.severity in severityCounts) {
        severityCounts[alert.severity as keyof typeof severityCounts]++;
      }
    });

    return {
      active: activeCount || 0,
      triggered: triggeredCount || 0,
      severity: severityCounts
    };

  } catch (error) {
    logger.error('Failed to get alerts overview', { userId, error: error instanceof Error ? error.message : String(error) });
    return {
      active: 0,
      triggered: 0,
      severity: { critical: 0, warning: 0, info: 0 }
    };
  }
}

/**
 * ポートフォリオ概要データを取得
 */
async function getPortfolioOverview(userId: string, supabase: any) {
  try {
    // ユーザーのポートフォリオ取得
    const { data: portfolioData } = await supabase
      .from('user_portfolios')
      .select(`
        total_value,
        change_24h,
        change_percent_24h,
        updated_at
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    // トップアセット取得
    const { data: assetsData } = await supabase
      .from('portfolio_assets')
      .select(`
        symbol,
        current_value,
        change_percent_24h
      `)
      .eq('user_id', userId)
      .order('current_value', { ascending: false })
      .limit(5);

    const topAssets = assetsData?.map((asset: any) => ({
      symbol: asset.symbol,
      value: asset.current_value || 0,
      change: asset.change_percent_24h || 0
    })) || [];

    return {
      totalValue: portfolioData?.total_value || 0,
      change24h: portfolioData?.change_24h || 0,
      changePercent: portfolioData?.change_percent_24h || 0,
      topAssets
    };

  } catch (error) {
    logger.error('Failed to get portfolio overview', { userId, error: error instanceof Error ? error.message : String(error) });
    return {
      totalValue: 0,
      change24h: 0,
      changePercent: 0,
      topAssets: []
    };
  }
}

/**
 * DeFi概要データを取得
 */
async function getDeFiOverview(userId: string, supabase: any) {
  try {
    // ユーザーが監視しているDeFiプロトコル
    const { data: monitoredProtocols } = await supabase
      .from('user_defi_monitors')
      .select(`
        protocol_id,
        defi_protocols (
          name,
          current_tvl,
          risk_score
        )
      `)
      .eq('user_id', userId)
      .eq('is_active', true);

    let totalTVL = 0;
    const protocolsMonitored = monitoredProtocols?.length || 0;
    
    const topProtocols = monitoredProtocols?.slice(0, 5).map((monitor: any) => {
      const protocol = monitor.defi_protocols;
      totalTVL += protocol.current_tvl || 0;
      
      return {
        name: protocol.name,
        tvl: protocol.current_tvl || 0,
        risk: protocol.risk_score > 7 ? 'high' : protocol.risk_score > 4 ? 'medium' : 'low'
      };
    }) || [];

    // 平均リスクスコア計算
    const avgRiskScore = monitoredProtocols?.length 
      ? monitoredProtocols.reduce((sum: number, monitor: any) => 
          sum + (monitor.defi_protocols.risk_score || 0), 0) / monitoredProtocols.length
      : 0;

    return {
      totalTVL,
      protocolsMonitored,
      riskScore: Math.round(avgRiskScore),
      topProtocols
    };

  } catch (error) {
    logger.error('Failed to get DeFi overview', { userId, error: error instanceof Error ? error.message : String(error) });
    return {
      totalTVL: 0,
      protocolsMonitored: 0,
      riskScore: 0,
      topProtocols: []
    };
  }
}

/**
 * 市場概要データを取得
 */
async function getMarketOverview() {
  try {
    // 外部APIから市場データを取得（実装例）
    // 実際の実装では CoinMarketCap API などを使用
    const [fearGreedResponse, pricesResponse] = await Promise.all([
      fetch('https://api.alternative.me/fng/'),
      fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH&CMC_PRO_API_KEY=${process.env.COINMARKETCAP_API_KEY}`)
    ]);

    let fearGreedIndex = 50; // デフォルト値
    if (fearGreedResponse.ok) {
      const fearGreedData = await fearGreedResponse.json();
      fearGreedIndex = parseInt(fearGreedData.data[0]?.value || '50');
    }

    let btcPrice = 50000;
    let ethPrice = 3000;
    let totalMarketCap = 2000000000000; // 2T USD

    if (pricesResponse.ok) {
      const pricesData = await pricesResponse.json();
      btcPrice = pricesData.data.BTC?.quote.USD.price || btcPrice;
      ethPrice = pricesData.data.ETH?.quote.USD.price || ethPrice;
      totalMarketCap = pricesData.data.BTC?.quote.USD.market_cap + 
                      pricesData.data.ETH?.quote.USD.market_cap || totalMarketCap;
    }

    return {
      fearGreedIndex,
      btcPrice: Math.round(btcPrice),
      ethPrice: Math.round(ethPrice),
      totalMarketCap
    };

  } catch (error) {
    logger.error('Failed to get market overview', { error });
    // フォールバック値を返す
    return {
      fearGreedIndex: 50,
      btcPrice: 50000,
      ethPrice: 3000,
      totalMarketCap: 2000000000000
    };
  }
}

/**
 * AI分析概要データを取得
 */
async function getAIOverview(userId: string, supabase: any) {
  try {
    // ユーザー向けAI推奨事項を取得
    const { data: recommendationsData } = await supabase
      .from('ai_recommendations')
      .select(`
        recommendation_type,
        message,
        confidence_score,
        created_at
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3);

    // 市場シグナル分析
    const { data: signalsData } = await supabase
      .from('ai_market_signals')
      .select(`
        signal_type,
        confidence_score
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    const recommendations = recommendationsData?.map((rec: any) => ({
      type: rec.recommendation_type,
      message: rec.message,
      confidence: rec.confidence_score
    })) || [];

    // シグナル分析
    const signals = { bullish: 0, bearish: 0, neutral: 0 };
    if (signalsData?.length) {
      signalsData.forEach((signal: any) => {
        if (signal.signal_type === 'bullish') signals.bullish += signal.confidence_score;
        else if (signal.signal_type === 'bearish') signals.bearish += signal.confidence_score;
        else signals.neutral += signal.confidence_score;
      });

      // 正規化（0-100%)
      const total = signals.bullish + signals.bearish + signals.neutral;
      if (total > 0) {
        signals.bullish = Math.round((signals.bullish / total) * 100);
        signals.bearish = Math.round((signals.bearish / total) * 100);
        signals.neutral = Math.round((signals.neutral / total) * 100);
      }
    } else {
      // デフォルト値
      signals.bullish = 45;
      signals.bearish = 25;
      signals.neutral = 30;
    }

    return {
      recommendations,
      signals
    };

  } catch (error) {
    logger.error('Failed to get AI overview', { userId, error: error instanceof Error ? error.message : String(error) });
    return {
      recommendations: [],
      signals: { bullish: 50, bearish: 25, neutral: 25 }
    };
  }
}

// API Route Handlers
export const GET = withApiHandler(getDashboardOverview, {
  requireAuth: true,
  requireSubscription: false, // 基本機能として提供
  rateLimitKey: 'dashboard-overview'
});

export const OPTIONS = async () => {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
};