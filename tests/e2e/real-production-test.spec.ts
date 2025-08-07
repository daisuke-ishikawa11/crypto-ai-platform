// 実際の本番URLテスト
import { test, expect } from '@playwright/test';

const REAL_PRODUCTION_URL = 'https://crypto-ai-platform-nightmare0614-3913-zeroone-98677824.vercel.app';

test.describe('実際の本番URLテスト', () => {
  test('真の本番ランディングページ確認', async ({ page }) => {
    console.log('アクセス中のURL:', REAL_PRODUCTION_URL);
    
    await page.goto(REAL_PRODUCTION_URL);
    
    console.log('実際にアクセスしたURL:', page.url());
    console.log('ページタイトル:', await page.title());
    
    // 認証ページにリダイレクトされていないことを確認
    expect(page.url()).not.toContain('vercel.com/login');
    
    // ページが正常に読み込まれているか確認
    await page.waitForLoadState('networkidle');
    
    // ページコンテンツの存在確認
    const content = await page.textContent('body');
    console.log('ページコンテンツの長さ:', content?.length || 0);
    console.log('コンテンツの一部:', content?.substring(0, 200) || 'コンテンツなし');
    
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(100);
    
    // 新しいデザインの特徴的な要素を確認
    const hasNewDesign = 
      content!.includes('AIが導く') ||
      content!.includes('次世代投資') ||
      content!.includes('CryptoAI') ||
      content!.includes('暗号通貨AI') ||
      content!.includes('無料で始める');
    
    console.log('新しいデザイン要素が存在:', hasNewDesign);
    
    // ナビゲーション要素の確認
    const navCount = await page.locator('nav').count();
    const buttonCount = await page.locator('button').count();
    const linkCount = await page.locator('a').count();
    
    console.log('ナビゲーション要素数:', navCount);
    console.log('ボタン数:', buttonCount);
    console.log('リンク数:', linkCount);
    
    // UI要素が十分存在するか確認
    expect(navCount + buttonCount + linkCount).toBeGreaterThan(5);
  });
  
  test('レスポンス状況確認', async ({ page }) => {
    const response = await page.goto(REAL_PRODUCTION_URL);
    
    console.log('HTTPステータス:', response?.status());
    console.log('レスポンスURL:', response?.url());
    
    // 正常なレスポンスコードを確認
    expect(response?.status()).toBe(200);
  });
});