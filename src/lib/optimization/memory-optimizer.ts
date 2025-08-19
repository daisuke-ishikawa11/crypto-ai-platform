// 型安全化のためのユーティリティ
function getPerfMemory(): { usedJSHeapSize: number; jsHeapSizeLimit: number } | null {
  if (typeof performance === 'undefined') return null
  const mem = (performance as { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory
  return mem && typeof mem.usedJSHeapSize === 'number' ? mem : null
}

function getWindowProp<T = unknown>(prop: string): T | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as Record<string, unknown>)[prop] as T | undefined
}

export const MemoryOptimizerUtils = { getPerfMemory, getWindowProp }


// シンプルなメモリ最適化用フック（スタブ）
// 実際の最適化は必要に応じて拡張する
export function useMemoryOptimizer() {
  const memory = getPerfMemory()
  const deviceMemory = getWindowProp<number>('deviceMemory')
  return {
    memory,
    deviceMemory,
    recommendReducedMotion: (memory?.usedJSHeapSize ?? 0) > (memory?.jsHeapSizeLimit ?? Infinity) * 0.7,
  }
}
