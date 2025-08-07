'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, BookOpen, Search, HelpCircle, MessageCircle, Mail, Phone, FileText, Video, Users, Zap, Shield, Clock, CheckCircle, Star, AlertCircle, ExternalLink, ChevronDown, ChevronUp, Settings, CreditCard, Monitor, Book } from 'lucide-react';
import { HomeButton } from '@/components/ui/home-button';

export default function HelpPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

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
  
  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  // Help categories
  const categories = [
    { id: 'all', name: 'すべて', icon: HelpCircle, count: 45 },
    { id: 'getting-started', name: '始め方', icon: BookOpen, count: 8 },
    { id: 'account', name: 'アカウント', icon: Settings, count: 12 },
    { id: 'learning', name: '学習機能', icon: Book, count: 10 },
    { id: 'payment', name: '料金・支払い', icon: CreditCard, count: 7 },
    { id: 'technical', name: '技術的問題', icon: Monitor, count: 8 }
  ];

  // FAQ data
  const faqs = [
    {
      id: '1',
      category: 'getting-started',
      question: 'アカウントの作成方法を教えてください',
      answer: 'トップページの「無料で始める」ボタンをクリックし、メールアドレス、パスワード、お名前を入力してください。メール認証完了後、すぐにサービスをご利用いただけます。',
      popularity: 'high',
      helpful: 156
    },
    {
      id: '2',
      category: 'learning',
      question: 'AIチャット機能の使い方は？',
      answer: 'ダッシュボードの「AIチャット」をクリックし、投資に関する質問を自然言語で入力してください。GPT-4が24時間365日、専門的なアドバイスを提供します。無料プランでは1日5回まで利用可能です。',
      popularity: 'high',
      helpful: 234
    },
    {
      id: '3',
      category: 'payment',
      question: 'プランの変更はいつでもできますか？',
      answer: 'はい、いつでもプラン変更が可能です。アップグレードは即座に反映され、ダウングレードは次の請求サイクルから適用されます。設定画面の「プラン管理」から変更できます。',
      popularity: 'medium',
      helpful: 89
    },
    {
      id: '4',
      category: 'account',
      question: 'パスワードを忘れた場合は？',
      answer: 'ログイン画面の「パスワードを忘れた方」をクリックし、登録したメールアドレスを入力してください。パスワードリセットのリンクをお送りします。',
      popularity: 'high',
      helpful: 145
    },
    {
      id: '5',
      category: 'technical',
      question: 'スマートフォンでも利用できますか？',
      answer: 'はい、スマートフォン・タブレットに完全対応しています。iOSアプリ・Androidアプリも提供予定です。Webブラウザからも快適にご利用いただけます。',
      popularity: 'medium',
      helpful: 78
    },
    {
      id: '6',
      category: 'learning',
      question: '学習進捗はどのように管理されますか？',
      answer: '各レッスンの完了状況、クイズの成績、学習時間が自動的に記録されます。ダッシュボードで進捗状況を確認でき、AIが次の推奨レッスンを提案します。',
      popularity: 'medium',
      helpful: 92
    }
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const quickActions = [
    {
      title: 'クイックスタートガイド',
      description: '5分で基本機能をマスター',
      icon: Zap,
      color: 'emerald',
      href: '/help/quick-start'
    },
    {
      title: 'ビデオチュートリアル',
      description: '動画で分かりやすく解説',
      icon: Video,
      color: 'blue',
      href: '/help/tutorials'
    },
    {
      title: 'ダウンロード資料',
      description: 'PDF・チートシート等',
      icon: FileText,
      color: 'purple',
      href: '/help/downloads'
    },
    {
      title: 'コミュニティ',
      description: 'ユーザー同士で質問・回答',
      icon: Users,
      color: 'pink',
      href: '/community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <HomeButton />
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* カスタムアニメーション */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        .float-animation { animation: float 4s ease-in-out infinite; }
        .glow-animation { animation: glow 2s ease-in-out infinite; }
        
        /* グラスモーフィズム効果 */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-dark {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* パーティクル背景 */
        .particles {
          position: fixed;
          width: 100%;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;
          z-index: 0;
        }
        
        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: particle-float 6s infinite linear;
        }
        
        @keyframes particle-float {
          0% { opacity: 0; transform: translateY(100vh) rotate(0deg); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10vh) rotate(360deg); }
        }
      `}</style>

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
              <Link href="/demo" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full">デモ</Link>
              <Link href="/help" className="text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full border-b-2 border-blue-400">ヘルプ</Link>
              
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
            <Link href="/demo" className="block text-white hover:text-blue-300 font-medium transition-colors">デモ</Link>
            <Link href="/help" className="block text-blue-400 hover:text-blue-300 font-medium transition-colors border-l-2 border-blue-400 pl-3">ヘルプ</Link>
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
            {/* ヘルプバッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ 24時間サポート対応 • 即座に問題解決 ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  ヘルプ
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  センター
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  サポート
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>質問やお困りごとを素早く解決。</p>
                <p><span className="text-emerald-400 font-semibold"> 専門スタッフ </span>が<span className="text-blue-400"> 24時間 </span>サポートいたします。</p>
              </div>
            </div>

            {/* 検索バー */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="質問やキーワードを入力してください..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 glass"
                />
              </div>
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
                  <p className="text-sm text-white/70">
                    "{searchQuery}" の検索結果: {filteredFaqs.length} 件
                  </p>
                </div>
              )}
            </div>

            {/* 統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  2,400+
                </div>
                <p className="text-white/70">解決済み質問</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  &lt; 2時間
                </div>
                <p className="text-white/70">平均回答時間</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  4.9/5
                </div>
                <p className="text-white/70">サポート満足度</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <p className="text-white/70">サポート体制</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* クイックアクションセクション */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🚀 よく利用される機能
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              すぐに始められるガイドとリソース
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <div key={index} className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{action.title}</h3>
                <p className="text-white/70 mb-4">{action.description}</p>
                <Link href={action.href} className={`w-full px-4 py-2 rounded-xl text-white font-medium transition-all bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 hover:scale-105 flex items-center justify-center gap-2`}>
                  詳細を見る
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQセクション */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              💡 よくある質問
            </h2>
            <p className="text-xl text-white/70">
              多くのお客様からよくいただく質問とその回答
            </p>
          </div>

          {/* カテゴリタブ */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ一覧 */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="glass-dark rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <button
                  className="w-full p-6 text-left"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex flex-col gap-2">
                        {faq.popularity === 'high' && (
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2 py-1 rounded-full w-fit">
                            人気
                          </span>
                        )}
                        <div className={`p-2 rounded-lg ${
                          faq.category === 'getting-started' ? 'bg-blue-500/20' :
                          faq.category === 'learning' ? 'bg-emerald-500/20' :
                          faq.category === 'payment' ? 'bg-purple-500/20' :
                          faq.category === 'account' ? 'bg-orange-500/20' :
                          'bg-gray-500/20'
                        }`}>
                          {faq.category === 'getting-started' && <BookOpen className="w-4 h-4 text-blue-400" />}
                          {faq.category === 'learning' && <Book className="w-4 h-4 text-emerald-400" />}
                          {faq.category === 'payment' && <CreditCard className="w-4 h-4 text-purple-400" />}
                          {faq.category === 'account' && <Settings className="w-4 h-4 text-orange-400" />}
                          {faq.category === 'technical' && <Monitor className="w-4 h-4 text-gray-400" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {faq.helpful} 人が参考になったと回答
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-white/60 hover:text-white">
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/80 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-white/60">
                            この回答は参考になりましたか？
                          </span>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-500/10 text-sm transition-colors">
                              はい
                            </button>
                            <button className="px-3 py-1 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/10 text-sm transition-colors">
                              いいえ
                            </button>
                          </div>
                        </div>
                        
                        <Link href="/contact" className="px-4 py-2 bg-blue-500 rounded-lg text-white text-sm hover:bg-blue-600 transition-colors flex items-center gap-2">
                          詳しく質問
                          <MessageCircle className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <div className="glass-dark rounded-2xl p-12">
                  <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    該当する質問が見つかりませんでした
                  </h3>
                  <p className="text-white/70 mb-6">
                    検索条件を変更するか、直接お問い合わせください
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className="px-6 py-3 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 transition-colors">
                      お問い合わせ
                    </Link>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors"
                    >
                      検索をリセット
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-dark rounded-2xl p-8 text-center">
              <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                解決しない問題がありますか？
              </h3>
              <p className="text-white/70 mb-6">
                専門スタッフが個別にサポートいたします。<br />
                24時間以内にご返答いたします。
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Mail, title: 'メールサポート', desc: 'support@crypto-ai-platform.com', action: 'メール作成' },
                  { icon: MessageCircle, title: 'チャットサポート', desc: 'リアルタイムでご相談', action: 'チャット開始' },
                  { icon: Phone, title: '電話サポート', desc: '平日 10:00-18:00', action: '電話する' }
                ].map((contact, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <contact.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white mb-1">{contact.title}</h4>
                    <p className="text-sm text-white/70 mb-3">{contact.desc}</p>
                    <button className="w-full px-4 py-2 bg-blue-500 rounded-lg text-white text-sm hover:bg-blue-600 transition-colors">
                      {contact.action}
                    </button>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl text-white font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                お問い合わせフォーム
                <ArrowRight className="w-5 h-5" />
              </Link>
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
                <li><Link href="/how-to" className="hover:text-white transition-colors">使い方ガイド</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/help" className="hover:text-white transition-colors text-blue-400">ヘルプセンター</Link></li>
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
    </div>
  );
}