#!/usr/bin/env node

// 🚀 パフォーマンステスト総合スイート
// Lighthouse・Bundle分析・メモリリーク検出・ロードテスト

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEST_CONFIG = {
  // テスト対象URL
  baseUrl: process.env.TEST_URL || 'http://localhost:3000',
  
  // テストページ
  pages: [
    { name: 'Landing', url: '/', weight: 'high' },
    { name: 'Dashboard', url: '/dashboard', weight: 'high', auth: true },
    { name: 'Learning', url: '/learning', weight: 'medium' },
    { name: 'Market', url: '/market', weight: 'medium' },
    { name: 'Alerts', url: '/alerts', weight: 'high', auth: true },
    { name: 'Portfolio', url: '/portfolio', weight: 'medium', auth: true }
  ],
  
  // Lighthouse設定
  lighthouse: {
    preset: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false
    }
  },
  
  // パフォーマンス目標
  targets: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 85,
    pwa: 80,
    fcp: 1800, // ms
    lcp: 2500, // ms
    fid: 100,  // ms
    cls: 0.1,  // score
    ttfb: 600, // ms
    speedIndex: 3000 // ms
  },

  // リソース制限
  limits: {
    totalSize: 2048, // KB
    jsSize: 512,     // KB
    cssSize: 100,    // KB
    imageSize: 1024, // KB
    requests: 50     // count
  }
};

class PerformanceTester {
  constructor() {
    this.results = {
      lighthouse: {},
      bundleAnalysis: {},
      loadTest: {},
      memoryProfile: {},
      summary: {}
    };
  }

  async runAllTests() {
    console.log('🚀 パフォーマンステスト開始');
    console.log('==========================');
    console.log(`📍 テスト対象: ${TEST_CONFIG.baseUrl}`);
    console.log(`📊 テストページ数: ${TEST_CONFIG.pages.length}`);
    console.log('');

    try {
      // 1. アプリケーション起動確認
      await this.checkApplicationStatus();
      
      // 2. Lighthouse テスト
      await this.runLighthouseTests();
      
      // 3. バンドル分析
      await this.runBundleAnalysis();
      
      // 4. リソース分析
      await this.runResourceAnalysis();
      
      // 5. メモリプロファイリング
      await this.runMemoryProfiling();
      
      // 6. ロードテスト
      await this.runLoadTest();
      
      // 7. レポート生成
      await this.generateReport();
      
      console.log('\n🎉 パフォーマンステスト完了！');
      
    } catch (error) {
      console.error('\n❌ テスト実行エラー:', error);
      process.exit(1);
    }
  }

  async checkApplicationStatus() {
    console.log('🔍 1. アプリケーション状態確認中...');
    
    try {
      const response = await fetch(`${TEST_CONFIG.baseUrl}/api/health`);
      if (response.ok) {
        console.log('✅ アプリケーション正常稼働中');
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      console.error('❌ アプリケーションにアクセスできません');
      console.log('💡 アプリケーションが起動していることを確認してください:');
      console.log('   npm run dev');
      throw error;
    }
  }

  async runLighthouseTests() {
    console.log('\n📊 2. Lighthouse テスト実行中...');
    
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    try {
      for (const page of TEST_CONFIG.pages) {
        console.log(`\n  🎯 ${page.name} (${page.url}) テスト中...`);
        
        const url = `${TEST_CONFIG.baseUrl}${page.url}`;
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          port: chrome.port,
          ...TEST_CONFIG.lighthouse
        };

        const runnerResult = await lighthouse(url, options);
        const scores = this.extractLighthouseScores(runnerResult.lhr);
        
        this.results.lighthouse[page.name] = {
          url,
          scores,
          metrics: this.extractCoreWebVitals(runnerResult.lhr),
          audits: this.extractFailedAudits(runnerResult.lhr),
          weight: page.weight
        };

        // スコア表示
        console.log(`    📈 Performance: ${scores.performance}`);
        console.log(`    ♿ Accessibility: ${scores.accessibility}`);
        console.log(`    ✅ Best Practices: ${scores.bestPractices}`);
        console.log(`    🔍 SEO: ${scores.seo}`);
        
        // Core Web Vitals表示
        const metrics = this.results.lighthouse[page.name].metrics;
        console.log(`    ⚡ FCP: ${metrics.fcp}ms`);
        console.log(`    🎯 LCP: ${metrics.lcp}ms`);
        console.log(`    👆 FID: ${metrics.fid}ms`);
        console.log(`    📐 CLS: ${metrics.cls}`);
        
        this.checkTargets(page.name, scores, metrics);
      }
    } finally {
      await chrome.kill();
    }
  }

  extractLighthouseScores(lhr) {
    return {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100)
    };
  }

  extractCoreWebVitals(lhr) {
    const audits = lhr.audits;
    return {
      fcp: audits['first-contentful-paint']?.numericValue || 0,
      lcp: audits['largest-contentful-paint']?.numericValue || 0,
      fid: audits['max-potential-fid']?.numericValue || 0,
      cls: audits['cumulative-layout-shift']?.numericValue || 0,
      ttfb: audits['server-response-time']?.numericValue || 0,
      speedIndex: audits['speed-index']?.numericValue || 0
    };
  }

  extractFailedAudits(lhr) {
    const failed = [];
    Object.entries(lhr.audits).forEach(([id, audit]) => {
      if (audit.score !== null && audit.score < 0.9) {
        failed.push({
          id,
          title: audit.title,
          score: audit.score,
          description: audit.description
        });
      }
    });
    return failed.slice(0, 5); // 上位5つの問題のみ
  }

  checkTargets(pageName, scores, metrics) {
    const issues = [];
    
    // スコア目標チェック
    Object.entries(TEST_CONFIG.targets).forEach(([key, target]) => {
      if (scores[key] && scores[key] < target) {
        issues.push(`${key}: ${scores[key]} < ${target}`);
      }
      if (metrics[key] && metrics[key] > target) {
        issues.push(`${key}: ${metrics[key]}ms > ${target}ms`);
      }
    });

    if (issues.length > 0) {
      console.log(`    ⚠️  目標未達成: ${issues.join(', ')}`);
    } else {
      console.log(`    ✅ 全目標達成`);
    }
  }

  async runBundleAnalysis() {
    console.log('\n📦 3. バンドル分析実行中...');
    
    try {
      // webpack-bundle-analyzer実行
      execSync('npm run build', { stdio: 'pipe' });
      
      // バンドルサイズ分析
      const buildDir = path.join(process.cwd(), '.next');
      const stats = this.analyzeBuildStats(buildDir);
      
      this.results.bundleAnalysis = {
        totalSize: stats.totalSize,
        jsSize: stats.jsSize,
        cssSize: stats.cssSize,
        chunks: stats.chunks,
        recommendations: this.generateBundleRecommendations(stats)
      };

      console.log(`  📊 総サイズ: ${this.formatSize(stats.totalSize)}`);
      console.log(`  🟨 JavaScript: ${this.formatSize(stats.jsSize)}`);
      console.log(`  🟦 CSS: ${this.formatSize(stats.cssSize)}`);
      console.log(`  📦 チャンク数: ${stats.chunks.length}`);
      
      this.checkResourceLimits(stats);
      
    } catch (error) {
      console.error('  ❌ バンドル分析エラー:', error.message);
    }
  }

  analyzeBuildStats(buildDir) {
    const stats = {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      chunks: []
    };

    const chunksDir = path.join(buildDir, 'static', 'chunks');
    if (fs.existsSync(chunksDir)) {
      const files = fs.readdirSync(chunksDir);
      
      files.forEach(file => {
        const filePath = path.join(chunksDir, file);
        const size = fs.statSync(filePath).size;
        
        stats.totalSize += size;
        
        if (file.endsWith('.js')) {
          stats.jsSize += size;
        } else if (file.endsWith('.css')) {
          stats.cssSize += size;
        }
        
        stats.chunks.push({ file, size });
      });
    }

    return stats;
  }

  checkResourceLimits(stats) {
    const issues = [];
    const limits = TEST_CONFIG.limits;
    
    if (stats.totalSize > limits.totalSize * 1024) {
      issues.push(`総サイズ: ${this.formatSize(stats.totalSize)} > ${limits.totalSize}KB`);
    }
    if (stats.jsSize > limits.jsSize * 1024) {
      issues.push(`JSサイズ: ${this.formatSize(stats.jsSize)} > ${limits.jsSize}KB`);
    }
    if (stats.cssSize > limits.cssSize * 1024) {
      issues.push(`CSSサイズ: ${this.formatSize(stats.cssSize)} > ${limits.cssSize}KB`);
    }

    if (issues.length > 0) {
      console.log(`  ⚠️  制限超過: ${issues.join(', ')}`);
    } else {
      console.log(`  ✅ 全制限内`);
    }
  }

  generateBundleRecommendations(stats) {
    const recommendations = [];
    
    if (stats.jsSize > TEST_CONFIG.limits.jsSize * 1024) {
      recommendations.push('JavaScript バンドルサイズの削減が必要');
      recommendations.push('動的インポートによるコード分割を検討');
      recommendations.push('未使用ライブラリの除去');
    }
    
    if (stats.chunks.length < 3) {
      recommendations.push('より積極的なコード分割を実装');
    }
    
    if (stats.chunks.some(chunk => chunk.size > 200000)) {
      recommendations.push('大きなチャンクの分割が必要');
    }

    return recommendations;
  }

  async runResourceAnalysis() {
    console.log('\n🔍 4. リソース分析実行中...');
    
    // 静的リソース分析
    const publicDir = path.join(process.cwd(), 'public');
    const imageStats = this.analyzeImages(publicDir);
    
    console.log(`  🖼️  画像数: ${imageStats.count}`);
    console.log(`  📏 画像サイズ: ${this.formatSize(imageStats.totalSize)}`);
    
    if (imageStats.totalSize > TEST_CONFIG.limits.imageSize * 1024) {
      console.log(`  ⚠️  画像サイズ制限超過: ${this.formatSize(imageStats.totalSize)} > ${TEST_CONFIG.limits.imageSize}KB`);
    }
  }

  analyzeImages(dir) {
    const stats = { count: 0, totalSize: 0 };
    
    if (!fs.existsSync(dir)) return stats;
    
    const files = fs.readdirSync(dir, { recursive: true });
    files.forEach(file => {
      if (typeof file === 'string' && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
        const filePath = path.join(dir, file);
        if (fs.existsSync(filePath)) {
          stats.count++;
          stats.totalSize += fs.statSync(filePath).size;
        }
      }
    });
    
    return stats;
  }

  async runMemoryProfiling() {
    console.log('\n🧠 5. メモリプロファイリング実行中...');
    
    // 簡易メモリ使用量チェック
    const memUsage = process.memoryUsage();
    
    this.results.memoryProfile = {
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      rss: memUsage.rss
    };

    console.log(`  📊 ヒープ使用量: ${this.formatSize(memUsage.heapUsed)}`);
    console.log(`  📈 ヒープ総量: ${this.formatSize(memUsage.heapTotal)}`);
    console.log(`  🔗 外部メモリ: ${this.formatSize(memUsage.external)}`);
    console.log(`  💾 RSS: ${this.formatSize(memUsage.rss)}`);
  }

  async runLoadTest() {
    console.log('\n⚡ 6. ロードテスト実行中...');
    
    const concurrentUsers = 10;
    const testDuration = 30; // seconds
    
    console.log(`  👥 同時ユーザー数: ${concurrentUsers}`);
    console.log(`  ⏱️  テスト時間: ${testDuration}秒`);
    
    // 簡易ロードテスト実行
    const startTime = Date.now();
    const promises = [];
    
    for (let i = 0; i < concurrentUsers; i++) {
      promises.push(this.simulateUser());
    }
    
    const results = await Promise.allSettled(promises);
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const errorCount = results.filter(r => r.status === 'rejected').length;
    
    this.results.loadTest = {
      concurrentUsers,
      testDuration,
      successCount,
      errorCount,
      successRate: (successCount / concurrentUsers) * 100
    };

    console.log(`  ✅ 成功: ${successCount}/${concurrentUsers}`);
    console.log(`  ❌ 失敗: ${errorCount}/${concurrentUsers}`);
    console.log(`  📊 成功率: ${this.results.loadTest.successRate.toFixed(1)}%`);
  }

  async simulateUser() {
    // ランダムページアクセス
    const randomPage = TEST_CONFIG.pages[Math.floor(Math.random() * TEST_CONFIG.pages.length)];
    const url = `${TEST_CONFIG.baseUrl}${randomPage.url}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    
    return response.status;
  }

  async generateReport() {
    console.log('\n📋 7. レポート生成中...');
    
    // 総合スコア計算
    const overallScore = this.calculateOverallScore();
    
    // レポート作成
    const report = {
      timestamp: new Date().toISOString(),
      config: TEST_CONFIG,
      results: this.results,
      overallScore,
      recommendations: this.generateOverallRecommendations()
    };

    // ファイル保存
    const reportPath = path.join(process.cwd(), 'performance-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // HTML レポート生成
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(process.cwd(), 'performance-test-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    
    console.log(`\n✅ レポート保存完了:`);
    console.log(`  📄 JSON: ${reportPath}`);
    console.log(`  🌐 HTML: ${htmlPath}`);
    
    // サマリー表示
    this.displaySummary(overallScore);
  }

  calculateOverallScore() {
    const lighthouseScores = Object.values(this.results.lighthouse)
      .map(result => result.scores.performance);
    
    const avgPerformance = lighthouseScores.reduce((a, b) => a + b, 0) / lighthouseScores.length || 0;
    
    return {
      performance: Math.round(avgPerformance),
      bundleSize: this.results.bundleAnalysis.totalSize < TEST_CONFIG.limits.totalSize * 1024 ? 100 : 50,
      loadTest: this.results.loadTest.successRate || 0
    };
  }

  generateOverallRecommendations() {
    const recommendations = [];
    
    // Lighthouse 推奨事項
    Object.values(this.results.lighthouse).forEach(result => {
      if (result.scores.performance < TEST_CONFIG.targets.performance) {
        recommendations.push(`${result.url}: パフォーマンススコア改善が必要`);
      }
    });
    
    // バンドル推奨事項
    if (this.results.bundleAnalysis.recommendations) {
      recommendations.push(...this.results.bundleAnalysis.recommendations);
    }
    
    return recommendations;
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Performance Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin: 20px 0; }
        .score { display: inline-block; margin: 10px; padding: 10px; border-radius: 5px; }
        .score.good { background-color: #d4edda; }
        .score.warning { background-color: #fff3cd; }
        .score.poor { background-color: #f8d7da; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Performance Test Report</h1>
        <p>Generated: ${report.timestamp}</p>
        <p>Test URL: ${report.config.baseUrl}</p>
    </div>
    
    <div class="section">
        <h2>📊 Overall Scores</h2>
        <div class="score ${report.overallScore.performance >= 90 ? 'good' : report.overallScore.performance >= 70 ? 'warning' : 'poor'}">
            Performance: ${report.overallScore.performance}
        </div>
        <div class="score ${report.overallScore.bundleSize >= 90 ? 'good' : 'warning'}">
            Bundle Size: ${report.overallScore.bundleSize}
        </div>
        <div class="score ${report.overallScore.loadTest >= 95 ? 'good' : report.overallScore.loadTest >= 80 ? 'warning' : 'poor'}">
            Load Test: ${report.overallScore.loadTest}%
        </div>
    </div>
    
    <div class="section">
        <h2>💡 Recommendations</h2>
        <ul>
            ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>
</body>
</html>`;
  }

  displaySummary(overallScore) {
    console.log(`\n📊 テスト結果サマリー:`);
    console.log(`  🎯 パフォーマンス: ${overallScore.performance}/100`);
    console.log(`  📦 バンドルサイズ: ${overallScore.bundleSize}/100`);
    console.log(`  ⚡ ロードテスト: ${overallScore.loadTest.toFixed(1)}%`);
    
    const avgScore = (overallScore.performance + overallScore.bundleSize + overallScore.loadTest) / 3;
    console.log(`  🏆 総合スコア: ${avgScore.toFixed(1)}/100`);
    
    if (avgScore >= 90) {
      console.log(`  ✅ 優秀！`);
    } else if (avgScore >= 70) {
      console.log(`  🟡 改善の余地あり`);
    } else {
      console.log(`  🔴 要改善`);
    }
  }

  formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
}

// メイン実行
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🚀 Performance Test Suite

使用法:
  node scripts/performance-test.js [options]

オプション:
  --help, -h        このヘルプを表示
  --url <url>       テスト対象URL (デフォルト: http://localhost:3000)
  --pages <pages>   テストページ (カンマ区切り)
  --lighthouse      Lighthouseテストのみ実行
  --bundle          バンドル分析のみ実行
  --load            ロードテストのみ実行

例:
  node scripts/performance-test.js --url http://localhost:3000
  node scripts/performance-test.js --lighthouse
  npm run test:performance
    `);
    process.exit(0);
  }

  // URL設定
  const urlIndex = args.indexOf('--url');
  if (urlIndex !== -1 && args[urlIndex + 1]) {
    TEST_CONFIG.baseUrl = args[urlIndex + 1];
  }

  const tester = new PerformanceTester();
  await tester.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = PerformanceTester;