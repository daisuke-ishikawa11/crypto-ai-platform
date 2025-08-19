// SDKレジストリ（後から追加するアダプタを一元管理）
import type { SdkAdapterOptions } from '@/lib/sdk/types'

export type SdkAdapter<TOutput> = (options: SdkAdapterOptions) => Promise<TOutput | null>

type AnyAdapter = SdkAdapter<unknown>

const registry = new Map<string, AnyAdapter>()

export function registerAdapter(name: string, adapter: AnyAdapter) {
  registry.set(name.toLowerCase(), adapter)
}

export function getAdapter(name: string): AnyAdapter | undefined {
  return registry.get(name.toLowerCase())
}

export function hasAdapter(name: string): boolean {
  return registry.has(name.toLowerCase())
}

export function listAdapters(): string[] {
  return Array.from(registry.keys()).sort()
}
