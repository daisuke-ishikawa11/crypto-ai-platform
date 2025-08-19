import 'server-only'
import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_KEY: z.string().min(1),
  INTERNAL_API_KEY: z.string().min(1).optional(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(v => Number(v)).optional(),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(v => Number(v)).optional(),
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ENVIRONMENT: z.string().min(1).optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.string().transform(v => Number(v)).optional(),
  SENTRY_PROFILES_SAMPLE_RATE: z.string().transform(v => Number(v)).optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.string().transform(v => Number(v)).optional(),
  SMTP_SECURE: z.string().transform(v => v === 'true').optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
  EMAIL_PROVIDER: z.enum(['smtp','resend']).optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),
})

const parsed = EnvSchema.safeParse(process.env)
if (!parsed.success) {
  const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
  throw new Error(`Missing or invalid environment variables for alerts-service: ${issues}`)
}

export const config = {
  supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceKey: parsed.data.SUPABASE_SERVICE_KEY,
  internalApiKey: parsed.data.INTERNAL_API_KEY,
  rateLimitWindowMs: parsed.data.RATE_LIMIT_WINDOW_MS ?? 60_000,
  rateLimitMaxRequests: parsed.data.RATE_LIMIT_MAX_REQUESTS ?? 120,
  sentryDsn: parsed.data.SENTRY_DSN,
  sentryEnvironment: parsed.data.SENTRY_ENVIRONMENT,
  sentryTracesSampleRate: parsed.data.SENTRY_TRACES_SAMPLE_RATE,
  sentryProfilesSampleRate: parsed.data.SENTRY_PROFILES_SAMPLE_RATE,
  smtp: parsed.data.SMTP_HOST
    ? { host: parsed.data.SMTP_HOST, port: parsed.data.SMTP_PORT ?? 587, secure: parsed.data.SMTP_SECURE ?? false, user: parsed.data.SMTP_USER, pass: parsed.data.SMTP_PASS }
    : undefined,
  redisUrl: parsed.data.REDIS_URL,
  emailProvider: parsed.data.EMAIL_PROVIDER ?? (parsed.data.SMTP_HOST ? 'smtp' : parsed.data.RESEND_API_KEY ? 'resend' : undefined),
  resend: parsed.data.RESEND_API_KEY ? { apiKey: parsed.data.RESEND_API_KEY, from: parsed.data.RESEND_FROM ?? 'no-reply@example.com' } : undefined,
} as const


