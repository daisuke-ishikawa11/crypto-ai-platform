import { proxyWithCache } from '@/app/api/defi/_helpers'
import { wrapWithUsage } from '@/app/api/defi/_usage-wrap'

export const GET = wrapWithUsage(
  proxyWithCache('/api/defi/monitoring/status', 15),
  { service: 'defi', endpoint: '/api/defi/monitoring' },
)


