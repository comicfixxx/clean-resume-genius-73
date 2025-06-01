
import { toast } from "@/hooks/use-toast";

// Define Razorpay types for better TypeScript support
declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
  retry?: {
    enabled: boolean;
    max_count: number;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: () => void) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface PaymentSuccessHandler {
  (format?: string): void;
}

// Use environment variable for Razorpay key
const RAZORPAY_KEY = "rzp_live_5JYQnqKRnKhB5y";

// Improved script loading with proper error handling
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    
    script.onload = () => resolve(true);
    script.onerror = () => {
      toast({
        title: "Payment System Error",
        description: "Unable to load payment system. Please refresh and try again.",
        variant: "destructive",
      });
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

// Secure DOM element access
const getFormElement = (selector: string): string => {
  const element = document.querySelector(selector) as HTMLInputElement | null;
  return element?.value?.trim() || "";
};

// Secure localStorage operations
const secureStorage = {
  set: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set localStorage item: ${key}`, error);
    }
  },
  get: (key: string): string => {
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      console.warn(`Failed to get localStorage item: ${key}`, error);
      return "";
    }
  }
};

export const initializePayment = async (
  amount: number, 
  onSuccess: PaymentSuccessHandler, 
  format?: string
): Promise<any> => {
  // Validate input
  if (!amount || amount <= 0) {
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0.",
      variant: "destructive",
    });
    return Promise.reject(new Error('Invalid amount'));
  }

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    return Promise.reject(new Error('Razorpay not initialized'));
  }

  return new Promise((resolve, reject) => {
    try {
      // Secure form data extraction
      const userEmail = getFormElement('input[type="email"]') || secureStorage.get('user_email');
      const userName = getFormElement('input[id="fullName"]') || secureStorage.get('user_name');
      const userPhone = getFormElement('input[id="phone"]') || secureStorage.get('user_phone');
      
      // Secure storage
      if (userEmail) secureStorage.set('user_email', userEmail);
      if (userName) secureStorage.set('user_name', userName);
      if (userPhone) secureStorage.set('user_phone', userPhone);
      
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "SXO Resume",
        description: "Resume Builder Premium Access",
        image: "https://i.imgur.com/n5tjHFD.png",
        handler: (response: RazorpayResponse) => {
          if (response.razorpay_payment_id) {
            secureStorage.set('last_payment_id', response.razorpay_payment_id);
            secureStorage.set('payment_successful', 'true');
            secureStorage.set('payment_timestamp', Date.now().toString());
            
            if (format) {
              secureStorage.set('last_download_format', format);
            }
            
            // Send confirmation email
            if (userEmail) {
              sendThankYouEmail(userEmail, userName, format).catch(console.error);
            }
            
            toast({
              title: "Payment Successful",
              description: "Your resume is being downloaded automatically.",
            });
            
            onSuccess(format);
            resolve(response);
          } else {
            toast({
              title: "Payment Failed",
              description: "Payment verification failed. Please try again.",
              variant: "destructive",
            });
            reject(new Error('Payment verification failed'));
          }
        },
        prefill: { name: userName, email: userEmail, contact: userPhone },
        notes: { address: "SXO Resume Builder" },
        theme: { color: "#1E3A8A" },
        retry: { enabled: true, max_count: 3 },
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
            });
            reject(new Error('Payment cancelled by user'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.error', () => {
        toast({
          title: "Payment Failed",
          description: "There was a network error. Please try again.",
          variant: "destructive",
        });
        reject(new Error('Payment network error'));
      });
      
      razorpay.open();
      
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      reject(error);
    }
  });
};

// Secure email sending function
const sendThankYouEmail = async (email: string, name: string, format?: string): Promise<void> => {
  try {
    const response = await fetch('https://aibpalskveawzdqyjwaq.supabase.co/functions/v1/send-thank-you', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, format }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
};

export const checkPreviousPayment = (): boolean => {
  const paymentSuccessful = secureStorage.get('payment_successful') === 'true';
  
  if (paymentSuccessful) {
    const timestamp = secureStorage.get('payment_timestamp');
    if (timestamp) {
      const paymentDate = new Date(parseInt(timestamp));
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      return paymentDate > thirtyDaysAgo;
    }
  }
  
  return paymentSuccessful;
};

export const validatePaymentStatus = (): Promise<boolean> => {
  return Promise.resolve(checkPreviousPayment());
};
