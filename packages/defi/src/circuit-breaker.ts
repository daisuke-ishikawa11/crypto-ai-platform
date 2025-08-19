// ⚡ Circuit Breaker Pattern for DeFi API Calls (package version)
import { logger } from './logger';

export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number; // milliseconds
  monitoringPeriod: number; // milliseconds
  minimumRequests: number;
  successThreshold: number; // for half-open state
}

export enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half-open'
}

export interface CircuitBreakerMetrics {
  state: CircuitState;
  failures: number;
  successes: number;
  totalRequests: number;
  failureRate: number;
  lastFailureTime?: Date;
  lastSuccessTime?: Date;
  stateChangedAt: Date;
  nextAttemptTime?: Date;
}

export interface CircuitBreakerEvent {
  type: 'state_change' | 'failure' | 'success' | 'threshold_exceeded';
  circuitName: string;
  previousState?: CircuitState;
  newState?: CircuitState;
  metrics: CircuitBreakerMetrics;
  timestamp: Date;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures = 0;
  private successes = 0;
  private totalRequests = 0;
  private lastFailureTime?: Date;
  private lastSuccessTime?: Date;
  private stateChangedAt = new Date();
  private nextAttemptTime?: Date;
  private monitoringWindow: Array<{ success: boolean; timestamp: Date }> = [];
  private eventListeners: Array<(event: CircuitBreakerEvent) => void> = [];

  constructor(
    private readonly name: string,
    private readonly config: CircuitBreakerConfig = {
      failureThreshold: 5,
      recoveryTimeout: 60000,
      monitoringPeriod: 60000,
      minimumRequests: 10,
      successThreshold: 3
    }
  ) {
    logger.debug('Circuit breaker initialized', { name, config });
  }

  async execute<T>(fn: () => Promise<T>, fallback?: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.transitionToHalfOpen();
      } else {
        const error = new CircuitBreakerError(`Circuit breaker is OPEN for ${this.name}`, this.getMetrics());
        if (fallback) {
          logger.debug('Circuit breaker OPEN, executing fallback', { name: this.name });
          return await fallback();
        }
        throw error;
      }
    }

    try {
      const result = await fn();
      this.recordSuccess();
      return result;
    } catch (error) {
      this.recordFailure();
      if (fallback && this.state === CircuitState.OPEN) {
        logger.debug('Function failed and circuit opened, executing fallback', { name: this.name });
        return await fallback();
      }
      throw error;
    }
  }

  private recordSuccess(): void {
    this.successes++;
    this.totalRequests++;
    this.lastSuccessTime = new Date();
    this.addToMonitoringWindow(true);
    this.emitEvent('success');
    if (this.state === CircuitState.HALF_OPEN) {
      if (this.successes >= this.config.successThreshold) this.transitionToClosed();
    }
  }

  private recordFailure(): void {
    this.failures++;
    this.totalRequests++;
    this.lastFailureTime = new Date();
    this.addToMonitoringWindow(false);
    this.emitEvent('failure');
    if (this.shouldOpenCircuit()) this.transitionToOpen();
  }

  private shouldOpenCircuit(): boolean {
    if (this.state === CircuitState.OPEN) return false;
    const recentRequests = this.getRecentRequests();
    if (recentRequests.length < this.config.minimumRequests) return false;
    const recentFailures = recentRequests.filter(req => !req.success).length;
    const failureRate = recentFailures / recentRequests.length;
    const thresholdRate = this.config.failureThreshold / 100;
    return failureRate >= thresholdRate;
  }

  private shouldAttemptReset(): boolean {
    if (!this.nextAttemptTime) return false;
    return Date.now() >= this.nextAttemptTime.getTime();
  }

  private transitionToClosed(): void {
    const previousState = this.state;
    this.state = CircuitState.CLOSED;
    this.failures = 0;
    this.successes = 0;
    this.stateChangedAt = new Date();
    this.nextAttemptTime = undefined;
    logger.info('Circuit breaker transitioned to CLOSED', { name: this.name, previousState });
    this.emitStateChangeEvent(previousState, CircuitState.CLOSED);
  }

  private transitionToOpen(): void {
    const previousState = this.state;
    this.state = CircuitState.OPEN;
    this.stateChangedAt = new Date();
    this.nextAttemptTime = new Date(Date.now() + this.config.recoveryTimeout);
    this.successes = 0;
    logger.warn('Circuit breaker transitioned to OPEN', { name: this.name, previousState, nextAttemptTime: this.nextAttemptTime, metrics: this.getMetrics() });
    this.emitStateChangeEvent(previousState, CircuitState.OPEN);
  }

  private transitionToHalfOpen(): void {
    const previousState = this.state;
    this.state = CircuitState.HALF_OPEN;
    this.stateChangedAt = new Date();
    this.nextAttemptTime = undefined;
    this.successes = 0;
    logger.info('Circuit breaker transitioned to HALF_OPEN', { name: this.name, previousState });
    this.emitStateChangeEvent(previousState, CircuitState.HALF_OPEN);
  }

  private addToMonitoringWindow(success: boolean): void {
    const now = new Date();
    this.monitoringWindow.push({ success, timestamp: now });
    const cutoff = new Date(now.getTime() - this.config.monitoringPeriod);
    this.monitoringWindow = this.monitoringWindow.filter(entry => entry.timestamp >= cutoff);
  }

  private getRecentRequests(): Array<{ success: boolean; timestamp: Date }> {
    const cutoff = new Date(Date.now() - this.config.monitoringPeriod);
    return this.monitoringWindow.filter(entry => entry.timestamp >= cutoff);
  }

  private emitEvent(type: 'failure' | 'success'): void {
    const event: CircuitBreakerEvent = { type, circuitName: this.name, metrics: this.getMetrics(), timestamp: new Date() };
    this.eventListeners.forEach(listener => {
      try { listener(event); } catch (error) { logger.error('Error in circuit breaker event listener', { error }); }
    });
  }

  private emitStateChangeEvent(previousState: CircuitState, newState: CircuitState): void {
    const event: CircuitBreakerEvent = { type: 'state_change', circuitName: this.name, previousState, newState, metrics: this.getMetrics(), timestamp: new Date() };
    this.eventListeners.forEach(listener => {
      try { listener(event); } catch (error) { logger.error('Error in circuit breaker event listener', { error }); }
    });
  }

  getMetrics(): CircuitBreakerMetrics {
    const recentRequests = this.getRecentRequests();
    const recentFailures = recentRequests.filter(req => !req.success).length;
    const failureRate = recentRequests.length > 0 ? (recentFailures / recentRequests.length) * 100 : 0;
    return { state: this.state, failures: this.failures, successes: this.successes, totalRequests: this.totalRequests, failureRate: Math.round(failureRate * 100) / 100, lastFailureTime: this.lastFailureTime, lastSuccessTime: this.lastSuccessTime, stateChangedAt: this.stateChangedAt, nextAttemptTime: this.nextAttemptTime };
  }

  getState(): CircuitState { return this.state; }
  isAvailable(): boolean { return this.state === CircuitState.CLOSED || (this.state === CircuitState.HALF_OPEN) || (this.state === CircuitState.OPEN && this.shouldAttemptReset()); }
  addEventListener(listener: (event: CircuitBreakerEvent) => void): void { this.eventListeners.push(listener); }
  removeEventListener(listener: (event: CircuitBreakerEvent) => void): void { const i = this.eventListeners.indexOf(listener); if (i > -1) this.eventListeners.splice(i, 1); }
  reset(): void {
    this.state = CircuitState.CLOSED; this.failures = 0; this.successes = 0; this.totalRequests = 0; this.lastFailureTime = undefined; this.lastSuccessTime = undefined; this.stateChangedAt = new Date(); this.nextAttemptTime = undefined; this.monitoringWindow = []; logger.info('Circuit breaker reset', { name: this.name });
  }
  forceState(state: CircuitState): void {
    const previousState = this.state; this.state = state; this.stateChangedAt = new Date();
    this.nextAttemptTime = state === CircuitState.OPEN ? new Date(Date.now() + this.config.recoveryTimeout) : undefined;
    logger.debug('Circuit breaker state forced', { name: this.name, previousState, newState: state });
    this.emitStateChangeEvent(previousState, state);
  }
}

export class CircuitBreakerManager {
  private breakers = new Map<string, CircuitBreaker>();
  private globalEventListeners: Array<(event: CircuitBreakerEvent) => void> = [];

  constructor(private defaultConfig?: Partial<CircuitBreakerConfig>) {}
  getBreaker(name: string, config?: CircuitBreakerConfig): CircuitBreaker {
    if (!this.breakers.has(name)) {
      const breakerConfig = config || { failureThreshold: this.defaultConfig?.failureThreshold || 5, recoveryTimeout: this.defaultConfig?.recoveryTimeout || 60000, monitoringPeriod: this.defaultConfig?.monitoringPeriod || 60000, minimumRequests: this.defaultConfig?.minimumRequests || 10, successThreshold: this.defaultConfig?.successThreshold || 3 };
      const breaker = new CircuitBreaker(name, breakerConfig);
      breaker.addEventListener((event) => { this.globalEventListeners.forEach(listener => { try { listener(event); } catch (error) { logger.error('Error in global circuit breaker event listener', { error }); } }); });
      this.breakers.set(name, breaker);
    }
    return this.breakers.get(name)!;
  }
  async execute<T>(name: string, fn: () => Promise<T>, fallback?: () => Promise<T>, config?: CircuitBreakerConfig): Promise<T> { const breaker = this.getBreaker(name, config); return breaker.execute(fn, fallback); }
  getAllBreakers(): Map<string, CircuitBreaker> { return new Map(this.breakers); }
  getAllMetrics(): Map<string, CircuitBreakerMetrics> { const metrics = new Map<string, CircuitBreakerMetrics>(); for (const [name, breaker] of this.breakers) { metrics.set(name, breaker.getMetrics()); } return metrics; }
  addEventListener(listener: (event: CircuitBreakerEvent) => void): void { this.globalEventListeners.push(listener); }
  removeEventListener(listener: (event: CircuitBreakerEvent) => void): void { const index = this.globalEventListeners.indexOf(listener); if (index > -1) this.globalEventListeners.splice(index, 1); }
  resetAll(): void { for (const breaker of this.breakers.values()) breaker.reset(); logger.info('All circuit breakers reset'); }
  getHealthSummary(): { total: number; closed: number; open: number; halfOpen: number; healthyPercentage: number } { const total = this.breakers.size; let closed = 0; let open = 0; let halfOpen = 0; for (const breaker of this.breakers.values()) { switch (breaker.getState()) { case CircuitState.CLOSED: closed++; break; case CircuitState.OPEN: open++; break; case CircuitState.HALF_OPEN: halfOpen++; break; } } const healthyPercentage = total > 0 ? (closed / total) * 100 : 100; return { total, closed, open, halfOpen, healthyPercentage: Math.round(healthyPercentage * 100) / 100 }; }
}

export class CircuitBreakerError extends Error {
  constructor(message: string, public readonly metrics: CircuitBreakerMetrics) { super(message); this.name = 'CircuitBreakerError'; }
}
