'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, Scale, Shield, FileText, CheckCircle, AlertTriangle, Book, Users, Lock, Gavel, Mail } from 'lucide-react';

export default function TermsPage() {
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
    { id: 'acceptance', title: '1. 利用規約の承諾', icon: CheckCircle },
    { id: 'definitions', title: '2. 定義', icon: Book },
    { id: 'services', title: '3. サービス内容', icon: FileText },
    { id: 'user-accounts', title: '4. ユーザーアカウント', icon: Users },
    { id: 'usage-rules', title: '5. 利用規則', icon: Shield },
    { id: 'intellectual-property', title: '6. 知的財産権', icon: Lock },
    { id: 'disclaimers', title: '7. 免責事項', icon: AlertTriangle },
    { id: 'liability', title: '8. 責任の制限', icon: Scale },
    { id: 'contact', title: '9. お問い合わせ', icon: Mail }
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
            {/* 利用規約バッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-blue-500/30">
              <Scale className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-100">
                ✨ 透明性・公平性を重視 • 最終更新: 2025年1月20日 ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  利用規約
                </span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Terms of Service
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>安心してサービスをご利用いただくための</p>
                <p><span className="text-blue-400 font-semibold"> 透明で公正 </span>な<span className="text-purple-400"> 利用条件 </span>をご案内します。</p>
              </div>
            </div>

            {/* 原則 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-3 bg-blue-500/20 rounded-full w-fit mx-auto mb-3">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">透明性</h3>
                <p className="text-sm text-white/60">明確で理解しやすい規約</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-purple-500/20 rounded-full w-fit mx-auto mb-3">
                  <Scale className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">公平性</h3>
                <p className="text-sm text-white/60">すべてのユーザーに平等</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-emerald-500/20 rounded-full w-fit mx-auto mb-3">
                  <Lock className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">安全性</h3>
                <p className="text-sm text-white/60">個人情報の厳重な保護</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="relative flex gap-8 max-w-7xl mx-auto px-6 pb-20">
        {/* 目次サイドバー */}
        <aside className="hidden lg:block w-80 sticky top-24 h-fit">
          <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              目次
            </h3>
            <nav className="space-y-1">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 rounded-lg flex items-center gap-3 ${
                    activeSection === item.id
                      ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400'
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

        {/* メインコンテンツ */}
        <main className="flex-1 space-y-12">
          {/* セクション1: 利用規約の承諾 */}
          <section id="acceptance" data-section="acceptance" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              1. 利用規約の承諾
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                本利用規約（以下「本規約」）は、株式会社Crypto AI Platform（以下「当社」）が提供するCrypto AI Platform（以下「本サービス」）の利用条件を定めるものです。
              </p>
              <p>
                本サービスをご利用になる場合には、本規約に同意していただく必要があります。本規約に同意いただけない場合、本サービスはご利用いただけません。
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-2">重要事項</h4>
                    <p className="text-sm text-white/70">
                      アカウント作成時に本規約への同意が必要です。同意後も定期的に規約の更新をご確認ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* セクション2: 定義 */}
          <section id="definitions" data-section="definitions" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Book className="w-6 h-6 text-blue-400" />
              2. 定義
            </h2>
            <div className="space-y-4 text-white/80">
              <p>本規約において使用する用語の定義は以下のとおりです：</p>
              <div className="grid gap-4">
                {[
                  { term: "当社", definition: "株式会社Crypto AI Platformを指します。" },
                  { term: "ユーザー", definition: "本サービスを利用する個人または法人を指します。" },
                  { term: "本サービス", definition: "当社が提供するCrypto AI Platformおよび関連するすべてのサービスを指します。" },
                  { term: "AI機能", definition: "GPT-4、Claude-3等のAI技術を活用した投資分析・学習支援機能を指します。" },
                  { term: "学習コンテンツ", definition: "85レッスンの投資学習カリキュラムおよび関連教材を指します。" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-2">「{item.term}」</h4>
                    <p className="text-sm text-white/70">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* セクション3: サービス内容 */}
          <section id="services" data-section="services" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-400" />
              3. サービス内容
            </h2>
            <div className="space-y-4 text-white/80">
              <p>当社は、以下のサービスを提供します：</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "AI投資学習", desc: "85レッスンの体系的な投資教育コンテンツ", icon: "🎓" },
                  { title: "AIチャット機能", desc: "24時間365日利用可能な投資相談AI", icon: "💬" },
                  { title: "DeFiダッシュボードシステム", desc: "分散型金融プロトコルのリアルタイムダッシュボード", icon: "📊" },
                  { title: "スマートアラート", desc: "市場変動の即座通知機能", icon: "🔔" },
                  { title: "AI分析エンジン", desc: "高度な市場分析とレポート生成", icon: "📊" },
                  { title: "リスク管理機能", desc: "ポートフォリオリスク評価・管理", icon: "🛡️" }
                ].map((service, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{service.title}</h4>
                        <p className="text-sm text-white/70">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">重要な注意事項</h4>
                    <p className="text-sm text-white/70">
                      本サービスは教育目的であり、投資助言や金融商品の勧誘を行うものではありません。投資判断は必ずお客様自身の責任で行ってください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* セクション4: ユーザーアカウント */}
          <section id="user-accounts" data-section="user-accounts" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-emerald-400" />
              4. ユーザーアカウント
            </h2>
            <div className="space-y-4 text-white/80">
              <h4 className="font-semibold text-white">4.1 アカウント作成</h4>
              <p>
                本サービスをご利用いただくには、ユーザーアカウントの作成が必要です。アカウント作成時には、正確な情報を提供してください。
              </p>
              
              <h4 className="font-semibold text-white">4.2 アカウント管理責任</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>ユーザーIDとパスワードの適切な管理</li>
                <li>第三者によるアカウントの不正使用防止</li>
                <li>アカウント情報の最新性維持</li>
                <li>不正アクセスの疑いがある場合の即座の報告</li>
              </ul>

              <h4 className="font-semibold text-white">4.3 利用資格</h4>
              <p>
                18歳以上の個人または適切な権限を有する法人のみが本サービスをご利用いただけます。
              </p>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">セキュリティ推奨事項</h4>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• 強固なパスワードの設定（8文字以上、英数字・記号を含む）</li>
                      <li>• 2段階認証の有効化（推奨）</li>
                      <li>• 定期的なパスワード変更</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* セクション5: 利用規則 */}
          <section id="usage-rules" data-section="usage-rules" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-400" />
              5. 利用規則
            </h2>
            <div className="space-y-4 text-white/80">
              <h4 className="font-semibold text-white">5.1 禁止行為</h4>
              <p>ユーザーは以下の行為を行ってはなりません：</p>
              
              <div className="grid gap-3">
                {[
                  "法令または公序良俗に反する行為",
                  "当社または第三者の知的財産権を侵害する行為", 
                  "本サービスの運営を妨害する行為",
                  "コンピューターウイルス等の送信・拡散",
                  "大量のデータ送信等によるサーバーへの過負荷",
                  "他のユーザーに迷惑をかける行為",
                  "虚偽の情報を登録・送信する行為",
                  "営利目的での本サービスの利用（事前承諾なく）"
                ].map((rule, index) => (
                  <div key={index} className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{rule}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-white">5.2 違反時の措置</h4>
              <p>
                利用規則に違反した場合、当社は事前の通知なくアカウントの停止・削除、サービス利用の制限等の措置を講じることがあります。
              </p>
            </div>
          </section>

          {/* セクション6: 知的財産権 */}
          <section id="intellectual-property" data-section="intellectual-property" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-400" />
              6. 知的財産権
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                本サービス及び本サービスに含まれるコンテンツ（プログラム、テキスト、画像、音声、動画、デザイン等）に関する著作権、特許権、商標権、営業秘密等の知的財産権は、当社または正当な権利者に帰属します。
              </p>
              
              <h4 className="font-semibold text-white">6.1 利用許諾</h4>
              <p>
                当社は、ユーザーに対し、本規約に従って本サービスを利用する限りにおいて、非独占的な利用権を許諾します。
              </p>

              <h4 className="font-semibold text-white">6.2 制限事項</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>学習コンテンツの無断複製・再配布</li>
                <li>AI機能の技術的解析・模倣</li>
                <li>商標・ロゴの無断使用</li>
                <li>競合サービスでの利用</li>
              </ul>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">知的財産権の保護</h4>
                    <p className="text-sm text-white/70">
                      当社は知的財産権を厳格に保護しています。無断使用を発見した場合は、法的措置を講じる場合があります。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* セクション7: 免責事項 */}
          <section id="disclaimers" data-section="disclaimers" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              7. 免責事項
            </h2>
            <div className="space-y-4 text-white/80">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">投資に関する免責</h4>
                    <p className="text-sm text-white/70">
                      本サービスは教育・情報提供を目的としており、投資助言・勧誘ではありません。投資判断・投資結果については一切責任を負いません。
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-white">7.1 サービス内容について</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>情報の正確性・完全性・最新性の保証なし</li>
                <li>AI分析結果の精度に関する保証なし</li>
                <li>サービス継続性の保証なし</li>
                <li>第三者サービス連携における障害の責任なし</li>
              </ul>

              <h4 className="font-semibold text-white">7.2 技術的事項について</h4>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>システム障害・メンテナンスによるサービス中断</li>
                <li>インターネット環境による接続不良</li>
                <li>ユーザー端末環境による表示・動作の不具合</li>
                <li>セキュリティインシデントによる影響</li>
              </ul>
            </div>
          </section>

          {/* セクション8: 責任の制限 */}
          <section id="liability" data-section="liability" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Scale className="w-6 h-6 text-blue-400" />
              8. 責任の制限
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                当社の債務不履行または不法行為により、ユーザーに損害が生じた場合、当社が負う損害賠償責任の総額は、直近12ヶ月間にユーザーが当社に支払った利用料金の総額を上限とします。
              </p>
              <p>
                なお、当社は、付随的損害、間接損害、特別損害、将来の損害及び逸失利益については、損害の予見可能性の有無にかかわらず、一切責任を負いません。
              </p>
            </div>
          </section>

          {/* セクション9: お問い合わせ */}
          <section id="contact" data-section="contact" className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-emerald-400" />
              9. お問い合わせ
            </h2>
            <div className="space-y-4 text-white/80">
              <p>本規約に関するお問い合わせは、以下までご連絡ください：</p>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-2">株式会社Crypto AI Platform</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        <span>legal@crypto-ai-platform.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-emerald-400">📞</span>
                        <span>受付時間: 平日 10:00-18:00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">
                        ※お問い合わせには2-3営業日でご返答いたします
                      </span>
                      <Link href="/contact" className="px-4 py-2 bg-emerald-500 rounded-xl text-white font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2">
                        お問い合わせフォーム
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 最終案内 */}
          <section className="text-center py-12">
            <div className="glass p-8 rounded-3xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                ご利用ありがとうございます
              </h3>
              <p className="text-white/70 mb-6">
                本規約をお読みいただき、ありがとうございます。<br />
                安心・安全にサービスをご利用いただけるよう努めてまいります。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                  アカウント作成
                </Link>
                <Link href="/privacy" className="px-6 py-3 glass border border-white/20 rounded-xl text-white font-medium hover:bg-white/10 transition-all">
                  プライバシーポリシー
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
                <li><Link href="/terms" className="hover:text-white transition-colors text-blue-400">利用規約</Link></li>
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