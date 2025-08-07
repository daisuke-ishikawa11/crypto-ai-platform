// 最終本番環境テスト
import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://crypto-ai-platform-3tz2ml658-zeroone-98677824.vercel.app';

test.describe('最終本番環境テスト', () => {
  test('本番ランディングページが正しく表示される', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // ページタイトル確認（日本語対応）
    await expect(page).toHaveTitle(/暗号通貨|CryptoAI|Crypto AI/i);
    
    console.log('ページタイトル:', await page.title());
    console.log('現在のURL:', page.url());
    
    // ページが認証ページにリダイレクトされていないことを確認
    expect(page.url()).not.toContain('vercel.com/login');
    expect(page.url()).not.toContain('login');
    
    // メインコンテンツが表示されているか確認
    await expect(page.locator('body')).toBeVisible();
    
    // モダンデザイン要素の確認
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(500); // 十分なコンテンツがある
    
    // 特定のキーワードで新しいデザインかどうか確認
    const hasNewContent = 
      content!.includes('AIが導く') ||
      content!.includes('次世代投資') ||
      content!.includes('CryptoAI') ||
      content!.includes('超高品質') ||
      content!.includes('無料で始める');
    
    console.log('新しいコンテンツが存在:', hasNewContent);
    expect(hasNewContent).toBeTruthy();
    
    // ナビゲーション要素を確認
    const navigationExists = 
      (await page.locator('nav').count()) > 0 ||
      (await page.locator('[role="navigation"]').count()) > 0;
    
    console.log('ナビゲーションが存在:', navigationExists);
    
    // モダンUI要素を確認
    const hasModernUI = 
      (await page.locator('[class*="glass"]').count()) > 0 ||
      (await page.locator('[class*="gradient"]').count()) > 0 ||
      (await page.locator('[class*="modern"]').count()) > 0;
    
    console.log('モダンUI要素が存在:', hasModernUI);
  });

  test('認証フローのテスト', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // ログインボタンまたはリンクを探す
    const loginButton = page.locator('text=/ログイン|Login|サインイン/i').first();
    
    if (await loginButton.isVisible()) {
      await loginButton.click();
      
      // 認証ページに移動したか確認
      await page.waitForURL(/.*auth.*login.*/);
      console.log('認証ページURL:', page.url());
      
      // 認証ページが正しく表示されている
      expect(page.url()).not.toContain('vercel.com/login');
    } else {
      // 直接認証ページにアクセス
      await page.goto(PRODUCTION_URL + '/auth/login');
      console.log('直接認証ページアクセス:', page.url());
    }
    
    await page.waitForLoadState('networkidle');
    
    // ログインフォームの存在確認
    const hasLoginForm = 
      (await page.locator('input[type="email"]').count()) > 0 ||
      (await page.locator('input[type="password"]').count()) > 0;
    
    console.log('ログインフォームが存在:', hasLoginForm);
  });

  test('ダッシュボードの認証保護確認', async ({ page }) => {
    await page.goto(PRODUCTION_URL + '/dashboard');
    
    await page.waitForLoadState('networkidle');
    
    console.log('ダッシュボードアクセス後のURL:', page.url());
    
    // 認証が必要な場合は適切にリダイレクトされるか確認
    const isRedirectedToAuth = page.url().includes('/auth/') || page.url().includes('/login');
    
    console.log('認証ページにリダイレクトされた:', isRedirectedToAuth);
    expect(isRedirectedToAuth).toBeTruthy();
  });

  test('全体的なページパフォーマンス', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log('ページロード時間:', loadTime + 'ms');
    
    // 5秒以内にロードされることを確認
    expect(loadTime).toBeLessThan(5000);
    
    // レスポンスコードが正常であることを確認
    const response = await page.goto(PRODUCTION_URL);
    expect(response?.status()).toBe(200);
  });
});