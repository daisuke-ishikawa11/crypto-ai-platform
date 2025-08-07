import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createLogger } from "@/lib/monitoring/logger"

const logger = createLogger("realtime-market-api")

// WebSocketコネクションの管理
const connections = new Map<string, WebSocket>()

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // WebSocketアップグレードのチェック
    const upgrade = request.headers.get("upgrade")
    if (upgrade !== "websocket") {
      return NextResponse.json(
        { error: "Expected WebSocket upgrade" },
        { status: 400 }
      )
    }

    const connectionId = `${user.id}-${Date.now()}`
    
    // WebSocketサーバーへの接続を確立
    const ws = new WebSocket("wss://stream.binance.com:9443/ws")
    
    ws.onopen = () => {
      logger.info("WebSocket connection established", { connectionId, userId: user.id })
      connections.set(connectionId, ws)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        logger.debug("WebSocket message received", { connectionId, data })
        
        // クライアントにメッセージを転送
        // 実際の実装では、Server-Sent Eventsやカスタムプロトコルを使用
      } catch (err) {
        logger.error("Error processing WebSocket message", { wsError: err, connectionId })
      }
    }

    ws.onclose = () => {
      logger.info("WebSocket connection closed", { connectionId })
      connections.delete(connectionId)
    }

    ws.onerror = (error) => {
      logger.error("WebSocket error", { wsError: error, connectionId })
      connections.delete(connectionId)
    }

    return NextResponse.json({
      message: "WebSocket connection initiated",
      connectionId,
      status: "connecting"
    })

  } catch (error) {
    logger.error("Failed to establish WebSocket connection", { wsError: error })
    return NextResponse.json(
      { error: "Failed to establish connection" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, symbol, type } = body

    if (!action || !symbol) {
      return NextResponse.json(
        { error: "Action and symbol are required" },
        { status: 400 }
      )
    }

    // 購読情報をSupabaseに保存
    const { error } = await supabase
      .from("realtime_subscriptions")
      .upsert({
        user_id: user.id,
        symbol,
        data_type: type || "ticker",
        action,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: "user_id,symbol,data_type"
      })

    if (error) {
      logger.error("Failed to save subscription", { wsError: error, userId: user.id, symbol, type })
      return NextResponse.json(
        { error: "Failed to save subscription" },
        { status: 500 }
      )
    }

    // 使用量を記録
    try {
      const { recordUsage } = await import("@/lib/ai/usage-limiter")
      await recordUsage(user.id, "realtime_subscriptions", 0, 0, "websocket")
    } catch (error) {
      logger.warn("Failed to record usage", { wsError: error })
    }

    logger.info("Subscription updated", { 
      userId: user.id, 
      symbol, 
      type: type || "ticker", 
      action 
    })

    return NextResponse.json({
      success: true,
      message: `${action} subscription for ${symbol}`,
      symbol,
      type: type || "ticker",
      action
    })

  } catch (error) {
    logger.error("Failed to process subscription request", { wsError: error })
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    )
  }
}

// Server-Sent Events エンドポイント
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const connectionId = searchParams.get("connectionId")

    if (connectionId && connections.has(connectionId)) {
      const ws = connections.get(connectionId)
      if (ws) {
        ws.close()
        connections.delete(connectionId)
      }
    }

    // ユーザーのすべての購読を削除
    const { error } = await supabase
      .from("realtime_subscriptions")
      .delete()
      .eq("user_id", user.id)

    if (error) {
      logger.error("Failed to delete subscriptions", { wsError: error, userId: user.id })
      return NextResponse.json(
        { error: "Failed to delete subscriptions" },
        { status: 500 }
      )
    }

    logger.info("All subscriptions deleted", { 
      userId: user.id, 
      ...(connectionId && { connectionId })
    })

    return NextResponse.json({
      success: true,
      message: "All subscriptions deleted"
    })

  } catch (error) {
    logger.error("Failed to delete subscriptions", { wsError: error })
    return NextResponse.json(
      { error: "Failed to delete subscriptions" },
      { status: 500 }
    )
  }
}