import type { Transporter } from 'nodemailer'
import nodemailer from 'nodemailer'
import type { EmailMessage, SendResult } from '../types'
import type { EmailProviderPort } from '../ports'

export interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user?: string
  pass?: string
}

export class NodemailerProvider implements EmailProviderPort {
  private readonly transporter: Transporter

  constructor(config: SmtpConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.user && config.pass ? { user: config.user, pass: config.pass } : undefined,
    })
  }

  async sendEmail(message: EmailMessage): Promise<SendResult> {
    const info = await this.transporter.sendMail({
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
      headers: message.tags && message.tags.length > 0 ? { 'X-Tags': message.tags.join(',') } : undefined,
      attachments: message.attachments?.map(a => ({ filename: a.filename, content: a.content, contentType: a.contentType })),
    })
    return { status: 'sent', providerMessageId: String(info.messageId) }
  }
}
