"use client"

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Chain = { id: number; name: string; shortName: string }
type ChainsResponse = { data: Chain[] }

type GasInfo = { chainId: number; baseFeeGwei: number; priorityFeeGwei: number; suggestedMaxFeeGwei: number }

function formatGwei(n: number): string { return `${n.toFixed(1)} gwei` }

export const ChainsGas: React.FC = () => {
  const chainsQ = useQuery<ChainsResponse>({
    queryKey: ['defi-chains'],
    queryFn: async () => {
      const res = await fetch('/api/defi/chains')
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  const [selectedId, setSelectedId] = React.useState<number | null>(null)

  const gasQ = useQuery<{ data: GasInfo } | undefined>({
    queryKey: ['defi-gas', selectedId],
    enabled: typeof selectedId === 'number',
    queryFn: async () => {
      if (typeof selectedId !== 'number') return undefined
      const res = await fetch(`/api/defi/gas?chainId=${selectedId}`)
      if (!res.ok) throw new Error('failed')
      return res.json()
    }
  })

  if (chainsQ.isLoading) return <Card><CardContent className="p-6"><div className="h-20 bg-muted rounded" /></CardContent></Card>
  if (chainsQ.isError || !chainsQ.data?.data) return <div className="text-sm text-red-600">Failed to load chains.</div>

  const chains = chainsQ.data.data

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {chains.slice(0, 12).map(c => (
          <button key={c.id} onClick={() => setSelectedId(c.id)} className={`px-3 py-1 rounded border ${selectedId === c.id ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
            {c.shortName || c.name}
          </button>
        ))}
      </div>
      {gasQ.data?.data && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Gas</div>
              <Badge variant="secondary">Chain #{gasQ.data.data.chainId}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Base Fee</div>
                <div className="font-medium">{formatGwei(gasQ.data.data.baseFeeGwei)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Priority Fee</div>
                <div className="font-medium">{formatGwei(gasQ.data.data.priorityFeeGwei)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Suggested Max</div>
                <div className="font-medium">{formatGwei(gasQ.data.data.suggestedMaxFeeGwei)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
