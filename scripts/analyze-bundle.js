#!/usr/bin/env node

// 🔍 バンドル分析・最適化スクリプト
// Next.js Bundle Analyzer + カスタム分析

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Crypto AI Platform - バンドル分析開始');
console.log('=====================================');

// 分析設定
const BUNDLE_SIZE_LIMITS = {
  chunks: {
    maxSize: 244000, // 244KB (gzipped)
    warning: 200000  // 200KB (gzipped)
  },
  total: {
    maxSize: 512000, // 512KB total
    warning: 400000  // 400KB warning
  },
  javascript: {
    maxSize: 300000, // 300KB JS
    warning: 250000  // 250KB warning
  },
  css: {
    maxSize: 50000,  // 50KB CSS
    warning: 40000   // 40KB warning
  }
};

const CRITICAL_PATHS = [
  'pages/_app',
  'pages/index',
  'pages/dashboard',
  'pages/auth',
  'components/ui',
  'lib/supabase',
  'lib/stripe'
];

async function analyzeBundles() {
  console.log('\n📦 1. バンドルビルド実行中...');
  
  try {
    // プロダクションビルド実行
    execSync('npm run build', { 
      stdio: 'inherit',
      env: { 
        ...process.env, 
        ANALYZE: 'true',
        NODE_ENV: 'production'
      }
    });
    
    console.log('✅ ビルド完了');
  } catch (error) {
    console.error('❌ ビルド失敗:', error.message);
    process.exit(1);
  }

  console.log('\n📊 2. バンドルサイズ分析中...');
  
  // Next.js build output 分析
  const buildDir = path.join(process.cwd(), '.next');
  const manifestPath = path.join(buildDir, 'build-manifest.json');
  
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    analyzeBuildManifest(manifest);
  }

  // Webpack stats 分析
  const statsPath = path.join(buildDir, 'static', 'chunks');
  if (fs.existsSync(statsPath)) {
    analyzeChunks(statsPath);
  }

  console.log('\n🎯 3. パフォーマンス推奨事項生成中...');
  generateOptimizationRecommendations();
}

function analyzeBuildManifest(manifest) {
  console.log('\n📋 ビルド マニフェスト分析:');
  
  Object.entries(manifest.pages).forEach(([page, files]) => {
    const jsFiles = files.filter(file => file.endsWith('.js'));
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    console.log(`\n  📄 ${page}:`);
    console.log(`    JS ファイル: ${jsFiles.length}`);
    console.log(`    CSS ファイル: ${cssFiles.length}`);
    
    // ファイルサイズチェック
    jsFiles.forEach(file => {
      const filePath = path.join(process.cwd(), '.next', file);
      if (fs.existsSync(filePath)) {
        const size = fs.statSync(filePath).size;
        const status = getFileSizeStatus(size, 'javascript');
        console.log(`      📦 ${path.basename(file)}: ${formatSize(size)} ${status}`);
      }
    });
  });
}

function analyzeChunks(chunksDir) {
  console.log('\n📦 チャンク分析:');
  
  const chunkFiles = fs.readdirSync(chunksDir)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(chunksDir, file);
      const size = fs.statSync(filePath).size;
      return { file, size, path: filePath };
    })
    .sort((a, b) => b.size - a.size);

  console.log('\n  🏆 大きなチャンク (上位10):');
  chunkFiles.slice(0, 10).forEach((chunk, index) => {
    const status = getFileSizeStatus(chunk.size, 'chunks');
    console.log(`    ${index + 1}. ${chunk.file}: ${formatSize(chunk.size)} ${status}`);
  });

  // 重複コード検出
  console.log('\n🔍 重複コード分析中...');
  detectDuplicateCode(chunkFiles);
}

function detectDuplicateCode(chunkFiles) {
  // 簡易的な重複検出（ファイル名パターンベース）
  const duplicatePatterns = [
    'node_modules',
    'react',
    'lodash',
    'moment',
    'date-fns'
  ];

  const suspiciousChunks = chunkFiles.filter(chunk => 
    duplicatePatterns.some(pattern => chunk.file.includes(pattern))
  );

  if (suspiciousChunks.length > 0) {
    console.log('\n  ⚠️  重複の可能性があるチャンク:');
    suspiciousChunks.forEach(chunk => {
      console.log(`    - ${chunk.file}: ${formatSize(chunk.size)}`);
    });
  }
}

function getFileSizeStatus(size, type) {
  const limits = BUNDLE_SIZE_LIMITS[type];
  if (!limits) return '';
  
  if (size > limits.maxSize) {
    return '🔴 制限超過';
  } else if (size > limits.warning) {
    return '🟡 警告';
  } else {
    return '🟢 良好';
  }
}

function formatSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function generateOptimizationRecommendations() {
  const recommendations = [
    {
      category: '🚀 コード分割',
      items: [
        'ページレベルでの動的インポート実装',
        'コンポーネントレベルでの遅延読み込み',
        'ライブラリの動的インポート (Chart.js, モーダルなど)',
        'ルートベースの自動コード分割確認'
      ]
    },
    {
      category: '📦 バンドル最適化',
      items: [
        'tree-shaking 効果の確認・向上',
        '未使用パッケージの除去',
        'webpack-bundle-analyzer による詳細分析',
        'モジュール重複の解決'
      ]
    },
    {
      category: '🎯 パフォーマンス改善',
      items: [
        'Critical CSS の実装',
        '画像最適化 (Next.js Image)',
        'フォント最適化',
        'Service Worker実装',
        'キャッシュ戦略の見直し'
      ]
    },
    {
      category: '🔧 技術的最適化',
      items: [
        'Webpack 設定の最適化',
        'SWC コンパイラー活用',
        'ESM モジュール移行',
        'Babel 設定の見直し'
      ]
    }
  ];

  console.log('\n💡 最適化推奨事項:');
  recommendations.forEach(rec => {
    console.log(`\n${rec.category}:`);
    rec.items.forEach(item => {
      console.log(`  • ${item}`);
    });
  });

  // 具体的な実装例
  console.log('\n📝 実装例:');
  console.log(`
  // 1. 動的インポート例
  const Chart = dynamic(() => import('chart.js'), { ssr: false });
  
  // 2. ページレベル分割
  const Dashboard = dynamic(() => import('../components/Dashboard'));
  
  // 3. 条件付き読み込み
  if (userPlan === 'pro') {
    const AdvancedFeatures = await import('../components/AdvancedFeatures');
  }
  
  // 4. Tree-shaking 最適化
  import { debounce } from 'lodash-es'; // ❌ 
  import debounce from 'lodash.debounce'; // ✅
  `);
}

function checkCriticalPaths() {
  console.log('\n🎯 4. クリティカルパス分析中...');
  
  CRITICAL_PATHS.forEach(path => {
    console.log(`\n  📍 ${path}:`);
    
    // ファイル存在確認
    const possibleExtensions = ['.tsx', '.ts', '.jsx', '.js'];
    let found = false;
    
    possibleExtensions.forEach(ext => {
      const fullPath = `src/${path}${ext}`;
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        console.log(`    ✅ ${fullPath} (${formatSize(stats.size)})`);
        found = true;
      }
    });
    
    if (!found) {
      console.log(`    ⚠️  ファイルが見つかりません`);
    }
  });
}

function generateReport() {
  console.log('\n📊 5. レポート生成中...');
  
  const report = {
    timestamp: new Date().toISOString(),
    analysis: {
      bundleSize: 'TODO: 実装',
      chunks: 'TODO: 実装',
      recommendations: 'TODO: 実装'
    },
    links: {
      bundleAnalyzer: 'http://localhost:8080',
      lighthouse: 'https://pagespeed.web.dev/',
      webpackAnalyzer: '.next/analyze/index.html'
    }
  };

  // レポートファイル保存
  const reportPath = path.join(process.cwd(), 'bundle-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n✅ レポート保存完了: ${reportPath}`);
  console.log('\n🌐 Bundle Analyzer の確認:');
  console.log('   npm run analyze');
  console.log('   http://localhost:8080');
}

// メイン実行
async function main() {
  try {
    await analyzeBundles();
    checkCriticalPaths();
    generateReport();
    
    console.log('\n🎉 バンドル分析完了！');
    console.log('\n📈 次のステップ:');
    console.log('1. Bundle Analyzer でビジュアル分析');
    console.log('2. 推奨事項の優先順位付け');
    console.log('3. パフォーマンス改善の実装');
    console.log('4. 改善後の再測定');
    
  } catch (error) {
    console.error('\n❌ 分析エラー:', error);
    process.exit(1);
  }
}

// コマンドライン引数処理
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🔍 Bundle Analyzer Usage:

基本実行:
  node scripts/analyze-bundle.js

オプション:
  --help, -h    このヘルプを表示
  --verbose     詳細ログ出力
  --report      レポートのみ生成

例:
  node scripts/analyze-bundle.js --verbose
  npm run analyze:bundle
  `);
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { analyzeBundles, generateOptimizationRecommendations };