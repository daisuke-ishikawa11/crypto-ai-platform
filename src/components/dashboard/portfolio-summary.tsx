'use client';

import * as React from "react"
import { useCallback, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Target,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';
import Link from 'next/link';

interface PortfolioHolding {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  allocation: number;
  change24h: number;
  changePercent24h: number;
  averagePrice: number;
  currentPrice: number;
  totalGain: number;
  totalGainPercent: number;
}

interface PortfolioSummaryData {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  todayGain: number;
  todayGainPercent: number;
  holdings: PortfolioHolding[];
  riskScore: number;
  diversificationScore: number;
}

export function PortfolioSummary() {
  const [portfolio, setPortfolio] = useState<PortfolioSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = useCallback(async () => {
      try {
        // 実際のAPI呼び出しに置き換える
        const response = await fetch('/api/portfolio/summary');
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
        // フォールバックデータ
        setPortfolio({
          totalValue: 1250000,
          totalGain: 250000,
          totalGainPercent: 25.0,
          todayGain: 32500,
          todayGainPercent: 2.6,
          riskScore: 6.5,
          diversificationScore: 7.8,
          holdings: [
            {
              symbol: 'BTC',
              name: 'Bitcoin',
              amount: 0.15,
              value: 975000,
              allocation: 78.0,
              change24h: 23400,
              changePercent24h: 2.4,
              averagePrice: 6000000,
              currentPrice: 6500000,
              totalGain: 75000,
              totalGainPercent: 8.3
            },
            {
              symbol: 'ETH',
              name: 'Ethereum',
              amount: 0.8,
              value: 224000,
              allocation: 17.9,
              change24h: -6720,
              changePercent24h: -2.9,
              averagePrice: 260000,
              currentPrice: 280000,
              totalGain: 16000,
              totalGainPercent: 7.7
            },
            {
              symbol: 'ADA',
              name: 'Cardano',
              amount: 650,
              value: 50700,
              allocation: 4.1,
              change24h: 1380,
              changePercent24h: 2.8,
              averagePrice: 72,
              currentPrice: 78,
              totalGain: 3900,
              totalGainPercent: 8.3
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchPortfolio();
      const interval = setInterval(fetchPortfolio, 60000); // 1分ごとに更新
      return () => clearInterval(interval);
    }, [fetchPortfolio]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center py-8">
        <PieChart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-muted-foreground">ポートフォリオデータがありません</p>
        <Button asChild className="mt-4" size="sm">
          <Link href="/portfolio">
            ポートフォリオを作成
          </Link>
        </Button>
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

  const getTrendIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getTrendColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLabel = (score: number) => {
    if (score <= 3) return '低リスク';
    if (score <= 6) return '中リスク';
    return '高リスク';
  };

  const getDiversificationColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDiversificationLabel = (score: number) => {
    if (score >= 8) return '良好';
    if (score >= 6) return '普通';
    return '改善必要';
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">ポートフォリオ概要</h3>
          <Badge variant="outline" className="text-xs">
            <Activity className="h-3 w-3 mr-1" />
            リアルタイム
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              {getTrendIcon(portfolio.totalGainPercent)}
              <span className={getTrendColor(portfolio.totalGainPercent)}>
                {formatPercentage(portfolio.totalGainPercent)}
              </span>
              <span className="text-muted-foreground">
                ({formatCurrency(portfolio.totalGain)})
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">今日の損益</div>
            <div className={`text-xl font-bold ${getTrendColor(portfolio.todayGain)}`}>
              {formatCurrency(portfolio.todayGain)}
            </div>
            <div className="flex items-center space-x-1 text-sm">
              {getTrendIcon(portfolio.todayGainPercent)}
              <span className={getTrendColor(portfolio.todayGainPercent)}>
                {formatPercentage(portfolio.todayGainPercent)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk & Diversification */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getRiskColor(portfolio.riskScore)}`}>
            {portfolio.riskScore.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">リスクスコア</div>
          <div className="text-xs font-medium">
            {getRiskLabel(portfolio.riskScore)}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getDiversificationColor(portfolio.diversificationScore)}`}>
            {portfolio.diversificationScore.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">分散度</div>
          <div className="text-xs font-medium">
            {getDiversificationLabel(portfolio.diversificationScore)}
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">保有銘柄</h3>
          <span className="text-xs text-muted-foreground">
            {portfolio.holdings.length} 銘柄
          </span>
        </div>
        <div className="space-y-2">
          {portfolio.holdings.map((holding) => (
            <div key={holding.symbol} className="flex items-center space-x-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{holding.symbol}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{holding.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {holding.amount.toFixed(4)} {holding.symbol}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(holding.value)}
                    </p>
                    <div className="flex items-center justify-end space-x-1">
                      {getTrendIcon(holding.totalGainPercent)}
                      <span className={`text-xs ${getTrendColor(holding.totalGainPercent)}`}>
                        {formatPercentage(holding.totalGainPercent)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full" 
                        style={{ width: `${holding.allocation}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {holding.allocation.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(holding.changePercent24h)}
                    <span className={`text-xs ${getTrendColor(holding.changePercent24h)}`}>
                      {formatPercentage(holding.changePercent24h)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href="/portfolio/rebalance">
            <Target className="h-4 w-4 mr-2" />
            リバランス
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/portfolio">
            詳細を表示
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground text-center">
        最終更新: {new Date().toLocaleString('ja-JP')}
      </div>
    </div>
  );
}