export function withCache<T extends Record<string, unknown>>(body: T, seconds: number): ResponseInit {
  return { headers: { 'Cache-Control': `public, s-maxage=${seconds}, stale-while-revalidate=60` } }
}


