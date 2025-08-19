"use client"

import * as React from "react"
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Search,
  Droplets,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Eye,
  Heart,
  DollarSign,
  BarChart3,
  Globe,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
 
import { LiquidityPoolType, BlockchainNetwork } from '@crypto/defi'
 

interface PoolExplorerProps {
  className?: string
}

interface PoolToken {
  address: string
  symbol: string
  name: string
  balance: number
  weight: number
  reserveUSD: number
  price?: number
}

interface LiquidityPool {
  id: string
  protocol: string
  network: string
  address: string
  name: string
  type: LiquidityPoolType
  tokens: PoolToken[]
  totalLiquidity: number
  liquidityUSD: number
  volume24h: number
  volume7d: number
  trades24h: number
  apy: number
  apr: number
  fees: {
    tradingFee: number
    totalFee: number
  }
  impermanentLoss: number
  liquidityRisk: string
  priceImpact: Array<{
    tradeSize: number
    priceImpact: number
    slippage: number
  }>
  lpTokens: {
    totalSupply: number
    price: number
    symbol: string
  }
  timestamp: Date
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

// Enhanced pool type colors with better accessibility
const getPoolTypeColor = (type: LiquidityPoolType): string => {
  switch (type) {
    case LiquidityPoolType.STANDARD: return 'bg-blue-100 text-blue-800 border border-blue-300 shadow-sm'
    case LiquidityPoolType.STABLE: return 'bg-green-100 text-green-800 border border-green-300 shadow-sm'
    case LiquidityPoolType.WEIGHTED: return 'bg-purple-100 text-purple-800 border border-purple-300 shadow-sm'
    case LiquidityPoolType.CONCENTRATED: return 'bg-orange-100 text-orange-800 border border-orange-300 shadow-sm'
    case LiquidityPoolType.META: return 'bg-pink-100 text-pink-800 border border-pink-300 shadow-sm'
    default: return 'bg-slate-100 text-slate-800 border border-slate-300 shadow-sm'
  }
}

// Pool performance indicator
const getPoolPerformanceIndicator = (apy: number, volume24h: number, liquidityUSD: number) => {
  const volumeToLiquidityRatio = volume24h / liquidityUSD
  
  if (apy > 15 && volumeToLiquidityRatio > 0.1) {
    return { status: 'hot', label: 'Hot', color: 'bg-red-500', textColor: 'text-red-600' }
  } else if (apy > 10 || volumeToLiquidityRatio > 0.05) {
    return { status: 'trending', label: 'Trending', color: 'bg-orange-500', textColor: 'text-orange-600' }
  } else if (apy > 5) {
    return { status: 'stable', label: 'Stable', color: 'bg-green-500', textColor: 'text-green-600' }
  } else {
    return { status: 'low', label: 'Low Activity', color: 'bg-slate-500', textColor: 'text-slate-600' }
  }
}

// Risk level colors
const getRiskColor = (risk: string): string => {
  switch (risk.toLowerCase()) {
    case 'very_low': return 'text-green-600 bg-green-100'
    case 'low': return 'text-blue-600 bg-blue-100'
    case 'medium': return 'text-yellow-600 bg-yellow-100'
    case 'high': return 'text-orange-600 bg-orange-100'
    case 'very_high': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

 

export const PoolExplorer: React.FC<PoolExplorerProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all')
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all')
  const [selectedPoolType, setSelectedPoolType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('tvl')
  const [sortOrder] = useState<'asc' | 'desc'>('desc')
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Load favorites from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('defi-pool-favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [selectedPool, setSelectedPool] = useState<LiquidityPool | null>(null)

  // Fetch pools data
  const {
    data: poolsData,
    isLoading,
    error,
    refetch
  } = useQuery<{ pools: LiquidityPool[] }>({
    queryKey: ['defi-pools', selectedNetwork, selectedProtocol],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: '100',
        includeMetrics: 'true'
      })
      
      if (selectedNetwork !== 'all') {
        params.append('network', selectedNetwork)
      }
      if (selectedProtocol !== 'all') {
        params.append('protocol', selectedProtocol)
      }
      
      const response = await fetch(`/api/defi/pools?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch pools')
      }
      return response.json().then(data => data.data)
    }
  })

  // Filter and sort pools
  const filteredPools = useMemo(() => {
    if (!poolsData?.pools) return []

    let filtered = poolsData.pools

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(pool =>
        pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.tokens.some(token => 
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Pool type filter
    if (selectedPoolType !== 'all') {
      filtered = filtered.filter(pool => pool.type === selectedPoolType)
    }

    // Sort pools
    filtered.sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case 'tvl':
          aValue = a.liquidityUSD
          bValue = b.liquidityUSD
          break
        case 'volume':
          aValue = a.volume24h
          bValue = b.volume24h
          break
        case 'apy':
          aValue = a.apy
          bValue = b.apy
          break
        case 'fees':
          aValue = a.fees.totalFee
          bValue = b.fees.totalFee
          break
        default:
          aValue = a.liquidityUSD
          bValue = b.liquidityUSD
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

    return filtered
  }, [poolsData, searchTerm, selectedPoolType, sortBy, sortOrder])

  // Toggle favorite
  const toggleFavorite = (poolId: string) => {
    const newFavorites = favorites.includes(poolId)
      ? favorites.filter(id => id !== poolId)
      : [...favorites, poolId]
    
    setFavorites(newFavorites)
    localStorage.setItem('defi-pool-favorites', JSON.stringify(newFavorites))
  }

  // Get unique protocols
  const protocols = useMemo(() => {
    if (!poolsData?.pools) return []
    return [...new Set(poolsData.pools.map(pool => pool.protocol))]
  }, [poolsData])

  if (isLoading) {
    return <PoolExplorerSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-red-600 font-medium">Failed to load pool data</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Liquidity Pool Explorer
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">Live Pools</span>
            </div>
          </div>
          <p className="text-slate-600 text-lg">
            Discover high-yield liquidity pools with detailed risk analysis and impermanent loss calculations
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time APY</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>IL risk assessment</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={() => refetch()} variant="outline" size="sm">
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
              <h3 className="font-semibold text-slate-900">Pool Discovery & Filtering</h3>
              <p className="text-sm text-slate-600 mt-1">Find the perfect liquidity pools for your strategy</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredPools.length} Pools Found
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Enhanced Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by pool name, tokens, or protocol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100"
                >
                  ×
                </Button>
              )}
            </div>
            
            {/* Network Filter */}
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Networks</SelectItem>
                {Object.values(BlockchainNetwork).map(network => (
                  <SelectItem key={network} value={network}>
                    {network.charAt(0).toUpperCase() + network.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Protocol Filter */}
            <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Protocol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Protocols</SelectItem>
                {protocols.map(protocol => (
                  <SelectItem key={protocol} value={protocol}>
                    {protocol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Pool Type Filter */}
            <Select value={selectedPoolType} onValueChange={setSelectedPoolType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pool Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.values(LiquidityPoolType).map(type => (
                  <SelectItem key={type} value={type}>
                    {type.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tvl">TVL</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="apy">APY</SelectItem>
                <SelectItem value="fees">Fees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Pool Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-500 rounded-xl text-white shadow-lg">
                <Droplets className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-1 font-mono">
              {filteredPools.length}
            </div>
            <div className="text-sm font-medium text-blue-600">Active Pools</div>
            <div className="mt-2 text-xs text-blue-500">
              Across {new Set(filteredPools.map(p => p.protocol)).size} protocols
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
              {formatCurrency(filteredPools.reduce((sum, p) => sum + p.liquidityUSD, 0))}
            </div>
            <div className="text-sm font-medium text-green-600">Total Liquidity</div>
            <div className="mt-2 text-xs text-green-500">
              Available for trading
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-purple-500 rounded-xl text-white shadow-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-1 font-mono">
              {formatCurrency(filteredPools.reduce((sum, p) => sum + p.volume24h, 0))}
            </div>
            <div className="text-sm font-medium text-purple-600">24h Volume</div>
            <div className="mt-2 text-xs text-purple-500">
              Trading activity
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-500 rounded-xl text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-1 font-mono">
              {filteredPools.length > 0 
                ? (filteredPools.reduce((sum, p) => sum + p.apy, 0) / filteredPools.length).toFixed(2)
                : '0'
              }%
            </div>
            <div className="text-sm font-medium text-orange-600">Average APY</div>
            <div className="mt-2 text-xs text-orange-500">
              Yield opportunity
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPools.map((pool) => (
          <PoolCard
            key={pool.id}
            pool={pool}
            isFavorite={favorites.includes(pool.id)}
            onToggleFavorite={() => toggleFavorite(pool.id)}
            onViewDetails={() => setSelectedPool(pool)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPools.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Droplets className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No pools found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search criteria or filters to find more pools.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pool Details Dialog */}
      {selectedPool && (
        <PoolDetailsDialog
          pool={selectedPool}
          isOpen={!!selectedPool}
          onClose={() => setSelectedPool(null)}
        />
      )}
    </div>
  )
}

// Pool Card Component
interface PoolCardProps {
  pool: LiquidityPool
  isFavorite: boolean
  onToggleFavorite: () => void
  onViewDetails: () => void
}

const PoolCard: React.FC<PoolCardProps> = ({ 
  pool, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetails 
}) => {
  const performanceIndicator = getPoolPerformanceIndicator(pool.apy, pool.volume24h, pool.liquidityUSD)
  const volumeRatio = (pool.volume24h / pool.liquidityUSD) * 100
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-br from-white to-slate-50 group-hover:from-slate-50 group-hover:to-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900">{pool.name}</h3>
              <Badge className={`${getPoolTypeColor(pool.type)} text-xs font-semibold px-2 py-1`}>
                {pool.type.replace('_', ' ')}
              </Badge>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${performanceIndicator.color} text-white`}>
                {performanceIndicator.label}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">{pool.protocol}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span className="capitalize">{pool.network}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFavorite}
            className="p-2 hover:bg-red-50 transition-colors"
          >
            {isFavorite ? (
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            ) : (
              <Heart className="h-4 w-4 text-slate-400 hover:text-red-500" />
            )}
          </Button>
        </div>
        
        {/* Enhanced Token Composition */}
        <div className="bg-slate-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-slate-600 mb-2">Token Composition</p>
          <div className="flex items-center gap-3 flex-wrap">
            {pool.tokens.map((token, index) => (
              <div key={index} className="flex items-center gap-2 bg-white px-2 py-1 rounded-md shadow-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-slate-900">{token.symbol}</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {token.weight.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-blue-600 mb-1">Total Liquidity</p>
            <p className="font-bold text-slate-900 font-mono">{formatCurrency(pool.liquidityUSD)}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-purple-600 mb-1">24h Volume</p>
            <p className="font-bold text-slate-900 font-mono">{formatCurrency(pool.volume24h)}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-green-600 mb-1">APY</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <p className="font-bold text-green-700 font-mono">{formatPercent(pool.apy)}</p>
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-orange-600 mb-1">Trading Fee</p>
            <p className="font-bold text-slate-900 font-mono">{formatPercent(pool.fees.tradingFee)}</p>
          </div>
        </div>
        
        {/* Enhanced Risk Indicators */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Risk Level:</span>
              <Badge className={`${getRiskColor(pool.liquidityRisk)} text-xs font-semibold`}>
                {pool.liquidityRisk.replace('_', ' ')}
              </Badge>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 text-sm px-2 py-1 bg-orange-50 rounded-full">
                    <AlertTriangle className="h-3 w-3 text-orange-600" />
                    <span className="font-medium text-orange-700">IL: {formatPercent(pool.impermanentLoss)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">Impermanent Loss Risk</p>
                    <p className="text-xs text-slate-600">Estimated potential loss from price divergence</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Volume Efficiency Indicator */}
          <div className="bg-slate-50 p-3 rounded-lg">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium text-slate-600">Volume Efficiency</span>
              <span className="font-bold text-slate-900">{volumeRatio.toFixed(1)}%</span>
            </div>
            <Progress value={Math.min(volumeRatio, 50)} className="h-2" />
            <p className="text-xs text-slate-500 mt-1">Higher ratios indicate better trading activity</p>
          </div>
        </div>
        
        
        {/* Enhanced Actions */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <Button 
            onClick={onViewDetails} 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            Analyze Pool
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
                    href={`https://etherscan.io/address/${pool.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on Etherscan"
                    aria-label="View on Etherscan"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on Etherscan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Hover effect indicator */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </CardContent>
    </Card>
  )
}

// Pool Details Dialog Component
interface PoolDetailsDialogProps {
  pool: LiquidityPool
  isOpen: boolean
  onClose: () => void
}

const PoolDetailsDialog: React.FC<PoolDetailsDialogProps> = ({ pool, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Droplets className="h-6 w-6" />
            {pool.name} Pool Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protocol:</span>
                  <span className="font-medium">{pool.protocol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-medium">{pool.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge className={getPoolTypeColor(pool.type)}>
                    {pool.type.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LP Token Supply:</span>
                  <span className="font-medium font-mono">
                    {pool.lpTokens.totalSupply.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LP Token Price:</span>
                  <span className="font-medium">{formatCurrency(pool.lpTokens.price)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Liquidity:</span>
                  <span className="font-medium">{formatCurrency(pool.liquidityUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume:</span>
                  <span className="font-medium">{formatCurrency(pool.volume24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">7d Volume:</span>
                  <span className="font-medium">{formatCurrency(pool.volume7d)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Trades:</span>
                  <span className="font-medium">{pool.trades24h.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trading Fee:</span>
                  <span className="font-medium">{formatPercent(pool.fees.tradingFee)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Token Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Token Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pool.tokens.map((token, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{token.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{token.name}</p>
                      </div>
                      <Badge variant="outline">{formatPercent(token.weight)}</Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Balance:</span>
                        <span className="font-mono">{token.balance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reserve Value:</span>
                        <span className="font-medium">{formatCurrency(token.reserveUSD)}</span>
                      </div>
                      {token.price && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">{formatCurrency(token.price)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Yield & Risk Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Yield Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APY:</span>
                  <span className="font-medium text-green-600 text-lg">{formatPercent(pool.apy)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APR:</span>
                  <span className="font-medium">{formatPercent(pool.apr)}</span>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Yield Sources:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Trading fees from swaps</li>
                    {pool.apy > pool.apr && <li>• Liquidity mining rewards</li>}
                    <li>• Fee compound interest</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Liquidity Risk:</span>
                  <Badge className={getRiskColor(pool.liquidityRisk)}>
                    {pool.liquidityRisk.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impermanent Loss:</span>
                  <span className="font-medium text-orange-600">{formatPercent(pool.impermanentLoss)}</span>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Risk Factors:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Smart contract risk</li>
                    <li>• Impermanent loss risk</li>
                    <li>• Liquidity provider risk</li>
                    <li>• Oracle manipulation risk</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Price Impact Analysis */}
          {pool.priceImpact && pool.priceImpact.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pool.priceImpact.map((impact, index) => (
                    <div key={index} className="p-3 border rounded-lg text-center">
                      <div className="text-sm text-muted-foreground mb-1">
                        {formatCurrency(impact.tradeSize)} Trade
                      </div>
                      <div className="font-semibold text-orange-600">
                        {formatPercent(impact.priceImpact)} Impact
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatPercent(impact.slippage)} Slippage
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Loading Skeleton
const PoolExplorerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PoolExplorer
