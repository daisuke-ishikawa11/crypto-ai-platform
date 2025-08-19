import { createClient } from '@/lib/supabase/client';
// Sentryユーザークリアは存在する場合のみ呼び出す
let clearSentryUser: ((user: unknown) => void) | null = null

const loadSentryConfig = async () => {
  try {
  const sentry = await import('@sentry/nextjs')
  clearSentryUser = typeof (sentry as { setUser?: (u: unknown) => void }).setUser === 'function'
    ? (user: unknown) => ((sentry as { setUser: (u: unknown) => void }).setUser(user))
    : null
  } catch {
    clearSentryUser = null
  }
}

// Initialize on module load
loadSentryConfig()
import posthog from 'posthog-js';

export async function handleLogout() {
  const supabase = createClient();
  
  try {
    // PostHogでログアウトイベントをトラッキング
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture('user_logged_out', {});
    }
    
    // Supabaseからログアウト
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
    
    // Sentryのユーザーコンテキストをクリア（利用可能な場合）
    if (clearSentryUser) clearSentryUser(null)
    
    // PostHogのユーザーデータをリセット
    if (typeof window !== 'undefined' && posthog) {
      posthog.reset();
    }
    
    // ホームページにリダイレクト
    window.location.href = '/';
  } catch (error) {
    console.error('Failed to logout:', error);
    throw error;
  }
} 
