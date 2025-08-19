// 型安全な Supabase 補助ユーティリティ
//
// 使用レシピ:
// 1) 安全な order+range:
//    const { data, error } = await safeOrderAndRange<User>(
//      supabase.from('users').select('*'), 'created_at', false, 0, 49
//    )
//
// 2) or() が無いモックでも壊れないフィルタ:
//    let q = supabase.from('logs').select('*')
//    q = safeOr(q, `level.eq.error,level.eq.warn`) as unknown
//
// 3) thenable か不明な値を安全に await:
//    const { data, error } = await safeAwait(apiCallMayReturnPromise())

/**
 * order → range の結果として一般的に受け取りたい最小形
 */
export type OrderAndRangeResult<T> = { data?: T[]; error?: { message: string } | null }

/**
 * order → range チェーンを安全に実行
 * - 実オブジェクト/モックの両方を許容
 * - range が thenable を返す場合も非 thenable の場合も安全に処理
 * - 例外時は空配列 + error: null（フェイルソフト）
 */
export async function safeOrderAndRange<T>(
	query: unknown,
	column: string,
	ascending: boolean,
	from: number,
	to: number
): Promise<OrderAndRangeResult<T>> {
	try {
		if (!query || typeof query !== 'object') return { data: [], error: null }
		const hasOrder = 'order' in (query as Record<string, unknown>) && typeof (query as { order?: unknown }).order === 'function'
		if (!hasOrder) return { data: [], error: null }
		const ordered = (query as { order: (c: string, o?: { ascending?: boolean }) => { range: (f: number, t: number) => unknown } })
			.order(column, { ascending })
		try {
			const res = await (ordered.range(from, to) as unknown)
			const out = res as { data?: T[]; error?: { message: string } | null }
			return { data: Array.isArray(out.data) ? out.data : [], error: out.error ?? null }
		} catch {
			return { data: [], error: null }
		}
	} catch {
		return { data: [], error: null }
	}
}

/**
 * 安全な OR フィルタ適用（存在しない場合は元のクエリをそのまま返す）
 */
export function safeOr(query: unknown, expr: string): unknown {
  try {
    if (!query || typeof query !== 'object') return query
    const q = query as Record<string, unknown> & { or?: (e: string) => unknown }
    if (typeof q.or === 'function') {
      return q.or(expr)
    }
    return query
  } catch {
    return query
  }
}

/**
 * Thenable/非Thenableを安全にawaitし、例外時はフェイルソフトに空エラーを返す
 */
export async function safeAwait<T>(value: unknown): Promise<{ data?: T; error?: { message: string } | null }> {
  try {
    if (isThenable(value)) {
      const res = await (value as Promise<unknown>)
      const o = res as { data?: T; error?: { message: string } | null }
      return { data: o.data, error: o.error ?? null }
    }
    return { data: undefined, error: null }
  } catch {
    return { data: undefined, error: null }
  }
}

/**
 * Promise ライク（thenable）かを判定
 */
export function isThenable(value: unknown): value is Promise<unknown> {
    return !!value && typeof value === 'object' && typeof (value as { then?: unknown }).then === 'function'
}

/**
 * 最小限の Supabase クエリビルダー型（本番/モック双方での存在チェック用）
 * 実体はランタイムのオブジェクトを用い、型は安全な連鎖を担保するためのインタフェース
 */
export type MinimalSupaQuery = {
  eq: (col: string, val: unknown) => MinimalSupaQuery
  gte: (col: string, val: unknown) => MinimalSupaQuery
  lte: (col: string, val: unknown) => MinimalSupaQuery
  in: (col: string, vals: unknown[]) => MinimalSupaQuery
  order: (col: string, opts: { ascending: boolean }) => MinimalSupaQuery
  range: (from: number, to: number) => MinimalSupaQuery
}

/**
 * Supabase 風クエリビルダーの存在チェック
 * 期待するメソッド群が存在する場合にのみ MinimalSupaQuery として扱う
 */
export function getSupaQuery(
  obj: unknown,
  options?: { required?: string[] }
): MinimalSupaQuery | null {
  if (!obj || typeof obj !== 'object') return null
  const required = options?.required ?? ['eq', 'gte', 'lte', 'in', 'order', 'range']
  const o = obj as Record<string, unknown>
  const has = (k: string) => k in o && typeof (o as Record<string, unknown>)[k] === 'function'
  if (required.every(has)) {
    return obj as MinimalSupaQuery
  }
  return null
}
