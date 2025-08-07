import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("coinmarketcap-client")

export interface CoinMarketCapQuote {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  tvl: number | null
  last_updated: string
}

export interface CoinMarketCapCryptocurrency {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: string[]
  max_supply: number | null
  circulating_supply: number
  total_supply: number
  is_active: number
  infinite_supply: boolean
  platform: {
    id: number
    name: string
    symbol: string
    slug: string
    token_address: string
  } | null
  cmc_rank: number
  is_fiat: number
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
  tvl_ratio: number | null
  last_updated: string
  quote: {
    [currency: string]: CoinMarketCapQuote
  }
}

export interface CoinMarketCapGlobalMetrics {
  active_cryptocurrencies: number
  total_cryptocurrencies: number
  active_market_pairs: number
  active_exchanges: number
  total_exchanges: number
  eth_dominance: number
  btc_dominance: number
  eth_dominance_yesterday: number
  btc_dominance_yesterday: number
  eth_dominance_24h_percentage_change: number
  btc_dominance_24h_percentage_change: number
  defi_volume_24h: number
  defi_volume_24h_reported: number
  defi_24h_percentage_change: number
  stablecoin_volume_24h: number
  stablecoin_volume_24h_reported: number
  stablecoin_24h_percentage_change: number
  derivatives_volume_24h: number
  derivatives_volume_24h_reported: number
  derivatives_24h_percentage_change: number
  quote: {
    [currency: string]: {
      total_market_cap: number
      total_volume_24h: number
      total_volume_24h_reported: number
      altcoin_volume_24h: number
      altcoin_volume_24h_reported: number
      altcoin_market_cap: number
      defi_market_cap: number
      stablecoin_market_cap: number
      derivatives_market_cap: number
      total_market_cap_yesterday: number
      total_volume_24h_yesterday: number
      total_market_cap_yesterday_percentage_change: number
      total_volume_24h_yesterday_percentage_change: number
      last_updated: string
    }
  }
}

export class CoinMarketCapClient {
  private readonly baseUrl: string
  private readonly apiKey?: string
  private readonly timeout: number

  constructor() {
    this.baseUrl = "https://pro-api.coinmarketcap.com/v1"
    this.apiKey = process.env.COINMARKETCAP_API_KEY
    this.timeout = 10000 // 10秒
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.apiKey) {
      throw new Error("CoinMarketCap API key is not configured")
    }

    const url = new URL(endpoint, this.baseUrl)
    
    // パラメータを追加
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })

    const headers: Record<string, string> = {
      'X-CMC_PRO_API_KEY': this.apiKey,
      'Accept': 'application/json',
      'Accept-Encoding': 'deflate, gzip',
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`CoinMarketCap API error: ${response.status} ${response.statusText} - ${errorData.status?.error_message || 'Unknown error'}`)
      }

      const data = await response.json()
      
      // CoinMarketCapのレスポンス構造をチェック
      if (data.status?.error_code !== 0) {
        throw new Error(`CoinMarketCap API error: ${data.status?.error_message || 'Unknown error'}`)
      }

      return data.data
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('CoinMarketCap API request timeout')
        }
        throw error
      }
      throw new Error('Unknown error occurred')
    }
  }

  // 暗号通貨の最新価格を取得
  async getLatestQuotes(
    symbols?: string[],
    ids?: number[],
    convert: string = 'USD',
    aux?: string
  ): Promise<{ [key: string]: CoinMarketCapCryptocurrency }> {
    const params: Record<string, any> = {
      convert,
    }

    if (symbols && symbols.length > 0) {
      params.symbol = symbols.join(',')
    }
    if (ids && ids.length > 0) {
      params.id = ids.join(',')
    }
    if (aux) {
      params.aux = aux
    }

    const data = await this.makeRequest('/cryptocurrency/quotes/latest', params)
    
    logger.info('CoinMarketCap latest quotes fetched', {
      symbols: symbols?.length || 0,
      ids: ids?.length || 0,
      convert,
      resultCount: Object.keys(data).length
    })

    return data
  }

  // 暗号通貨リストを取得
  async getListings(
    start: number = 1,
    limit: number = 100,
    convert: string = 'USD',
    sort: string = 'market_cap',
    sortDir: 'asc' | 'desc' = 'desc',
    cryptocurrencyType: string = 'all',
    tag: string = 'all'
  ): Promise<CoinMarketCapCryptocurrency[]> {
    const params = {
      start,
      limit: Math.min(limit, 5000), // 最大5000
      convert,
      sort,
      sort_dir: sortDir,
      cryptocurrency_type: cryptocurrencyType,
      tag,
    }

    const data = await this.makeRequest('/cryptocurrency/listings/latest', params)
    
    logger.info('CoinMarketCap listings fetched', {
      start,
      limit,
      convert,
      sort,
      resultCount: data.length
    })

    return data
  }

  // グローバル市場メトリクスを取得
  async getGlobalMetrics(convert: string = 'USD'): Promise<CoinMarketCapGlobalMetrics> {
    const params = { convert }
    const data = await this.makeRequest('/global-metrics/quotes/latest', params)
    
    logger.info('CoinMarketCap global metrics fetched', {
      convert,
      totalMarketCap: data.quote?.[convert]?.total_market_cap,
      btcDominance: data.btc_dominance
    })

    return data
  }

  // 暗号通貨の詳細情報を取得
  async getCryptocurrencyInfo(
    symbols?: string[],
    ids?: number[],
    aux?: string
  ): Promise<{ [key: string]: any }> {
    const params: Record<string, any> = {}

    if (symbols && symbols.length > 0) {
      params.symbol = symbols.join(',')
    }
    if (ids && ids.length > 0) {
      params.id = ids.join(',')
    }
    if (aux) {
      params.aux = aux
    }

    const data = await this.makeRequest('/cryptocurrency/info', params)
    
    logger.info('CoinMarketCap cryptocurrency info fetched', {
      symbols: symbols?.length || 0,
      ids: ids?.length || 0,
      resultCount: Object.keys(data).length
    })

    return data
  }

  // 価格履歴を取得
  async getHistoricalQuotes(
    symbol: string,
    timeStart?: string,
    timeEnd?: string,
    count?: number,
    interval?: '5m' | '10m' | '15m' | '30m' | '45m' | '1h' | '2h' | '3h' | '6h' | '12h' | '1d' | '2d' | '3d' | '7d' | '14d' | '15d' | '30d' | '60d' | '90d' | '365d',
    convert: string = 'USD'
  ): Promise<any> {
    const params: Record<string, any> = {
      symbol,
      convert,
    }

    if (timeStart) params.time_start = timeStart
    if (timeEnd) params.time_end = timeEnd
    if (count) params.count = count
    if (interval) params.interval = interval

    const data = await this.makeRequest('/cryptocurrency/quotes/historical', params)
    
    logger.info('CoinMarketCap historical quotes fetched', {
      symbol,
      timeStart,
      timeEnd,
      count,
      interval,
      resultCount: data.quotes?.length || 0
    })

    return data
  }

  // 取引所リストを取得
  async getExchangeListings(
    start: number = 1,
    limit: number = 100,
    sort: string = 'volume_24h',
    sortDir: 'asc' | 'desc' = 'desc',
    convert: string = 'USD'
  ): Promise<any[]> {
    const params = {
      start,
      limit: Math.min(limit, 5000),
      sort,
      sort_dir: sortDir,
      convert,
    }

    const data = await this.makeRequest('/exchange/listings/latest', params)
    
    logger.info('CoinMarketCap exchange listings fetched', {
      start,
      limit,
      sort,
      resultCount: data.length
    })

    return data
  }

  // 簡単な価格取得（シンボル指定）
  async getSimplePrice(symbols: string[]): Promise<{ [symbol: string]: { price: number; change24h: number; marketCap: number } }> {
    const data = await this.getLatestQuotes(symbols)
    const result: { [symbol: string]: { price: number; change24h: number; marketCap: number } } = {}

    Object.entries(data).forEach(([key, crypto]) => {
      if (crypto.quote?.USD) {
        result[crypto.symbol] = {
          price: crypto.quote.USD.price,
          change24h: crypto.quote.USD.percent_change_24h,
          marketCap: crypto.quote.USD.market_cap
        }
      }
    })

    logger.info('CoinMarketCap simple prices fetched', {
      requestedSymbols: symbols.length,
      returnedSymbols: Object.keys(result).length
    })

    return result
  }

  // APIキーが設定されているかチェック
  hasApiKey(): boolean {
    return !!this.apiKey
  }

  // 接続テスト
  async testConnection(): Promise<boolean> {
    try {
      if (!this.apiKey) {
        return false
      }
      
      // 少量のデータで接続テスト
      await this.getLatestQuotes(['BTC'], undefined, 'USD')
      return true
    } catch (error) {
      logger.error('CoinMarketCap connection test failed', {
        error: error instanceof Error ? error.message : String(error)
      })
      return false
    }
  }
}