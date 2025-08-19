export interface EmailAttachment {
  filename: string
  content: string
  contentType?: string
}

export interface EmailMessage {
  to: string
  subject: string
  text?: string
  html?: string
  tags?: string[]
  scheduledAtIso?: string
  attachments?: EmailAttachment[]
}

export type NotificationStatus = 'queued' | 'processing' | 'sent' | 'failed'

export interface SendResult {
  status: 'sent' | 'failed'
  providerMessageId?: string
  errorMessage?: string
}


