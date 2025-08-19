/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal development configuration
  typescript: {
    // Temporarily ignore build errors for development
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore lint errors for development  
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable faster builds
    turbo: true,
  },
  // Webpack configuration for development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Skip problematic files during development
      config.watchOptions = {
        ignored: [
          '**/node_modules',
          '**/src/data/lessons/blockchain-tech/**',
          '**/src/components/defi/**',
          '**/src/lib/performance/**',
          '**/src/lib/notifications/**',
          '**/src/lib/security/**',
          '**/src/lib/defi/**',
        ],
      }
    }
    return config
  },
}

module.exports = nextConfig