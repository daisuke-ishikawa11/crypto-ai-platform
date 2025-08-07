// 🚀 Web Vitals パフォーマンス監視
// Core Web Vitals とユーザーエクスペリエンス指標を監視

'use client';

import { useEffect, useCallback } from 'react';

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
      fetch('/api/analytics/web-vitals', {
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
  const onPerfEntry = useCallback((metric: WebVitalsMetric) => {
    // 評価を追加
    const rating = getRating(metric.name, metric.value);
    const enhancedMetric = { ...metric, rating };
    
    sendToAnalytics(enhancedMetric);
  }, []);

  useEffect(() => {
    // 動的インポートで Web Vitals を読み込み
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }, [onPerfEntry]);
}

// カスタムパフォーマンス監視
export function useCustomPerformanceMonitor() {
  useEffect(() => {
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
            totalTime: navigation.loadEventEnd - navigation.navigationStart,
          };

          // 開発環境でログ出力
          if (process.env.NODE_ENV === 'development') {
            console.table(metrics);
          }

          // 分析サービスに送信
          if (process.env.NODE_ENV === 'production') {
            fetch('/api/analytics/page-performance', {
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
  useEffect(() => {
    const observeResources = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry) => {
            // 大きなリソースを警告
            if (entry.transferSize && entry.transferSize > 1000000) { // 1MB以上
              console.warn(`🚨 大きなリソース検出: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
            }
            
            // 遅いリソースを警告
            if (entry.duration > 3000) { // 3秒以上
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
  useEffect(() => {
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
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
  useEffect(() => {
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
    pageLoadTime: navigation ? navigation.loadEventEnd - navigation.navigationStart : 0,
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.navigationStart : 0,
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    
    // リソース統計
    resourceCount: resources.length,
    totalResourceSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0),
    largestResource: resources.reduce((max, resource) => 
      (resource.transferSize || 0) > (max.transferSize || 0) ? resource : max, resources[0]
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