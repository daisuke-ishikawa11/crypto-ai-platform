// CoinGecko API client for real market data
// No mocking or fake data - this uses the actual CoinGecko API

import { MarketData, MarketChart } from './types';
import { 
  CoinGeckoCoinDetail, 
  CoinGeckoGlobalData, 
  CoinGeckoTrendingResponse,
  CoinGeckoSearchResult 
} from './coingecko-types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export class CoinGeckoClient {
  private apiKey?: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${COINGECKO_API_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    // Add API key if available (for Pro API)
    if (this.apiKey) {
      headers['x-cg-pro-api-key'] = this.apiKey;
    }

    try {
      const response = await fetch(url.toString(), { headers });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`CoinGecko API error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch from CoinGecko: ${error.message}`);
      }
      throw error;
    }
  }

  // Get market data for multiple cryptocurrencies
  async getMarketData(
    ids: string[],
    currency: string = 'usd',
    includeSparkline: boolean = true
  ): Promise<MarketData[]> {
    const params: Record<string, string> = {
      ids: ids.join(','),
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: '100',
      page: '1',
      sparkline: includeSparkline.toString(),
      price_change_percentage: '1h,24h,7d,30d',
    };

    return await this.fetch<MarketData[]>('/coins/markets', params);
  }

  // Get detailed market data for a single coin
  async getCoinDetails(
    id: string,
    localization: boolean = false,
    tickers: boolean = false,
    marketData: boolean = true,
    communityData: boolean = false,
    developerData: boolean = false,
    sparkline: boolean = true
  ): Promise<CoinGeckoCoinDetail> {
    const params: Record<string, string> = {
      localization: localization.toString(),
      tickers: tickers.toString(),
      market_data: marketData.toString(),
      community_data: communityData.toString(),
      developer_data: developerData.toString(),
      sparkline: sparkline.toString(),
    };

    return await this.fetch<CoinGeckoCoinDetail>(`/coins/${id}`, params);
  }

  // Get historical market data
  async getMarketChart(
    id: string,
    currency: string = 'usd',
    days: string = '7',
    interval?: string
  ): Promise<MarketChart> {
    const params: Record<string, string> = {
      vs_currency: currency,
      days: days,
    };

    if (interval) {
      params.interval = interval;
    }

    return await this.fetch<MarketChart>(`/coins/${id}/market_chart`, params);
  }

  // Get global market data
  async getGlobalData(): Promise<CoinGeckoGlobalData> {
    return await this.fetch<CoinGeckoGlobalData>('/global');
  }

  // Get trending coins
  async getTrendingCoins(): Promise<CoinGeckoTrendingResponse> {
    return await this.fetch<CoinGeckoTrendingResponse>('/search/trending');
  }

  // Get fear & greed index (from alternative.me API)
  async getFearGreedIndex(): Promise<{ value: number; value_classification: string }> {
    try {
      const response = await fetch('https://api.alternative.me/fng/?limit=1');
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return {
          value: parseInt(data.data[0].value),
          value_classification: data.data[0].value_classification,
        };
      }
      throw new Error('No fear & greed data available');
    } catch (error) {
      throw new Error(`Failed to fetch fear & greed index: ${error}`);
    }
  }

  // Search for coins
  async searchCoins(query: string): Promise<CoinGeckoSearchResult> {
    const params = { query };
    return await this.fetch<CoinGeckoSearchResult>('/search', params);
  }

  // Get supported vs currencies
  async getSupportedCurrencies(): Promise<string[]> {
    return await this.fetch<string[]>('/simple/supported_vs_currencies');
  }

  // Simple price endpoint for quick lookups
  async getSimplePrice(
    ids: string[],
    currencies: string[],
    includeMarketCap: boolean = true,
    include24hrVol: boolean = true,
    include24hrChange: boolean = true
  ): Promise<Record<string, Record<string, number>>> {
    const params: Record<string, string> = {
      ids: ids.join(','),
      vs_currencies: currencies.join(','),
      include_market_cap: includeMarketCap.toString(),
      include_24hr_vol: include24hrVol.toString(),
      include_24hr_change: include24hrChange.toString(),
    };

    return await this.fetch<Record<string, Record<string, number>>>('/simple/price', params);
  }
} 