"use client"

import * as React from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  PieChart, 
  Activity, 
  Target,
  TrendingUp,
  AlertCircle,
  Star,
  Gift
} from 'lucide-react'

// Liquidity Pool Analyzer
const LiquidityPoolAnalyzer = () => {
  const [poolData, setPoolData] = useState({
    token1: 'ETH',
    token2: 'USDC',
    reserve1: 100,
    reserve2: 250000,
    fee: 0.3,
    volume24h: 1000000,
    liquidity: 500000
  })
  
  interface PoolAnalysis {
    price: number
    utilization: number
    feeRevenue24h: number
    apr: number
    efficiency: 'High' | 'Medium' | 'Low'
    score: number
  }
  
  const [analysis, setAnalysis] = useState<PoolAnalysis | null>(null)

  const analyzePool = () => {
    const { reserve1, reserve2, fee, volume24h, liquidity } = poolData
    
    // Pool efficiency metrics
    const price = reserve2 / reserve1
    const utilization = (volume24h / liquidity) * 100
    const feeRevenue24h = volume24h * (fee / 100)
    const apr = (feeRevenue24h * 365) / liquidity * 100
    const efficiency = utilization > 50 ? 'High' : utilization > 20 ? 'Medium' : 'Low'
    
    setAnalysis({
      price,
      utilization,
      feeRevenue24h,
      apr,
      efficiency,
      score: Math.min(100, utilization + (apr * 2))
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-blue-500" />
          流動性プール分析ツール
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>トークンA リザーブ</Label>
            <Input
              type="number"
              value={poolData.reserve1}
              onChange={(e) => setPoolData({...poolData, reserve1: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>トークンB リザーブ</Label>
            <Input
              type="number"
              value={poolData.reserve2}
              onChange={(e) => setPoolData({...poolData, reserve2: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>手数料 (%)</Label>
            <Input
              type="number"
              step="0.01"
              value={poolData.fee}
              onChange={(e) => setPoolData({...poolData, fee: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>24h取引量 ($)</Label>
            <Input
              type="number"
              value={poolData.volume24h}
              onChange={(e) => setPoolData({...poolData, volume24h: Number(e.target.value)})}
            />
          </div>
        </div>

        <Button onClick={analyzePool} className="w-full">
          <PieChart className="h-4 w-4 mr-2" />
          プールを分析
        </Button>

        {analysis && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="pt-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-slate-600">プール効率スコア</p>
                  <p className="text-3xl font-bold text-blue-600">{analysis.score.toFixed(1)}</p>
                </div>
                <Progress value={analysis.score} className="h-2" />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">推定APR</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {analysis.apr.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">利用率</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {analysis.utilization.toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">日次手数料収入</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">
                    ${analysis.feeRevenue24h.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">効率性評価</span>
                  </div>
                  <Badge 
                    variant={analysis.efficiency === 'High' ? 'default' : 
                            analysis.efficiency === 'Medium' ? 'secondary' : 'outline'}
                    className="text-sm"
                  >
                    {analysis.efficiency}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// DeFi Strategy Simulator
const DeFiStrategySimulator = () => {
  const [strategy, setStrategy] = useState({
    initialCapital: 10000,
    lpAllocation: 60,
    stakingAllocation: 30,
    lendingAllocation: 10,
    timeframe: 30,
    lpApr: 15,
    stakingApr: 8,
    lendingApr: 5,
    ilRisk: 10
  })

  interface SimulationResult {
    lpReturn: number
    stakingReturn: number
    lendingReturn: number
    totalReturn: number
    totalApr: number
    riskScore: number
    finalValue: number
  }
  
  const [simulation, setSimulation] = useState<SimulationResult | null>(null)

  const runSimulation = () => {
    const { 
      initialCapital, 
      lpAllocation, 
      stakingAllocation, 
      lendingAllocation,
      timeframe,
      lpApr,
      stakingApr,
      lendingApr,
      ilRisk
    } = strategy

    // Calculate returns for each strategy
    const lpCapital = initialCapital * (lpAllocation / 100)
    const stakingCapital = initialCapital * (stakingAllocation / 100)
    const lendingCapital = initialCapital * (lendingAllocation / 100)

    const lpReturn = lpCapital * (lpApr / 100) * (timeframe / 365)
    const stakingReturn = stakingCapital * (stakingApr / 100) * (timeframe / 365)
    const lendingReturn = lendingCapital * (lendingApr / 100) * (timeframe / 365)

    // Account for IL risk
    const ilLoss = lpCapital * (ilRisk / 100)
    const netLpReturn = lpReturn - ilLoss

    const totalReturn = netLpReturn + stakingReturn + lendingReturn
    const totalApr = (totalReturn / initialCapital) * (365 / timeframe) * 100
    const riskScore = (lpAllocation * ilRisk + stakingAllocation * 5 + lendingAllocation * 2) / 100

    setSimulation({
      lpReturn: netLpReturn,
      stakingReturn,
      lendingReturn,
      totalReturn,
      totalApr,
      riskScore,
      finalValue: initialCapital + totalReturn
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" />
          DeFi戦略シミュレーター
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>初期投資額 ($)</Label>
            <Input
              type="number"
              value={strategy.initialCapital}
              onChange={(e) => setStrategy({...strategy, initialCapital: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>シミュレーション期間 (日)</Label>
            <Input
              type="number"
              value={strategy.timeframe}
              onChange={(e) => setStrategy({...strategy, timeframe: Number(e.target.value)})}
            />
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="space-y-3">
          <h3 className="font-medium">資産配分 (%)</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-sm">流動性提供</Label>
              <Input
                type="number"
                value={strategy.lpAllocation}
                onChange={(e) => setStrategy({...strategy, lpAllocation: Number(e.target.value)})}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-sm">ステーキング</Label>
              <Input
                type="number"
                value={strategy.stakingAllocation}
                onChange={(e) => setStrategy({...strategy, stakingAllocation: Number(e.target.value)})}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-sm">レンディング</Label>
              <Input
                type="number"
                value={strategy.lendingAllocation}
                onChange={(e) => setStrategy({...strategy, lendingAllocation: Number(e.target.value)})}
                className="h-8"
              />
            </div>
          </div>
        </div>

        {/* Expected Returns */}
        <div className="space-y-3">
          <h3 className="font-medium">期待利回り (% APR)</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-sm">LP APR</Label>
              <Input
                type="number"
                step="0.1"
                value={strategy.lpApr}
                onChange={(e) => setStrategy({...strategy, lpApr: Number(e.target.value)})}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-sm">ステーキング APR</Label>
              <Input
                type="number"
                step="0.1"
                value={strategy.stakingApr}
                onChange={(e) => setStrategy({...strategy, stakingApr: Number(e.target.value)})}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-sm">レンディング APR</Label>
              <Input
                type="number"
                step="0.1"
                value={strategy.lendingApr}
                onChange={(e) => setStrategy({...strategy, lendingApr: Number(e.target.value)})}
                className="h-8"
              />
            </div>
          </div>
        </div>

        <div>
          <Label>ILリスク (%)</Label>
          <Input
            type="number"
            step="0.1"
            value={strategy.ilRisk}
            onChange={(e) => setStrategy({...strategy, ilRisk: Number(e.target.value)})}
          />
        </div>

        <Button onClick={runSimulation} className="w-full">
          <BarChart3 className="h-4 w-4 mr-2" />
          シミュレーション実行
        </Button>

        {simulation && (
          <div className="space-y-4">
            {/* Main Results */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-green-600">予想利益</p>
                    <p className="text-2xl font-bold text-green-700">
                      ${simulation.totalReturn.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-600">実効APR</p>
                    <p className="text-2xl font-bold text-green-700">
                      {simulation.totalApr.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-2">
              <Card>
                <CardContent className="pt-3 pb-3">
                  <p className="text-xs text-slate-600">LP収益</p>
                  <p className="font-bold text-lg">${simulation.lpReturn.toFixed(0)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-3 pb-3">
                  <p className="text-xs text-slate-600">ステーキング</p>
                  <p className="font-bold text-lg">${simulation.stakingReturn.toFixed(0)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-3 pb-3">
                  <p className="text-xs text-slate-600">レンディング</p>
                  <p className="font-bold text-lg">${simulation.lendingReturn.toFixed(0)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            <Card className={`border-l-4 ${
              simulation.riskScore > 15 ? 'bg-red-50 border-red-400' :
              simulation.riskScore > 8 ? 'bg-yellow-50 border-yellow-400' :
              'bg-green-50 border-green-400'
            }`}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">リスクスコア: {simulation.riskScore.toFixed(1)}/30</p>
                    <Progress value={(simulation.riskScore / 30) * 100} className="w-32 h-2 mt-2" />
                  </div>
                  <Badge 
                    variant={simulation.riskScore > 15 ? 'destructive' : 
                            simulation.riskScore > 8 ? 'default' : 'secondary'}
                  >
                    {simulation.riskScore > 15 ? 'HIGH' : 
                     simulation.riskScore > 8 ? 'MEDIUM' : 'LOW'} RISK
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Portfolio Health Monitor
const PortfolioHealthMonitor = () => {
  const [portfolio, setPortfolio] = useState([
    { asset: 'ETH', amount: 10, price: 2500, allocation: 50 },
    { asset: 'USDC', amount: 12500, price: 1, allocation: 25 },
    { asset: 'BTC', amount: 0.5, price: 45000, allocation: 25 }
  ])

  interface HealthMetrics {
    totalValue: number
    diversificationScore: number
    portfolioVolatility: number
    healthScore: number
    recommendations: string[]
  }
  
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null)

  const analyzeHealth = () => {
    const totalValue = portfolio.reduce((sum, asset) => sum + (asset.amount * asset.price), 0)
    
    // Diversification score (Shannon's diversity index simplified)
    const allocations = portfolio.map(asset => (asset.amount * asset.price) / totalValue)
    const diversificationScore = -allocations.reduce((sum, p) => sum + (p * Math.log(p)), 0) * 100

    // Volatility assessment (mock data)
    const volatilities = { ETH: 25, USDC: 1, BTC: 30 }
    const portfolioVolatility = portfolio.reduce((sum, asset) => {
      const weight = (asset.amount * asset.price) / totalValue
      const vol = volatilities[asset.asset as keyof typeof volatilities] || 20
      return sum + (weight * vol)
    }, 0)

    // Health score (0-100)
    const healthScore = Math.max(0, 100 - portfolioVolatility + (diversificationScore * 2))

    setHealthMetrics({
      totalValue,
      diversificationScore,
      portfolioVolatility,
      healthScore,
      recommendations: generateRecommendations(portfolioVolatility, diversificationScore)
    })
  }

  const generateRecommendations = (vol: number, div: number) => {
    const recs = []
    if (vol > 25) recs.push("高ボラティリティ - ステーブルコイン比率を増やすことを検討")
    if (div < 50) recs.push("集中リスク - より多様な資産への分散を検討")
    if (vol < 15 && div > 80) recs.push("バランス良好 - 現在の配分を維持")
    return recs
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          ポートフォリオ健全性モニター
          <Badge variant="secondary" className="ml-2">FREE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Portfolio Input */}
        <div className="space-y-3">
          {portfolio.map((asset, index) => (
            <div key={index} className="grid grid-cols-4 gap-2">
              <Input
                placeholder="資産名"
                value={asset.asset}
                onChange={(e) => {
                  const newPortfolio = [...portfolio]
                  newPortfolio[index].asset = e.target.value
                  setPortfolio(newPortfolio)
                }}
                className="h-8"
              />
              <Input
                type="number"
                placeholder="数量"
                value={asset.amount}
                onChange={(e) => {
                  const newPortfolio = [...portfolio]
                  newPortfolio[index].amount = Number(e.target.value)
                  setPortfolio(newPortfolio)
                }}
                className="h-8"
              />
              <Input
                type="number"
                placeholder="価格"
                value={asset.price}
                onChange={(e) => {
                  const newPortfolio = [...portfolio]
                  newPortfolio[index].price = Number(e.target.value)
                  setPortfolio(newPortfolio)
                }}
                className="h-8"
              />
              <div className="text-sm text-slate-600 flex items-center">
                ${(asset.amount * asset.price).toFixed(0)}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={analyzeHealth} className="w-full">
          <Activity className="h-4 w-4 mr-2" />
          健全性を分析
        </Button>

        {healthMetrics && (
          <div className="space-y-4">
            {/* Health Score */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="pt-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-slate-600">ポートフォリオ健全性スコア</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {healthMetrics.healthScore.toFixed(0)}/100
                  </p>
                </div>
                <Progress value={healthMetrics.healthScore} className="h-3" />
              </CardContent>
            </Card>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">ポートフォリオ総額</span>
                  </div>
                  <p className="text-xl font-bold text-purple-600">
                    ${healthMetrics.totalValue.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">分散スコア</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    {healthMetrics.diversificationScore.toFixed(0)}/100
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">ボラティリティ</span>
                  </div>
                  <p className="text-xl font-bold text-orange-600">
                    {healthMetrics.portfolioVolatility.toFixed(1)}%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            {healthMetrics.recommendations.length > 0 && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-4">
                  <h3 className="font-medium text-amber-800 mb-2">推奨アクション</h3>
                  <ul className="space-y-1">
                    {healthMetrics.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                        <AlertCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main Advanced Tools Hub
export default function AdvancedFreeTools() {
  const [activeTool, setActiveTool] = useState<string>('pool')

  const tools = [
    {
      id: 'pool',
      title: 'プール分析',
      icon: PieChart,
      component: <LiquidityPoolAnalyzer />
    },
    {
      id: 'strategy',
      title: '戦略シミュレーター',
      icon: BarChart3,
      component: <DeFiStrategySimulator />
    },
    {
      id: 'health',
      title: 'ポートフォリオ診断',
      icon: Activity,
      component: <PortfolioHealthMonitor />
    }
  ]

  const activeTool_obj = tools.find(t => t.id === activeTool)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🚀 高度なDeFi分析ツール
        </h1>
        <Card className="inline-block bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-3 flex items-center gap-2">
            <Gift className="h-5 w-5 text-emerald-600" />
            <span className="font-bold text-emerald-800">通常$50-100/月相当が完全無料</span>
          </CardContent>
        </Card>
      </div>

      {/* Tool Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tools.map((tool) => {
          const IconComponent = tool.icon
          const isActive = activeTool === tool.id
          
          return (
            <Card 
              key={tool.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                isActive 
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
              onClick={() => setActiveTool(tool.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  isActive 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{tool.title}</h3>
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

      {/* Active Tool */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        {activeTool_obj?.component}
      </div>
    </div>
  )
}
