import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/supabase/server';
import { PerformanceMonitor } from '@/lib/monitoring/performance-monitor';
import { apiLogger } from '@/lib/monitoring/logger';
import { InputValidator, SecuritySchemas } from '@/lib/security/input-validation';
import { z } from 'zod';

const PerformanceQuerySchema = z.object({
  timeWindow: z.number().int().min(60000).max(7 * 24 * 60 * 60 * 1000).optional(), // 1 minute to 7 days
  action: z.enum(['report', 'metrics', 'system', 'clear']).optional()
});

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  try {
    // Check authentication and authorization
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user has admin privileges
    const supabase = (await import('@/lib/supabase/server')).createClient();
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const timeWindow = searchParams.get('timeWindow') ? parseInt(searchParams.get('timeWindow')!) : 60 * 60 * 1000; // Default 1 hour
    const action = searchParams.get('action') || 'report';
    
    const validation = InputValidator.validateApiInput(
      { timeWindow, action },
      PerformanceQuerySchema
    );
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    const monitor = PerformanceMonitor.getInstance();
    
    switch (action) {
      case 'report': {
        const report = await monitor.getPerformanceReport(timeWindow);
        
        apiLogger.info('Performance report generated', {
          requestId,
          userId: user.id,
          timeWindow,
          totalRequests: report.summary.totalRequests,
          averageResponseTime: report.summary.averageResponseTime,
          errorRate: report.summary.errorRate,
          action: 'performance_report'
        });
        
        return NextResponse.json({ report });
      }
      
      case 'system': {
        const systemMetrics = monitor.getCurrentSystemMetrics();
        
        apiLogger.info('System metrics retrieved', {
          requestId,
          userId: user.id,
          memoryUsage: systemMetrics.memoryUsage.percentage,
          cpuUsage: systemMetrics.cpuUsage,
          uptime: systemMetrics.uptime,
          action: 'system_metrics'
        });
        
        return NextResponse.json({ systemMetrics });
      }
      
      case 'metrics': {
        const systemMetrics = monitor.getCurrentSystemMetrics();
        const report = await monitor.getPerformanceReport(timeWindow);
        
        const combinedMetrics = {
          system: systemMetrics,
          performance: {
            totalRequests: report.summary.totalRequests,
            averageResponseTime: report.summary.averageResponseTime,
            errorRate: report.summary.errorRate,
            throughput: report.summary.throughput
          },
          health: report.systemHealth,
          timestamp: new Date().toISOString()
        };
        
        apiLogger.info('Combined metrics retrieved', {
          requestId,
          userId: user.id,
          metrics: combinedMetrics,
          action: 'combined_metrics'
        });
        
        return NextResponse.json({ metrics: combinedMetrics });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    apiLogger.error('Performance monitoring API error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'performance_monitoring_error'
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  try {
    // Check authentication and authorization
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user has admin privileges
    const supabase = (await import('@/lib/supabase/server')).createClient();
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { action, timeWindow } = body;
    
    const monitor = PerformanceMonitor.getInstance();
    
    switch (action) {
      case 'clear': {
        const olderThanMs = timeWindow || 24 * 60 * 60 * 1000; // Default 24 hours
        monitor.clearOldMetrics(olderThanMs);
        
        apiLogger.info('Performance metrics cleared', {
          requestId,
          userId: user.id,
          olderThanMs,
          action: 'clear_performance_metrics'
        });
        
        return NextResponse.json({ 
          success: true, 
          message: 'Old performance metrics cleared successfully' 
        });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    apiLogger.error('Performance monitoring POST API error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'performance_monitoring_post_error'
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint for monitoring systems
export async function HEAD(request: NextRequest) {
  try {
    const monitor = PerformanceMonitor.getInstance();
    const systemMetrics = monitor.getCurrentSystemMetrics();
    
    // Simple health check based on system metrics
    const memoryHealthy = systemMetrics.memoryUsage.percentage < 90;
    const cpuHealthy = systemMetrics.cpuUsage < 90;
    
    const status = memoryHealthy && cpuHealthy ? 200 : 503;
    
    return new NextResponse(null, {
      status,
      headers: {
        'X-Memory-Usage': systemMetrics.memoryUsage.percentage.toFixed(2),
        'X-CPU-Usage': systemMetrics.cpuUsage.toFixed(2),
        'X-Uptime': systemMetrics.uptime.toFixed(0),
        'X-Health-Status': status === 200 ? 'healthy' : 'degraded'
      }
    });
    
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Health-Status': 'error'
      }
    });
  }
}