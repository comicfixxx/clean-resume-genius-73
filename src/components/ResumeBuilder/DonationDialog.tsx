
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { checkDonationStatus, markDonationComplete } from '@/utils/donationUtils';
import { Button } from "@/components/ui/button";
import { Wallet, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (format?: string) => void;
  selectedFormat?: string;
}

const DonationDialog = ({ open, onOpenChange, onSuccess, selectedFormat }: DonationDialogProps) => {
  const [donationAmount, setDonationAmount] = useState(399);
  const [showQR, setShowQR] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [hasDonated, setHasDonated] = useState(checkDonationStatus());

  // Handle dialog opening/closing
  useEffect(() => {
    if (open) {
      setHasDonated(checkDonationStatus());
      if (showQR) {
        generateQRCode();
      }
    }
  }, [open, showQR]);

  // Function to handle donation completion
  const handleComplete = () => {
    markDonationComplete();
    setHasDonated(true);
    onSuccess(selectedFormat);
    onOpenChange(false);
  };

  // Function to show donation QR
  const handleDonate = () => {
    setShowQR(true);
    generateQRCode();
  };

  // Generate QR code for UPI payment
  const generateQRCode = async () => {
    try {
      // Load QRCode.js if not already loaded
      if (!window.QRCode) {
        await loadQRCodeScript();
      }
      
      const qrContainer = document.getElementById('donation-qr-code');
      if (!qrContainer) return;
      
      // Clear previous QR code
      qrContainer.innerHTML = '';
      
      // Create the UPI URL for donation
      const baseUrl = 'upi://pay';
      const params = new URLSearchParams();
      params.append('pa', 'adnanmuhammad4393@okicici');
      params.append('pn', 'Muhammed Adnan');
      params.append('am', donationAmount.toString());
      params.append('tn', 'Resume Builder Donation');
      const upiUrl = `${baseUrl}?${params.toString()}`;
      
      // Generate QR code
      window.QRCode.toCanvas(qrContainer, upiUrl, { width: 200 }, function(error: any) {
        if (error) console.error('Error generating QR code:', error);
        setQrLoaded(true);
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Load QRCode.js library
  const loadQRCodeScript = () => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support Resume Builder</DialogTitle>
          <DialogDescription>
            {hasDonated ? (
              "Thank you for your donation! You can now download your resume."
            ) : (
              "Please make a donation to download your resume"
            )}
          </DialogDescription>
        </DialogHeader>

        {!hasDonated && !showQR && (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="donation-amount">Donation Amount (₹)</Label>
              <Input
                id="donation-amount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(parseInt(e.target.value) || 399)}
                min={1}
              />
              <p className="text-sm text-muted-foreground">
                Suggested donation: ₹399
              </p>
            </div>
            
            <Button onClick={handleDonate} className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Proceed to Donate
            </Button>
          </div>
        )}

        {!hasDonated && showQR && (
          <div className="py-4 space-y-4">
            <div className="flex justify-center">
              <div 
                id="donation-qr-code" 
                className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center text-sm"
              >
                {!qrLoaded && "Loading QR Code..."}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm">
                <span className="font-semibold">UPI ID:</span> adnanmuhammad4393@okicici
              </p>
              <p className="text-sm">Scan with any UPI app to donate</p>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={handleComplete}
                className="w-full"
                variant="default"
              >
                I've Completed My Donation
              </Button>
            </div>
          </div>
        )}

        {hasDonated && (
          <div className="py-4">
            <Button onClick={() => onSuccess(selectedFormat)} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Add type definitions for window.QRCode
declare global {
  interface Window {
    QRCode: {
      toCanvas: (
        canvas: HTMLElement,
        text: string,
        options: { width: number },
        callback: (error: any) => void
      ) => void;
    };
  }
}

export default DonationDialog;
