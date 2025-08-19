import { incCounter, renderPrometheus, registerHistogram, observeHistogram, startTimer } from '@/lib/monitoring/metrics'

describe('monitoring/metrics', () => {
  const OLD = process.env.METRICS_ENABLED
  beforeEach(() => {
    jest.resetModules()
    process.env.METRICS_ENABLED = 'true'
  })
  afterAll(() => {
    process.env.METRICS_ENABLED = OLD
  })

  it('increments counters and renders Prometheus output', () => {
    incCounter('test_counter_total', { route: 'x', provider: 'p' }, 2)
    const text = renderPrometheus()
    expect(text).toContain('test_counter_total{provider=p,route=x} 2')
  })

  it('observes histogram buckets and exposes sum/count', () => {
    registerHistogram('test_hist_seconds', [0.1, 0.3, 1])
    observeHistogram('test_hist_seconds', 0.2, { k: 'v' })
    observeHistogram('test_hist_seconds', 2.0, { k: 'v' })
    const text = renderPrometheus()
    expect(text).toContain('test_hist_seconds_bucket{')
    expect(text).toContain('le="0.3"')
    expect(text).toContain('le="+Inf"')
    expect(text).toContain('test_hist_seconds_sum')
    expect(text).toContain('test_hist_seconds_count')
  })

  it('startTimer observes elapsed seconds to histogram', () => {
    registerHistogram('timer_hist_seconds', [0.001, 0.01, 0.1])
    const stop = startTimer('timer_hist_seconds', { route: 'y' })
    // simulate small work
    stop()
    const text = renderPrometheus()
    expect(text).toContain('timer_hist_seconds_bucket{')
  })
})
