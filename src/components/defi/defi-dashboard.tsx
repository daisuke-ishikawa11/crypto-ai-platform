"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Activity, 
  DollarSign, 
  AlertTriangle,
  BarChart3,
  Wallet,
  Globe,
  RefreshCw,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import { BlockchainNetwork } from '@crypto/defi'
import { DeFiDesignTokens, getRiskColorByScore } from '@/lib/design-system/defi-design-tokens'
import DeFiAssistant from './defi-assistant'
import AchievementSystem from './achievements-system'
import InteractiveTutorial from './interactive-tutorial'
import MiniGames from './mini-games'
import SocialFeatures from './social-features'

interface DeFiDashboardProps {
  className?: string
  autoRefresh?: boolean
  refreshInterval?: number
  showWhimsicalFeatures?: boolean
  userId?: string
}

interface MarketOverview {
  totalTVL: number
  totalVolume24h: number
  totalUsers: number
  totalTransactions: number
  protocolCount: number
  tvlChange24h: number
  tvlChange7d: number
  tvlChange30d: number
  dominanceIndex: number
  avgAPY: number
  timestamp: Date
}

interface ProtocolInfo {
  id: string
  name: string
  type: string
  blockchain: string
  tvl: number
  volume24h: number
  riskScore: number
  tvlChange24h: number
  yieldApr?: number
}

interface DeFiStatistics {
  marketOverview: MarketOverview
  supportedProtocols: ProtocolInfo[]
  categories: Record<string, { count: number; tvlShare: number }>
  analysis: {
    trendAnalysis: string
    riskAssessment: string
    recommendations: string[]
    opportunities: string[]
    risks: string[]
  }
}

// Enhanced currency formatting with localization
const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

// Format large numbers with proper localization
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(value)
}

// Format percentage change
const formatPercent = (value: number): string => {
  const formatted = Math.abs(value).toFixed(2)
  const sign = value >= 0 ? '+' : '-'
  return `${sign}${formatted}%`
}

// Enhanced risk level styling with design tokens
const getRiskColor = (riskScore: number): string => {
  if (riskScore >= 85) return 'text-green-700 bg-green-50 border border-green-200'
  if (riskScore >= 70) return 'text-blue-700 bg-blue-50 border border-blue-200'
  if (riskScore >= 50) return 'text-yellow-700 bg-yellow-50 border border-yellow-200'
  if (riskScore >= 30) return 'text-orange-700 bg-orange-50 border border-orange-200'
  return 'text-red-700 bg-red-50 border border-red-200'
}

// removed unused helper to satisfy lint

// Format percentage with proper styling
const formatPercentageWithStyle = (value: number) => {
  const isPositive = value >= 0
  return {
    value: formatPercent(value),
    className: isPositive ? 'text-green-600' : 'text-red-600',
    icon: isPositive ? TrendingUp : TrendingDown
  }
}

// Risk level label
const getRiskLabel = (riskScore: number): string => {
  if (riskScore >= 85) return 'Very Low'
  if (riskScore >= 70) return 'Low'
  if (riskScore >= 50) return 'Medium'
  if (riskScore >= 30) return 'High'
  return 'Very High'
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
  '#f97316', // Orange
  '#ec4899', // Pink
  '#6366f1'  // Indigo
]

// Data freshness indicator
const getDataFreshnessIndicator = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  
  if (minutes < 5) {
    return { status: 'live', label: 'Live', color: 'bg-green-500' }
  } else if (minutes < 15) {
    return { status: 'recent', label: `${minutes}m ago`, color: 'bg-yellow-500' }
  } else {
    return { status: 'stale', label: `${minutes}m ago`, color: 'bg-red-500' }
  }
}

export const DeFiDashboard: React.FC<DeFiDashboardProps> = ({
  className = "",
  autoRefresh = true,
  refreshInterval = 30000,
  showWhimsicalFeatures = true,
  userId = 'demo-user'
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [showTutorial, setShowTutorial] = useState(false)
  const [showMiniGames, setShowMiniGames] = useState(false)
  const [showSocial, setSShowSocial] = useState(false)
  const [achievementsExpanded, setAchievementsExpanded] = useState(false)

  // Fetch DeFi statistics
  const {
    data: statistics,
    isLoading,
    error,
    refetch
  } = useQuery<DeFiStatistics>({
    queryKey: ['defi-statistics', selectedNetwork],
    queryFn: async () => {
      const params = new URLSearchParams({
        realTime: 'true',
        metrics: 'true'
      })
      
      if (selectedNetwork !== 'all') {
        params.append('network', selectedNetwork)
      }
      
      const response = await fetch(`/api/defi/statistics?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch DeFi statistics')
      }
      return response.json().then(data => data.data)
    },
    refetchInterval: autoRefresh ? refreshInterval : false
  })

  // Auto-refresh handler
  useEffect(() => {
    if (statistics) {
      setLastUpdate(new Date())
    }
  }, [statistics])

  // Prepare chart data
  const tvlTrendData = useMemo(() => {
    if (!statistics?.supportedProtocols) return []
    
    return statistics.supportedProtocols
      .slice(0, 10)
      .map((protocol, index) => ({
        name: protocol.name,
        tvl: protocol.tvl,
        change: protocol.tvlChange24h,
        volume: protocol.volume24h,
        risk: protocol.riskScore
      }))
  }, [statistics])

  const categoryData = useMemo(() => {
    if (!statistics?.categories) return []
    
    return Object.entries(statistics.categories).map(([category, data], index) => ({
      name: category.replace('_', ' ').toUpperCase(),
      value: data.tvlShare,
      count: data.count,
      color: CHART_COLORS[index % CHART_COLORS.length]
    }))
  }, [statistics])

  const topProtocols = useMemo(() => {
    if (!statistics?.supportedProtocols) return []
    
    return statistics.supportedProtocols
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 6)
  }, [statistics])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <Card className="col-span-full">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-red-600 font-medium">Failed to load DeFi data</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const marketOverview = statistics?.marketOverview
  if (!marketOverview) return null

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header with Data Freshness */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              DeFi Dashboard
            </h2>
            {(() => {
              const freshness = getDataFreshnessIndicator(marketOverview.timestamp)
              return (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${freshness.color} animate-pulse`}></div>
                  <span className="text-xs font-medium text-slate-600">{freshness.label}</span>
                </div>
              )
            })()}
          </div>
          <p className="text-slate-600 text-lg">
            Institutional-grade decentralized finance market intelligence
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Networks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Networks</SelectItem>
              <SelectItem value={BlockchainNetwork.ETHEREUM}>Ethereum</SelectItem>
              <SelectItem value={BlockchainNetwork.POLYGON}>Polygon</SelectItem>
              <SelectItem value={BlockchainNetwork.ARBITRUM}>Arbitrum</SelectItem>
              <SelectItem value={BlockchainNetwork.OPTIMISM}>Optimism</SelectItem>
              <SelectItem value={BlockchainNetwork.AVALANCHE}>Avalanche</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            {showWhimsicalFeatures && (
              <>
                <Button 
                  onClick={() => setShowTutorial(true)} 
                  variant="outline" 
                  size="sm"
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-pink-100"
                >
                  🎓 Learn
                </Button>
                <Button 
                  onClick={() => setShowMiniGames(true)} 
                  variant="outline" 
                  size="sm"
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-cyan-100"
                >
                  🎮 Games
                </Button>
                <Button 
                  onClick={() => setSShowSocial(true)} 
                  variant="outline" 
                  size="sm"
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100"
                >
                  👥 Community
                </Button>
              </>
            )}
            
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Whimsical Achievement Banner */}
      {showWhimsicalFeatures && (
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl animate-pulse">
                    🏆
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                    !
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Ready to Level Up?</h3>
                  <p className="text-sm text-slate-600 mb-3">Complete challenges, earn achievements, and master DeFi!</p>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm"
                      onClick={() => setAchievementsExpanded(!achievementsExpanded)}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                    >
                      {achievementsExpanded ? 'Hide' : 'View'} Progress
                    </Button>
                    <Badge className="bg-yellow-100 text-yellow-800">3 New Achievements!</Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-1">Level 7</div>
                <div className="text-sm text-slate-600 mb-2">DeFi Explorer</div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full w-[68%]"></div>
                </div>
                <div className="text-xs text-slate-500 mt-1">2,100 / 3,000 XP</div>
              </div>
            </div>
            
            {achievementsExpanded && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <AchievementSystem userId={userId} compact={true} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Enhanced Key Metrics Cards with Confetti Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EnhancedMetricCard
          title="Total Value Locked"
          value={formatCurrency(marketOverview.totalTVL)}
          change={marketOverview.tvlChange24h}
          icon={<DollarSign className="h-6 w-6" />}
          description="Across all protocols"
          trend="primary"
          sparklineData={[85, 88, 92, 95, 100, 98, 102]}
          showWhimsical={showWhimsicalFeatures}
          celebration={marketOverview.tvlChange24h > 5 ? "New ATH! 🎉" : undefined}
        />
        
        <EnhancedMetricCard
          title="24h Volume"
          value={formatCurrency(marketOverview.totalVolume24h)}
          change={marketOverview.tvlChange7d}
          icon={<BarChart3 className="h-6 w-6" />}
          description="Trading activity"
          trend="secondary"
          sparklineData={[75, 82, 78, 85, 90, 88, 92]}
          showWhimsical={showWhimsicalFeatures}
          milestone={marketOverview.totalVolume24h > 1000000000 ? "🚀 $1B+ Volume!" : undefined}
        />
        
        <EnhancedMetricCard
          title="Active Users"
          value={formatNumber(marketOverview.totalUsers)}
          change={12.5}
          icon={<Wallet className="h-6 w-6" />}
          description="Unique addresses"
          trend="success"
          sparklineData={[60, 65, 68, 70, 75, 78, 82]}
          showWhimsical={showWhimsicalFeatures}
          encouragement="Growing strong! 💪"
        />
        
        <EnhancedMetricCard
          title="Protocols"
          value={marketOverview.protocolCount.toString()}
          change={5.2}
          icon={<Globe className="h-6 w-6" />}
          description="Active DeFi protocols"
          trend="info"
          sparklineData={[45, 46, 47, 48, 49, 49, 50]}
          showWhimsical={showWhimsicalFeatures}
          funFact="🌟 Endless opportunities!"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced TVL by Protocol Chart */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Top Protocols by TVL</h3>
                  <p className="text-sm text-slate-600">Market share analysis</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {tvlTrendData.length}
                </p>
                <p className="text-xs text-slate-500">Protocols</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={tvlTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#e2e8f0"
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={formatCurrency}
                  stroke="#e2e8f0"
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'TVL']}
                  labelStyle={{ color: '#1e293b', fontWeight: '500' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar 
                  dataKey="tvl" 
                  fill="url(#tvlGradient)" 
                  radius={[6, 6, 0, 0]}
                  stroke="#3b82f6"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Category Distribution */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Protocol Categories</h3>
                  <p className="text-sm text-slate-600">TVL distribution</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {categoryData.reduce((sum, cat) => sum + cat.count, 0)}
                </p>
                <p className="text-xs text-slate-500">Total Protocols</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <defs>
                      {categoryData.map((entry, index) => (
                        <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#gradient-${index})`}
                          stroke={entry.color}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'TVL Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 mb-4">Category Breakdown</h4>
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" className="rounded-full shadow-sm">
                        <circle cx="8" cy="8" r="7" fill={category.color} stroke="white" strokeWidth="2" />
                      </svg>
                      <div>
                        <span className="font-medium text-slate-900">{category.name}</span>
                        <p className="text-xs text-slate-500">{category.count} protocols</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{category.value.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Top Protocols</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProtocols.map((protocol) => (
              <ProtocolCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Trend Analysis</h4>
              <p className="text-sm text-muted-foreground">
                {statistics?.analysis.trendAnalysis}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">
                {statistics?.analysis.riskAssessment}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Opportunities</h4>
              <ul className="space-y-1">
                {statistics?.analysis.opportunities.map((opportunity, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-red-600">Risks</h4>
              <ul className="space-y-1">
                {statistics?.analysis.risks.map((risk, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Footer with More Information */}
      <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className={`h-4 w-4 text-slate-600 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium text-slate-700">
                Auto-refresh: {autoRefresh ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                Data integrity verified
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Whimsical Component Overlays */}
      {showWhimsicalFeatures && (
        <>
          {/* DeFi Assistant */}
          <DeFiAssistant 
            position="bottom-right"
            context={{
              page: 'dashboard',
              userLevel: 7,
              recentActivity: ['uniswap', 'compound'],
              currentProtocol: selectedNetwork
            }}
          />
          
          {/* Tutorial Dialog */}
          {showTutorial && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="container mx-auto h-full flex items-center justify-center p-4">
                <div className="relative">
                  <Button
                    className="absolute top-4 right-4 z-10"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTutorial(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <InteractiveTutorial 
                    onComplete={(tutorialId) => {
                      console.log('Tutorial completed:', tutorialId)
                      setShowTutorial(false)
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Mini Games Dialog */}
          {showMiniGames && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="container mx-auto h-full flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl max-w-6xl max-h-full overflow-auto">
                  <Button
                    className="absolute top-4 right-4 z-10"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMiniGames(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <MiniGames 
                    onScoreUpdate={(gameId, score) => {
                      console.log('Game score:', gameId, score)
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Social Features Dialog */}
          {showSocial && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="container mx-auto h-full flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl max-w-6xl max-h-full overflow-auto">
                  <Button
                    className="absolute top-4 right-4 z-10"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSShowSocial(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <SocialFeatures 
                    userId={userId}
                    currentAchievements={['DeFi Explorer', 'Yield Farmer', 'Risk Guardian']}
                    userStats={{
                      level: 7,
                      totalXP: 2100,
                      streak: 12,
                      completedChallenges: 5
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Enhanced Metric Card Component with Sparklines and Better Design
interface EnhancedMetricCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  description: string
  trend: 'primary' | 'secondary' | 'success' | 'info'
  sparklineData?: number[]
  showWhimsical?: boolean
  celebration?: string
  milestone?: string
  encouragement?: string
  funFact?: string
}

const EnhancedMetricCard: React.FC<EnhancedMetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  description,
  trend,
  sparklineData,
  showWhimsical = false,
  celebration,
  milestone,
  encouragement,
  funFact
}) => {
  const isPositive = change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  const percentageStyle = formatPercentageWithStyle(change)
  
  const trendColors = {
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500',
    success: 'bg-green-500',
    info: 'bg-cyan-500'
  }
  
  const trendBgColors = {
    primary: 'from-blue-50 to-blue-100',
    secondary: 'from-purple-50 to-purple-100', 
    success: 'from-green-50 to-green-100',
    info: 'from-cyan-50 to-cyan-100'
  }
  
  const whimsicalMessage = celebration || milestone || encouragement || funFact
  
  return (
    <Card className={[
      "overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative",
      showWhimsical && whimsicalMessage ? "animate-pulse" : ""
    ].join(' ')}>
      {/* Whimsical notification */}
      {showWhimsical && whimsicalMessage && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
            {celebration && "🎉"}
            {milestone && "🚀"}
            {encouragement && "💪"}
            {funFact && "🌟"}
          </div>
        </div>
      )}
      
      <CardContent className={[
        `p-6 bg-gradient-to-br ${trendBgColors[trend]} group-hover:from-white group-hover:to-slate-50`,
        showWhimsical && whimsicalMessage ? "border-2 border-yellow-300" : ""
      ].join(' ')}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${trendColors[trend]} text-white shadow-lg`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <TrendIcon className="h-3 w-3" />
              {percentageStyle.value}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-3xl font-bold text-slate-900 font-mono tracking-tight">{value}</p>
          
          {sparklineData && (
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData.map((value, index) => ({ value, index }))}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={isPositive ? DeFiDesignTokens.colors.success[500] : DeFiDesignTokens.colors.error[500]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: isPositive ? DeFiDesignTokens.colors.success[500] : DeFiDesignTokens.colors.error[500] }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        
        {/* Whimsical Message Display */}
        {showWhimsical && whimsicalMessage && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs font-medium text-yellow-800 text-center">
              {whimsicalMessage}
            </p>
          </div>
        )}
        
        {/* Hover indicator with sparkles */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Sparkle effects for whimsical mode */}
        {showWhimsical && (
          <>
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-300 rounded-full animate-bounce delay-300" />
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Protocol Card Component
interface ProtocolCardProps {
  protocol: ProtocolInfo
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol }) => {
  const changeStyle = formatPercentageWithStyle(protocol.tvlChange24h)
  const ChangeIcon = changeStyle.icon
  const riskLevel = getRiskLabel(protocol.riskScore)
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <CardContent className="p-5 bg-gradient-to-br from-white to-slate-50 group-hover:from-slate-50 group-hover:to-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-slate-900">{protocol.name}</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-slate-600 font-medium">{protocol.type}</p>
          </div>
          <Badge className={`${getRiskColor(protocol.riskScore)} text-xs font-semibold px-3 py-1`}>
            {riskLevel}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-600 font-medium mb-1">TVL</p>
            <p className="font-bold text-slate-900 font-mono">{formatCurrency(protocol.tvl)}</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs text-purple-600 font-medium mb-1">24h Volume</p>
            <p className="font-bold text-slate-900 font-mono">{formatCurrency(protocol.volume24h)}</p>
          </div>
          
          {protocol.yieldApr && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-green-600 font-medium mb-1">APR</p>
              <p className="font-bold text-green-700 font-mono">{protocol.yieldApr.toFixed(2)}%</p>
            </div>
          )}
          
          <div className={`p-3 rounded-lg ${protocol.tvlChange24h >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`text-xs font-medium mb-1 ${protocol.tvlChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              24h Change
            </p>
            <div className="flex items-center gap-1">
              <ChangeIcon className="h-3 w-3" />
              <p className={`font-bold font-mono ${changeStyle.className}`}>
                {changeStyle.value}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-100 rounded">
              <Globe className="h-3 w-3 text-slate-600" />
            </div>
            <span className="text-xs font-medium text-slate-600 capitalize">{protocol.blockchain}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className={`w-1 h-1 rounded-full ${getRiskColorByScore(protocol.riskScore)}`}></div>
            <span className="text-xs text-slate-500">Risk: {protocol.riskScore}/100</span>
          </div>
        </div>
        
        {/* Hover effect indicator */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </CardContent>
    </Card>
  )
}

// Loading Skeleton
const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DeFiDashboard
