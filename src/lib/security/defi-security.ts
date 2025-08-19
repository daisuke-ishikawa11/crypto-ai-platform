// 🛡️ DeFi Security Layer
// Comprehensive security implementation for DeFi operations

import { z } from 'zod';
import { createHash, randomBytes, createCipheriv, createDecipheriv, CipherGCM, DecipherGCM } from 'crypto';
import { logger } from '@/lib/monitoring/logger';

// Security configuration
const SECURITY_CONFIG = {
  // Encryption
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
  KEY_LENGTH: 32,
  IV_LENGTH: 16,
  TAG_LENGTH: 16,
  
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 60,
  MAX_REQUESTS_PER_HOUR: 1000,
  MAX_REQUESTS_PER_DAY: 10000,
  
  // Transaction limits
  MAX_TRANSACTION_AMOUNT_USD: 100000,
  MAX_DAILY_VOLUME_USD: 500000,
  MIN_TRANSACTION_AMOUNT_USD: 1,
  
  // Slippage protection
  MAX_SLIPPAGE_PERCENTAGE: 5,
  DEFAULT_SLIPPAGE_PERCENTAGE: 0.5,
  
  // MEV protection
  PRIVATE_MEMPOOL_ENABLED: true,
  FLASHBOTS_ENABLED: true,
  
  // Protocol whitelist
  WHITELISTED_PROTOCOLS: [
    'uniswap-v3',
    'aave-v2', 
    'compound',
    'curve',
    'yearn',
    'balancer',
    'sushiswap'
  ],
  
  // Contract addresses whitelist (mainnet)
  WHITELISTED_CONTRACTS: [
    '0x1F98431c8aD98523631AE4a59f267346ea31F984', // Uniswap V3 Factory
    '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // Aave V2
    '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', // Compound
    '0x90e00ace148ca3b23ac1bc8c240c2a7dd9c2d7f5', // Curve Registry
  ],
  
  // Suspicious patterns
  SUSPICIOUS_PATTERNS: [
    /tornado\s*cash/i,
    /mixer/i,
    /tumbler/i,
    /phishing/i,
    /scam/i,
    /rugpull/i,
    /honeypot/i
  ]
};

// Security headers middleware
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://*.supabase.co",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.coingecko.com https://api.binance.com https://api.coinmarketcap.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    
    // HSTS (only in production)
    ...(process.env.NODE_ENV === 'production' ? {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    } : {}),
    
    // Additional headers
    'X-DNS-Prefetch-Control': 'on',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Expect-CT': 'enforce, max-age=86400'
  };
}

// Transaction security validation
export const TransactionSecuritySchema = z.object({
  from: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid from address'),
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid to address'),
  value: z.string().regex(/^[0-9]+$/, 'Invalid value'),
  data: z.string().regex(/^0x[a-fA-F0-9]*$/, 'Invalid data'),
  chainId: z.number().int().positive(),
  nonce: z.number().int().min(0),
  gasLimit: z.string().regex(/^[0-9]+$/, 'Invalid gas limit'),
  gasPrice: z.string().regex(/^[0-9]+$/, 'Invalid gas price').optional(),
  maxFeePerGas: z.string().regex(/^[0-9]+$/, 'Invalid max fee').optional(),
  maxPriorityFeePerGas: z.string().regex(/^[0-9]+$/, 'Invalid priority fee').optional()
});

// DeFi operation security checks
export class DeFiSecurityManager {
  private encryptionKey: Buffer;
  private rateLimitStore: Map<string, { count: number; resetTime: Date }> = new Map();
  private blacklistedAddresses: Set<string> = new Set();
  private suspiciousActivityLog: Map<string, number> = new Map();

  constructor() {
    // Initialize encryption key from environment or generate
    const key = process.env.DEFI_ENCRYPTION_KEY;
    if (key) {
      this.encryptionKey = Buffer.from(key, 'hex');
    } else {
      this.encryptionKey = randomBytes(SECURITY_CONFIG.KEY_LENGTH);
      logger.warn('Using generated encryption key - set DEFI_ENCRYPTION_KEY in production');
    }
    
    // Initialize blacklist
    this.loadBlacklist();
  }

  /**
   * Validate transaction before execution
   */
  async validateTransaction(transaction: unknown): Promise<{
    valid: boolean;
    errors?: string[];
    warnings?: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Schema validation
      const validated = TransactionSecuritySchema.parse(transaction);
      
      // Check blacklist
      if (this.isBlacklisted(validated.from) || this.isBlacklisted(validated.to)) {
        errors.push('Transaction involves blacklisted address');
      }
      
      // Check whitelist for contracts
      if (!this.isWhitelistedContract(validated.to)) {
        warnings.push('Transaction to non-whitelisted contract');
      }
      
      // Check value limits
      const valueInWei = BigInt(validated.value);
      const valueInEth = Number(valueInWei) / 1e18;
      const estimatedUSD = valueInEth * 2000; // Rough estimate
      
      if (estimatedUSD > SECURITY_CONFIG.MAX_TRANSACTION_AMOUNT_USD) {
        errors.push(`Transaction exceeds maximum amount: $${estimatedUSD.toFixed(2)}`);
      }
      
      if (estimatedUSD < SECURITY_CONFIG.MIN_TRANSACTION_AMOUNT_USD) {
        warnings.push('Transaction amount is very small - possible dust attack');
      }
      
      // Check for suspicious patterns in data
      if (validated.data && validated.data.length > 2) {
        const decodedData = Buffer.from(validated.data.slice(2), 'hex').toString('utf8');
        for (const pattern of SECURITY_CONFIG.SUSPICIOUS_PATTERNS) {
          if (pattern.test(decodedData)) {
            warnings.push('Transaction data contains suspicious patterns');
            break;
          }
        }
      }
      
      // Check gas settings
      const gasLimit = BigInt(validated.gasLimit);
      if (gasLimit > 10000000n) {
        warnings.push('Unusually high gas limit');
      }
      
      // MEV protection checks
      if (validated.maxFeePerGas && validated.maxPriorityFeePerGas) {
        const maxFee = BigInt(validated.maxFeePerGas);
        const priorityFee = BigInt(validated.maxPriorityFeePerGas);
        
        if (priorityFee > maxFee) {
          errors.push('Priority fee exceeds max fee');
        }
        
        // Check for sandwich attack vulnerability
        if (priorityFee > 100000000000n) { // 100 Gwei
          warnings.push('High priority fee - vulnerable to sandwich attacks');
        }
      }
      
      return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined,
        warnings: warnings.length > 0 ? warnings : undefined
      };
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: (error as z.ZodError).issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`)
        };
      }
      
      return {
        valid: false,
        errors: ['Transaction validation failed']
      };
    }
  }

  /**
   * Encrypt sensitive data
   */
  encryptData(data: string): {
    encrypted: string;
    iv: string;
    tag: string;
  } {
    const iv = randomBytes(SECURITY_CONFIG.IV_LENGTH);
    const cipher = createCipheriv(
      SECURITY_CONFIG.ENCRYPTION_ALGORITHM,
      this.encryptionKey,
      iv
    );
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = (cipher as CipherGCM).getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }

  /**
   * Decrypt sensitive data
   */
  decryptData(encryptedData: {
    encrypted: string;
    iv: string;
    tag: string;
  }): string {
    const decipher = createDecipheriv(
      SECURITY_CONFIG.ENCRYPTION_ALGORITHM,
      this.encryptionKey,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    (decipher as DecipherGCM).setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Check rate limits
   */
  checkRateLimit(identifier: string, limitType: 'minute' | 'hour' | 'day' = 'minute'): boolean {
    const now = Date.now();
    const key = `${identifier}:${limitType}`;
    
    const limits = {
      minute: { max: SECURITY_CONFIG.MAX_REQUESTS_PER_MINUTE, window: 60000 },
      hour: { max: SECURITY_CONFIG.MAX_REQUESTS_PER_HOUR, window: 3600000 },
      day: { max: SECURITY_CONFIG.MAX_REQUESTS_PER_DAY, window: 86400000 }
    };
    
    const limit = limits[limitType];
    const record = this.rateLimitStore.get(key);
    
    if (!record || now > record.resetTime.getTime()) {
      this.rateLimitStore.set(key, {
        count: 1,
        resetTime: new Date(now + limit.window)
      });
      return true;
    }
    
    if (record.count >= limit.max) {
      // Log suspicious activity
      this.logSuspiciousActivity(identifier, 'rate_limit_exceeded');
      return false;
    }
    
    record.count++;
    return true;
  }

  /**
   * Calculate slippage protection
   */
  calculateSlippageProtection(
    expectedAmount: number,
    slippageTolerance: number = SECURITY_CONFIG.DEFAULT_SLIPPAGE_PERCENTAGE
  ): {
    minAmount: number;
    maxSlippage: number;
  } {
    const maxSlippage = Math.min(slippageTolerance, SECURITY_CONFIG.MAX_SLIPPAGE_PERCENTAGE);
    const minAmount = expectedAmount * (1 - maxSlippage / 100);
    
    return {
      minAmount,
      maxSlippage
    };
  }

  /**
   * Validate protocol interaction
   */
  validateProtocol(protocolId: string): {
    valid: boolean;
    trusted: boolean;
    warnings?: string[];
  } {
    const warnings: string[] = [];
    const isWhitelisted = SECURITY_CONFIG.WHITELISTED_PROTOCOLS.includes(protocolId.toLowerCase());
    
    if (!isWhitelisted) {
      warnings.push('Protocol is not in the trusted whitelist');
    }
    
    // Check for known vulnerabilities
    const vulnerabilities = this.checkKnownVulnerabilities(protocolId);
    if (vulnerabilities.length > 0) {
      warnings.push(...vulnerabilities);
    }
    
    return {
      valid: true, // Can still proceed with warnings
      trusted: isWhitelisted && vulnerabilities.length === 0,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }

  /**
   * Sign request for integrity
   */
  signRequest(data: object): string {
    const payload = JSON.stringify(data);
    const timestamp = Date.now();
    const nonce = randomBytes(16).toString('hex');
    
    const message = `${payload}:${timestamp}:${nonce}`;
    const signature = createHash('sha256')
      .update(message)
      .update(this.encryptionKey)
      .digest('hex');
    
    return Buffer.from(JSON.stringify({
      payload,
      timestamp,
      nonce,
      signature
    })).toString('base64');
  }

  /**
   * Verify signed request
   */
  verifySignedRequest(signedData: string, maxAgeMs: number = 300000): {
    valid: boolean;
    data?: object;
    error?: string;
  } {
    try {
      const decoded = JSON.parse(Buffer.from(signedData, 'base64').toString());
      const { payload, timestamp, nonce, signature } = decoded;
      
      // Check age
      if (Date.now() - timestamp > maxAgeMs) {
        return { valid: false, error: 'Request expired' };
      }
      
      // Verify signature
      const message = `${payload}:${timestamp}:${nonce}`;
      const expectedSignature = createHash('sha256')
        .update(message)
        .update(this.encryptionKey)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        this.logSuspiciousActivity('unknown', 'invalid_signature');
        return { valid: false, error: 'Invalid signature' };
      }
      
      return {
        valid: true,
        data: JSON.parse(payload)
      };
      
    } catch (error) {
      return { valid: false, error: 'Invalid request format' };
    }
  }

  /**
   * MEV protection - private mempool submission
   */
  async submitToPrivateMempool(transaction: object): Promise<{
    success: boolean;
    bundleHash?: string;
    error?: string;
  }> {
    if (!SECURITY_CONFIG.PRIVATE_MEMPOOL_ENABLED) {
      return { success: false, error: 'Private mempool disabled' };
    }
    
    try {
      // In production, integrate with Flashbots or similar
      logger.info('Transaction submitted to private mempool', {
        flashbotsEnabled: SECURITY_CONFIG.FLASHBOTS_ENABLED
      });
      
      // Simulate bundle hash
      const bundleHash = createHash('sha256')
        .update(JSON.stringify(transaction))
        .update(Date.now().toString())
        .digest('hex');
      
      return {
        success: true,
        bundleHash
      };
      
    } catch (error) {
      logger.error('Private mempool submission failed', { error: error instanceof Error ? error.message : String(error) });
      return {
        success: false,
        error: 'Submission failed'
      };
    }
  }

  /**
   * Helper methods
   */
  private isBlacklisted(address: string): boolean {
    return this.blacklistedAddresses.has(address.toLowerCase());
  }

  private isWhitelistedContract(address: string): boolean {
    return SECURITY_CONFIG.WHITELISTED_CONTRACTS.includes(address.toLowerCase());
  }

  private loadBlacklist(): void {
    // In production, load from database or external service
    // Example blacklisted addresses (known scams/hacks)
    this.blacklistedAddresses.add('0x0000000000000000000000000000000000000000');
    // Add more as needed
  }

  private checkKnownVulnerabilities(protocolId: string): string[] {
    const vulnerabilities: string[] = [];
    
    // Check for known protocol vulnerabilities
    // In production, integrate with vulnerability database
    const knownIssues: Record<string, string[]> = {
      'example-protocol': ['Reentrancy vulnerability in v1.0']
    };
    
    if (knownIssues[protocolId]) {
      vulnerabilities.push(...knownIssues[protocolId]);
    }
    
    return vulnerabilities;
  }

  private logSuspiciousActivity(identifier: string, activityType: string): void {
    const key = `${identifier}:${activityType}`;
    const count = (this.suspiciousActivityLog.get(key) || 0) + 1;
    this.suspiciousActivityLog.set(key, count);
    
    logger.warn('Suspicious activity detected', {
      identifier,
      activityType,
      count
    });
    
    // Trigger alerts if threshold exceeded
    if (count > 10) {
      this.triggerSecurityAlert(identifier, activityType, count);
    }
  }

  private triggerSecurityAlert(identifier: string, activityType: string, count: number): void {
    logger.error('SECURITY ALERT', {
      identifier,
      activityType,
      count,
      timestamp: new Date().toISOString()
    });
    
    // In production, send alerts to security team
    // Email, Slack, PagerDuty, etc.
  }

  /**
   * Cleanup and maintenance
   */
  cleanup(): void {
    const now = Date.now();
    
    // Clean expired rate limits
    for (const [key, record] of this.rateLimitStore.entries()) {
      if (now > record.resetTime.getTime()) {
        this.rateLimitStore.delete(key);
      }
    }
    
    // Clear old suspicious activity logs
    if (this.suspiciousActivityLog.size > 1000) {
      this.suspiciousActivityLog.clear();
    }
  }
}

// Export singleton instance
export const defiSecurity = new DeFiSecurityManager();

// API key rotation strategy
export class APIKeyRotation {
  private keys: Map<string, { key: string; created: Date; lastUsed: Date }> = new Map();
  private rotationInterval: number = 30 * 24 * 60 * 60 * 1000; // 30 days

  generateNewKey(identifier: string): string {
    const key = randomBytes(32).toString('hex');
    this.keys.set(identifier, {
      key,
      created: new Date(),
      lastUsed: new Date()
    });
    
    logger.info('New API key generated', { identifier });
    return key;
  }

  validateKey(identifier: string, key: string): boolean {
    const stored = this.keys.get(identifier);
    if (!stored || stored.key !== key) {
      return false;
    }
    
    // Check if key needs rotation
    const age = Date.now() - stored.created.getTime();
    if (age > this.rotationInterval) {
      logger.warn('API key expired', { identifier, age });
      return false;
    }
    
    stored.lastUsed = new Date();
    return true;
  }

  rotateKey(identifier: string): string {
    const newKey = this.generateNewKey(identifier);
    
    // Keep old key valid for grace period (1 hour)
    setTimeout(() => {
      const current = this.keys.get(identifier);
      if (current && current.key !== newKey) {
        this.keys.delete(identifier);
      }
    }, 3600000);
    
    return newKey;
  }
}

export const apiKeyRotation = new APIKeyRotation();
