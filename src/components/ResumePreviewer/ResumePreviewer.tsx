
import { calculateResumeScore } from '@/utils/algorithms';
import { useEffect, useState, memo, useCallback } from 'react';
import { AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { exportToFormat } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { checkDonationStatus } from '@/utils/donationUtils';
import DonationDialog from '@/components/ResumeBuilder/DonationDialog';

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
    {/* Personal Information Section */}
    <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" data-ats-name="true">
        {data.personal?.fullName || 'Your Name'}
      </h1>
      <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
        {data.personal?.email && (
          <div className="flex items-center" data-ats-email="true">
            <span className="font-medium">Email:</span> {data.personal.email}
          </div>
        )}
        {data.personal?.phone && (
          <div className="flex items-center" data-ats-phone="true">
            <span className="font-medium">Phone:</span> {data.personal.phone}
          </div>
        )}
        {data.personal?.website && (
          <div className="flex items-center" data-ats-website="true">
            <span className="font-medium">Website:</span> {data.personal.website}
          </div>
        )}
      </div>
    </div>

    {/* Professional Summary Section */}
    {data.personal?.summary && (
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3 uppercase tracking-wide" data-ats-section="summary">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed" data-ats-content="summary">
          {data.personal.summary}
        </p>
      </div>
    )}

    {/* Work Experience Section */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide" data-ats-section="experience">
        Work Experience
      </h2>
      {data.experience && data.experience.length > 0 ? (
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={`exp-${index}`} className="pl-0" data-ats-experience-item="true">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-base" data-ats-job-title="true">
                  {exp.position}
                </h3>
                <span className="text-sm text-gray-600 font-medium" data-ats-dates="true">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-2" data-ats-company="true">
                {exp.company}
              </p>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed" data-ats-description="true">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No work experience added yet.</p>
      )}
    </div>

    {/* Education Section */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide" data-ats-section="education">
        Education
      </h2>
      {data.education && data.education.length > 0 ? (
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={`edu-${index}`} data-ats-education-item="true">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-base" data-ats-school="true">
                  {edu.school}
                </h3>
                <span className="text-sm text-gray-600 font-medium" data-ats-dates="true">
                  {edu.startDate} - {edu.endDate || "Present"}
                </span>
              </div>
              <p className="text-sm text-gray-700" data-ats-degree="true">
                {edu.degree} {edu.field ? `in ${edu.field}` : ''}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No education information added yet.</p>
      )}
    </div>

    {/* Skills Section */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide" data-ats-section="skills">
        Skills
      </h2>
      {data.skills && data.skills.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2" data-ats-skills-list="true">
          {data.skills.map((skill, index) => (
            <span
              key={`skill-${index}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm text-center"
              data-ats-skill="true"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No skills added yet.</p>
      )}
    </div>

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
  );
});

ResumePreviewer.displayName = 'ResumePreviewer';
