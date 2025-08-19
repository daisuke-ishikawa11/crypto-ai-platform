"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info,
  AlertCircle
} from "lucide-react"

type ToastVariant = 'default' | 'success' | 'destructive' | 'warning' | 'info'

function isToastVariant(v: unknown): v is ToastVariant {
  return v === 'default' || v === 'success' || v === 'destructive' || v === 'warning' || v === 'info'
}

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant: ToastVariant) => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "destructive":
        return <XCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={isToastVariant(variant) ? variant : 'default'} {...props}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon(isToastVariant(variant) ? variant : 'default')}
              </div>
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
