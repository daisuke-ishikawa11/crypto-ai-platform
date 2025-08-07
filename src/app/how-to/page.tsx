'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, BookOpen, Play, Brain, Activity, Bell, BarChart3, Shield, TrendingUp, Users, Clock, Star, CheckCircle, PlayCircle, Target, Settings, Rocket, Download, MessageCircle, Mail, Search, Filter } from 'lucide-react';
import { HomeButton } from '@/components/ui/home-button';

export default function HowToPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [completedGuides, setCompletedGuides] = useState<string[]>([]);

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
    
    // Load completed guides from localStorage
    const completed = localStorage.getItem('completedGuides');
    if (completed) {
      setCompletedGuides(JSON.parse(completed));
    }
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Categories
  const categories = [
    { id: 'all', name: 'すべて', icon: BookOpen, count: 24 },
    { id: 'getting-started', name: 'はじめに', icon: Rocket, count: 6 },
    { id: 'ai-features', name: 'AI機能', icon: Brain, count: 5 },
    { id: 'learning', name: '学習システム', icon: Target, count: 4 },
    { id: 'analysis', name: '分析ツール', icon: BarChart3, count: 5 },
    { id: 'account', name: 'アカウント', icon: Settings, count: 4 }
  ];

  // How-to guides data
  const guides = [
    {
      id: '1',
      title: 'アカウント作成からログインまで',
      category: 'getting-started',
      difficulty: 'beginner',
      duration: '5分',
      description: '新規アカウント作成の手順を詳しく解説',
      steps: 4,
      views: 1250,
      rating: 4.8,
      color: 'emerald'
    },
    {
      id: '2',
      title: 'AIチャットで投資相談をする方法',
      category: 'ai-features',
      difficulty: 'beginner',
      duration: '8分',
      description: 'AI投資アドバイザーとの効果的な対話方法',
      steps: 6,
      views: 2100,
      rating: 4.9,
      color: 'blue'
    },
    {
      id: '3',
      title: '学習進捗の確認と管理',
      category: 'learning',
      difficulty: 'beginner',
      duration: '6分',
      description: 'ダッシュボードでの進捗確認方法',
      steps: 5,
      views: 890,
      rating: 4.7,
      color: 'purple'
    },
    {
      id: '4',
      title: 'DeFiダッシュボードシステムの設定',
      category: 'analysis',
      difficulty: 'intermediate',
      duration: '12分',
      description: 'DeFiプロトコルの監視とアラート設定',
      steps: 8,
      views: 1560,
      rating: 4.6,
      color: 'teal'
    },
    {
      id: '5',
      title: 'スマートアラートのカスタマイズ',
      category: 'analysis',
      difficulty: 'intermediate',
      duration: '10分',
      description: '価格・ボリューム・技術指標アラートの設定',
      steps: 7,
      views: 1320,
      rating: 4.8,
      color: 'orange'
    },
    {
      id: '6',
      title: 'リスク管理機能の活用',
      category: 'analysis',
      difficulty: 'advanced',
      duration: '15分',
      description: 'ポートフォリオリスクの評価と最適化',
      steps: 10,
      views: 780,
      rating: 4.9,
      color: 'red'
    }
  ];

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const markAsCompleted = (guideId: string) => {
    const newCompleted = [...completedGuides, guideId];
    setCompletedGuides(newCompleted);
    localStorage.setItem('completedGuides', JSON.stringify(newCompleted));
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
              <Link href="/how-to" className="text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full border-b-2 border-blue-400">使い方</Link>
              <Link href="/pricing" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">料金</Link>
              <Link href="/demo" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">デモ</Link>
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
            <Link href="/how-to" className="block text-blue-400 hover:text-blue-300 font-medium transition-colors border-l-2 border-blue-400 pl-3">使い方</Link>
            <Link href="/pricing" className="block text-white hover:text-blue-300 font-medium transition-colors">料金プラン</Link>
            <Link href="/demo" className="block text-white hover:text-blue-300 font-medium transition-colors">デモ</Link>
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
            {/* 使い方ガイドバッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ ステップバイステップガイド • 24の詳細チュートリアル ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  プラットフォーム
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  完全攻略
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  ガイド
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>初心者から上級者まで、</p>
                <p><span className="text-emerald-400 font-semibold"> 誰でも簡単に </span>マスターできる<span className="text-blue-400"> 詳細ガイド </span>集。</p>
              </div>
            </div>

            {/* 検索バー */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="ガイドを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                />
              </div>
            </div>

            {/* 統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  24
                </div>
                <p className="text-white/70">ガイド数</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  平均8分
                </div>
                <p className="text-white/70">学習時間</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  15,000+
                </div>
                <p className="text-white/70">利用者数</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  4.8/5
                </div>
                <p className="text-white/70">満足度</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリー選択 */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              📚 カテゴリー別ガイド
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              あなたの学習目標に合わせてガイドを選択
            </p>
          </div>

          {/* カテゴリータブ */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-2xl transition-all duration-300 text-center group ${
                  activeCategory === category.id 
                    ? 'glass-dark border-emerald-500/30 bg-emerald-500/10' 
                    : 'glass hover:bg-white/10'
                }`}
              >
                <category.icon className={`w-8 h-8 mx-auto mb-2 ${
                  activeCategory === category.id ? 'text-emerald-400' : 'text-white/70'
                }`} />
                <div className={`font-semibold text-sm ${
                  activeCategory === category.id ? 'text-emerald-100' : 'text-white/80'
                }`}>
                  {category.name}
                </div>
                <div className={`text-xs mt-1 ${
                  activeCategory === category.id ? 'text-emerald-300' : 'text-white/60'
                }`}>
                  {category.count} ガイド
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ガイド一覧 */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => {
              const isCompleted = completedGuides.includes(guide.id);
              
              return (
                <div key={guide.id} className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r from-${guide.color}-500 to-${guide.color}-600 mb-4`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${guide.color}-500/20 text-${guide.color}-300`}>
                      {guide.difficulty === 'beginner' ? '初級' : 
                       guide.difficulty === 'intermediate' ? '中級' : '上級'}
                    </span>
                    {isCompleted && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300">
                        完了済み
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-white/70 mb-4 text-sm">
                    {guide.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <div className="text-sm font-semibold text-white">{guide.duration}</div>
                      <div className="text-xs text-white/60">所要時間</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{guide.steps}ステップ</div>
                      <div className="text-xs text-white/60">手順数</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-white">{guide.rating}</span>
                      </div>
                      <div className="text-xs text-white/60">{guide.views} 回閲覧</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => !isCompleted && markAsCompleted(guide.id)}
                      className={`flex-1 px-4 py-2 rounded-xl text-white font-medium transition-all bg-gradient-to-r from-${guide.color}-500 to-${guide.color}-600 hover:scale-105 flex items-center justify-center gap-2`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          再確認
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4" />
                          開始
                        </>
                      )}
                    </button>
                    <button className="px-4 py-2 glass rounded-xl text-white hover:bg-white/20 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-dark p-8 rounded-2xl max-w-md mx-auto">
                <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  該当するガイドが見つかりません
                </h3>
                <p className="text-white/70 mb-6">
                  検索条件を変更してみてください
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-2 bg-blue-500 rounded-xl text-white font-medium hover:bg-blue-600 transition-colors"
                >
                  フィルターをリセット
                </button>
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
                🤝 さらなるサポートが必要ですか？
              </h2>
              <p className="text-xl text-white/60">
                1対1のサポートや追加のリソースをご提供いたします。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/help" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  ヘルプセンター
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/contact" className="px-8 py-4 glass border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Mail className="w-6 h-6" />
                  お問い合わせ
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-white/60 pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>24時間サポート</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>詳細ガイド</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>コミュニティ</span>
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
                <li><Link href="/demo" className="hover:text-white transition-colors">デモ体験</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">料金プラン</Link></li>
                <li><Link href="/how-to" className="hover:text-white transition-colors text-blue-400">使い方ガイド</Link></li>
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