'use client';

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/fetcher';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Search, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { MarketAnalysis } from '@/lib/market/types';
import { useAnalytics } from '@/lib/analytics/use-analytics';

export function CoinAnalysis() {
  const [coinId, setCoinId] = React.useState('');
  const [analysis, setAnalysis] = React.useState<MarketAnalysis | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { track } = useAnalytics();

  const analyzeCoin = async () => {
    if (!coinId.trim()) return;

    setLoading(true);
    setError(null);
    
    const startTime = Date.now();
    track('market_analysis_started', { coinId: coinId.toLowerCase() });

    try {
      const response = await apiFetch('/api/market/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coin_id: coinId.toLowerCase() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to analyze coin';
        track('market_analysis_failed', { 
          coinId: coinId.toLowerCase(), 
          error: errorMessage 
        });
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setAnalysis(data);
      
      // 成功をトラッキング
      const duration = Date.now() - startTime;
      track('market_analysis_completed', {
        coinId: coinId.toLowerCase(),
        duration
      });
      
      // 機能使用もトラッキング
      track('feature_used', {
        feature: 'market_analysis',
        details: {
          coin: coinId.toLowerCase(),
          response_time_ms: duration,
          has_ai_insights: !!data.ai_insights
        }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      
      // エラーの詳細をトラッキング
      track('error_occurred', {
        type: 'market_analysis_error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyze Cryptocurrency</CardTitle>
          <CardDescription>
            Enter a coin ID to get AI-powered market analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter coin ID (e.g., bitcoin, ethereum)"
              value={coinId}
              onChange={(e) => setCoinId(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') analyzeCoin() }}
            />
            <Button onClick={analyzeCoin} disabled={loading || !coinId.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {analysis.market_data.name}
                    <span className="px-2 py-1 text-xs rounded bg-secondary">{analysis.market_data.symbol.toUpperCase()}</span>
                  </CardTitle>
                  <CardDescription>
                    Rank #{analysis.market_data.market_cap_rank}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ${analysis.market_data.current_price.toLocaleString()}
                  </div>
                  <div className={analysis.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
                    {analysis.market_data.price_change_percentage_24h > 0 ? '+' : ''}
                    {analysis.market_data.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="font-medium">${(analysis.market_data.market_cap / 1e9).toFixed(2)}B</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="font-medium">${(analysis.market_data.total_volume / 1e9).toFixed(2)}B</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h High</p>
                  <p className="font-medium">${analysis.market_data.high_24h.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Low</p>
                  <p className="font-medium">${analysis.market_data.low_24h.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">RSI (14)</span>
                  <span className="font-medium">{analysis.technical_indicators.rsi.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">MACD</span>
                  <span className="font-medium">{analysis.technical_indicators.macd.value.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">SMA 20</span>
                  <span className="font-medium">${analysis.technical_indicators.moving_averages.sma_20.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Volume Ratio</span>
                  <span className="font-medium">{(analysis.technical_indicators.volume_profile.volume_ratio * 100).toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Sentiment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Fear & Greed Index</span>
                  <span className="font-medium">{analysis.sentiment.fear_greed_index}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Social Sentiment</span>
                  <span className="px-2 py-1 text-xs rounded border">{analysis.sentiment.social_sentiment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Whale Activity</span>
                  <span className="font-medium">
                    {analysis.sentiment.whale_activity.whale_accumulation ? 'Accumulating' : 'Distributing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Large Transactions</span>
                  <span className="font-medium">{analysis.sentiment.whale_activity.large_transactions}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                AI-powered insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Trend:</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(analysis.ai_insights.trend)}
                    <span className="font-medium capitalize">{analysis.ai_insights.trend}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <span className="font-medium">{(analysis.ai_insights.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Risk:</span>
                  <span className={`font-medium capitalize ${getRiskColor(analysis.ai_insights.risk_level)}`}>
                    {analysis.ai_insights.risk_level}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Factors</h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.ai_insights.key_factors.map((factor, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{factor}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendation</h4>
                <p className="text-sm text-muted-foreground">{analysis.ai_insights.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
} 
