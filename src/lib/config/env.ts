/**
 * Simple env accessors with parsing and sane defaults
 */

export function getEnvInt(name: string, defaultValue: number): number {
  const raw = process.env[name]
  if (!raw) return defaultValue
  const n = Number(raw)
  return Number.isFinite(n) ? n : defaultValue
}

export function getEnvBool(name: string, defaultValue: boolean): boolean {
  const raw = process.env[name]
  if (!raw) return defaultValue
  return /^(1|true|yes|on)$/i.test(raw)
}
