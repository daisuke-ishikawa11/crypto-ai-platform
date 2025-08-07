// Mock Market Data API for development
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  change_7d: number;
  volume_24h: number;
  market_cap: number;
  rank: number;
  updated_at: string;
}

export interface MarketOverview {
  total_market_cap: number;
  total_volume_24h: number;
  btc_dominance: number;
  active_cryptocurrencies: number;
  fear_greed_index: number;
  updated_at: string;
}

// Mock data
const mockCryptocurrencies: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 45123.45,
    change_24h: 3.2,
    change_7d: 12.8,
    volume_24h: 28500000000,
    market_cap: 890200000000,
    rank: 1,
    updated_at: new Date().toISOString()
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2789.12,
    change_24h: 5.7,
    change_7d: 8.3,
    volume_24h: 15600000000,
    market_cap: 335400000000,
    rank: 2,
    updated_at: new Date().toISOString()
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 98.34,
    change_24h: -1.2,
    change_7d: 15.6,
    volume_24h: 2100000000,
    market_cap: 45200000000,
    rank: 3,
    updated_at: new Date().toISOString()
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 312.78,
    change_24h: 2.1,
    change_7d: 6.9,
    volume_24h: 1800000000,
    market_cap: 48700000000,
    rank: 4,
    updated_at: new Date().toISOString()
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.48,
    change_24h: -0.8,
    change_7d: 3.2,
    volume_24h: 450000000,
    market_cap: 16800000000,
    rank: 5,
    updated_at: new Date().toISOString()
  }
];

const mockMarketOverview: MarketOverview = {
  total_market_cap: 2100000000000,
  total_volume_24h: 89200000000,
  btc_dominance: 52.3,
  active_cryptocurrencies: 13547,
  fear_greed_index: 64,
  updated_at: new Date().toISOString()
};

// Simulate price fluctuations
function getRandomPrice(basePrice: number, volatility: number = 0.05): number {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
}

function updateMockPrices() {
  mockCryptocurrencies.forEach(crypto => {
    const oldPrice = crypto.price;
    crypto.price = getRandomPrice(crypto.price, 0.02);
    crypto.change_24h = ((crypto.price - oldPrice) / oldPrice) * 100;
    crypto.updated_at = new Date().toISOString();
  });
}

// Update prices every 30 seconds
if (typeof window !== 'undefined') {
  setInterval(updateMockPrices, 30000);
}

export class MarketDataAPI {
  /**
   * Get top cryptocurrencies by market cap
   */
  static async getTopCryptocurrencies(limit: number = 50): Promise<CryptoCurrency[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    
    return mockCryptocurrencies
      .sort((a, b) => a.rank - b.rank)
      .slice(0, limit);
  }

  /**
   * Get specific cryptocurrency data
   */
  static async getCryptocurrency(id: string): Promise<CryptoCurrency | null> {
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    return mockCryptocurrencies.find(crypto => crypto.id === id || crypto.symbol === id.toUpperCase()) || null;
  }

  /**
   * Get market overview data
   */
  static async getMarketOverview(): Promise<MarketOverview> {
    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 250));
    
    // Update market overview with current data
    const totalMarketCap = mockCryptocurrencies.reduce((sum, crypto) => sum + crypto.market_cap, 0);
    const totalVolume24h = mockCryptocurrencies.reduce((sum, crypto) => sum + crypto.volume_24h, 0);
    const btcMarketCap = mockCryptocurrencies.find(c => c.symbol === 'BTC')?.market_cap || 0;
    
    return {
      ...mockMarketOverview,
      total_market_cap: totalMarketCap,
      total_volume_24h: totalVolume24h,
      btc_dominance: (btcMarketCap / totalMarketCap) * 100,
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Get price history for a cryptocurrency
   */
  static async getPriceHistory(
    id: string, 
    days: number = 7
  ): Promise<Array<{ timestamp: string; price: number }>> {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
    
    const crypto = await this.getCryptocurrency(id);
    if (!crypto) return [];

    const now = new Date();
    const history: Array<{ timestamp: string; price: number }> = [];
    
    // Generate mock price history
    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const basePrice = crypto.price * (1 - crypto.change_7d / 100);
      const progress = (days - i) / days;
      const price = basePrice + (crypto.price - basePrice) * progress + 
                   (Math.random() - 0.5) * crypto.price * 0.05;
      
      history.push({
        timestamp: date.toISOString(),
        price: Math.max(0, price)
      });
    }
    
    return history;
  }

  /**
   * Get trending cryptocurrencies
   */
  static async getTrending(): Promise<CryptoCurrency[]> {
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    return mockCryptocurrencies
      .filter(crypto => crypto.change_24h > 5)
      .sort((a, b) => b.change_24h - a.change_24h)
      .slice(0, 10);
  }

  /**
   * Search cryptocurrencies
   */
  static async searchCryptocurrencies(query: string): Promise<CryptoCurrency[]> {
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    const searchTerm = query.toLowerCase();
    return mockCryptocurrencies.filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm) ||
      crypto.symbol.toLowerCase().includes(searchTerm) ||
      crypto.id.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get fear and greed index
   */
  static async getFearGreedIndex(): Promise<{
    value: number;
    classification: string;
    updated_at: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const value = mockMarketOverview.fear_greed_index;
    let classification = 'Neutral';
    
    if (value <= 25) classification = 'Extreme Fear';
    else if (value <= 45) classification = 'Fear';
    else if (value <= 55) classification = 'Neutral';
    else if (value <= 75) classification = 'Greed';
    else classification = 'Extreme Greed';
    
    return {
      value,
      classification,
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Get global DeFi data
   */
  static async getDeFiData(): Promise<{
    total_value_locked: number;
    defi_dominance: number;
    top_protocols: Array<{
      name: string;
      tvl: number;
      change_24h: number;
    }>;
    updated_at: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 250));
    
    return {
      total_value_locked: 75400000000,
      defi_dominance: 3.6,
      top_protocols: [
        { name: 'Uniswap', tvl: 5200000000, change_24h: 2.1 },
        { name: 'Aave', tvl: 4100000000, change_24h: 1.8 },
        { name: 'Compound', tvl: 3800000000, change_24h: -0.5 },
        { name: 'MakerDAO', tvl: 3200000000, change_24h: 0.9 },
        { name: 'Curve', tvl: 2900000000, change_24h: 1.2 }
      ],
      updated_at: new Date().toISOString()
    };
  }
}