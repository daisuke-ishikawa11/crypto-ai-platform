declare module '@sendgrid/eventwebhook' {
  export class EventWebhook {
    verifySignature(publicKey: string, payload: string, signature: string, timestamp: string): boolean
  }
}
