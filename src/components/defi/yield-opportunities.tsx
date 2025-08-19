"use client"

import * as React from "react"
import { useMemo, useState } from 'react'
 
import { 
  Sprout,
  TrendingUp,
  Clock,
  DollarSign,
  AlertTriangle,
  Star,
  RefreshCw,
  ExternalLink,
  Calculator,
  Zap,
  Shield,
  Target,
  
  Search,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
 
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
 
import { DeFiRiskLevel } from '@crypto/defi'
import { useEffect } from 'react'
 

interface YieldOpportunitiesProps {
  className?: string
}

interface YieldOpportunity {
  id: string
  protocol: string
  network: string
  farmName: string
  stakingToken: string
  rewardTokens: string[]
  apy: number
  apr: number
  baseApy: number
  rewardApy: number
  tvl: number
  participantCount: number
  dailyRewards: number
  totalRewardsValue: number
  lockPeriod: number // days
  withdrawalFee: number // %
  autoCompound: boolean
  compoundFrequency?: number // times per day
  compoundingFee?: number // %
  riskLevel: DeFiRiskLevel
  impermanentLossRisk: DeFiRiskLevel
  liquidityRatio: number
  poolDepth: number
  priceStability: number
  auditScore?: number
  timeActive: number // days
  volumeToTvlRatio: number
  rewardTokensPriceStability: number[]
  sustainabilityScore: number
  lastUpdated: Date
}

interface YieldCalculation {
  principal: number
  timeframe: number // days
  compound: boolean
  currentValue: number
  totalRewards: number
  apy: number
  fees: number
  netReturn: number
  netApy: number
}

// Mock yield opportunities
const generateMockOpportunities = (): YieldOpportunity[] => {
  const opportunities = [
    {
      protocol: 'Curve',
      farmName: 'stETH-ETH Pool',
      stakingToken: 'stETH-ETH LP',
      rewardTokens: ['CRV', 'LDO'],
      baseApy: 4.2,
      rewardApy: 8.3,
      tvl: 180000000,
      riskLevel: DeFiRiskLevel.LOW,
      lockPeriod: 0,
      autoCompound: true,
      priceStability: 95
    },
    {
      protocol: 'Convex',
      farmName: '3pool Vault',
      stakingToken: '3CRV',
      rewardTokens: ['CVX', 'CRV'],
      baseApy: 3.8,
      rewardApy: 12.5,
      tvl: 320000000,
      riskLevel: DeFiRiskLevel.LOW,
      lockPeriod: 0,
      autoCompound: true,
      priceStability: 98
    },
    {
      protocol: 'Yearn Finance',
      farmName: 'yvUSDC Vault',
      stakingToken: 'USDC',
      rewardTokens: ['YFI'],
      baseApy: 5.1,
      rewardApy: 3.4,
      tvl: 95000000,
      riskLevel: DeFiRiskLevel.MEDIUM,
      lockPeriod: 0,
      autoCompound: true,
      priceStability: 99
    },
    {
      protocol: 'Aura Finance',
      farmName: 'wstETH-WETH',
      stakingToken: 'B-wstETH-WETH',
      rewardTokens: ['AURA', 'BAL'],
      baseApy: 3.2,
      rewardApy: 15.8,
      tvl: 42000000,
      riskLevel: DeFiRiskLevel.MEDIUM,
      lockPeriod: 7,
      autoCompound: false,
      priceStability: 92
    },
    {
      protocol: 'Rocket Pool',
      farmName: 'rETH Staking',
      stakingToken: 'rETH',
      rewardTokens: ['ETH'],
      baseApy: 5.8,
      rewardApy: 0,
      tvl: 280000000,
      riskLevel: DeFiRiskLevel.LOW,
      lockPeriod: 0,
      autoCompound: true,
      priceStability: 94
    },
    {
      protocol: 'Frax Finance',
      farmName: 'FRAX-USDC',
      stakingToken: 'FRAX-USDC LP',
      rewardTokens: ['FXS', 'CRV'],
      baseApy: 2.1,
      rewardApy: 18.9,
      tvl: 67000000,
      riskLevel: DeFiRiskLevel.HIGH,
      lockPeriod: 30,
      autoCompound: false,
      priceStability: 88
    }
  ]

  return opportunities.map((opp, index) => ({
    id: `opportunity-${index}`,
    network: 'ethereum',
    apy: opp.baseApy + opp.rewardApy,
    apr: opp.baseApy + opp.rewardApy * 0.9, // Slightly lower due to compounding
    participantCount: Math.floor(opp.tvl / 25000) + Math.floor(Math.random() * 1000),
    dailyRewards: opp.tvl * (opp.rewardApy / 100) / 365,
    totalRewardsValue: opp.tvl * (opp.rewardApy / 100),
    withdrawalFee: opp.lockPeriod > 0 ? 0.5 : 0,
    compoundFrequency: opp.autoCompound ? (opp.protocol === 'Yearn Finance' ? 1 : 24) : undefined,
    compoundingFee: opp.autoCompound ? 2 : undefined,
    impermanentLossRisk: opp.stakingToken.includes('LP') ? DeFiRiskLevel.MEDIUM : DeFiRiskLevel.VERY_LOW,
    liquidityRatio: 0.15 + Math.random() * 0.25,
    poolDepth: opp.tvl * (0.8 + Math.random() * 0.4),
    auditScore: 75 + Math.floor(Math.random() * 20),
    timeActive: 30 + Math.floor(Math.random() * 700),
    volumeToTvlRatio: 0.05 + Math.random() * 0.3,
    rewardTokensPriceStability: opp.rewardTokens.map(() => 70 + Math.random() * 25),
    sustainabilityScore: 60 + Math.floor(Math.random() * 35),
    lastUpdated: new Date(),
    ...opp
  }))
}

// Calculate yield with compound interest
const calculateYield = (
  principal: number,
  apy: number,
  days: number,
  compound: boolean = true,
  compoundFrequency: number = 365,
  fees: number = 0
): YieldCalculation => {
  // const dailyRate = apy / 100 / 365
  let currentValue: number

  if (compound && compoundFrequency > 0) {
    const periodsPerYear = compoundFrequency
    const ratePerPeriod = apy / 100 / periodsPerYear
    const periods = (days / 365) * periodsPerYear
    currentValue = principal * Math.pow(1 + ratePerPeriod, periods)
  } else {
    currentValue = principal * (1 + (apy / 100) * (days / 365))
  }

  const totalRewards = currentValue - principal
  const feeAmount = totalRewards * (fees / 100)
  const netRewards = totalRewards - feeAmount
  const netCurrentValue = principal + netRewards
  const netApy = compound 
    ? (Math.pow(netCurrentValue / principal, 365 / days) - 1) * 100
    : (netRewards / principal) * (365 / days) * 100

  return {
    principal,
    timeframe: days,
    compound,
    currentValue: netCurrentValue,
    totalRewards: netRewards,
    apy,
    fees: feeAmount,
    netReturn: netRewards,
    netApy
  }
}

// Format currency
const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return `$${value.toFixed(2)}`
}

// Format percentage
const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`
}

// Get risk color
const getRiskColor = (risk: DeFiRiskLevel): string => {
  switch (risk) {
    case DeFiRiskLevel.VERY_LOW: return 'text-green-700 bg-green-100'
    case DeFiRiskLevel.LOW: return 'text-green-600 bg-green-50'
    case DeFiRiskLevel.MEDIUM: return 'text-yellow-600 bg-yellow-100'
    case DeFiRiskLevel.HIGH: return 'text-orange-600 bg-orange-100'
    case DeFiRiskLevel.VERY_HIGH: return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export const YieldOpportunities: React.FC<YieldOpportunitiesProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedNetwork, setSelectedNetwork] = React.useState<string>('all')
  const [minApy, setMinApy] = React.useState([0])
  const [maxRisk, setMaxRisk] = React.useState<string>('high')
  const [showOnlyAutoCompound, setShowOnlyAutoCompound] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<'apy' | 'tvl' | 'risk' | 'sustainability'>('apy')
  const [sortOrder] = React.useState<'asc' | 'desc'>('desc')
  const [selectedOpportunity, setSelectedOpportunity] = React.useState<YieldOpportunity | null>(null)

  // Fetch from API (fallback to mock on failure)
  const [opportunities, setOpportunities] = React.useState<YieldOpportunity[]>([])
  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        const params = new URLSearchParams()
        params.set('minApy', String(minApy[0]))
        // サーバー側の許容カラムへマッピング（それ以外はクライアントで並び替え）
        const serverSort = ((): string => {
          if (sortBy === 'tvl') return 'tvl'
          if (sortBy === 'apy') return 'apy'
          return 'apy'
        })()
        params.set('sortBy', serverSort)
        params.set('sortOrder', 'desc')
        // ネットワークはサーバーも対応可能
        if (selectedNetwork !== 'all') params.set('network', selectedNetwork)
        params.set('includeUniswap', 'true')
        // 主要DEXを既定で補完（ユーザー検索性の向上）
        params.set('includeDexes', 'pancakeswap,sushiswap,quickswap,camelot,velodrome,trader-joe,raydium,orca,curve,convex')
        if (maxRisk) params.set('maxRisk', maxRisk)
        if (showOnlyAutoCompound) params.set('autoCompound', 'true')
        // Solana SDK 統合データを取り込む
        params.set('includeSolanaSdk', 'true')
        const res = await fetch(`/api/defi/yield-farming?${params}`, { signal: controller.signal })
        if (!res.ok) throw new Error('failed')
        const j = await res.json()
        const farms = Array.isArray(j?.data?.farms) ? j.data.farms : []
        // map to YieldOpportunity shape from /yield-farming
        type ApiFarm = {
          id?: unknown
          protocol?: { name?: unknown; blockchain?: unknown } | unknown
          name?: unknown
          stakingToken?: unknown
          rewardTokens?: unknown
          apy?: unknown
          apr?: unknown
          baseApy?: unknown
          rewardApy?: unknown
          totalStakedUsd?: unknown
          participantCount?: unknown
          dailyRewardsUsd?: unknown
          lockPeriodDays?: unknown
          withdrawalFeePercent?: unknown
          autoCompound?: unknown
          compoundFrequencyHours?: unknown
          totalFeePercent?: unknown
          riskLevel?: unknown
          trends?: { volatility?: unknown } | unknown
          lastUpdated?: unknown
        }
        const toEnum = (val: unknown): DeFiRiskLevel => {
          const s = String(val || '').toLowerCase()
          switch (s) {
            case 'very_low': return DeFiRiskLevel.VERY_LOW
            case 'low': return DeFiRiskLevel.LOW
            case 'medium': return DeFiRiskLevel.MEDIUM
            case 'high': return DeFiRiskLevel.HIGH
            case 'very_high': return DeFiRiskLevel.VERY_HIGH
            case 'critical': return DeFiRiskLevel.CRITICAL
            default: return DeFiRiskLevel.MEDIUM
          }
        }
        const mapped: YieldOpportunity[] = (farms as ApiFarm[]).map((f) => {
          const protocolObj = (f.protocol || {}) as { name?: unknown; blockchain?: unknown }
          const hours = typeof f.compoundFrequencyHours === 'number' ? (f.compoundFrequencyHours as number) : undefined
          const timesPerDay = hours && hours > 0 ? Math.max(1, Math.round(24 / hours)) : undefined
          return {
            id: String(f.id ?? ''),
            protocol: String(protocolObj.name || ''),
            network: String(protocolObj.blockchain || ''),
            farmName: String(f.name || ''),
            stakingToken: String(f.stakingToken || ''),
            rewardTokens: Array.isArray(f.rewardTokens) ? (f.rewardTokens as unknown[]).map(String) : [],
            apy: Number(f.apy || 0),
            apr: Number(f.apr || f.apy || 0),
            baseApy: Number(f.baseApy || 0),
            rewardApy: Number(f.rewardApy || 0),
            tvl: Number(f.totalStakedUsd || 0),
            participantCount: Number(f.participantCount || 0),
            dailyRewards: Number(f.dailyRewardsUsd || 0),
            totalRewardsValue: 0,
            lockPeriod: Number(f.lockPeriodDays || 0),
            withdrawalFee: Number(f.withdrawalFeePercent || 0),
            autoCompound: Boolean(f.autoCompound || false),
            compoundFrequency: timesPerDay,
            compoundingFee: typeof f.totalFeePercent === 'number' ? Number(f.totalFeePercent) : undefined,
            riskLevel: toEnum(f.riskLevel),
            impermanentLossRisk: DeFiRiskLevel.MEDIUM,
            liquidityRatio: 0,
            poolDepth: 0,
            priceStability: 0,
            auditScore: undefined,
            timeActive: 0,
            volumeToTvlRatio: 0,
            rewardTokensPriceStability: [],
            sustainabilityScore: 0,
            lastUpdated: (typeof f.lastUpdated === 'string' || typeof f.lastUpdated === 'number' || f.lastUpdated instanceof Date)
              ? new Date(f.lastUpdated as string | number | Date)
              : new Date(),
          }
        })
        // クライアント側ネットワークフィルタ
        const networkFiltered = selectedNetwork !== 'all' ? mapped.filter(m => m.network === selectedNetwork) : mapped
        // クライアント側の追加ソート（sustainability/risk）
        const sorted = [...networkFiltered]
        if (sortBy === 'risk') {
          const riskValues: Record<DeFiRiskLevel, number> = {
            [DeFiRiskLevel.VERY_LOW]: 5,
            [DeFiRiskLevel.LOW]: 4,
            [DeFiRiskLevel.MEDIUM]: 3,
            [DeFiRiskLevel.HIGH]: 2,
            [DeFiRiskLevel.VERY_HIGH]: 1,
            [DeFiRiskLevel.CRITICAL]: 0,
          }
          sorted.sort((a, b) => riskValues[b.riskLevel] - riskValues[a.riskLevel])
        } else if (sortBy === 'sustainability') {
          sorted.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        }
        setOpportunities(sorted)
      } catch {
        // fallback to mock if API fails
        setOpportunities(generateMockOpportunities())
      }
    }
    run()
    return () => controller.abort()
  }, [minApy, sortBy, selectedNetwork, maxRisk, showOnlyAutoCompound])

  // Filter and sort opportunities
  const filteredOpportunities = React.useMemo(() => {
    let filtered = opportunities

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(opp =>
        opp.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.stakingToken.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.rewardTokens.some(token => 
          token.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Network filter
    if (selectedNetwork !== 'all') {
      filtered = filtered.filter(opp => opp.network === selectedNetwork)
    }

    // APY filter
    filtered = filtered.filter(opp => opp.apy >= minApy[0])

    // Risk filter
    const riskLevels = [
      DeFiRiskLevel.VERY_LOW,
      DeFiRiskLevel.LOW,
      DeFiRiskLevel.MEDIUM,
      DeFiRiskLevel.HIGH,
      DeFiRiskLevel.VERY_HIGH
    ]
    const maxRiskIndex = riskLevels.indexOf(maxRisk as DeFiRiskLevel)
    if (maxRiskIndex >= 0) {
      filtered = filtered.filter(opp => 
        riskLevels.indexOf(opp.riskLevel) <= maxRiskIndex
      )
    }

    // Auto-compound filter
    if (showOnlyAutoCompound) {
      filtered = filtered.filter(opp => opp.autoCompound)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case 'apy':
          aValue = a.apy
          bValue = b.apy
          break
        case 'tvl':
          aValue = a.tvl
          bValue = b.tvl
          break
        case 'risk':
          const riskValues: Record<DeFiRiskLevel, number> = {
            [DeFiRiskLevel.VERY_LOW]: 5,
            [DeFiRiskLevel.LOW]: 4,
            [DeFiRiskLevel.MEDIUM]: 3,
            [DeFiRiskLevel.HIGH]: 2,
            [DeFiRiskLevel.VERY_HIGH]: 1,
            [DeFiRiskLevel.CRITICAL]: 0
          }
          aValue = riskValues[a.riskLevel]
          bValue = riskValues[b.riskLevel]
          break
        case 'sustainability':
          aValue = a.sustainabilityScore
          bValue = b.sustainabilityScore
          break
        default:
          aValue = a.apy
          bValue = b.apy
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

    return filtered
  }, [opportunities, searchTerm, selectedNetwork, minApy, maxRisk, showOnlyAutoCompound, sortBy, sortOrder])

  // Calculate summary statistics
  const summaryStats = React.useMemo(() => {
    const totalOpportunities = filteredOpportunities.length
    const totalTvl = filteredOpportunities.reduce((sum, opp) => sum + opp.tvl, 0)
    const averageApy = totalOpportunities > 0 
      ? filteredOpportunities.reduce((sum, opp) => sum + opp.apy, 0) / totalOpportunities 
      : 0
    const highestApy = totalOpportunities > 0 
      ? Math.max(...filteredOpportunities.map(opp => opp.apy)) 
      : 0
    const autoCompoundCount = filteredOpportunities.filter(opp => opp.autoCompound).length

    return {
      totalOpportunities,
      totalTvl,
      averageApy,
      highestApy,
      autoCompoundCount
    }
  }, [filteredOpportunities])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Yield Farming Opportunities
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <Sprout className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-600">High Yield</span>
            </div>
          </div>
          <p className="text-slate-600 text-lg">
            Maximize your returns with carefully curated yield farming strategies and real-time APY tracking
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live APY updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Risk assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Auto-compound available</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Yield Discovery & Filtering</h3>
              <p className="text-sm text-slate-600 mt-1">Find yield farming opportunities that match your risk profile</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {filteredOpportunities.length} Opportunities
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-green-600 border-green-200">
                Max APY: {summaryStats.highestApy.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Enhanced Search */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Search Opportunities</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Protocol, farm, or token..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Network */}
            <div>
              <label className="text-sm font-medium mb-2 block">Network</label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Networks</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Risk */}
            <div>
              <label className="text-sm font-medium mb-2 block">Max Risk Level</label>
              <Select value={maxRisk} onValueChange={setMaxRisk}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very_low">Very Low</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="very_high">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as 'apy' | 'tvl' | 'sustainability' | 'risk')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apy">APY</SelectItem>
                  <SelectItem value="tvl">TVL</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                  <SelectItem value="risk">Risk Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* APY Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Min APY: {formatPercent(minApy[0])}
              </label>
              <Slider
                value={minApy}
                onValueChange={setMinApy}
                max={50}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Auto-compound filter */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-compound only</label>
              <Switch
                checked={showOnlyAutoCompound}
                onCheckedChange={setShowOnlyAutoCompound}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-500 rounded-xl text-white shadow-lg">
                <Target className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-1 font-mono">
              {summaryStats.totalOpportunities}
            </div>
            <div className="text-sm font-medium text-blue-600">Active Opportunities</div>
            <div className="mt-2 text-xs text-blue-500">
              Live yield farms
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-500 rounded-xl text-white shadow-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1 font-mono">
              {formatCurrency(summaryStats.totalTvl)}
            </div>
            <div className="text-sm font-medium text-green-600">Total TVL</div>
            <div className="mt-2 text-xs text-green-500">
              Locked value
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-purple-500 rounded-xl text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-1 font-mono">
              {formatPercent(summaryStats.averageApy)}
            </div>
            <div className="text-sm font-medium text-purple-600">Average APY</div>
            <div className="mt-2 text-xs text-purple-500">
              Expected returns
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-500 rounded-xl text-white shadow-lg">
                <Star className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-1 font-mono">
              {formatPercent(summaryStats.highestApy)}
            </div>
            <div className="text-sm font-medium text-orange-600">Highest APY</div>
            <div className="mt-2 text-xs text-orange-500">
              Maximum yield
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-cyan-50 to-cyan-100 group-hover:from-cyan-100 group-hover:to-cyan-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-cyan-500 rounded-xl text-white shadow-lg">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-cyan-700 mb-1 font-mono">
              {summaryStats.autoCompoundCount}
            </div>
            <div className="text-sm font-medium text-cyan-600">Auto-compound</div>
            <div className="mt-2 text-xs text-cyan-500">
              Set & forget farms
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <YieldOpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onViewDetails={() => setSelectedOpportunity(opportunity)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sprout className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your filters to find more yield farming opportunities.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          isOpen={!!selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
    </div>
  )
}

// Yield Opportunity Card Component
interface YieldOpportunityCardProps {
  opportunity: YieldOpportunity
  onViewDetails: () => void
}

const YieldOpportunityCard: React.FC<YieldOpportunityCardProps> = ({ 
  opportunity, 
  onViewDetails 
}) => {
  // const riskAdjustedApy = opportunity.apy * (opportunity.sustainabilityScore / 100)
  const isHighYield = opportunity.apy > 15
  const isStable = opportunity.sustainabilityScore > 80
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-br from-white to-slate-50 group-hover:from-slate-50 group-hover:to-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900">{opportunity.farmName}</h3>
              {opportunity.autoCompound && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="bg-green-100 text-green-700 border border-green-300 text-xs font-semibold px-2 py-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Auto-Compound
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-center">
                        <p className="font-medium">Auto-Compounding Active</p>
                        <p className="text-xs text-slate-600">
                          Compounds {opportunity.compoundFrequency}x per day
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {isHighYield && (
                <Badge className="bg-red-100 text-red-700 border border-red-300 text-xs font-semibold px-2 py-1 animate-pulse">
                  🔥 Hot
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">{opportunity.protocol}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span className="capitalize">{opportunity.network}</span>
              </div>
            </div>
          </div>
          
          <Badge className={`${getRiskColor(opportunity.riskLevel)} text-xs font-semibold px-3 py-1`}>
            {opportunity.riskLevel.replace('_', ' ')}
          </Badge>
        </div>
        
        {/* Enhanced Token Information */}
        <div className="bg-slate-50 p-3 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Staking Token</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-bold text-slate-900">{opportunity.stakingToken}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Reward Tokens</span>
            <div className="flex items-center gap-1">
              {opportunity.rewardTokens.map((token, index) => (
                <span key={index} className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
                  {token}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Enhanced Key Metrics */}
        <div className="text-center p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative">
            <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text mb-2">
              {formatPercent(opportunity.apy)}
            </div>
            <div className="text-sm font-medium text-slate-700 mb-2">Total APY</div>
            <div className="flex justify-center gap-4 text-xs">
              <div className="bg-white px-2 py-1 rounded-full shadow-sm">
                <span className="text-slate-600">Base:</span>
                <span className="font-bold text-green-600 ml-1">{formatPercent(opportunity.baseApy)}</span>
              </div>
              <div className="bg-white px-2 py-1 rounded-full shadow-sm">
                <span className="text-slate-600">Rewards:</span>
                <span className="font-bold text-blue-600 ml-1">{formatPercent(opportunity.rewardApy)}</span>
              </div>
            </div>
            {isStable && (
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-700 border border-green-300 text-xs">
                  ✓ Stable Protocol
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Additional Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-blue-600 mb-1">TVL</p>
            <p className="font-bold text-slate-900 font-mono">{formatCurrency(opportunity.tvl)}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-purple-600 mb-1">Participants</p>
            <p className="font-bold text-slate-900 font-mono">{opportunity.participantCount.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-green-600 mb-1">Daily Rewards</p>
            <p className="font-bold text-slate-900 font-mono">{formatCurrency(opportunity.dailyRewards)}</p>
          </div>
          <div className={`p-3 rounded-lg ${opportunity.lockPeriod === 0 ? 'bg-green-50' : opportunity.lockPeriod > 30 ? 'bg-red-50' : 'bg-yellow-50'}`}>
            <p className={`text-xs font-medium mb-1 ${opportunity.lockPeriod === 0 ? 'text-green-600' : opportunity.lockPeriod > 30 ? 'text-red-600' : 'text-yellow-600'}`}>
              Lock Period
            </p>
            <div className="flex items-center gap-1">
              {opportunity.lockPeriod === 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="font-bold text-green-700 font-mono">Flexible</p>
                </>
              ) : (
                <>
                  {opportunity.lockPeriod > 30 ? (
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  ) : (
                    <Clock className="h-3 w-3 text-yellow-600" />
                  )}
                  <p className={`font-bold font-mono ${opportunity.lockPeriod > 30 ? 'text-red-700' : 'text-yellow-700'}`}>
                    {opportunity.lockPeriod}d
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Risk Indicators */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sustainability Score</span>
            <span className="font-medium">{opportunity.sustainabilityScore}/100</span>
          </div>
          <Progress value={opportunity.sustainabilityScore} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price Stability</span>
            <span className="font-medium">{opportunity.priceStability}%</span>
          </div>
        </div>
        
        {/* Warnings */}
        {(opportunity.lockPeriod > 7 || opportunity.riskLevel === DeFiRiskLevel.HIGH) && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 text-yellow-800 rounded text-xs">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>
              {opportunity.lockPeriod > 7 && `${opportunity.lockPeriod}d lock period`}
              {opportunity.lockPeriod > 7 && opportunity.riskLevel === DeFiRiskLevel.HIGH && ' • '}
              {opportunity.riskLevel === DeFiRiskLevel.HIGH && 'High risk protocol'}
            </span>
          </div>
        )}
        
        {/* Enhanced Actions */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <Button 
            onClick={onViewDetails} 
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Analyze Yield
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <a 
                    href={`https://app.${opportunity.protocol.toLowerCase().replace(' ', '')}.finance`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${opportunity.protocol} App`}
                    aria-label={`Open ${opportunity.protocol} App`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open {opportunity.protocol} App</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Hover effect indicator */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </CardContent>
    </Card>
  )
}

// Opportunity Details Modal
interface OpportunityDetailsModalProps {
  opportunity: YieldOpportunity
  isOpen: boolean
  onClose: () => void
}

const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({ 
  opportunity, 
  isOpen, 
  onClose 
}) => {
  const [calculatorAmount, setCalculatorAmount] = useState(1000)
  const [calculatorDays, setCalculatorDays] = useState(365)

  const yieldCalculation = useMemo(() => {
    return calculateYield(
      calculatorAmount,
      opportunity.apy,
      calculatorDays,
      opportunity.autoCompound,
      opportunity.compoundFrequency || 365,
      opportunity.compoundingFee || 0
    )
  }, [calculatorAmount, calculatorDays, opportunity])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Sprout className="h-6 w-6" />
            {opportunity.farmName} - {opportunity.protocol}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yield Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total APY:</span>
                  <span className="font-medium text-green-600 text-xl">
                    {formatPercent(opportunity.apy)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base APY:</span>
                  <span className="font-medium">{formatPercent(opportunity.baseApy)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reward APY:</span>
                  <span className="font-medium">{formatPercent(opportunity.rewardApy)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Auto-compound:</span>
                  <span className="font-medium">
                    {opportunity.autoCompound ? (
                      <span className="text-green-600">
                        Yes ({opportunity.compoundFrequency}x/day)
                      </span>
                    ) : (
                      <span className="text-gray-600">No</span>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TVL:</span>
                  <span className="font-medium">{formatCurrency(opportunity.tvl)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants:</span>
                  <span className="font-medium">{opportunity.participantCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Rewards:</span>
                  <span className="font-medium">{formatCurrency(opportunity.dailyRewards)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Active:</span>
                  <span className="font-medium">{opportunity.timeActive} days</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Yield Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Yield Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Investment Amount ($)
                    </label>
                    <Input
                      type="number"
                      value={calculatorAmount}
                      onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Time Period (days)
                    </label>
                    <Input
                      type="number"
                      value={calculatorDays}
                      onChange={(e) => setCalculatorDays(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                </div>
                
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Projected Returns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Initial:</span>
                      <span className="font-medium">{formatCurrency(yieldCalculation.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rewards:</span>
                      <span className="font-medium text-green-600">
                        +{formatCurrency(yieldCalculation.totalRewards)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fees:</span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(yieldCalculation.fees)}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <span className="font-medium">Final Value:</span>
                      <span className="font-bold text-lg">
                        {formatCurrency(yieldCalculation.currentValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net APY:</span>
                      <span className="font-medium text-green-600">
                        {formatPercent(yieldCalculation.netApy)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Risk Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Overall Risk:</span>
                  <Badge className={getRiskColor(opportunity.riskLevel)}>
                    {opportunity.riskLevel.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">IL Risk:</span>
                  <Badge className={getRiskColor(opportunity.impermanentLossRisk)}>
                    {opportunity.impermanentLossRisk.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Sustainability Score:</span>
                    <span>{opportunity.sustainabilityScore}/100</span>
                  </div>
                  <Progress value={opportunity.sustainabilityScore} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Price Stability:</span>
                    <span>{opportunity.priceStability}%</span>
                  </div>
                  <Progress value={opportunity.priceStability} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Terms & Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lock Period:</span>
                  <span className="font-medium">
                    {opportunity.lockPeriod === 0 ? 'No lock' : `${opportunity.lockPeriod} days`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Withdrawal Fee:</span>
                  <span className="font-medium">
                    {opportunity.withdrawalFee === 0 ? 'None' : formatPercent(opportunity.withdrawalFee)}
                  </span>
                </div>
                
                {opportunity.compoundingFee && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auto-compound Fee:</span>
                    <span className="font-medium">{formatPercent(opportunity.compoundingFee)}</span>
                  </div>
                )}
                
                {opportunity.auditScore && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Audit Score:</span>
                    <span className="font-medium">{opportunity.auditScore}/100</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume/TVL:</span>
                  <span className="font-medium">{formatPercent(opportunity.volumeToTvlRatio * 100)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <a 
                href={`https://app.${opportunity.protocol.toLowerCase().replace(' ', '')}.finance`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Protocol
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default YieldOpportunities
