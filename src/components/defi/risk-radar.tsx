"use client"

import * as React from "react"
import { useMemo } from 'react'
import { 
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  
  Download,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ResponsiveContainer, 
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts'
import { DeFiRiskLevel } from '@crypto/defi'
import { DeFiDesignTokens } from '@/lib/design-system/defi-design-tokens'

interface RiskRadarProps {
  className?: string
  protocols?: string[]
}

interface RiskAssessment {
  protocolId: string
  protocolName: string
  overallScore: number
  riskLevel: DeFiRiskLevel
  smartContractRisk: RiskCategory
  liquidityRisk: RiskCategory
  marketRisk: RiskCategory
  governanceRisk: RiskCategory
  regulatoryRisk: RiskCategory
  operationalRisk: RiskCategory
  riskFactors: DetailedRiskFactor[]
  recommendations: string[]
  peerComparison: PeerRiskComparison[]
  riskHistory: RiskHistoryPoint[]
  timestamp: Date
}

interface RiskCategory {
  score: number // 0-100
  level: DeFiRiskLevel
  weight: number
  factors: string[]
  mitigation: string[]
}

interface DetailedRiskFactor {
  id: string
  category: string
  name: string
  description: string
  impact: number // 1-10
  likelihood: number // 1-10
  severity: DeFiRiskLevel
  mitigation?: string
  references: string[]
}

interface PeerRiskComparison {
  protocolId: string
  protocolName: string
  riskScore: number
  riskLevel: DeFiRiskLevel
  category: string
}

interface RiskHistoryPoint {
  timestamp: Date
  overallScore: number
  smartContractScore: number
  liquidityScore: number
  marketScore: number
  events?: string[]
}

interface RiskTrend {
  direction: 'improving' | 'stable' | 'deteriorating'
  magnitude: number
  timeframe: string
}

// Mock risk data generator
const generateMockRiskAssessments = (): RiskAssessment[] => {
  const protocols = [
    'Uniswap V3', 'AAVE', 'Compound', 'Curve', 'Yearn Finance', 
    'Lido', 'MakerDAO', 'PancakeSwap', 'SushiSwap', 'Convex'
  ]

  return protocols.map((name, index) => {
    const baseScore = 75 - (index * 2) + Math.random() * 20
    
    return {
      protocolId: `protocol-${index}`,
      protocolName: name,
      overallScore: Math.max(30, Math.min(95, baseScore)),
      riskLevel: baseScore >= 80 ? DeFiRiskLevel.LOW : 
                baseScore >= 60 ? DeFiRiskLevel.MEDIUM : DeFiRiskLevel.HIGH,
      smartContractRisk: {
        score: baseScore + Math.random() * 10,
        level: DeFiRiskLevel.LOW,
        weight: 0.25,
        factors: ['Audited by top firms', 'Time-tested code', 'Bug bounty program'],
        mitigation: ['Regular security reviews', 'Gradual upgrades']
      },
      liquidityRisk: {
        score: baseScore - Math.random() * 15,
        level: DeFiRiskLevel.MEDIUM,
        weight: 0.20,
        factors: ['High TVL', 'Concentrated liquidity'],
        mitigation: ['Liquidity incentives', 'Multiple pools']
      },
      marketRisk: {
        score: baseScore + Math.random() * 15,
        level: DeFiRiskLevel.MEDIUM,
        weight: 0.20,
        factors: ['Volatile assets', 'Correlation risk'],
        mitigation: ['Diversified pools', 'Risk parameters']
      },
      governanceRisk: {
        score: baseScore - Math.random() * 10,
        level: DeFiRiskLevel.MEDIUM,
        weight: 0.15,
        factors: ['Token concentration', 'Admin keys'],
        mitigation: ['Timelock contracts', 'Multi-sig governance']
      },
      regulatoryRisk: {
        score: baseScore - Math.random() * 20,
        level: DeFiRiskLevel.HIGH,
        weight: 0.10,
        factors: ['Regulatory uncertainty', 'Compliance requirements'],
        mitigation: ['Legal compliance', 'Regulatory engagement']
      },
      operationalRisk: {
        score: baseScore + Math.random() * 5,
        level: DeFiRiskLevel.LOW,
        weight: 0.10,
        factors: ['Team experience', 'Infrastructure'],
        mitigation: ['Redundant systems', 'Experienced team']
      },
      riskFactors: [
        {
          id: `factor-${index}-1`,
          category: 'Smart Contract',
          name: 'Upgrade Risk',
          description: 'Protocol may have upgradeable contracts with admin controls',
          impact: 7,
          likelihood: 3,
          severity: DeFiRiskLevel.MEDIUM,
          mitigation: 'Timelock and multi-sig governance',
          references: []
        }
      ],
      recommendations: [
        'Monitor liquidity levels regularly',
        'Diversify across multiple protocols',
        'Stay updated on governance proposals'
      ],
      peerComparison: protocols.slice(0, 5).map((peer, peerIndex) => ({
        protocolId: `peer-${peerIndex}`,
        protocolName: peer,
        riskScore: 70 + Math.random() * 20,
        riskLevel: DeFiRiskLevel.MEDIUM,
        category: 'DeFi'
      })),
      riskHistory: Array.from({ length: 30 }, (_, histIndex) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - histIndex))
        return {
          timestamp: date,
          overallScore: baseScore + Math.sin(histIndex * 0.2) * 5 + Math.random() * 3,
          smartContractScore: baseScore + Math.random() * 8,
          liquidityScore: baseScore - Math.random() * 12,
          marketScore: baseScore + Math.random() * 15,
          events: histIndex % 7 === 0 ? ['Security update'] : undefined
        }
      }),
      timestamp: new Date()
    }
  })
}

// Enhanced risk level colors with better accessibility
const getRiskColor = (level: DeFiRiskLevel | string): string => {
  const levelStr = (typeof level === 'string' ? level : String(level)).toLowerCase()
  switch (levelStr) {
    case 'very_low': return 'text-green-800 bg-green-100 border border-green-300 shadow-sm'
    case 'low': return 'text-green-700 bg-green-50 border border-green-200 shadow-sm'
    case 'medium': return 'text-yellow-800 bg-yellow-100 border border-yellow-300 shadow-sm'
    case 'high': return 'text-orange-800 bg-orange-100 border border-orange-300 shadow-sm'
    case 'very_high': return 'text-red-800 bg-red-100 border border-red-300 shadow-sm'
    case 'critical': return 'text-red-900 bg-red-200 border border-red-400 shadow-sm'
    default: return 'text-slate-800 bg-slate-100 border border-slate-300 shadow-sm'
  }
}

// Enhanced chart colors
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

// Risk severity indicator
const getRiskSeverityIndicator = (score: number) => {
  if (score >= 90) return { level: 'excellent', color: 'bg-green-500', label: 'Excellent', textColor: 'text-green-600' }
  if (score >= 80) return { level: 'good', color: 'bg-blue-500', label: 'Good', textColor: 'text-blue-600' }
  if (score >= 60) return { level: 'moderate', color: 'bg-yellow-500', label: 'Moderate', textColor: 'text-yellow-600' }
  if (score >= 40) return { level: 'concerning', color: 'bg-orange-500', label: 'Concerning', textColor: 'text-orange-600' }
  return { level: 'critical', color: 'bg-red-500', label: 'Critical', textColor: 'text-red-600' }
}

// Format score for display
const formatScore = (score: number): string => {
  return `${Math.round(score)}/100`
}

// Get risk trend
const calculateRiskTrend = (history: RiskHistoryPoint[]): RiskTrend => {
  if (history.length < 7) return { direction: 'stable', magnitude: 0, timeframe: '7d' }
  
  const recent = history.slice(-7)
  const older = history.slice(-14, -7)
  
  const recentAvg = recent.reduce((sum, point) => sum + point.overallScore, 0) / recent.length
  const olderAvg = older.reduce((sum, point) => sum + point.overallScore, 0) / older.length
  
  const change = recentAvg - olderAvg
  const magnitude = Math.abs(change)
  
  let direction: 'improving' | 'stable' | 'deteriorating'
  if (magnitude < 2) {
    direction = 'stable'
  } else if (change > 0) {
    direction = 'improving'
  } else {
    direction = 'deteriorating'
  }
  
  return { direction, magnitude, timeframe: '7d' }
}

export const RiskRadar: React.FC<RiskRadarProps> = ({ 
  className = "",
  protocols = []
}) => {
  const [selectedProtocol, setSelectedProtocol] = React.useState<string>('')
  const [comparisonProtocols, setComparisonProtocols] = React.useState<string[]>([])
  const [timeframe, setTimeframe] = React.useState<'7d' | '30d' | '90d'>('30d')
  const [viewMode, setViewMode] = React.useState<'single' | 'comparison' | 'overview'>('overview')

  // APIからリスク評価を取得（データが無い場合は空で表示）
  const [riskAssessments, setRiskAssessments] = React.useState<RiskAssessment[]>([])
  React.useEffect(() => {
    let aborted = false
    const run = async () => {
      try {
        const res = await fetch('/api/defi/risk/overview', { method: 'GET' })
        if (!res.ok) return
        const json = await res.json()
        const items = (json?.data?.assessments || []) as RiskAssessment[]
        if (!aborted) {
          setRiskAssessments(items)
          if (!selectedProtocol && items.length > 0) {
            setSelectedProtocol(items[0].protocolId)
          }
        }
      } catch {}
    }
    run()
    return () => { aborted = true }
  }, [])

  const selectedAssessment = React.useMemo(() => {
    return riskAssessments.find(assessment => assessment.protocolId === selectedProtocol)
  }, [riskAssessments, selectedProtocol])

  // Prepare radar chart data
  const radarData = React.useMemo(() => {
    if (!selectedAssessment) return []
    
    return [
      {
        category: 'Smart Contract',
        score: selectedAssessment.smartContractRisk.score,
        fullMark: 100
      },
      {
        category: 'Liquidity',
        score: selectedAssessment.liquidityRisk.score,
        fullMark: 100
      },
      {
        category: 'Market',
        score: selectedAssessment.marketRisk.score,
        fullMark: 100
      },
      {
        category: 'Governance',
        score: selectedAssessment.governanceRisk.score,
        fullMark: 100
      },
      {
        category: 'Regulatory',
        score: selectedAssessment.regulatoryRisk.score,
        fullMark: 100
      },
      {
        category: 'Operational',
        score: selectedAssessment.operationalRisk.score,
        fullMark: 100
      }
    ]
  }, [selectedAssessment])

  // Prepare comparison radar data
  const comparisonRadarData = React.useMemo(() => {
    if (comparisonProtocols.length === 0) return []
    
    const categories = ['Smart Contract', 'Liquidity', 'Market', 'Governance', 'Regulatory', 'Operational']
    
    return categories.map(category => {
          const categoryData: Record<string, number | string> = { category }
      
      comparisonProtocols.forEach(protocolId => {
        const assessment = riskAssessments.find(a => a.protocolId === protocolId)
        if (assessment) {
          const categoryKey = category.toLowerCase().replace(' ', '') + 'Risk' as keyof RiskAssessment
          const riskCategory = assessment[categoryKey] as RiskCategory
          categoryData[assessment.protocolName] = riskCategory.score
        }
      })
      
      return categoryData
    })
  }, [riskAssessments, comparisonProtocols])

  const handleExportRiskData = () => {
    if (!selectedAssessment) return
    
    const data = {
      protocol: selectedAssessment.protocolName,
      overallScore: selectedAssessment.overallScore,
      riskBreakdown: {
        smartContract: selectedAssessment.smartContractRisk.score,
        liquidity: selectedAssessment.liquidityRisk.score,
        market: selectedAssessment.marketRisk.score,
        governance: selectedAssessment.governanceRisk.score,
        regulatory: selectedAssessment.regulatoryRisk.score,
        operational: selectedAssessment.operationalRisk.score
      },
      riskFactors: selectedAssessment.riskFactors,
      recommendations: selectedAssessment.recommendations,
      timestamp: selectedAssessment.timestamp
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `risk-assessment-${selectedAssessment.protocolName.toLowerCase().replace(/\s+/g, '-')}.json`
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
              DeFi Risk Radar
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
              <Shield className="h-4 w-4 text-red-600" />
              <span className="text-xs font-medium text-red-600">Risk Analysis</span>
            </div>
          </div>
          <p className="text-slate-600 text-lg">
            AI-powered risk assessment across six critical dimensions with real-time monitoring
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live risk scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Multi-factor analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Historical trends</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={viewMode} onValueChange={(value: string) => setViewMode(value as 'overview' | 'single' | 'comparison')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="single">Single Protocol</SelectItem>
              <SelectItem value="comparison">Comparison</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedAssessment && (
            <Button variant="outline" size="sm" onClick={handleExportRiskData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Protocol Selection */}
      {(viewMode === 'single' || viewMode === 'comparison') && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Protocol Selection</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {viewMode === 'single' ? 'Select a protocol for detailed risk analysis' : 'Choose protocols to compare risk profiles'}
                </p>
              </div>
              {selectedAssessment && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900 font-mono">
                    {formatScore(selectedAssessment.overallScore)}
                  </div>
                  <p className="text-xs text-slate-500">Risk Score</p>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">
                  {viewMode === 'single' ? 'Protocol to Analyze' : 'Primary Protocol'}
                </label>
                <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                  <SelectTrigger className="border-slate-200 focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Choose a protocol for risk analysis..." />
                  </SelectTrigger>
                  <SelectContent>
                    {riskAssessments.map(assessment => {
                      const indicator = getRiskSeverityIndicator(assessment.overallScore)
                      return (
                        <SelectItem key={assessment.protocolId} value={assessment.protocolId}>
                          <div className="flex items-center justify-between w-full">
                            <span>{assessment.protocolName}</span>
                            <div className="flex items-center gap-2 ml-4">
                              <div className={`w-2 h-2 rounded-full ${indicator.color}`}></div>
                              <span className="text-xs font-mono text-slate-600">
                                {formatScore(assessment.overallScore)}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              {viewMode === 'comparison' && (
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Compare With</label>
                  <Select 
                    value={comparisonProtocols[0] || ''} 
                    onValueChange={(value) => setComparisonProtocols(value ? [value] : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select comparison protocol..." />
                    </SelectTrigger>
                    <SelectContent>
                      {riskAssessments
                        .filter(a => a.protocolId !== selectedProtocol)
                        .map(assessment => (
                          <SelectItem key={assessment.protocolId} value={assessment.protocolId}>
                            {assessment.protocolName}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as 'overview' | 'single' | 'comparison')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="single">Protocol Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Risk Comparison</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <RiskOverviewSection assessments={riskAssessments} />
        </TabsContent>

        {/* Single Protocol Analysis */}
        <TabsContent value="single" className="space-y-6">
          {selectedAssessment ? (
            <SingleProtocolAnalysis assessment={selectedAssessment} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Protocol</h3>
                <p className="text-muted-foreground text-center">
                  Choose a protocol above to view detailed risk analysis
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          {selectedProtocol && comparisonProtocols.length > 0 ? (
            <RiskComparisonSection 
              assessments={riskAssessments}
              selectedProtocol={selectedProtocol}
              comparisonProtocols={comparisonProtocols}
            />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select Protocols to Compare</h3>
                <p className="text-muted-foreground text-center">
                  Choose protocols above to compare their risk profiles
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Risk Overview Section
const RiskOverviewSection: React.FC<{ assessments: RiskAssessment[] }> = ({ assessments }) => {
  const overviewStats = useMemo(() => {
    const totalProtocols = assessments.length
    const averageRisk = assessments.reduce((sum, a) => sum + a.overallScore, 0) / totalProtocols
    const highRiskCount = assessments.filter(a => a.riskLevel === DeFiRiskLevel.HIGH || a.riskLevel === DeFiRiskLevel.VERY_HIGH).length
    const lowRiskCount = assessments.filter(a => a.riskLevel === DeFiRiskLevel.LOW || a.riskLevel === DeFiRiskLevel.VERY_LOW).length
    
    return {
      totalProtocols,
      averageRisk: Math.round(averageRisk),
      highRiskCount,
      lowRiskCount,
      mediumRiskCount: totalProtocols - highRiskCount - lowRiskCount
    }
  }, [assessments])

  const topProtocols = useMemo(() => {
    return assessments
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, 5)
  }, [assessments])

  const riskyCProtocols = useMemo(() => {
    return assessments
      .sort((a, b) => a.overallScore - b.overallScore)
      .slice(0, 5)
  }, [assessments])

  return (
    <>
      {/* Enhanced Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-500 rounded-xl text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-1 font-mono">
              {overviewStats.totalProtocols}
            </div>
            <div className="text-sm font-medium text-blue-600">Total Protocols</div>
            <div className="mt-2 text-xs text-blue-500">
              Under analysis
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-500 rounded-xl text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1 font-mono">
              {formatScore(overviewStats.averageRisk)}
            </div>
            <div className="text-sm font-medium text-green-600">Average Risk Score</div>
            <div className="mt-2 text-xs text-green-500">
              Market average
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:from-emerald-100 group-hover:to-emerald-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-700 mb-1 font-mono">
              {overviewStats.lowRiskCount}
            </div>
            <div className="text-sm font-medium text-emerald-600">Low Risk Protocols</div>
            <div className="mt-2 text-xs text-emerald-500">
              Safe investments
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-red-500 rounded-xl text-white shadow-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-red-700 mb-1 font-mono">
              {overviewStats.highRiskCount}
            </div>
            <div className="text-sm font-medium text-red-600">High Risk Protocols</div>
            <div className="mt-2 text-xs text-red-500">
              Caution advised
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Safest Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProtocols.map((assessment, index) => (
                <div key={assessment.protocolId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{assessment.protocolName}</div>
                      <div className="text-sm text-muted-foreground">
                        Risk Score: {formatScore(assessment.overallScore)}
                      </div>
                    </div>
                  </div>
                  <Badge className={getRiskColor(assessment.riskLevel)}>
                    {assessment.riskLevel.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              High Risk Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskyCProtocols.map((assessment, index) => (
                <div key={assessment.protocolId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{assessment.protocolName}</div>
                      <div className="text-sm text-muted-foreground">
                        Risk Score: {formatScore(assessment.overallScore)}
                      </div>
                    </div>
                  </div>
                  <Badge className={getRiskColor(assessment.riskLevel)}>
                    {assessment.riskLevel.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Single Protocol Analysis Section
const SingleProtocolAnalysis: React.FC<{ assessment: RiskAssessment }> = ({ assessment }) => {
  const trend = calculateRiskTrend(assessment.riskHistory)
  
  const radarData = [
    { category: 'Smart Contract', score: assessment.smartContractRisk.score, fullMark: 100 },
    { category: 'Liquidity', score: assessment.liquidityRisk.score, fullMark: 100 },
    { category: 'Market', score: assessment.marketRisk.score, fullMark: 100 },
    { category: 'Governance', score: assessment.governanceRisk.score, fullMark: 100 },
    { category: 'Regulatory', score: assessment.regulatoryRisk.score, fullMark: 100 },
    { category: 'Operational', score: assessment.operationalRisk.score, fullMark: 100 }
  ]

  return (
    <>
      {/* Protocol Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{assessment.protocolName}</h3>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Overall Risk Score</span>
                  <div className="text-2xl font-bold">{formatScore(assessment.overallScore)}</div>
                </div>
                <Badge className={getRiskColor(assessment.riskLevel)} style={{ fontSize: '14px' }}>
                  {assessment.riskLevel.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`flex items-center gap-2 ${
                  trend.direction === 'improving' ? 'text-green-600' :
                  trend.direction === 'deteriorating' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {trend.direction === 'improving' ? <TrendingUp className="h-4 w-4" /> :
                   trend.direction === 'deteriorating' ? <TrendingDown className="h-4 w-4" /> :
                   <div className="w-4 h-4" />}
                  <span className="font-medium capitalize">{trend.direction}</span>
                </div>
                <span className="text-sm text-muted-foreground">{trend.timeframe} trend</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Dimensions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={0} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10 }} 
                  tickCount={6}
                />
                <Radar
                  name="Risk Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Categories Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Smart Contract', risk: assessment.smartContractRisk },
                { name: 'Liquidity', risk: assessment.liquidityRisk },
                { name: 'Market', risk: assessment.marketRisk },
                { name: 'Governance', risk: assessment.governanceRisk },
                { name: 'Regulatory', risk: assessment.regulatoryRisk },
                { name: 'Operational', risk: assessment.operationalRisk }
              ].map(({ name, risk }) => (
                <div key={name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatScore(risk.score)}</span>
                      <Badge className={getRiskColor(risk.level)} variant="outline">
                        {risk.level.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={risk.score} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Weight: {(risk.weight * 100).toFixed(0)}% of overall score
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk History */}
      <Card>
        <CardHeader>
          <CardTitle>Risk History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={assessment.riskHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <RechartsTooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [formatScore(value), 'Risk Score']}
              />
              <Line 
                type="monotone" 
                dataKey="overallScore" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations and Risk Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {assessment.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Key Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessment.riskFactors.slice(0, 3).map((factor) => (
                <div key={factor.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{factor.name}</div>
                    <Badge className={getRiskColor(factor.severity)} variant="outline">
                      {factor.severity.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {factor.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span>Impact: {factor.impact}/10</span>
                    <span>Likelihood: {factor.likelihood}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Risk Comparison Section
const RiskComparisonSection: React.FC<{
  assessments: RiskAssessment[]
  selectedProtocol: string
  comparisonProtocols: string[]
}> = ({ assessments, selectedProtocol, comparisonProtocols }) => {
  const comparisonData = useMemo(() => {
    const protocols = [selectedProtocol, ...comparisonProtocols]
    const relevantAssessments = assessments.filter(a => protocols.includes(a.protocolId))
    
    const categories = ['Smart Contract', 'Liquidity', 'Market', 'Governance', 'Regulatory', 'Operational']
    
    return categories.map(category => {
      const categoryData: Record<string, string | number> = { category }
      
      relevantAssessments.forEach(assessment => {
        const categoryKey = category.toLowerCase().replace(' ', '') + 'Risk' as keyof RiskAssessment
        const riskCategory = assessment[categoryKey] as RiskCategory
        categoryData[assessment.protocolName] = riskCategory.score
      })
      
      return categoryData
    })
  }, [assessments, selectedProtocol, comparisonProtocols])

  const protocolNames = useMemo(() => {
    const protocols = [selectedProtocol, ...comparisonProtocols]
    return assessments
      .filter(a => protocols.includes(a.protocolId))
      .map(a => a.protocolName)
  }, [assessments, selectedProtocol, comparisonProtocols])

  return (
    <>
      {/* Comparison Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Profile Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparisonData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }} 
                tickCount={6}
              />
              {protocolNames.map((name, index) => (
                <Radar
                  key={name}
                  name={name}
                  dataKey={name}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Side-by-side comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[selectedProtocol, ...comparisonProtocols].map(protocolId => {
              const assessment = assessments.find(a => a.protocolId === protocolId)
              if (!assessment) return null

              return (
                <div key={protocolId} className="space-y-4">
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{assessment.protocolName}</h4>
                    <div className="text-2xl font-bold">{formatScore(assessment.overallScore)}</div>
                    <Badge className={getRiskColor(assessment.riskLevel)}>
                      {assessment.riskLevel.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Smart Contract', score: assessment.smartContractRisk.score },
                      { name: 'Liquidity', score: assessment.liquidityRisk.score },
                      { name: 'Market', score: assessment.marketRisk.score },
                      { name: 'Governance', score: assessment.governanceRisk.score },
                      { name: 'Regulatory', score: assessment.regulatoryRisk.score },
                      { name: 'Operational', score: assessment.operationalRisk.score }
                    ].map(({ name, score }) => (
                      <div key={name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{name}</span>
                          <span className="font-medium">{formatScore(score)}</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default RiskRadar
