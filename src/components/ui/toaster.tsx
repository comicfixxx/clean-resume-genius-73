
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      expand={false}
      visibleToasts={4}
      toastOptions={{
        style: {
          background: 'white',
          color: 'black',
          border: '1px solid #e5e5e5',
        },
        className: 'my-toast',
        duration: 4000,
      }}
    />
  );
}
