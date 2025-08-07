// 🔐 認証フック - クライアントサイド認証状態管理
// React フック形式でユーザー認証状態を提供

'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { logger } from '@/lib/monitoring/logger';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'premium';
  subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled';
  subscription_tier: 'basic' | 'pro' | 'enterprise';
  profile: {
    full_name?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
  };
}

interface AuthContextType {
  user: AuthenticatedUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (updates: Partial<AuthenticatedUser['profile']>) => Promise<{ error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 認証プロバイダーコンポーネント
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    // 初期セッション取得
    getInitialSession();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
        }
        
        setLoading(false);
        
        logger.debug('Auth state changed', { 
          event, 
          userId: session?.user?.id 
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * 初期セッション取得
   */
  async function getInitialSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        logger.error('Failed to get initial session', { error });
        setLoading(false);
        return;
      }

      setSession(session);
      
      if (session?.user) {
        await loadUserProfile(session.user);
      }
      
    } catch (error) {
      logger.error('Error getting initial session', { error });
    } finally {
      setLoading(false);
    }
  }

  /**
   * ユーザープロファイル読み込み
   */
  async function loadUserProfile(authUser: User) {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select(`
          full_name,
          avatar_url,
          role,
          subscription_status,
          subscription_tier,
          created_at,
          updated_at
        `)
        .eq('id', authUser.id)
        .single();

      if (error) {
        // プロファイルが存在しない場合は作成
        if (error.code === 'PGRST116') {
          await createUserProfile(authUser);
          return;
        }
        
        logger.error('Failed to load user profile', { 
          userId: authUser.id, 
          error 
        });
        return;
      }

      const authenticatedUser: AuthenticatedUser = {
        id: authUser.id,
        email: authUser.email!,
        role: profile.role || 'user',
        subscription_status: profile.subscription_status || 'inactive',
        subscription_tier: profile.subscription_tier || 'basic',
        profile: {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        }
      };

      setUser(authenticatedUser);
      
      logger.debug('User profile loaded', { 
        userId: authUser.id,
        role: profile.role 
      });

    } catch (error) {
      logger.error('Error loading user profile', { 
        userId: authUser.id, 
        error 
      });
    }
  }

  /**
   * ユーザープロファイル作成
   */
  async function createUserProfile(authUser: User) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: authUser.id,
          email: authUser.email,
          full_name: authUser.user_metadata?.full_name || null,
          role: 'user',
          subscription_status: 'trial',
          subscription_tier: 'basic',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        logger.error('Failed to create user profile', { 
          userId: authUser.id, 
          error 
        });
        return;
      }

      // 作成後にプロファイルを再読み込み
      await loadUserProfile(authUser);
      
      logger.info('User profile created', { userId: authUser.id });

    } catch (error) {
      logger.error('Error creating user profile', { 
        userId: authUser.id, 
        error 
      });
    }
  }

  /**
   * サインイン
   */
  async function signIn(email: string, password: string): Promise<{ error?: string }> {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        logger.warn('Sign in failed', { email, error: error.message });
        return { error: error.message };
      }

      logger.info('User signed in successfully', { email });
      return {};

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Sign in error', { email, error: errorMessage });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  }

  /**
   * サインアップ
   */
  async function signUp(
    email: string, 
    password: string, 
    fullName?: string
  ): Promise<{ error?: string }> {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || null
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        logger.warn('Sign up failed', { email, error: error.message });
        return { error: error.message };
      }

      logger.info('User signed up successfully', { email });
      return {};

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Sign up error', { email, error: errorMessage });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  }

  /**
   * サインアウト
   */
  async function signOut(): Promise<void> {
    try {
      const userId = user?.id;
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logger.error('Sign out failed', { userId, error: error instanceof Error ? error.message : String(error) });
        throw error;
      }

      setUser(null);
      setSession(null);
      
      logger.info('User signed out successfully', { userId });

    } catch (error) {
      logger.error('Sign out error', { error });
      throw error;
    }
  }

  /**
   * パスワードリセット
   */
  async function resetPassword(email: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        logger.warn('Password reset failed', { email, error: error.message });
        return { error: error.message };
      }

      logger.info('Password reset email sent', { email });
      return {};

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Password reset error', { email, error: errorMessage });
      return { error: errorMessage };
    }
  }

  /**
   * プロファイル更新
   */
  async function updateProfile(
    updates: Partial<AuthenticatedUser['profile']>
  ): Promise<{ error?: string }> {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        logger.error('Profile update failed', { 
          userId: user.id, 
          error: error.message 
        });
        return { error: error.message };
      }

      // ローカル状態を更新
      setUser(prev => prev ? {
        ...prev,
        profile: {
          ...prev.profile,
          ...updates
        }
      } : null);

      logger.info('Profile updated successfully', { userId: user.id });
      return {};

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Profile update error', { userId: user.id, error: errorMessage });
      return { error: errorMessage };
    }
  }

  /**
   * ユーザー情報を再取得
   */
  async function refreshUser(): Promise<void> {
    if (!session?.user) return;
    
    try {
      await loadUserProfile(session.user);
    } catch (error) {
      logger.error('Failed to refresh user', { error });
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshUser
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
}

/**
 * 認証コンテキストを使用するフック
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * ユーザー情報のみを取得するフック（ダッシュボードで使用）
 */
export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}

/**
 * 認証必須ページ用のガードフック
 */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      // リダイレクト処理は使用側で実装
      logger.warn('Unauthorized access attempt blocked');
    }
  }, [user, loading]);

  return { user, loading, isAuthenticated: !!user };
}

/**
 * ロール確認用ユーティリティ
 */
export function useRole(requiredRole: string | string[]) {
  const { user } = useAuth();
  
  const hasRole = user ? (
    Array.isArray(requiredRole) 
      ? requiredRole.includes(user.role)
      : user.role === requiredRole
  ) : false;

  return { hasRole, userRole: user?.role };
}

/**
 * サブスクリプション確認用ユーティリティ
 */
export function useSubscription() {
  const { user } = useAuth();
  
  const hasActiveSubscription = user ? 
    ['active', 'trial'].includes(user.subscription_status) : false;
    
  const isPremium = user?.subscription_tier === 'pro' || user?.subscription_tier === 'enterprise';
  
  return { 
    hasActiveSubscription, 
    isPremium,
    subscriptionStatus: user?.subscription_status,
    subscriptionTier: user?.subscription_tier
  };
}