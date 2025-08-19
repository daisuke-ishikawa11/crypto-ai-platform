'use client';

import * as React from "react"
import { useCallback, useEffect } from 'react'
import { apiFetch } from '@/lib/api/fetcher';

// Web Vitals 型定義
interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: 'navigate' | 'reload' | 'back_forward' | 'prerender';
}

// パフォーマンス閾値
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

// 評価関数
function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// メトリック送信関数
export function sendToAnalytics(metric: WebVitalsMetric) {
  // 開発環境では console.log で確認
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vitals:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // 本番環境では分析サービスに送信
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4 に送信
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        custom_parameter_1: metric.rating,
      });
    }

    // 独自の分析エンドポイントに送信
    if (typeof fetch !== 'undefined') {
      apiFetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
          navigationType: metric.navigationType,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: Date.now(),
        }),
      }).catch(console.error);
    }
  }
}

// Web Vitals フック
export function useWebVitals() {
  const onPerfEntry = React.useCallback((metric: WebVitalsMetric) => {
    const rating = getRating(metric.name, metric.value);
    const enhancedMetric = { ...metric, rating };
    sendToAnalytics(enhancedMetric);
  }, []);

  function convertMetric(m: unknown): WebVitalsMetric | null {
    if (!m || typeof m !== 'object') return null;
    const obj = m as Record<string, unknown>;
    const name = typeof obj.name === 'string' ? obj.name : 'metric';
    const value = typeof obj.value === 'number' ? obj.value : 0;
    const delta = typeof obj.delta === 'number' ? obj.delta : 0;
    const id = typeof obj.id === 'string' ? obj.id : 'unknown';
    const nt = typeof obj.navigationType === 'string' ? obj.navigationType : 'navigate';
    const navigationType = (nt === 'reload' || nt === 'navigate' || nt === 'back_forward' || nt === 'prerender') ? nt : 'navigate';
    return { name, value, delta, id, navigationType, rating: 'good' };
  }

  React.useEffect(() => {
    import('web-vitals').then((mod: unknown) => {
      const api = mod as Record<string, unknown>;
      const onCLS = api.onCLS as (cb: (m: unknown) => void) => void;
      const onFID = api.onFID as (cb: (m: unknown) => void) => void;
      const onFCP = api.onFCP as (cb: (m: unknown) => void) => void;
      const onLCP = api.onLCP as (cb: (m: unknown) => void) => void;
      const onTTFB = api.onTTFB as (cb: (m: unknown) => void) => void;
      const handler = (m: unknown) => {
        const converted = convertMetric(m);
        if (converted) onPerfEntry(converted);
      };
      onCLS(handler);
      onFID(handler);
      onFCP(handler);
      onLCP(handler);
      onTTFB(handler);
    });
  }, [onPerfEntry]);
}

// カスタムパフォーマンス監視
export function useCustomPerformanceMonitor() {
  React.useEffect(() => {
    // ページロード時間を測定
    const measurePageLoad = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            // DNS lookup time
            dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
            // TCP connection time
            tcpTime: navigation.connectEnd - navigation.connectStart,
            // SSL time
            sslTime: navigation.connectEnd - navigation.secureConnectionStart,
            // Request time
            requestTime: navigation.responseStart - navigation.requestStart,
            // Response time
            responseTime: navigation.responseEnd - navigation.responseStart,
            // DOM processing time
            domTime: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            // Load event time
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            // Total page load time
            totalTime: navigation.loadEventEnd - getNavStart(navigation),
          };

          // 開発環境でログ出力
          if (process.env.NODE_ENV === 'development') {
            console.table(metrics);
          }

          // 分析サービスに送信
          if (process.env.NODE_ENV === 'production') {
            apiFetch('/api/analytics/page-performance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify({
                ...metrics,
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: Date.now(),
              }),
            }).catch(console.error);
          }
        }
      }
    };

    // ページロード完了後に測定
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
      return () => window.removeEventListener('load', measurePageLoad);
    }
  }, []);

  // リソース監視
  React.useEffect(() => {
    const observeResources = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const res = entry as PerformanceResourceTiming;
            if (typeof (res as { transferSize?: number }).transferSize === 'number') {
              const size = (res as { transferSize: number }).transferSize;
              if (size > 1_000_000) {
                console.warn(`🚨 大きなリソース検出: ${entry.name} (${Math.round(size / 1024)}KB)`);
              }
            }
            if (entry.duration > 3000) {
              console.warn(`🐌 遅いリソース検出: ${entry.name} (${Math.round(entry.duration)}ms)`);
            }
          });
        });

        observer.observe({ type: 'resource', buffered: true });
        
        return () => observer.disconnect();
      }
    };

    return observeResources();
  }, []);
}

// パフォーマンス警告コンポーネント
export function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  useWebVitals();
  useCustomPerformanceMonitor();

  // メモリ使用量監視
  React.useEffect(() => {
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        const usedPercent = memory ? (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 : 0;
        
        if (usedPercent > 80) {
          console.warn(`🚨 メモリ使用量が高い: ${Math.round(usedPercent)}%`);
        }
        
        // 開発環境でメモリ情報を表示
        if (process.env.NODE_ENV === 'development') {
          console.log(`💾 メモリ使用量: ${Math.round(usedPercent)}%`);
        }
      }
    };

    // 5秒ごとにチェック
    const interval = setInterval(checkMemoryUsage, 5000);
    return () => clearInterval(interval);
  }, []);

  // FPS監視
  React.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          console.warn(`🎯 低FPS検出: ${fps}fps`);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    const animationId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <>{children}</>;
}

// パフォーマンスレポート生成
export function generatePerformanceReport() {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  const resources = performance.getEntriesByType('resource');

  const report = {
    // 基本メトリック
    pageLoadTime: navigation ? navigation.loadEventEnd - getNavStart(navigation) : 0,
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - getNavStart(navigation) : 0,
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    
    // リソース統計
    resourceCount: resources.length,
    totalResourceSize: resources.reduce((sum, resource) => sum + ((resource as PerformanceResourceTiming).transferSize || 0), 0),
    largestResource: resources.reduce((max, resource) => 
      (((resource as PerformanceResourceTiming).transferSize || 0) > ((max as PerformanceResourceTiming).transferSize || 0) ? resource : max), resources[0]
    ),
    
    // 接続統計
    dnsTime: navigation ? navigation.domainLookupEnd - navigation.domainLookupStart : 0,
    tcpTime: navigation ? navigation.connectEnd - navigation.connectStart : 0,
    sslTime: navigation && navigation.secureConnectionStart ? navigation.connectEnd - navigation.secureConnectionStart : 0,
    
    // ブラウザ情報
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    
    // 生成時間
    generatedAt: new Date().toISOString(),
  };

  return report;
}

function getNavStart(navigation: PerformanceNavigationTiming): number {
  const withStart = navigation as { navigationStart?: number }
  return typeof withStart.navigationStart === 'number' ? withStart.navigationStart : (navigation.activationStart ?? 0)
}

// パフォーマンスダッシュボード用データエクスポート
export function exportPerformanceData() {
  const report = generatePerformanceReport();
  
  if (report && process.env.NODE_ENV === 'development') {
    console.group('📊 パフォーマンスレポート');
    console.table({
      'ページロード時間': `${Math.round(report.pageLoadTime)}ms`,
      'DOM準備完了': `${Math.round(report.domContentLoaded)}ms`,
      'First Paint': `${Math.round(report.firstPaint)}ms`,
      'First Contentful Paint': `${Math.round(report.firstContentfulPaint)}ms`,
      'DNS時間': `${Math.round(report.dnsTime)}ms`,
      'TCP時間': `${Math.round(report.tcpTime)}ms`,
      'SSL時間': `${Math.round(report.sslTime)}ms`,
      'リソース数': report.resourceCount,
      '総リソースサイズ': `${Math.round(report.totalResourceSize / 1024)}KB`,
    });
    console.groupEnd();
  }
  
  return report;
}
