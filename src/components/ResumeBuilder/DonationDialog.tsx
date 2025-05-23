
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
  const [hasDonated, setHasDonated] = useState(checkDonationStatus());

  // Handle dialog opening/closing
  useEffect(() => {
    if (open) {
      setHasDonated(checkDonationStatus());
    }
  }, [open]);

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
              <img 
                src="/lovable-uploads/c73b380c-4839-40a6-afb7-b3046b37512d.png" 
                alt="Donation QR Code"
                className="w-[200px] h-[200px] object-contain"
              />
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

export default DonationDialog;
