'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight, Menu, Mail, Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, User, FileText, AlertCircle, Shield } from 'lucide-react';
import { HomeButton } from '@/components/ui/home-button';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const contactMethods = [
    {
      icon: Mail,
      title: 'メールサポート',
      value: 'support@crypto-ai-platform.com',
      description: '24時間以内にご返答いたします',
      color: 'blue'
    },
    {
      icon: MessageCircle,
      title: 'ライブチャット',
      value: 'リアルタイムサポート',
      description: '平日 9:00-18:00 対応',
      color: 'emerald'
    },
    {
      icon: Phone,
      title: '電話サポート',
      value: '0120-XXX-XXX',
      description: '緊急時・重要案件対応',
      color: 'purple'
    },
    {
      icon: MapPin,
      title: 'オフィス',
      value: '東京都渋谷区',
      description: '事前予約で対面相談可能',
      color: 'orange'
    }
  ];

  const faqCategories = [
    { value: 'general', label: '一般的なお問い合わせ' },
    { value: 'technical', label: '技術的な問題' },
    { value: 'billing', label: '料金・支払いについて' },
    { value: 'feature', label: '機能・サービスについて' },
    { value: 'partnership', label: 'パートナーシップ' },
    { value: 'other', label: 'その他' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // フォーム送信のシミュレーション
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {/* お問い合わせバッジ */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border border-emerald-500/30">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-100">
                ✨ 24時間サポート • 専門スタッフが迅速対応 ✨
              </span>
            </div>

            {/* メインタイトル */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  お問い合わせ
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  サポート
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  センター
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto space-y-2">
                <p>どんな小さなことでもお気軽に。</p>
                <p><span className="text-emerald-400 font-semibold"> 専門スタッフ </span>が<span className="text-blue-400"> 迅速・丁寧 </span>にサポートします。</p>
              </div>
            </div>

            {/* サポート統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  24時間
                </div>
                <p className="text-white/70">対応時間</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  &lt;2時間
                </div>
                <p className="text-white/70">平均回答時間</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <p className="text-white/70">解決率</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  4.9/5
                </div>
                <p className="text-white/70">満足度</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 連絡手段セクション */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              📞 ご連絡方法
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              お客様のご都合に合わせて、様々な方法でサポートいたします
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div key={index} className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r from-${method.color}-500 to-${method.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-lg font-semibold text-blue-300 mb-2">{method.value}</p>
                <p className="text-white/70 mb-4">{method.description}</p>
                <button className={`w-full px-4 py-2 rounded-xl text-white font-medium transition-all bg-gradient-to-r from-${method.color}-500 to-${method.color}-600 hover:scale-105`}>
                  {method.title === 'メールサポート' ? 'メールを送る' :
                   method.title === 'ライブチャット' ? 'チャット開始' :
                   method.title === '電話サポート' ? '電話をかける' : 'アクセス方法'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                📝 お問い合わせフォーム
              </h2>
              <p className="text-xl text-white/70">
                詳細なお問い合わせは下記フォームからお送りください
              </p>
            </div>

            <div className="glass-dark p-8 rounded-3xl">
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">送信完了しました</h3>
                  <p className="text-white/70 mb-6">
                    お問い合わせありがとうございます。<br />
                    24時間以内にご返答いたします。
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-3 bg-emerald-500 rounded-xl text-white font-medium hover:bg-emerald-600 transition-colors"
                  >
                    新しい問い合わせを送信
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        お名前 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="山田太郎"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        メールアドレス *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your-email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                        お問い合わせの種類 *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {faqCategories.map((category) => (
                          <option key={category.value} value={category.value} className="bg-slate-800">
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
                        優先度
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low" className="bg-slate-800">低</option>
                        <option value="normal" className="bg-slate-800">普通</option>
                        <option value="high" className="bg-slate-800">高</option>
                        <option value="urgent" className="bg-slate-800">緊急</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      件名 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="お問い合わせの件名をご入力ください"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      お問い合わせ内容 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="詳細をお聞かせください..."
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <div className="text-sm text-white/80">
                      お客様の個人情報は適切に保護され、サポート目的以外には使用されません。
                      <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline ml-1">
                        プライバシーポリシー
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl text-white font-bold text-lg glow-animation hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        送信中...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        お問い合わせを送信
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問セクション */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-dark p-8 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                💡 お急ぎの場合は
              </h3>
              <p className="text-white/70 mb-6">
                よくある質問もご確認ください
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/help" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-white mb-1">よくある質問</h4>
                  <p className="text-sm text-white/70">即座に答えが見つかるかも</p>
                </Link>
                <Link href="/how-to" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <User className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-white mb-1">使い方ガイド</h4>
                  <p className="text-sm text-white/70">ステップバイステップ解説</p>
                </Link>
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
                <li><Link href="/how-to" className="hover:text-white transition-colors">使い方ガイド</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/help" className="hover:text-white transition-colors">ヘルプセンター</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors text-blue-400">お問い合わせ</Link></li>
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
