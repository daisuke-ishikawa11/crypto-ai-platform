'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Atom, 
  TrendingUp, 
  Shield, 
  Zap,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

interface OptimizationParams {
  minStability: number;
  maxRisk: number;
  targetReturn: number;
  minWeight: number;
  maxWeight: number;
  maxAssets: number;
  walkSteps: number;
  coherenceTime: number;
  compatibilityThreshold: number;
}

export default function PortfolioOptimizePage() {
  const [assets, setAssets] = useState<string[]>(['BTC', 'ETH', 'BNB']);
  const [assetInput, setAssetInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    portfolio: { weights: Record<string, number> };
    optimization: {
      phase: { phase: string; entropy: number; energy: number; temperature?: number };
      stabilityScore: number;
      compatibilityScore: number;
      predictedTransitions?: Array<{
        fromPhase: string;
        toPhase: string;
        triggerCondition: string;
        probability: number;
      }>;
      phaseDiagram?: Array<{ riskLevel: number; returnLevel: number }>;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [params, setParams] = useState<OptimizationParams>({
    minStability: 0.7,
    maxRisk: 0.25,
    targetReturn: 0.15,
    minWeight: 0.05,
    maxWeight: 0.4,
    maxAssets: 8,
    walkSteps: 100,
    coherenceTime: 50,
    compatibilityThreshold: 0.5
  });
  
  const addAsset = () => {
    const symbol = assetInput.trim().toUpperCase();
    if (symbol && !assets.includes(symbol)) {
      setAssets([...assets, symbol]);
      setAssetInput('');
    }
  };
  
  const removeAsset = (symbol: string) => {
    setAssets(assets.filter(a => a !== symbol));
  };
  
  const runOptimization = async () => {
    if (assets.length < 3) {
      setError('At least 3 assets are required for optimization');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/portfolio/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assets, params })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Optimization failed');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'stable': return 'text-green-500';
      case 'metastable': return 'text-yellow-500';
      case 'transition': return 'text-orange-500';
      case 'unstable': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'stable': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'metastable': return <Info className="w-5 h-5 text-yellow-500" />;
      case 'transition': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'unstable': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">材料科学ポートフォリオ最適化</h1>
        <p className="text-muted-foreground">
          材料科学の相構造分析と量子ウォークアルゴリズムを応用した革新的なポートフォリオ最適化
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5" />
                資産選択
              </CardTitle>
              <CardDescription>
                最適化する暗号資産を選択（最小3つ）
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="例: SOL"
                  value={assetInput}
                  onChange={(e) => setAssetInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAsset()}
                />
                <Button onClick={addAsset} size="sm">追加</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {assets.map(asset => (
                  <Badge
                    key={asset}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeAsset(asset)}
                  >
                    {asset} ✕
                  </Badge>
                ))}
              </div>
              
              {assets.length < 3 && (
                <Alert>
                  <AlertDescription>
                    最小3つの資産が必要です
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                最適化パラメータ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>最小安定性スコア: {params.minStability}</Label>
                <Slider
                  value={[params.minStability]}
                  onValueChange={([v]: number[]) => setParams({...params, minStability: v})}
                  min={0.5}
                  max={1}
                  step={0.05}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>最大リスク: {(params.maxRisk * 100).toFixed(0)}%</Label>
                <Slider
                  value={[params.maxRisk]}
                  onValueChange={([v]: number[]) => setParams({...params, maxRisk: v})}
                  min={0.1}
                  max={0.5}
                  step={0.05}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>目標リターン: {(params.targetReturn * 100).toFixed(0)}%</Label>
                <Slider
                  value={[params.targetReturn]}
                  onValueChange={([v]: number[]) => setParams({...params, targetReturn: v})}
                  min={0.05}
                  max={0.3}
                  step={0.05}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>相性閾値: {params.compatibilityThreshold}</Label>
                <Slider
                  value={[params.compatibilityThreshold]}
                  onValueChange={([v]: number[]) => setParams({...params, compatibilityThreshold: v})}
                  min={0.3}
                  max={0.8}
                  step={0.05}
                  className="mt-2"
                />
              </div>
              
              <Button 
                onClick={runOptimization} 
                disabled={loading || assets.length < 3}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    最適化中...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    最適化実行
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Results Panel */}
        <div className="lg:col-span-2">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {result && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">概要</TabsTrigger>
                <TabsTrigger value="weights">配分</TabsTrigger>
                <TabsTrigger value="phase">相構造</TabsTrigger>
                <TabsTrigger value="transitions">相転移</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>最適化結果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">ポートフォリオ相</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          {getPhaseIcon(result.optimization.phase.phase)}
                          <p className={`text-lg font-semibold ${getPhaseColor(result.optimization.phase.phase)}`}>
                            {result.optimization.phase.phase.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">安定性スコア</p>
                        <p className="text-2xl font-bold mt-1">
                          {(result.optimization.stabilityScore * 100).toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">相性スコア</p>
                        <p className="text-2xl font-bold mt-1">
                          {(result.optimization.compatibilityScore * 100).toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">エントロピー</p>
                        <p className="text-2xl font-bold mt-1">
                          {result.optimization.phase.entropy.toFixed(3)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>材料科学メトリクス</CardTitle>
                    <CardDescription>
                      ポートフォリオの物理的特性
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">エネルギーレベル</span>
                        <span className="font-medium">
                          {result.optimization.phase.energy.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">市場温度</span>
                        <span className="font-medium">
                          {result.optimization.phase.temperature?.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">構成エントロピー</span>
                        <span className="font-medium">
                          {result.optimization.phase.entropy.toFixed(3)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="weights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>最適化されたポートフォリオ配分</CardTitle>
                    <CardDescription>
                      量子ウォークアルゴリズムによる最適配分
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(result.portfolio.weights)
                        .sort(([, a], [, b]) => (b as number) - (a as number))
                        .map(([asset, weight]) => (
                          <div key={asset}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{asset}</span>
                              <span>{((weight as number) * 100).toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${(weight as number) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="phase" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>ポートフォリオ相構造分析</CardTitle>
                    <CardDescription>
                      リスク・リターン空間における相図
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gray-50 rounded-lg p-4">
                      {/* Here would be a phase diagram visualization */}
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        相図ビジュアライゼーション
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">相の特徴</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          {result.optimization.phase.phase === 'stable' && (
                            <>
                              <li>• 高いシャープレシオ</li>
                              <li>• 低ボラティリティ</li>
                              <li>• 良好な分散</li>
                            </>
                          )}
                          {result.optimization.phase.phase === 'metastable' && (
                            <>
                              <li>• 中程度のリスク・リターン</li>
                              <li>• 外部要因に敏感</li>
                              <li>• 調整が必要な可能性</li>
                            </>
                          )}
                          {result.optimization.phase.phase === 'unstable' && (
                            <>
                              <li>• 高リスク状態</li>
                              <li>• 即座の再構築推奨</li>
                              <li>• 市場ストレスに脆弱</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">推奨アクション</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          {result.optimization.phase.phase === 'stable' && (
                            <>
                              <li>• 現状維持</li>
                              <li>• 定期的なモニタリング</li>
                              <li>• 小幅な調整のみ</li>
                            </>
                          )}
                          {result.optimization.phase.phase === 'metastable' && (
                            <>
                              <li>• リスク監視強化</li>
                              <li>• 段階的な調整</li>
                              <li>• ヘッジ戦略検討</li>
                            </>
                          )}
                          {result.optimization.phase.phase === 'unstable' && (
                            <>
                              <li>• ポジション削減</li>
                              <li>• リスク資産の売却</li>
                              <li>• 安全資産への移行</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transitions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>予測される相転移</CardTitle>
                    <CardDescription>
                      今後30日間の相転移確率
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {result.optimization.predictedTransitions && result.optimization.predictedTransitions.length > 0 ? (
                      <div className="space-y-4">
                        {result.optimization.predictedTransitions.map((transition, idx) => (
                          <div key={idx} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${getPhaseColor(transition.fromPhase)}`}>
                                  {transition.fromPhase}
                                </span>
                                <span>→</span>
                                <span className={`font-medium ${getPhaseColor(transition.toPhase)}`}>
                                  {transition.toPhase}
                                </span>
                              </div>
                              <Badge variant="secondary">
                                {(transition.probability * 100).toFixed(1)}%
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {transition.triggerCondition}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        現在の相は安定しており、大きな転移は予測されていません
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}