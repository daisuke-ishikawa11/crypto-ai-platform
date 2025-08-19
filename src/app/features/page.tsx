'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, Brain, Activity, Bell, BarChart3, Shield, TrendingUp, Volume2, Zap, Bot, Coins, BookOpen, Eye, Play } from 'lucide-react';
import { HomeButton } from '@/components/ui/home-button';

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link href="/features" className="text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full border-b-2 border-blue-400">機能</Link>
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
              aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              title={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div className={`lg:hidden fixed inset-x-0 top-20 mx-4 glass-dark rounded-2xl border border-white/10 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="p-6 space-y-4">
            <Link href="/features" className="block text-blue-400 hover:text-blue-300 font-medium transition-colors border-l-2 border-blue-400 pl-3">機能紹介</Link>
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
            {/* 機能バッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ 8つの最先端AI投資機能 • 全て統合されたプラットフォーム ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  最先端AI技術で
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  投資を革新する
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  8つの機能
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>学習から分析、リスク管理まで。</p>
                <p><span className="text-emerald-400 font-semibold"> プロ級の投資環境 </span>を<span className="text-blue-400"> 誰でも簡単に </span>体験。</p>
              </div>
            </div>

            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                <BookOpen className="w-6 h-6" />
                全機能を無料で体験
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link href="/demo" className="px-8 py-4 glass rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                <Play className="w-6 h-6" />
                機能デモを見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features-detail" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🚀 統合AI投資プラットフォーム
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              あなたの投資を成功に導く8つの最先端機能
            </p>
          </div>

          {/* メイン機能カードグリッド */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AIチャット学習</h3>
              <p className="text-white/70 mb-4">24時間いつでも気軽に質問・相談できるAI投資アドバイザー</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>リアルタイム市場分析</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>個別化学習プログラム</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>85レッスン体系カリキュラム</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">DeFiダッシュボードシステム</h3>
              <p className="text-white/70 mb-4">150+のプロトコルをリアルタイム監視とTVL追跡</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>イールドファーミング機会検出</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>流動性プール収益率分析</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>スマートコントラクトリスク評価</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">スマートアラート</h3>
              <p className="text-white/70 mb-4">価格変動・リスク・技術指標の自動通知システム</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>AI予測アラート</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>カスタマイズ可能通知条件</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>マルチチャンネル通知</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI分析エンジン</h3>
              <p className="text-white/70 mb-4">GPT-4とClaude-3による高度な市場分析と予測</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>センチメント分析</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>オンチェーンデータ深層分析</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>機関投資家動向分析</span>
                </div>
              </div>
            </div>
          </div>

          {/* 追加機能セクション */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">リスク監視</h3>
              <p className="text-white/70 mb-4">包括的リスク評価とアラートシステム</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>ポートフォリオリスク評価</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>VaR計算とストレステスト</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">技術指標分析</h3>
              <p className="text-white/70 mb-4">RSI、MACD、移動平均線など50種類以上の指標</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>カスタムインジケーター作成</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>バックテスト機能</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ボリューム分析</h3>
              <p className="text-white/70 mb-4">取引量パターンと異常検知システム</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>クジラの動き検出</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>ボリュームプロファイル分析</span>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-2xl hover:scale-105 transition-transform group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">パーソナライズ学習</h3>
              <p className="text-white/70 mb-4">個人の学習進度に合わせたコンテンツ推奨</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>AI学習進度最適化</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>実践シミュレーション環境</span>
                </div>
              </div>
            </div>
          </div>

          {/* 統計・実績セクション */}
          <div className="glass-dark rounded-3xl p-12 text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">
              🎯 プラットフォーム実績
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  50,000+
                </div>
                <p className="text-white/70">アクティブユーザー</p>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  87.3%
                </div>
                <p className="text-white/70">AI予測精度</p>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  85
                </div>
                <p className="text-white/70">学習レッスン数</p>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <p className="text-white/70">監視プロトコル</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass rounded-3xl p-12 text-center border border-white/20">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🎯 今すぐ始めて、<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> 投資レベルを上げよう</span>
              </h2>
              <p className="text-xl text-white/60">
                全8機能を無料で体験。あなたの投資を次のレベルへ。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  全機能を無料で始める
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/pricing" className="px-8 py-4 glass border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Activity className="w-6 h-6" />
                  料金プランを見る
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-white/60 pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>SSL暗号化</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>個人情報保護</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>無料機能豊富</span>
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
                <li><Link href="/features" className="hover:text-white transition-colors text-blue-400">機能紹介</Link></li>
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
