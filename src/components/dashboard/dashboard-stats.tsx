'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Brain, 
  Target,
  Users,
  Zap
} from 'lucide-react';

interface DashboardStatsProps {
  stats?: {
    totalPortfolioValue: number;
    todayGain: number;
    todayGainPercent: number;
    totalGain: number;
    totalGainPercent: number;
    aiUsageCount: number;
    aiUsageLimit: number;
    learningProgress: number;
    completedLessons: number;
    totalLessons: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(stats || {
    totalPortfolioValue: 0,
    todayGain: 0,
    todayGainPercent: 0,
    totalGain: 0,
    totalGainPercent: 0,
    aiUsageCount: 0,
    aiUsageLimit: 50,
    learningProgress: 0,
    completedLessons: 0,
    totalLessons: 85
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 実際のAPI呼び出しに置き換える
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const statsData = await response.json();
          setData(statsData);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        // フォールバックデータを使用
        setData({
          totalPortfolioValue: 125000,
          todayGain: 3250,
          todayGainPercent: 2.6,
          totalGain: 25000,
          totalGainPercent: 25.0,
          aiUsageCount: 12,
          aiUsageLimit: 50,
          learningProgress: 65,
          completedLessons: 22,
          totalLessons: 85
        });
      } finally {
        setLoading(false);
      }
    };

    if (!stats) {
      fetchStats();
    } else {
      setData(stats);
      setLoading(false);
    }
  }, [stats]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 bg-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="h-3 w-3 text-green-500" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-500" />
    );
  };

  const getTrendColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Portfolio Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ポートフォリオ総額</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.totalPortfolioValue)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              {getTrendIcon(data.totalGainPercent)}
              <span className={getTrendColor(data.totalGainPercent)}>
                {formatPercentage(data.totalGainPercent)}
              </span>
            </div>
            <span>総利益 {formatCurrency(data.totalGain)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Today's Gain */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">今日の損益</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getTrendColor(data.todayGain)}`}>
            {data.todayGain >= 0 ? '+' : ''}{formatCurrency(data.todayGain)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              {getTrendIcon(data.todayGainPercent)}
              <span className={getTrendColor(data.todayGainPercent)}>
                {formatPercentage(data.todayGainPercent)}
              </span>
            </div>
            <span>前日比</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI利用状況</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.aiUsageCount}/{data.aiUsageLimit}
          </div>
          <div className="space-y-1">
            <Progress value={(data.aiUsageCount / data.aiUsageLimit) * 100} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>今月の利用回数</span>
              <Badge variant="outline" className="text-xs">
                {data.aiUsageLimit - data.aiUsageCount}回残り
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">学習進捗</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.completedLessons}/{data.totalLessons}
          </div>
          <div className="space-y-1">
            <Progress value={(data.completedLessons / data.totalLessons) * 100} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>完了済みレッスン</span>
              <Badge variant="outline" className="text-xs">
                {Math.round((data.completedLessons / data.totalLessons) * 100)}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}