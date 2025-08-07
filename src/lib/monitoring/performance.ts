// Performance monitoring service

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  tags?: Record<string, string>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private timers: Map<string, number> = new Map();

  // Start timing an operation
  startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  // End timing and record the duration
  endTimer(name: string, tags?: Record<string, string>): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer ${name} was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);

    this.recordMetric({
      name: `${name}.duration`,
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      tags
    });

    return duration;
  }

  // Record a custom metric
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // In production, send metrics to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendMetrics([metric]);
    }

    // Keep only last 1000 metrics in memory
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  // Record API response time
  recordApiResponseTime(endpoint: string, method: string, duration: number, statusCode: number): void {
    this.recordMetric({
      name: 'api.response_time',
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      tags: {
        endpoint,
        method,
        status_code: statusCode.toString(),
        status_category: this.getStatusCategory(statusCode)
      }
    });
  }

  // Record database query time
  recordDatabaseQueryTime(operation: string, table: string, duration: number): void {
    this.recordMetric({
      name: 'database.query_time',
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      tags: {
        operation,
        table
      }
    });
  }

  // Record cache hit/miss
  recordCacheMetric(cacheName: string, hit: boolean): void {
    this.recordMetric({
      name: 'cache.access',
      value: hit ? 1 : 0,
      unit: 'count',
      timestamp: Date.now(),
      tags: {
        cache_name: cacheName,
        result: hit ? 'hit' : 'miss'
      }
    });
  }

  // Record memory usage
  recordMemoryUsage(): void {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage();
      
      this.recordMetric({
        name: 'memory.heap_used',
        value: usage.heapUsed / 1024 / 1024,
        unit: 'MB',
        timestamp: Date.now()
      });

      this.recordMetric({
        name: 'memory.heap_total',
        value: usage.heapTotal / 1024 / 1024,
        unit: 'MB',
        timestamp: Date.now()
      });

      this.recordMetric({
        name: 'memory.rss',
        value: usage.rss / 1024 / 1024,
        unit: 'MB',
        timestamp: Date.now()
      });
    }
  }

  // Get current metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // Get metrics summary
  getMetricsSummary(): Record<string, { count: number; min: number; max: number; avg: number; p50: number; p95: number; p99: number }> {
    const summary: Record<string, { count: number; min: number; max: number; avg: number; p50: number; p95: number; p99: number }> = {};
    
    // Group metrics by name
    const grouped = this.metrics.reduce((acc: Record<string, number[]>, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);

    // Calculate statistics for each metric
    Object.entries(grouped).forEach(([name, values]) => {
      summary[name] = {
        count: values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        p50: this.percentile(values, 0.5),
        p95: this.percentile(values, 0.95),
        p99: this.percentile(values, 0.99)
      };
    });

    return summary;
  }

  private percentile(values: number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[index] || 0;
  }

  private getStatusCategory(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) return '2xx';
    if (statusCode >= 300 && statusCode < 400) return '3xx';
    if (statusCode >= 400 && statusCode < 500) return '4xx';
    if (statusCode >= 500) return '5xx';
    return 'unknown';
  }

  private async sendMetrics(metrics: PerformanceMetric[]): Promise<void> {
    // Send to monitoring service (e.g., DataDog, New Relic, CloudWatch)
    try {
      if (process.env.METRICS_ENDPOINT) {
        await fetch(process.env.METRICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metrics,
            service: 'crypto-ai-platform',
            environment: process.env.NODE_ENV
          })
        });
      }
    } catch (error) {
      console.error('Failed to send metrics:', error);
    }
  }

  // Clear all metrics
  clear(): void {
    this.metrics = [];
    this.timers.clear();
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export class for testing
export default PerformanceMonitor; 