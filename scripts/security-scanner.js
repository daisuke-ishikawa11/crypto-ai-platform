#!/usr/bin/env node

// 🔒 セキュリティスキャナー総合ツール
// XSS・CSRF・SQLインジェクション・権限昇格・機密情報漏洩の検出

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SECURITY_CONFIG = {
  // スキャン対象ディレクトリ
  scanPaths: [
    'src/app',
    'src/components',
    'src/lib',
    'src/pages'
  ],
  
  // ファイル拡張子
  fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  
  // 脆弱性パターン
  vulnerabilityPatterns: {
    // XSS 脆弱性
    xss: [
      /dangerouslySetInnerHTML/g,
      /innerHTML\s*=/g,
      /document\.write/g,
      /eval\s*\(/g,
      /new\s+Function\s*\(/g,
      /setTimeout\s*\(\s*["'`][^"'`]*["'`]/g,
      /setInterval\s*\(\s*["'`][^"'`]*["'`]/g
    ],
    
    // CSRF 脆弱性
    csrf: [
      /fetch\s*\([^)]*method:\s*["']POST["']/g,
      /axios\.post/g,
      /\.post\s*\(/g,
      /XMLHttpRequest/g
    ],
    
    // SQL インジェクション
    sqlInjection: [
      /\$\{[^}]*\}/g, // テンプレートリテラル
      /\+\s*req\./g,  // 文字列結合
      /\+\s*params\./g,
      /\+\s*query\./g,
      /\+\s*body\./g,
      /SELECT\s.*WHERE.*\+/gi,
      /INSERT\s.*VALUES.*\+/gi,
      /UPDATE\s.*SET.*\+/gi,
      /DELETE\s.*WHERE.*\+/gi
    ],
    
    // 機密情報漏洩
    secretLeak: [
      /password\s*=\s*["'][^"']+["']/gi,
      /api[_-]?key\s*=\s*["'][^"']+["']/gi,
      /secret\s*=\s*["'][^"']+["']/gi,
      /token\s*=\s*["'][^"']+["']/gi,
      /private[_-]?key\s*=\s*["'][^"']+["']/gi,
      /access[_-]?token\s*=\s*["'][^"']+["']/gi,
      /AKIA[0-9A-Z]{16}/g, // AWS Access Key
      /sk_live_[0-9a-zA-Z]{24}/g, // Stripe Secret Key
      /pk_live_[0-9a-zA-Z]{24}/g // Stripe Publishable Key
    ],
    
    // 権限昇格
    privilegeEscalation: [
      /\.isAdmin\s*=\s*true/g,
      /role\s*=\s*["']admin["']/g,
      /permissions\s*=\s*\[.*["']admin["']/g,
      /sudo/g,
      /chmod\s+777/g,
      /process\.env\[.*\]\s*=\s*/g
    ],
    
    // 安全でない乱数生成
    weakRandom: [
      /Math\.random/g,
      /Date\.now/g
    ],
    
    // 安全でないHTTP
    insecureHttp: [
      /http:\/\/[^\/]/g,
      /ftp:\/\/[^\/]/g
    ],
    
    // パストラバーサル
    pathTraversal: [
      /\.\.\//g,
      /\.\.\/\.\.\//g,
      /\/\.\.\//g,
      /readFile\([^)]*\.\./g,
      /writeFile\([^)]*\.\./g
    ]
  },
  
  // セキュリティヘッダーチェック
  securityHeaders: [
    'Content-Security-Policy',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Strict-Transport-Security',
    'X-XSS-Protection',
    'Permissions-Policy'
  ],
  
  // 許可されたCSPディレクティブ
  allowedCSPDirectives: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.coingecko.com https://pro-api.coinmarketcap.com"
  ]
};

class SecurityScanner {
  constructor() {
    this.vulnerabilities = [];
    this.securityIssues = [];
    this.summary = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0
    };
  }

  async runSecurityScan() {
    console.log('🔒 セキュリティスキャン開始');
    console.log('====================');
    console.log(`📁 スキャン対象: ${SECURITY_CONFIG.scanPaths.join(', ')}`);
    console.log('');

    try {
      // 1. 静的コード解析
      await this.runStaticAnalysis();
      
      // 2. 依存関係脆弱性チェック
      await this.runDependencyCheck();
      
      // 3. 設定ファイルチェック
      await this.runConfigurationCheck();
      
      // 4. セキュリティヘッダーチェック
      await this.runSecurityHeadersCheck();
      
      // 5. 環境変数チェック
      await this.runEnvironmentCheck();
      
      // 6. レポート生成
      await this.generateReport();
      
      console.log('\n🎉 セキュリティスキャン完了！');
      
    } catch (error) {
      console.error('\n❌ スキャンエラー:', error);
      process.exit(1);
    }
  }

  async runStaticAnalysis() {
    console.log('🔍 1. 静的コード解析実行中...');
    
    for (const scanPath of SECURITY_CONFIG.scanPaths) {
      if (!fs.existsSync(scanPath)) {
        console.log(`  ⚠️  パスが見つかりません: ${scanPath}`);
        continue;
      }
      
      await this.scanDirectory(scanPath);
    }
    
    console.log(`  ✅ ${this.vulnerabilities.length}件の潜在的脆弱性を発見`);
  }

  async scanDirectory(dirPath) {
    const files = this.getFilesRecursively(dirPath);
    
    for (const filePath of files) {
      if (SECURITY_CONFIG.fileExtensions.some(ext => filePath.endsWith(ext))) {
        await this.scanFile(filePath);
      }
    }
  }

  getFilesRecursively(dirPath) {
    const files = [];
    
    function scanDir(currentPath) {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          // node_modules や .next などのディレクトリをスキップ
          if (!['node_modules', '.next', '.git', 'coverage'].includes(item)) {
            scanDir(itemPath);
          }
        } else {
          files.push(itemPath);
        }
      }
    }
    
    scanDir(dirPath);
    return files;
  }

  async scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // 各脆弱性パターンをチェック
      Object.entries(SECURITY_CONFIG.vulnerabilityPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          let match;
          while ((match = pattern.exec(content)) !== null) {
            const lineNumber = this.getLineNumber(content, match.index);
            const severity = this.getSeverity(category);
            
            this.vulnerabilities.push({
              file: filePath,
              line: lineNumber,
              category,
              pattern: pattern.source,
              match: match[0],
              severity,
              description: this.getDescription(category),
              recommendation: this.getRecommendation(category)
            });
            
            this.summary[severity]++;
          }
        });
      });
      
    } catch (error) {
      console.error(`  ❌ ファイル読み込みエラー: ${filePath}`, error.message);
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  getSeverity(category) {
    const severityMap = {
      xss: 'high',
      csrf: 'high',
      sqlInjection: 'critical',
      secretLeak: 'critical',
      privilegeEscalation: 'critical',
      weakRandom: 'medium',
      insecureHttp: 'medium',
      pathTraversal: 'high'
    };
    
    return severityMap[category] || 'medium';
  }

  getDescription(category) {
    const descriptions = {
      xss: 'クロスサイトスクリプティング (XSS) の脆弱性',
      csrf: 'クロスサイトリクエストフォージェリ (CSRF) の脆弱性',
      sqlInjection: 'SQLインジェクションの脆弱性',
      secretLeak: '機密情報の漏洩',
      privilegeEscalation: '権限昇格の脆弱性',
      weakRandom: '安全でない乱数生成',
      insecureHttp: '安全でないHTTP通信',
      pathTraversal: 'パストラバーサルの脆弱性'
    };
    
    return descriptions[category] || '不明な脆弱性';
  }

  getRecommendation(category) {
    const recommendations = {
      xss: 'サニタイズ関数を使用し、dangerouslySetInnerHTMLを避ける',
      csrf: 'CSRFトークンの実装とSameSite Cookieの使用',
      sqlInjection: 'パラメータ化クエリまたはORMの使用',
      secretLeak: '環境変数またはシークレット管理サービスの使用',
      privilegeEscalation: '最小権限の原則と適切な認可チェック',
      weakRandom: 'crypto.randomBytes() などの暗号学的乱数生成器の使用',
      insecureHttp: 'HTTPS の強制使用',
      pathTraversal: 'ファイルパスの検証とサニタイズ'
    };
    
    return recommendations[category] || '詳細な調査が必要';
  }

  async runDependencyCheck() {
    console.log('\n📦 2. 依存関係脆弱性チェック実行中...');
    
    try {
      // npm audit の実行
      const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
      const auditData = JSON.parse(auditResult);
      
      if (auditData.vulnerabilities) {
        Object.entries(auditData.vulnerabilities).forEach(([packageName, vulnData]) => {
          this.vulnerabilities.push({
            file: 'package.json',
            line: 0,
            category: 'dependency',
            pattern: 'vulnerable dependency',
            match: packageName,
            severity: vulnData.severity || 'medium',
            description: `依存関係の脆弱性: ${packageName}`,
            recommendation: 'パッケージの更新またはセキュリティパッチの適用'
          });
          
          this.summary[vulnData.severity || 'medium']++;
        });
      }
      
      console.log('  ✅ 依存関係チェック完了');
      
    } catch (error) {
      console.log('  ⚠️  npm audit 実行エラー:', error.message);
    }
  }

  async runConfigurationCheck() {
    console.log('\n⚙️  3. 設定ファイルチェック実行中...');
    
    // Next.js 設定チェック
    await this.checkNextConfig();
    
    // ESLint 設定チェック
    await this.checkESLintConfig();
    
    // TypeScript 設定チェック
    await this.checkTSConfig();
    
    console.log('  ✅ 設定ファイルチェック完了');
  }

  async checkNextConfig() {
    const configPath = 'next.config.js';
    if (!fs.existsSync(configPath)) {
      this.addSecurityIssue('設定', 'next.config.js が見つかりません', 'medium');
      return;
    }
    
    const config = fs.readFileSync(configPath, 'utf8');
    
    // セキュリティヘッダーの確認
    if (!config.includes('headers()')) {
      this.addSecurityIssue('設定', 'セキュリティヘッダーが設定されていません', 'high');
    }
    
    // HTTPS 強制の確認
    if (!config.includes('redirect') || !config.includes('https')) {
      this.addSecurityIssue('設定', 'HTTPS リダイレクトが設定されていません', 'medium');
    }
  }

  async checkESLintConfig() {
    const configFiles = ['.eslintrc.js', '.eslintrc.json', 'eslint.config.js'];
    const configExists = configFiles.some(file => fs.existsSync(file));
    
    if (!configExists) {
      this.addSecurityIssue('設定', 'ESLint 設定ファイルが見つかりません', 'low');
    }
  }

  async checkTSConfig() {
    if (!fs.existsSync('tsconfig.json')) {
      this.addSecurityIssue('設定', 'tsconfig.json が見つかりません', 'low');
      return;
    }
    
    const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    
    if (!tsconfig.compilerOptions?.strict) {
      this.addSecurityIssue('設定', 'TypeScript strict モードが無効です', 'medium');
    }
  }

  async runSecurityHeadersCheck() {
    console.log('\n🛡️  4. セキュリティヘッダーチェック実行中...');
    
    // ヘッダー設定ファイルの確認
    const middlewarePath = 'src/middleware.ts';
    if (fs.existsSync(middlewarePath)) {
      const middleware = fs.readFileSync(middlewarePath, 'utf8');
      
      SECURITY_CONFIG.securityHeaders.forEach(header => {
        if (!middleware.includes(header)) {
          this.addSecurityIssue('セキュリティヘッダー', 
            `${header} ヘッダーが設定されていません`, 'medium');
        }
      });
    } else {
      this.addSecurityIssue('設定', 'middleware.ts が見つかりません', 'high');
    }
    
    console.log('  ✅ セキュリティヘッダーチェック完了');
  }

  async runEnvironmentCheck() {
    console.log('\n🌍 5. 環境変数チェック実行中...');
    
    // .env ファイルの確認
    const envFiles = ['.env', '.env.local', '.env.example'];
    
    envFiles.forEach(envFile => {
      if (fs.existsSync(envFile)) {
        const envContent = fs.readFileSync(envFile, 'utf8');
        
        // 本番用の機密情報が含まれていないかチェック
        if (envFile !== '.env.example') {
          const lines = envContent.split('\n');
          lines.forEach((line, index) => {
            if (line.includes('password=') || line.includes('secret=')) {
              this.addSecurityIssue('環境変数', 
                `${envFile}:${index + 1} に機密情報がハードコードされています`, 'high');
            }
          });
        }
      }
    });
    
    console.log('  ✅ 環境変数チェック完了');
  }

  addSecurityIssue(category, description, severity) {
    this.securityIssues.push({
      category,
      description,
      severity,
      recommendation: this.getRecommendationForIssue(category, description)
    });
    
    this.summary[severity]++;
  }

  getRecommendationForIssue(category, description) {
    if (description.includes('セキュリティヘッダー')) {
      return 'middleware.ts または next.config.js でセキュリティヘッダーを設定';
    }
    if (description.includes('HTTPS')) {
      return '本番環境でHTTPS強制リダイレクトを設定';
    }
    if (description.includes('機密情報')) {
      return '環境変数を使用し、.gitignore に .env を追加';
    }
    if (description.includes('strict')) {
      return 'tsconfig.json で strict: true を設定';
    }
    
    return '詳細な調査と対策が必要';
  }

  async generateReport() {
    console.log('\n📊 6. レポート生成中...');
    
    // コンソールサマリー
    this.displaySummary();
    
    // 詳細レポート生成
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.summary,
      vulnerabilities: this.vulnerabilities,
      securityIssues: this.securityIssues,
      recommendations: this.generateRecommendations(),
      totalIssues: this.vulnerabilities.length + this.securityIssues.length
    };

    // JSON レポート保存
    const reportPath = path.join(process.cwd(), 'security-scan-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // HTML レポート生成
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(process.cwd(), 'security-scan-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    
    console.log(`\n✅ レポート保存完了:`);
    console.log(`  📄 JSON: ${reportPath}`);
    console.log(`  🌐 HTML: ${htmlPath}`);
  }

  displaySummary() {
    console.log(`\n📊 セキュリティスキャン結果サマリー:`);
    console.log(`  🔴 Critical: ${this.summary.critical}`);
    console.log(`  🟠 High: ${this.summary.high}`);
    console.log(`  🟡 Medium: ${this.summary.medium}`);
    console.log(`  🟢 Low: ${this.summary.low}`);
    console.log(`  ℹ️  Info: ${this.summary.info}`);
    
    const total = Object.values(this.summary).reduce((a, b) => a + b, 0);
    console.log(`  📊 総計: ${total} 件`);
    
    if (this.summary.critical > 0) {
      console.log(`\n❌ Critical レベルの脆弱性が発見されました。即座に対応が必要です。`);
    } else if (this.summary.high > 0) {
      console.log(`\n⚠️  High レベルの脆弱性が発見されました。優先的に対応してください。`);
    } else if (total === 0) {
      console.log(`\n✅ 脆弱性は検出されませんでした。`);
    } else {
      console.log(`\n👍 重大な脆弱性は検出されませんでした。`);
    }
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.summary.critical > 0) {
      recommendations.push('🚨 Critical脆弱性の即座の修正');
      recommendations.push('🔒 機密情報の環境変数への移行');
      recommendations.push('🛡️ 入力検証の強化');
    }
    
    if (this.summary.high > 0) {
      recommendations.push('🔐 セキュリティヘッダーの実装');
      recommendations.push('⚡ XSS・CSRF対策の強化');
      recommendations.push('🔑 認証・認可の見直し');
    }
    
    recommendations.push('📚 定期的なセキュリティ監査の実施');
    recommendations.push('🔄 依存関係の定期更新');
    recommendations.push('🎓 開発チームのセキュリティ教育');
    
    return recommendations;
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Security Scan Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 20px 0; }
        .summary-card { padding: 15px; border-radius: 8px; text-align: center; }
        .critical { background-color: #fee2e2; color: #dc2626; }
        .high { background-color: #fed7aa; color: #ea580c; }
        .medium { background-color: #fef3c7; color: #d97706; }
        .low { background-color: #dcfce7; color: #16a34a; }
        .vulnerability { margin: 10px 0; padding: 15px; border-left: 4px solid #ccc; background: #f9f9f9; }
        .vulnerability.critical { border-left-color: #dc2626; }
        .vulnerability.high { border-left-color: #ea580c; }
        .vulnerability.medium { border-left-color: #d97706; }
        .vulnerability.low { border-left-color: #16a34a; }
        .file-path { font-family: monospace; font-size: 14px; color: #666; }
        .recommendations { background: #f0f9ff; padding: 20px; border-radius: 8px; }
        .recommendations ul { list-style: none; padding: 0; }
        .recommendations li { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Security Scan Report</h1>
            <p>Generated: ${report.timestamp}</p>
            <p>Total Issues: ${report.totalIssues}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card critical">
                <h3>Critical</h3>
                <p style="font-size: 24px; font-weight: bold;">${report.summary.critical}</p>
            </div>
            <div class="summary-card high">
                <h3>High</h3>
                <p style="font-size: 24px; font-weight: bold;">${report.summary.high}</p>
            </div>
            <div class="summary-card medium">
                <h3>Medium</h3>
                <p style="font-size: 24px; font-weight: bold;">${report.summary.medium}</p>
            </div>
            <div class="summary-card low">
                <h3>Low</h3>
                <p style="font-size: 24px; font-weight: bold;">${report.summary.low}</p>
            </div>
        </div>
        
        <h2>🐛 Vulnerabilities</h2>
        ${report.vulnerabilities.map(vuln => `
            <div class="vulnerability ${vuln.severity}">
                <h4>${vuln.description}</h4>
                <p class="file-path">${vuln.file}:${vuln.line}</p>
                <p><strong>Pattern:</strong> <code>${vuln.match}</code></p>
                <p><strong>Recommendation:</strong> ${vuln.recommendation}</p>
            </div>
        `).join('')}
        
        <h2>⚙️ Security Issues</h2>
        ${report.securityIssues.map(issue => `
            <div class="vulnerability ${issue.severity}">
                <h4>${issue.category}</h4>
                <p>${issue.description}</p>
                <p><strong>Recommendation:</strong> ${issue.recommendation}</p>
            </div>
        `).join('')}
        
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
}

// メイン実行
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🔒 Security Scanner Usage:

基本実行:
  node scripts/security-scanner.js

オプション:
  --help, -h        このヘルプを表示
  --path <path>     スキャン対象パス指定
  --severity <level> 指定レベル以上のみ表示 (critical|high|medium|low)
  --format <format>  出力形式 (console|json|html)

例:
  node scripts/security-scanner.js --path src/app
  node scripts/security-scanner.js --severity high
  npm run security:scan
    `);
    process.exit(0);
  }

  // パス指定
  const pathIndex = args.indexOf('--path');
  if (pathIndex !== -1 && args[pathIndex + 1]) {
    SECURITY_CONFIG.scanPaths = [args[pathIndex + 1]];
  }

  const scanner = new SecurityScanner();
  await scanner.runSecurityScan();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SecurityScanner;