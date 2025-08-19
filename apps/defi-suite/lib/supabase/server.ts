import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { config } from '@/lib/config'

export function getAdminClient() {
  const url = config.supabaseUrl
  const serviceKey = config.supabaseServiceKey
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'X-Client-Info': 'defi-suite@admin' } },
  })
}
