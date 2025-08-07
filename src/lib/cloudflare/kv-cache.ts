// 💾 Cloudflare KV Cache管理
// 分散キャッシュ・セッション管理・パフォーマンス最適化

interface KVNamespace {
  get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream' }): Promise<any>;
  put(key: string, value: string | ArrayBuffer | ArrayBufferView | ReadableStream, options?: {
    expirationTtl?: number;
    expiration?: number;
    metadata?: Record<string, any>;
  }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{
    keys: Array<{
      name: string;
      expiration?: number;
      metadata?: Record<string, any>;
    }>;
    list_complete: boolean;
    cursor?: string;
  }>;
}

declare global {
  const CACHE: KVNamespace;
  const SESSIONS: KVNamespace;
}

/**
 * KVキャッシュ管理クラス
 */
export class CloudflareKVCache {
  private namespace: KVNamespace;
  private prefix: string;

  constructor(namespace: KVNamespace, prefix = '') {
    this.namespace = namespace;
    this.prefix = prefix;
  }

  /**
   * データを取得
   */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const fullKey = this.getFullKey(key);
      const result = await this.namespace.get(fullKey, { type: 'json' });
      
      if (result === null) {
        return null;
      }

      // 有効期限チェック
      if (result.expiresAt && new Date(result.expiresAt) < new Date()) {
        await this.delete(key);
        return null;
      }

      return result.data;
    } catch (error) {
      console.error('KV get error:', error);
      return null;
    }
  }

  /**
   * データを保存
   */
  async set<T = any>(
    key: string,
    value: T,
    ttlSeconds?: number,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      const expiresAt = ttlSeconds ? new Date(Date.now() + ttlSeconds * 1000) : null;
      
      const data = {
        data: value,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt?.toISOString() || null,
        metadata: metadata || {}
      };

      const options: any = {};
      if (ttlSeconds) {
        options.expirationTtl = ttlSeconds;
      }
      if (metadata) {
        options.metadata = metadata;
      }

      await this.namespace.put(fullKey, JSON.stringify(data), options);
    } catch (error) {
      console.error('KV set error:', error);
      throw error;
    }
  }

  /**
   * データを削除
   */
  async delete(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      await this.namespace.delete(fullKey);
    } catch (error) {
      console.error('KV delete error:', error);
      throw error;
    }
  }

  /**
   * キーのリストを取得
   */
  async list(options?: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{
    keys: string[];
    hasMore: boolean;
    cursor?: string;
  }> {
    try {
      const result = await this.namespace.list({
        prefix: this.getFullKey(options?.prefix || ''),
        limit: options?.limit || 100,
        cursor: options?.cursor
      });

      return {
        keys: result.keys.map(k => this.removePrefix(k.name)),
        hasMore: !result.list_complete,
        cursor: result.cursor
      };
    } catch (error) {
      console.error('KV list error:', error);
      return { keys: [], hasMore: false };
    }
  }

  /**
   * キーの存在確認
   */
  async exists(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  /**
   * インクリメント操作
   */
  async increment(key: string, delta = 1, ttlSeconds?: number): Promise<number> {
    const current = await this.get<number>(key) || 0;
    const newValue = current + delta;
    await this.set(key, newValue, ttlSeconds);
    return newValue;
  }

  /**
   * デクリメント操作
   */
  async decrement(key: string, delta = 1, ttlSeconds?: number): Promise<number> {
    return this.increment(key, -delta, ttlSeconds);
  }

  /**
   * 複数データを一括取得
   */
  async multiGet<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    const results: Record<string, T | null> = {};
    
    await Promise.all(
      keys.map(async (key) => {
        results[key] = await this.get<T>(key);
      })
    );

    return results;
  }

  /**
   * 複数データを一括保存
   */
  async multiSet<T = any>(
    data: Record<string, T>,
    ttlSeconds?: number,
    metadata?: Record<string, any>
  ): Promise<void> {
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        this.set(key, value, ttlSeconds, metadata)
      )
    );
  }

  /**
   * パターンマッチング削除
   */
  async deletePattern(pattern: string): Promise<number> {
    let deletedCount = 0;
    let cursor: string | undefined;

    do {
      const result = await this.list({
        prefix: pattern,
        limit: 100,
        cursor
      });

      await Promise.all(
        result.keys.map(async (key) => {
          await this.delete(key);
          deletedCount++;
        })
      );

      cursor = result.cursor;
    } while (cursor);

    return deletedCount;
  }

  private getFullKey(key: string): string {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  private removePrefix(fullKey: string): string {
    return this.prefix ? fullKey.replace(`${this.prefix}:`, '') : fullKey;
  }
}

/**
 * 特化型キャッシュクラス群
 */

/**
 * API応答キャッシュ
 */
export class ApiCache extends CloudflareKVCache {
  constructor() {
    super(CACHE, 'api');
  }

  async cacheApiResponse<T>(
    endpoint: string,
    method: string,
    params: Record<string, any>,
    response: T,
    ttlSeconds = 300
  ): Promise<void> {
    const key = this.generateApiKey(endpoint, method, params);
    await this.set(key, response, ttlSeconds, {
      endpoint,
      method,
      cachedAt: new Date().toISOString()
    });
  }

  async getCachedApiResponse<T>(
    endpoint: string,
    method: string,
    params: Record<string, any>
  ): Promise<T | null> {
    const key = this.generateApiKey(endpoint, method, params);
    return this.get<T>(key);
  }

  private generateApiKey(endpoint: string, method: string, params: Record<string, any>): string {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return `${method}:${endpoint}:${Buffer.from(paramString).toString('base64')}`;
  }
}

/**
 * ユーザーセッションキャッシュ
 */
export class SessionCache extends CloudflareKVCache {
  constructor() {
    super(SESSIONS, 'session');
  }

  async getSession(sessionId: string): Promise<any | null> {
    return this.get(sessionId);
  }

  async setSession(
    sessionId: string,
    sessionData: any,
    ttlSeconds = 86400 // 24時間
  ): Promise<void> {
    await this.set(sessionId, sessionData, ttlSeconds);
  }

  async updateSession(
    sessionId: string,
    updates: Partial<any>,
    ttlSeconds = 86400
  ): Promise<void> {
    const currentSession = await this.getSession(sessionId);
    if (currentSession) {
      const updatedSession = { ...currentSession, ...updates };
      await this.setSession(sessionId, updatedSession, ttlSeconds);
    }
  }

  async destroySession(sessionId: string): Promise<void> {
    await this.delete(sessionId);
  }
}

/**
 * レート制限キャッシュ
 */
export class RateLimitCache extends CloudflareKVCache {
  constructor() {
    super(CACHE, 'ratelimit');
  }

  async checkRateLimit(
    identifier: string,
    limit: number,
    windowSeconds: number
  ): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
  }> {
    const key = `${identifier}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
    const current = await this.get<number>(key) || 0;
    
    if (current >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: Math.ceil(Date.now() / 1000 / windowSeconds) * windowSeconds
      };
    }

    await this.increment(key, 1, windowSeconds);
    
    return {
      allowed: true,
      remaining: limit - current - 1,
      resetTime: Math.ceil(Date.now() / 1000 / windowSeconds) * windowSeconds
    };
  }
}

/**
 * 市場データキャッシュ
 */
export class MarketDataCache extends CloudflareKVCache {
  constructor() {
    super(CACHE, 'market');
  }

  async getCryptoPrices(symbols: string[]): Promise<Record<string, any> | null> {
    const key = `prices:${symbols.sort().join(',')}`;
    return this.get(key);
  }

  async setCryptoPrices(
    symbols: string[],
    prices: Record<string, any>,
    ttlSeconds = 60 // 1分
  ): Promise<void> {
    const key = `prices:${symbols.sort().join(',')}`;
    await this.set(key, prices, ttlSeconds);
  }

  async getMarketAnalysis(symbol: string): Promise<any | null> {
    return this.get(`analysis:${symbol}`);
  }

  async setMarketAnalysis(
    symbol: string,
    analysis: any,
    ttlSeconds = 300 // 5分
  ): Promise<void> {
    await this.set(`analysis:${symbol}`, analysis, ttlSeconds);
  }
}

/**
 * インスタンス作成
 */
export const apiCache = new ApiCache();
export const sessionCache = new SessionCache();
export const rateLimitCache = new RateLimitCache();
export const marketDataCache = new MarketDataCache();

/**
 * キャッシュヘルパー関数
 */
export const CacheHelpers = {
  /**
   * キャッシュ付きAPI呼び出し
   */
  async withCache<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlSeconds = 300
  ): Promise<T> {
    const cached = await apiCache.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const result = await fetchFn();
    await apiCache.set(key, result, ttlSeconds);
    return result;
  },

  /**
   * 条件付きキャッシュクリア
   */
  async invalidatePattern(pattern: string): Promise<number> {
    return apiCache.deletePattern(pattern);
  },

  /**
   * キャッシュウォームアップ
   */
  async warmup<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlSeconds = 300
  ): Promise<void> {
    try {
      const result = await fetchFn();
      await apiCache.set(key, result, ttlSeconds);
    } catch (error) {
      console.error('Cache warmup failed:', error);
    }
  }
};