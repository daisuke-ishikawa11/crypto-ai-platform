'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, BookOpen, Play, Brain, Activity, Bell, BarChart3, Shield, TrendingUp, Users, Star, CheckCircle, Eye, Zap, Target, Award, Send, Pause, MessageCircle, Clock, PieChart } from 'lucide-react';
import { HomeButton } from '@/components/ui/home-button';

export default function DemoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState('ai-chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'こんにちは！AI投資アドバイザーです。投資に関するご質問をお聞かせください。' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // パーティクル生成
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const demoFeatures = [
    {
      id: 'ai-chat',
      title: 'AIチャット',
      subtitle: '24時間投資相談',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'learning',
      title: '学習システム',
      subtitle: '85レッスン',
      icon: BookOpen,
      color: 'emerald'
    },
    {
      id: 'analysis',
      title: '市場分析',
      subtitle: 'リアルタイム',
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 'defi',
      title: 'DeFi監視',
      subtitle: '150+プロトコル',
      icon: Eye,
      color: 'orange'
    }
  ];

  const handleChatSend = async () => {
    if (!chatMessage.trim()) return;
    
    const userMessage = chatMessage;
    setChatMessage('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // AI応答シミュレーション
    setTimeout(() => {
      const responses = [
        'ビットコインについてですが、現在のテクニカル指標を見ると、50日移動平均線がサポートとして機能しています。RSIは45で中立的な領域にあります。',
        'DeFiへの投資をお考えですね。リスク分散のため、複数のプロトコルに分散投資することをお勧めします。特に監査済みのプロトコルを選択することが重要です。',
        'ポートフォリオのリスク管理については、投資額の5-10%を高リスク資産に、残りを安定した資産に配分することを推奨します。',
        '市場の変動が気になりますね。長期的な視点を持ち、定期的なリバランスを行うことで、リスクを軽減できます。'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const startDemo = () => {
    setIsPlaying(true);
    setDemoProgress(0);
    
    const interval = setInterval(() => {
      setDemoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <>
      <HomeButton />
      {/* パーティクル背景 */}
      <div className="particles fixed inset-0 pointer-events-none z-0"></div>

      {/* ヘッダー */}
      <header className="fixed top-0 w-full z-40 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                  CryptoAI Platform
                </h1>
                <p className="text-xs text-blue-300">Next-Gen Investment AI</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/features" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">機能</Link>
              <Link href="/how-to" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">使い方</Link>
              <Link href="/pricing" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">料金</Link>
              <Link href="/demo" className="text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full border-b-2 border-blue-400">デモ</Link>
              <Link href="/help" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">ヘルプ</Link>
              
              <div className="flex gap-3">
                <Link href="/auth/login" className="px-6 py-2 glass rounded-full text-white font-medium hover:bg-white/20 transition-all inline-block">
                  ログイン
                </Link>
                <Link href="/auth/register" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium glow-animation hover:scale-105 transition-transform flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  無料で始める
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </nav>

            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" 
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div className={`lg:hidden fixed inset-x-0 top-20 mx-4 glass-dark rounded-2xl border border-white/10 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="p-6 space-y-4">
            <Link href="/features" className="block text-white hover:text-blue-300 font-medium transition-colors">機能紹介</Link>
            <Link href="/how-to" className="block text-white hover:text-blue-300 font-medium transition-colors">使い方</Link>
            <Link href="/pricing" className="block text-white hover:text-blue-300 font-medium transition-colors">料金プラン</Link>
            <Link href="/demo" className="block text-blue-400 hover:text-blue-300 font-medium transition-colors border-l-2 border-blue-400 pl-3">デモ</Link>
            <Link href="/help" className="block text-white hover:text-blue-300 font-medium transition-colors">ヘルプ</Link>
            <div className="border-t border-white/10 pt-4 space-y-3">
              <Link href="/auth/login" className="block w-full px-4 py-2 glass rounded-lg text-center text-white font-medium hover:bg-white/20 transition-all">
                ログイン
              </Link>
              <Link href="/auth/register" className="block w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-center text-white font-medium hover:scale-105 transition-transform">
                無料で始める
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center space-y-8">
            {/* デモバッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <Play className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ 登録不要で体験 • 主要機能をリアルタイムで確認 ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  リアルタイム
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  デモ体験
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  スタート
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>登録不要で主要機能を体験。</p>
                <p><span className="text-emerald-400 font-semibold"> AIチャット・学習・分析 </span>を<span className="text-blue-400"> 実際に操作 </span>してみましょう。</p>
              </div>
            </div>

            {/* デモ進行状況 */}
            <div className="max-w-2xl mx-auto">
              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-white">デモ進行状況</span>
                  <span className="text-emerald-400 font-semibold">{Math.round(demoProgress)}% 完了</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${demoProgress}%` }}
                  ></div>
                </div>
                <button
                  onClick={startDemo}
                  disabled={isPlaying}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl text-white font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      デモ実行中...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      デモを開始
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* デモ機能選択 */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🎮 インタラクティブデモ
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              実際に操作して機能を体験してください
            </p>
          </div>

          {/* デモ機能タブ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {demoFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveDemo(feature.id)}
                className={`p-6 rounded-2xl transition-all duration-300 text-center group ${
                  activeDemo === feature.id 
                    ? `glass-dark border-${feature.color}-500/30 bg-${feature.color}-500/10` 
                    : 'glass hover:bg-white/10'
                }`}
              >
                <feature.icon className={`w-8 h-8 mx-auto mb-3 ${
                  activeDemo === feature.id ? `text-${feature.color}-400` : 'text-white/70'
                }`} />
                <div className={`font-semibold ${
                  activeDemo === feature.id ? `text-${feature.color}-100` : 'text-white/80'
                }`}>
                  {feature.title}
                </div>
                <div className={`text-xs mt-1 ${
                  activeDemo === feature.id ? `text-${feature.color}-300` : 'text-white/60'
                }`}>
                  {feature.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* デモコンテンツ */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          {/* AIチャットデモ */}
          {activeDemo === 'ai-chat' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">AI投資アドバイザー</h3>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                    GPT-4 搭載
                  </span>
                </div>

                {/* チャットメッセージ */}
                <div className="h-80 overflow-y-auto space-y-4 bg-black/30 rounded-lg p-4 mb-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/10 text-white'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 px-4 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* チャット入力 */}
                <div className="flex gap-2">
                  <input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="投資について質問してください..."
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleChatSend}
                    disabled={!chatMessage.trim() || isLoading}
                    className="px-4 py-3 bg-blue-500 rounded-xl text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="glass-dark p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">AIチャット機能の特徴</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">即座の回答</h4>
                      <p className="text-sm text-white/70">24時間365日いつでも質問可能</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-emerald-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">個別化アドバイス</h4>
                      <p className="text-sm text-white/70">あなたの投資レベルに合わせたアドバイス</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">信頼性の高い情報</h4>
                      <p className="text-sm text-white/70">最新の市場データに基づく分析</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-300 mb-2">デモ制限事項</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• デモでは基本的な質問のみ対応</li>
                    <li>• 実際のAIは更に高度な分析が可能</li>
                    <li>• 会員登録で全機能をご利用いただけます</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 学習システムデモ */}
          {activeDemo === 'learning' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">学習ダッシュボード</h3>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                    進捗率 65%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">12/85</div>
                    <div className="text-sm text-white/60">完了レッスン</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">4.2h</div>
                    <div className="text-sm text-white/60">学習時間</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">92%</div>
                    <div className="text-sm text-white/60">理解度</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { title: '投資とは何か？', duration: '8分', completed: true },
                    { title: '暗号資産の基礎知識', duration: '12分', completed: true },
                    { title: 'ブロックチェーン技術', duration: '15分', completed: false },
                    { title: 'DeFiの基本概念', duration: '10分', completed: false }
                  ].map((lesson, index) => (
                    <div key={index} className={`p-4 rounded-lg border transition-all ${
                      lesson.completed 
                        ? 'bg-emerald-500/10 border-emerald-500/20' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Play className="w-5 h-5 text-blue-400" />
                          )}
                          <div>
                            <h4 className="font-semibold text-white">{lesson.title}</h4>
                            <p className="text-sm text-white/60">{lesson.duration}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-dark p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">85レッスンカリキュラム</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <h4 className="font-semibold text-emerald-300 mb-2">投資基礎・金融リテラシー</h4>
                    <p className="text-sm text-white/70">2レッスン - 投資の基本概念と金融知識</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-300 mb-2">暗号通貨の基礎</h4>
                    <p className="text-sm text-white/70">12レッスン - ブロックチェーンから実践まで</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-300 mb-2">トレーディング基礎</h4>
                    <p className="text-sm text-white/70">20レッスン - 取引戦略とリスク管理</p>
                  </div>
                  <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-300 mb-2">DeFi・NFT入門</h4>
                    <p className="text-sm text-white/70">17レッスン - 分散型金融の世界</p>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-300 mb-2">高度な投資戦略</h4>
                    <p className="text-sm text-white/70">34レッスン - プロ級の投資テクニック</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 市場分析デモ */}
          {activeDemo === 'analysis' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">市場概況</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">BTC</div>
                      <div className="text-sm text-white/60">$45,240</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      +2.5%
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">ETH</div>
                      <div className="text-sm text-white/60">$2,850</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-red-400">
                      <TrendingUp className="w-4 h-4 rotate-180" />
                      -1.2%
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">AI予測</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-300 mb-2">BTC 24時間予測</h4>
                    <div className="text-xl font-bold text-white mb-1">↗ 上昇傾向</div>
                    <div className="text-sm text-white/70">信頼度: 87.3%</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">技術指標</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">RSI(14)</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                        中立
                      </span>
                    </div>
                    <div className="text-sm text-white/60 mt-1">45.2</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">MACD</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                        強気
                      </span>
                    </div>
                    <div className="text-sm text-white/60 mt-1">0.3</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DeFi監視デモ */}
          {activeDemo === 'defi' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-dark p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">DeFiプロトコルダッシュボード</h3>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                    LIVE
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">Uniswap V3</h4>
                      <span className="text-emerald-400 font-semibold">TVL $4.2B</span>
                    </div>
                    <div className="text-sm text-white/60">24h Volume: $1.8B (+12.3%)</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">AAVE</h4>
                      <span className="text-blue-400 font-semibold">利用率 78%</span>
                    </div>
                    <div className="text-sm text-white/60">最高APY: 15.2% (USDC)</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">Compound</h4>
                      <span className="text-purple-400 font-semibold">供給APY 8.1%</span>
                    </div>
                    <div className="text-sm text-white/60">借入APY: 12.7% (ETH)</div>
                  </div>
                </div>
              </div>

              <div className="glass-dark p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">アラート機能</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-yellow-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-yellow-300">収益機会アラート</h4>
                        <p className="text-sm text-white/70 mt-1">
                          ETH-USDCプールでAPY 18.5%の高収益機会を検出
                        </p>
                        <div className="text-xs text-white/50 mt-2">2分前</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-red-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-300">リスクアラート</h4>
                        <p className="text-sm text-white/70 mt-1">
                          Protocol Xで異常な取引量を検出。注意が必要です
                        </p>
                        <div className="text-xs text-white/50 mt-2">15分前</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <h4 className="font-semibold text-orange-300 mb-2">監視統計</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white font-semibold">150+</div>
                      <div className="text-white/60">プロトコル</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">24/7</div>
                      <div className="text-white/60">監視体制</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">1,247</div>
                      <div className="text-white/60">アクティブアラート</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">$45.8B</div>
                      <div className="text-white/60">監視対象TVL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass rounded-3xl p-12 text-center border border-white/20">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🚀 デモをお楽しみいただけましたか？
              </h2>
              <p className="text-xl text-white/60">
                これは機能のほんの一部です。完全版では更に多くの高度な機能をご利用いただけます。
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-white/5 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">85レッスン</h3>
                  <p className="text-sm text-white/70">完全版学習コンテンツ</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">無制限AI相談</h3>
                  <p className="text-sm text-white/70">24時間365日対応</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">高度分析</h3>
                  <p className="text-sm text-white/70">150+DeFiプロトコルダッシュボード</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  <Star className="w-6 h-6" />
                  無料で始める
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/features" className="px-8 py-4 glass border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Activity className="w-6 h-6" />
                  全機能を見る
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-white/60 pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>登録不要</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>30日間返金保証</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>即座に利用開始</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-black/50 glass border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">CryptoAI</h3>
              </div>
              <p className="text-white/60 text-sm">
                最先端のAI技術で投資をより安全により効果的に
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">プロダクト</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/features" className="hover:text-white transition-colors">機能紹介</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors text-blue-400">デモ体験</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">料金プラン</Link></li>
                <li><Link href="/how-to" className="hover:text-white transition-colors">使い方ガイド</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/help" className="hover:text-white transition-colors">ヘルプセンター</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">アップデート</h4>
              <p className="text-white/60 text-sm mb-4">最新機能やお得な情報をお届け</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 rounded-lg text-white text-sm font-medium hover:bg-blue-600 transition-colors">登録</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>© 2025 CryptoAI Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}