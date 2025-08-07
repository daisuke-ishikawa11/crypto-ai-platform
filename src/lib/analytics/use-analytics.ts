'use client'

import { usePostHog } from 'posthog-js/react'
import { useCallback } from 'react'

// イベントのタイプ定義
export interface AnalyticsEvent {
  // 認証イベント
  'user_signed_up': { method: string; plan?: string }
  'user_logged_in': { method: string }
  'user_logged_out': Record<string, never>
  
  // AI機能イベント
  'ai_chat_sent': { model: string; tokensUsed: number }
  'ai_chat_error': { model: string; error: string }
  'ai_limit_reached': { feature: string; limit: number }
  
  // 市場分析イベント
  'market_analysis_started': { coinId: string }
  'market_analysis_completed': { coinId: string; duration: number }
  'market_analysis_failed': { coinId: string; error: string }
  
  // ポートフォリオイベント
  'portfolio_optimized': { assetsCount: number; method: string }
  'portfolio_created': { name: string }
  'portfolio_deleted': { portfolioId: string }
  
  // リスク管理イベント
  'risk_analysis_performed': { portfolioId: string; riskScore: number }
  'risk_alert_triggered': { type: string; severity: string }
  'risk_profile_updated': { tolerance: string }
  
  // 説明可能AIイベント
  'explainable_ai_used': { predictionType: string }
  'explanation_viewed': { predictionId: string }
  
  // プラン関連イベント
  'plan_upgraded': { from: string; to: string }
  'plan_downgraded': { from: string; to: string }
  'payment_completed': { amount: number; plan: string }
  
  // エラーイベント
  'error_occurred': { type: string; message: string; stack?: string }
  
  // その他のイベント
  'feature_used': { feature: string; details?: Record<string, unknown> }
  'page_viewed': { path: string; title: string }
}

// ユーザープロパティの型定義
export interface UserProperties {
  id: string
  email?: string
  name?: string
  plan?: string
  created_at?: string
  last_login?: string
  total_ai_requests?: number
  total_portfolios?: number
  preferred_model?: string
  risk_tolerance?: string
}

export function useAnalytics() {
  const posthog = usePostHog()

  // イベントを送信
  const track = useCallback(<T extends keyof AnalyticsEvent>(
    event: T,
    properties?: AnalyticsEvent[T]
  ) => {
    if (!posthog) return
    
    try {
      posthog.capture(event, properties)
      
      // 開発環境でのデバッグ
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Event: ${event}`, properties)
      }
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }, [posthog])

  // ユーザーを識別
  const identify = useCallback((userId: string, properties?: Partial<UserProperties>) => {
    if (!posthog) return
    
    try {
      posthog.identify(userId, properties)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] User identified: ${userId}`, properties)
      }
    } catch (error) {
      console.error('Failed to identify user:', error)
    }
  }, [posthog])

  // ユーザープロパティを更新
  const setUserProperties = useCallback((properties: Partial<UserProperties>) => {
    if (!posthog) return
    
    try {
      posthog.setPersonProperties(properties)
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] User properties updated:', properties)
      }
    } catch (error) {
      console.error('Failed to set user properties:', error)
    }
  }, [posthog])

  // ユーザーをリセット（ログアウト時）
  const reset = useCallback(() => {
    if (!posthog) return
    
    try {
      posthog.reset()
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] User reset')
      }
    } catch (error) {
      console.error('Failed to reset user:', error)
    }
  }, [posthog])

  // 機能フラグを取得
  const getFeatureFlag = useCallback((flagName: string): boolean | string | undefined => {
    if (!posthog) return undefined
    
    try {
      return posthog.getFeatureFlag(flagName)
    } catch (error) {
      console.error('Failed to get feature flag:', error)
      return undefined
    }
  }, [posthog])

  // ページビューを手動で送信
  const trackPageView = useCallback((path?: string, properties?: Record<string, unknown>) => {
    if (!posthog) return
    
    try {
      posthog.capture('$pageview', {
        $current_url: path || window.location.href,
        ...properties
      })
    } catch (error) {
      console.error('Failed to track page view:', error)
    }
  }, [posthog])

  // A/Bテストのバリアントを取得
  const getExperiment = useCallback((experimentName: string): string | undefined => {
    if (!posthog) return undefined
    
    try {
      const variant = posthog.getFeatureFlag(experimentName)
      return typeof variant === 'string' ? variant : undefined
    } catch (error) {
      console.error('Failed to get experiment variant:', error)
      return undefined
    }
  }, [posthog])

  return {
    track,
    identify,
    setUserProperties,
    reset,
    getFeatureFlag,
    trackPageView,
    getExperiment,
    // PostHogインスタンスも公開（高度な使用のため）
    posthog
  }
} 