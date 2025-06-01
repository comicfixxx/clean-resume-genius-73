
import { memo } from 'react';

interface ExperienceItem {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface ExperienceSectionProps {
  data: ExperienceItem[];
}

export const ExperienceSection = memo(({ data }: ExperienceSectionProps) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide" data-ats-section="experience">
      Work Experience
    </h2>
    {data && data.length > 0 ? (
      <div className="space-y-4">
        {data.map((exp, index) => (
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
));

ExperienceSection.displayName = 'ExperienceSection';
