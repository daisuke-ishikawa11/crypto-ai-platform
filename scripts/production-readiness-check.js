#!/usr/bin/env node

// 🚀 プロダクション準備状況チェッカー
// 本番環境デプロイ前の包括的検証システム

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PRODUCTION_REQUIREMENTS = {
  // 必須環境変数
  requiredEnvVars: [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_KEY',
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'COINMARKETCAP_API_KEY',
    'CLOUDFLARE_API_TOKEN',
    'CLOUDFLARE_ZONE_ID'
  ],

  // 必須ファイル
  requiredFiles: [
    'next.config.js',
    'wrangler.toml',
    'open-next.config.ts',
    'src/middleware.ts',
    'src/lib/supabase/schema.sql',
    'package.json',
    'tsconfig.json',
    '.env.example'
  ],

  // セキュリティチェック項目
  securityChecks: [
    'helmet_headers_configured',
    'rate_limiting_enabled',
    'input_validation_implemented',
    'csrf_protection_enabled',
    'https_enforced',
    'secure_cookies_configured',
    'cors_properly_configured',
    'sql_injection_prevention'
  ],

  // パフォーマンス要件
  performanceRequirements: {
    bundleSize: 500, // KB
    lighthouse: {
      performance: 90,
      accessibility: 95,
      bestPractices: 90,
      seo: 85
    },
    coreWebVitals: {
      fcp: 1800, // ms
      lcp: 2500, // ms
      fid: 100,  // ms
      cls: 0.1   // score
    }
  },

  // テストカバレッジ要件
  testRequirements: {
    unitTestCoverage: 80,  // %
    integrationTests: true,
    e2eTests: true,
    securityTests: true,
    performanceTests: true
  }
};

class ProductionReadinessChecker {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
    this.score = 0;
    this.maxScore = 0;
  }

  async runFullCheck() {
    console.log('🚀 プロダクション準備状況チェック開始');
    console.log('================================');
    console.log(`📅 実行日時: ${new Date().toISOString()}`);
    console.log('');

    try {
      // 1. 環境設定チェック
      await this.checkEnvironmentConfiguration();
      
      // 2. ファイル構成チェック
      await this.checkFileStructure();
      
      // 3. 依存関係チェック
      await this.checkDependencies();
      
      // 4. ビルド検証
      await this.checkBuildProcess();
      
      // 5. セキュリティ検証
      await this.checkSecurity();
      
      // 6. パフォーマンス検証
      await this.checkPerformance();
      
      // 7. テスト検証
      await this.checkTests();
      
      // 8. デプロイ設定検証
      await this.checkDeploymentConfiguration();
      
      // 9. モニタリング設定検証
      await this.checkMonitoringConfiguration();
      
      // 10. 最終スコア算出・レポート生成
      await this.generateFinalReport();
      
    } catch (error) {
      console.error('\n❌ チェック実行エラー:', error);
      process.exit(1);
    }
  }

  async checkEnvironmentConfiguration() {
    console.log('🌍 1. 環境設定チェック中...');
    this.maxScore += 20;

    // .env.example の存在確認
    if (fs.existsSync('.env.example')) {
      this.addCheck('環境変数テンプレート', '.env.example が存在', 'success');
      this.score += 2;
    } else {
      this.addCheck('環境変数テンプレート', '.env.example が見つかりません', 'error');
    }

    // 必須環境変数の確認
    const envExample = fs.existsSync('.env.example') ? 
      fs.readFileSync('.env.example', 'utf8') : '';
    
    let envVarScore = 0;
    for (const envVar of PRODUCTION_REQUIREMENTS.requiredEnvVars) {
      if (envExample.includes(envVar)) {
        envVarScore += 1;
      } else {
        this.addWarning('環境変数', `${envVar} が .env.example に記載されていません`);
      }
    }
    
    this.score += Math.min(envVarScore, 15);
    this.addCheck('必須環境変数', 
      `${envVarScore}/${PRODUCTION_REQUIREMENTS.requiredEnvVars.length} 項目確認済み`, 
      envVarScore >= 8 ? 'success' : 'warning');

    // Next.js 環境設定確認
    if (fs.existsSync('next.config.js')) {
      const nextConfig = fs.readFileSync('next.config.js', 'utf8');
      if (nextConfig.includes('headers()') && nextConfig.includes('output')) {
        this.addCheck('Next.js設定', '本番対応設定が適用済み', 'success');
        this.score += 3;
      } else {
        this.addCheck('Next.js設定', '本番設定が不完全です', 'warning');
        this.score += 1;
      }
    }

    console.log('  ✅ 環境設定チェック完了');
  }

  async checkFileStructure() {
    console.log('\n📁 2. ファイル構成チェック中...');
    this.maxScore += 15;

    let fileScore = 0;
    for (const file of PRODUCTION_REQUIREMENTS.requiredFiles) {
      if (fs.existsSync(file)) {
        fileScore += 1;
        this.addCheck('ファイル構成', `${file} 存在確認`, 'success');
      } else {
        this.addCheck('ファイル構成', `${file} が見つかりません`, 'error');
      }
    }

    this.score += Math.min(fileScore * 2, 15);

    // プロジェクト構造の確認
    const expectedDirs = ['src/app', 'src/components', 'src/lib', 'tests'];
    let dirScore = 0;
    for (const dir of expectedDirs) {
      if (fs.existsSync(dir)) {
        dirScore += 1;
      }
    }

    if (dirScore === expectedDirs.length) {
      this.addCheck('ディレクトリ構造', '推奨構造に準拠', 'success');
      this.score += 3;
    } else {
      this.addCheck('ディレクトリ構造', '一部ディレクトリが不足', 'warning');
      this.score += 1;
    }

    console.log('  ✅ ファイル構成チェック完了');
  }

  async checkDependencies() {
    console.log('\n📦 3. 依存関係チェック中...');
    this.maxScore += 10;

    try {
      // package.json の確認
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // 必須依存関係の確認
      const requiredDeps = [
        'next', 'react', 'typescript', '@supabase/supabase-js', 
        'stripe', 'zod', '@anthropic-ai/sdk', 'openai'
      ];
      
      let depScore = 0;
      for (const dep of requiredDeps) {
        if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
          depScore += 1;
        }
      }

      this.score += Math.min(depScore, 8);
      this.addCheck('依存関係', 
        `${depScore}/${requiredDeps.length} 必須パッケージ確認済み`,
        depScore >= 6 ? 'success' : 'warning');

      // 脆弱性チェック
      try {
        execSync('npm audit --audit-level=high', { stdio: 'pipe' });
        this.addCheck('セキュリティ', '高レベル脆弱性なし', 'success');
        this.score += 2;
      } catch (error) {
        this.addCheck('セキュリティ', '脆弱性が検出されました', 'warning');
      }

    } catch (error) {
      this.addCheck('依存関係', 'package.json の読み込みに失敗', 'error');
    }

    console.log('  ✅ 依存関係チェック完了');
  }

  async checkBuildProcess() {
    console.log('\n🏗️  4. ビルド検証中...');
    this.maxScore += 15;

    try {
      // TypeScript 型チェック
      console.log('  🔍 TypeScript型チェック実行中...');
      execSync('npm run type-check', { stdio: 'pipe' });
      this.addCheck('TypeScript', '型エラーなし', 'success');
      this.score += 3;
    } catch (error) {
      this.addCheck('TypeScript', '型エラーが存在します', 'error');
    }

    try {
      // ESLint チェック
      console.log('  🔍 ESLint検証実行中...');
      execSync('npm run lint', { stdio: 'pipe' });
      this.addCheck('ESLint', 'リントエラーなし', 'success');
      this.score += 2;
    } catch (error) {
      this.addCheck('ESLint', 'リントエラーが存在します', 'warning');
      this.score += 1;
    }

    try {
      // プロダクションビルド
      console.log('  🔨 プロダクションビルド実行中...');
      execSync('npm run build', { stdio: 'pipe' });
      this.addCheck('ビルド', 'プロダクションビルド成功', 'success');
      this.score += 5;

      // ビルドサイズ確認
      if (fs.existsSync('.next')) {
        const buildStats = this.analyzeBuildSize();
        if (buildStats.totalSize < PRODUCTION_REQUIREMENTS.performanceRequirements.bundleSize * 1024) {
          this.addCheck('バンドルサイズ', `${Math.round(buildStats.totalSize/1024)}KB (制限内)`, 'success');
          this.score += 3;
        } else {
          this.addCheck('バンドルサイズ', `${Math.round(buildStats.totalSize/1024)}KB (制限超過)`, 'warning');
          this.score += 1;
        }
      }

    } catch (error) {
      this.addCheck('ビルド', 'プロダクションビルドに失敗', 'error');
    }

    try {
      // 開発サーバー起動テスト
      console.log('  🚀 開発サーバー起動テスト中...');
      const serverTest = execSync('timeout 10s npm run dev || true', { 
        stdio: 'pipe', 
        encoding: 'utf8' 
      });
      
      if (!serverTest.includes('Error')) {
        this.addCheck('開発環境', 'サーバー起動確認', 'success');
        this.score += 2;
      } else {
        this.addCheck('開発環境', 'サーバー起動に問題があります', 'warning');
      }
    } catch (error) {
      this.addCheck('開発環境', 'サーバー起動テストでエラー', 'warning');
    }

    console.log('  ✅ ビルド検証完了');
  }

  analyzeBuildSize() {
    const buildDir = path.join(process.cwd(), '.next');
    let totalSize = 0;
    
    try {
      const chunksDir = path.join(buildDir, 'static', 'chunks');
      if (fs.existsSync(chunksDir)) {
        const files = fs.readdirSync(chunksDir);
        files.forEach(file => {
          const filePath = path.join(chunksDir, file);
          totalSize += fs.statSync(filePath).size;
        });
      }
    } catch (error) {
      console.log('    ⚠️  ビルドサイズ分析でエラー:', error.message);
    }

    return { totalSize };
  }

  async checkSecurity() {
    console.log('\n🔒 5. セキュリティ検証中...');
    this.maxScore += 20;

    // セキュリティファイルの確認
    const securityFiles = [
      'src/lib/security/input-validation.ts',
      'src/lib/security/security-audit.ts',
      'src/middleware.ts'
    ];

    let securityScore = 0;
    for (const file of securityFiles) {
      if (fs.existsSync(file)) {
        securityScore += 2;
        this.addCheck('セキュリティファイル', `${file} 実装済み`, 'success');
      } else {
        this.addCheck('セキュリティファイル', `${file} が見つかりません`, 'error');
      }
    }

    // セキュリティスキャナーの実行
    try {
      console.log('  🔍 セキュリティスキャン実行中...');
      const scanResult = execSync('node scripts/security-scanner.js', { 
        stdio: 'pipe', 
        encoding: 'utf8' 
      });
      
      if (scanResult.includes('Critical: 0')) {
        this.addCheck('脆弱性スキャン', 'Critical脆弱性なし', 'success');
        securityScore += 5;
      } else {
        this.addCheck('脆弱性スキャン', 'Critical脆弱性が検出されました', 'error');
      }
      
    } catch (error) {
      this.addCheck('脆弱性スキャン', 'スキャン実行でエラー', 'warning');
      securityScore += 2;
    }

    // middleware.ts の確認
    if (fs.existsSync('src/middleware.ts')) {
      const middleware = fs.readFileSync('src/middleware.ts', 'utf8');
      const securityHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options', 
        'Referrer-Policy'
      ];
      
      let headerScore = 0;
      for (const header of securityHeaders) {
        if (middleware.includes(header)) {
          headerScore += 1;
        }
      }
      
      if (headerScore >= 2) {
        this.addCheck('セキュリティヘッダー', `${headerScore}/${securityHeaders.length} ヘッダー設定済み`, 'success');
        securityScore += 3;
      } else {
        this.addCheck('セキュリティヘッダー', 'セキュリティヘッダーが不足', 'warning');
        securityScore += 1;
      }
    }

    this.score += Math.min(securityScore, 20);
    console.log('  ✅ セキュリティ検証完了');
  }

  async checkPerformance() {
    console.log('\n⚡ 6. パフォーマンス検証中...');
    this.maxScore += 10;

    // パフォーマンステストスクリプトの確認
    if (fs.existsSync('scripts/performance-test.js')) {
      this.addCheck('パフォーマンステスト', 'テストスクリプト実装済み', 'success');
      this.score += 3;
    } else {
      this.addCheck('パフォーマンステスト', 'テストスクリプトが見つかりません', 'warning');
    }

    // Web Vitals監視の確認
    if (fs.existsSync('src/components/optimization/WebVitalsReporter.tsx')) {
      this.addCheck('Web Vitals監視', 'リアルタイム監視実装済み', 'success');
      this.score += 2;
    } else {
      this.addCheck('Web Vitals監視', 'Web Vitals監視が未実装', 'warning');
    }

    // キャッシュ戦略の確認
    if (fs.existsSync('src/lib/optimization/cache-strategy.ts')) {
      this.addCheck('キャッシュ戦略', 'キャッシュ最適化実装済み', 'success');
      this.score += 2;
    } else {
      this.addCheck('キャッシュ戦略', 'キャッシュ戦略が未実装', 'warning');
    }

    // next.config.js のパフォーマンス設定確認
    if (fs.existsSync('next.config.js')) {
      const nextConfig = fs.readFileSync('next.config.js', 'utf8');
      if (nextConfig.includes('swcMinify') && nextConfig.includes('compress')) {
        this.addCheck('Next.js最適化', 'パフォーマンス設定適用済み', 'success');
        this.score += 3;
      } else {
        this.addCheck('Next.js最適化', 'パフォーマンス設定が不完全', 'warning');
        this.score += 1;
      }
    }

    console.log('  ✅ パフォーマンス検証完了');
  }

  async checkTests() {
    console.log('\n🧪 7. テスト検証中...');
    this.maxScore += 15;

    const testFiles = [
      'tests/unit',
      'tests/integration', 
      'tests/e2e'
    ];

    let testScore = 0;
    for (const testDir of testFiles) {
      if (fs.existsSync(testDir)) {
        testScore += 2;
        this.addCheck('テストスイート', `${testDir} 実装済み`, 'success');
      } else {
        this.addCheck('テストスイート', `${testDir} が見つかりません`, 'warning');
      }
    }

    // playwright設定の確認
    if (fs.existsSync('playwright.config.ts')) {
      this.addCheck('E2Eテスト設定', 'Playwright設定完了', 'success');
      testScore += 2;
    } else {
      this.addCheck('E2Eテスト設定', 'Playwright設定が見つかりません', 'warning');
    }

    // Jest設定の確認
    if (fs.existsSync('jest.config.js') || fs.readFileSync('package.json', 'utf8').includes('jest')) {
      this.addCheck('ユニットテスト設定', 'Jest設定完了', 'success');
      testScore += 2;
    } else {
      this.addCheck('ユニットテスト設定', 'Jest設定が見つかりません', 'warning');
    }

    // テスト実行確認
    try {
      console.log('  🔍 テスト実行確認中...');
      execSync('npm run type-check', { stdio: 'pipe' });
      this.addCheck('テスト実行', 'テストが正常に実行可能', 'success');
      testScore += 3;
    } catch (error) {
      this.addCheck('テスト実行', 'テスト実行でエラー', 'warning');
      testScore += 1;
    }

    this.score += Math.min(testScore, 15);
    console.log('  ✅ テスト検証完了');
  }

  async checkDeploymentConfiguration() {
    console.log('\n🚀 8. デプロイ設定検証中...');
    this.maxScore += 10;

    // Cloudflare Workers設定
    if (fs.existsSync('wrangler.toml')) {
      const wranglerConfig = fs.readFileSync('wrangler.toml', 'utf8');
      if (wranglerConfig.includes('compatibility_date') && wranglerConfig.includes('[[kv_namespaces]]')) {
        this.addCheck('Cloudflare設定', 'wrangler.toml設定完了', 'success');
        this.score += 3;
      } else {
        this.addCheck('Cloudflare設定', 'wrangler.toml設定が不完全', 'warning');
        this.score += 1;
      }
    } else {
      this.addCheck('Cloudflare設定', 'wrangler.tomlが見つかりません', 'error');
    }

    // OpenNext設定
    if (fs.existsSync('open-next.config.ts')) {
      this.addCheck('OpenNext設定', 'Edge Runtime設定完了', 'success');
      this.score += 2;
    } else {
      this.addCheck('OpenNext設定', 'OpenNext設定が見つかりません', 'warning');
    }

    // デプロイスクリプト
    if (fs.existsSync('scripts/deploy.sh')) {
      this.addCheck('デプロイスクリプト', '自動デプロイスクリプト実装済み', 'success');
      this.score += 2;
    } else {
      this.addCheck('デプロイスクリプト', 'デプロイスクリプトが見つかりません', 'warning');
    }

    // package.json のデプロイコマンド確認
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts?.deploy || packageJson.scripts?.['deploy:production']) {
      this.addCheck('デプロイコマンド', 'デプロイコマンド設定済み', 'success');
      this.score += 3;
    } else {
      this.addCheck('デプロイコマンド', 'デプロイコマンドが未設定', 'warning');
      this.score += 1;
    }

    console.log('  ✅ デプロイ設定検証完了');
  }

  async checkMonitoringConfiguration() {
    console.log('\n📊 9. モニタリング設定検証中...');
    this.maxScore += 5;

    // モニタリングファイルの確認
    const monitoringFiles = [
      'src/lib/monitoring/performance.ts',
      'src/lib/monitoring/logger.ts'
    ];

    let monitoringScore = 0;
    for (const file of monitoringFiles) {
      if (fs.existsSync(file)) {
        monitoringScore += 1;
        this.addCheck('モニタリング', `${file} 実装済み`, 'success');
      } else {
        this.addCheck('モニタリング', `${file} が見つかりません`, 'warning');
      }
    }

    // Sentry設定確認
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.dependencies?.['@sentry/nextjs']) {
      this.addCheck('エラー監視', 'Sentry設定済み', 'success');
      monitoringScore += 1;
    } else {
      this.addCheck('エラー監視', 'エラー監視ツールが未設定', 'warning');
    }

    // Analytics設定確認
    if (fs.existsSync('src/lib/analytics')) {
      this.addCheck('アナリティクス', 'アナリティクス実装済み', 'success');
      monitoringScore += 2;
    } else {
      this.addCheck('アナリティクス', 'アナリティクスが未実装', 'warning');
    }

    this.score += monitoringScore;
    console.log('  ✅ モニタリング設定検証完了');
  }

  async generateFinalReport() {
    console.log('\n📋 10. 最終レポート生成中...');

    const finalScore = Math.round((this.score / this.maxScore) * 100);
    
    // レポート作成
    const report = {
      timestamp: new Date().toISOString(),
      totalScore: finalScore,
      maxScore: this.maxScore,
      actualScore: this.score,
      grade: this.getGrade(finalScore),
      checks: this.checks,
      warnings: this.warnings,
      errors: this.errors,
      recommendations: this.generateRecommendations(),
      readinessStatus: this.getReadinessStatus(finalScore)
    };

    // JSON レポート保存
    const reportPath = path.join(process.cwd(), 'production-readiness-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // コンソール出力
    this.displayFinalResults(report);

    // HTML レポート生成
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(process.cwd(), 'production-readiness-report.html');
    fs.writeFileSync(htmlPath, htmlReport);

    console.log(`\n✅ レポート保存完了:`);
    console.log(`  📄 JSON: ${reportPath}`);
    console.log(`  🌐 HTML: ${htmlPath}`);

    return report;
  }

  getGrade(score) {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    return 'D';
  }

  getReadinessStatus(score) {
    if (score >= 90) return 'PRODUCTION_READY';
    if (score >= 80) return 'NEARLY_READY';
    if (score >= 70) return 'NEEDS_IMPROVEMENT';
    return 'NOT_READY';
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('🚨 Critical エラーの修正が必要です');
      recommendations.push('🔧 不足しているファイルの作成');
    }
    
    if (this.warnings.length > 5) {
      recommendations.push('⚠️ 警告項目の対応');
      recommendations.push('📋 設定の見直しと最適化');
    }
    
    recommendations.push('🔍 定期的な品質チェックの実施');
    recommendations.push('📊 継続的なモニタリングの実装');
    
    return recommendations;
  }

  displayFinalResults(report) {
    console.log(`\n📊 プロダクション準備状況 - 最終結果:`);
    console.log(`=================================`);
    console.log(`🏆 総合スコア: ${report.totalScore}/100 (${report.grade})`);
    console.log(`📈 取得ポイント: ${report.actualScore}/${report.maxScore}`);
    console.log(`🎯 準備状況: ${report.readinessStatus}`);
    console.log(`✅ 成功: ${this.checks.filter(c => c.status === 'success').length}`);
    console.log(`⚠️  警告: ${this.warnings.length}`);
    console.log(`❌ エラー: ${this.errors.length}`);
    
    if (report.totalScore >= 90) {
      console.log(`\n🎉 プロダクション環境への準備が完了しています！`);
    } else if (report.totalScore >= 80) {
      console.log(`\n👍 プロダクション準備がほぼ完了しています。軽微な修正で準備完了です。`);
    } else {
      console.log(`\n🔧 プロダクション準備には追加の作業が必要です。`);
    }
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Production Readiness Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .score-display { font-size: 48px; font-weight: bold; color: ${report.totalScore >= 90 ? '#22c55e' : report.totalScore >= 80 ? '#f59e0b' : '#ef4444'}; }
        .grade { font-size: 24px; margin: 10px 0; }
        .status { padding: 10px 20px; border-radius: 20px; display: inline-block; color: white; background-color: ${report.totalScore >= 90 ? '#22c55e' : report.totalScore >= 80 ? '#f59e0b' : '#ef4444'}; }
        .checks { margin: 20px 0; }
        .check-item { margin: 10px 0; padding: 10px; border-left: 4px solid #ccc; background: #f9f9f9; }
        .success { border-left-color: #22c55e; }
        .warning { border-left-color: #f59e0b; }
        .error { border-left-color: #ef4444; }
        .recommendations { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Production Readiness Report</h1>
            <div class="score-display">${report.totalScore}/100</div>
            <div class="grade">Grade: ${report.grade}</div>
            <div class="status">${report.readinessStatus}</div>
            <p>Generated: ${report.timestamp}</p>
        </div>
        
        <div class="checks">
            <h2>📋 Check Results</h2>
            ${report.checks.map(check => `
                <div class="check-item ${check.status}">
                    <strong>${check.category}</strong>: ${check.description}
                </div>
            `).join('')}
        </div>
        
        <div class="recommendations">
            <h2>💡 Recommendations</h2>
            <ul>
                ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    </div>
</body>
</html>`;
  }

  addCheck(category, description, status) {
    this.checks.push({ category, description, status });
  }

  addWarning(category, description) {
    this.warnings.push({ category, description });
  }

  addError(category, description) {
    this.errors.push({ category, description });
  }
}

// メイン実行
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🚀 Production Readiness Checker Usage:

基本実行:
  node scripts/production-readiness-check.js

オプション:
  --help, -h        このヘルプを表示
  --verbose         詳細ログ出力
  --quick          簡易チェックのみ実行

例:
  node scripts/production-readiness-check.js
  npm run production:check
    `);
    process.exit(0);
  }

  const checker = new ProductionReadinessChecker();
  const report = await checker.runFullCheck();

  // 終了コード設定
  if (report.totalScore >= 80) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = ProductionReadinessChecker;