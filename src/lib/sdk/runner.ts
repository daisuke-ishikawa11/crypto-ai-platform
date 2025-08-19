import { cacheManager, CacheLayer } from '@/lib/cache/cache-manager'
import { resolveSdkOptions, type SdkAdapterOptions } from '@/lib/sdk/types'
import { getAdapter, type SdkAdapter } from '@/lib/sdk/registry'

export type AdapterRunParams<T> = {
  name: string
  kind: 'solana' | 'hyperliquid' | 'generic'
  adapter?: SdkAdapter<T>
  options?: Partial<SdkAdapterOptions>
  cacheKeyParams?: Record<string, string | number | boolean | undefined>
  cacheTtlMsOverride?: number
}

function buildCacheKey(name: string, params?: Record<string, string | number | boolean | undefined>): string {
  const p = params ? Object.entries(params).sort(([a],[b]) => a.localeCompare(b)) : []
  const qs = p.map(([k,v]) => `${k}=${String(v)}`).join('&')
  return `sdk:${name}${qs ? ':' + qs : ''}`
}

export async function runAdapter<T>(params: AdapterRunParams<T>): Promise<T | null> {
  const { name, kind, adapter: provided, options, cacheKeyParams, cacheTtlMsOverride } = params
  const adapter = (provided as SdkAdapter<T>) || (getAdapter(name) as SdkAdapter<T> | undefined)
  if (!adapter) return null

  const opts = resolveSdkOptions(kind, options)
  const cacheKey = buildCacheKey(name, { ...(cacheKeyParams || {}), network: opts.network || 'all' })

  const cached = await cacheManager.get<T>(cacheKey, { layers: [CacheLayer.MEMORY, CacheLayer.REDIS], ttl: opts.cacheTtlMs })
  if (cached) return cached

  const result = await adapter(opts)
  if (result !== null) {
    await cacheManager.set(cacheKey, result, { layers: [CacheLayer.MEMORY, CacheLayer.REDIS], ttl: cacheTtlMsOverride ?? opts.cacheTtlMs, tags: [`sdk:${name}`] })
  }
  return result
}
