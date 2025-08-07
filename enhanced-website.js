const http = require('http');
const url = require('url');

// 超モダンなHTMLテンプレート
const getPage = (pageType, params = {}) => {
  const commonCSS = `
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
              'blob': 'blob 7s infinite',
              'float': 'float 6s ease-in-out infinite',
              'glow': 'glow 2s ease-in-out infinite alternate',
              'gradient': 'gradient 15s ease infinite',
              'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              'bounce-slow': 'bounce 3s infinite',
              'spin-slow': 'spin 8s linear infinite',
              'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
              blob: {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' },
              },
              float: {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-20px)' },
              },
              glow: {
                '0%': { boxShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6' },
                '100%': { boxShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6' },
              },
              gradient: {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
              },
              wiggle: {
                '0%, 100%': { transform: 'rotate(-3deg)' },
                '50%': { transform: 'rotate(3deg)' },
              },
            },
            backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
              'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            },
            backdropBlur: {
              xs: '2px',
            }
          }
        }
      }
    </script>
    <style>
      .glass-morphism {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #3b82f6;
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #2563eb;
      }
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      .neon-border {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      .pattern-bg {
        background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0);
        background-size: 40px 40px;
      }
    </style>
  `;

  const commonHeader = `
    <header class="fixed top-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <a href="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow"></div>
              <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-3 rounded-2xl">
                <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <h1 class="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              CryptoAI Platform
            </h1>
          </a>
          
          <nav class="hidden lg:flex items-center gap-8">
            <a href="#features" class="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">機能</a>
            <a href="/learning" class="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105">学習</a>
            <a href="/pricing" class="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105">料金</a>
            <a href="/dashboard" class="text-sm font-semibold text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-105">ダッシュボード</a>
            <div class="flex gap-3">
              <a href="/auth/login">
                <button class="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105">
                  ログイン
                </button>
              </a>
              <a href="/auth/register">
                <button class="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white text-sm font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 animate-glow">
                  無料で始める 🚀
                </button>
              </a>
            </div>
          </nav>
          
          <button id="mobile-menu-btn" class="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;

  const commonFooter = `
    <footer class="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 pattern-bg opacity-10"></div>
      <div class="container mx-auto px-6 py-16 relative">
        <div class="grid md:grid-cols-4 gap-8 mb-12">
          <div class="space-y-6">
            <div class="flex items-center space-x-3">
              <div class="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-xl">
                <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black">CryptoAI</h3>
            </div>
            <p class="text-gray-300 leading-relaxed">
              最先端のAI技術で、暗号通貨投資をより安全に、より効果的に。次世代の投資プラットフォーム。
            </p>
            <div class="flex space-x-4">
              <button class="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button class="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </button>
              <button class="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </button>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold text-lg mb-6 text-white">プロダクト</h4>
            <ul class="space-y-3">
              <li><a href="/ai/chat" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">🤖 AIチャット</a></li>
              <li><a href="/portfolio" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">📊 ポートフォリオ最適化</a></li>
              <li><a href="/market" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">📈 市場分析</a></li>
              <li><a href="/learning" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">🎓 学習センター</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-lg mb-6 text-white">サポート</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">❓ ヘルプセンター</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">📋 利用規約</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">🔒 プライバシーポリシー</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-300 block">📞 お問い合わせ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-lg mb-6 text-white">ニュースレター</h4>
            <p class="text-gray-300 mb-4">最新のアップデートとお得な情報をお届けします。</p>
            <form class="space-y-3">
              <input
                type="email"
                placeholder="メールアドレス"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button class="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                購読する ✨
              </button>
            </form>
          </div>
        </div>
        
        <div class="border-t border-white/20 pt-8 text-center">
          <p class="text-gray-300">© 2024 CryptoAI Platform. All rights reserved. Made with ❤️ in Japan</p>
        </div>
      </div>
    </footer>
  `;

  const pages = {
    home: `
      <!DOCTYPE html>
      <html lang="ja" class="scroll-smooth">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CryptoAI Platform - 次世代暗号通貨投資プラットフォーム</title>
        ${commonCSS}
      </head>
      <body class="font-sans antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
        ${commonHeader}
        
        <!-- ヒーローセクション -->
        <section class="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
          <!-- 背景アニメーション -->
          <div class="absolute inset-0 -z-10">
            <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div class="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="animation-delay: 2s;"></div>
            <div class="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="animation-delay: 4s;"></div>
          </div>

          <div class="container mx-auto max-w-7xl">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
              <!-- 左側コンテンツ -->
              <div class="space-y-8">
                <!-- トラストバッジ -->
                <div class="inline-flex items-center gap-3 glass-morphism rounded-full px-6 py-3 neon-border">
                  <div class="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
                    <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-sm font-bold text-gray-800">✨ エンタープライズセキュリティ認証済み</span>
                </div>

                <div class="space-y-6">
                  <h1 class="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                    <span class="block gradient-text animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-300% bg-clip-text text-transparent">
                      AI が導く、
                    </span>
                    <span class="block text-gray-900 mt-2">
                      次世代の
                    </span>
                    <span class="block gradient-text animate-gradient bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-300% bg-clip-text text-transparent">
                      暗号通貨投資 🚀
                    </span>
                  </h1>

                  <p class="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                    <span class="font-semibold text-blue-600">GPT-4</span>と<span class="font-semibold text-purple-600">Claude</span>を搭載した最先端AIが、
                    あなたの投資戦略を<span class="font-bold text-pink-600">24時間サポート</span>。
                    初心者から上級者まで、安全で効果的な暗号通貨投資を実現します。
                  </p>
                </div>

                <!-- CTA ボタン -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <a href="/auth/register">
                    <button class="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 flex items-center gap-3 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div class="relative flex items-center gap-3">
                        <svg class="h-6 w-6 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        無料で始める
                        <svg class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                      </div>
                    </button>
                  </a>
                  <a href="#demo">
                    <button class="group px-8 py-4 glass-morphism neon-border text-gray-800 text-lg font-bold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3">
                      <div class="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full group-hover:animate-bounce">
                        <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      デモを見る
                    </button>
                  </a>
                </div>

                <!-- ソーシャルプルーフ -->
                <div class="flex flex-wrap items-center gap-8 pt-6">
                  <div class="flex items-center gap-3">
                    <div class="flex -space-x-3">
                      ${[1,2,3,4,5].map(i => 
                        `<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 border-3 border-white animate-float" style="animation-delay: ${i*0.2}s;"></div>`
                      ).join('')}
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900">10,000+ アクティブユーザー</p>
                      <div class="flex items-center gap-1">
                        ${[1,2,3,4,5].map(() => 
                          `<svg class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
                        ).join('')}
                        <span class="text-sm text-gray-600 ml-2">4.9/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右側 - ダッシュボードプレビュー -->
              <div class="relative">
                <div class="relative glass-morphism rounded-3xl p-8 neon-border hover-lift">
                  <!-- ダッシュボード内容 -->
                  <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 space-y-6">
                    <div class="flex items-center justify-between">
                      <h3 class="text-xl font-bold text-gray-800">📊 ポートフォリオ概要</h3>
                      <div class="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-bold">+24.5%</span>
                      </div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover-lift">
                        <div class="flex items-center gap-4">
                          <div class="p-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full animate-pulse-slow">
                            <span class="text-white font-bold text-lg">₿</span>
                          </div>
                          <div>
                            <p class="font-bold text-gray-800">Bitcoin</p>
                            <p class="text-sm text-gray-600">2.45 BTC</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <p class="font-bold text-xl text-gray-800">¥15,234,500</p>
                          <p class="text-sm text-green-600 font-semibold">+5.2% 📈</p>
                        </div>
                      </div>
                      
                      <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover-lift">
                        <div class="flex items-center gap-4">
                          <div class="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse-slow" style="animation-delay: 1s;">
                            <span class="text-white font-bold text-lg">Ξ</span>
                          </div>
                          <div>
                            <p class="font-bold text-gray-800">Ethereum</p>
                            <p class="text-sm text-gray-600">15.8 ETH</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <p class="font-bold text-xl text-gray-800">¥4,567,890</p>
                          <p class="text-sm text-green-600 font-semibold">+8.7% 🚀</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <div class="flex items-center gap-3 mb-3">
                        <div class="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                          <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <span class="font-bold text-purple-800">🤖 AI推奨</span>
                      </div>
                      <p class="text-sm text-purple-700">
                        現在の市場状況では、DeFiトークンの追加投資を推奨します。リスク許容度に基づいて最適化されています。
                      </p>
                    </div>
                  </div>

                  <!-- フローティング要素 -->
                  <div class="absolute -top-4 -right-4 p-4 glass-morphism rounded-2xl neon-border animate-float">
                    <svg class="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <div class="absolute -bottom-4 -left-4 p-4 glass-morphism rounded-2xl neon-border animate-float" style="animation-delay: 1s;">
                    <svg class="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 信頼性指標セクション -->
        <section class="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div class="container mx-auto max-w-6xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div class="text-center group hover-lift">
                <div class="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  10K+
                </div>
                <p class="text-gray-700 font-semibold">アクティブユーザー</p>
              </div>
              <div class="text-center group hover-lift">
                <div class="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  ¥500M+
                </div>
                <p class="text-gray-700 font-semibold">運用資産総額</p>
              </div>
              <div class="text-center group hover-lift">
                <div class="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  99.9%
                </div>
                <p class="text-gray-700 font-semibold">稼働率</p>
              </div>
              <div class="text-center group hover-lift">
                <div class="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <p class="text-gray-700 font-semibold">AIサポート</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA セクション -->
        <section class="py-20 px-6 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
          <div class="absolute inset-0 pattern-bg opacity-20"></div>
          <div class="container mx-auto max-w-4xl text-center relative">
            <div class="space-y-8">
              <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                今すぐ始めて、<br>
                <span class="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                  投資を次のレベルへ 🚀
                </span>
              </h2>
              <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                10,000人以上のユーザーが既に利用中。<br>
                あなたも今すぐ参加しましょう。
              </p>
              <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/auth/register">
                  <button class="group px-10 py-5 bg-white text-blue-900 text-xl font-black rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 flex items-center gap-4 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="relative flex items-center gap-4">
                      <svg class="h-6 w-6 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      無料アカウント作成
                      <svg class="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </div>
                  </button>
                </a>
                <a href="/learning">
                  <button class="group px-10 py-5 glass-morphism border-2 border-white/30 text-white text-xl font-black rounded-2xl hover:bg-white hover:text-blue-900 transition-all duration-500 hover:scale-105 flex items-center gap-4">
                    <svg class="h-6 w-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    学習を始める
                  </button>
                </a>
              </div>
              
              <div class="flex items-center justify-center gap-8 pt-8 text-white/80">
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
                  <span class="text-sm font-semibold">SSL暗号化</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span class="text-sm font-semibold">個人情報保護</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span class="text-sm font-semibold">返金保証</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        ${commonFooter}

        <script>
          // モバイルメニュー
          document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            alert('モバイルメニューを実装予定です！');
          });

          // スムーススクロール
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            });
          });

          // パララックス効果
          window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.animate-blob');
            parallax.forEach(element => {
              const speed = 0.5;
              element.style.transform = \`translateY(\${scrolled * speed}px)\`;
            });
          });

          console.log('🎉 CryptoAI Platform - Ultra Modern Design Loaded!');
        </script>
      </body>
      </html>
    `,

    learning: `
      <!DOCTYPE html>
      <html lang="ja" class="scroll-smooth">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>学習センター - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="font-sans antialiased bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 min-h-screen">
        ${commonHeader}
        
        <!-- 学習ヒーローセクション -->
        <section class="relative pt-32 pb-20 px-6 overflow-hidden">
          <div class="absolute inset-0 -z-10">
            <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div class="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="animation-delay: 2s;"></div>
          </div>

          <div class="container mx-auto max-w-6xl">
            <div class="text-center space-y-8">
              <div class="inline-flex items-center gap-3 glass-morphism rounded-full px-6 py-3 neon-border">
                <div class="p-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse-slow">
                  <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <span class="text-sm font-bold text-gray-800">🎓 85レッスンの包括的カリキュラム</span>
              </div>

              <h1 class="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span class="block text-gray-900">暗号通貨投資を</span>
                <span class="block gradient-text animate-gradient bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-300% bg-clip-text text-transparent">
                  基礎から完全マスター 📚
                </span>
              </h1>

              <p class="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                投資未経験者から上級者まで、段階的に学習できる体系的なカリキュラム。
                <span class="font-bold text-emerald-600">AIアシスタント</span>があなたの学習をサポートします。
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="group px-8 py-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3">
                  <svg class="h-6 w-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                  </svg>
                  学習を開始
                </button>
                <button class="group px-8 py-4 glass-morphism neon-border text-gray-800 text-lg font-bold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3">
                  <svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  無料で体験
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 学習コース一覧 -->
        <section class="py-20 px-6">
          <div class="container mx-auto max-w-6xl">
            <div class="text-center mb-16">
              <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                選択式学習コース
              </h2>
              <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                あなたのレベルに合わせて最適な学習コースを選択できます
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- 初心者コース -->
              <div class="group glass-morphism rounded-3xl p-8 neon-border hover-lift cursor-pointer">
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div class="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl group-hover:animate-bounce">
                      <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                      </svg>
                    </div>
                    <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      初心者
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">投資基礎コース</h3>
                    <p class="text-gray-600 mb-4">
                      投資の基本概念から金融リテラシーまで、投資未経験者向けの基礎コース
                    </p>
                    <div class="flex items-center gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        2レッスン
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        4.8/5.0
                      </div>
                    </div>
                  </div>
                  
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                  </div>
                  
                  <button class="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    今すぐ開始 🚀
                  </button>
                </div>
              </div>

              <!-- 中級コース -->
              <div class="group glass-morphism rounded-3xl p-8 neon-border hover-lift cursor-pointer">
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div class="p-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl group-hover:animate-bounce">
                      <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                    <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      中級
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">暗号通貨＆取引</h3>
                    <p class="text-gray-600 mb-4">
                      暗号通貨の基本からトレーディング戦略まで、実践的な投資スキルを習得
                    </p>
                    <div class="flex items-center gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        32レッスン
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        4.9/5.0
                      </div>
                    </div>
                  </div>
                  
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                  </div>
                  
                  <button class="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    学習開始 📈
                  </button>
                </div>
              </div>

              <!-- 上級コース -->
              <div class="group glass-morphism rounded-3xl p-8 neon-border hover-lift cursor-pointer">
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div class="p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl group-hover:animate-bounce">
                      <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                      上級
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">DeFi＆高度戦略</h3>
                    <p class="text-gray-600 mb-4">
                      DeFi、NFT、高度なトレーディング戦略まで、プロレベルの投資技術を習得
                    </p>
                    <div class="flex items-center gap-4 text-sm text-gray-500">
                      <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        51レッスン
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        4.7/5.0
                      </div>
                    </div>
                  </div>
                  
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                  </div>
                  
                  <button class="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    チャレンジ 🔥
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        ${commonFooter}

        <script>
          console.log('📚 Learning Page - Ultra Modern Design Loaded!');
        </script>
      </body>
      </html>
    `,

    dashboard: `
      <!DOCTYPE html>
      <html lang="ja" class="scroll-smooth">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ダッシュボード - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="font-sans antialiased bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
        ${commonHeader}
        
        <!-- ダッシュボード メイン -->
        <main class="pt-24 pb-16 px-6">
          <div class="container mx-auto max-w-7xl">
            <!-- ウェルカムセクション -->
            <div class="mb-8">
              <div class="glass-morphism rounded-3xl p-8 neon-border">
                <div class="flex items-center justify-between">
                  <div>
                    <h1 class="text-4xl font-black text-gray-900 mb-2">
                      おかえりなさい！ 👋
                    </h1>
                    <p class="text-lg text-gray-600">
                      今日も素晴らしい投資の一日にしましょう。AIが最新の市場分析をお届けします。
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div class="p-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl animate-pulse-slow">
                      <svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 統計カード -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <!-- 総資産 -->
              <div class="group glass-morphism rounded-2xl p-6 neon-border hover-lift">
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl group-hover:animate-bounce">
                    <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500 font-semibold">総資産</p>
                    <p class="text-2xl font-black text-green-600">¥19,802,390</p>
                    <p class="text-xs text-green-600 font-semibold">+6.8% ↗️</p>
                  </div>
                </div>
              </div>

              <!-- 今日の損益 -->
              <div class="group glass-morphism rounded-2xl p-6 neon-border hover-lift">
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl group-hover:animate-bounce">
                    <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500 font-semibold">今日の損益</p>
                    <p class="text-2xl font-black text-blue-600">+¥145,678</p>
                    <p class="text-xs text-blue-600 font-semibold">+2.3% 📈</p>
                  </div>
                </div>
              </div>

              <!-- アクティブポジション -->
              <div class="group glass-morphism rounded-2xl p-6 neon-border hover-lift">
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl group-hover:animate-bounce">
                    <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500 font-semibold">アクティブポジション</p>
                    <p class="text-2xl font-black text-purple-600">7</p>
                    <p class="text-xs text-purple-600 font-semibold">3新規 💎</p>
                  </div>
                </div>
              </div>

              <!-- AIスコア -->
              <div class="group glass-morphism rounded-2xl p-6 neon-border hover-lift">
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl group-hover:animate-bounce">
                    <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500 font-semibold">AIスコア</p>
                    <p class="text-2xl font-black text-yellow-600">92/100</p>
                    <p class="text-xs text-yellow-600 font-semibold">優秀 ⭐</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- メインコンテンツグリッド -->
            <div class="grid lg:grid-cols-3 gap-8">
              <!-- 左側 - ポートフォリオ -->
              <div class="lg:col-span-2 space-y-8">
                <!-- ポートフォリオ概要 -->
                <div class="glass-morphism rounded-3xl p-8 neon-border">
                  <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                      ポートフォリオ
                    </h2>
                    <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                      最適化 ✨
                    </button>
                  </div>

                  <div class="space-y-4">
                    <!-- Bitcoin -->
                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover-lift">
                      <div class="flex items-center gap-4">
                        <div class="p-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full">
                          <span class="text-white font-bold text-lg">₿</span>
                        </div>
                        <div>
                          <p class="font-bold text-gray-800">Bitcoin</p>
                          <p class="text-sm text-gray-600">2.45 BTC</p>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="font-bold text-xl text-gray-800">¥15,234,500</p>
                        <p class="text-sm text-green-600 font-semibold">+5.2% 📈</p>
                        <div class="w-24 h-2 bg-orange-200 rounded-full mt-2">
                          <div class="bg-gradient-to-r from-orange-400 to-yellow-500 h-2 rounded-full" style="width: 65%"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Ethereum -->
                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover-lift">
                      <div class="flex items-center gap-4">
                        <div class="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
                          <span class="text-white font-bold text-lg">Ξ</span>
                        </div>
                        <div>
                          <p class="font-bold text-gray-800">Ethereum</p>
                          <p class="text-sm text-gray-600">15.8 ETH</p>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="font-bold text-xl text-gray-800">¥4,567,890</p>
                        <p class="text-sm text-green-600 font-semibold">+8.7% 🚀</p>
                        <div class="w-24 h-2 bg-blue-200 rounded-full mt-2">
                          <div class="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" style="width: 25%"></div>
                        </div>
                      </div>
                    </div>

                    <!-- その他 -->
                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover-lift">
                      <div class="flex items-center gap-4">
                        <div class="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
                          <span class="text-white font-bold text-lg">💎</span>
                        </div>
                        <div>
                          <p class="font-bold text-gray-800">その他アルトコイン</p>
                          <p class="text-sm text-gray-600">8銘柄</p>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="font-bold text-xl text-gray-800">¥2,450,000</p>
                        <p class="text-sm text-green-600 font-semibold">+12.1% 🌟</p>
                        <div class="w-24 h-2 bg-green-200 rounded-full mt-2">
                          <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style="width: 10%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 最新ニュース -->
                <div class="glass-morphism rounded-3xl p-8 neon-border">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <svg class="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
                    </svg>
                    マーケットニュース
                  </h2>
                  
                  <div class="space-y-4">
                    <div class="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 hover-lift cursor-pointer">
                      <div class="flex items-start gap-4">
                        <div class="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex-shrink-0">
                          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="font-bold text-gray-800 mb-2">🚀 ビットコイン、過去最高値を更新</h3>
                          <p class="text-sm text-gray-600 mb-2">
                            ビットコインが再び史上最高値を更新し、機関投資家の流入が続いています。
                          </p>
                          <span class="text-xs text-gray-500">2分前</span>
                        </div>
                      </div>
                    </div>

                    <div class="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover-lift cursor-pointer">
                      <div class="flex items-start gap-4">
                        <div class="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex-shrink-0">
                          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="font-bold text-gray-800 mb-2">✅ イーサリアム2.0アップデート完了</h3>
                          <p class="text-sm text-gray-600 mb-2">
                            待望のアップデートが完了し、取引速度とエネルギー効率が大幅に改善されました。
                          </p>
                          <span class="text-xs text-gray-500">15分前</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右側 - サイドバー -->
              <div class="space-y-8">
                <!-- AIアシスタント -->
                <div class="glass-morphism rounded-3xl p-6 neon-border">
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div class="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
                      <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                    🤖 AIアシスタント
                  </h3>
                  
                  <div class="space-y-4">
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <p class="text-sm text-purple-800 font-semibold mb-2">💡 今日の推奨</p>
                      <p class="text-sm text-gray-700">
                        DeFi市場が上昇トレンドに入っています。Uniswap (UNI) の追加投資を検討してください。
                      </p>
                    </div>
                    
                    <button class="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                      AIに相談する 💬
                    </button>
                  </div>
                </div>

                <!-- クイックアクション -->
                <div class="glass-morphism rounded-3xl p-6 neon-border">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">⚡ クイックアクション</h3>
                  
                  <div class="space-y-3">
                    <button class="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
                      </svg>
                      購入
                    </button>
                    
                    <button class="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"/>
                      </svg>
                      売却
                    </button>
                    
                    <button class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                      分析
                    </button>
                  </div>
                </div>

                <!-- 学習進捗 -->
                <div class="glass-morphism rounded-3xl p-6 neon-border">
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div class="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                      <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                      </svg>
                    </div>
                    📚 学習進捗
                  </h3>
                  
                  <div class="space-y-4">
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">暗号通貨基礎</span>
                        <span class="text-sm text-gray-500">85%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style="width: 85%"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">DeFi戦略</span>
                        <span class="text-sm text-gray-500">62%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" style="width: 62%"></div>
                      </div>
                    </div>
                    
                    <button class="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                      学習を続ける 🎓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        ${commonFooter}

        <script>
          console.log('📊 Dashboard - Ultra Modern Design Loaded!');
        </script>
      </body>
      </html>
    `,

    login: `
      <!DOCTYPE html>
      <html lang="ja" class="scroll-smooth">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ログイン - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="font-sans antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
        <!-- ログインページ -->
        <div class="min-h-screen flex items-center justify-center px-6 py-12">
          <!-- 背景アニメーション -->
          <div class="absolute inset-0 -z-10">
            <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div class="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="animation-delay: 2s;"></div>
          </div>

          <div class="w-full max-w-md">
            <!-- ロゴセクション -->
            <div class="text-center mb-8">
              <a href="/" class="inline-flex items-center space-x-3 group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow"></div>
                  <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl">
                    <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                </div>
                <h1 class="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  CryptoAI
                </h1>
              </a>
              <p class="mt-4 text-lg text-gray-600">おかえりなさい！ 👋</p>
            </div>

            <!-- ログインフォーム -->
            <div class="glass-morphism rounded-3xl p-8 neon-border">
              <form class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    📧 メールアドレス
                  </label>
                  <input
                    type="email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    🔒 パスワード
                  </label>
                  <input
                    type="password"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div class="flex items-center justify-between">
                  <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <span class="ml-2 text-sm text-gray-600">ログイン状態を保持</span>
                  </label>
                  <a href="#" class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    パスワードを忘れた方
                  </a>
                </div>

                <button
                  type="submit"
                  class="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden group"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span class="relative">ログイン 🚀</span>
                </button>
              </form>

              <!-- ソーシャルログイン -->
              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">または</span>
                  </div>
                </div>

                <div class="mt-6 space-y-3">
                  <button class="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 group">
                    <svg class="h-5 w-5 text-blue-600 group-hover:animate-bounce" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Googleでログイン
                  </button>
                  
                  <button class="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 group">
                    <svg class="h-5 w-5 text-gray-900 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
                    </svg>
                    MetaMaskでログイン
                  </button>
                </div>
              </div>

              <!-- 新規登録リンク -->
              <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                  アカウントをお持ちでない方
                  <a href="/auth/register" class="font-semibold text-blue-600 hover:text-blue-800 transition-colors ml-1">
                    新規登録 ✨
                  </a>
                </p>
              </div>
            </div>

            <!-- セキュリティ表示 -->
            <div class="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div class="flex items-center gap-1">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
                SSL暗号化
              </div>
              <div class="flex items-center gap-1">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                2FA対応
              </div>
            </div>
          </div>
        </div>

        <script>
          document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('デモ版のため、ダッシュボードページに移動します！');
            window.location.href = '/dashboard';
          });
          
          console.log('🔐 Login Page - Ultra Modern Design Loaded!');
        </script>
      </body>
      </html>
    `
  };

  return pages[pageType] || pages.home;
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // ルーティング
  let pageType = 'home';
  if (pathname === '/learning') pageType = 'learning';
  else if (pathname === '/dashboard') pageType = 'dashboard';
  else if (pathname === '/auth/login') pageType = 'login';

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(getPage(pageType));
});

const PORT = 3005;
server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Enhanced CryptoAI Platform が起動しました！');
  console.log(\`📍 ローカル: http://localhost:\${PORT}\`);
  console.log(\`🌐 ネットワーク: http://10.255.255.254:\${PORT}\`);
  console.log(\`⏰ 起動時刻: \${new Date().toLocaleString('ja-JP')}\`);
  console.log('');
  console.log('📱 利用可能なページ:');
  console.log('   🏠 ホーム: http://localhost:3005/');
  console.log('   📚 学習: http://localhost:3005/learning');
  console.log('   📊 ダッシュボード: http://localhost:3005/dashboard');
  console.log('   🔐 ログイン: http://localhost:3005/auth/login');
});

server.on('error', (err) => {
  console.error('❌ サーバーエラー:', err);
});