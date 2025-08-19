import type { GrantCategoryTestTicketsParams, GrantResult } from '../rewards'

export async function grantCategoryTestTickets(_params: GrantCategoryTestTicketsParams): Promise<GrantResult> {
  // テスト用モック：即成功・付与0・refreshイベント発火
  try { if (typeof window !== 'undefined') window.dispatchEvent(new Event('tickets:refresh')) } catch {}
  return { success: true, granted: 0, balance: 0 }
}
