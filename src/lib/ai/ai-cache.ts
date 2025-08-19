// 💾 AI Cache Service
// Advanced caching for AI responses, embeddings, and performance optimization

import { logger } from '@/lib/monitoring/logger';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createHash } from 'crypto';

export interface CacheEntry<T = unknown> {
  key: string;
  data: T;
  timestamp: Date;
  ttl: number; // Time to live in milliseconds
  tags: string[];
  metadata?: {
    model?: string;
    tokens_used?: number;
    cost?: number;
    user_id?: string;
    hit_count?: number;
  };
}

// Type guard for objects with confidence property
interface HasConfidence {
  confidence: number;
}

function hasConfidence(obj: unknown): obj is HasConfidence {
  return typeof obj === 'object' && obj !== null && 'confidence' in obj && typeof (obj as Record<string, unknown>).confidence === 'number';
}

export interface EmbeddingCache {
  text_hash: string;
  embedding: number[];
  model: string;
  created_at: Date;
}

export interface QueryCache {
  query_hash: string;
  response: unknown;
  model: string;
  confidence: number;
  created_at: Date;
  expires_at: Date;
  usage_count: number;
}

export interface CacheStats {
  total_entries: number;
  hit_rate: number;
  miss_rate: number;
  total_hits: number;
  total_misses: number;
  memory_usage: number; // bytes
  cost_saved: number; // estimated USD
  tokens_saved: number;
}

export interface FallbackResponse {
  id: string;
  query_type: string;
  response: unknown;
  confidence: number;
  is_fallback: boolean;
  created_at: Date;
}

class AICacheService {
  private memoryCache = new Map<string, CacheEntry>();
  private embeddingCache = new Map<string, EmbeddingCache>();
  private fallbackResponses = new Map<string, FallbackResponse>();
  private supabaseClient: ReturnType<typeof createBrowserClient> | null = null;
  private stats = {
    hits: 0,
    misses: 0,
    total_cost_saved: 0,
    total_tokens_saved: 0
  };

  // Memory usage limits (in MB)
  private readonly MAX_MEMORY_CACHE_SIZE = 100;
  private readonly MAX_EMBEDDING_CACHE_SIZE = 50;

  /**
   * Store AI response in cache with intelligent TTL
   */
  async set<T>(
    key: string,
    data: T,
    ttl?: number,
    metadata?: CacheEntry['metadata'],
    tags: string[] = []
  ): Promise<void> {
    try {
      const cacheKey = this.generateCacheKey(key);
      
      // Determine TTL based on data type and content
      const intelligentTTL = ttl || this.calculateIntelligentTTL(data, metadata);

      const entry: CacheEntry<T> = {
        key: cacheKey,
        data,
        timestamp: new Date(),
        ttl: intelligentTTL,
        tags,
        metadata: {
          hit_count: 0,
          ...metadata
        }
      };

      // Store in memory cache
      this.memoryCache.set(cacheKey, entry);

      // Store in persistent cache for important queries
      if (this.shouldPersist(data, metadata)) {
        await this.persistToDatabase(entry);
      }

      // Clean up old entries if cache is getting too large
      await this.cleanupMemoryCache();

      logger.debug('Cache entry stored', {
        key: cacheKey,
        ttl: intelligentTTL,
        tags,
        size: JSON.stringify(data).length
      });

    } catch (error) {
      logger.error('Cache store error', { error, key });
    }
  }

  /**
   * Retrieve data from cache with fallback strategies
   */
  async get<T>(key: string, fallbackOptions?: {
    allowStale?: boolean;
    staleTTL?: number;
    useFallback?: boolean;
  }): Promise<T | null> {
    try {
      const cacheKey = this.generateCacheKey(key);
      
      // Check memory cache first
      const memoryEntry = this.memoryCache.get(cacheKey);
      if (memoryEntry && this.isEntryValid(memoryEntry, fallbackOptions)) {
        this.updateHitStats(memoryEntry);
        return memoryEntry.data as T;
      }

      // Check persistent cache
      const persistentEntry = await this.getFromDatabase<T>(cacheKey);
      if (persistentEntry && this.isEntryValid(persistentEntry, fallbackOptions)) {
        // Move back to memory cache for faster access
        this.memoryCache.set(cacheKey, persistentEntry);
        this.updateHitStats(persistentEntry);
        return persistentEntry.data;
      }

      // Try fallback responses if available
      if (fallbackOptions?.useFallback) {
        const fallback = await this.getFallbackResponse(key);
        if (fallback) {
          logger.info('Using fallback response', { key: cacheKey });
          return fallback.response as T;
        }
      }

      this.stats.misses++;
      return null;

    } catch (error) {
      logger.error('Cache retrieval error', { error, key });
      return null;
    }
  }

  /**
   * Store and retrieve embeddings with deduplication
   */
  async storeEmbedding(
    text: string,
    embedding: number[],
    model: string
  ): Promise<void> {
    try {
      const textHash = this.hashText(text);
      
      const embeddingEntry: EmbeddingCache = {
        text_hash: textHash,
        embedding,
        model,
        created_at: new Date()
      };

      // Store in memory
      this.embeddingCache.set(textHash, embeddingEntry);

      // Persist to database
      const supabase = await this.getSupabaseClient();
      const { error } = await supabase
        .from('embedding_cache')
        .upsert([embeddingEntry]);

      if (error) throw error;

      logger.debug('Embedding cached', {
        textLength: text.length,
        model,
        embeddingDimensions: embedding.length
      });

    } catch (error) {
      logger.error('Embedding cache error', { error });
    }
  }

  async getEmbedding(text: string, model: string): Promise<number[] | null> {
    try {
      const textHash = this.hashText(text);
      
      // Check memory cache first
      const memoryEmbedding = this.embeddingCache.get(textHash);
      if (memoryEmbedding && memoryEmbedding.model === model) {
        return memoryEmbedding.embedding;
      }

      // Check database
      const supabase = await this.getSupabaseClient();
      const { data, error } = await supabase
        .from('embedding_cache')
        .select('*')
        .eq('text_hash', textHash)
        .eq('model', model)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        // Cache in memory for next time
        this.embeddingCache.set(textHash, data);
        return data.embedding;
      }

      return null;

    } catch (error) {
      logger.error('Embedding retrieval error', { error });
      return null;
    }
  }

  /**
   * Semantic cache for similar queries
   */
  async findSimilarCache<T>(
    query: string,
    threshold: number = 0.8,
    model: string = 'text-embedding-ada-002'
  ): Promise<T | null> {
    try {
      // Get embedding for the query
      const queryEmbedding = await this.getEmbedding(query, model);
      
      if (!queryEmbedding) {
        // Would generate embedding here in production
        logger.debug('No embedding found for query', { query: query.substring(0, 50) });
        return null;
      }

      // Find similar cached responses using vector similarity
      const supabase = await this.getSupabaseClient();
      const { data, error } = await supabase.rpc('find_similar_queries', {
        query_embedding: queryEmbedding,
        similarity_threshold: threshold,
        match_count: 1
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const similarEntry = data[0];
        logger.info('Similar cache found', {
          similarity: similarEntry.similarity,
          query: query.substring(0, 50)
        });

        return similarEntry.response as T;
      }

      return null;

    } catch (error) {
      logger.error('Semantic cache search error', { error });
      return null;
    }
  }

  /**
   * Rate limiting and quota management
   */
  async checkRateLimit(userId: string, endpoint: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: Date;
  }> {
    try {
      const key = `rate_limit:${userId}:${endpoint}`;
      const now = new Date();
      const windowStart = new Date(now.getTime() - 3600000); // 1 hour window

      // Get usage count for this window
      const supabase = await this.getSupabaseClient();
      const { data, error } = await supabase
        .from('api_usage_log')
        .select('*')
        .eq('user_id', userId)
        .eq('endpoint', endpoint)
        .gte('created_at', windowStart.toISOString());

      if (error) throw error;

      const usageCount = data?.length || 0;
      const limit = this.getRateLimit(endpoint);
      const remaining = Math.max(0, limit - usageCount);

      const resetTime = new Date(windowStart.getTime() + 3600000);

      return {
        allowed: remaining > 0,
        remaining,
        resetTime
      };

    } catch (error) {
      logger.error('Rate limit check error', { error });
      return { allowed: false, remaining: 0, resetTime: new Date() };
    }
  }

  /**
   * Log API usage for cost tracking
   */
  async logAPIUsage(
    userId: string,
    endpoint: string,
    model: string,
    tokensUsed: number,
    cost: number
  ): Promise<void> {
    try {
      const usage = {
        user_id: userId,
        endpoint,
        model,
        tokens_used: tokensUsed,
        cost,
        created_at: new Date()
      };

      const supabase = await this.getSupabaseClient();
      const { error } = await supabase
        .from('api_usage_log')
        .insert([usage]);

      if (error) throw error;

      // Update user's usage stats
      await this.updateUserUsageStats(userId, tokensUsed, cost);

    } catch (error) {
      logger.error('API usage logging error', { error });
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): CacheStats {
    const memorySize = this.calculateMemoryUsage();
    const totalRequests = this.stats.hits + this.stats.misses;
    
    return {
      total_entries: this.memoryCache.size,
      hit_rate: totalRequests > 0 ? this.stats.hits / totalRequests : 0,
      miss_rate: totalRequests > 0 ? this.stats.misses / totalRequests : 0,
      total_hits: this.stats.hits,
      total_misses: this.stats.misses,
      memory_usage: memorySize,
      cost_saved: this.stats.total_cost_saved,
      tokens_saved: this.stats.total_tokens_saved
    };
  }

  /**
   * Store fallback responses for API failures
   */
  async storeFallbackResponse(
    queryType: string,
    response: unknown,
    confidence: number = 0.5
  ): Promise<void> {
    try {
      const fallback: FallbackResponse = {
        id: `fallback_${Date.now()}`,
        query_type: queryType,
        response,
        confidence,
        is_fallback: true,
        created_at: new Date()
      };

      this.fallbackResponses.set(queryType, fallback);

      // Persist important fallbacks
      const supabase = await this.getSupabaseClient();
      const { error } = await supabase
        .from('fallback_responses')
        .upsert([fallback]);

      if (error) throw error;

      logger.info('Fallback response stored', { queryType });

    } catch (error) {
      logger.error('Fallback storage error', { error });
    }
  }

  /**
   * Clear expired cache entries
   */
  async clearExpired(): Promise<void> {
    try {
      const now = Date.now();
      const expiredKeys: string[] = [];

      // Check memory cache
      for (const [key, entry] of this.memoryCache.entries()) {
        if (now - entry.timestamp.getTime() > entry.ttl) {
          expiredKeys.push(key);
        }
      }

      // Remove expired entries
      expiredKeys.forEach(key => this.memoryCache.delete(key));

      // Clear expired database entries
      const expiredTime = new Date(now - 24 * 60 * 60 * 1000); // 24 hours
      const supabase = await this.getSupabaseClient();
      const { error } = await supabase
        .from('query_cache')
        .delete()
        .lt('expires_at', expiredTime.toISOString());

      if (error) throw error;

      logger.info('Cache cleanup completed', {
        expiredMemoryEntries: expiredKeys.length
      });

    } catch (error) {
      logger.error('Cache cleanup error', { error });
    }
  }

  /**
   * Invalidate cache by tags
   */
  invalidateByTags(tags: string[]): void {
    const keysToRemove: string[] = [];

    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.tags.some(tag => tags.includes(tag))) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => this.memoryCache.delete(key));

    logger.info('Cache invalidated by tags', {
      tags,
      entriesRemoved: keysToRemove.length
    });
  }

  // Private helper methods

  private generateCacheKey(input: string): string {
    return createHash('md5').update(input).digest('hex');
  }

  private hashText(text: string): string {
    return createHash('sha256').update(text).digest('hex');
  }

  private calculateIntelligentTTL(data: unknown, metadata?: CacheEntry['metadata']): number {
    const baseTTL = {
      'market_analysis': 5 * 60 * 1000,      // 5 minutes
      'price_prediction': 15 * 60 * 1000,    // 15 minutes
      'portfolio_analysis': 30 * 60 * 1000,  // 30 minutes
      'risk_assessment': 60 * 60 * 1000,     // 1 hour
      'general_query': 24 * 60 * 60 * 1000   // 24 hours
    };

    // Determine TTL based on query type or confidence
    if (metadata?.model?.includes('gpt-4')) {
      return baseTTL.general_query; // Longer cache for expensive models
    }

    if (hasConfidence(data) && data.confidence > 0.8) {
      return baseTTL.portfolio_analysis; // Cache high-confidence responses longer
    }

    return baseTTL.general_query; // Default TTL
  }

  private shouldPersist(data: unknown, metadata?: CacheEntry['metadata']): boolean {
    // Persist expensive queries or high-confidence results
    return (
      metadata?.tokens_used && metadata.tokens_used > 1000
    ) || (
      hasConfidence(data) && data.confidence > 0.9
    );
  }

  private isEntryValid(entry: CacheEntry, fallbackOptions?: { allowStale?: boolean; staleTTL?: number } | undefined): boolean {
    const now = Date.now();
    const age = now - entry.timestamp.getTime();

    // Check if entry is still within TTL
    if (age <= entry.ttl) {
      return true;
    }

    // Check if stale entries are allowed
    if (fallbackOptions?.allowStale) {
      const staleTTL = (fallbackOptions.staleTTL ?? (entry.ttl * 2));
      return age <= staleTTL;
    }

    return false;
  }

  private updateHitStats(entry: CacheEntry): void {
    this.stats.hits++;
    if (entry.metadata) {
      entry.metadata.hit_count = (entry.metadata.hit_count || 0) + 1;
      
      // Track cost/token savings
      if (entry.metadata.cost) {
        this.stats.total_cost_saved += entry.metadata.cost;
      }
      if (entry.metadata.tokens_used) {
        this.stats.total_tokens_saved += entry.metadata.tokens_used;
      }
    }
  }

  private async persistToDatabase<T>(entry: CacheEntry<T>): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      const { error } = await supabase
        .from('query_cache')
        .upsert([{
          query_hash: entry.key,
          response: entry.data,
          model: entry.metadata?.model || 'unknown',
          confidence: hasConfidence(entry.data) ? entry.data.confidence : 0.7,
          created_at: entry.timestamp,
          expires_at: new Date(entry.timestamp.getTime() + entry.ttl),
          usage_count: 1
        }]);

      if (error) throw error;

    } catch (error) {
      logger.error('Database persistence error', { error });
    }
  }

  private async getFromDatabase<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const supabase = await this.getSupabaseClient();
      const { data, error } = await supabase
        .from('query_cache')
        .select('*')
        .eq('query_hash', key)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        return {
          key,
          data: data.response,
          timestamp: new Date(data.created_at),
          ttl: new Date(data.expires_at).getTime() - new Date(data.created_at).getTime(),
          tags: [],
          metadata: {
            model: data.model,
            hit_count: data.usage_count
          }
        };
      }

      return null;

    } catch (error) {
      logger.error('Database retrieval error', { error });
      return null;
    }
  }

  private async getFallbackResponse(key: string): Promise<FallbackResponse | null> {
    const queryType = this.extractQueryType(key);
    
    // Check memory first
    const memoryFallback = this.fallbackResponses.get(queryType);
    if (memoryFallback) return memoryFallback;

    // Check database
    try {
      const supabase = await this.getSupabaseClient();
      const { data, error } = await supabase
        .from('fallback_responses')
        .select('*')
        .eq('query_type', queryType)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return data || null;

    } catch (error) {
      logger.error('Fallback retrieval error', { error });
      return null;
    }
  }

  private extractQueryType(key: string): string {
    // Simple query type extraction from key
    if (key.includes('market')) return 'market_analysis';
    if (key.includes('portfolio')) return 'portfolio_analysis';
    if (key.includes('risk')) return 'risk_assessment';
    if (key.includes('prediction')) return 'price_prediction';
    return 'general_query';
  }

  private async cleanupMemoryCache(): Promise<void> {
    const currentSize = this.calculateMemoryUsage();
    const maxSize = this.MAX_MEMORY_CACHE_SIZE * 1024 * 1024; // Convert to bytes

    if (currentSize > maxSize) {
      // Remove oldest entries first (LRU)
      const entries = Array.from(this.memoryCache.entries())
        .sort(([, a], [, b]) => a.timestamp.getTime() - b.timestamp.getTime());

      const toRemove = Math.ceil(entries.length * 0.2); // Remove 20%
      
      for (let i = 0; i < toRemove; i++) {
        this.memoryCache.delete(entries[i][0]);
      }

      logger.info('Memory cache cleaned up', {
        entriesRemoved: toRemove,
        newSize: this.calculateMemoryUsage()
      });
    }
  }

  private calculateMemoryUsage(): number {
    let size = 0;
    for (const entry of this.memoryCache.values()) {
      size += JSON.stringify(entry).length * 2; // Rough estimate (UTF-16)
    }
    return size;
  }

  private getRateLimit(endpoint: string): number {
    const limits = {
      '/api/ai/defi/advisor': 100,    // 100 requests per hour
      '/api/ai/defi/analyze': 50,     // 50 requests per hour
      '/api/ai/defi/predict': 20,     // 20 requests per hour
      '/api/ai/defi/optimize': 30,    // 30 requests per hour
      default: 60
    } as const;

    return (endpoint in limits ? (limits as Record<string, number>)[endpoint] : limits.default);
  }

  private async getSupabaseClient() {
    if (!this.supabaseClient) {
      // サーバーサイドかブラウザかを判定
      if (typeof window === 'undefined') {
        // サーバーサイド
        this.supabaseClient = await createServerClient();
      } else {
        // ブラウザサイド
        this.supabaseClient = createBrowserClient();
      }
    }
    return this.supabaseClient;
  }

  private async updateUserUsageStats(userId: string, tokens: number, cost: number): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      const { error } = await supabase.rpc('increment_user_usage', {
        user_id: userId,
        tokens_increment: tokens,
        cost_increment: cost
      });

      if (error) throw error;

    } catch (error) {
      logger.error('User usage stats update error', { error });
    }
  }
}

export const aiCacheService = new AICacheService();
export default aiCacheService;
