import { NextRequest, NextResponse } from 'next/server'
import { fetchProtocolsMeta } from '@/lib/defi/defillama-service'
import { fetchPoolsMeta } from '@/lib/defi/defillama-yields'

export async function GET(_request: NextRequest) {
  const [pMeta, yMeta] = await Promise.all([
    fetchProtocolsMeta(),
    fetchPoolsMeta(),
  ])
  return NextResponse.json({
    data: {
      protocolChains: pMeta.chains,
      protocolCategories: pMeta.categories,
      protocolProjects: pMeta.projects,
      poolChains: yMeta.chains,
      poolProjects: yMeta.projects,
    }
  })
}
