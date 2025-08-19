import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/supabase/server';
import { SecurityAuditService } from '@/lib/security/security-audit';
import { apiLogger } from '@/lib/monitoring/logger';
import { InputValidator, SecuritySchemas } from '@/lib/security/input-validation';
import { z } from 'zod';

const SecurityMonitorRequest = z.object({
  action: z.enum(['get_events', 'get_metrics', 'resolve_event']),
  filters: z.object({
    userId: z.string().optional(),
    type: z.enum(['login_attempt', 'login_success', 'login_failure', 'password_change', 'account_lockout', 'suspicious_activity', 'data_access', 'admin_action', 'api_abuse', 'security_violation']).optional(),
    severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    resolved: z.boolean().optional(),
    limit: z.number().int().min(1).max(100).optional()
  }).optional(),
  eventId: z.string().uuid().optional()
});

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  try {
    // Check authentication and authorization
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user has admin privileges
    const { data: userData } = await (await (await import('@/lib/supabase/server')).createClient())
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'get_events';
    
    const audit = SecurityAuditService.getInstance();
    
    switch (action) {
      case 'get_events': {
        const typeParam = searchParams.get('type');
        const validTypes = ["login_success", "login_attempt", "suspicious_activity", "login_failure", "password_change", "account_lockout", "data_access", "admin_action", "api_abuse", "security_violation"];
        const severityParam = searchParams.get('severity');
        const validSeverities = ["low", "medium", "high", "critical"];
        
        const filters: {
          userId?: string
          type?: (typeof validTypes)[number]
          severity?: (typeof validSeverities)[number]
          resolved?: boolean
          limit: number
        } = {
          userId: searchParams.get('userId') || undefined,
          type: typeParam && validTypes.includes(typeParam) ? (typeParam as (typeof validTypes)[number]) : undefined,
          severity: severityParam && validSeverities.includes(severityParam) ? (severityParam as (typeof validSeverities)[number]) : undefined,
          resolved: searchParams.get('resolved') ? searchParams.get('resolved') === 'true' : undefined,
          limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50
        };
        
        const events = await audit.getSecurityEvents(filters as Parameters<typeof audit.getSecurityEvents>[0]);
        
        apiLogger.info('Security events retrieved', {
          requestId,
          userId: user.id,
          filtersApplied: filters,
          eventCount: events.length,
          action: 'get_security_events'
        });
        
        return NextResponse.json({ events });
      }
      
      case 'get_metrics': {
        const metrics = await audit.getSecurityMetrics();
        
        apiLogger.info('Security metrics retrieved', {
          requestId,
          userId: user.id,
          totalEvents: metrics.totalEvents,
          unresolvedEvents: metrics.unresolvedEvents,
          action: 'get_security_metrics'
        });
        
        return NextResponse.json({ metrics });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    apiLogger.error('Security monitor API error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'security_monitor_error'
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  try {
    // Check authentication and authorization
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user has admin privileges
    const { data: userData } = await (await (await import('@/lib/supabase/server')).createClient())
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const validation = InputValidator.validateApiInput(body, SecurityMonitorRequest);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    const { action, eventId } = validation.data;
    const audit = SecurityAuditService.getInstance();
    
    switch (action) {
      case 'resolve_event': {
        if (!eventId) {
          return NextResponse.json(
            { error: 'Event ID is required for resolve action' },
            { status: 400 }
          );
        }
        
        const resolved = await audit.resolveSecurityEvent(eventId, user.id);
        
        if (!resolved) {
          return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
          );
        }
        
        apiLogger.info('Security event resolved', {
          requestId,
          userId: user.id,
          eventId,
          action: 'resolve_security_event'
        });
        
        return NextResponse.json({ success: true, message: 'Event resolved successfully' });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    apiLogger.error('Security monitor API error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'security_monitor_error'
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  try {
    // Check authentication and authorization
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user has admin privileges
    const { data: userData } = await (await (await import('@/lib/supabase/server')).createClient())
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { eventId, action } = body;
    
    if (!eventId || !action) {
      return NextResponse.json(
        { error: 'Event ID and action are required' },
        { status: 400 }
      );
    }
    
    const audit = SecurityAuditService.getInstance();
    
    switch (action) {
      case 'resolve':
        const resolved = await audit.resolveSecurityEvent(eventId, user.id);
        
        if (!resolved) {
          return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
          );
        }
        
        apiLogger.info('Security event resolved via PUT', {
          requestId,
          userId: user.id,
          eventId,
          action: 'resolve_security_event_put'
        });
        
        return NextResponse.json({ success: true, message: 'Event resolved successfully' });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    apiLogger.error('Security monitor PUT API error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'security_monitor_put_error'
    });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
