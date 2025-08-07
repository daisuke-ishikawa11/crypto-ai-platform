// 🔗 Supabase クライアント（ブラウザ用）
// クライアントサイドでのSupabase接続設定

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * ブラウザ用Supabaseクライアントを作成
 * 自動でクッキーを管理し、リアルタイム機能を提供
 */
export function createClient() {
  // Use mock client in development if demo URLs are detected
  if (supabaseUrl?.includes('demo') || process.env.NODE_ENV === 'development') {
    const { createClient: createMockClient } = require('./mock-client');
    return createMockClient();
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      // 認証関連の設定
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      
      // ストレージ設定
      storage: {
        getItem: (key: string) => {
          if (typeof window === 'undefined') return null;
          return window.localStorage.getItem(key);
        },
        setItem: (key: string, value: string) => {
          if (typeof window === 'undefined') return;
          window.localStorage.setItem(key, value);
        },
        removeItem: (key: string) => {
          if (typeof window === 'undefined') return;
          window.localStorage.removeItem(key);
        }
      }
    },
    
    // リアルタイム設定
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    },
    
    // グローバル設定
    global: {
      headers: {
        'X-Client-Info': 'crypto-ai-platform@1.0.0'
      }
    }
  });
}

/**
 * 管理者権限用のクライアント作成
 * サービスキーを使用（ブラウザでは使用禁止）
 */
export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('Admin client cannot be used in browser environment');
  }
  
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
  }
  
  return createBrowserClient<Database>(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// デフォルトクライアントをエクスポート
export const supabase = createClient(); 