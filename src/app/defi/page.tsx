"use client"

import * as React from "react"
import { useState, Suspense } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { 
  BarChart3,
  GitCompare,
  Droplets,
  PieChart,
  Shield,
  Sprout,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DeFiDashboard } from '@/components/defi/defi-dashboard'
import { PortfolioTracker } from '@/components/defi/portfolio-tracker'
import { RiskRadar } from '@/components/defi/risk-radar'
import { YieldOpportunities } from '@/components/defi/yield-opportunities'

import { OverviewWidget } from '@/components/defi/overview-widget'
import { OverviewCharts } from '@/components/defi/overview-charts'
import { ProtocolsTable } from '@/components/defi/protocols-table'
import { PoolsGrid } from '@/components/defi/pools-grid'
import { ChainsGas } from '@/components/defi/chains-gas'
import { ProtocolHistoryPanel } from '@/components/defi/protocol-history-panel'
import { ProtocolFilters, PoolFilters } from '@/components/defi/filters'
import { ProtocolDetailsModal } from '@/components/defi/protocol-details-modal'
import { DeFiAlertsSettings } from '@/components/defi/defi-alerts-settings'
import { NotificationPreferences } from '@/components/notifications/notification-preferences'
import { DeFiWatchlist } from '@/components/defi/watchlist'
import { ShareLink } from '@/components/defi/share-link'
import { RiskInspector } from '@/components/defi/risk-inspector'
import { TicketsBadge } from '@/components/defi/tickets-badge'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { AnomaliesPanel } from '@/components/defi/anomalies-panel'
import { PresetsControls } from '@/components/defi/presets-controls'
import { ShareIndicator } from '@/components/defi/share-indicator'

// Create a query client for this page
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
})

interface DeFiPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

const DeFiPage: React.FC<DeFiPageProps> = ({ searchParams }) => {
  const initialTab = (searchParams?.tab as string) || 'dashboard'
  const [activeTab, setActiveTab] = useState(initialTab)
  const { toast } = useToast?.() || { toast: (_: unknown) => undefined }
  

  // Simple filters for Protocols and Pools
  const [protocolChainFilter, setProtocolChainFilter] = useState<string>("")
  const [protocolCategoryFilter, setProtocolCategoryFilter] = useState<string>("")
  const [poolChainFilter, setPoolChainFilter] = useState<string>("")
  const [poolProjectFilter, setPoolProjectFilter] = useState<string>("")
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)

  // Sync filters with URL query for reload/shareability
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const setOrDel = (k: string, v: string) => {
      if (v) url.searchParams.set(k, v); else url.searchParams.delete(k)
    }
    setOrDel('p_chain', protocolChainFilter)
    setOrDel('p_cat', protocolCategoryFilter)
    setOrDel('pl_chain', poolChainFilter)
    setOrDel('pl_proj', poolProjectFilter)
    setOrDel('proto', selectedProtocol ?? '')
    setOrDel('tab', activeTab)
    window.history.replaceState({}, '', url.toString())
  }, [protocolChainFilter, protocolCategoryFilter, poolChainFilter, poolProjectFilter, selectedProtocol, activeTab])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    setProtocolChainFilter(url.searchParams.get('p_chain') ?? '')
    setProtocolCategoryFilter(url.searchParams.get('p_cat') ?? '')
    setPoolChainFilter(url.searchParams.get('pl_chain') ?? '')
    setPoolProjectFilter(url.searchParams.get('pl_proj') ?? '')
    setSelectedProtocol(url.searchParams.get('proto'))
    // Load defaults (if any)
    ;(async () => {
      try {
        const res = await fetch('/api/defi/prefs')
        if (res.ok) {
          const j = await res.json()
          const d = j?.data?.defaults || {}
          if (!url.searchParams.get('p_chain') && !url.searchParams.get('p_cat') && d.protocols) {
            // expect key like 'protocols:MyPreset'
            const presets = j?.data?.presets || {}
            const f = presets[d.protocols]
            if (f && typeof f === 'object') {
              setProtocolChainFilter(String(f.chain || ''))
              setProtocolCategoryFilter(String(f.category || ''))
            }
          }
          if (!url.searchParams.get('pl_chain') && !url.searchParams.get('pl_proj') && d.pools) {
            const presets = j?.data?.presets || {}
            const f = presets[d.pools]
            if (f && typeof f === 'object') {
              setPoolChainFilter(String(f.chain || ''))
              setPoolProjectFilter(String(f.project || ''))
            }
          }
        }
      } catch {}
    })()
  }, [toast])

  // Stripe Checkout リダイレクト結果を処理
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const status = url.searchParams.get('purchase')
    if (status === 'success') {
      try {
        toast?.({ description: 'チケット購入が完了しました。反映まで少し時間がかかる場合があります。' })
      } catch {}
      try {
        const ev = new Event('tickets:refresh')
        window.dispatchEvent(ev)
      } catch {}
    } else if (status === 'cancel') {
      try { toast?.({ description: '購入がキャンセルされました。' }) } catch {}
    }
    if (status) {
      url.searchParams.delete('purchase')
      window.history.replaceState({}, '', url.toString())
    }
  }, [toast])

  // Auto-save filters to server prefs (debounced)
  React.useEffect(() => {
    const t = setTimeout(() => {
      ;(async () => {
        try {
          const filters = {
            protocols: { chain: protocolChainFilter, category: protocolCategoryFilter },
            pools: { chain: poolChainFilter, project: poolProjectFilter }
          }
          await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filters }) })
        } catch {}
      })()
    }, 600)
    return () => clearTimeout(t)
  }, [protocolChainFilter, protocolCategoryFilter, poolChainFilter, poolProjectFilter])

  

  const tabConfig = [
    {
      value: 'dashboard',
      label: 'Dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Market overview and key metrics'
    },
    {
      value: 'protocols',
      label: 'Protocols',
      icon: <GitCompare className="h-4 w-4" />,
      description: 'Compare DeFi protocols'
    },
    {
      value: 'pools',
      label: 'Liquidity Pools',
      icon: <Droplets className="h-4 w-4" />,
      description: 'Explore liquidity pools'
    },
    {
      value: 'portfolio',
      label: 'Portfolio',
      icon: <PieChart className="h-4 w-4" />,
      description: 'Track your DeFi positions'
    },
    {
      value: 'risk',
      label: 'Risk Analysis',
      icon: <Shield className="h-4 w-4" />,
      description: 'Risk assessment tools'
    },
    {
      value: 'yield',
      label: 'Yield Farming',
      icon: <Sprout className="h-4 w-4" />,
      description: 'High-yield opportunities'
    }
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">DeFi Hub</h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive DeFi analytics, risk management, and yield optimization platform
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Status indicators */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live Data</span>
                </div>
                
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Market Active
                </Badge>
                <AIStatsBadge />
                <NotificationBell />
                <TicketsBadge userId={'demo-user'} />
                <BuyTicketButton />
              </div>
            </div>
          </div>
        </div>

        {/* Beta Warning */}
        <Alert className="mx-4 mt-4 mb-0">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Beta Version:</strong> This DeFi Hub is in beta. Features may change and data should be verified independently. 
            Always do your own research before making investment decisions.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-col lg:flex-row gap-4">
              <TabsList className="grid grid-cols-2 lg:grid-cols-6 h-auto p-1 bg-muted/50">
                {tabConfig.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-background"
                  >
                    {tab.icon}
                    <span className="text-xs font-medium">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Tab description */}
              <div className="lg:flex-1 lg:min-w-0">
                <Card className="h-full">
                  <CardContent className="p-4 flex items-center">
                    <div className="flex items-center gap-3 flex-wrap">
                      {tabConfig.find(tab => tab.value === activeTab)?.icon}
                      <div>
                        <h3 className="font-semibold">
                          {tabConfig.find(tab => tab.value === activeTab)?.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tabConfig.find(tab => tab.value === activeTab)?.description}
                        </p>
                      </div>
                      <div className="ml-auto"><ShareLink label="Copy view link" /></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6 m-0">
                <OverviewWidget />
                <OverviewCharts />
                <ChainsGas />
                <DeFiWatchlist onSelectProtocol={(s) => setSelectedProtocol(s)} />
                <DeFiAlertsSettings selectedSlug={selectedProtocol ?? undefined} />
                <NotificationPreferences />
                <AnomaliesPanel days={7} limit={10} />
                <RiskInspector />
                <Suspense fallback={<DashboardSkeleton />}>
                  <DeFiDashboard />
                </Suspense>
              </TabsContent>

              {/* Protocol Comparison Tab */}
              <TabsContent value="protocols" className="space-y-6 m-0">
                <ProtocolFilters
                  chain={protocolChainFilter}
                  setChain={setProtocolChainFilter}
                  category={protocolCategoryFilter}
                  setCategory={setProtocolCategoryFilter}
                />
                <div className="flex items-center justify-between">
                  <PresetsControls
                    scope="protocols"
                    current={{ chain: protocolChainFilter, category: protocolCategoryFilter }}
                    onApply={(f) => {
                      const pf = f as { chain?: unknown; category?: unknown }
                      setProtocolChainFilter(typeof pf.chain === 'string' ? pf.chain : '')
                      setProtocolCategoryFilter(typeof pf.category === 'string' ? pf.category : '')
                    }}
                  />
                  <ShareIndicator scope="protocols" />
                </div>
                <PresetsControls
                  scope="protocols"
                  current={{ chain: protocolChainFilter, category: protocolCategoryFilter }}
                  onApply={(f) => {
                    const pf = f as { chain?: unknown; category?: unknown }
                    setProtocolChainFilter(typeof pf.chain === 'string' ? pf.chain : '')
                    setProtocolCategoryFilter(typeof pf.category === 'string' ? pf.category : '')
                  }}
                />
                <ProtocolHistoryPanel slug={selectedProtocol ?? undefined} onSlugChange={(s) => setSelectedProtocol(s)} />
                <ProtocolsTable
                  chain={protocolChainFilter || undefined}
                  category={protocolCategoryFilter || undefined}
                  limit={50}
                  onSelectProtocol={(slug) => setSelectedProtocol(slug)}
                />
                <ProtocolDetailsModal slug={selectedProtocol} onClose={() => setSelectedProtocol(null)} />
              </TabsContent>

              {/* Liquidity Pools Tab */}
              <TabsContent value="pools" className="space-y-6 m-0">
                <PoolFilters
                  chain={poolChainFilter}
                  setChain={setPoolChainFilter}
                  project={poolProjectFilter}
                  setProject={setPoolProjectFilter}
                />
                <div className="flex items-center justify-between">
                  <PresetsControls
                    scope="pools"
                    current={{ chain: poolChainFilter, project: poolProjectFilter }}
                    onApply={(f) => {
                      const plf = f as { chain?: unknown; project?: unknown }
                      setPoolChainFilter(typeof plf.chain === 'string' ? plf.chain : '')
                      setPoolProjectFilter(typeof plf.project === 'string' ? plf.project : '')
                    }}
                  />
                  <ShareIndicator scope="pools" />
                </div>
                <PoolsGrid
                  chain={poolChainFilter || undefined}
                  project={poolProjectFilter || undefined}
                  limit={60}
                />
              </TabsContent>

              {/* Portfolio Tracker Tab */}
              <TabsContent value="portfolio" className="space-y-6 m-0">
                <Suspense fallback={<PortfolioSkeleton />}>
                  <PortfolioTracker />
                </Suspense>
              </TabsContent>

              {/* Risk Analysis Tab */}
              <TabsContent value="risk" className="space-y-6 m-0">
                <Suspense fallback={<RiskSkeleton />}>
                  <RiskRadar />
                </Suspense>
              </TabsContent>

              {/* Yield Farming Tab */}
              <TabsContent value="yield" className="space-y-6 m-0">
                <Suspense fallback={<YieldSkeleton />}>
                  <YieldOpportunities />
                </Suspense>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="border-t bg-muted/30 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-3">DeFi Hub</h4>
                <p className="text-sm text-muted-foreground">
                  Your comprehensive platform for DeFi analytics, risk management, and yield optimization.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Real-time market data</li>
                  <li>Protocol comparison</li>
                  <li>Risk assessment</li>
                  <li>Yield optimization</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Documentation</li>
                  <li>API Reference</li>
                  <li>Community</li>
                  <li>Support</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Risk Disclaimer</li>
                  <li>Licenses</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
              <p>
                © 2024 Crypto AI Platform. All rights reserved. 
                This platform is for informational purposes only and does not constitute financial advice.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}

// Loading skeletons for each tab
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
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

 

const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

const RiskSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const YieldSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32 w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DeFiPage

function AIStatsBadge() {
  const [rate, setRate] = React.useState<number | null>(null)
  const [fail, setFail] = React.useState<{ total: number; byReason: Partial<Record<'bad_request'|'rate_limited'|'exception'|'other', number>> } | null>(null)
  const [warnRate, setWarnRate] = React.useState<number | null>(null)
  const [warnOnRL, setWarnOnRL] = React.useState<boolean>(true)
  const [trend, setTrend] = React.useState<number[] | null>(null)
  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [rStats, rPrefs, rTs] = await Promise.all([
          fetch('/api/defi/risk/ai-stats', { cache: 'no-store' }),
          fetch('/api/defi/prefs', { cache: 'no-store' }),
          fetch('/api/defi/risk/ai-stats/timeseries?windowSec=3600&bucketSec=300', { cache: 'no-store' })
        ])
        const j = await rStats.json()
        if (!mounted || !j?.success) return
        if (typeof j.data?.successRate === 'number') setRate(j.data.successRate)
        const by = (j.data?.failuresByReason || {}) as Partial<Record<'bad_request'|'rate_limited'|'exception'|'other', number>>
        const total = Object.values(by).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0)
        setFail({ total, byReason: by })
        if (rPrefs.ok) {
          const pj = await rPrefs.json().catch(() => ({}))
          const a = pj?.data?.settings?.aiEvaluate
          if (a) {
            if (typeof a.warnSuccessRate === 'number') setWarnRate(Math.max(0.5, Math.min(1, a.warnSuccessRate)))
            if (typeof a.warnOnRateLimited === 'boolean') setWarnOnRL(a.warnOnRateLimited)
          }
        }
        if (rTs.ok) {
          const tj = await rTs.json().catch(() => ({}))
          const arr = Array.isArray(tj?.data?.successRate) ? tj.data.successRate as number[] : null
          if (mounted) setTrend(arr)
        }
      } catch {}
    })()
    return () => { mounted = false }
  }, [])
  const pct = rate !== null ? (rate * 100).toFixed(1) + '%' : '—'
  const color = rate === null ? 'bg-muted text-foreground' : rate >= 0.9 ? 'bg-emerald-100 text-emerald-700' : rate >= 0.75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
  const tip = (() => {
    if (!fail) return 'AI評価 24h'
    const parts: string[] = []
    const order: Array<keyof NonNullable<typeof fail>['byReason']> = ['rate_limited','bad_request','exception','other']
    order.forEach(k => {
      const v = fail.byReason?.[k]
      if (typeof v === 'number' && v > 0) parts.push(`${k}: ${v}`)
    })
    const thr = ((warnRate ?? 0.8) * 100).toFixed(0)
    return parts.length ? `失敗内訳 ${parts.join(', ')} / 閾値 ${thr}%` : `失敗なし / 閾値 ${thr}%`
  })()
  const isWarn = (rate !== null && rate < (warnRate ?? 0.8)) || ((warnOnRL && ((fail?.byReason?.rate_limited || 0) > 0)))
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isWarn ? (
            <a href="/alerts" className={`px-2 py-1 rounded text-xs ${color}`}>AI 24h: {pct}</a>
          ) : (
            <span className={`px-2 py-1 rounded text-xs cursor-default ${color}`}>AI 24h: {pct}</span>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <div>{tip}</div>
            {trend && trend.length > 1 && (
              <InlineSpark values={trend} />
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function InlineSpark({ values }: { values: number[] }) {
  const width = 140
  const height = 28
  const n = values.length
  if (n <= 1) return null
  const xs = values.map((_v, i) => (i / (n - 1)) * (width - 2) + 1)
  const ys = values.map(v => 1 + (1 - Math.max(0, Math.min(1, v))) * (height - 2))
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ')
  const last = values[values.length - 1]
  const color = last >= 0.9 ? '#059669' : last >= 0.75 ? '#b45309' : '#b91c1c'
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Success rate (last 60m)">
      <rect x="0" y="0" width={width} height={height} rx="4" ry="4" fill="var(--muted)" opacity="0.35" />
      <path d={d} stroke={color} strokeWidth="2" fill="none" />
    </svg>
  )
}

function BuyTicketButton() {
  const [loading, setLoading] = React.useState(false)
  const onClick = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/defi/risk/tickets/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets: 1, currency: 'jpy' })
      })
      const j = await res.json().catch(() => ({}))
      if (res.ok && j?.url) {
        window.location.href = j.url as string
      }
    } catch {}
    finally { setLoading(false) }
  }, [])
  return (
    <Button size="sm" variant="secondary" onClick={onClick} disabled={loading} aria-label="チケットを購入">
      {loading ? '処理中…' : 'チケット購入'}
    </Button>
  )
}
