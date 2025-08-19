import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("binance-client")

export interface BinanceTickerData {
  symbol: string
  price: string
  priceChangePercent: string
  volume: string
  count: number
  openTime: number
  closeTime: number
}

export interface BinanceKlineData {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  closeTime: number
  quoteAssetVolume: string
  numberOfTrades: number
  takerBuyBaseAssetVolume: string
  takerBuyQuoteAssetVolume: string
}

interface BinanceExchangeInfo {
  timezone: string
  serverTime: number
  rateLimits: Array<{
    rateLimitType: string
    interval: string
    intervalNum: number
    limit: number
  }>
  exchangeFilters: Array<unknown>
  symbols: Array<{
    symbol: string
    status: string
    baseAsset: string
    baseAssetPrecision: number
    quoteAsset: string
    quotePrecision: number
    quoteAssetPrecision: number
    baseCommissionPrecision: number
    quoteCommissionPrecision: number
    orderTypes: string[]
    icebergAllowed: boolean
    ocoAllowed: boolean
    quoteOrderQtyMarketAllowed: boolean
    allowTrailingStop: boolean
    cancelReplaceAllowed: boolean
    isSpotTradingAllowed: boolean
    isMarginTradingAllowed: boolean
    filters: Array<{
      filterType: string
      minPrice?: string
      maxPrice?: string
      tickSize?: string
      multiplierUp?: string
      multiplierDown?: string
      avgPriceMins?: number
      minQty?: string
      maxQty?: string
      stepSize?: string
      minNotional?: string
      applyToMarket?: boolean
      limit?: number
      minTrailingAboveDelta?: number
      maxTrailingAboveDelta?: number
      minTrailingBelowDelta?: number
      maxTrailingBelowDelta?: number
      [key: string]: unknown
    }>
    permissions: string[]
  }>
}

export interface BinanceOrderBookData {
  lastUpdateId: number
  bids: [string, string][]
  asks: [string, string][]
}

export class BinanceClient {
  private readonly baseUrl: string
  private readonly apiKey?: string
  private readonly secretKey?: string
  private readonly timeout: number

  constructor() {
    this.baseUrl = "https://api.binance.com"
    this.apiKey = process.env.BINANCE_API_KEY
    this.secretKey = process.env.BINANCE_SECRET_KEY
    this.timeout = 10000 // 10秒
  }

  private async makeRequest(endpoint: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const url = new URL(endpoint, this.baseUrl)
    
    // パラメータを追加
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // APIキーが設定されている場合は追加
    if (this.apiKey) {
      headers['X-MBX-APIKEY'] = this.apiKey
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url.toString(), {
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Binance API error: ${response.status} ${response.statusText} - ${errorData.msg || 'Unknown error'}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Binance API request timeout')
        }
        throw error
      }
      throw new Error('Unknown error occurred')
    }
  }

  // 24時間価格統計を取得
  async getTicker24hr(symbol?: string): Promise<BinanceTickerData | BinanceTickerData[]> {
    const params = symbol ? { symbol } : {}
    const data = await this.makeRequest('/api/v3/ticker/24hr', params)
    
    logger.info('Binance 24hr ticker data fetched', {
      symbol,
      dataLength: Array.isArray(data) ? data.length : 1
    })
    
    return data as BinanceTickerData | BinanceTickerData[]
  }

  // 価格情報を取得
  async getPrice(symbol?: string): Promise<{ symbol: string; price: string } | { symbol: string; price: string }[]> {
    const params = symbol ? { symbol } : {}
    const data = await this.makeRequest('/api/v3/ticker/price', params)
    
    logger.info('Binance price data fetched', {
      symbol,
      dataLength: Array.isArray(data) ? data.length : 1
    })
    
    return data as { symbol: string; price: string } | { symbol: string; price: string }[]
  }

  // Klineデータ（ローソク足）を取得
  async getKlines(
    symbol: string,
    interval: '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M' = '1d',
    limit: number = 500,
    startTime?: number,
    endTime?: number
  ): Promise<BinanceKlineData[]> {
    const params: Record<string, unknown> = {
      symbol,
      interval,
      limit: Math.min(limit, 1000), // 最大1000
    }

    if (startTime) params.startTime = startTime
    if (endTime) params.endTime = endTime

    const data = await this.makeRequest('/api/v3/klines', params)
    
    const rawData = data as Array<[number, string, string, string, string, string, number, string, number, string, string]>
    const formattedData: BinanceKlineData[] = rawData.map((kline) => ({
      openTime: kline[0],
      open: kline[1],
      high: kline[2],
      low: kline[3],
      close: kline[4],
      volume: kline[5],
      closeTime: kline[6],
      quoteAssetVolume: kline[7],
      numberOfTrades: kline[8],
      takerBuyBaseAssetVolume: kline[9],
      takerBuyQuoteAssetVolume: kline[10],
    }))
    
    logger.info('Binance klines data fetched', {
      symbol,
      interval,
      dataLength: formattedData.length,
      timeRange: formattedData.length > 0 ? {
        start: new Date(formattedData[0].openTime).toISOString(),
        end: new Date(formattedData[formattedData.length - 1].closeTime).toISOString()
      } : null
    })
    
    return formattedData
  }

  // オーダーブック情報を取得
  async getOrderBook(symbol: string, limit: number = 100): Promise<BinanceOrderBookData> {
    const params = {
      symbol,
      limit: Math.min(limit, 5000), // 最大5000
    }

    const data = await this.makeRequest('/api/v3/depth', params)
    const ob = data as BinanceOrderBookData
    
    logger.info('Binance order book data fetched', {
      symbol,
      bidsLength: ob.bids?.length || 0,
      asksLength: ob.asks?.length || 0
    })
    
    return ob
  }

  // 取引所情報を取得
  async getExchangeInfo(): Promise<BinanceExchangeInfo> {
    const data = await this.makeRequest('/api/v3/exchangeInfo')
    const info = data as BinanceExchangeInfo
    
    logger.info('Binance exchange info fetched', {
      symbolsCount: info.symbols?.length || 0,
      serverTime: info.serverTime
    })
    
    return info
  }

  // 平均価格を取得
  async getAvgPrice(symbol: string): Promise<{ mins: number; price: string }> {
    const data = await this.makeRequest('/api/v3/avgPrice', { symbol })
    const avg = data as { mins: number; price: string }
    
    logger.info('Binance average price fetched', {
      symbol,
      price: avg.price,
      mins: avg.mins
    })
    
    return avg
  }

  // 暗号通貨シンボルを正規化（BTC -> BTCUSDT）
  normalizeSymbol(symbol: string): string {
    // 既にペアシンボルの場合はそのまま返す
    if (symbol.includes('USDT') || symbol.includes('BTC') || symbol.includes('ETH')) {
      return symbol.toUpperCase()
    }
    
    // 単一シンボルの場合はUSDTペアに変換
    return `${symbol.toUpperCase()}USDT`
  }

  // 価格を取得（シンボル正規化付き）
  async getNormalizedPrice(symbol: string): Promise<{ symbol: string; price: number; priceChangePercent: number; volume: number }> {
    const normalizedSymbol = this.normalizeSymbol(symbol)
    const data = await this.getTicker24hr(normalizedSymbol) as BinanceTickerData
    
    return {
      symbol: normalizedSymbol,
      price: parseFloat(data.price),
      priceChangePercent: parseFloat(data.priceChangePercent),
      volume: parseFloat(data.volume)
    }
  }

  // 複数の暗号通貨価格を一括取得
  async getMultiplePrices(symbols: string[]): Promise<{ [symbol: string]: { price: number; priceChangePercent: number; volume: number } }> {
    const normalizedSymbols = symbols.map(s => this.normalizeSymbol(s))
    const data = await this.getTicker24hr() as BinanceTickerData[]
    
    const result: { [symbol: string]: { price: number; priceChangePercent: number; volume: number } } = {}
    
    data.forEach(ticker => {
      if (normalizedSymbols.includes(ticker.symbol)) {
        // 元のシンボルを探す
        const originalSymbol = symbols.find(s => this.normalizeSymbol(s) === ticker.symbol)
        if (originalSymbol) {
          result[originalSymbol] = {
            price: parseFloat(ticker.price),
            priceChangePercent: parseFloat(ticker.priceChangePercent),
            volume: parseFloat(ticker.volume)
          }
        }
      }
    })
    
    logger.info('Multiple Binance prices fetched', {
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
      await this.makeRequest('/api/v3/ping')
      return true
    } catch (error) {
      logger.error('Binance connection test failed', {
        error: error instanceof Error ? error.message : String(error)
      })
      return false
    }
  }
}
