export type DefiPrefs = {
	favProtocols?: Record<string, true>
	favPools?: Record<string, true>
	filters?: Record<string, unknown>
	presets?: Record<string, unknown>
	inspectHistory?: Array<Record<string, unknown>>
}

export async function getPrefs(): Promise<DefiPrefs> {
	const res = await fetch('/api/defi/prefs', { method: 'GET' })
	if (!res.ok) return {}
	const j = await res.json()
	return (j && j.data) || {}
}

export async function mergePrefs(update: Partial<DefiPrefs>): Promise<DefiPrefs> {
	const res = await fetch('/api/defi/prefs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(update) })
	if (!res.ok) throw new Error('Failed to update prefs')
	const j = await res.json()
	return (j && j.data) || {}
}
