"use client"

import * as React from "react"
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Download, 
  Filter,
  Search,
  Shield,
  TrendingUp,
  TrendingDown,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable, createSortableHeader } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ColumnDef } from '@tanstack/react-table'
import { BlockchainNetwork } from '@crypto/defi'

interface ProtocolComparisonProps {
  className?: string
}

interface Protocol {
  id: string
  name: string
  type: string
  blockchain: string
  tvl: number
  volume24h: number
  tvlChange24h: number
  yieldApr: number
  riskScore: number
  auditScore?: number
  userCount: number
  transactionCount: number
  securityIncidents: number
  uptimePercentage: number
  lastAuditDate?: string
  contractAddress?: string
  website?: string
  dataSource: string
  isRealTime: boolean
}

interface FilterState {
  network: string[]
  protocolType: string[]
  riskLevel: string[]
  minTvl: number
  maxTvl: number
  minApr: number
  maxApr: number
}

// Format currency values
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
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

// Get risk level from score
const getRiskLevel = (score: number): string => {
  if (score >= 85) return 'Very Low'
  if (score >= 70) return 'Low'
  if (score >= 50) return 'Medium'
  if (score >= 30) return 'High'
  return 'Very High'
}

// Enhanced risk color with improved accessibility
const getRiskColor = (score: number): string => {
  if (score >= 85) return 'text-green-800 bg-green-100 border border-green-300 shadow-sm'
  if (score >= 70) return 'text-blue-800 bg-blue-100 border border-blue-300 shadow-sm'
  if (score >= 50) return 'text-yellow-800 bg-yellow-100 border border-yellow-300 shadow-sm'
  if (score >= 30) return 'text-orange-800 bg-orange-100 border border-orange-300 shadow-sm'
  return 'text-red-800 bg-red-100 border border-red-300 shadow-sm'
}

// Enhanced formatting functions
const formatLargeNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(value)
}

const getProtocolHealthIndicator = (uptime: number, incidents: number) => {
  if (uptime >= 99.5 && incidents === 0) {
    return { status: 'excellent', color: 'bg-green-500', label: 'Excellent' }
  } else if (uptime >= 99 && incidents <= 1) {
    return { status: 'good', color: 'bg-blue-500', label: 'Good' }
  } else if (uptime >= 95 && incidents <= 2) {
    return { status: 'fair', color: 'bg-yellow-500', label: 'Fair' }
  } else {
    return { status: 'poor', color: 'bg-red-500', label: 'Poor' }
  }
}

// Available filter options
const NETWORKS = Object.values(BlockchainNetwork)
const PROTOCOL_TYPES = ['DEX', 'Lending', 'Yield Farming', 'Derivatives', 'Insurance', 'Cross-chain']
const RISK_LEVELS = ['Very Low', 'Low', 'Medium', 'High', 'Very High']

export const ProtocolComparison: React.FC<ProtocolComparisonProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    network: [],
    protocolType: [],
    riskLevel: [],
    minTvl: 0,
    maxTvl: 0,
    minApr: 0,
    maxApr: 0
  })

  // Fetch protocols data
  const {
    data: protocolsData,
    isLoading,
    error,
    refetch
  } = useQuery<{ protocols: Protocol[] }>({
    queryKey: ['defi-protocols', 'comparison'],
    queryFn: async () => {
      const response = await fetch('/api/defi/protocols?includeRisk=true&includeTvl=true&limit=100')
      if (!response.ok) {
        throw new Error('Failed to fetch protocols')
      }
      return response.json().then(data => data.data)
    }
  })

  // Filter protocols based on search and filters
  const filteredProtocols = useMemo(() => {
    if (!protocolsData?.protocols) return []

    let filtered = protocolsData.protocols

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(protocol =>
        protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.blockchain.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Network filter
    if (filters.network.length > 0) {
      filtered = filtered.filter(protocol =>
        filters.network.includes(protocol.blockchain)
      )
    }

    // Protocol type filter
    if (filters.protocolType.length > 0) {
      filtered = filtered.filter(protocol =>
        filters.protocolType.includes(protocol.type)
      )
    }

    // Risk level filter
    if (filters.riskLevel.length > 0) {
      filtered = filtered.filter(protocol =>
        filters.riskLevel.includes(getRiskLevel(protocol.riskScore))
      )
    }

    // TVL range filter
    if (filters.minTvl > 0) {
      filtered = filtered.filter(protocol => protocol.tvl >= filters.minTvl)
    }
    if (filters.maxTvl > 0) {
      filtered = filtered.filter(protocol => protocol.tvl <= filters.maxTvl)
    }

    // APR range filter
    if (filters.minApr > 0) {
      filtered = filtered.filter(protocol => protocol.yieldApr >= filters.minApr)
    }
    if (filters.maxApr > 0) {
      filtered = filtered.filter(protocol => protocol.yieldApr <= filters.maxApr)
    }

    return filtered
  }, [protocolsData, searchTerm, filters])

  // Define table columns
  const columns: ColumnDef<Protocol>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: createSortableHeader("Protocol"),
      cell: ({ row }) => {
        const protocol = row.original
        return (
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-medium">{protocol.name}</div>
              <div className="text-sm text-muted-foreground">{protocol.type}</div>
            </div>
            {protocol.isRealTime && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Real-time data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "blockchain",
      header: createSortableHeader("Network"),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="capitalize">{row.getValue("blockchain")}</span>
        </div>
      ),
    },
    {
      accessorKey: "tvl",
      header: createSortableHeader("TVL"),
      cell: ({ row }) => (
        <div className="text-right font-mono">
          {formatCurrency(row.getValue("tvl"))}
        </div>
      ),
    },
    {
      accessorKey: "volume24h",
      header: createSortableHeader("24h Volume"),
      cell: ({ row }) => (
        <div className="text-right font-mono">
          {formatCurrency(row.getValue("volume24h"))}
        </div>
      ),
    },
    {
      accessorKey: "tvlChange24h",
      header: createSortableHeader("24h Change"),
      cell: ({ row }) => {
        const change = row.getValue("tvlChange24h") as number
        const isPositive = change >= 0
        return (
          <div className={`text-right font-mono flex items-center justify-end gap-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {formatPercent(change)}
          </div>
        )
      },
    },
    {
      accessorKey: "yieldApr",
      header: createSortableHeader("APR"),
      cell: ({ row }) => (
        <div className="text-right font-mono text-green-600">
          {(row.getValue("yieldApr") as number)?.toFixed(2)}%
        </div>
      ),
    },
    {
      accessorKey: "riskScore",
      header: createSortableHeader("Risk Score"),
      cell: ({ row }) => {
        const score = row.getValue("riskScore") as number
        const level = getRiskLevel(score)
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className={getRiskColor(score)}>
                  {level}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Risk Score: {score}/100</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
    },
    {
      accessorKey: "uptimePercentage",
      header: createSortableHeader("Uptime"),
      cell: ({ row }) => {
        const uptime = row.getValue("uptimePercentage") as number
        return (
          <div className="flex items-center gap-2">
            {uptime >= 99 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : uptime >= 95 ? (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="font-mono">{uptime.toFixed(1)}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: "auditScore",
      header: createSortableHeader("Audit Score"),
      cell: ({ row }) => {
        const score = row.getValue("auditScore") as number | undefined
        if (!score) return <span className="text-muted-foreground">N/A</span>
        return (
          <div className="text-right font-mono">
            {score}/100
          </div>
        )
      },
    },
    {
      accessorKey: "securityIncidents",
      header: createSortableHeader("Incidents"),
      cell: ({ row }) => {
        const incidents = row.getValue("securityIncidents") as number
        return (
          <div className={`text-center font-mono ${
            incidents === 0 ? 'text-green-600' : incidents < 3 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {incidents}
          </div>
        )
      },
    },
  ]

  // Handle export
  const handleExport = (data: Protocol[]) => {
    const csvContent = [
      // Headers
      ['Protocol', 'Type', 'Network', 'TVL', '24h Volume', '24h Change %', 'APR %', 'Risk Score', 'Uptime %', 'Audit Score', 'Security Incidents'].join(','),
      // Data rows
      ...data.map(protocol => [
        protocol.name,
        protocol.type,
        protocol.blockchain,
        protocol.tvl,
        protocol.volume24h,
        protocol.tvlChange24h,
        protocol.yieldApr,
        protocol.riskScore,
        protocol.uptimePercentage,
        protocol.auditScore || '',
        protocol.securityIncidents
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `protocol-comparison-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Handle filter changes
  const updateFilter = (key: keyof FilterState, value: unknown) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      network: [],
      protocolType: [],
      riskLevel: [],
      minTvl: 0,
      maxTvl: 0,
      minApr: 0,
      maxApr: 0
    })
    setSearchTerm("")
  }

  if (isLoading) {
    return <ComparisonSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-red-600 font-medium">Failed to load protocol data</p>
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
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Protocol Comparison
          </h2>
          <p className="text-slate-600 text-lg">
            Side-by-side analysis of DeFi protocols with risk assessment and performance metrics
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time data</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="h-4 w-4" />
              <span>Risk-adjusted metrics</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) && (
              <Badge variant="secondary" className="ml-2">Active</Badge>
            )}
          </Button>
          
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Search & Filter Protocols</h3>
              <p className="text-sm text-slate-600 mt-1">Find protocols that match your investment criteria</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredProtocols.length} Results
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search protocols, tokens, or networks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="whitespace-nowrap border-slate-200 hover:bg-slate-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
              {showFilters && <Badge className="ml-2 bg-blue-100 text-blue-800">Active</Badge>}
            </Button>
          </div>
          
          {/* Enhanced Advanced Filters */}
          {showFilters && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">Advanced Filters</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Reset All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Network Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Blockchain Network</label>
                  <Select value={filters.network[0] || ""} onValueChange={(value) => 
                    updateFilter('network', value ? [value] : [])
                  }>
                    <SelectTrigger className="border-slate-200 focus:border-blue-500">
                      <SelectValue placeholder="All networks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All networks</SelectItem>
                      {NETWORKS.map(network => (
                        <SelectItem key={network} value={network}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {network.charAt(0).toUpperCase() + network.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              {/* Protocol Type Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Protocol Type</label>
                <Select value={filters.protocolType[0] || ""} onValueChange={(value) => 
                  updateFilter('protocolType', value ? [value] : [])
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    {PROTOCOL_TYPES.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Risk Level Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Risk Level</label>
                <Select value={filters.riskLevel[0] || ""} onValueChange={(value) => 
                  updateFilter('riskLevel', value ? [value] : [])
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All levels</SelectItem>
                    {RISK_LEVELS.map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Actions</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="self-start"
                >
                  Clear Filters
                </Button>
              </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Statistics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-3xl font-bold text-blue-700 mb-1 font-mono">
              {filteredProtocols.length}
            </div>
            <div className="text-sm font-medium text-blue-600">Active Protocols</div>
            <div className="mt-2 text-xs text-blue-500">
              {((filteredProtocols.length / (protocolsData?.protocols.length || 1)) * 100).toFixed(1)}% of total
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-3xl font-bold text-green-700 mb-1 font-mono">
              {formatCurrency(filteredProtocols.reduce((sum, p) => sum + p.tvl, 0))}
            </div>
            <div className="text-sm font-medium text-green-600">Combined TVL</div>
            <div className="mt-2 text-xs text-green-500">
              Market dominance index
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-3xl font-bold text-purple-700 mb-1 font-mono">
              {formatCurrency(filteredProtocols.reduce((sum, p) => sum + p.volume24h, 0))}
            </div>
            <div className="text-sm font-medium text-purple-600">24h Volume</div>
            <div className="mt-2 text-xs text-purple-500">
              Trading activity
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="text-3xl font-bold text-orange-700 mb-1 font-mono">
              {filteredProtocols.length > 0 
                ? (filteredProtocols.reduce((sum, p) => sum + p.yieldApr, 0) / filteredProtocols.length).toFixed(2)
                : '0'
              }%
            </div>
            <div className="text-sm font-medium text-orange-600">Average APR</div>
            <div className="mt-2 text-xs text-orange-500">
              Yield opportunity
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-3xl font-bold text-red-700 mb-1 font-mono">
              {filteredProtocols.length > 0 
                ? (filteredProtocols.reduce((sum, p) => sum + p.riskScore, 0) / filteredProtocols.length).toFixed(0)
                : '0'
              }/100
            </div>
            <div className="text-sm font-medium text-red-600">Risk Score</div>
            <div className="mt-2 text-xs text-red-500">
              Portfolio safety index
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Data Table */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Protocol Comparison Matrix
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Comprehensive analysis with real-time metrics and risk assessment
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleExport(filteredProtocols)}
                className="border-slate-200 hover:bg-slate-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredProtocols}
              searchable={false}
              filterable={false}
              selectable={true}
              exportable={false}
              className="border-0"
              emptyMessage={"No Protocols Found"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Loading Skeleton
const ComparisonSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

export default ProtocolComparison
