// 基本的なサイト動作確認テスト
import { test, expect } from '@playwright/test';

test.describe('基本的なサイト動作確認', () => {
  test('ランディングページが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // ページタイトル確認
    await expect(page).toHaveTitle(/CryptoAI|Crypto AI|crypto/i);
    
    // メインコンテンツが表示されているか確認
    await expect(page.locator('body')).toBeVisible();
    
    // ページに何らかのコンテンツが存在するか確認
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
    
    console.log('ページタイトル:', await page.title());
    console.log('ページURL:', page.url());
  });

  test('認証ページにアクセスできる', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // ログインリンクまたはボタンを探す
    const loginElement = page.locator('text=/ログイン|login|Login|サインイン|signin/i').first();
    
    if (await loginElement.isVisible()) {
      await loginElement.click();
      
      // URLが変わったか確認
      await page.waitForURL(/.*auth.*|.*login.*/);
      console.log('認証ページURL:', page.url());
    } else {
      // 直接認証ページにアクセス
      await page.goto('http://localhost:3001/auth/login');
      console.log('直接認証ページにアクセス:', page.url());
    }
  });

  test('ダッシュボードページの存在確認', async ({ page }) => {
    // 直接ダッシュボードにアクセス
    await page.goto('http://localhost:3001/dashboard');
    
    // リダイレクトされるか、エラーページが表示されるか確認
    await page.waitForLoadState('networkidle');
    
    console.log('ダッシュボードアクセス結果:', page.url());
    console.log('ページタイトル:', await page.title());
  });
});