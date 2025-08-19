export type PoolPoint = { t: number; tvlUsd?: number; apy?: number }

export type Anomaly = {
	type: 'tvl_drop' | 'apy_spike'
	severity: 'critical' | 'high' | 'medium' | 'low'
	message: string
	meta: Record<string, string | number>
	ts?: number
}

function pctChange(a: number, b: number): number | null {
	if (!Number.isFinite(a) || !Number.isFinite(b) || a === 0) return null
	return ((b - a) / a) * 100
}

export function detectAnomalies(points: PoolPoint[], options?: { tvlDropPct?: number; apySpikePct?: number }): Anomaly[] {
	const dropTh = options?.tvlDropPct ?? 30
	const spikeTh = options?.apySpikePct ?? 50
	if (!Array.isArray(points) || points.length < 2) return []
	const first = points[0]
	const last = points[points.length - 1]
	const anomalies: Anomaly[] = []
	if (typeof first.tvlUsd === 'number' && typeof last.tvlUsd === 'number') {
		const pct = pctChange(first.tvlUsd, last.tvlUsd)
		if (pct !== null && pct <= -dropTh) {
			anomalies.push({
				type: 'tvl_drop',
				severity: pct <= -60 ? 'critical' : pct <= -40 ? 'high' : 'medium',
				message: `TVL ${pct.toFixed(1)}%` ,
				meta: { from: first.tvlUsd, to: last.tvlUsd, pct: Number(pct.toFixed(2)) },
				ts: last.t
			})
		}
	}
	if (typeof first.apy === 'number' && typeof last.apy === 'number') {
		const pct = pctChange(first.apy, last.apy)
		if (pct !== null && pct >= spikeTh) {
			anomalies.push({
				type: 'apy_spike',
				severity: pct >= 200 ? 'critical' : pct >= 100 ? 'high' : 'medium',
				message: `APY +${pct.toFixed(1)}%`,
				meta: { from: first.apy, to: last.apy, pct: Number(pct.toFixed(2)) },
				ts: last.t
			})
		}
	}
	return anomalies
}
