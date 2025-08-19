// 軽量HTTPユーティリティ（SDK/外部API向け）

export async function sleep(ms: number) { return new Promise(res => setTimeout(res, ms)) }

export async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...init, signal: controller.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

export async function fetchJsonWithRetry<T = unknown>(url: string, init: RequestInit, options: { retries: number; backoffMs: number; timeoutMs: number }): Promise<T> {
  const { retries, backoffMs, timeoutMs } = options
  let lastErr: unknown = null
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, init, timeoutMs)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json() as T
      return json
    } catch (e) {
      lastErr = e
      if (attempt < retries) await sleep(backoffMs * (attempt + 1))
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('fetchJsonWithRetry failed')
}
