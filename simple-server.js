const http = require('http');
const fs = require('fs');
const path = require('path');

// シンプルなHTML内容
const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>暗号通貨AIプラットフォーム</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .animate-fadeIn { animation: fadeIn 0.8s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .7; } }
        .bg-gradient-text { background: linear-gradient(to right, #1f2937, #4b5563); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
</head>
<body class="min-h-screen bg-white">
    <!-- 環境変数警告 -->
    <div class="bg-yellow-50 border-b border-yellow-200 p-4">
        <div class="container mx-auto flex items-center gap-2 text-yellow-800">
            <span>⚠️</span>
            <p class="text-sm">
                開発環境で動作中です。完全な機能を利用するには適切な環境設定が必要です。
            </p>
        </div>
    </div>

    <!-- ヘッダー -->
    <header class="border-b sticky top-0 bg-white/95 backdrop-blur z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">✨</span>
                    <h1 class="text-xl md:text-2xl font-bold text-blue-600">暗号通貨AIプラットフォーム</h1>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-6">
                    <a href="#features" class="text-sm font-medium hover:text-blue-600 transition-colors">機能</a>
                    <a href="#pricing" class="text-sm font-medium hover:text-blue-600 transition-colors">料金</a>
                    <a href="#" class="text-sm font-medium hover:text-blue-600 transition-colors">学習</a>
                    <a href="#" class="text-sm font-medium hover:text-blue-600 transition-colors">価格予測</a>
                    <div class="flex gap-2">
                        <button class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">ログイン</button>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">無料で始める</button>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <!-- ヒーローセクション -->
    <section class="py-12 md:py-20 px-4 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 pointer-events-none"></div>
        <div class="container mx-auto max-w-4xl relative">
            <div class="animate-fadeIn">
                <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-text">
                    AIの力で暗号通貨取引を<br class="hidden md:block">次のレベルへ
                </h2>
            </div>
            <div class="animate-fadeIn">
                <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    最先端のAI技術と包括的な学習コンテンツで、暗号通貨投資を安全かつ効果的に始めましょう
                </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
                <button class="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors group">
                    無料で始める
                    <span class="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </button>
                <button class="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                    📚 学習を開始
                </button>
            </div>
            
            <!-- 信頼性指標 -->
            <div class="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                    <span class="text-blue-600">🛡️</span>
                    <span>エンタープライズセキュリティ</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-blue-600">🧠</span>
                    <span>GPT-4 & Claude搭載</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-blue-600">📈</span>
                    <span>リアルタイムデータ</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 機能紹介 -->
    <section id="features" class="py-16 md:py-20 px-4 bg-gray-50">
        <div class="container mx-auto">
            <div class="text-center mb-12">
                <h3 class="text-3xl md:text-4xl font-bold mb-4">強力な機能で投資をサポート</h3>
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">最新技術を活用した包括的なツールセット</p>
            </div>
            <div class="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                <!-- 機能カード1 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                        <span class="text-2xl">🧠</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">AIチャットアシスタント</h4>
                    <p class="text-gray-600 text-sm mb-2">24時間365日対応</p>
                    <p class="text-sm text-gray-700">
                        最新のAI技術があなたの投資戦略をサポート。市場分析から個別相談まで幅広く対応します。
                    </p>
                </div>

                <!-- 機能カード2 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="p-3 bg-green-100 rounded-lg w-fit mb-4">
                        <span class="text-2xl">📈</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">市場分析</h4>
                    <p class="text-gray-600 text-sm mb-2">リアルタイムの暗号通貨市場データ</p>
                    <p class="text-sm text-gray-700">
                        技術指標、センチメント分析、オンチェーンデータを統合した包括的な分析。
                    </p>
                </div>

                <!-- 機能カード3 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                        <span class="text-2xl">✨</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">ポートフォリオ最適化</h4>
                    <p class="text-gray-600 text-sm mb-2">材料科学アプローチ採用</p>
                    <p class="text-sm text-gray-700">
                        独自の相構造分析と量子ウォーク理論で、最適な資産配分を実現します。
                    </p>
                </div>

                <!-- 機能カード4 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="p-3 bg-red-100 rounded-lg w-fit mb-4">
                        <span class="text-2xl">🛡️</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">リスク管理</h4>
                    <p class="text-gray-600 text-sm mb-2">適応的リスク評価システム</p>
                    <p class="text-sm text-gray-700">
                        市場のボラティリティをリアルタイムで監視し、潜在的なリスクを事前に警告します。
                    </p>
                </div>

                <!-- 機能カード5 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-200 hover:shadow-md transition-shadow">
                    <div class="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                        <span class="text-2xl">📚</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">学習センター</h4>
                    <p class="text-gray-600 text-sm mb-2">85レッスンの体系的カリキュラム</p>
                    <ul class="text-sm space-y-2">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-600">🎯</span>
                            <span>投資基礎・金融リテラシー</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-600">🎯</span>
                            <span>投資詐欺の見抜き方</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-600">🎯</span>
                            <span>暗号通貨の仕組み</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-600">🎯</span>
                            <span>DeFi・NFT入門</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-600">🎯</span>
                            <span>高度なトレーディング戦略</span>
                        </li>
                    </ul>
                    <div class="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <span class="text-yellow-500">🏆</span>
                        <span>ゲーミフィケーション＆実績システム</span>
                    </div>
                </div>

                <!-- 機能カード6 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="p-3 bg-indigo-100 rounded-lg w-fit mb-4">
                        <span class="text-2xl">🔮</span>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">高度な価格予測</h4>
                    <p class="text-gray-600 text-sm mb-2">説明可能なAI技術</p>
                    <p class="text-sm text-gray-700">
                        AIの判断理由を視覚的に理解できる、信頼性の高い投資支援システム。
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- 料金プラン -->
    <section id="pricing" class="py-16 md:py-20 px-4">
        <div class="container mx-auto">
            <div class="text-center mb-12">
                <h3 class="text-3xl md:text-4xl font-bold mb-4">あなたに最適なプランを選択</h3>
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">無料プランから始めて、必要に応じてアップグレード</p>
            </div>
            <div class="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                <!-- Freeプラン -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="mb-4">
                        <h4 class="text-xl font-semibold">Free</h4>
                        <p class="text-gray-600">初心者向け</p>
                        <div class="text-3xl font-bold mt-4">¥0</div>
                    </div>
                    <ul class="space-y-2 text-sm">
                        <li>✓ AIチャット 5回/日</li>
                        <li>✓ 基本的な市場データ</li>
                        <li>✓ ポートフォリオ管理</li>
                        <li>✓ 85レッスンの学習コンテンツ</li>
                    </ul>
                </div>

                <!-- Basicプラン -->
                <div class="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-200 relative hover:shadow-xl transition-shadow">
                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        人気No.1
                    </div>
                    <div class="mb-4">
                        <h4 class="text-xl font-semibold">Basic</h4>
                        <p class="text-gray-600">積極的な投資家向け</p>
                        <div class="text-3xl font-bold mt-4">¥1,980/月</div>
                    </div>
                    <ul class="space-y-2 text-sm">
                        <li>✓ AIチャット 50回/日</li>
                        <li>✓ ポートフォリオ最適化</li>
                        <li>✓ 説明可能なAI</li>
                        <li>✓ 優先サポート</li>
                        <li>✓ データエクスポート</li>
                    </ul>
                </div>

                <!-- Proプラン -->
                <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div class="mb-4">
                        <h4 class="text-xl font-semibold">Pro</h4>
                        <p class="text-gray-600">プロフェッショナル向け</p>
                        <div class="text-3xl font-bold mt-4">¥9,800/月</div>
                    </div>
                    <ul class="space-y-2 text-sm">
                        <li>✓ AIチャット 無制限</li>
                        <li>✓ API アクセス</li>
                        <li>✓ カスタムAIモデル</li>
                        <li>✓ 優先サポート</li>
                        <li>✓ 全機能アクセス</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- フッター -->
    <footer class="border-t py-8 px-4 bg-white">
        <div class="container mx-auto text-center text-sm text-gray-600">
            <p>© 2024 暗号通貨AIプラットフォーム. All rights reserved.</p>
            <p class="mt-2 text-xs">🌐 <strong>ブラウザ表示テスト成功！</strong> - サーバー時刻: ${new Date().toLocaleString('ja-JP')}</p>
        </div>
    </footer>

    <script>
        // シンプルなJavaScript機能
        console.log('🎉 暗号通貨AIプラットフォーム - ブラウザ表示成功！');
        
        // モバイルメニューの実装
        const mobileMenuToggle = () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        };
        
        // スムーススクロール
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlContent);
});

const PORT = 3004;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 暗号通貨AIプラットフォーム サーバーが起動しました`);
  console.log(`📍 ローカル: http://localhost:${PORT}`);
  console.log(`🌐 ネットワーク: http://10.255.255.254:${PORT}`);
  console.log(`⏰ 起動時刻: ${new Date().toLocaleString('ja-JP')}`);
});

server.on('error', (err) => {
  console.error('❌ サーバーエラー:', err);
});