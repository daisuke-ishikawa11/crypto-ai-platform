import { NextResponse } from 'next/server'
import { DeFiProtocolConnector } from '@crypto/defi'

export async function GET() {
  const connector = new DeFiProtocolConnector()
  const stats = connector.getStats()
  return NextResponse.json({ ok: true, stats })
}
