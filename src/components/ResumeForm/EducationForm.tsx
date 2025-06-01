
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationFormProps {
  education: EducationItem[];
  updateEducation: (education: EducationItem[]) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateEducationItem: (index: number, updatedItem: EducationItem) => void;
  educationCount: number;
}

export const EducationForm = ({ education, updateEducation, addEducation, removeEducation, updateEducationItem, educationCount }: EducationFormProps) => {
  const [isSelfLearner, setIsSelfLearner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handled by parent
  };

  const handleSelfLearnerChange = (checked: boolean) => {
    setIsSelfLearner(checked);
    if (checked) {
      // Replace with self-learner entry
      updateEducation([{
        institution: "Self-Taught",
        degree: "Independent Learning",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      }]);
    } else {
      // Reset to empty education
      updateEducation([{
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      }]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title flex items-center gap-2 text-xl font-semibold mb-4">
        <GraduationCap className="w-5 h-5" />
        Education
      </h2>

      <div className="mb-4 flex items-center space-x-2">
        <Checkbox
          id="self-learner"
          checked={isSelfLearner}
          onCheckedChange={handleSelfLearnerChange}
        />
        <label
          htmlFor="self-learner"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I am a self-learner
        </label>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Education {index + 1}</h3>
            {index > 0 && !isSelfLearner && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Institution</label>
              <Input
                value={edu.institution}
                onChange={(e) => {
                  updateEducationItem(index, { ...edu, institution: e.target.value });
                }}
                placeholder="Institution name"
                required
                disabled={isSelfLearner}
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Degree</label>
              <Input
                value={edu.degree}
                onChange={(e) => {
                  updateEducationItem(index, { ...edu, degree: e.target.value });
                }}
                placeholder="Degree or certification"
                required
                disabled={isSelfLearner}
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Input
                value={edu.location}
                onChange={(e) => {
                  updateEducationItem(index, { ...edu, location: e.target.value });
                }}
                placeholder="City, State"
                required
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Input
                value={edu.description}
                onChange={(e) => {
                  updateEducationItem(index, { ...edu, description: e.target.value });
                }}
                placeholder="Additional details"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    updateEducationItem(index, { ...edu, startDate: e.target.value });
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => {
                    updateEducationItem(index, { ...edu, endDate: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {!isSelfLearner && (
        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="flex items-center gap-2 mb-4"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      )}
    </form>
  );
};
