'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Globe, 
  Cpu, 
  MemoryStick,
  Users,
  TrendingUp,
  RefreshCw,
  Settings,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface SystemMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  totalRequests: number;
  apiCallsCount: number;
  subscriptionRevenue: number;
  cloudflareStatus: 'healthy' | 'degraded' | 'down';
  supabaseStatus: 'healthy' | 'degraded' | 'down';
  stripeStatus: 'healthy' | 'degraded' | 'down';
  timestamp: number;
}

interface Alert {
  id: string;
  ruleId: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  value: number;
  threshold: number;
  timestamp: number;
  resolved: boolean;
  resolvedAt?: number;
}

export function ProductionMonitorDashboard() {
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<SystemMetrics[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [healthScore, setHealthScore] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // モックデータを生成（実際の実装では API から取得）
  const generateMockMetrics = (): SystemMetrics => ({
    responseTime: Math.random() * 1000 + 200,
    throughput: Math.random() * 50 + 20,
    errorRate: Math.random() * 2,
    cpuUsage: Math.random() * 60 + 20,
    memoryUsage: Math.random() * 40 + 30,
    activeUsers: Math.floor(Math.random() * 500 + 200),
    totalRequests: Math.floor(Math.random() * 10000 + 50000),
    apiCallsCount: Math.floor(Math.random() * 1000 + 2000),
    subscriptionRevenue: Math.floor(Math.random() * 5000 + 15000),
    cloudflareStatus: Math.random() > 0.1 ? 'healthy' : 'degraded',
    supabaseStatus: Math.random() > 0.05 ? 'healthy' : 'degraded',
    stripeStatus: Math.random() > 0.02 ? 'healthy' : 'degraded',
    timestamp: Date.now()
  });

  const generateMockAlerts = (): Alert[] => {
    const alerts: Alert[] = [];
    if (Math.random() > 0.8) {
      alerts.push({
        id: `alert-${Date.now()}-1`,
        ruleId: 'high-response-time',
        message: 'High Response Time Detected',
        severity: 'warning',
        value: 3500,
        threshold: 3000,
        timestamp: Date.now(),
        resolved: false
      });
    }
    if (Math.random() > 0.9) {
      alerts.push({
        id: `alert-${Date.now()}-2`,
        ruleId: 'high-memory-usage',
        message: 'Memory Usage Above Threshold',
        severity: 'error',
        value: 88,
        threshold: 85,
        timestamp: Date.now() - 300000,
        resolved: false
      });
    }
    return alerts;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // モックデータを使用（実際の実装では API 呼び出し）
      const metrics = generateMockMetrics();
      const alerts = generateMockAlerts();
      
      setCurrentMetrics(metrics);
      setActiveAlerts(alerts);
      
      // 履歴データを更新
      setMetricsHistory(prev => {
        const newHistory = [...prev, metrics];
        return newHistory.slice(-60); // 最新60ポイントを保持
      });
      
      // ヘルススコア計算
      const score = calculateHealthScore(metrics);
      setHealthScore(score);
      
      setLastUpdate(new Date());
      setIsLoading(false);
    };

    // 初回読み込み
    fetchData();

    // 30秒間隔での更新
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const calculateHealthScore = (metrics: SystemMetrics): number => {
    let score = 100;
    
    // レスポンス時間
    if (metrics.responseTime > 5000) score -= 25;
    else if (metrics.responseTime > 3000) score -= 15;
    else if (metrics.responseTime > 1000) score -= 5;
    
    // エラー率
    if (metrics.errorRate > 10) score -= 25;
    else if (metrics.errorRate > 5) score -= 15;
    else if (metrics.errorRate > 1) score -= 5;
    
    // メモリ使用率
    if (metrics.memoryUsage > 90) score -= 20;
    else if (metrics.memoryUsage > 80) score -= 10;
    else if (metrics.memoryUsage > 70) score -= 5;
    
    // 外部サービス
    if (metrics.cloudflareStatus === 'down') score -= 10;
    else if (metrics.cloudflareStatus === 'degraded') score -= 5;
    
    if (metrics.supabaseStatus === 'down') score -= 15;
    else if (metrics.supabaseStatus === 'degraded') score -= 8;
    
    if (metrics.stripeStatus === 'down') score -= 5;
    else if (metrics.stripeStatus === 'degraded') score -= 2;
    
    return Math.max(0, score);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatMetricsForChart = () => {
    return metricsHistory.map((metrics, index) => ({
      time: new Date(metrics.timestamp).toLocaleTimeString(),
      responseTime: metrics.responseTime,
      errorRate: metrics.errorRate,
      cpuUsage: metrics.cpuUsage,
      memoryUsage: metrics.memoryUsage,
      throughput: metrics.throughput
    }));
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      currentMetrics,
      healthScore,
      activeAlerts,
      summary: {
        totalAlerts: activeAlerts.length,
        criticalAlerts: activeAlerts.filter(a => a.severity === 'critical').length,
        averageResponseTime: metricsHistory.length > 0 
          ? metricsHistory.reduce((sum, m) => sum + m.responseTime, 0) / metricsHistory.length 
          : 0
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `production-monitor-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading && !currentMetrics) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">モニタリングデータを読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">プロダクション監視ダッシュボード</h1>
          <p className="text-gray-600">最終更新: {lastUpdate.toLocaleString()}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            レポート出力
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            設定
          </Button>
        </div>
      </div>

      {/* ヘルススコア & アラート概要 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">システム健全性</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              <span className={getHealthScoreColor(healthScore)}>{healthScore}</span>
              <span className="text-lg text-gray-500">/100</span>
            </div>
            <Progress value={healthScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {healthScore >= 90 ? '優秀' : healthScore >= 80 ? '良好' : healthScore >= 70 ? '注意' : '危険'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アクティブアラート</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeAlerts.length}</div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="destructive">{activeAlerts.filter(a => a.severity === 'critical').length} Critical</Badge>
              <Badge variant="secondary">{activeAlerts.filter(a => a.severity === 'warning').length} Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アクティブユーザー</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentMetrics?.activeUsers.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12.5% from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
          <TabsTrigger value="services">外部サービス</TabsTrigger>
          <TabsTrigger value="alerts">アラート</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* メインメトリクス */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">レスポンス時間</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMetrics?.responseTime.toFixed(0)}ms</div>
                <p className="text-xs text-muted-foreground">
                  目標: &lt;1000ms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">スループット</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMetrics?.throughput.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">req/sec</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">エラー率</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMetrics?.errorRate.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">
                  目標: &lt;1%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">収益</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥{(currentMetrics?.subscriptionRevenue || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">今日の収益</p>
              </CardContent>
            </Card>
          </div>

          {/* パフォーマンスチャート */}
          <Card>
            <CardHeader>
              <CardTitle>パフォーマンス推移</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatMetricsForChart()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#8884d8" name="レスポンス時間 (ms)" />
                  <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#82ca9d" name="エラー率 (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU & メモリ使用率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      <span>CPU使用率</span>
                    </div>
                    <span className="font-bold">{currentMetrics?.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={currentMetrics?.cpuUsage} />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MemoryStick className="h-4 w-4 mr-2" />
                      <span>メモリ使用率</span>
                    </div>
                    <span className="font-bold">{currentMetrics?.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={currentMetrics?.memoryUsage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API呼び出し状況</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={formatMetricsForChart()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="throughput" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cloudflare</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge className={getStatusColor(currentMetrics?.cloudflareStatus || 'healthy')}>
                  {currentMetrics?.cloudflareStatus || 'healthy'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">CDN & セキュリティ</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Supabase</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge className={getStatusColor(currentMetrics?.supabaseStatus || 'healthy')}>
                  {currentMetrics?.supabaseStatus || 'healthy'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">データベース & Auth</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stripe</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge className={getStatusColor(currentMetrics?.stripeStatus || 'healthy')}>
                  {currentMetrics?.stripeStatus || 'healthy'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">決済処理</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>アクティブアラート</CardTitle>
              <CardDescription>
                解決が必要なアラート一覧
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900">アクティブなアラートはありません</p>
                  <p className="text-gray-600">システムは正常に動作しています</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <Alert key={alert.id}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getSeverityColor(alert.severity)}>
                                {alert.severity}
                              </Badge>
                              <span className="font-medium">{alert.message}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              値: {alert.value} / 閾値: {alert.threshold}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            解決
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}