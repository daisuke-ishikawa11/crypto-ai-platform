import { apiLogger } from '@/lib/monitoring/logger';
import { createClient } from '@/lib/supabase/server';

export interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'login_success' | 'login_failure' | 'password_change' | 'account_lockout' | 'suspicious_activity' | 'data_access' | 'admin_action' | 'api_abuse' | 'security_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  ip: string;
  userAgent: string;
  details: Record<string, any>;
  timestamp: Date;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export class SecurityAuditService {
  private static instance: SecurityAuditService;
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 10000;

  private constructor() {}

  public static getInstance(): SecurityAuditService {
    if (!SecurityAuditService.instance) {
      SecurityAuditService.instance = new SecurityAuditService();
    }
    return SecurityAuditService.instance;
  }

  async logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp' | 'resolved'>): Promise<void> {
    const securityEvent: SecurityEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      resolved: false
    };

    // Add to in-memory storage
    this.events.push(securityEvent);
    
    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }

    // Log to monitoring system
    apiLogger.warn('Security event logged', {
      eventId: securityEvent.id,
      type: securityEvent.type,
      severity: securityEvent.severity,
      userId: securityEvent.userId,
      ip: securityEvent.ip,
      details: securityEvent.details,
      action: 'security_event'
    });

    // Store in database for persistence
    try {
      const supabase = await createClient();
      await supabase.from('security_events').insert({
        id: securityEvent.id,
        type: securityEvent.type,
        severity: securityEvent.severity,
        user_id: securityEvent.userId,
        ip: securityEvent.ip,
        user_agent: securityEvent.userAgent,
        details: securityEvent.details,
        metadata: securityEvent.metadata,
        created_at: securityEvent.timestamp.toISOString(),
        resolved: false
      });
    } catch (error) {
      apiLogger.error('Failed to store security event in database', {
        eventId: securityEvent.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'security_event_storage_error'
      });
    }

    // Handle critical events immediately
    if (securityEvent.severity === 'critical') {
      await this.handleCriticalEvent(securityEvent);
    }
  }

  private async handleCriticalEvent(event: SecurityEvent): Promise<void> {
    // Implement immediate response for critical events
    apiLogger.error('CRITICAL SECURITY EVENT', {
      eventId: event.id,
      type: event.type,
      userId: event.userId,
      ip: event.ip,
      details: event.details,
      action: 'critical_security_event'
    });

    // Could trigger alerts, notifications, or automatic lockouts
    // For now, just ensure it's logged with high priority
  }

  async getSecurityEvents(filters?: {
    userId?: string;
    type?: SecurityEvent['type'];
    severity?: SecurityEvent['severity'];
    resolved?: boolean;
    limit?: number;
  }): Promise<SecurityEvent[]> {
    let filteredEvents = this.events;

    if (filters) {
      filteredEvents = this.events.filter(event => {
        if (filters.userId && event.userId !== filters.userId) return false;
        if (filters.type && event.type !== filters.type) return false;
        if (filters.severity && event.severity !== filters.severity) return false;
        if (filters.resolved !== undefined && event.resolved !== filters.resolved) return false;
        return true;
      });
    }

    // Sort by timestamp (newest first)
    filteredEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Apply limit
    if (filters?.limit) {
      filteredEvents = filteredEvents.slice(0, filters.limit);
    }

    return filteredEvents;
  }

  async resolveSecurityEvent(eventId: string, resolvedBy: string): Promise<boolean> {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return false;

    event.resolved = true;
    event.metadata = { ...event.metadata, resolvedBy, resolvedAt: new Date().toISOString() };

    // Update in database
    try {
      const supabase = await createClient();
      await supabase.from('security_events')
        .update({
          resolved: true,
          metadata: event.metadata
        })
        .eq('id', eventId);
    } catch (error) {
      apiLogger.error('Failed to update security event in database', {
        eventId,
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'security_event_update_error'
      });
    }

    return true;
  }

  async getSecurityMetrics(): Promise<{
    totalEvents: number;
    eventsByType: Record<SecurityEvent['type'], number>;
    eventsBySeverity: Record<SecurityEvent['severity'], number>;
    unresolvedEvents: number;
    recentEvents: SecurityEvent[];
  }> {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentEvents = this.events.filter(event => event.timestamp >= last24Hours);
    const unresolvedEvents = this.events.filter(event => !event.resolved).length;

    const eventsByType = this.events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<SecurityEvent['type'], number>);

    const eventsBySeverity = this.events.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<SecurityEvent['severity'], number>);

    return {
      totalEvents: this.events.length,
      eventsByType,
      eventsBySeverity,
      unresolvedEvents,
      recentEvents: recentEvents.slice(0, 10)
    };
  }
}

// Security event logging helpers
export async function logLoginAttempt(
  userId: string | null,
  ip: string,
  userAgent: string,
  success: boolean,
  details: Record<string, any> = {}
): Promise<void> {
  const audit = SecurityAuditService.getInstance();
  
  await audit.logSecurityEvent({
    type: success ? 'login_success' : 'login_failure',
    severity: success ? 'low' : 'medium',
    userId: userId || undefined,
    ip,
    userAgent,
    details: {
      ...details,
      timestamp: new Date().toISOString()
    }
  });
}

export async function logSuspiciousActivity(
  ip: string,
  userAgent: string,
  activity: string,
  details: Record<string, any> = {}
): Promise<void> {
  const audit = SecurityAuditService.getInstance();
  
  await audit.logSecurityEvent({
    type: 'suspicious_activity',
    severity: 'high',
    ip,
    userAgent,
    details: {
      activity,
      ...details,
      timestamp: new Date().toISOString()
    }
  });
}

export async function logDataAccess(
  userId: string,
  ip: string,
  userAgent: string,
  resource: string,
  action: string,
  details: Record<string, any> = {}
): Promise<void> {
  const audit = SecurityAuditService.getInstance();
  
  await audit.logSecurityEvent({
    type: 'data_access',
    severity: 'low',
    userId,
    ip,
    userAgent,
    details: {
      resource,
      action,
      ...details,
      timestamp: new Date().toISOString()
    }
  });
}

export async function logApiAbuse(
  userId: string | null,
  ip: string,
  userAgent: string,
  endpoint: string,
  details: Record<string, any> = {}
): Promise<void> {
  const audit = SecurityAuditService.getInstance();
  
  await audit.logSecurityEvent({
    type: 'api_abuse',
    severity: 'high',
    userId: userId || undefined,
    ip,
    userAgent,
    details: {
      endpoint,
      ...details,
      timestamp: new Date().toISOString()
    }
  });
}

export async function logSecurityViolation(
  userId: string | null,
  ip: string,
  userAgent: string,
  violation: string,
  details: Record<string, any> = {}
): Promise<void> {
  const audit = SecurityAuditService.getInstance();
  
  await audit.logSecurityEvent({
    type: 'security_violation',
    severity: 'critical',
    userId: userId || undefined,
    ip,
    userAgent,
    details: {
      violation,
      ...details,
      timestamp: new Date().toISOString()
    }
  });
}