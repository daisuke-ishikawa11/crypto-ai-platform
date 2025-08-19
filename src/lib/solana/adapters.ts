// Solana DEX SDK adapters (Raydium / Orca)
// SDKが存在しない環境では null を返し、呼び出し側でフォールバック（DefiLlama等）します。

export type SolanaPoolLike = {
  id: string
  name: string
  protocol: 'raydium' | 'orca'
  chain: 'solana'
  tvlUsd?: number
  apy?: number
  address?: string
  tokenA?: string
  tokenB?: string
  url?: string
}

async function safeDynamicImport(moduleId: string): Promise<unknown | null> {
  try {
    // 実行時にのみ解決を試み、バンドラの静的解析を回避
    const importer = new Function('m', 'return import(m)') as (m: string) => Promise<unknown>
    const mod = await importer(moduleId)
    return mod ?? null
  } catch {
    return null
  }
}

// フォールバック: DefiLlama経由で Solana のRaydium/Orcaプールを取得
import { fetchDexPools } from '@/lib/defi/dex-integrations'
import { fetchJsonWithRetry } from '@/lib/utils/http'
import { resolveSdkOptions } from '@/lib/sdk/types'
import { cacheManager, CacheLayer } from '@/lib/cache/cache-manager'
async function fetchSolanaPoolsFallback(protocolKey: 'raydium' | 'orca', limit = 50): Promise<SolanaPoolLike[]> {
  const key = protocolKey === 'raydium' ? ['raydium'] : ['orca']
  const items = await fetchDexPools(key, 'solana').catch(() => [])
  return items
    .filter(e => e.protocol.blockchain === 'solana')
    .slice(0, Math.max(1, limit))
    .map(e => ({
      id: e.id,
      name: e.name,
      protocol: protocolKey,
      chain: 'solana' as const,
      tvlUsd: e.totalStakedUsd,
      apy: e.apy,
      address: e.address,
      tokenA: undefined,
      tokenB: undefined,
      url: e.protocol.website || undefined
    }))
}

// --- Phase 2: RPCベースの手数料APR推定（可能な場合のみ計算し、失敗時はnull） ---
type RpcEstimationOptions = {
  feeRate?: number // 例: 0.003（30bps）
  ttlMs?: number // キャッシュTTL（デフォルト: 5分）
  txSampleLimit?: number // 取得する最大トランザクション件数（デフォルト: 50）
  totalTxLimit?: number // 24h内の探索上限（デフォルト: 500）
}

async function estimateFeeAprFromRpc(
  poolAddress: string,
  tvlUsd: number | undefined,
  options?: RpcEstimationOptions
): Promise<number | null> {
  // 入力の妥当性チェック
  if (!poolAddress || typeof poolAddress !== 'string') return null
  const tvl = Number(tvlUsd || 0)
  if (!(tvl > 0)) return null

  const ttlMs = typeof options?.ttlMs === 'number' && options?.ttlMs > 0 ? options.ttlMs : 5 * 60_000
  const txSampleLimit = Math.max(1, Math.min(200, options?.txSampleLimit ?? 50))
  const totalTxLimit = Math.max(txSampleLimit, Math.min(2000, options?.totalTxLimit ?? 500))
  const feeRate = typeof options?.feeRate === 'number' && options.feeRate >= 0 ? options.feeRate : 0.003

  const cacheKey = `solana:rpc:feeApr:${poolAddress}:${feeRate}`
  const cached = await cacheManager.get<number>(cacheKey, { layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
  if (cached !== null) return cached

  // 動的import
  const web3 = await safeDynamicImport('@solana/web3.js')
  if (!web3) return null
  try {
    const nowSec = Math.floor(Date.now() / 1000)
    const sinceSec = nowSec - 86_400 // 過去24h

    const ConnectionCtor = (web3 as Record<string, unknown>)['Connection'] as (new (url: string, commitment?: unknown) => unknown)
    const PublicKeyCtor = (web3 as Record<string, unknown>)['PublicKey'] as (new (v: string) => unknown)
    if (!ConnectionCtor || !PublicKeyCtor) return null

    const rpcUrl = (typeof process.env.SOLANA_RPC_URL === 'string' && process.env.SOLANA_RPC_URL.trim())
      ? process.env.SOLANA_RPC_URL.trim()
      : 'https://api.mainnet-beta.solana.com'
    const connection = new ConnectionCtor(rpcUrl, 'confirmed') as unknown as {
      getSignaturesForAddress: (addr: unknown, opts?: { limit?: number; before?: string; until?: string }) => Promise<Array<{ signature: string; blockTime?: number }>>
      getTransaction: (sig: string, opts?: unknown) => Promise<unknown>
    }
    const poolKey = new PublicKeyCtor(poolAddress) as unknown

    // リトライ付き実行ヘルパ
    async function withRetry<T>(fn: () => Promise<T>, retries = 2, backoffMs = 500): Promise<T> {
      let lastErr: unknown
      for (let i = 0; i <= retries; i++) {
        try { return await fn() } catch (e) {
          lastErr = e
          if (i < retries) await new Promise(r => setTimeout(r, backoffMs * Math.pow(2, i)))
        }
      }
      throw lastErr
    }

    // 24h内のシグネチャを収集（多すぎる場合は途中で打ち切り）
    const signatures: Array<{ signature: string; blockTime?: number }> = []
    let before: string | undefined = undefined
    while (signatures.length < totalTxLimit) {
      const chunk = await withRetry(() => connection.getSignaturesForAddress(poolKey as unknown, { limit: Math.min(1000, totalTxLimit - signatures.length), before }))
      if (!chunk || chunk.length === 0) break
      for (const s of chunk) {
        if (!s || !s.signature) continue
        if (typeof s.blockTime === 'number' && s.blockTime < sinceSec) {
          before = s.signature
          // さらに古い分もある可能性はあるが24h越えなので打ち切り
          signatures.push(s)
          break
        }
        signatures.push(s)
      }
      const last = chunk[chunk.length - 1]
      if (!last) break
      before = last.signature
      // 直近24h判定（最古が24hより古ければ停止）
      const tooOld = typeof last.blockTime === 'number' && last.blockTime < sinceSec
      if (tooOld) break
    }

    if (signatures.length === 0) return null

    // サンプリング取得
    const sample = signatures.slice(0, txSampleLimit)
    // 取引詳細を取得（タイムアウト安全のためPromise.race）
    const timeoutMs = 7_000
    async function withTimeout<T>(p: Promise<T>): Promise<T> {
      return await Promise.race<T>([
        p,
        new Promise<T>((_, rej) => setTimeout(() => rej(new Error('RPC timeout')), timeoutMs))
      ])
    }

    // Jupiter価格API（mint -> USD価格）。Pyth/Switchboardのオンチェーンフォールバックを併用
    async function fetchMintPrices(mints: string[]): Promise<Map<string, number>> {
      const uniq = Array.from(new Set(mints.filter(m => typeof m === 'string' && m.length > 20)))
      if (uniq.length === 0) return new Map()
      const cacheKey = `solana:price:jup:${uniq.sort().join(',')}`
      const cached = await cacheManager.get<Record<string, number>>(cacheKey, { layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
      if (cached && typeof cached === 'object') return new Map(Object.entries(cached))
      try {
        const url = `https://price.jup.ag/v4/price?ids=${encodeURIComponent(uniq.join(','))}`
        const resp = await fetchJsonWithRetry<{ data?: Record<string, { price?: number }> }>(
          url,
          { method: 'GET', headers: { 'accept': 'application/json' } },
          { retries: 1, backoffMs: 300, timeoutMs: Number(process.env.JUPITER_HTTP_TIMEOUT_MS || 4000) }
        )
        const data = (resp && typeof resp === 'object' ? resp.data : undefined) || {}
        const mp = new Map<string, number>()
        for (const k of Object.keys(data)) {
          const pr = Number(data[k]?.price || 0)
          if (Number.isFinite(pr) && pr > 0) mp.set(k, pr)
        }
        if (mp.size > 0) {
          const obj: Record<string, number> = {}
          for (const [k, v] of mp.entries()) obj[k] = v
          const ttl = Number(process.env.JUPITER_PRICE_TTL_MS || 10 * 60_000)
          await cacheManager.set(cacheKey, obj, { ttl, layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
          return mp
        }
        // Jupiterで取得ゼロならオンチェーンフォールバックを試行
        const onchain = await fetchOnchainPricesWithFallback(uniq)
        return onchain
      } catch {
        // Jupiter失敗時もオンチェーンフォールバック
        return await fetchOnchainPricesWithFallback(uniq)
      }
    }

    // Pyth / Switchboard フィードへのフォールバック
    async function fetchOnchainPricesWithFallback(mints: string[]): Promise<Map<string, number>> {
      const result = new Map<string, number>()
      const rpc = rpcUrl
      // 環境変数で mint->feed の対応が提供されている場合のみオンチェーン参照
      const pythMapRaw = process.env.PYTH_FEEDS_BY_MINT || ''
      const sbMapRaw = process.env.SWITCHBOARD_FEEDS_BY_MINT || ''
      let pythMap: Record<string, string> = {}
      let sbMap: Record<string, string> = {}
      try { if (pythMapRaw) pythMap = JSON.parse(pythMapRaw) } catch {}
      try { if (sbMapRaw) sbMap = JSON.parse(sbMapRaw) } catch {}
      const needPyth: Array<{ mint: string; feed: string }> = []
      const needSb: Array<{ mint: string; feed: string }> = []
      for (const m of mints) {
        const f1 = pythMap[m]
        const f2 = sbMap[m]
        if (typeof f1 === 'string' && f1.length > 30) needPyth.push({ mint: m, feed: f1 })
        else if (typeof f2 === 'string' && f2.length > 30) needSb.push({ mint: m, feed: f2 })
      }
      // Pyth
      if (needPyth.length > 0) {
        try {
          const mod = await safeDynamicImport('@pythnetwork/client')
          const web3mod = await safeDynamicImport('@solana/web3.js')
          if (mod && web3mod) {
            const Connection = (web3mod as Record<string, unknown>)['Connection'] as (new (u: string, c?: unknown) => unknown)
            const PublicKey = (web3mod as Record<string, unknown>)['PublicKey'] as (new (v: string) => unknown)
            const PythHttpClient = (mod as Record<string, unknown>)['PythHttpClient'] as unknown
            const getPythClusterApiUrl = (mod as Record<string, unknown>)['getPythClusterApiUrl'] as unknown
            const conn = Connection ? new Connection(rpc, 'confirmed') as unknown : undefined
            // まずはHTTPクライアントが利用可能なら優先
            try {
              if (PythHttpClient && typeof (PythHttpClient as { new: (u: string) => unknown }) === 'function' && getPythClusterApiUrl && typeof (getPythClusterApiUrl as () => string) === 'function') {
                const endpoint = (getPythClusterApiUrl as () => string)()
                const httpClient = new (PythHttpClient as unknown as new (u: string) => { getLatestPriceFeeds: (ids: string[]) => Promise<Array<{ id?: string; price?: { price?: number } }>> })(endpoint)
                const feeds = await httpClient.getLatestPriceFeeds(needPyth.map(x => x.feed))
                for (const f of feeds) {
                  const id = typeof f?.id === 'string' ? f.id : ''
                  const pr = (f as { price?: { price?: number } }).price?.price
                  if (id && typeof pr === 'number' && pr > 0) result.set(id, pr)
                }
              }
            } catch {}
            // 将来: on-chain decode（必要ならPythConnectionを利用）
          }
        } catch {}
      }
      // Switchboard（段階導入: AggregatorAccount.latestValue を試行できる場合のみ）
      if (needSb.length > 0) {
        try {
          const sb = await safeDynamicImport('@switchboard-xyz/solana.js')
          const web3mod = await safeDynamicImport('@solana/web3.js')
          if (sb && web3mod) {
            const Connection = (web3mod as Record<string, unknown>)['Connection'] as (new (u: string, c?: unknown) => unknown)
            const PublicKey = (web3mod as Record<string, unknown>)['PublicKey'] as (new (v: string) => unknown)
            const AggregatorAccount = (sb as Record<string, unknown>)['AggregatorAccount'] as unknown
            const SwitchboardProgram = (sb as Record<string, unknown>)['SwitchboardProgram'] as unknown
            if (Connection && PublicKey && AggregatorAccount && SwitchboardProgram) {
              try {
                // 最小構成のProvider/Program初期化（型安全は担保せずガード）
                const conn = new Connection(rpc, 'confirmed') as unknown
                const program = await (SwitchboardProgram as unknown as {
                  loadMainnet: (c: unknown) => Promise<unknown>
                }).loadMainnet(conn)
                for (const { feed } of needSb) {
                  try {
                    const pubkey = new PublicKey(feed) as unknown
                    const aggregator = await (AggregatorAccount as unknown as {
                      load: (p: unknown, k: unknown) => Promise<unknown>
                    }).load(program, pubkey)
                    const latestVal = await (aggregator as unknown as {
                      getLatestValue?: () => Promise<number | null>
                      latestValue?: () => Promise<number | null>
                    }).getLatestValue?.() ?? (aggregator as unknown as { latestValue?: () => Promise<number | null> }).latestValue?.()
                    if (typeof latestVal === 'number' && latestVal > 0) {
                      // feed(pubkey)自体はmintではないが、同一キーで結果Mapへ格納（mint→feedの対応は呼出元で管理）
                      result.set(feed, latestVal)
                    }
                  } catch {}
                }
              } catch {}
            }
          }
        } catch {}
      }
      return result
    }

    let inferredVolumeUsd = 0
    for (const s of sample) {
      try {
        const tx = await withTimeout(withRetry(() => connection.getTransaction(s.signature, { maxSupportedTransactionVersion: 0 } as unknown as Record<string, unknown>))) as unknown
        const txMeta = (tx && typeof tx === 'object') ? (tx as Record<string, unknown>)['meta'] as unknown : undefined
        const logMessages = (txMeta && typeof txMeta === 'object') ? (txMeta as Record<string, unknown>)['logMessages'] as unknown : undefined
        const logs: string[] = Array.isArray(logMessages) ? (logMessages as unknown[]).filter((x): x is string => typeof x === 'string') : []
        // 1) ログ中にUSD量が直接含まれる場合はそれを優先採用（一般には稀）
        let addedFromLogs = false
        for (const line of logs) {
          const m = /volume_usd\s*=\s*([0-9]+(?:\.[0-9]+)?)/i.exec(line)
          if (m) {
            const v = Number(m[1])
            if (Number.isFinite(v) && v >= 0) {
              inferredVolumeUsd += v
              addedFromLogs = true
            }
          }
        }
        if (addedFromLogs) continue

        // 2) innerInstructions の SPL-Token 転送からレッグ量を推定（成功時はこちらを優先）
        const metaObj = (txMeta && typeof txMeta === 'object') ? txMeta as Record<string, unknown> : {}
        const inner = Array.isArray(metaObj['innerInstructions']) ? metaObj['innerInstructions'] as Array<Record<string, unknown>> : []
        const viaInnerLegUsd = await (async () => {
          try {
            const spl = await safeDynamicImport('@solana/spl-token')
            const TOKEN_PROGRAM_ID = (spl as Record<string, unknown>)['TOKEN_PROGRAM_ID'] as unknown
            const tokenProgramIdStr = TOKEN_PROGRAM_ID && typeof (TOKEN_PROGRAM_ID as { toBase58?: () => string }).toBase58 === 'function'
              ? String((TOKEN_PROGRAM_ID as { toBase58: () => string }).toBase58())
              : 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
            type InnerIx = { programIdIndex?: number; programId?: string; parsed?: unknown; instructions?: Array<Record<string, unknown>>; accounts?: string[]; data?: unknown }
            // get accountKeys for programIdIndex→pubkey 解決（簡易）
            const acctKeys = (tx && typeof tx === 'object') ? (tx as Record<string, unknown>)['transaction'] as unknown : undefined
            const acctMessage = (acctKeys && typeof acctKeys === 'object') ? (acctKeys as Record<string, unknown>)['message'] as unknown : undefined
            const acctArr = (acctMessage && typeof acctMessage === 'object') ? (acctMessage as Record<string, unknown>)['accountKeys'] as unknown : undefined
            const accountKeys: string[] = Array.isArray(acctArr) ? (acctArr as unknown[]).map(x => typeof x === 'string' ? x : (x && typeof x === 'object' && typeof (x as Record<string, unknown>)['pubkey'] === 'string' ? String((x as Record<string, unknown>)['pubkey']) : '')) : []
            // 転送合算（mint別）
            const mintToAbsSum = new Map<string, number>()
            for (const iGroup of inner) {
              const ixs = Array.isArray(iGroup['instructions']) ? iGroup['instructions'] as InnerIx[] : []
              for (const ix of ixs) {
                // programId の判定（index→key または文字列比較）
                const pid = typeof ix.programId === 'string' ? ix.programId
                  : (typeof ix.programIdIndex === 'number' && accountKeys[ix.programIdIndex] ? accountKeys[ix.programIdIndex] : '')
                if (!pid || pid !== tokenProgramIdStr) continue
                // parsed形式
                const parsed = ix['parsed'] as { type?: string; info?: { amount?: string | number; mint?: string; source?: string; destination?: string } } | undefined
                if (parsed && parsed.type === 'transfer' && parsed.info && typeof parsed.info.amount !== 'undefined') {
                  const mint = typeof parsed.info.mint === 'string' ? parsed.info.mint : ''
                  const amt = Number(parsed.info.amount)
                  if (mint && Number.isFinite(amt) && amt > 0) {
                    mintToAbsSum.set(mint, (mintToAbsSum.get(mint) || 0) + amt)
                  }
                  continue
                }
                // raw data（未対応）
              }
            }
            if (mintToAbsSum.size === 0) return 0
            const mints = Array.from(mintToAbsSum.keys())
            const priceMap = await fetchMintPrices(mints)
            let maxLegUsd = 0
            for (const mint of mints) {
              const absSum = mintToAbsSum.get(mint) || 0
              // innerInstructionsは片側合算を目指すが、念のため半減で過大評価を回避
              const legAmount = absSum / 2
              const px = priceMap.get(mint) || 0
              if (px > 0 && legAmount > 0) {
                const legUsd = legAmount * px
                if (legUsd > maxLegUsd) maxLegUsd = legUsd
              }
            }
            return maxLegUsd
          } catch { return 0 }
        })()
        if (viaInnerLegUsd > 0) { inferredVolumeUsd += viaInnerLegUsd; continue }

        // 3) pre/postTokenBalances から各mintの口座毎差分の絶対値を合算し、2で割って重複カウントを回避
        const preB = (txMeta && typeof txMeta === 'object') ? (txMeta as Record<string, unknown>)['preTokenBalances'] as unknown : undefined
        const postB = (txMeta && typeof txMeta === 'object') ? (txMeta as Record<string, unknown>)['postTokenBalances'] as unknown : undefined
        const preArr: Array<Record<string, unknown>> = Array.isArray(preB) ? preB as Array<Record<string, unknown>> : []
        const postArr: Array<Record<string, unknown>> = Array.isArray(postB) ? postB as Array<Record<string, unknown>> : []
        type Bal = { mint?: string; owner?: string; uiTokenAmount?: { uiAmount?: number; uiAmountString?: string } }
        const key = (b: Bal) => `${String(b.mint || '')}:${String(b.owner || '')}`
        const toMap = (arr: Bal[]) => {
          const m = new Map<string, { mint: string; owner: string; ui: number }>()
          for (const x of arr) {
            const mint = typeof x.mint === 'string' ? x.mint : ''
            const owner = typeof x.owner === 'string' ? x.owner : ''
            const ua = (x.uiTokenAmount && typeof x.uiTokenAmount === 'object') ? (x.uiTokenAmount as { uiAmount?: number; uiAmountString?: string }) : undefined
            const val = typeof ua?.uiAmount === 'number' ? ua!.uiAmount! : (ua?.uiAmountString ? Number(ua.uiAmountString) : NaN)
            const ui = Number.isFinite(val) ? Number(val) : 0
            if (!mint || !owner) continue
            m.set(`${mint}:${owner}`, { mint, owner, ui })
          }
          return m
        }
        const preMap = toMap(preArr as Bal[])
        const postMap = toMap(postArr as Bal[])
        const mintToAbsSum = new Map<string, number>()
        const owners = new Set<string>([...preMap.keys(), ...postMap.keys()])
        for (const k of owners) {
          const pre = preMap.get(k)
          const post = postMap.get(k)
          const mint = post?.mint || pre?.mint || ''
          if (!mint) continue
          const delta = (post?.ui || 0) - (pre?.ui || 0)
          const acc = mintToAbsSum.get(mint) || 0
          mintToAbsSum.set(mint, acc + Math.abs(delta))
        }
        if (mintToAbsSum.size > 0) {
          const mints = Array.from(mintToAbsSum.keys())
          const priceMap = await fetchMintPrices(mints)
          let maxLegUsd = 0
          for (const mint of mints) {
            const absSum = mintToAbsSum.get(mint) || 0
            const legAmount = absSum / 2 // 送受の二重カウントを半減
            const px = priceMap.get(mint) || 0
            if (px > 0 && legAmount > 0) {
              const legUsd = legAmount * px
              if (legUsd > maxLegUsd) maxLegUsd = legUsd
            }
          }
          if (maxLegUsd > 0) inferredVolumeUsd += maxLegUsd
        }
      } catch {
        // 個別トランザクション失敗は無視
      }
    }

    // ログからUSDが得られない場合、推定不能としてnullを返す（虚偽回避）
    if (!(inferredVolumeUsd > 0)) return null

    const dailyApr = (inferredVolumeUsd * feeRate) / tvl
    const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
    await cacheManager.set(cacheKey, apyPct, { ttl: ttlMs, layers: [CacheLayer.MEMORY, CacheLayer.REDIS] })
    return apyPct
  } catch {
    return null
  }
}

// ハイブリッド: 公式API(環境変数指定) → SDK → フォールバック（DefiLlama）の順に試行
async function fetchRaydiumPoolsViaApi(limit = 50): Promise<SolanaPoolLike[] | null> {
  try {
    const url = process.env.RAYDIUM_POOLS_URL
    if (!url) return null
    const http = resolveSdkOptions('generic')
    const raw = await fetchJsonWithRetry<unknown>(
      url,
      { method: 'GET', headers: { 'accept': 'application/json' } },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    type LoosePool = { id?: unknown; address?: unknown; name?: unknown; symbol?: unknown; pair?: unknown; tvl?: unknown; tvlUsd?: unknown; tvl_usd?: unknown; apy?: unknown; apyPct?: unknown; apy_percent?: unknown; tokenA?: { symbol?: unknown } | null; tokenB?: { symbol?: unknown } | null; url?: unknown; volumeUSD?: unknown; volume24h?: unknown; dayVolume?: unknown; volume24hUsd?: unknown; fee?: unknown; feeBps?: unknown; feeTier?: unknown }
    const unknownRaw = raw as unknown
    const listCandidate = ((): unknown => {
      if (unknownRaw && typeof unknownRaw === 'object') {
        const o = unknownRaw as Record<string, unknown>
        if (Array.isArray(o.data)) return o.data
        if (Array.isArray(o.pools)) return o.pools
      }
      if (Array.isArray(unknownRaw)) return unknownRaw
      return []
    })()
    const arr: LoosePool[] = Array.isArray(listCandidate) ? (listCandidate as LoosePool[]) : []
    const mapped: SolanaPoolLike[] = arr.slice(0, Math.max(1, limit)).map((p, i) => {
      const tvl = Number(p.tvl ?? p.tvlUsd ?? p.tvl_usd ?? 0)
      const v = Number(p.volumeUSD ?? p.volume24h ?? p.dayVolume ?? p.volume24hUsd ?? 0)
      const feeBpsEnv = Number(process.env.RAYDIUM_FEE_DEFAULT_BPS || '30') // 0.30%
      const feeRateExplicit = Number(p.fee ?? 0)
      const feeBps = Number(p.feeBps ?? p.feeTier ?? (Number.isFinite(feeRateExplicit) && feeRateExplicit > 0 ? feeRateExplicit * 10_000 : feeBpsEnv))
      const feeRate = Number.isFinite(feeBps) ? feeBps / 1_000_0_0 : 0.003 // guard
      const dailyApr = tvl > 0 ? (v * feeRate) / tvl : 0
      const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
      return {
        id: String(p.id ?? p.address ?? `ray-${i}`),
        name: String(p.name ?? p.symbol ?? p.pair ?? 'Raydium Pool'),
        protocol: 'raydium',
        chain: 'solana',
        tvlUsd: tvl,
        apy: apyPct,
        address: typeof p.address === 'string' ? p.address : undefined,
        tokenA: p.tokenA && typeof p.tokenA === 'object' && typeof (p.tokenA as { symbol?: unknown }).symbol === 'string' ? String((p.tokenA as { symbol?: unknown }).symbol) : undefined,
        tokenB: p.tokenB && typeof p.tokenB === 'object' && typeof (p.tokenB as { symbol?: unknown }).symbol === 'string' ? String((p.tokenB as { symbol?: unknown }).symbol) : undefined,
        url: typeof p.url === 'string' ? p.url : undefined,
      }
    })
    // RPCでのfee APR推定に成功した場合のみ上書き（先頭数件に限定）
    const feeRateDefault = Number(process.env.RAYDIUM_FEE_DEFAULT_BPS || '30') / 10_000
    const updated = await Promise.all(mapped.map(async (m, idx) => {
      if (idx >= 10 || !m.address || !(m.tvlUsd && m.tvlUsd > 0)) return m
      const rpcApy = await estimateFeeAprFromRpc(m.address, m.tvlUsd, { feeRate: feeRateDefault, ttlMs: 5 * 60_000, txSampleLimit: 50, totalTxLimit: 500 })
      return (typeof rpcApy === 'number' && rpcApy > 0) ? { ...m, apy: rpcApy } : m
    }))
    return updated
  } catch {
    return null
  }
}

async function fetchOrcaPoolsViaApi(limit = 50): Promise<SolanaPoolLike[] | null> {
  try {
    const url = process.env.ORCA_POOLS_URL
    if (!url) return null
    const http = resolveSdkOptions('generic')
    const raw = await fetchJsonWithRetry<unknown>(
      url,
      { method: 'GET', headers: { 'accept': 'application/json' } },
      { retries: http.retries, backoffMs: http.backoffMs, timeoutMs: http.timeoutMs }
    )
    type LoosePool = { id?: unknown; address?: unknown; name?: unknown; symbol?: unknown; pair?: unknown; tvl?: unknown; tvlUsd?: unknown; tvl_usd?: unknown; apy?: unknown; apyPct?: unknown; apy_percent?: unknown; tokenA?: { symbol?: unknown } | null; tokenB?: { symbol?: unknown } | null; url?: unknown; volumeUSD?: unknown; volume24h?: unknown; dayVolume?: unknown; volume24hUsd?: unknown; fee?: unknown; feeBps?: unknown; feeTier?: unknown }
    const unknownRaw = raw as unknown
    const listCandidate = ((): unknown => {
      if (unknownRaw && typeof unknownRaw === 'object') {
        const o = unknownRaw as Record<string, unknown>
        if (Array.isArray(o.data)) return o.data
        if (Array.isArray(o.pools)) return o.pools
        const w = (o as Record<string, unknown>)['whirlpools']
        if (Array.isArray(w)) return w
      }
      if (Array.isArray(unknownRaw)) return unknownRaw
      return []
    })()
    const arr: LoosePool[] = Array.isArray(listCandidate) ? (listCandidate as LoosePool[]) : []
    const mapped: SolanaPoolLike[] = arr.slice(0, Math.max(1, limit)).map((p, i) => {
      const tvl = Number(p.tvl ?? p.tvlUsd ?? p.tvl_usd ?? 0)
      const v = Number(p.volumeUSD ?? p.volume24h ?? p.dayVolume ?? p.volume24hUsd ?? 0)
      const feeBpsEnv = Number(process.env.ORCA_FEE_DEFAULT_BPS || '30') // 0.30%
      const feeRateExplicit = Number(p.fee ?? 0)
      const feeBps = Number(p.feeBps ?? p.feeTier ?? (Number.isFinite(feeRateExplicit) && feeRateExplicit > 0 ? feeRateExplicit * 10_000 : feeBpsEnv))
      const feeRate = Number.isFinite(feeBps) ? feeBps / 1_000_0_0 : 0.003
      const dailyApr = tvl > 0 ? (v * feeRate) / tvl : 0
      const apyPct = Number.isFinite(dailyApr) ? dailyApr * 365 * 100 : 0
      return {
        id: String(p.id ?? p.address ?? `orca-${i}`),
        name: String(p.name ?? p.symbol ?? p.pair ?? 'Orca Pool'),
        protocol: 'orca',
        chain: 'solana',
        tvlUsd: tvl,
        apy: apyPct,
        address: typeof p.address === 'string' ? p.address : undefined,
        tokenA: p.tokenA && typeof p.tokenA === 'object' && typeof (p.tokenA as { symbol?: unknown }).symbol === 'string' ? String((p.tokenA as { symbol?: unknown }).symbol) : undefined,
        tokenB: p.tokenB && typeof p.tokenB === 'object' && typeof (p.tokenB as { symbol?: unknown }).symbol === 'string' ? String((p.tokenB as { symbol?: unknown }).symbol) : undefined,
        url: typeof p.url === 'string' ? p.url : undefined,
      }
    })
    // RPC推定が得られた場合のみ上書き（先頭数件）
    const feeRateDefault = Number(process.env.ORCA_FEE_DEFAULT_BPS || '30') / 10_000
    const updated = await Promise.all(mapped.map(async (m, idx) => {
      if (idx >= 10 || !m.address || !(m.tvlUsd && m.tvlUsd > 0)) return m
      const rpcApy = await estimateFeeAprFromRpc(m.address, m.tvlUsd, { feeRate: feeRateDefault, ttlMs: 5 * 60_000, txSampleLimit: 50, totalTxLimit: 500 })
      return (typeof rpcApy === 'number' && rpcApy > 0) ? { ...m, apy: rpcApy } : m
    }))
    return updated
  } catch {
    return null
  }
}

export async function fetchRaydiumPoolsViaSdk(limit = 50): Promise<SolanaPoolLike[] | null> {
  // 1) 公式API（環境変数URL）
  const viaApi = await fetchRaydiumPoolsViaApi(limit).catch(() => null)
  if (viaApi && viaApi.length > 0) return viaApi
  // 2) SDK（導入済みであれば）
  const sdk = await safeDynamicImport('@raydium-io/raydium-sdk')
  if (sdk) {
    // SDKが利用可能でも、プール列挙の標準化が未確立のため当面はフォールバック＋RPC推定上書き
    const base = await fetchSolanaPoolsFallback('raydium', limit)
    const feeRateDefault = Number(process.env.RAYDIUM_FEE_DEFAULT_BPS || '30') / 10_000
    const updated = await Promise.all(base.map(async (m, idx) => {
      if (idx >= 10 || !m.address || !(m.tvlUsd && m.tvlUsd > 0)) return m
      const rpcApy = await estimateFeeAprFromRpc(m.address, m.tvlUsd, { feeRate: feeRateDefault, ttlMs: 5 * 60_000 })
      return (typeof rpcApy === 'number' && rpcApy > 0) ? { ...m, apy: rpcApy } : m
    }))
    return updated
  }
  // 3) フォールバック
  return await fetchSolanaPoolsFallback('raydium', limit)
}

export async function fetchOrcaPoolsViaSdk(limit = 50): Promise<SolanaPoolLike[] | null> {
  // 1) 公式API（環境変数URL）
  const viaApi = await fetchOrcaPoolsViaApi(limit).catch(() => null)
  if (viaApi && viaApi.length > 0) return viaApi
  // 2) SDK（導入済みであれば）
  const sdk = await safeDynamicImport('@orca-so/sdk')
  const web3 = await safeDynamicImport('@solana/web3.js')
  try {
    if (sdk && web3) {
      // SOLANA RPC
      const rpc = (typeof process.env.SOLANA_RPC_URL === 'string' && process.env.SOLANA_RPC_URL.trim())
        ? process.env.SOLANA_RPC_URL.trim()
        : 'https://api.mainnet-beta.solana.com'
      const ConnectionCtor = (web3 as Record<string, unknown>)['Connection'] as (new (url: string, commitment?: unknown) => unknown)
      const connection = ConnectionCtor ? new ConnectionCtor(rpc, 'confirmed') : undefined
      // getOrca
      const getOrcaFn = (sdk as Record<string, unknown>)['getOrca'] as ((conn: unknown) => unknown) | undefined
      const orca = typeof getOrcaFn === 'function' ? getOrcaFn(connection) : undefined
      // OrcaPoolConfig 列挙
      const cfgObj = (sdk as Record<string, unknown>)['OrcaPoolConfig'] as Record<string, unknown> | undefined
      const cfgList = cfgObj ? Object.values(cfgObj) : []
      const results: SolanaPoolLike[] = []
      for (const cfg of cfgList.slice(0, Math.max(1, limit))) {
        try {
          // orca.getPool(cfg)
          const getPoolFn = orca && typeof (orca as Record<string, unknown>)['getPool'] === 'function'
            ? (orca as Record<string, unknown>)['getPool'] as (c: unknown) => unknown
            : undefined
          const pool = getPoolFn ? getPoolFn(cfg) : undefined
          // token symbols 推定
          const getTokenA = pool && typeof (pool as Record<string, unknown>)['getTokenA'] === 'function'
            ? (pool as Record<string, unknown>)['getTokenA'] as () => unknown
            : undefined
          const getTokenB = pool && typeof (pool as Record<string, unknown>)['getTokenB'] === 'function'
            ? (pool as Record<string, unknown>)['getTokenB'] as () => unknown
            : undefined
          const tokenAObj = getTokenA ? getTokenA() : undefined
          const tokenBObj = getTokenB ? getTokenB() : undefined
          const tokenASymbol = tokenAObj && typeof (tokenAObj as Record<string, unknown>)['tag'] === 'string'
            ? String((tokenAObj as Record<string, unknown>)['tag'])
            : (tokenAObj && typeof (tokenAObj as Record<string, unknown>)['name'] === 'string'
              ? String((tokenAObj as Record<string, unknown>)['name'])
              : undefined)
          const tokenBSymbol = tokenBObj && typeof (tokenBObj as Record<string, unknown>)['tag'] === 'string'
            ? String((tokenBObj as Record<string, unknown>)['tag'])
            : (tokenBObj && typeof (tokenBObj as Record<string, unknown>)['name'] === 'string'
              ? String((tokenBObj as Record<string, unknown>)['name'])
              : undefined)
          const name = (tokenASymbol && tokenBSymbol) ? `${tokenASymbol}-${tokenBSymbol}` : `Orca Pool`
          const id = typeof cfg === 'string' ? `orca:${cfg}` : `orca:${results.length}`
          results.push({
            id,
            name,
            protocol: 'orca',
            chain: 'solana',
            tvlUsd: 0,
            apy: 0,
          })
        } catch {
          // skip one config on error
        }
      }
      if (results.length > 0) {
        // SDK由来はTVL/APYが未算出なので、DefiLlamaの同名ペアでざっくり補完
        const llama = await fetchSolanaPoolsFallback('orca', limit)
        const merged = results.map(r => {
          const m = llama.find(x => x.name.toLowerCase() === r.name.toLowerCase())
          // 将来的にRPCログから手数料収益を推定しfee APRを反映（フェーズ2）
          return m ? { ...r, tvlUsd: m.tvlUsd, apy: m.apy } : r
        })
        // RPC推定で上書き（先頭数件）
        const feeRateDefault = Number(process.env.ORCA_FEE_DEFAULT_BPS || '30') / 10_000
        const updated = await Promise.all(merged.map(async (m, idx) => {
          if (idx >= 10 || !m.address || !(m.tvlUsd && m.tvlUsd > 0)) return m
          const rpcApy = await estimateFeeAprFromRpc(m.address, m.tvlUsd, { feeRate: feeRateDefault, ttlMs: 5 * 60_000 })
          return (typeof rpcApy === 'number' && rpcApy > 0) ? { ...m, apy: rpcApy } : m
        }))
        return updated
      }
    }
  } catch {
    // ignore SDK path errors
  }
  // 3) フォールバック
  return await fetchSolanaPoolsFallback('orca', limit)
}

// レジストリ登録（SDK導入後は runner 経由で利用可能）
import { registerAdapter } from '@/lib/sdk/registry'
registerAdapter('solana.raydium.pools', async () => {
  return await fetchRaydiumPoolsViaSdk()
})
registerAdapter('solana.orca.pools', async () => {
  return await fetchOrcaPoolsViaSdk()
})
