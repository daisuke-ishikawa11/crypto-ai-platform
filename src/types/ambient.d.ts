// Ambient module declarations for dynamic imports that may be optional at build time
declare module '@/components/market/market-analysis' {
  const Component: React.ComponentType<Record<string, unknown>>
  export default Component
}
declare module '@/components/risk/risk-dashboard' {
  const Component: React.ComponentType<Record<string, unknown>>
  export default Component
}
declare module '@/components/trading/trading-signals' {
  const Component: React.ComponentType<Record<string, unknown>>
  export default Component
}

// GA gtag global
declare const gtag: (...args: unknown[]) => void;

// lru-cache 型定義が解決できない環境向けの最小宣言（anyは使わない）
declare module 'lru-cache' {
  export interface Options<K, V> {
    max?: number;
    ttl?: number;
    updateAgeOnGet?: boolean;
    updateAgeOnHas?: boolean;
  }
  export default class LRUCache<K, V> {
    constructor(options?: Options<K, V>);
    get(key: K): V | undefined;
    set(key: K, value: V, options?: { ttl?: number }): this;
    delete(key: K): boolean;
    clear(): void;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
  }
}
