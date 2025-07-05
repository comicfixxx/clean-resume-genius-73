
import { Download } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { initializePayment, checkPreviousPayment } from "@/utils/paymentUtils";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (format: string) => void;
  isAtsCheck?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isAtsCheck = false }: PaymentDialogProps) => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReferralValid, setIsReferralValid] = useState<boolean | null>(null);
  const [hasPreviousPurchase, setHasPreviousPurchase] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      // Reset processing state when dialog opens
      setIsProcessing(false);
      
      // Check for previous purchases
      const previousPurchase = checkPreviousPayment();
      setHasPreviousPurchase(previousPurchase);
      
      // Retrieve previously used format if any
      const savedFormat = localStorage.getItem('preferred_format');
      if (savedFormat && ['pdf', 'docx', 'doc'].includes(savedFormat)) {
        setSelectedFormat(savedFormat);
      }
    }
  }, [open]);

  // Save selected format preference
  useEffect(() => {
    if (selectedFormat) {
      localStorage.setItem('preferred_format', selectedFormat);
    }
  }, [selectedFormat]);

  const validateReferralCode = (code: string) => {
    // Simple validation for referral codes
    const isValid = code.length === 5 && code.endsWith("ak90");
    setIsReferralValid(isValid);
    return isValid;
  };

  const calculateDiscountedAmount = (originalAmount: number, code: string) => {
    if (validateReferralCode(code)) {
      return Math.floor(originalAmount * 0.9); // 10% discount
    }
    return originalAmount;
  };

  const handlePayment = async () => {
    if (isProcessing) {
      toast({
        title: "Please wait",
        description: "Your payment is being processed...",
      });
      return;
    }
    
    // If user already has a valid purchase, skip payment
    if (hasPreviousPurchase) {
      console.log('Using previous purchase');
      onSuccess(selectedFormat);
      onOpenChange(false);
      toast({
        title: "Using Previous Purchase",
        description: "Your download has started automatically.",
      });
      return;
    }
    
    console.log('Starting payment process');
    setIsValidatingCode(true);
    setIsProcessing(true);
    
    try {
      const baseAmount = isAtsCheck ? 59 : 399;
      let finalAmount = baseAmount;

      if (referralCode) {
        if (validateReferralCode(referralCode)) {
          finalAmount = calculateDiscountedAmount(baseAmount, referralCode);
          console.log('Referral code applied, new amount:', finalAmount);
          toast({
            title: "Referral Applied",
            description: "You got 10% off with your referral code!",
          });
        } else {
          console.log('Invalid referral code:', referralCode);
          toast({
            title: "Invalid Referral",
            description: "The referral code is not valid.",
            variant: "destructive",
          });
          setIsValidatingCode(false);
          setIsProcessing(false);
          return;
        }
      }

      // Store user's email for later sending confirmation
      const formElements = document.querySelectorAll('input[type="email"]');
      formElements.forEach(element => {
        const input = element as HTMLInputElement;
        if (input.value) {
          localStorage.setItem('user_email', input.value);
        }
      });

      // Save user name if available
      const nameInput = document.querySelector('input[id="fullName"]') as HTMLInputElement;
      if (nameInput && nameInput.value) {
        localStorage.setItem('user_name', nameInput.value);
      }

      // Call initializePayment with success callback that closes dialog and triggers onSuccess
      await initializePayment(finalAmount, () => {
        console.log('Payment successful, initiating download/check');
        // Trigger the success callback with the selected format
        onSuccess(selectedFormat);
        setIsValidatingCode(false);
        setIsProcessing(false);
        onOpenChange(false);
        
        toast({
          title: "Payment Successful!",
          description: "Your download has started automatically.",
        });
      }, selectedFormat);
    } catch (error) {
      console.error('Payment error:', error);
      setIsValidatingCode(false);
      setIsProcessing(false);
      
      if (error.message === 'Payment cancelled by user') {
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment process. Try again when you're ready.",
        });
      } else {
        toast({
          title: "Payment Error",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{isAtsCheck ? "ATS Analysis" : "Resume Download"}</AlertDialogTitle>
          <AlertDialogDescription>
            {isAtsCheck ? (
              "Get your resume analyzed by our ATS system:"
            ) : (
              "Unlock your professional resume with our premium ATS-optimized format:"
            )}
            <ul className="mt-4 space-y-2">
              {isAtsCheck ? (
                <>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Detailed ATS compatibility score
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Keyword analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Format optimization tips
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Professional formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    ATS optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Multiple format options
                  </li>
                </>
              )}
            </ul>

            {hasPreviousPurchase && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">You've already purchased this. You can download again at no extra cost.</span>
              </div>
            )}

            {!isAtsCheck && (
              <div className="mt-4 space-y-2">
                <Label>Select Format</Label>
                <RadioGroup
                  defaultValue="pdf"
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                  className="grid grid-cols-3 gap-2"
                >
                  <div>
                    <RadioGroupItem value="pdf" id="pdf" className="peer sr-only" />
                    <Label
                      htmlFor="pdf"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      PDF
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="docx" id="docx" className="peer sr-only" />
                    <Label
                      htmlFor="docx"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      DOCX
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="doc" id="doc" className="peer sr-only" />
                    <Label
                      htmlFor="doc"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      DOC
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <Label htmlFor="referralCode">Have a referral code?</Label>
              <div className="relative">
                <Input
                  id="referralCode"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => {
                    setReferralCode(e.target.value);
                    if (e.target.value.length >= 5) {
                      validateReferralCode(e.target.value);
                    } else if (isReferralValid !== null) {
                      setIsReferralValid(null);
                    }
                  }}
                  disabled={isValidatingCode}
                  className={isReferralValid === true ? "border-green-500 pr-10" : isReferralValid === false ? "border-red-500 pr-10" : ""}
                />
                {isReferralValid === true && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Use a valid referral code to get 10% off!
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0">
          <AlertDialogAction 
            onClick={handlePayment} 
            className="w-full sm:w-auto"
            disabled={isValidatingCode || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : hasPreviousPurchase ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                {isAtsCheck ? 'Check Again' : 'Download Again'}
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                {isAtsCheck ? 'Check Now' : 'Download Now'}
              </>
            )}
          </AlertDialogAction>
          <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
