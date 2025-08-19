type StringRecord = Record<string, string>

function stableLabelKey(labels: StringRecord | undefined): string {
	if (!labels) return ''
	const entries = Object.entries(labels).filter(([, v]) => typeof v === 'string')
	entries.sort(([a], [b]) => a.localeCompare(b))
	return entries.map(([k, v]) => `${k}=${v}`).join(',')
}

const counters: Map<string, Map<string, number>> = new Map()
const histograms: Map<string, { buckets: number[]; counts: Map<string, number[]>; sum: Map<string, number>; count: Map<string, number> }> = new Map()
const gauges: Map<string, Map<string, number>> = new Map()

export function isMetricsEnabled(): boolean { return process.env.METRICS_ENABLED === 'true' }

export function incCounter(name: string, labels?: StringRecord, value: number = 1): void {
	if (!isMetricsEnabled()) return
	const key = stableLabelKey(labels)
	if (!counters.has(name)) counters.set(name, new Map())
	const m = counters.get(name)!
	m.set(key, (m.get(key) || 0) + value)
}

export function registerHistogram(name: string, buckets: number[]): void {
	if (!isMetricsEnabled()) return
	if (!histograms.has(name)) {
		histograms.set(name, {
			buckets: [...buckets].sort((a, b) => a - b),
			counts: new Map(),
			sum: new Map(),
			count: new Map()
		})
	}
}

export function observeHistogram(name: string, value: number, labels?: StringRecord): void {
	if (!isMetricsEnabled()) return
	if (!histograms.has(name)) registerHistogram(name, [0.1, 0.3, 1, 3, 10])
	const h = histograms.get(name)!
	const key = stableLabelKey(labels)
	if (!h.counts.has(key)) h.counts.set(key, new Array(h.buckets.length + 1).fill(0))
	const arr = h.counts.get(key)!
	let placed = false
	for (let i = 0; i < h.buckets.length; i++) {
		if (value <= h.buckets[i]) {
			arr[i] = (arr[i] || 0) + 1
			placed = true
			break
		}
	}
	if (!placed) arr[arr.length - 1] = (arr[arr.length - 1] || 0) + 1
	h.sum.set(key, (h.sum.get(key) || 0) + value)
	h.count.set(key, (h.count.get(key) || 0) + 1)
}

export function startTimer(name: string, labels?: StringRecord): () => void {
	const start = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
	return () => {
		const end = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
		const seconds = (end - start) / 1000
		observeHistogram(name, seconds, labels)
	}
}

export function setGauge(name: string, value: number, labels?: StringRecord): void {
	if (!isMetricsEnabled()) return
	const key = stableLabelKey(labels)
	if (!gauges.has(name)) gauges.set(name, new Map())
	gauges.get(name)!.set(key, value)
}

export function renderPrometheus(): string {
	if (!isMetricsEnabled()) return '# metrics disabled\n'
	const lines: string[] = []
	// Gauges
	for (const [name, m] of gauges.entries()) {
		lines.push(`# TYPE ${name} gauge`)
		for (const [key, val] of m.entries()) {
			const labels = key ? `{${key}}` : ''
			lines.push(`${name}${labels} ${val}`)
		}
	}
	// Counters
	for (const [name, m] of counters.entries()) {
		lines.push(`# TYPE ${name} counter`)
		for (const [key, val] of m.entries()) {
			const labels = key ? `{${key}}` : ''
			lines.push(`${name}${labels} ${val}`)
		}
	}
	// Histograms (Prometheus classic histogram exposition)
	for (const [name, h] of histograms.entries()) {
		lines.push(`# TYPE ${name} histogram`)
		for (const [key, counts] of h.counts.entries()) {
			let cumulative = 0
			for (let i = 0; i < counts.length; i++) {
				cumulative += counts[i] || 0
				const le = i < h.buckets.length ? h.buckets[i] : '+Inf'
				const base = key ? `${key},le="${le}"` : `le="${le}"`
				lines.push(`${name}_bucket{${base}} ${cumulative}`)
			}
			const sum = h.sum.get(key) || 0
			const count = h.count.get(key) || 0
			const lbl = key ? `{${key}}` : ''
			lines.push(`${name}_sum${lbl} ${sum}`)
			lines.push(`${name}_count${lbl} ${count}`)
		}
	}
	return lines.join('\n') + '\n'
}
