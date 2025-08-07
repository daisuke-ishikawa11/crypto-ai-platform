#!/bin/bash
# 🚀 Cloudflare Workers デプロイメントスクリプト
# OpenNext + Next.js アプリケーション自動デプロイ

set -e

# 色付きログ
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

# 環境変数チェック
check_env() {
    log_info "環境変数をチェック中..."
    
    required_vars=(
        "CLOUDFLARE_ACCOUNT_ID"
        "CLOUDFLARE_API_TOKEN"
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "SUPABASE_SERVICE_KEY"
        "OPENAI_API_KEY"
        "STRIPE_SECRET_KEY"
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        log_error "以下の環境変数が設定されていません:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        exit 1
    fi
    
    log_success "すべての必要な環境変数が設定されています"
}

# 依存関係インストール
install_dependencies() {
    log_info "依存関係をインストール中..."
    
    if [ ! -f "package.json" ]; then
        log_error "package.jsonが見つかりません"
        exit 1
    fi
    
    # Node.js バージョンチェック
    node_version=$(node --version)
    log_info "Node.js バージョン: $node_version"
    
    # npm install
    npm ci --production=false
    
    log_success "依存関係のインストールが完了しました"
}

# OpenNext ビルド
build_with_opennext() {
    log_info "OpenNext でビルド中..."
    
    # Next.js ビルド
    npm run build
    
    # OpenNext 変換
    if command -v open-next &> /dev/null; then
        npx open-next build
    else
        log_warning "open-next が見つかりません。インストール中..."
        npm install -g open-next
        npx open-next build
    fi
    
    log_success "OpenNext ビルドが完了しました"
}

# Wrangler 設定確認
verify_wrangler_config() {
    log_info "Wrangler 設定を確認中..."
    
    if [ ! -f "wrangler.toml" ]; then
        log_error "wrangler.toml が見つかりません"
        exit 1
    fi
    
    # Wrangler インストール確認
    if ! command -v wrangler &> /dev/null; then
        log_warning "Wrangler が見つかりません。インストール中..."
        npm install -g wrangler
    fi
    
    # 認証確認
    if ! wrangler whoami &> /dev/null; then
        log_info "Cloudflare にログイン中..."
        wrangler login
    fi
    
    log_success "Wrangler 設定が確認されました"
}

# KV ネームスペース作成
create_kv_namespaces() {
    log_info "KV ネームスペースを作成中..."
    
    # キャッシュ用 KV
    if [ -z "$KV_CACHE_NAMESPACE_ID" ]; then
        log_info "キャッシュ用 KV ネームスペースを作成中..."
        cache_ns=$(wrangler kv:namespace create "CACHE" --preview | grep "id" | cut -d'"' -f4)
        export KV_CACHE_NAMESPACE_ID=$cache_ns
        log_success "キャッシュ KV 作成完了: $cache_ns"
    fi
    
    # セッション用 KV
    if [ -z "$KV_SESSIONS_NAMESPACE_ID" ]; then
        log_info "セッション用 KV ネームスペースを作成中..."
        sessions_ns=$(wrangler kv:namespace create "SESSIONS" --preview | grep "id" | cut -d'"' -f4)
        export KV_SESSIONS_NAMESPACE_ID=$sessions_ns
        log_success "セッション KV 作成完了: $sessions_ns"
    fi
}

# R2 バケット作成
create_r2_buckets() {
    log_info "R2 バケットを作成中..."
    
    # アセット用 R2
    if [ -z "$R2_ASSETS_BUCKET" ]; then
        bucket_name="crypto-ai-platform-assets-$(date +%s)"
        wrangler r2 bucket create "$bucket_name" || log_warning "バケット作成がスキップされました（既存の可能性）"
        export R2_ASSETS_BUCKET=$bucket_name
        log_success "アセット R2 作成完了: $bucket_name"
    fi
}

# D1 データベース作成
create_d1_database() {
    log_info "D1 データベースを作成中..."
    
    if [ -z "$D1_DATABASE_ID" ]; then
        db_name="crypto-ai-platform-cache"
        
        # データベース作成
        db_output=$(wrangler d1 create "$db_name" 2>/dev/null || echo "skip")
        
        if [ "$db_output" != "skip" ]; then
            db_id=$(echo "$db_output" | grep "database_id" | cut -d'"' -f4)
            export D1_DATABASE_ID=$db_id
            
            # 基本テーブル作成
            wrangler d1 execute "$db_name" --command "
                CREATE TABLE IF NOT EXISTS cache_entries (
                    key TEXT PRIMARY KEY,
                    value TEXT,
                    expires_at INTEGER,
                    created_at INTEGER DEFAULT (strftime('%s', 'now'))
                );
                
                CREATE INDEX IF NOT EXISTS idx_expires_at ON cache_entries(expires_at);
            "
            
            log_success "D1 データベース作成完了: $db_id"
        else
            log_warning "D1 データベース作成がスキップされました"
        fi
    fi
}

# 環境変数をWranglerに設定
set_environment_variables() {
    log_info "環境変数を設定中..."
    
    # Supabase
    wrangler secret put NEXT_PUBLIC_SUPABASE_URL --env production
    wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY --env production
    wrangler secret put SUPABASE_SERVICE_KEY --env production
    
    # AI APIs
    wrangler secret put OPENAI_API_KEY --env production
    wrangler secret put ANTHROPIC_API_KEY --env production
    
    # Stripe
    wrangler secret put STRIPE_SECRET_KEY --env production
    wrangler secret put NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY --env production
    wrangler secret put STRIPE_WEBHOOK_SECRET --env production
    
    # その他
    wrangler secret put COINMARKETCAP_API_KEY --env production
    wrangler secret put SENTRY_DSN --env production
    
    log_success "環境変数の設定が完了しました"
}

# デプロイ実行
deploy_to_cloudflare() {
    log_info "Cloudflare Workers にデプロイ中..."
    
    # 本番環境にデプロイ
    wrangler deploy --env production
    
    log_success "デプロイが完了しました！"
}

# カスタムドメイン設定（オプション）
setup_custom_domain() {
    if [ -n "$CUSTOM_DOMAIN" ]; then
        log_info "カスタムドメインを設定中: $CUSTOM_DOMAIN"
        
        # ルート設定
        wrangler route add "$CUSTOM_DOMAIN/*" crypto-ai-platform --env production
        
        log_success "カスタムドメインの設定が完了しました"
    fi
}

# ヘルスチェック
health_check() {
    log_info "デプロイ後のヘルスチェックを実行中..."
    
    # デプロイされたURLを取得
    app_url=$(wrangler deployment list --env production | grep "https://" | head -1 | awk '{print $2}')
    
    if [ -n "$app_url" ]; then
        log_info "アプリケーション URL: $app_url"
        
        # 基本的なヘルスチェック
        if curl -f -s "$app_url/api/health" > /dev/null; then
            log_success "ヘルスチェック成功！"
        else
            log_warning "ヘルスチェックに失敗しました。手動で確認してください。"
        fi
    else
        log_warning "デプロイ URL を取得できませんでした"
    fi
}

# クリーンアップ
cleanup() {
    log_info "一時ファイルをクリーンアップ中..."
    
    # ビルドキャッシュなどを削除
    rm -rf .next/cache
    rm -rf node_modules/.cache
    
    log_success "クリーンアップが完了しました"
}

# メイン実行フロー
main() {
    log_info "=== Cloudflare Workers デプロイメント開始 ==="
    
    # 環境チェック
    check_env
    
    # 依存関係
    install_dependencies
    
    # ビルド
    build_with_opennext
    
    # Wrangler設定
    verify_wrangler_config
    
    # インフラ作成
    create_kv_namespaces
    create_r2_buckets
    create_d1_database
    
    # 環境変数設定
    set_environment_variables
    
    # デプロイ
    deploy_to_cloudflare
    
    # カスタムドメイン（オプション）
    setup_custom_domain
    
    # ヘルスチェック
    health_check
    
    # クリーンアップ
    cleanup
    
    log_success "=== デプロイメントが正常に完了しました！ ==="
    
    if [ -n "$app_url" ]; then
        echo ""
        echo "🎉 アプリケーションが利用可能です:"
        echo "   $app_url"
        echo ""
        echo "📊 Cloudflare Dashboard:"
        echo "   https://dash.cloudflare.com/${CLOUDFLARE_ACCOUNT_ID}/workers/overview"
    fi
}

# エラーハンドリング
trap 'log_error "デプロイメント中にエラーが発生しました"; exit 1' ERR

# スクリプト実行
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi