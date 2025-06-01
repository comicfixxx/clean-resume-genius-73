
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
import { useState } from "react";
import DonationDialog from "./DonationDialog";

interface SimpleDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (format: string) => void;
  isAtsCheck?: boolean;
}

export const SimpleDownloadDialog = ({ open, onOpenChange, onSuccess, isAtsCheck = false }: SimpleDownloadDialogProps) => {
  const [showDonation, setShowDonation] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const handleProceed = () => {
    setShowDonation(true);
    onOpenChange(false);
  };

  const handleDonationSuccess = (format?: string) => {
    setShowDonation(false);
    onSuccess(format || selectedFormat);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isAtsCheck ? "ATS Analysis" : "Download Resume"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isAtsCheck 
                ? "Support our free platform with a donation to get your ATS analysis."
                : "Support our free platform with a donation to download your resume."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceed}>
              <Download className="w-4 h-4 mr-2" />
              Continue with Donation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DonationDialog 
        open={showDonation}
        onOpenChange={setShowDonation}
        onSuccess={handleDonationSuccess}
        selectedFormat={selectedFormat}
      />
    </>
  );
};
