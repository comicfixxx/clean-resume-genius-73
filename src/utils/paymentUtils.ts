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

// Use a constant for Razorpay key - in production this should come from environment variables
// This is a publishable key so it's ok to have in the client
const RAZORPAY_KEY = "rzp_live_5JYQnqKRnKhB5y";

// Load the Razorpay script dynamically with better error handling
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    
    script.onload = () => {
      console.log("Razorpay SDK loaded successfully");
      resolve(true);
    };
    
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      toast({
        title: "Payment System Error",
        description: "Unable to load payment system. Please refresh the page or try again later.",
        variant: "destructive",
      });
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

export const initializePayment = async (amount: number, onSuccess: PaymentSuccessHandler, format?: string): Promise<any> => {
  console.log('Initializing payment with amount:', amount, 'format:', format);
  
  if (!amount || amount <= 0) {
    console.error('Invalid payment amount:', amount);
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0.",
      variant: "destructive",
    });
    return Promise.reject(new Error('Invalid amount'));
  }

  // Ensure Razorpay is loaded with better error handling
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    console.error('Razorpay SDK not loaded');
    toast({
      title: "Payment Error",
      description: "Payment system is not available. Please try again or refresh the page.",
      variant: "destructive",
    });
    return Promise.reject(new Error('Razorpay not initialized'));
  }

  return new Promise((resolve, reject) => {
    try {
      console.log('Creating Razorpay instance with options');
      
      // Fix type errors by explicitly casting to HTMLInputElement
      const emailElement = document.querySelector('input[type="email"]') as HTMLInputElement | null;
      const nameElement = document.querySelector('input[id="fullName"]') as HTMLInputElement | null;
      const phoneElement = document.querySelector('input[id="phone"]') as HTMLInputElement | null;
      
      const userEmail = emailElement?.value || localStorage.getItem('user_email') || "";
      const userName = nameElement?.value || localStorage.getItem('user_name') || "";
      const userPhone = phoneElement?.value || localStorage.getItem('user_phone') || "";
      
      if (userEmail) localStorage.setItem('user_email', userEmail);
      if (userName) localStorage.setItem('user_name', userName);
      if (userPhone) localStorage.setItem('user_phone', userPhone);
      
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "SXO Resume",
        description: "Resume Builder Premium Access",
        image: "https://i.imgur.com/n5tjHFD.png",
        handler: function (response: RazorpayResponse) {
          console.log('Payment response received:', response);
          if (response.razorpay_payment_id) {
            console.log('Payment successful:', response.razorpay_payment_id);
            localStorage.setItem('last_payment_id', response.razorpay_payment_id);
            localStorage.setItem('payment_successful', 'true');
            localStorage.setItem('payment_timestamp', Date.now().toString());
            
            // Store selected format in localStorage to use if download needs to be triggered again
            if (format) {
              localStorage.setItem('last_download_format', format);
            }
            
            // Send confirmation email if email is available
            try {
              const userEmail = localStorage.getItem('user_email');
              if (userEmail) {
                // Send a thank you email using our new edge function
                sendThankYouEmail(userEmail, userName || "", format);
              }
            } catch (emailError) {
              console.error('Error sending confirmation email:', emailError);
              // Don't block the payment success flow if email fails
            }
            
            toast({
              title: "Payment Successful",
              description: "Your resume is being downloaded automatically.",
            });
            
            // Call the onSuccess callback with format parameter
            // This will trigger the download in the component
            onSuccess(format);
            resolve(response);
          } else {
            console.error('Payment verification failed - no payment ID');
            toast({
              title: "Payment Failed",
              description: "Payment verification failed. Please try again.",
              variant: "destructive",
            });
            reject(new Error('Payment verification failed'));
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone
        },
        notes: {
          address: "SXO Resume Builder"
        },
        theme: {
          color: "#1E3A8A"  // Updated to match the new primary color
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed by user');
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
            });
            reject(new Error('Payment cancelled by user'));
          }
        }
      };

      console.log('Opening Razorpay payment modal');
      const razorpay = new window.Razorpay(options);
      
      // Handle network errors
      razorpay.on('payment.error', function() {
        toast({
          title: "Payment Failed",
          description: "There was a network error. Please try again.",
          variant: "destructive",
        });
        reject(new Error('Payment network error'));
      });
      
      razorpay.open();
      
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      reject(error);
    }
  });
};

// Function to send a thank you email using the Supabase edge function
const sendThankYouEmail = async (email: string, name: string, format?: string) => {
  try {
    console.log(`Sending thank you email to ${email}`);
    
    const response = await fetch('https://aibpalskveawzdqyjwaq.supabase.co/functions/v1/send-thank-you', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        format,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Thank you email error:', errorData);
      return;
    }

    const data = await response.json();
    console.log('Thank you email sent:', data);
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
};

// Helper function to send payment confirmation
const sendPaymentConfirmation = (email: string, paymentId: string) => {
  console.log(`Would send confirmation email to ${email} for payment ${paymentId}`);
  // This would typically call a backend API endpoint to send the email
  // For now, we'll just log it since we don't have a backend setup yet
};

// Check if a previous payment was successful
export const checkPreviousPayment = (): boolean => {
  const paymentSuccessful = localStorage.getItem('payment_successful') === 'true';
  
  // Also check if the payment was made recently (within 30 days)
  if (paymentSuccessful) {
    const timestamp = localStorage.getItem('payment_timestamp');
    if (timestamp) {
      const paymentDate = new Date(parseInt(timestamp));
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      return paymentDate > thirtyDaysAgo;
    }
  }
  
  return paymentSuccessful;
};

// Function to validate payment status
export const validatePaymentStatus = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check local storage first for fast response
    const paymentSuccessful = checkPreviousPayment();
    if (paymentSuccessful) {
      resolve(true);
      return;
    }
    
    // In a real application, this would verify with the server
    // For now we just rely on local storage
    resolve(false);
  });
};
