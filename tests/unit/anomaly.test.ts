import { detectAnomalies } from '@/lib/defi/anomaly'

describe('defi/anomaly', () => {
	it('detects TVL drop over threshold', () => {
		const points = [
			{ t: 0, tvlUsd: 100 },
			{ t: 1, tvlUsd: 60 }
		]
		const res = detectAnomalies(points, { tvlDropPct: 30 })
		expect(res.find(a => a.type === 'tvl_drop')).toBeTruthy()
	})

	it('detects APY spike over threshold', () => {
		const points = [
			{ t: 0, apy: 10 },
			{ t: 1, apy: 30 }
		]
		const res = detectAnomalies(points, { apySpikePct: 50 })
		expect(res.find(a => a.type === 'apy_spike')).toBeTruthy()
	})
})
