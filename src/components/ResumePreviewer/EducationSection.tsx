
import { memo } from 'react';

interface EducationItem {
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
}

interface EducationSectionProps {
  data: EducationItem[];
}

export const EducationSection = memo(({ data }: EducationSectionProps) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide" data-ats-section="education">
      Education
    </h2>
    {data && data.length > 0 ? (
      <div className="space-y-3">
        {data.map((edu, index) => (
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
));

EducationSection.displayName = 'EducationSection';
