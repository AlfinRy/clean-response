'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  code: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

export default function CopyButton({ code, children, className = '', showIcon = true }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative group ${className}`}>
      {children}
      {showIcon && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-background/80 hover:bg-background border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 backdrop-blur-sm shadow-sm"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  )
}
