// 🎯 メインダッシュボード - スマートアラート・DeFi監視統合画面
// リアルタイムデータ表示、アラート状況、DeFi市場概要、AI分析結果

'use client';

// ダッシュボードは認証が必要なため動的レンダリング
export const dynamic = 'force-dynamic';

import * as React from "react"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { HomeButton } from '@/components/ui/home-button';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  DollarSign, 
  BarChart3,
  Bell,
  Shield,
  Zap,
  Eye,
  Settings,
  Plus,
  RotateCcw as Refresh,
  Star,
  Target,
  TrendingUp as TrendUp,
  Award,
  PieChart,
  LineChart
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/lib/auth/hooks';

// 型定義
interface DashboardData {
  alerts: {
    active: number;
    triggered: number;
    severity: {
      critical: number;
      warning: number;
      info: number;
    };
  };
  portfolio: {
    totalValue: number;
    change24h: number;
    changePercent: number;
    topAssets: Array<{
      symbol: string;
      value: number;
      change: number;
    }>;
  };
  defi: {
    totalTVL: number;
    protocolsMonitored: number;
    riskScore: number;
    topProtocols: Array<{
      name: string;
      tvl: number;
      risk: string;
    }>;
  };
  market: {
    fearGreedIndex: number;
    btcPrice: number;
    ethPrice: number;
    totalMarketCap: number;
  };
  ai: {
    recommendations: Array<{
      type: string;
      message: string;
      confidence: number;
    }>;
    signals: {
      bullish: number;
      bearish: number;
      neutral: number;
    };
  };
}

interface RecentAlert {
  id: string;
  type: string;
  symbol: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  triggeredAt: Date;
  acknowledged: boolean;
}

// アニメーション用カウントアップコンポーネント
function CountUp({ end, duration = 2, prefix = "", suffix = "" }: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (startTime === undefined) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isVisible]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ローディングスケルトンコンポーネント
function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

// クライアントサイド認証チェック用コンポーネント
function AuthenticatedDashboard() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // サーバーサイドレンダリング時は何も表示しない
  if (!isClient) {
    return <DashboardSkeleton />;
  }

  return <DashboardContent />;
}

// 実際のダッシュボードコンテンツ
function DashboardContent() {
  const { user, loading } = useUser();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
    fetchRecentAlerts();
    
    // リアルタイム更新（30秒間隔）
    const interval = setInterval(() => {
      fetchDashboardData(true);
      fetchRecentAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      }
      
      // モックデータ（実際のAPIが実装されるまで）
      const mockData: DashboardData = {
        alerts: {
          active: 12,
          triggered: 8,
          severity: {
            critical: 2,
            warning: 4,
            info: 6
          }
        },
        portfolio: {
          totalValue: 125000,
          change24h: 3250,
          changePercent: 2.67,
          topAssets: [
            { symbol: 'BTC', value: 45000, change: 1.23 },
            { symbol: 'ETH', value: 28000, change: -0.87 },
            { symbol: 'ADA', value: 15000, change: 4.56 }
          ]
        },
        defi: {
          totalTVL: 2500000,
          protocolsMonitored: 15,
          riskScore: 35,
          topProtocols: [
            { name: 'Uniswap V3', tvl: 850000, risk: 'low' },
            { name: 'Aave', tvl: 720000, risk: 'low' },
            { name: 'Compound', tvl: 450000, risk: 'medium' }
          ]
        },
        market: {
          fearGreedIndex: 67,
          btcPrice: 43500,
          ethPrice: 2850,
          totalMarketCap: 1.85e12
        },
        ai: {
          recommendations: [
            { type: 'BUY', message: 'ETHの価格下落は一時的。長期的には上昇トレンド継続の可能性', confidence: 78 },
            { type: 'HOLD', message: 'BTCは現在の価格帯でのレンジ相場が続く見込み', confidence: 65 }
          ],
          signals: {
            bullish: 45,
            bearish: 25,
            neutral: 30
          }
        }
      };
      
      // 少し遅延を入れてリアルなAPI感を演出
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDashboardData(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
      if (isRefresh) {
        setIsRefreshing(false);
      }
    }
  };

  const fetchRecentAlerts = async () => {
    try {
      // モックデータ
      const mockAlerts: RecentAlert[] = [
        {
          id: '1',
          type: '価格アラート',
          symbol: 'BTC',
          message: '価格が$44,000を上回りました',
          severity: 'info',
          triggeredAt: new Date(Date.now() - 5 * 60 * 1000),
          acknowledged: false
        },
        {
          id: '2',
          type: 'ボリュームアラート',
          symbol: 'ETH',
          message: '24時間取引量が平均の150%を超過',
          severity: 'warning',
          triggeredAt: new Date(Date.now() - 15 * 60 * 1000),
          acknowledged: false
        },
        {
          id: '3',
          type: 'リスクアラート',
          symbol: 'Portfolio',
          message: 'ポートフォリオリスクが閾値を超過',
          severity: 'critical',
          triggeredAt: new Date(Date.now() - 30 * 60 * 1000),
          acknowledged: true
        }
      ];
      
      setRecentAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to fetch recent alerts:', error);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData(true);
    fetchRecentAlerts();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      default: return 'secondary';
    }
  };

  if (loading || isLoading) {
    return <DashboardSkeleton />;
  }

  // ここから実際のダッシュボードJSXを返す
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <HomeButton variant="outline" buttonClassName="bg-white/80 border-gray-200 text-gray-700 hover:bg-white" />
      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative container mx-auto p-6">
        {/* ヘッダー */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              ダッシュボード
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Activity className="h-4 w-4 text-green-500 animate-pulse" />
              リアルタイム市場分析とスマートアラート
              <span className="text-sm text-gray-400 ml-2">
                最終更新: {lastUpdated.toLocaleTimeString()}
              </span>
            </motion.p>
          </div>
          <motion.div 
            className="flex space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="hover:bg-blue-50 transition-colors"
            >
              <Refresh className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              更新
            </Button>
            <Link href="/settings">
              <Button variant="outline" size="sm" className="hover:bg-purple-50 transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                設定
              </Button>
            </Link>
            <Link href="/alerts/create">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all">
                <Plus className="h-4 w-4 mr-2" />
                アラート作成
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* ウェルカムメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">おかえりなさい、{user?.profile?.full_name || 'トレーダー'}さん！</h2>
              <p className="text-blue-100">今日も効率的な投資を始めましょう。最新の市場動向とAI分析をお届けします。</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold"><CountUp end={dashboardData?.portfolio?.totalValue || 0} prefix="$" /></div>
                <div className="text-sm text-blue-200">総資産価値</div>
              </div>
              <Star className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
        </motion.div>

        {/* クイック統計カード */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* アクティブアラート */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">アクティブアラート</CardTitle>
                <div className="p-2 rounded-full bg-orange-100">
                  <Bell className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <CountUp end={dashboardData?.alerts.active || 0} />
                </div>
                <div className="flex items-center text-sm text-orange-600">
                  <TrendUp className="h-4 w-4 mr-1" />
                  +<CountUp end={dashboardData?.alerts.triggered || 0} /> 今日発生
                </div>
                <Progress value={75} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* ポートフォリオ */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">ポートフォリオ総額</CardTitle>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  $<CountUp end={dashboardData?.portfolio.totalValue || 0} />
                </div>
                <div className={`flex items-center text-sm ${
                  (dashboardData?.portfolio.changePercent || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(dashboardData?.portfolio.changePercent || 0) >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {(dashboardData?.portfolio.changePercent || 0) >= 0 ? '+' : ''}
                  {dashboardData?.portfolio.changePercent || 0}% 24h
                </div>
                <Progress value={85} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* DeFi監視 */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">DeFi監視</CardTitle>
                <div className="p-2 rounded-full bg-blue-100">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <CountUp end={dashboardData?.defi.protocolsMonitored || 0} />
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <Activity className="h-4 w-4 mr-1" />
                  プロトコルダッシュボード中
                </div>
                <Progress value={60} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* リスクスコア */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">リスクスコア</CardTitle>
                <div className="p-2 rounded-full bg-purple-100">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <CountUp end={dashboardData?.defi.riskScore || 0} />/100
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <Award className="h-4 w-4 mr-1" />
                  {(dashboardData?.defi.riskScore || 0) < 30 ? '低リスク' : 
                   (dashboardData?.defi.riskScore || 0) < 70 ? '中リスク' : '高リスク'}
                </div>
                <Progress value={dashboardData?.defi.riskScore || 0} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* タブ式レイアウト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">概要</TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">アラート</TabsTrigger>
              <TabsTrigger value="defi" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">DeFi監視</TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">AI分析</TabsTrigger>
            </TabsList>

            {/* 概要タブ */}
            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* 最近のアラート */}
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-lg">
                          <div className="p-2 rounded-full bg-red-100 mr-3">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          最近のアラート
                        </CardTitle>
                        <Link href="/alerts">
                          <Button variant="outline" size="sm" className="hover:bg-red-50">
                            <Eye className="h-4 w-4 mr-1" />
                            全て表示
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {recentAlerts.length > 0 ? (
                        <div className="space-y-4">
                          {recentAlerts.map((alert, index) => (
                            <motion.div
                              key={alert.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all bg-white/50"
                            >
                              <div className="flex items-center space-x-3">
                                <Badge 
                                  variant={getSeverityColor(alert.severity) as "default" | "destructive" | "outline" | "secondary"}
                                  className="animate-pulse"
                                >
                                  {alert.severity}
                                </Badge>
                                <div>
                                  <p className="font-medium text-gray-900">{alert.type}</p>
                                  <p className="text-sm text-gray-600">{alert.symbol}: {alert.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(alert.triggeredAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              {!alert.acknowledged && (
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Bell className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">最近のアラートはありません</p>
                          <p className="text-sm text-gray-400 mt-1">新しいアラートが発生すると、ここに表示されます</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* ポートフォリオ詳細 */}
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <PieChart className="h-5 w-5 text-green-600" />
                        </div>
                        ポートフォリオ詳細
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">総資産価値</span>
                          <span className="text-xl font-bold text-gray-900">
                            $<CountUp end={dashboardData?.portfolio.totalValue || 0} />
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">24時間変動</span>
                          <div className="flex items-center space-x-2">
                            {(dashboardData?.portfolio.changePercent || 0) >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`text-lg font-bold ${
                              (dashboardData?.portfolio.changePercent || 0) >= 0 
                                ? 'text-green-500' 
                                : 'text-red-500'
                            }`}>
                              {(dashboardData?.portfolio.changePercent || 0) >= 0 ? '+' : ''}
                              {dashboardData?.portfolio.changePercent || 0}%
                            </span>
                          </div>
                        </div>
                        
                        {/* トップアセット */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-yellow-500" />
                            主要資産
                          </h4>
                          {dashboardData?.portfolio.topAssets.map((asset, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all"
                            >
                              <span className="font-medium text-gray-900">{asset.symbol}</span>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium">${asset.value.toLocaleString()}</span>
                                <span className={`text-sm font-bold px-2 py-1 rounded ${
                                  asset.change >= 0 
                                    ? 'text-green-600 bg-green-50' 
                                    : 'text-red-600 bg-red-50'
                                }`}>
                                  {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                                </span>
                              </div>
                            </motion.div>
                          )) || []}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* 市場概要 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                        市場概要
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <motion.div 
                          className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <p className="text-sm text-gray-600 mb-2">Fear & Greed Index</p>
                          <p className="text-2xl font-bold text-gray-900">
                            <CountUp end={dashboardData?.market.fearGreedIndex || 0} />
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all" 
                              style={{ width: `${dashboardData?.market.fearGreedIndex || 0}%` }}
                            ></div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <p className="text-sm text-gray-600 mb-2">BTC価格</p>
                          <p className="text-2xl font-bold text-orange-600">
                            $<CountUp end={dashboardData?.market.btcPrice || 0} />
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <p className="text-sm text-gray-600 mb-2">ETH価格</p>
                          <p className="text-2xl font-bold text-blue-600">
                            $<CountUp end={dashboardData?.market.ethPrice || 0} />
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <p className="text-sm text-gray-600 mb-2">総時価総額</p>
                          <p className="text-2xl font-bold text-green-600">
                            $<CountUp 
                              end={dashboardData?.market?.totalMarketCap ? Math.round(dashboardData.market.totalMarketCap / 1e11) / 10 : 0} 
                              suffix="T" 
                            />
                          </p>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>

            {/* その他のタブコンテンツ */}
            <TabsContent value="alerts" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">アラート管理</CardTitle>
                      <Link href="/alerts/create">
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                          <Plus className="h-4 w-4 mr-2" />
                          新規作成
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div 
                        className="text-center p-6 border-2 border-red-200 rounded-xl bg-gradient-to-br from-red-50 to-pink-50"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-red-600 mb-2">
                          <CountUp end={dashboardData?.alerts.severity.critical || 0} />
                        </div>
                        <p className="text-sm font-medium text-red-700">緊急アラート</p>
                        <div className="mt-2 w-full bg-red-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-6 border-2 border-yellow-200 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-yellow-600 mb-2">
                          <CountUp end={dashboardData?.alerts.severity.warning || 0} />
                        </div>
                        <p className="text-sm font-medium text-yellow-700">警告アラート</p>
                        <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-6 border-2 border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          <CountUp end={dashboardData?.alerts.severity.info || 0} />
                        </div>
                        <p className="text-sm font-medium text-blue-700">情報アラート</p>
                        <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="defi" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center">
                        <Shield className="h-6 w-6 mr-2 text-blue-600" />
                        DeFi監視
                      </CardTitle>
                      <Link href="/defi">
                        <Button variant="outline">詳細表示</Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">監視プロトコル数</p>
                        <p className="text-3xl font-bold text-blue-600">
                          <CountUp end={dashboardData?.defi.protocolsMonitored || 0} />
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">総TVL</p>
                        <p className="text-3xl font-bold text-green-600">
                          $<CountUp end={dashboardData?.defi.totalTVL || 0} />
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-purple-500" />
                        主要プロトコル
                      </h4>
                      {dashboardData?.defi.topProtocols.map((protocol, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all"
                        >
                          <span className="font-medium text-gray-900">{protocol.name}</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">${protocol.tvl.toLocaleString()}</span>
                            <Badge 
                              variant={protocol.risk === 'low' ? 'secondary' : 'warning'}
                              className={protocol.risk === 'low' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                            >
                              {protocol.risk}
                            </Badge>
                          </div>
                        </motion.div>
                      )) || []}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <div className="p-2 rounded-full bg-purple-100 mr-3">
                        <Zap className="h-6 w-6 text-purple-600" />
                      </div>
                      AI分析・推奨事項
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* AIシグナル */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                          <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                          市場シグナル
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <motion.div 
                            className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              <CountUp end={dashboardData?.ai.signals.bullish || 0} suffix="%" />
                            </div>
                            <p className="text-sm font-medium text-green-700">強気シグナル</p>
                            <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${dashboardData?.ai.signals.bullish || 0}%` }}></div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-2xl font-bold text-red-600 mb-2">
                              <CountUp end={dashboardData?.ai.signals.bearish || 0} suffix="%" />
                            </div>
                            <p className="text-sm font-medium text-red-700">弱気シグナル</p>
                            <div className="mt-2 w-full bg-red-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${dashboardData?.ai.signals.bearish || 0}%` }}></div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-2xl font-bold text-gray-600 mb-2">
                              <CountUp end={dashboardData?.ai.signals.neutral || 0} suffix="%" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">中立シグナル</p>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${dashboardData?.ai.signals.neutral || 0}%` }}></div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* AI推奨事項 */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                          <Target className="h-5 w-5 mr-2 text-purple-500" />
                          AI推奨事項
                        </h4>
                        <div className="space-y-4">
                          {dashboardData?.ai.recommendations.map((rec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <Alert className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-blue-50">
                                <div className="flex items-center">
                                  <div className="p-2 rounded-full bg-purple-100 mr-3">
                                    <Zap className="h-4 w-4 text-purple-600" />
                                  </div>
                                  <AlertDescription className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="font-semibold text-purple-700">{rec.type}: </span>
                                        <span className="text-gray-700">{rec.message}</span>
                                      </div>
                                      <Badge variant="outline" className="bg-white/50">
                                        信頼度: {rec.confidence}%
                                      </Badge>
                                    </div>
                                  </AlertDescription>
                                </div>
                              </Alert>
                            </motion.div>
                          )) || []}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <AuthenticatedDashboard />;
}