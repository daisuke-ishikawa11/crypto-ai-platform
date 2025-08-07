// 🧪 E2Eテスト - 重要機能検証
// アラート・AI分析・決済・セキュリティの厳密テスト

import { test, expect, Page } from '@playwright/test';

test.describe('重要機能E2Eテスト', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await loginAsTestUser(page);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.describe('スマートアラートシステム', () => {
    test('価格アラートの作成から通知まで', async () => {
      await page.goto('/alerts');

      // 価格アラート作成
      await page.click('[data-testid="create-alert"]');
      await page.selectOption('[data-testid="alert-type"]', 'price_above');
      await page.selectOption('[data-testid="alert-symbol"]', 'BTC');
      await page.fill('[data-testid="alert-threshold"]', '45000');
      await page.fill('[data-testid="alert-name"]', 'BTC価格上昇アラート');
      
      // 通知方法設定
      await page.check('[data-testid="notification-email"]');
      await page.check('[data-testid="notification-push"]');
      await page.check('[data-testid="notification-in-app"]');

      await page.click('[data-testid="save-alert"]');

      // アラート作成確認
      await expect(page.locator('[data-testid="alert-success"]'))
        .toContainText('アラートを作成しました');

      // アラート一覧での表示確認
      await expect(page.locator('[data-testid="alert-list"]')).toBeVisible();
      const alertItem = page.locator('[data-testid="alert-item"]').first();
      await expect(alertItem).toContainText('BTC価格上昇アラート');
      await expect(alertItem).toContainText('$45,000');
      await expect(alertItem.locator('[data-testid="alert-status"]'))
        .toContainText('アクティブ');

      // アラート編集テスト
      await alertItem.locator('[data-testid="edit-alert"]').click();
      await page.fill('[data-testid="alert-threshold"]', '47000');
      await page.click('[data-testid="update-alert"]');
      
      await expect(page.locator('[data-testid="alert-updated"]'))
        .toContainText('アラートを更新しました');
      await expect(alertItem).toContainText('$47,000');
    });

    test('複合条件アラートの設定', async () => {
      await page.goto('/alerts');

      await page.click('[data-testid="create-alert"]');
      await page.selectOption('[data-testid="alert-type"]', 'composite');
      await page.fill('[data-testid="alert-name"]', '複合条件アラート');

      // 条件1: 価格
      await page.click('[data-testid="add-condition"]');
      await page.selectOption('[data-testid="condition-1-type"]', 'price_above');
      await page.selectOption('[data-testid="condition-1-symbol"]', 'BTC');
      await page.fill('[data-testid="condition-1-threshold"]', '40000');

      // 条件2: RSI
      await page.click('[data-testid="add-condition"]');
      await page.selectOption('[data-testid="condition-2-type"]', 'rsi_oversold');
      await page.selectOption('[data-testid="condition-2-symbol"]', 'BTC');
      await page.fill('[data-testid="condition-2-threshold"]', '30');

      // 条件3: 出来高
      await page.click('[data-testid="add-condition"]');
      await page.selectOption('[data-testid="condition-3-type"]', 'volume_spike');
      await page.selectOption('[data-testid="condition-3-symbol"]', 'BTC');
      await page.fill('[data-testid="condition-3-threshold"]', '150');

      // ロジック設定
      await page.selectOption('[data-testid="condition-logic"]', 'AND');

      await page.click('[data-testid="save-alert"]');

      // 複合アラート表示確認
      const compositeAlert = page.locator('[data-testid="alert-item"]').first();
      await expect(compositeAlert).toContainText('複合条件アラート');
      await expect(compositeAlert).toContainText('3つの条件');
      await expect(compositeAlert).toContainText('AND条件');
    });

    test('アラート履歴・統計表示', async () => {
      await page.goto('/alerts/history');

      // アラート履歴表示確認
      await expect(page.locator('[data-testid="alert-history-table"]')).toBeVisible();
      
      // フィルタリング機能
      await page.selectOption('[data-testid="history-filter-status"]', 'triggered');
      await page.selectOption('[data-testid="history-filter-symbol"]', 'BTC');
      await page.click('[data-testid="apply-filters"]');

      // 統計情報確認
      await expect(page.locator('[data-testid="total-alerts"]')).toContainText(/\d+/);
      await expect(page.locator('[data-testid="triggered-count"]')).toContainText(/\d+/);
      await expect(page.locator('[data-testid="success-rate"]')).toContainText(/\d+%/);

      // 詳細履歴確認
      await page.click('[data-testid="alert-history-item"]').first();
      await expect(page.locator('[data-testid="alert-detail-modal"]')).toBeVisible();
      await expect(page.locator('[data-testid="trigger-timestamp"]')).toBeVisible();
      await expect(page.locator('[data-testid="trigger-conditions"]')).toBeVisible();
    });
  });

  test.describe('AI分析システム', () => {
    test('マーケット分析の実行と結果表示', async () => {
      await upgradeToProPlan(page);
      await page.goto('/analysis');

      // AI分析リクエスト
      await page.fill('[data-testid="analysis-query"]', 
        'BTCの現在の市場状況を分析し、今後1週間の価格動向を予測してください');
      
      await page.selectOption('[data-testid="analysis-model"]', 'gemini-pro');
      await page.check('[data-testid="include-technical"]');
      await page.check('[data-testid="include-fundamental"]');
      await page.check('[data-testid="include-sentiment"]');

      await page.click('[data-testid="submit-analysis"]');

      // 分析実行中表示確認
      await expect(page.locator('[data-testid="analysis-loading"]')).toBeVisible();
      await expect(page.locator('[data-testid="analysis-progress"]')).toContainText('分析中');

      // 分析結果表示確認（最大30秒待機）
      await expect(page.locator('[data-testid="analysis-result"]'))
        .toBeVisible({ timeout: 30000 });

      // 分析内容確認
      const result = page.locator('[data-testid="analysis-content"]');
      await expect(result).toContainText('テクニカル分析');
      await expect(result).toContainText('ファンダメンタル分析');
      await expect(result).toContainText('センチメント分析');
      await expect(result).toContainText('価格予測');

      // 信頼度スコア確認
      await expect(page.locator('[data-testid="confidence-score"]'))
        .toContainText(/[0-9]+%/);

      // 分析保存
      await page.click('[data-testid="save-analysis"]');
      await expect(page.locator('[data-testid="analysis-saved"]'))
        .toContainText('分析を保存しました');
    });

    test('AI学習推奨システム', async () => {
      await page.goto('/learning');

      // AI推奨レッスン表示確認
      await expect(page.locator('[data-testid="ai-recommendations"]')).toBeVisible();
      await expect(page.locator('[data-testid="recommended-lesson"]').first())
        .toBeVisible();

      // 推奨理由表示
      const recommendation = page.locator('[data-testid="recommended-lesson"]').first();
      await expect(recommendation.locator('[data-testid="recommendation-reason"]'))
        .toContainText('あなたの学習履歴から');

      // パーソナライズされた学習パス
      await page.click('[data-testid="view-learning-path"]');
      await expect(page.locator('[data-testid="learning-path-modal"]')).toBeVisible();
      await expect(page.locator('[data-testid="path-step"]')).toHaveCount({ min: 3 });

      // 学習目標設定
      await page.click('[data-testid="customize-path"]');
      await page.selectOption('[data-testid="learning-goal"]', 'advanced_trading');
      await page.selectOption('[data-testid="time-commitment"]', '30min_daily');
      await page.click('[data-testid="update-path"]');

      await expect(page.locator('[data-testid="path-updated"]'))
        .toContainText('学習パスを更新しました');
    });

    test('AI チャット機能', async () => {
      await upgradeToProPlan(page);
      await page.goto('/chat');

      // チャット開始
      const query = '暗号通貨投資を始めるための基本的なステップを教えてください';
      await page.fill('[data-testid="chat-input"]', query);
      await page.click('[data-testid="send-message"]');

      // メッセージ送信確認
      await expect(page.locator('[data-testid="user-message"]').last())
        .toContainText(query);

      // AI応答確認
      await expect(page.locator('[data-testid="ai-response"]').last())
        .toBeVisible({ timeout: 15000 });
      
      const aiResponse = page.locator('[data-testid="ai-response"]').last();
      await expect(aiResponse).toContainText('投資');
      await expect(aiResponse.locator('[data-testid="response-sources"]')).toBeVisible();

      // フォローアップ質問
      await page.fill('[data-testid="chat-input"]', 'リスク管理について詳しく教えて');
      await page.click('[data-testid="send-message"]');

      // コンテキスト保持確認
      await expect(page.locator('[data-testid="ai-response"]').last())
        .toContainText('リスク管理', { timeout: 15000 });

      // チャット履歴保存
      await page.click('[data-testid="save-chat"]');
      await page.fill('[data-testid="chat-title"]', '投資基礎相談');
      await page.click('[data-testid="confirm-save"]');

      await expect(page.locator('[data-testid="chat-saved"]'))
        .toContainText('チャットを保存しました');
    });
  });

  test.describe('決済・サブスクリプション', () => {
    test('プラン変更フロー', async () => {
      await page.goto('/billing');

      // 現在のプラン確認
      await expect(page.locator('[data-testid="current-plan"]'))
        .toContainText('Basic');

      // プランアップグレード
      await page.click('[data-testid="upgrade-to-pro"]');
      await expect(page.locator('[data-testid="upgrade-modal"]')).toBeVisible();

      // アップグレード詳細確認
      await expect(page.locator('[data-testid="plan-comparison"]')).toBeVisible();
      await expect(page.locator('[data-testid="price-difference"]'))
        .toContainText('$70.00/月');
      await expect(page.locator('[data-testid="billing-cycle"]'))
        .toContainText('次回請求日');

      // 決済方法選択
      await page.click('[data-testid="payment-method-card"]');
      await page.fill('[data-testid="card-number"]', '4242424242424242');
      await page.fill('[data-testid="card-expiry"]', '12/28');
      await page.fill('[data-testid="card-cvc"]', '123');

      await page.click('[data-testid="confirm-upgrade"]');

      // アップグレード成功確認
      await expect(page.locator('[data-testid="upgrade-success"]'))
        .toContainText('プランをアップグレードしました');

      // 新機能アクセス確認
      await expect(page.locator('[data-testid="pro-features-unlocked"]')).toBeVisible();
    });

    test('請求書・支払い履歴', async () => {
      await upgradeToProPlan(page);
      await page.goto('/billing/invoices');

      // 請求書一覧表示
      await expect(page.locator('[data-testid="invoice-list"]')).toBeVisible();
      await expect(page.locator('[data-testid="invoice-item"]').first()).toBeVisible();

      // 請求書詳細確認
      await page.click('[data-testid="invoice-item"]').first();
      await expect(page.locator('[data-testid="invoice-detail"]')).toBeVisible();
      await expect(page.locator('[data-testid="invoice-amount"]')).toContainText(/\$[0-9]+/);
      await expect(page.locator('[data-testid="invoice-date"]')).toBeVisible();

      // PDF ダウンロード
      await page.click('[data-testid="download-pdf"]');
      // ダウンロード開始を確認
      await expect(page.locator('[data-testid="download-started"]'))
        .toContainText('ダウンロードを開始しました');

      // 支払い履歴表示
      await page.click('[data-testid="payment-history-tab"]');
      await expect(page.locator('[data-testid="payment-list"]')).toBeVisible();
      
      // 支払い統計
      await expect(page.locator('[data-testid="total-payments"]')).toContainText(/\$[0-9]+/);
      await expect(page.locator('[data-testid="payment-count"]')).toContainText(/[0-9]+回/);
    });

    test('サブスクリプション管理', async () => {
      await upgradeToProPlan(page);
      await page.goto('/billing/subscription');

      // サブスクリプション詳細確認
      await expect(page.locator('[data-testid="subscription-status"]'))
        .toContainText('アクティブ');
      await expect(page.locator('[data-testid="next-billing-date"]')).toBeVisible();
      await expect(page.locator('[data-testid="subscription-amount"]'))
        .toContainText(/\$[0-9]+/);

      // プラン変更（ダウングレード）
      await page.click('[data-testid="change-plan"]');
      await page.selectOption('[data-testid="new-plan"]', 'basic');
      await page.check('[data-testid="confirm-downgrade"]');
      await page.click('[data-testid="apply-change"]');

      await expect(page.locator('[data-testid="plan-change-scheduled"]'))
        .toContainText('プラン変更を予約しました');

      // キャンセレーション
      await page.click('[data-testid="cancel-subscription"]');
      await expect(page.locator('[data-testid="cancellation-modal"]')).toBeVisible();
      
      await page.selectOption('[data-testid="cancellation-reason"]', 'too_expensive');
      await page.fill('[data-testid="cancellation-feedback"]', 
        '現在は基本機能で十分です');
      
      await page.check('[data-testid="confirm-cancellation"]');
      await page.click('[data-testid="proceed-cancellation"]');

      await expect(page.locator('[data-testid="cancellation-confirmed"]'))
        .toContainText('サブスクリプションをキャンセルしました');
    });
  });

  test.describe('セキュリティ・認証', () => {
    test('2要素認証設定', async () => {
      await page.goto('/settings/security');

      // 2FA設定開始
      await page.click('[data-testid="enable-2fa"]');
      await expect(page.locator('[data-testid="2fa-setup-modal"]')).toBeVisible();

      // QRコード表示確認
      await expect(page.locator('[data-testid="qr-code"]')).toBeVisible();
      await expect(page.locator('[data-testid="manual-key"]')).toBeVisible();

      // 認証コード入力
      await page.fill('[data-testid="verification-code"]', '123456');
      await page.click('[data-testid="verify-2fa"]');

      // バックアップコード表示
      await expect(page.locator('[data-testid="backup-codes"]')).toBeVisible();
      await expect(page.locator('[data-testid="backup-code"]')).toHaveCount(10);

      await page.check('[data-testid="codes-saved-confirmation"]');
      await page.click('[data-testid="complete-2fa-setup"]');

      // 2FA有効化確認
      await expect(page.locator('[data-testid="2fa-enabled"]'))
        .toContainText('2要素認証が有効になりました');
    });

    test('セッション管理', async () => {
      await page.goto('/settings/security');

      // アクティブセッション表示
      await expect(page.locator('[data-testid="active-sessions"]')).toBeVisible();
      await expect(page.locator('[data-testid="session-item"]').first()).toBeVisible();

      // セッション詳細確認
      const session = page.locator('[data-testid="session-item"]').first();
      await expect(session.locator('[data-testid="session-device"]')).toBeVisible();
      await expect(session.locator('[data-testid="session-location"]')).toBeVisible();
      await expect(session.locator('[data-testid="session-last-active"]')).toBeVisible();

      // セッション終了
      await session.locator('[data-testid="terminate-session"]').click();
      await expect(page.locator('[data-testid="session-terminated"]'))
        .toContainText('セッションを終了しました');

      // 全セッション終了
      await page.click('[data-testid="terminate-all-sessions"]');
      await page.check('[data-testid="confirm-terminate-all"]');
      await page.click('[data-testid="proceed-terminate-all"]');

      await expect(page.locator('[data-testid="all-sessions-terminated"]'))
        .toContainText('すべてのセッションを終了しました');
    });

    test('パスワード変更・アカウントセキュリティ', async () => {
      await page.goto('/settings/security');

      // パスワード変更
      await page.click('[data-testid="change-password"]');
      await page.fill('[data-testid="current-password"]', 'oldpassword123');
      await page.fill('[data-testid="new-password"]', 'NewSecurePassword456!');
      await page.fill('[data-testid="confirm-new-password"]', 'NewSecurePassword456!');
      
      await page.click('[data-testid="update-password"]');
      await expect(page.locator('[data-testid="password-updated"]'))
        .toContainText('パスワードを更新しました');

      // ログイン履歴確認
      await page.click('[data-testid="login-history-tab"]');
      await expect(page.locator('[data-testid="login-history"]')).toBeVisible();
      
      // 不審なアクティビティ確認
      await expect(page.locator('[data-testid="security-alerts"]')).toBeVisible();
      
      // API キー管理
      await page.click('[data-testid="api-keys-tab"]');
      await page.click('[data-testid="create-api-key"]');
      await page.fill('[data-testid="api-key-name"]', 'テスト用API');
      await page.check('[data-testid="api-scope-read"]');
      await page.click('[data-testid="generate-api-key"]');

      await expect(page.locator('[data-testid="api-key-created"]')).toBeVisible();
      await expect(page.locator('[data-testid="api-key-secret"]')).toBeVisible();
    });
  });

  test.describe('データエクスポート・インポート', () => {
    test('ポートフォリオデータエクスポート', async () => {
      await page.goto('/portfolio');

      // エクスポート開始
      await page.click('[data-testid="export-data"]');
      await expect(page.locator('[data-testid="export-modal"]')).toBeVisible();

      // エクスポート設定
      await page.check('[data-testid="export-holdings"]');
      await page.check('[data-testid="export-transactions"]');
      await page.check('[data-testid="export-performance"]');
      await page.selectOption('[data-testid="export-format"]', 'csv');
      await page.selectOption('[data-testid="export-period"]', '1year');

      await page.click('[data-testid="start-export"]');

      // エクスポート進行確認
      await expect(page.locator('[data-testid="export-progress"]')).toBeVisible();
      await expect(page.locator('[data-testid="export-completed"]'))
        .toBeVisible({ timeout: 10000 });

      // ダウンロードリンク確認
      await expect(page.locator('[data-testid="download-export"]')).toBeVisible();
    });

    test('学習データバックアップ', async () => {
      await page.goto('/learning/progress');

      // バックアップ作成
      await page.click('[data-testid="backup-progress"]');
      await page.check('[data-testid="include-quiz-results"]');
      await page.check('[data-testid="include-achievements"]');
      await page.check('[data-testid="include-study-time"]');

      await page.click('[data-testid="create-backup"]');

      await expect(page.locator('[data-testid="backup-created"]'))
        .toContainText('バックアップを作成しました');

      // バックアップ履歴確認
      await expect(page.locator('[data-testid="backup-history"]')).toBeVisible();
      await expect(page.locator('[data-testid="backup-item"]').first()).toBeVisible();
    });
  });

  // ヘルパー関数
  async function loginAsTestUser(page: Page) {
    await page.goto('/auth/signin');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="signin-submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
  }

  async function upgradeToProPlan(page: Page) {
    await page.goto('/pricing');
    await page.click('[data-testid="select-plan-pro"]');
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/28');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.click('[data-testid="complete-payment"]');
    await expect(page.locator('[data-testid="payment-success"]')).toBeVisible();
  }
});