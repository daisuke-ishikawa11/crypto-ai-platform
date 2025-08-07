// 🚀 パフォーマンス最適化 - 遅延読み込みコンポーネント
// 重いコンポーネントを動的インポートで最適化

'use client';

import { lazy, Suspense, ComponentType, useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

// ローディングスケルトン用の共通コンポーネント
export function LoadingSkeleton({ 
  height = "h-96", 
  className = "" 
}: { 
  height?: string; 
  className?: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse ${height} ${className}`}
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </motion.div>
  );
}

// カードスケルトン
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

// 統計カードスケルトン
export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

// 高次コンポーネント（HOC）- 遅延読み込みラッパー
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: ComponentType
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return function LazyLoadedComponent(props: T) {
    const FallbackComponent = fallback || LoadingSkeleton;
    
    return (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// 遅延読み込み対象コンポーネント（重いコンポーネント用）
export const LazyPricePrediction = lazy(() => 
  import('@/components/ai/price-prediction').then(module => ({
    default: module.default
  }))
);

export const LazyMarketOverview = lazy(() => 
  import('@/components/market/market-overview').then(module => ({
    default: module.default
  }))
);

export const LazyCoinAnalysis = lazy(() => 
  import('@/components/market/coin-analysis').then(module => ({
    default: module.default
  }))
);

export const LazyTopMovers = lazy(() => 
  import('@/components/market/top-movers').then(module => ({
    default: module.default
  }))
);

export const LazyTrendingCoins = lazy(() => 
  import('@/components/market/trending-coins').then(module => ({
    default: module.default
  }))
);

// 遅延読み込み用ラッパーコンポーネント
export function LazyPricePredictionWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton height="h-96" />}>
      <LazyPricePrediction />
    </Suspense>
  );
}

export function LazyMarketOverviewWrapper() {
  return (
    <Suspense fallback={<StatCardSkeleton count={6} />}>
      <LazyMarketOverview />
    </Suspense>
  );
}

export function LazyCoinAnalysisWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton height="h-80" />}>
      <LazyCoinAnalysis />
    </Suspense>
  );
}

export function LazyTopMoversWrapper() {
  return (
    <Suspense fallback={<CardSkeleton count={6} />}>
      <LazyTopMovers />
    </Suspense>
  );
}

export function LazyTrendingCoinsWrapper() {
  return (
    <Suspense fallback={<CardSkeleton count={4} />}>
      <LazyTrendingCoins />
    </Suspense>
  );
}

// インタラクション用最適化フック
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  {
    threshold = 0.1,
    rootMargin = '50px',
    freezeOnceVisible = true,
  } = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        setIsVisible(isElementVisible);
        
        if (isElementVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin, hasBeenVisible]);

  return freezeOnceVisible ? hasBeenVisible : isVisible;
}

// メモ化されたアニメーションコンポーネント
export const OptimizedMotionDiv = memo(motion.div);
export const OptimizedMotionSection = memo(motion.section);
export const OptimizedMotionArticle = memo(motion.article);

// パフォーマンス監視用ユーティリティ
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
  } else {
    fn();
  }
}

// バンドルサイズ削減用のアイコン最適化
export const optimizedIcons = {
  // 必要なアイコンのみを動的インポート
  loadIcon: (iconName: string) => lazy(() => 
    import('lucide-react').then(module => ({
      default: module[iconName as keyof typeof module] as ComponentType
    }))
  )
};