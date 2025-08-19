import { EmailMessage, SendResult } from './types'

export interface EmailProviderPort {
  sendEmail(message: EmailMessage): Promise<SendResult>
}


