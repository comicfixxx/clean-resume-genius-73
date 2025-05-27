
import { toast as sonnerToast } from "sonner";

export interface Toast {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  id?: string | number;
}

export interface UseToastReturnType {
  toast: (props: Toast) => string | number;
  toasts: Toast[];
}

export function toast(props: Toast) {
  const { variant = "default", title, description, ...rest } = props;
  
  // Map our variants to sonner's supported options
  if (variant === "destructive") {
    return sonnerToast.error(title || "Error", {
      description,
      ...rest
    });
  } else if (variant === "success") {
    return sonnerToast.success(title || "Success", {
      description,
      ...rest
    });
  } else {
    return sonnerToast(title || "Notification", {
      description,
      ...rest
    });
  }
}

export const useToast = (): UseToastReturnType => {
  return {
    toast,
    toasts: [], // Sonner handles toast state internally
  };
};
