// 🧪 E2Eテスト - ユーザージャーニー
// 新規登録から学習・投資判断までの完全フロー検証

import { test, expect, Page } from '@playwright/test';

test.describe('新規ユーザー完全ジャーニー', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    
    // テスト環境設定
    await page.goto('/');
    
    // ローカルストレージクリア
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('1. 新規ユーザー登録フロー', async () => {
    // ランディングページ表示確認
    await expect(page).toHaveTitle(/Crypto AI Platform/);
    await expect(page.locator('h1')).toContainText('次世代暗号通貨投資プラットフォーム');

    // 新規登録ボタンクリック
    await page.click('text=新規登録');
    await expect(page).toHaveURL(/.*auth\/signup/);

    // 登録フォーム入力
    const testEmail = `test-${Date.now()}@example.com`;
    await page.fill('[data-testid="email-input"]', testEmail);
    await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
    await page.fill('[data-testid="confirm-password-input"]', 'SecurePassword123!');
    await page.fill('[data-testid="full-name-input"]', 'テスト 太郎');

    // 利用規約チェック
    await page.check('[data-testid="terms-checkbox"]');

    // 登録実行
    await page.click('[data-testid="signup-submit"]');

    // 登録成功確認（メール確認画面）
    await expect(page.locator('[data-testid="email-verification-message"]'))
      .toContainText('確認メールを送信しました');

    // テスト用：メール確認をスキップ
    await page.goto('/auth/callback?token=test-verification-token');
    
    // ダッシュボードリダイレクト確認
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('[data-testid="welcome-message"]'))
      .toContainText('テスト 太郎さん、ようこそ');
  });

  test('2. オンボーディングフロー', async () => {
    // 既存ユーザーとしてログイン
    await loginAsTestUser(page);

    // オンボーディング開始
    await expect(page.locator('[data-testid="onboarding-modal"]')).toBeVisible();
    await page.click('[data-testid="start-onboarding"]');

    // ステップ1: 投資経験
    await page.check('[data-testid="experience-beginner"]');
    await page.click('[data-testid="next-step"]');

    // ステップ2: 興味のあるトピック
    await page.check('[data-testid="topic-crypto-basics"]');
    await page.check('[data-testid="topic-trading-basics"]');
    await page.click('[data-testid="next-step"]');

    // ステップ3: リスク許容度
    await page.click('[data-testid="risk-conservative"]');
    await page.click('[data-testid="next-step"]');

    // ステップ4: 学習目標
    await page.fill('[data-testid="learning-goal"]', '暗号通貨投資の基礎を学び、安全に投資を始めたい');
    await page.click('[data-testid="complete-onboarding"]');

    // オンボーディング完了確認
    await expect(page.locator('[data-testid="onboarding-success"]'))
      .toContainText('設定が完了しました');

    // AI推奨学習パス表示確認
    await expect(page.locator('[data-testid="recommended-lessons"]')).toBeVisible();
    await expect(page.locator('[data-testid="lesson-recommendation"]').first())
      .toContainText('暗号通貨とは？');
  });

  test('3. 学習システムフロー', async () => {
    await loginAsTestUser(page);
    await completeOnboarding(page);

    // 学習ページへ移動
    await page.click('[data-testid="nav-learning"]');
    await expect(page).toHaveURL(/.*learning/);

    // 推奨レッスン開始
    await page.click('[data-testid="start-lesson-what-is-cryptocurrency"]');
    await expect(page).toHaveURL(/.*learning\/lessons\/what-is-cryptocurrency/);

    // レッスンコンテンツ表示確認
    await expect(page.locator('[data-testid="lesson-title"]'))
      .toContainText('暗号通貨とは？');
    await expect(page.locator('[data-testid="lesson-content"]')).toBeVisible();

    // レッスン進行
    await page.click('[data-testid="next-section"]');
    await expect(page.locator('[data-testid="progress-indicator"]'))
      .toContainText('2 / 5');

    // AI説明機能テスト
    await page.click('[data-testid="ai-explain-button"]');
    await expect(page.locator('[data-testid="ai-explanation-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="ai-explanation-content"]'))
      .toContainText('ブロックチェーン技術');
    await page.click('[data-testid="close-ai-explanation"]');

    // レッスン完了
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="next-section"]');
      await page.waitForTimeout(500);
    }

    // クイズ開始
    await expect(page.locator('[data-testid="quiz-section"]')).toBeVisible();
    
    // クイズ回答
    await page.check('[data-testid="quiz-q1-answer-a"]');
    await page.check('[data-testid="quiz-q2-answer-b"]');
    await page.check('[data-testid="quiz-q3-answer-c"]');
    await page.click('[data-testid="submit-quiz"]');

    // クイズ結果確認
    await expect(page.locator('[data-testid="quiz-score"]'))
      .toContainText(/[7-9][0-9]%|100%/); // 70%以上の想定

    // レッスン完了・実績解除確認
    await expect(page.locator('[data-testid="lesson-completed"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-unlocked"]'))
      .toContainText('初回レッスン完了');

    // 次のレッスン推奨
    await expect(page.locator('[data-testid="next-lesson-recommendation"]'))
      .toContainText('ブロックチェーンの基礎');
  });

  test('4. プラン選択・アップグレードフロー', async () => {
    await loginAsTestUser(page);

    // 料金プランページへ
    await page.click('[data-testid="nav-pricing"]');
    await expect(page).toHaveURL(/.*pricing/);

    // プラン比較表示確認
    await expect(page.locator('[data-testid="plan-basic"]')).toBeVisible();
    await expect(page.locator('[data-testid="plan-pro"]')).toBeVisible();
    await expect(page.locator('[data-testid="plan-enterprise"]')).toBeVisible();

    // Proプラン選択
    await page.click('[data-testid="select-plan-pro"]');
    await expect(page).toHaveURL(/.*checkout/);

    // 決済情報入力
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/28');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.fill('[data-testid="cardholder-name"]', 'Test User');

    // 請求先情報
    await page.fill('[data-testid="billing-address"]', 'テスト住所');
    await page.fill('[data-testid="billing-city"]', '東京都');
    await page.fill('[data-testid="billing-postal"]', '100-0001');

    // 決済実行
    await page.click('[data-testid="complete-payment"]');

    // 決済成功確認
    await expect(page.locator('[data-testid="payment-success"]'))
      .toContainText('お支払いが完了しました');

    // Proプラン機能解除確認
    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="pro-features-enabled"]')).toBeVisible();
    await expect(page.locator('[data-testid="ai-analysis-limit"]'))
      .toContainText('100回/月');
  });

  test('5. アラート設定・市場分析フロー', async () => {
    await loginAsTestUser(page);
    await upgradeToProPlan(page);

    // アラートページへ
    await page.click('[data-testid="nav-alerts"]');
    await expect(page).toHaveURL(/.*alerts/);

    // 新しいアラート作成
    await page.click('[data-testid="create-alert"]');
    await expect(page.locator('[data-testid="alert-modal"]')).toBeVisible();

    // アラート設定
    await page.selectOption('[data-testid="alert-type"]', 'price_above');
    await page.selectOption('[data-testid="alert-symbol"]', 'BTC');
    await page.fill('[data-testid="alert-threshold"]', '50000');
    await page.check('[data-testid="notification-email"]');
    await page.check('[data-testid="notification-push"]');

    await page.click('[data-testid="save-alert"]');

    // アラート作成確認
    await expect(page.locator('[data-testid="alert-created-success"]'))
      .toContainText('アラートを作成しました');

    // アラート一覧表示確認
    await expect(page.locator('[data-testid="alert-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="alert-item"]').first())
      .toContainText('BTC価格 > $50,000');

    // AI分析機能テスト
    await page.click('[data-testid="nav-analysis"]');
    await expect(page).toHaveURL(/.*analysis/);

    // AI分析リクエスト
    await page.fill('[data-testid="analysis-query"]', 'BTCの今後の価格動向を分析してください');
    await page.click('[data-testid="submit-analysis"]');

    // AI分析結果確認
    await expect(page.locator('[data-testid="analysis-loading"]')).toBeVisible();
    await expect(page.locator('[data-testid="analysis-result"]'))
      .toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="analysis-content"]'))
      .toContainText('テクニカル分析');

    // 分析履歴保存確認
    await expect(page.locator('[data-testid="analysis-saved"]'))
      .toContainText('分析を保存しました');
  });

  test('6. ポートフォリオ管理・DeFi監視フロー', async () => {
    await loginAsTestUser(page);
    await upgradeToProPlan(page);

    // ポートフォリオページへ
    await page.click('[data-testid="nav-portfolio"]');
    await expect(page).toHaveURL(/.*portfolio/);

    // 保有資産追加
    await page.click('[data-testid="add-holding"]');
    await page.selectOption('[data-testid="asset-symbol"]', 'BTC');
    await page.fill('[data-testid="asset-quantity"]', '0.5');
    await page.fill('[data-testid="asset-price"]', '45000');
    await page.click('[data-testid="save-holding"]');

    // ポートフォリオ表示確認
    await expect(page.locator('[data-testid="portfolio-value"]'))
      .toContainText('$22,500');
    await expect(page.locator('[data-testid="asset-allocation-chart"]')).toBeVisible();

    // DeFi監視ページへ
    await page.click('[data-testid="nav-defi"]');
    await expect(page).toHaveURL(/.*defi/);

    // DeFiプロトコル接続
    await page.click('[data-testid="connect-protocol"]');
    await page.selectOption('[data-testid="protocol-select"]', 'uniswap');
    await page.fill('[data-testid="wallet-address"]', '0x742d35Cc6634C0532925a3b8D9C5AC52100e5C8');
    await page.click('[data-testid="add-protocol"]');

    // DeFiポジション表示確認
    await expect(page.locator('[data-testid="defi-positions"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-defi-value"]'))
      .toContainText(/\$[\d,]+/);

    // リスクアラート設定
    await page.click('[data-testid="setup-risk-alerts"]');
    await page.check('[data-testid="risk-impermanent-loss"]');
    await page.check('[data-testid="risk-health-factor"]');
    await page.click('[data-testid="save-risk-settings"]');

    // リスク監視ダッシュボード確認
    await expect(page.locator('[data-testid="risk-dashboard"]')).toBeVisible();
    await expect(page.locator('[data-testid="risk-score"]'))
      .toContainText(/[0-9]+%/);
  });

  test('7. 学習進捗・実績システム', async () => {
    await loginAsTestUser(page);

    // 複数レッスン完了シミュレーション
    const lessons = [
      'what-is-cryptocurrency',
      'blockchain-basics',
      'bitcoin-overview',
      'ethereum-introduction'
    ];

    for (const lesson of lessons) {
      await completeLesson(page, lesson);
    }

    // 実績ページ確認
    await page.click('[data-testid="nav-achievements"]');
    await expect(page).toHaveURL(/.*achievements/);

    // 解除された実績確認
    await expect(page.locator('[data-testid="achievement-first-lesson"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-crypto-basics"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-consistent-learner"]')).toBeVisible();

    // 学習ストリーク確認
    await expect(page.locator('[data-testid="learning-streak"]'))
      .toContainText(/[0-9]+日連続/);

    // リーダーボード確認
    await expect(page.locator('[data-testid="leaderboard"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-rank"]'))
      .toContainText(/\d+位/);

    // 学習統計表示
    await expect(page.locator('[data-testid="lessons-completed"]'))
      .toContainText('4 / 85');
    await expect(page.locator('[data-testid="total-study-time"]'))
      .toContainText(/\d+分/);
  });

  test('8. レスポンシブデザイン・モバイル対応', async () => {
    // モバイルビューポート設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    await loginAsTestUser(page);

    // モバイルナビゲーション確認
    await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible();
    await page.click('[data-testid="mobile-nav-toggle"]');
    await expect(page.locator('[data-testid="mobile-nav-menu"]')).toBeVisible();

    // モバイルダッシュボード確認
    await expect(page.locator('[data-testid="mobile-dashboard"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-quick-actions"]')).toBeVisible();

    // スワイプジェスチャーテスト
    await page.touchscreen.tap(200, 300);
    await page.mouse.move(200, 300);
    await page.mouse.down();
    await page.mouse.move(100, 300);
    await page.mouse.up();

    // モバイル学習体験確認
    await page.click('[data-testid="mobile-nav-learning"]');
    await expect(page.locator('[data-testid="mobile-lesson-cards"]')).toBeVisible();
    
    // タブレットビューポート
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="tablet-layout"]')).toBeVisible();
  });

  test('9. エラーハンドリング・フォールバック', async () => {
    await loginAsTestUser(page);

    // ネットワークエラーシミュレーション
    await page.route('**/api/market/prices', route => route.abort());
    
    await page.click('[data-testid="nav-market"]');
    await expect(page.locator('[data-testid="market-error-fallback"]'))
      .toContainText('市場データの読み込みに失敗しました');
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();

    // リトライ機能テスト
    await page.unroute('**/api/market/prices');
    await page.click('[data-testid="retry-button"]');
    await expect(page.locator('[data-testid="market-data"]')).toBeVisible();

    // オフライン状態シミュレーション
    await page.context().setOffline(true);
    await page.reload();
    await expect(page.locator('[data-testid="offline-banner"]'))
      .toContainText('オフラインモード');

    // オフライン機能確認
    await expect(page.locator('[data-testid="cached-content"]')).toBeVisible();
    await page.context().setOffline(false);
  });

  test('10. パフォーマンス・アクセシビリティ', async () => {
    await loginAsTestUser(page);

    // ページロード時間測定
    const startTime = Date.now();
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // 3秒以内

    // Core Web Vitals確認
    const metrics = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          resolve(entries.map(entry => ({
            name: entry.name,
            value: entry.value
          })));
        }).observe({ entryTypes: ['navigation', 'paint'] });
      });
    });

    // アクセシビリティ確認
    await expect(page.locator('h1')).toHaveAttribute('role', 'heading');
    await expect(page.locator('[data-testid="main-content"]'))
      .toHaveAttribute('role', 'main');

    // キーボードナビゲーション
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // スクリーンリーダー対応確認
    await expect(page.locator('[aria-label="メインナビゲーション"]')).toBeVisible();
  });

  // ヘルパー関数
  async function loginAsTestUser(page: Page) {
    await page.goto('/auth/signin');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="signin-submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
  }

  async function completeOnboarding(page: Page) {
    if (await page.locator('[data-testid="onboarding-modal"]').isVisible()) {
      await page.click('[data-testid="start-onboarding"]');
      await page.check('[data-testid="experience-beginner"]');
      await page.click('[data-testid="next-step"]');
      await page.check('[data-testid="topic-crypto-basics"]');
      await page.click('[data-testid="next-step"]');
      await page.click('[data-testid="risk-conservative"]');
      await page.click('[data-testid="next-step"]');
      await page.fill('[data-testid="learning-goal"]', 'Learn crypto basics');
      await page.click('[data-testid="complete-onboarding"]');
    }
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

  async function completeLesson(page: Page, lessonSlug: string) {
    await page.goto(`/learning/lessons/${lessonSlug}`);
    
    // レッスン進行
    for (let i = 0; i < 5; i++) {
      if (await page.locator('[data-testid="next-section"]').isVisible()) {
        await page.click('[data-testid="next-section"]');
        await page.waitForTimeout(300);
      }
    }

    // クイズ回答
    if (await page.locator('[data-testid="quiz-section"]').isVisible()) {
      await page.check('[data-testid="quiz-q1-answer-a"]');
      await page.check('[data-testid="quiz-q2-answer-b"]');
      await page.check('[data-testid="quiz-q3-answer-c"]');
      await page.click('[data-testid="submit-quiz"]');
    }

    await expect(page.locator('[data-testid="lesson-completed"]')).toBeVisible();
  }
});