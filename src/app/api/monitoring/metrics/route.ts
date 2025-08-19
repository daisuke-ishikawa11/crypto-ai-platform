import { NextRequest, NextResponse } from 'next/server';
import { productionMonitor } from '@/lib/monitoring/production-monitor';
import { apiLogger } from '@/lib/monitoring/logger';
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hours = parseInt(searchParams.get('hours') || '1');
    
    // 現在のメトリクス取得
    const currentMetrics = productionMonitor.getCurrentMetrics();
    
    // 履歴メトリクス取得
    const historyMetrics = productionMonitor.getMetricsHistory(hours);
    
    // アクティブアラート取得
    const activeAlerts = productionMonitor.getActiveAlerts();
    
    // システム健全性スコア取得
    const healthScore = productionMonitor.getHealthScore();
    
    const response = {
      success: true,
      data: {
        current: currentMetrics,
        history: historyMetrics,
        alerts: activeAlerts,
        healthScore,
        summary: {
          totalAlerts: activeAlerts.length,
          criticalAlerts: activeAlerts.filter(a => a.severity === 'critical').length,
          lastUpdate: currentMetrics?.timestamp || Date.now()
        }
      }
    };

    apiLogger.info('Monitoring metrics retrieved', {
      currentMetricsAvailable: !!currentMetrics,
      historyCount: historyMetrics.length,
      activeAlertsCount: activeAlerts.length,
      healthScore,
      action: 'get_monitoring_metrics'
    });

    return NextResponse.json(response);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    apiLogger.error('Failed to retrieve monitoring metrics', {
      error: errorMessage,
      action: 'get_monitoring_metrics_error'
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve monitoring metrics',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'start_monitoring':
        productionMonitor.startMonitoring();
        apiLogger.info('Production monitoring started', {
          action: 'start_monitoring'
        });
        return NextResponse.json({ success: true, message: 'Monitoring started' });

      case 'stop_monitoring':
        productionMonitor.stopMonitoring();
        apiLogger.info('Production monitoring stopped', {
          action: 'stop_monitoring'
        });
        return NextResponse.json({ success: true, message: 'Monitoring stopped' });

      case 'export_report':
        const currentMetrics = productionMonitor.getCurrentMetrics();
        const historyMetrics = productionMonitor.getMetricsHistory(24); // 24時間分
        const activeAlerts = productionMonitor.getActiveAlerts();
        const healthScore = productionMonitor.getHealthScore();

        const report = {
          timestamp: new Date().toISOString(),
          currentMetrics,
          historyMetrics,
          activeAlerts,
          healthScore,
          summary: {
            totalAlerts: activeAlerts.length,
            criticalAlerts: activeAlerts.filter(a => a.severity === 'critical').length,
            averageResponseTime: historyMetrics.length > 0 
              ? historyMetrics.reduce((sum, m) => sum + m.responseTime, 0) / historyMetrics.length 
              : 0,
            averageErrorRate: historyMetrics.length > 0 
              ? historyMetrics.reduce((sum, m) => sum + m.errorRate, 0) / historyMetrics.length 
              : 0
          }
        };

        apiLogger.info('Monitoring report exported', {
          reportSize: JSON.stringify(report).length,
          historyCount: historyMetrics.length,
          action: 'export_monitoring_report'
        });

        return NextResponse.json({
          success: true,
          data: report
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    apiLogger.error('Failed to process monitoring action', {
      error: errorMessage,
      action: 'process_monitoring_action_error'
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process monitoring action',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
