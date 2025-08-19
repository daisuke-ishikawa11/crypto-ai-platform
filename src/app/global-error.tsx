'use client'

import * as React from "react"
import { useEffect } from 'react'

// Sentry設定を開発環境では無効化  
let Sentry: typeof import('@sentry/nextjs') | null = null
const initSentry = async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      Sentry = await import('@sentry/nextjs')
    } catch {
      console.warn('Sentry import failed')
    }
  }
}
initSentry()

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (Sentry) {
      Sentry.captureException(error)
    } else {
      console.error('Global Error:', error)
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re sorry for the inconvenience. The error has been logged and we&apos;ll look into it.
            </p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}