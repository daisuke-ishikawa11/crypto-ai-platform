export type GrantCategoryTestTicketsParams = {
  userId: string
  categoryId: string
  testId?: string
  score?: number
  tickets?: number
  baseUrl?: string // e.g. https://app.example.com （別ドメイン運用時）
  token?: string // x-learning-token を明示指定
}

export type GrantResult = {
  success: boolean
  granted?: number
  balance?: number
  passed?: boolean
  error?: string
}

/**
 * カテゴリー確認テスト合格時のチケット配布を呼び出す薄いクライアント。
 * - 学習アプリが別ドメインの場合は baseUrl を指定
 * - 認証を有効化している場合は token を指定（x-learning-token）
 */
export async function grantCategoryTestTickets(params: GrantCategoryTestTicketsParams): Promise<GrantResult> {
  const {
    userId,
    categoryId,
    testId,
    score,
    tickets = 3,
    baseUrl = '',
    token = (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_LEARNING_TOKEN : undefined) || ''
  } = params

  try {
    const url = baseUrl.replace(/\/$/, '') + '/api/learning/rewards/category-test-completed'
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['x-learning-token'] = token
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId, categoryId, testId, score, tickets })
    })
    const json = (await res.json()) as GrantResult
    if (json.success && typeof window !== 'undefined') {
      try { window.dispatchEvent(new Event('tickets:refresh')) } catch {}
    }
    return json
  } catch {
    return { success: false, error: 'request_failed' }
  }
}
