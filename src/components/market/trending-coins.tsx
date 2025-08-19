'use client';

import * as React from "react"
// using React.use* hooks; named imports removed to avoid unused warnings
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Star } from 'lucide-react';

interface TrendingCoin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  price_btc: number;
  score: number;
  data: {
    price: string;
    price_change_percentage_24h: { [key: string]: number };
  };
}

export function TrendingCoins() {
  const [trending, setTrending] = React.useState<TrendingCoin[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const fetchTrendingCoins = async () => {
    try {
      const response = await fetch('/api/market/analysis?action=trending');
      
      if (!response.ok) {
        throw new Error('Failed to fetch trending coins');
      }

      const data = await response.json();
      const coins = data.data?.coins?.map((item: { item: TrendingCoin }) => item.item) || [];
      setTrending(coins);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Trending Coins
          </CardTitle>
          <CardDescription>Most searched coins in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Trending Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Trending Coins
        </CardTitle>
        <CardDescription>Most searched coins in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trending.map((coin, index) => {
            const priceChange = coin.data?.price_change_percentage_24h?.usd || 0;
            
            return (
              <div key={coin.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    <Image 
                      src={coin.thumb} 
                      alt={coin.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                  {coin.market_cap_rank && (
                    <span className="text-xs text-muted-foreground">
                      Rank #{coin.market_cap_rank}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {coin.data?.price && (
                    <p className="font-medium">{coin.data.price}</p>
                  )}
                  {priceChange !== 0 && (
                    <p className={`text-sm ${priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 
