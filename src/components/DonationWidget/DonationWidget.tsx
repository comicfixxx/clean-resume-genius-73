
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonationWidgetConfig {
  upiId: string;
  name: string;
  amount: number;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor: string;
  buttonText: string;
}

interface DonationWidgetProps {
  config: DonationWidgetConfig;
}

export const DonationWidget = ({ config }: DonationWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(config.amount);
  const [showQR, setShowQR] = useState(false);

  const positionStyles = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  const generateUPIUrl = () => {
    return `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(config.name)}&am=${donationAmount}&tn=${encodeURIComponent('Donation for Resume Builder')}`;
  };

  const generateQRCode = async () => {
    const upiUrl = generateUPIUrl();
    
    // Use a QR code generation service
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
    return qrCodeUrl;
  };

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (showQR) {
      generateQRCode().then(setQrCodeUrl);
    }
  }, [showQR, donationAmount]);

  const handleDonate = () => {
    setShowQR(true);
  };

  const handleComplete = () => {
    localStorage.setItem('donation_completed', 'true');
    localStorage.setItem('donation_timestamp', Date.now().toString());
    setIsOpen(false);
    setShowQR(false);
  };

  return (
    <>
      {/* Floating Donation Button */}
      <div 
        className={`fixed ${positionStyles[config.position]} z-50`}
        style={{ zIndex: 9999 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: config.primaryColor }}
        >
          <Heart className="w-4 h-4 mr-2" />
          {config.buttonText}
        </Button>
      </div>

      {/* Donation Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: config.primaryColor }} />
              Support Resume Builder
            </DialogTitle>
            <DialogDescription>
              Help us keep this service free for everyone with your donation.
            </DialogDescription>
          </DialogHeader>

          {!showQR ? (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="donation-amount">Donation Amount (₹)</Label>
                <Input
                  id="donation-amount"
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(parseInt(e.target.value) || config.amount)}
                  min={1}
                />
                <p className="text-sm text-muted-foreground">
                  Suggested donation: ₹{config.amount}
                </p>
              </div>
              
              <Button 
                onClick={handleDonate} 
                className="w-full"
                style={{ backgroundColor: config.primaryColor }}
              >
                <Heart className="mr-2 h-4 w-4" />
                Proceed to Donate ₹{donationAmount}
              </Button>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              <div className="flex justify-center">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl}
                    alt="Donation QR Code"
                    className="w-[200px] h-[200px] object-contain border rounded-lg"
                  />
                )}
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">UPI ID:</span> {config.upiId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Amount:</span> ₹{donationAmount}
                </p>
                <p className="text-sm text-muted-foreground">
                  Scan with any UPI app to donate
                </p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleComplete}
                  className="w-full"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  I've Completed My Donation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowQR(false)}
                  className="w-full"
                >
                  Back to Amount Selection
                </Button>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Thank you for supporting our free platform!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
