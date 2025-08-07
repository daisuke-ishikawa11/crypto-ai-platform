import { apiLogger } from './logger';

interface PerformanceMetrics {
  requestId: string;
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  timestamp: Date;
  userId?: string;
  userPlan?: string;
  memoryUsage?: {
    used: number;
    total: number;
    percentage: number;
  };
  cpuUsage?: number;
  errorRate?: number;
  throughput?: number;
}

interface AlertThresholds {
  responseTime: number; // milliseconds
  errorRate: number; // percentage
  memoryUsage: number; // percentage
  cpuUsage: number; // percentage
  throughput: number; // requests per second
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private readonly MAX_METRICS = 10000;
  private readonly ALERT_THRESHOLDS: AlertThresholds = {
    responseTime: 5000, // 5 seconds
    errorRate: 5, // 5%
    memoryUsage: 80, // 80%
    cpuUsage: 80, // 80%
    throughput: 100 // 100 requests per second
  };

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  async recordMetrics(metrics: Omit<PerformanceMetrics, 'timestamp'>): Promise<void> {
    const performanceMetrics: PerformanceMetrics = {
      ...metrics,
      timestamp: new Date()
    };

    // Add to in-memory storage
    this.metrics.push(performanceMetrics);
    
    // Keep only recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }

    // Check for performance issues
    await this.checkPerformanceAlerts(performanceMetrics);

    // Log metrics for external monitoring
    apiLogger.info('Performance metrics recorded', {
      requestId: metrics.requestId,
      endpoint: metrics.endpoint,
      method: metrics.method,
      responseTime: metrics.responseTime,
      statusCode: metrics.statusCode,
      userId: metrics.userId,
      userPlan: metrics.userPlan,
      memoryUsage: metrics.memoryUsage,
      cpuUsage: metrics.cpuUsage,
      action: 'performance_metrics'
    });
  }

  private async checkPerformanceAlerts(metrics: PerformanceMetrics): Promise<void> {
    const alerts: string[] = [];

    // Check response time
    if (metrics.responseTime > this.ALERT_THRESHOLDS.responseTime) {
      alerts.push(`High response time: ${metrics.responseTime}ms (threshold: ${this.ALERT_THRESHOLDS.responseTime}ms)`);
    }

    // Check memory usage
    if (metrics.memoryUsage && metrics.memoryUsage.percentage > this.ALERT_THRESHOLDS.memoryUsage) {
      alerts.push(`High memory usage: ${metrics.memoryUsage.percentage}% (threshold: ${this.ALERT_THRESHOLDS.memoryUsage}%)`);
    }

    // Check CPU usage
    if (metrics.cpuUsage && metrics.cpuUsage > this.ALERT_THRESHOLDS.cpuUsage) {
      alerts.push(`High CPU usage: ${metrics.cpuUsage}% (threshold: ${this.ALERT_THRESHOLDS.cpuUsage}%)`);
    }

    // Check error rate for recent requests
    const recentMetrics = this.getRecentMetrics(5 * 60 * 1000); // Last 5 minutes
    const errorRate = this.calculateErrorRate(recentMetrics);
    if (errorRate > this.ALERT_THRESHOLDS.errorRate) {
      alerts.push(`High error rate: ${errorRate.toFixed(2)}% (threshold: ${this.ALERT_THRESHOLDS.errorRate}%)`);
    }

    // Check throughput
    const throughput = this.calculateThroughput(recentMetrics);
    if (throughput > this.ALERT_THRESHOLDS.throughput) {
      alerts.push(`High throughput: ${throughput.toFixed(2)} req/s (threshold: ${this.ALERT_THRESHOLDS.throughput} req/s)`);
    }

    // Send alerts if any thresholds are exceeded
    if (alerts.length > 0) {
      await this.sendPerformanceAlert(metrics, alerts);
    }
  }

  private async sendPerformanceAlert(metrics: PerformanceMetrics, alerts: string[]): Promise<void> {
    apiLogger.warn('Performance alert triggered', {
      requestId: metrics.requestId,
      endpoint: metrics.endpoint,
      method: metrics.method,
      alerts,
      metrics: {
        responseTime: metrics.responseTime,
        statusCode: metrics.statusCode,
        memoryUsage: metrics.memoryUsage,
        cpuUsage: metrics.cpuUsage
      },
      action: 'performance_alert'
    });
  }

  private getRecentMetrics(timeWindowMs: number): PerformanceMetrics[] {
    const cutoff = new Date(Date.now() - timeWindowMs);
    return this.metrics.filter(metric => metric.timestamp >= cutoff);
  }

  private calculateErrorRate(metrics: PerformanceMetrics[]): number {
    if (metrics.length === 0) return 0;
    
    const errorCount = metrics.filter(m => m.statusCode >= 400).length;
    return (errorCount / metrics.length) * 100;
  }

  private calculateThroughput(metrics: PerformanceMetrics[]): number {
    if (metrics.length === 0) return 0;
    
    const timeSpan = Math.max(1, (Date.now() - metrics[0].timestamp.getTime()) / 1000);
    return metrics.length / timeSpan;
  }

  async getPerformanceReport(timeWindowMs: number = 60 * 60 * 1000): Promise<{
    summary: {
      totalRequests: number;
      averageResponseTime: number;
      errorRate: number;
      throughput: number;
      slowestEndpoints: Array<{ endpoint: string; averageResponseTime: number }>;
      mostErrorProneEndpoints: Array<{ endpoint: string; errorRate: number }>;
    };
    systemHealth: {
      averageMemoryUsage: number;
      averageCpuUsage: number;
      alerts: number;
    };
    trends: {
      responseTimeHistory: Array<{ timestamp: Date; responseTime: number }>;
      errorRateHistory: Array<{ timestamp: Date; errorRate: number }>;
      throughputHistory: Array<{ timestamp: Date; throughput: number }>;
    };
  }> {
    const recentMetrics = this.getRecentMetrics(timeWindowMs);
    
    // Calculate summary statistics
    const totalRequests = recentMetrics.length;
    const averageResponseTime = recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests || 0;
    const errorRate = this.calculateErrorRate(recentMetrics);
    const throughput = this.calculateThroughput(recentMetrics);

    // Group by endpoint for detailed analysis
    const endpointMetrics = recentMetrics.reduce((acc, metric) => {
      if (!acc[metric.endpoint]) {
        acc[metric.endpoint] = [];
      }
      acc[metric.endpoint].push(metric);
      return acc;
    }, {} as Record<string, PerformanceMetrics[]>);

    // Find slowest endpoints
    const slowestEndpoints = Object.entries(endpointMetrics)
      .map(([endpoint, metrics]) => ({
        endpoint,
        averageResponseTime: metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length
      }))
      .sort((a, b) => b.averageResponseTime - a.averageResponseTime)
      .slice(0, 5);

    // Find most error-prone endpoints
    const mostErrorProneEndpoints = Object.entries(endpointMetrics)
      .map(([endpoint, metrics]) => ({
        endpoint,
        errorRate: this.calculateErrorRate(metrics)
      }))
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 5);

    // System health metrics
    const memoryMetrics = recentMetrics.filter(m => m.memoryUsage);
    const cpuMetrics = recentMetrics.filter(m => m.cpuUsage);
    const averageMemoryUsage = memoryMetrics.reduce((sum, m) => sum + (m.memoryUsage?.percentage || 0), 0) / memoryMetrics.length || 0;
    const averageCpuUsage = cpuMetrics.reduce((sum, m) => sum + (m.cpuUsage || 0), 0) / cpuMetrics.length || 0;

    // Generate trend data (hourly buckets)
    const buckets = this.generateTimeBuckets(timeWindowMs, 60 * 60 * 1000); // 1-hour buckets
    const responseTimeHistory = buckets.map(bucket => ({
      timestamp: bucket.timestamp,
      responseTime: bucket.metrics.reduce((sum, m) => sum + m.responseTime, 0) / bucket.metrics.length || 0
    }));

    const errorRateHistory = buckets.map(bucket => ({
      timestamp: bucket.timestamp,
      errorRate: this.calculateErrorRate(bucket.metrics)
    }));

    const throughputHistory = buckets.map(bucket => ({
      timestamp: bucket.timestamp,
      throughput: bucket.metrics.length / (60 * 60) // requests per second
    }));

    return {
      summary: {
        totalRequests,
        averageResponseTime,
        errorRate,
        throughput,
        slowestEndpoints,
        mostErrorProneEndpoints
      },
      systemHealth: {
        averageMemoryUsage,
        averageCpuUsage,
        alerts: 0 // Could be tracked separately
      },
      trends: {
        responseTimeHistory,
        errorRateHistory,
        throughputHistory
      }
    };
  }

  private generateTimeBuckets(timeWindowMs: number, bucketSize: number): Array<{
    timestamp: Date;
    metrics: PerformanceMetrics[];
  }> {
    const buckets: Array<{ timestamp: Date; metrics: PerformanceMetrics[] }> = [];
    const now = Date.now();
    const startTime = now - timeWindowMs;

    for (let time = startTime; time < now; time += bucketSize) {
      const bucketStart = new Date(time);
      const bucketEnd = new Date(time + bucketSize);
      
      const bucketMetrics = this.metrics.filter(m => 
        m.timestamp >= bucketStart && m.timestamp < bucketEnd
      );

      buckets.push({
        timestamp: bucketStart,
        metrics: bucketMetrics
      });
    }

    return buckets;
  }

  // Get current system performance
  getCurrentSystemMetrics(): {
    memoryUsage: { used: number; total: number; percentage: number };
    cpuUsage: number;
    uptime: number;
  } {
    const memoryUsage = process.memoryUsage();
    const totalMemory = memoryUsage.heapTotal;
    const usedMemory = memoryUsage.heapUsed;
    const memoryPercentage = (usedMemory / totalMemory) * 100;

    // CPU usage is more complex to calculate accurately
    // For now, we'll use a simplified version
    const cpuUsage = process.cpuUsage();
    const cpuPercentage = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to seconds

    return {
      memoryUsage: {
        used: usedMemory,
        total: totalMemory,
        percentage: memoryPercentage
      },
      cpuUsage: cpuPercentage,
      uptime: process.uptime()
    };
  }

  // Clear old metrics
  clearOldMetrics(olderThanMs: number = 24 * 60 * 60 * 1000): void {
    const cutoff = new Date(Date.now() - olderThanMs);
    this.metrics = this.metrics.filter(metric => metric.timestamp >= cutoff);
    
    apiLogger.info('Old performance metrics cleared', {
      cutoffDate: cutoff.toISOString(),
      remainingMetrics: this.metrics.length,
      action: 'performance_metrics_cleanup'
    });
  }
}

// Middleware helper for automatic performance monitoring
export function createPerformanceMiddleware() {
  return async (
    endpoint: string,
    method: string,
    statusCode: number,
    responseTime: number,
    userId?: string,
    userPlan?: string,
    requestId?: string
  ) => {
    const monitor = PerformanceMonitor.getInstance();
    const systemMetrics = monitor.getCurrentSystemMetrics();
    
    await monitor.recordMetrics({
      requestId: requestId || crypto.randomUUID(),
      endpoint,
      method,
      responseTime,
      statusCode,
      userId,
      userPlan,
      memoryUsage: systemMetrics.memoryUsage,
      cpuUsage: systemMetrics.cpuUsage
    });
  };
}