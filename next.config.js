/** @type {import('next').NextConfig} */
const nextConfig = {
  // 獨立アプリデプロイメント用設定
  output: 'standalone',
  
  // React設定
  reactStrictMode: true, // 本番環境ではStrictモードを有効化
  
  // ビルド設定
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  // 画像最適化
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日キャッシュ
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 実験的機能 - パフォーマンス最適化
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
      'recharts',
    ],
    // PPR機能は安定版では無効化
    // ppr: 'incremental',
  },
  // SWC最小化はNext.js 15でデフォルトで有効
  // ヘッダー設定 - セキュリティ強化
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },
  
  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ]
  },
  
  // 圧縮設定
  compress: true,
}

module.exports = nextConfig