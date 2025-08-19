export type DexInfo = {
  key: string
  name: string
  homeUrl: string
  appUrl?: string
  docsUrl?: string
  aliases?: string[]
}

const DEXES: DexInfo[] = [
  { key: 'uniswap-v3', name: 'Uniswap v3', homeUrl: 'https://uniswap.org', appUrl: 'https://app.uniswap.org/' , aliases: ['uniswap', 'uniswap-v2', 'uniswap-v4'] },
  { key: 'sushiswap', name: 'SushiSwap', homeUrl: 'https://sushi.com', appUrl: 'https://www.sushi.com/' },
  { key: 'curve-dex', name: 'Curve', homeUrl: 'https://curve.fi', appUrl: 'https://curve.fi/' },
  { key: 'balancer-v2', name: 'Balancer v2', homeUrl: 'https://balancer.fi', appUrl: 'https://app.balancer.fi/' , aliases: ['balancer'] },
  { key: 'balancer-v3', name: 'Balancer v3', homeUrl: 'https://balancer.fi', appUrl: 'https://app.balancer.fi/' },
  { key: 'pancakeswap-amm-v3', name: 'PancakeSwap v3', homeUrl: 'https://pancakeswap.finance', appUrl: 'https://pancakeswap.finance/swap' , aliases: ['pancakeswap'] },
  { key: 'joe-v2.1', name: 'Trader Joe v2.1', homeUrl: 'https://traderjoexyz.com', appUrl: 'https://traderjoexyz.com/' , aliases: ['joe', 'trader-joe'] },
  { key: 'quickswap-dex', name: 'QuickSwap', homeUrl: 'https://quickswap.exchange', appUrl: 'https://quickswap.exchange/#/swap' },
  { key: 'camelot-v2', name: 'Camelot v2', homeUrl: 'https://camelot.exchange', appUrl: 'https://app.camelot.exchange/' },
  { key: 'camelot-v3', name: 'Camelot v3', homeUrl: 'https://camelot.exchange', appUrl: 'https://app.camelot.exchange/' },
  { key: 'velodrome-v2', name: 'Velodrome v2', homeUrl: 'https://velodrome.finance', appUrl: 'https://app.velodrome.finance/' , aliases: ['velodrome'] },
  { key: 'aerodrome-slipstream', name: 'Aerodrome', homeUrl: 'https://aerodrome.finance', appUrl: 'https://aerodrome.finance/swap' },
  { key: 'raydium-amm', name: 'Raydium', homeUrl: 'https://raydium.io', appUrl: 'https://raydium.io/swap/' },
  { key: 'orca-dex', name: 'Orca', homeUrl: 'https://www.orca.so', appUrl: 'https://www.orca.so/' },
  { key: 'pangolin-v2', name: 'Pangolin v2', homeUrl: 'https://pangolin.exchange', appUrl: 'https://app.pangolin.exchange/' , aliases: ['pangolin-v2', 'pangolin'] },
]

const index: Record<string, DexInfo> = {}
for (const d of DEXES) {
  index[d.key] = d
  if (d.aliases) {
    for (const a of d.aliases) index[a] = d
  }
}

export function getDexInfo(project: string | undefined | null): DexInfo | null {
  if (!project) return null
  const k = project.toLowerCase()
  return index[k] || null
}
