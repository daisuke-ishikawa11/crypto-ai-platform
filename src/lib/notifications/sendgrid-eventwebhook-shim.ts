export class EventWebhook {
  // This shim defers to HMAC fallback implemented in route when the official lib isn't available
  // Here we only provide the interface to avoid import errors in environments without the package.
  verifySignature(_publicKey: string, _payload: string, _signature: string, _timestamp: string): boolean {
    // Return false to force fallback path in caller
    return false
  }
}
