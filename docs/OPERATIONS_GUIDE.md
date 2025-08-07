# 🛠️ Crypto AI Platform - 運用ガイド

## 目次
- [システム概要](#システム概要)
- [デプロイメント](#デプロイメント)
- [監視・アラート](#監視アラート)
- [トラブルシューティング](#トラブルシューティング)
- [メンテナンス](#メンテナンス)
- [セキュリティ運用](#セキュリティ運用)
- [バックアップ・復旧](#バックアップ復旧)
- [スケーリング](#スケーリング)

## システム概要

### アーキテクチャ
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudflare    │    │   Next.js App   │    │   Supabase      │
│   Workers       │──→ │   (OpenNext)    │──→ │   PostgreSQL    │
│   + Edge Cache  │    │   Edge Runtime  │    │   + Auth + RLS  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  External APIs  │    │   AI Services   │    │    Stripe       │
│  • CoinGecko    │    │   • OpenAI      │    │   Payments      │
│  • CoinMarketCap│    │   • Anthropic   │    │   + Webhooks    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 主要コンポーネント
- **Frontend**: Next.js 15.4.1 + React 19
- **Backend**: Next.js API Routes + Server Actions
- **Database**: Supabase PostgreSQL + RLS
- **Edge**: Cloudflare Workers + OpenNext
- **AI**: OpenAI GPT-4 + Anthropic Claude
- **Payments**: Stripe + Webhooks
- **Monitoring**: Cloudflare Analytics + Sentry

## デプロイメント

### 🚀 本番デプロイ手順

#### 1. 事前準備
```bash
# 1. プロダクション準備チェック
npm run production:check

# 2. セキュリティスキャン
npm run security:scan

# 3. パフォーマンステスト
npm run test:performance

# 4. E2Eテスト
npm run test:e2e
```

#### 2. 環境変数設定
```bash
# Cloudflare Workers環境変数
wrangler secret put NEXT_PUBLIC_SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_KEY
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put COINMARKETCAP_API_KEY
wrangler secret put SENTRY_DSN
```

#### 3. デプロイ実行
```bash
# ステージング環境
npm run deploy:staging

# 本番環境（確認後）
npm run deploy:production

# 手動デプロイ
wrangler deploy --env production
```

#### 4. デプロイ後検証
```bash
# ヘルスチェック
curl https://your-domain.com/api/health

# 主要エンドポイント確認
curl -H "Authorization: Bearer $TOKEN" https://your-domain.com/api/dashboard

# パフォーマンス監視開始
npm run monitoring:start
```

### 🔄 ロールバック手順

#### 即座のロールバック
```bash
# 前のバージョンに即座にロールバック
wrangler rollback

# 特定バージョンへのロールバック
wrangler deploy --compatibility-date 2025-01-18

# データベーススキーマのロールバック（必要時）
supabase db reset --linked
supabase db push --schema previous_schema.sql
```

#### ロールバック後の確認
```bash
# システム状態確認
npm run health:check

# 重要機能のスモークテスト
npm run test:smoke

# ログ監視
wrangler tail --env production
```

## 監視・アラート

### 📊 監視ダッシュボード

#### Cloudflare Analytics
- **URL**: https://dash.cloudflare.com/your-zone/analytics
- **監視項目**:
  - リクエスト数・レスポンス時間
  - エラー率・帯域幅使用量
  - セキュリティイベント

#### 内蔵監視システム
```bash
# 監視ダッシュボードアクセス
https://your-domain.com/admin/monitoring

# プロダクション監視API
curl https://your-domain.com/api/monitoring/metrics
```

### 🚨 アラート設定

#### 重要アラート
```javascript
// scripts/setup-alerts.js
const criticalAlerts = {
  'high-error-rate': {
    threshold: 5, // 5%以上
    severity: 'critical',
    notification: ['slack', 'email', 'sms']
  },
  'high-response-time': {
    threshold: 5000, // 5秒以上
    severity: 'warning',
    notification: ['slack', 'email']
  },
  'database-down': {
    threshold: 0, // 即座
    severity: 'critical',
    notification: ['slack', 'email', 'sms', 'phone']
  }
};
```

#### Slack通知設定
```bash
# Webhook URL設定
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."

# アラート送信テスト
curl -X POST $SLACK_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"text": "🚨 Production Alert Test"}'
```

### 📈 ログ管理

#### 構造化ログ
```typescript
// lib/monitoring/logger.ts
import { logger } from '@/lib/monitoring/logger';

// APIログ
logger.info('User login successful', {
  userId: user.id,
  ip: request.ip,
  userAgent: request.headers['user-agent'],
  timestamp: new Date().toISOString(),
  action: 'user_login'
});

// エラーログ
logger.error('Database connection failed', {
  error: error.message,
  stack: error.stack,
  query: 'SELECT * FROM users',
  action: 'database_error'
});
```

#### ログ分析
```bash
# Cloudflare Workers ログ
wrangler tail --env production --format pretty

# 特定エラーの検索
wrangler tail --env production | grep "ERROR"

# パフォーマンス分析
wrangler tail --env production | grep "response_time"
```

## トラブルシューティング

### 🚨 一般的な問題と解決策

#### 1. 高レスポンス時間
```bash
# 症状: API応答が5秒以上
# 確認手順:
curl -w "@curl-format.txt" https://your-domain.com/api/health

# 対処法:
# 1. キャッシュ確認
# 2. データベースクエリ最適化
# 3. 外部API呼び出し確認
```

#### 2. データベース接続エラー
```bash
# 症状: "connection refused" エラー
# 確認手順:
curl https://your-supabase-url.supabase.co/rest/v1/health

# 対処法:
# 1. Supabase状態確認
# 2. 接続プール設定確認
# 3. RLS権限確認
```

#### 3. 外部API制限
```bash
# 症状: "rate limit exceeded" エラー
# 確認手順:
curl -H "X-CMC_PRO_API_KEY: $API_KEY" \
     "https://pro-api.coinmarketcap.com/v1/account"

# 対処法:
# 1. API使用量確認
# 2. キャッシュ期間延長
# 3. フォールバック機能確認
```

#### 4. 決済処理エラー
```bash
# 症状: Stripe webhook処理失敗
# 確認手順:
curl https://your-domain.com/api/stripe/webhooks -X POST \
  -H "Stripe-Signature: $SIGNATURE" \
  -d "$TEST_PAYLOAD"

# 対処法:
# 1. Webhook署名確認
# 2. イベント重複処理確認
# 3. 決済状態の手動確認
```

### 🔍 診断コマンド

#### システム全体診断
```bash
# 包括的ヘルスチェック
npm run health:check:full

# パフォーマンス診断
npm run diagnose:performance

# セキュリティ診断
npm run diagnose:security

# 依存関係チェック
npm audit --audit-level high
```

#### 個別コンポーネント診断
```bash
# データベース診断
npm run diagnose:database

# API診断
npm run diagnose:api

# AI サービス診断
npm run diagnose:ai

# 決済システム診断
npm run diagnose:payments
```

## メンテナンス

### 🔧 定期メンテナンス

#### 日次タスク
```bash
#!/bin/bash
# scripts/daily-maintenance.sh

# 1. システム状態確認
npm run health:check

# 2. パフォーマンスレポート生成
npm run report:performance

# 3. セキュリティスキャン
npm run security:scan --severity high

# 4. ログローテーション
npm run logs:rotate

# 5. キャッシュクリーンアップ
npm run cache:cleanup
```

#### 週次タスク
```bash
#!/bin/bash
# scripts/weekly-maintenance.sh

# 1. 依存関係更新チェック
npm audit
npm outdated

# 2. データベース最適化
npm run db:optimize

# 3. フルセキュリティスキャン
npm run security:scan:full

# 4. バックアップ検証
npm run backup:verify

# 5. パフォーマンステスト
npm run test:performance:full
```

#### 月次タスク
```bash
#!/bin/bash
# scripts/monthly-maintenance.sh

# 1. セキュリティ証明書更新
npm run security:certs:renew

# 2. 大規模データクリーンアップ
npm run data:cleanup:old

# 3. 容量計画レビュー
npm run capacity:review

# 4. 災害復旧テスト
npm run disaster:recovery:test

# 5. セキュリティ監査
npm run security:audit:full
```

### 📊 データベースメンテナンス

#### パフォーマンス最適化
```sql
-- インデックス使用状況確認
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public';

-- 未使用インデックス特定
SELECT 
  s.schemaname,
  s.tablename,
  s.indexname,
  s.idx_tup_read,
  s.idx_tup_fetch
FROM pg_stat_user_indexes s
WHERE s.idx_tup_read = 0
  AND s.idx_tup_fetch = 0;

-- 大容量テーブルの vacuum
VACUUM ANALYZE users;
VACUUM ANALYZE user_alerts;
VACUUM ANALYZE market_data;
```

#### データクリーンアップ
```sql
-- 古いログエントリ削除（90日以上）
DELETE FROM system_logs 
WHERE created_at < NOW() - INTERVAL '90 days';

-- 解決済みアラートのアーカイブ（30日以上）
UPDATE user_alerts 
SET archived = true 
WHERE resolved = true 
  AND resolved_at < NOW() - INTERVAL '30 days';

-- 期限切れセッション削除
DELETE FROM user_sessions 
WHERE expires_at < NOW();
```

## セキュリティ運用

### 🔒 セキュリティ監視

#### リアルタイム監視
```bash
# セキュリティイベント監視
tail -f /var/log/security-events.log | grep "CRITICAL"

# 不審なIP監視
npm run security:monitor:ips

# API濫用検出
npm run security:monitor:api-abuse

# 認証失敗監視
npm run security:monitor:auth-failures
```

#### 脆弱性スキャン
```bash
# 定期脆弱性スキャン
npm run security:scan:vulnerabilities

# 依存関係脆弱性チェック
npm audit --audit-level high

# コード品質・セキュリティチェック
npm run security:code-analysis

# Docker イメージスキャン（該当時）
docker scan your-image:latest
```

### 🛡️ インシデント対応

#### セキュリティインシデント手順
1. **検出**: 自動アラートまたは手動確認
2. **評価**: 影響範囲とリスクレベル判定
3. **封じ込め**: 即座の脅威軽減
4. **調査**: 根本原因分析
5. **復旧**: システム正常化
6. **学習**: プロセス改善

#### インシデント対応コマンド
```bash
# 緊急時 - 全API停止
npm run emergency:api:disable

# 特定IPブロック
npm run security:block-ip 192.168.1.100

# セキュリティログ取得
npm run security:logs:export

# ユーザーセッション無効化
npm run security:invalidate-sessions

# データベース接続制限
npm run security:db:restrict-access
```

## バックアップ・復旧

### 💾 バックアップ戦略

#### 自動バックアップ
```bash
# Supabase 自動バックアップ設定確認
supabase backup list

# 手動バックアップ実行
supabase db dump --db-url $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Cloudflare Workers設定バックアップ
wrangler export --name crypto-ai-platform --format json > cf_backup.json
```

#### バックアップ検証
```bash
#!/bin/bash
# scripts/backup-verification.sh

# 1. バックアップファイル整合性確認
sha256sum backup_*.sql > backup_checksums.txt

# 2. リストア테스ト実行
npm run backup:test-restore

# 3. データ整合性確認
npm run backup:verify-integrity

# 4. バックアップサイズ監視
npm run backup:monitor-size
```

### 🔄 災害復旧

#### RTO/RPO目標
- **RTO (Recovery Time Objective)**: 4時間
- **RPO (Recovery Point Objective)**: 1時間

#### 復旧手順
```bash
# 1. 緊急時システム停止
npm run emergency:shutdown

# 2. 最新バックアップからの復旧
npm run disaster:restore --backup-date 2025-01-19

# 3. データ整合性確認
npm run disaster:verify-data

# 4. 段階的サービス復旧
npm run disaster:restore-services

# 5. 全機能テスト
npm run disaster:test-all-functions
```

#### 復旧後検証
```bash
# ヘルスチェック全項目
npm run health:check:comprehensive

# パフォーマンステスト
npm run test:performance:critical

# セキュリティ検証
npm run security:post-recovery-check

# ユーザー受入テスト
npm run test:user-acceptance
```

## スケーリング

### 📈 容量計画

#### 監視指標
```javascript
// 監視対象メトリクス
const scalingMetrics = {
  // パフォーマンス
  responseTime: { warning: 3000, critical: 5000 }, // ms
  throughput: { min: 100, target: 1000 }, // req/sec
  errorRate: { warning: 1, critical: 5 }, // %
  
  // リソース
  cpuUsage: { warning: 70, critical: 85 }, // %
  memoryUsage: { warning: 80, critical: 90 }, // %
  diskUsage: { warning: 80, critical: 90 }, // %
  
  // ビジネス
  activeUsers: { current: 1000, projected: 10000 },
  apiCalls: { current: 100000, projected: 1000000 }, // per day
  dataStorage: { current: 100, projected: 1000 } // GB
};
```

#### スケールアップ条件
```bash
# 自動スケーリング条件
if [[ $CPU_USAGE > 80 && $MEMORY_USAGE > 80 ]]; then
  echo "Scaling up required"
  npm run scale:up
fi

# データベース容量確認
if [[ $DB_SIZE > 80GB ]]; then
  echo "Database scaling required"
  npm run db:scale:up
fi
```

### ⚡ パフォーマンス最適化

#### Edge キャッシュ最適化
```javascript
// wrangler.toml - キャッシュ設定
[env.production]
compatibility_date = "2025-01-19"

[[env.production.kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"

// キャッシュ戦略
const cacheStrategy = {
  api: {
    '/api/market/prices': { ttl: 60 }, // 1分
    '/api/dashboard': { ttl: 300 }, // 5分
    '/api/learning/lessons': { ttl: 3600 } // 1時間
  }
};
```

#### データベース最適化
```sql
-- 接続プール設定
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '1GB';
ALTER SYSTEM SET effective_cache_size = '4GB';

-- インデックス最適化
CREATE INDEX CONCURRENTLY idx_user_alerts_user_id_created 
ON user_alerts(user_id, created_at DESC);

CREATE INDEX CONCURRENTLY idx_market_data_symbol_timestamp 
ON market_data(symbol, timestamp DESC);
```

## 運用チェックリスト

### ✅ 日次運用チェックリスト
- [ ] システム稼働状況確認
- [ ] エラーログレビュー
- [ ] パフォーマンス指標確認
- [ ] セキュリティアラート確認
- [ ] バックアップ実行確認
- [ ] 外部API制限状況確認
- [ ] ユーザーサポート問い合わせ対応

### ✅ 週次運用チェックリスト
- [ ] 詳細パフォーマンスレポート作成
- [ ] セキュリティスキャン実行
- [ ] 依存関係脆弱性チェック
- [ ] キャパシティ使用状況レビュー
- [ ] データベース最適化実行
- [ ] 機能利用統計レビュー
- [ ] ユーザーフィードバック分析

### ✅ 月次運用チェックリスト
- [ ] 包括的セキュリティ監査
- [ ] 災害復旧テスト実行
- [ ] 容量計画レビュー・更新
- [ ] SLAパフォーマンスレビュー
- [ ] コスト最適化レビュー
- [ ] 技術負債評価・対応計画
- [ ] チーム教育・トレーニング実施

## 緊急連絡先

### 🆘 エスカレーション手順
1. **Level 1**: 自動アラート対応（5分以内）
2. **Level 2**: オンコール担当者連絡（15分以内）
3. **Level 3**: チームリーダー連絡（30分以内）
4. **Level 4**: 経営陣連絡（1時間以内）

### 📞 連絡先
- **オンコール**: +81-XX-XXXX-XXXX
- **Slack**: #alerts-production
- **Email**: ops-team@company.com
- **Status Page**: https://status.cryptoai.com

---

**運用担当者は必ずこのガイドを熟読し、定期的に手順を確認・更新してください。**

**Last Updated**: 2025-01-19  
**Document Version**: 1.0.0