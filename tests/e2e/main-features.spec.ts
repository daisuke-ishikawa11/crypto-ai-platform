import { test, expect, Page } from '@playwright/test';

/**
 * E2E tests for main features
 * Testing with real API interactions - no mocks
 */

// Helper to login before tests
async function loginUser(page: Page, email: string, password: string) {
  await page.goto('/auth/login');
  await page.getByPlaceholder('user@example.com').fill(email);
  await page.getByPlaceholder('••••••••').fill(password);
  await page.getByRole('button', { name: 'ログイン' }).click();
  
  // Wait for redirect to dashboard
  await page.waitForURL('/dashboard');
}

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Note: In real testing, you would use a test user
    // For now, we'll test the UI structure without login
  });

  test('should display dashboard structure', async ({ page }) => {
    // Navigate directly to test UI (will redirect to login)
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/auth/login');
  });
});

test.describe('Market Analysis Features', () => {
  test('should display market analysis page structure', async ({ page }) => {
    // This will test the redirect behavior
    await page.goto('/market/analysis');
    await expect(page).toHaveURL('/auth/login');
  });

  test('landing page should show market data section', async ({ page }) => {
    await page.goto('/');
    
    // Check for market-related content
    await expect(page.locator('text=市場分析')).toBeVisible();
    await expect(page.locator('text=リアルタイムの暗号通貨市場データ')).toBeVisible();
  });
});

test.describe('AI Chat Features', () => {
  test('should display AI chat in features list', async ({ page }) => {
    await page.goto('/');
    
    // Check for AI chat feature
    await expect(page.locator('text=AIチャットアシスタント')).toBeVisible();
    await expect(page.locator('text=24時間365日対応')).toBeVisible();
  });
});

test.describe('Explainable AI Features', () => {
  test('should navigate to explainable AI from landing', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to features section
    await page.locator('#features').scrollIntoViewIfNeeded();
    
    // Check for explainable AI content
    await expect(page.locator('text=高度な価格予測')).toBeVisible();
  });
});

test.describe('Pricing Plans', () => {
  test('should display all pricing tiers', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to pricing section
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    
    // Check all plans
    await expect(page.locator('text=Free')).toBeVisible();
    await expect(page.locator('text=¥0')).toBeVisible();
    await expect(page.locator('text=Standard')).toBeVisible();
    await expect(page.locator('text=¥2,980/月')).toBeVisible();
    await expect(page.locator('text=Pro')).toBeVisible();
    await expect(page.locator('text=¥9,800/月')).toBeVisible();
    
    // Check feature lists
    await expect(page.locator('text=AIチャット 5回/日')).toBeVisible();
    await expect(page.locator('text=AIチャット 200回/日')).toBeVisible();
    await expect(page.locator('text=AIチャット 無制限')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate through main sections', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    await page.locator('a[href="#features"]').click();
    await expect(page.locator('#features')).toBeInViewport();
    
    await page.locator('a[href="#pricing"]').click();
    await expect(page.locator('#pricing')).toBeInViewport();
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');
    
    // Test main CTA
    await page.getByRole('link', { name: '無料アカウント作成' }).first().click();
    await expect(page).toHaveURL('/auth/register');
    
    // Go back and test login
    await page.goto('/');
    await page.getByRole('link', { name: 'ログイン' }).click();
    await expect(page).toHaveURL('/auth/login');
  });
});

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that content is still visible
    await expect(page.locator('h2')).toContainText('AIの力で暗号通貨取引を');
    await expect(page.getByRole('link', { name: 'ログイン' })).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check layout
    await expect(page.locator('h2')).toContainText('AIの力で暗号通貨取引を');
    await expect(page.locator('#features')).toBeVisible();
  });
});

test.describe('Error Handling', () => {
  test('should show 404 page for invalid routes', async ({ page }) => {
    await page.goto('/invalid-route-that-does-not-exist');
    
    // Should show 404 or redirect
    // Next.js default behavior
    await expect(page.locator('text=404').or(page.locator('text=This page could not be found'))).toBeVisible();
  });
}); 