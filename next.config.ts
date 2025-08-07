import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // ESLintをビルド時に無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 画像ドメインの設定
  images: {
    domains: ['assets.coingecko.com', 'coin-images.coingecko.com'],
  },
  
  // 環境変数の検証
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Webpack設定のカスタマイズ
  webpack: (config, { isServer }) => {
    // サーバーサイドでのみnode modulesを外部化
    if (isServer) {
      config.externals = [...(config.externals || []), 'bcrypt'];
    }
    
    return config;
  },
  
  // 実験的機能
  experimental: {
    // Server Actionsの有効化
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // ヘッダー設定（Vercel以外の環境用）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

// Sentry設定オプション
const sentryWebpackPluginOptions = {
  // 追加のSentry Webpack Plugin設定
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // ソースマップの非表示化（本番環境）
  hideSourceMaps: process.env.NODE_ENV === 'production',
  
  // ビルドエラー時の処理
  disableLogger: true,
  
  // ソースマップのアップロードをスキップする条件
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  
  // 自動監視設定
  automaticVercelMonitors: true,
};

// Sentryプラグインでラップしてエクスポート
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
