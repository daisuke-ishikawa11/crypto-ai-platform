import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { createApiHandler } from '@/lib/utils/api-error-middleware'

type EnvCheck = {
  key: string
  present: boolean
  length?: number
}

function mask(v: string | undefined | null): { present: boolean; length?: number } {
  const s = (v || '').trim()
  if (!s) return { present: false }
  return { present: true, length: s.length }
}

async function handler(_req: NextRequest): Promise<NextResponse> {
  try {
    const checks: EnvCheck[] = []

    // URLs / Origins
    checks.push({ key: 'NEXT_PUBLIC_APP_URL', ...mask(process.env.NEXT_PUBLIC_APP_URL) })
    checks.push({ key: 'NEXT_PUBLIC_APP_ORIGIN', ...mask(process.env.NEXT_PUBLIC_APP_ORIGIN) })
    checks.push({ key: 'NEXT_PUBLIC_SITE_URL', ...mask(process.env.NEXT_PUBLIC_SITE_URL) })

    // Supabase
    checks.push({ key: 'NEXT_PUBLIC_SUPABASE_URL', ...mask(process.env.NEXT_PUBLIC_SUPABASE_URL) })
    checks.push({ key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', ...mask(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) })
    checks.push({ key: 'SUPABASE_SERVICE_KEY', ...mask(process.env.SUPABASE_SERVICE_KEY) })

    // Stripe
    checks.push({ key: 'STRIPE_SECRET_KEY', ...mask(process.env.STRIPE_SECRET_KEY) })
    checks.push({ key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', ...mask(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) })
    checks.push({ key: 'STRIPE_WEBHOOK_SECRET', ...mask(process.env.STRIPE_WEBHOOK_SECRET) })
    checks.push({ key: 'STRIPE_BASIC_MONTHLY_PRICE_ID', ...mask(process.env.STRIPE_BASIC_MONTHLY_PRICE_ID) })
    checks.push({ key: 'STRIPE_BASIC_YEARLY_PRICE_ID', ...mask(process.env.STRIPE_BASIC_YEARLY_PRICE_ID) })
    checks.push({ key: 'STRIPE_PRO_MONTHLY_PRICE_ID', ...mask(process.env.STRIPE_PRO_MONTHLY_PRICE_ID) })
    checks.push({ key: 'STRIPE_PRO_YEARLY_PRICE_ID', ...mask(process.env.STRIPE_PRO_YEARLY_PRICE_ID) })
    checks.push({ key: 'STRIPE_ENTERPRISE_MONTHLY_PRICE_ID', ...mask(process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID) })
    checks.push({ key: 'STRIPE_ENTERPRISE_YEARLY_PRICE_ID', ...mask(process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) })

    // Solana / Hyperliquid / DEX / SDK
    checks.push({ key: 'SOLANA_RPC_URL', ...mask(process.env.SOLANA_RPC_URL) })
    checks.push({ key: 'JUPITER_PRICE_TTL_MS', ...mask(process.env.JUPITER_PRICE_TTL_MS) })
    checks.push({ key: 'JUPITER_HTTP_TIMEOUT_MS', ...mask(process.env.JUPITER_HTTP_TIMEOUT_MS) })
    checks.push({ key: 'RAYDIUM_POOLS_URL', ...mask(process.env.RAYDIUM_POOLS_URL) })
    checks.push({ key: 'ORCA_POOLS_URL', ...mask(process.env.ORCA_POOLS_URL) })
    checks.push({ key: 'PANCAKESWAP_POOLS_URL', ...mask(process.env.PANCAKESWAP_POOLS_URL) })
    checks.push({ key: 'PANCAKESWAP_GRAPH_URL', ...mask(process.env.PANCAKESWAP_GRAPH_URL) })
    checks.push({ key: 'PANCAKESWAP_GRAPH_URL_BSC', ...mask(process.env.PANCAKESWAP_GRAPH_URL_BSC) })
    checks.push({ key: 'PANCAKESWAP_GRAPH_URL_ETH', ...mask(process.env.PANCAKESWAP_GRAPH_URL_ETH) })
    checks.push({ key: 'PANCAKESWAP_GRAPH_URL_POLYGON', ...mask(process.env.PANCAKESWAP_GRAPH_URL_POLYGON) })
    checks.push({ key: 'PANCAKESWAP_GRAPH_URL_BASE', ...mask(process.env.PANCAKESWAP_GRAPH_URL_BASE) })
    checks.push({ key: 'PANCAKESWAP_GRAPH_API_KEY', ...mask(process.env.PANCAKESWAP_GRAPH_API_KEY) })
    // EVM DEX Graphs
    checks.push({ key: 'SUSHISWAP_GRAPH_URL', ...mask(process.env.SUSHISWAP_GRAPH_URL) })
    checks.push({ key: 'QUICKSWAP_GRAPH_URL', ...mask(process.env.QUICKSWAP_GRAPH_URL) })
    checks.push({ key: 'QUICKSWAP_V2_GRAPH_URL', ...mask(process.env.QUICKSWAP_V2_GRAPH_URL) })
    checks.push({ key: 'VELODROME_GRAPH_URL', ...mask(process.env.VELODROME_GRAPH_URL) })
    checks.push({ key: 'CAMELOT_GRAPH_URL', ...mask(process.env.CAMELOT_GRAPH_URL) })
    checks.push({ key: 'CAMELOT_V2_GRAPH_URL', ...mask(process.env.CAMELOT_V2_GRAPH_URL) })
    checks.push({ key: 'TRADERJOE_GRAPH_URL', ...mask(process.env.TRADERJOE_GRAPH_URL) })
    checks.push({ key: 'TRADERJOE_V2_GRAPH_URL', ...mask(process.env.TRADERJOE_V2_GRAPH_URL) })
    // Uniswap (任意上書き)
    checks.push({ key: 'UNISWAP_V3_GRAPH_URL', ...mask(process.env.UNISWAP_V3_GRAPH_URL) })
    checks.push({ key: 'UNISWAP_V3_GRAPH_URL_ETHEREUM', ...mask(process.env.UNISWAP_V3_GRAPH_URL_ETHEREUM) })
    checks.push({ key: 'UNISWAP_V3_GRAPH_URL_POLYGON', ...mask(process.env.UNISWAP_V3_GRAPH_URL_POLYGON) })
    checks.push({ key: 'UNISWAP_V3_GRAPH_URL_ARBITRUM', ...mask(process.env.UNISWAP_V3_GRAPH_URL_ARBITRUM) })
    checks.push({ key: 'UNISWAP_V3_GRAPH_URL_OPTIMISM', ...mask(process.env.UNISWAP_V3_GRAPH_URL_OPTIMISM) })
    checks.push({ key: 'UNISWAP_V3_GRAPH_URL_BASE', ...mask(process.env.UNISWAP_V3_GRAPH_URL_BASE) })
    checks.push({ key: 'UNISWAP_GRAPH_API_KEY', ...mask(process.env.UNISWAP_GRAPH_API_KEY) })
    checks.push({ key: 'GRAPH_GATEWAY_API_KEY', ...mask(process.env.GRAPH_GATEWAY_API_KEY) })
    // Cron / Base URL
    checks.push({ key: 'CRON_TOKEN', ...mask(process.env.CRON_TOKEN) })
    checks.push({ key: 'NEXT_PUBLIC_BASE_URL', ...mask(process.env.NEXT_PUBLIC_BASE_URL) })
    // Aave Subgraphs (Gateway可)
    checks.push({ key: 'AAVE_GRAPH_URL', ...mask(process.env.AAVE_GRAPH_URL) })
    checks.push({ key: 'AAVE_GRAPH_URL_ETHEREUM', ...mask(process.env.AAVE_GRAPH_URL_ETHEREUM) })
    checks.push({ key: 'AAVE_GRAPH_URL_POLYGON', ...mask(process.env.AAVE_GRAPH_URL_POLYGON) })
    checks.push({ key: 'AAVE_GRAPH_URL_ARBITRUM', ...mask(process.env.AAVE_GRAPH_URL_ARBITRUM) })
    checks.push({ key: 'AAVE_GRAPH_URL_OPTIMISM', ...mask(process.env.AAVE_GRAPH_URL_OPTIMISM) })
    checks.push({ key: 'AAVE_GRAPH_URL_BASE', ...mask(process.env.AAVE_GRAPH_URL_BASE) })
    checks.push({ key: 'AAVE_GRAPH_URL_SCROLL', ...mask(process.env.AAVE_GRAPH_URL_SCROLL) })
    checks.push({ key: 'AAVE_GRAPH_URL_LINEA', ...mask(process.env.AAVE_GRAPH_URL_LINEA) })
    checks.push({ key: 'AAVE_GRAPH_URL_AVALANCHE', ...mask(process.env.AAVE_GRAPH_URL_AVALANCHE) })
    checks.push({ key: 'AAVE_GRAPH_URL_GNOSIS', ...mask(process.env.AAVE_GRAPH_URL_GNOSIS) })
    checks.push({ key: 'AAVE_GRAPH_API_KEY', ...mask(process.env.AAVE_GRAPH_API_KEY) })
    checks.push({ key: 'AAVE_GRAPH_HEADERS_JSON', ...mask(process.env.AAVE_GRAPH_HEADERS_JSON) })
    checks.push({ key: 'HYPERLIQUID_BASE_URL', ...mask(process.env.HYPERLIQUID_BASE_URL) })
    checks.push({ key: 'DEX_INTEGRATIONS_TTL_MS', ...mask(process.env.DEX_INTEGRATIONS_TTL_MS) })
    checks.push({ key: 'DEX_HTTP_TIMEOUT_MS', ...mask(process.env.DEX_HTTP_TIMEOUT_MS) })
    checks.push({ key: 'DEX_HTTP_RETRIES', ...mask(process.env.DEX_HTTP_RETRIES) })
    checks.push({ key: 'DEX_HTTP_BACKOFF_MS', ...mask(process.env.DEX_HTTP_BACKOFF_MS) })
    checks.push({ key: 'SDK_TIMEOUT_MS', ...mask(process.env.SDK_TIMEOUT_MS) })
    checks.push({ key: 'SDK_RETRIES', ...mask(process.env.SDK_RETRIES) })
    checks.push({ key: 'SDK_BACKOFF_MS', ...mask(process.env.SDK_BACKOFF_MS) })
    checks.push({ key: 'SDK_CACHE_TTL_MS', ...mask(process.env.SDK_CACHE_TTL_MS) })

    // Cache / DB
    checks.push({ key: 'REDIS_URL', ...mask(process.env.REDIS_URL) })
    checks.push({ key: 'DATABASE_URL', ...mask(process.env.DATABASE_URL) })

    // EVM RPCs (optional but recommended for EVM SDK integrations)
    checks.push({ key: 'ETHEREUM_RPC_URL', ...mask(process.env.ETHEREUM_RPC_URL) })
    checks.push({ key: 'ARBITRUM_RPC_URL', ...mask(process.env.ARBITRUM_RPC_URL) })
    checks.push({ key: 'OPTIMISM_RPC_URL', ...mask(process.env.OPTIMISM_RPC_URL) })
    checks.push({ key: 'POLYGON_RPC_URL', ...mask(process.env.POLYGON_RPC_URL) })
    checks.push({ key: 'BASE_RPC_URL', ...mask(process.env.BASE_RPC_URL) })
    checks.push({ key: 'BSC_RPC_URL', ...mask(process.env.BSC_RPC_URL) })
    checks.push({ key: 'AVALANCHE_RPC_URL', ...mask(process.env.AVALANCHE_RPC_URL) })
    checks.push({ key: 'FANTOM_RPC_URL', ...mask(process.env.FANTOM_RPC_URL) })

    // Security / CSRF
    checks.push({ key: 'CSRF_SECRET', ...mask(process.env.CSRF_SECRET) })

    // External APIs (selected)
    checks.push({ key: 'COINMARKETCAP_API_KEY', ...mask(process.env.COINMARKETCAP_API_KEY) })

    const summary = {
      required: {
        supabase: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
        solana: ['SOLANA_RPC_URL'],
        stripe: ['STRIPE_SECRET_KEY', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 'STRIPE_WEBHOOK_SECRET']
      }
    }

    return NextResponse.json({ success: true, data: { checks, summary } })
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export const GET = createApiHandler({
  handler,
  rateLimit: { limit: 30, window: 60_000 },
  errorOptions: { enableLogging: false }
})
