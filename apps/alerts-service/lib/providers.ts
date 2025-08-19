import { config } from '@/lib/config'
import { NodemailerProvider, ResendProvider } from '@crypto/alerts'

export function createEmailProvider() {
  const preferred = config.emailProvider
  if (preferred === 'smtp' && config.smtp) {
    return new NodemailerProvider({ host: config.smtp.host, port: config.smtp.port, secure: config.smtp.secure, user: config.smtp.user, pass: config.smtp.pass })
  }
  if (preferred === 'resend' && config.resend) {
    return new ResendProvider(config.resend.apiKey, config.resend.from)
  }
  // fallback order: smtp -> resend
  if (config.smtp) return new NodemailerProvider({ host: config.smtp.host, port: config.smtp.port, secure: config.smtp.secure, user: config.smtp.user, pass: config.smtp.pass })
  if (config.resend) return new ResendProvider(config.resend.apiKey, config.resend.from)
  return null
}


