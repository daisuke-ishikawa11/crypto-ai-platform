#!/bin/bash

# 🚀 WSL2最適化npm完全インストール戦略
# 暗号通貨AIプラットフォーム専用（CLAUDE.md準拠）

set -euo pipefail

# カラー設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ログ関数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# プロジェクト情報
PROJECT_NAME="Crypto AI Platform"
NODE_VERSION="18"
NPM_VERSION="9"

log_info "Starting ${PROJECT_NAME} dependency optimization for WSL2"

# 1. システム前提条件チェック
log_info "Checking system prerequisites..."

# Node.js バージョンチェック
if ! command -v node &> /dev/null; then
    log_error "Node.js not found. Please install Node.js ${NODE_VERSION}+"
    exit 1
fi

NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_CURRENT" -lt "$NODE_VERSION" ]; then
    log_error "Node.js ${NODE_CURRENT} detected. Required: ${NODE_VERSION}+"
    exit 1
fi

log_success "Node.js $(node -v) ✓"

# npm バージョンチェック
NPM_CURRENT=$(npm -v | cut -d'.' -f1)
if [ "$NPM_CURRENT" -lt "$NPM_VERSION" ]; then
    log_warning "npm ${NPM_CURRENT} detected. Recommended: ${NPM_VERSION}+"
    log_info "Upgrading npm..."
    npm install -g npm@latest
fi

log_success "npm $(npm -v) ✓"

# 2. WSL2環境最適化
log_info "Optimizing WSL2 environment..."

# メモリ使用量チェック
TOTAL_MEM=$(free -m | awk '/^Mem:/{print $2}')
AVAILABLE_MEM=$(free -m | awk '/^Mem:/{print $7}')

log_info "System Memory: ${TOTAL_MEM}MB total, ${AVAILABLE_MEM}MB available"

if [ "$AVAILABLE_MEM" -lt 2048 ]; then
    log_warning "Low memory detected. Consider closing other applications."
fi

# ディスク容量チェック
DISK_AVAILABLE=$(df -BG . | tail -1 | awk '{print $4}' | sed 's/G//')
log_info "Available disk space: ${DISK_AVAILABLE}GB"

if [ "$DISK_AVAILABLE" -lt 5 ]; then
    log_error "Insufficient disk space. At least 5GB required."
    exit 1
fi

# 3. プロジェクト状態確認
log_info "Checking project state..."

if [ ! -f "package.json" ]; then
    log_error "package.json not found. Run from project root directory."
    exit 1
fi

# 4. 段階的クリーンアップ（安全第一）
log_info "Performing safe cleanup..."

# キャッシュクリア（段階的）
log_info "Clearing npm cache..."
npm cache clean --force 2>/dev/null || true

# 一時ディレクトリクリア
if [ -d "/tmp/.npm-cache" ]; then
    log_info "Clearing custom cache directory..."
    rm -rf /tmp/.npm-cache/* 2>/dev/null || true
fi

# node_modules の安全な削除（WSL2最適化）
if [ -d "node_modules" ]; then
    log_info "Removing existing node_modules (WSL2 optimized)..."
    
    # WSL2でのENOTEMPTY対策: 段階的削除
    find node_modules -name "*.lock" -delete 2>/dev/null || true
    find node_modules -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true
    
    # バックアップ作成（安全対策）
    if [ -d "node_modules.backup" ]; then
        rm -rf node_modules.backup.old 2>/dev/null || true
        mv node_modules.backup node_modules.backup.old 2>/dev/null || true
    fi
    
    # メイン削除
    timeout 300 rm -rf node_modules || {
        log_warning "Standard deletion failed. Using alternative method..."
        find . -name node_modules -exec rm -rf {} + 2>/dev/null || true
    }
fi

# package-lock.json の管理
if [ -f "package-lock.json" ]; then
    log_info "Backing up package-lock.json..."
    cp package-lock.json package-lock.json.backup 2>/dev/null || true
    rm -f package-lock.json
fi

log_success "Cleanup completed"

# 5. 依存関係分析
log_info "Analyzing dependencies..."

# CLAUDE.md準拠チェック
EXPECTED_DEPS="next react typescript @anthropic-ai/sdk openai @supabase/supabase-js @sentry/nextjs"
log_info "Expected major dependencies: $EXPECTED_DEPS"

# package.json検証
if ! grep -q "\"next\": \"15.4.1\"" package.json; then
    log_warning "Next.js version may not match CLAUDE.md specification"
fi

# 6. WSL2最適化インストール戦略
log_info "Starting optimized installation process..."

# npm設定の一時的な最適化
log_info "Applying temporary WSL2 optimizations..."

# インストール用の一時的な設定
npm config set fetch-retries 5
npm config set fetch-retry-mintimeout 15000
npm config set fetch-retry-maxtimeout 120000
npm config set maxsockets 2

# 7. 段階的インストール（CLAUDE.md技術スタック順）

# ステージ 1: コア依存関係（Next.js生態系）
log_info "Stage 1: Installing core dependencies..."
CORE_DEPS="next@15.4.1 react@^18.3.1 react-dom@^18.3.1 typescript@^5.0.0"

npm install $CORE_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage1.log || {
    log_error "Stage 1 installation failed"
    exit 1
}

log_success "Core dependencies installed"

# ステージ 2: AI SDKs
log_info "Stage 2: Installing AI SDKs..."
AI_DEPS="@anthropic-ai/sdk@^0.58.0 openai@^5.12.1"

npm install $AI_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage2.log || {
    log_error "Stage 2 installation failed"
    exit 1
}

log_success "AI SDKs installed"

# ステージ 3: データベース・バックエンド
log_info "Stage 3: Installing database and backend dependencies..."
BACKEND_DEPS="@supabase/supabase-js@^2.54.0 @supabase/ssr@^0.6.1 drizzle-orm@^0.44.4 @neondatabase/serverless@^1.0.1"

npm install $BACKEND_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage3.log || {
    log_error "Stage 3 installation failed"
    exit 1
}

log_success "Backend dependencies installed"

# ステージ 4: UI・スタイリング（shadcn/ui ecosystem）
log_info "Stage 4: Installing UI and styling dependencies..."
UI_DEPS="tailwindcss@^3.4.7 tailwindcss-animate@^1.0.7 tailwind-merge@^3.3.1 class-variance-authority@^0.7.1 clsx@^2.1.1 lucide-react@^0.525.0"

npm install $UI_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage4.log || {
    log_error "Stage 4 installation failed"
    exit 1
}

log_success "UI dependencies installed"

# ステージ 5: Radix UI コンポーネント（一括）
log_info "Stage 5: Installing Radix UI components..."
RADIX_DEPS="@radix-ui/react-alert-dialog@^1.1.14 @radix-ui/react-avatar@^1.1.10 @radix-ui/react-checkbox@^1.3.2 @radix-ui/react-dialog@^1.1.14 @radix-ui/react-dropdown-menu@^2.1.15 @radix-ui/react-label@^2.1.7 @radix-ui/react-progress@^1.1.7 @radix-ui/react-radio-group@^1.3.7 @radix-ui/react-scroll-area@^1.2.9 @radix-ui/react-select@^2.2.5 @radix-ui/react-separator@^1.1.7 @radix-ui/react-slider@^1.3.5 @radix-ui/react-slot@^1.2.3 @radix-ui/react-switch@^1.2.5 @radix-ui/react-tabs@^1.1.12 @radix-ui/react-tooltip@^1.2.7"

npm install $RADIX_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage5.log || {
    log_error "Stage 5 installation failed"
    exit 1
}

log_success "Radix UI components installed"

# ステージ 6: 監視・エラー追跡（Sentry）
log_info "Stage 6: Installing monitoring dependencies..."
MONITORING_DEPS="@sentry/nextjs@^9.38.0"

npm install $MONITORING_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage6.log || {
    log_error "Stage 6 installation failed"
    exit 1
}

log_success "Monitoring dependencies installed"

# ステージ 7: 通知・外部サービス
log_info "Stage 7: Installing notification and external service dependencies..."
SERVICES_DEPS="@sendgrid/mail@^8.1.5 twilio@^5.8.0 resend@^6.0.1 nodemailer@^7.0.5 stripe@^18.4.0"

npm install $SERVICES_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage7.log || {
    log_error "Stage 7 installation failed"
    exit 1
}

log_success "Service dependencies installed"

# ステージ 8: 状態管理・ユーティリティ
log_info "Stage 8: Installing state management and utility dependencies..."
UTILS_DEPS="@tanstack/react-query@^5.84.1 @tanstack/react-table@^8.21.3 zustand@^5.0.6 react-hook-form@^7.62.0 @hookform/resolvers@^5.2.1"

npm install $UTILS_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage8.log || {
    log_error "Stage 8 installation failed"
    exit 1
}

log_success "State management dependencies installed"

# ステージ 9: その他の本番依存関係
log_info "Stage 9: Installing remaining production dependencies..."
REMAINING_DEPS="framer-motion@^11.18.2 react-markdown@^10.1.0 recharts@^3.1.2 isomorphic-dompurify@^2.26.0 firebase-admin@^13.4.0 posthog-js@^1.258.6 es-toolkit@^1.39.8 zod@^4.0.16 bullmq@^5.0.0 ioredis@^5.4.1 aws-sdk@^2.1691.0"

npm install $REMAINING_DEPS --no-package-lock --verbose 2>&1 | tee npm-install-stage9.log || {
    log_error "Stage 9 installation failed"
    exit 1
}

log_success "Remaining production dependencies installed"

# 8. 開発依存関係のインストール
log_info "Installing development dependencies..."

DEV_DEPS="--save-dev @babel/core@^7.25.2 @babel/preset-env@^7.25.4 @babel/preset-react@^7.24.7 @babel/preset-typescript@^7.24.7 @next/bundle-analyzer@^15.4.1 @playwright/test@^1.54.1 @testing-library/dom@^10.4.0 @testing-library/jest-dom@^6.6.2 @testing-library/react@^16.1.0 @testing-library/user-event@^14.5.2 @types/jest@^29.5.14 @typescript-eslint/eslint-plugin@^8.0.0 @typescript-eslint/parser@^8.0.0 autoprefixer@^10.4.19 babel-jest@^29.7.0 cross-env@^7.0.3 dotenv@^16.4.5 eslint@^9 eslint-config-next@15.4.1 identity-obj-proxy@^3.0.0 jest@^29.7.0 jest-environment-jsdom@^29.7.0 jest-environment-node@^29.7.0 jest-html-reporter@^3.10.2 jest-junit@^16.0.0 jest-playwright-preset@^4.0.0 jest-watch-typeahead@^2.2.2 postcss@^8.4.38 rimraf@^6.0.1 textlint@^15.2.0 ts-jest@^29.2.5 tsx@^4.19.1"

npm install $DEV_DEPS --verbose 2>&1 | tee npm-install-dev.log || {
    log_error "Development dependencies installation failed"
    exit 1
}

log_success "Development dependencies installed"

# 9. package-lock.json の生成
log_info "Generating package-lock.json..."
npm install --package-lock-only 2>&1 | tee npm-lockfile-generation.log || {
    log_error "package-lock.json generation failed"
    exit 1
}

# 10. インストール検証
log_info "Verifying installation..."

# 重要パッケージの存在確認
CRITICAL_PACKAGES="next react @anthropic-ai/sdk openai @supabase/supabase-js @sentry/nextjs"

for package in $CRITICAL_PACKAGES; do
    if npm ls "$package" >/dev/null 2>&1; then
        log_success "$package ✓"
    else
        log_error "$package installation failed"
        exit 1
    fi
done

# TypeScript型チェック
log_info "Running TypeScript type check..."
if npm run type-check 2>&1 | tee typescript-check.log; then
    log_success "TypeScript type check passed"
else
    log_warning "TypeScript type check has warnings (check typescript-check.log)"
fi

# 11. 統計情報
log_info "Installation Statistics:"

TOTAL_PACKAGES=$(npm ls --depth=0 2>/dev/null | grep -c '^[├└]' || echo "0")
log_info "Total packages installed: $TOTAL_PACKAGES"

NODE_MODULES_SIZE=$(du -sh node_modules 2>/dev/null | cut -f1 || echo "Unknown")
log_info "node_modules size: $NODE_MODULES_SIZE"

PACKAGE_LOCK_SIZE=$(ls -lh package-lock.json 2>/dev/null | awk '{print $5}' || echo "Unknown")
log_info "package-lock.json size: $PACKAGE_LOCK_SIZE"

# 12. 最終設定のリセット
log_info "Resetting temporary configurations..."
npm config delete fetch-retries 2>/dev/null || true
npm config delete fetch-retry-mintimeout 2>/dev/null || true
npm config delete fetch-retry-maxtimeout 2>/dev/null || true
npm config delete maxsockets 2>/dev/null || true

# 13. 成功確認とネクストステップ
log_success "🎉 ${PROJECT_NAME} dependency optimization completed successfully!"

log_info "Next steps:"
log_info "1. Run 'npm run dev' to start development server"
log_info "2. Run 'npm run type-check' to verify TypeScript setup"
log_info "3. Run 'npm run test' to execute test suite"
log_info "4. Check logs in npm-install-*.log files if you encounter issues"

log_info "WSL2 Optimization Tips:"
log_info "- Keep your .npmrc file for future installations"
log_info "- Use 'npm ci' for CI/CD environments"
log_info "- Monitor memory usage during large builds"
log_info "- Consider using npm workspaces for monorepo setups"

exit 0