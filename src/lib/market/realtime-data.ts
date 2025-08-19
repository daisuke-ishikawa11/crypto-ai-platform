import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("realtime-market-data")

export interface RealtimePrice {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  volume24h: number
  timestamp: number
}

export interface RealtimeTickerData {
  symbol: string
  price: number
  open: number
  high: number
  low: number
  volume: number
  count: number
  timestamp: number
}

export interface RealtimeTradeData {
  symbol: string
  price: number
  quantity: number
  timestamp: number
  isBuyerMaker: boolean
}

export interface RealtimeOrderBookData {
  symbol: string
  bids: [number, number][]
  asks: [number, number][]
  timestamp: number
}

export type RealtimeDataType = 'price' | 'ticker' | 'trade' | 'orderbook'

// Raw data interfaces for different providers
interface BinanceStreamData {
  c?: string  // close price
  o?: string  // open price
  h?: string  // high price
  l?: string  // low price
  v?: string  // volume
  n?: string  // count
  p?: string  // price (trade)
  q?: string  // quantity
  m?: boolean // is buyer maker
  b?: [string, string][] // bids
  a?: [string, string][] // asks
  [key: string]: unknown
}

interface CoinbaseMessage {
  type?: string
  product_id?: string
  price?: string
  open_24h?: string
  high_24h?: string
  low_24h?: string
  volume_24h?: string
  trade_count?: string
  size?: string
  side?: string
  bids?: [string, string][]
  asks?: [string, string][]
  [key: string]: unknown
}

interface TickerRawData {
  c?: string  // close/current price
  price?: string
  o?: string  // open price
  open_24h?: string
  h?: string  // high price
  high_24h?: string
  l?: string  // low price
  low_24h?: string
  v?: string  // volume
  volume_24h?: string
  n?: string  // trade count
  trade_count?: string
  [key: string]: unknown
}

interface TradeRawData {
  p?: string  // price
  price?: string
  q?: string  // quantity
  size?: string
  m?: boolean // is buyer maker
  side?: string
  [key: string]: unknown
}

interface OrderBookRawData {
  b?: [string, string][] // bids
  bids?: [string, string][]
  a?: [string, string][] // asks
  asks?: [string, string][]
  [key: string]: unknown
}

export type RealtimeCallbackData = RealtimePrice | RealtimeTickerData | RealtimeTradeData | RealtimeOrderBookData

export interface RealtimeDataSubscription {
  type: RealtimeDataType
  symbol: string
  callback: (data: RealtimeCallbackData) => void
}

export class RealtimeMarketData {
  private ws: WebSocket | null = null
  private subscriptions: Map<string, RealtimeDataSubscription> = new Map()
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 10
  private reconnectDelay: number = 1000
  private isConnecting: boolean = false
  private heartbeatInterval: NodeJS.Timeout | null = null
  private lastHeartbeat: number = 0
  private readonly baseUrl: string

  constructor(provider: 'binance' | 'coinbase' = 'binance') {
    this.baseUrl = provider === 'binance' 
      ? 'wss://stream.binance.com:9443/ws'
      : 'wss://ws-feed.pro.coinbase.com'
  }

  async connect(): Promise<void> {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return
    }

    this.isConnecting = true

    try {
      this.ws = new WebSocket(this.baseUrl)
      
      this.ws.onopen = () => {
        logger.info('WebSocket connection established')
        this.isConnecting = false
        this.reconnectAttempts = 0
        this.startHeartbeat()
        this.resubscribeAll()
      }

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data)
      }

      this.ws.onclose = (event) => {
        logger.warn('WebSocket connection closed', { code: event.code, reason: event.reason })
        this.isConnecting = false
        this.stopHeartbeat()
        this.scheduleReconnect()
      }

      this.ws.onerror = (error) => {
        const errMsg = (error && typeof (error as Event).type === 'string') ? `WebSocketEvent:${(error as Event).type}` : String(error)
        logger.error('WebSocket error', { error: errMsg })
        this.isConnecting = false
      }

    } catch (error) {
      logger.error('Failed to create WebSocket connection', { error: error instanceof Error ? error.message : String(error) })
      this.isConnecting = false
      this.scheduleReconnect()
    }
  }

  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data)
      
      // Binance形式のメッセージを処理
      if (message.stream && message.data) {
        this.processBinanceMessage(message.stream, message.data)
      } else if (message.type) {
        // Coinbase形式のメッセージを処理
        this.processCoinbaseMessage(message)
      }
      
      this.lastHeartbeat = Date.now()
    } catch (error) {
      logger.error('Failed to parse WebSocket message', { error: error instanceof Error ? error.message : String(error), data })
    }
  }

  private processBinanceMessage(stream: string, data: BinanceStreamData): void {
    const streamParts = stream.split('@')
    if (streamParts.length < 2) return

    const symbol = streamParts[0].toUpperCase()
    const dataType = streamParts[1]

    if (dataType === 'ticker') {
      this.handleTickerData(symbol, data)
    } else if (dataType === 'trade') {
      this.handleTradeData(symbol, data)
    } else if (dataType.includes('depth')) {
      this.handleOrderBookData(symbol, data)
    }
  }

  private processCoinbaseMessage(message: CoinbaseMessage): void {
    const symbol = (message.product_id || '').replace('-', '')
    
    switch (message.type) {
      case 'ticker':
        if (symbol) this.handleTickerData(symbol, message as TickerRawData)
        break
      case 'match':
        if (symbol) this.handleTradeData(symbol, message as TradeRawData)
        break
      case 'l2update':
        if (symbol) {
          const ob: OrderBookRawData = {
            b: Array.isArray(message.bids) ? message.bids : undefined,
            a: Array.isArray(message.asks) ? message.asks : undefined,
          }
          this.handleOrderBookData(symbol, ob)
        }
        break
    }
  }

  private handleTickerData(symbol: string, data: TickerRawData): void {
    const tickerData: RealtimeTickerData = {
      symbol,
      price: parseFloat((data.c ?? data.price ?? '0') as string),
      open: parseFloat((data.o ?? data.open_24h ?? '0') as string),
      high: parseFloat((data.h ?? data.high_24h ?? '0') as string),
      low: parseFloat((data.l ?? data.low_24h ?? '0') as string),
      volume: parseFloat((data.v ?? data.volume_24h ?? '0') as string),
      count: parseInt(data.n || data.trade_count || '0'),
      timestamp: Date.now()
    }

    this.notifySubscribers('ticker', symbol, tickerData)
  }

  private handleTradeData(symbol: string, data: TradeRawData): void {
    const tradeData: RealtimeTradeData = {
      symbol,
      price: parseFloat((data.p ?? data.price ?? '0') as string),
      quantity: parseFloat((data.q ?? data.size ?? '0') as string),
      timestamp: Date.now(),
      isBuyerMaker: data.m || data.side === 'sell'
    }

    this.notifySubscribers('trade', symbol, tradeData)
  }

  private handleOrderBookData(symbol: string, data: OrderBookRawData): void {
    const orderBookData: RealtimeOrderBookData = {
      symbol,
      bids: (data.b || data.bids || []).map((bid: [string, string] | number[]) => [
        parseFloat(typeof bid[0] === 'string' ? bid[0] : String(bid[0])), 
        parseFloat(typeof bid[1] === 'string' ? bid[1] : String(bid[1]))
      ]),
      asks: (data.a || data.asks || []).map((ask: [string, string] | number[]) => [
        parseFloat(typeof ask[0] === 'string' ? ask[0] : String(ask[0])), 
        parseFloat(typeof ask[1] === 'string' ? ask[1] : String(ask[1]))
      ]),
      timestamp: Date.now()
    }

    this.notifySubscribers('orderbook', symbol, orderBookData)
  }

  private notifySubscribers(type: RealtimeDataType, symbol: string, data: RealtimeCallbackData): void {
    const subscriptionKey = `${type}:${symbol}`
    const subscription = this.subscriptions.get(subscriptionKey)
    
    if (subscription) {
      try {
        subscription.callback(data)
      } catch (error) {
        logger.error('Error in subscription callback', { error: error instanceof Error ? error.message : String(error), type, symbol })
      }
    }
  }

  subscribe(type: RealtimeDataType, symbol: string, callback: (data: RealtimeCallbackData) => void): string {
    const subscriptionKey = `${type}:${symbol}`
    
    this.subscriptions.set(subscriptionKey, {
      type,
      symbol,
      callback
    })

    // WebSocketが接続されている場合は即座に購読
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendSubscription(type, symbol, true)
    }

    logger.info('Subscription added', { type, symbol, totalSubscriptions: this.subscriptions.size })
    
    return subscriptionKey
  }

  unsubscribe(subscriptionKey: string): void {
    const subscription = this.subscriptions.get(subscriptionKey)
    if (subscription) {
      this.subscriptions.delete(subscriptionKey)
      
      // WebSocketが接続されている場合は購読を解除
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.sendSubscription(subscription.type, subscription.symbol, false)
      }
      
      logger.info('Subscription removed', { 
        subscriptionKey, 
        totalSubscriptions: this.subscriptions.size 
      })
    }
  }

  private sendSubscription(type: RealtimeDataType, symbol: string, subscribe: boolean): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }

    const normalizedSymbol = symbol.toLowerCase()
    
    // Binance形式のストリーム名を生成
    let streamName = ''
    switch (type) {
      case 'ticker':
        streamName = `${normalizedSymbol}@ticker`
        break
      case 'trade':
        streamName = `${normalizedSymbol}@trade`
        break
      case 'orderbook':
        streamName = `${normalizedSymbol}@depth5@100ms`
        break
      default:
        return
    }

    const message = {
      method: subscribe ? 'SUBSCRIBE' : 'UNSUBSCRIBE',
      params: [streamName],
      id: Date.now()
    }

    this.ws.send(JSON.stringify(message))
    
    logger.info('Subscription message sent', { 
      action: subscribe ? 'SUBSCRIBE' : 'UNSUBSCRIBE',
      streamName 
    })
  }

  private resubscribeAll(): void {
    for (const [key, subscription] of this.subscriptions) {
      this.sendSubscription(subscription.type, subscription.symbol, true)
    }
  }

  private startHeartbeat(): void {
    if (process.env.NODE_ENV === 'test') return
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ method: 'ping' }))
      }
      
      // 3分以上応答がない場合は再接続
      if (Date.now() - this.lastHeartbeat > 180000) {
        logger.warn('Heartbeat timeout, reconnecting...')
        this.disconnect()
        this.connect()
      }
    }, 30000) // 30秒ごと
    ;(this.heartbeatInterval as { unref?: () => void }).unref?.()
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error('Max reconnection attempts reached')
      return
    }

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts)
    this.reconnectAttempts++

    logger.info('Scheduling reconnection', { 
      attempt: this.reconnectAttempts,
      delay: delay
    })

      const schedule = (cb: () => void, ms: number): void => {
        if (process.env.NODE_ENV === 'test') return
        const timeout = setTimeout(cb, ms)
        ;(timeout as { unref?: () => void }).unref?.()
      }

    schedule(() => {
      this.connect()
    }, delay)
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.stopHeartbeat()
    this.subscriptions.clear()
    logger.info('WebSocket disconnected')
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }

  getConnectionState(): string {
    if (!this.ws) return 'disconnected'
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting'
      case WebSocket.OPEN: return 'open'
      case WebSocket.CLOSING: return 'closing'
      case WebSocket.CLOSED: return 'closed'
      default: return 'unknown'
    }
  }

  getSubscriptionCount(): number {
    return this.subscriptions.size
  }

  getSubscribedSymbols(): string[] {
    return Array.from(new Set(Array.from(this.subscriptions.values()).map(s => s.symbol)))
  }
}

// グローバルインスタンス
let realtimeMarketData: RealtimeMarketData | null = null

export function getRealtimeMarketData(): RealtimeMarketData {
  if (!realtimeMarketData) {
    realtimeMarketData = new RealtimeMarketData()
  }
  return realtimeMarketData
}

export function createRealtimeMarketData(provider: 'binance' | 'coinbase' = 'binance'): RealtimeMarketData {
  return new RealtimeMarketData(provider)
}
