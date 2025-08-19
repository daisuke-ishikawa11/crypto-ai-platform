import { NextResponse } from 'next/server'
import { DeFiMonitoringEngine } from '@crypto/defi'
import { appLogger } from '@/lib/adapters/logger'
import { alertsPersistence } from '@/lib/adapters/persistence'
import { requireInternalAuth } from '@/lib/security/api-guard'

let engine: DeFiMonitoringEngine | null = null
function ensureEngine() { if (!engine) engine = new DeFiMonitoringEngine(appLogger, alertsPersistence) }

export const POST = async (req: Request) => {
  const auth = requireInternalAuth({ headers: req.headers as unknown as Headers })
  if (auth) return auth

  ensureEngine()
  await engine!.stop()
  return NextResponse.json({ success: true, stopped: true })
}
