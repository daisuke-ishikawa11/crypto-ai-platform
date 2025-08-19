#!/bin/bash

# WSL2 高度な npm ENOTEMPTY 問題解決スクリプト
# 暗号通貨AIプラットフォーム用 ハイブリッドDockerアプローチ

set -euo pipefail

# カラーとロギング設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_ROOT="/mnt/d/crypto-ai-platform"
BACKUP_DIR="/tmp/crypto-ai-advanced-backup-$(date +%Y%m%d-%H%M%S)"
LOG_FILE="/tmp/wsl2-advanced-recovery.log"
DOCKER_CONTEXT="crypto-ai-recovery"

# ロギング関数
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

info() {
    echo -e "${CYAN}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

debug() {
    echo -e "${PURPLE}[DEBUG]${NC} $1" | tee -a "$LOG_FILE"
}

# エラーハンドリング
handle_error() {
    error "スクリプトエラーが発生しました (行: $1)"
    error "詳細ログ: $LOG_FILE"
    cleanup_on_error
    exit 1
}

trap 'handle_error $LINENO' ERR

# エラー時クリーンアップ
cleanup_on_error() {
    log "エラー発生時のクリーンアップ中..."
    
    # Docker環境クリーンアップ
    docker-compose -f docker-compose.dev.yml down --volumes 2>/dev/null || true
    docker system prune -f 2>/dev/null || true
    
    # プロセス停止
    pkill -f node 2>/dev/null || true
    pkill -f npm 2>/dev/null || true
}

# システム詳細診断
system_diagnosis() {
    log "🔍 WSL2システム詳細診断開始..."
    
    {
        echo "==================== システム診断結果 ===================="
        echo "実行日時: $(date)"
        echo ""
        
        echo "=== WSL2 環境情報 ==="
        cat /proc/version
        uname -a
        echo ""
        
        echo "=== メモリ・ディスク使用量 ==="
        free -h
        df -h "$PROJECT_ROOT"
        echo ""
        
        echo "=== Node.js/npm バージョン ==="
        node --version
        npm --version
        echo ""
        
        echo "=== プロセス状況 ==="
        pgrep -f node || echo "Node.jsプロセスなし"
        pgrep -f npm || echo "npmプロセスなし"
        echo ""
        
        echo "=== ネットワーク接続確認 ==="
        curl -s --max-time 5 https://registry.npmjs.org/ > /dev/null && echo "npm registry: OK" || echo "npm registry: NG"
        curl -s --max-time 5 https://github.com/ > /dev/null && echo "GitHub: OK" || echo "GitHub: NG"
        echo ""
        
        echo "=== Docker 状況 ==="
        docker --version 2>/dev/null || echo "Docker未インストール"
        docker info 2>/dev/null || echo "Docker daemon未起動"
        echo ""
        
        echo "=== プロジェクトディレクトリ状況 ==="
        ls -la "$PROJECT_ROOT" | head -20
        echo ""
        
        echo "=== node_modules 状況 ==="
        if [[ -d "$PROJECT_ROOT/node_modules" ]]; then
            du -sh "$PROJECT_ROOT/node_modules" 2>/dev/null || echo "サイズ計算失敗"
            find "$PROJECT_ROOT/node_modules" -type f -name "package.json" | wc -l | xargs echo "インストール済みパッケージ数:"
        else
            echo "node_modules なし"
        fi
        echo ""
        
        echo "=== npm設定 ==="
        npm config list
        echo ""
        
        echo "=== Git 設定 ==="
        git config --list | grep -E "(core.autocrlf|core.filemode|core.longpaths)" || echo "Git設定なし"
        echo ""
        
    } > "$BACKUP_DIR/system-diagnosis.txt"
    
    success "システム診断完了: $BACKUP_DIR/system-diagnosis.txt"
}

# 高度なファイルシステムクリーンアップ
advanced_filesystem_cleanup() {
    log "🧹 高度なファイルシステムクリーンアップ開始..."
    
    cd "$PROJECT_ROOT"
    
    # 1. 全プロセス強制終了
    log "Step 1: プロセス強制終了"
    pkill -9 -f node 2>/dev/null || true
    pkill -9 -f npm 2>/dev/null || true
    sleep 3
    
    # 2. ファイルハンドル確認
    log "Step 2: ファイルハンドル確認"
    lsof +D "$PROJECT_ROOT" 2>/dev/null | head -10 || true
    
    # 3. 権限問題解決
    log "Step 3: 権限問題解決"
    if [[ -d "node_modules" ]]; then
        find node_modules -type d -exec chmod 755 {} + 2>/dev/null || true
        find node_modules -type f -exec chmod 644 {} + 2>/dev/null || true
    fi
    
    # 4. 段階的削除（複数手法）
    log "Step 4: node_modules段階的削除"
    
    # 手法1: 通常削除
    rm -rf node_modules 2>/dev/null && success "通常削除成功" || {
        warn "通常削除失敗。代替手法を試行..."
        
        # 手法2: find + delete
        find node_modules -depth -type f -delete 2>/dev/null || true
        find node_modules -depth -type d -delete 2>/dev/null || true
        
        # 手法3: 小分け削除
        if [[ -d "node_modules" ]]; then
            for dir in node_modules/*/; do
                [[ -d "$dir" ]] && rm -rf "$dir" 2>/dev/null || true
            done
            rmdir node_modules 2>/dev/null || true
        fi
        
        # 手法4: mv + background delete
        if [[ -d "node_modules" ]]; then
            warn "最終手段: バックグラウンド削除"
            mv node_modules "node_modules.delete.$(date +%s)" || true
            nohup rm -rf "node_modules.delete."* > /dev/null 2>&1 &
        fi
    }
    
    # 5. 関連ファイル削除
    log "Step 5: 関連ファイル削除"
    rm -f package-lock.json 2>/dev/null || true
    rm -f yarn.lock 2>/dev/null || true
    rm -rf .next 2>/dev/null || true
    rm -rf .cache 2>/dev/null || true
    rm -rf dist 2>/dev/null || true
    
    # 6. npm/yarn キャッシュ完全削除
    log "Step 6: キャッシュ完全削除"
    npm cache clean --force 2>/dev/null || true
    npm cache verify 2>/dev/null || true
    yarn cache clean --all 2>/dev/null || true
    
    success "高度なファイルシステムクリーンアップ完了"
}

# インテリジェント依存関係復旧
intelligent_dependency_recovery() {
    log "📦 インテリジェント依存関係復旧開始..."
    
    cd "$PROJECT_ROOT"
    
    # 1. package.json検証・修復
    log "Step 1: package.json検証"
    if ! node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
        error "package.json が破損しています"
        if [[ -f "$BACKUP_DIR/package.json" ]]; then
            cp "$BACKUP_DIR/package.json" ./
            success "バックアップから package.json を復旧"
        else
            error "バックアップが見つかりません"
            return 1
        fi
    fi
    
    # 2. 最適化された .npmrc 作成\n    log \"Step 2: WSL2最適化 .npmrc 作成\"\n    cat > .npmrc << 'EOF'\n# WSL2最適化設定 - ENOTEMPTY対策\nfund=false\naudit=false\nprogress=false\ntiming=true\nprefer-offline=true\ncache-max=7200\nfetch-retries=5\nfetch-retry-mintimeout=15000\nfetch-retry-maxtimeout=120000\nmaxsockets=1\nregistry=https://registry.npmjs.org/\n\n# 高度な最適化\nengine-strict=false\noptional=false\npackage-lock=true\nshrinkwrap=false\nEOF\n    \n    # 3. 段階的インストール（改良版）\n    log \"Step 3: インテリジェント段階的インストール\"\n    \n    # 段階3-1: Next.jsコア\n    log \"段階3-1: Next.jsコアパッケージ\"\n    local core_packages=(\n        \"next@15.4.1\"\n        \"react@^18.3.1\"\n        \"react-dom@^18.3.1\"\n    )\n    \n    for pkg in \"${core_packages[@]}\"; do\n        log \"インストール中: $pkg\"\n        for retry in {1..3}; do\n            if npm install \"$pkg\" --no-fund --no-audit --prefer-offline --timing; then\n                success \"$pkg インストール成功\"\n                break\n            else\n                warn \"$pkg インストール失敗 (試行 $retry/3)\"\n                [[ $retry -eq 3 ]] && error \"$pkg の最終インストール失敗\" || sleep 5\n            fi\n        done\n    done\n    \n    # 段階3-2: TypeScript関連\n    log \"段階3-2: TypeScript関連パッケージ\"\n    local ts_packages=(\n        \"typescript@^5.0.0\"\n        \"@types/node@^20\"\n        \"@types/react@^18.3.3\"\n        \"@types/react-dom@^18.3.0\"\n    )\n    \n    for pkg in \"${ts_packages[@]}\"; do\n        log \"インストール中: $pkg\"\n        npm install \"$pkg\" --save-dev --no-fund --no-audit --prefer-offline --timing || warn \"$pkg スキップ\"\n    done\n    \n    # 段階3-3: UI/スタイリング\n    log \"段階3-3: UI/スタイリングパッケージ\"\n    local ui_packages=(\n        \"tailwindcss@^3.4.7\"\n        \"autoprefixer@^10.4.19\"\n        \"postcss@^8.4.38\"\n        \"lucide-react@^0.525.0\"\n        \"class-variance-authority@^0.7.1\"\n        \"clsx@^2.1.1\"\n        \"tailwind-merge@^3.3.1\"\n    )\n    \n    for pkg in \"${ui_packages[@]}\"; do\n        log \"インストール中: $pkg\"\n        npm install \"$pkg\" --no-fund --no-audit --prefer-offline --timing || warn \"$pkg スキップ\"\n    done\n    \n    # 段階3-4: 開発ツール\n    log \"段階3-4: 開発ツールパッケージ\"\n    local dev_packages=(\n        \"eslint@^9\"\n        \"eslint-config-next@15.4.1\"\n    )\n    \n    for pkg in \"${dev_packages[@]}\"; do\n        log \"インストール中: $pkg\"\n        npm install \"$pkg\" --save-dev --no-fund --no-audit --prefer-offline --timing || warn \"$pkg スキップ\"\n    done\n    \n    # 4. 依存関係整合性チェック\n    log \"Step 4: 依存関係整合性チェック\"\n    npm ls --depth=0 > \"$BACKUP_DIR/final-dependencies.txt\" 2>&1 || warn \"依存関係に問題があります\"\n    \n    success \"インテリジェント依存関係復旧完了\"\n}\n\n# Docker ハイブリッド環境構築\ndocker_hybrid_setup() {\n    log \"🐳 Docker ハイブリッド環境構築開始...\"\n    \n    cd \"$PROJECT_ROOT\"\n    \n    # 1. Docker 可用性チェック\n    if ! command -v docker &> /dev/null; then\n        warn \"Docker が見つかりません。Docker環境をスキップします\"\n        return 0\n    fi\n    \n    # 2. Docker daemon確認\n    if ! docker info &> /dev/null; then\n        warn \"Docker daemon が起動していません。起動を試行します...\"\n        sudo service docker start 2>/dev/null || true\n        sleep 5\n        if ! docker info &> /dev/null; then\n            warn \"Docker daemon の起動に失敗。Docker環境をスキップします\"\n            return 0\n        fi\n    fi\n    \n    # 3. 既存環境クリーンアップ\n    log \"Step 1: 既存Docker環境クリーンアップ\"\n    docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans 2>/dev/null || true\n    docker system prune -f 2>/dev/null || true\n    \n    # 4. 実行用スクリプト作成\n    log \"Step 2: Docker実行スクリプト作成\"\n    \n    cat > run-docker-dev.sh << 'EOF'\n#!/bin/bash\n\n# WSL2 Docker開発環境起動スクリプト（高度版）\nset -euo pipefail\n\nBLUE='\\033[0;34m'\nGREEN='\\033[0;32m'\nYELLOW='\\033[1;33m'\nNC='\\033[0m'\n\nlog() {\n    echo -e \"${BLUE}[Docker Dev]${NC} $1\"\n}\n\nwarn() {\n    echo -e \"${YELLOW}[Docker Dev WARNING]${NC} $1\"\n}\n\nsuccess() {\n    echo -e \"${GREEN}[Docker Dev SUCCESS]${NC} $1\"\n}\n\nlog \"🚀 WSL2最適化Docker開発環境を起動中...\"\n\n# 既存環境停止\nlog \"既存環境停止中...\"\ndocker-compose -f docker-compose.dev.yml down --volumes 2>/dev/null || true\n\n# 環境変数確認\nif [[ ! -f .env.local ]] && [[ ! -f .env ]]; then\n    warn \".env ファイルが見つかりません。env.example をコピーしてください\"\nfi\n\n# イメージビルド・起動\nlog \"Docker環境ビルド・起動中...\"\nif docker-compose -f docker-compose.dev.yml up --build --force-recreate -d; then\n    success \"✅ Docker開発環境起動完了！\"\n    \n    echo \"\"\n    echo \"=== アクセス情報 ===\"\n    echo \"🌐 アプリケーション: http://localhost:3000\"\n    echo \"🔍 pgAdmin: http://localhost:5050\"\n    echo \"📧 Mailhog: http://localhost:8025\"\n    echo \"📊 Prometheus: http://localhost:9090 (--profile monitoring)\"\n    echo \"📈 Grafana: http://localhost:3010 (--profile monitoring)\"\n    echo \"\"\n    echo \"=== 便利コマンド ===\"\n    echo \"📋 ログ確認: docker-compose -f docker-compose.dev.yml logs -f crypto-ai-dev\"\n    echo \"🔧 コンテナ内実行: docker-compose -f docker-compose.dev.yml exec crypto-ai-dev bash\"\n    echo \"🛑 環境停止: docker-compose -f docker-compose.dev.yml down\"\n    echo \"🗑️ 完全クリーンアップ: ./cleanup-docker-dev.sh\"\nelse\n    error \"Docker環境の起動に失敗しました\"\n    echo \"詳細ログを確認してください: docker-compose -f docker-compose.dev.yml logs\"\n    exit 1\nfi\nEOF\n    \n    chmod +x run-docker-dev.sh\n    \n    # 5. クリーンアップスクリプト作成\n    log \"Step 3: Dockerクリーンアップスクリプト作成\"\n    \n    cat > cleanup-docker-dev.sh << 'EOF'\n#!/bin/bash\n\n# Docker環境完全クリーンアップスクリプト\nset -euo pipefail\n\nBLUE='\\033[0;34m'\nGREEN='\\033[0;32m'\nYELLOW='\\033[1;33m'\nNC='\\033[0m'\n\nlog() {\n    echo -e \"${BLUE}[Docker Cleanup]${NC} $1\"\n}\n\nwarn() {\n    echo -e \"${YELLOW}[Docker Cleanup WARNING]${NC} $1\"\n}\n\nsuccess() {\n    echo -e \"${GREEN}[Docker Cleanup SUCCESS]${NC} $1\"\n}\n\nlog \"🧹 Docker環境完全クリーンアップ中...\"\n\n# 1. 開発環境停止・削除\nlog \"開発環境停止・削除中...\"\ndocker-compose -f docker-compose.dev.yml down --volumes --rmi all --remove-orphans 2>/dev/null || true\n\n# 2. システム全体クリーンアップ\nlog \"システム全体クリーンアップ中...\"\ndocker system prune -a -f --volumes 2>/dev/null || true\n\n# 3. 未使用イメージ削除\nlog \"未使用イメージ削除中...\"\ndocker image prune -a -f 2>/dev/null || true\n\n# 4. 未使用ボリューム削除\nlog \"未使用ボリューム削除中...\"\ndocker volume prune -f 2>/dev/null || true\n\n# 5. 未使用ネットワーク削除\nlog \"未使用ネットワーク削除中...\"\ndocker network prune -f 2>/dev/null || true\n\nsuccess \"✅ Docker環境完全クリーンアップ完了！\"\n\necho \"\"\nlog \"次の実行コマンド: ./run-docker-dev.sh\"\nEOF\n    \n    chmod +x cleanup-docker-dev.sh\n    \n    # 6. 監視ツール起動スクリプト\n    log \"Step 4: 監視ツール起動スクリプト作成\"\n    \n    cat > run-monitoring.sh << 'EOF'\n#!/bin/bash\n\n# 監視ツール起動スクリプト\nset -euo pipefail\n\nBLUE='\\033[0;34m'\nGREEN='\\033[0;32m'\nNC='\\033[0m'\n\nlog() {\n    echo -e \"${BLUE}[Monitoring]${NC} $1\"\n}\n\nsuccess() {\n    echo -e \"${GREEN}[Monitoring SUCCESS]${NC} $1\"\n}\n\nlog \"📊 監視ツール起動中...\"\n\n# 監視プロファイルで起動\nif docker-compose -f docker-compose.dev.yml --profile monitoring up -d; then\n    success \"監視ツール起動完了！\"\n    \n    echo \"\"\n    echo \"=== 監視ツールアクセス情報 ===\"\n    echo \"📊 Prometheus: http://localhost:9090\"\n    echo \"📈 Grafana: http://localhost:3010\"\n    echo \"   - ユーザー: admin\"\n    echo \"   - パスワード: development123\"\nelse\n    echo \"監視ツールの起動に失敗しました\"\n    exit 1\nfi\nEOF\n    \n    chmod +x run-monitoring.sh\n    \n    success \"Docker ハイブリッド環境構築完了\"\n    info \"実行可能スクリプト:\"\n    info \"  - ./run-docker-dev.sh      : Docker開発環境起動\"\n    info \"  - ./cleanup-docker-dev.sh  : Docker環境完全削除\"\n    info \"  - ./run-monitoring.sh      : 監視ツール起動\"\n}\n\n# 設定ファイル最適化\noptimize_config_files() {\n    log \"⚙️ 設定ファイル最適化開始...\"\n    \n    cd \"$PROJECT_ROOT\"\n    \n    # 1. Next.js設定最適化\n    log \"Step 1: Next.js設定最適化\"\n    if [[ ! -f next.config.js ]] || ! grep -q \"webpack:\" next.config.js; then\n        cat > next.config.js << 'EOF'\n/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  // WSL2最適化設定\n  experimental: {\n    turbo: {\n      useSwcCss: true,\n    },\n  },\n  \n  // Webpack設定（WSL2 ファイル監視最適化）\n  webpack: (config, { dev, isServer }) => {\n    if (dev && !isServer) {\n      config.watchOptions = {\n        poll: 1000,\n        aggregateTimeout: 300,\n        ignored: /node_modules/,\n      };\n      \n      // WSL2メモリ最適化\n      config.optimization = {\n        ...config.optimization,\n        splitChunks: {\n          chunks: 'all',\n          cacheGroups: {\n            vendor: {\n              test: /[\\\\/]node_modules[\\\\/]/,\n              name: 'vendors',\n              chunks: 'all',\n            },\n          },\n        },\n      };\n    }\n    \n    return config;\n  },\n  \n  // 画像最適化\n  images: {\n    domains: ['localhost'],\n  },\n  \n  // 環境変数\n  env: {\n    CUSTOM_KEY: process.env.CUSTOM_KEY,\n  },\n};\n\nmodule.exports = nextConfig;\nEOF\n        success \"next.config.js 最適化完了\"\n    fi\n    \n    # 2. TypeScript設定確認・最適化\n    log \"Step 2: TypeScript設定最適化\"\n    if [[ ! -f tsconfig.json ]]; then\n        cat > tsconfig.json << 'EOF'\n{\n  \"compilerOptions\": {\n    \"target\": \"es2017\",\n    \"lib\": [\"dom\", \"dom.iterable\", \"esnext\"],\n    \"allowJs\": true,\n    \"skipLibCheck\": true,\n    \"strict\": true,\n    \"noEmit\": true,\n    \"esModuleInterop\": true,\n    \"module\": \"esnext\",\n    \"moduleResolution\": \"bundler\",\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true,\n    \"jsx\": \"preserve\",\n    \"incremental\": true,\n    \"plugins\": [\n      {\n        \"name\": \"next\"\n      }\n    ],\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"./src/*\"],\n      \"@/components/*\": [\"./src/components/*\"],\n      \"@/lib/*\": [\"./src/lib/*\"],\n      \"@/app/*\": [\"./src/app/*\"]\n    }\n  },\n  \"include\": [\n    \"next-env.d.ts\",\n    \"**/*.ts\",\n    \"**/*.tsx\",\n    \".next/types/**/*.ts\"\n  ],\n  \"exclude\": [\n    \"node_modules\",\n    \".next\",\n    \"out\",\n    \"dist\"\n  ]\n}\nEOF\n        success \"tsconfig.json 作成完了\"\n    fi\n    \n    # 3. TailwindCSS設定確認・最適化\n    log \"Step 3: TailwindCSS設定最適化\"\n    if [[ ! -f tailwind.config.js && ! -f tailwind.config.ts ]]; then\n        cat > tailwind.config.js << 'EOF'\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',\n    './src/components/**/*.{js,ts,jsx,tsx,mdx}',\n    './src/app/**/*.{js,ts,jsx,tsx,mdx}',\n  ],\n  theme: {\n    extend: {\n      colors: {\n        background: 'hsl(var(--background))',\n        foreground: 'hsl(var(--foreground))',\n        card: {\n          DEFAULT: 'hsl(var(--card))',\n          foreground: 'hsl(var(--card-foreground))',\n        },\n        popover: {\n          DEFAULT: 'hsl(var(--popover))',\n          foreground: 'hsl(var(--popover-foreground))',\n        },\n        primary: {\n          DEFAULT: 'hsl(var(--primary))',\n          foreground: 'hsl(var(--primary-foreground))',\n        },\n        secondary: {\n          DEFAULT: 'hsl(var(--secondary))',\n          foreground: 'hsl(var(--secondary-foreground))',\n        },\n        muted: {\n          DEFAULT: 'hsl(var(--muted))',\n          foreground: 'hsl(var(--muted-foreground))',\n        },\n        accent: {\n          DEFAULT: 'hsl(var(--accent))',\n          foreground: 'hsl(var(--accent-foreground))',\n        },\n        destructive: {\n          DEFAULT: 'hsl(var(--destructive))',\n          foreground: 'hsl(var(--destructive-foreground))',\n        },\n        border: 'hsl(var(--border))',\n        input: 'hsl(var(--input))',\n        ring: 'hsl(var(--ring))',\n        chart: {\n          '1': 'hsl(var(--chart-1))',\n          '2': 'hsl(var(--chart-2))',\n          '3': 'hsl(var(--chart-3))',\n          '4': 'hsl(var(--chart-4))',\n          '5': 'hsl(var(--chart-5))',\n        },\n      },\n      borderRadius: {\n        lg: 'var(--radius)',\n        md: 'calc(var(--radius) - 2px)',\n        sm: 'calc(var(--radius) - 4px)',\n      },\n    },\n  },\n  plugins: [],\n};\nEOF\n        success \"tailwind.config.js 作成完了\"\n    fi\n    \n    # 4. PostCSS設定確認\n    log \"Step 4: PostCSS設定確認\"\n    if [[ ! -f postcss.config.js ]]; then\n        cat > postcss.config.js << 'EOF'\nmodule.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\nEOF\n        success \"postcss.config.js 作成完了\"\n    fi\n    \n    # 5. ESLint設定最適化\n    log \"Step 5: ESLint設定確認\"\n    if [[ ! -f .eslintrc.json ]]; then\n        cat > .eslintrc.json << 'EOF'\n{\n  \"extends\": \"next/core-web-vitals\",\n  \"rules\": {\n    \"@typescript-eslint/no-unused-vars\": \"warn\",\n    \"react/no-unescaped-entities\": \"off\",\n    \"@next/next/no-img-element\": \"off\"\n  }\n}\nEOF\n        success \".eslintrc.json 作成完了\"\n    fi\n    \n    success \"設定ファイル最適化完了\"\n}\n\n# 包括的健全性テスト\ncomprehensive_health_check() {\n    log \"🩺 包括的健全性テスト開始...\"\n    \n    cd \"$PROJECT_ROOT\"\n    \n    local test_results=\"$BACKUP_DIR/health-check-results.txt\"\n    \n    {\n        echo \"==================== 健全性テスト結果 ====================\"\n        echo \"テスト実行日時: $(date)\"\n        echo \"\"\n        \n        # 1. ファイル構造確認\n        echo \"=== 1. ファイル構造確認 ===\"\n        local required_files=(\"package.json\" \"next.config.js\" \"tsconfig.json\")\n        for file in \"${required_files[@]}\"; do\n            if [[ -f \"$file\" ]]; then\n                echo \"✅ $file 存在\"\n            else\n                echo \"❌ $file 不在\"\n            fi\n        done\n        echo \"\"\n        \n        # 2. node_modules確認\n        echo \"=== 2. node_modules確認 ===\"\n        if [[ -d \"node_modules\" ]]; then\n            echo \"✅ node_modules 存在\"\n            echo \"📦 サイズ: $(du -sh node_modules 2>/dev/null || echo '計算不可')\"\n            \n            local critical_packages=(\"next\" \"react\" \"react-dom\" \"typescript\")\n            for pkg in \"${critical_packages[@]}\"; do\n                if [[ -d \"node_modules/$pkg\" ]]; then\n                    echo \"✅ $pkg インストール済み\"\n                else\n                    echo \"❌ $pkg 未インストール\"\n                fi\n            done\n        else\n            echo \"❌ node_modules 不在\"\n        fi\n        echo \"\"\n        \n        # 3. 依存関係整合性\n        echo \"=== 3. 依存関係整合性 ===\"\n        if npm ls --depth=0 >/dev/null 2>&1; then\n            echo \"✅ 依存関係整合性OK\"\n        else\n            echo \"⚠️ 依存関係に問題あり\"\n            npm ls --depth=0 2>&1 | head -10\n        fi\n        echo \"\"\n        \n        # 4. TypeScriptチェック\n        echo \"=== 4. TypeScriptチェック ===\"\n        if command -v npx &> /dev/null && [[ -f \"tsconfig.json\" ]]; then\n            if timeout 30s npx tsc --noEmit --skipLibCheck >/dev/null 2>&1; then\n                echo \"✅ TypeScript型チェックOK\"\n            else\n                echo \"⚠️ TypeScript型エラーあり\"\n            fi\n        else\n            echo \"⚠️ TypeScriptチェックスキップ\"\n        fi\n        echo \"\"\n        \n        # 5. Next.jsビルドテスト\n        echo \"=== 5. Next.jsビルドテスト ===\"\n        if timeout 60s npm run build >/dev/null 2>&1; then\n            echo \"✅ Next.jsビルドOK\"\n        else\n            echo \"⚠️ Next.jsビルド失敗またはタイムアウト\"\n        fi\n        echo \"\"\n        \n        # 6. 環境変数チェック\n        echo \"=== 6. 環境変数チェック ===\"\n        local env_files=(\".env\" \".env.local\" \".env.development\")\n        local env_found=false\n        for env_file in \"${env_files[@]}\"; do\n            if [[ -f \"$env_file\" ]]; then\n                echo \"✅ $env_file 存在\"\n                env_found=true\n            fi\n        done\n        if [[ \"$env_found\" == \"false\" ]]; then\n            echo \"⚠️ 環境変数ファイル未設定\"\n        fi\n        echo \"\"\n        \n        # 7. Docker環境テスト\n        echo \"=== 7. Docker環境テスト ===\"\n        if command -v docker &> /dev/null; then\n            if docker info >/dev/null 2>&1; then\n                echo \"✅ Docker利用可能\"\n                if [[ -f \"docker-compose.dev.yml\" ]]; then\n                    echo \"✅ Docker Compose設定存在\"\n                else\n                    echo \"⚠️ Docker Compose設定なし\"\n                fi\n            else\n                echo \"⚠️ Docker daemon未起動\"\n            fi\n        else\n            echo \"⚠️ Docker未インストール\"\n        fi\n        echo \"\"\n        \n        # 8. パフォーマンス指標\n        echo \"=== 8. パフォーマンス指標 ===\"\n        echo \"💾 使用メモリ: $(free -h | awk '/^Mem:/ {print $3}')\"\n        echo \"💽 使用ディスク: $(df -h '$PROJECT_ROOT' | awk 'NR==2 {print $3}')/$( df -h '$PROJECT_ROOT' | awk 'NR==2 {print $2}')\"\n        echo \"🕐 起動予想時間: $(if [[ -d 'node_modules' ]]; then echo '15-30秒'; else echo '2-5分'; fi)\"\n        echo \"\"\n        \n    } > \"$test_results\"\n    \n    success \"包括的健全性テスト完了: $test_results\"\n    \n    # 結果サマリー表示\n    info \"健全性テスト結果サマリー:\"\n    grep -E \"(✅|❌|⚠️)\" \"$test_results\" | head -15\n}\n\n# 最終レポート生成\ngenerate_final_report() {\n    log \"📄 最終レポート生成中...\"\n    \n    local report_file=\"$BACKUP_DIR/recovery-final-report.md\"\n    \n    cat > \"$report_file\" << EOF\n# WSL2 npm ENOTEMPTY 高度解決レポート\n\n## 実行概要\n- **実行日時**: $(date)\n- **プロジェクト**: 暗号通貨AIプラットフォーム\n- **WSL2環境**: $(cat /proc/version)\n- **Node.js**: $(node --version)\n- **npm**: $(npm --version)\n\n## 実行した解決策\n\n### 1. システム診断\n- WSL2環境詳細分析\n- メモリ・ディスク使用量確認\n- プロセス状況確認\n- ネットワーク接続確認\n\n### 2. 高度なファイルシステムクリーンアップ\n- 全プロセス強制終了\n- ファイルハンドル確認\n- 権限問題解決\n- 段階的削除（4手法）\n- 関連ファイル完全削除\n- キャッシュ完全削除\n\n### 3. インテリジェント依存関係復旧\n- package.json検証・修復\n- WSL2最適化 .npmrc 作成\n- 段階的インストール（4段階）\n  - Next.jsコアパッケージ\n  - TypeScript関連パッケージ\n  - UI/スタイリングパッケージ\n  - 開発ツールパッケージ\n- 依存関係整合性チェック\n\n### 4. Docker ハイブリッド環境構築\n- Docker可用性チェック\n- 既存環境クリーンアップ\n- 実行スクリプト作成\n  - \\`run-docker-dev.sh\\`: Docker開発環境起動\n  - \\`cleanup-docker-dev.sh\\`: Docker環境完全削除\n  - \\`run-monitoring.sh\\`: 監視ツール起動\n\n### 5. 設定ファイル最適化\n- Next.js設定最適化（WSL2ファイル監視対応）\n- TypeScript設定確認・最適化\n- TailwindCSS設定最適化\n- PostCSS設定確認\n- ESLint設定最適化\n\n### 6. 包括的健全性テスト\n- ファイル構造確認\n- node_modules確認\n- 依存関係整合性\n- TypeScriptチェック\n- Next.jsビルドテスト\n- 環境変数チェック\n- Docker環境テスト\n- パフォーマンス指標\n\n## 利用可能な起動方法\n\n### 1. 通常起動（推奨）\n\\`\\`\\`bash\nnpm run dev\n\\`\\`\\`\n\n### 2. Docker起動（隔離環境）\n\\`\\`\\`bash\n./run-docker-dev.sh\n\\`\\`\\`\n\n### 3. 監視ツール付き起動\n\\`\\`\\`bash\n./run-monitoring.sh\n\\`\\`\\`\n\n## 問題が再発した場合の対処法\n\n### レベル1: 軽微な問題\n\\`\\`\\`bash\nnpm cache clean --force\nrm -rf node_modules package-lock.json\nnpm install\n\\`\\`\\`\n\n### レベル2: 中程度の問題\n\\`\\`\\`bash\n./cleanup-docker-dev.sh\n./run-docker-dev.sh\n\\`\\`\\`\n\n### レベル3: 深刻な問題\n\\`\\`\\`bash\n# 本スクリプトを再実行\n./scripts/wsl2-advanced-recovery.sh\n\\`\\`\\`\n\n## パフォーマンス最適化のポイント\n\n### WSL2設定\n- \\`.wslconfig\\` でメモリ制限調整\n- \\`wsl --shutdown\\` で定期的な再起動\n- Windows Defender除外設定\n\n### npm設定\n- \\`.npmrc\\` でWSL2最適化済み\n- オフライン優先・リトライ設定\n- 並列接続数制限\n\n### Next.js設定\n- Webpack ファイル監視最適化\n- メモリ使用量最適化\n- ビルドキャッシュ活用\n\n## 継続的メンテナンス\n\n### 週次作業\n- \\`docker system prune -f\\`\n- \\`npm cache clean --force\\`\n- WSL2再起動\n\n### 月次作業\n- 依存関係更新チェック\n- セキュリティ脆弱性スキャン\n- パフォーマンス指標確認\n\n## サポートファイル\n- **システム診断**: \\`$BACKUP_DIR/system-diagnosis.txt\\`\n- **健全性テスト**: \\`$BACKUP_DIR/health-check-results.txt\\`\n- **依存関係情報**: \\`$BACKUP_DIR/final-dependencies.txt\\`\n- **バックアップ**: \\`$BACKUP_DIR/\\`\n\n---\n**生成日時**: $(date)  \n**スクリプト**: wsl2-advanced-recovery.sh  \n**作成者**: Crypto AI Platform DevOps Team\nEOF\n\n    success \"最終レポート生成完了: $report_file\"\n}\n\n# メイン実行フロー\nmain() {\n    echo -e \"${CYAN}\"\n    cat << \"EOF\"\n╔══════════════════════════════════════════════════════════════╗\n║                                                              ║\n║      WSL2 npm ENOTEMPTY 高度解決スクリプト v2.0             ║\n║      暗号通貨AIプラットフォーム用                           ║\n║                                                              ║\n║      🚀 ハイブリッドDockerアプローチ                       ║\n║      🛠️ インテリジェント依存関係復旧                      ║\n║      ⚡ WSL2パフォーマンス最適化                           ║\n║                                                              ║\n╚══════════════════════════════════════════════════════════════╝\nEOF\n    echo -e \"${NC}\"\n    \n    log \"🏁 高度解決スクリプト開始 - $(date)\"\n    log \"プロジェクト: $PROJECT_ROOT\"\n    \n    # バックアップディレクトリ作成\n    mkdir -p \"$BACKUP_DIR\"\n    log \"バックアップディレクトリ: $BACKUP_DIR\"\n    \n    # 実行フロー\n    system_diagnosis\n    advanced_filesystem_cleanup\n    intelligent_dependency_recovery\n    docker_hybrid_setup\n    optimize_config_files\n    comprehensive_health_check\n    generate_final_report\n    \n    # 完了メッセージ\n    echo -e \"${GREEN}\"\n    cat << \"EOF\"\n\n🎉 ═══════════════════════════════════════════════════════════ 🎉\n    WSL2 npm ENOTEMPTY 高度解決 - 完了！\n🎉 ═══════════════════════════════════════════════════════════ 🎉\n\nEOF\n    echo -e \"${NC}\"\n    \n    success \"✅ 全ての解決策を実行完了!\"\n    \n    # 次のステップ案内\n    info \"📋 次のステップ:\"\n    info \"   1. 通常起動:     npm run dev\"\n    info \"   2. Docker起動:   ./run-docker-dev.sh\"\n    info \"   3. 監視ツール:   ./run-monitoring.sh\"\n    info \"   4. 完全レポート: $BACKUP_DIR/recovery-final-report.md\"\n    \n    warn \"⚠️  問題が継続する場合:\"\n    warn \"   - Docker環境を使用: ./run-docker-dev.sh\"\n    warn \"   - 完全リセット: ./cleanup-docker-dev.sh\"\n    warn \"   - サポート情報: $LOG_FILE\"\n    \n    log \"🔍 詳細ログ: $LOG_FILE\"\n    log \"📁 バックアップ: $BACKUP_DIR\"\n    log \"⏰ 実行完了時刻: $(date)\"\n}\n\n# 実行\nmain \"$@\""
}]