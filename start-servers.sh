#!/bin/bash

echo "🚀 暗号通貨AIプラットフォーム起動中..."
echo ""

# Kill existing processes
echo "既存のプロセスを終了中..."
pkill -f "node.*ultra-modern-website" 2>/dev/null
pkill -f "node.*simple-server" 2>/dev/null
sleep 2

# Start ultra-modern website
echo "✨ 超モダンWebサイトを起動中 (ポート 3006)..."
node ultra-modern-website.js &
ULTRA_PID=$!
sleep 2

# Check if servers are running
echo ""
echo "📋 サーバー状態確認:"
echo ""

if curl -s http://localhost:3006 > /dev/null; then
  echo "✅ 超モダンWebサイト: http://localhost:3006 - 正常稼働中"
else
  echo "❌ 超モダンWebサイト: 起動失敗"
fi

if curl -s http://localhost:3000 > /dev/null; then
  echo "✅ Next.jsアプリ: http://localhost:3000 - 正常稼働中"
else
  echo "⚠️  Next.jsアプリ: 未起動 (npm run dev で起動してください)"
fi

echo ""
echo "🌐 利用可能なページ:"
echo "   • ホーム: http://localhost:3006/"
echo "   • 学習センター: http://localhost:3006/learning"
echo "   • ダッシュボード: http://localhost:3006/dashboard"
echo "   • ログイン: http://localhost:3006/auth/login"
echo "   • 料金プラン: http://localhost:3006/pricing"
echo "   • 市場分析: http://localhost:3006/market"
echo ""
echo "💡 ブラウザで上記のURLにアクセスしてください"
echo ""
echo "停止するには: Ctrl+C または pkill -f ultra-modern-website"

# Keep script running
wait $ULTRA_PID