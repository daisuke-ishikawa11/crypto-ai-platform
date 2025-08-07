// 📊 Core Web Vitals レポーター
// リアルタイムパフォーマンス監視・最適化提案コンポーネント

'use client';

import React, { useEffect, useState } from 'react';
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
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
  cls: {
    good: 0.1,
    poor: 0.25,
    description: 'Cumulative Layout Shift - ページの視覚的安定性'
  },
  fcp: {
    good: 1800,
    poor: 3000,
    description: 'First Contentful Paint - 最初のコンテンツ表示時間'
  },
  fid: {
    good: 100,
    poor: 300,
    description: 'First Input Delay - 最初の入力応答時間'
  },
  lcp: {
    good: 2500,
    poor: 4000,
    description: 'Largest Contentful Paint - 最大コンテンツ表示時間'
  },
  ttfb: {
    good: 800,
    poor: 1800,
    description: 'Time to First Byte - 最初のバイト受信時間'
  }
};

export function WebVitalsReporter({ 
  showReporter = false, 
  onVitalsUpdate,
  autoOptimize = true 
}: {
  showReporter?: boolean;
  onVitalsUpdate?: (vitals: WebVitalsData) => void;
  autoOptimize?: boolean;
}) {
  const [vitals, setVitals] = useState<WebVitalsData>({
    cls: null,
    fcp: null,
    fid: null,
    lcp: null,
    ttfb: null
  });

  const [optimizations, setOptimizations] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(showReporter);

  useEffect(() => {
    // Core Web Vitals 測定開始
    initWebVitalsMonitoring();
    
    // 開発環境でのみ表示
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (onVitalsUpdate) {
      onVitalsUpdate(vitals);
    }
    
    if (autoOptimize) {
      generateOptimizations();
    }
  }, [vitals, onVitalsUpdate, autoOptimize]);

  const initWebVitalsMonitoring = () => {
    // CLS (Cumulative Layout Shift)
    getCLS((metric) => {
      const vital = createVital('cls', metric.value);
      setVitals(prev => ({ ...prev, cls: vital }));
      reportMetric('cls', metric.value);
    });

    // FCP (First Contentful Paint)
    getFCP((metric) => {
      const vital = createVital('fcp', metric.value);
      setVitals(prev => ({ ...prev, fcp: vital }));
      reportMetric('fcp', metric.value);
    });

    // FID (First Input Delay)
    getFID((metric) => {
      const vital = createVital('fid', metric.value);
      setVitals(prev => ({ ...prev, fid: vital }));
      reportMetric('fid', metric.value);
    });

    // LCP (Largest Contentful Paint)
    getLCP((metric) => {
      const vital = createVital('lcp', metric.value);
      setVitals(prev => ({ ...prev, lcp: vital }));
      reportMetric('lcp', metric.value);
    });

    // TTFB (Time to First Byte)
    getTTFB((metric) => {
      const vital = createVital('ttfb', metric.value);
      setVitals(prev => ({ ...prev, ttfb: vital }));
      reportMetric('ttfb', metric.value);
    });
  };

  const createVital = (name: keyof typeof VITALS_CONFIG, value: number): WebVital => {
    const config = VITALS_CONFIG[name];
    let rating: 'good' | 'needs-improvement' | 'poor';
    
    if (value <= config.good) {
      rating = 'good';
    } else if (value <= config.poor) {
      rating = 'needs-improvement';
    } else {
      rating = 'poor';
    }

    return {
      name: name.toUpperCase(),
      value,
      rating,
      threshold: config,
      description: config.description
    };
  };

  const reportMetric = (name: string, value: number) => {
    // パフォーマンス監視システムに送信
    performanceMonitor.recordMetric({
      name: `core-web-vitals.${name}`,
      value,
      unit: name === 'cls' ? 'score' : 'ms',
      timestamp: Date.now(),
      tags: {
        page: window.location.pathname,
        userAgent: navigator.userAgent
      }
    });

    // Cloudflare Analytics に送信
    if (typeof ANALYTICS !== 'undefined') {
      ANALYTICS.writeDataPoint({
        blobs: [name, 'core-web-vitals'],
        doubles: [value],
        indexes: [window.location.pathname]
      });
    }

    // 開発環境でのログ出力
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name.toUpperCase()}: ${value}${name === 'cls' ? '' : 'ms'}`);
    }
  };

  const generateOptimizations = () => {
    const suggestions: string[] = [];

    // CLS 最適化提案
    if (vitals.cls && vitals.cls.rating !== 'good') {
      suggestions.push('画像・広告のサイズ指定を追加');
      suggestions.push('フォント読み込みの最適化');
      suggestions.push('動的コンテンツの位置固定');
    }

    // FCP 最適化提案
    if (vitals.fcp && vitals.fcp.rating !== 'good') {
      suggestions.push('Critical CSS のインライン化');
      suggestions.push('不要なJavaScriptの除去');
      suggestions.push('フォントプリロードの実装');
    }

    // FID 最適化提案
    if (vitals.fid && vitals.fid.rating !== 'good') {
      suggestions.push('長時間タスクの分割');
      suggestions.push('Service Worker の実装');
      suggestions.push('JavaScript実行の最適化');
    }

    // LCP 最適化提案
    if (vitals.lcp && vitals.lcp.rating !== 'good') {
      suggestions.push('画像の最適化・圧縮');
      suggestions.push('CDN の活用');
      suggestions.push('重要リソースのプリロード');
    }

    // TTFB 最適化提案
    if (vitals.ttfb && vitals.ttfb.rating !== 'good') {
      suggestions.push('サーバー応答時間の改善');
      suggestions.push('CDN の活用');
      suggestions.push('データベースクエリ最適化');
    }

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

  const formatValue = (vital: WebVital) => {
    if (vital.name === 'CLS') {
      return vital.value.toFixed(3);
    }
    return `${Math.round(vital.value)}ms`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg border border-gray-200 p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">📊 Web Vitals</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Core Web Vitals 表示 */}
      <div className="space-y-2 mb-4">
        {Object.entries(vitals).map(([key, vital]) => (
          vital && (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>{getRatingEmoji(vital.rating)}</span>
                <span className="font-medium text-sm">{vital.name}</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(vital.rating)}`}>
                {formatValue(vital)}
              </div>
            </div>
          )
        ))}
      </div>

      {/* 最適化提案 */}
      {optimizations.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-sm text-gray-900 mb-2">💡 最適化提案</h4>
          <ul className="space-y-1">
            {optimizations.slice(0, 3).map((suggestion, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="mr-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
          {optimizations.length > 3 && (
            <p className="text-xs text-gray-500 mt-1">
              +{optimizations.length - 3} more suggestions
            </p>
          )}
        </div>
      )}

      {/* 詳細リンク */}
      <div className="border-t pt-3 mt-3">
        <button
          onClick={() => {
            console.table(vitals);
            console.log('🔧 Optimizations:', optimizations);
          }}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          📝 Console に詳細出力
        </button>
      </div>
    </div>
  );
}

// フック版
export function useWebVitals() {
  const [vitals, setVitals] = useState<WebVitalsData>({
    cls: null,
    fcp: null,
    fid: null,
    lcp: null,
    ttfb: null
  });

  useEffect(() => {
    getCLS((metric) => {
      const vital = createVital('cls', metric.value);
      setVitals(prev => ({ ...prev, cls: vital }));
    });

    getFCP((metric) => {
      const vital = createVital('fcp', metric.value);
      setVitals(prev => ({ ...prev, fcp: vital }));
    });

    getFID((metric) => {
      const vital = createVital('fid', metric.value);
      setVitals(prev => ({ ...prev, fid: vital }));
    });

    getLCP((metric) => {
      const vital = createVital('lcp', metric.value);
      setVitals(prev => ({ ...prev, lcp: vital }));
    });

    getTTFB((metric) => {
      const vital = createVital('ttfb', metric.value);
      setVitals(prev => ({ ...prev, ttfb: vital }));
    });
  }, []);

  const createVital = (name: keyof typeof VITALS_CONFIG, value: number): WebVital => {
    const config = VITALS_CONFIG[name];
    let rating: 'good' | 'needs-improvement' | 'poor';
    
    if (value <= config.good) {
      rating = 'good';
    } else if (value <= config.poor) {
      rating = 'needs-improvement';
    } else {
      rating = 'poor';
    }

    return {
      name: name.toUpperCase(),
      value,
      rating,
      threshold: config,
      description: config.description
    };
  };

  return vitals;
}

export default WebVitalsReporter;