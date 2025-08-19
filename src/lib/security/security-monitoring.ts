// 🔍 Security Monitoring System
// Real-time security monitoring, anomaly detection, and incident response

import { z } from 'zod';
import { logger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/server';
import { safeAwait } from '@/lib/supabase/helpers';
import { Redis } from 'ioredis';

// Security event types
export enum SecurityEventType {
  // Authentication events
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',
  PASSWORD_RESET = 'password_reset',
  TWO_FACTOR_ENABLED = '2fa_enabled',
  TWO_FACTOR_DISABLED = '2fa_disabled',
  TWO_FACTOR_FAILED = '2fa_failed',
  
  // Authorization events
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  PRIVILEGE_ESCALATION = 'privilege_escalation',
  ROLE_CHANGE = 'role_change',
  
  // API security events
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  SUSPICIOUS_REQUEST = 'suspicious_request',
  INVALID_INPUT = 'invalid_input',
  CSRF_VIOLATION = 'csrf_violation',
  CORS_VIOLATION = 'cors_violation',
  
  // DeFi security events
  HIGH_VALUE_TRANSACTION = 'high_value_transaction',
  SUSPICIOUS_TRANSACTION = 'suspicious_transaction',
  CONTRACT_INTERACTION = 'contract_interaction',
  SLIPPAGE_EXCEEDED = 'slippage_exceeded',
  MEV_ATTACK_DETECTED = 'mev_attack_detected',
  
  // Data security events
  DATA_BREACH_ATTEMPT = 'data_breach_attempt',
  SQL_INJECTION_ATTEMPT = 'sql_injection_attempt',
  XSS_ATTEMPT = 'xss_attempt',
  PATH_TRAVERSAL_ATTEMPT = 'path_traversal_attempt',
  
  // System events
  CONFIGURATION_CHANGE = 'configuration_change',
  SERVICE_DISRUPTION = 'service_disruption',
  ANOMALY_DETECTED = 'anomaly_detected',
  SECURITY_SCAN_COMPLETED = 'security_scan_completed'
}

// Security event severity levels
export enum SecuritySeverity {
  INFO = 'info',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Security event schema
const SecurityEventSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(SecurityEventType),
  severity: z.nativeEnum(SecuritySeverity),
  userId: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  endpoint: z.string().optional(),
  method: z.string().optional(),
  statusCode: z.number().optional(),
  message: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.date()
});

export type SecurityEvent = z.infer<typeof SecurityEventSchema>;

// Anomaly detection configuration
interface AnomalyDetectionConfig {
  // Request patterns
  maxRequestsPerMinute: number;
  maxFailedLoginsPerHour: number;
  maxUniqueIPsPerUser: number;
  
  // Transaction patterns
  maxTransactionVelocity: number; // transactions per hour
  maxValueChangePercent: number; // % change from average
  
  // Behavioral patterns
  unusualAccessTimeThreshold: number; // hours outside normal
  geoLocationChangeThreshold: number; // km distance
  
  // Machine learning thresholds
  anomalyScoreThreshold: number; // 0-1 scale
  confidenceThreshold: number; // 0-1 scale
}

const DEFAULT_ANOMALY_CONFIG: AnomalyDetectionConfig = {
  maxRequestsPerMinute: 100,
  maxFailedLoginsPerHour: 10,
  maxUniqueIPsPerUser: 5,
  maxTransactionVelocity: 20,
  maxValueChangePercent: 500,
  unusualAccessTimeThreshold: 4,
  geoLocationChangeThreshold: 1000,
  anomalyScoreThreshold: 0.7,
  confidenceThreshold: 0.8
};

// Security monitoring service
export class SecurityMonitoringService {
  private redis: Redis | null = null;
  private eventQueue: SecurityEvent[] = [];
  private anomalyConfig: AnomalyDetectionConfig;
  private alertRules: Map<string, AlertRule> = new Map();
  private incidentCounter: Map<string, number> = new Map();

  constructor(config?: Partial<AnomalyDetectionConfig>) {
    this.anomalyConfig = { ...DEFAULT_ANOMALY_CONFIG, ...config };
    this.initializeRedis();
    this.setupDefaultAlertRules();
    this.startMonitoring();
  }

  private initializeRedis(): void {
    if (process.env.REDIS_URL) {
      this.redis = new Redis(process.env.REDIS_URL);
      this.redis.on('error', (error) => {
        logger.error('Redis connection error', { error: error instanceof Error ? error.message : String(error) });
      });
    }
  }

  /**
   * Log security event
   */
  async logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): Promise<void> {
    const fullEvent: SecurityEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    try {
      // Validate event
      SecurityEventSchema.parse(fullEvent);

      // Store in queue
      this.eventQueue.push(fullEvent);

      // Store in Redis for real-time processing
      if (this.redis) {
        await this.redis.zadd(
          'security_events',
          Date.now(),
          JSON.stringify(fullEvent)
        );
        
        // Publish for real-time subscribers
        await this.redis.publish('security_events_stream', JSON.stringify(fullEvent));
      }

      // Check for anomalies
      const anomalies = await this.detectAnomalies(fullEvent);
      if (anomalies.length > 0) {
        await this.handleAnomalies(fullEvent, anomalies);
      }

      // Check alert rules
      await this.checkAlertRules(fullEvent);

      // Store in database (batch write)
      if (this.eventQueue.length >= 100) {
        await this.flushEventQueue();
      }

      // Log based on severity
      this.logEventBySeverity(fullEvent);

    } catch (error) {
      logger.error('Failed to log security event', { error: error instanceof Error ? error.message : String(error), event });
    }
  }

  /**
   * Detect anomalies in security events
   */
  private async detectAnomalies(event: SecurityEvent): Promise<string[]> {
    const anomalies: string[] = [];

    // Rate anomaly detection
    if (event.userId) {
      const requestRate = await this.getUserRequestRate(event.userId);
      if (requestRate > this.anomalyConfig.maxRequestsPerMinute) {
        anomalies.push('excessive_request_rate');
      }
    }

    // Failed login anomaly
    if (event.type === SecurityEventType.LOGIN_FAILED && event.userId) {
      const failedLogins = await this.getFailedLoginCount(event.userId);
      if (failedLogins > this.anomalyConfig.maxFailedLoginsPerHour) {
        anomalies.push('excessive_failed_logins');
      }
    }

    // IP anomaly detection
    if (event.userId && event.ipAddress) {
      const uniqueIPs = await this.getUniqueIPCount(event.userId);
      if (uniqueIPs > this.anomalyConfig.maxUniqueIPsPerUser) {
        anomalies.push('multiple_ip_addresses');
      }

      // Geo-location anomaly
      const geoAnomaly = await this.detectGeoAnomaly(event.userId, event.ipAddress);
      if (geoAnomaly) {
        anomalies.push('geo_location_anomaly');
      }
    }

    // Transaction anomaly detection
    if (event.type === SecurityEventType.HIGH_VALUE_TRANSACTION && event.metadata) {
      const txAnomaly = await this.detectTransactionAnomaly(event.userId!, event.metadata);
      if (txAnomaly) {
        anomalies.push('transaction_pattern_anomaly');
      }
    }

    // Time-based anomaly
    if (event.userId) {
      const timeAnomaly = await this.detectTimeAnomaly(event.userId, event.timestamp);
      if (timeAnomaly) {
        anomalies.push('unusual_access_time');
      }
    }

    // Pattern matching for known attack signatures
    const attackPattern = this.detectAttackPattern(event);
    if (attackPattern) {
      anomalies.push(attackPattern);
    }

    return anomalies;
  }

  /**
   * Handle detected anomalies
   */
  private async handleAnomalies(event: SecurityEvent, anomalies: string[]): Promise<void> {
    // Calculate combined risk score
    const riskScore = this.calculateRiskScore(event, anomalies);

    // Log anomaly event
    await this.logSecurityEvent({
      type: SecurityEventType.ANOMALY_DETECTED,
      severity: riskScore > 0.8 ? SecuritySeverity.CRITICAL : 
                riskScore > 0.6 ? SecuritySeverity.HIGH :
                riskScore > 0.4 ? SecuritySeverity.MEDIUM : SecuritySeverity.LOW,
      userId: event.userId,
      ipAddress: event.ipAddress,
      message: `Anomalies detected: ${anomalies.join(', ')}`,
      metadata: {
        originalEvent: event,
        anomalies,
        riskScore
      }
    });

    // Take automated actions based on risk score
    if (riskScore > 0.9) {
      await this.blockUser(event.userId!);
      await this.notifySecurityTeam('critical', event, anomalies);
    } else if (riskScore > 0.7) {
      await this.requireAdditionalAuth(event.userId!);
      await this.notifySecurityTeam('high', event, anomalies);
    } else if (riskScore > 0.5) {
      await this.increaseMonitoring(event.userId!);
    }
  }

  /**
   * Calculate risk score based on event and anomalies
   */
  private calculateRiskScore(event: SecurityEvent, anomalies: string[]): number {
    let score = 0;

    // Base score from severity
    const severityScores: Record<SecuritySeverity, number> = {
      [SecuritySeverity.INFO]: 0.1,
      [SecuritySeverity.LOW]: 0.2,
      [SecuritySeverity.MEDIUM]: 0.4,
      [SecuritySeverity.HIGH]: 0.6,
      [SecuritySeverity.CRITICAL]: 0.8
    };
    score += severityScores[event.severity];

    // Anomaly multipliers
    const anomalyWeights: Record<string, number> = {
      'excessive_request_rate': 0.3,
      'excessive_failed_logins': 0.4,
      'multiple_ip_addresses': 0.2,
      'geo_location_anomaly': 0.5,
      'transaction_pattern_anomaly': 0.6,
      'unusual_access_time': 0.2,
      'sql_injection_pattern': 0.8,
      'xss_pattern': 0.7,
      'brute_force_pattern': 0.6
    };

    for (const anomaly of anomalies) {
      score += anomalyWeights[anomaly] || 0.1;
    }

    // Normalize to 0-1 range
    return Math.min(score, 1);
  }

  /**
   * Setup default alert rules
   */
  private setupDefaultAlertRules(): void {
    // Critical alerts
    this.addAlertRule({
      id: 'critical_events',
      name: 'Critical Security Events',
      condition: (event) => event.severity === SecuritySeverity.CRITICAL,
      action: async (event) => {
        await this.notifySecurityTeam('critical', event);
        await this.createIncident(event, 'critical');
      },
      throttle: 0 // No throttling for critical
    });

    // Brute force detection
    this.addAlertRule({
      id: 'brute_force',
      name: 'Brute Force Attack',
      condition: (event) => 
        event.type === SecurityEventType.LOGIN_FAILED &&
        ((event.metadata as Record<string, unknown>)?.failedAttempts as number | undefined) !== undefined &&
        (Number((event.metadata as Record<string, unknown>).failedAttempts) > 5),
      action: async (event) => {
        await this.blockIP(event.ipAddress!);
        await this.notifySecurityTeam('high', event);
      },
      throttle: 300000 // 5 minutes
    });

    // High value transaction alerts
    this.addAlertRule({
      id: 'high_value_tx',
      name: 'High Value Transaction',
      condition: (event) => 
        event.type === SecurityEventType.HIGH_VALUE_TRANSACTION &&
        Number(event.metadata?.valueUSD) > 50000,
      action: async (event) => {
        await this.requireManualApproval(event);
        await this.notifySecurityTeam('medium', event);
      },
      throttle: 60000 // 1 minute
    });

    // Data breach attempts
    this.addAlertRule({
      id: 'data_breach',
      name: 'Data Breach Attempt',
      condition: (event) => 
        [
          SecurityEventType.DATA_BREACH_ATTEMPT,
          SecurityEventType.SQL_INJECTION_ATTEMPT,
          SecurityEventType.XSS_ATTEMPT
        ].includes(event.type),
      action: async (event) => {
        await this.blockIP(event.ipAddress!);
        await this.createIncident(event, 'high');
        await this.notifySecurityTeam('high', event);
      },
      throttle: 0
    });
  }

  /**
   * Check and execute alert rules
   */
  private async checkAlertRules(event: SecurityEvent): Promise<void> {
    for (const rule of this.alertRules.values()) {
      if (rule.condition(event)) {
        // Check throttling
        const lastExecution = rule.lastExecution || 0;
        const now = Date.now();
        
        if (now - lastExecution > rule.throttle) {
          try {
            await rule.action(event);
            rule.lastExecution = now;
          } catch (error) {
            logger.error('Alert rule execution failed', { 
              ruleId: rule.id, 
            error: error instanceof Error ? error.message : String(error)
            });
          }
        }
      }
    }
  }

  /**
   * Real-time monitoring loop
   */
  private startMonitoring(): void {
    // Periodic security scans
    if (process.env.NODE_ENV !== 'test') {
      const t1 = setInterval(() => this.performSecurityScan(), 3600000); // Every hour
      ;(t1 as { unref?: () => void }).unref?.()
    }

    // Periodic metric collection
    if (process.env.NODE_ENV !== 'test') {
      const t2 = setInterval(() => this.collectSecurityMetrics(), 300000); // Every 5 minutes
      ;(t2 as { unref?: () => void }).unref?.()
    }

    // Event queue flush
    if (process.env.NODE_ENV !== 'test') {
      const t3 = setInterval(() => this.flushEventQueue(), 60000); // Every minute
      ;(t3 as { unref?: () => void }).unref?.()
    }

    // Cleanup old data
    if (process.env.NODE_ENV !== 'test') {
      const t4 = setInterval(() => this.cleanupOldData(), 86400000); // Daily
      ;(t4 as { unref?: () => void }).unref?.()
    }
  }

  /**
   * Perform comprehensive security scan
   */
  private async performSecurityScan(): Promise<void> {
    const scanResults: { timestamp: Date; vulnerabilities: string[]; warnings: string[]; info: string[] } = {
      timestamp: new Date(),
      vulnerabilities: [],
      warnings: [],
      info: []
    };

    try {
      // Check for suspicious users
      const suspiciousUsers = await this.identifySuspiciousUsers();
      if (suspiciousUsers.length > 0) {
        scanResults.warnings.push(`Found ${suspiciousUsers.length} suspicious users`);
      }

      // Check for unusual patterns
      const patterns = await this.detectUnusualPatterns();
      scanResults.info.push(...patterns);

      // Check system configuration
      const configIssues = await this.checkSecurityConfiguration();
      scanResults.vulnerabilities.push(...configIssues);

      // Log scan results
      await this.logSecurityEvent({
        type: SecurityEventType.SECURITY_SCAN_COMPLETED,
        severity: scanResults.vulnerabilities.length > 0 ? SecuritySeverity.HIGH : SecuritySeverity.INFO,
        message: 'Security scan completed',
        metadata: scanResults
      });

    } catch (error) {
      logger.error('Security scan failed', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * Helper methods for anomaly detection
   */
  private async getUserRequestRate(userId: string): Promise<number> {
    if (!this.redis) return 0;
    
    const key = `rate:${userId}`;
    const count = await this.redis.get(key);
    return parseInt(count || '0');
  }

  private async getFailedLoginCount(userId: string): Promise<number> {
    if (!this.redis) return 0;
    
    const key = `failed_login:${userId}`;
    const count = await this.redis.get(key);
    return parseInt(count || '0');
  }

  private async getUniqueIPCount(userId: string): Promise<number> {
    if (!this.redis) return 0;
    
    const key = `ips:${userId}`;
    const ips = await this.redis.smembers(key);
    return ips.length;
  }

  private async detectGeoAnomaly(_userId: string, _ipAddress: string): Promise<boolean> {
    // In production, implement IP geolocation and distance calculation
    return false;
  }

  private async detectTransactionAnomaly(userId: string, metadata: Record<string, unknown>): Promise<boolean> {
    // Implement transaction pattern analysis
    const value = Number(metadata.valueUSD || 0);
    const avgValue = await this.getAverageTransactionValue(userId);
    
    if (avgValue > 0) {
      const changePercent = ((value - avgValue) / avgValue) * 100;
      return changePercent > this.anomalyConfig.maxValueChangePercent;
    }
    
    return false;
  }

  private async detectTimeAnomaly(userId: string, timestamp: Date): Promise<boolean> {
    // Check if access time is unusual for this user
    const hour = timestamp.getHours();
    const normalHours = await this.getNormalAccessHours(userId);
    
    if (normalHours.length > 0) {
      const avgHour = normalHours.reduce((a, b) => a + b, 0) / normalHours.length;
      return Math.abs(hour - avgHour) > this.anomalyConfig.unusualAccessTimeThreshold;
    }
    
    return false;
  }

  private detectAttackPattern(event: SecurityEvent): string | null {
    // SQL Injection patterns
    if (event.metadata?.input) {
      const input = String(event.metadata.input);
      if (/(\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b)/i.test(input)) {
        return 'sql_injection_pattern';
      }
      if (/<script|javascript:|onerror=|onclick=/i.test(input)) {
        return 'xss_pattern';
      }
    }
    
    // Brute force pattern
    if (event.type === SecurityEventType.LOGIN_FAILED && 
        event.metadata?.attempts && 
        Number(event.metadata.attempts) > 10) {
      return 'brute_force_pattern';
    }
    
    return null;
  }

  /**
   * Response actions
   */
  private async blockUser(userId: string): Promise<void> {
    logger.warn('Blocking user due to security threat', { userId });
    // Implement user blocking logic
  }

  private async blockIP(ipAddress: string): Promise<void> {
    if (!this.redis) return;
    
    await this.redis.sadd('blocked_ips', ipAddress);
    await this.redis.expire('blocked_ips', 86400); // 24 hours
    
    logger.warn('IP address blocked', { ipAddress });
  }

  private async requireAdditionalAuth(userId: string): Promise<void> {
    if (!this.redis) return;
    
    await this.redis.set(`require_2fa:${userId}`, '1', 'EX', 3600);
    logger.info('Additional authentication required', { userId });
  }

  private async increaseMonitoring(userId: string): Promise<void> {
    if (!this.redis) return;
    
    await this.redis.set(`high_monitoring:${userId}`, '1', 'EX', 86400);
    logger.info('Increased monitoring for user', { userId });
  }

  private async requireManualApproval(event: SecurityEvent): Promise<void> {
    // Implement manual approval workflow
    logger.info('Manual approval required', { event });
  }

  private async createIncident(event: SecurityEvent, priority: string): Promise<void> {
    const incidentId = crypto.randomUUID();
    const incident = {
      id: incidentId,
      priority,
      event,
      createdAt: new Date(),
      status: 'open'
    };
    
    // Store incident
    const supabase = await createClient();
    await safeAwait(
      supabase.from('security_incidents').insert(incident)
    );
    
    logger.error('Security incident created', { incidentId, priority });
  }

  private async notifySecurityTeam(level: string, event: SecurityEvent, anomalies?: string[]): Promise<void> {
    // Implement notification logic (email, Slack, PagerDuty, etc.)
    logger.error('Security team notified', { level, event, anomalies });
  }

  /**
   * Utility methods
   */
  private async getAverageTransactionValue(_userId: string): Promise<number> {
    // Implement historical average calculation
    return 1000; // Placeholder
  }

  private async getNormalAccessHours(_userId: string): Promise<number[]> {
    // Implement user behavior analysis
    return [9, 10, 11, 14, 15, 16, 17]; // Placeholder
  }

  private async identifySuspiciousUsers(): Promise<string[]> {
    // Implement suspicious user identification
    return [];
  }

  private async detectUnusualPatterns(): Promise<string[]> {
    // Implement pattern detection
    return [];
  }

  private async checkSecurityConfiguration(): Promise<string[]> {
    const issues: string[] = [];
    
    // Check environment variables
    if (!process.env.CSRF_SECRET) {
      issues.push('CSRF_SECRET not configured');
    }
    if (!process.env.DEFI_ENCRYPTION_KEY) {
      issues.push('DEFI_ENCRYPTION_KEY not configured');
    }
    
    return issues;
  }

  private async flushEventQueue(): Promise<void> {
    if (this.eventQueue.length === 0) return;
    
    try {
      const supabase = await createClient();
      await safeAwait(
        supabase.from('security_events').insert(this.eventQueue)
      );
      
      logger.info('Security events flushed to database', { 
        count: this.eventQueue.length 
      });
      
      this.eventQueue = [];
    } catch (error) {
      logger.error('Failed to flush security events', { error: error instanceof Error ? error.message : String(error) });
    }
  }

  private async cleanupOldData(): Promise<void> {
    if (!this.redis) return;
    
    // Clean old events
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days
    await this.redis.zremrangebyscore('security_events', '-inf', cutoff);
    
    logger.info('Old security data cleaned up');
  }

  private async collectSecurityMetrics(): Promise<void> {
    // Collect and store security metrics
    const metrics = {
      totalEvents: this.eventQueue.length,
      incidents: this.incidentCounter.size,
      timestamp: new Date()
    };
    
    logger.info('Security metrics collected', { ...metrics, timestamp: metrics.timestamp.toISOString() });
  }

  private logEventBySeverity(event: SecurityEvent): void {
    const logMessage = `Security Event: ${event.type} - ${event.message}`;
    const context = {
      eventId: event.id,
      userId: event.userId,
      ipAddress: event.ipAddress,
      metadata: event.metadata
    };

    switch (event.severity) {
      case SecuritySeverity.CRITICAL:
      case SecuritySeverity.HIGH:
        logger.error(logMessage, context);
        break;
      case SecuritySeverity.MEDIUM:
        logger.warn(logMessage, context);
        break;
      case SecuritySeverity.LOW:
      case SecuritySeverity.INFO:
        logger.info(logMessage, context);
        break;
    }
  }

  /**
   * Public API
   */
  addAlertRule(rule: AlertRule): void {
    this.alertRules.set(rule.id, rule);
  }

  removeAlertRule(ruleId: string): void {
    this.alertRules.delete(ruleId);
  }

  async getSecurityStatus(): Promise<{
    healthy: boolean;
    incidents: number;
    blockedIPs: number;
    suspiciousUsers: number;
  }> {
    const blockedIPs = this.redis ? await this.redis.scard('blocked_ips') : 0;
    const suspiciousUsers = await this.identifySuspiciousUsers();
    
    return {
      healthy: this.incidentCounter.size === 0,
      incidents: this.incidentCounter.size,
      blockedIPs,
      suspiciousUsers: suspiciousUsers.length
    };
  }
}

// Alert rule interface
interface AlertRule {
  id: string;
  name: string;
  condition: (event: SecurityEvent) => boolean;
  action: (event: SecurityEvent) => Promise<void>;
  throttle: number; // milliseconds
  lastExecution?: number;
}

// Export singleton instance
export const securityMonitoring = new SecurityMonitoringService();
