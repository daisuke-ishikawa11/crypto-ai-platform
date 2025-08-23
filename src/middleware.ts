// 🚀 Next.js Middleware - 統一キャッシュ制御
// APIエンドポイントとページに統一的なキャッシュヘッダーを適用

import { NextRequest, NextResponse } from 'next/server';
import { generateCacheHeaders } from '@/lib/optimization/cache-strategy';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 独立系アプリ開発スコープ制御（触らない領域の明示ブロック）
  const scope = (process.env.APP_ACCESS_SCOPE || '').trim().toLowerCase();
  if (scope) {
    const scopes = new Set(scope.split(',').map(s => s.trim()).filter(Boolean));
    const allow = (p: string): boolean => {
      // 共通許可: ヘルス/監視/静的
      if (p.startsWith('/api/health') || p.startsWith('/api/monitoring') || p.startsWith('/_next') || p.startsWith('/static') || p === '/' ) return true;
      // スコープ別許可
      if (scopes.has('defi')) {
        if (p.startsWith('/defi') || p.startsWith('/api/defi') || p.startsWith('/api/ai/defi')) return true;
      }
      if (scopes.has('learning') || scopes.has('learn')) {
        if (p.startsWith('/learning') || p.startsWith('/api/learning')) return true;
      }
      if (scopes.has('alerts') || scopes.has('ai-alerts')) {
        if (p.startsWith('/api/alerts') || p.startsWith('/alerts') || p.startsWith('/api/ai/structured')) return true;
      }
      return false;
    }
    if (!allow(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/blocked';
      url.searchParams.set('reason', 'out_of_scope');
      return NextResponse.rewrite(url);
    }
  }
  
  // キャッシュ戦略を決定
  let cacheStrategy: string | null = null;
  let customTTL: number | undefined;
  
  // API エンドポイント別のキャッシュ戦略
  if (pathname.startsWith('/api/')) {
    if (pathname.includes('/market/')) {
      cacheStrategy = 'market-data';
      customTTL = 60; // 1分
    } else if (pathname.includes('/ai/')) {
      cacheStrategy = 'ai-analysis';
      customTTL = 3600; // 1時間
    } else if (pathname.includes('/learning/')) {
      cacheStrategy = 'learning-content';
      customTTL = 86400; // 24時間
    } else if (pathname.includes('/user/')) {
      cacheStrategy = 'user-data';
      customTTL = 1800; // 30分
    } else if (pathname.includes('/alerts/')) {
      cacheStrategy = 'alert-config';
      customTTL = 3600; // 1時間
    } else if (pathname.includes('/billing/')) {
      cacheStrategy = 'billing-data';
      customTTL = 43200; // 12時間
    }
  }
  
  // 静的ファイル
  if (pathname.includes('/static/') || 
      pathname.includes('/_next/static/') ||
      /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/.test(pathname)) {
    cacheStrategy = 'static-assets';
    customTTL = 31536000; // 1年
  }
  
  // レスポンスを取得
  const response = NextResponse.next();
  
  // キャッシュヘッダーを適用
  if (cacheStrategy) {
    try {
      const cacheHeaders = generateCacheHeaders(cacheStrategy, customTTL);
      
      Object.entries(cacheHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      // セキュリティヘッダーも追加
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // APIエンドポイントにCORSヘッダーを追加
      if (pathname.startsWith('/api/')) {
        response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set('Access-Control-Max-Age', '86400');
      }
      
    } catch (error) {
      console.error('Middleware cache header error:', error);
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
