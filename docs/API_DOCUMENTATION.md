# 🚀 Crypto AI Platform - API Documentation

## 目次
- [概要](#概要)
- [認証](#認証)
- [API エンドポイント](#api-エンドポイント)
- [レスポンス形式](#レスポンス形式)
- [エラーハンドリング](#エラーハンドリング)
- [レート制限](#レート制限)
- [SDKとサンプル](#sdkとサンプル)

## 概要

Crypto AI Platform APIは、暗号通貨投資プラットフォームのすべての機能へのプログラマティックアクセスを提供します。このAPIを使用して、アラート管理、ポートフォリオ分析、AI分析、学習コンテンツへアクセスできます。

### Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

### API バージョン
Current: `v1`

## 認証

### Bearer Token認証
すべてのAPIリクエストには有効なJWTトークンが必要です。

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://your-domain.com/api/alerts
```

### トークン取得
```bash
# ログイン
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# レスポンス
{
  "success": true,
  "data": {
    "user": { ... },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

## API エンドポイント

### 🚨 アラート管理

#### アラート一覧取得
```bash
GET /api/alerts
```

**パラメータ:**
- `page` (optional): ページ番号 (default: 1)
- `limit` (optional): 1ページあたりの件数 (default: 20)
- `type` (optional): アラートタイプでフィルタ
- `severity` (optional): 重要度でフィルタ

**レスポンス:**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "alert_123",
        "type": "PRICE_ABOVE",
        "severity": "medium",
        "symbol": "BTC",
        "message": "Bitcoin price exceeded $50,000",
        "threshold": 50000,
        "currentValue": 51200,
        "triggeredAt": "2025-01-19T10:30:00Z",
        "resolved": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### アラート作成
```bash
POST /api/alerts
Content-Type: application/json

{
  "type": "PRICE_ABOVE",
  "symbol": "ETH",
  "threshold": 3000,
  "severity": "medium",
  "enabled": true,
  "metadata": {
    "email": true,
    "push": true
  }
}
```

#### アラート更新
```bash
PUT /api/alerts/{alertId}
Content-Type: application/json

{
  "threshold": 3500,
  "enabled": false
}
```

#### アラート削除
```bash
DELETE /api/alerts/{alertId}
```

### 📊 ダッシュボードデータ

#### ダッシュボード概要
```bash
GET /api/dashboard
```

**レスポンス:**
```json
{
  "success": true,
  "data": {
    "portfolio": {
      "totalValue": 125000.50,
      "change24h": 2.34,
      "assets": [
        {
          "symbol": "BTC",
          "amount": 2.5,
          "value": 128000,
          "allocation": 45.2
        }
      ]
    },
    "alerts": {
      "total": 25,
      "active": 3,
      "recent": []
    },
    "market": {
      "totalMarketCap": 2340000000000,
      "dominance": {
        "btc": 42.3,
        "eth": 18.7
      },
      "trending": []
    },
    "learning": {
      "progress": 65,
      "completedLessons": 55,
      "totalLessons": 85,
      "currentStreak": 12
    }
  }
}
```

### 🤖 AI分析

#### 市場分析
```bash
POST /api/ai/analyze
Content-Type: application/json

{
  "type": "market_analysis",
  "symbols": ["BTC", "ETH", "ADA"],
  "timeframe": "24h",
  "analysis_depth": "detailed"
}
```

**レスポンス:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "summary": "Market showing bullish trends with strong support levels...",
      "recommendations": [
        {
          "action": "BUY",
          "symbol": "BTC",
          "confidence": 0.85,
          "reasoning": "Technical indicators suggest upward momentum..."
        }
      ],
      "riskAssessment": {
        "overall": "MODERATE",
        "factors": ["volatility", "market_sentiment"]
      }
    },
    "timestamp": "2025-01-19T10:30:00Z"
  }
}
```

#### ポートフォリオ分析
```bash
POST /api/ai/portfolio-analysis
Content-Type: application/json

{
  "portfolio": [
    {
      "symbol": "BTC",
      "amount": 2.5,
      "purchase_price": 45000
    }
  ],
  "analysis_type": "risk_optimization"
}
```

#### チャット
```bash
POST /api/ai/chat
Content-Type: application/json

{
  "message": "BTCの今後の価格予想を教えて",
  "context": {
    "portfolio": true,
    "market_data": true
  }
}
```

### 📚 学習コンテンツ

#### レッスン一覧
```bash
GET /api/learning/lessons?category=crypto-basics&difficulty=beginner
```

#### レッスン詳細
```bash
GET /api/learning/lessons/what-is-cryptocurrency
```

#### 進捗更新
```bash
POST /api/learning/progress
Content-Type: application/json

{
  "lessonId": "lesson_123",
  "status": "completed",
  "timeSpent": 1200,
  "quizScore": 85
}
```

### 💰 決済・サブスクリプション

#### サブスクリプション状況
```bash
GET /api/billing/subscription
```

#### プラン変更
```bash
POST /api/billing/upgrade
Content-Type: application/json

{
  "plan": "pro",
  "billing_cycle": "monthly"
}
```

#### 請求書一覧
```bash
GET /api/billing/invoices
```

### 📊 市場データ

#### 価格データ
```bash
GET /api/market/prices?symbols=BTC,ETH,ADA&currency=USD
```

#### 履歴データ
```bash
GET /api/market/history/BTC?period=7d&interval=1h
```

#### 市場統計
```bash
GET /api/market/stats
```

### 🔒 セキュリティ

#### セキュリティイベント
```bash
GET /api/security/events
```

#### API キー管理
```bash
GET /api/security/api-keys
POST /api/security/api-keys
DELETE /api/security/api-keys/{keyId}
```

## レスポンス形式

### 成功レスポンス
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-19T10:30:00Z",
    "version": "v1"
  }
}
```

### エラーレスポンス
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "field": "symbol",
      "issue": "Symbol 'INVALID' is not supported"
    }
  },
  "meta": {
    "timestamp": "2025-01-19T10:30:00Z",
    "request_id": "req_abc123"
  }
}
```

## エラーハンドリング

### HTTPステータスコード
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error

### エラーコード
- `INVALID_TOKEN` - 無効なJWTトークン
- `EXPIRED_TOKEN` - 期限切れトークン
- `VALIDATION_ERROR` - バリデーションエラー
- `RATE_LIMITED` - レート制限超過
- `INSUFFICIENT_PERMISSIONS` - 権限不足
- `RESOURCE_NOT_FOUND` - リソースが見つからない
- `PAYMENT_REQUIRED` - 有料プラン要求

## レート制限

### 制限値
- **Free プラン**: 100 requests/hour
- **Basic プラン**: 1,000 requests/hour  
- **Pro プラン**: 10,000 requests/hour
- **Enterprise プラン**: 100,000 requests/hour

### ヘッダー
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642694400
```

### 制限超過時
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 1000,
      "reset_at": "2025-01-19T11:00:00Z"
    }
  }
}
```

## SDKとサンプル

### JavaScript/TypeScript SDK
```bash
npm install @crypto-ai-platform/sdk
```

```typescript
import { CryptoAI } from '@crypto-ai-platform/sdk';

const client = new CryptoAI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// アラート作成
const alert = await client.alerts.create({
  type: 'PRICE_ABOVE',
  symbol: 'BTC',
  threshold: 50000
});

// AI分析
const analysis = await client.ai.analyzeMarket({
  symbols: ['BTC', 'ETH'],
  timeframe: '24h'
});
```

### Python SDK
```bash
pip install crypto-ai-platform
```

```python
from crypto_ai_platform import CryptoAI

client = CryptoAI(api_key='your_api_key')

# ポートフォリオ取得
portfolio = client.portfolio.get()

# AI チャット
response = client.ai.chat(
    message="BTCの今後の見通しは？",
    include_portfolio=True
)
```

### cURL examples
```bash
# アラート作成
curl -X POST https://api.cryptoai.com/v1/alerts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "PRICE_ABOVE",
    "symbol": "BTC", 
    "threshold": 50000
  }'

# ダッシュボードデータ取得
curl -H "Authorization: Bearer $TOKEN" \
     https://api.cryptoai.com/v1/dashboard
```

## Webhooks

### 設定
```bash
POST /api/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/crypto-ai",
  "events": ["alert.triggered", "portfolio.updated"],
  "secret": "your_webhook_secret"
}
```

### イベント
- `alert.triggered` - アラートが発火
- `alert.resolved` - アラートが解決
- `portfolio.updated` - ポートフォリオ更新
- `payment.succeeded` - 決済成功
- `subscription.updated` - サブスクリプション変更

### ペイロード例
```json
{
  "event": "alert.triggered",
  "data": {
    "alert_id": "alert_123",
    "symbol": "BTC",
    "type": "PRICE_ABOVE",
    "threshold": 50000,
    "current_value": 51200
  },
  "timestamp": "2025-01-19T10:30:00Z"
}
```

## サポート

### 技術サポート
- **Email**: api-support@cryptoai.com
- **ドキュメント**: https://docs.cryptoai.com
- **Status Page**: https://status.cryptoai.com

### 更新情報
- **Changelog**: https://docs.cryptoai.com/changelog
- **Migration Guide**: https://docs.cryptoai.com/migrations

---

**Last Updated**: 2025-01-19  
**API Version**: v1.0.0