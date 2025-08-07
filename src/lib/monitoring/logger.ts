// Production-ready logging system

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

interface LogContext {
  userId?: string;
  requestId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  // Auth-specific fields
  email?: string;
  error?: string;
  feature?: string;
  pathname?: string;
  userPlan?: string;
  reason?: string;
  path?: string;
  count?: number;
  // Market API fields
  symbols?: number;
  ids?: number;
  convert?: string;
  authenticated?: boolean;
  hasApiKey?: boolean;
  // AI API fields
  query?: string;
  serviceType?: string;
  confidence?: number;
  // Alert API fields
  alertsCount?: number;
  alertId?: string;
  // Dashboard API fields
  activeAlerts?: number;
  // Health API fields
  status?: string;
  responseTime?: number;
  // Learning API fields
  totalAchievements?: number;
  currentStreak?: number;
  achievementType?: string;
  lessonCount?: number;
  categoryProgress?: number;
  totalLessons?: number;
  // Stripe API fields
  customerId?: string;
  subscriptionId?: string;
  planId?: string;
  paymentMethod?: string;
  priceId?: string;
  amount?: number;
  currency?: string;
  invoiceId?: string;
  // Monitoring fields
  timestamp?: string;
  severity?: string;
  component?: string;
  // General fields
  [key: string]: unknown;
  includeFearGreed?: boolean;
  trendingCoinsCount?: number;
  fearGreedValue?: number;
  // WebSocket fields
  connectionId?: string;
  data?: unknown;
  symbol?: string;
  type?: string;
  // Error fields
  stack?: string;
  wsError?: unknown;
}

class Logger {
  private serviceName: string;
  private logLevel: LogLevel;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.logLevel = this.getLogLevelFromEnv();
  }

  private getLogLevelFromEnv(): LogLevel {
    const envLevel = process.env.LOG_LEVEL?.toUpperCase();
    switch (envLevel) {
      case 'DEBUG': return LogLevel.DEBUG;
      case 'INFO': return LogLevel.INFO;
      case 'WARN': return LogLevel.WARN;
      case 'ERROR': return LogLevel.ERROR;
      case 'FATAL': return LogLevel.FATAL;
      default: return process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
    }
  }

  private formatLog(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: LogLevel[level],
      service: this.serviceName,
      message,
      ...context,
      environment: process.env.NODE_ENV || 'development'
    };

    return JSON.stringify(logEntry);
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) return;

    const formattedLog = this.formatLog(level, message, context);

    switch (level) {
      case LogLevel.DEBUG:
      case LogLevel.INFO:
        console.log(formattedLog);
        break;
      case LogLevel.WARN:
        console.warn(formattedLog);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedLog);
        break;
    }

    // In production, send to external logging service
    if (process.env.NODE_ENV === 'production' && level >= LogLevel.ERROR) {
      this.sendToLoggingService(level, message, context);
    }
  }

  private async sendToLoggingService(level: LogLevel, message: string, context?: LogContext): Promise<void> {
    // Integration with external logging service (e.g., Datadog, Loggly, etc.)
    // This is a placeholder for actual implementation
    try {
      // Example: Send to logging endpoint
      if (process.env.LOGGING_ENDPOINT) {
        await fetch(process.env.LOGGING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level: LogLevel[level],
            message,
            context,
            service: this.serviceName,
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (error) {
      console.error('Failed to send log to external service:', error);
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context);
  }

  fatal(message: string, context?: LogContext): void {
    this.log(LogLevel.FATAL, message, context);
  }

  // Utility method for logging API requests
  logApiRequest(method: string, path: string, statusCode: number, duration: number, context?: LogContext): void {
    const message = `${method} ${path} ${statusCode} ${duration}ms`;
    const level = statusCode >= 500 ? LogLevel.ERROR : statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;
    
    this.log(level, message, {
      ...context,
      metadata: {
        ...context?.metadata,
        method,
        path,
        statusCode,
        duration
      }
    });
  }

  // Utility method for logging errors with stack traces
  logError(error: Error, context?: LogContext): void {
    this.error(error.message, {
      ...context,
      metadata: {
        ...context?.metadata,
        stack: error.stack,
        name: error.name
      }
    });
  }
}

// Create singleton instances for different services
export const apiLogger = new Logger('api');
export const dbLogger = new Logger('database');
export const authLogger = new Logger('auth');
export const aiLogger = new Logger('ai');

// Default logger instance for general use
export const logger = new Logger('app');

// Export the Logger class for custom instances
export default Logger;

// Helper function to create a logger instance
export function createLogger(serviceName: string): Logger {
  return new Logger(serviceName);
} 