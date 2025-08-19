"use client"

import * as React from "react"
import { useMemo, useState } from 'react'
 
import { 
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Shield,
  
  Target,
  PieChart,
  BarChart3,
  EyeOff,
  Download
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
 
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
 
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  ResponsiveContainer, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'
import { DeFiDesignTokens } from '@/lib/design-system/defi-design-tokens'

interface PortfolioTrackerProps {
  className?: string
}

interface DeFiPosition {
  id: string
  protocol: string
  network: string
  positionType: 'liquidity' | 'lending' | 'borrowing' | 'staking' | 'farming'
  poolName?: string
  tokenSymbols: string[]
  tokenAmounts: number[]
  usdValue: number
  entryValue: number
  currentApy: number
  totalRewards: number
  unclaimedRewards: number
  healthFactor?: number
  liquidationPrice?: number
  expiryDate?: Date
  autoCompound: boolean
  riskLevel: 'low' | 'medium' | 'high'
  lastUpdated: Date
}

interface PortfolioMetrics {
  totalValue: number
  totalPnl: number
  totalPnlPercent: number
  totalDailyYield: number
  totalYearlyYield: number
  averageApy: number
  riskScore: number
  liquidityRatio: number
  concentrationRisk: number
}

interface PerformanceData {
  date: Date
  totalValue: number
  pnl: number
  yield: number
  deposits: number
  withdrawals: number
}

// Mock data - in real app this would come from user's connected wallet or stored positions
const generateMockPositions = (): DeFiPosition[] => [
  {
    id: '1',
    protocol: 'Uniswap V3',
    network: 'ethereum',
    positionType: 'liquidity',
    poolName: 'USDC/ETH 0.3%',
    tokenSymbols: ['USDC', 'ETH'],
    tokenAmounts: [5000, 2.1],
    usdValue: 12000,
    entryValue: 10500,
    currentApy: 12.5,
    totalRewards: 180,
    unclaimedRewards: 45,
    autoCompound: false,
    riskLevel: 'medium',
    lastUpdated: new Date()
  },
  {
    id: '2',
    protocol: 'AAVE',
    network: 'ethereum',
    positionType: 'lending',
    tokenSymbols: ['USDT'],
    tokenAmounts: [8000],
    usdValue: 8000,
    entryValue: 8000,
    currentApy: 4.2,
    totalRewards: 95,
    unclaimedRewards: 12,
    healthFactor: 2.8,
    autoCompound: true,
    riskLevel: 'low',
    lastUpdated: new Date()
  },
  {
    id: '3',
    protocol: 'Yearn Finance',
    network: 'ethereum',
    positionType: 'farming',
    poolName: 'yvUSDC Vault',
    tokenSymbols: ['USDC'],
    tokenAmounts: [15000],
    usdValue: 15800,
    entryValue: 15000,
    currentApy: 8.7,
    totalRewards: 280,
    unclaimedRewards: 0,
    autoCompound: true,
    riskLevel: 'medium',
    lastUpdated: new Date()
  },
  {
    id: '4',
    protocol: 'Compound',
    network: 'ethereum',
    positionType: 'borrowing',
    tokenSymbols: ['DAI'],
    tokenAmounts: [-3000],
    usdValue: -3000,
    entryValue: -3000,
    currentApy: -5.8,
    totalRewards: -42,
    unclaimedRewards: 0,
    healthFactor: 1.95,
    liquidationPrice: 1850,
    autoCompound: false,
    riskLevel: 'high',
    lastUpdated: new Date()
  },
  {
    id: '5',
    protocol: 'Lido',
    network: 'ethereum',
    positionType: 'staking',
    tokenSymbols: ['stETH'],
    tokenAmounts: [5.2],
    usdValue: 18720,
    entryValue: 16000,
    currentApy: 5.1,
    totalRewards: 420,
    unclaimedRewards: 85,
    autoCompound: true,
    riskLevel: 'low',
    lastUpdated: new Date()
  }
]

const generatePerformanceData = (): PerformanceData[] => {
  const data: PerformanceData[] = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)
  
  let totalValue = 45000
  let cumulativePnl = 0
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    const dailyChange = (Math.random() - 0.5) * 1000
    const dailyYield = totalValue * 0.0001 // ~0.01% daily yield
    
    totalValue += dailyChange + dailyYield
    cumulativePnl += dailyChange
    
    data.push({
      date,
      totalValue,
      pnl: cumulativePnl,
      yield: dailyYield,
      deposits: i % 7 === 0 ? Math.random() * 2000 : 0,
      withdrawals: i % 10 === 0 ? Math.random() * 1000 : 0
    })
  }
  
  return data
}

// Format currency
const formatCurrency = (value: number): string => {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return `$${value.toFixed(2)}`
}

// Format percentage
const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

// Enhanced risk color with better accessibility
const getRiskColor = (risk: string): string => {
  switch (risk) {
    case 'low': return 'text-green-800 bg-green-100 border border-green-300 shadow-sm'
    case 'medium': return 'text-yellow-800 bg-yellow-100 border border-yellow-300 shadow-sm'
    case 'high': return 'text-red-800 bg-red-100 border border-red-300 shadow-sm'
    default: return 'text-slate-800 bg-slate-100 border border-slate-300 shadow-sm'
  }
}

// Portfolio health indicator
const getPortfolioHealthIndicator = (riskScore: number, totalPnl: number) => {
  if (riskScore >= 80 && totalPnl >= 0) {
    return { status: 'excellent', color: 'bg-green-500', label: 'Excellent', textColor: 'text-green-600' }
  } else if (riskScore >= 60 && totalPnl >= -5) {
    return { status: 'good', color: 'bg-blue-500', label: 'Good', textColor: 'text-blue-600' }
  } else if (riskScore >= 40) {
    return { status: 'moderate', color: 'bg-yellow-500', label: 'Moderate', textColor: 'text-yellow-600' }
  } else {
    return { status: 'poor', color: 'bg-red-500', label: 'At Risk', textColor: 'text-red-600' }
  }
}

// Position performance indicator
const getPositionPerformanceIndicator = (pnlPercent: number, apy: number) => {
  if (pnlPercent > 20 || apy > 15) {
    return { status: 'excellent', icon: '🔥', label: 'High Performer' }
  } else if (pnlPercent > 10 || apy > 8) {
    return { status: 'good', icon: '📈', label: 'Good' }
  } else if (pnlPercent > 0 || apy > 0) {
    return { status: 'positive', icon: '✅', label: 'Positive' }
  } else {
    return { status: 'negative', icon: '⚠️', label: 'Underperforming' }
  }
}

// Position type icons
const getPositionIcon = (type: string) => {
  switch (type) {
    case 'liquidity': return <PieChart className="h-4 w-4" />
    case 'lending': return <TrendingUp className="h-4 w-4" />
    case 'borrowing': return <TrendingDown className="h-4 w-4" />
    case 'staking': return <Shield className="h-4 w-4" />
    case 'farming': return <Target className="h-4 w-4" />
    default: return <Wallet className="h-4 w-4" />
  }
}

// Enhanced chart colors with design tokens
const CHART_COLORS = [
  DeFiDesignTokens.colors.primary[500],
  DeFiDesignTokens.colors.success[500],
  DeFiDesignTokens.colors.warning[500],
  DeFiDesignTokens.colors.error[500],
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316'  // Orange
]

export const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({ className = "" }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [hideSmallPositions, setHideSmallPositions] = useState(false)
  const [showPrivateMode, setShowPrivateMode] = useState(false)
  // refreshIntervalは将来の自動更新機能で使用予定だが現状未使用のためコメントアウト
  // const [refreshInterval, setRefreshInterval] = useState<number>(300)

  // Mock data - in real app would fetch from backend/blockchain
  const positions = useMemo(() => generateMockPositions(), [])
  const performanceData = useMemo(() => generatePerformanceData(), [])

  // Calculate portfolio metrics
  const metrics = useMemo((): PortfolioMetrics => {
    const validPositions = positions.filter(p => p.usdValue > 0)
    const totalValue = positions.reduce((sum, p) => sum + Math.abs(p.usdValue), 0)
    const totalPnl = positions.reduce((sum, p) => sum + (p.usdValue - p.entryValue), 0)
    const totalPnlPercent = totalValue > 0 ? (totalPnl / (totalValue - totalPnl)) * 100 : 0
    
    const totalYearlyYield = positions.reduce((sum, p) => {
      return sum + (Math.abs(p.usdValue) * p.currentApy / 100)
    }, 0)
    const totalDailyYield = totalYearlyYield / 365
    
    const averageApy = validPositions.length > 0 
      ? validPositions.reduce((sum, p) => sum + Math.abs(p.currentApy), 0) / validPositions.length 
      : 0

    const riskScores = { low: 90, medium: 70, high: 40 }
    const weightedRiskScore = validPositions.length > 0
      ? validPositions.reduce((sum, p) => {
          const weight = Math.abs(p.usdValue) / totalValue
          return sum + (riskScores[p.riskLevel] * weight)
        }, 0)
      : 0

    return {
      totalValue,
      totalPnl,
      totalPnlPercent,
      totalDailyYield,
      totalYearlyYield,
      averageApy,
      riskScore: weightedRiskScore,
      liquidityRatio: 0.85, // Mock value
      concentrationRisk: 0.35 // Mock value
    }
  }, [positions])

  // Filter positions
  const filteredPositions = useMemo(() => {
    let filtered = positions
    
    if (hideSmallPositions) {
      filtered = filtered.filter(p => Math.abs(p.usdValue) >= 100)
    }
    
    return filtered.sort((a, b) => Math.abs(b.usdValue) - Math.abs(a.usdValue))
  }, [positions, hideSmallPositions])

  // Prepare chart data
  // const positionDistribution = useMemo(() => {
  //   const distribution = positions
  //     .filter(p => p.usdValue > 0)
  //     .map((position, index) => ({
  //       name: position.protocol,
  //       value: position.usdValue,
  //       color: CHART_COLORS[index % CHART_COLORS.length],
  //       type: position.positionType
  //     }))
  //   
  //   return distribution
  // }, [positions])

  const protocolDistribution = useMemo(() => {
    const protocols = positions.reduce((acc, position) => {
      const protocol = position.protocol
      if (!acc[protocol]) {
        acc[protocol] = 0
      }
      acc[protocol] += Math.abs(position.usdValue)
      return acc
    }, {} as Record<string, number>)

    return Object.entries(protocols).map(([name, value], index) => ({
      name,
      value,
      color: CHART_COLORS[index % CHART_COLORS.length]
    }))
  }, [positions])

  // Health check alerts
  const healthAlerts = useMemo(() => {
    const alerts: Array<{
      type: 'warning' | 'danger'
      message: string
      positionId: string
    }> = []

    positions.forEach(position => {
      if (position.healthFactor && position.healthFactor < 1.5) {
        alerts.push({
          type: 'danger',
          message: `${position.protocol} position at risk of liquidation (Health Factor: ${position.healthFactor})`,
          positionId: position.id
        })
      } else if (position.healthFactor && position.healthFactor < 2.0) {
        alerts.push({
          type: 'warning',
          message: `${position.protocol} position needs monitoring (Health Factor: ${position.healthFactor})`,
          positionId: position.id
        })
      }

      if (position.unclaimedRewards > 50) {
        alerts.push({
          type: 'warning',
          message: `${formatCurrency(position.unclaimedRewards)} unclaimed rewards in ${position.protocol}`,
          positionId: position.id
        })
      }
    })

    return alerts
  }, [positions])

  const handleExportData = () => {
    const csvData = [
      ['Position', 'Protocol', 'Type', 'Value USD', 'Entry Value', 'PnL', 'APY%', 'Risk Level'],
      ...positions.map(p => [
        p.poolName || p.tokenSymbols.join('/'),
        p.protocol,
        p.positionType,
        p.usdValue,
        p.entryValue,
        p.usdValue - p.entryValue,
        p.currentApy,
        p.riskLevel
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `defi-portfolio-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              DeFi Portfolio Tracker
            </h2>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getPortfolioHealthIndicator(metrics.riskScore, metrics.totalPnl).color} ${getPortfolioHealthIndicator(metrics.riskScore, metrics.totalPnl).color.replace('bg-', 'bg-opacity-20 border border-').replace('-500', '-300')}`}>
              <Wallet className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white">
                {getPortfolioHealthIndicator(metrics.riskScore, metrics.totalPnl).label}
              </span>
            </div>
          </div>
          <p className="text-slate-600 text-lg">
            Real-time monitoring of your DeFi positions with AI-powered risk analysis and yield optimization
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live position tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Risk monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Yield optimization</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Private Mode</label>
            <Switch
              checked={showPrivateMode}
              onCheckedChange={setShowPrivateMode}
            />
          </div>
          
          <Select value={selectedTimeframe} onValueChange={(value: string) => setSelectedTimeframe(value as '7d' | '30d' | '90d' | '1y')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Health Alerts */}
      {healthAlerts.length > 0 && (
        <div className="space-y-2">
          {healthAlerts.map((alert, index) => (
            <Alert key={index} variant={alert.type === 'danger' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Enhanced Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600 mb-2">Total Portfolio Value</p>
                <p className="text-3xl font-bold text-slate-900 font-mono">
                  {showPrivateMode ? '****' : formatCurrency(metrics.totalValue)}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl text-white shadow-lg">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metrics.totalPnl >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-bold ${
                  metrics.totalPnl >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {showPrivateMode ? '**%' : formatPercent(metrics.totalPnlPercent)}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metrics.totalPnl >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {showPrivateMode ? '****' : formatCurrency(metrics.totalPnl)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-600 mb-2">Daily Yield</p>
                <p className="text-3xl font-bold text-slate-900 font-mono">
                  {showPrivateMode ? '****' : formatCurrency(metrics.totalDailyYield)}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl text-white shadow-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-green-700">
                  {showPrivateMode ? '**%' : formatPercent(metrics.averageApy)} Avg APY
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {showPrivateMode ? '****' : formatCurrency(metrics.totalYearlyYield)} / year
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 group-hover:from-yellow-100 group-hover:to-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-600 mb-2">Risk Score</p>
                <p className="text-3xl font-bold text-slate-900 font-mono">
                  {metrics.riskScore.toFixed(0)}/100
                </p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-xl text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={metrics.riskScore} className="h-3" />
              <div className="flex justify-between text-xs">
                <span className="font-medium text-yellow-700">
                  {getPortfolioHealthIndicator(metrics.riskScore, metrics.totalPnl).label}
                </span>
                <span className="text-yellow-600">
                  {metrics.riskScore >= 80 ? 'Low Risk' : metrics.riskScore >= 60 ? 'Moderate' : 'High Risk'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-600 mb-2">Active Positions</p>
                <p className="text-3xl font-bold text-slate-900 font-mono">{positions.length}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl text-white shadow-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-purple-700">
                  {new Set(positions.map(p => p.protocol)).size} protocols
                </span>
              </div>
              <div className="flex items-center gap-1">
                {positions.filter(p => p.autoCompound).length > 0 && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                    {positions.filter(p => p.autoCompound).length} auto
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Portfolio Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showPrivateMode ? (
              <div className="h-[300px] flex items-center justify-center bg-muted rounded">
                <div className="text-center">
                  <EyeOff className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Private mode enabled</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartsTooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalValue" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Protocol Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Protocol Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showPrivateMode ? (
              <div className="h-[300px] flex items-center justify-center bg-muted rounded">
                <div className="text-center">
                  <EyeOff className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Private mode enabled</p>
                </div>
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={protocolDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {protocolDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Value']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {protocolDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg width="12" height="12" className="rounded">
                        <rect x="0" y="0" width="12" height="12" fill={item.color} />
                      </svg>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Position Details */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Position Details</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm">Hide small positions</label>
                <Switch
                  checked={hideSmallPositions}
                  onCheckedChange={setHideSmallPositions}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPositions.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                showPrivate={showPrivateMode}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Position Card Component
interface PositionCardProps {
  position: DeFiPosition
  showPrivate: boolean
}

const PositionCard: React.FC<PositionCardProps> = ({ position, showPrivate }) => {
  const pnl = position.usdValue - position.entryValue
  const pnlPercent = position.entryValue !== 0 ? (pnl / Math.abs(position.entryValue)) * 100 : 0
  const isNegative = position.usdValue < 0
  const performanceIndicator = getPositionPerformanceIndicator(pnlPercent, position.currentApy)

  return (
    <div className={`group p-6 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative ${
      isNegative 
        ? 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200' 
        : 'bg-gradient-to-br from-white to-slate-50 group-hover:from-slate-50 group-hover:to-white border border-slate-200'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Enhanced Position Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className={`p-3 rounded-xl shadow-lg ${
            isNegative 
              ? 'bg-red-500 text-white' 
              : position.positionType === 'liquidity' 
              ? 'bg-blue-500 text-white'
              : position.positionType === 'lending'
              ? 'bg-green-500 text-white'
              : position.positionType === 'staking'
              ? 'bg-purple-500 text-white'
              : position.positionType === 'farming'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-500 text-white'
          }`}>
            {getPositionIcon(position.positionType)}
          </div>
          
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h4 className="font-bold text-lg text-slate-900">
                {position.poolName || position.tokenSymbols.join('/')}
              </h4>
              <Badge className={`capitalize px-3 py-1 text-xs font-semibold ${
                position.positionType === 'liquidity' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                position.positionType === 'lending' ? 'bg-green-100 text-green-800 border border-green-300' :
                position.positionType === 'borrowing' ? 'bg-red-100 text-red-800 border border-red-300' :
                position.positionType === 'staking' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                position.positionType === 'farming' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                'bg-slate-100 text-slate-800 border border-slate-300'
              }`}>
                {position.positionType}
              </Badge>
              {position.autoCompound && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="bg-green-100 text-green-700 border border-green-300 text-xs font-semibold px-2 py-1">
                        ⚡ Auto-Compound
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-center">
                        <p className="font-medium">Auto-Compounding Active</p>
                        <p className="text-xs text-slate-600">Maximizing returns automatically</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <div className="text-sm px-2 py-1 bg-slate-100 rounded-full">
                {performanceIndicator.icon} {performanceIndicator.label}
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">{position.protocol}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="capitalize">{position.network}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <span className="text-xs font-medium text-blue-600 block mb-1">Current Value</span>
                <p className="font-bold text-slate-900 font-mono">
                  {showPrivate ? '****' : formatCurrency(Math.abs(position.usdValue))}
                  {isNegative && !showPrivate && (
                    <span className="text-xs text-red-600 ml-1">(debt)</span>
                  )}
                </p>
              </div>
              
              <div className={`p-3 rounded-lg ${
                position.currentApy >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span className={`text-xs font-medium block mb-1 ${
                  position.currentApy >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>APY</span>
                <p className={`font-bold font-mono ${
                  position.currentApy >= 0 ? 'text-green-700' : 'text-red-700'
                }`}>
                  {showPrivate ? '**%' : formatPercent(position.currentApy)}
                </p>
              </div>
              
              {position.unclaimedRewards > 0 && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <span className="text-xs font-medium text-orange-600 block mb-1">Rewards</span>
                  <p className="font-bold text-orange-700 font-mono">
                    {showPrivate ? '****' : formatCurrency(position.unclaimedRewards)}
                  </p>
                </div>
              )}
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <span className="text-xs font-medium text-purple-600 block mb-1">Entry Value</span>
                <p className="font-bold text-slate-900 font-mono">
                  {showPrivate ? '****' : formatCurrency(Math.abs(position.entryValue))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Performance & Risk */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className={`p-4 rounded-xl shadow-sm ${
            pnl >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {pnl >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
              <span className="text-xs font-medium text-slate-600">PnL Performance</span>
            </div>
            <div className="space-y-1">
              <span className={`text-xl font-bold ${
                pnl >= 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {showPrivate ? '**%' : formatPercent(pnlPercent)}
              </span>
              <p className={`text-sm font-medium ${
                pnl >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {showPrivate ? '****' : formatCurrency(pnl)}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Risk Level:</span>
              <Badge className={`${getRiskColor(position.riskLevel)} text-xs font-semibold px-3 py-1`}>
                {position.riskLevel.toUpperCase()}
              </Badge>
            </div>
            
            {position.healthFactor && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-600">Health Factor:</span>
                      <div className={`text-xs px-3 py-1 rounded-full font-bold ${
                        position.healthFactor < 1.5 
                          ? 'bg-red-100 text-red-700 border border-red-300' 
                          : position.healthFactor < 2.0 
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                          : 'bg-green-100 text-green-700 border border-green-300'
                      }`}>
                        {position.healthFactor.toFixed(2)}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <p className="font-medium">Health Factor</p>
                      <p className="text-xs text-slate-600">
                        {position.healthFactor < 1.5 ? 'Critical - Risk of liquidation' :
                         position.healthFactor < 2.0 ? 'Warning - Monitor closely' :
                         'Safe - Position is healthy'}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {position.liquidationPrice && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600">Liquidation Price:</span>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                  ${position.liquidationPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Hover effect indicator */}
      <div className={`absolute inset-x-0 bottom-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
        pnl >= 0 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
      }`}></div>
    </div>
  )
}

export default PortfolioTracker
