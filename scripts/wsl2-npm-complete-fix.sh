#!/bin/bash

# WSL2 npm完全対策スクリプト - ENOTEMPTY/タイムアウトエラー完全解決版
# 暗号通貨AIプラットフォーム用

set -e

echo "🚀 WSL2 npm完全対策スクリプト開始"
echo "======================================"

# 色付きログ関数
log_info() { echo -e "\033[36m[INFO]\033[0m $1"; }
log_success() { echo -e "\033[32m[SUCCESS]\033[0m $1"; }
log_warning() { echo -e "\033[33m[WARNING]\033[0m $1"; }
log_error() { echo -e "\033[31m[ERROR]\033[0m $1"; }

# エラーハンドリング
handle_error() {
    log_error "スクリプト実行中にエラーが発生しました。ライン: $1"
    exit 1
}
trap 'handle_error ${LINENO}' ERR

# 1. 環境確認
log_info "環境確認中..."
if ! grep -q microsoft /proc/version 2>/dev/null; then
    log_warning "WSL2環境ではない可能性があります。"
fi

log_info "Node.js バージョン: $(node --version 2>/dev/null || echo 'Not installed')"
log_info "npm バージョン: $(npm --version 2>/dev/null || echo 'Not installed')"
log_info "現在のディレクトリ: $(pwd)"

# 2. プロセス終了とキャッシュクリア
log_info "既存のnpmプロセスを終了..."
pkill -f "npm" 2>/dev/null || true
sleep 2

log_info "npmキャッシュのクリア..."
npm cache clean --force 2>/dev/null || true
npm cache verify 2>/dev/null || true

# 3. ロック/一時ファイルの完全削除
log_info "ロック/一時ファイルの削除..."
find . -name "package-lock.json" -delete 2>/dev/null || true
find . -name "npm-debug.log*" -delete 2>/dev/null || true
find . -name ".npm" -type d -exec rm -rf {} + 2>/dev/null || true

# node_modulesの完全削除（ネイティブLinuxコマンド使用）
if [ -d "node_modules" ]; then
    log_info "node_modulesの完全削除..."
    # WSL2でのENOTEMPTY対策: 段階的削除
    find node_modules -type f -delete 2>/dev/null || true
    find node_modules -depth -type d -exec rmdir {} + 2>/dev/null || true
    rm -rf node_modules 2>/dev/null || true
    log_success "node_modules削除完了"
fi

# 4. 権限問題の修正
log_info "権限問題の修正..."
if [ -d ~/.npm ]; then
    chmod -R 755 ~/.npm 2>/dev/null || true
fi

# Linux側tmpディレクトリの準備
mkdir -p /tmp/.npm-cache 2>/dev/null || true
chmod 755 /tmp/.npm-cache 2>/dev/null || true

# 5. 設定確認と修正
log_info "npm設定の確認..."
npm config list 2>/dev/null || true

# キャッシュ場所をLinux側に強制設定
npm config set cache /tmp/.npm-cache --global 2>/dev/null || true

# 6. 段階的インストール戦略
log_info "段階的インストール開始..."

# フェーズ1: 必須依存関係のみ
log_info "フェーズ1: Next.js コア依存関係..."
npm install --no-optional --no-fund --no-audit \
    next@15.4.1 \
    react@^18.3.1 \
    react-dom@^18.3.1 \
    typescript@^5.0.0 \
    || handle_error ${LINENO}

log_success "コア依存関係インストール完了"

# フェーズ2: TypeScript関連
log_info "フェーズ2: TypeScript関連..."
npm install --no-optional --no-fund --no-audit \
    "@types/node@^20" \
    "@types/react@^18.3.3" \
    "@types/react-dom@^18.3.0" \
    || handle_error ${LINENO}

# フェーズ3: UI フレームワーク
log_info "フェーズ3: UI フレームワーク..."
npm install --no-optional --no-fund --no-audit \
    tailwindcss@^3.4.7 \
    tailwindcss-animate@^1.0.7 \
    tailwind-merge@^3.3.1 \
    class-variance-authority@^0.7.1 \
    clsx@^2.1.1 \
    || handle_error ${LINENO}

# フェーズ4: Radix UI コンポーネント（バッチ処理）
log_info "フェーズ4: Radix UI コンポーネント..."
RADIX_PACKAGES=(
    "@radix-ui/react-alert-dialog@^1.1.14"
    "@radix-ui/react-avatar@^1.1.10"
    "@radix-ui/react-checkbox@^1.3.2"
    "@radix-ui/react-dialog@^1.1.14"
    "@radix-ui/react-dropdown-menu@^2.1.15"
    "@radix-ui/react-label@^2.1.7"
    "@radix-ui/react-progress@^1.1.7"
    "@radix-ui/react-radio-group@^1.3.7"
    "@radix-ui/react-scroll-area@^1.2.9"
    "@radix-ui/react-select@^2.2.5"
    "@radix-ui/react-separator@^1.1.7"
    "@radix-ui/react-slider@^1.3.5"
    "@radix-ui/react-slot@^1.2.3"
    "@radix-ui/react-switch@^1.2.5"
    "@radix-ui/react-tabs@^1.1.12"
    "@radix-ui/react-tooltip@^1.2.7"
)

for package in "${RADIX_PACKAGES[@]}"; do
    log_info "インストール中: $package"
    npm install --no-optional --no-fund --no-audit "$package" || handle_error ${LINENO}
    sleep 1  # WSL2負荷分散
done

# フェーズ5: 残りの依存関係
log_info "フェーズ5: 残りの依存関係..."
npm install --no-optional --no-fund --no-audit || handle_error ${LINENO}

# フェーズ6: 開発依存関係
log_info "フェーズ6: 開発依存関係..."
npm install --only=dev --no-optional --no-fund --no-audit || handle_error ${LINENO}

# 7. 検証とクリーンアップ
log_info "インストール検証..."
npm ls --depth=0 >/dev/null 2>&1 || {
    log_warning "一部の依存関係に問題がある可能性があります"
    npm ls --depth=0 2>&1 | head -20
}

# package-lock.jsonの再生成
log_info "package-lock.jsonの最適化..."
npm shrinkwrap --dev 2>/dev/null && mv npm-shrinkwrap.json package-lock.json 2>/dev/null || true

# 8. 型チェックとビルドテスト
log_info "TypeScript型チェック..."
npm run type-check || {
    log_warning "TypeScript型チェックでエラーが発生しました"
    npm run type-check 2>&1 | head -10
}

log_info "Next.jsビルドテスト..."
npm run build || {
    log_warning "ビルドでエラーが発生しました"
    npm run build 2>&1 | head -10
}

# 9. 最終状態の確認
echo ""
log_success "🎉 WSL2 npm完全対策完了!"
echo "======================================"

log_info "最終状態:"
log_info "- インストール済みパッケージ数: $(npm ls --depth=0 --parseable 2>/dev/null | wc -l)"
log_info "- package-lock.jsonサイズ: $(du -h package-lock.json 2>/dev/null | cut -f1)"
log_info "- node_modulesサイズ: $(du -sh node_modules 2>/dev/null | cut -f1)"

echo ""
log_info "推奨される次のステップ:"
echo "1. npm run dev         # 開発サーバー起動"
echo "2. npm run type-check  # TypeScript確認"
echo "3. npm run lint        # コード品質確認"
echo "4. npm test            # テスト実行"

echo ""
log_info "トラブルシューティング用コマンド:"
echo "• npm ls --depth=0     # 依存関係確認"
echo "• npm audit fix        # セキュリティ修正"
echo "• npm outdated         # 更新確認"

log_success "スクリプト実行完了 ✨"