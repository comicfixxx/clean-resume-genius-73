
import { useState, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, Trash2 } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  experience: ExperienceItem[];
  updateExperience: (experience: ExperienceItem[]) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateExperienceItem: (index: number, updatedItem: ExperienceItem) => void;
  experienceCount: number;
}

// Create memoized individual experience item component for better performance
const ExperienceItemComponent = memo(({ 
  experience, 
  index, 
  updateExperienceItem, 
  removeExperience,
  isFirst
}: { 
  experience: ExperienceItem; 
  index: number; 
  updateExperienceItem: (index: number, updatedItem: ExperienceItem) => void;
  removeExperience: (index: number) => void;
  isFirst: boolean;
}) => {
  // Create optimized change handlers using useCallback
  const handleInputChange = useCallback((field: keyof ExperienceItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateExperienceItem(index, { ...experience, [field]: e.target.value });
  }, [index, updateExperienceItem, experience]);

  return (
    <div key={index} className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg optimize-paint">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-sm sm:text-base">Experience {index + 1}</h3>
        {!isFirst && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeExperience(index)}
            className="h-8 px-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="form-group">
          <label className="text-sm font-medium text-gray-700 block mb-1">Job Title</label>
          <Input
            value={experience.title}
            onChange={handleInputChange('title')}
            placeholder="Job title"
            required
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label className="text-sm font-medium text-gray-700 block mb-1">Company</label>
          <Input
            value={experience.company}
            onChange={handleInputChange('company')}
            placeholder="Company name"
            required
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
          <Input
            value={experience.location}
            onChange={handleInputChange('location')}
            placeholder="City, State"
            required
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label className="text-sm font-medium text-gray-700 block mb-1">Start Date</label>
          <Input
            type="month"
            value={experience.startDate}
            onChange={handleInputChange('startDate')}
            required
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label className="text-sm font-medium text-gray-700 block mb-1">End Date</label>
          <Input
            type="month"
            value={experience.endDate}
            onChange={handleInputChange('endDate')}
            className="w-full"
          />
        </div>
      </div>

      <div className="form-group mt-3">
        <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
        <Textarea
          value={experience.description}
          onChange={handleInputChange('description')}
          placeholder="Describe your responsibilities and achievements"
          required
          className="w-full min-h-[100px]"
        />
      </div>
    </div>
  );
});

ExperienceItemComponent.displayName = 'ExperienceItemComponent';

export const ExperienceForm = memo(({ experience, updateExperience, addExperience, removeExperience, updateExperienceItem, experienceCount }: ExperienceFormProps) => {
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handled by parent
  }, []);

  return (
    <form onSubmit={handleSubmit} className="content-visibility-auto">
      <h2 className="section-title flex items-center gap-2 text-xl font-semibold mb-4">
        <Briefcase className="w-5 h-5" />
        Work Experience
      </h2>

      {experience.map((exp, index) => (
        <ExperienceItemComponent
          key={index}
          experience={exp}
          index={index}
          updateExperienceItem={updateExperienceItem}
          removeExperience={removeExperience}
          isFirst={index === 0}
        />
      ))}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>
    </form>
  );
});

ExperienceForm.displayName = 'ExperienceForm';
