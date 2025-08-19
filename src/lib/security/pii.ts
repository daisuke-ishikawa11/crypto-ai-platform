/**
 * 🛡️ PII Masking Utilities
 * メール・電話・トークン等の個人情報を保存/ログ出力前にマスクします
 */

const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})/g
const PHONE_REGEX = /\+?\d[\d\-\s()]{6,}\d/g
const TOKEN_REGEX = /([A-Za-z0-9]{10,})/g

export function maskEmail(value: string): string {
  return value.replace(EMAIL_REGEX, (_m, user: string, domain: string, tld: string) => {
    const u = user.length <= 2 ? '*'.repeat(user.length) : user[0] + '*'.repeat(user.length - 2) + user[user.length - 1]
    const d = domain.length <= 2 ? '*'.repeat(domain.length) : domain[0] + '*'.repeat(Math.max(0, domain.length - 2)) + domain[domain.length - 1]
    return `${u}@${d}${tld}`
  })
}

export function maskPhone(value: string): string {
  return value.replace(PHONE_REGEX, (m) => {
    const digits = m.replace(/\D/g, '')
    if (digits.length <= 4) return '*'.repeat(digits.length)
    const visible = digits.slice(-4)
    return `***-****-${visible}`
  })
}

export function maskToken(value: string): string {
  return value.replace(TOKEN_REGEX, (m) => {
    if (m.length <= 6) return '*'.repeat(m.length)
    const head = m.slice(0, 2)
    const tail = m.slice(-2)
    return `${head}${'*'.repeat(m.length - 4)}${tail}`
  })
}

export function maskPIIInString(value: string): string {
  let v = value
  v = maskEmail(v)
  v = maskPhone(v)
  v = maskToken(v)
  return v
}

/**
 * 入力オブジェクト内の文字列を再帰的にマスク
 */
export function maskPIIDeep<T>(input: T): T {
  if (input == null) return input
  if (typeof input === 'string') return maskPIIInString(input) as unknown as T
  if (Array.isArray(input)) return input.map((v) => maskPIIDeep(v)) as unknown as T
  if (typeof input === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      out[k] = maskPIIDeep(v)
    }
    return out as unknown as T
  }
  return input
}

export function shouldMaskPII(): boolean {
  // 既定で有効。明示的に 'false' の場合のみ無効化
  return process.env.PII_MASKING_ENABLED !== 'false'
}
