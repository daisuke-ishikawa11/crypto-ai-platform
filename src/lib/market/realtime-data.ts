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

export interface RealtimeDataSubscription {
  type: RealtimeDataType
  symbol: string
  callback: (data: any) => void
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
        logger.error('WebSocket error', { error })
        this.isConnecting = false
      }

    } catch (error) {
      logger.error('Failed to create WebSocket connection', { error })
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
      logger.error('Failed to parse WebSocket message', { error, data })
    }
  }

  private processBinanceMessage(stream: string, data: any): void {
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

  private processCoinbaseMessage(message: any): void {
    const symbol = message.product_id?.replace('-', '')
    
    switch (message.type) {
      case 'ticker':
        this.handleTickerData(symbol, message)
        break
      case 'match':
        this.handleTradeData(symbol, message)
        break
      case 'l2update':
        this.handleOrderBookData(symbol, message)
        break
    }
  }

  private handleTickerData(symbol: string, data: any): void {
    const tickerData: RealtimeTickerData = {
      symbol,
      price: parseFloat(data.c || data.price),
      open: parseFloat(data.o || data.open_24h),
      high: parseFloat(data.h || data.high_24h),
      low: parseFloat(data.l || data.low_24h),
      volume: parseFloat(data.v || data.volume_24h),
      count: parseInt(data.n || data.trade_count || '0'),
      timestamp: Date.now()
    }

    this.notifySubscribers('ticker', symbol, tickerData)
  }

  private handleTradeData(symbol: string, data: any): void {
    const tradeData: RealtimeTradeData = {
      symbol,
      price: parseFloat(data.p || data.price),
      quantity: parseFloat(data.q || data.size),
      timestamp: Date.now(),
      isBuyerMaker: data.m || data.side === 'sell'
    }

    this.notifySubscribers('trade', symbol, tradeData)
  }

  private handleOrderBookData(symbol: string, data: any): void {
    const orderBookData: RealtimeOrderBookData = {
      symbol,
      bids: (data.b || data.bids || []).map((bid: any) => [parseFloat(bid[0]), parseFloat(bid[1])]),
      asks: (data.a || data.asks || []).map((ask: any) => [parseFloat(ask[0]), parseFloat(ask[1])]),
      timestamp: Date.now()
    }

    this.notifySubscribers('orderbook', symbol, orderBookData)
  }

  private notifySubscribers(type: RealtimeDataType, symbol: string, data: any): void {
    const subscriptionKey = `${type}:${symbol}`
    const subscription = this.subscriptions.get(subscriptionKey)
    
    if (subscription) {
      try {
        subscription.callback(data)
      } catch (error) {
        logger.error('Error in subscription callback', { error, type, symbol })
      }
    }
  }

  subscribe(type: RealtimeDataType, symbol: string, callback: (data: any) => void): string {
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

    setTimeout(() => {
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