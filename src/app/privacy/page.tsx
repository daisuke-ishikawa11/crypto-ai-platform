'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, Shield, Lock, Eye, FileText, CheckCircle, AlertTriangle, Calendar, Mail, ExternalLink, Book, Database, Settings, UserCheck, Globe, Server, Trash2, Download, Scale, Users } from 'lucide-react';

export default function PrivacyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

    // スクロールでアクティブセクションを更新
    const updateActiveSection = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          setActiveSection(element.dataset.section || '');
        }
      });
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const tableOfContents = [
    { id: 'overview', title: '1. プライバシーポリシー概要', icon: Shield },
    { id: 'collection', title: '2. 収集する情報', icon: Database },
    { id: 'usage', title: '3. 情報の利用目的', icon: Settings },
    { id: 'sharing', title: '4. 情報の共有・提供', icon: Globe },
    { id: 'protection', title: '5. セキュリティ保護', icon: Lock },
    { id: 'cookies', title: '6. Cookie・トラッキング', icon: Eye },
    { id: 'rights', title: '7. ユーザーの権利', icon: UserCheck },
    { id: 'retention', title: '8. データ保持期間', icon: Calendar },
    { id: 'international', title: '9. 国際データ転送', icon: Server },
    { id: 'updates', title: '10. ポリシー更新', icon: FileText },
    { id: 'contact', title: '11. お問い合わせ', icon: Mail }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
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
            {/* プライバシーバッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ 最高水準のプライバシー保護 • GDPR完全準拠 ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  プライバシー
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ポリシー
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  個人情報保護方針
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>お客様の個人情報を安全に保護し、</p>
                <p><span className="text-emerald-400 font-semibold"> 透明性を保つ </span>ことを<span className="text-blue-400"> お約束 </span>します。</p>
              </div>
            </div>

            {/* プライバシー保護統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  GDPR
                </div>
                <p className="text-white/70">完全準拠</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  AES-256
                </div>
                <p className="text-white/70">暗号化レベル</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  SOC2
                </div>
                <p className="text-white/70">準拠データセンター</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <p className="text-white/70">監視体制</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="flex gap-8 max-w-7xl mx-auto px-6 pb-20">
        {/* 目次サイドバー */}
        <aside className="hidden lg:block w-80 sticky top-24 h-fit">
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              目次
            </h3>
            <nav className="space-y-1">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3 rounded-lg ${
                    activeSection === item.id
                      ? 'bg-emerald-500/20 text-emerald-300 border-l-2 border-emerald-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 space-y-12">
          {/* 1. プライバシーポリシー概要 */}
          <section id="overview" data-section="overview" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">1. プライバシーポリシー概要</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>
                株式会社Crypto AI Platform（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、個人情報保護法、GDPR（EU一般データ保護規則）等の関連法令を遵守し、以下の方針のもと個人情報の適切な取り扱いを行います。
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-300 mb-2">当社の取り組み</h4>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• 最小限の情報収集</li>
                        <li>• 目的外利用の禁止</li>
                        <li>• 強固なセキュリティ対策</li>
                        <li>• 透明性の確保</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <UserCheck className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">お客様の権利</h4>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• データアクセス権</li>
                        <li>• 修正・削除権</li>
                        <li>• データポータビリティ権</li>
                        <li>• 処理停止権</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 収集する情報 */}
          <section id="collection" data-section="collection" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">2. 収集する情報</h2>
            </div>
            <div className="space-y-6 text-white/80">
              <h4 className="font-semibold text-white">2.1 お客様から直接提供される情報</h4>
              
              <div className="grid gap-4">
                {[
                  {
                    category: "アカウント情報",
                    items: ["氏名", "メールアドレス", "パスワード（暗号化）", "プロフィール画像（任意）"],
                    icon: "👤"
                  },
                  {
                    category: "学習データ",
                    items: ["学習進捗", "クイズ回答", "AI対話履歴", "設定・好み"],
                    icon: "📚"
                  },
                  {
                    category: "サポート情報",
                    items: ["お問い合わせ内容", "サポート対話履歴", "フィードバック"],
                    icon: "💬"
                  },
                  {
                    category: "決済情報",
                    items: ["決済方法（クレジットカード下4桁のみ）", "取引履歴", "請求先住所"],
                    icon: "💳"
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="flex-1">
                        <h5 className="font-semibold text-blue-300 mb-2">{category.category}</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {category.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span className="text-sm text-white/70">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-white">2.2 自動収集される情報</h4>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-purple-300 mb-2">技術情報</h5>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• IPアドレス</li>
                      <li>• ブラウザ情報</li>
                      <li>• デバイス識別情報</li>
                      <li>• OS・画面解像度</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-purple-300 mb-2">利用データ</h5>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• アクセス日時</li>
                      <li>• 閲覧ページ</li>
                      <li>• 滞在時間</li>
                      <li>• 操作ログ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 情報の利用目的 */}
          <section id="usage" data-section="usage" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">3. 情報の利用目的</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>収集した個人情報は、以下の目的で利用いたします：</p>
              
              <div className="grid gap-4">
                {[
                  {
                    purpose: "サービス提供",
                    details: ["アカウント管理", "学習進捗管理", "AI機能提供", "個別化コンテンツ配信"],
                    color: "emerald"
                  },
                  {
                    purpose: "サポート・改善",
                    details: ["技術サポート", "サービス改善", "新機能開発", "品質向上"],
                    color: "blue"
                  },
                  {
                    purpose: "コミュニケーション",
                    details: ["重要通知", "アップデート情報", "マーケティング（同意時のみ）", "アンケート"],
                    color: "purple"
                  },
                  {
                    purpose: "法的義務",
                    details: ["法令遵守", "不正利用防止", "セキュリティ確保", "紛争解決"],
                    color: "red"
                  }
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-lg p-4`}>
                    <h5 className={`font-semibold text-${item.color}-300 mb-3`}>{item.purpose}</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {item.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-sm text-white/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. 情報の共有・提供 */}
          <section id="sharing" data-section="sharing" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">4. 情報の共有・提供</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません：</p>
              
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">法的要請がある場合</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 裁判所の命令</li>
                    <li>• 法執行機関からの要請</li>
                    <li>• 法令に基づく義務</li>
                  </ul>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">サービス提供に必要な場合</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 決済処理サービス（暗号化済み情報のみ）</li>
                    <li>• クラウドサービス（セキュリティ確保済み）</li>
                    <li>• 分析ツール（匿名化済み情報のみ）</li>
                  </ul>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-300 mb-2">お客様の同意がある場合</h4>
                  <p className="text-sm text-white/70">
                    明示的な同意をいただいた場合のみ、指定された第三者との情報共有を行います。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. セキュリティ保護 */}
          <section id="protection" data-section="protection" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">5. セキュリティ保護</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>
                当社は、お客様の個人情報を保護するため、業界最高水準のセキュリティ対策を実施しています。
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">技術的保護措置</h4>
                  <div className="space-y-3">
                    {[
                      { icon: Lock, title: "暗号化", desc: "AES-256による暗号化" },
                      { icon: Shield, title: "ファイアウォール", desc: "WAF・侵入検知システム" },
                      { icon: Database, title: "データベース", desc: "アクセス制御・監査ログ" },
                      { icon: Server, title: "インフラ", desc: "SOC2準拠データセンター" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-emerald-500/5 rounded-lg p-3">
                        <item.icon className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-emerald-300 text-sm">{item.title}</h5>
                          <p className="text-xs text-white/60">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">組織的保護措置</h4>
                  <div className="space-y-3">
                    {[
                      { icon: UserCheck, title: "アクセス管理", desc: "最小権限の原則" },
                      { icon: Book, title: "社員教育", desc: "定期的なセキュリティ研修" },
                      { icon: AlertTriangle, title: "インシデント対応", desc: "24時間監視体制" },
                      { icon: FileText, title: "監査", desc: "第三者セキュリティ監査" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-blue-500/5 rounded-lg p-3">
                        <item.icon className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-blue-300 text-sm">{item.title}</h5>
                          <p className="text-xs text-white/60">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Cookie・トラッキング */}
          <section id="cookies" data-section="cookies" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">6. Cookie・トラッキング</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>当サービスでは、以下のCookieを使用しています：</p>
              
              <div className="grid gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-300 mb-2">必須Cookie</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• ログイン状態維持</li>
                    <li>• セキュリティトークン</li>
                    <li>• 設定保存</li>
                  </ul>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">分析Cookie（任意）</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• サービス利用状況分析</li>
                    <li>• パフォーマンス改善</li>
                    <li>• ユーザー体験向上</li>
                  </ul>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">マーケティングCookie（任意）</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• パーソナライズド広告</li>
                    <li>• 効果測定</li>
                    <li>• リターゲティング</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">Cookie設定の変更</h4>
                    <p className="text-sm text-white/70">
                      ブラウザ設定からCookieを無効にできますが、一部機能が利用できなくなる場合があります。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. ユーザーの権利 */}
          <section id="rights" data-section="rights" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">7. ユーザーの権利</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>
                お客様は、ご自身の個人情報について以下の権利を有します。これらの権利行使をご希望の場合は、お問い合わせください。
              </p>
              
              <div className="grid gap-4">
                {[
                  {
                    right: "アクセス権",
                    description: "保有する個人情報の開示請求",
                    action: "データのダウンロード",
                    icon: Download,
                    color: "blue"
                  },
                  {
                    right: "修正権",
                    description: "不正確な情報の訂正請求",
                    action: "設定画面で変更可能",
                    icon: Settings,
                    color: "emerald"
                  },
                  {
                    right: "削除権",
                    description: "個人情報の削除請求",
                    action: "アカウント削除",
                    icon: Trash2,
                    color: "red"
                  },
                  {
                    right: "制限権",
                    description: "処理の制限請求",
                    action: "処理停止の申請",
                    icon: AlertTriangle,
                    color: "yellow"
                  },
                  {
                    right: "ポータビリティ権",
                    description: "データの移転請求",
                    action: "データエクスポート",
                    icon: ExternalLink,
                    color: "purple"
                  },
                  {
                    right: "異議申立権",
                    description: "処理への異議申立",
                    action: "お問い合わせから申請",
                    icon: Mail,
                    color: "orange"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 bg-${item.color}-500/20 rounded-lg`}>
                        <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">{item.right}</h5>
                        <p className="text-sm text-white/70 mb-2">{item.description}</p>
                        <span className={`inline-block px-3 py-1 bg-${item.color}-500/20 text-${item.color}-300 border border-${item.color}-500/30 text-xs rounded-full`}>
                          {item.action}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">権利行使について</h4>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• 権利行使は無料です</li>
                      <li>• 本人確認が必要な場合があります</li>
                      <li>• 原則として1ヶ月以内に対応いたします</li>
                      <li>• 法的根拠がある場合、対応できない場合があります</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. データ保持期間 */}
          <section id="retention" data-section="retention" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">8. データ保持期間</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>個人情報の保持期間は以下の通りです：</p>
              
              <div className="grid gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-300 mb-2">アカウント情報</h4>
                  <p className="text-sm text-white/70">アカウント削除まで、または最終ログインから3年間</p>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">学習データ</h4>
                  <p className="text-sm text-white/70">アカウント削除まで（バックアップは90日間保持）</p>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">サポート履歴</h4>
                  <p className="text-sm text-white/70">問い合わせ完了から1年間</p>
                </div>
                
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-300 mb-2">決済情報</h4>
                  <p className="text-sm text-white/70">税法要件により7年間（暗号化して保管）</p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. 国際データ転送 */}
          <section id="international" data-section="international" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Server className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">9. 国際データ転送</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>
                当サービスでは、以下の地域でデータを処理・保管しています：
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-300 mb-2">主要データセンター</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 日本（東京リージョン）</li>
                    <li>• シンガポール</li>
                    <li>• アイルランド（EU）</li>
                  </ul>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">保護措置</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• GDPR適正性認定済み地域</li>
                    <li>• 標準契約条項（SCC）適用</li>
                    <li>• 適切な技術的保護措置</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 10. ポリシー更新 */}
          <section id="updates" data-section="updates" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">10. ポリシー更新</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>
                本プライバシーポリシーは、法令の変更やサービスの改善に伴い更新される場合があります。
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">更新通知</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• 重要な変更時はメール通知</li>
                  <li>• サービス内での告知</li>
                  <li>• 30日前の事前通知</li>
                </ul>
              </div>
              
              <div className="text-sm text-white/60">
                最終更新日: 2025年1月20日
              </div>
            </div>
          </section>

          {/* 11. お問い合わせ */}
          <section id="contact" data-section="contact" className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">11. お問い合わせ</h2>
            </div>
            <div className="space-y-4 text-white/80">
              <p>プライバシーに関するお問い合わせは、以下のData Protection Officer（DPO）までご連絡ください：</p>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-2">株式会社Crypto AI Platform</h4>
                    <h5 className="font-semibold text-emerald-300 mb-2">データ保護責任者（DPO）</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        <span>privacy@crypto-ai-platform.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>受付時間: 平日 10:00-18:00</span>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-white/10" />
                  
                  <div>
                    <h5 className="font-semibold text-emerald-300 mb-2">個人情報保護委員会</h5>
                    <p className="text-sm text-white/60 mb-2">
                      当社の個人情報の取り扱いについて苦情や相談がある場合は、個人情報保護委員会にご相談いただけます。
                    </p>
                    <button className="px-4 py-2 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-500/10 transition-colors flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      個人情報保護委員会サイト
                    </button>
                  </div>
                  
                  <hr className="border-white/10" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      ※お問い合わせには2-3営業日でご返答いたします
                    </span>
                    <Link href="/contact" className="px-4 py-2 bg-emerald-500 rounded-lg text-white hover:bg-emerald-600 transition-colors flex items-center gap-2">
                      お問い合わせフォーム
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 最終セクション */}
          <section className="text-center py-12">
            <div className="glass-dark rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                プライバシーを最優先に
              </h3>
              <p className="text-white/70 mb-6">
                お客様のプライバシー保護を最重要事項として、<br />
                継続的にセキュリティとプライバシー保護の向上に努めてまいります。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                  安心してアカウント作成
                </Link>
                <Link href="/terms" className="px-8 py-3 glass border border-white/20 rounded-xl text-white font-medium hover:bg-white/10 transition-all">
                  利用規約を確認
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

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
                <li><Link href="/help" className="hover:text-white transition-colors">ヘルプセンター</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors text-blue-400">プライバシーポリシー</Link></li>
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