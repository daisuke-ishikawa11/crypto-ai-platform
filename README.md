# 🚀 Crypto AI Platform

## 📋 概要

**次世代暗号通貨投資プラットフォーム** - 85レッスンの包括的学習コンテンツと高度なAI機能を提供する投資教育プラットフォーム

### 🎯 主要機能

- **85レッスンの学習システム** - 投資基礎から高度な戦略まで体系的学習
- **AI投資分析** - OpenAI/Anthropic統合による高度な市場分析
- **スマートアラートシステム** - リアルタイム価格・リスク・DeFi監視
- **ポートフォリオ最適化** - 量子アルゴリズムによる最適化
- **説明可能AI** - 投資判断の根拠を明確に説明

### 🏗️ 技術スタック

- **Frontend**: Next.js 15.4.1 + React 19 + TypeScript
- **Backend**: Next.js API Routes + Server Actions
- **Database**: Supabase PostgreSQL + RLS
- **Edge**: Cloudflare Workers + OpenNext
- **AI**: OpenAI GPT-4 + Anthropic Claude
- **Payments**: Stripe + Webhooks
- **Styling**: Tailwind CSS + shadcn/ui

## 🚀 クイックスタート

### 前提条件

- Node.js 18.0.0+
- npm 8.0.0+
- Supabase アカウント
- Cloudflare アカウント

### 環境設定

1. **リポジトリクローン**
```bash
git clone https://github.com/your-org/crypto-ai-platform.git
cd crypto-ai-platform
```

2. **依存関係インストール**
```bash
npm install
```

3. **環境変数設定**
```bash
cp .env.example .env.local
# 必要なAPIキーを設定
```

4. **データベースセットアップ**
```bash
# Supabase マイグレーション
supabase db push

# データシード
npm run db:seed
```

5. **開発サーバー起動**
```bash
npm run dev
```

## 📚 ドキュメント

### 開発者向け
- [API Documentation](./docs/API_DOCUMENTATION.md) - APIエンドポイント詳細
- [Architecture Guide](./CLAUDE.md) - システム設計・開発ガイド

### 運用者向け
- [Operations Guide](./docs/OPERATIONS_GUIDE.md) - 運用・監視ガイド

## 🧪 テスト

### テスト実行
```bash
# 全テスト実行
npm test

# ユニットテスト
npm run test:unit

# 統合テスト
npm run test:integration

# E2Eテスト
npm run test:e2e

# テストカバレッジ
npm run test:coverage
```

### 品質チェック
```bash
# TypeScript型チェック
npm run type-check

# ESLint
npm run lint

# セキュリティスキャン
npm run security:scan

# パフォーマンステスト
npm run test:performance
```

## 🚀 デプロイメント

### ステージング環境
```bash
npm run deploy:staging
```

### 本番環境
```bash
# プロダクション準備チェック
npm run production:check

# 本番デプロイ
npm run deploy:production
```

### Cloudflare Workers
```bash
# Workers デプロイ
wrangler deploy --env production

# 環境変数設定
wrangler secret put OPENAI_API_KEY
```

## 📊 学習コンテンツ

### 5つのカテゴリー（85レッスン）

1. **投資基礎・金融リテラシー** (2レッスン)
2. **暗号通貨の基礎** (12レッスン)
3. **トレーディング基礎** (20レッスン)
4. **DeFi・NFT入門** (17レッスン)
5. **高度な投資戦略** (34レッスン)

## 🔒 セキュリティ

### 実装済みセキュリティ機能
- **認証**: Supabase Auth + JWT
- **認可**: Row Level Security (RLS)
- **入力検証**: Zod + サニタイゼーション
- **セキュリティヘッダー**: CSP, HSTS, X-Frame-Options
- **CSRF対策**: トークンベース保護
- **レート制限**: API使用量制限
- **監査ログ**: セキュリティイベント記録

## 📈 パフォーマンス

### 最適化項目
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **バンドルサイズ**: < 500KB (gzipped)
- **API応答時間**: < 100ms (95%ile)
- **キャッシュ戦略**: CDN + アプリケーション層

## 🏆 主要な達成項目

✅ **完全なフルスタック実装**
- Next.js 15 + React 19 による最新フロントエンド
- TypeScript strict モードによる型安全性
- Supabase によるスケーラブルなバックエンド

✅ **高度なAI統合**
- OpenAI GPT-4 + Anthropic Claude による二重AI分析
- 説明可能AI による投資判断の透明性
- コンテキスト対応チャットシステム

✅ **包括的なアラートシステム**
- 20種類以上のアラート監視
- リアルタイム価格・技術指標・リスク監視
- マルチチャネル通知対応

✅ **エンタープライズレベルのセキュリティ**
- Row Level Security による完全なデータ保護
- 包括的な入力検証・サニタイゼーション
- セキュリティ監査・脆弱性スキャン

✅ **プロダクション対応インフラ**
- Cloudflare Workers + Edge Runtime
- リアルタイム監視・アラートシステム
- 自動スケーリング・負荷分散

✅ **完全なテストカバレッジ**
- ユニット・統合・E2Eテスト
- パフォーマンス・セキュリティテスト
- 継続的インテグレーション

**Built with ❤️ by the Crypto AI Platform Team**
