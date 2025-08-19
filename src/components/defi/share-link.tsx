"use client"

import * as React from "react"

export const ShareLink: React.FC<{ label?: string }> = ({ label = 'Copy link' }) => {
  const [copied, setCopied] = React.useState(false)
  const onCopy = async () => {
    try {
      const href = typeof window !== 'undefined' ? window.location.href : ''
      if (!href) return
      await navigator.clipboard.writeText(href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* ignore */ }
  }
  return (
    <button aria-label={label} onClick={onCopy} className="px-2 py-1 border rounded text-sm hover:bg-muted">
      {copied ? 'Copied' : label}
    </button>
  )
}
