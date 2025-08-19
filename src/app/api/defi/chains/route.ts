import { NextResponse } from 'next/server'
import { CHAINS } from '@/lib/defi/chain-registry'

export async function GET() {
  return NextResponse.json({
    data: CHAINS.map(c => ({
      id: c.id,
      chainId: c.chainId,
      name: c.name,
      shortName: c.shortName,
      nativeSymbol: c.nativeSymbol,
      explorers: c.explorers,
      tier: c.tier
    })),
    meta: { count: CHAINS.length }
  })
}
