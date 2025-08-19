// 🔗 Supabase クライアント（ブラウザ用）現代化版
// 最新@supabase/ssr v0.6.1完全対応

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * 現代化されたSupabaseクライアント作成
 * @supabase/ssr v0.6.1の新型システム完全対応
 */
export function createClient(): SupabaseClient<Database> {
  // モック機能は本番環境では無効化（セキュリティのため）
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      // 最新の認証設定
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      
      // 現代的なストレージハンドリング
      storage: {
        getItem: (key: string) => {
          if (typeof window === 'undefined') return null;
          try {
            return window.localStorage.getItem(key);
          } catch {
            return null;
          }
        },
        setItem: (key: string, value: string) => {
          if (typeof window === 'undefined') return;
          try {
            window.localStorage.setItem(key, value);
          } catch {
            // Storage full or blocked - silently fail
          }
        },
        removeItem: (key: string) => {
          if (typeof window === 'undefined') return;
          try {
            window.localStorage.removeItem(key);
          } catch {
            // Storage access blocked - silently fail
          }
        }
      }
    },
    
    // 最新のリアルタイム設定
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    },
    
    // 現代的なグローバル設定
    global: {
      headers: {
        'X-Client-Info': 'crypto-ai-platform@2.0.0',
        'X-Client-Type': 'browser'
      }
    }
  });
}

/**
 * 管理者権限用のクライアント作成（現代化）
 * サーバーサイド専用
 */
export function createAdminClient(): SupabaseClient<Database> {
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
    },
    global: {
      headers: {
        'X-Client-Info': 'crypto-ai-platform@2.0.0',
        'X-Client-Type': 'admin'
      }
    }
  });
}

// 現代化されたデフォルトクライアント
let clientInstance: SupabaseClient<Database> | null = null;

/**
 * シングルトンパターンでクライアントを取得
 * パフォーマンス最適化と型安全性を両立
 */
export function getClient(): SupabaseClient<Database> {
  if (!clientInstance) {
    clientInstance = createClient();
  }
  return clientInstance;
}

// レガシー互換性のためのエクスポート
export const supabase = createClient();

// 型安全性を保証するユーティリティ型
export type TypedSupabaseClient = SupabaseClient<Database>;
export type SupabaseTable = keyof Database['public']['Tables'];
export type SupabaseTableRow<T extends SupabaseTable> = Database['public']['Tables'][T]['Row'];
export type SupabaseTableInsert<T extends SupabaseTable> = Database['public']['Tables'][T]['Insert'];
export type SupabaseTableUpdate<T extends SupabaseTable> = Database['public']['Tables'][T]['Update']; 