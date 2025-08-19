/**
 * API Performance Middleware
 * Request optimization, compression, and caching
 */

import { NextRequest, NextResponse } from 'next/server'
import { cacheManager, CacheLayer } from '@/lib/cache/cache-manager'
// 監視ユーティリティがモジュール未化の場合に備えた薄いラッパー
const performanceMonitor = {
  mark: (name: string) => {
    try { (globalThis as { performance?: Performance }).performance?.mark?.(name) } catch {}
  },
  measure: (name: string, start: string, end: string) => {
    try { (globalThis as { performance?: Performance }).performance?.measure?.(name, start, end) } catch {}
  }
}
import { logger } from '@/lib/monitoring/logger'
import zlib from 'zlib'
import { promisify } from 'util'

const gzip = promisify(zlib.gzip)
const brotli = promisify(zlib.brotliCompress)

// API Performance configuration
const API_CONFIG = {
  compression: {
    threshold: 1024, // Minimum size in bytes to compress
    level: 6, // Compression level (1-9)
  },
  cache: {
    defaultTTL: 60 * 1000, // 1 minute
    staleWhileRevalidate: 5 * 60 * 1000, // 5 minutes
  },
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
  },
  timeout: 30 * 1000, // 30 seconds
  batch: {
    maxSize: 50,
    maxWaitTime: 100, // milliseconds
  },
}

// Request queue for batching
class RequestBatcher {
  private queues: Map<string, Array<{
    request: unknown
    resolve: (value: unknown) => void
    reject: (error: unknown) => void
  }>> = new Map()
  private timers: Map<string, NodeJS.Timeout> = new Map()

  async batch<I, O>(
    key: string,
    request: I,
    processor: (requests: I[]) => Promise<O[]>
  ): Promise<O> {
    return new Promise<O>((resolve, reject) => {
      // Add to queue
      if (!this.queues.has(key)) {
        this.queues.set(key, [])
      }
      
      const queue = this.queues.get(key)!
      const resWrap = (v: unknown) => resolve(v as O)
      const rejWrap = (e: unknown) => reject(e)
      queue.push({ request, resolve: resWrap, reject: rejWrap })

      // Process if batch is full
      if (queue.length >= API_CONFIG.batch.maxSize) {
        this.processBatch(key, processor)
        return
      }

      // Set timer for batch processing
      if (!this.timers.has(key)) {
        const timer = setTimeout(() => {
          this.processBatch(key, processor)
        }, API_CONFIG.batch.maxWaitTime)
        // テスト環境ではハンドルリークを避けるため
        ;(timer as { unref?: () => void }).unref?.()
        this.timers.set(key, timer)
      }
    })
  }

  private async processBatch<I, O>(
    key: string,
    processor: (requests: I[]) => Promise<O[]>
  ) {
    const queue = this.queues.get(key)
    if (!queue || queue.length === 0) return

    // Clear timer
    const timer = this.timers.get(key)
    if (timer) {
      clearTimeout(timer)
      this.timers.delete(key)
    }

    // Get all requests
    const batch = [...queue]
    this.queues.set(key, [])

    try {
      // Process batch
      const results = await processor(batch.map(item => item.request as I))
      
      // Resolve individual promises
      batch.forEach((item, index) => {
        item.resolve(results[index] as O)
      })
    } catch (error) {
      // Reject all promises
      batch.forEach(item => {
        item.reject(error)
      })
    }
  }
}

const requestBatcher = new RequestBatcher()

// Response compression
export async function compressResponse(
  data: unknown,
  acceptEncoding: string
): Promise<{ data: Buffer | string; encoding?: string }> {
  const json = JSON.stringify(data)
  
  // Skip compression for small responses
  if (json.length < API_CONFIG.compression.threshold) {
    return { data: json }
  }

  // Prefer Brotli, then Gzip
  if (acceptEncoding.includes('br')) {
    const compressed = await brotli(json, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: API_CONFIG.compression.level,
      },
    })
    return { data: compressed, encoding: 'br' }
  }

  if (acceptEncoding.includes('gzip')) {
    const compressed = await gzip(json, {
      level: API_CONFIG.compression.level,
    })
    return { data: compressed, encoding: 'gzip' }
  }

  return { data: json }
}

// Cache key generation
export async function generateCacheKey(
  request: NextRequest,
  options: { includeAuth?: boolean; includeQuery?: boolean } = {}
): Promise<string> {
  const url = new URL(request.url)
  let key = `api:${request.method}:${url.pathname}`

  if (options.includeQuery) {
    const params = Array.from(url.searchParams.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    if (params) key += `?${params}`
  }

  if (options.includeAuth) {
    const auth = request.headers.get('authorization')
    if (auth) {
      // Hash the auth token for privacy
      const crypto = await import('crypto')
      const hash = crypto
        .createHash('sha256')
        .update(auth)
        .digest('hex')
        .substring(0, 8)
      key += `:auth:${hash}`
    }
  }

  return key
}

// API Performance Middleware
export async function withPerformance(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: {
    cache?: boolean
    cacheTTL?: number
    compress?: boolean
    batch?: boolean
    batchKey?: string
    timeout?: number
  } = {}
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now()
    const requestId = crypto.randomUUID()

    // Start performance monitoring
    performanceMonitor.mark(`api-request-${requestId}-start`)

    try {
      // Check cache if enabled
      if (options.cache) {
        const cacheKey = await generateCacheKey(req, { includeQuery: true })
        const cached = await cacheManager.get(cacheKey)
        
        if (cached) {
          logger.info('Cache hit', { 
            path: req.nextUrl.pathname,
            duration: Date.now() - startTime,
          })

          return new NextResponse(JSON.stringify(cached), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'X-Cache': 'HIT',
              'Cache-Control': `max-age=${options.cacheTTL || API_CONFIG.cache.defaultTTL / 1000}`,
            },
          })
        }
      }

      // Apply timeout
      const timeoutMs = options.timeout || API_CONFIG.timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
      ;(timeoutId as { unref?: () => void }).unref?.()

      // Execute handler with timeout
      let response: NextResponse
      try {
        response = await Promise.race([
          handler(req),
          new Promise<never>((_, reject) => {
            controller.signal.addEventListener('abort', () => {
              reject(new Error('Request timeout'))
            })
          }),
        ])
      } finally {
        clearTimeout(timeoutId)
      }

      // Extract response data
      const responseData = await response.json()

      // Cache response if enabled
      if (options.cache && response.ok) {
        const cacheKey = await generateCacheKey(req, { includeQuery: true })
        await cacheManager.set(cacheKey, responseData, {
          ttl: options.cacheTTL || API_CONFIG.cache.defaultTTL,
          tags: ['api', req.nextUrl.pathname],
          layers: [CacheLayer.MEMORY, CacheLayer.REDIS],
        })
      }

      // Compress response if enabled
      if (options.compress) {
        const acceptEncoding = req.headers.get('accept-encoding') || ''
        const { data, encoding } = await compressResponse(responseData, acceptEncoding)

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'X-Response-Time': `${Date.now() - startTime}ms`,
          'X-Request-Id': requestId,
        }

        if (encoding) {
          headers['Content-Encoding'] = encoding
        }

        if (options.cache) {
          headers['Cache-Control'] = `max-age=${options.cacheTTL || API_CONFIG.cache.defaultTTL / 1000}, stale-while-revalidate=${API_CONFIG.cache.staleWhileRevalidate / 1000}`
          headers['X-Cache'] = 'MISS'
        }

        // Uint8Array/Buffer は Response でそのまま BodyInit として扱える
        return new NextResponse(data as BodyInit, {
          status: response.status,
          headers,
        })
      }

      // Add performance headers
      const headers = new Headers(response.headers)
      headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
      headers.set('X-Request-Id', requestId)

      return new NextResponse(JSON.stringify(responseData), {
        status: response.status,
        headers,
      })

    } catch (error) {
      logger.error('API request error', {
        error: error instanceof Error ? error.message : String(error),
        path: req.nextUrl.pathname,
        duration: Date.now() - startTime,
      })

      return new NextResponse(
        JSON.stringify({ 
          error: error instanceof Error ? error.message : 'Internal server error',
          requestId,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Response-Time': `${Date.now() - startTime}ms`,
            'X-Request-Id': requestId,
          },
        }
      )
    } finally {
      // End performance monitoring
      performanceMonitor.mark(`api-request-${requestId}-end`)
      performanceMonitor.measure(
        `api-request-${req.nextUrl.pathname}`,
        `api-request-${requestId}-start`,
        `api-request-${requestId}-end`
      )
    }
  }
}

// Database query optimization
export class QueryOptimizer {
  private queryCache: Map<string, { result: unknown; timestamp: number }> = new Map()
  private preparedStatements: Map<string, unknown> = new Map()

  // Optimize and cache query
  async executeQuery<T>(
    query: string,
    params: unknown[] = [],
    options: {
      cache?: boolean
      cacheTTL?: number
      prepared?: boolean
    } = {}
  ): Promise<T> {
    const cacheKey = `${query}:${JSON.stringify(params)}`

    // Check cache
    if (options.cache) {
      const cached = this.queryCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < (options.cacheTTL || 60000)) {
        return cached.result as T
      }
    }

    // Execute query with monitoring
    const startTime = Date.now()
    
    try {
      // Use prepared statement if available
      let result: T
      if (options.prepared) {
        const statement = (this.preparedStatements.get(query) as { execute: <U>(params: unknown[]) => Promise<U> }) || 
          await this.prepareStatement(query)
        result = await statement.execute<T>(params)
      } else {
        result = await this.executeRawQuery<T>(query, params)
      }

      // Cache result
      if (options.cache) {
        this.queryCache.set(cacheKey, {
          result,
          timestamp: Date.now(),
        })

        // Clean old cache entries
        this.cleanQueryCache()
      }

      // Log slow queries
      const duration = Date.now() - startTime
      if (duration > 100) {
        logger.warn('Slow query detected', {
          query: query.substring(0, 100),
          duration,
          params: params.length,
        })
      }

      return result
    } catch (error) {
      logger.error('Query execution error', {
        query: query.substring(0, 100),
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime,
      })
      throw error
    }
  }

  private async prepareStatement(_query: string): Promise<{ execute: <T>(params: unknown[]) => Promise<T> }> {
    const statement = { execute: async <T>(params: unknown[]) => this.executeRawQuery<T>(_query, params) }
    this.preparedStatements.set(_query, statement)
    return statement
  }

  private async executeRawQuery<T>(_query: string, _params: unknown[]): Promise<T> {
    // This would integrate with your actual database client
    // Placeholder implementation
    return null as T
  }

  private cleanQueryCache() {
    const now = Date.now()
    const maxAge = 5 * 60 * 1000 // 5 minutes

    for (const [key, value] of this.queryCache.entries()) {
      if (now - value.timestamp > maxAge) {
        this.queryCache.delete(key)
      }
    }
  }

  // Batch multiple queries
  async batchQueries<T>(
    queries: Array<{ query: string; params?: unknown[] }>
  ): Promise<T[]> {
    const startTime = Date.now()

    try {
      // Execute queries in parallel with connection pooling
      const results = await Promise.all(
        queries.map(({ query, params }) => 
          this.executeQuery(query, params, { cache: true })
        )
      )

      logger.info('Batch query executed', {
        count: queries.length,
        duration: Date.now() - startTime,
      })

      return results as T[]
    } catch (error) {
      logger.error('Batch query error', {
        error: error instanceof Error ? error.message : String(error),
        count: queries.length,
        duration: Date.now() - startTime,
      })
      throw error
    }
  }

  // Query analysis and optimization suggestions
  analyzeQuery(query: string): {
    issues: string[]
    suggestions: string[]
    estimatedCost: number
  } {
    const issues: string[] = []
    const suggestions: string[] = []
    let estimatedCost = 0

    // Check for missing indexes
    if (query.includes('WHERE') && !query.includes('INDEX')) {
      issues.push('Query may be missing index usage')
      suggestions.push('Consider adding indexes on WHERE clause columns')
      estimatedCost += 10
    }

    // Check for SELECT *
    if (query.includes('SELECT *')) {
      issues.push('Using SELECT * can fetch unnecessary data')
      suggestions.push('Specify only required columns')
      estimatedCost += 5
    }

    // Check for N+1 queries
    if (query.includes('IN (') && query.split('IN (').length > 2) {
      issues.push('Multiple IN clauses detected')
      suggestions.push('Consider using JOINs or batch queries')
      estimatedCost += 15
    }

    // Check for missing LIMIT
    if (query.includes('SELECT') && !query.includes('LIMIT')) {
      issues.push('Query has no LIMIT clause')
      suggestions.push('Add LIMIT clause to prevent fetching too many rows')
      estimatedCost += 8
    }

    return { issues, suggestions, estimatedCost }
  }
}

// Connection pooling manager
type PooledConnection = {
  id: string
  inUse: boolean
  lastUsed: number
  close?: () => void
  execute?: (query: string) => Promise<unknown> | void
}

export class ConnectionPool {
  private connections: Map<string, PooledConnection[]> = new Map()
  private config = {
    minConnections: 2,
    maxConnections: 10,
    idleTimeout: 30000,
    acquireTimeout: 10000,
  }

  async getConnection(poolName: string = 'default'): Promise<PooledConnection> {
    const pool = this.connections.get(poolName) || []
    
    // Find available connection
    const available = pool.find(conn => !conn.inUse)
    
    if (available) {
      available.inUse = true
      available.lastUsed = Date.now()
      return available
    }

    // Create new connection if under limit
    if (pool.length < this.config.maxConnections) {
      const connection = await this.createConnection()
      connection.inUse = true
      connection.lastUsed = Date.now()
      pool.push(connection)
      this.connections.set(poolName, pool)
      return connection
    }

    // Wait for available connection
    return this.waitForConnection(poolName)
  }

  async releaseConnection(connection: PooledConnection, poolName: string = 'default') {
    connection.inUse = false
    connection.lastUsed = Date.now()
    
    // Clean idle connections
    this.cleanIdleConnections(poolName)
  }

  private async createConnection(): Promise<PooledConnection> {
    // Create actual database connection
    // This is a placeholder
    return {
      id: crypto.randomUUID(),
      inUse: false,
      lastUsed: Date.now(),
      execute: async (query: string) => {
        // Execute query
      },
    }
  }

  private async waitForConnection(poolName: string): Promise<PooledConnection> {
    const startTime = Date.now()
    
    while (Date.now() - startTime < this.config.acquireTimeout) {
      const pool = this.connections.get(poolName) || []
      const available = pool.find(conn => !conn.inUse)
      
      if (available) {
        available.inUse = true
        available.lastUsed = Date.now()
        return available
      }
      
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    throw new Error('Connection acquisition timeout')
  }

  private cleanIdleConnections(poolName: string) {
    const pool = this.connections.get(poolName) || []
    const now = Date.now()
    
    const activePool = pool.filter(conn => {
      if (!conn.inUse && 
          now - conn.lastUsed > this.config.idleTimeout &&
          pool.filter(c => !c.inUse).length > this.config.minConnections) {
        // Close connection
        conn.close?.()
        return false
      }
      return true
    })
    
    this.connections.set(poolName, activePool)
  }
}

// Export instances
export const queryOptimizer = new QueryOptimizer()
export const connectionPool = new ConnectionPool()

// Batch API endpoint helper
export async function withBatching<T, R>(
  batchKey: string,
  request: T,
  processor: (requests: T[]) => Promise<R[]>
): Promise<R> {
  return requestBatcher.batch(batchKey, request, processor)
}
