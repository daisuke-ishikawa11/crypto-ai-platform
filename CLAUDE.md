# 🚀 Crypto AI Platform - 開発ガイド

## 📋 LPページ変更管理ルール

### 🚫 重要な制限事項
**LPページ（`D:\crypto-ai-platform\preview.html`）は正式採用済みのため、以下のルールに従うこと:**

1. **事前許可必須**: LPページへの変更は、ユーザーの明示的な許可なしに絶対に行わない
2. **現状維持**: 採用されたデザイン・文言・構成・機能を維持する
3. **影響範囲確認**: 変更前に必ず影響範囲を説明し、承認を得る

### ✅ 許可される作業
- **情報提供**: 現在の内容について質問への回答
- **技術説明**: 実装方法やコード構造の説明
- **バックアップ**: ファイルの読み取り・確認作業
- **他ファイル作業**: LP以外のファイルでの開発作業

### 📝 変更プロセス
1. **変更提案**: 具体的な変更内容を説明
2. **理由説明**: 変更の必要性・メリットを明示
3. **承認待ち**: ユーザーからの明示的な許可を取得
4. **実行**: 承認後に慎重に変更実施

---

## 📋 プロジェクト概要

**暗号通貨AIプラットフォーム** - 85レッスンの包括的学習コンテンツと高度なAI機能を提供する次世代投資教育プラットフォーム

### 🎯 主要機能
- **85レッスンの学習コンテンツ**: 投資基礎から高度な投資戦略まで
- **AI チャット機能**: OpenAI/Anthropic統合による投資相談
- **市場分析**: リアルタイム暗号通貨市場データ
- **リスク管理**: ポートフォリオ最適化とリスク分析
- **説明可能AI**: 投資判断の根拠を明確に説明

---

## 🏗️ 技術スタック

### フロントエンド
- **Next.js 15.4.1** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** + shadcn/ui
- **Zustand** + TanStack Query (状態管理)
- **React 19.1.0**

### バックエンド
- **Supabase** (PostgreSQL + Auth + RLS)
- **Next.js API Routes** + Server Actions
- **OpenAI GPT-4** / **Anthropic Claude**
- **Sentry** (エラー監視)

### 開発・テスト
- **Playwright** (E2Eテスト)
- **ESLint** + TypeScript
- **Textlint** (日本語文書校正)

---

## 📚 学習コンテンツ構造

### 5つのカテゴリー（85レッスン）
1. **投資基礎・金融リテラシー** (2レッスン)
2. **暗号通貨の基礎** (12レッスン)
3. **トレーディング基礎** (20レッスン)
4. **DeFi・NFT入門** (17レッスン)
5. **高度な投資戦略** (34レッスン)

### レッスン形式
```typescript
interface Lesson {
  id: string
  categoryId: string
  title: string
  slug: string
  description: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  orderIndex: number
  content: {
    sections: LessonSection[]
    keyPoints: string[]
    summary: string
  }
}
```

---

## 🔧 開発コマンド

### 基本コマンド
```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 型チェック
npm run type-check

# リンター実行
npm run lint

# E2Eテスト実行
npm run test:e2e
```

### 学習コンテンツ関連
```bash
# 学習コンテンツのシード
POST /api/learning/seed

# レッスン取得
GET /api/learning/lessons

# 特定レッスン取得
GET /api/learning/lessons/[slug]
```

---

## 📁 ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # 認証ページ
│   ├── dashboard/         # ダッシュボード
│   ├── learning/          # 学習コンテンツ
│   └── ...
├── components/            # UIコンポーネント
│   ├── ui/               # shadcn/ui基本コンポーネント
│   ├── market/           # 市場分析コンポーネント
│   ├── risk/             # リスク管理コンポーネント
│   └── ...
├── data/                  # 学習コンテンツデータ
│   └── lessons/          # レッスンデータ
│       ├── financial-literacy/
│       ├── crypto-basics/
│       ├── trading-basics/
│       ├── defi-nft/
│       └── advanced-investment/
├── lib/                   # ユーティリティ・サービス
│   ├── ai/               # AI関連機能
│   ├── market/           # 市場データ
│   ├── risk/             # リスク管理
│   └── supabase/         # Supabase設定
└── types/                 # TypeScript型定義
```

---

## 🔐 環境設定

### 必須環境変数
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# CoinMarketCap
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key

# Sentry
SENTRY_DSN=your_sentry_dsn
```

---

## 📊 データベース構造

### 主要テーブル
- **users** - ユーザー情報
- **user_lesson_progress** - 学習進捗
- **user_quiz_attempts** - クイズ回答履歴
- **user_achievements** - 実績・バッジ
- **user_learning_streaks** - 学習ストリーク
- **market_data** - 市場データ
- **risk_profiles** - リスクプロファイル

### マイグレーション
```bash
# マイグレーション実行
supabase db push

# リセット
supabase db reset
```

---

## 🧪 テスト戦略

### E2Eテスト
```typescript
// tests/e2e/learning.spec.ts
test('should complete lesson and track progress', async ({ page }) => {
  await page.goto('/learning/lessons/what-is-cryptocurrency')
  // レッスン完了のテスト
})
```

### テストカバレッジ目標
- **コードカバレッジ**: 80%以上
- **重要機能**: 95%以上
- **E2Eテスト**: 主要ユーザーフロー100%

---

## 🚀 デプロイ・CI/CD

### Vercel設定
```json
{
  "version": 2,
  "build": {
    "env": {
      "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
    }
  }
}
```

### 自動テスト
- **プルリクエスト**: 自動E2Eテスト実行
- **デプロイ前**: 全テストスイート実行
- **本番監視**: Sentryによるエラー監視

---

## 🔍 コード品質ガイドライン

### TypeScript
```typescript
// ✅ 推奨: 明示的な型定義
interface LessonProgress {
  userId: string
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  progressPercentage: number
}

// ❌ 非推奨: any型の使用
function processData(data: any) { ... }
```

### コンポーネント設計
```typescript
// ✅ 推奨: Props型定義
interface LessonCardProps {
  lesson: Lesson
  onStart: (lessonId: string) => void
  isCompleted: boolean
}

export function LessonCard({ lesson, onStart, isCompleted }: LessonCardProps) {
  // ...
}
```

---

## 📈 パフォーマンス最適化

### 重要指標
- **初期読み込み**: 2秒以内
- **API応答**: 100ms以内
- **JSバンドル**: 500KB以下

### 最適化手法
- **コード分割**: 動的インポート活用
- **画像最適化**: Next.js Image最適化
- **キャッシュ**: TanStack Query活用
- **レイジーローディング**: コンポーネント遅延読み込み

---

## 🔒 セキュリティ対策

### 認証・認可
```typescript
// Row Level Security (RLS)
CREATE POLICY "Users can only access their own progress"
ON user_lesson_progress
FOR ALL USING (auth.uid() = user_id);
```

### 入力検証
```typescript
import { z } from 'zod'

const lessonSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced'])
})
```

---

## 🎯 運用・監視

### ログ管理
```typescript
import { logger } from '@/lib/monitoring/logger'

logger.info('Lesson completed', {
  userId: user.id,
  lessonId: lesson.id,
  timestamp: new Date()
})
```

### パフォーマンス監視
```typescript
import { performanceMonitor } from '@/lib/monitoring/performance'

performanceMonitor.track('lesson_load_time', {
  lessonId: lesson.id,
  loadTime: endTime - startTime
})
```

---

## 🤝 開発フロー

### 1. 新機能開発
1. **設計文書作成** - 機能仕様の明確化
2. **テストケース作成** - E2Eテスト先行作成
3. **実装** - TypeScript strict modeで実装
4. **テスト実行** - 全テストスイート実行
5. **コードレビュー** - セルフチェック実施

### 2. 学習コンテンツ追加
1. **レッスン構造設計** - 学習目標・内容の明確化
2. **コンテンツ作成** - TypeScript形式でレッスン作成
3. **ファクトチェック** - 最新情報の確認・更新
4. **クイズ作成** - 理解度確認問題の作成
5. **統合テスト** - 学習フロー全体の確認

---

## 💡 よくある課題・解決策

### TypeScript エラー
```typescript
// エラー: Property 'xxx' does not exist on type 'unknown'
// 解決: 型ガードまたは型アサーション
function isLesson(data: unknown): data is Lesson {
  return typeof data === 'object' && data !== null && 'id' in data
}
```

### Supabase RLS
```sql
-- エラー: Row Level Security policy violation
-- 解決: 適切なRLSポリシーの設定
CREATE POLICY "Allow authenticated users to read lessons"
ON lessons FOR SELECT
TO authenticated
USING (true);
```

### AI API制限
```typescript
// エラー: Rate limit exceeded
// 解決: 適切なリトライ・レート制限の実装
const withRetry = async (apiCall: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
}
```

---

## 文字化け対策・エンコーディング管理

### 必須設定
```json
// .vscode/settings.json
{
  "files.encoding": "utf8",
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "editor.detectIndentation": false,
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}
```

### TypeScript/JavaScript ファイル
```typescript
// ファイルの先頭にBOM除去を確認
// 全ファイルでUTF-8エンコーディングを使用

// 文字列リテラルは適切にエスケープ
const message = "日本語メッセージ";
const template = `
  マルチライン文字列も
  適切にエンコーディング
`;
```

### コマンドラインエンコーディング確認
```bash
# ファイルエンコーディング確認
file -i filename.ts

# UTF-8への変換
iconv -f SHIFT_JIS -t UTF-8 input.txt > output.txt

# BOM除去
sed -i '1s/^\xEF\xBB\xBF//' filename.ts
```

---

## 📞 サポート・コミュニケーション

### 開発チーム連絡先
- **プロジェクト管理**: Claude AI Assistant
- **技術相談**: GitHub Issues
- **緊急事態**: Sentry アラート

### 問題報告手順
1. **問題の詳細記録** - エラーメッセージ・再現手順
2. **環境情報収集** - ブラウザ・OS・設定情報
3. **解決策の検討** - 既知の問題・回避策の確認
4. **エスカレーション** - 解決不可能な場合の報告

---

## 🎉 成功指標

### 技術指標
- **アップタイム**: 99.9%以上
- **応答時間**: 95%のリクエストが100ms以内
- **エラー率**: 0.1%以下
- **テストカバレッジ**: 80%以上

### ユーザー指標
- **学習完了率**: 60%以上
- **ユーザー満足度**: 4.5/5以上
- **リピート率**: 70%以上
- **コンテンツ評価**: 4.0/5以上

---

**このガイドに従って開発を進めることで、高品質で保守性の高い暗号通貨AIプラットフォームを構築できます。**