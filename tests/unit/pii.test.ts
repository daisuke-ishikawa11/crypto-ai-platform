import { maskEmail, maskPhone, maskToken, maskPIIInString, maskPIIDeep, shouldMaskPII } from '../../src/lib/security/pii'

describe('security/pii', () => {
  it('masks emails', () => {
    const src = 'contact me at john.doe@example.com'
    const masked = maskEmail(src)
    expect(masked).not.toContain('john.doe@example.com')
    expect(masked).toMatch(/@.*\./)
  })

  it('masks phone numbers', () => {
    const src = 'Call +1 (555) 123-4567 today'
    const masked = maskPhone(src)
    expect(masked).not.toContain('5551234567')
    expect(masked).toMatch(/\*{3}-\*{4}-\d{4}/)
  })

  it('masks tokens', () => {
    const src = 'token: ABCDEFGHIJKLMNOP'
    const masked = maskToken(src)
    expect(masked).not.toContain('ABCDEFGHIJKLMNOP')
    expect(masked).toMatch(/AB\*+OP/) // keeps first two and last two characters
  })

  it('maskPIIInString applies all strategies', () => {
    const src = 'Email: a@b.co, Phone: +81 90-1234-5678, Token: ZYXWVUTSRQ'
    const masked = maskPIIInString(src)
    expect(masked).not.toContain('a@b.co')
    expect(masked).not.toContain('9012345678')
    expect(masked).not.toContain('ZYXWVUTSRQ')
  })

  it('maskPIIDeep masks nested objects/arrays', () => {
    const src = {
      email: 'alice@example.org',
      phones: ['+44 7700 900123'],
      nested: { token: 'qwertyuiopasdf' }
    }
    const masked = maskPIIDeep(src)
    expect(JSON.stringify(masked)).not.toContain('alice@example.org')
    expect(JSON.stringify(masked)).not.toContain('7700900123')
    expect(JSON.stringify(masked)).not.toContain('qwertyuiopasdf')
  })

  it('shouldMaskPII defaults to true', () => {
    const prev = process.env.PII_MASKING_ENABLED
    delete process.env.PII_MASKING_ENABLED
    expect(shouldMaskPII()).toBe(true)
    process.env.PII_MASKING_ENABLED = prev
  })
})
