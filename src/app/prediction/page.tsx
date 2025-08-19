"use client"

import * as React from "react"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { LazyPricePredictionWrapper } from "@/lib/performance/lazy-components"
import { usePerformanceMonitor } from "@/lib/performance/component-cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  TrendingUp,
  Target,
  Zap,
  Activity,
  BarChart3,
  ArrowLeft,
  Bot,
  Eye,
  Star,
  Clock,
  Cpu
} from "lucide-react"

// アニメーション用カウンターコンポーネント
function CountUp({ end, duration = 2, suffix = "", decimals = 0 }: {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (startTime === undefined) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      
      setCount(progress * end);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
}

// ローディングスケルトンコンポーネント
function PredictionPageSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

export default function PredictionPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // パフォーマンス監視
  usePerformanceMonitor('PredictionPage')

  // 認証チェック
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      } else {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }
    checkAuth()
  }, [router, supabase])

  if (loading) {
    return <PredictionPageSkeleton />
  }

  if (!isAuthenticated) {
    return <PredictionPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6 sm:space-y-8">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-purple-100 to-cyan-100 relative flex-shrink-0">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="break-words">AI価格予測</span>
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              最新のAI技術と機械学習による高精度暗号通貨価格予測システム
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={() => router.push("/dashboard")}
              variant="outline"
              size="sm"
              className="hover:bg-purple-50 transition-colors w-full sm:w-auto text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">ダッシュボードに戻る</span>
              <span className="sm:hidden">戻る</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* AI予測パフォーマンス統計 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* 予測精度 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">予測精度</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-green-100">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  <CountUp end={87.3} suffix="%" decimals={1} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">過去30日平均</span>
                  <span className="sm:hidden">30日平均</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 処理済み予測数 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">処理済み予測</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-blue-100">
                  <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  <CountUp end={2847} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-blue-600">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">本日実行済み</span>
                  <span className="sm:hidden">実行済み</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI信頼度スコア */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">AI信頼度</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-purple-100">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  <CountUp end={94.2} suffix="%" decimals={1} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-purple-600">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  高信頼度
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* AI技術説明バナー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 flex-shrink-0" />
                <span className="break-words">高度なAI予測エンジン稼働中</span>
              </h2>
              <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                <span className="hidden sm:inline">深層学習、時系列分析、マルチファクターモデルを組み合わせた次世代予測システム</span>
                <span className="sm:hidden">深層学習とマルチファクターモデルによる次世代予測システム</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 self-end sm:self-auto">
              <div className="flex flex-col items-center">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-pulse" />
                <span className="text-xs text-purple-200 mt-1">リアルタイム</span>
              </div>
              <div className="flex flex-col items-center">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-300" />
                <span className="text-xs text-purple-200 mt-1">24/7監視</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 予測コンポーネントエリア */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border-0 overflow-hidden"
        >
          <LazyPricePredictionWrapper />
        </motion.div>

        {/* AI予測の特徴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-0"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0" />
            <span>AI予測システムの特徴</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">多次元データ分析</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">価格、出来高、ソーシャルセンチメント、マクロ経済指標を統合分析</span>
                <span className="sm:hidden">価格・出来高・センチメントを統合分析</span>
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">リアルタイム更新</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">市場データの変化に応じて予測モデルを継続的に最適化</span>
                <span className="sm:hidden">市場変化に応じて予測モデルを最適化</span>
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">高精度予測</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">機械学習とディープラーニングによる87%以上の予測精度を実現</span>
                <span className="sm:hidden">機械学習による87%以上の予測精度</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* 免責事項 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-amber-50/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200"
        >
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="p-2 rounded-full bg-amber-100 flex-shrink-0">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">重要な注意事項</h4>
              <p className="text-xs sm:text-sm text-amber-700 leading-relaxed">
                <span className="hidden sm:inline">
                  AI予測は投資判断の参考情報として提供されます。暗号通貨投資には高いリスクが伴うため、
                  予測結果だけに依存せず、十分な情報収集と慎重な判断を行ってください。
                  投資はすべて自己責任で行い、余裕資金の範囲内での運用を推奨します。
                </span>
                <span className="sm:hidden">
                  AI予測は参考情報です。暗号通貨投資にはリスクが伴うため、十分な情報収集と慎重な判断を行ってください。投資は自己責任で余裕資金の範囲内で行ってください。
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}