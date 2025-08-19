import { Worker, QueueScheduler, JobsOptions } from 'bullmq'
import { createClient } from '@supabase/supabase-js'
import { config } from '@/lib/config'
import { parseRedisUrl } from '@/lib/queue'
import { createEmailProvider } from '@/lib/providers'

type NotificationStatus = 'queued' | 'processing' | 'sent' | 'failed'

interface SendJobData { id: string }

if (!config.redisUrl) {
  // eslint-disable-next-line no-console
  console.error('[alerts-worker] REDIS_URL is not configured')
  process.exit(2)
}

const connection = parseRedisUrl(config.redisUrl)
const scheduler = new QueueScheduler('alerts-send-email', { connection })
void scheduler.waitUntilReady()

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey, { auth: { persistSession: false, autoRefreshToken: false } })

const jobsOptions: JobsOptions = { attempts: 3, backoff: { type: 'exponential', delay: 2000 } }

const worker = new Worker<SendJobData>(
  'alerts-send-email',
  async (job) => {
    const id = job.data.id
    // 1) 対象レコードを取得
    const { data: item, error: getErr } = await supabase.from('notifications').select('*').eq('id', id).single()
    if (getErr || !item) throw new Error(getErr?.message ?? 'Notification not found')

    // 2) 競合回避: queued→processing
    const { data: upd, error: updErr } = await supabase
      .from('notifications')
      .update({ status: 'processing' as NotificationStatus })
      .eq('id', id)
      .eq('status', 'queued')
      .select('id')
      .single()
    if (updErr || !upd) return

    // 3) 送信（設定に応じてプロバイダ選択）
    const provider = createEmailProvider()
    if (!provider) throw new Error('No email provider configured')
    const result = await provider.sendEmail({ to: item.to as string, subject: item.subject as string, text: item.text ?? undefined, html: item.html ?? undefined, tags: (item.tags ?? undefined) as string[] | undefined })
    await supabase
      .from('notifications')
      .update({ status: result.status as NotificationStatus, sent_at: new Date().toISOString(), error_message: result.errorMessage ?? null })
      .eq('id', id)
  },
  { connection, concurrency: 5, removeOnComplete: true, removeOnFail: { age: 24 * 60 * 60 } }
)

worker.on('completed', (job) => {
  // eslint-disable-next-line no-console
  console.log(`[alerts-worker] completed job ${job.id}`)
})

worker.on('failed', (job, err) => {
  // eslint-disable-next-line no-console
  console.error(`[alerts-worker] failed job ${job?.id}: ${err?.message}`)
})


