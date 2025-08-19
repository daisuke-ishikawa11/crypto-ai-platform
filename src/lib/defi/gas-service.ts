import type { ChainGasInfo, JsonRpcRequest, JsonRpcResponse } from './types'
import { getChainById } from './chain-registry'

function hexToNumber(hex?: string | null): number | undefined {
  if (!hex) return undefined
  try {
    return Number(BigInt(hex))
  } catch {
    return undefined
  }
}

async function callJsonRpc<T>(rpcUrl: string, method: string, params: unknown[] = []): Promise<T | undefined> {
  const payload: JsonRpcRequest = { jsonrpc: '2.0', id: Date.now(), method, params }
  const resp = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!resp.ok) return undefined
  const data = (await resp.json()) as JsonRpcResponse<T>
  if (data.error) return undefined
  return data.result
}

export async function getGasInfo(chainId: number): Promise<ChainGasInfo | null> {
  const chain = getChainById(chainId)
  if (!chain) return null
  const rpc = chain.rpcs[0]?.url
  if (!rpc) return null

  // Try EIP-1559 fee history first
  const feeHistory = await callJsonRpc<{ baseFeePerGas?: string[]; reward?: string[][] }>(rpc, 'eth_feeHistory', [
    '0x5', // last 5 blocks
    'latest',
    [25, 50, 75]
  ])

  let baseFeeGwei: number | undefined
  let priorityFeeGwei: number | undefined
  if (feeHistory?.baseFeePerGas?.length) {
    const last = feeHistory.baseFeePerGas[feeHistory.baseFeePerGas.length - 1]
    const baseWei = hexToNumber(last)
    if (typeof baseWei === 'number') baseFeeGwei = baseWei / 1e9
  }
  if (feeHistory?.reward?.length) {
    const lastRewards = feeHistory.reward[feeHistory.reward.length - 1]
    const mid = lastRewards?.[1]
    const tipWei = hexToNumber(mid)
    if (typeof tipWei === 'number') priorityFeeGwei = tipWei / 1e9
  }

  // Fallback to eth_gasPrice
  let gasPriceGwei: number | undefined
  if (!baseFeeGwei || !priorityFeeGwei) {
    const gasPriceHex = await callJsonRpc<string>(rpc, 'eth_gasPrice')
    const gpWei = hexToNumber(gasPriceHex)
    if (typeof gpWei === 'number') gasPriceGwei = gpWei / 1e9
  }

  return {
    chainId,
    baseFeeGwei,
    priorityFeeGwei,
    gasPriceGwei,
    fetchedAt: new Date().toISOString(),
    source: 'jsonrpc'
  }
}
