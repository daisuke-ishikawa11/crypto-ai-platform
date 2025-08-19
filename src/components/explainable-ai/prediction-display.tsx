'use client';

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AIPrediction, 
  ReasoningStep, 
  FeatureImportance 
} from '@/lib/explainable-ai/types';
import { 
  Info, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Brain,
  BarChart3
} from 'lucide-react';

interface PredictionDisplayProps {
  prediction: AIPrediction;
  steps?: ReasoningStep[];
  features?: FeatureImportance[];
}

export function PredictionDisplay({ 
  prediction, 
  steps = [], 
  features = [] 
}: PredictionDisplayProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'bearish':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <CardTitle>AI Prediction</CardTitle>
            </div>
            <Badge variant="outline">{prediction.predictionType.replace('_', ' ')}</Badge>
          </div>
          {prediction.assetSymbol && (
            <CardDescription>Analysis for {prediction.assetSymbol}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Prediction Result */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold flex items-center gap-2">
                  {getDirectionIcon(prediction.prediction.metadata?.direction as string)}
                  {prediction.prediction.label}
                </span>
                <span className={`font-bold ${getConfidenceColor(prediction.confidence)}`}>
                  {(prediction.confidence * 100).toFixed(0)}% Confidence
                </span>
              </div>
              <Progress value={prediction.confidence * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">{prediction.reasoning.summary}</p>
            </div>

            {/* Key Factors */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Key Factors
              </h4>
              <div className="space-y-2">
                {prediction.keyFactors.map((factor, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{factor.factor}</span>
                    <Badge variant="secondary">
                      {(factor.impact * 100).toFixed(0)}% impact
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reasoning" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reasoning">Reasoning Steps</TabsTrigger>
              <TabsTrigger value="features">Feature Analysis</TabsTrigger>
              <TabsTrigger value="visualization">Visualizations</TabsTrigger>
            </TabsList>

            {/* Reasoning Steps */}
            <TabsContent value="reasoning" className="space-y-4">
              {steps.map((step, i) => (
                <div key={step.id || i} className="border-l-2 border-primary pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-semibold text-sm">
                      Step {step.stepOrder}: {step.stepType.replace('_', ' ')}
                    </h5>
                    {step.confidence && (
                      <span className="text-xs text-muted-foreground">
                        {(step.confidence * 100).toFixed(0)}% confidence
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {step.explanation && (
                    <p className="text-sm mt-1">{step.explanation}</p>
                  )}
                </div>
              ))}
            </TabsContent>

            {/* Feature Analysis */}
            <TabsContent value="features" className="space-y-4">
              {features
                .sort((a, b) => b.importanceScore - a.importanceScore)
                .map((feature, i) => (
                  <div key={feature.id || i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-sm">{feature.featureName}</h5>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          feature.contributionDirection === 'positive' ? 'default' :
                          feature.contributionDirection === 'negative' ? 'destructive' :
                          'secondary'
                        }>
                          {feature.contributionDirection}
                        </Badge>
                        <span className="text-sm font-medium">
                          {(feature.importanceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={feature.importanceScore * 100} className="h-2" />
                    {feature.explanation && (
                      <p className="text-sm text-muted-foreground">{feature.explanation}</p>
                    )}
                  </div>
                ))}
            </TabsContent>

            {/* Visualizations */}
            <TabsContent value="visualization">
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive charts will be displayed here</p>
                  <p className="text-sm">Showing price trends, indicators, and predictions</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 