import type { LoggerPort } from '@crypto/defi'

export const appLogger: LoggerPort = {
  info(message, context) {
    console.info(`[defi-suite] ${message}`, context ?? {})
  },
  warn(message, context) {
    console.warn(`[defi-suite] ${message}`, context ?? {})
  },
  error(message, context) {
    console.error(`[defi-suite] ${message}`, context ?? {})
  },
  debug(message, context) {
    console.debug(`[defi-suite] ${message}`, context ?? {})
  },
}
