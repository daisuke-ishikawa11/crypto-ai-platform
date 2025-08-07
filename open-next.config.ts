// 🚀 OpenNext設定
// Cloudflare Workers用Next.jsビルド設定

// OpenNext設定の型定義
interface OpenNextConfig {
  default?: any;
  functions?: Record<string, any>;
  middleware?: any;
  imageOptimization?: any;
  staticGeneration?: any;
  cache?: any;
  security?: any;
  observability?: any;
  optimization?: any;
  debug?: boolean;
  build?: any;
}

const config: OpenNextConfig = {
  // デプロイメント設定
  default: {
    // Cloudflare Workers向け設定
    override: {
      // ラッパー設定
      wrapper: 'cloudflare',
      
      // コンバーター設定
      converter: 'edge',
      
      // パッケージ設定
      minify: process.env.NODE_ENV === 'production',
      
      // エラーハンドリング
      errorPages: {
        404: 'pages/404.html',
        500: 'pages/500.html'
      }
    },
    
    // 環境設定
    environment: {
      // 環境変数の明示的設定
      Variables: {
        // Next.js設定
        NODE_ENV: process.env.NODE_ENV || 'production',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        
        // Supabase設定
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
        
        // AI設定
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        
        // Stripe設定
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        
        // 市場データ設定
        COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
        
        // 監視設定
        SENTRY_DSN: process.env.SENTRY_DSN
      },
      
      // KVバインディング
      KVNamespaces: {
        CACHE: 'cache',
        SESSIONS: 'sessions'
      },
      
      // R2バインディング
      R2Buckets: {
        ASSETS: 'assets'
      },
      
      // D1バインディング
      D1Databases: {
        DB: 'crypto-ai-platform-cache'
      },
      
      // Workers AIバインディング
      AI: 'ai'
    }
  },
  
  // 関数固有設定
  functions: {
    // API Routes設定
    'app/api/**': {
      runtime: 'edge',
      memory: 512,
      timeout: 30,
      environment: {
        // API用追加設定
        Variables: {
          API_RATE_LIMIT: '1000',
          API_TIMEOUT: '30000'
        }
      }
    },
    
    // 認証API設定
    'app/api/auth/**': {
      runtime: 'edge',
      memory: 256,
      timeout: 10,
      environment: {
        Variables: {
          AUTH_TIMEOUT: '10000'
        }
      }
    },
    
    // AI API設定
    'app/api/ai/**': {
      runtime: 'edge',
      memory: 1024,
      timeout: 60,
      environment: {
        Variables: {
          AI_TIMEOUT: '60000',
          AI_MAX_TOKENS: '4096'
        }
      }
    },
    
    // Stripe Webhook設定
    'app/api/stripe/webhook': {
      runtime: 'edge',
      memory: 256,
      timeout: 15,
      environment: {
        Variables: {
          WEBHOOK_TIMEOUT: '15000'
        }
      }
    },
    
    // 学習コンテンツAPI設定
    'app/api/learning/**': {
      runtime: 'edge',
      memory: 512,
      timeout: 20,
      environment: {
        Variables: {
          LEARNING_CACHE_TTL: '3600'
        }
      }
    },
    
    // 市場データAPI設定
    'app/api/market/**': {
      runtime: 'edge',
      memory: 256,
      timeout: 10,
      environment: {
        Variables: {
          MARKET_CACHE_TTL: '300'
        }
      }
    },
    
    // アラートAPI設定
    'app/api/alerts/**': {
      runtime: 'edge',
      memory: 512,
      timeout: 20,
      environment: {
        Variables: {
          ALERT_PROCESSING_TIMEOUT: '20000'
        }
      }
    }
  },
  
  // ミドルウェア設定
  middleware: {
    external: true,
    runtime: 'edge',
    memory: 128,
    timeout: 5
  },
  
  // 画像最適化設定
  imageOptimization: {
    // Cloudflare Images使用
    loader: 'custom',
    loaderFile: './src/lib/cloudflare/image-loader.ts'
  },
  
  // 静的生成設定
  staticGeneration: {
    // ISR設定
    revalidate: {
      // 学習コンテンツページ（1時間）
      'app/learning/**': 3600,
      
      // 市場分析ページ（5分）
      'app/market/**': 300,
      
      // ダッシュボードページ（1分）
      'app/dashboard/**': 60
    },
    
    // 事前生成ページ
    prerenderRoutes: [
      '/',
      '/auth/signin',
      '/auth/signup',
      '/learning',
      '/pricing'
    ]
  },
  
  // キャッシュ設定
  cache: {
    // Cloudflare KV使用
    type: 'cloudflare-kv',
    
    // API応答キャッシュ
    api: {
      // 短期キャッシュ（市場データ）
      '/api/market/**': {
        ttl: 300,        // 5分
        staleWhileRevalidate: 60
      },
      
      // 中期キャッシュ（学習コンテンツ）
      '/api/learning/**': {
        ttl: 3600,       // 1時間
        staleWhileRevalidate: 300
      },
      
      // 長期キャッシュ（ユーザー設定）
      '/api/user/**': {
        ttl: 1800,       // 30分
        staleWhileRevalidate: 120
      }
    },
    
    // 静的アセットキャッシュ
    static: {
      // 1週間
      ttl: 604800,
      immutable: true
    }
  },
  
  // セキュリティ設定
  security: {
    // CORS設定
    cors: {
      origin: [
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'https://crypto-ai-platform.workers.dev',
        'https://api.crypto-ai-platform.com'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true
    },
    
    // CSP設定
    contentSecurityPolicy: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://js.stripe.com'],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:'],
      'connect-src': [
        "'self'",
        'https://*.supabase.co',
        'https://api.openai.com',
        'https://api.anthropic.com',
        'https://api.stripe.com',
        'https://api.coinmarketcap.com'
      ],
      'frame-src': ['https://js.stripe.com']
    },
    
    // セキュリティヘッダー
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  
  // ログ・監視設定
  observability: {
    // Cloudflare Analytics Engine使用
    analytics: true,
    
    // Sentry統合
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0
    },
    
    // カスタムメトリクス
    metrics: {
      // API応答時間
      apiResponseTime: true,
      
      // ユーザーアクション
      userEvents: true,
      
      // エラー率
      errorRate: true,
      
      // キャッシュヒット率
      cacheHitRate: true
    }
  },
  
  // 最適化設定
  optimization: {
    // バンドル分割
    chunks: {
      // ベンダーチャンク
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      },
      
      // 共通チャンク
      common: {
        name: 'common',
        minChunks: 2,
        chunks: 'all',
        enforce: true
      }
    },
    
    // Tree shaking
    treeShaking: true,
    
    // 圧縮
    compression: {
      algorithm: 'gzip',
      threshold: 1024
    }
  },
  
  // デバッグ設定
  debug: process.env.NODE_ENV === 'development',
  
  // ビルド設定
  build: {
    // 出力ディレクトリ
    outDir: './.next',
    
    // クリーンビルド
    clean: true,
    
    // ソースマップ
    sourcemap: process.env.NODE_ENV === 'development',
    
    // 外部依存関係
    external: [
      'fsevents',
      'lightningcss',
      'sharp'
    ],
    
    // 解決エイリアス
    alias: {
      '@': './src',
      '~': './'
    }
  }
};

export default config;