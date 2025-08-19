import { apiLogger } from '@/lib/monitoring/logger';

interface RateLimitEntry {
  count: number;
  resetTime: number;
  windowStart: number;
}

interface RateLimitResult {
  blocked: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter: number;
}

// In-memory rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configurations
const RATE_LIMITS = {
  '/api/ai/': { limit: 10, windowMs: 60000 }, // 10 requests per minute for AI endpoints
  '/api/market/': { limit: 60, windowMs: 60000 }, // 60 requests per minute for market data
  '/api/portfolio/': { limit: 20, windowMs: 60000 }, // 20 requests per minute for portfolio
  '/api/risk/': { limit: 15, windowMs: 60000 }, // 15 requests per minute for risk analysis
  '/api/auth/': { limit: 5, windowMs: 60000 }, // 5 requests per minute for auth endpoints
  '/api/': { limit: 100, windowMs: 60000 }, // Default: 100 requests per minute
} as const;

function getRateLimitConfig(pathname: string): { limit: number; windowMs: number } {
  // Find the most specific matching pattern
  const sortedPatterns = Object.keys(RATE_LIMITS).sort((a, b) => b.length - a.length);
  
  for (const pattern of sortedPatterns) {
    if (pathname.startsWith(pattern)) {
      return RATE_LIMITS[pattern as keyof typeof RATE_LIMITS];
    }
  }
  
  // Default fallback
  return RATE_LIMITS['/api/'];
}

export async function checkRateLimit(
  ip: string,
  userAgent: string,
  pathname: string
): Promise<RateLimitResult> {
  const config = getRateLimitConfig(pathname);
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  
  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  
  if (!entry || now >= entry.resetTime) {
    // Create new window
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
      windowStart: now
    };
    rateLimitStore.set(key, entry);
  }
  
  // Increment count
  entry.count++;
  
  const remaining = Math.max(0, config.limit - entry.count);
  const blocked = entry.count > config.limit;
  const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
  
  // Log rate limit activity
  if (blocked) {
    apiLogger.warn('Rate limit exceeded', {
      ip,
      userAgent,
      pathname,
      count: entry.count,
      limit: config.limit,
      windowMs: config.windowMs,
      action: 'rate_limit_block'
    });
  }
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance
    cleanupOldEntries();
  }
  
  return {
    blocked,
    limit: config.limit,
    remaining,
    resetTime: entry.resetTime,
    retryAfter
  };
}

function cleanupOldEntries(): void {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetTime) {
      keysToDelete.push(key);
    }
  }
  
  for (const key of keysToDelete) {
    rateLimitStore.delete(key);
  }
  
  if (keysToDelete.length > 0) {
    apiLogger.info('Cleaned up rate limit entries', {
      deletedCount: keysToDelete.length,
      remainingCount: rateLimitStore.size,
      action: 'rate_limit_cleanup'
    });
  }
}

// Advanced rate limiting with user-specific limits
export async function checkUserRateLimit(
  userId: string,
  action: string,
  userPlan: string = 'free'
): Promise<RateLimitResult> {
  const planLimits = {
    free: { limit: 10, windowMs: 60000 },
    mini: { limit: 25, windowMs: 60000 },
    basic: { limit: 50, windowMs: 60000 },
    standard: { limit: 100, windowMs: 60000 },
    pro: { limit: 200, windowMs: 60000 }
  };
  
  const config = planLimits[userPlan as keyof typeof planLimits] || planLimits.free;
  const key = `user:${userId}:${action}`;
  const now = Date.now();
  
  let entry = rateLimitStore.get(key);
  
  if (!entry || now >= entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
      windowStart: now
    };
    rateLimitStore.set(key, entry);
  }
  
  entry.count++;
  
  const remaining = Math.max(0, config.limit - entry.count);
  const blocked = entry.count > config.limit;
  const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
  
  if (blocked) {
    apiLogger.warn('User rate limit exceeded', {
      userId,
      action,
      userPlan,
      count: entry.count,
      limit: config.limit,
      type: 'user_rate_limit_block'
    });
  }
  
  return {
    blocked,
    limit: config.limit,
    remaining,
    resetTime: entry.resetTime,
    retryAfter
  };
}

// Security: Detect suspicious patterns
export function detectSuspiciousActivity(
  ip: string,
  userAgent: string,
  pathname: string
): { suspicious: boolean; reason?: string } {
  
  // Check for bot-like user agents
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scan/i,
    /hack/i,
    /test/i,
    /curl/i,
    /wget/i,
    /python/i,
    /script/i
  ];
  
  for (const pattern of botPatterns) {
    if (pattern.test(userAgent)) {
      return { suspicious: true, reason: 'Bot-like user agent detected' };
    }
  }
  
  // Check for path traversal attempts
  if (pathname.includes('..') || pathname.includes('%2e%2e')) {
    return { suspicious: true, reason: 'Path traversal attempt detected' };
  }
  
  // Check for SQL injection patterns
  const sqlPatterns = [
    /union.*select/i,
    /drop.*table/i,
    /insert.*into/i,
    /delete.*from/i,
    /update.*set/i,
    /exec.*xp_/i,
    /script.*alert/i,
    /<script/i,
    /javascript:/i
  ];
  
  for (const pattern of sqlPatterns) {
    if (pattern.test(pathname)) {
      return { suspicious: true, reason: 'SQL injection or XSS attempt detected' };
    }
  }
  
  return { suspicious: false };
}

// Export rateLimit function for compatibility
export async function rateLimit(
  identifier: string, 
  limit: number = 60, 
  windowMs: number = 60000
): Promise<{ blocked: boolean; remaining: number; resetTime: number }> {
  const key = `rate_limit:${identifier}`;
  const now = Date.now();
  
  let entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetTime) {
    entry = { count: 0, resetTime: now + windowMs, windowStart: now };
    rateLimitStore.set(key, entry);
  }
  
  entry.count++;
  
  const blocked = entry.count > limit;
  const remaining = Math.max(0, limit - entry.count);
  
  return {
    blocked,
    remaining,
    resetTime: entry.resetTime
  };
}

// RateLimiter class for compatibility
export class RateLimiter {
  private static instance: RateLimiter;
  
  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }
  
  async isAllowed(identifier: string, limit: number = 60, windowMs: number = 60000): Promise<boolean> {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    
    let entry = rateLimitStore.get(key);
    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime: now + windowMs, windowStart: now };
      rateLimitStore.set(key, entry);
    }
    
    entry.count++;
    
    return entry.count <= limit;
  }
  
  async checkUserRateLimit(userId: string, action: string, userPlan: string = 'free'): Promise<RateLimitResult> {
    return checkUserRateLimit(userId, action, userPlan);
  }
  
  detectSuspiciousActivity(ip: string, userAgent: string, pathname: string): { suspicious: boolean; reason?: string } {
    return detectSuspiciousActivity(ip, userAgent, pathname);
  }
}