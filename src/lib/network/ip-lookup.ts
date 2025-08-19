export type IPInfo = {
  ip: string
  asn?: string
  org?: string
  isp?: string
  country?: string
  region?: string
  city?: string
}

function isPrivate(ip: string): boolean {
  // very lightweight check for RFC1918 and loopback
  return (
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('127.') ||
    ip.startsWith('172.16.') || ip.startsWith('172.17.') || ip.startsWith('172.18.') || ip.startsWith('172.19.') ||
    ip.startsWith('172.2') // covers 172.20 - 172.29
  )
}

export async function lookupIp(ip: string): Promise<IPInfo | null> {
  try {
    if (!ip || isPrivate(ip)) return null
    const url = process.env.IP_LOOKUP_URL
    if (!url) return null
    const token = process.env.IP_LOOKUP_TOKEN
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 2000)
    const res = await fetch(`${url.replace(/\/$/, '')}/${encodeURIComponent(ip)}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      signal: controller.signal
    })
    clearTimeout(t)
    if (!res.ok) return null
    const data = await res.json().catch(() => null) as Record<string, unknown> | null
    if (!data) return null
    const info: IPInfo = {
      ip,
      asn: typeof data.asn === 'string' ? data.asn : (typeof data.org === 'string' ? data.org.split(' ')[0] : undefined),
      org: typeof data.org === 'string' ? data.org : undefined,
      isp: typeof data.isp === 'string' ? data.isp : undefined,
      country: typeof data.country === 'string' ? data.country : undefined,
      region: typeof data.region === 'string' ? data.region : undefined,
      city: typeof data.city === 'string' ? data.city : undefined
    }
    return info
  } catch {
    return null
  }
}
