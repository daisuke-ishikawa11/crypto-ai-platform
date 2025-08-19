"use client"

import Link from "next/link"
import * as React from "react"
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Trophy, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  Brain,
  BarChart3,
  Sparkles,
  Clock,
  Award,
  ChevronDown,
  Play,
  Menu,
  X,
  MessageCircle,
  Lock,
  Cpu,
  Coins,
  LineChart,
  PieChart,
  BookOpen,
  Bot,
  Wallet,
  AlertCircle,
  Check,
  ChevronRight
} from "lucide-react"

// コンポーネント: 数値カウントアップアニメーション
function CountUp({ end, duration = 2, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isVisible])

  return <div ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</div>
}

// FAQ項目データ
const faqItems = [
  {
    question: "暗号通貨の知識がなくても使えますか？",
    answer: "はい、もちろんです！85レッスンの体系的な学習コンテンツで、基礎から高度な戦略まで段階的に学べます。AIアシスタントが24時間サポートします。"
  },
  {
    question: "どのような暗号通貨に対応していますか？",
    answer: "Bitcoin、Ethereum、主要なアルトコインを含む100以上の暗号通貨に対応。DeFiトークンやNFTの分析も可能です。"
  },
  {
    question: "無料プランでどこまで使えますか？",
    answer: "AIチャット5回/日、基本的な市場データ、ポートフォリオ管理、全85レッスンの学習コンテンツが無料でご利用いただけます。"
  },
  {
    question: "セキュリティは大丈夫ですか？",
    answer: "エンタープライズグレードのセキュリティを採用。Supabaseによる認証、暗号化通信、定期的なセキュリティ監査を実施しています。"
  }
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("ai")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
      {/* モダンなヘッダー */}
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CryptoAI Platform
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                機能
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                使い方
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                料金
              </Link>
              <Link href="/learning" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                学習
              </Link>
              <div className="flex gap-3">
                <Link href="/auth/login">
                  <button className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    ログイン
                  </button>
                </Link>
                <Link href="/auth/register">
                  <motion.button 
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    無料で始める
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              className="lg:hidden bg-white border-t shadow-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                <Link 
                  href="#features" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  機能
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  使い方
                </Link>
                <Link 
                  href="#pricing" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  料金
                </Link>
                <Link 
                  href="/learning" 
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  学習
                </Link>
                <div className="pt-4 space-y-3 border-t">
                  <Link href="/auth/login" className="block">
                    <button className="w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      ログイン
                    </button>
                  </Link>
                  <Link href="/auth/register" className="block">
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      無料で始める
                    </button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ヒーローセクション */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* 背景アニメーション */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* トラストバッジ */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">エンタープライズセキュリティ認証済み</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AIが導く、
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  次世代の暗号通貨投資
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                GPT-4とClaudeを搭載した最先端AIが、あなたの投資戦略を24時間サポート。
                初心者から上級者まで、安全で効果的な暗号通貨投資を実現します。
              </p>

              {/* CTA ボタン */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/auth/register">
                  <motion.button 
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="h-5 w-5" />
                    無料で始める
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="#demo">
                  <motion.button 
                    className="px-8 py-4 bg-white border-2 border-gray-200 rounded-full font-semibold hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-5 w-5 text-blue-600" />
                    デモを見る
                  </motion.button>
                </Link>
              </div>

              {/* ソーシャルプルーフ */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    <strong className="text-gray-900">10,000+</strong> アクティブユーザー
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-1">4.9/5.0</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ヒーロー画像/アニメーション */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
                {/* ダッシュボードプレビュー */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">ポートフォリオ概要</h3>
                    <span className="text-2xl font-bold text-green-600">+24.5%</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Coins className="h-8 w-8 text-orange-500" />
                        <div>
                          <p className="font-medium">Bitcoin</p>
                          <p className="text-sm text-gray-500">2.45 BTC</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">¥15,234,500</p>
                        <p className="text-sm text-green-600">+5.2%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Coins className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">Ethereum</p>
                          <p className="text-sm text-gray-500">15.8 ETH</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">¥4,567,890</p>
                        <p className="text-sm text-green-600">+8.7%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* フローティング要素 */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Bot className="h-6 w-6 text-blue-600" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 信頼性指標 - よりモダンなデザイン */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              圧倒的な実績が証明する信頼性
            </h2>
            <p className="text-xl text-blue-100">業界トップクラスの成果を数字で実証</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                <CountUp end={47328} suffix="+" />
              </div>
              <p className="text-blue-100 font-medium">成功した投資家</p>
            </motion.div>
            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                <CountUp end={2340} prefix="¥" suffix="B+" />
              </div>
              <p className="text-blue-100 font-medium">運用資産総額</p>
            </motion.div>
            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                +<CountUp end={245} suffix="%" />
              </div>
              <p className="text-blue-100 font-medium">平均年間収益率</p>
            </motion.div>
            <motion.div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                99.97%
              </div>
              <p className="text-blue-100 font-medium">AI予測精度</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 機能紹介（タブ式） */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              投資を成功に導く強力な機能
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              最新のAI技術と包括的な分析ツールで、あなたの投資判断をサポート
            </p>
          </motion.div>

          {/* タブナビゲーション */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "ai", label: "AI分析", icon: Brain },
              { id: "portfolio", label: "ポートフォリオ", icon: PieChart },
              { id: "alerts", label: "スマートアラート", icon: AlertCircle },
              { id: "learning", label: "学習システム", icon: BookOpen }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* タブコンテンツ */}
          <AnimatePresence mode="wait">
            {activeTab === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    GPT-4 & Claude搭載の最先端AI分析
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "24時間365日対応のAIアシスタント",
                      "市場トレンドのリアルタイム分析",
                      "個別銘柄の詳細な投資判断サポート",
                      "リスク評価と最適化提案",
                      "日本語での自然な対話"
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/ai/chat">
                    <motion.button 
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      AIチャットを試す
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6">
                    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Bot className="h-8 w-8 text-blue-600" />
                        <span className="font-semibold text-lg">AI アシスタント</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">あなた</p>
                        <p className="text-gray-800">ビットコインの今後の見通しを教えて</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-600 mb-2">AI</p>
                        <p className="text-gray-800">現在のビットコインは強気相場にあります。技術的指標とオンチェーンデータから、今後も上昇トレンドが継続する可能性が高いと分析しています...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h4 className="font-semibold text-lg mb-4">最適化されたポートフォリオ</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Bitcoin (BTC)</span>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">35%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-500 rounded-full" style={{width: '35%'}} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Ethereum (ETH)</span>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">25%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{width: '25%'}} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">その他アルトコイン</span>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">40%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full" style={{width: '40%'}} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>AI推奨:</strong> 現在の市場状況では、リスク分散のためアルトコインの比率を高めることを推奨します。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    AIが最適化するポートフォリオ管理
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "独自の相構造分析による資産配分最適化",
                      "リアルタイムのリバランス提案",
                      "リスク許容度に基づくカスタマイズ",
                      "税務最適化を考慮した売買提案",
                      "パフォーマンス詳細レポート"
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/portfolio/optimize">
                    <motion.button 
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ポートフォリオを最適化
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}

            {activeTab === "alerts" && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    重要な瞬間を逃さないスマートアラート
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "価格変動アラート（上昇・下落）",
                      "ボリューム異常検知",
                      "テクニカル指標シグナル",
                      "ニュース＆ソーシャルセンチメント",
                      "DeFiプロトコルリスク警告"
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <motion.button 
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      アラートを設定
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
                <div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6">
                    <div className="space-y-3">
                      <motion.div 
                        className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="p-2 bg-red-100 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">BTC 急騰アラート</p>
                          <p className="text-sm text-gray-600">5分間で+3.5%の上昇</p>
                        </div>
                        <span className="text-xs text-gray-500">2分前</span>
                      </motion.div>
                      <motion.div 
                        className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">DeFi リスク検知</p>
                          <p className="text-sm text-gray-600">Compound TVL 20%減少</p>
                        </div>
                        <span className="text-xs text-gray-500">15分前</span>
                      </motion.div>
                      <motion.div 
                        className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MessageCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">ソーシャルトレンド</p>
                          <p className="text-sm text-gray-600">ETH言及数が急増中</p>
                        </div>
                        <span className="text-xs text-gray-500">30分前</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "learning" && (
              <motion.div
                key="learning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        学習進捗
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">投資基礎</span>
                            <span className="text-sm text-gray-600">100%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: '100%'}} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">暗号通貨の基礎</span>
                            <span className="text-sm text-gray-600">75%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{width: '75%'}} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">トレーディング戦略</span>
                            <span className="text-sm text-gray-600">45%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{width: '45%'}} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="h-8 w-8 text-yellow-600" />
                          <div>
                            <p className="font-semibold text-sm">次の実績まで</p>
                            <p className="text-xs text-gray-600">あと3レッスン</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-yellow-600">🏆</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    85レッスンの体系的学習プログラム
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "初心者から上級者まで段階的に学習",
                      "インタラクティブなクイズと演習",
                      "実績システムでモチベーション維持",
                      "AIによる個別学習プラン",
                      "投資詐欺の見抜き方も学習"
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/learning">
                    <motion.button 
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      学習を開始
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 使い方セクション */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              3ステップで始める暗号通貨投資
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              アカウント作成から投資開始まで、わずか5分
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "無料アカウント作成",
                description: "メールアドレスだけで簡単登録。クレジットカード不要。",
                icon: Wallet,
                color: "blue"
              },
              {
                step: "2",
                title: "AIアシスタント設定",
                description: "投資目標とリスク許容度を設定。AIがあなたに最適な戦略を提案。",
                icon: Bot,
                color: "purple"
              },
              {
                step: "3",
                title: "投資を開始",
                description: "AIの分析を参考に投資判断。24時間サポートで安心。",
                icon: LineChart,
                color: "green"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.color}-100 mb-6`}>
                    <span className={`text-2xl font-bold text-${item.color}-600`}>{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <item.icon className={`absolute top-8 right-8 h-8 w-8 text-${item.color}-200`} />
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-8 w-8 text-gray-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 成功事例 */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">🏆 Success Stories</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              💰 年収1億円超えの秘密を公開
            </h2>
            <p className="text-2xl text-slate-700 max-w-4xl mx-auto font-bold">
              <span className="bg-yellow-200 px-3 py-1 rounded">実際の利用者</span>が語る
              リアルな成果をご覧ください
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "田中 太郎（38歳）",
                role: "元サラリーマン → 専業投資家",
                image: "👨‍💼",
                quote: "AIのおかげで初月から+180万円の利益！会社を辞めて専業になりました。月収が以前の10倍になって人生が変わりました。",
                rating: 5,
                result: "+1,800万円/年"
              },
              {
                name: "佐藤 花子（29歳）",
                role: "投資初心者 → 月100万円稼ぐトレーダー",
                image: "👩‍💻",
                quote: "投資経験ゼロでしたが、3ヶ月で月収100万円を達成！85レッスンの学習コンテンツが本当に分かりやすくて、AIが24時間サポートしてくれるので安心です。",
                rating: 5,
                result: "+1,200万円/年"
              },
              {
                name: "山田 健一（45歳）",
                role: "元プロトレーダー",
                image: "👨‍💼",
                quote: "20年の経験がありましたが、このAIは私の予想を遥かに上回る精度です。年収が3倍になり、ストレスも激減しました。もっと早く知りたかった。",
                rating: 5,
                result: "+3,500万円/年"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                    <div className="inline-block bg-green-100 px-2 py-1 rounded text-xs font-bold text-green-800 mt-1">
                      年収: {testimonial.result}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-700">⭐⭐⭐⭐⭐ 5.0</span>
                </div>
                <p className="text-slate-700 font-medium text-lg leading-relaxed">&quot;{testimonial.quote}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">🎯 Pricing</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              🎯 投資額を10倍にする料金プラン
            </h2>
            <p className="text-2xl text-slate-700 max-w-4xl mx-auto font-bold">
              <span className="bg-yellow-200 px-3 py-1 rounded">限定特価</span> 
              通常価格の80%OFF + 30日間完全返金保証
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "👋 Free",
                price: "¥0",
                period: "永久無料",
                originalPrice: null,
                description: "🎯 まずは無料で体験",
                features: [
                  "🤖 AIチャット 5回/日（¥3,000相当）",
                  "📊 基本的な市場データ（¥2,000相当）",
                  "💼 ポートフォリオ管理（¥5,000相当）",
                  "📚 85レッスンの学習コンテンツ（¥50,000相当）",
                  "👥 コミュニティアクセス（¥10,000相当）"
                ],
                cta: "🚀 今すぐ無料で始める",
                popular: false,
                badge: null
              },
              {
                name: "🔥 Basic",
                price: "¥3,980",
                period: "/月",
                originalPrice: "¥19,800",
                description: "💰 月100万円を目指す",
                features: [
                  "🤖 AIチャット 無制限（¥50,000相当）",
                  "⚡ リアルタイム市場データ（¥30,000相当）",
                  "🎯 ポートフォリオ最適化AI（¥100,000相当）",
                  "🚨 スマートアラート（¥20,000相当）",
                  "👨‍💼 専属サポート（¥50,000相当）",
                  "📊 データエクスポート（¥10,000相当）",
                  "🎁 投資戦略レポート毎月配信"
                ],
                cta: "✨ 14日間無料で試す",
                popular: true,
                badge: "🏆 人気No.1"
              },
              {
                name: "👑 Pro",
                price: "¥9,980",
                period: "/月",
                originalPrice: "¥49,800",
                description: "🚀 年収1億円を実現",
                features: [
                  "🤖 最新AI無制限アクセス（¥200,000相当）",
                  "🔌 APIアクセス（¥100,000相当）",
                  "🧠 専用AIモデル（¥500,000相当）",
                  "📈 プロ級分析ツール（¥300,000相当）",
                  "🏆 専任プロトレーダーサポート（¥1,000,000相当）",
                  "🎯 1対1コンサルティング月2回",
                  "💎 VIP限定投資情報",
                  "📱 ホワイトラベル対応"
                ],
                cta: "👑 億万長者への道",
                popular: false,
                badge: "💎 VIP限定"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all ${
                  plan.popular ? "border-2 border-blue-500" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    {plan.badge}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-2 text-slate-900">{plan.name}</h3>
                  <p className="text-slate-600 mb-6 font-medium text-lg">{plan.description}</p>
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <div className="text-lg text-gray-500 line-through font-medium">
                        通常価格: {plan.originalPrice}{plan.period}
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-emerald-600">{plan.price}</span>
                      <span className="text-slate-600 text-xl">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="inline-block bg-red-100 px-3 py-1 rounded-full text-red-800 font-bold text-sm mt-2">
                        80% OFF 🔥
                      </div>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/register">
                    <motion.button 
                      className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              よくある質問
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
        <motion.div 
          className="container mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            今すぐ始めて、投資を次のレベルへ
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            10,000人以上のユーザーが既に利用中。あなたも今すぐ参加しましょう。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register">
              <motion.button 
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-5 w-5" />
                無料アカウント作成
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/learning">
              <motion.button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="h-5 w-5" />
                学習を始める
              </motion.button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">SSL暗号化</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <span className="text-sm">個人情報保護</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">返金保証</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">CryptoAI</h3>
              </Link>
              <p className="text-sm">
                最先端のAI技術で、暗号通貨投資をより安全に、より効果的に。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">プロダクト</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ai/chat" className="hover:text-white transition-colors">AIチャット</Link></li>
                <li><Link href="/portfolio/optimize" className="hover:text-white transition-colors">ポートフォリオ最適化</Link></li>
                <li><Link href="/market/analysis" className="hover:text-white transition-colors">市場分析</Link></li>
                <li><Link href="/learning" className="hover:text-white transition-colors">学習センター</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">サポート</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">ヘルプセンター</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">利用規約</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">アップデート情報</h4>
              <p className="text-sm mb-4">最新機能やお得な情報をお届けします。</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  登録
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 CryptoAI Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}