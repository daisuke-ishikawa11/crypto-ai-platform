// Design tokens specifically for DeFi financial UI components
export const DeFiDesignTokens = {
  // Financial color palette - trust-building and professional
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Trust blue - main brand
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Positive metrics green
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Caution amber
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Risk/loss red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    // Financial data specific colors
    yield: {
      high: '#10b981', // High yield green
      medium: '#059669',
      low: '#047857',
    },
    
    risk: {
      veryLow: '#10b981', // Green
      low: '#3b82f6',     // Blue
      medium: '#f59e0b',  // Amber
      high: '#f97316',    // Orange
      veryHigh: '#ef4444', // Red
    },
    
    chart: {
      primary: '#3b82f6',
      secondary: '#10b981',
      tertiary: '#f59e0b',
      quaternary: '#ef4444',
      quinary: '#8b5cf6',
      senary: '#06b6d4',
      gradient: {
        start: '#3b82f6',
        end: '#10b981',
      }
    },
    
    // Background variations for financial cards
    background: {
      card: '#ffffff',
      cardHover: '#f8fafc',
      metrics: '#f1f5f9',
      positive: '#f0fdf4',
      negative: '#fef2f2',
      neutral: '#f8fafc',
    }
  },
  
  // Typography optimized for financial data
  typography: {
    financial: {
      // For large financial values (TVL, Volume)
      bigNumber: 'text-2xl md:text-3xl font-bold font-mono tracking-tight',
      // For percentages and ratios
      percentage: 'font-semibold font-mono',
      // For currency values in tables
      currency: 'font-mono text-right',
      // For labels and descriptions
      label: 'text-sm font-medium text-slate-600',
      // For secondary information
      caption: 'text-xs text-slate-500',
      // For protocol/token names
      protocol: 'font-semibold tracking-tight',
    }
  },
  
  // Spacing based on 8px grid system
  spacing: {
    component: {
      xs: '0.25rem', // 4px - tight spacing
      sm: '0.5rem',  // 8px - default small
      md: '1rem',    // 16px - default medium
      lg: '1.5rem',  // 24px - section spacing
      xl: '2rem',    // 32px - large spacing
      '2xl': '3rem', // 48px - hero spacing
    }
  },
  
  // Shadows for depth and elevation
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    cardHover: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    modal: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    tooltip: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  
  // Border radius for modern look
  borderRadius: {
    card: '0.75rem',    // 12px - cards
    button: '0.5rem',   // 8px - buttons
    badge: '9999px',    // pill shape
    chart: '0.5rem',    // 8px - chart containers
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    hover: '200ms',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
} as const

// Utility functions for design tokens
export const getFinancialColor = (type: 'positive' | 'negative' | 'neutral', value?: number) => {
  if (type === 'positive') return DeFiDesignTokens.colors.success[500]
  if (type === 'negative') return DeFiDesignTokens.colors.error[500]
  return DeFiDesignTokens.colors.primary[500]
}

export const getRiskColorByScore = (score: number) => {
  if (score >= 85) return DeFiDesignTokens.colors.risk.veryLow
  if (score >= 70) return DeFiDesignTokens.colors.risk.low
  if (score >= 50) return DeFiDesignTokens.colors.risk.medium
  if (score >= 30) return DeFiDesignTokens.colors.risk.high
  return DeFiDesignTokens.colors.risk.veryHigh
}

export const getChartColor = (index: number) => {
  const colors = Object.values(DeFiDesignTokens.colors.chart).slice(0, 6)
  return colors[index % colors.length]
}

// Utility classes for common patterns
export const DeFiClassNames = {
  // Card styles
  card: 'bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200',
  cardHeader: 'px-6 py-4 border-b border-slate-100',
  cardContent: 'px-6 py-4',
  
  // Metric display
  metricCard: 'bg-gradient-to-br from-slate-50 to-white p-4 rounded-lg border border-slate-200',
  bigNumber: 'text-3xl font-bold font-mono tracking-tight',
  metricLabel: 'text-sm font-medium text-slate-600 mb-1',
  metricChange: 'text-sm font-medium flex items-center gap-1',
  
  // Interactive elements
  button: 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  buttonPrimary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  buttonSecondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500',
  
  // Status indicators
  badge: 'px-2.5 py-1 rounded-full text-xs font-medium',
  badgeGreen: 'bg-green-100 text-green-800',
  badgeRed: 'bg-red-100 text-red-800',
  badgeBlue: 'bg-blue-100 text-blue-800',
  badgeYellow: 'bg-yellow-100 text-yellow-800',
  
  // Data display
  dataGrid: 'grid gap-4',
  dataRow: 'flex justify-between items-center py-2',
  dataLabel: 'text-sm text-slate-600',
  dataValue: 'font-medium',
  
  // Loading states
  skeleton: 'animate-pulse bg-slate-200 rounded',
  shimmer: 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-size-200 bg-pos-0',
} as const

// Accessibility helpers
export const DeFiA11y = {
  // ARIA labels for financial data
  labels: {
    tvl: 'Total Value Locked',
    apy: 'Annual Percentage Yield',
    apr: 'Annual Percentage Rate',
    volume: '24-hour trading volume',
    riskScore: 'Risk assessment score',
    priceChange: 'Price change percentage',
  },
  
  // Screen reader friendly number formatting
  formatForScreenReader: (value: number, type: 'currency' | 'percentage') => {
    if (type === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    }
    return `${value.toFixed(2)} percent`
  },
  
  // Color contrast ratios for accessibility
  contrastRatios: {
    normal: '4.5:1',
    large: '3:1',
    graphical: '3:1',
  }
} as const