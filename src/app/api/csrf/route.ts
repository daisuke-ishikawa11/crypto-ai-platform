import { NextResponse } from 'next/server';
import { generateCsrfToken, CSRF_HEADERS } from '@/lib/security/csrf';

// CSRFトークン発行エンドポイント
// - GET: CSRFトークンを生成し、HttpOnlyクッキーに設定。レスポンスボディにも返す（ヘッダ送信用）。
// - OPTIONS: CORS事前フライト（Vercel対応の動的Origin）。

export const GET = async () => {
  const { token, cookie } = await generateCsrfToken();

  const originEnv = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.VERCEL_URL || 'http://localhost:3000';
  const allowOrigin = originEnv.startsWith('http') ? originEnv : `https://${originEnv}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': allowOrigin,
    'Vary': 'Origin',
  };

  if (cookie) {
    headers['Set-Cookie'] = cookie;
  }

  return new NextResponse(
    JSON.stringify({ csrfToken: token, headerName: CSRF_HEADERS.TOKEN_HEADER, cookieName: CSRF_HEADERS.COOKIE_NAME }),
    { status: 200, headers }
  );
};

export const OPTIONS = async () => {
  const originEnv = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.VERCEL_URL || 'http://localhost:3000';
  const allowOrigin = originEnv.startsWith('http') ? originEnv : `https://${originEnv}`;
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
};
