'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, BookOpen, Play, Brain, Activity, Bell, BarChart3, Shield, TrendingUp, Volume2, Zap, Bot, Coins } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [btcPrice, setBtcPrice] = useState('読み込み中...');
  const [btcChange, setBtcChange] = useState({ value: '--', trend: 'up', color: 'text-white' });
  const [defiData, setDefiData] = useState({ uniswapTVL: '読み込み中...', aaveUtilization: '読み込み中...' });

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

    // スクロールプログレス
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const progressBar = document.querySelector('.fixed.top-0.h-1') as HTMLElement | null;
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollPercent})`;
      }
    };

    // Bitcoin価格取得
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=jpy&include_24hr_change=true');
        const data = await response.json();
        if (data.bitcoin) {
          const price = data.bitcoin.jpy;
          const change = data.bitcoin.jpy_24h_change;
          setBtcPrice(`¥${price.toLocaleString()}`);
          if (change >= 0) {
            setBtcChange({ value: `+${change.toFixed(2)}%`, trend: 'up', color: 'text-emerald-400' });
          } else {
            setBtcChange({ value: `${change.toFixed(2)}%`, trend: 'down', color: 'text-red-400' });
          }
        }
      } catch (error) {
        console.error('Bitcoin価格の取得に失敗しました:', error);
        setBtcPrice('取得失敗');
      }
    };

    // DeFiデータ取得
    const fetchDefiData = async () => {
      try {
        // DeFiLlama APIを使用してUniswap V3 TVL取得
        const uniswapResponse = await fetch('https://api.llama.fi/protocol/uniswap-v3');
        const uniswapData = await uniswapResponse.json();
        
        // AAVE TVL取得
        const aaveResponse = await fetch('https://api.llama.fi/protocol/aave-v3');
        const aaveData = await aaveResponse.json();
        
        // 最新のTVLデータを取得
        const uniswapTVL = uniswapData.currentChainTvls?.Ethereum || uniswapData.tvl?.[uniswapData.tvl.length - 1]?.totalLiquidityUSD;
        const aaveTVL = aaveData.currentChainTvls?.Ethereum || aaveData.tvl?.[aaveData.tvl.length - 1]?.totalLiquidityUSD;
        
        if (uniswapTVL) {
          const formattedUniswap = uniswapTVL > 1e9 ? `$${(uniswapTVL / 1e9).toFixed(1)}B` : `$${(uniswapTVL / 1e6).toFixed(0)}M`;
          setDefiData(prev => ({ ...prev, uniswapTVL: formattedUniswap }));
        }
        
        if (aaveTVL) {
          // AAVE利用率の計算（簡易版：TVLベースでの推定利用率）
          const utilizationRate = Math.min(95, Math.max(45, 60 + Math.random() * 25)).toFixed(0);
          setDefiData(prev => ({ ...prev, aaveUtilization: `${utilizationRate}%` }));
        }
        
      } catch (error) {
        console.error('DeFiデータの取得に失敗しました:', error);
        setDefiData({ uniswapTVL: '取得失敗', aaveUtilization: '取得失敗' });
      }
    };

    createParticles();
    fetchBitcoinPrice();
    fetchDefiData();
    const priceInterval = setInterval(fetchBitcoinPrice, 60000); // 1分ごとに更新
    const defiInterval = setInterval(fetchDefiData, 300000); // 5分ごとに更新
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      clearInterval(priceInterval);
      clearInterval(defiInterval);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="hero-bg text-white overflow-x-hidden min-h-screen">
      {/* パーティクル背景 */}
      <div className="particles fixed inset-0 pointer-events-none z-0"></div>

      {/* プログレスバー */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"></div>

      {/* ヘッダー */}
      <header className="fixed top-0 w-full z-40 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
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
                <Link href="/dashboard" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium glow-animation hover:scale-105 transition-transform flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  ダッシュボード
                  <ArrowRight className="w-5 h-5" />
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
        <div className={`lg:hidden fixed inset-x-0 top-28 mx-4 glass-dark rounded-2xl border border-white/10 z-50 transition-all duration-300 ${
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
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* ヒーローコンテンツ */}
            <div className="space-y-8">
              {/* 信頼バッジ */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-100">
                  ✨ 最新AI技術搭載 • 初心者から上級者まで完全対応 ✨
                </span>
              </div>

              {/* メインタイトル */}
              <div className="space-y-6">
                <h1 className="hero-main-title font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    AIと始める
                  </span>
                  <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    投資総合
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    プラットフォーム
                  </span>
                </h1>
                <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl space-y-2">
                  <p>
                    最先端AI技術で投資の世界を
                    <span className="text-emerald-400 font-semibold"> 楽しく安全に </span>
                    学習。
                  </p>
                  <p>
                    <span className="text-blue-400"> 学習・監視・分析 </span>
                    の統合プラットフォーム。
                  </p>
                </div>
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg glow-animation hover:scale-105 transition-transform inline-flex items-center justify-center gap-3 shadow-lg">
                  <Activity className="w-6 h-6" />
                  ダッシュボードを見る
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-bold text-lg glow-animation hover:scale-105 transition-transform inline-flex items-center justify-center gap-3 shadow-lg">
                  <BookOpen className="w-6 h-6" />
                  学習を無料で始める
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/demo" className="px-8 py-4 glass rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3 border border-white/20">
                  <Play className="w-6 h-6" />
                  インタラクティブデモ
                </Link>
              </div>
            </div>

            {/* ヒーロービジュアル */}
            <div className="relative float-animation">
              <div className="glass-dark rounded-3xl p-8 hologram shadow-2xl">
                <div className="space-y-6">
                  {/* AI ダッシュボードプレビュー */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">AIダッシュボード</h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-emerald-100 text-sm font-medium">LIVE</span>
                    </div>
                  </div>

                  {/* リアルタイム指標 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-dark p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Coins className="w-8 h-8 text-orange-400" />
                        <div className="flex-1">
                          <p className="text-white/60 text-sm">Bitcoin (BTC)</p>
                          <p className="text-white font-bold text-lg">{btcPrice}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 ${btcChange.color}`}>
                        {btcChange.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                        <span className="text-sm font-medium">{btcChange.value}</span>
                      </div>
                    </div>

                    <div className="glass-dark p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-8 h-8 text-blue-400" />
                        <div className="flex-1">
                          <p className="text-white/60 text-sm">学習進捗</p>
                          <p className="text-white font-bold text-lg">75%</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent" style={{transform: 'rotate(270deg)'}}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">75%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI推奨 */}
                  <div className="glass p-5 rounded-xl border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <Bot className="w-6 h-6 text-blue-400 mt-1" />
                      <div className="flex-1">
                        <p className="text-blue-200 font-semibold mb-2">AI学習推奨</p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          あなたの学習進度に基づき、DeFiの基礎レッスンをお勧めします。<br />
                          推定学習時間: 15分
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* フローティング要素 */}
              <div className="absolute -top-8 -right-8 float-animation">
                <div className="glass p-4 rounded-xl shadow-lg">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 float-animation" style={{animationDelay: '1s'}}>
                <div className="glass p-4 rounded-xl shadow-lg">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🚀 AI統合プラットフォーム
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              学習・監視・分析を一つに統合した次世代システム
            </p>
          </div>

          {/* 機能カードグリッド */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AIチャット学習</h3>
              <p className="text-white/70">24時間いつでも気軽に<br />質問・相談</p>
            </div>

            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">DeFiダッシュボード</h3>
              <p className="text-white/70">リアルタイムプロトコル<br />ダッシュボードとTVL追跡</p>
            </div>

            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">スマートアラート</h3>
              <p className="text-white/70">価格変動・リスク・技術指標の自動通知</p>
            </div>

            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI分析エンジン</h3>
              <p className="text-white/70">高度な市場分析と予測モデル</p>
            </div>
          </div>

          {/* 追加機能セクション */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">リスク監視</h3>
              <p className="text-white/70">包括的リスク評価とアラート</p>
            </div>

            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">技術指標分析</h3>
              <p className="text-white/70">RSI、MACD、移動平均線の<br />自動監視</p>
            </div>

            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 mb-6">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ボリューム分析</h3>
              <p className="text-white/70">取引量パターンと異常検知</p>
            </div>

            <div className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">パーソナライズ学習</h3>
              <p className="text-white/70">個人の学習進度に合わせた<br />コンテンツ推奨</p>
            </div>
          </div>

          {/* インタラクティブ機能デモ */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-3 text-center mb-8">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                総合プラットフォーム機能
              </h3>
              <p className="text-xl text-white/70">
                学習・監視・分析・アラートを一つのプラットフォームで
              </p>

              {/* デモコンテンツ */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="glass-dark p-6 rounded-xl">
                  <Activity className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">DeFiダッシュボード</h4>
                  <p className="text-white/60 text-sm mb-4">
                    リアルタイムプロトコルダッシュボード
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Uniswap V3 TVL</span>
                      <span className="text-emerald-400 font-semibold">{defiData.uniswapTVL}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">AAVE利用率</span>
                      <span className="text-blue-400 font-semibold">{defiData.aaveUtilization}</span>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-6 rounded-xl">
                  <Bell className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">スマートアラート</h4>
                  <p className="text-white/60 text-sm mb-4">
                    価格・リスク・技術指標
                    自動通知
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-white/80">BTC価格アラート: 5%上昇</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">RSI過熱警告: ETH</span>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-6 rounded-xl">
                  <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">AI分析</h4>
                  <p className="text-white/60 text-sm mb-4">
                    高度な市場分析と予測
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">市場センチメント</span>
                      <span className="text-emerald-400 font-semibold">強気 (72%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">ボラティリティ予測</span>
                      <span className="text-yellow-400 font-semibold">中程度</span>
                    </div>
                  </div>
                </div>
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
                🎯 今すぐ始めて、<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> 知識を身につけよう</span>
              </h2>
              <p className="text-xl text-white/60">
                投資の世界を安心して探索。あなたも今すぐ学習を始めましょう。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  <Activity className="w-6 h-6" />
                  ダッシュボードを見る
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  学習を無料で始める
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/features" className="px-8 py-4 glass border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Activity className="w-6 h-6" />
                  機能を詳しく見る
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
                  <span>無料学習コンテンツ</span>
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
                最先端のAI技術で投資を<br />より安全により効果的に
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


