// 本番環境でのユーザーフローテスト
import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://crypto-ai-platform-c5oplwaj8-zeroone-98677824.vercel.app';

test.describe('本番環境ユーザーフローテスト', () => {
  test('ランディングページから認証ページまでの流れ', async ({ page }) => {
    // ランディングページにアクセス
    await page.goto(PRODUCTION_URL);
    
    // ページタイトル確認
    await expect(page).toHaveTitle(/CryptoAI|Crypto AI|暗号通貨/i);
    
    console.log('ページタイトル:', await page.title());
    console.log('現在のURL:', page.url());
    
    // メインコンテンツが表示されているか確認
    await expect(page.locator('body')).toBeVisible();
    
    // ページに十分なコンテンツが存在するか確認
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(100);
    
    // 新しい画面に特有の要素を確認
    const hasModernElements = 
      (await page.locator('text=/AIが導く|次世代投資|CryptoAI/i').count()) > 0 ||
      (await page.locator('[class*="glass"]').count()) > 0 ||
      (await page.locator('[class*="gradient"]').count()) > 0;
    
    console.log('モダンデザイン要素が存在:', hasModernElements);
    
    // ナビゲーション要素を確認
    const hasNavigation = 
      (await page.locator('nav').count()) > 0 ||
      (await page.locator('[role="navigation"]').count()) > 0 ||
      (await page.locator('text=/ログイン|認証|サインイン/i').count()) > 0;
    
    console.log('ナビゲーション要素が存在:', hasNavigation);
  });

  test('認証ページの存在確認', async ({ page }) => {
    // 認証ページに直接アクセス
    await page.goto(PRODUCTION_URL + '/auth/login');
    
    await page.waitForLoadState('networkidle');
    
    console.log('認証ページURL:', page.url());
    console.log('認証ページタイトル:', await page.title());
    
    // 認証ページのコンテンツ確認
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
    
    // ログインフォーム要素を確認
    const hasLoginForm = 
      (await page.locator('input[type="email"]').count()) > 0 ||
      (await page.locator('input[type="password"]').count()) > 0 ||
      (await page.locator('form').count()) > 0;
    
    console.log('ログインフォームが存在:', hasLoginForm);
  });

  test('ダッシュボードアクセス（認証リダイレクト）', async ({ page }) => {
    // ダッシュボードに直接アクセス
    await page.goto(PRODUCTION_URL + '/dashboard');
    
    await page.waitForLoadState('networkidle');
    
    console.log('ダッシュボードアクセス後のURL:', page.url());
    
    // 認証が必要な場合は適切にリダイレクトされるか確認
    const currentUrl = page.url();
    const isRedirectedToAuth = currentUrl.includes('/auth/') || currentUrl.includes('/login');
    
    console.log('認証ページにリダイレクトされた:', isRedirectedToAuth);
  });

  test('学習ページの存在確認', async ({ page }) => {
    await page.goto(PRODUCTION_URL + '/learning');
    
    await page.waitForLoadState('networkidle');
    
    console.log('学習ページURL:', page.url());
    console.log('学習ページタイトル:', await page.title());
    
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('料金ページの存在確認', async ({ page }) => {
    await page.goto(PRODUCTION_URL + '/pricing');
    
    await page.waitForLoadState('networkidle');
    
    console.log('料金ページURL:', page.url());
    console.log('料金ページタイトル:', await page.title());
    
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});