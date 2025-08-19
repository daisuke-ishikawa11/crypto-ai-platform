import 'server-only'
import * as Sentry from '@sentry/nextjs'
import { config } from '@/lib/config'

let initialized = false

function initSentry(): void {
  if (initialized) return
  const dsn = config.sentryDsn
  if (!dsn) return
  Sentry.init({
    dsn,
    environment: config.sentryEnvironment ?? 'production',
    tracesSampleRate: typeof config.sentryTracesSampleRate === 'number' ? config.sentryTracesSampleRate : 0.0,
    profilesSampleRate: typeof config.sentryProfilesSampleRate === 'number' ? config.sentryProfilesSampleRate : 0.0,
  })
  initialized = true
}

export function captureError(error: unknown, context?: Record<string, unknown>): void {
  if (!initialized) initSentry()
  if (initialized) {
    Sentry.captureException(error, context ? { extra: context } : undefined)
    return
  }
  const message = error instanceof Error ? error.stack ?? error.message : String(error)
  console.error('[alerts-service][error]', message, context ?? {})
}

export function captureMessage(message: string, context?: Record<string, unknown>): void {
  if (!initialized) initSentry()
  if (initialized) {
    Sentry.captureMessage(message, { level: 'info', extra: context })
    return
  }
  console.log('[alerts-service][info]', message, context ?? {})
}


