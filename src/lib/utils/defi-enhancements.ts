// Utility functions to support enhanced DeFi components
import { DeFiDesignTokens } from '@/lib/design-system/defi-design-tokens'

// Enhanced number formatting with localization support
export const formatCurrencyAdvanced = (
  value: number, 
  options: {
    currency?: string
    locale?: string
    notation?: 'standard' | 'compact'
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string => {
  const {
    currency = 'USD',
    locale = 'en-US',
    notation = 'standard',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options

  // Handle large numbers with compact notation
  if (notation === 'compact') {
    if (Math.abs(value) >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`
    }
    if (Math.abs(value) >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`
    }
    if (Math.abs(value) >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}K`
    }
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation: notation === 'compact' ? 'compact' : 'standard'
  }).format(value)
}

// Enhanced percentage formatting with styling hints
export const formatPercentageAdvanced = (
  value: number,
  options: {
    showSign?: boolean
    decimals?: number
    colorHint?: boolean
  } = {}
): {
  formatted: string
  className: string
  isPositive: boolean
  magnitude: 'low' | 'medium' | 'high'
} => {
  const {
    showSign = true,
    decimals = 2,
    colorHint = true
  } = options

  const isPositive = value >= 0
  const sign = showSign && isPositive ? '+' : ''
  const formatted = `${sign}${value.toFixed(decimals)}%`

  let className = ''
  if (colorHint) {
    if (isPositive) {
      className = Math.abs(value) > 10 ? 'text-green-700 font-bold' : 'text-green-600'
    } else {
      className = Math.abs(value) > 10 ? 'text-red-700 font-bold' : 'text-red-600'
    }
  }

  const magnitude = Math.abs(value) > 20 ? 'high' : Math.abs(value) > 5 ? 'medium' : 'low'

  return {
    formatted,
    className,
    isPositive,
    magnitude
  }
}

// Risk assessment utilities
export const calculateRiskScore = (
  factors: {
    smartContract: number
    liquidity: number
    market: number
    governance: number
    regulatory: number
    operational: number
  },
  weights?: {
    smartContract: number
    liquidity: number
    market: number
    governance: number
    regulatory: number
    operational: number
  }
): {
  overall: number
  breakdown: typeof factors
  riskLevel: 'very_low' | 'low' | 'medium' | 'high' | 'very_high'
  recommendations: string[]
} => {
  const defaultWeights = {
    smartContract: 0.25,
    liquidity: 0.20,
    market: 0.20,
    governance: 0.15,
    regulatory: 0.10,
    operational: 0.10
  }

  const finalWeights = { ...defaultWeights, ...weights }
  
  const overall = Object.entries(factors).reduce((score, [key, value]) => {
    const weight = finalWeights[key as keyof typeof finalWeights]
    return score + (value * weight)
  }, 0)

  const riskLevel = 
    overall >= 85 ? 'very_low' :
    overall >= 70 ? 'low' :
    overall >= 50 ? 'medium' :
    overall >= 30 ? 'high' :
    'very_high'

  const recommendations = []
  if (factors.smartContract < 70) {
    recommendations.push('Review smart contract audits and security measures')
  }
  if (factors.liquidity < 60) {
    recommendations.push('Monitor liquidity levels and consider diversification')
  }
  if (factors.market < 50) {
    recommendations.push('Implement risk management strategies for market volatility')
  }
  if (factors.governance < 60) {
    recommendations.push('Stay informed about governance changes and proposals')
  }

  return {
    overall,
    breakdown: factors,
    riskLevel,
    recommendations
  }
}

// Portfolio analytics utilities
export const calculatePortfolioMetrics = (
  positions: Array<{
    value: number
    entryValue: number
    apy: number
    riskLevel: 'low' | 'medium' | 'high'
    protocol: string
  }>
): {
  totalValue: number
  totalPnl: number
  totalPnlPercent: number
  averageApy: number
  riskScore: number
  diversificationScore: number
  concentrationRisk: number
  protocolCount: number
} => {
  const totalValue = positions.reduce((sum, p) => sum + Math.abs(p.value), 0)
  const totalEntryValue = positions.reduce((sum, p) => sum + Math.abs(p.entryValue), 0)
  const totalPnl = totalValue - totalEntryValue
  const totalPnlPercent = totalEntryValue > 0 ? (totalPnl / totalEntryValue) * 100 : 0

  const averageApy = positions.length > 0
    ? positions.reduce((sum, p) => sum + Math.abs(p.apy), 0) / positions.length
    : 0

  // Calculate weighted risk score
  const riskValues = { low: 85, medium: 60, high: 35 }
  const riskScore = positions.length > 0
    ? positions.reduce((sum, p) => {
        const weight = Math.abs(p.value) / totalValue
        return sum + (riskValues[p.riskLevel] * weight)
      }, 0)
    : 0

  // Calculate diversification metrics
  const protocolCount = new Set(positions.map(p => p.protocol)).size
  const protocolDistribution = positions.reduce((acc, p) => {
    acc[p.protocol] = (acc[p.protocol] || 0) + Math.abs(p.value)
    return acc
  }, {} as Record<string, number>)

  const protocolShares = Object.values(protocolDistribution).map(v => v / totalValue)
  const concentrationRisk = Math.max(...protocolShares)
  const diversificationScore = protocolCount >= 5 ? 90 : protocolCount >= 3 ? 70 : 50

  return {
    totalValue,
    totalPnl,
    totalPnlPercent,
    averageApy,
    riskScore,
    diversificationScore,
    concentrationRisk,
    protocolCount
  }
}

// APY calculation utilities
export const calculateCompoundAPY = (
  principal: number,
  rate: number,
  compoundFrequency: number = 365,
  timeInYears: number = 1
): {
  finalValue: number
  totalReturn: number
  apy: number
  dailyReturn: number
} => {
  const finalValue = principal * Math.pow(1 + (rate / 100) / compoundFrequency, compoundFrequency * timeInYears)
  const totalReturn = finalValue - principal
  const apy = ((finalValue / principal - 1) * 100)
  const dailyReturn = totalReturn / (timeInYears * 365)

  return {
    finalValue,
    totalReturn,
    apy,
    dailyReturn
  }
}

// Impermanent Loss calculation
export const calculateImpermanentLoss = (
  initialPrice1: number,
  initialPrice2: number,
  currentPrice1: number,
  currentPrice2: number,
  _weight1: number = 0.5,
  _weight2: number = 0.5
): {
  impermanentLoss: number
  impermanentLossPercent: number
  hodlValue: number
  poolValue: number
  priceRatio: number
  priceRatioChange: number
} => {
  const initialRatio = initialPrice1 / initialPrice2
  const currentRatio = currentPrice1 / currentPrice2
  const priceRatioChange = ((currentRatio / initialRatio) - 1) * 100

  // Simplified IL calculation for balanced pools (50/50)
  const k = currentRatio / initialRatio
  const poolValue = 2 * Math.sqrt(k) / (1 + k)
  const hodlValue = 1
  const impermanentLoss = poolValue - hodlValue
  const impermanentLossPercent = impermanentLoss * 100

  return {
    impermanentLoss,
    impermanentLossPercent: Math.abs(impermanentLossPercent),
    hodlValue,
    poolValue,
    priceRatio: currentRatio,
    priceRatioChange
  }
}

// Health factor utilities
export const calculateHealthFactor = (
  collateralValue: number,
  borrowValue: number,
  liquidationThreshold: number = 0.8
): {
  healthFactor: number
  liquidationPrice: number
  safetyMargin: number
  riskLevel: 'safe' | 'moderate' | 'risky' | 'critical'
} => {
  const healthFactor = borrowValue > 0 ? (collateralValue * liquidationThreshold) / borrowValue : Infinity
  const liquidationPrice = borrowValue / liquidationThreshold
  const safetyMargin = ((healthFactor - 1) / healthFactor) * 100

  const riskLevel = 
    healthFactor >= 2.5 ? 'safe' :
    healthFactor >= 2.0 ? 'moderate' :
    healthFactor >= 1.3 ? 'risky' :
    'critical'

  return {
    healthFactor,
    liquidationPrice,
    safetyMargin,
    riskLevel
  }
}

// Data freshness utilities
export const getDataFreshness = (timestamp: Date): {
  status: 'live' | 'recent' | 'stale' | 'outdated'
  label: string
  color: string
  minutesOld: number
} => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutesOld = Math.floor(diff / (1000 * 60))

  if (minutesOld < 2) {
    return { status: 'live', label: 'Live', color: 'bg-green-500', minutesOld }
  } else if (minutesOld < 10) {
    return { status: 'recent', label: `${minutesOld}m ago`, color: 'bg-blue-500', minutesOld }
  } else if (minutesOld < 60) {
    return { status: 'stale', label: `${minutesOld}m ago`, color: 'bg-yellow-500', minutesOld }
  } else {
    const hoursOld = Math.floor(minutesOld / 60)
    return { status: 'outdated', label: `${hoursOld}h ago`, color: 'bg-red-500', minutesOld }
  }
}

// Chart data preparation utilities
export const prepareChartData = (
  data: Array<Record<string, unknown>>,
  options: {
    xAxisKey: string
    yAxisKeys: string[]
    colors?: string[]
    dateFormat?: boolean
  }
): {
  data: Array<Record<string, unknown>>
  colors: string[]
  config: Record<string, unknown>
} => {
  const { xAxisKey, yAxisKeys, colors = CHART_COLORS, dateFormat = false } = options

  const processedData = data.map(item => ({
    ...item,
    [xAxisKey]: dateFormat && item[xAxisKey] instanceof Date 
      ? item[xAxisKey].toLocaleDateString() 
      : item[xAxisKey]
  }))

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
  }

  return {
    data: processedData,
    colors: colors.slice(0, yAxisKeys.length),
    config
  }
}

// Enhanced chart colors from design tokens
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

// Accessibility helpers for financial data
export const makeAccessible = (
  value: number | string,
  type: 'currency' | 'percentage' | 'number',
  context?: string
): {
  display: string
  ariaLabel: string
  screenReader: string
} => {
  let display: string
  let ariaLabel: string
  let screenReader: string

  if (type === 'currency' && typeof value === 'number') {
    display = formatCurrencyAdvanced(value)
    ariaLabel = `${context ? context + ': ' : ''}${display}`
    screenReader = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  } else if (type === 'percentage' && typeof value === 'number') {
    display = `${value.toFixed(2)}%`
    ariaLabel = `${context ? context + ': ' : ''}${value.toFixed(2)} percent`
    screenReader = `${value.toFixed(2)} percent`
  } else {
    display = value.toString()
    ariaLabel = `${context ? context + ': ' : ''}${value}`
    screenReader = value.toString()
  }

  return { display, ariaLabel, screenReader }
}