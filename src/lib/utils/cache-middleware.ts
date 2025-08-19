// 🚀 キャッシュミドルウェア - API統一キャッシュ制御
// すべてのAPIエンドポイントに統一的なキャッシュヘッダーを適用

import { NextRequest, NextResponse } from 'next/server';
import { generateCacheHeaders } from '@/lib/optimization/cache-strategy';

interface CacheMiddlewareOptions {
  strategy: string;
  customTTL: number | undefined;
  tags?: string[];
  varyHeaders?: string[];
}

// 🔧 キャッシュヘッダー適用ミドルウェア
export function withCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: CacheMiddlewareOptions
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // リクエスト処理
      const response = await handler(request);
      
      // キャッシュヘッダーを生成
      const cacheHeaders = generateCacheHeaders(options.strategy, options.customTTL);
      
      // 追加のキャッシュタグがある場合は結合
      if (options.tags && options.tags.length > 0) {
        const existingTags = cacheHeaders['Cache-Tag'] || '';
        const newTags = options.tags.join(',');
        cacheHeaders['Cache-Tag'] = existingTags 
          ? `${existingTags},${newTags}` 
          : newTags;
      }
      
      // 追加のVaryヘッダーがある場合は結合
      if (options.varyHeaders && options.varyHeaders.length > 0) {
        const existingVary = cacheHeaders['Vary'] || '';
        const newVary = options.varyHeaders.join(',');
        cacheHeaders['Vary'] = existingVary 
          ? `${existingVary},${newVary}` 
          : newVary;
      }
      
      // レスポンスヘッダーを設定
      Object.entries(cacheHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      // ETagヘッダーを追加（コンテンツベース）
      // テスト環境では本文読取りによるBody消費を避けるためスキップ
      if (process.env.NODE_ENV !== 'test' && response.body) {
        try {
          const content = await response.clone().text();
          const hash = await generateETag(content);
          response.headers.set('ETag', `"${hash}"`);
          
          // If-None-Matchヘッダーをチェック
          const ifNoneMatch = request.headers.get('If-None-Match');
          if (ifNoneMatch && ifNoneMatch.includes(hash)) {
            return new NextResponse(null, {
              status: 304,
              headers: response.headers
            });
          }
        } catch {
          // ignore etag errors
        }
      }
      
      return response;
    } catch (error) {
      console.error('Cache middleware error:', error);
      // エラーが発生してもオリジナルのレスポンスを返す
      return await handler(request);
    }
  };
}

// 📊 マーケットデータキャッシュ
export function withMarketDataCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'market-data',
    customTTL: customTTL,
    tags: ['market', 'realtime'],
    varyHeaders: ['Accept-Language', 'Authorization']
  });
}

// 📈 チャートデータキャッシュ
export function withChartDataCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'chart-data',
    customTTL: customTTL,
    tags: ['charts', 'technical-analysis'],
    varyHeaders: ['Accept-Language', 'User-Agent']
  });
}

// 👤 ユーザーデータキャッシュ
export function withUserDataCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'user-data',
    customTTL: customTTL,
    tags: ['user', 'private'],
    varyHeaders: ['Authorization']
  });
}

// 🤖 AI分析キャッシュ
export function withAIAnalysisCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'ai-analysis',
    customTTL: customTTL,
    tags: ['ai', 'analysis', 'ml'],
    varyHeaders: ['Authorization', 'Accept-Language']
  });
}

// 📚 学習コンテンツキャッシュ
export function withLearningContentCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'learning-content',
    customTTL: customTTL,
    tags: ['learning', 'content', 'education'],
    varyHeaders: ['Accept-Language']
  });
}

// 🚨 アラート設定キャッシュ
export function withAlertConfigCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'alert-config',
    customTTL: customTTL,
    tags: ['alerts', 'config', 'notifications'],
    varyHeaders: ['Authorization']
  });
}

// 💳 課金データキャッシュ
export function withBillingDataCache(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customTTL?: number
) {
  return withCache(handler, {
    strategy: 'billing-data',
    customTTL: customTTL,
    tags: ['billing', 'subscription', 'payment'],
    varyHeaders: ['Authorization']
  });
}

// 🔒 ETag生成ヘルパー
async function generateETag(content: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
  
  // フォールバック: 簡単なハッシュ
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit整数に変換
  }
  return Math.abs(hash).toString(16);
}

// 🧹 条件付きキャッシュクリア
export async function conditionalCacheClear(
  condition: () => boolean | Promise<boolean>,
  tags: string[]
): Promise<void> {
  const shouldClear = await condition();
  
  if (shouldClear) {
    const { invalidateCache } = await import('@/lib/optimization/cache-strategy');
    await invalidateCache(tags);
  }
}

// 📊 キャッシュメトリクス収集
interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: number;
  totalRequests: number;
  averageResponseTime: number;
}

const cacheMetrics = new Map<string, CacheMetrics>();

export function recordCacheHit(strategy: string, responseTime: number): void {
  const current = cacheMetrics.get(strategy) || {
    hits: 0,
    misses: 0,
    hitRate: 0,
    totalRequests: 0,
    averageResponseTime: 0
  };
  
  current.hits += 1;
  current.totalRequests += 1;
  current.hitRate = (current.hits / current.totalRequests) * 100;
  current.averageResponseTime = 
    (current.averageResponseTime * (current.totalRequests - 1) + responseTime) / current.totalRequests;
  
  cacheMetrics.set(strategy, current);
}

export function recordCacheMiss(strategy: string, responseTime: number): void {
  const current = cacheMetrics.get(strategy) || {
    hits: 0,
    misses: 0,
    hitRate: 0,
    totalRequests: 0,
    averageResponseTime: 0
  };
  
  current.misses += 1;
  current.totalRequests += 1;
  current.hitRate = (current.hits / current.totalRequests) * 100;
  current.averageResponseTime = 
    (current.averageResponseTime * (current.totalRequests - 1) + responseTime) / current.totalRequests;
  
  cacheMetrics.set(strategy, current);
}

export function getCacheMetrics(): Record<string, CacheMetrics> {
  return Object.fromEntries(cacheMetrics.entries());
}

// 🎯 キャッシュウォームアップ
export async function warmupCache(endpoints: Array<{ url: string, method?: string }>): Promise<void> {
  const warmupPromises = endpoints.map(async ({ url, method = 'GET' }) => {
    try {
      const response = await fetch(url, { 
        method,
        headers: {
          'X-Cache-Warmup': 'true'
        }
      });
      
      if (response.ok) {
        console.log(`Cache warmed up for: ${url}`);
      }
    } catch (error) {
      console.warn(`Cache warmup failed for ${url}:`, error);
    }
  });
  
  await Promise.allSettled(warmupPromises);
}

// 🚀 プリフェッチヘルパー
export function prefetchResource(url: string, options?: RequestInit): void {
  if (typeof window !== 'undefined') {
    // ブラウザ環境
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  } else {
    // サーバー環境
    fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        'X-Prefetch': 'true'
      }
    }).catch(error => {
      console.warn(`Prefetch failed for ${url}:`, error);
    });
  }
}

// 📱 デバイス別キャッシュ戦略
export function getDeviceSpecificCache(userAgent: string): Partial<CacheMiddlewareOptions> {
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  
  if (isBot) {
    return {
      strategy: 'static-assets',
      customTTL: 86400, // 24時間
      tags: ['bot-cache']
    };
  }
  
  if (isMobile) {
    return {
      strategy: 'market-data',
      customTTL: 120, // 2分（モバイルは頻度高め）
      tags: ['mobile-cache']
    };
  }
  
  return {
    strategy: 'market-data',
    customTTL: 60, // 1分（デスクトップ）
    tags: ['desktop-cache']
  };
}
