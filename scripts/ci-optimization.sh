#!/bin/bash

# CI/CD最適化スクリプト
# 暗号通貨AIプラットフォーム用 GitHub Actions対応

set -euo pipefail

# カラー設定
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="/mnt/d/crypto-ai-platform"

log() {
    echo -e "${BLUE}[CI-OPT]${NC} $1"
}

success() {
    echo -e "${GREEN}[CI-OPT SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[CI-OPT WARNING]${NC} $1"
}

# GitHub Actions ワークフロー最適化
optimize_github_actions() {
    log "🚀 GitHub Actions ワークフロー最適化開始..."
    
    local workflow_dir="$PROJECT_ROOT/.github/workflows"
    mkdir -p "$workflow_dir"
    
    # メインCI/CDワークフロー
    cat > "$workflow_dir/ci-cd-optimized.yml" << 'EOF'
name: CI/CD Pipeline - WSL2 Optimized

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  # 依存関係キャッシュ・インストール
  install-dependencies:
    name: Install Dependencies
    runs-on: ubuntu-latest
    outputs:
      cache-key: ${{ steps.cache-key.outputs.key }}
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Generate Cache Key
        id: cache-key
        run: echo "key=node-modules-${{ hashFiles('**/package-lock.json') }}" >> $GITHUB_OUTPUT

      - name: Cache Dependencies
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            node_modules
            .next/cache
          key: ${{ steps.cache-key.outputs.key }}
          restore-keys: |
            node-modules-

      - name: Install Dependencies (Optimized)
        run: |
          npm ci \
            --no-fund \
            --no-audit \
            --prefer-offline \
            --timing
        env:
          NPM_CONFIG_PROGRESS: false
          NPM_CONFIG_FUND: false
          NPM_CONFIG_AUDIT: false

  # 静的解析・品質チェック
  quality-checks:
    name: Quality Checks
    runs-on: ubuntu-latest
    needs: install-dependencies
    
    strategy:
      matrix:
        check: [lint, type-check, security]
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Restore Dependencies Cache
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            node_modules
            .next/cache
          key: ${{ needs.install-dependencies.outputs.cache-key }}

      - name: Run Quality Check - ${{ matrix.check }}
        run: |
          case "${{ matrix.check }}" in
            lint)
              npm run lint
              ;;
            type-check)
              npm run type-check
              ;;
            security)
              npm audit --audit-level=high
              ;;
          esac

  # ビルドテスト（並列実行）
  build-test:
    name: Build Test
    runs-on: ubuntu-latest
    needs: install-dependencies
    
    strategy:
      matrix:
        build-type: [development, production]
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Restore Dependencies Cache
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            node_modules
            .next/cache
          key: ${{ needs.install-dependencies.outputs.cache-key }}

      - name: Build Application - ${{ matrix.build-type }}
        run: |
          if [ "${{ matrix.build-type }}" = "development" ]; then
            NODE_ENV=development npm run build
          else
            NODE_ENV=production npm run build
          fi
        env:
          NEXT_TELEMETRY_DISABLED: 1

      - name: Upload Build Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-${{ matrix.build-type }}
          path: .next/
          retention-days: 1

  # E2Eテスト（Docker環境）
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: [install-dependencies, build-test]
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: crypto_ai_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Restore Dependencies Cache
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            node_modules
            .next/cache
          key: ${{ needs.install-dependencies.outputs.cache-key }}

      - name: Download Build Artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-production
          path: .next/

      - name: Run E2E Tests
        run: |
          npm run test:e2e
        env:
          DATABASE_URL: postgresql://postgres:test_password@localhost:5432/crypto_ai_test
          NEXT_PUBLIC_SUPABASE_URL: http://localhost:8000
          NEXT_PUBLIC_SUPABASE_ANON_KEY: test_key

  # Dockerイメージビルド
  docker-build:
    name: Docker Build
    runs-on: ubuntu-latest
    needs: [quality-checks, build-test]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile.dev
          platforms: linux/amd64,linux/arm64
          tags: crypto-ai-platform:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
          outputs: type=docker,dest=/tmp/crypto-ai-image.tar

      - name: Upload Docker Image
        uses: actions/upload-artifact@v3
        with:
          name: docker-image
          path: /tmp/crypto-ai-image.tar

  # パフォーマンス監視
  performance-monitoring:
    name: Performance Monitoring
    runs-on: ubuntu-latest
    needs: build-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Download Build Artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-production
          path: .next/

      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './.lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Bundle Analysis
        run: |
          npx @next/bundle-analyzer
        env:
          ANALYZE: true

  # セキュリティスキャン
  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: install-dependencies
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy Scan Results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  # デプロイ（本番環境）
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [e2e-tests, docker-build, performance-monitoring, security-scan]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

      - name: Health Check
        run: |
          sleep 30
          curl -f ${{ secrets.PRODUCTION_URL }}/api/health

      - name: Notify Deployment Success
        if: success()
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: '🚀 Production deployment successful!'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
EOF

    success "GitHub Actions ワークフロー作成完了"
}

# パフォーマンス監視設定
setup_performance_monitoring() {
    log "📊 パフォーマンス監視設定開始..."
    
    # Lighthouse CI設定
    cat > "$PROJECT_ROOT/.lighthouserc.json" << 'EOF'
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "startServerCommand": "npm start",
      "startServerReadyPattern": "ready",
      "startServerReadyTimeout": 60000,
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.8}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.85}],
        "categories:seo": ["warn", {"minScore": 0.8}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
EOF

    # Bundle analyzer設定
    cat > "$PROJECT_ROOT/analyze-bundle.js" << 'EOF'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // 既存のnext.config.jsの設定
});
EOF

    success "パフォーマンス監視設定完了"
}

# プルリクエストテンプレート
create_pr_template() {
    log "📝 プルリクエストテンプレート作成..."
    
    mkdir -p "$PROJECT_ROOT/.github"
    
    cat > "$PROJECT_ROOT/.github/pull_request_template.md" << 'EOF'
# プルリクエスト

## 概要
<!-- この変更の概要を簡潔に説明してください -->

## 変更内容
<!-- 実装した変更を箇条書きで列挙してください -->
- [ ] 新機能の追加
- [ ] バグ修正
- [ ] パフォーマンス改善
- [ ] リファクタリング
- [ ] ドキュメント更新
- [ ] テスト追加・修正

## 影響範囲
<!-- この変更が影響する範囲を記載してください -->
- [ ] フロントエンド
- [ ] バックエンド
- [ ] データベース
- [ ] API
- [ ] UI/UX
- [ ] 設定ファイル

## テスト
<!-- 実行したテストを記載してください -->
- [ ] 単体テスト追加・実行
- [ ] 統合テスト実行
- [ ] E2Eテスト実行
- [ ] 手動テスト実行
- [ ] ブラウザ別動作確認
- [ ] レスポンシブ対応確認

## パフォーマンス
<!-- パフォーマンスに関する確認事項 -->
- [ ] ビルド時間への影響確認
- [ ] バンドルサイズへの影響確認
- [ ] ページ読み込み速度確認
- [ ] メモリ使用量確認

## セキュリティ
<!-- セキュリティに関する確認事項 -->
- [ ] セキュリティ脆弱性スキャン実行
- [ ] 入力値検証確認
- [ ] 認証・認可確認
- [ ] HTTPS対応確認

## ブレークチェンジ
<!-- 破壊的変更がある場合は詳細を記載 -->
- [ ] 破壊的変更なし
- [ ] API仕様変更
- [ ] データベーススキーマ変更
- [ ] 環境変数追加・変更

## デプロイ手順
<!-- 特別なデプロイ手順が必要な場合 -->
- [ ] 通常のデプロイで問題なし
- [ ] データベースマイグレーション必要
- [ ] 環境変数設定必要
- [ ] 特別なデプロイ手順必要（下記に記載）

## 関連Issue
<!-- 関連するIssue番号を記載 -->
Closes #
Fixes #
Related to #

## スクリーンショット
<!-- UI変更がある場合はスクリーンショットを添付 -->

## チェックリスト
- [ ] コードレビュー実施
- [ ] 全テスト通過
- [ ] ドキュメント更新
- [ ] CHANGELOG更新
- [ ] セルフチェック完了
EOF

    success "プルリクエストテンプレート作成完了"
}

# Issue テンプレート
create_issue_templates() {
    log "🐛 Issue テンプレート作成..."
    
    local templates_dir="$PROJECT_ROOT/.github/ISSUE_TEMPLATE"
    mkdir -p "$templates_dir"
    
    # バグレポートテンプレート
    cat > "$templates_dir/bug_report.md" << 'EOF'
---
name: Bug Report
about: バグを報告する
title: '[BUG] '
labels: bug
assignees: ''
---

## バグの概要
<!-- バグの内容を簡潔に説明してください -->

## 再現手順
1. 
2. 
3. 
4. 

## 期待する動作
<!-- 本来あるべき動作を記載してください -->

## 実際の動作
<!-- 実際に起こった動作を記載してください -->

## 環境情報
- OS: [Windows/macOS/Linux]
- ブラウザ: [Chrome/Firefox/Safari/Edge]
- Node.js バージョン: 
- npm バージョン: 
- プロジェクトバージョン: 

## 追加情報
<!-- エラーメッセージ、ログ、スクリーンショットなど -->

## 優先度
- [ ] 緊急（システム停止）
- [ ] 高（主要機能に影響）
- [ ] 中（一部機能に影響）
- [ ] 低（軽微な問題）
EOF

    # 機能要求テンプレート
    cat > "$templates_dir/feature_request.md" << 'EOF'
---
name: Feature Request
about: 新機能を提案する
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## 機能の概要
<!-- 提案する機能の概要を記載してください -->

## 背景・動機
<!-- なぜその機能が必要なのかを説明してください -->

## 詳細な機能仕様
<!-- 機能の詳細な仕様を記載してください -->

## 受け入れ条件
<!-- 機能完成の判断基準を記載してください -->
- [ ] 
- [ ] 
- [ ] 

## 技術的考慮事項
<!-- 技術的な制約や考慮すべき点を記載 -->

## 優先度
- [ ] 高（次リリース必須）
- [ ] 中（今後のリリース候補）
- [ ] 低（将来的な改善項目）

## 関連Issue・PR
<!-- 関連するIssueやPRがあれば記載 -->
EOF

    success "Issue テンプレート作成完了"
}

# 開発環境セットアップスクリプト
create_dev_setup() {
    log "🛠️ 開発環境セットアップスクリプト作成..."
    
    cat > "$PROJECT_ROOT/scripts/dev-setup.sh" << 'EOF'
#!/bin/bash

# 開発環境セットアップスクリプト
# 暗号通貨AIプラットフォーム用

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[DEV-SETUP]${NC} $1"
}

success() {
    echo -e "${GREEN}[DEV-SETUP SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[DEV-SETUP WARNING]${NC} $1"
}

log "🚀 開発環境セットアップ開始..."

# 1. 前提条件チェック
log "Step 1: 前提条件チェック"
if ! command -v node &> /dev/null; then
    warn "Node.js がインストールされていません"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    warn "npm がインストールされていません"
    exit 1
fi

log "Node.js: $(node --version)"
log "npm: $(npm --version)"

# 2. 依存関係インストール
log "Step 2: 依存関係インストール"
if [[ ! -d "node_modules" ]]; then
    npm ci --no-fund --no-audit --prefer-offline
else
    log "node_modules 既に存在します"
fi

# 3. 環境変数設定
log "Step 3: 環境変数設定"
if [[ ! -f ".env.local" ]]; then
    if [[ -f "env.example" ]]; then
        cp env.example .env.local
        warn ".env.local を作成しました。必要な環境変数を設定してください"
    else
        warn "env.example が見つかりません"
    fi
else
    log ".env.local 既に存在します"
fi

# 4. Git Hooks セットアップ
log "Step 4: Git Hooks セットアップ"
if [[ -d ".git" ]]; then
    # Pre-commit hook
    cat > .git/hooks/pre-commit << 'HOOK_EOF'
#!/bin/bash
echo "🔍 Pre-commit checks running..."

# TypeScript チェック
npm run type-check || exit 1

# Lint チェック
npm run lint || exit 1

echo "✅ Pre-commit checks passed!"
HOOK_EOF
    
    chmod +x .git/hooks/pre-commit
    success "Git hooks セットアップ完了"
else
    warn "Git リポジトリではありません"
fi

# 5. VSCode 設定
log "Step 5: VSCode 設定"
mkdir -p .vscode

cat > .vscode/settings.json << 'JSON_EOF'
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.mdx": "markdown"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
JSON_EOF

cat > .vscode/extensions.json << 'JSON_EOF'
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
JSON_EOF

success "VSCode 設定完了"

# 6. 開発サーバー起動確認
log "Step 6: 開発サーバー起動テスト"
timeout 30s npm run dev > /dev/null 2>&1 || {
    warn "開発サーバーの起動テストに失敗またはタイムアウト"
}

success "🎉 開発環境セットアップ完了!"

echo ""
log "次のステップ:"
log "1. .env.local を編集して環境変数を設定"
log "2. npm run dev で開発サーバー起動"
log "3. http://localhost:3000 でアプリケーション確認"
EOF

    chmod +x "$PROJECT_ROOT/scripts/dev-setup.sh"
    success "開発環境セットアップスクリプト作成完了"
}

# メイン実行
main() {
    log "🚀 CI/CD最適化スクリプト開始"
    
    cd "$PROJECT_ROOT"
    
    optimize_github_actions
    setup_performance_monitoring
    create_pr_template
    create_issue_templates
    create_dev_setup
    
    success "✅ CI/CD最適化完了!"
    
    log "作成されたファイル:"
    log "- .github/workflows/ci-cd-optimized.yml"
    log "- .github/pull_request_template.md"
    log "- .github/ISSUE_TEMPLATE/"
    log "- .lighthouserc.json"
    log "- scripts/dev-setup.sh"
}

main "$@"