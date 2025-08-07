// 📊 Cloudflare Analytics Engine統合
// カスタムメトリクス・イベント追跡・パフォーマンス監視

interface AnalyticsEvent {
  dataset: string;
  timestamp?: Date;
  blobs?: string[];
  doubles?: number[];
  indexes?: string[];
}

interface CloudflareAnalytics {
  writeDataPoint(event: AnalyticsEvent): void;
}

declare global {
  const ANALYTICS: CloudflareAnalytics;
}

/**
 * Analytics Engine用イベント管理クラス
 */
export class CloudflareAnalyticsManager {
  private dataset: string;
  private isProduction: boolean;

  constructor(dataset = 'crypto_ai_platform_analytics') {
    this.dataset = dataset;
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  /**
   * API応答時間を記録
   */
  trackApiResponse(
    endpoint: string,
    method: string,
    statusCode: number,
    responseTime: number,
    userId?: string
  ): void {
    this.writeEvent({
      blobs: [
        'api_response',
        endpoint,
        method,
        userId || 'anonymous',
        statusCode.toString()
      ],
      doubles: [responseTime],
      indexes: [`api:${endpoint}`, `method:${method}`, `status:${statusCode}`]
    });
  }

  /**
   * ユーザーアクションを記録
   */
  trackUserAction(
    action: string,
    category: string,
    userId: string,
    metadata?: Record<string, any>
  ): void {
    const blobs = [
      'user_action',
      action,
      category,
      userId
    ];

    if (metadata) {
      blobs.push(JSON.stringify(metadata));
    }

    this.writeEvent({
      blobs,
      indexes: [`action:${action}`, `category:${category}`, `user:${userId}`]
    });
  }

  /**
   * 学習進捗を記録
   */
  trackLearningProgress(
    userId: string,
    lessonId: string,
    action: 'start' | 'complete' | 'quiz_attempt',
    progress?: number,
    score?: number
  ): void {
    const doubles = [];
    if (progress !== undefined) doubles.push(progress);
    if (score !== undefined) doubles.push(score);

    this.writeEvent({
      blobs: [
        'learning_progress',
        action,
        userId,
        lessonId
      ],
      doubles,
      indexes: [
        `learning:${action}`,
        `user:${userId}`,
        `lesson:${lessonId}`
      ]
    });
  }

  /**
   * AI分析利用を記録
   */
  trackAiAnalysis(
    userId: string,
    analysisType: string,
    model: string,
    tokensUsed: number,
    responseTime: number,
    success: boolean
  ): void {
    this.writeEvent({
      blobs: [
        'ai_analysis',
        analysisType,
        model,
        userId,
        success.toString()
      ],
      doubles: [tokensUsed, responseTime],
      indexes: [
        `ai:${analysisType}`,
        `model:${model}`,
        `user:${userId}`,
        `status:${success ? 'success' : 'error'}`
      ]
    });
  }

  /**
   * 支払い・サブスクリプションイベントを記録
   */
  trackPaymentEvent(
    userId: string,
    event: 'subscription_created' | 'payment_succeeded' | 'payment_failed' | 'subscription_canceled',
    amount?: number,
    currency = 'usd',
    planType?: string
  ): void {
    const blobs = [
      'payment_event',
      event,
      userId,
      currency
    ];

    if (planType) blobs.push(planType);

    const doubles = amount ? [amount] : [];

    this.writeEvent({
      blobs,
      doubles,
      indexes: [
        `payment:${event}`,
        `user:${userId}`,
        `plan:${planType || 'unknown'}`
      ]
    });
  }

  /**
   * アラート使用状況を記録
   */
  trackAlertUsage(
    userId: string,
    alertType: string,
    action: 'created' | 'triggered' | 'disabled',
    count?: number
  ): void {
    this.writeEvent({
      blobs: [
        'alert_usage',
        action,
        alertType,
        userId
      ],
      doubles: count ? [count] : [],
      indexes: [
        `alert:${action}`,
        `type:${alertType}`,
        `user:${userId}`
      ]
    });
  }

  /**
   * DeFi監視イベントを記録
   */
  trackDefiMonitoring(
    userId: string,
    protocol: string,
    action: 'monitor_added' | 'risk_alert' | 'data_updated',
    riskLevel?: number
  ): void {
    this.writeEvent({
      blobs: [
        'defi_monitoring',
        action,
        protocol,
        userId
      ],
      doubles: riskLevel ? [riskLevel] : [],
      indexes: [
        `defi:${action}`,
        `protocol:${protocol}`,
        `user:${userId}`
      ]
    });
  }

  /**
   * エラーイベントを記録
   */
  trackError(
    error: Error,
    context: string,
    userId?: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): void {
    this.writeEvent({
      blobs: [
        'error',
        error.name,
        error.message.substring(0, 500), // 制限
        context,
        severity,
        userId || 'anonymous'
      ],
      indexes: [
        `error:${error.name}`,
        `context:${context}`,
        `severity:${severity}`
      ]
    });
  }

  /**
   * パフォーマンスメトリクスを記録
   */
  trackPerformance(
    metric: string,
    value: number,
    unit: string,
    tags?: Record<string, string>
  ): void {
    const blobs = [
      'performance',
      metric,
      unit
    ];

    if (tags) {
      Object.entries(tags).forEach(([key, value]) => {
        blobs.push(`${key}:${value}`);
      });
    }

    this.writeEvent({
      blobs,
      doubles: [value],
      indexes: [`metric:${metric}`, ...(tags ? Object.entries(tags).map(([k, v]) => `${k}:${v}`) : [])]
    });
  }

  /**
   * ビジネスメトリクスを記録
   */
  trackBusinessMetric(
    metric: 'dau' | 'mau' | 'retention' | 'conversion' | 'revenue',
    value: number,
    userId?: string,
    segmentation?: Record<string, string>
  ): void {
    const blobs = [
      'business_metric',
      metric,
      userId || 'aggregate'
    ];

    if (segmentation) {
      Object.entries(segmentation).forEach(([key, value]) => {
        blobs.push(`${key}:${value}`);
      });
    }

    this.writeEvent({
      blobs,
      doubles: [value],
      indexes: [
        `business:${metric}`,
        ...(segmentation ? Object.entries(segmentation).map(([k, v]) => `${k}:${v}`) : [])
      ]
    });
  }

  /**
   * カスタムイベントを記録
   */
  trackCustomEvent(
    eventName: string,
    properties: Record<string, any>,
    userId?: string
  ): void {
    const blobs = [
      'custom_event',
      eventName,
      userId || 'anonymous',
      JSON.stringify(properties)
    ];

    const indexes = [`event:${eventName}`];
    if (userId) indexes.push(`user:${userId}`);

    this.writeEvent({
      blobs,
      indexes
    });
  }

  /**
   * 基本的なイベント書き込み処理
   */
  private writeEvent(event: Omit<AnalyticsEvent, 'dataset' | 'timestamp'>): void {
    // 本番環境でのみ実際に記録
    if (!this.isProduction) {
      console.debug('Analytics Event (Dev):', {
        dataset: this.dataset,
        ...event
      });
      return;
    }

    // Cloudflare Workers環境でのみ使用可能
    if (typeof ANALYTICS !== 'undefined') {
      try {
        ANALYTICS.writeDataPoint({
          dataset: this.dataset,
          timestamp: new Date(),
          ...event
        });
      } catch (error) {
        console.error('Failed to write analytics event:', error);
      }
    }
  }
}

/**
 * グローバルアナリティクスインスタンス
 */
export const analytics = new CloudflareAnalyticsManager();

/**
 * 高レベルアナリティクス関数
 */
export const Analytics = {
  // ページビュー追跡
  pageView: (path: string, userId?: string) => {
    analytics.trackUserAction('page_view', 'navigation', userId || 'anonymous', { path });
  },

  // ボタンクリック追跡
  buttonClick: (buttonName: string, location: string, userId?: string) => {
    analytics.trackUserAction('button_click', 'ui_interaction', userId || 'anonymous', { 
      buttonName, 
      location 
    });
  },

  // フォーム送信追跡
  formSubmit: (formName: string, success: boolean, userId?: string) => {
    analytics.trackUserAction('form_submit', 'form_interaction', userId || 'anonymous', {
      formName,
      success
    });
  },

  // 検索追跡
  search: (query: string, resultsCount: number, userId?: string) => {
    analytics.trackUserAction('search', 'content_discovery', userId || 'anonymous', {
      query: query.substring(0, 100), // 制限
      resultsCount
    });
  },

  // ダウンロード追跡
  download: (fileName: string, fileType: string, userId?: string) => {
    analytics.trackUserAction('download', 'content_consumption', userId || 'anonymous', {
      fileName,
      fileType
    });
  }
};

/**
 * React Hook用アナリティクス
 */
export function useAnalytics() {
  return {
    track: (eventName: string, properties?: Record<string, any>, userId?: string) => {
      analytics.trackCustomEvent(eventName, properties || {}, userId);
    },
    
    trackUserAction: (action: string, category: string, userId?: string, metadata?: Record<string, any>) => {
      analytics.trackUserAction(action, category, userId || 'anonymous', metadata);
    },
    
    trackError: (error: Error, context: string, userId?: string) => {
      analytics.trackError(error, context, userId);
    }
  };
}