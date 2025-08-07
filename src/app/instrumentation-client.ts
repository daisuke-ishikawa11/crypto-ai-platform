// 🔧 クライアントサイドインストゥルメンテーション
// Sentry・PostHog・アナリティクス統合

'use client';

// Sentryクライアント設定
export function setUser(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.setUser(user);
  }
}

export function captureException(error: Error, context?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, { extra: context });
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureMessage(message, level);
  }
}

// PostHog クライアント設定
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.identify(userId, properties);
  }
}

export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, properties);
  }
}

// タイプ定義を拡張
declare global {
  interface Window {
    Sentry?: {
      setUser: (user: any) => void;
      captureException: (error: Error, context?: any) => void;
      captureMessage: (message: string, level?: string) => void;
    };
    posthog?: {
      identify: (userId: string, properties?: any) => void;
      capture: (event: string, properties?: any) => void;
    };
  }
}