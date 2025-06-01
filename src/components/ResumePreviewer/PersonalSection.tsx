
import { memo } from 'react';

interface PersonalData {
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  summary?: string;
}

interface PersonalSectionProps {
  data: PersonalData;
}

export const PersonalSection = memo(({ data }: PersonalSectionProps) => (
  <>
    {/* Personal Information Section */}
    <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" data-ats-name="true">
        {data.fullName || 'Your Name'}
      </h1>
      <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
        {data.email && (
          <div className="flex items-center" data-ats-email="true">
            <span className="font-medium">Email:</span> {data.email}
          </div>
        )}
        {data.phone && (
          <div className="flex items-center" data-ats-phone="true">
            <span className="font-medium">Phone:</span> {data.phone}
          </div>
        )}
        {data.website && (
          <div className="flex items-center" data-ats-website="true">
            <span className="font-medium">Website:</span> {data.website}
          </div>
        )}
      </div>
    </div>

    {/* Professional Summary Section */}
    {data.summary && (
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3 uppercase tracking-wide" data-ats-section="summary">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed" data-ats-content="summary">
          {data.summary}
        </p>
      </div>
    )}
  </>
));

PersonalSection.displayName = 'PersonalSection';
