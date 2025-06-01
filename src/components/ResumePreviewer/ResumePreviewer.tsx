
import { calculateResumeScore } from '@/utils/algorithms';
import { useEffect, useState, memo, useCallback } from 'react';
import { AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { exportToFormat } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { checkDonationStatus } from '@/utils/donationUtils';
import DonationDialog from '@/components/ResumeBuilder/DonationDialog';
import { PersonalSection } from './PersonalSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

interface ResumePreviewerProps {
  data: {
    personal: any;
    experience: any[];
    education: any[];
    skills: string[];
  };
  isPaid?: boolean;
}

// Memoized preview content component
const PreviewContent = memo(({ data }: { data: ResumePreviewerProps['data'] }) => (
  <div className="max-w-[850px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8 print:p-6 bg-white">
    <ErrorBoundary>
      <PersonalSection data={data.personal} />
    </ErrorBoundary>
    
    <ErrorBoundary>
      <ExperienceSection data={data.experience} />
    </ErrorBoundary>

    <ErrorBoundary>
      <EducationSection data={data.education} />
    </ErrorBoundary>

    <ErrorBoundary>
      <SkillsSection data={data.skills} />
    </ErrorBoundary>

    {/* Footer with watermark */}
    <div className="mt-8 pt-4 border-t border-gray-200 text-center">
      <p className="text-xs text-gray-500">
        Built with www.sxoresumebuilder.site
      </p>
    </div>
  </div>
));

PreviewContent.displayName = 'PreviewContent';

export const ResumePreviewer = memo(({ data, isPaid = false }: ResumePreviewerProps) => {
  const atsScore = calculateResumeScore(data);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleDownload = useCallback(async () => {
    const isDonated = checkDonationStatus();
    
    if (!isDonated) {
      setDonationDialogOpen(true);
      return;
    }
    
    try {
      await exportToFormat(selectedFormat);
      toast({
        title: "Success",
        description: "Your resume is downloading automatically!",
        variant: "default"
      });
    } catch (error) {
      console.error("Error during export:", error);
      toast({
        title: "Export Error",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive"
      });
    }
  }, [selectedFormat, toast]);

  const handleDonationSuccess = useCallback(async (format?: string) => {
    try {
      await exportToFormat(format || selectedFormat);
      toast({
        title: "Success",
        description: "Thank you for your donation! Your resume is downloading.",
        variant: "success"
      });
    } catch (error) {
      console.error("Error during export:", error);
      toast({
        title: "Export Error",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive"
      });
    }
  }, [selectedFormat, toast]);

  const getScoreBadge = useCallback(() => {
    if (atsScore >= 95) {
      return (
        <div className="flex items-center gap-1 text-green-500">
          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-medium text-2xs sm:text-xs">Excellent</span>
        </div>
      );
    } else if (atsScore >= 85) {
      return (
        <div className="flex items-center gap-1 text-green-500">
          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-medium text-2xs sm:text-xs">Good</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-amber-500">
          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-medium text-2xs sm:text-xs">Needs Improvement</span>
        </div>
      );
    }
  }, [atsScore]);
  
  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow-sm relative">
        {isClient && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-2 right-2 z-10 bg-primary text-white text-2xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1">
                    <span className="font-medium">ATS:</span> {atsScore}/100
                    <span className="ml-0.5 sm:ml-1">{getScoreBadge()}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <div className="max-w-[200px] sm:max-w-xs">
                    <p className="font-medium">ATS Compatibility Score</p>
                    <p className="text-2xs sm:text-xs mt-1">This measures how well your resume will perform with Applicant Tracking Systems.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="absolute top-2 left-2 z-10">
              <Button 
                onClick={handleDownload}
                size="sm"
                className="flex items-center gap-1"
                aria-label="Download resume as PDF"
              >
                <Download className="w-3 h-3" />
                Download PDF
              </Button>
            </div>
          </>
        )}

        <div id="resume-preview" className="print:p-0 print:shadow-none pt-12">
          <PreviewContent data={data} />
        </div>

        <DonationDialog 
          open={donationDialogOpen} 
          onOpenChange={setDonationDialogOpen} 
          onSuccess={handleDonationSuccess}
          selectedFormat={selectedFormat}
        />
      </div>
    </ErrorBoundary>
  );
});

ResumePreviewer.displayName = 'ResumePreviewer';
