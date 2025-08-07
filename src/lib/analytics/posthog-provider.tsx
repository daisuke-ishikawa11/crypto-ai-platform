'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

// PostHog設定
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

// PostHogの初期化
if (typeof window !== 'undefined' && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // 設定オプション
    capture_pageview: true, // ページビューの自動キャプチャ
    capture_pageleave: true, // ページ離脱の追跡
    persistence: 'localStorage', // データの永続化方法
    autocapture: {
      // 自動キャプチャの設定
      dom_event_allowlist: ['click', 'submit', 'change'], // キャプチャするイベント
      element_allowlist: ['button', 'form', 'input', 'select', 'textarea', 'a'], // キャプチャする要素
      css_selector_allowlist: ['.track-event'], // 特定のクラスを持つ要素
    },
    // プライバシー設定
    mask_all_text: false, // テキストをマスクしない（Sentryでマスクしているため）
    mask_all_element_attributes: false,
    // パフォーマンス
    disable_session_recording: process.env.NODE_ENV === 'development', // 開発環境ではセッション記録を無効化
    // デバッグ
    debug: process.env.NODE_ENV === 'development',
    // 機能フラグ
    bootstrap: {
      featureFlags: {
        // 初期機能フラグ（サーバーサイドから渡すことも可能）
      },
    },
  })
} else if (typeof window !== 'undefined' && !POSTHOG_KEY) {
  console.warn('PostHog key not found. Analytics will be disabled.')
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 開発環境でのデバッグ情報
    if (process.env.NODE_ENV === 'development' && POSTHOG_KEY) {
      console.log('PostHog initialized with key:', POSTHOG_KEY.substring(0, 10) + '...')
    }
  }, [])

  // PostHogが初期化されていない場合は子要素をそのまま返す
  if (!POSTHOG_KEY) {
    return <>{children}</>
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
} 