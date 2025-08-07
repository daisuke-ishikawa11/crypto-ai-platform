// 🧪 統合テスト セットアップ
// モック・環境変数・テストユーティリティの初期化

import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// グローバル型拡張
declare global {
  var CACHE: any;
  var SESSIONS: any;
  var ASSETS: any;
  var ANALYTICS: any;
  var caches: any;
  var fetch: any;
}

// グローバル設定
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// 環境変数設定
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_KEY = 'test-service-key';
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
process.env.STRIPE_SECRET_KEY = 'sk_test_';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
process.env.COINMARKETCAP_API_KEY = 'test-cmc-key';
process.env.SENTRY_DSN = 'https://test@sentry.io/test';

// モック設定
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      getSession: jest.fn(),
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      neq: jest.fn().mockReturnThis(),
      gt: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lt: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      like: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      is: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      contains: jest.fn().mockReturnThis(),
      containedBy: jest.fn().mockReturnThis(),
      rangeGt: jest.fn().mockReturnThis(),
      rangeGte: jest.fn().mockReturnThis(),
      rangeLt: jest.fn().mockReturnThis(),
      rangeLte: jest.fn().mockReturnThis(),
      rangeAdjacent: jest.fn().mockReturnThis(),
      overlaps: jest.fn().mockReturnThis(),
      textSearch: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      not: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      filter: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
      maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
    rpc: jest.fn().mockResolvedValue({ data: null, error: null }),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn().mockResolvedValue({ data: null, error: null }),
        download: jest.fn().mockResolvedValue({ data: null, error: null }),
        remove: jest.fn().mockResolvedValue({ data: null, error: null }),
        list: jest.fn().mockResolvedValue({ data: [], error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ 
          data: { publicUrl: 'https://test.supabase.co/storage/v1/object/public/test' }
        }),
      })),
    },
  })),
}));

jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    customers: {
      create: jest.fn().mockResolvedValue({ id: 'cus_test' }),
      retrieve: jest.fn().mockResolvedValue({ id: 'cus_test' }),
      update: jest.fn().mockResolvedValue({ id: 'cus_test' }),
      list: jest.fn().mockResolvedValue({ data: [] }),
    },
    subscriptions: {
      create: jest.fn().mockResolvedValue({ id: 'sub_test', status: 'active' }),
      retrieve: jest.fn().mockResolvedValue({ id: 'sub_test', status: 'active' }),
      update: jest.fn().mockResolvedValue({ id: 'sub_test', status: 'active' }),
      cancel: jest.fn().mockResolvedValue({ id: 'sub_test', status: 'canceled' }),
      list: jest.fn().mockResolvedValue({ data: [] }),
    },
    paymentMethods: {
      create: jest.fn().mockResolvedValue({ id: 'pm_test' }),
      attach: jest.fn().mockResolvedValue({ id: 'pm_test' }),
      detach: jest.fn().mockResolvedValue({ id: 'pm_test' }),
    },
    paymentIntents: {
      create: jest.fn().mockResolvedValue({ 
        id: 'pi_test', 
        status: 'succeeded',
        client_secret: 'pi_test_secret'
      }),
      retrieve: jest.fn().mockResolvedValue({ id: 'pi_test', status: 'succeeded' }),
      confirm: jest.fn().mockResolvedValue({ id: 'pi_test', status: 'succeeded' }),
    },
    invoices: {
      create: jest.fn().mockResolvedValue({ id: 'in_test' }),
      retrieve: jest.fn().mockResolvedValue({ id: 'in_test' }),
      update: jest.fn().mockResolvedValue({ id: 'in_test' }),
      list: jest.fn().mockResolvedValue({ data: [] }),
      finalizeInvoice: jest.fn().mockResolvedValue({ id: 'in_test', status: 'open' }),
      sendInvoice: jest.fn().mockResolvedValue({ id: 'in_test', status: 'open' }),
      voidInvoice: jest.fn().mockResolvedValue({ id: 'in_test', status: 'void' }),
      pay: jest.fn().mockResolvedValue({ id: 'in_test', status: 'paid' }),
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
    errors: {
      StripeError: class StripeError extends Error {
        type: string;
        code?: string;
        decline_code?: string;
        param?: string;
        
        constructor(message: string) {
          super(message);
          this.type = 'StripeError';
        }
      }
    }
  })),
}));

jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{
            message: {
              content: 'Test AI response',
              role: 'assistant'
            }
          }],
          usage: {
            prompt_tokens: 10,
            completion_tokens: 20,
            total_tokens: 30
          }
        })
      }
    }
  }))
}));

jest.mock('@anthropic-ai/sdk', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{
          type: 'text',
          text: 'Test Claude response'
        }],
        usage: {
          input_tokens: 10,
          output_tokens: 20
        }
      })
    }
  }))
}));

// Cloudflare Workers環境のモック
global.caches = {
  default: {
    match: jest.fn().mockResolvedValue(undefined),
    put: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(false),
  },
  open: jest.fn().mockResolvedValue({
    match: jest.fn().mockResolvedValue(undefined),
    put: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(false),
  })
} as any;

// KV Namespace Mock
global.CACHE = {
  get: jest.fn().mockResolvedValue(null),
  put: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  list: jest.fn().mockResolvedValue({ keys: [], list_complete: true }),
} as any;

global.SESSIONS = {
  get: jest.fn().mockResolvedValue(null),
  put: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  list: jest.fn().mockResolvedValue({ keys: [], list_complete: true }),
} as any;

// R2 Bucket Mock
global.ASSETS = {
  get: jest.fn().mockResolvedValue(null),
  put: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  list: jest.fn().mockResolvedValue({ objects: [], truncated: false }),
} as any;

// Analytics Engine Mock
global.ANALYTICS = {
  writeDataPoint: jest.fn(),
} as any;

// Date モック（時間固定）
const mockDate = new Date('2024-01-15T10:00:00Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
Date.now = jest.fn(() => mockDate.getTime());

// フェッチモック
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: jest.fn().mockResolvedValue({}),
  text: jest.fn().mockResolvedValue(''),
  arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
  headers: new Headers(),
}) as any;

// WebCrypto API モック
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'test-uuid-' + Date.now()),
    getRandomValues: jest.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }),
    subtle: {
      digest: jest.fn().mockResolvedValue(new ArrayBuffer(32)),
      encrypt: jest.fn().mockResolvedValue(new ArrayBuffer(16)),
      decrypt: jest.fn().mockResolvedValue(new ArrayBuffer(16)),
      sign: jest.fn().mockResolvedValue(new ArrayBuffer(64)),
      verify: jest.fn().mockResolvedValue(true),
      generateKey: jest.fn().mockResolvedValue({}),
      importKey: jest.fn().mockResolvedValue({}),
      exportKey: jest.fn().mockResolvedValue(new ArrayBuffer(32)),
    }
  }
});

// Console 出力をフィルタリング
const originalError = console.error;
console.error = (...args: any[]) => {
  // 特定のエラーメッセージを抑制
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render') ||
     args[0].includes('Warning: validateDOMNesting'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// テスト後のクリーンアップ
afterEach(() => {
  jest.clearAllMocks();
});

// テストスイート前のセットアップ
beforeAll(() => {
  // パフォーマンステスト用の時間測定開始
  global.performance = global.performance || {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
  } as any;
});

// テストスイート後のクリーンアップ
afterAll(() => {
  jest.restoreAllMocks();
});

// テストユーティリティ関数
export const createTestUser = (overrides: Partial<any> = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  user_metadata: {
    full_name: 'Test User'
  },
  created_at: new Date().toISOString(),
  ...overrides
});

export const createTestSession = (user: any) => ({
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user
});

export const mockSupabaseResponse = <T>(data: T, error: any = null) => ({
  data,
  error
});

export const mockStripeObject = <T>(type: string, data: T) => ({
  object: type,
  ...data
});

// 非同期テストのタイムアウト設定
jest.setTimeout(30000);