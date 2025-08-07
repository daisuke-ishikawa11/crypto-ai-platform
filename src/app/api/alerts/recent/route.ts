// 🚨 最近のアラート取得API
// ユーザーの最新トリガーアラート一覧を提供

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext, parsePaginationParams, parseSortParams } from '@/lib/auth/middleware';
import { AlertType, AlertSeverity } from '@/lib/alerts/types';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// クエリパラメータ検証スキーマ
const querySchema = z.object({
  limit: z.string().optional().transform(val => Math.min(50, Math.max(1, parseInt(val || '10')))),
  offset: z.string().optional().transform(val => Math.max(0, parseInt(val || '0'))),
  severity: z.enum(['critical', 'warning', 'info']).optional(),
  type: z.string().optional(),
  symbol: z.string().optional(),
  timeframe: z.enum(['1h', '24h', '7d', '30d']).optional().default('24h'),
  acknowledged: z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined)
});

// レスポンス型定義
interface RecentAlert {
  id: string;
  type: string;
  symbol: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  triggeredAt: Date;
  acknowledged: boolean;
  currentValue?: number;
  previousValue?: number;
  changePercent?: number;
  details?: any;
}

interface RecentAlertsResponse {
  alerts: RecentAlert[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
  summary: {
    total: number;
    critical: number;
    warning: number;
    info: number;
    acknowledged: number;
    unacknowledged: number;
  };
}

/**
 * 最近のアラートを取得
 */
async function getRecentAlerts(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse<RecentAlertsResponse>> {
  const { user, supabase } = context;
  
  try {
    // クエリパラメータの解析と検証
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams);
    const validatedQuery = querySchema.parse(queryParams);
    
    const {
      limit = 10,
      offset = 0,
      severity,
      type,
      symbol,
      timeframe = '24h',
      acknowledged
    } = validatedQuery;

    // 時間範囲の計算
    const timeFilter = getTimeFilter(timeframe);
    
    // ベースクエリの構築
    let query = supabase
      .from('triggered_alerts')
      .select(`
        id,
        type,
        severity,
        triggered_at,
        triggered_price,
        current_value,
        previous_value,
        change_percent,
        title,
        message,
        details,
        acknowledged,
        alert_conditions!inner (
          symbol,
          exchange,
          name
        )
      `)
      .eq('user_id', user.id)
      .gte('triggered_at', timeFilter)
      .order('triggered_at', { ascending: false });

    // フィルター条件の適用
    if (severity) {
      query = query.eq('severity', severity);
    }
    
    if (type) {
      query = query.eq('type', type);
    }
    
    if (symbol) {
      query = query.eq('alert_conditions.symbol', symbol.toUpperCase());
    }
    
    if (acknowledged !== undefined) {
      query = query.eq('acknowledged', acknowledged);
    }

    // 総数取得（フィルター適用）
    const { count: totalCount } = await supabase
      .from('triggered_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // ページネーション適用してデータ取得
    const { data: alertsData, error } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch alerts: ${error.message}`);
    }

    // データの変換
    const alerts: RecentAlert[] = alertsData?.map((alert: any) => ({
      id: alert.id,
      type: alert.type,
      symbol: alert.alert_conditions.symbol,
      message: alert.message,
      severity: alert.severity,
      triggeredAt: new Date(alert.triggered_at),
      acknowledged: alert.acknowledged,
      currentValue: alert.current_value,
      previousValue: alert.previous_value,
      changePercent: alert.change_percent,
      details: alert.details
    })) || [];

    // 統計情報の取得
    const summary = await getAlertsSummary(user.id, supabase, timeFilter);

    // レスポンスの構築
    const response: RecentAlertsResponse = {
      alerts,
      pagination: {
        total: totalCount || 0,
        page: Math.floor(offset / limit) + 1,
        limit,
        hasMore: (offset + limit) < (totalCount || 0)
      },
      summary
    };

    logger.debug('Recent alerts fetched', {
      userId: user.id,
      alertsCount: alerts.length,
      totalCount,
      timeframe,
      filters: { severity, type, symbol, acknowledged }
    });

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Failed to fetch recent alerts', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * アラート統計情報を取得
 */
async function getAlertsSummary(userId: string, supabase: any, timeFilter: string) {
  try {
    // 基本統計
    const { data: summaryData } = await supabase
      .from('triggered_alerts')
      .select('severity, acknowledged')
      .eq('user_id', userId)
      .gte('triggered_at', timeFilter);

    const summary = {
      total: summaryData?.length || 0,
      critical: 0,
      warning: 0,
      info: 0,
      acknowledged: 0,
      unacknowledged: 0
    };

    summaryData?.forEach((alert: any) => {
      // 重要度別集計
      if (alert.severity === 'critical') summary.critical++;
      else if (alert.severity === 'warning') summary.warning++;
      else if (alert.severity === 'info') summary.info++;

      // 確認状態別集計
      if (alert.acknowledged) summary.acknowledged++;
      else summary.unacknowledged++;
    });

    return summary;

  } catch (error) {
    logger.error('Failed to get alerts summary', { 
      userId, 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {
      total: 0,
      critical: 0,
      warning: 0,
      info: 0,
      acknowledged: 0,
      unacknowledged: 0
    };
  }
}

/**
 * 時間範囲フィルターを取得
 */
function getTimeFilter(timeframe: string): string {
  const now = new Date();
  let filterDate: Date;

  switch (timeframe) {
    case '1h':
      filterDate = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case '24h':
      filterDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      filterDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      filterDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  return filterDate.toISOString();
}

/**
 * アラートを確認済みにマーク
 */
async function acknowledgeAlert(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse> {
  const { user, supabase } = context;
  
  try {
    const body = await request.json();
    const { alertId, acknowledgeAll = false } = body;

    if (acknowledgeAll) {
      // 全てのアラートを確認済みにマーク
      const { error } = await supabase
        .from('triggered_alerts')
        .update({ 
          acknowledged: true,
          acknowledged_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('acknowledged', false);

      if (error) {
        throw new Error(`Failed to acknowledge all alerts: ${error.message}`);
      }

      logger.info('All alerts acknowledged', { userId: user.id });

    } else if (alertId) {
      // 特定のアラートを確認済みにマーク
      const { error } = await supabase
        .from('triggered_alerts')
        .update({ 
          acknowledged: true,
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', alertId)
        .eq('user_id', user.id);

      if (error) {
        throw new Error(`Failed to acknowledge alert: ${error.message}`);
      }

      logger.info('Alert acknowledged', { userId: user.id, alertId });

    } else {
      return NextResponse.json(
        { error: 'alertId or acknowledgeAll flag is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    logger.error('Failed to acknowledge alert', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

// API Route Handlers
export const GET = withApiHandler(getRecentAlerts, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'alerts-recent'
});

export const POST = withApiHandler(acknowledgeAlert, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'alerts-acknowledge',
  validateSchema: z.object({
    alertId: z.string().optional(),
    acknowledgeAll: z.boolean().optional()
  }).refine(data => data.alertId || data.acknowledgeAll, {
    message: "Either alertId or acknowledgeAll must be provided"
  })
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