
import { memo } from 'react';

interface SkillsSectionProps {
  data: string[];
}

export const SkillsSection = memo(({ data }: SkillsSectionProps) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide" data-ats-section="skills">
      Skills
    </h2>
    {data && data.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2" data-ats-skills-list="true">
        {data.map((skill, index) => (
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
));

SkillsSection.displayName = 'SkillsSection';
