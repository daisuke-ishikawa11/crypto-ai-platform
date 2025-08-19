import { getSupaQuery, safeOrderAndRange, isThenable, safeOr, safeAwait, type MinimalSupaQuery } from '../../src/lib/supabase/helpers'

describe('supabase/helpers', () => {
	describe('getSupaQuery', () => {
		it('returns null for non-object or missing methods', () => {
			expect(getSupaQuery(null)).toBeNull()
			expect(getSupaQuery(undefined)).toBeNull()
			expect(getSupaQuery(123)).toBeNull()
			expect(getSupaQuery({})).toBeNull()
		})

		it('returns MinimalSupaQuery when all required methods exist', () => {
			const qb: Partial<MinimalSupaQuery> & Record<string, unknown> = {
				eq: () => qb as MinimalSupaQuery,
				gte: () => qb as MinimalSupaQuery,
				lte: () => qb as MinimalSupaQuery,
				in: () => qb as MinimalSupaQuery,
				order: () => qb as MinimalSupaQuery,
				range: () => qb as MinimalSupaQuery,
			}
			expect(getSupaQuery(qb)).not.toBeNull()
		})

		it('supports required option for custom method checks (e.g., or)', () => {
			const qb: Record<string, unknown> = {
				or: () => qb
			}
			expect(getSupaQuery(qb, { required: ['or'] })).not.toBeNull()
			expect(getSupaQuery(qb, { required: ['order','range'] })).toBeNull()
		})
	})

	describe('safeOrderAndRange', () => {
		it('safely returns empty data when query does not support order', async () => {
			const result = await safeOrderAndRange({}, 'created_at', true, 0, 9)
			expect(result).toEqual({ data: [], error: null })
		})

		it('calls order and range and returns their result', async () => {
			const data = [{ id: 1 }, { id: 2 }]
			const mock = {
				order: () => ({
					range: async () => ({ data, error: null }),
				}),
			}
			const result = await safeOrderAndRange<typeof data[0]>(mock, 'id', false, 0, 1)
			expect(result.data).toEqual(data)
			expect(result.error).toBeNull()
		})

		it('returns empty on range error', async () => {
			const mock = {
				order: () => ({
					range: async () => { throw new Error('boom') },
				}),
			}
			const result = await safeOrderAndRange(mock, 'id', true, 0, 10)
			expect(result).toEqual({ data: [], error: null })
		})
	})

	describe('isThenable', () => {
		it('returns true for promise-like objects', () => {
			const p = { then: () => undefined }
			expect(isThenable(p)).toBe(true)
		})

		it('returns true for native Promise', () => {
			const p = Promise.resolve(1)
			expect(isThenable(p)).toBe(true)
		})

		it('returns false for non-thenable values', () => {
			expect(isThenable(null)).toBe(false)
			expect(isThenable(undefined)).toBe(false)
			expect(isThenable({})).toBe(false)
			expect(isThenable(123)).toBe(false)
			// functions without then
			expect(isThenable(() => {})).toBe(false)
		})
	})

	describe('safeOr', () => {
		it('applies or when available', () => {
			const calls: string[] = []
			const q = { or: (expr: string) => { calls.push(expr); return q } }
			const res = safeOr(q, 'a.ilike.%x%')
			expect(calls).toEqual(['a.ilike.%x%'])
			expect(res).toBe(q)
		})

		it('returns original query when or is missing', () => {
			const q = {}
			const res = safeOr(q, 'b.ilike.%y%')
			expect(res).toBe(q)
		})
	})

	describe('safeAwait', () => {
		it('resolves thenable and returns its value', async () => {
			const p = Promise.resolve({ data: [1, 2, 3], error: null })
			const res = await safeAwait<number[]>(p)
			expect(res).toEqual({ data: [1, 2, 3], error: null })
		})

		it('returns empty result for non-thenable', async () => {
			const res = await safeAwait<number[]>({})
			expect(res).toEqual({ data: undefined, error: null })
		})

		it('returns empty result on rejection', async () => {
			const p = Promise.reject(new Error('boom'))
			const res = await safeAwait<number[]>(p)
			expect(res).toEqual({ data: undefined, error: null })
		})
	})
})
