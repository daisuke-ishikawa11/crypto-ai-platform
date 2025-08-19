import 'server-only'
import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_KEY: z.string().min(1),
  INTERNAL_API_KEY: z.string().min(1).optional(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(v => Number(v)).optional(),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(v => Number(v)).optional(),
  // Sentry (任意)
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ENVIRONMENT: z.string().min(1).optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.string().transform(v => Number(v)).optional(),
  SENTRY_PROFILES_SAMPLE_RATE: z.string().transform(v => Number(v)).optional(),
})

const parsed = EnvSchema.safeParse(process.env)
if (!parsed.success) {
  const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
  throw new Error(`Missing or invalid environment variables for defi-suite: ${issues}`)
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
} as const


