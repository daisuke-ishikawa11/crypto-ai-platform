'use client';

import * as React from "react"
import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioRiskMetrics } from '@/lib/risk/types';
import { Progress } from '@/components/ui/progress';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function RiskOverview() {
  const [metrics, setMetrics] = React.useState<PortfolioRiskMetrics | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchRiskMetrics();
  }, []);

  const fetchRiskMetrics = React.useCallback(async () => {
    try {
      const response = await fetch('/api/risk/analysis?type=portfolio');
      
      if (!response.ok) {
        throw new Error('Failed to fetch risk metrics');
      }
      
      const data = await response.json();
      setMetrics(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch risk metrics:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No risk analysis available. Please add holdings to your portfolio.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (score: number) => {
    if (score < 30) return 'Low';
    if (score < 60) return 'Moderate';
    if (score < 80) return 'High';
    return 'Critical';
  };

  const getTrendIcon = (value: number) => {
    if (value > 5) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value < -5) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Portfolio Risk</CardTitle>
          <CardDescription>
            Comprehensive risk assessment based on multiple factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Risk Score</span>
                <span className={`text-sm font-bold ${getRiskColor(metrics.total_risk_score)}`}>
                  {metrics.total_risk_score}/100 ({getRiskLevel(metrics.total_risk_score)})
                </span>
              </div>
              <Progress value={metrics.total_risk_score} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(metrics.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(0)}
                <div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <p className="text-sm font-medium">Stable</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Volatility Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Portfolio Volatility</span>
              <span className="font-medium">{metrics.volatility.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Maximum Drawdown</span>
              <span className="font-medium text-red-600">-{metrics.max_drawdown.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Beta (Market Correlation)</span>
              <span className="font-medium">{metrics.beta.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk-Adjusted Returns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Sharpe Ratio</span>
              <span className="font-medium">{metrics.sharpe_ratio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Sortino Ratio</span>
              <span className="font-medium">{metrics.sortino_ratio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Risk/Reward</span>
              <span className="font-medium">
                {metrics.sharpe_ratio > 1 ? 'Favorable' : 'Unfavorable'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value at Risk (VaR)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">VaR (95% confidence)</span>
              <span className="font-medium text-orange-600">-{metrics.value_at_risk.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">CVaR (Expected Shortfall)</span>
              <span className="font-medium text-red-600">-{metrics.conditional_value_at_risk.toFixed(2)}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum expected loss in worst 5% of scenarios
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Concentration Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Herfindahl Index</span>
                  <span className="font-medium">{(metrics.concentration_risk * 100).toFixed(1)}%</span>
                </div>
                <Progress value={metrics.concentration_risk * 100} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics.concentration_risk > 0.3 
                  ? 'High concentration - consider diversifying' 
                  : 'Good diversification'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
