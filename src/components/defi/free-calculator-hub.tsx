"use client"

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Zap, 
  
  AlertTriangle,
  Sparkles,
  Gift
} from 'lucide-react'

interface CalculatorResult {
  value: number
  description: string
  riskLevel?: 'low' | 'medium' | 'high'
  educationalNote?: string
}

// Impermanent Loss Calculator
const ImpermanentLossCalculator = () => {
  const [initialPrice1, setInitialPrice1] = useState<number>(100)
  const [initialPrice2, setInitialPrice2] = useState<number>(1000)
  const [currentPrice1, setCurrentPrice1] = useState<number>(120)
  const [currentPrice2, setCurrentPrice2] = useState<number>(1200)
  const [result, setResult] = useState<CalculatorResult | null>(null)

  const calculateIL = () => {
    const ratio1 = currentPrice1 / initialPrice1
    const ratio2 = currentPrice2 / initialPrice2
    const priceRatio = Math.sqrt(ratio1 * ratio2)
    const il = ((2 * priceRatio) / (1 + (ratio1 / ratio2))) - 1
    const ilPercentage = il * 100

    setResult({
      value: ilPercentage,
      description: `${ilPercentage > 0 ? '+' : ''}${ilPercentage.toFixed(2)}% IL`,
      riskLevel: Math.abs(ilPercentage) > 10 ? 'high' : Math.abs(ilPercentage) > 5 ? 'medium' : 'low',
      educationalNote: 'Impermanent Loss occurs when token prices diverge. Consider this when providing liquidity.'
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Impermanent Loss Calculator
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Token A - Initial Price</Label>
            <Input
              type="number"
              value={initialPrice1}
              onChange={(e) => setInitialPrice1(Number(e.target.value))}
              placeholder="100"
            />
          </div>
          <div>
            <Label>Token A - Current Price</Label>
            <Input
              type="number"
              value={currentPrice1}
              onChange={(e) => setCurrentPrice1(Number(e.target.value))}
              placeholder="120"
            />
          </div>
          <div>
            <Label>Token B - Initial Price</Label>
            <Input
              type="number"
              value={initialPrice2}
              onChange={(e) => setInitialPrice2(Number(e.target.value))}
              placeholder="1000"
            />
          </div>
          <div>
            <Label>Token B - Current Price</Label>
            <Input
              type="number"
              value={currentPrice2}
              onChange={(e) => setCurrentPrice2(Number(e.target.value))}
              placeholder="1200"
            />
          </div>
        </div>

        <Button onClick={calculateIL} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate IL
        </Button>

        {result && (
          <Card className="bg-slate-50 border-l-4 border-orange-400">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{result.description}</span>
                <Badge 
                  variant={result.riskLevel === 'high' ? 'destructive' : 
                          result.riskLevel === 'medium' ? 'default' : 'secondary'}
                >
                  {result.riskLevel?.toUpperCase()} RISK
                </Badge>
              </div>
              <p className="text-sm text-slate-600">{result.educationalNote}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

// Yield Calculator with Compound Interest
const YieldCalculator = () => {
  const [principal, setPrincipal] = useState<number>(1000)
  const [apr, setApr] = useState<number>(12)
  const [days, setDays] = useState<number>(365)
  const [compoundFreq, setCompoundFreq] = useState<number>(365)
  interface YieldResults {
    simple: number
    compound: number
    daily: number
    apy: number
  }
  const [results, setResults] = useState<YieldResults | null>(null)

  const calculateYield = () => {
    const dailyRate = apr / 100 / 365
    const compoundRate = apr / 100 / compoundFreq
    const periods = (days / 365) * compoundFreq

    // Simple APR
    const simpleYield = principal * (apr / 100) * (days / 365)
    
    // Compound APY
    const compoundYield = principal * (Math.pow(1 + compoundRate, periods) - 1)
    
    // Daily compound (realistic for DeFi)
    const dailyCompound = principal * (Math.pow(1 + dailyRate, days) - 1)

    setResults({
      simple: simpleYield,
      compound: compoundYield,
      daily: dailyCompound,
      apy: (Math.pow(1 + compoundRate, compoundFreq) - 1) * 100
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Yield Calculator
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Principal Amount ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              placeholder="1000"
            />
          </div>
          <div>
            <Label>APR (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              placeholder="12"
            />
          </div>
          <div>
            <Label>Time Period (Days)</Label>
            <Input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              placeholder="365"
            />
          </div>
          <div>
            <Label htmlFor="compound-frequency-select">Compound Frequency</Label>
            <select
              id="compound-frequency-select"
              title="Compound Frequency"
              className="w-full p-2 border rounded"
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(Number(e.target.value))}
            >
              <option value={365}>Daily</option>
              <option value={12}>Monthly</option>
              <option value={4}>Quarterly</option>
              <option value={1}>Annually</option>
            </select>
          </div>
        </div>

        <Button onClick={calculateYield} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Yield
        </Button>

        {results && (
          <div className="space-y-2">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-green-600">Effective APY</p>
                  <p className="text-2xl font-bold text-green-700">
                    {results.apy.toFixed(2)}%
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-3 gap-2">
              <Card className="bg-slate-50">
                <CardContent className="pt-2 pb-2">
                  <p className="text-xs text-slate-600">Simple</p>
                  <p className="font-bold">${results.simple.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50">
                <CardContent className="pt-2 pb-2">
                  <p className="text-xs text-slate-600">Compound</p>
                  <p className="font-bold">${results.compound.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50">
                <CardContent className="pt-2 pb-2">
                  <p className="text-xs text-slate-600">Daily</p>
                  <p className="font-bold text-green-600">${results.daily.toFixed(2)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Risk Calculator
const RiskCalculator = () => {
  const [allocation1, setAllocation1] = useState<number>(50)
  const [allocation2, setAllocation2] = useState<number>(30)
  const [allocation3, setAllocation3] = useState<number>(20)
  const [volatility1, setVolatility1] = useState<number>(15)
  const [volatility2, setVolatility2] = useState<number>(25)
  const [volatility3, setVolatility3] = useState<number>(40)
  const [riskScore, setRiskScore] = useState<number | null>(null)

  const calculateRisk = () => {
    const totalAllocation = allocation1 + allocation2 + allocation3
    const norm1 = allocation1 / totalAllocation
    const norm2 = allocation2 / totalAllocation
    const norm3 = allocation3 / totalAllocation
    
    // Portfolio weighted volatility (simplified)
    const portfolioVolatility = Math.sqrt(
      norm1 * norm1 * volatility1 * volatility1 +
      norm2 * norm2 * volatility2 * volatility2 +
      norm3 * norm3 * volatility3 * volatility3
    )
    
    setRiskScore(portfolioVolatility)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Portfolio Risk Calculator
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Asset 1 Allocation (%)</Label>
              <Input
                type="number"
                value={allocation1}
                onChange={(e) => setAllocation1(Number(e.target.value))}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Asset 1 Volatility (%)</Label>
              <Input
                type="number"
                value={volatility1}
                onChange={(e) => setVolatility1(Number(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Asset 2 Allocation (%)</Label>
              <Input
                type="number"
                value={allocation2}
                onChange={(e) => setAllocation2(Number(e.target.value))}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Asset 2 Volatility (%)</Label>
              <Input
                type="number"
                value={volatility2}
                onChange={(e) => setVolatility2(Number(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Asset 3 Allocation (%)</Label>
              <Input
                type="number"
                value={allocation3}
                onChange={(e) => setAllocation3(Number(e.target.value))}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Asset 3 Volatility (%)</Label>
              <Input
                type="number"
                value={volatility3}
                onChange={(e) => setVolatility3(Number(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
        </div>

        <Button onClick={calculateRisk} className="w-full">
          <Shield className="h-4 w-4 mr-2" />
          Calculate Risk
        </Button>

        {riskScore && (
          <Card className={`border-l-4 ${
            riskScore > 30 ? 'bg-red-50 border-red-400' :
            riskScore > 20 ? 'bg-yellow-50 border-yellow-400' :
            'bg-green-50 border-green-400'
          }`}>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-slate-600">Portfolio Volatility</p>
                <p className="text-3xl font-bold">{riskScore.toFixed(1)}%</p>
                <Badge 
                  variant={riskScore > 30 ? 'destructive' : 
                          riskScore > 20 ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {riskScore > 30 ? 'HIGH' : riskScore > 20 ? 'MEDIUM' : 'LOW'} RISK
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

// Gas Fee Optimizer (Mock data for demo)
const GasFeeOptimizer = () => {
  interface GasPrice {
    gwei: number
    usd: string
    time: string
  }
  
  interface GasRecommendations {
    ethereum: {
      slow: GasPrice
      standard: GasPrice
      fast: GasPrice
    }
    polygon: {
      slow: GasPrice
      standard: GasPrice
      fast: GasPrice
    }
    arbitrum: {
      slow: GasPrice
      standard: GasPrice
      fast: GasPrice
    }
  }
  
  // 型安全な Object.entries ヘルパー
  function typedEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
    return Object.entries(obj as Record<string, T[keyof T]>) as Array<[keyof T, T[keyof T]]>
  }
  
  const [gasLimit, setGasLimit] = useState<number>(21000)
  const [recommendations, setRecommendations] = useState<GasRecommendations | null>(null)

  const fetchGasRecommendations = () => {
    // Mock data - in production, this would fetch real gas prices
    const mockData = {
      ethereum: {
        slow: { gwei: 15, usd: (gasLimit * 15 * 0.000000001 * 2500).toFixed(2), time: '10+ min' },
        standard: { gwei: 20, usd: (gasLimit * 20 * 0.000000001 * 2500).toFixed(2), time: '3-5 min' },
        fast: { gwei: 30, usd: (gasLimit * 30 * 0.000000001 * 2500).toFixed(2), time: '< 2 min' }
      },
      polygon: {
        slow: { gwei: 30, usd: (gasLimit * 30 * 0.000000001 * 1).toFixed(4), time: '2-3 min' },
        standard: { gwei: 35, usd: (gasLimit * 35 * 0.000000001 * 1).toFixed(4), time: '1-2 min' },
        fast: { gwei: 40, usd: (gasLimit * 40 * 0.000000001 * 1).toFixed(4), time: '< 1 min' }
      },
      arbitrum: {
        slow: { gwei: 0.1, usd: (gasLimit * 0.1 * 0.000000001 * 2500).toFixed(4), time: '1-2 min' },
        standard: { gwei: 0.2, usd: (gasLimit * 0.2 * 0.000000001 * 2500).toFixed(4), time: '< 1 min' },
        fast: { gwei: 0.3, usd: (gasLimit * 0.3 * 0.000000001 * 2500).toFixed(4), time: '< 30s' }
      }
    }
    setRecommendations(mockData)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Gas Fee Optimizer
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Gas Limit</Label>
          <Input
            type="number"
            value={gasLimit}
            onChange={(e) => setGasLimit(Number(e.target.value))}
            placeholder="21000"
          />
        </div>

        <Button onClick={fetchGasRecommendations} className="w-full">
          <Zap className="h-4 w-4 mr-2" />
          Get Recommendations
        </Button>

        {recommendations && (
          <div className="space-y-3">
            {typedEntries(recommendations).map(([chain, data]) => (
              <Card key={String(chain)} className="bg-slate-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm capitalize">{String(chain)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {typedEntries(data as Record<string, GasPrice>).map(([speed, info]) => (
                    <div key={String(speed)} className="flex justify-between items-center p-2 bg-white rounded">
                      <div>
                        <span className="font-medium capitalize">{String(speed)}</span>
                        <span className="text-xs text-slate-600 ml-2">{info.time || 'N/A'}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${info.usd || '0'}</div>
                        <div className="text-xs text-slate-600">{String(info.gwei || 0)} gwei</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main Calculator Hub Component
export default function FreeCalculatorHub() {
  const [activeCalculator, setActiveCalculator] = useState<string>('il')

  const calculators = [
    {
      id: 'il',
      title: 'Impermanent Loss',
      icon: AlertTriangle,
      color: 'orange',
      description: 'Calculate potential losses from LP positions'
    },
    {
      id: 'yield',
      title: 'Yield Calculator',
      icon: TrendingUp,
      color: 'green',
      description: 'APR/APY calculations with compounding'
    },
    {
      id: 'risk',
      title: 'Risk Assessment',
      icon: Shield,
      color: 'blue',
      description: 'Portfolio volatility and risk scoring'
    },
    {
      id: 'gas',
      title: 'Gas Optimizer',
      icon: Zap,
      color: 'yellow',
      description: 'Multi-chain gas fee comparison'
    }
  ]

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'il':
        return <ImpermanentLossCalculator />
      case 'yield':
        return <YieldCalculator />
      case 'risk':
        return <RiskCalculator />
      case 'gas':
        return <GasFeeOptimizer />
      default:
        return <ImpermanentLossCalculator />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🧮 DeFi計算機ツール
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            プロレベルの計算機能を完全無料で提供 - 他社有料機能レベル
          </p>
          <Card className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 flex items-center gap-3">
              <Gift className="h-6 w-6 text-green-600" />
              <div className="text-left">
                <p className="font-bold text-green-800">完全無料で利用可能</p>
                <p className="text-sm text-green-600">登録不要・制限なし</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {calculators.map((calc) => {
            const IconComponent = calc.icon
            const isActive = activeCalculator === calc.id
            
            return (
              <Card 
                key={calc.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
                onClick={() => setActiveCalculator(calc.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    isActive 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg' 
                      : `bg-${calc.color}-100 text-${calc.color}-600`
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">{calc.title}</h3>
                  <p className="text-xs text-slate-600">{calc.description}</p>
                  
                  {isActive && (
                    <Badge className="mt-2 bg-indigo-100 text-indigo-800">
                      アクティブ
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Active Calculator */}
      <div className="max-w-4xl mx-auto">
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          {renderCalculator()}
        </div>
      </div>

      {/* Free Features Highlight */}
      <Card className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-purple-800">無料で提供する価値</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-bold text-purple-700">他社では有料の機能</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• 高精度IL計算（通常$10-20/月）</li>
                <li>• 複利計算機（通常$5-15/月）</li>
                <li>• リスク分析ツール（通常$20-50/月）</li>
                <li>• マルチチェーンガス最適化（通常$10/月）</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-purple-700">当プラットフォーム独自価値</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• 完全日本語対応</li>
                <li>• 教育コンテンツ統合</li>
                <li>• モバイル最適化</li>
                <li>• 初心者向けUI/UX</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
