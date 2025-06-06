
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { ReactNode } from "react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts && toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Remove any potential 'type' property from props to avoid conflicts
        const { type, ...restProps } = props as any;
        
        return (
          <Toast key={id || Math.random().toString()} variant={variant} {...restProps}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action && <div className="action">{action as ReactNode}</div>}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
