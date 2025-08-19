import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { LineIntegrationService } from '@/lib/services/line-integration'

/**
 * LINE連携開始エンドポイント
 * QRコード経由でのLINE連携フローを処理
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state') // CSRF protection
    const lineUserId = searchParams.get('userId')

    if (!code) {
      return NextResponse.json(
        { error: 'Missing connection code' },
        { status: 400 }
      )
    }

    // 連携コードの検証（データベースから取得）
    const supabase = await createClient()
    const { data: connectionRequest, error } = await supabase
      .from('line_connection_requests')
      .select('*')
      .eq('code', code)
      .eq('status', 'pending')
      .single()

    if (error || !connectionRequest) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/alerts/settings?error=invalid_code`
      )
    }

    // 有効期限チェック（15分以内）
    const expiryTime = new Date(connectionRequest.created_at)
    expiryTime.setMinutes(expiryTime.getMinutes() + 15)
    
    if (new Date() > expiryTime) {
      await supabase
        .from('line_connection_requests')
        .update({ status: 'expired' })
        .eq('code', code)

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/alerts/settings?error=code_expired`
      )
    }

    // LINEユーザーIDが提供された場合、連携を完了
    if (lineUserId) {
      const lineService = new LineIntegrationService()
      await lineService.linkUserAccount(connectionRequest.user_id, lineUserId)

      // 連携リクエストを完了状態に更新
      await supabase
        .from('line_connection_requests')
        .update({ 
          status: 'completed',
          line_user_id: lineUserId,
          completed_at: new Date().toISOString()
        })
        .eq('code', code)

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/alerts/settings?success=line_connected`
      )
    }

    // LINEユーザーIDがない場合は、LINE認証フローにリダイレクト
    const lineAuthUrl = generateLineAuthUrl(code)
    return NextResponse.redirect(lineAuthUrl)

  } catch (error) {
    console.error('LINE connection error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/alerts/settings?error=connection_failed`
    )
  }
}

/**
 * LINE連携リクエスト作成エンドポイント
 * フロントエンドから連携開始要求を受け付け
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 既存の連携確認
    const { data: existingConnection } = await supabase
      .from('user_line_connections')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (existingConnection) {
      return NextResponse.json({
        success: false,
        error: 'LINE account is already connected',
        message: 'LINEアカウントは既に連携されています'
      })
    }

    // 連携コード生成
    const connectionCode = crypto.randomUUID()
    
    // 連携リクエストを保存
    const { error } = await supabase
      .from('line_connection_requests')
      .insert({
        code: connectionCode,
        user_id: user.id,
        status: 'pending',
        created_at: new Date().toISOString()
      })

    if (error) throw error

    // QRコード用URL生成
    const connectionUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/line/connect?code=${connectionCode}`
    
    // LINE友達追加URL（オプション）
    const lineAddFriendUrl = `https://line.me/R/ti/p/${process.env.LINE_BOT_BASIC_ID}`

    return NextResponse.json({
      success: true,
      connectionCode,
      connectionUrl,
      qrCodeUrl: connectionUrl, // QRコード生成用
      lineAddFriendUrl,
      expiresIn: 900, // 15分
      message: '連携コードを生成しました。QRコードをスキャンしてLINE連携を完了してください。'
    })

  } catch (error) {
    console.error('Failed to create LINE connection request:', error)
    return NextResponse.json(
      { 
        error: 'Failed to initiate LINE connection',
        message: 'LINE連携の開始に失敗しました'
      },
      { status: 500 }
    )
  }
}

/**
 * LINE連携状況確認エンドポイント
 */
export async function GET_STATUS(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 連携状況を取得
    const { data: connection } = await supabase
      .from('user_line_connections')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const isConnected = connection && connection.status === 'active'

    return NextResponse.json({
      connected: isConnected,
      connectionInfo: isConnected ? {
        linkedAt: connection.linked_at,
        lastUsed: connection.last_message_sent
      } : null
    })

  } catch (error) {
    console.error('Failed to get LINE connection status:', error)
    return NextResponse.json(
      { error: 'Failed to get connection status' },
      { status: 500 }
    )
  }
}

/**
 * LINE認証URL生成
 */
function generateLineAuthUrl(connectionCode: string): string {
  const lineChannelId = process.env.LINE_CHANNEL_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/line/callback`
  const state = connectionCode // CSRF protection

  return `https://access.line.me/oauth2/v2.1/authorize?` +
    `response_type=code&` +
    `client_id=${lineChannelId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `state=${state}&` +
    `scope=profile%20openid`
}
