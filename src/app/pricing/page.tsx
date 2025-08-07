'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, BookOpen, Play, Brain, Activity, Bell, BarChart3, Shield, TrendingUp, Users, Star, CheckCircle, Crown, Zap, Award, HeadphonesIcon, MessageCircle, CreditCard, Check } from 'lucide-react';
import { HomeButton } from '@/components/ui/home-button';

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');

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

  const plans = [
    {
      id: 'free',
      name: '無料プラン',
      price: '¥0',
      period: '/月',
      description: '投資学習を始めたい方に',
      color: 'emerald',
      popular: false,
      features: [
        '基本的なAIチャット (5回/日)',
        '学習コンテンツ全85レッスン',
        '基本的な市場分析',
        'コミュニティアクセス',
        'メールサポート'
      ]
    },
    {
      id: 'standard',
      name: 'スタンダード',
      price: '¥980',
      period: '/月',
      description: '本格的に投資を学びたい方に',
      color: 'blue',
      popular: true,
      features: [
        '無制限AIチャット',
        '全機能アクセス',
        'DeFiダッシュボードシステム',
        'スマートアラート',
        'リアルタイム分析',
        '優先サポート',
        'API アクセス (制限付き)'
      ]
    },
    {
      id: 'professional',
      name: 'プロフェッショナル',
      price: '¥2,980',
      period: '/月',
      description: '投資のプロを目指す方に',
      color: 'purple',
      popular: false,
      features: [
        'スタンダードプランの全機能',
        '高度なAI分析エンジン',
        'カスタムアラート設定',
        'ポートフォリオ最適化',
        'リスク管理ツール',
        '1対1メンタリング',
        'フル API アクセス',
        '専用サポート'
      ]
    }
  ];

  const faqs = [
    {
      question: 'プランはいつでも変更できますか？',
      answer: 'はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、ダウングレードは次の請求サイクルから適用されます。'
    },
    {
      question: '返金保証はありますか？',
      answer: '30日間の返金保証をご提供しております。サービスにご満足いただけない場合は、全額返金いたします。'
    },
    {
      question: 'どのような支払い方法が利用できますか？',
      answer: 'クレジットカード、デビットカード、PayPal、銀行振込に対応しています。セキュリティは最新の暗号化技術で保護されています。'
    },
    {
      question: '無料プランの制限はありますか？',
      answer: '無料プランでは、AIチャット5回/日、基本的な市場分析機能をご利用いただけます。すべての学習コンテンツは無料でアクセス可能です。'
    }
  ];

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
              <Link href="/pricing" className="text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full border-b-2 border-blue-400">料金</Link>
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
            <Link href="/how-to" className="block text-white hover:text-blue-300 font-medium transition-colors">使い方</Link>
            <Link href="/pricing" className="block text-blue-400 hover:text-blue-300 font-medium transition-colors border-l-2 border-blue-400 pl-3">料金プラン</Link>
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
            {/* 料金プランバッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <Crown className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ あなたに最適なプラン選択 • 30日間返金保証 ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  投資の未来を
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  手に入れる
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  料金プラン
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>無料から始めて、必要に応じてアップグレード。</p>
                <p><span className="text-emerald-400 font-semibold"> すべてのプラン </span>に<span className="text-blue-400"> 30日間返金保証 </span>付き。</p>
              </div>
            </div>

            {/* 統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  50,000+
                </div>
                <p className="text-white/70">アクティブユーザー</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  4.9/5
                </div>
                <p className="text-white/70">利用者満足度</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  87.3%
                </div>
                <p className="text-white/70">AI予測精度</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <p className="text-white/70">セキュリティ保証</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              💎 料金プラン比較
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              あなたの投資レベルに合わせて最適なプランを選択
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`glass-dark p-8 rounded-3xl hover:scale-105 transition-transform relative group ${
                  plan.popular ? 'border-2 border-emerald-500/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 rounded-full text-white font-semibold text-sm">
                      🏆 人気No.1
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-3xl bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                    {plan.id === 'free' && <BookOpen className="w-8 h-8 text-white" />}
                    {plan.id === 'standard' && <Crown className="w-8 h-8 text-white" />}
                    {plan.id === 'professional' && <Award className="w-8 h-8 text-white" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/auth/register"
                  className={`w-full px-6 py-3 rounded-2xl text-white font-bold text-center transition-all hover:scale-105 block ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 glow-animation'
                      : `bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600`
                  }`}
                >
                  {plan.id === 'free' ? '無料で始める' : `${plan.name}を選択`}
                </Link>
              </div>
            ))}
          </div>

          {/* 保証セクション */}
          <div className="glass-dark rounded-3xl p-12 text-center mt-16 border border-emerald-500/30">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              30日間完全返金保証
            </h3>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              サービスにご満足いただけない場合は、理由を問わず全額返金いたします。安心してお試しください。
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                <h4 className="font-semibold text-white mb-2">即座に開始</h4>
                <p className="text-sm text-white/60">登録後すぐ利用可能</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                <h4 className="font-semibold text-white mb-2">成果保証</h4>
                <p className="text-sm text-white/60">学習効果を実感</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                <h4 className="font-semibold text-white mb-2">コミュニティ</h4>
                <p className="text-sm text-white/60">50,000+の学習者</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ❓ よくある質問
            </h2>
            <p className="text-xl text-white/70">
              プラン選択でよくいただく質問にお答えします
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-dark p-6 rounded-2xl hover:bg-white/10 transition-all">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass rounded-3xl p-12 text-center border border-white/20">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🚀 投資の未来を今すぐ体験
              </h2>
              <p className="text-xl text-white/60">
                無料プランで基本機能を体験。必要に応じてアップグレード。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  無料で今すぐ始める
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/features" className="px-8 py-4 glass border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Activity className="w-6 h-6" />
                  機能詳細を見る
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-white/60 pt-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>クレジットカード不要</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>30日間返金保証</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>いつでもキャンセル可能</span>
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
                <li><Link href="/pricing" className="hover:text-white transition-colors text-blue-400">料金プラン</Link></li>
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