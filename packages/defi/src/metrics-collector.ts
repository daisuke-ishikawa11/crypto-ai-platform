import { LoggerPort, MetricsPersistencePort } from './ports';

export interface ApiCallMetric {
  protocol: string;
  endpoint: string;
  success: boolean;
  duration: number;
  error?: string;
  timestamp: Date;
  responseSize?: number;
  rateLimit?: boolean;
}

export interface ProtocolHealthMetric {
  protocol: string;
  availability: number; // 0-100
  averageResponseTime: number;
  errorRate: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  lastSuccessfulCall?: Date;
  lastFailedCall?: Date;
  timestamp: Date;
}

export interface SystemPerformanceMetric {
  memoryUsage: number; // MB
  cpuUsage: number; // percentage
  activeConnections: number;
  cacheHitRate: number;
  queueSize: number;
  timestamp: Date;
}

export interface BusinessMetric {
  totalTVL: number;
  totalVolume24h: number;
  protocolsMonitored: number;
  alertsGenerated: number;
  usersActive: number;
  dataQualityScore: number; // 0-100
  timestamp: Date;
}

export interface MetricsAggregation {
  period: '5m' | '15m' | '1h' | '6h' | '24h' | '7d' | '30d';
  apiCalls: {
    total: number;
    successful: number;
    failed: number;
    averageDuration: number;
  };
  protocols: {
    healthy: number;
    degraded: number;
    offline: number;
  };
  alerts: {
    total: number;
    critical: number;
    warning: number;
    info: number;
  };
  timestamp: Date;
}

export class MetricsCollector {
  private apiCallMetrics: ApiCallMetric[] = [];
  private protocolHealthMetrics = new Map<string, ProtocolHealthMetric>();
  private systemMetrics: SystemPerformanceMetric[] = [];
  private businessMetrics: BusinessMetric[] = [];
  private readonly isEnabled: boolean;
  private readonly retentionDays: number;
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;
  private saveInterval: ReturnType<typeof setInterval> | null = null;
  private collectInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly logger: LoggerPort,
    private readonly persistence: MetricsPersistencePort,
    enabled = true,
    retentionDays = 7
  ) {
    this.isEnabled = enabled;
    this.retentionDays = retentionDays;
    if (this.isEnabled) this.startPeriodicTasks();
  }

  stop(): void {
    if (this.cleanupInterval) clearInterval(this.cleanupInterval);
    if (this.saveInterval) clearInterval(this.saveInterval);
    if (this.collectInterval) clearInterval(this.collectInterval);
    this.cleanupInterval = this.saveInterval = this.collectInterval = null;
  }

  recordApiCall(metric: ApiCallMetric): void {
    if (!this.isEnabled) return;
    this.apiCallMetrics.push(metric);
    this.updateProtocolHealth(metric);
    if (!metric.success) {
      this.logger.warn('API call failed', { protocol: metric.protocol, endpoint: metric.endpoint, error: metric.error, duration: metric.duration });
    } else if (metric.duration > 10_000) {
      this.logger.warn('Slow API call detected', { protocol: metric.protocol, endpoint: metric.endpoint, duration: metric.duration });
    }
  }

  recordSystemPerformance(metric: SystemPerformanceMetric): void {
    if (!this.isEnabled) return;
    this.systemMetrics.push(metric);
    if (metric.memoryUsage > 1000 || metric.cpuUsage > 80) {
      this.logger.warn('High system resource usage', { memoryUsage: metric.memoryUsage, cpuUsage: metric.cpuUsage });
    }
  }

  recordBusinessMetrics(metric: BusinessMetric): void {
    if (!this.isEnabled) return;
    this.businessMetrics.push(metric);
    this.logger.info('Business metrics recorded', { totalTVL: metric.totalTVL, protocolsMonitored: metric.protocolsMonitored, dataQualityScore: metric.dataQualityScore });
  }

  getProtocolHealth(protocol?: string): ProtocolHealthMetric[] {
    if (protocol) {
      const health = this.protocolHealthMetrics.get(protocol);
      return health ? [health] : [];
    }
    return Array.from(this.protocolHealthMetrics.values());
  }

  getApiCallMetrics(startTime?: Date, endTime?: Date, protocol?: string): ApiCallMetric[] {
    let metrics = this.apiCallMetrics;
    if (startTime || endTime) {
      metrics = metrics.filter(metric => (!startTime || metric.timestamp >= startTime) && (!endTime || metric.timestamp <= endTime));
    }
    if (protocol) metrics = metrics.filter(m => m.protocol === protocol);
    return metrics;
  }

  getSystemMetrics(limit = 100): SystemPerformanceMetric[] { return this.systemMetrics.slice(-limit); }
  getBusinessMetrics(limit = 100): BusinessMetric[] { return this.businessMetrics.slice(-limit); }

  generateAggregatedMetrics(period: MetricsAggregation['period']): MetricsAggregation {
    const now = new Date();
    const periodMs = this.getPeriodMs(period);
    const startTime = new Date(now.getTime() - periodMs);
    const apiCalls = this.getApiCallMetrics(startTime, now);
    const protocolHealths = this.getProtocolHealth();
    return {
      period,
      apiCalls: {
        total: apiCalls.length,
        successful: apiCalls.filter(m => m.success).length,
        failed: apiCalls.filter(m => !m.success).length,
        averageDuration: apiCalls.length > 0 ? apiCalls.reduce((s, m) => s + m.duration, 0) / apiCalls.length : 0
      },
      protocols: {
        healthy: protocolHealths.filter(p => p.availability >= 95).length,
        degraded: protocolHealths.filter(p => p.availability >= 80 && p.availability < 95).length,
        offline: protocolHealths.filter(p => p.availability < 80).length
      },
      alerts: { total: 0, critical: 0, warning: 0, info: 0 },
      timestamp: now
    };
  }

  async saveMetrics(): Promise<void> {
    if (!this.isEnabled) return;
    try {
      const now = new Date();
      const protocolHealthData = Array.from(this.protocolHealthMetrics.values()).map(health => ({
        protocol_name: health.protocol,
        availability: health.availability,
        average_response_time: health.averageResponseTime,
        error_rate: health.errorRate,
        total_requests: health.totalRequests,
        successful_requests: health.successfulRequests,
        failed_requests: health.failedRequests,
        last_successful_call: health.lastSuccessfulCall,
        last_failed_call: health.lastFailedCall,
        recorded_at: now
      }));
      if (protocolHealthData.length > 0) await this.persistence.saveProtocolHealthMetrics(protocolHealthData);
      const latestBusinessMetric = this.businessMetrics[this.businessMetrics.length - 1];
      if (latestBusinessMetric) {
        await this.persistence.insertBusinessMetric({
          total_tvl: latestBusinessMetric.totalTVL,
          total_volume_24h: latestBusinessMetric.totalVolume24h,
          protocols_monitored: latestBusinessMetric.protocolsMonitored,
          alerts_generated: latestBusinessMetric.alertsGenerated,
          users_active: latestBusinessMetric.usersActive,
          data_quality_score: latestBusinessMetric.dataQualityScore,
          recorded_at: now
        });
      }
    } catch (error) {
      this.logger.error('Error saving metrics', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  getMetricsSummary(): { apiCalls: number; protocols: number; systemHealth: 'healthy' | 'degraded' | 'critical'; lastUpdate: Date } {
    const now = new Date();
    const protocolHealths = this.getProtocolHealth();
    let systemHealth: 'healthy' | 'degraded' | 'critical' = 'healthy';
    if (protocolHealths.some(p => p.availability < 50)) systemHealth = 'critical';
    else if (protocolHealths.some(p => p.availability < 80)) systemHealth = 'degraded';
    return { apiCalls: this.apiCallMetrics.length, protocols: this.protocolHealthMetrics.size, systemHealth, lastUpdate: now };
  }

  clear(): void {
    this.apiCallMetrics = [];
    this.protocolHealthMetrics.clear();
    this.systemMetrics = [];
    this.businessMetrics = [];
    this.logger.info('All metrics cleared');
  }

  private startPeriodicTasks(): void {
    this.saveInterval = setInterval(() => { void this.saveMetrics(); }, 5 * 60 * 1000);
    this.cleanupInterval = setInterval(() => { this.cleanupOldMetrics(); }, 60 * 60 * 1000);
    this.collectInterval = setInterval(() => { this.collectSystemMetrics(); }, 60 * 1000);
  }

  private updateProtocolHealth(apiMetric: ApiCallMetric): void {
    const existing = this.protocolHealthMetrics.get(apiMetric.protocol);
    if (!existing) {
      this.protocolHealthMetrics.set(apiMetric.protocol, {
        protocol: apiMetric.protocol,
        availability: apiMetric.success ? 100 : 0,
        averageResponseTime: apiMetric.duration,
        errorRate: apiMetric.success ? 0 : 100,
        totalRequests: 1,
        successfulRequests: apiMetric.success ? 1 : 0,
        failedRequests: apiMetric.success ? 0 : 1,
        lastSuccessfulCall: apiMetric.success ? apiMetric.timestamp : undefined,
        lastFailedCall: apiMetric.success ? undefined : apiMetric.timestamp,
        timestamp: apiMetric.timestamp
      });
      return;
    }
    existing.totalRequests++;
    if (apiMetric.success) { existing.successfulRequests++; existing.lastSuccessfulCall = apiMetric.timestamp; }
    else { existing.failedRequests++; existing.lastFailedCall = apiMetric.timestamp; }
    existing.availability = (existing.successfulRequests / existing.totalRequests) * 100;
    existing.errorRate = (existing.failedRequests / existing.totalRequests) * 100;
    existing.averageResponseTime = ((existing.averageResponseTime * (existing.totalRequests - 1)) + apiMetric.duration) / existing.totalRequests;
    existing.timestamp = apiMetric.timestamp;
  }

  private cleanupOldMetrics(): void {
    const cutoff = new Date(Date.now() - this.retentionDays * 24 * 60 * 60 * 1000);
    this.apiCallMetrics = this.apiCallMetrics.filter(m => m.timestamp > cutoff);
    this.systemMetrics = this.systemMetrics.filter(m => m.timestamp > cutoff);
    this.businessMetrics = this.businessMetrics.filter(m => m.timestamp > cutoff);
    this.logger.debug('Old metrics cleaned up', { cutoff: cutoff.toISOString() });
  }

  private collectSystemMetrics(): void {
    try {
      // Host app should pass real values; here we provide conservative placeholders when called without integration
      this.recordSystemPerformance({ memoryUsage: 0, cpuUsage: 0, activeConnections: 0, cacheHitRate: 0, queueSize: 0, timestamp: new Date() });
    } catch (error) {
      this.logger.error('Error collecting system metrics', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  private getPeriodMs(period: MetricsAggregation['period']): number {
    const map: Record<MetricsAggregation['period'], number> = {
      '5m': 5 * 60 * 1000,
      '15m': 15 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    return map[period];
  }
}
