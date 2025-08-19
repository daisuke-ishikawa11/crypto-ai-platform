'use client';

import * as React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiskMitigation, MitigationRecommendation } from '@/lib/risk/types';
import { TrendingDown, Shield, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export function RiskRecommendations() {
  const [mitigation, setMitigation] = React.useState<RiskMitigation | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [implementedActions, setImplementedActions] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/risk/recommendations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      
      const data = await response.json();
      setMitigation(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setLoading(false);
    }
  };

  const implementAction = (index: number) => {
    setImplementedActions(new Set([...implementedActions, index]));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reduce_position':
        return <TrendingDown className="h-5 w-5" />;
      case 'set_stop_loss':
        return <Shield className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Mitigation Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!mitigation || mitigation.recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Your portfolio is well-balanced. No risk mitigation actions needed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Score Impact</CardTitle>
          <CardDescription>
            Projected risk reduction from implementing recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Risk</p>
              <p className="text-3xl font-bold text-red-600">{mitigation.current_risk_score}</p>
            </div>
            <ArrowRight className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Projected Risk</p>
              <p className="text-3xl font-bold text-green-600">{mitigation.projected_risk_score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Reduction</p>
              <p className="text-3xl font-bold">
                -{mitigation.current_risk_score - mitigation.projected_risk_score}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mitigation.recommendations.map((rec: MitigationRecommendation, index: number) => (
          <Card key={index} className={implementedActions.has(index) ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getPriorityColor(rec.priority)}`}>
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{rec.description}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Risk reduction: -{rec.risk_reduction} points
                      </span>
                    </div>
                  </div>
                </div>
                {implementedActions.has(index) ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Button
                    size="sm"
                    onClick={() => implementAction(index)}
                  >
                    Implement
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rec.specific_actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="pl-4 border-l-2 border-muted">
                    <p className="font-medium text-sm">{action.action}</p>
                    {action.current_value !== undefined && action.recommended_value !== undefined && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.current_value}% → {action.recommended_value}%
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{action.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
          <CardDescription>
            Steps to implement risk mitigation recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </span>
              <span className="text-sm">
                Review each recommendation and understand the rationale
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </span>
              <span className="text-sm">
                Start with high-priority actions for maximum risk reduction
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </span>
              <span className="text-sm">
                Execute trades during optimal market conditions
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                4
              </span>
              <span className="text-sm">
                Monitor portfolio risk score after implementation
              </span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
} 
