// 🧪 Jest設定
// 統合テスト・単体テスト・E2Eテストの包括的設定

module.exports = {
  // テスト環境
  testEnvironment: 'node',
  
  // TypeScript設定
  preset: 'ts-jest',
  
  // グローバル設定
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }
  },
  
  // モジュール解決
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // セットアップファイル
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // テストパターン
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  
  // 除外パターン
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/out/',
    '/.open-next/'
  ],
  
  // カバレッジ設定
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  
  // トランスフォーム設定
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  
  // モジュールファイル拡張子
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // タイムアウト設定
  testTimeout: 30000,
  
  // 並列実行設定
  maxWorkers: '50%',
  
  // ウォッチプラグイン
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  
  // プロジェクト別設定
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/tests/setup-unit.ts']
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.{ts,tsx}'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/setup-integration.ts']
    },
    {
      displayName: 'e2e',
      testMatch: ['<rootDir>/tests/e2e/**/*.test.{ts,tsx}'],
      preset: 'jest-playwright-preset',
      setupFilesAfterEnv: ['<rootDir>/tests/setup-e2e.ts']
    }
  ],
  
  // レポーター設定
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Crypto AI Platform Test Report',
        outputPath: './test-report/index.html',
        includeFailureMsg: true,
        includeConsoleLog: true
      }
    ],
    [
      'jest-junit',
      {
        outputDirectory: './test-results',
        outputName: 'junit.xml',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{classname} - {title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true
      }
    ]
  ],
  
  // スナップショット設定
  snapshotResolver: './tests/snapshot-resolver.js',
  
  // キャッシュ設定
  cacheDirectory: '.jest-cache',
  
  // 詳細設定
  verbose: true,
  
  // エラーハンドリング
  bail: 0,
  
  // 通知設定
  notify: true,
  notifyMode: 'failure-change'
};