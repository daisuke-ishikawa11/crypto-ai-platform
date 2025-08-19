// シンプルなRedisクライアント抽象。
// REDIS_URL が未設定の場合はメモリフォールバックを返します。

export type SimpleRedis = {
  lrange: (key: string, start: number, stop: number) => Promise<string[]>
  lpush: (key: string, ...values: string[]) => Promise<number>
  ltrim: (key: string, start: number, stop: number) => Promise<void>
  llen: (key: string) => Promise<number>
  get: (key: string) => Promise<string | null>
  set: (key: string, value: string, mode?: string, ttlSeconds?: number) => Promise<'OK' | null>
  setnx: (key: string, value: string) => Promise<number>
  rpush: (key: string, ...values: string[]) => Promise<number>
  incr: (key: string) => Promise<number>
  incrby: (key: string, by: number) => Promise<number>
  decrby: (key: string, by: number) => Promise<number>
  expire: (key: string, seconds: number) => Promise<number>
  ttl: (key: string) => Promise<number>
}

type MemoryStore = Map<string, string[]>

function getMemory(): MemoryStore {
  const g = global as unknown as Record<string, unknown>
  if (!g.__memory_redis_store) g.__memory_redis_store = new Map<string, string[]>()
  return g.__memory_redis_store as MemoryStore
}

function createMemoryClient(): SimpleRedis {
  const store = getMemory()
  return {
    async lrange(key: string, start: number, stop: number): Promise<string[]> {
      const arr = store.get(key) || []
      // Redisのlrangeはstopを含む。配列のsliceは除外なので+1。
      const end = stop >= 0 ? stop + 1 : arr.length + stop + 1
      const begin = start >= 0 ? start : Math.max(0, arr.length + start)
      return arr.slice(begin, end)
    },
    async lpush(key: string, ...values: string[]): Promise<number> {
      const arr = store.get(key) || []
      arr.unshift(...values)
      store.set(key, arr)
      return arr.length
    },
    async ltrim(key: string, start: number, stop: number): Promise<void> {
      const arr = store.get(key) || []
      const end = stop >= 0 ? stop + 1 : arr.length + stop + 1
      const begin = start >= 0 ? start : Math.max(0, arr.length + start)
      const next = arr.slice(begin, end)
      store.set(key, next)
    },
    async llen(key: string): Promise<number> {
      const arr = store.get(key) || []
      return arr.length
    },
    async get(key: string): Promise<string | null> {
      const arr = store.get(key) || []
      // 最後の要素を返す（prefs用途では単一値として利用）
      return arr.length ? String(arr[0]) : null
    },
    async set(key: string, value: string): Promise<'OK' | null> {
      store.set(key, [value])
      return 'OK'
    },
    async setnx(key: string, value: string): Promise<number> {
      const exists = store.has(key)
      if (exists) return 0
      store.set(key, [value])
      return 1
    },
    async rpush(key: string, ...values: string[]): Promise<number> {
      const arr = store.get(key) || []
      arr.push(...values)
      store.set(key, arr)
      return arr.length
    },
    async incr(key: string): Promise<number> {
      const arr = store.get(key) || []
      const n = (arr.length && !isNaN(Number(arr[0]))) ? Number(arr[0]) + 1 : 1
      store.set(key, [String(n)])
      return n
    },
    async incrby(key: string, by: number): Promise<number> {
      const inc = Number(by || 0)
      const arr = store.get(key) || []
      const base = (arr.length && !isNaN(Number(arr[0]))) ? Number(arr[0]) : 0
      const n = base + inc
      store.set(key, [String(n)])
      return n
    },
    async expire(_key: string, _seconds: number): Promise<number> { return 1 },
    async ttl(_key: string): Promise<number> { return 60 },
    async decrby(key: string, by: number): Promise<number> {
      const dec = Number(by || 0)
      const arr = store.get(key) || []
      const base = (arr.length && !isNaN(Number(arr[0]))) ? Number(arr[0]) : 0
      const n = base - dec
      store.set(key, [String(n)])
      return n
    },
  }
}

type IoRedisLike = {
  connect?: () => Promise<void>
  lrange: (key: string, start: number, stop: number) => Promise<string[]>
  lpush: (key: string, ...values: string[]) => Promise<number>
  ltrim: (key: string, start: number, stop: number) => Promise<void>
  llen?: (key: string) => Promise<number>
  rpush?: (key: string, ...values: string[]) => Promise<number>
  incr?: (key: string) => Promise<number>
  incrby?: (key: string, by: number) => Promise<number>
  decrby?: (key: string, by: number) => Promise<number>
  expire?: (key: string, seconds: number) => Promise<number>
  ttl?: (key: string) => Promise<number>
  get?: (key: string) => Promise<string | null>
  set?: (key: string, value: string) => Promise<'OK' | null>
  setnx?: (key: string, value: string) => Promise<number>
}

let redisClient: SimpleRedis | null | undefined

export async function getRedis(): Promise<SimpleRedis | null> {
  if (typeof redisClient !== 'undefined') return redisClient
  const url = process.env.REDIS_URL || ''
  if (!url) {
    // メモリフォールバック
    redisClient = createMemoryClient()
    return redisClient
  }
  try {
    const mod = await import('ioredis')
    const IORedis = (mod as unknown as { default: new (url: string, opts?: Record<string, unknown>) => IoRedisLike }).default
    const client: IoRedisLike = new IORedis(url, { lazyConnect: true, maxRetriesPerRequest: 3 })
    try { await client.connect?.() } catch {}
    // アダプタ実装
    const adapter: SimpleRedis = {
      async lrange(key: string, start: number, stop: number): Promise<string[]> {
        const res = await client.lrange(key, start, stop)
        return Array.isArray(res) ? res.map(String) : []
      },
      async lpush(key: string, ...values: string[]): Promise<number> {
        const n = await client.lpush(key, ...values)
        return Number(n || 0)
      },
      async ltrim(key: string, start: number, stop: number): Promise<void> {
        await client.ltrim(key, start, stop)
      },
      async llen(key: string): Promise<number> {
        if (client.llen) return await client.llen(key)
        const all = await client.lrange(key, 0, -1)
        return Array.isArray(all) ? all.length : 0
      },
      async get(key: string): Promise<string | null> {
        const v = await (client as unknown as { get: (k: string) => Promise<string | null> }).get(key)
        return v ?? null
      },
      async set(key: string, value: string): Promise<'OK' | null> {
        const ok = await (client.set ? client.set(key, value) : Promise.resolve<'OK' | null>('OK'))
        return ok ?? 'OK'
      },
      async setnx(key: string, value: string): Promise<number> {
        if (client.setnx) return await client.setnx(key, value)
        // try SET with NX if available → map to 1/0
        // setNX 等のオプション引数形式が一致しないため、get→setのフォールバックに統一
        const current = await this.get(key)
        if (current !== null) return 0
        await this.set(key, value)
        return 1
      },
      async rpush(key: string, ...values: string[]): Promise<number> {
        if (client.rpush) return await client.rpush(key, ...values)
        // 互換がない場合はLPUSHで代替（順序差異は許容）
        return await client.lpush(key, ...values)
      },
      async incr(key: string): Promise<number> { return client.incr ? await client.incr(key) : 1 },
      async incrby(key: string, by: number): Promise<number> {
        if (client.incrby) return await (client as unknown as { incrby: (k: string, n: number) => Promise<number> }).incrby(key, by)
        // フォールバック: get→加算→set
        const v = await (this.get(key))
        const base = v && !isNaN(Number(v)) ? Number(v) : 0
        const n = base + Number(by || 0)
        await this.set(key, String(n))
        return n
      },
      async expire(key: string, seconds: number): Promise<number> { return client.expire ? await client.expire(key, seconds) : 1 },
      async ttl(key: string): Promise<number> { return client.ttl ? await client.ttl(key) : 60 },
      async decrby(key: string, by: number): Promise<number> {
        if (client.decrby) return await (client as unknown as { decrby: (k: string, n: number) => Promise<number> }).decrby(key, by)
        if (client.incrby) return await (client as unknown as { incrby: (k: string, n: number) => Promise<number> }).incrby(key, -Number(by || 0))
        const v = await this.get(key)
        const base = v && !isNaN(Number(v)) ? Number(v) : 0
        const n = base - Number(by || 0)
        await this.set(key, String(n))
        return n
      },
    }
    redisClient = adapter
    return redisClient
  } catch {
    // 実Redis失敗時は安全にメモリへフォールバック
    redisClient = createMemoryClient()
    return redisClient
  }
}

export function getRedisKeyPrefix(): string {
  return (process.env.REDIS_COOLDOWN_PREFIX || 'cooldown:').replace(/\s+/g, '')
}
