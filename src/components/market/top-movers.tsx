'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '@/lib/market/types';

export function TopMovers() {
  const [movers, setMovers] = React.useState<MarketData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchTopMovers();
  }, []);

  const fetchTopMovers = async () => {
    try {
      const response = await fetch('/api/market/analysis?action=top-movers&limit=10');
      
      if (!response.ok) {
        throw new Error('Failed to fetch top movers');
      }

      const data = await response.json();
      setMovers(data.data || []);
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
          <CardTitle>Top Movers</CardTitle>
          <CardDescription>Loading market data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
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
          <CardTitle>Top Movers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const gainers = movers.filter(coin => coin.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const losers = movers.filter(coin => coin.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Top Gainers (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gainers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${coin.current_price.toLocaleString()}</p>
                  <p className="text-sm text-green-600">
                    +{coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Top Losers (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {losers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${coin.current_price.toLocaleString()}</p>
                  <p className="text-sm text-red-600">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
