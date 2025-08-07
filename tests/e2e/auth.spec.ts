import { test, expect } from '@playwright/test';

/**
 * E2E tests for authentication flow
 * Testing real authentication with Supabase - no mocks
 */

test.describe('Authentication Flow', () => {
  test('should show landing page with login/register buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for main elements - text is split across lines
    await expect(page.locator('h2').first()).toBeVisible();
    await expect(page.locator('h2').first()).toContainText('AIの力で暗号通貨取引を');
    await expect(page.getByRole('link', { name: 'ログイン' })).toBeVisible();
    await expect(page.getByRole('link', { name: '無料で始める' })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'ログイン' }).click();
    
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('h1')).toContainText('ログイン');
    await expect(page.getByPlaceholder('user@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Try to login with invalid credentials
    await page.getByPlaceholder('user@example.com').fill('invalid@example.com');
    await page.getByPlaceholder('••••••••').fill('wrongpassword');
    await page.getByRole('button', { name: 'ログイン' }).click();
    
    // Should show error message
    await expect(page.locator('.text-destructive')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: '無料で始める' }).click();
    
    await expect(page).toHaveURL('/auth/register');
    await expect(page.locator('h1')).toContainText('アカウント作成');
    
    // Check all form fields
    await expect(page.getByPlaceholder('田中太郎')).toBeVisible();
    await expect(page.getByPlaceholder('user@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();
  });

  test('should validate registration form', async ({ page }) => {
    await page.goto('/auth/register');
    
    // Try to submit empty form
    await page.getByRole('button', { name: '作成' }).click();
    
    // Browser validation should prevent submission
    const emailInput = page.getByPlaceholder('user@example.com');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('should redirect to login from register page', async ({ page }) => {
    await page.goto('/auth/register');
    
    await page.getByRole('link', { name: 'ログイン' }).click();
    await expect(page).toHaveURL('/auth/login');
  });
});

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL('/auth/login');
  });

  test('should redirect to login when accessing AI chat without auth', async ({ page }) => {
    await page.goto('/ai/chat');
    
    // Should redirect to login
    await expect(page).toHaveURL('/auth/login');
  });

  test('should redirect to login when accessing market analysis without auth', async ({ page }) => {
    await page.goto('/market/analysis');
    
    // Should redirect to login
    await expect(page).toHaveURL('/auth/login');
  });

  test('should redirect to login when accessing explainable AI without auth', async ({ page }) => {
    await page.goto('/explainable-ai');
    
    // Should redirect to login
    await expect(page).toHaveURL('/auth/login');
  });
}); 