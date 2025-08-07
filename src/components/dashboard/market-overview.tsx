'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ExternalLink,
  Minus,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  dominance?: number;
  fearGreedIndex?: number;
  icon?: string;
}

interface MarketSentiment {
  fearGreedIndex: number;
  volatilityIndex: number;
  trendStrength: number;
  marketStatus: 'bullish' | 'bearish' | 'neutral';
}

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [sentiment, setSentiment] = useState<MarketSentiment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // 実際のAPI呼び出しに置き換える
        const response = await fetch('/api/market/overview');
        if (response.ok) {
          const data = await response.json();
          setMarketData(data.marketData || []);
          setSentiment(data.sentiment || null);
        }
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        // フォールバックデータ
        setMarketData([
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            price: 6500000,
            change24h: 150000,
            changePercent24h: 2.4,
            volume24h: 45000000000,
            marketCap: 1250000000000,
            dominance: 45.2
          },
          {
            symbol: 'ETH',
            name: 'Ethereum',
            price: 280000,
            change24h: -8500,
            changePercent24h: -2.9,
            volume24h: 18000000000,
            marketCap: 420000000000,
            dominance: 18.5
          },
          {
            symbol: 'BNB',
            name: 'Binance Coin',
            price: 45000,
            change24h: 1200,
            changePercent24h: 2.7,
            volume24h: 2500000000,
            marketCap: 67000000000,
            dominance: 3.8
          },
          {
            symbol: 'SOL',
            name: 'Solana',
            price: 12500,
            change24h: -450,
            changePercent24h: -3.5,
            volume24h: 1800000000,
            marketCap: 52000000000,
            dominance: 2.1
          },
          {
            symbol: 'ADA',
            name: 'Cardano',
            price: 78,
            change24h: 2.1,
            changePercent24h: 2.8,
            volume24h: 890000000,
            marketCap: 28000000000,
            dominance: 1.2
          }
        ]);
        setSentiment({
          fearGreedIndex: 72,
          volatilityIndex: 35,
          trendStrength: 68,
          marketStatus: 'bullish'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // 1分ごとに更新
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1000000000000) {
      return `${(value / 1000000000000).toFixed(1)}兆`;
    } else if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else {
      return value.toLocaleString();
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) {
      return 'text-green-600';
    } else if (change < 0) {
      return 'text-red-600';
    } else {
      return 'text-gray-600';
    }
  };

  const getSentimentColor = (value: number) => {
    if (value >= 75) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentLabel = (value: number) => {
    if (value >= 75) return '強気';
    if (value >= 50) return '中立';
    return '弱気';
  };

  const getMarketStatusIcon = (status: string) => {
    switch (status) {
      case 'bullish':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'bearish':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getMarketStatusLabel = (status: string) => {
    switch (status) {
      case 'bullish':
        return '上昇相場';
      case 'bearish':
        return '下降相場';
      default:
        return '横ばい';
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Sentiment */}
      {sentiment && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">市場センチメント</h3>
            <div className="flex items-center space-x-2">
              {getMarketStatusIcon(sentiment.marketStatus)}
              <span className="text-sm font-medium">
                {getMarketStatusLabel(sentiment.marketStatus)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getSentimentColor(sentiment.fearGreedIndex)}`}>
                {sentiment.fearGreedIndex}
              </div>
              <div className="text-xs text-muted-foreground">
                恐怖・強欲指数
              </div>
              <div className="text-xs font-medium">
                {getSentimentLabel(sentiment.fearGreedIndex)}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getSentimentColor(100 - sentiment.volatilityIndex)}`}>
                {sentiment.volatilityIndex}
              </div>
              <div className="text-xs text-muted-foreground">
                ボラティリティ
              </div>
              <div className="text-xs font-medium">
                {sentiment.volatilityIndex > 50 ? '高' : '低'}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getSentimentColor(sentiment.trendStrength)}`}>
                {sentiment.trendStrength}
              </div>
              <div className="text-xs text-muted-foreground">
                トレンド強度
              </div>
              <div className="text-xs font-medium">
                {sentiment.trendStrength > 50 ? '強' : '弱'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Cryptocurrencies */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">主要暗号通貨</h3>
          <Badge variant="outline" className="text-xs">
            <Activity className="h-3 w-3 mr-1" />
            リアルタイム
          </Badge>
        </div>
        <div className="space-y-2">
          {marketData.map((coin) => (
            <div key={coin.symbol} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{coin.symbol}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{coin.name}</p>
                    <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(coin.price)}
                    </p>
                    <div className="flex items-center justify-end space-x-1">
                      {getTrendIcon(coin.changePercent24h)}
                      <span className={`text-xs ${getTrendColor(coin.changePercent24h)}`}>
                        {coin.changePercent24h >= 0 ? '+' : ''}{coin.changePercent24h.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>出来高: {formatLargeNumber(coin.volume24h)}</span>
                  <span>時価総額: {formatLargeNumber(coin.marketCap)}</span>
                  {coin.dominance && (
                    <span>ドミナンス: {coin.dominance}%</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href="/market/analysis">
            <Activity className="h-4 w-4 mr-2" />
            詳細分析
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/market">
            すべての市場データ
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