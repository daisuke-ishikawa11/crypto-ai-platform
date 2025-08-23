import { test, expect } from '@playwright/test'

test.describe('DeFi smoke', () => {
  test('search API and AI stats', async ({ request }) => {
    const r1 = await request.get('/api/defi/pools/search?q=usdc&includeUniswap=true&limit=3')
    expect(r1.ok()).toBeTruthy()
    const r2 = await request.get('/api/defi/risk/ai-stats')
    expect(r2.ok()).toBeTruthy()
  })
})
