const http = require('http');
const url = require('url');

// 超モダンなHTMLテンプレート - 更なる進化版
const getPage = (pageType, params = {}) => {
  const commonCSS = `
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'sans': ['Inter', 'system-ui', 'sans-serif'],
              'mono': ['JetBrains Mono', 'monospace'],
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
              'slide-up': 'slideUp 0.5s ease-out',
              'slide-down': 'slideDown 0.5s ease-out',
              'zoom-in': 'zoomIn 0.3s ease-out',
              'matrix': 'matrix 20s linear infinite',
              'particle-float': 'particleFloat 3s ease-in-out infinite',
              'hologram': 'hologram 4s ease-in-out infinite',
              'cyber-glow': 'cyberGlow 3s ease-in-out infinite',
              'data-stream': 'dataStream 2s linear infinite',
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
              slideUp: {
                '0%': { transform: 'translateY(20px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
              },
              slideDown: {
                '0%': { transform: 'translateY(-20px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
              },
              zoomIn: {
                '0%': { transform: 'scale(0.9)', opacity: '0' },
                '100%': { transform: 'scale(1)', opacity: '1' },
              },
              matrix: {
                '0%': { transform: 'translateY(-100%)' },
                '100%': { transform: 'translateY(100vh)' },
              },
              particleFloat: {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-30px) rotate(180deg)' },
              },
              hologram: {
                '0%, 100%': { 
                  filter: 'hue-rotate(0deg) saturate(1)',
                  transform: 'skew(0deg, 0deg)'
                },
                '25%': { 
                  filter: 'hue-rotate(90deg) saturate(1.2)',
                  transform: 'skew(1deg, 0deg)'
                },
                '50%': { 
                  filter: 'hue-rotate(180deg) saturate(0.8)',
                  transform: 'skew(0deg, 1deg)'
                },
                '75%': { 
                  filter: 'hue-rotate(270deg) saturate(1.1)',
                  transform: 'skew(-1deg, 0deg)'
                },
              },
              cyberGlow: {
                '0%, 100%': { 
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                  borderColor: 'rgba(0, 255, 255, 0.3)'
                },
                '50%': { 
                  boxShadow: '0 0 40px rgba(255, 0, 255, 0.7), inset 0 0 30px rgba(255, 0, 255, 0.2)',
                  borderColor: 'rgba(255, 0, 255, 0.5)'
                },
              },
              dataStream: {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100vw)' },
              },
            },
            backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
              'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
              'neural-network': 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            },
            backdropBlur: {
              xs: '2px',
            },
            colors: {
              'neon-cyan': '#00ffff',
              'neon-magenta': '#ff00ff',
              'neon-green': '#00ff00',
              'cyber-blue': '#0066ff',
              'hologram': '#7c3aed',
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
      .glass-morphism-dark {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .neon-text {
        color: #00ffff;
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
      }
      .hologram-text {
        background: linear-gradient(45deg, #00ffff, #ff00ff, #00ff00, #ffff00);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient 3s ease infinite;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #1a1a2e;
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #ff00ff, #00ffff);
      }
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .hover-lift:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(59, 130, 246, 0.3);
      }
      .neon-border {
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        border: 1px solid rgba(0, 255, 255, 0.3);
      }
      .cyber-border {
        border: 2px solid transparent;
        background: linear-gradient(45deg, #00ffff, #ff00ff) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: exclude;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
      }
      .pattern-bg {
        background-image: 
          radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0);
        background-size: 20px 20px;
      }
      .neural-bg {
        background-image: 
          radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.2) 0%, transparent 50%);
      }
      .matrix-bg {
        background-color: #000;
        background-image: 
          linear-gradient(rgba(0, 255, 0, 0.03) 50%, transparent 50%),
          linear-gradient(90deg, rgba(0, 255, 0, 0.03) 50%, transparent 50%);
        background-size: 20px 20px;
      }
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #00ffff, transparent);
        border-radius: 50%;
        pointer-events: none;
      }
      .data-stream {
        position: absolute;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ffff, transparent);
        animation: dataStream 2s linear infinite;
      }
      @keyframes matrix-rain {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
      }
      .matrix-char {
        color: #00ff00;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        animation: matrix-rain 3s linear infinite;
        text-shadow: 0 0 10px #00ff00;
      }
      .cyber-grid {
        background-image: 
          linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px);
        background-size: 50px 50px;
      }
      .loading-dots::after {
        content: '';
        animation: dots 2s infinite;
      }
      @keyframes dots {
        0%, 20% { content: ''; }
        40% { content: '.'; }
        60% { content: '..'; }
        80%, 100% { content: '...'; }
      }
      .glow-effect {
        filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
      }
      .hologram-effect {
        position: relative;
        overflow: hidden;
      }
      .hologram-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: hologram-scan 3s ease-in-out infinite;
      }
      @keyframes hologram-scan {
        0% { left: -100%; }
        100% { left: 100%; }
      }
      .interactive-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      .interactive-card:hover {
        transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        box-shadow: 
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 40px rgba(59, 130, 246, 0.3),
          0 0 60px rgba(168, 85, 247, 0.2);
      }
      .aurora-bg {
        background: linear-gradient(45deg, 
          rgba(255, 0, 255, 0.1), 
          rgba(0, 255, 255, 0.1), 
          rgba(255, 255, 0, 0.1), 
          rgba(0, 255, 0, 0.1));
        background-size: 400% 400%;
        animation: aurora 8s ease infinite;
      }
      @keyframes aurora {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    </style>
  `;

  const pages = {
    home: `
      <!DOCTYPE html>
      <html lang="ja" class="scroll-smooth">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CryptoAI Platform - 次世代暗号通貨投資プラットフォーム</title>
        <meta name="description" content="AI駆動の暗号通貨投資教育プラットフォーム。85レッスンの包括的学習と高度な分析機能。">
        ${commonCSS}
      </head>
      <body class="bg-black text-white overflow-x-hidden custom-scrollbar">
        <!-- Matrix Background Effect -->
        <div class="fixed inset-0 matrix-bg opacity-30 pointer-events-none"></div>
        <div class="fixed inset-0 cyber-grid opacity-20 pointer-events-none"></div>
        
        <!-- Floating Particles -->
        <div id="particles-container" class="fixed inset-0 pointer-events-none z-0"></div>
        
        <!-- Data Streams -->
        <div class="fixed inset-0 pointer-events-none z-0">
          <div class="data-stream top-1/4 left-0 w-full opacity-30" style="animation-delay: 0s;"></div>
          <div class="data-stream top-1/2 left-0 w-full opacity-20" style="animation-delay: 1s;"></div>
          <div class="data-stream top-3/4 left-0 w-full opacity-25" style="animation-delay: 2s;"></div>
        </div>

        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 glass-morphism-dark border-b border-neon-cyan/20">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="text-2xl font-bold neon-text">
                CryptoAI
              </div>
              
              <div class="hidden md:flex space-x-8">
                <a href="#home" class="hover:text-neon-cyan transition-colors">ホーム</a>
                <a href="#features" class="hover:text-neon-cyan transition-colors">機能</a>
                <a href="#pricing" class="hover:text-neon-cyan transition-colors">料金</a>
                <a href="#contact" class="hover:text-neon-cyan transition-colors">お問い合わせ</a>
              </div>
              
              <div class="flex space-x-4">
                <a href="/auth/login" class="px-4 py-2 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all hover-lift">
                  ログイン
                </a>
                <a href="/auth/register" class="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all hover-lift">
                  無料で始める
                </a>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <!-- Aurora Background -->
          <div class="absolute inset-0 aurora-bg opacity-30"></div>
          
          <!-- 3D Floating Elements -->
          <div class="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-neon-cyan/30 to-neon-magenta/30 rounded-full blur-xl animate-float"></div>
          <div class="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-neon-magenta/20 to-neon-green/20 rounded-full blur-2xl animate-float" style="animation-delay: 2s;"></div>
          <div class="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-neon-green/40 to-cyber-blue/40 rounded-full blur-lg animate-pulse-slow"></div>
          
          <div class="container mx-auto px-6 text-center relative z-10">
            <div class="animate-slide-up">
              <h1 class="text-6xl md:text-8xl font-black mb-8">
                <span class="hologram-text">未来の投資は</span><br>
                <span class="neon-text">ここから始まる</span>
              </h1>
              
              <p class="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                AI駆動の暗号通貨投資教育プラットフォーム。85レッスンの包括的学習カリキュラムと
                <br class="hidden md:block">
                高度な市場分析で、あなたの投資スキルを次のレベルへ
              </p>
              
              <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                <button onclick="triggerConfetti()" class="group px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-neon-cyan/30 transition-all hover-lift cyber-border">
                  <span class="mr-2">🚀</span>
                  無料で学習開始
                  <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <button class="px-8 py-4 border border-neon-cyan/50 rounded-lg text-lg hover:bg-neon-cyan/10 transition-all hover-lift">
                  <span class="mr-2">🎬</span>
                  デモを見る
                </button>
              </div>
              
              <!-- Stats Counter -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
                  <div class="text-3xl font-bold neon-text" id="users-counter">0</div>
                  <div class="text-gray-400">アクティブユーザー</div>
                </div>
                <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
                  <div class="text-3xl font-bold neon-text">85</div>
                  <div class="text-gray-400">学習レッスン</div>
                </div>
                <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
                  <div class="text-3xl font-bold neon-text" id="success-counter">0</div>
                  <div class="text-gray-400">成功事例</div>
                </div>
                <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
                  <div class="text-3xl font-bold neon-text">24/7</div>
                  <div class="text-gray-400">AIサポート</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 relative">
          <div class="container mx-auto px-6">
            <div class="text-center mb-16">
              <h2 class="text-5xl font-bold mb-6 hologram-text">革新的機能</h2>
              <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                最先端のAI技術と包括的な学習システムで、暗号通貨投資の全てを習得
              </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
              <!-- AI Learning -->
              <div class="interactive-card glass-morphism-dark p-8 rounded-2xl hologram-effect">
                <div class="text-6xl mb-6 text-center animate-bounce-slow">🤖</div>
                <h3 class="text-2xl font-bold mb-4 neon-text">AI学習システム</h3>
                <p class="text-gray-300 mb-6">
                  あなたの学習進度に合わせてカスタマイズされる適応型AIカリキュラム。
                  個人の理解度を分析し、最適な学習パスを提案します。
                </p>
                <ul class="space-y-2 text-gray-400">
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>個別最適化学習</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>リアルタイム進捗追跡</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>AI質問応答</li>
                </ul>
              </div>
              
              <!-- Real-time Analysis -->
              <div class="interactive-card glass-morphism-dark p-8 rounded-2xl hologram-effect">
                <div class="text-6xl mb-6 text-center animate-pulse-slow">📊</div>
                <h3 class="text-2xl font-bold mb-4 neon-text">リアルタイム分析</h3>
                <p class="text-gray-300 mb-6">
                  高度なテクニカル分析とセンチメント分析で市場トレンドを予測。
                  機械学習アルゴリズムによる投資判断サポート。
                </p>
                <ul class="space-y-2 text-gray-400">
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>テクニカル指標分析</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>市場センチメント分析</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>リスク予測モデル</li>
                </ul>
              </div>
              
              <!-- Portfolio Management -->
              <div class="interactive-card glass-morphism-dark p-8 rounded-2xl hologram-effect">
                <div class="text-6xl mb-6 text-center animate-wiggle">💎</div>
                <h3 class="text-2xl font-bold mb-4 neon-text">ポートフォリオ最適化</h3>
                <p class="text-gray-300 mb-6">
                  モダンポートフォリオ理論とAIアルゴリズムを組み合わせた
                  次世代の資産配分最適化システム。
                </p>
                <ul class="space-y-2 text-gray-400">
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>自動リバランシング</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>リスク管理</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>パフォーマンス追跡</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Learning Path Section -->
        <section class="py-20 relative">
          <div class="container mx-auto px-6">
            <div class="text-center mb-16">
              <h2 class="text-5xl font-bold mb-6 hologram-text">学習の旅路</h2>
              <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                初心者から上級者まで、段階的にスキルアップできる85のレッスン
              </p>
            </div>
            
            <div class="grid md:grid-cols-5 gap-6">
              <!-- Step 1 -->
              <div class="text-center">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-cyan to-cyber-blue rounded-full flex items-center justify-center text-2xl hover-lift">
                  📚
                </div>
                <h3 class="text-lg font-semibold mb-2 neon-text">基礎知識</h3>
                <p class="text-sm text-gray-400">暗号通貨の基本概念とブロックチェーン技術</p>
              </div>
              
              <!-- Arrow -->
              <div class="hidden md:flex items-center justify-center">
                <div class="text-neon-cyan text-2xl animate-pulse">→</div>
              </div>
              
              <!-- Step 2 -->
              <div class="text-center">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyber-blue to-neon-magenta rounded-full flex items-center justify-center text-2xl hover-lift">
                  📈
                </div>
                <h3 class="text-lg font-semibold mb-2 neon-text">トレーディング</h3>
                <p class="text-sm text-gray-400">テクニカル分析と取引戦略の習得</p>
              </div>
              
              <!-- Arrow -->
              <div class="hidden md:flex items-center justify-center">
                <div class="text-neon-cyan text-2xl animate-pulse">→</div>
              </div>
              
              <!-- Step 3 -->
              <div class="text-center">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-magenta to-neon-green rounded-full flex items-center justify-center text-2xl hover-lift">
                  🚀
                </div>
                <h3 class="text-lg font-semibold mb-2 neon-text">上級戦略</h3>
                <p class="text-sm text-gray-400">DeFi、NFT、高度な投資戦略</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing Section -->
        <section id="pricing" class="py-20 relative">
          <div class="container mx-auto px-6">
            <div class="text-center mb-16">
              <h2 class="text-5xl font-bold mb-6 hologram-text">料金プラン</h2>
              <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                あなたのニーズに合わせた柔軟な料金設定
              </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <!-- Free Plan -->
              <div class="glass-morphism-dark p-8 rounded-2xl border border-gray-600 hover-lift">
                <div class="text-center mb-8">
                  <h3 class="text-2xl font-bold mb-2">無料プラン</h3>
                  <div class="text-4xl font-bold neon-text mb-4">¥0</div>
                  <p class="text-gray-400">基本的な学習機能</p>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>85レッスンアクセス</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>基本的な市場データ</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>AIチャット（月5回）</li>
                  <li class="flex items-center text-gray-500"><span class="mr-2">✗</span>高度な分析機能</li>
                </ul>
                <button class="w-full py-3 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                  今すぐ始める
                </button>
              </div>
              
              <!-- Pro Plan -->
              <div class="glass-morphism-dark p-8 rounded-2xl border-2 border-neon-cyan cyber-glow transform scale-105 hover-lift">
                <div class="text-center mb-8">
                  <div class="inline-block px-3 py-1 bg-neon-cyan text-black rounded-full text-sm font-semibold mb-4">
                    最人気
                  </div>
                  <h3 class="text-2xl font-bold mb-2">プロプラン</h3>
                  <div class="text-4xl font-bold neon-text mb-4">¥2,980</div>
                  <p class="text-gray-400">月額・全機能利用可能</p>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>全ての学習コンテンツ</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>リアルタイム市場分析</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>無制限AIチャット</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>ポートフォリオ最適化</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>アラート機能</li>
                </ul>
                <button class="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-cyan/50 transition-all">
                  プロにアップグレード
                </button>
              </div>
              
              <!-- Enterprise Plan -->
              <div class="glass-morphism-dark p-8 rounded-2xl border border-gray-600 hover-lift">
                <div class="text-center mb-8">
                  <h3 class="text-2xl font-bold mb-2">エンタープライズ</h3>
                  <div class="text-4xl font-bold neon-text mb-4">カスタム</div>
                  <p class="text-gray-400">大規模組織向け</p>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>全てのプロ機能</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>専用サポート</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>カスタムAPI</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>チーム管理機能</li>
                  <li class="flex items-center"><span class="text-neon-green mr-2">✓</span>オンサイト研修</li>
                </ul>
                <button class="w-full py-3 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                  お問い合わせ
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="py-16 border-t border-gray-800">
          <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div class="text-2xl font-bold neon-text mb-4">CryptoAI</div>
                <p class="text-gray-400 mb-4">
                  次世代の暗号通貨投資教育プラットフォーム
                </p>
                <div class="flex space-x-4">
                  <a href="#" class="text-gray-400 hover:text-neon-cyan transition-colors">📱</a>
                  <a href="#" class="text-gray-400 hover:text-neon-cyan transition-colors">🐦</a>
                  <a href="#" class="text-gray-400 hover:text-neon-cyan transition-colors">📧</a>
                </div>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold mb-4 neon-text">プロダクト</h4>
                <ul class="space-y-2 text-gray-400">
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">学習コンテンツ</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">市場分析</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">ポートフォリオ管理</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold mb-4 neon-text">サポート</h4>
                <ul class="space-y-2 text-gray-400">
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">ヘルプセンター</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">チュートリアル</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">コミュニティ</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">お問い合わせ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold mb-4 neon-text">会社情報</h4>
                <ul class="space-y-2 text-gray-400">
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">会社概要</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">採用情報</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">プライバシーポリシー</a></li>
                  <li><a href="#" class="hover:text-neon-cyan transition-colors">利用規約</a></li>
                </ul>
              </div>
            </div>
            
            <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2024 CryptoAI Platform. All rights reserved. Powered by cutting-edge AI technology.</p>
            </div>
          </div>
        </footer>

        <script>
          // Particle System
          function createParticles() {
            const container = document.getElementById('particles-container');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div');
              particle.className = 'particle';
              particle.style.left = Math.random() * 100 + '%';
              particle.style.top = Math.random() * 100 + '%';
              particle.style.animationDelay = Math.random() * 3 + 's';
              particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
              container.appendChild(particle);
            }
          }

          // Counter Animation
          function animateCounter(id, target, duration = 2000) {
            const element = document.getElementById(id);
            if (!element) return;
            
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
              } else {
                element.textContent = Math.floor(start).toLocaleString();
              }
            }, 16);
          }

          // Confetti Effect
          function triggerConfetti() {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00']
            });
          }

          // Smooth Scrolling
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

          // Initialize
          document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            
            // Animate counters when they come into view
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  animateCounter('users-counter', 12500);
                  animateCounter('success-counter', 98);
                  observer.unobserve(entry.target);
                }
              });
            });
            
            const statsSection = document.querySelector('#users-counter').closest('.grid');
            if (statsSection) {
              observer.observe(statsSection);
            }
          });

          // Dynamic Background Effects
          setInterval(() => {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
              if (Math.random() < 0.1) {
                particle.style.background = \`radial-gradient(circle, \${['#00ffff', '#ff00ff', '#00ff00'][Math.floor(Math.random() * 3)]}, transparent)\`;
              }
            });
          }, 2000);
        </script>
      </body>
      </html>
    `,

    learning: `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>学習センター - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="bg-black text-white min-h-screen custom-scrollbar">
        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 glass-morphism-dark border-b border-neon-cyan/20">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="text-2xl font-bold neon-text">CryptoAI</a>
              <div class="flex space-x-6">
                <a href="/" class="hover:text-neon-cyan transition-colors">ホーム</a>
                <a href="/dashboard" class="hover:text-neon-cyan transition-colors">ダッシュボード</a>
                <a href="/learning" class="text-neon-cyan">学習</a>
              </div>
            </div>
          </div>
        </nav>

        <div class="pt-20 container mx-auto px-6 py-8">
          <!-- Header -->
          <div class="text-center mb-12">
            <h1 class="text-5xl font-bold mb-6 hologram-text">学習センター</h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              85の包括的レッスンで暗号通貨投資をマスター
            </p>
          </div>

          <!-- Progress Overview -->
          <div class="grid md:grid-cols-4 gap-6 mb-12">
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">📚</div>
                <div class="text-2xl font-bold neon-text">12/85</div>
              </div>
              <h3 class="font-semibold mb-2">完了レッスン</h3>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-neon-cyan h-2 rounded-full" style="width: 14%"></div>
              </div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">⏱️</div>
                <div class="text-2xl font-bold neon-text">24h</div>
              </div>
              <h3 class="font-semibold mb-2">学習時間</h3>
              <p class="text-gray-400 text-sm">今月の総学習時間</p>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">🔥</div>
                <div class="text-2xl font-bold neon-text">7日</div>
              </div>
              <h3 class="font-semibold mb-2">連続学習</h3>
              <p class="text-gray-400 text-sm">継続は力なり</p>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">🏆</div>
                <div class="text-2xl font-bold neon-text">5</div>
              </div>
              <h3 class="font-semibold mb-2">獲得バッジ</h3>
              <p class="text-gray-400 text-sm">実績アンロック</p>
            </div>
          </div>

          <!-- Learning Categories -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold mb-8 neon-text">学習カテゴリー</h2>
            <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              <!-- Category 1 -->
              <div class="glass-morphism-dark p-6 rounded-xl text-center hover-lift interactive-card">
                <div class="text-4xl mb-4">💰</div>
                <h3 class="font-semibold mb-2">投資基礎</h3>
                <p class="text-gray-400 text-sm mb-4">金融の基本知識</p>
                <div class="text-neon-cyan text-sm">2/2レッスン完了</div>
              </div>
              
              <!-- Category 2 -->
              <div class="glass-morphism-dark p-6 rounded-xl text-center hover-lift interactive-card">
                <div class="text-4xl mb-4">₿</div>
                <h3 class="font-semibold mb-2">暗号通貨基礎</h3>
                <p class="text-gray-400 text-sm mb-4">ブロックチェーンの基本</p>
                <div class="text-neon-cyan text-sm">8/12レッスン完了</div>
              </div>
              
              <!-- Category 3 -->
              <div class="glass-morphism-dark p-6 rounded-xl text-center hover-lift interactive-card">
                <div class="text-4xl mb-4">📈</div>
                <h3 class="font-semibold mb-2">トレーディング</h3>
                <p class="text-gray-400 text-sm mb-4">取引戦略とテクニカル分析</p>
                <div class="text-yellow-400 text-sm">2/20レッスン完了</div>
              </div>
              
              <!-- Category 4 -->
              <div class="glass-morphism-dark p-6 rounded-xl text-center hover-lift interactive-card">
                <div class="text-4xl mb-4">🏦</div>
                <h3 class="font-semibold mb-2">DeFi・NFT</h3>
                <p class="text-gray-400 text-sm mb-4">分散型金融とデジタル資産</p>
                <div class="text-gray-500 text-sm">0/17レッスン</div>
              </div>
              
              <!-- Category 5 -->
              <div class="glass-morphism-dark p-6 rounded-xl text-center hover-lift interactive-card">
                <div class="text-4xl mb-4">🚀</div>
                <h3 class="font-semibold mb-2">高度な投資戦略</h3>
                <p class="text-gray-400 text-sm mb-4">上級者向けテクニック</p>
                <div class="text-gray-500 text-sm">0/34レッスン</div>
              </div>
            </div>
          </div>

          <!-- Current Lessons -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold mb-8 neon-text">推奨レッスン</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Lesson 1 -->
              <div class="glass-morphism-dark p-6 rounded-xl hover-lift interactive-card">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-neon-cyan to-cyber-blue rounded-full flex items-center justify-center mr-4">
                    📊
                  </div>
                  <div>
                    <h3 class="font-semibold">テクニカル分析入門</h3>
                    <p class="text-gray-400 text-sm">30分 • 中級</p>
                  </div>
                </div>
                <p class="text-gray-300 mb-4 text-sm">
                  チャートパターンと指標の読み方を学び、市場トレンドを予測する力を身につけましょう。
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400 text-sm">進行中</span>
                  <button class="px-4 py-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-cyan/80 transition-all">
                    続きから学習
                  </button>
                </div>
              </div>
              
              <!-- Lesson 2 -->
              <div class="glass-morphism-dark p-6 rounded-xl hover-lift interactive-card">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-neon-magenta to-neon-green rounded-full flex items-center justify-center mr-4">
                    🔐
                  </div>
                  <div>
                    <h3 class="font-semibold">ウォレットセキュリティ</h3>
                    <p class="text-gray-400 text-sm">25分 • 初級</p>
                  </div>
                </div>
                <p class="text-gray-300 mb-4 text-sm">
                  暗号通貨の安全な保管方法と、秘密鍵の管理について詳しく解説します。
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400 text-sm">未開始</span>
                  <button class="px-4 py-2 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                    学習開始
                  </button>
                </div>
              </div>
              
              <!-- Lesson 3 -->
              <div class="glass-morphism-dark p-6 rounded-xl hover-lift interactive-card">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-neon-green to-yellow-400 rounded-full flex items-center justify-center mr-4">
                    💎
                  </div>
                  <div>
                    <h3 class="font-semibold">ポートフォリオ理論</h3>
                    <p class="text-gray-400 text-sm">40分 • 上級</p>
                  </div>
                </div>
                <p class="text-gray-300 mb-4 text-sm">
                  リスク分散と資産配分の最適化について、現代ポートフォリオ理論を基に学習します。
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400 text-sm">ロック中</span>
                  <button class="px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed">
                    前提条件未達成
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Learning Streak -->
          <div class="glass-morphism-dark p-8 rounded-xl text-center">
            <h2 class="text-3xl font-bold mb-4 neon-text">学習ストリーク 🔥</h2>
            <p class="text-gray-300 mb-6">7日連続で学習中！素晴らしいです！</p>
            <div class="flex justify-center space-x-2 mb-6">
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-sm">✓</div>
              <div class="w-8 h-8 border-2 border-neon-cyan/50 rounded-full flex items-center justify-center text-sm text-gray-400">?</div>
            </div>
            <p class="text-gray-400">明日も学習を続けて、8日連続を達成しましょう！</p>
          </div>
        </div>
      </body>
      </html>
    `,

    dashboard: `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ダッシュボード - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="bg-black text-white min-h-screen custom-scrollbar">
        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 glass-morphism-dark border-b border-neon-cyan/20">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="text-2xl font-bold neon-text">CryptoAI</a>
              <div class="flex space-x-6">
                <a href="/" class="hover:text-neon-cyan transition-colors">ホーム</a>
                <a href="/dashboard" class="text-neon-cyan">ダッシュボード</a>
                <a href="/learning" class="hover:text-neon-cyan transition-colors">学習</a>
              </div>
            </div>
          </div>
        </nav>

        <div class="pt-20 container mx-auto px-6 py-8">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-4xl font-bold neon-text">ダッシュボード</h1>
              <p class="text-gray-400 mt-2">リアルタイム市場分析とポートフォリオ管理</p>
            </div>
            <div class="flex space-x-4">
              <button class="px-4 py-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-cyan/80 transition-all">
                ポートフォリオ追加
              </button>
              <button class="px-4 py-2 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                設定
              </button>
            </div>
          </div>

          <!-- Portfolio Summary -->
          <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">💰</div>
                <div class="text-green-400 text-sm">+12.5%</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">総資産価値</h3>
              <div class="text-2xl font-bold neon-text">¥1,234,567</div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">📈</div>
                <div class="text-green-400 text-sm">+8.2%</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">今日の損益</h3>
              <div class="text-2xl font-bold text-green-400">+¥89,123</div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">🎯</div>
                <div class="text-blue-400 text-sm">最適化済み</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">リスクスコア</h3>
              <div class="text-2xl font-bold text-blue-400">6.2/10</div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">🔥</div>
                <div class="text-yellow-400 text-sm">アクティブ</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">アラート</h3>
              <div class="text-2xl font-bold text-yellow-400">3</div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-3 gap-8 mb-8">
            <!-- Portfolio Chart -->
            <div class="lg:col-span-2 glass-morphism-dark p-6 rounded-xl">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold neon-text">ポートフォリオパフォーマンス</h2>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 bg-neon-cyan text-black rounded text-sm">1D</button>
                  <button class="px-3 py-1 text-gray-400 hover:text-white text-sm">1W</button>
                  <button class="px-3 py-1 text-gray-400 hover:text-white text-sm">1M</button>
                  <button class="px-3 py-1 text-gray-400 hover:text-white text-sm">1Y</button>
                </div>
              </div>
              
              <!-- Simulated Chart -->
              <div class="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden">
                <div class="absolute inset-0 flex items-end justify-between px-4 pb-4">
                  ${Array.from({length: 20}, (_, i) => `
                    <div class="w-2 bg-gradient-to-t from-neon-cyan to-neon-magenta rounded-t" 
                         style="height: ${20 + Math.random() * 60}%"></div>
                  `).join('')}
                </div>
                <div class="absolute top-4 left-4 text-green-400 font-bold">
                  +12.5% (¥89,123)
                </div>
              </div>
            </div>
            
            <!-- Holdings -->
            <div class="glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">保有銘柄</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">₿</div>
                    <div class="ml-3">
                      <div class="font-semibold">Bitcoin</div>
                      <div class="text-gray-400 text-sm">0.5 BTC</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold text-green-400">+5.2%</div>
                    <div class="text-gray-400 text-sm">¥543,210</div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">Ξ</div>
                    <div class="ml-3">
                      <div class="font-semibold">Ethereum</div>
                      <div class="text-gray-400 text-sm">3.2 ETH</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold text-green-400">+8.7%</div>
                    <div class="text-gray-400 text-sm">¥321,098</div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">◎</div>
                    <div class="ml-3">
                      <div class="font-semibold">Solana</div>
                      <div class="text-gray-400 text-sm">50 SOL</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold text-red-400">-2.1%</div>
                    <div class="text-gray-400 text-sm">¥156,789</div>
                  </div>
                </div>
              </div>
              
              <button class="w-full mt-6 py-2 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                すべて表示
              </button>
            </div>
          </div>

          <!-- Market Analysis & AI Insights -->
          <div class="grid lg:grid-cols-2 gap-8 mb-8">
            <!-- Market Analysis -->
            <div class="glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">市場分析</h2>
              
              <div class="space-y-4">
                <div class="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-green-400">強気シグナル</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    ビットコインの日足でゴールデンクロスが発生。上昇トレンドが継続する可能性が高い。
                  </p>
                </div>
                
                <div class="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-yellow-400">注意喚起</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    アルトコイン市場でボラティリティが上昇。リスク管理の強化を推奨。
                  </p>
                </div>
                
                <div class="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-blue-400">DeFi情報</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    主要DeFiプロトコルでイールドファーミング報酬が増加傾向。
                  </p>
                </div>
              </div>
            </div>
            
            <!-- AI Insights -->
            <div class="glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">AI推奨アクション</h2>
              
              <div class="space-y-4">
                <div class="p-4 border border-neon-cyan/30 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold">ポートフォリオリバランス</span>
                    <span class="text-neon-cyan text-sm">推奨度: 高</span>
                  </div>
                  <p class="text-sm text-gray-300 mb-3">
                    現在のBTC比率が目標を上回っています。利益確定を検討してください。
                  </p>
                  <button class="px-4 py-2 bg-neon-cyan text-black rounded text-sm hover:bg-neon-cyan/80 transition-all">
                    詳細を見る
                  </button>
                </div>
                
                <div class="p-4 border border-neon-magenta/30 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold">新規投資機会</span>
                    <span class="text-neon-magenta text-sm">推奨度: 中</span>
                  </div>
                  <p class="text-sm text-gray-300 mb-3">
                    Layer 2ソリューションで成長性の高い銘柄を発見しました。
                  </p>
                  <button class="px-4 py-2 border border-neon-magenta/50 rounded text-sm hover:bg-neon-magenta/10 transition-all">
                    分析レポート
                  </button>
                </div>
                
                <div class="p-4 border border-neon-green/30 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold">リスク軽減策</span>
                    <span class="text-neon-green text-sm">推奨度: 高</span>
                  </div>
                  <p class="text-sm text-gray-300 mb-3">
                    ストップロス設定でダウンサイドリスクを限定できます。
                  </p>
                  <button class="px-4 py-2 bg-neon-green text-black rounded text-sm hover:bg-neon-green/80 transition-all">
                    設定する
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="glass-morphism-dark p-6 rounded-xl">
            <h2 class="text-xl font-bold neon-text mb-6">クイックアクション</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button class="p-4 border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/10 transition-all text-center">
                <div class="text-2xl mb-2">📊</div>
                <div class="text-sm">市場分析</div>
              </button>
              
              <button class="p-4 border border-neon-magenta/30 rounded-lg hover:bg-neon-magenta/10 transition-all text-center">
                <div class="text-2xl mb-2">🤖</div>
                <div class="text-sm">AI相談</div>
              </button>
              
              <button class="p-4 border border-neon-green/30 rounded-lg hover:bg-neon-green/10 transition-all text-center">
                <div class="text-2xl mb-2">⚙️</div>
                <div class="text-sm">最適化</div>
              </button>
              
              <button class="p-4 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/10 transition-all text-center">
                <div class="text-2xl mb-2">📈</div>
                <div class="text-sm">レポート</div>
              </button>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,

    login: `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ログイン - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="bg-black text-white min-h-screen flex items-center justify-center custom-scrollbar">
        <!-- Background Effects -->
        <div class="fixed inset-0 matrix-bg opacity-20 pointer-events-none"></div>
        <div class="fixed inset-0 cyber-grid opacity-10 pointer-events-none"></div>
        
        <!-- Floating Particles -->
        <div class="fixed inset-0 pointer-events-none">
          ${Array.from({length: 20}, (_, i) => `
            <div class="particle" 
                 style="left: ${Math.random() * 100}%; 
                        top: ${Math.random() * 100}%; 
                        animation-delay: ${Math.random() * 3}s;
                        animation-duration: ${3 + Math.random() * 2}s;"></div>
          `).join('')}
        </div>

        <div class="relative z-10 w-full max-w-md mx-auto px-6">
          <!-- Back to Home -->
          <div class="text-center mb-8">
            <a href="/" class="text-2xl font-bold neon-text hover:text-neon-cyan transition-colors">
              CryptoAI Platform
            </a>
          </div>

          <!-- Login Form -->
          <div class="glass-morphism-dark p-8 rounded-2xl cyber-border">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold mb-2 hologram-text">ログイン</h1>
              <p class="text-gray-400">次世代の投資プラットフォームへようこそ</p>
            </div>

            <form class="space-y-6">
              <div>
                <label class="block text-sm font-medium mb-2 neon-text">メールアドレス</label>
                <input 
                  type="email" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-neon-cyan/30 rounded-lg text-white placeholder-gray-400 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  placeholder="user@example.com"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2 neon-text">パスワード</label>
                <input 
                  type="password" 
                  class="w-full px-4 py-3 bg-gray-900/50 border border-neon-cyan/30 rounded-lg text-white placeholder-gray-400 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  placeholder="••••••••"
                  required
                >
              </div>
              
              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-neon-cyan/30 text-neon-cyan focus:ring-neon-cyan/20">
                  <span class="ml-2 text-sm text-gray-400">ログイン状態を保持</span>
                </label>
                <a href="#" class="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors">
                  パスワードを忘れた方
                </a>
              </div>
              
              <button 
                type="submit" 
                class="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-cyan/30 transition-all hover-lift"
              >
                ログイン
              </button>
            </form>

            <!-- Social Login -->
            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-600"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-black text-gray-400">または</span>
                </div>
              </div>
              
              <div class="mt-6 grid grid-cols-2 gap-3">
                <button class="flex justify-center items-center px-4 py-3 border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/10 transition-all">
                  <span class="text-xl mr-2">🔗</span>
                  <span class="text-sm">Google</span>
                </button>
                <button class="flex justify-center items-center px-4 py-3 border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/10 transition-all">
                  <span class="text-xl mr-2">👤</span>
                  <span class="text-sm">Twitter</span>
                </button>
              </div>
            </div>

            <!-- Register Link -->
            <div class="mt-8 text-center">
              <p class="text-gray-400">
                アカウントをお持ちでない方は
                <a href="/auth/register" class="text-neon-cyan hover:text-neon-cyan/80 transition-colors">
                  新規登録
                </a>
              </p>
            </div>
          </div>

          <!-- Features Preview -->
          <div class="mt-12 text-center">
            <h3 class="text-lg font-semibold mb-4 neon-text">ログイン後の特典</h3>
            <div class="grid grid-cols-3 gap-4 text-sm">
              <div class="glass-morphism-dark p-3 rounded-lg">
                <div class="text-2xl mb-2">🎓</div>
                <div class="text-gray-300">85レッスン</div>
              </div>
              <div class="glass-morphism-dark p-3 rounded-lg">
                <div class="text-2xl mb-2">🤖</div>
                <div class="text-gray-300">AI分析</div>
              </div>
              <div class="glass-morphism-dark p-3 rounded-lg">
                <div class="text-2xl mb-2">📊</div>
                <div class="text-gray-300">リアルタイム</div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,

    pricing: `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>料金プラン - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="bg-black text-white min-h-screen custom-scrollbar">
        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 glass-morphism-dark border-b border-neon-cyan/20">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="text-2xl font-bold neon-text">CryptoAI</a>
              <div class="flex space-x-6">
                <a href="/" class="hover:text-neon-cyan transition-colors">ホーム</a>
                <a href="/pricing" class="text-neon-cyan">料金</a>
                <a href="#contact" class="hover:text-neon-cyan transition-colors">お問い合わせ</a>
              </div>
            </div>
          </div>
        </nav>

        <div class="pt-32 container mx-auto px-6 py-8">
          <!-- Header -->
          <div class="text-center mb-16">
            <h1 class="text-5xl font-bold mb-6 hologram-text">料金プラン</h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              あなたの投資目標に最適なプランを選択してください
            </p>
          </div>

          <!-- Pricing Cards -->
          <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <!-- Free Plan -->
            <div class="glass-morphism-dark p-8 rounded-2xl border border-gray-600 hover-lift">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold mb-4">フリープラン</h3>
                <div class="text-5xl font-bold neon-text mb-4">¥0</div>
                <p class="text-gray-400">基本的な学習機能</p>
              </div>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  85レッスンアクセス
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  基本的な市場データ
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  AIチャット（月5回）
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  学習進捗追跡
                </li>
                <li class="flex items-center text-gray-500">
                  <span class="mr-3">✗</span>
                  高度な分析機能
                </li>
                <li class="flex items-center text-gray-500">
                  <span class="mr-3">✗</span>
                  ポートフォリオ最適化
                </li>
              </ul>
              
              <button class="w-full py-3 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                今すぐ始める
              </button>
            </div>
            
            <!-- Pro Plan -->
            <div class="glass-morphism-dark p-8 rounded-2xl border-2 border-neon-cyan cyber-glow transform scale-105 hover-lift">
              <div class="text-center mb-8">
                <div class="inline-block px-4 py-2 bg-neon-cyan text-black rounded-full text-sm font-semibold mb-4">
                  最人気プラン
                </div>
                <h3 class="text-2xl font-bold mb-4">プロプラン</h3>
                <div class="text-5xl font-bold neon-text mb-4">¥2,980</div>
                <p class="text-gray-400">月額・全機能利用可能</p>
              </div>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  全ての学習コンテンツ
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  リアルタイム市場分析
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  無制限AIチャット
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  ポートフォリオ最適化
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  カスタムアラート
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  優先サポート
                </li>
              </ul>
              
              <button class="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-cyan/50 transition-all">
                プロにアップグレード
              </button>
            </div>
            
            <!-- Enterprise Plan -->
            <div class="glass-morphism-dark p-8 rounded-2xl border border-gray-600 hover-lift">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold mb-4">エンタープライズ</h3>
                <div class="text-5xl font-bold neon-text mb-4">カスタム</div>
                <p class="text-gray-400">大規模組織向け</p>
              </div>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  全てのプロ機能
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  専用サポート
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  カスタムAPI
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  チーム管理機能
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  オンサイト研修
                </li>
                <li class="flex items-center">
                  <span class="text-neon-green mr-3">✓</span>
                  カスタムレポート
                </li>
              </ul>
              
              <button class="w-full py-3 border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/10 transition-all">
                お問い合わせ
              </button>
            </div>
          </div>

          <!-- Feature Comparison -->
          <div class="glass-morphism-dark p-8 rounded-2xl mb-16">
            <h2 class="text-3xl font-bold text-center mb-8 neon-text">機能比較</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-600">
                    <th class="text-left py-4">機能</th>
                    <th class="text-center py-4">フリー</th>
                    <th class="text-center py-4 text-neon-cyan">プロ</th>
                    <th class="text-center py-4">エンタープライズ</th>
                  </tr>
                </thead>
                <tbody class="space-y-2">
                  <tr class="border-b border-gray-700/50">
                    <td class="py-3">学習レッスン数</td>
                    <td class="text-center">85</td>
                    <td class="text-center text-neon-cyan">85</td>
                    <td class="text-center">85+カスタム</td>
                  </tr>
                  <tr class="border-b border-gray-700/50">
                    <td class="py-3">AIチャット</td>
                    <td class="text-center">月5回</td>
                    <td class="text-center text-neon-cyan">無制限</td>
                    <td class="text-center">無制限</td>
                  </tr>
                  <tr class="border-b border-gray-700/50">
                    <td class="py-3">市場データ</td>
                    <td class="text-center">基本</td>
                    <td class="text-center text-neon-cyan">リアルタイム</td>
                    <td class="text-center">リアルタイム+API</td>
                  </tr>
                  <tr class="border-b border-gray-700/50">
                    <td class="py-3">ポートフォリオ最適化</td>
                    <td class="text-center">✗</td>
                    <td class="text-center text-neon-cyan">✓</td>
                    <td class="text-center">✓</td>
                  </tr>
                  <tr class="border-b border-gray-700/50">
                    <td class="py-3">カスタムアラート</td>
                    <td class="text-center">✗</td>
                    <td class="text-center text-neon-cyan">✓</td>
                    <td class="text-center">✓</td>
                  </tr>
                  <tr>
                    <td class="py-3">専用サポート</td>
                    <td class="text-center">✗</td>
                    <td class="text-center">✗</td>
                    <td class="text-center">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8 neon-text">よくある質問</h2>
            
            <div class="max-w-3xl mx-auto space-y-4">
              <div class="glass-morphism-dark p-6 rounded-xl">
                <h3 class="font-semibold mb-2">プランの変更はいつでも可能ですか？</h3>
                <p class="text-gray-400">
                  はい、いつでもプランの変更・キャンセルが可能です。日割り計算で調整いたします。
                </p>
              </div>
              
              <div class="glass-morphism-dark p-6 rounded-xl">
                <h3 class="font-semibold mb-2">無料トライアルはありますか？</h3>
                <p class="text-gray-400">
                  プロプランには14日間の無料トライアルがあります。クレジットカード情報は不要です。
                </p>
              </div>
              
              <div class="glass-morphism-dark p-6 rounded-xl">
                <h3 class="font-semibold mb-2">データの安全性は保証されていますか？</h3>
                <p class="text-gray-400">
                  はい、銀行レベルの暗号化とセキュリティ対策により、お客様のデータを安全に保護しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,

    market: `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>市場分析 - CryptoAI Platform</title>
        ${commonCSS}
      </head>
      <body class="bg-black text-white min-h-screen custom-scrollbar">
        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 glass-morphism-dark border-b border-neon-cyan/20">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <a href="/" class="text-2xl font-bold neon-text">CryptoAI</a>
              <div class="flex space-x-6">
                <a href="/" class="hover:text-neon-cyan transition-colors">ホーム</a>
                <a href="/market" class="text-neon-cyan">市場分析</a>
                <a href="/dashboard" class="hover:text-neon-cyan transition-colors">ダッシュボード</a>
              </div>
            </div>
          </div>
        </nav>

        <div class="pt-20 container mx-auto px-6 py-8">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-4xl font-bold neon-text">リアルタイム市場分析</h1>
              <p class="text-gray-400 mt-2">AI駆動の高度な暗号通貨市場分析</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-400">最終更新</div>
              <div class="text-neon-cyan font-mono" id="last-update">--:--:--</div>
            </div>
          </div>

          <!-- Market Overview -->
          <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">🌍</div>
                <div class="text-green-400 text-sm">+2.1%</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">総市場時価総額</h3>
              <div class="text-2xl font-bold neon-text">$2.1T</div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">📊</div>
                <div class="text-blue-400 text-sm">24h</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">取引高</h3>
              <div class="text-2xl font-bold neon-text">$89.2B</div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">🔥</div>
                <div class="text-orange-400 text-sm">BTC</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">ドミナンス</h3>
              <div class="text-2xl font-bold neon-text">52.3%</div>
            </div>
            
            <div class="glass-morphism-dark p-6 rounded-xl hover-lift">
              <div class="flex items-center justify-between mb-4">
                <div class="text-3xl">😱</div>
                <div class="text-yellow-400 text-sm">中立</div>
              </div>
              <h3 class="text-gray-400 text-sm mb-2">恐怖貪欲指数</h3>
              <div class="text-2xl font-bold neon-text">64</div>
            </div>
          </div>

          <!-- Top Cryptocurrencies -->
          <div class="grid lg:grid-cols-3 gap-8 mb-8">
            <div class="lg:col-span-2 glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">トップ暗号通貨</h2>
              
              <div class="space-y-4">
                <!-- Bitcoin -->
                <div class="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-4">₿</div>
                    <div>
                      <div class="font-semibold">Bitcoin</div>
                      <div class="text-gray-400 text-sm">BTC</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">$45,123.45</div>
                    <div class="text-green-400 text-sm">+3.2%</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-400">$890.2B</div>
                    <div class="text-xs text-gray-500">時価総額</div>
                  </div>
                </div>
                
                <!-- Ethereum -->
                <div class="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold mr-4">Ξ</div>
                    <div>
                      <div class="font-semibold">Ethereum</div>
                      <div class="text-gray-400 text-sm">ETH</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">$2,789.12</div>
                    <div class="text-green-400 text-sm">+5.7%</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-400">$335.4B</div>
                    <div class="text-xs text-gray-500">時価総額</div>
                  </div>
                </div>
                
                <!-- Solana -->
                <div class="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-lg font-bold mr-4">◎</div>
                    <div>
                      <div class="font-semibold">Solana</div>
                      <div class="text-gray-400 text-sm">SOL</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">$98.34</div>
                    <div class="text-red-400 text-sm">-1.2%</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-400">$45.2B</div>
                    <div class="text-xs text-gray-500">時価総額</div>
                  </div>
                </div>
                
                <!-- More rows -->
                <div class="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-lg font-bold mr-4">◆</div>
                    <div>
                      <div class="font-semibold">Binance Coin</div>
                      <div class="text-gray-400 text-sm">BNB</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">$312.78</div>
                    <div class="text-green-400 text-sm">+2.1%</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-400">$48.7B</div>
                    <div class="text-xs text-gray-500">時価総額</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- AI Market Insights -->
            <div class="glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">AI市場洞察</h2>
              
              <div class="space-y-4">
                <div class="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-green-400">強気トレンド</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    機関投資家の流入が継続中。BTC/ETHの相関性が高まっています。
                  </p>
                </div>
                
                <div class="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-blue-400">テクニカル分析</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    RSIが70を超過。短期的な調整の可能性があります。
                  </p>
                </div>
                
                <div class="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-yellow-400">DeFi動向</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    TVL（Total Value Locked）が過去最高を更新。DeFiセクターに注目。
                  </p>
                </div>
                
                <div class="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span class="font-semibold text-purple-400">オンチェーン分析</span>
                  </div>
                  <p class="text-sm text-gray-300">
                    長期保有者の売却圧力が低下。健全な価格上昇パターンを示しています。
                  </p>
                </div>
              </div>
              
              <button class="w-full mt-6 py-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-cyan/80 transition-all">
                詳細分析レポート
              </button>
            </div>
          </div>

          <!-- Market Heatmap & Trending -->
          <div class="grid lg:grid-cols-2 gap-8 mb-8">
            <!-- Heatmap -->
            <div class="glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">市場ヒートマップ</h2>
              
              <div class="grid grid-cols-4 gap-2">
                ${Array.from({length: 16}, (_, i) => {
                  const change = (Math.random() - 0.5) * 20;
                  const isPositive = change > 0;
                  const intensity = Math.abs(change) / 10;
                  const color = isPositive ? 'bg-green-500' : 'bg-red-500';
                  const opacity = Math.max(0.2, intensity);
                  
                  return `
                    <div class="${color} rounded p-3 text-center hover:scale-105 transition-transform cursor-pointer" 
                         style="opacity: ${opacity}">
                      <div class="text-xs font-mono">${['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'LINK', 'UNI', 'AAVE', 'MATIC', 'ATOM', 'ALGO', 'XRP', 'LTC', 'BCH', 'EOS', 'TRX'][i]}</div>
                      <div class="text-xs">${change > 0 ? '+' : ''}${change.toFixed(1)}%</div>
                    </div>
                  `;
                }).join('')}
              </div>
              
              <div class="flex justify-between mt-4 text-xs text-gray-400">
                <span>📉 -10%</span>
                <span>📊 0%</span>
                <span>📈 +10%</span>
              </div>
            </div>
            
            <!-- Trending -->
            <div class="glass-morphism-dark p-6 rounded-xl">
              <h2 class="text-xl font-bold neon-text mb-6">トレンド銘柄</h2>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div class="flex items-center">
                    <span class="text-neon-green mr-2">🔥</span>
                    <span class="font-semibold">Arbitrum</span>
                  </div>
                  <div class="text-green-400">+24.5%</div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div class="flex items-center">
                    <span class="text-neon-cyan mr-2">⚡</span>
                    <span class="font-semibold">Optimism</span>
                  </div>
                  <div class="text-green-400">+18.2%</div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div class="flex items-center">
                    <span class="text-neon-magenta mr-2">🚀</span>
                    <span class="font-semibold">Polygon</span>
                  </div>
                  <div class="text-green-400">+15.7%</div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div class="flex items-center">
                    <span class="text-yellow-400 mr-2">⭐</span>
                    <span class="font-semibold">Chainlink</span>
                  </div>
                  <div class="text-green-400">+12.1%</div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div class="flex items-center">
                    <span class="text-blue-400 mr-2">💎</span>
                    <span class="font-semibold">Uniswap</span>
                  </div>
                  <div class="text-green-400">+9.8%</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Prediction -->
          <div class="glass-morphism-dark p-6 rounded-xl">
            <h2 class="text-xl font-bold neon-text mb-6">AI価格予測</h2>
            
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center p-4 border border-neon-cyan/30 rounded-lg">
                <div class="text-3xl mb-2">₿</div>
                <h3 class="font-semibold mb-2">Bitcoin 7日予測</h3>
                <div class="text-2xl font-bold neon-text mb-2">$48,500</div>
                <div class="text-green-400 text-sm">+7.5% 上昇予測</div>
                <div class="text-xs text-gray-400 mt-2">信頼度: 78%</div>
              </div>
              
              <div class="text-center p-4 border border-neon-magenta/30 rounded-lg">
                <div class="text-3xl mb-2">Ξ</div>
                <h3 class="font-semibold mb-2">Ethereum 7日予測</h3>
                <div class="text-2xl font-bold neon-text mb-2">$3,100</div>
                <div class="text-green-400 text-sm">+11.2% 上昇予測</div>
                <div class="text-xs text-gray-400 mt-2">信頼度: 82%</div>
              </div>
              
              <div class="text-center p-4 border border-neon-green/30 rounded-lg">
                <div class="text-3xl mb-2">◎</div>
                <h3 class="font-semibold mb-2">Solana 7日予測</h3>
                <div class="text-2xl font-bold neon-text mb-2">$110.80</div>
                <div class="text-green-400 text-sm">+12.7% 上昇予測</div>
                <div class="text-xs text-gray-400 mt-2">信頼度: 74%</div>
              </div>
            </div>
            
            <div class="mt-6 text-center text-gray-400 text-sm">
              ⚠️ 予測は参考情報であり、投資判断は自己責任で行ってください
            </div>
          </div>
        </div>

        <script>
          // Update timestamp
          function updateTimestamp() {
            const now = new Date();
            document.getElementById('last-update').textContent = now.toLocaleTimeString('ja-JP');
          }
          
          setInterval(updateTimestamp, 1000);
          updateTimestamp();
          
          // Simulate real-time updates
          setInterval(() => {
            const heatmapCells = document.querySelectorAll('.grid.grid-cols-4 > div');
            heatmapCells.forEach(cell => {
              const change = (Math.random() - 0.5) * 2; // Smaller changes for realism
              const currentChange = parseFloat(cell.querySelector('.text-xs:last-child').textContent);
              const newChange = currentChange + change;
              
              cell.querySelector('.text-xs:last-child').textContent = 
                (newChange > 0 ? '+' : '') + newChange.toFixed(1) + '%';
              
              // Update color
              const isPositive = newChange > 0;
              const intensity = Math.abs(newChange) / 10;
              const opacity = Math.max(0.2, intensity);
              
              cell.className = cell.className.replace(/bg-(green|red)-500/, isPositive ? 'bg-green-500' : 'bg-red-500');
              cell.style.opacity = opacity;
            });
          }, 3000);
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

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  let pageType = 'home';
  
  if (pathname === '/learning') {
    pageType = 'learning';
  } else if (pathname === '/dashboard') {
    pageType = 'dashboard';
  } else if (pathname === '/auth/login') {
    pageType = 'login';
  } else if (pathname === '/pricing') {
    pageType = 'pricing';
  } else if (pathname === '/market') {
    pageType = 'market';
  }

  const html = getPage(pageType);
  res.writeHead(200);
  res.end(html);
});

const port = 3006;
server.listen(port, () => {
  console.log(`🚀 超モダンサイバーパンクWebサイトが起動しました！`);
  console.log(`🌐 ブラウザで http://localhost:${port} を開いてください`);
  console.log(`\n📋 利用可能なページ:`);
  console.log(`   • ホーム: http://localhost:${port}/`);
  console.log(`   • 学習センター: http://localhost:${port}/learning`);
  console.log(`   • ダッシュボード: http://localhost:${port}/dashboard`);
  console.log(`   • ログイン: http://localhost:${port}/auth/login`);
  console.log(`   • 料金プラン: http://localhost:${port}/pricing`);
  console.log(`   • 市場分析: http://localhost:${port}/market`);
  console.log(`\n✨ 新機能:`);
  console.log(`   🎆 パーティクルシステム & データストリーム`);
  console.log(`   🌈 ホログラム効果 & サイバーグロー`);
  console.log(`   🎮 インタラクティブアニメーション`);
  console.log(`   📱 完全レスポンシブデザイン`);
  console.log(`   🎨 未来的ビジュアルエフェクト`);
});