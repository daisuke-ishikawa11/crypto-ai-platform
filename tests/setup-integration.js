// 🧪 統合テスト用の最小セットアップ (JS)
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.SUPABASE_SERVICE_KEY = 'test-service-key'
process.env.OPENAI_API_KEY = 'test-openai-key'
process.env.ANTHROPIC_API_KEY = 'test-anthropic-key'
process.env.STRIPE_SECRET_KEY = 'sk_test_'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
process.env.COINMARKETCAP_API_KEY = 'test-cmc-key'
process.env.SENTRY_DSN = 'https://test@sentry.io/test'
process.env.ENABLE_CSRF_IN_TEST = 'false'
process.env.CSRF_SECRET = process.env.CSRF_SECRET || 'test-secret'

// CoinGecko client mock to avoid external throttling during tests
jest.mock('@/lib/market/coingecko', () => {
  return {
    CoinGeckoClient: class {
      async getGlobalData() { return { data: { total_market_cap: { usd: 1000000000 } } } }
      async getTrendingCoins() { return { coins: [] } }
      async getMarketData() { return [] }
      async getSimplePrice() { return {} }
    }
  }
})

afterEach(() => {
  if (typeof jest !== 'undefined') {
    jest.clearAllMocks()
  }
})

// ---- Global Supabase server client mock (to avoid Next cookies in tests) ----
const createChain = (initialData = []) => {
  const chain = {
    _data: initialData,
    _error: null,
    _selectArg: undefined
  };
  
  // Add methods without 'this' context issues
  Object.assign(chain, {
    select: function(arg) { 
      this._selectArg = arg; 
      return this; 
    },
    eq: function(field, value) {
      if (Array.isArray(this._data)) {
        this._data = this._data.filter((row) => row && row[field] === value);
      }
      // 統計用プロジェクション（status選択時は先頭2件に制限）
      if (typeof this._selectArg === 'string' && this._selectArg.includes('status')) {
        this._data = this._data.slice(0, 2);
      }
      return this;
    },
    gte: function(field, value) { return this; },
    lte: function(field, value) { return this; },
    gt: function(field, value) { return this; },
    lt: function(field, value) { return this; },
    order: function(field, options) { return this; },
    limit: function(count) { return this; },
    range: function(start = 0, end = this._data.length - 1) { 
      return Promise.resolve({ data: this._data.slice(start, end + 1), error: this._error }); 
    },
    single: function() { 
      return Promise.resolve({ data: this._data[0] || null, error: this._error }); 
    },
    insert: function(data) { 
      return Promise.resolve({ data, error: this._error }); 
    },
    update: function(data) { 
      return Promise.resolve({ data, error: this._error }); 
    },
    delete: function() { 
      return Promise.resolve({ data: null, error: this._error }); 
    },
    // Promise-like methods to avoid circular references
    then: function(callback) { 
      return callback({ data: this._data, error: this._error }); 
    }
  });
  
  return chain;
};

global.__TEST_SUPABASE__ = global.__TEST_SUPABASE__ || {
  auth: {
    getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } }, error: null }),
  },
  from: jest.fn((table) => {
    let initialData = []
    if (table === 'alert_conditions') {
      // 25件分（先頭2件のみactive）
      const now = new Date().toISOString()
      initialData = Array.from({ length: 25 }, (_, i) => ({
        id: `${i + 1}`,
        type: i === 0 ? 'price_above' : i === 1 ? 'rsi_oversold' : 'price_above',
        symbol: i === 0 ? 'BTC' : i === 1 ? 'ETH' : 'BTC',
        status: i < 2 ? 'active' : 'resolved',
        user_id: 'test-user-id',
        notification_methods: [],
        cooldown_period: 15,
        created_at: now,
        updated_at: now,
      }))
      // 所有者チェック用レコード: alert-123 は other-user-id
      initialData.unshift({ id: 'alert-123', user_id: 'other-user-id' })
    }
    if (table === 'user_alerts') {
      initialData = new Array(25).fill(0).map((_, i) => ({ id: `alert-${i}` }))
    }
    if (table === 'portfolios') {
      initialData = [{ id: 'portfolio-1', user_id: 'test-user-id', total_value: 10000 }]
    }
    return createChain(initialData)
  }),
}

// Mock Supabase completely to avoid initialization issues
jest.mock('@/lib/supabase/server', () => {
  return {
    createClient: jest.fn(() => Promise.resolve(global.__TEST_SUPABASE__)),
  }
})

jest.mock('@/lib/supabase/client', () => {
  return {
    supabase: global.__TEST_SUPABASE__,
  }
})

// Mock the Supabase library itself to prevent initialization errors
jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => global.__TEST_SUPABASE__),
  }
})

// ---- Module mocks for integration tests ----
// NotificationManager with getInstance
jest.mock('@/lib/notifications/notification-manager', () => {
  const instance = {
    sendNotification: jest.fn(),
    sendAlertNotification: jest.fn(),
  };
  return {
    NotificationManager: {
      getInstance: jest.fn(() => instance),
    },
  };
});

// Stripe config minimal mock
jest.mock('@/lib/stripe/config', () => ({
  stripe: {
    customers: {
      list: jest.fn().mockResolvedValue({ data: [] }),
      retrieve: jest.fn().mockResolvedValue({
        id: 'cus_test456',
        metadata: { user_id: 'user-123' },
        deleted: false
      }),
    },
    subscriptions: {
      create: jest.fn(),
      retrieve: jest.fn(),
      update: jest.fn(),
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  },
  getPlanByStripePriceId: jest.fn().mockReturnValue({
    id: 'pro-monthly',
    name: 'Pro Monthly',
    tier: 'pro',
    interval: 'month',
    price: 9900,
    currency: 'usd',
    features: ['Pro features'],
    stripePriceId: 'price_pro_monthly'
  }),
}));
