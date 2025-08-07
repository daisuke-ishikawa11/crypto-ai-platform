// 🚀 パフォーマンス最適化 - コンポーネントキャッシュシステム
// メモ化とキャッシュでレンダリング性能を向上

'use client';

import { ComponentType, useMemo, useCallback, useRef, useState, useEffect, createElement } from 'react';

// キャッシュストレージインターface
interface CacheStorage<T = any> {
  get(key: string): T | null;
  set(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  size(): number;
}

// メモリキャッシュ実装
class MemoryCache<T = any> implements CacheStorage<T> {
  private cache = new Map<string, { value: T; expiry?: number }>();
  private maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // TTL チェック
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  set(key: string, value: T, ttlMs?: number): void {
    // サイズ制限チェック
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      // 最も古いエントリを削除（LRU）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    const expiry = ttlMs ? Date.now() + ttlMs : undefined;
    this.cache.set(key, { value, expiry });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// グローバルキャッシュインスタンス
export const componentCache = new MemoryCache();
export const dataCache = new MemoryCache();

// コンポーネント結果をキャッシュするHOC
export function withComponentCache<P extends object>(
  Component: ComponentType<P>,
  getCacheKey: (props: P) => string,
  ttlMs = 5 * 60 * 1000 // 5分デフォルト
) {
  return function CachedComponent(props: P) {
    const cacheKey = getCacheKey(props);
    
    return useMemo(() => {
      const cached = componentCache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const result = createElement(Component, props);
      componentCache.set(cacheKey, result, ttlMs);
      return result;
    }, [cacheKey, props]);
  };
}

// データ取得をキャッシュするフック
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = 5 * 60 * 1000, // 5分デフォルト
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchRef = useRef<Promise<T> | null>(null);

  const fetchData = useCallback(async () => {
    const cacheKey = `${key}-${JSON.stringify(dependencies)}`;
    
    // キャッシュチェック
    const cached = dataCache.get(cacheKey);
    if (cached) {
      setData(cached);
      return cached;
    }

    // 同時実行防止
    if (fetchRef.current) {
      return fetchRef.current;
    }

    setLoading(true);
    setError(null);

    try {
      fetchRef.current = fetcher();
      const result = await fetchRef.current;
      
      setData(result);
      dataCache.set(cacheKey, result, ttlMs);
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
      fetchRef.current = null;
    }
  }, [key, fetcher, ttlMs, dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// レンダリング最適化用のメモ化フック
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  cacheKey?: string
): T {
  return useMemo(() => {
    if (cacheKey) {
      const cached = componentCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const result = factory();
    
    if (cacheKey) {
      componentCache.set(cacheKey, result, 60 * 1000); // 1分キャッシュ
    }
    
    return result;
  }, deps);
}

// コールバック最適化
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  cacheKey?: string
): T {
  return useCallback((...args: Parameters<T>) => {
    if (cacheKey) {
      const argKey = `${cacheKey}-${JSON.stringify(args)}`;
      const cached = componentCache.get(argKey);
      if (cached) {
        return cached;
      }
    }

    const result = callback(...args);
    
    if (cacheKey) {
      const argKey = `${cacheKey}-${JSON.stringify(args)}`;
      componentCache.set(argKey, result, 30 * 1000); // 30秒キャッシュ
    }
    
    return result;
  }, deps) as T;
}

// パフォーマンス監視
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} レンダー回数: ${renderCount.current}`);
    }
  });

  useEffect(() => {
    const endTime = Date.now();
    const renderTime = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${componentName} 初期レンダー時間: ${renderTime}ms`);
    }
  }, []);

  return {
    renderCount: renderCount.current,
  };
}

// 重い計算を最適化するフック
export function useHeavyComputation<T>(
  computation: () => T,
  deps: React.DependencyList,
  cacheKey?: string
): T {
  const computationRef = useRef<Promise<T> | null>(null);
  
  return useMemo(() => {
    if (cacheKey) {
      const cached = dataCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Web Worker が利用可能な場合は別スレッドで実行
    if (typeof Worker !== 'undefined' && computation.toString().length > 1000) {
      // 簡単な場合はメインスレッドで実行
      const result = computation();
      
      if (cacheKey) {
        dataCache.set(cacheKey, result, 60 * 1000);
      }
      
      return result;
    }

    const result = computation();
    
    if (cacheKey) {
      dataCache.set(cacheKey, result, 60 * 1000);
    }
    
    return result;
  }, deps);
}

// キャッシュクリーンアップ
export function clearCaches() {
  componentCache.clear();
  dataCache.clear();
}

// キャッシュ統計
export function getCacheStats() {
  return {
    componentCache: {
      size: componentCache.size(),
    },
    dataCache: {
      size: dataCache.size(),
    },
  };
}

// 開発環境でのキャッシュ監視
if (process.env.NODE_ENV === 'development') {
  // 5秒ごとにキャッシュ統計を表示
  setInterval(() => {
    const stats = getCacheStats();
    console.log('📊 キャッシュ統計:', stats);
  }, 5000);
}