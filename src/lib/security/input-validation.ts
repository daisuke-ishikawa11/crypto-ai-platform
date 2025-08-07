import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Common validation schemas
export const SecuritySchemas = {
  // User input validation
  email: z.string().email().max(254).toLowerCase(),
  password: z.string().min(8).max(128).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),
  
  // API input validation
  apiKey: z.string().min(10).max(256).regex(/^[a-zA-Z0-9_-]+$/, 'API key format is invalid'),
  cryptoSymbol: z.string().min(2).max(20).regex(/^[A-Z0-9]+$/, 'Crypto symbol must be uppercase letters and numbers only'),
  planId: z.enum(['free', 'mini', 'basic', 'standard', 'pro']),
  
  // Content validation
  title: z.string().min(1).max(200).trim(),
  description: z.string().max(2000).trim(),
  url: z.string().url().max(2048),
  
  // Numeric validation
  amount: z.number().min(0).max(1000000),
  percentage: z.number().min(0).max(100),
  limit: z.number().int().min(1).max(1000),
  
  // Date validation
  dateString: z.string().datetime(),
  
  // File validation
  fileName: z.string().max(255).regex(/^[a-zA-Z0-9._-]+$/, 'Invalid file name'),
  fileSize: z.number().int().min(1).max(50 * 1024 * 1024), // 50MB max
  
  // JSON validation
  jsonString: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, 'Invalid JSON format'),
  
  // IP Address validation
  ipAddress: z.string().ip(),
  
  // Request ID validation
  requestId: z.string().uuid(),
  
  // Pagination validation
  page: z.number().int().min(1).max(1000),
  pageSize: z.number().int().min(1).max(100)
};

// HTML sanitization
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false
  });
}

// SQL injection prevention
export function sanitizeSqlInput(input: string): string {
  // Remove or escape dangerous SQL characters
  return input
    .replace(/['"\\;]/g, '') // Remove quotes and semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove block comment start
    .replace(/\*\//g, '') // Remove block comment end
    .replace(/\bUNION\b/gi, '') // Remove UNION keyword
    .replace(/\bSELECT\b/gi, '') // Remove SELECT keyword
    .replace(/\bDROP\b/gi, '') // Remove DROP keyword
    .replace(/\bDELETE\b/gi, '') // Remove DELETE keyword
    .replace(/\bINSERT\b/gi, '') // Remove INSERT keyword
    .replace(/\bUPDATE\b/gi, '') // Remove UPDATE keyword
    .trim();
}

// XSS prevention
export function sanitizeXssInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/\bscript\b/gi, '') // Remove script tags
    .replace(/\balert\b/gi, '') // Remove alert function
    .replace(/\bconfirm\b/gi, '') // Remove confirm function
    .replace(/\bprompt\b/gi, '') // Remove prompt function
    .trim();
}

// Path traversal prevention
export function sanitizeFilePath(path: string): string {
  return path
    .replace(/\.\./g, '') // Remove parent directory references
    .replace(/[<>:"|?*]/g, '') // Remove invalid filename characters
    .replace(/^[\/\\]/, '') // Remove leading slashes
    .replace(/[\/\\]$/, '') // Remove trailing slashes
    .trim();
}

// Input validation middleware
export class InputValidator {
  static validateAndSanitize<T>(
    data: unknown,
    schema: z.ZodSchema<T>,
    options: {
      sanitizeHtml?: boolean;
      sanitizeXss?: boolean;
      sanitizeSql?: boolean;
      sanitizeFilePath?: boolean;
    } = {}
  ): { success: true; data: T } | { success: false; error: string } {
    try {
      // Pre-validation sanitization
      let sanitizedData = data;
      
      if (typeof data === 'string') {
        if (options.sanitizeHtml) {
          sanitizedData = sanitizeHtml(data);
        }
        if (options.sanitizeXss) {
          sanitizedData = sanitizeXssInput(data as string);
        }
        if (options.sanitizeSql) {
          sanitizedData = sanitizeSqlInput(data as string);
        }
        if (options.sanitizeFilePath) {
          sanitizedData = sanitizeFilePath(data as string);
        }
      } else if (typeof data === 'object' && data !== null) {
        // Recursively sanitize object properties
        sanitizedData = sanitizeObject(data, options);
      }
      
      // Validate with schema
      const result = schema.safeParse(sanitizedData);
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { 
          success: false, 
          error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Validation failed'
      };
    }
  }
  
  static validateApiInput<T>(
    data: unknown,
    schema: z.ZodSchema<T>
  ): { success: true; data: T } | { success: false; error: string } {
    return this.validateAndSanitize(data, schema, {
      sanitizeHtml: true,
      sanitizeXss: true,
      sanitizeSql: true
    });
  }
  
  static validateUserInput<T>(
    data: unknown,
    schema: z.ZodSchema<T>
  ): { success: true; data: T } | { success: false; error: string } {
    return this.validateAndSanitize(data, schema, {
      sanitizeHtml: true,
      sanitizeXss: true,
      sanitizeSql: true,
      sanitizeFilePath: true
    });
  }
}

// Helper function to sanitize object properties
function sanitizeObject(obj: any, options: {
  sanitizeHtml?: boolean;
  sanitizeXss?: boolean;
  sanitizeSql?: boolean;
  sanitizeFilePath?: boolean;
}): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, options));
  }
  
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      let sanitizedValue = value;
      
      if (options.sanitizeHtml) {
        sanitizedValue = sanitizeHtml(sanitizedValue);
      }
      if (options.sanitizeXss) {
        sanitizedValue = sanitizeXssInput(sanitizedValue);
      }
      if (options.sanitizeSql) {
        sanitizedValue = sanitizeSqlInput(sanitizedValue);
      }
      if (options.sanitizeFilePath) {
        sanitizedValue = sanitizeFilePath(sanitizedValue);
      }
      
      sanitized[key] = sanitizedValue;
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, options);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

// Rate limiting schemas
export const RateLimitSchemas = {
  aiRequest: z.object({
    prompt: z.string().min(1).max(4000),
    model: z.string().optional(),
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().int().min(1).max(4000).optional()
  }),
  
  marketRequest: z.object({
    symbol: SecuritySchemas.cryptoSymbol.optional(),
    interval: z.enum(['1m', '5m', '15m', '30m', '1h', '4h', '1d']).optional(),
    limit: SecuritySchemas.limit.optional()
  }),
  
  portfolioRequest: z.object({
    symbols: z.array(SecuritySchemas.cryptoSymbol).max(20),
    weights: z.array(z.number().min(0).max(1)).max(20),
    method: z.enum(['max_sharpe', 'min_variance', 'risk_parity', 'equal_weight']).optional()
  }),
  
  riskRequest: z.object({
    portfolio: z.array(z.object({
      symbol: SecuritySchemas.cryptoSymbol,
      weight: z.number().min(0).max(1),
      amount: z.number().min(0)
    })).min(1).max(20),
    timeframe: z.enum(['1d', '7d', '30d', '90d', '1y']).optional(),
    confidence: z.number().min(0.9).max(0.99).optional()
  })
};

// Security headers validation
export function validateSecurityHeaders(headers: Headers): {
  valid: boolean;
  missing: string[];
  warnings: string[];
} {
  const requiredHeaders = [
    'x-content-type-options',
    'x-frame-options',
    'x-xss-protection',
    'referrer-policy',
    'strict-transport-security'
  ];
  
  const missing: string[] = [];
  const warnings: string[] = [];
  
  for (const header of requiredHeaders) {
    const value = headers.get(header);
    if (!value) {
      missing.push(header);
    } else {
      // Check for secure values
      if (header === 'x-frame-options' && value !== 'DENY') {
        warnings.push(`${header} should be set to DENY for maximum security`);
      }
      if (header === 'x-content-type-options' && value !== 'nosniff') {
        warnings.push(`${header} should be set to nosniff`);
      }
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
    warnings
  };
}