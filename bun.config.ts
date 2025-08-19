// Bun configuration for testing
// Jest-compatible fast test runner configuration
import { defineConfig } from 'bun'

export default defineConfig({
  test: {
    // Jest互換モード
    preset: 'jest',
    
    // テストファイルパターン
    testMatch: [
      '**/tests/unit/**/*.test.{ts,tsx}',
      '**/tests/integration/**/*.test.{ts,tsx}'
    ],
    
    // テスト環境設定
    environment: 'jsdom',
    
    // セットアップファイル
    setupFilesAfterEnv: ['<rootDir>/tests/setup-unit.ts'],
    
    // カバレッジ設定
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/types/**/*',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // パフォーマンス最適化
    timeout: 10000,
    
    // モック設定
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
  },
  
  // ランタイム設定
  runtime: {
    // メモリ最適化
    minify: false,
    sourcemap: 'inline'
  }
})