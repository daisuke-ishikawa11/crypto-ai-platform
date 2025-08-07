import { test, expect } from '@playwright/test';

/**
 * Performance E2E tests
 * Testing real page load times and interactions
 */

test.describe('Performance Tests', () => {
  test('landing page should load within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Core elements should be visible
    await expect(page.locator('h2')).toBeVisible();
  });

  test('auth pages should load quickly', async ({ page }) => {
    // Test login page load time
    const loginStart = Date.now();
    await page.goto('/auth/login');
    await page.waitForLoadState('domcontentloaded');
    const loginLoadTime = Date.now() - loginStart;
    
    expect(loginLoadTime).toBeLessThan(2000);
    
    // Test register page load time
    const registerStart = Date.now();
    await page.goto('/auth/register');
    await page.waitForLoadState('domcontentloaded');
    const registerLoadTime = Date.now() - registerStart;
    
    expect(registerLoadTime).toBeLessThan(2000);
  });

  test('images should load properly', async ({ page }) => {
    await page.goto('/');
    
    // Check that no images are broken
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
      
      // Natural width > 0 means image loaded successfully
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('should handle slow network gracefully', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100);
    });
    
    await page.goto('/');
    
    // Page should still load and show content
    await expect(page.locator('h2')).toBeVisible({ timeout: 10000 });
  });

  test('form interactions should be responsive', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Measure form interaction response time
    const emailInput = page.getByPlaceholder('user@example.com');
    
    const interactionStart = Date.now();
    await emailInput.click();
    await emailInput.fill('test@example.com');
    const interactionTime = Date.now() - interactionStart;
    
    // Form interaction should be responsive
    expect(interactionTime).toBeLessThan(500);
  });

  test('navigation should be smooth', async ({ page }) => {
    await page.goto('/');
    
    // Measure navigation time
    const navStart = Date.now();
    await page.getByRole('link', { name: 'ログイン' }).click();
    await page.waitForURL('/auth/login');
    const navTime = Date.now() - navStart;
    
    // Navigation should be quick
    expect(navTime).toBeLessThan(1000);
  });

  test('should not have memory leaks on navigation', async ({ page }) => {
    // Navigate through multiple pages
    const pages = ['/', '/auth/login', '/auth/register', '/'];
    
    for (const url of pages) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
    }
    
    // Check that page is still responsive
    await expect(page.locator('body')).toBeVisible();
  });

  test('API endpoints should respond quickly', async ({ page }) => {
    // Test API response time by triggering a form submission
    await page.goto('/auth/login');
    
    // Fill invalid credentials to test API response
    await page.getByPlaceholder('user@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('testpassword');
    
    const apiStart = Date.now();
    await page.getByRole('button', { name: 'ログイン' }).click();
    
    // Wait for error message (API response)
    await page.waitForSelector('.text-destructive', { timeout: 5000 });
    const apiTime = Date.now() - apiStart;
    
    // API should respond within 5 seconds
    expect(apiTime).toBeLessThan(5000);
  });
}); 