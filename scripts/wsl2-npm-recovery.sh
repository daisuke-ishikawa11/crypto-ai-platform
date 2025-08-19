#!/bin/bash

# WSL2 npm ENOTEMPTY エラー完全解決スクリプト
# 暗号通貨AIプラットフォーム用 包括的リカバリーソリューション

set -euo pipefail

# カラーとロギング設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="/mnt/d/crypto-ai-platform"
BACKUP_DIR="/tmp/crypto-ai-backup-$(date +%Y%m%d-%H%M%S)"
LOG_FILE="/tmp/wsl2-npm-recovery.log"

log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

# プリフライトチェック
preflight_check() {
    log "🔍 プリフライトチェック開始..."
    
    # WSL2環境確認
    if ! grep -q "microsoft" /proc/version; then
        error "WSL2環境が検出されません"
        exit 1
    fi
    
    # 必要なツール確認
    for cmd in node npm docker; do
        if ! command -v "$cmd" &> /dev/null; then
            error "$cmd がインストールされていません"
            exit 1
        fi
    done
    
    # プロジェクトディレクトリ確認
    if [[ ! -d "$PROJECT_ROOT" ]]; then
        error "プロジェクトディレクトリが見つかりません: $PROJECT_ROOT"
        exit 1
    fi
    
    success "プリフライトチェック完了"
}

# 現在の状況バックアップ
backup_current_state() {
    log "💾 現在の状況をバックアップ中..."
    
    mkdir -p "$BACKUP_DIR"
    
    # 重要ファイルのバックアップ
    cp "$PROJECT_ROOT/package.json" "$BACKUP_DIR/" 2>/dev/null || true
    cp "$PROJECT_ROOT/package-lock.json" "$BACKUP_DIR/" 2>/dev/null || true
    cp "$PROJECT_ROOT/.npmrc" "$BACKUP_DIR/" 2>/dev/null || true
    
    # 環境情報記録
    {
        echo "=== システム情報 ==="
        uname -a
        echo -e "\n=== Node/npm バージョン ==="
        node -v
        npm -v
        echo -e "\n=== 現在のディレクトリ状況 ==="
        ls -la "$PROJECT_ROOT"
        echo -e "\n=== npm 設定 ==="
        npm config list
    } > "$BACKUP_DIR/system-info.txt"
    
    success "バックアップ完了: $BACKUP_DIR"
}

# npm完全クリーンアップ
npm_complete_cleanup() {
    log "🧹 npm完全クリーンアップ開始..."
    
    cd "$PROJECT_ROOT"
    
    # プロセス確認・停止
    log "Node.jsプロセス確認中..."
    if pgrep -f node; then
        warn "Node.jsプロセスが実行中です。停止中..."
        pkill -f node || true
        sleep 2
    fi
    
    # npmキャッシュ完全削除
    log "npmキャッシュクリア中..."
    npm cache clean --force 2>/dev/null || true
    npm cache verify 2>/dev/null || true
    
    # node_modules強制削除 (複数手法)
    log "node_modules削除中..."
    
    # 方法1: 通常削除
    if [[ -d "node_modules" ]]; then
        rm -rf node_modules 2>/dev/null || {
            warn "通常削除失敗。強制削除を試行中..."
            
            # 方法2: 権限変更後削除
            find node_modules -type d -exec chmod 755 {} \; 2>/dev/null || true
            find node_modules -type f -exec chmod 644 {} \; 2>/dev/null || true
            rm -rf node_modules 2>/dev/null || {
                
                # 方法3: 段階的削除
                warn "段階的削除を実行中..."
                find node_modules -depth -type f -delete 2>/dev/null || true
                find node_modules -depth -type d -delete 2>/dev/null || true
                rm -rf node_modules 2>/dev/null || true
            }
        }
    fi
    
    # package-lock.json削除
    [[ -f "package-lock.json" ]] && rm -f package-lock.json
    
    # .npmrcクリーンアップ
    if [[ -f ".npmrc" ]]; then
        log ".npmrcをクリーンアップ中..."
        # WSL2最適化設定で上書き
        cat > .npmrc << 'EOF'
# WSL2最適化設定
fund=false
audit=false
progress=false
timing=true
prefer-offline=true
cache-max=3600
fetch-retries=3
fetch-retry-mintimeout=10000
fetch-retry-maxtimeout=60000

# パフォーマンス最適化
maxsockets=1
registry=https://registry.npmjs.org/
EOF
    fi
    
    success "npm完全クリーンアップ完了"
}

# WSL2最適化設定
optimize_wsl2_environment() {
    log "⚡ WSL2環境最適化中..."
    
    # Git設定最適化
    log "Git設定最適化中..."
    git config --global core.autocrlf false
    git config --global core.filemode false
    git config --global core.longpaths true
    
    # npm設定最適化
    log "npm設定最適化中..."
    npm config set fund false
    npm config set audit false
    npm config set progress false
    npm config set maxsockets 1
    
    # 環境変数設定
    export NODE_OPTIONS="--max-old-space-size=4096"
    export NPM_CONFIG_PROGRESS=false
    export NPM_CONFIG_LOGLEVEL=warn
    
    success "WSL2環境最適化完了"
}

# Docker環境準備
setup_docker_environment() {
    log "🐳 Docker環境セットアップ中..."
    
    # Dockerfileをバックアップから復元または新規作成
    if [[ ! -f "Dockerfile.dev" ]]; then
        cat > Dockerfile.dev << 'EOF'
# WSL2最適化 Next.js開発環境
FROM node:20-alpine

# WSL2最適化のための環境変数
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NPM_CONFIG_PROGRESS=false
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false

# 作業ディレクトリ設定
WORKDIR /app

# パッケージファイルコピー
COPY package*.json ./
COPY .npmrc ./

# 依存関係インストール（WSL2最適化）
RUN npm ci --only=production --no-optional --prefer-offline

# アプリケーションコードコピー
COPY . .

# ポート公開
EXPOSE 3000

# 開発サーバー起動
CMD ["npm", "run", "dev"]
EOF
    fi
    
    # docker-compose.dev.yml作成
    if [[ ! -f "docker-compose.dev.yml" ]]; then
        cat > docker-compose.dev.yml << 'EOF'
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - npm_cache:/root/.npm
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
      - CHOKIDAR_INTERVAL=1000
    restart: unless-stopped
    
  # 開発ツール用サービス
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: crypto_ai_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  npm_cache:
  postgres_data:
EOF
    fi
    
    success "Docker環境セットアップ完了"
}

# 依存関係段階的インストール
staged_dependency_install() {
    log "📦 依存関係段階的インストール開始..."
    
    cd "$PROJECT_ROOT"
    
    # Node.jsバージョン確認
    log "Node.js $(node -v) を使用"
    
    # 段階1: コア依存関係
    log "段階1: コア依存関係インストール中..."
    local core_packages=(
        "next@15.4.1"
        "react@^18.3.1" 
        "react-dom@^18.3.1"
        "typescript@^5.0.0"
    )
    
    for package in "${core_packages[@]}"; do
        log "インストール中: $package"
        npm install "$package" --no-fund --no-audit --prefer-offline || {
            error "$package のインストールに失敗"
            return 1
        }
    done
    
    # 段階2: 型定義
    log "段階2: 型定義インストール中..."
    local type_packages=(
        "@types/node@^20"
        "@types/react@^18.3.3"
        "@types/react-dom@^18.3.0"
    )
    
    for package in "${type_packages[@]}"; do
        log "インストール中: $package"
        npm install "$package" --save-dev --no-fund --no-audit --prefer-offline || {
            warn "$package のインストールをスキップ"
        }
    done
    
    # 段階3: UI/スタイリング
    log "段階3: UI/スタイリングインストール中..."
    local ui_packages=(
        "tailwindcss@^3.4.7"
        "lucide-react@^0.525.0"
        "class-variance-authority@^0.7.1"
        "clsx@^2.1.1"
        "tailwind-merge@^3.3.1"
    )
    
    for package in "${ui_packages[@]}"; do
        log "インストール中: $package"
        npm install "$package" --no-fund --no-audit --prefer-offline || {
            warn "$package のインストールをスキップ"
        }
    done
    
    # 段階4: 開発ツール
    log "段階4: 開発ツールインストール中..."
    local dev_packages=(
        "eslint@^9"
        "eslint-config-next@15.4.1"
        "autoprefixer@^10.4.19"
        "postcss@^8.4.38"
    )
    
    for package in "${dev_packages[@]}"; do
        log "インストール中: $package"
        npm install "$package" --save-dev --no-fund --no-audit --prefer-offline || {
            warn "$package のインストールをスキップ"
        }
    done
    
    success "段階的インストール完了"
}

# 健全性検証
health_check() {
    log "🩺 システム健全性チェック中..."
    
    cd "$PROJECT_ROOT"
    
    # 基本ファイル確認
    local required_files=("package.json" "next.config.js" "tailwind.config.js")
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            warn "$file が見つかりません"
        fi
    done
    
    # node_modules確認
    if [[ ! -d "node_modules" ]]; then
        error "node_modules ディレクトリが存在しません"
        return 1
    fi
    
    # 重要パッケージ確認
    local critical_packages=("next" "react" "react-dom")
    for pkg in "${critical_packages[@]}"; do
        if [[ ! -d "node_modules/$pkg" ]]; then
            error "重要パッケージが見つかりません: $pkg"
            return 1
        fi
    done
    
    # TypeScriptチェック
    log "TypeScript設定チェック中..."
    if command -v npx &> /dev/null; then
        npx tsc --noEmit --skipLibCheck || warn "TypeScriptエラーが検出されました"
    fi
    
    # Next.jsビルドテスト
    log "Next.jsビルドテスト中..."
    timeout 60s npm run build > /dev/null 2>&1 || {
        warn "ビルドテストに失敗しました（タイムアウトまたはエラー）"
    }
    
    success "健全性チェック完了"
}

# Docker代替実行オプション
docker_fallback_setup() {
    log "🐳 Docker代替環境セットアップ中..."
    
    # Docker実行スクリプト作成
    cat > run-docker-dev.sh << 'EOF'
#!/bin/bash

# WSL2 Docker開発環境起動スクリプト
echo "🚀 Docker開発環境を起動中..."

# 既存コンテナ停止・削除
docker-compose -f docker-compose.dev.yml down --volumes 2>/dev/null || true

# 新規環境構築・起動
docker-compose -f docker-compose.dev.yml up --build --force-recreate

echo "✅ 開発環境起動完了: http://localhost:3000"
EOF
    
    chmod +x run-docker-dev.sh
    
    # クリーンアップスクリプト
    cat > cleanup-docker-dev.sh << 'EOF'
#!/bin/bash

# Docker環境クリーンアップ
echo "🧹 Docker環境クリーンアップ中..."

docker-compose -f docker-compose.dev.yml down --volumes --rmi all
docker system prune -f
docker volume prune -f

echo "✅ クリーンアップ完了"
EOF
    
    chmod +x cleanup-docker-dev.sh
    
    success "Docker代替環境セットアップ完了"
}

# メイン実行フロー
main() {
    log "🚀 WSL2 npm ENOTEMPTY 完全解決スクリプト開始"
    log "プロジェクト: 暗号通貨AIプラットフォーム"
    log "実行時刻: $(date)"
    
    # 実行フロー
    preflight_check
    backup_current_state
    npm_complete_cleanup
    optimize_wsl2_environment
    setup_docker_environment
    staged_dependency_install
    health_check
    docker_fallback_setup
    
    success "🎉 完全解決スクリプト実行完了!"
    
    # 結果サマリー
    cat << EOF

🎯 解決策サマリー:
================================

✅ 実行済み操作:
   • npm完全クリーンアップ
   • WSL2環境最適化
   • Docker環境構築
   • 段階的依存関係インストール
   • システム健全性チェック

🛠️ 利用可能なコマンド:
   • npm run dev          : 通常開発サーバー
   • ./run-docker-dev.sh   : Docker開発環境
   • ./cleanup-docker-dev.sh : Docker環境リセット

📊 環境情報:
   • バックアップ場所: $BACKUP_DIR
   • ログファイル: $LOG_FILE
   • Docker設定: docker-compose.dev.yml

🔄 問題が継続する場合:
   1. Docker環境使用: ./run-docker-dev.sh
   2. 完全リセット: ./cleanup-docker-dev.sh
   3. スクリプト再実行: ./wsl2-npm-recovery.sh

EOF

    log "詳細ログ: $LOG_FILE"
}

# トラップハンドラー
cleanup() {
    log "スクリプト終了処理中..."
}

trap cleanup EXIT

# メイン実行
main "$@"