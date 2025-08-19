export const CSRF_ENDPOINT = '/api/csrf';
const CSRF_HEADER_NAME = 'x-csrf-token';

let cachedToken: string | null = null;
let lastFetched = 0;
const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

async function requestNewToken(): Promise<string> {
  const res = await fetch(CSRF_ENDPOINT, { method: 'GET', credentials: 'include' });
  if (!res.ok) {
    throw new Error(`Failed to fetch CSRF token: ${res.status}`);
  }
  const data = (await res.json()) as { csrfToken?: string };
  if (!data?.csrfToken) {
    throw new Error('CSRF token missing in response');
  }
  cachedToken = data.csrfToken;
  lastFetched = Date.now();
  return cachedToken;
}

export async function getCsrfToken(forceRefresh: boolean = false): Promise<string> {
  if (!forceRefresh && cachedToken && Date.now() - lastFetched < TOKEN_TTL_MS) {
    return cachedToken;
  }
  return requestNewToken();
}

export function getCsrfHeaderName(): string {
  return CSRF_HEADER_NAME;
}

export async function withCsrfHeaders(
  base: HeadersInit = {},
  forceRefresh: boolean = false
): Promise<HeadersInit> {
  const token = await getCsrfToken(forceRefresh);
  return { ...(base as Record<string, string>), [CSRF_HEADER_NAME]: token };
}



