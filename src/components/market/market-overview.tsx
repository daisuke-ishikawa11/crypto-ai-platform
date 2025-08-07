'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface GlobalMarketData {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_24h: number;
  bitcoin_dominance: number;
}

export function MarketOverview() {
  const [marketData, setMarketData] = useState<GlobalMarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market/global');
      
      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }
      
      const data = await response.json();
      setMarketData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch market data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            {error || 'Failed to load market data'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  const cards = [
    {
      title: 'Total Market Cap',
      value: formatCurrency(marketData.total_market_cap),
      description: '24h change',
      change: marketData.market_cap_change_24h,
      icon: DollarSign
    },
    {
      title: '24h Volume',
      value: formatCurrency(marketData.total_volume),
      description: 'Trading volume',
      icon: Activity
    },
    {
      title: 'BTC Dominance',
      value: `${marketData.bitcoin_dominance.toFixed(1)}%`,
      description: 'Market share',
      icon: TrendingUp
    },
    {
      title: 'Market Trend',
      value: marketData.market_cap_change_24h > 0 ? 'Bullish' : 'Bearish',
      description: '24h sentiment',
      change: marketData.market_cap_change_24h,
      icon: marketData.market_cap_change_24h > 0 ? TrendingUp : TrendingDown
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
                {card.change !== undefined && (
                  <span className={card.change > 0 ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                    {card.change > 0 ? '+' : ''}{card.change.toFixed(2)}%
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 