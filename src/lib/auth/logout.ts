import { createClient } from '@/lib/supabase/client';
import { setUser as clearSentryUser } from '../../../sentry.client.config';
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
    
    // Sentryのユーザーコンテキストをクリア
    clearSentryUser(null);
    
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