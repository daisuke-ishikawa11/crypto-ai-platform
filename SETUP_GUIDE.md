# セットアップガイド - 暗号通貨AIプラットフォーム

## 環境変数の設定

本プロジェクトを動作させるには、以下の環境変数の設定が必要です。

### 1. `.env.local`ファイルの作成

プロジェクトルートに`.env.local`ファイルを作成し、以下の内容を記入してください：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Anthropic Configuration  
ANTHROPIC_API_KEY=your_anthropic_api_key

# CoinGecko Configuration
COINGECKO_API_KEY=your_coingecko_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. 各サービスのセットアップ

#### Supabase
1. [Supabase](https://supabase.com)でアカウントを作成
2. 新しいプロジェクトを作成
3. Project Settings > APIから以下を取得：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### OpenAI
1. [OpenAI Platform](https://platform.openai.com)でアカウントを作成
2. API Keysページから新しいキーを生成
3. 生成されたキーを`OPENAI_API_KEY`に設定

#### Anthropic
1. [Anthropic Console](https://console.anthropic.com)でアカウントを作成
2. API Keysから新しいキーを生成
3. 生成されたキーを`ANTHROPIC_API_KEY`に設定

#### CoinGecko
1. [CoinGecko API](https://www.coingecko.com/en/api)でアカウントを作成
2. 無料プランでも可（レート制限あり）
3. API Keyを`COINGECKO_API_KEY`に設定

## データベースのセットアップ

### Supabaseでのデータベース作成

1. Supabaseダッシュボードにログイン
2. SQL Editorに移動
3. 以下のコマンドでマイグレーションを実行：

```bash
# ローカルでマイグレーションファイルを確認
cd crypto-ai-platform-v2/crypto-ai-platform
ls supabase/migrations/
```

各マイグレーションファイルの内容をSupabaseのSQL Editorで実行してください。

## テストの実行

### E2Eテストの実行

```bash
# 開発サーバーを起動
npm run dev

# 別のターミナルでE2Eテストを実行
npm run test:e2e
```

### テスト環境の要件

- Node.js 18以上
- 環境変数が正しく設定されていること
- Supabaseプロジェクトが稼働していること
- 開発サーバーが起動していること（ポート3000）

## トラブルシューティング

### "Missing Supabase environment variables"エラー

`.env.local`ファイルが存在し、正しい値が設定されているか確認してください。

### データベース接続エラー

1. Supabaseプロジェクトが稼働しているか確認
2. 環境変数のURLとキーが正しいか確認
3. ネットワーク接続を確認

### API制限エラー

無料プランを使用している場合、API呼び出し回数に制限があります：
- OpenAI: 月間制限あり
- CoinGecko: 1分あたり10-50リクエスト（プランによる）
- Anthropic: 月間制限あり

## 本番環境へのデプロイ

1. Vercelなどのホスティングサービスを使用
2. 環境変数を本番環境用に設定
3. データベースマイグレーションを本番環境で実行
4. カスタムドメインを設定（オプション）

詳細なデプロイ手順は、使用するホスティングサービスのドキュメントを参照してください。 