// 🔑 管理者アカウント自動作成API
// 開発環境でのみ動作し、環境変数から管理者情報を取得

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    // 開発環境でのみ実行
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_DEVELOPMENT_MODE !== 'true') {
      return NextResponse.json(
        { error: '本機能は開発環境でのみ利用可能です' },
        { status: 403 }
      );
    }

    // 環境変数チェック
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminFullName = process.env.ADMIN_FULL_NAME;

    if (!adminEmail || !adminPassword || !adminFullName) {
      return NextResponse.json(
        { error: '管理者情報の環境変数が設定されていません' },
        { status: 400 }
      );
    }

    // Supabaseサービスロールクライアント作成
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // 既存管理者チェック
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const adminExists = existingUser?.users?.find(user => user.email === adminEmail);

    if (adminExists) {
      return NextResponse.json({
        success: true,
        message: '管理者アカウントは既に存在します',
        admin: {
          email: adminEmail,
          id: adminExists.id,
          created_at: adminExists.created_at
        }
      });
    }

    // 管理者アカウント作成
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminFullName,
        role: 'admin',
        created_by: 'system'
      }
    });

    if (authError) {
      console.error('管理者アカウント作成エラー:', authError);
      return NextResponse.json(
        { error: `管理者アカウント作成に失敗しました: ${authError.message}` },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'ユーザーデータの取得に失敗しました' },
        { status: 500 }
      );
    }

    // プロファイル作成
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: adminFullName,
        email: adminEmail,
        role: 'admin',
        is_admin: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('プロファイル作成エラー:', profileError);
      // 認証ユーザーは作成されたので警告として処理
    }

    return NextResponse.json({
      success: true,
      message: '管理者アカウントが正常に作成されました',
      admin: {
        email: adminEmail,
        id: authData.user.id,
        full_name: adminFullName,
        role: 'admin',
        created_at: authData.user.created_at
      }
    });

  } catch (error) {
    console.error('管理者セットアップエラー:', error);
    return NextResponse.json(
      { error: '内部サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// GET: 管理者情報確認
export async function GET() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      return NextResponse.json(
        { error: '管理者メールアドレスが設定されていません' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { data: users } = await supabase.auth.admin.listUsers();
    const adminUser = users?.users?.find(user => user.email === adminEmail);

    return NextResponse.json({
      exists: !!adminUser,
      admin: adminUser ? {
        email: adminUser.email,
        id: adminUser.id,
        created_at: adminUser.created_at,
        last_sign_in_at: adminUser.last_sign_in_at
      } : null
    });

  } catch (error) {
    console.error('管理者確認エラー:', error);
    return NextResponse.json(
      { error: '管理者情報の確認に失敗しました' },
      { status: 500 }
    );
  }
}