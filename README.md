# 🚀 Crypto AI Platform

## 📋 概要

**包括的暗号通貨学習プラットフォーム** - 270レッスン・8カテゴリーの学習コンテンツと高度なAI機能を提供する次世代投資教育プラットフォーム

### 🎯 主要機能

- **270レッスンの学習システム** - 8カテゴリーにわたる包括的投資教育
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

- **Node.js 18.0.0+** - ランタイム環境
- **npm 8.0.0+** - パッケージ管理
- **Supabase アカウント** - バックエンドサービス [必須]
- **OpenAI APIキー** - AI機能 [必須]
- **Vercel/Cloudflare アカウント** - デプロイ用 [推奨]

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
- **[開発スタートガイド](./start-here.md)** - 新しい開発者向けの包括的ガイド 🚀
- **[タスク管理システム](./tasks/)** - プロジェクトタスクの構造的管理 📋
- [API Documentation](./docs/API_DOCUMENTATION.md) - APIエンドポイント詳細
- [Architecture Guide](./CLAUDE.md) - システム設計・開発ガイド

### 運用者向け
- [Operations Guide](./docs/OPERATIONS_GUIDE.md) - 運用・監視ガイド
- Prometheus/Grafana 連携（メトリクス監視）

#### メトリクス有効化（Prometheus互換）
```
METRICS_ENABLED=true
METRICS_REQUIRE_TOKEN=true
METRICS_TOKEN=＜強固なランダムトークン＞
BUSINESS_METRICS_ENABLED=true
BUSINESS_METRICS_TTL_MS=60000
```
- エンドポイント: `GET /api/metrics`（`text/plain; version=0.0.4`）
- 主なメトリクス
  - Export: `export_requests_total`, `export_requests_errors_total`, `export_request_duration_seconds_bucket`
  - Webhooks: `webhook_requests_total`, `webhook_requests_errors_total`, `webhook_request_duration_seconds_bucket`, `webhook_invalid_signature_total{provider=...}`
  - Analytics: `analytics_requests_total`, `analytics_request_duration_seconds_bucket`, `analytics_invalid_signature_rate_pp_bucket{scope="overall|provider"}`, `analytics_invalid_signature_threshold_breaches_total{scope="overall|provider"}`
  - Alerts (Slack/Discord 共通): `alerts_send_total{channel=slack|discord,outcome=success|error|skipped,severity}`, `alerts_send_retry_attempts_total{reason=http|exception,status?}`, `alerts_send_duration_seconds_bucket`, `alerts_dropped_total{reason=rate_limit|cooldown|quiet_hours,channel,severity}`, `alerts_message_truncated_total{channel}`
  - Business KPI: `business_active_subscribers_total`, `business_trial_subscribers_total`, `business_revenue_today_total{currency}`, `business_revenue_30d_total{currency}`

#### 通知チャネル切替（Slack ⇔ Discord）
- 環境変数で切替:
```
# Discordのみ
ALERTS_WEBHOOK_TARGET=discord
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
WEBHOOK_INVALID_SIG_SLACK_ALERT=true

# Slackのみ
ALERTS_WEBHOOK_TARGET=slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
WEBHOOK_INVALID_SIG_SLACK_ALERT=true

# 両方
ALERTS_WEBHOOK_TARGET=both
SLACK_WEBHOOK_URL=...
DISCORD_WEBHOOK_URL=...
WEBHOOK_INVALID_SIG_SLACK_ALERT=true
```
- 任意のリトライ設定（Discord）
```
ALERTS_DISCORD_MAX_RETRIES=2
ALERTS_DISCORD_RETRY_DELAY_MS=300
```
- 備考: Webhook URLはプレーンなURLで設定（`<` `>` で囲まない）。

#### Grafanaダッシュボード（雛形）
- 位置: `monitoring/grafana/notifications-analytics-dashboard.json`
- インポート後、Prometheusデータソースを割り当て
- テンプレ変数（channel / severity）で各パネルを絞り込み可能
- 主要パネル:
  - Alert Send Retry Attempts (rps)
  - Alert Send Duration p95 (s)
  - Alerts Dropped (by reason)
  - Alert Send Success Rate (%) by channel
  - Business（`crypto-ai-overview.json`）: Active/Trial Subscribers, Revenue Today/30d

#### Prometheus 構成（Compose）
- `monitoring/prometheus/prometheus.yml` を使用。
- シークレットファイル: `monitoring/prometheus/secrets/metrics_token` を作成し、`METRICS_TOKEN` と同一値を保存。
- Docker Compose はこのファイルを `/etc/prometheus/secrets/metrics_token` にマウントします。

### 通知（Slack/Discord）運用ガイド

#### 深夜帯抑制（DND）と重大度（severity）
- クワイエットアワー設定（例 23:00-07:00）
```
ALERTS_DND_WINDOW=23:00-07:00
```
- 重大度に基づく送信制御
  - `critical`: DNDを自動バイパス（深夜でも送信）
  - `high`: しきい値超過や個別プロバイダ違反時の既定
  - `normal/low`: 通常通知（DND適用）

#### レート制限・クールダウン（送信抑制）
```
# 1分あたり送信上限（共通）
ALERTS_RATE_LIMIT_MAX_PER_MINUTE=60
# 送信間のグローバルクールダウン（秒）
ALERTS_GLOBAL_COOLDOWN_SEC=30
```
- 送信が抑制された場合のメトリクス: `alerts_dropped_total{reason=rate_limit|cooldown}`

#### メッセージ長の安全制限（過長メッセージの省略）
```
ALERTS_DISCORD_MAX_LENGTH=1800
ALERTS_SLACK_MAX_LENGTH=3000
```
- 省略が発生した場合のメトリクス: `alerts_message_truncated_total{channel}`

#### レート制限(429)時のリトライ
- Slack/Discordともに `Retry-After` ヘッダを優先して待機、未設定時は指数バックオフ
```
ALERTS_DISCORD_MAX_RETRIES=2
ALERTS_DISCORD_RETRY_DELAY_MS=300
ALERTS_SLACK_MAX_RETRIES=2
ALERTS_SLACK_RETRY_DELAY_MS=300
```

#### アナリティクス自動アラートのseverity
- しきい値・異常検知に応じて自動で `critical/high/normal` を設定
- `critical` はDND自動バイパス

#### テスト送信用API（運用・QA向け）
- エンドポイント: `POST /api/alerts/test`
  - Alertmanager互換Webhook: `POST /api/alerts/alertmanager`（ヘッダ `X-Alertmanager-Token: ${ALERTMANAGER_SHARED_SECRET}`）
    - 例:
    ```
    curl -X POST http://localhost:3000/api/alerts/alertmanager \
      -H "Content-Type: application/json" \
      -H "X-Alertmanager-Token: $ALERTMANAGER_SHARED_SECRET" \
      -d '{
        "status":"firing",
        "alerts":[{"labels":{"alertname":"HighCPU","severity":"critical"},"annotations":{"summary":"CPU > 90%"}}]
      }'
    ```
- 例:
```
curl -X POST http://localhost:3000/api/alerts/test \
  -H "Content-Type: application/json" \
  -d '{
    "target":"discord",
    "message":"Test alert",
    "labels": {"env":"staging"},
    "severity":"high",
    "bypassDnd": false
  }'
```
- 本番等環境では `profiles.role in [admin, analyst, system]` が必要
- テスト環境は無認証で許可（CI向け）

## 🧪 テスト

### テスト実行
```bash
# 全テスト実行
npm test

# ユニットテスト
npm run test:unit

# 統合テスト
npm run test:integration

# メトリクス有効時に実行する例
METRICS_ENABLED=true npm run test:integration

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

### 独立アプリとしてのデプロイ

#### Vercelへのデプロイ
```bash
# Vercel CLIインストール
npm i -g vercel

# プロジェクトセットアップ
vercel

# 環境変数設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
vercel env add JWT_SECRET

# デプロイ
vercel --prod
```

#### Netlifyへのデプロイ
```bash
# Netlify CLIインストール
npm i -g netlify-cli

# ビルド
npm run build

# デプロイ
netlify deploy --prod --dir=.next
```

#### セルフホスティング
```bash
# Dockerでの実行
docker build -t crypto-ai-platform .
docker run -p 3000:3000 --env-file .env.local crypto-ai-platform

# またはPM2での実行
npm run build
npm i -g pm2
pm2 start npm --name "crypto-ai-platform" -- start
```

### Cloudflare Workers
```bash
# Workers デプロイ
wrangler deploy --env production

# 環境変数設定
wrangler secret put OPENAI_API_KEY
```

## 📊 学習コンテンツ

### 8つのカテゴリー（270レッスン）

1. **金融リテラシー** (25レッスン) - 投資の基礎からリスク管理まで
2. **暗号通貨の基礎** (50レッスン) - ビットコインからアルトコインまで
3. **ブロックチェーン技術** (20レッスン) - 技術的基盤の理解
4. **トレーディング基礎** (37レッスン) - テクニカル分析から実戦まで
5. **DeFi・NFT** (35レッスン) - 分散型金融とNFTの実践
6. **リスク管理** (25レッスン) - ポートフォリオ管理とリスクコントロール
7. **高度な投資戦略** (60レッスン) - 量的分析から代替投資まで
8. **規制・コンプライアンス** (15レッスン) - 法的コンプライアンスと税務

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
