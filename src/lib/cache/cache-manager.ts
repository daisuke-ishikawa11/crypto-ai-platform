/**
 * Multi-layer Caching System
 * Browser, Memory, Redis, and CDN caching with intelligent invalidation
 */

import Redis from 'ioredis'
import LRUCachePkg, { Options as LRUOptions } from 'lru-cache'
import { logger } from '@/lib/monitoring/logger'

// Cache configuration
const CACHE_CONFIG = {
  memory: {
    max: 500, // Maximum number of items
    ttl: 1000 * 60 * 5, // 5 minutes default TTL
    updateAgeOnGet: true,
    updateAgeOnHas: true,
  },
  redis: {
    defaultTTL: 60 * 60, // 1 hour in seconds
    keyPrefix: 'crypto-platform:',
  },
  browser: {
    storageKey: 'crypto-platform-cache',
    maxSize: 5 * 1024 * 1024, // 5MB max localStorage
  },
}

// Cache statistics
interface CacheStats {
  hits: number
  misses: number
  sets: number
  deletes: number
  errors: number
}

// Cache entry interface
interface CacheEntry<T = unknown> {
  data: T
  timestamp: number
  ttl: number
  tags?: string[]
  version?: string
}

// Cache layer enum
export enum CacheLayer {
  BROWSER = 'browser',
  MEMORY = 'memory',
  REDIS = 'redis',
  CDN = 'cdn',
}

// Cache options
interface CacheOptions {
  ttl?: number
  tags?: string[]
  layers?: CacheLayer[]
  version?: string
  compress?: boolean
}

// Multi-layer cache manager
export class CacheManager {
  private static instance: CacheManager
  private memoryCache: LRUCachePkg<string, CacheEntry>
  private redisClient?: Redis
  private stats: Map<CacheLayer, CacheStats>
  private compressionEnabled: boolean = true

  private constructor() {
    // Initialize memory cache
    this.memoryCache = new LRUCachePkg<string, CacheEntry>(CACHE_CONFIG.memory as LRUOptions<string, CacheEntry>)
    
    // Initialize stats
    this.stats = new Map()
    Object.values(CacheLayer).forEach(layer => {
      this.stats.set(layer as CacheLayer, {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
        errors: 0,
      })
    })

    // Initialize Redis if configured
    if (process.env.REDIS_URL) {
      this.initializeRedis()
    }

    // Set up cache warming
    this.setupCacheWarming()
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  private initializeRedis() {
    try {
      this.redisClient = new Redis(process.env.REDIS_URL!, {
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => Math.min(times * 50, 2000),
        reconnectOnError: (err) => {
          const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT']
          return targetErrors.some(e => err.message.includes(e))
        },
      })

      this.redisClient.on('error', (error) => {
        logger.error('Redis connection error:', { error: error instanceof Error ? error.message : String(error) })
        this.incrementStat(CacheLayer.REDIS, 'errors')
      })

      this.redisClient.on('connect', () => {
        logger.info('Redis connected successfully')
      })
    } catch (error) {
      logger.error('Failed to initialize Redis:', { error: error instanceof Error ? error.message : String(error) })
    }
  }

  // Get value from cache with multi-layer fallback
  async get<T = unknown>(
    key: string,
    options: CacheOptions = {}
  ): Promise<T | null> {
    const layers = options.layers || [
      CacheLayer.BROWSER,
      CacheLayer.MEMORY,
      CacheLayer.REDIS,
    ]

    for (const layer of layers) {
      try {
        const value = await this.getFromLayer<T>(key, layer, options)
        if (value !== null) {
          this.incrementStat(layer, 'hits')
          
          // Promote to higher layers
          await this.promoteToHigherLayers(key, value, layer, layers, options)
          
          return value
        }
        this.incrementStat(layer, 'misses')
      } catch (error) {
        logger.error(`Cache get error in ${layer}:`, { error: error instanceof Error ? error.message : String(error) })
        this.incrementStat(layer, 'errors')
      }
    }

    return null
  }

  // Set value in cache across multiple layers
  async set<T = unknown>(
    key: string,
    value: T,
    options: CacheOptions = {}
  ): Promise<void> {
    const layers = options.layers || [
      CacheLayer.BROWSER,
      CacheLayer.MEMORY,
      CacheLayer.REDIS,
    ]

    const entry: CacheEntry<T> = {
      data: value,
      timestamp: Date.now(),
      ttl: options.ttl || CACHE_CONFIG.memory.ttl,
      tags: options.tags,
      version: options.version,
    }

    // Set in all specified layers
    await Promise.all(
      layers.map(layer => this.setInLayer(key, entry, layer, options))
    )
  }

  // Delete from cache
  async delete(key: string, options: { layers?: CacheLayer[] } = {}): Promise<void> {
    const layers = options.layers || Object.values(CacheLayer)
    
    await Promise.all(
      layers.map(async layer => {
        try {
          await this.deleteFromLayer(key, layer)
          this.incrementStat(layer, 'deletes')
        } catch (error) {
          logger.error(`Cache delete error in ${layer}:`, { error: error instanceof Error ? error.message : String(error) })
          this.incrementStat(layer, 'errors')
        }
      })
    )
  }

  // Invalidate by tags
  async invalidateByTags(tags: string[]): Promise<void> {
    // Memory cache invalidation
    for (const [key, entry] of this.memoryCache.entries()) {
      if ((entry.tags ?? []).some((tag: string) => tags.includes(tag))) {
        this.memoryCache.delete(key)
      }
    }

    // Redis invalidation
    if (this.redisClient) {
      const pipeline = this.redisClient.pipeline()
      for (const tag of tags) {
        pipeline.smembers(`tag:${tag}`)
      }
      const results = await pipeline.exec()
      
      if (results) {
        const keysToDelete = new Set<string>()
        results.forEach(result => {
          if (result && result[1]) {
            (result[1] as string[]).forEach(key => keysToDelete.add(key))
          }
        })

        if (keysToDelete.size > 0) {
          await this.redisClient.del(...Array.from(keysToDelete))
        }
      }
    }

    // Browser cache invalidation
    if (typeof window !== 'undefined') {
      const cache = this.getBrowserCache()
      const keysToDelete: string[] = []
      
      Object.entries(cache).forEach(([key, entry]) => {
        if ((entry as CacheEntry).tags?.some(tag => tags.includes(tag))) {
          keysToDelete.push(key)
        }
      })

      keysToDelete.forEach(key => {
        delete cache[key]
      })
      
      this.setBrowserCache(cache)
    }
  }

  // Get from specific layer
  private async getFromLayer<T>(
    key: string,
    layer: CacheLayer,
    options: CacheOptions
  ): Promise<T | null> {
    switch (layer) {
      case CacheLayer.BROWSER:
        return this.getFromBrowser<T>(key)
      
      case CacheLayer.MEMORY:
        return this.getFromMemory<T>(key)
      
      case CacheLayer.REDIS:
        return this.getFromRedis<T>(key)
      
      case CacheLayer.CDN:
        return this.getFromCDN<T>(key)
      
      default:
        return null
    }
  }

  // Set in specific layer
  private async setInLayer<T>(
    key: string,
    entry: CacheEntry<T>,
    layer: CacheLayer,
    options: CacheOptions
  ): Promise<void> {
    try {
      switch (layer) {
        case CacheLayer.BROWSER:
          await this.setInBrowser(key, entry)
          break
        
        case CacheLayer.MEMORY:
          await this.setInMemory(key, entry)
          break
        
        case CacheLayer.REDIS:
          await this.setInRedis(key, entry)
          break
        
        case CacheLayer.CDN:
          await this.setInCDN(key, entry)
          break
      }
      
      this.incrementStat(layer, 'sets')
    } catch (error) {
      logger.error(`Cache set error in ${layer}:`, { error: error instanceof Error ? error.message : String(error) })
      this.incrementStat(layer, 'errors')
    }
  }

  // Delete from specific layer
  private async deleteFromLayer(key: string, layer: CacheLayer): Promise<void> {
    switch (layer) {
      case CacheLayer.BROWSER:
        this.deleteFromBrowser(key)
        break
      
      case CacheLayer.MEMORY:
        this.memoryCache.delete(key)
        break
      
      case CacheLayer.REDIS:
        if (this.redisClient) {
          await this.redisClient.del(CACHE_CONFIG.redis.keyPrefix + key)
        }
        break
      
      case CacheLayer.CDN:
        await this.purgeFromCDN(key)
        break
    }
  }

  // Browser cache operations
  private getFromBrowser<T>(key: string): T | null {
    if (typeof window === 'undefined') return null
    
    try {
      const cache = this.getBrowserCache()
      const entry = cache[key] as CacheEntry<T>
      
      if (entry && Date.now() - entry.timestamp < entry.ttl) {
        return this.decompress(entry.data) as T
      }
      
      // Clean up expired entry
      delete cache[key]
      this.setBrowserCache(cache)
    } catch (error) {
      logger.error('Browser cache get error:', { error: error instanceof Error ? error.message : String(error) })
    }
    
    return null
  }

  private setInBrowser<T>(key: string, entry: CacheEntry<T>): void {
    if (typeof window === 'undefined') return
    
    try {
      const cache = this.getBrowserCache()
      const compressedEntry = {
        ...entry,
        data: this.compress(entry.data),
      }
      
      // Check size before storing
      const size = JSON.stringify(compressedEntry).length
      if (size > CACHE_CONFIG.browser.maxSize) {
        logger.warn(`Browser cache entry too large: ${size} bytes`)
        return
      }
      
      cache[key] = compressedEntry
      this.setBrowserCache(cache)
    } catch (error) {
      logger.error('Browser cache set error:', { error: error instanceof Error ? error.message : String(error) })
    }
  }

  private deleteFromBrowser(key: string): void {
    if (typeof window === 'undefined') return
    
    try {
      const cache = this.getBrowserCache()
      delete cache[key]
      this.setBrowserCache(cache)
    } catch (error) {
      logger.error('Browser cache delete error:', { error: error instanceof Error ? error.message : String(error) })
    }
  }

  private getBrowserCache(): Record<string, unknown> {
    try {
      const stored = localStorage.getItem(CACHE_CONFIG.browser.storageKey)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }

  private setBrowserCache(cache: Record<string, unknown>): void {
    try {
      localStorage.setItem(CACHE_CONFIG.browser.storageKey, JSON.stringify(cache))
    } catch (error) {
      // Handle quota exceeded
      if ((error as { name?: string }).name === 'QuotaExceededError') {
        this.cleanupBrowserCache()
      }
    }
  }

  private cleanupBrowserCache(): void {
    const cache = this.getBrowserCache()
    const entries = Object.entries(cache)
    
    // Remove expired entries
    const now = Date.now()
    const cleaned = entries.filter(([_, entry]) => {
      const e = entry as CacheEntry
      return now - e.timestamp < e.ttl
    })
    
    // If still too large, remove oldest entries
    if (cleaned.length > 100) {
      cleaned.sort((a, b) => (a[1] as CacheEntry).timestamp - (b[1] as CacheEntry).timestamp)
      cleaned.splice(0, cleaned.length - 100)
    }
    
    this.setBrowserCache(Object.fromEntries(cleaned))
  }

  // Memory cache operations
  private getFromMemory<T>(key: string): T | null {
    const entry = this.memoryCache.get(key)
    return entry ? (entry.data as T) : null
  }

  private setInMemory<T>(key: string, entry: CacheEntry<T>): void {
    this.memoryCache.set(key, entry, { ttl: entry.ttl })
  }

  // Redis cache operations
  private async getFromRedis<T>(key: string): Promise<T | null> {
    if (!this.redisClient) return null
    
    try {
      const data = await this.redisClient.get(CACHE_CONFIG.redis.keyPrefix + key)
      if (data) {
        const entry = JSON.parse(data) as CacheEntry<T>
        return entry.data as T
      }
    } catch (error) {
      logger.error('Redis get error:', { error: error instanceof Error ? error.message : String(error) })
    }
    
    return null
  }

  private async setInRedis<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    if (!this.redisClient) return
    
    try {
      const redisKey = CACHE_CONFIG.redis.keyPrefix + key
      const ttlSeconds = Math.floor(entry.ttl / 1000)
      
      await this.redisClient.setex(
        redisKey,
        ttlSeconds,
        JSON.stringify(entry)
      )
      
      // Add to tag sets
      if (entry.tags) {
        const pipeline = this.redisClient.pipeline()
        entry.tags.forEach(tag => {
          pipeline.sadd(`tag:${tag}`, redisKey)
          pipeline.expire(`tag:${tag}`, ttlSeconds)
        })
        await pipeline.exec()
      }
    } catch (error) {
      logger.error('Redis set error:', { error: error instanceof Error ? error.message : String(error) })
    }
  }

  // CDN cache operations
  private async getFromCDN<T>(key: string): Promise<T | null> {
    // CDN cache is typically handled at the edge
    // This is a placeholder for CDN cache integration
    return null
  }

  private async setInCDN<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    // CDN cache setting is typically handled via headers
    // This is a placeholder for CDN cache integration
  }

  private async purgeFromCDN(key: string): Promise<void> {
    // Implement CDN purge API call
    if (process.env.CDN_PURGE_URL) {
      try {
        await fetch(process.env.CDN_PURGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CDN_API_KEY}`,
          },
          body: JSON.stringify({ keys: [key] }),
        })
      } catch (error) {
        logger.error('CDN purge error:', { error: error instanceof Error ? error.message : String(error) })
      }
    }
  }

  // Promote value to higher cache layers
  private async promoteToHigherLayers<T>(
    key: string,
    value: T,
    foundLayer: CacheLayer,
    layers: CacheLayer[],
    options: CacheOptions
  ): Promise<void> {
    const foundIndex = layers.indexOf(foundLayer)
    if (foundIndex > 0) {
      const higherLayers = layers.slice(0, foundIndex)
      await this.set(key, value, { ...options, layers: higherLayers })
    }
  }

  // Cache warming
  private setupCacheWarming() {
    // Warm critical data on startup
    if (typeof window === 'undefined') {
      this.warmCriticalData()
      
      // Schedule periodic warming
      if (process.env.NODE_ENV !== 'test') {
        const t = setInterval(() => this.warmCriticalData(), 60 * 60 * 1000) // Every hour
        ;(t as { unref?: () => void }).unref?.()
      }
    }
  }

  private async warmCriticalData() {
    const criticalKeys = [
      'market:btc:latest',
      'market:eth:latest',
      'config:app',
      'lessons:featured',
    ]

    for (const key of criticalKeys) {
      try {
        // Fetch and cache critical data
        // This would typically call your data fetching logic
        logger.info(`Warming cache for: ${key}`)
      } catch (error) {
        logger.error(`Failed to warm cache for ${key}:`, { error: error instanceof Error ? error.message : String(error) })
      }
    }
  }

  // Compression utilities
  private compress(data: unknown): unknown {
    if (!this.compressionEnabled || typeof data !== 'object') {
      return data
    }
    
    // Simple compression by removing null/undefined values
    return JSON.parse(JSON.stringify(data))
  }

  private decompress(data: unknown): unknown {
    return data
  }

  // Statistics
  private incrementStat(layer: CacheLayer, stat: keyof CacheStats) {
    const stats = this.stats.get(layer)
    if (stats) {
      stats[stat]++
    }
  }

  getStats(): Record<string, CacheStats> {
    return Object.fromEntries(this.stats)
  }

  // Cache hit ratio
  getHitRatio(layer?: CacheLayer): number {
    if (layer) {
      const stats = this.stats.get(layer)
      if (stats) {
        const total = stats.hits + stats.misses
        return total > 0 ? stats.hits / total : 0
      }
      return 0
    }

    // Overall hit ratio
    let totalHits = 0
    let totalMisses = 0
    this.stats.forEach(stats => {
      totalHits += stats.hits
      totalMisses += stats.misses
    })
    
    const total = totalHits + totalMisses
    return total > 0 ? totalHits / total : 0
  }

  // Clear all caches
  async clear(): Promise<void> {
    // Clear memory cache
    this.memoryCache.clear()
    
    // Clear Redis
    if (this.redisClient) {
      const keys = await this.redisClient.keys(CACHE_CONFIG.redis.keyPrefix + '*')
      if (keys.length > 0) {
        await this.redisClient.del(...keys)
      }
    }
    
    // Clear browser cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CACHE_CONFIG.browser.storageKey)
    }
    
    logger.info('All caches cleared')
  }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance()

// React hook for cache management
export function useCacheManager() {
  return {
    get: <T = unknown>(key: string, options?: CacheOptions) => 
      cacheManager.get<T>(key, options),
    set: <T = unknown>(key: string, value: T, options?: CacheOptions) =>
      cacheManager.set(key, value, options),
    delete: (key: string, options?: { layers?: CacheLayer[] }) =>
      cacheManager.delete(key, options),
    invalidateByTags: (tags: string[]) =>
      cacheManager.invalidateByTags(tags),
    getStats: () => cacheManager.getStats(),
    getHitRatio: (layer?: CacheLayer) => cacheManager.getHitRatio(layer),
    clear: () => cacheManager.clear(),
  }
}

// 公式 lru-cache を使用するため自前実装は削除
