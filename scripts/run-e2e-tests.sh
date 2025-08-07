#!/bin/bash

# 🧪 E2Eテスト実行スクリプト
# 暗号通貨AIプラットフォーム - 包括的テスト実行

set -e

echo "🚀 Crypto AI Platform - E2Eテスト開始"
echo "======================================"

# 環境変数確認
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "⚠️  NEXT_PUBLIC_SUPABASE_URL が設定されていません"
    echo "テスト環境用のデフォルト値を使用します"
    export NEXT_PUBLIC_SUPABASE_URL="https://test.supabase.co"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されていません"
    export NEXT_PUBLIC_SUPABASE_ANON_KEY="test-anon-key"
fi

# テストモード設定
export NODE_ENV=test
export CI=${CI:-false}

echo ""
echo "📋 テスト環境情報:"
echo "NODE_ENV: $NODE_ENV"
echo "CI: $CI"
echo "Base URL: ${BASE_URL:-http://localhost:3002}"
echo ""

# 依存関係確認
echo "📦 依存関係確認中..."
if ! npm list @playwright/test >/dev/null 2>&1; then
    echo "❌ Playwright がインストールされていません"
    echo "インストール中..."
    npm install @playwright/test
fi

# Playwrightブラウザ確認・インストール
echo "🌐 Playwrightブラウザ確認中..."
if ! npx playwright --version >/dev/null 2>&1; then
    echo "❌ Playwright CLI が見つかりません"
    exit 1
fi

# ブラウザインストール
npx playwright install --with-deps

# プロジェクトビルド（CI環境の場合）
if [ "$CI" = "true" ]; then
    echo "🏗️  プロジェクトビルド中..."
    npm run build
fi

# テスト実行モード選択
TEST_MODE=${1:-"all"}

echo ""
echo "🧪 テスト実行モード: $TEST_MODE"
echo ""

case $TEST_MODE in
    "user-journey")
        echo "👤 ユーザージャーニーテスト実行中..."
        npx playwright test tests/e2e/user-journey.spec.ts --reporter=html
        ;;
    "critical")
        echo "🚨 重要機能テスト実行中..."
        npx playwright test tests/e2e/critical-functions.spec.ts --reporter=html
        ;;
    "performance")
        echo "⚡ パフォーマンステスト実行中..."
        npx playwright test tests/e2e/performance-ux.spec.ts --reporter=html
        ;;
    "smoke")
        echo "💨 スモークテスト実行中..."
        npx playwright test --grep="1\. 新規ユーザー登録フロー|価格アラートの作成から通知まで|ランディングページの初回読み込み" --reporter=html
        ;;
    "regression")
        echo "🔄 リグレッションテスト実行中..."
        npx playwright test --grep="@regression" --reporter=html
        ;;
    "mobile")
        echo "📱 モバイルテスト実行中..."
        npx playwright test --project=Mobile --reporter=html
        ;;
    "cross-browser")
        echo "🌍 クロスブラウザテスト実行中..."
        npx playwright test --project=chromium,firefox,webkit --reporter=html
        ;;
    "parallel")
        echo "⚡ 並列テスト実行中..."
        npx playwright test --workers=4 --reporter=html
        ;;
    "debug")
        echo "🐛 デバッグモードでテスト実行中..."
        npx playwright test --debug --headed
        ;;
    "headed")
        echo "👁️  ヘッドモードでテスト実行中..."
        npx playwright test --headed --reporter=html
        ;;
    "all"|*)
        echo "🎯 全E2Eテスト実行中..."
        npx playwright test --reporter=html,junit
        ;;
esac

TEST_EXIT_CODE=$?

echo ""
echo "📊 テスト結果:"
echo "=============="

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ すべてのテストが成功しました！"
    
    # テスト結果レポート表示
    if [ -f "playwright-report/index.html" ]; then
        echo ""
        echo "📄 HTMLレポート: playwright-report/index.html"
        echo "🌐 レポートを表示するには: npx playwright show-report"
    fi
    
    # JUnitレポート確認
    if [ -f "test-results/results.xml" ]; then
        echo "📋 JUnitレポート: test-results/results.xml"
    fi
    
    # スクリーンショット・動画確認
    if [ -d "test-results" ]; then
        SCREENSHOT_COUNT=$(find test-results -name "*.png" | wc -l)
        VIDEO_COUNT=$(find test-results -name "*.webm" | wc -l)
        
        if [ $SCREENSHOT_COUNT -gt 0 ]; then
            echo "📸 スクリーンショット: ${SCREENSHOT_COUNT}枚"
        fi
        
        if [ $VIDEO_COUNT -gt 0 ]; then
            echo "🎥 テスト動画: ${VIDEO_COUNT}個"
        fi
    fi
    
else
    echo "❌ テストが失敗しました (終了コード: $TEST_EXIT_CODE)"
    
    # 失敗時の詳細情報
    echo ""
    echo "🔍 トラブルシューティング:"
    echo "- playwright-report/index.html でエラー詳細を確認"
    echo "- test-results/ ディレクトリでスクリーンショット・動画を確認"
    echo "- ログ出力で具体的なエラーメッセージを確認"
    
    # よくある問題のヒント
    echo ""
    echo "💡 よくある問題:"
    echo "- アプリケーションサーバーが起動していない → npm run dev"
    echo "- 環境変数が設定されていない → .env.local を確認"
    echo "- データベースが初期化されていない → npm run db:migrate"
    echo "- ブラウザが古い → npx playwright install"
fi

echo ""
echo "🎯 テスト完了 - 終了コード: $TEST_EXIT_CODE"
echo "======================================"

# CI環境での成果物アップロード情報
if [ "$CI" = "true" ]; then
    echo ""
    echo "📤 CI環境: 以下を成果物として保存してください:"
    echo "- playwright-report/"
    echo "- test-results/"
    echo "- results.xml (存在する場合)"
fi

exit $TEST_EXIT_CODE