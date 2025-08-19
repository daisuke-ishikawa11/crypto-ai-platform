// 共通SDKアダプタ型とデフォルト解決
import { getEnvInt } from '@/lib/config/env'

export type SupportedNetwork = 'all' | 'ethereum' | 'solana' | 'arbitrum' | 'optimism' | 'polygon' | 'bsc' | 'avalanche' | string

export interface SdkAdapterOptions {
  timeoutMs: number
  retries: number
  backoffMs: number
  cacheTtlMs: number
  network?: SupportedNetwork
  rpcUrl?: string
  baseUrl?: string
  apiKey?: string
}

export type AdapterKind = 'solana' | 'hyperliquid' | 'generic'

const DEFAULTS: Record<AdapterKind, SdkAdapterOptions> = {
  solana: {
    timeoutMs: getEnvInt('SDK_TIMEOUT_MS', 8_000),
    retries: getEnvInt('SDK_RETRIES', 2),
    backoffMs: getEnvInt('SDK_BACKOFF_MS', 400),
    cacheTtlMs: getEnvInt('SDK_CACHE_TTL_MS', 30_000),
    rpcUrl: process.env.SOLANA_RPC_URL,
  },
  hyperliquid: {
    timeoutMs: getEnvInt('HYPERLIQUID_HTTP_TIMEOUT_MS', 8_000),
    retries: getEnvInt('HYPERLIQUID_RETRIES', 2),
    backoffMs: getEnvInt('HYPERLIQUID_BACKOFF_MS', 400),
    cacheTtlMs: getEnvInt('HYPERLIQUID_CACHE_TTL_MS', 30_000),
    baseUrl: process.env.HYPERLIQUID_BASE_URL || 'https://api.hyperliquid.xyz',
  },
  generic: {
    timeoutMs: 8_000,
    retries: 2,
    backoffMs: 400,
    cacheTtlMs: 30_000,
  },
}

export function resolveSdkOptions(kind: AdapterKind, override?: Partial<SdkAdapterOptions>): SdkAdapterOptions {
  const base = DEFAULTS[kind]
  return { ...base, ...(override || {}) }
}
