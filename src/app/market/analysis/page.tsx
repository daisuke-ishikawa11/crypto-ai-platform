'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LazyMarketOverviewWrapper,
  LazyCoinAnalysisWrapper,
  LazyTopMoversWrapper,
  LazyTrendingCoinsWrapper 
} from '@/lib/performance/lazy-components';
import { usePerformanceMonitor } from '@/lib/performance/component-cache';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Search,
  RefreshCw,
  Activity,
  DollarSign,
  Target,
  Zap,
  Eye,
  Star,
  ArrowLeft,
  Bitcoin,
  PieChart
} from 'lucide-react';

// アニメーション用カウンターコンポーネント
function CountUpValue({ end, duration = 2, prefix = "", suffix = "", decimals = 0 }: {
  end: number;
  duration?: number;
  prefix?: string;
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

  return <span>{prefix}{count.toFixed(decimals)}{suffix}</span>;
}

// ローディングスケルトンコンポーネント
function MarketAnalysisSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
      
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

export default function MarketAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  
  // パフォーマンス監視
  usePerformanceMonitor('MarketAnalysisPage');

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // 実際の検索処理をここに追加
    setTimeout(() => {
      setIsSearching(false);
      setSelectedTab('analysis');
    }, 1000);
  };

  const handleRefresh = () => {
    // データの再読み込み処理
    console.log('Refreshing market data...');
  };

  if (loading) {
    return <MarketAnalysisSkeleton />;
  }

  if (!isAuthenticated) {
    return <MarketAnalysisSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex-shrink-0">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <span className="break-words">市場分析</span>
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              リアルタイム暗号通貨市場分析とAIインサイト
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={() => router.push('/dashboard')}
              variant="outline"
              size="sm"
              className="hover:bg-green-50 transition-colors w-full sm:w-auto text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">ダッシュボードに戻る</span>
              <span className="sm:hidden">戻る</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* 市場概要カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* 総時価総額 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">総時価総額</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  $<CountUpValue end={1.85} suffix="T" decimals={2} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  +2.34% 24h
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ビットコイン支配率 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">BTC支配率</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-orange-100">
                  <Bitcoin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  <CountUpValue end={52.3} suffix="%" decimals={1} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-orange-600">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  安定水準
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* アクティブ通貨数 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">アクティブ通貨</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-blue-100">
                  <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  <CountUpValue end={8247} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-blue-600">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  取引中
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 24h取引量 */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">24h取引量</CardTitle>
                <div className="p-1.5 sm:p-2 rounded-full bg-purple-100">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  $<CountUpValue end={89.2} suffix="B" decimals={1} />
                </div>
                <div className="flex items-center text-xs sm:text-sm text-purple-600">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  高活動
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* 検索セクション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center text-lg sm:text-xl gap-2 sm:gap-3">
                    <div className="p-2 rounded-full bg-blue-100 flex-shrink-0">
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <span className="break-words">暗号通貨検索・分析</span>
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm sm:text-base leading-relaxed">
                    <span className="hidden sm:inline">任意の暗号通貨を検索して詳細な分析とAIインサイトを取得</span>
                    <span className="sm:hidden">通貨検索で詳細分析とAIインサイトを取得</span>
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleRefresh} 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-green-50 w-full sm:w-auto text-xs sm:text-sm"
                >
                  <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  更新
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  <Input
                    placeholder="通貨を検索... (例: bitcoin, ethereum)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 sm:pl-10 border-0 bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base h-10 sm:h-auto"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  disabled={!searchQuery.trim() || isSearching}
                  onClick={handleSearch}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all w-full sm:w-auto text-xs sm:text-sm h-10 sm:h-auto"
                >
                  {isSearching ? (
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                  ) : (
                    <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">分析開始</span>
                  <span className="sm:hidden">分析</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AIインサイトバナー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 flex-shrink-0" />
                <span className="break-words">AI市場分析が利用可能</span>
              </h2>
              <p className="text-green-100 text-sm sm:text-base leading-relaxed">
                <span className="hidden sm:inline">高度な機械学習アルゴリズムによる市場予測と投資推奨を提供しています</span>
                <span className="sm:hidden">機械学習アルゴリズムによる市場予測と投資推奨を提供</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 self-end sm:self-auto">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-green-300 animate-pulse" />
              <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-300" />
            </div>
          </div>
        </motion.div>

        {/* タブコンテンツ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/60 backdrop-blur-sm border-0 shadow-md h-12 sm:h-14 gap-1 p-1">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium px-2 sm:px-4"
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">概要</span>
                <span className="sm:hidden">概要</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analysis"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium px-2 sm:px-4"
              >
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">詳細分析</span>
                <span className="sm:hidden">分析</span>
              </TabsTrigger>
              <TabsTrigger 
                value="movers"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium px-2 sm:px-4"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">注目銘柄</span>
                <span className="sm:hidden">注目</span>
              </TabsTrigger>
              <TabsTrigger 
                value="trending"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium px-2 sm:px-4"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">トレンド</span>
                <span className="sm:hidden">トレンド</span>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LazyMarketOverviewWrapper />
                </motion.div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LazyCoinAnalysisWrapper />
                </motion.div>
              </TabsContent>

              <TabsContent value="movers" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LazyTopMoversWrapper />
                </motion.div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LazyTrendingCoinsWrapper />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* 分析ガイド */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-0"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
            <span>効果的な市場分析のポイント</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">複数指標の確認</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">価格だけでなく、出来高やテクニカル指標も合わせて分析</span>
                <span className="sm:hidden">価格・出来高・テクニカル指標を統合分析</span>
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">トレンド分析</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">短期・中期・長期のトレンドを総合的に判断</span>
                <span className="sm:hidden">短期・中期・長期トレンドを総合判断</span>
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">AI推奨の活用</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="hidden sm:inline">AI分析結果を参考に、自分なりの投資判断を行う</span>
                <span className="sm:hidden">AI分析結果を参考に投資判断を実行</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}