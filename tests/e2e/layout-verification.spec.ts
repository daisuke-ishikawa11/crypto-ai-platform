import { test, expect } from '@playwright/test';

test.describe('Layout Verification Tests', () => {
  test.beforeEach(async ({ page }) => {
    // サーバーが確実に起動していることを確認
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  });

  test('ヘッダーの余白とスタイルが正しく設定されている', async ({ page }) => {
    // ヘッダー要素を取得
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // ヘッダー内のコンテナ要素を取得
    const headerContainer = header.locator('.container');
    await expect(headerContainer).toBeVisible();

    // py-6 クラス（上下 1.5rem の余白）が適用されているか確認
    await expect(headerContainer).toHaveClass(/py-6/);

    // ヘッダーの高さを確認（余白が適切に設定されているか）
    const headerBox = await header.boundingBox();
    expect(headerBox?.height).toBeGreaterThan(80); // 最小限の高さを確保
  });

  test('メインタイトルが適切なサイズで表示されている', async ({ page }) => {
    // メインタイトルを取得
    const mainTitle = page.locator('h1').first();
    await expect(mainTitle).toBeVisible();

    // タイトルのクラスを確認
    await expect(mainTitle).toHaveClass(/text-4xl/);
    await expect(mainTitle).toHaveClass(/md:text-5xl/);
    await expect(mainTitle).toHaveClass(/lg:text-6xl/);

    // タイトルのテキスト内容を確認
    const titleText = await mainTitle.textContent();
    expect(titleText).toContain('AIと始める');
    expect(titleText).toContain('投資総合');
    expect(titleText).toContain('プラットフォーム');

    // タイトルの表示位置を確認（画面からはみ出していないか）
    const titleBox = await mainTitle.boundingBox();
    const pageBox = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight
    }));
    
    expect(titleBox?.width).toBeLessThanOrEqual(pageBox.width);
  });

  test('ヘッダーナビゲーションが正しく表示されている', async ({ page }) => {
    // ログインボタン
    const loginButton = page.locator('a[href="/auth/login"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('ログイン');

    // 無料で始めるボタン
    const registerButton = page.locator('a[href="/auth/register"]');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toContainText('無料で始める');

    // ナビゲーションメニュー（デスクトップ表示）
    const navItems = page.locator('nav a');
    await expect(navItems.nth(0)).toContainText('機能');
    await expect(navItems.nth(1)).toContainText('使い方');
    await expect(navItems.nth(2)).toContainText('料金');
  });

  test('レスポンシブデザインが正しく動作している', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1280, height: 720 });
    const desktopTitle = page.locator('h1').first();
    const desktopTitleBox = await desktopTitle.boundingBox();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500); // レイアウトの変更を待つ
    const tabletTitleBox = await desktopTitle.boundingBox();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    const mobileTitleBox = await desktopTitle.boundingBox();
    
    // それぞれのサイズでタイトルが表示されていることを確認
    expect(desktopTitleBox?.width).toBeGreaterThan(0);
    expect(tabletTitleBox?.width).toBeGreaterThan(0);
    expect(mobileTitleBox?.width).toBeGreaterThan(0);
    
    // モバイルメニューボタンが表示されているか確認
    const mobileMenuButton = page.locator('button').filter({ hasText: /menu/i });
    await expect(mobileMenuButton).toBeVisible();
  });

  test('ヒーローセクションのスタイルが正しく適用されている', async ({ page }) => {
    // ヒーローセクション
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // pt-36 クラス（上部余白）が適用されているか確認
    await expect(heroSection).toHaveClass(/pt-36/);
    
    // 信頼バッジが表示されているか
    const trustBadge = page.locator('text=最新AI技術搭載');
    await expect(trustBadge).toBeVisible();
    
    // CTAボタンが表示されているか
    const ctaButtons = page.locator('a').filter({ hasText: /学習を無料で始める|3分で見るデモ/ });
    await expect(ctaButtons).toHaveCount(2);
  });

  test('ページの読み込み速度が適切である', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // 3秒以内に読み込まれることを確認
    expect(loadTime).toBeLessThan(3000);
  });
});