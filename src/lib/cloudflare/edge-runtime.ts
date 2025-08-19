// ⚡ Cloudflare Edge Runtime最適化
// パフォーマンス監視・リソース管理・エラーハンドリング

import { analytics } from './analytics';

/**
 * Edge Runtime環境検出
 */
export function isEdgeRuntime(): boolean {
  return typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime !== 'undefined';
}

/**
 * Cloudflare Workers環境検出
 */
export function isCloudflareWorkers(): boolean {
  return typeof caches !== 'undefined' && typeof Request !== 'undefined';
}

/**
 * パフォーマンス監視クラス
 */
export class EdgePerformanceMonitor {
  private startTime: number;
  private memoryStart?: number;
  private context: string;

  constructor(context: string) {
    this.context = context;
    this.startTime = Date.now();
    
    // メモリ使用量（可能な場合）
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      this.memoryStart = (performance as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize;
    }
  }

  /**
   * 測定終了・記録
   */
  end(success = true, metadata?: Record<string, unknown>): void {
    const duration = Date.now() - this.startTime;
    
    let memoryUsed: number | undefined;
    if (this.memoryStart && typeof performance !== 'undefined' && 'memory' in performance) {
      memoryUsed = ((performance as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize ?? 0) - this.memoryStart;
    }

    // Analytics記録
    analytics.trackPerformance('edge_function_duration', duration, 'ms', {
      context: this.context,
      success: success.toString(),
      ...metadata
    });

    if (memoryUsed !== undefined) {
      analytics.trackPerformance('edge_function_memory', memoryUsed, 'bytes', {
        context: this.context
      });
    }

    // 警告レベルのパフォーマンス問題
    if (duration > 10000) { // 10秒以上
      console.warn(`Slow edge function: ${this.context} took ${duration}ms`);
    }

    if (memoryUsed && memoryUsed > 50 * 1024 * 1024) { // 50MB以上
      console.warn(`High memory usage: ${this.context} used ${memoryUsed} bytes`);
    }
  }
}

/**
 * Edge Function実行デコレーター
 */
export function withEdgeMonitoring<T extends (...args: unknown[]) => unknown>(
  fn: T,
  context: string
): T {
  return (async (...args: unknown[]) => {
    const monitor = new EdgePerformanceMonitor(context);
    
    try {
      const result = await fn(...args);
      monitor.end(true);
      return result;
    } catch (error) {
      monitor.end(false, { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }) as T;
}

/**
 * リソース制限管理
 */
export class EdgeResourceManager {
  private static instance: EdgeResourceManager;
  private activeTasks = new Set<string>();
  private maxConcurrentTasks = 10;

  static getInstance(): EdgeResourceManager {
    if (!EdgeResourceManager.instance) {
      EdgeResourceManager.instance = new EdgeResourceManager();
    }
    return EdgeResourceManager.instance;
  }

  /**
   * タスク実行（制限付き）
   */
  async executeWithLimit<T>(
    taskId: string,
    task: () => Promise<T>,
    timeout = 30000
  ): Promise<T> {
    if (this.activeTasks.size >= this.maxConcurrentTasks) {
      throw new Error('Too many concurrent tasks');
    }

    this.activeTasks.add(taskId);

    try {
      // タイムアウト付き実行
      const result = await Promise.race([
        task(),
        this.createTimeout<T>(timeout)
      ]);

      return result;
    } finally {
      this.activeTasks.delete(taskId);
    }
  }

  /**
   * アクティブタスク数取得
   */
  getActiveTaskCount(): number {
    return this.activeTasks.size;
  }

  /**
   * リソース使用状況取得
   */
  getResourceUsage(): {
    activeTasks: number;
    maxTasks: number;
    memoryUsage?: number;
  } {
    const usage: { activeTasks: number; maxTasks: number; memoryUsage?: number } = {
      activeTasks: this.activeTasks.size,
      maxTasks: this.maxConcurrentTasks
    };

    // メモリ使用量（可能な場合）
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      usage.memoryUsage = (performance as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize;
    }

    return usage;
  }

  private createTimeout<T>(ms: number): Promise<T> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Task timeout')), ms);
    });
  }
}

/**
 * Edge Function用エラーハンドラー
 */
export class EdgeErrorHandler {
  static handle(error: unknown, context: string): Response {
    let statusCode = 500;
    let message = 'Internal Server Error';
    
    if (error instanceof Error) {
      // 特定のエラータイプに基づくステータスコード設定
      if (error.message.includes('timeout')) {
        statusCode = 408;
        message = 'Request Timeout';
      } else if (error.message.includes('rate limit')) {
        statusCode = 429;
        message = 'Too Many Requests';
      } else if (error.message.includes('not found')) {
        statusCode = 404;
        message = 'Not Found';
      } else if (error.message.includes('unauthorized')) {
        statusCode = 401;
        message = 'Unauthorized';
      } else if (error.message.includes('forbidden')) {
        statusCode = 403;
        message = 'Forbidden';
      }

      // エラー記録
      analytics.trackError(error, context);
    }

    return new Response(
      JSON.stringify({
        error: message,
        context,
        timestamp: new Date().toISOString()
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'X-Error-Context': context
        }
      }
    );
  }
}

/**
 * 応答最適化ヘルパー
 */
export class EdgeResponseOptimizer {
  /**
   * 圧縮応答作成
   */
  static createCompressedResponse(
    data: unknown,
    options: {
      compress?: boolean;
      cacheMaxAge?: number;
      etag?: string;
    } = {}
  ): Response {
    const body = typeof data === 'string' ? data : JSON.stringify(data);
    
    const headers: Record<string, string> = {
      'Content-Type': typeof data === 'string' 
        ? 'text/html; charset=utf-8' 
        : 'application/json; charset=utf-8'
    };

    // キャッシュ設定
    if (options.cacheMaxAge) {
      headers['Cache-Control'] = `public, max-age=${options.cacheMaxAge}`;
    }

    // ETag設定
    if (options.etag) {
      headers['ETag'] = options.etag;
    }

    // 圧縮設定
    if (options.compress && body.length > 1024) {
      headers['Content-Encoding'] = 'gzip';
    }

    // セキュリティヘッダー
    headers['X-Content-Type-Options'] = 'nosniff';
    headers['X-Frame-Options'] = 'DENY';
    headers['X-XSS-Protection'] = '1; mode=block';

    return new Response(body, { headers });
  }

  /**
   * ストリーミング応答作成
   */
  static createStreamingResponse(
    generator: AsyncGenerator<string>,
    contentType = 'text/plain'
  ): Response {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of generator) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': contentType,
        'Transfer-Encoding': 'chunked'
      }
    });
  }

  /**
   * SSE応答作成
   */
  static createSSEResponse(
    eventGenerator: AsyncGenerator<{ event?: string; data: unknown; id?: string }>
  ): Response {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of eventGenerator) {
            const sseData = EdgeResponseOptimizer.formatSSEData(event);
            controller.enqueue(new TextEncoder().encode(sseData));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  }

  private static formatSSEData(event: { event?: string; data: unknown; id?: string }): string {
    let formatted = '';
    
    if (event.id) {
      formatted += `id: ${event.id}\n`;
    }
    
    if (event.event) {
      formatted += `event: ${event.event}\n`;
    }
    
    formatted += `data: ${JSON.stringify(event.data)}\n\n`;
    
    return formatted;
  }
}

/**
 * グローバルユーティリティ
 */
export const EdgeUtils = {
  resourceManager: EdgeResourceManager.getInstance(),
  
  /**
   * 監視付き関数実行
   */
  withMonitoring: withEdgeMonitoring,
  
  /**
   * 安全な非同期実行
   */
  async safeAsync<T>(
    fn: () => Promise<T>,
    fallback: T,
    context = 'unknown'
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      analytics.trackError(error instanceof Error ? error : new Error('Unknown error'), context);
      return fallback;
    }
  },
  
  /**
   * 並列処理（制限付き）
   */
  async parallelLimit<T>(
    tasks: (() => Promise<T>)[],
    limit = 5
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < tasks.length; i += limit) {
      const batch = tasks.slice(i, i + limit);
      const batchResults = await Promise.all(batch.map(task => task()));
      results.push(...batchResults);
    }
    
    return results;
  },
  
  /**
   * リトライ付き実行
   */
  async withRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError!;
  }
};
