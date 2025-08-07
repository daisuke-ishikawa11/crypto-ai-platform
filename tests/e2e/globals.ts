// 🧪 E2Eテスト - グローバル設定・ユーティリティ
// 共通テストヘルパー・セットアップ・定数定義

import { test as base, expect, Page, BrowserContext } from '@playwright/test';

// テスト環境設定
export const TEST_CONFIG = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3002',
  timeout: {
    standard: 5000,
    ai: 30000,
    payment: 15000,
    api: 10000
  },
  users: {
    test: {
      email: 'test@example.com',
      password: 'password123',
      name: 'テスト 太郎'
    },
    pro: {
      email: 'pro@example.com', 
      password: 'password123',
      name: 'プロ 花子'
    },
    admin: {
      email: 'admin@example.com',
      password: 'password123',
      name: '管理者 次郎'
    }
  },
  testCards: {
    success: '4242424242424242',
    declined: '4000000000000002',
    insufficientFunds: '4000000000009995',
    expired: '4000000000000069',
    cvcFailed: '4000000000000127'
  }
};

// 拡張テストフィクスチャ
export type TestFixtures = {
  authenticatedPage: Page;
  proUserPage: Page;
  adminPage: Page;
  apiClient: ApiClient;
};

export class ApiClient {
  constructor(private context: BrowserContext) {}

  async request(method: string, url: string, options: any = {}) {
    return this.context.request.fetch(url, {
      method,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
  }

  async get(url: string, options?: any) {
    return this.request('GET', url, options);
  }

  async post(url: string, data?: any, options?: any) {
    return this.request('POST', url, {
      ...options,
      data: JSON.stringify(data)
    });
  }

  async put(url: string, data?: any, options?: any) {
    return this.request('PUT', url, {
      ...options,
      data: JSON.stringify(data)
    });
  }

  async delete(url: string, options?: any) {
    return this.request('DELETE', url, options);
  }
}

// 認証済みページフィクスチャ
export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await authenticateUser(page, TEST_CONFIG.users.test);
    await use(page);
    await context.close();
  },

  proUserPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await authenticateUser(page, TEST_CONFIG.users.pro);
    await upgradeToProPlan(page);
    await use(page);
    await context.close();
  },

  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await authenticateUser(page, TEST_CONFIG.users.admin);
    await use(page);
    await context.close();
  },

  apiClient: async ({ context }, use) => {
    const client = new ApiClient(context);
    await use(client);
  }
});

// 共通ヘルパー関数
export async function authenticateUser(page: Page, user: typeof TEST_CONFIG.users.test) {
  await page.goto('/auth/signin');
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);
  await page.click('[data-testid="signin-submit"]');
  await expect(page).toHaveURL(/.*dashboard/);
}

export async function upgradeToProPlan(page: Page) {
  await page.goto('/pricing');
  await page.click('[data-testid="select-plan-pro"]');
  await page.fill('[data-testid="card-number"]', TEST_CONFIG.testCards.success);
  await page.fill('[data-testid="card-expiry"]', '12/28');
  await page.fill('[data-testid="card-cvc"]', '123');
  await page.click('[data-testid="complete-payment"]');
  await expect(page.locator('[data-testid="payment-success"]')).toBeVisible();
}

export async function completeOnboarding(page: Page) {
  if (await page.locator('[data-testid="onboarding-modal"]').isVisible()) {
    await page.click('[data-testid="start-onboarding"]');
    await page.check('[data-testid="experience-beginner"]');
    await page.click('[data-testid="next-step"]');
    await page.check('[data-testid="topic-crypto-basics"]');
    await page.click('[data-testid="next-step"]');
    await page.click('[data-testid="risk-conservative"]');
    await page.click('[data-testid="next-step"]');
    await page.fill('[data-testid="learning-goal"]', 'Learn crypto basics');
    await page.click('[data-testid="complete-onboarding"]');
  }
}

export async function createAlert(page: Page, alertConfig: {
  type: string;
  symbol: string;
  threshold: string;
  name: string;
}) {
  await page.goto('/alerts');
  await page.click('[data-testid="create-alert"]');
  await page.selectOption('[data-testid="alert-type"]', alertConfig.type);
  await page.selectOption('[data-testid="alert-symbol"]', alertConfig.symbol);
  await page.fill('[data-testid="alert-threshold"]', alertConfig.threshold);
  await page.fill('[data-testid="alert-name"]', alertConfig.name);
  await page.check('[data-testid="notification-email"]');
  await page.click('[data-testid="save-alert"]');
  await expect(page.locator('[data-testid="alert-success"]')).toBeVisible();
}

export async function completeLesson(page: Page, lessonSlug: string) {
  await page.goto(`/learning/lessons/${lessonSlug}`);
  
  // レッスン進行
  for (let i = 0; i < 5; i++) {
    if (await page.locator('[data-testid="next-section"]').isVisible()) {
      await page.click('[data-testid="next-section"]');
      await page.waitForTimeout(300);
    }
  }

  // クイズ回答
  if (await page.locator('[data-testid="quiz-section"]').isVisible()) {
    await page.check('[data-testid="quiz-q1-answer-a"]');
    await page.check('[data-testid="quiz-q2-answer-b"]');
    await page.check('[data-testid="quiz-q3-answer-c"]');
    await page.click('[data-testid="submit-quiz"]');
  }

  await expect(page.locator('[data-testid="lesson-completed"]')).toBeVisible();
}

export async function waitForApiResponse(page: Page, url: string, timeout = 10000) {
  return page.waitForResponse(response => 
    response.url().includes(url) && response.status() === 200,
    { timeout }
  );
}

export async function interceptAndMockApi(page: Page, url: string, mockResponse: any) {
  await page.route(`**${url}`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse)
    });
  });
}

export async function waitForLoadingToComplete(page: Page) {
  // ローディングインジケーターが消えるまで待機
  await page.waitForSelector('[data-testid*="loading"]', { state: 'hidden', timeout: 10000 });
}

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
}

export async function measurePageLoadTime(page: Page, url: string): Promise<number> {
  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  return Date.now() - startTime;
}

export async function checkAccessibility(page: Page) {
  // 基本的なアクセシビリティ確認
  await expect(page.locator('h1')).toHaveCount(1); // h1は1つのみ
  await expect(page.locator('[role="main"]')).toBeVisible();
  await expect(page.locator('[role="navigation"]')).toBeVisible();
  
  // 画像のalt属性確認
  const images = page.locator('img');
  const imageCount = await images.count();
  for (let i = 0; i < imageCount; i++) {
    const img = images.nth(i);
    const alt = await img.getAttribute('alt');
    expect(alt).not.toBeNull();
  }
}

export async function testKeyboardNavigation(page: Page) {
  // Tabキーでフォーカス移動
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  
  // フォーカスインジケーター確認
  const focusedElement = page.locator(':focus');
  const outline = await focusedElement.evaluate(el => 
    getComputedStyle(el).outline || getComputedStyle(el).boxShadow
  );
  expect(outline).not.toBe('none');
}

export async function validateFormErrors(page: Page, formSelectors: {
  [field: string]: string;
}) {
  // 空フォーム送信でエラー確認
  for (const [field, selector] of Object.entries(formSelectors)) {
    await page.fill(selector, '');
  }
  
  await page.click('[data-testid*="submit"]');
  
  // エラーメッセージ表示確認
  for (const field of Object.keys(formSelectors)) {
    await expect(page.locator(`[data-testid="${field}-error"]`)).toBeVisible();
  }
}

export async function simulateNetworkError(page: Page, urlPattern: string) {
  await page.route(urlPattern, route => route.abort());
}

export async function simulateSlowNetwork(page: Page, urlPattern: string, delay: number = 2000) {
  await page.route(urlPattern, async route => {
    await new Promise(resolve => setTimeout(resolve, delay));
    await route.continue();
  });
}

export async function createTestData(page: Page, dataType: string, data: any) {
  // テストデータ作成ヘルパー
  const response = await page.request.post(`/api/test/${dataType}`, {
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  
  expect(response.ok()).toBe(true);
  return response.json();
}

export async function cleanupTestData(page: Page, dataType: string, id: string) {
  // テストデータクリーンアップ
  await page.request.delete(`/api/test/${dataType}/${id}`);
}

// カスタムマッチャー
expect.extend({
  async toHaveValidCryptoPrice(locator, symbol) {
    const text = await locator.textContent();
    const priceMatch = text?.match(/\$[\d,]+\.?\d*/);
    
    return {
      message: () => `Expected ${symbol} price to be valid format`,
      pass: !!priceMatch && parseFloat(priceMatch[0].replace(/[$,]/g, '')) > 0
    };
  },

  async toHaveCorrectPercentageFormat(locator) {
    const text = await locator.textContent();
    const percentMatch = text?.match(/[+-]?\d+\.?\d*%/);
    
    return {
      message: () => 'Expected percentage to be in correct format',
      pass: !!percentMatch
    };
  }
});

// エクスポート
export { expect };