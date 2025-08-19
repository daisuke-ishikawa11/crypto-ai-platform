/**
 * Bundle Optimization Configuration
 * Code splitting, tree shaking, and lazy loading
 */

import dynamic from 'next/dynamic'

// Dynamic imports with loading states - string returns for JSX compatibility
export const DynamicImports = {
  // Dashboard components
  Dashboard: dynamic(() => import('@/app/(dashboard)/dashboard/page'), {
    loading: () => 'Loading...',
    ssr: false,
  }),
  
  MarketAnalysis: dynamic(() => import('@/components/market/market-analysis'), {
    loading: () => 'Loading...',
    ssr: false,
  }),
  
  RiskDashboard: dynamic(() => import('@/components/risk/risk-dashboard'), {
    loading: () => 'Loading...',
    ssr: false,
  }),
  
  TradingSignals: dynamic(() => import('@/components/trading/trading-signals'), {
    loading: () => 'Loading...',
    ssr: false,
  }),
  
  // AI Components
  AIChat: dynamic(() => import('@/app/ai/chat/page'), {
    loading: () => 'Loading...',
    ssr: false,
  }),
}

// Webpack optimization config for Next.js
export const webpackOptimization = {
  splitChunks: {
    chunks: 'all' as const,
    cacheGroups: {
      // Vendor chunk for React ecosystem
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
        name: 'react',
        chunks: 'all' as const,
        priority: 40,
        enforce: true,
      },
      
      // Large libraries
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all' as const,
        priority: 30,
        minChunks: 2,
      },
      
      // UI components
      ui: {
        test: /[\\/]components[\\/]ui[\\/]/,
        name: 'ui',
        chunks: 'all' as const,
        priority: 35,
      },
      
      // Charts and visualization
      charts: {
        test: /[\\/]node_modules[\\/](recharts|d3|victory)[\\/]/,
        name: 'charts',
        chunks: 'all' as const,
        priority: 32,
      },
      
      // AI/ML libraries  
      ai: {
        test: /[\\/]node_modules[\\/](@tensorflow|brain\.js|ml-matrix)[\\/]/,
        name: 'ai',
        chunks: 'all' as const,
        priority: 33,
      },
      
      // Crypto libraries
      crypto: {
        test: /[\\/]node_modules[\\/](ethers|web3|@web3|crypto)[\\/]/,
        name: 'crypto',
        chunks: 'all' as const,
        priority: 34,
      },
    },
  },
}

// Build ID generation for cache busting
export function getBuildId(): string {
  return process.env.BUILD_ID || `build-${Date.now()}`
}

// Tree shaking optimization
export const treeShakingConfig = {
  usedExports: true,
  sideEffects: false,
  optimization: {
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: false,
  },
}

// Module resolution optimization
export const moduleOptimization = {
  alias: {
    '@': './src',
  },
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  fallback: {
    fs: false,
    net: false,
    tls: false,
  },
}

// Performance budgets
export const performanceBudgets = {
  maxAssetSize: 500000, // 500KB
  maxEntrypointSize: 800000, // 800KB
  hints: 'warning' as const,
}

const bundleOptimizer = {
  DynamicImports,
  webpackOptimization,
  getBuildId,
  treeShakingConfig,
  moduleOptimization,
  performanceBudgets,
}

export default bundleOptimizer
