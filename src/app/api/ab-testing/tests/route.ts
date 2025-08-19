// 🧪 A/Bテスト API - テスト管理
// A/Bテストの作成、取得、更新、削除API

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ABTest, ABTestVariant } from '@/lib/ab-testing/types';

interface BatchUpdateRequest {
  action: 'start' | 'pause' | 'stop' | 'archive';
  testIds: string[];
}

// テスト一覧取得
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    // パラメーター取得
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // クエリ構築
    let query = supabase
      .from('ab_tests')
      .select(`
        *,
        variants:ab_test_variants(*),
        results:ab_test_results(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // フィルター適用
    if (status) {
      query = query.eq('status', status);
    }
    if (type) {
      query = query.eq('type', type);
    }

    const { data: tests, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 });
    }

    // 総数取得
    let countQuery = supabase
      .from('ab_tests')
      .select('*', { count: 'exact', head: true });
    
    if (status) countQuery = countQuery.eq('status', status);
    if (type) countQuery = countQuery.eq('type', type);

    const { count } = await countQuery;

    return NextResponse.json({
      tests: tests || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 新しいテスト作成
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 権限チェック（管理者またはマーケター）
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'marketer'].includes(profile.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    
    // バリデーション
    const validationError = validateABTestData(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // テストデータ準備
    const testData = {
      ...body,
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'draft'
    };

    // トランザクション実行
    const { data: test, error: testError } = await supabase
      .from('ab_tests')
      .insert(testData)
      .select()
      .single();

    if (testError) {
      console.error('Test creation error:', testError);
      return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
    }

    // バリアント作成
    const variantData = body.variants.map((variant: ABTestVariant) => ({
      ...variant,
      test_id: test.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { error: variantError } = await supabase
      .from('ab_test_variants')
      .insert(variantData);

    if (variantError) {
      console.error('Variant creation error:', variantError);
      // テストも削除
      await supabase.from('ab_tests').delete().eq('id', test.id);
      return NextResponse.json({ error: 'Failed to create variants' }, { status: 500 });
    }

    // 作成したテストを完全な形で取得
    const { data: fullTest } = await supabase
      .from('ab_tests')
      .select(`
        *,
        variants:ab_test_variants(*)
      `)
      .eq('id', test.id)
      .single();

    return NextResponse.json({ test: fullTest }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// A/Bテストデータのバリデーション
function validateABTestData(data: Partial<ABTest>): string | null {
  // 必須フィールドチェック
  const requiredFields = ['name', 'description', 'type', 'targetAudience', 'variants', 'primaryGoal', 'schedule'];
  for (const field of requiredFields) {
    if (!(data as Record<string, unknown>)[field]) {
      return `Missing required field: ${field}`;
    }
  }

  // バリアントチェック
  if (!Array.isArray(data.variants) || data.variants.length < 2) {
    return 'At least 2 variants are required';
  }

  // バリアント重み合計チェック
  const totalWeight = data.variants?.reduce((sum: number, variant: ABTestVariant) => sum + (variant.weight || 0), 0) || 0;
  if (Math.abs(totalWeight - 100) > 0.1) {
    return 'Variant weights must sum to 100';
  }

  // コントロール群チェック
  const controlVariants = data.variants?.filter((v: ABTestVariant) => v.isControl) || [];
  if (controlVariants.length !== 1) {
    return 'Exactly one control variant is required';
  }

  // ターゲットオーディエンスチェック
  if (!data.targetAudience || data.targetAudience.percentage < 1 || data.targetAudience.percentage > 100) {
    return 'Target audience percentage must be between 1 and 100';
  }

  // 統計設定チェック
  if (data.statistical) {
    if (data.statistical.confidenceLevel < 80 || data.statistical.confidenceLevel > 99) {
      return 'Confidence level must be between 80 and 99';
    }
    if (data.statistical.minimumSampleSize < 100) {
      return 'Minimum sample size must be at least 100';
    }
  }

  // スケジュールチェック
  if (!data.schedule) {
    return 'Schedule is required';
  }
  const startDate = new Date(data.schedule.startDate);
  const endDate = data.schedule.endDate ? new Date(data.schedule.endDate) : null;
  
  if (startDate < new Date()) {
    return 'Start date must be in the future';
  }
  
  if (endDate && endDate <= startDate) {
    return 'End date must be after start date';
  }

  return null;
}

// バッチ処理 - 複数テストの状態更新
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, testIds }: BatchUpdateRequest = await request.json();

    if (!action || !testIds || !Array.isArray(testIds)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };

    switch (action) {
      case 'start':
        updateData.status = 'running';
        updateData.actual_start_date = new Date().toISOString();
        break;
      case 'pause':
        updateData.status = 'paused';
        break;
      case 'stop':
        updateData.status = 'completed';
        updateData.actual_end_date = new Date().toISOString();
        break;
      case 'archive':
        updateData.status = 'archived';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('ab_tests')
      .update(updateData)
      .in('id', testIds)
      .select();

    if (error) {
      console.error('Batch update error:', error);
      return NextResponse.json({ error: 'Failed to update tests' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: `Successfully ${action}ed ${data.length} test(s)`,
      updatedTests: data 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}