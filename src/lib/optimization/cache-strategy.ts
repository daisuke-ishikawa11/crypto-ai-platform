// 🚀 キャッシュ戦略・最適化設定
// 階層キャッシュ・Edge Cache・Service Worker統合

interface CacheConfig {
  ttl: number; // Time to live in seconds
  staleWhileRevalidate: number; // SWR time in seconds
  tags: string[]; // Cache invalidation tags
  vary: string[]; // HTTP Vary headers
  compression: boolean; // Enable compression
  priority: 'high' | 'medium' | 'low';
}

interface CacheStrategy {
  [key: string]: CacheConfig;
}

// 🎯 キャッシュ戦略定義
export const CACHE_STRATEGIES: CacheStrategy = {
  // 📊 市場データ（高頻度更新）
  'market-data': {
    ttl: 60, // 1分
    staleWhileRevalidate: 30, // 30秒SWR
    tags: ['market', 'prices'],
    vary: ['Accept-Language'],
    compression: true,
    priority: 'high'
  },

  // 📈 チャートデータ（中頻度更新）
  'chart-data': {
    ttl: 300, // 5分
    staleWhileRevalidate: 60, // 1分SWR
    tags: ['charts', 'technical'],
    vary: ['Accept-Language', 'User-Agent'],
    compression: true,
    priority: 'high'
  },

  // 📚 学習コンテンツ（低頻度更新）
  'learning-content': {
    ttl: 86400, // 24時間
    staleWhileRevalidate: 3600, // 1時間SWR
    tags: ['learning', 'content'],
    vary: ['Accept-Language'],
    compression: true,
    priority: 'medium'
  },

  // 👤 ユーザーデータ（セッション単位）
  'user-data': {
    ttl: 1800, // 30分
    staleWhileRevalidate: 300, // 5分SWR
    tags: ['user', 'session'],
    vary: ['Authorization'],
    compression: false, // 個人情報のため圧縮なし
    priority: 'high'
  },

  // 🚨 アラート設定（中頻度更新）
  'alert-config': {
    ttl: 3600, // 1時間
    staleWhileRevalidate: 600, // 10分SWR
    tags: ['alerts', 'config'],
    vary: ['Authorization'],
    compression: true,
    priority: 'medium'
  },

  // 🤖 AI分析結果（長期キャッシュ）
  'ai-analysis': {
    ttl: 21600, // 6時間
    staleWhileRevalidate: 3600, // 1時間SWR
    tags: ['ai', 'analysis'],
    vary: ['Authorization', 'Accept-Language'],
    compression: true,
    priority: 'medium'
  },

  // 💳 課金・プラン情報（長期キャッシュ）
  'billing-data': {
    ttl: 43200, // 12時間
    staleWhileRevalidate: 7200, // 2時間SWR
    tags: ['billing', 'plans'],
    vary: ['Authorization'],
    compression: false,
    priority: 'low'
  },

  // 🌍 静的アセット（長期キャッシュ）
  'static-assets': {
    ttl: 31536000, // 1年
    staleWhileRevalidate: 86400, // 1日SWR
    tags: ['static', 'assets'],
    vary: ['Accept-Encoding'],
    compression: true,
    priority: 'low'
  }
};

// 🏗️ キャッシュヘッダー生成
export function generateCacheHeaders(strategy: string, customTTL?: number): Record<string, string> {
  const config = CACHE_STRATEGIES[strategy];
  if (!config) {
    throw new Error(`Unknown cache strategy: ${strategy}`);
  }

  const ttl = customTTL || config.ttl;
  const swr = config.staleWhileRevalidate;

  const headers: Record<string, string> = {
    // HTTP キャッシュ制御
    'Cache-Control': `public, max-age=${ttl}, stale-while-revalidate=${swr}`,
    
    // CDN キャッシュ制御
    'CDN-Cache-Control': `public, max-age=${ttl}, stale-while-revalidate=${swr}`,
    
    // Cloudflare Cache Control
    'CF-Cache-Control': `public, max-age=${ttl}, stale-while-revalidate=${swr}`,
    
    // Edge TTL
    'Edge-Cache-TTL': ttl.toString(),
    
    // キャッシュタグ
    'Cache-Tag': config.tags.join(','),
    
    // 圧縮設定
    ...(config.compression && {
      'Content-Encoding': 'gzip',
      'Vary': ['Accept-Encoding', ...config.vary].join(',')
    }),
    
    // 優先度設定
    'X-Cache-Priority': config.priority
  };

  // Vary ヘッダー
  if (config.vary.length > 0) {
    headers['Vary'] = config.vary.join(',');
  }

  return headers;
}

// 🔄 キャッシュ無効化
export async function invalidateCache(tags: string[]): Promise<void> {
  // Cloudflare Cache Purge
  if (process.env.CLOUDFLARE_ZONE_ID && process.env.CLOUDFLARE_API_TOKEN) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tags: tags
          })
        }
      );

      if (!response.ok) {
        console.error('Cloudflare cache purge failed:', await response.text());
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  // ローカルキャッシュ無効化
  if (typeof caches !== 'undefined') {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(async (cacheName) => {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        await Promise.all(
          requests.map(async (request) => {
            const response = await cache.match(request);
            if (response) {
              const cacheTag = response.headers.get('Cache-Tag');
              if (cacheTag && tags.some(tag => cacheTag.includes(tag))) {
                await cache.delete(request);
              }
            }
          })
        );
      })
    );
  }
}

// 📊 パフォーマンス最適化設定
export const PERFORMANCE_CONFIG = {
  // ページロード最適化
  pageLoad: {
    // Critical CSS インライン化
    inlineCriticalCSS: true,
    
    // プリロードリソース
    preloadResources: [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      { href: '/api/market/summary', as: 'fetch', crossorigin: 'anonymous' }
    ],
    
    // DNS プリフェッチ
    dnsPrefetch: [
      'https://api.coingecko.com',
      'https://pro-api.coinmarketcap.com',
      'https://fonts.googleapis.com'
    ],
    
    // モジュールプリロード
    modulePreload: [
      '/js/chart.min.js',
      '/js/trading-view-widget.js'
    ]
  },

  // 画像最適化
  images: {
    // 遅延読み込み
    lazyLoading: true,
    
    // レスポンシブ画像
    responsive: true,
    
    // WebP/AVIF 形式
    modernFormats: ['avif', 'webp'],
    
    // プレースホルダー
    placeholder: 'blur',
    
    // サイズ最適化
    sizes: {
      mobile: '(max-width: 768px) 100vw',
      tablet: '(max-width: 1024px) 50vw',
      desktop: '33vw'
    }
  },

  // JavaScript 最適化
  javascript: {
    // コード分割
    codeSplitting: true,
    
    // Tree shaking
    treeShaking: true,
    
    // 動的インポート
    dynamicImports: [
      'chart.js',
      'trading-view',
      'pdf-generator',
      'excel-export'
    ],
    
    // Bundle size limits
    limits: {
      main: 250, // KB
      vendor: 300, // KB
      chunk: 100 // KB
    }
  },

  // CSS 最適化
  css: {
    // Critical CSS
    critical: true,
    
    // 未使用CSS除去
    purge: true,
    
    // CSS圧縮
    minify: true,
    
    // CSS-in-JS最適化
    cssInJs: 'emotion'
  },

  // フォント最適化
  fonts: {
    // フォント表示戦略
    display: 'swap',
    
    // プリロード
    preload: ['Inter-Regular.woff2', 'Inter-Bold.woff2'],
    
    // フォールバック
    fallback: 'system-ui, -apple-system, sans-serif'
  }
};

// 🎯 Service Worker キャッシュ戦略
export const SERVICE_WORKER_CONFIG = {
  // ランタイムキャッシュ
  runtimeCache: [
    {
      urlPattern: /^https:\/\/api\.coingecko\.com\/api\/v3/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-coingecko',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 5 // 5分
        }
      }
    },
    {
      urlPattern: /^https:\/\/pro-api\.coinmarketcap\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-coinmarketcap',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 10 // 10分
        }
      }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30日
        }
      }
    },
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7 // 7日
        }
      }
    }
  ],

  // プリキャッシュ
  precache: [
    '/manifest.json',
    '/offline.html',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
  ],

  // オフライン対応
  offline: {
    fallbackUrl: '/offline.html',
    excludeRoutes: ['/admin', '/api']
  }
};

// 🔧 Edge Cache ヘルパー
export class EdgeCache {
  private static instance: EdgeCache;
  
  static getInstance(): EdgeCache {
    if (!EdgeCache.instance) {
      EdgeCache.instance = new EdgeCache();
    }
    return EdgeCache.instance;
  }

  async get(key: string): Promise<Response | null> {
    if (typeof caches === 'undefined') return null;
    
    try {
      const cache = await caches.open('edge-cache');
      const res = await cache.match(key)
      return res ?? null
    } catch (error) {
      console.error('Edge cache get error:', error);
      return null;
    }
  }

  async put(key: string, response: Response, strategy: string): Promise<void> {
    if (typeof caches === 'undefined') return;
    
    try {
      const cache = await caches.open('edge-cache');
      const headers = generateCacheHeaders(strategy);
      
      const cachedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: { ...response.headers, ...headers }
      });
      
      await cache.put(key, cachedResponse);
    } catch (error) {
      console.error('Edge cache put error:', error);
    }
  }

  async delete(key: string): Promise<boolean> {
    if (typeof caches === 'undefined') return false;
    
    try {
      const cache = await caches.open('edge-cache');
      return await cache.delete(key);
    } catch (error) {
      console.error('Edge cache delete error:', error);
      return false;
    }
  }

  async purgeByTag(tag: string): Promise<void> {
    if (typeof caches === 'undefined') return;
    
    try {
      const cache = await caches.open('edge-cache');
      const requests = await cache.keys();
      
      await Promise.all(
        requests.map(async (request) => {
          const response = await cache.match(request);
          if (response) {
            const cacheTag = response.headers.get('Cache-Tag');
            if (cacheTag && cacheTag.includes(tag)) {
              await cache.delete(request);
            }
          }
        })
      );
    } catch (error) {
      console.error('Edge cache purge error:', error);
    }
  }
}

// 📈 パフォーマンス計測ヘルパー
export function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = performance.now();
    
    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // パフォーマンスメトリクス記録
      if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark(`${name}-start`);
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      }
      
      // Cloudflare Analytics への送信
      if (typeof ANALYTICS !== 'undefined') {
        const path = typeof window !== 'undefined' ? window.location.pathname : '/'
        ANALYTICS.writeDataPoint({
          dataset: 'app_metrics',
          blobs: [name, 'performance'],
          doubles: [duration],
          indexes: [path]
        })
      }
      
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
