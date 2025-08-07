// 🎯 認証保護解除の確認テスト - CLAUDE.md完全準拠
import { test, expect } from '@playwright/test';

const LATEST_PRODUCTION_URL = 'https://crypto-ai-platform-ka0xaijwk-zeroone-98677824.vercel.app';

test.describe('🚀 認証保護解除確認テスト - 超高品質', () => {
  test('✅ 本番ランディングページの公開アクセス確認', async ({ page }) => {
    console.log('🔍 アクセステスト開始:', LATEST_PRODUCTION_URL);
    
    const response = await page.goto(LATEST_PRODUCTION_URL);
    
    console.log('📊 HTTPステータス:', response?.status());
    console.log('🌐 実際のURL:', page.url());
    console.log('📋 ページタイトル:', await page.title());
    
    // ✅ 認証保護が解除されているか確認
    expect(response?.status()).toBe(200);
    expect(page.url()).not.toContain('vercel.com/login');
    expect(page.url()).not.toContain('sso-api');
    
    // ✅ 正常なページ表示確認
    await page.waitForLoadState('networkidle');
    
    // ✅ 新しいデザインの要素確認
    const content = await page.textContent('body');
    console.log('📄 コンテンツ長:', content?.length || 0);
    console.log('🎨 コンテンツ抜粋:', content?.substring(0, 300) || 'なし');
    
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(1000);
    
    // ✅ Ultra-modernデザイン要素の確認
    const hasUltraModernContent = 
      content!.includes('AIが導く') ||
      content!.includes('次世代投資') ||
      content!.includes('CryptoAI') ||
      content!.includes('暗号通貨AI') ||
      content!.includes('無料で始める') ||
      content!.includes('超高品質');
    
    console.log('🎯 Ultra-modernデザイン要素:', hasUltraModernContent);
    expect(hasUltraModernContent).toBeTruthy();
    
    // ✅ インタラクティブ要素の確認
    const navCount = await page.locator('nav').count();
    const buttonCount = await page.locator('button').count();
    const linkCount = await page.locator('a').count();
    
    console.log('🔧 ナビゲーション要素:', navCount);
    console.log('🔘 ボタン要素:', buttonCount);
    console.log('🔗 リンク要素:', linkCount);
    
    expect(navCount + buttonCount + linkCount).toBeGreaterThan(10);
  });
  
  test('✅ 認証フローのテスト - LP→ログイン', async ({ page }) => {
    await page.goto(LATEST_PRODUCTION_URL);
    
    // ✅ ログインボタンまたはリンクを探す
    const loginElement = page.locator('text=/ログイン|Login|サインイン/i').first();
    
    if (await loginElement.isVisible()) {
      console.log('🔐 ログイン要素発見');
      await loginElement.click();
      
      // ✅ 認証ページに移動確認
      await page.waitForURL(/.*auth.*login.*/);
      console.log('🎯 認証ページURL:', page.url());
      
      // ✅ 自社の認証ページか確認（Vercel認証でない）
      expect(page.url()).not.toContain('vercel.com');
      expect(page.url()).toContain('auth');
    } else {
      console.log('⚠️ ログイン要素が見つからない - 直接認証ページテスト');
      await page.goto(LATEST_PRODUCTION_URL + '/auth/login');
    }
    
    console.log('📍 最終認証ページURL:', page.url());
  });
  
  test('✅ パフォーマンス・品質確認', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(LATEST_PRODUCTION_URL);
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log('⚡ ページロード時間:', loadTime + 'ms');
    
    // ✅ CLAUDE.md品質基準（2秒以内）
    expect(loadTime).toBeLessThan(2000);
    
    // ✅ DOM要素の十分な読み込み確認
    const elementCount = await page.locator('*').count();
    console.log('🔢 DOM要素数:', elementCount);
    expect(elementCount).toBeGreaterThan(100);
  });
});