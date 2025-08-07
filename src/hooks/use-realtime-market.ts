"use client"

import { useEffect, useRef, useState } from "react"
import { getRealtimeMarketData, RealtimePrice, RealtimeTickerData, RealtimeTradeData, RealtimeOrderBookData } from "@/lib/market/realtime-data"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("use-realtime-market")

export interface UseRealtimeMarketOptions {
  symbols: string[]
  dataTypes: Array<'price' | 'ticker' | 'trade' | 'orderbook'>
  autoConnect?: boolean
  reconnectOnError?: boolean
}

export interface RealtimeMarketState {
  connected: boolean
  connectionState: string
  subscriptions: number
  error: string | null
  data: {
    prices: Record<string, RealtimePrice>
    tickers: Record<string, RealtimeTickerData>
    trades: Record<string, RealtimeTradeData[]>
    orderbooks: Record<string, RealtimeOrderBookData>
  }
}

export function useRealtimeMarket(options: UseRealtimeMarketOptions) {
  const [state, setState] = useState<RealtimeMarketState>({
    connected: false,
    connectionState: 'disconnected',
    subscriptions: 0,
    error: null,
    data: {
      prices: {},
      tickers: {},
      trades: {},
      orderbooks: {}
    }
  })

  const realtimeDataRef = useRef(getRealtimeMarketData())
  const subscriptionKeysRef = useRef<string[]>([])
  const tradesBufferRef = useRef<Record<string, RealtimeTradeData[]>>({})
  const maxTradesPerSymbol = 100

  // 接続状態の監視
  useEffect(() => {
    const checkConnection = () => {
      const rtData = realtimeDataRef.current
      setState(prev => ({
        ...prev,
        connected: rtData.isConnected(),
        connectionState: rtData.getConnectionState(),
        subscriptions: rtData.getSubscriptionCount()
      }))
    }

    const interval = setInterval(checkConnection, 1000)
    return () => clearInterval(interval)
  }, [])

  // 購読の管理
  useEffect(() => {
    const { symbols, dataTypes, autoConnect = true } = options
    
    if (!symbols.length || !dataTypes.length) {
      return
    }

    const setupSubscriptions = async () => {
      try {
        const rtData = realtimeDataRef.current
        
        // 既存の購読を解除
        subscriptionKeysRef.current.forEach(key => {
          rtData.unsubscribe(key)
        })
        subscriptionKeysRef.current = []

        // 新しい購読を設定
        const newSubscriptionKeys: string[] = []

        for (const symbol of symbols) {
          for (const dataType of dataTypes) {
            const key = rtData.subscribe(dataType, symbol, (data) => {
              handleRealtimeData(dataType, symbol, data)
            })
            newSubscriptionKeys.push(key)
          }
        }

        subscriptionKeysRef.current = newSubscriptionKeys

        // 自動接続が有効な場合は接続
        if (autoConnect) {
          await rtData.connect()
        }

        setState(prev => ({
          ...prev,
          error: null,
          subscriptions: rtData.getSubscriptionCount()
        }))

      } catch (error) {
        logger.error('Failed to setup subscriptions', { error })
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to setup subscriptions'
        }))
      }
    }

    setupSubscriptions()

    return () => {
      // クリーンアップ: 購読を解除
      subscriptionKeysRef.current.forEach(key => {
        realtimeDataRef.current.unsubscribe(key)
      })
      subscriptionKeysRef.current = []
    }
  }, [options.symbols, options.dataTypes, options.autoConnect])

  // リアルタイムデータの処理
  const handleRealtimeData = (dataType: string, symbol: string, data: any) => {
    setState(prev => {
      const newState = { ...prev }

      switch (dataType) {
        case 'price':
          newState.data.prices = {
            ...newState.data.prices,
            [symbol]: data as RealtimePrice
          }
          break

        case 'ticker':
          newState.data.tickers = {
            ...newState.data.tickers,
            [symbol]: data as RealtimeTickerData
          }
          break

        case 'trade':
          // トレードデータはバッファに蓄積
          if (!tradesBufferRef.current[symbol]) {
            tradesBufferRef.current[symbol] = []
          }
          tradesBufferRef.current[symbol].unshift(data as RealtimeTradeData)
          
          // 最大件数を超えた場合は古いデータを削除
          if (tradesBufferRef.current[symbol].length > maxTradesPerSymbol) {
            tradesBufferRef.current[symbol] = tradesBufferRef.current[symbol].slice(0, maxTradesPerSymbol)
          }
          
          newState.data.trades = {
            ...newState.data.trades,
            [symbol]: [...tradesBufferRef.current[symbol]]
          }
          break

        case 'orderbook':
          newState.data.orderbooks = {
            ...newState.data.orderbooks,
            [symbol]: data as RealtimeOrderBookData
          }
          break
      }

      return newState
    })
  }

  // 手動接続
  const connect = async () => {
    try {
      await realtimeDataRef.current.connect()
      setState(prev => ({
        ...prev,
        error: null
      }))
    } catch (error) {
      logger.error('Failed to connect', { error })
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to connect'
      }))
    }
  }

  // 手動切断
  const disconnect = () => {
    realtimeDataRef.current.disconnect()
    setState(prev => ({
      ...prev,
      connected: false,
      connectionState: 'disconnected'
    }))
  }

  // 特定のシンボルの最新価格を取得
  const getLatestPrice = (symbol: string): number | null => {
    const ticker = state.data.tickers[symbol]
    const price = state.data.prices[symbol]
    
    if (ticker) return ticker.price
    if (price) return price.price
    return null
  }

  // 特定のシンボルの24時間変動率を取得
  const getChange24h = (symbol: string): number | null => {
    const ticker = state.data.tickers[symbol]
    const price = state.data.prices[symbol]
    
    if (ticker) {
      return ((ticker.price - ticker.open) / ticker.open) * 100
    }
    if (price) return price.changePercent24h
    return null
  }

  // 購読中のシンボル一覧を取得
  const getSubscribedSymbols = (): string[] => {
    return realtimeDataRef.current.getSubscribedSymbols()
  }

  // 接続統計を取得
  const getConnectionStats = () => {
    const rtData = realtimeDataRef.current
    return {
      connected: rtData.isConnected(),
      connectionState: rtData.getConnectionState(),
      subscriptions: rtData.getSubscriptionCount(),
      subscribedSymbols: rtData.getSubscribedSymbols(),
      dataCount: {
        prices: Object.keys(state.data.prices).length,
        tickers: Object.keys(state.data.tickers).length,
        trades: Object.keys(state.data.trades).length,
        orderbooks: Object.keys(state.data.orderbooks).length
      }
    }
  }

  return {
    ...state,
    connect,
    disconnect,
    getLatestPrice,
    getChange24h,
    getSubscribedSymbols,
    getConnectionStats
  }
}

// 単一シンボルの価格監視用の簡易Hook
export function useRealtimePrice(symbol: string) {
  const { data, connected, error } = useRealtimeMarket({
    symbols: [symbol],
    dataTypes: ['ticker'],
    autoConnect: true
  })

  const price = data.tickers[symbol]?.price || null
  const change24h = data.tickers[symbol] ? 
    ((data.tickers[symbol].price - data.tickers[symbol].open) / data.tickers[symbol].open) * 100 : null

  return {
    price,
    change24h,
    connected,
    error,
    ticker: data.tickers[symbol] || null
  }
}

// 複数シンボルの価格監視用Hook
export function useRealtimePrices(symbols: string[]) {
  const { data, connected, error } = useRealtimeMarket({
    symbols,
    dataTypes: ['ticker'],
    autoConnect: true
  })

  const prices = symbols.reduce((acc, symbol) => {
    const ticker = data.tickers[symbol]
    if (ticker) {
      acc[symbol] = {
        price: ticker.price,
        change24h: ((ticker.price - ticker.open) / ticker.open) * 100,
        volume: ticker.volume
      }
    }
    return acc
  }, {} as Record<string, { price: number; change24h: number; volume: number }>)

  return {
    prices,
    connected,
    error,
    tickers: data.tickers
  }
}