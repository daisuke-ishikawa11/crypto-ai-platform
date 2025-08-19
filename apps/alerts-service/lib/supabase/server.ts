import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { config } from '@/lib/config'

export function getAdminClient() {
  return createClient(config.supabaseUrl, config.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}


