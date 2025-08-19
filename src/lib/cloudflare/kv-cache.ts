// Cloudflare KV 型安全ユーティリティ
export type KVGetResult<T> = { data?: T; expiresAt?: string }

function isKVGetResult<T>(v: unknown): v is KVGetResult<T> {
  if (!v || typeof v !== 'object') return false
  const r = v as Record<string, unknown>
  return 'data' in r || 'expiresAt' in r
}

export async function kvGet<T>(ns: { get: (key: string) => Promise<unknown> }, key: string): Promise<T | undefined> {
  const raw = await ns.get(key)
  if (isKVGetResult<T>(raw)) return raw.data
  return undefined
}

export async function kvSet(ns: { put: (key: string, value: string, opts?: Record<string, unknown>) => Promise<void> }, key: string, value: unknown, ttlSeconds?: number) {
  const payload = JSON.stringify({ data: value, expiresAt: ttlSeconds ? new Date(Date.now() + ttlSeconds * 1000).toISOString() : undefined })
  const opts = typeof ttlSeconds === 'number' && ttlSeconds > 0 ? { expirationTtl: ttlSeconds } : undefined
  await ns.put(key, payload, opts)
}
