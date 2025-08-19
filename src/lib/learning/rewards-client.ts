export type LessonCompletedPayload = { userId: string; lessonId: string; tickets?: number }
export type CategoryTestCompletedPayload = { userId: string; categoryId: string; testId?: string; score?: number; tickets?: number }

export async function grantTicketsForLessonCompleted(body: LessonCompletedPayload): Promise<{ success: boolean; granted?: number; balance?: number; error?: string }>{
	try {
		const res = await fetch('/api/learning/rewards/lesson-completed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
		return res.json()
	} catch {
		return { success: false, error: 'request_failed' }
	}
}

export async function grantTicketsForCategoryTestCompleted(body: CategoryTestCompletedPayload, opts?: { token?: string }): Promise<{ success: boolean; granted?: number; balance?: number; error?: string }>{
	try {
		const headers: Record<string, string> = { 'Content-Type': 'application/json' }
		if (opts?.token) headers['x-learning-token'] = opts.token
		const res = await fetch('/api/learning/rewards/category-test-completed', { method: 'POST', headers, body: JSON.stringify(body) })
		return res.json()
	} catch {
		return { success: false, error: 'request_failed' }
	}
}
