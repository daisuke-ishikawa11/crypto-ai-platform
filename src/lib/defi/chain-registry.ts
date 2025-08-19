import type { ChainInfo } from './types'

// Tier 1: Ethereum, Arbitrum, Optimism, Base, Polygon, BSC, Avalanche
// Tier 2: Fantom, zkSync Era, Linea
export const CHAINS: ChainInfo[] = [
  {
    id: 'ethereum',
    chainId: 1,
    name: 'Ethereum',
    shortName: 'eth',
    nativeSymbol: 'ETH',
    explorers: [{ name: 'Etherscan', url: 'https://etherscan.io' }],
    rpcs: [
      { url: 'https://rpc.ankr.com/eth', public: true },
      { url: 'https://cloudflare-eth.com', public: true },
    ],
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    tier: 1,
  },
  {
    id: 'arbitrum',
    chainId: 42161,
    name: 'Arbitrum One',
    shortName: 'arb',
    nativeSymbol: 'ETH',
    explorers: [{ name: 'Arbiscan', url: 'https://arbiscan.io' }],
    rpcs: [
      { url: 'https://arb1.arbitrum.io/rpc', public: true },
      { url: 'https://rpc.ankr.com/arbitrum', public: true },
    ],
    tier: 1,
  },
  {
    id: 'optimism',
    chainId: 10,
    name: 'Optimism',
    shortName: 'op',
    nativeSymbol: 'ETH',
    explorers: [{ name: 'Optimistic Etherscan', url: 'https://optimistic.etherscan.io' }],
    rpcs: [{ url: 'https://mainnet.optimism.io', public: true }],
    tier: 1,
  },
  {
    id: 'base',
    chainId: 8453,
    name: 'Base',
    shortName: 'base',
    nativeSymbol: 'ETH',
    explorers: [{ name: 'Basescan', url: 'https://basescan.org' }],
    rpcs: [{ url: 'https://mainnet.base.org', public: true }],
    tier: 1,
  },
  {
    id: 'polygon',
    chainId: 137,
    name: 'Polygon',
    shortName: 'matic',
    nativeSymbol: 'MATIC',
    explorers: [{ name: 'Polygonscan', url: 'https://polygonscan.com' }],
    rpcs: [{ url: 'https://polygon-rpc.com', public: true }],
    tier: 1,
  },
  {
    id: 'bsc',
    chainId: 56,
    name: 'BNB Smart Chain',
    shortName: 'bsc',
    nativeSymbol: 'BNB',
    explorers: [{ name: 'BscScan', url: 'https://bscscan.com' }],
    rpcs: [{ url: 'https://bsc-dataseed.binance.org', public: true }],
    tier: 1,
  },
  {
    id: 'avalanche',
    chainId: 43114,
    name: 'Avalanche C-Chain',
    shortName: 'avax',
    nativeSymbol: 'AVAX',
    explorers: [{ name: 'SnowTrace', url: 'https://snowtrace.io' }],
    rpcs: [{ url: 'https://api.avax.network/ext/bc/C/rpc', public: true }],
    tier: 1,
  },
  {
    id: 'fantom',
    chainId: 250,
    name: 'Fantom Opera',
    shortName: 'ftm',
    nativeSymbol: 'FTM',
    explorers: [{ name: 'FTMScan', url: 'https://ftmscan.com' }],
    rpcs: [{ url: 'https://rpc.ankr.com/fantom', public: true }],
    tier: 2,
  },
  {
    id: 'zksync',
    chainId: 324,
    name: 'zkSync Era',
    shortName: 'zksync',
    nativeSymbol: 'ETH',
    explorers: [{ name: 'zkSync Explorer', url: 'https://explorer.zksync.io' }],
    rpcs: [{ url: 'https://mainnet.era.zksync.io', public: true }],
    tier: 2,
  },
  {
    id: 'linea',
    chainId: 59144,
    name: 'Linea',
    shortName: 'linea',
    nativeSymbol: 'ETH',
    explorers: [{ name: 'LineaScan', url: 'https://lineascan.build' }],
    rpcs: [{ url: 'https://rpc.linea.build', public: true }],
    tier: 2,
  },
]

export function getChainById(chainId: number): ChainInfo | undefined {
  return CHAINS.find(c => c.chainId === chainId)
}

export function getChainBySlug(id: string): ChainInfo | undefined {
  return CHAINS.find(c => c.id === id)
}
