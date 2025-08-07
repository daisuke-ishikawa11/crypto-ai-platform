// 🧪 E2Eテスト - パフォーマンス・UX検証
// 応答性・アクセシビリティ・ユーザビリティの総合評価

import { test, expect, Page } from '@playwright/test';

test.describe('パフォーマンス・UXテスト', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.describe('ページロードパフォーマンス', () => {
    test('ランディングページの初回読み込み', async () => {
      const startTime = Date.now();
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // 3秒以内

      // Core Web Vitals確認
      const vitals = await page.evaluate(() => {
        return new Promise(resolve => {
          const observer = new PerformanceObserver(list => {
            const entries = list.getEntries();
            const vitals = {};
            
            entries.forEach(entry => {
              if (entry.name === 'first-contentful-paint') {
                vitals.fcp = entry.startTime;
              }
              if (entry.name === 'largest-contentful-paint') {
                vitals.lcp = entry.startTime;
              }
            });
            
            resolve(vitals);
          });
          
          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
          
          setTimeout(() => resolve({}), 5000);
        });
      });

      console.log('Core Web Vitals:', vitals);
      
      // FCP (First Contentful Paint) < 1.8s
      if (vitals.fcp) {
        expect(vitals.fcp).toBeLessThan(1800);
      }
      
      // LCP (Largest Contentful Paint) < 2.5s
      if (vitals.lcp) {
        expect(vitals.lcp).toBeLessThan(2500);
      }
    });

    test('ダッシュボードページの読み込み性能', async () => {
      await loginAsTestUser(page);
      
      const navigationStart = Date.now();
      await page.goto('/dashboard', { waitUntil: 'networkidle' });
      const navigationTime = Date.now() - navigationStart;
      
      expect(navigationTime).toBeLessThan(2000); // 2秒以内

      // JavaScript実行時間測定
      const jsExecutionTime = await page.evaluate(() => {
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0) {
          const nav = entries[0] as PerformanceNavigationTiming;
          return nav.loadEventEnd - nav.domContentLoadedEventStart;
        }
        return 0;
      });

      expect(jsExecutionTime).toBeLessThan(1000); // JS実行1秒以内
    });

    test('学習ページの遅延読み込み', async () => {
      await loginAsTestUser(page);
      await page.goto('/learning');

      // レッスンカードの遅延読み込み確認
      const initialCards = await page.locator('[data-testid="lesson-card"]').count();
      expect(initialCards).toBeGreaterThan(0);

      // スクロールして追加読み込み
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      const afterScrollCards = await page.locator('[data-testid="lesson-card"]').count();
      expect(afterScrollCards).toBeGreaterThanOrEqual(initialCards);

      // 画像の遅延読み込み確認
      const images = page.locator('[data-testid="lesson-card"] img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        await expect(img).toHaveAttribute('loading', 'lazy');
      }
    });
  });

  test.describe('レスポンシブデザイン', () => {
    test('モバイルデバイス対応', async () => {
      // iPhone 12 Pro サイズ
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');

      // モバイルナビゲーション確認
      await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible();
      await expect(page.locator('[data-testid="desktop-nav"]')).not.toBeVisible();

      // ナビゲーションメニュー開閉
      await page.click('[data-testid="mobile-nav-toggle"]');
      await expect(page.locator('[data-testid="mobile-nav-menu"]')).toBeVisible();
      
      // メニュー項目確認
      await expect(page.locator('[data-testid="mobile-nav-item"]')).toHaveCount({ min: 4 });

      // メニュー閉じる
      await page.click('[data-testid="mobile-nav-close"]');
      await expect(page.locator('[data-testid="mobile-nav-menu"]')).not.toBeVisible();

      // モバイル最適化されたボタンサイズ確認
      const buttons = page.locator('button[data-testid*="mobile"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const bbox = await button.boundingBox();
        if (bbox) {
          expect(bbox.height).toBeGreaterThanOrEqual(44); // 44px最小タップ領域
        }
      }
    });

    test('タブレット表示確認', async () => {
      // iPad サイズ
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/dashboard');
      await loginAsTestUser(page);

      // タブレット向けレイアウト確認
      await expect(page.locator('[data-testid="tablet-layout"]')).toBeVisible();
      
      // グリッドレイアウト確認
      const gridItems = page.locator('[data-testid="dashboard-grid"] > div');
      const itemCount = await gridItems.count();
      expect(itemCount).toBeGreaterThan(0);

      // サイドバー表示確認
      await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
      
      // タッチフレンドリーな要素確認
      const touchElements = page.locator('[data-testid*="touch"]');
      const touchCount = await touchElements.count();
      
      for (let i = 0; i < touchCount; i++) {
        const element = touchElements.nth(i);
        const bbox = await element.boundingBox();
        if (bbox) {
          expect(bbox.width).toBeGreaterThanOrEqual(44);
          expect(bbox.height).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('デスクトップ最適化', async () => {
      // デスクトップサイズ
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/dashboard');
      await loginAsTestUser(page);

      // デスクトップナビゲーション確認
      await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible();
      await expect(page.locator('[data-testid="mobile-nav-toggle"]')).not.toBeVisible();

      // 多列レイアウト確認
      const columns = page.locator('[data-testid="dashboard-column"]');
      const columnCount = await columns.count();
      expect(columnCount).toBeGreaterThanOrEqual(3);

      // ホバー効果確認
      const hoverElements = page.locator('[data-testid*="hover"]');
      const hoverCount = await hoverElements.count();
      
      if (hoverCount > 0) {
        await hoverElements.first().hover();
        await expect(hoverElements.first()).toHaveClass(/hover/);
      }
    });
  });

  test.describe('アクセシビリティ', () => {
    test('キーボードナビゲーション', async () => {
      await page.goto('/');

      // Tab キーナビゲーション
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);

      // フォーカス可能な要素を順次確認
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        await expect(focused).toBeVisible();
        
        // フォーカスインジケーター確認
        const outline = await focused.evaluate(el => 
          getComputedStyle(el).outline || getComputedStyle(el).boxShadow
        );
        expect(outline).not.toBe('none');
      }

      // Shift+Tab で逆順ナビゲーション
      await page.keyboard.press('Shift+Tab');
      await expect(page.locator(':focus')).toBeVisible();
    });

    test('スクリーンリーダー対応', async () => {
      await page.goto('/');

      // ページタイトル確認
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title).toMatch(/Crypto AI Platform/);

      // ヘッディング構造確認
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1); // h1は1つのみ

      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      expect(headingCount).toBeGreaterThan(0);

      // ランドマーク要素確認
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      
      // aria-label 確認
      const ariaLabels = page.locator('[aria-label]');
      const ariaCount = await ariaLabels.count();
      expect(ariaCount).toBeGreaterThan(0);

      // alt属性確認
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });

    test('コントラスト・色覚対応', async () => {
      await loginAsTestUser(page);
      await page.goto('/dashboard');

      // 色のコントラスト確認（主要要素）
      const textElements = page.locator('p, span, div[class*="text"]');
      const elementCount = await textElements.count();
      
      // サンプルでコントラスト比確認
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = textElements.nth(i);
        const styles = await element.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });

        // 基本的な色設定確認
        expect(styles.color).not.toBe('rgb(0, 0, 0)'); // 純粋な黒は避ける
        expect(styles.color).not.toBe('rgb(255, 255, 255)'); // 純粋な白も避ける
      }

      // フォーカス状態の視認性確認
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      
      if (await focusedElement.count() > 0) {
        const focusStyles = await focusedElement.evaluate(el => {
          const computed = getComputedStyle(el);
          return {
            outline: computed.outline,
            boxShadow: computed.boxShadow,
            border: computed.border
          };
        });

        // フォーカスインジケーターの存在確認
        const hasFocusIndicator = 
          focusStyles.outline !== 'none' || 
          focusStyles.boxShadow !== 'none' ||
          focusStyles.border !== 'none';
        
        expect(hasFocusIndicator).toBe(true);
      }
    });

    test('フォームアクセシビリティ', async () => {
      await page.goto('/auth/signup');

      // ラベル・入力要素の関連付け確認
      const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]');
      const inputCount = await inputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        
        // aria-label または label要素の存在確認
        const ariaLabel = await input.getAttribute('aria-label');
        const id = await input.getAttribute('id');
        
        if (!ariaLabel && id) {
          const label = page.locator(`label[for="${id}"]`);
          await expect(label).toBeVisible();
        } else {
          expect(ariaLabel).toBeTruthy();
        }

        // required属性の確認
        const required = await input.getAttribute('required');
        if (required !== null) {
          const ariaRequired = await input.getAttribute('aria-required');
          expect(ariaRequired).toBe('true');
        }
      }

      // エラーメッセージの関連付け確認
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="signup-submit"]');

      const errorMessage = page.locator('[data-testid="email-error"]');
      if (await errorMessage.isVisible()) {
        const ariaDescribedby = await page.locator('[data-testid="email-input"]')
          .getAttribute('aria-describedby');
        expect(ariaDescribedby).toBeTruthy();
      }
    });
  });

  test.describe('ユーザビリティ', () => {
    test('検索・フィルタリング機能', async () => {
      await loginAsTestUser(page);
      await page.goto('/learning');

      // 検索機能テスト
      await page.fill('[data-testid="search-input"]', 'ビットコイン');
      await page.waitForTimeout(500); // デバウンス待機

      const searchResults = page.locator('[data-testid="lesson-card"]');
      const resultCount = await searchResults.count();
      expect(resultCount).toBeGreaterThan(0);

      // 検索結果の関連性確認
      for (let i = 0; i < Math.min(resultCount, 3); i++) {
        const card = searchResults.nth(i);
        const text = await card.textContent();
        expect(text?.toLowerCase()).toMatch(/ビットコイン|bitcoin|btc/);
      }

      // フィルタリング機能
      await page.selectOption('[data-testid="difficulty-filter"]', 'beginner');
      await page.waitForTimeout(500);

      const filteredResults = page.locator('[data-testid="lesson-card"]');
      const filteredCount = await filteredResults.count();
      
      for (let i = 0; i < Math.min(filteredCount, 3); i++) {
        const card = filteredResults.nth(i);
        const difficulty = await card.locator('[data-testid="difficulty-badge"]').textContent();
        expect(difficulty).toContain('初級');
      }

      // 複合フィルタ
      await page.selectOption('[data-testid="category-filter"]', 'crypto-basics');
      await page.waitForTimeout(500);

      const doubleFilteredCount = await page.locator('[data-testid="lesson-card"]').count();
      expect(doubleFilteredCount).toBeLessThanOrEqual(filteredCount);
    });

    test('ドラッグ&ドロップ機能', async () => {
      await loginAsTestUser(page);
      await page.goto('/portfolio');

      // ポートフォリオアセットの並び替え
      const assetList = page.locator('[data-testid="asset-list"]');
      const firstAsset = assetList.locator('[data-testid="asset-item"]').first();
      const secondAsset = assetList.locator('[data-testid="asset-item"]').nth(1);

      // 要素の初期位置確認
      const firstAssetText = await firstAsset.textContent();
      const secondAssetText = await secondAsset.textContent();

      // ドラッグ&ドロップ実行
      await firstAsset.dragTo(secondAsset);
      await page.waitForTimeout(500);

      // 順序変更確認
      const newFirstAsset = assetList.locator('[data-testid="asset-item"]').first();
      const newFirstAssetText = await newFirstAsset.textContent();
      
      expect(newFirstAssetText).toBe(secondAssetText);

      // 変更保存確認
      await expect(page.locator('[data-testid="order-saved"]'))
        .toContainText('順序を保存しました');
    });

    test('ファイルアップロード機能', async () => {
      await loginAsTestUser(page);
      await page.goto('/portfolio/import');

      // ファイル選択エリア確認
      await expect(page.locator('[data-testid="file-upload-area"]')).toBeVisible();

      // ファイル選択（テストファイル）
      const fileInput = page.locator('[data-testid="file-input"]');
      
      // 模擬CSVファイル作成
      const csvContent = 'Symbol,Quantity,Price\nBTC,0.5,45000\nETH,10,3000';
      const blob = new Blob([csvContent], { type: 'text/csv' });
      
      // ファイルアップロード
      await fileInput.setInputFiles({
        name: 'portfolio.csv',
        mimeType: 'text/csv',
        buffer: Buffer.from(csvContent)
      });

      // アップロード進行確認
      await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
      
      // 処理完了確認
      await expect(page.locator('[data-testid="upload-success"]'))
        .toBeVisible({ timeout: 10000 });

      // インポート結果確認
      await expect(page.locator('[data-testid="imported-items"]'))
        .toContainText('2件のアイテムをインポート');

      // プレビュー確認
      await expect(page.locator('[data-testid="import-preview"]')).toBeVisible();
      await expect(page.locator('[data-testid="preview-item"]')).toHaveCount(2);
    });

    test('無限スクロール・仮想化', async () => {
      await loginAsTestUser(page);
      await page.goto('/alerts/history');

      // 初期アイテム数確認
      const initialItems = await page.locator('[data-testid="history-item"]').count();
      expect(initialItems).toBeGreaterThan(0);

      // スクロールして追加読み込み
      for (let i = 0; i < 3; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
        
        const currentItems = await page.locator('[data-testid="history-item"]').count();
        expect(currentItems).toBeGreaterThan(initialItems);
      }

      // ローディングインジケーター確認
      await expect(page.locator('[data-testid="loading-more"]')).toBeVisible();

      // 仮想化確認（DOM要素数の制限）
      const domItemCount = await page.locator('[data-testid="history-item"]').count();
      expect(domItemCount).toBeLessThan(200); // 仮想化により制限
    });
  });

  test.describe('エラーハンドリング・回復性', () => {
    test('ネットワークエラー対応', async () => {
      await loginAsTestUser(page);

      // API呼び出しを遮断
      await page.route('**/api/market/**', route => route.abort());
      
      await page.goto('/market');

      // エラー状態表示確認
      await expect(page.locator('[data-testid="network-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();

      // リトライ機能
      await page.unroute('**/api/market/**');
      await page.click('[data-testid="retry-button"]');

      // 復旧確認
      await expect(page.locator('[data-testid="market-data"]'))
        .toBeVisible({ timeout: 5000 });
    });

    test('オフライン対応', async () => {
      await loginAsTestUser(page);
      await page.goto('/dashboard');

      // オフライン状態シミュレーション
      await page.context().setOffline(true);
      await page.reload();

      // オフラインバナー表示
      await expect(page.locator('[data-testid="offline-banner"]')).toBeVisible();

      // キャッシュされたコンテンツ表示
      await expect(page.locator('[data-testid="cached-content"]')).toBeVisible();

      // オンライン復帰
      await page.context().setOffline(false);
      await page.waitForTimeout(1000);

      // 復帰通知
      await expect(page.locator('[data-testid="online-restored"]')).toBeVisible();
    });

    test('フォームバリデーション', async () => {
      await page.goto('/auth/signup');

      // 空フォーム送信
      await page.click('[data-testid="signup-submit"]');

      // バリデーションエラー表示
      await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="password-error"]')).toBeVisible();

      // 不正な形式入力
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.fill('[data-testid="password-input"]', '123');
      await page.click('[data-testid="signup-submit"]');

      // 詳細バリデーションエラー
      await expect(page.locator('[data-testid="email-format-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="password-strength-error"]')).toBeVisible();

      // 正しい入力
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      
      // エラーメッセージ消去確認
      await expect(page.locator('[data-testid="email-error"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="password-error"]')).not.toBeVisible();
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
});