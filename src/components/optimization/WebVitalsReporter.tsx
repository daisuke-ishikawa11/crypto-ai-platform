// 📊 Core Web Vitals レポーター
// リアルタイムパフォーマンス監視・最適化提案コンポーネント

'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import { onCLS, onFCP, onFID, onLCP, onTTFB, type Metric } from 'web-vitals';

// Cloudflare Analytics グローバルの型宣言（存在しない環境では undefined）
declare const ANALYTICS: { writeDataPoint: (dp: { dataset: string; blobs: string[]; doubles: number[]; indexes: string[] }) => void } | undefined;
import { performanceMonitor } from '@/lib/monitoring/performance';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
  description: string;
}

interface WebVitalsData {
  cls: WebVital | null;
  fcp: WebVital | null;
  fid: WebVital | null;
  lcp: WebVital | null;
  ttfb: WebVital | null;
}

const VITALS_CONFIG = {
  cls: { good: 0.1, poor: 0.25, description: 'Cumulative Layout Shift - ページの視覚的安定性' },
  fcp: { good: 1800, poor: 3000, description: 'First Contentful Paint - 最初のコンテンツ表示時間' },
  fid: { good: 100, poor: 300, description: 'First Input Delay - 最初の入力応答時間' },
  lcp: { good: 2500, poor: 4000, description: 'Largest Contentful Paint - 最大コンテンツ表示時間' },
  ttfb: { good: 800, poor: 1800, description: 'Time to First Byte - 最初のバイト受信時間' }
} as const;

export function WebVitalsReporter({ 
  showReporter = false, 
  onVitalsUpdate,
  autoOptimize = true 
}: {
  showReporter?: boolean;
  onVitalsUpdate?: (vitals: WebVitalsData) => void;
  autoOptimize?: boolean;
}) {
  const [vitals, setVitals] = React.useState<WebVitalsData>({ cls: null, fcp: null, fid: null, lcp: null, ttfb: null });
  const [optimizations, setOptimizations] = React.useState<string[]>([]);
  const [isVisible, setIsVisible] = React.useState(showReporter);

  React.useEffect(() => {
    // Core Web Vitals 測定開始
    initWebVitalsMonitoring();
    // 開発環境でのみ表示
    if (process.env.NODE_ENV === 'development') setIsVisible(true);
  }, []);

  React.useEffect(() => {
    if (onVitalsUpdate) onVitalsUpdate(vitals);
    if (autoOptimize) generateOptimizations();
  }, [vitals, onVitalsUpdate, autoOptimize]);

  const initWebVitalsMonitoring = () => {
    onCLS((metric: Metric) => { const vital = createVital('cls', metric.value); setVitals(prev => ({ ...prev, cls: vital })); reportMetric('cls', metric.value); });
    onFCP((metric: Metric) => { const vital = createVital('fcp', metric.value); setVitals(prev => ({ ...prev, fcp: vital })); reportMetric('fcp', metric.value); });
    onFID((metric: Metric) => { const vital = createVital('fid', metric.value); setVitals(prev => ({ ...prev, fid: vital })); reportMetric('fid', metric.value); });
    onLCP((metric: Metric) => { const vital = createVital('lcp', metric.value); setVitals(prev => ({ ...prev, lcp: vital })); reportMetric('lcp', metric.value); });
    onTTFB((metric: Metric) => { const vital = createVital('ttfb', metric.value); setVitals(prev => ({ ...prev, ttfb: vital })); reportMetric('ttfb', metric.value); });
  };

  const createVital = (name: keyof typeof VITALS_CONFIG, value: number): WebVital => {
    const config = VITALS_CONFIG[name];
    const rating: 'good' | 'needs-improvement' | 'poor' = value <= config.good ? 'good' : value <= config.poor ? 'needs-improvement' : 'poor';
    return { name: name.toUpperCase(), value, rating, threshold: config, description: config.description };
  };

  const reportMetric = (name: string, value: number) => {
    // パフォーマンス監視システムに送信
    performanceMonitor.recordMetric({
      name: `core-web-vitals.${name}`,
      value,
      unit: name === 'cls' ? 'score' : 'ms',
      timestamp: Date.now(),
      tags: { page: window.location.pathname, userAgent: navigator.userAgent }
    });

    // Cloudflare Analytics に送信（dataset必須に合わせる）
  if (typeof ANALYTICS !== 'undefined') {
      const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    ANALYTICS.writeDataPoint({
      dataset: 'web_vitals',
      blobs: [name, 'core-web-vitals'],
      doubles: [value],
      indexes: [path]
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name.toUpperCase()}: ${value}${name === 'cls' ? '' : 'ms'}`);
    }
  };

  const generateOptimizations = () => {
    const suggestions: string[] = [];
    if (vitals.cls && vitals.cls.rating !== 'good') { suggestions.push('画像・広告のサイズ指定を追加', 'フォント読み込みの最適化', '動的コンテンツの位置固定'); }
    if (vitals.fcp && vitals.fcp.rating !== 'good') { suggestions.push('Critical CSS のインライン化', '不要なJavaScriptの除去', 'フォントプリロードの実装'); }
    if (vitals.fid && vitals.fid.rating !== 'good') { suggestions.push('長時間タスクの分割', 'Service Worker の実装', 'JavaScript実行の最適化'); }
    if (vitals.lcp && vitals.lcp.rating !== 'good') { suggestions.push('画像の最適化・圧縮', 'CDN の活用', '重要リソースのプリロード'); }
    if (vitals.ttfb && vitals.ttfb.rating !== 'good') { suggestions.push('サーバー応答時間の改善', 'CDN の活用', 'データベースクエリ最適化'); }
    setOptimizations([...new Set(suggestions)]);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRatingEmoji = (rating: string) => {
    switch (rating) {
      case 'good': return '✅';
      case 'needs-improvement': return '⚠️';
      case 'poor': return '❌';
      default: return '⏳';
    }
  };

  const formatValue = (vital: WebVital) => vital.name === 'CLS' ? vital.value.toFixed(3) : `${Math.round(vital.value)}ms`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg border border-gray-200 p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">📊 Web Vitals</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      <div className="space-y-2 mb-4">
        {Object.entries(vitals).map(([key, vital]) => vital && (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>{getRatingEmoji(vital.rating)}</span>
              <span className="font-medium text-sm">{vital.name}</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(vital.rating)}`}>{formatValue(vital)}</div>
          </div>
        ))}
      </div>
      {optimizations.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-sm text-gray-900 mb-2">💡 最適化提案</h4>
          <ul className="space-y-1">
            {optimizations.slice(0, 3).map((suggestion, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start"><span className="mr-1">•</span><span>{suggestion}</span></li>
            ))}
          </ul>
          {optimizations.length > 3 && (<p className="text-xs text-gray-500 mt-1">+{optimizations.length - 3} more suggestions</p>)}
        </div>
      )}
      <div className="border-t pt-3 mt-3">
        <button onClick={() => { console.table(vitals); console.log('🔧 Optimizations:', optimizations); }} className="text-xs text-blue-600 hover:text-blue-800">📝 Console に詳細出力</button>
      </div>
    </div>
  );
}

// フック版
export function useWebVitals() {
  const [vitals, setVitals] = React.useState<WebVitalsData>({ cls: null, fcp: null, fid: null, lcp: null, ttfb: null });
  React.useEffect(() => {
    onCLS((metric: Metric) => setVitals(prev => ({ ...prev, cls: createVital('cls', metric.value) })));
    onFCP((metric: Metric) => setVitals(prev => ({ ...prev, fcp: createVital('fcp', metric.value) })));
    onFID((metric: Metric) => setVitals(prev => ({ ...prev, fid: createVital('fid', metric.value) })));
    onLCP((metric: Metric) => setVitals(prev => ({ ...prev, lcp: createVital('lcp', metric.value) })));
    onTTFB((metric: Metric) => setVitals(prev => ({ ...prev, ttfb: createVital('ttfb', metric.value) })));
  }, []);
  const createVital = (name: keyof typeof VITALS_CONFIG, value: number): WebVital => {
    const config = VITALS_CONFIG[name];
    const rating: 'good' | 'needs-improvement' | 'poor' = value <= config.good ? 'good' : value <= config.poor ? 'needs-improvement' : 'poor';
    return { name: name.toUpperCase(), value, rating, threshold: config, description: config.description };
  };
  return vitals;
}

export default WebVitalsReporter;
