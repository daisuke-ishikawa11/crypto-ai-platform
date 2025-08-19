import { Resend } from 'resend'
import type { EmailMessage, SendResult } from '../types'
import type { EmailProviderPort } from '../ports'

export class ResendProvider implements EmailProviderPort {
  private readonly client: Resend
  private readonly fromAddress: string

  constructor(apiKey: string, fromAddress: string) {
    this.client = new Resend(apiKey)
    this.fromAddress = fromAddress
  }

  async sendEmail(message: EmailMessage): Promise<SendResult> {
    const tags = message.tags?.map(t => ({ name: 'category', value: t }))
    const attachments = message.attachments?.map(a => ({ filename: a.filename, content: a.content, contentType: a.contentType }))
    const res = await this.client.emails.send({
      from: this.fromAddress,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
      tags,
      attachments,
    } as any)
    const id = (res as unknown as { id?: string }).id
    return { status: 'sent', providerMessageId: id }
  }
}


