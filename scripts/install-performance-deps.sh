#!/bin/bash

# 🚀 パフォーマンステスト依存関係インストール
# Lighthouse・Bundle Analyzer・Web Vitals 関連パッケージ

echo "📦 パフォーマンステスト依存関係をインストール中..."

# 開発依存関係
npm install --save-dev \
  lighthouse \
  chrome-launcher \
  webpack-bundle-analyzer \
  @next/bundle-analyzer \
  workbox-webpack-plugin \
  compression-webpack-plugin

# ランタイム依存関係
npm install --save \
  web-vitals \
  workbox-sw \
  workbox-strategies \
  workbox-precaching \
  workbox-routing

echo "✅ インストール完了"

# 設定ファイル作成
echo "📝 設定ファイルを作成中..."

# .lighthouserc.js
cat > .lighthouserc.js << 'EOF'
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/dashboard',
        'http://localhost:3000/learning',
        'http://localhost:3000/market'
      ],
      startServerCommand: 'npm run start',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.85 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
EOF

# webpack.config.js (bundle analyzer用)
cat > webpack.config.js << 'EOF'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: true,
      statsOptions: { source: false }
    })
  ]
};
EOF

echo "✅ 設定ファイル作成完了"

# パフォーマンス監視設定
echo "🔧 パフォーマンス監視設定を作成中..."

mkdir -p src/lib/monitoring

echo "✅ セットアップ完了！"
echo ""
echo "🚀 使用方法:"
echo "  npm run test:performance       # 全パフォーマンステスト"
echo "  npm run test:performance:lighthouse  # Lighthouseのみ"
echo "  npm run analyze:bundle         # バンドル分析"
echo "  npm run analyze               # Next.js Bundle Analyzer"
echo ""
echo "📊 レポート確認:"
echo "  ./performance-test-report.html # パフォーマンステスト結果"
echo "  ./bundle-analysis-report.json  # バンドル分析結果"