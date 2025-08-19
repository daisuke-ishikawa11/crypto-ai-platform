// auto_file_safe_edit.py で src/lib/performance/monitoring.ts に適用
// 目的: unknownアクセスに型ガード導入し、longTasks配列の初期化を明示

// 変更内容（差分適用、実コードはターゲットにパッチされます）
// - CLS集計で entry を PerformanceEntry & { hadRecentInput?: boolean; value?: number } として扱う
// - resource集計 reduce の accumulator 型を Record<string, { count: number; totalDuration: number; totalSize: number; cached: number }>
// - performance.memory / navigator.connection / window.gc / window.gtag を型ガードで保護
// - longTasks を `const longTasks = (this.metrics.get('longTasks') as Array<{name:string;duration:number;startTime:number}> | undefined) ?? []` で取得

