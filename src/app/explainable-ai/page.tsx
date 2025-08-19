'use client';

// Explainable AIは認証とクエリクライアントが必要なため動的レンダリング
export const dynamic = 'force-dynamic';

import * as React from "react"
import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query';

// クライアントサイドレンダリング用コンポーネント
function ExplainableAIClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // サーバーサイドでは何も表示しない
  if (!isClient) {
    return <div>Loading AI Analysis...</div>;
  }

  return <ExplainableAIContent />;
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/fetcher';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PredictionDisplay } from '@/components/explainable-ai/prediction-display';
import { Loader2, Brain, Search, History } from 'lucide-react';
import { 
  AIPrediction, 
  ReasoningStep, 
  FeatureImportance,
  PredictionType 
} from '@/lib/explainable-ai/types';

// 実際のExplainable AI コンテンツ
function ExplainableAIContent() {
  const [selectedType, setSelectedType] = useState<PredictionType>('market_analysis');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [selectedPrediction, setSelectedPrediction] = useState<{
    prediction: AIPrediction;
    steps: ReasoningStep[];
    features: FeatureImportance[];
  } | null>(null);

  // Fetch user's predictions
  const { data: predictions, isLoading: loadingPredictions } = useQuery({
    queryKey: ['predictions'],
    queryFn: async () => {
      const response = await fetch('/api/explainable-ai/analyze');
      if (!response.ok) throw new Error('Failed to fetch predictions');
      const data = await response.json();
      return data.predictions as AIPrediction[];
    }
  });

  // Create new analysis
  const { mutate: runAnalysis, isPending: analyzing } = useMutation({
    mutationFn: async () => {
      const response = await apiFetch('/api/explainable-ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          assetSymbol: selectedType === 'market_analysis' ? assetSymbol : undefined
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setSelectedPrediction(data);
    }
  });

  // Load specific prediction details
  const loadPredictionDetails = async (predictionId: string) => {
    const response = await fetch(`/api/explainable-ai/analyze?predictionId=${predictionId}`);
    if (!response.ok) throw new Error('Failed to load prediction details');
    const data = await response.json();
    setSelectedPrediction(data);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="w-8 h-8" />
            Explainable AI Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Get AI-powered insights with detailed explanations and reasoning
          </p>
        </div>
      </div>

      {/* Analysis Form */}
      <Card>
        <CardHeader>
          <CardTitle>New Analysis</CardTitle>
          <CardDescription>
            Select the type of analysis and provide necessary parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="analysis-type">Analysis Type</Label>
              <Select 
                value={selectedType} 
                onValueChange={(value: string) => setSelectedType(value as PredictionType)}
              >
                <SelectTrigger id="analysis-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_analysis">Market Analysis</SelectItem>
                  <SelectItem value="risk_assessment" disabled>
                    Risk Assessment (Coming Soon)
                  </SelectItem>
                  <SelectItem value="portfolio_optimization" disabled>
                    Portfolio Optimization (Coming Soon)
                  </SelectItem>
                  <SelectItem value="trading_signal" disabled>
                    Trading Signal (Coming Soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedType === 'market_analysis' && (
              <div className="space-y-2">
                <Label htmlFor="asset-symbol">Asset Symbol</Label>
                <Input
                  id="asset-symbol"
                  placeholder="e.g., bitcoin, ethereum"
                  value={assetSymbol}
                  onChange={(e) => setAssetSymbol(e.target.value)}
                />
              </div>
            )}

            <Button 
              onClick={() => runAnalysis()} 
              disabled={analyzing || (selectedType === 'market_analysis' && !assetSymbol)}
              className="w-full"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {selectedPrediction && (
        <PredictionDisplay
          prediction={selectedPrediction.prediction}
          steps={selectedPrediction.steps}
          features={selectedPrediction.features}
        />
      )}

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Analyses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingPredictions ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : predictions && predictions.length > 0 ? (
            <div className="space-y-3">
              {predictions.slice(0, 5).map((prediction) => (
                <div
                  key={prediction.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => loadPredictionDetails(prediction.id)}
                >
                  <div>
                    <p className="font-medium">
                      {prediction.predictionType.replace('_', ' ')}
                      {prediction.assetSymbol && ` - ${prediction.assetSymbol.toUpperCase()}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(prediction.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{prediction.prediction.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {(prediction.confidence * 100).toFixed(0)}% confidence
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              No analyses yet. Run your first analysis above!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ExplainableAIPage() {
  return <ExplainableAIClient />;
} 