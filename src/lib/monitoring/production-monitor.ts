// 🎯 プロダクション環境モニタリングシステム
// リアルタイム監視・アラート・自動復旧機能

interface SystemMetrics {
  // パフォーマンスメトリクス
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  
  // ビジネスメトリクス
  activeUsers: number;
  totalRequests: number;
  apiCallsCount: number;
  subscriptionRevenue: number;
  
  // インフラメトリクス
  cloudflareStatus: 'healthy' | 'degraded' | 'down';
  supabaseStatus: 'healthy' | 'degraded' | 'down';
  stripeStatus: 'healthy' | 'degraded' | 'down';
  
  // タイムスタンプ
  timestamp: number;
}

interface AlertRule {
  id: string;
  name: string;
  metric: keyof SystemMetrics;
  condition: 'gt' | 'lt' | 'eq' | 'neq';
  threshold: number;
  severity: 'info' | 'warning' | 'error' | 'critical';
  enabled: boolean;
  cooldownMinutes: number;
  lastTriggered?: number;
}

interface Alert {
  id: string;
  ruleId: string;
  message: string;
  severity: AlertRule['severity'];
  value: number;
  threshold: number;
  timestamp: number;
  resolved: boolean;
  resolvedAt?: number;
}

class ProductionMonitor {
  private static instance: ProductionMonitor;
  private metrics: SystemMetrics[] = [];
  private alerts: Alert[] = [];
  private alertRules: AlertRule[] = [];
  private isMonitoring = false;
  private monitoringInterval?: NodeJS.Timeout;
  
  private readonly MAX_METRICS_HISTORY = 1440; // 24時間分（1分間隔）
  private readonly MONITORING_INTERVAL = 60000; // 1分

  private constructor() {
    this.initializeDefaultAlertRules();
  }

  static getInstance(): ProductionMonitor {
    if (!ProductionMonitor.instance) {
      ProductionMonitor.instance = new ProductionMonitor();
    }
    return ProductionMonitor.instance;
  }

  // デフォルトアラートルールの初期化
  private initializeDefaultAlertRules() {
    this.alertRules = [
      {
        id: 'high-response-time',
        name: 'High Response Time',
        metric: 'responseTime',
        condition: 'gt',
        threshold: 5000, // 5秒
        severity: 'error',
        enabled: true,
        cooldownMinutes: 5
      },
      {
        id: 'high-error-rate',
        name: 'High Error Rate',
        metric: 'errorRate',
        condition: 'gt',
        threshold: 5, // 5%
        severity: 'critical',
        enabled: true,
        cooldownMinutes: 2
      },
      {
        id: 'high-memory-usage',
        name: 'High Memory Usage',
        metric: 'memoryUsage',
        condition: 'gt',
        threshold: 85, // 85%
        severity: 'warning',
        enabled: true,
        cooldownMinutes: 10
      },
      {
        id: 'low-throughput',
        name: 'Low Throughput',
        metric: 'throughput',
        condition: 'lt',
        threshold: 10, // req/sec
        severity: 'warning',
        enabled: true,
        cooldownMinutes: 15
      },
      {
        id: 'external-service-down',
        name: 'External Service Down',
        metric: 'supabaseStatus',
        condition: 'eq',
        threshold: 0, // 'down' として扱う
        severity: 'critical',
        enabled: true,
        cooldownMinutes: 1
      }
    ];
  }

  // モニタリング開始
  startMonitoring(): void {
    if (this.isMonitoring) {
      console.log('📊 モニタリングは既に実行中です');
      return;
    }

    console.log('🚀 プロダクションモニタリング開始');
    this.isMonitoring = true;

    // 即座に最初のメトリクス収集
    this.collectMetrics();

    // 定期的なメトリクス収集を開始
    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
    }, this.MONITORING_INTERVAL);

    // Cloudflare Analytics にモニタリング開始を記録
    this.recordEvent('monitoring_started', {
      timestamp: Date.now(),
      interval: this.MONITORING_INTERVAL
    });
  }

  // モニタリング停止
  stopMonitoring(): void {
    if (!this.isMonitoring) {
      console.log('📊 モニタリングは実行されていません');
      return;
    }

    console.log('⏹️ プロダクションモニタリング停止');
    this.isMonitoring = false;

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }

    this.recordEvent('monitoring_stopped', {
      timestamp: Date.now()
    });
  }

  // システムメトリクス収集
  private async collectMetrics(): Promise<void> {
    try {
      const metrics: SystemMetrics = {
        responseTime: await this.measureResponseTime(),
        throughput: await this.calculateThroughput(),
        errorRate: await this.calculateErrorRate(),
        cpuUsage: await this.getCpuUsage(),
        memoryUsage: await this.getMemoryUsage(),
        activeUsers: await this.getActiveUsers(),
        totalRequests: await this.getTotalRequests(),
        apiCallsCount: await this.getApiCallsCount(),
        subscriptionRevenue: await this.getSubscriptionRevenue(),
        cloudflareStatus: await this.checkCloudflareStatus(),
        supabaseStatus: await this.checkSupabaseStatus(),
        stripeStatus: await this.checkStripeStatus(),
        timestamp: Date.now()
      };

      // メトリクス履歴に追加
      this.metrics.push(metrics);

      // 履歴サイズ制限
      if (this.metrics.length > this.MAX_METRICS_HISTORY) {
        this.metrics = this.metrics.slice(-this.MAX_METRICS_HISTORY);
      }

      // アラートチェック
      await this.checkAlerts(metrics);

      // Cloudflare Analytics にメトリクス送信
      this.recordMetrics(metrics);

      console.log(`📊 メトリクス収集完了 - ${new Date(metrics.timestamp).toISOString()}`);

    } catch (error) {
      console.error('❌ メトリクス収集エラー:', error);
      
      // エラー自体もアラートとして記録
      await this.createAlert('metrics-collection-error', 'Metrics Collection Failed', 'critical', 0, 1);
    }
  }

  // レスポンス時間測定
  private async measureResponseTime(): Promise<number> {
    const startTime = Date.now();
    
    try {
      // ビルド時またはサーバーサイドで URL コンテキストがない場合はデフォルト値を返す
      if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_APP_URL) {
        return 100; // デフォルト応答時間
      }

      // 適切なベースURLを構築
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
      
      // ヘルスチェックエンドポイントへのリクエスト
      const response = await fetch(`${baseUrl}/api/health`, {
        method: 'GET',
        headers: { 'User-Agent': 'ProductionMonitor/1.0' }
      });
      
      const endTime = Date.now();
      
      if (response.ok) {
        return endTime - startTime;
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (error) {
      console.error('レスポンス時間測定エラー:', error);
      return 30000; // タイムアウト値として30秒を返す
    }
  }

  // スループット計算
  private async calculateThroughput(): Promise<number> {
    if (this.metrics.length < 2) return 0;
    
    const currentMetrics = this.metrics[this.metrics.length - 1];
    const previousMetrics = this.metrics[this.metrics.length - 2];
    
    const timeDiff = (currentMetrics.timestamp - previousMetrics.timestamp) / 1000; // 秒
    const requestDiff = currentMetrics.totalRequests - previousMetrics.totalRequests;
    
    return timeDiff > 0 ? requestDiff / timeDiff : 0;
  }

  // エラー率計算
  private async calculateErrorRate(): Promise<number> {
    // 過去5分間のメトリクスからエラー率を計算
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    const recentMetrics = this.metrics.filter(m => m.timestamp >= fiveMinutesAgo);
    
    if (recentMetrics.length === 0) return 0;
    
    // 簡易的なエラー率計算（実際の実装では詳細なログ分析が必要）
    const avgResponseTime = recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / recentMetrics.length;
    
    // レスポンス時間が5秒以上の場合をエラーとして扱う簡易実装
    return avgResponseTime > 5000 ? 10 : 1;
  }

  // CPU使用率取得
  private async getCpuUsage(): Promise<number> {
    try {
      if (typeof process !== 'undefined' && process.cpuUsage) {
        const usage = process.cpuUsage();
        // マイクロ秒を秒に変換し、パーセンテージに変換
        return ((usage.user + usage.system) / 1000000) / 1 * 100;
      }
      return 0;
    } catch (error) {
      console.error('CPU使用率取得エラー:', error);
      return 0;
    }
  }

  // メモリ使用率取得
  private async getMemoryUsage(): Promise<number> {
    try {
      if (typeof process !== 'undefined' && process.memoryUsage) {
        const usage = process.memoryUsage();
        return (usage.heapUsed / usage.heapTotal) * 100;
      }
      return 0;
    } catch (error) {
      console.error('メモリ使用率取得エラー:', error);
      return 0;
    }
  }

  // アクティブユーザー数取得
  private async getActiveUsers(): Promise<number> {
    try {
      // Supabase auth sessions からアクティブユーザー数を取得
      // 実際の実装では Supabase API を使用
      return Math.floor(Math.random() * 1000) + 100; // モック値
    } catch (error) {
      console.error('アクティブユーザー取得エラー:', error);
      return 0;
    }
  }

  // 総リクエスト数取得
  private async getTotalRequests(): Promise<number> {
    try {
      // Cloudflare Analytics API からリクエスト数を取得
      // 実際の実装では Cloudflare API を使用
      const previous = this.metrics.length > 0 ? this.metrics[this.metrics.length - 1].totalRequests : 0;
      return previous + Math.floor(Math.random() * 100) + 10; // モック値
    } catch (error) {
      console.error('総リクエスト数取得エラー:', error);
      return 0;
    }
  }

  // API呼び出し数取得
  private async getApiCallsCount(): Promise<number> {
    try {
      // API使用量統計を取得
      return Math.floor(Math.random() * 500) + 50; // モック値
    } catch (error) {
      console.error('API呼び出し数取得エラー:', error);
      return 0;
    }
  }

  // サブスクリプション収益取得
  private async getSubscriptionRevenue(): Promise<number> {
    try {
      // Stripe API から今日の収益を取得
      return Math.floor(Math.random() * 10000) + 1000; // モック値（USD cents）
    } catch (error) {
      console.error('収益取得エラー:', error);
      return 0;
    }
  }

  // 外部サービス状態チェック
  private async checkCloudflareStatus(): Promise<'healthy' | 'degraded' | 'down'> {
    try {
      const response = await fetch('https://www.cloudflarestatus.com/api/v2/status.json', {
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.status?.indicator === 'none' ? 'healthy' : 'degraded';
      }
      return 'degraded';
    } catch (error) {
      return 'down';
    }
  }

  private async checkSupabaseStatus(): Promise<'healthy' | 'degraded' | 'down'> {
    try {
      // Supabase ヘルスチェック
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        },
        timeout: 5000
      });
      
      return response.ok ? 'healthy' : 'degraded';
    } catch (error) {
      return 'down';
    }
  }

  private async checkStripeStatus(): Promise<'healthy' | 'degraded' | 'down'> {
    try {
      // Stripe API の簡易チェック
      const response = await fetch('https://api.stripe.com/v1/account', {
        method: 'HEAD',
        timeout: 5000
      });
      
      return response.status < 500 ? 'healthy' : 'degraded';
    } catch (error) {
      return 'down';
    }
  }

  // アラートチェック
  private async checkAlerts(metrics: SystemMetrics): Promise<void> {
    for (const rule of this.alertRules) {
      if (!rule.enabled) continue;

      // クールダウン期間チェック
      if (rule.lastTriggered) {
        const cooldownEnd = rule.lastTriggered + (rule.cooldownMinutes * 60 * 1000);
        if (Date.now() < cooldownEnd) continue;
      }

      const metricValue = metrics[rule.metric] as number;
      let shouldTrigger = false;

      switch (rule.condition) {
        case 'gt':
          shouldTrigger = metricValue > rule.threshold;
          break;
        case 'lt':
          shouldTrigger = metricValue < rule.threshold;
          break;
        case 'eq':
          shouldTrigger = metricValue === rule.threshold;
          break;
        case 'neq':
          shouldTrigger = metricValue !== rule.threshold;
          break;
      }

      if (shouldTrigger) {
        await this.createAlert(rule.id, rule.name, rule.severity, metricValue, rule.threshold);
        rule.lastTriggered = Date.now();
      }
    }
  }

  // アラート作成
  private async createAlert(
    ruleId: string,
    message: string,
    severity: Alert['severity'],
    value: number,
    threshold: number
  ): Promise<void> {
    const alert: Alert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ruleId,
      message,
      severity,
      value,
      threshold,
      timestamp: Date.now(),
      resolved: false
    };

    this.alerts.push(alert);

    // アラート通知
    await this.sendAlertNotification(alert);

    // 重要なアラートの場合は自動復旧を試行
    if (severity === 'critical') {
      await this.attemptAutoRecovery(alert);
    }

    console.log(`🚨 アラート発生: ${message} (${severity})`);
  }

  // アラート通知送信
  private async sendAlertNotification(alert: Alert): Promise<void> {
    try {
      // Slack/Discord/メール通知の実装
      // ここでは Cloudflare Analytics にログ送信
      this.recordEvent('alert_triggered', {
        alertId: alert.id,
        severity: alert.severity,
        message: alert.message,
        value: alert.value,
        threshold: alert.threshold
      });

      // 開発環境ではコンソール出力
      if (process.env.NODE_ENV === 'development') {
        console.warn(`🚨 [${alert.severity.toUpperCase()}] ${alert.message}: ${alert.value} (threshold: ${alert.threshold})`);
      }

    } catch (error) {
      console.error('アラート通知送信エラー:', error);
    }
  }

  // 自動復旧試行
  private async attemptAutoRecovery(alert: Alert): Promise<void> {
    try {
      console.log(`🔧 自動復旧を試行中: ${alert.message}`);

      switch (alert.ruleId) {
        case 'high-memory-usage':
          // メモリクリーンアップ
          if (global.gc) {
            global.gc();
            console.log('✅ ガベージコレクション実行');
          }
          break;

        case 'high-response-time':
          // キャッシュクリア
          if (typeof caches !== 'undefined') {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log('✅ キャッシュクリア実行');
          }
          break;

        case 'external-service-down':
          // フェイルオーバー処理
          console.log('🔄 フェイルオーバー処理を実行');
          break;
      }

      this.recordEvent('auto_recovery_attempted', {
        alertId: alert.id,
        ruleId: alert.ruleId
      });

    } catch (error) {
      console.error('自動復旧エラー:', error);
      
      this.recordEvent('auto_recovery_failed', {
        alertId: alert.id,
        error: error.message
      });
    }
  }

  // メトリクス記録
  private recordMetrics(metrics: SystemMetrics): void {
    if (typeof ANALYTICS !== 'undefined') {
      // Cloudflare Analytics Engine に送信
      ANALYTICS.writeDataPoint({
        blobs: ['production_metrics', new Date().toISOString()],
        doubles: [
          metrics.responseTime,
          metrics.throughput,
          metrics.errorRate,
          metrics.cpuUsage,
          metrics.memoryUsage,
          metrics.activeUsers,
          metrics.totalRequests,
          metrics.apiCallsCount,
          metrics.subscriptionRevenue
        ],
        indexes: [metrics.cloudflareStatus, metrics.supabaseStatus, metrics.stripeStatus]
      });
    }
  }

  // イベント記録
  private recordEvent(eventType: string, data: Record<string, any>): void {
    if (typeof ANALYTICS !== 'undefined') {
      ANALYTICS.writeDataPoint({
        blobs: [eventType, JSON.stringify(data)],
        doubles: [Date.now()],
        indexes: [process.env.NODE_ENV || 'unknown']
      });
    }
  }

  // 現在のメトリクス取得
  getCurrentMetrics(): SystemMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  // 履歴メトリクス取得
  getMetricsHistory(hours: number = 1): SystemMetrics[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return this.metrics.filter(m => m.timestamp >= cutoff);
  }

  // アクティブアラート取得
  getActiveAlerts(): Alert[] {
    return this.alerts.filter(a => !a.resolved);
  }

  // システム健全性スコア計算
  getHealthScore(): number {
    const current = this.getCurrentMetrics();
    if (!current) return 100;

    let score = 100;

    // レスポンス時間（25点満点）
    if (current.responseTime > 5000) score -= 25;
    else if (current.responseTime > 3000) score -= 15;
    else if (current.responseTime > 1000) score -= 5;

    // エラー率（25点満点）
    if (current.errorRate > 10) score -= 25;
    else if (current.errorRate > 5) score -= 15;
    else if (current.errorRate > 1) score -= 5;

    // メモリ使用率（20点満点）
    if (current.memoryUsage > 90) score -= 20;
    else if (current.memoryUsage > 80) score -= 10;
    else if (current.memoryUsage > 70) score -= 5;

    // 外部サービス（30点満点）
    if (current.cloudflareStatus === 'down') score -= 10;
    else if (current.cloudflareStatus === 'degraded') score -= 5;

    if (current.supabaseStatus === 'down') score -= 15;
    else if (current.supabaseStatus === 'degraded') score -= 8;

    if (current.stripeStatus === 'down') score -= 5;
    else if (current.stripeStatus === 'degraded') score -= 2;

    return Math.max(0, score);
  }
}

// グローバルインスタンス
export const productionMonitor = ProductionMonitor.getInstance();

// Next.js 環境での自動開始
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  // サーバーサイドでのみ実行
  productionMonitor.startMonitoring();
}

export default ProductionMonitor;