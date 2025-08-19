import { withCsrfHeaders } from '@/lib/api/csrf-client';

export type ApiFetchInit = Omit<RequestInit, 'body' | 'headers'> & {
  csrf?: boolean; // default true for non-GET
  body?: BodyInit | URLSearchParams | FormData | string | null | undefined | Record<string, unknown>;
  headers?: HeadersInit | Record<string, string>;
};

function shouldAttachCsrf(method?: string, explicit?: boolean): boolean {
  const m = (method || 'GET').toUpperCase();
  if (explicit !== undefined) return explicit;
  return !['GET', 'HEAD', 'OPTIONS'].includes(m);
}

export async function apiFetch(input: RequestInfo | URL, init: ApiFetchInit = {}): Promise<Response> {
  const { headers, method, csrf, credentials, body: initBody, ...rest } = init;
  let finalHeaders: HeadersInit = headers || {};

  if (shouldAttachCsrf(method, csrf)) {
    finalHeaders = await withCsrfHeaders(finalHeaders);
  }

  // Ensure JSON defaults when body is object
  const body = initBody as BodyInit | URLSearchParams | FormData | string | null | undefined | Record<string, unknown>;
  let bodyInit: BodyInit | null | undefined;
  if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)) {
    bodyInit = JSON.stringify(body as Record<string, unknown>);
  } else {
    bodyInit = body as BodyInit | null | undefined;
  }
  if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof URLSearchParams)) {
    if (!(finalHeaders as Record<string, string>)['Content-Type']) {
      finalHeaders = { ...(finalHeaders as Record<string, string>), 'Content-Type': 'application/json' };
    }
  }

  const res = await fetch(input, {
    method,
    headers: finalHeaders,
    credentials: credentials ?? 'include',
    body: bodyInit as BodyInit | null | undefined,
    ...rest,
  });

  // CSRF token might expire; on 403 CSRF failure, try once to refresh and retry
  if (res.status === 403) {
    try {
      finalHeaders = await withCsrfHeaders(finalHeaders, true);
      const retry = await fetch(input, {
        method,
        headers: finalHeaders,
        credentials: credentials ?? 'include',
        body: bodyInit as BodyInit | null | undefined,
        ...rest,
      });
      return retry;
    } catch {
      // fallthrough: return original response
    }
  }

  return res;
}
