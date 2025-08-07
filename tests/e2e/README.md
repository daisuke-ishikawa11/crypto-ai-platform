# E2E Tests - 暗号通貨AIプラットフォーム

## 概要

このディレクトリには、Playwrightを使用した包括的なEnd-to-End（E2E）テストが含まれています。
PROJECT_EXECUTION_RULES.mdに従い、**すべてのテストは実際のAPIとの統合を行い、モックやダミーデータは一切使用していません**。

## テスト構成

### 1. 認証フロー (`auth.spec.ts`)
- ランディングページの表示確認
- ログインページへの遷移
- 無効な認証情報でのエラー表示
- 登録ページへの遷移とフォーム検証
- 保護されたルートへのアクセス制限

### 2. 主要機能 (`main-features.spec.ts`)
- ダッシュボード構造
- 市場分析機能
- AIチャット機能
- 説明可能なAI機能
- 料金プランの表示
- ナビゲーション動作
- レスポンシブデザイン
- エラーハンドリング

### 3. パフォーマンス (`performance.spec.ts`)
- ページ読み込み時間（3秒以内）
- 認証ページの高速読み込み
- 画像の適切な読み込み
- ネットワーク遅延への対応
- フォーム操作の応答性
- ナビゲーションの滑らかさ
- メモリリークの防止
- APIレスポンス時間

## テスト実行方法

### 基本的な実行
```bash
npm run test:e2e
```

### UIモードで実行（インタラクティブ）
```bash
npm run test:e2e:ui
```

### デバッグモード
```bash
npm run test:e2e:debug
```

### ブラウザを表示して実行
```bash
npm run test:e2e:headed
```

## 環境設定

### 必要な環境変数
テスト実行には以下の環境変数が必要です：

```env
# .env.test.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
BASE_URL=http://localhost:3000
```

### テストユーザー
実際のテストでは、専用のテストユーザーアカウントを作成して使用することを推奨します。

## 品質基準

### パフォーマンス基準
- 初期読み込み: 3秒以内
- ページ遷移: 1秒以内
- API応答: 5秒以内
- フォーム操作: 500ms以内

### カバレッジ
- 主要ユーザーフロー: 100%
- エラーケース: 包括的にカバー
- レスポンシブデザイン: モバイル・タブレット・デスクトップ

## CI/CD統合

GitHub ActionsやGitLab CIなどのCI/CDパイプラインに統合する場合：

```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e
  env:
    CI: true
```

## トラブルシューティング

### ブラウザがインストールされていない場合
```bash
npx playwright install
```

### タイムアウトエラー
- ネットワーク接続を確認
- `playwright.config.ts`でタイムアウト設定を調整

### 認証エラー
- Supabase接続情報を確認
- テストユーザーの作成を確認

## ベストプラクティス

1. **実データの使用**: モックやスタブは使用せず、実際のAPIと統合
2. **独立性**: 各テストは他のテストに依存しない
3. **クリーンアップ**: テスト後のデータクリーンアップ
4. **明確なアサーション**: 期待値を明確に定義
5. **エラーハンドリング**: 失敗時の詳細なエラー情報

## 拡張方法

新しいテストを追加する場合：

1. `tests/e2e/`ディレクトリに新しい`.spec.ts`ファイルを作成
2. `test.describe`でテストをグループ化
3. 実際のユーザー操作をシミュレート
4. 明確なアサーションで結果を検証

例：
```typescript
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test('should perform expected action', async ({ page }) => {
    await page.goto('/new-feature');
    // 実際の操作とアサーション
  });
});
``` 