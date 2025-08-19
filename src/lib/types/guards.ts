// 共通型ガード/ユーティリティ（unknown安全化）

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toRecord<T extends Record<string, unknown> = Record<string, unknown>>(value: unknown): T {
  return (isRecord(value) ? (value as T) : ({} as T));
}

export function isArrayOfRecord(arr: unknown): arr is Array<Record<string, unknown>> {
  return Array.isArray(arr) && arr.every(isRecord);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
