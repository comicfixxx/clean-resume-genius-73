
import { calculateResumeScore } from '@/utils/algorithms';
import { useEffect, useState, memo } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ResumePreviewerProps {
  data: {
    personal: any;
    experience: any[];
    education: any[];
    skills: string[];
  };
  isPaid?: boolean;
}

// Memoize the preview content for better performance
const PreviewContent = memo(({ data }: { data: ResumePreviewerProps['data'] }) => (
  <div className="max-w-[850px] mx-auto p-4 sm:p-6 md:p-8 print:p-6 optimize-paint">
    {/* Contact Information - Optimized for ATS */}
    {data.personal && data.personal.fullName && (
      <div className="text-center border-b border-gray-200 pb-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" data-ats-name="true">{data.personal.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm text-gray-600">
          {data.personal.email && (
            <div data-ats-email="true">{data.personal.email}</div>
          )}
          {data.personal.phone && (
            <div data-ats-phone="true">{data.personal.phone}</div>
          )}
          {data.personal.website && (
            <div data-ats-website="true">{data.personal.website}</div>
          )}
        </div>
      </div>
    )}

    {/* Professional Summary/Objective - Important for ATS */}
    {data.personal && data.personal.summary && (
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="summary">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-700" data-ats-content="summary">{data.personal.summary}</p>
      </div>
    )}

    {/* Work Experience Section - Critical for ATS */}
    {data.experience && data.experience.length > 0 && (
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="experience">
          Work Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp, index) => (
            <div key={index} className="pl-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }} data-ats-experience-item="true">
              <div className="flex justify-between items-start flex-wrap gap-1">
                <h3 className="font-semibold text-gray-900 text-sm" data-ats-job-title="true">{exp.position}</h3>
                <span className="text-xs text-gray-600" data-ats-dates="true">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <p className="text-sm text-gray-700 font-medium" data-ats-company="true">{exp.company}</p>
              <p className="text-xs text-gray-600 whitespace-pre-line" data-ats-description="true">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education Section - Optimized formatting for ATS */}
    {data.education && data.education.length > 0 && (
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="education">
          Education
        </h2>
        <div className="space-y-2">
          {data.education.map((edu, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }} data-ats-education-item="true">
              <div className="flex justify-between items-start flex-wrap gap-1">
                <h3 className="font-semibold text-gray-900 text-sm" data-ats-school="true">{edu.school}</h3>
                <span className="text-xs text-gray-600" data-ats-dates="true">
                  {edu.startDate} - {edu.endDate || "Present"}
                </span>
              </div>
              <p className="text-sm text-gray-700" data-ats-degree="true">
                {edu.degree} {edu.field ? `in ${edu.field}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills Section - Important for ATS keyword matching */}
    {data.skills && data.skills.length > 0 && (
      <div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="skills">
          Skills
        </h2>
        <div className="flex flex-wrap gap-1.5" data-ats-skills-list="true">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-sm text-xs animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              data-ats-skill="true"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* ATS Optimization Notice - Hidden for print */}
    <div className="mt-6 text-center text-xs text-gray-500 print:hidden">
      <p>This resume is optimized for Applicant Tracking Systems</p>
    </div>
  </div>
));

PreviewContent.displayName = 'PreviewContent';

export const ResumePreviewer = memo(({ data, isPaid = false }: ResumePreviewerProps) => {
  // Calculate ATS score based on content
  const atsScore = calculateResumeScore(data);
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const getScoreBadge = () => {
    if (atsScore >= 90) {
      return (
        <div className="flex items-center gap-1 text-green-500">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Excellent</span>
        </div>
      );
    } else if (atsScore >= 80) {
      return (
        <div className="flex items-center gap-1 text-green-500">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Good</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-amber-500">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Needs Improvement</span>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm relative">
      {isClient && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span className="font-medium">ATS Score:</span> {atsScore}/100
                <span className="ml-1">{getScoreBadge()}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-medium">ATS Compatibility Score</p>
                <p className="text-xs mt-1">This measures how well your resume will perform with Applicant Tracking Systems.</p>
                {atsScore < 80 && (
                  <div className="mt-2 text-xs">
                    <p className="font-medium text-amber-500">Tips to improve:</p>
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      <li>Add a detailed professional summary</li>
                      <li>Include metrics and achievements in experience</li>
                      <li>Ensure all sections are properly filled</li>
                      <li>Add more relevant skills</li>
                    </ul>
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <div id="resume-preview" className="print:p-0 print:shadow-none">
        <PreviewContent data={data} />
      </div>
    </div>
  );
});

ResumePreviewer.displayName = 'ResumePreviewer';
