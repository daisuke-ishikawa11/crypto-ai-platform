// 🚨 アラート管理API - CRUD操作
// アラート条件の作成、読み取り、更新、削除を提供

import { NextRequest, NextResponse } from 'next/server';
import { withApiHandler, ApiContext, parsePaginationParams, parseSortParams } from '@/lib/auth/middleware';
import { AlertType, AlertSeverity, AlertStatus, NotificationMethod } from '@/lib/alerts/types';
import { AlertManager } from '@/lib/alerts/alert-manager';
import { logger } from '@/lib/monitoring/logger';
import { z } from 'zod';

// バリデーションスキーマ
const createAlertSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.nativeEnum(AlertType),
  severity: z.nativeEnum(AlertSeverity),
  symbol: z.string().min(1).max(20),
  exchange: z.string().max(50).optional(),
  conditions: z.record(z.any()),
  notificationMethods: z.array(z.nativeEnum(NotificationMethod)).min(1),
  cooldownPeriod: z.number().min(0).max(1440).default(15),
  expiresAt: z.string().datetime().optional(),
  timeframe: z.string().optional(),
  markets: z.array(z.string()).optional()
});

const updateAlertSchema = createAlertSchema.partial();

const querySchema = z.object({
  status: z.nativeEnum(AlertStatus).optional(),
  type: z.nativeEnum(AlertType).optional(),
  severity: z.nativeEnum(AlertSeverity).optional(),
  symbol: z.string().optional(),
  search: z.string().optional()
});

// レスポンス型定義
interface AlertConditionResponse {
  id: string;
  name: string;
  description?: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  symbol: string;
  exchange?: string;
  conditions: Record<string, any>;
  notificationMethods: NotificationMethod[];
  cooldownPeriod: number;
  createdAt: string;
  updatedAt: string;
  lastTriggered?: string;
  triggerCount: number;
  expiresAt?: string;
  timeframe?: string;
  markets?: string[];
}

interface AlertsListResponse {
  alerts: AlertConditionResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
  statistics: {
    total: number;
    active: number;
    paused: number;
    expired: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  };
}

// AlertManagerインスタンス
let alertManager: AlertManager | null = null;

function getAlertManager(): AlertManager {
  if (!alertManager) {
    alertManager = new AlertManager({
      maxAlertsPerUser: 50,
      maxTriggersPerHour: 100,
      defaultCooldownPeriod: 15,
      dataRefreshInterval: 60,
      notificationRetryAttempts: 3,
      batchSize: 20,
      parallelProcessing: true,
      cacheEnabled: true,
      spamPrevention: true,
      duplicateDetection: true,
      noiseReduction: true,
      enableRealtime: true,
      enableBatching: true,
      batchInterval: 30000,
      enablePriceAlerts: true,
      enableTechnicalAlerts: true,
      enableVolumeAlerts: true,
      enableRiskAlerts: true,
      enableDeFiAlerts: true
    });
  }
  return alertManager;
}

/**
 * アラート一覧を取得
 */
async function getAlerts(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse<AlertsListResponse>> {
  const { user, supabase } = context;
  
  try {
    // クエリパラメータの解析
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams);
    const validatedQuery = querySchema.parse(queryParams);
    const { page, limit, offset } = parsePaginationParams(request);
    const { sortBy, sortOrder } = parseSortParams(request, ['created_at', 'updated_at', 'name', 'type', 'severity']);

    // ベースクエリの構築
    let query = supabase
      .from('alert_conditions')
      .select(`
        id,
        name,
        description,
        type,
        severity,
        status,
        symbol,
        exchange,
        conditions,
        notification_methods,
        cooldown_period,
        created_at,
        updated_at,
        last_triggered,
        trigger_count,
        expires_at,
        timeframe,
        markets
      `)
      .eq('user_id', user.id);

    // フィルター条件の適用
    if (validatedQuery.status) {
      query = query.eq('status', validatedQuery.status);
    }
    
    if (validatedQuery.type) {
      query = query.eq('type', validatedQuery.type);
    }
    
    if (validatedQuery.severity) {
      query = query.eq('severity', validatedQuery.severity);
    }
    
    if (validatedQuery.symbol) {
      query = query.eq('symbol', validatedQuery.symbol.toUpperCase());
    }
    
    if (validatedQuery.search) {
      query = query.or(`name.ilike.%${validatedQuery.search}%,description.ilike.%${validatedQuery.search}%`);
    }

    // 総数取得
    const { count: totalCount } = await supabase
      .from('user_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // ソートとページネーション適用
    const { data: alertsData, error } = await query
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch alerts: ${error.message}`);
    }

    // データの変換
    const alerts: AlertConditionResponse[] = alertsData?.map((alert: any) => ({
      id: alert.id,
      name: alert.name,
      description: alert.description,
      type: alert.type,
      severity: alert.severity,
      status: alert.status,
      symbol: alert.symbol,
      exchange: alert.exchange,
      conditions: alert.conditions,
      notificationMethods: alert.notification_methods,
      cooldownPeriod: alert.cooldown_period,
      createdAt: alert.created_at,
      updatedAt: alert.updated_at,
      lastTriggered: alert.last_triggered,
      triggerCount: alert.trigger_count || 0,
      expiresAt: alert.expires_at,
      timeframe: alert.timeframe,
      markets: alert.markets
    })) || [];

    // 統計情報の取得
    const statistics = await getAlertsStatistics(user.id, supabase);

    // レスポンスの構築
    const response: AlertsListResponse = {
      alerts,
      pagination: {
        total: totalCount || 0,
        page,
        limit,
        hasMore: (offset + limit) < (totalCount || 0)
      },
      statistics
    };

    logger.debug('Alerts list fetched', {
      userId: user.id,
      alertsCount: alerts.length,
      totalCount,
      filters: validatedQuery
    });

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Failed to fetch alerts list', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * 新しいアラートを作成
 */
async function createAlert(
  request: NextRequest,
  context: ApiContext
): Promise<NextResponse<AlertConditionResponse>> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = createAlertSchema.parse(body);

    // AlertManagerを使用してアラートを作成
    const manager = getAlertManager();
    const newAlert = await manager.createAlert({
      userId: user.id,
      name: validatedData.name,
      description: validatedData.description,
      type: validatedData.type,
      severity: validatedData.severity,
      status: AlertStatus.ACTIVE,
      symbol: validatedData.symbol.toUpperCase(),
      exchange: validatedData.exchange,
      conditions: validatedData.conditions,
      notificationMethods: validatedData.notificationMethods,
      cooldownPeriod: validatedData.cooldownPeriod,
      expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : undefined,
      timeframe: validatedData.timeframe,
      markets: validatedData.markets
    });

    const response: AlertConditionResponse = {
      id: newAlert.id,
      name: newAlert.name,
      description: newAlert.description,
      type: newAlert.type,
      severity: newAlert.severity,
      status: newAlert.status,
      symbol: newAlert.symbol,
      exchange: newAlert.exchange,
      conditions: newAlert.conditions,
      notificationMethods: newAlert.notificationMethods,
      cooldownPeriod: newAlert.cooldownPeriod,
      createdAt: newAlert.createdAt.toISOString(),
      updatedAt: newAlert.updatedAt.toISOString(),
      lastTriggered: newAlert.lastTriggered?.toISOString(),
      triggerCount: newAlert.triggerCount,
      expiresAt: newAlert.expiresAt?.toISOString(),
      timeframe: newAlert.timeframe,
      markets: newAlert.markets
    };

    logger.info('Alert created successfully', {
      userId: user.id,
      alertId: newAlert.id,
      type: newAlert.type,
      symbol: newAlert.symbol
    });

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    logger.error('Failed to create alert', {
      userId: user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * アラートを更新
 */
async function updateAlert(
  request: NextRequest,
  context: ApiContext,
  params: { id: string }
): Promise<NextResponse<AlertConditionResponse>> {
  const { user } = context;
  
  try {
    const body = await request.json();
    const validatedData = updateAlertSchema.parse(body);

    // AlertManagerを使用してアラートを更新
    const manager = getAlertManager();
    const updatedAlert = await manager.updateAlert(params.id, {
      ...validatedData,
      symbol: validatedData.symbol?.toUpperCase(),
      expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : undefined
    });

    const response: AlertConditionResponse = {
      id: updatedAlert.id,
      name: updatedAlert.name,
      description: updatedAlert.description,
      type: updatedAlert.type,
      severity: updatedAlert.severity,
      status: updatedAlert.status,
      symbol: updatedAlert.symbol,
      exchange: updatedAlert.exchange,
      conditions: updatedAlert.conditions,
      notificationMethods: updatedAlert.notificationMethods,
      cooldownPeriod: updatedAlert.cooldownPeriod,
      createdAt: updatedAlert.createdAt.toISOString(),
      updatedAt: updatedAlert.updatedAt.toISOString(),
      lastTriggered: updatedAlert.lastTriggered?.toISOString(),
      triggerCount: updatedAlert.triggerCount,
      expiresAt: updatedAlert.expiresAt?.toISOString(),
      timeframe: updatedAlert.timeframe,
      markets: updatedAlert.markets
    };

    logger.info('Alert updated successfully', {
      userId: user.id,
      alertId: params.id,
      updatedFields: Object.keys(validatedData)
    });

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Failed to update alert', {
      userId: user.id,
      alertId: params.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * アラートを削除
 */
async function deleteAlert(
  request: NextRequest,
  context: ApiContext,
  params: { id: string }
): Promise<NextResponse> {
  const { user } = context;
  
  try {
    // AlertManagerを使用してアラートを削除
    const manager = getAlertManager();
    await manager.deleteAlert(params.id);

    logger.info('Alert deleted successfully', {
      userId: user.id,
      alertId: params.id
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    logger.error('Failed to delete alert', {
      userId: user.id,
      alertId: params.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}

/**
 * アラート統計情報を取得
 */
async function getAlertsStatistics(userId: string, supabase: any) {
  try {
    const { data: alertsData } = await supabase
      .from('alert_conditions')
      .select('status, type, severity')
      .eq('user_id', userId);

    const statistics = {
      total: alertsData?.length || 0,
      active: 0,
      paused: 0,
      expired: 0,
      byType: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>
    };

    alertsData?.forEach((alert: any) => {
      // ステータス別集計
      if (alert.status === 'active') statistics.active++;
      else if (alert.status === 'paused') statistics.paused++;
      else if (alert.status === 'expired') statistics.expired++;

      // タイプ別集計
      statistics.byType[alert.type] = (statistics.byType[alert.type] || 0) + 1;

      // 重要度別集計
      statistics.bySeverity[alert.severity] = (statistics.bySeverity[alert.severity] || 0) + 1;
    });

    return statistics;

  } catch (error) {
    logger.error('Failed to get alerts statistics', { userId, error: error instanceof Error ? error.message : String(error) });
    return {
      total: 0,
      active: 0,
      paused: 0,
      expired: 0,
      byType: {},
      bySeverity: {}
    };
  }
}

// API Route Handlers
export const GET = withApiHandler(getAlerts, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'alerts-list'
});

export const POST = withApiHandler(createAlert, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'alerts-create',
  validateSchema: createAlertSchema
});

export const PUT = withApiHandler(updateAlert, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'alerts-update',
  validateSchema: updateAlertSchema
});

export const DELETE = withApiHandler(deleteAlert, {
  requireAuth: true,
  requireSubscription: false,
  rateLimitKey: 'alerts-delete'
});

export const OPTIONS = async () => {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
};