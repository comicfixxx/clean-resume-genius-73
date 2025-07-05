import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface EducationFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
  onTypeChange?: (isSelfLearner: boolean) => void;
}

export const EducationForm = ({ isActive, onComplete, onTypeChange }: EducationFormProps) => {
  const [education, setEducation] = useState([{
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  }]);
  const [isSelfLearner, setIsSelfLearner] = useState(false);

  const handleAddEducation = () => {
    if (isSelfLearner) return;
    setEducation(prev => [...prev, {
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    }]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ education, isSelfLearner });
  };

  const handleSelfLearnerChange = (checked: boolean) => {
    setIsSelfLearner(checked);
    if (checked) {
      setEducation([{
        school: "Self-Taught",
        degree: "Independent Learning",
        field: "",
        startDate: "",
        endDate: "",
      }]);
    } else {
      setEducation([{
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      }]);
    }
    if (onTypeChange) {
      onTypeChange(checked);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title">
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
                onClick={() => handleRemoveEducation(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">School/Institution</label>
              <Input
                value={edu.school}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].school = e.target.value;
                  setEducation(newEducation);
                }}
                placeholder="Institution name"
                required
                disabled={isSelfLearner}
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Degree/Certification</label>
              <Input
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].degree = e.target.value;
                  setEducation(newEducation);
                }}
                placeholder="Degree or certification"
                required
                disabled={isSelfLearner}
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Field of Study</label>
              <Input
                value={edu.field}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].field = e.target.value;
                  setEducation(newEducation);
                }}
                placeholder="Field of study"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].startDate = e.target.value;
                    setEducation(newEducation);
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
                    const newEducation = [...education];
                    newEducation[index].endDate = e.target.value;
                    setEducation(newEducation);
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
          onClick={handleAddEducation}
          className="flex items-center gap-2 mb-4"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      )}

      <Button type="submit" className="w-full">
        Save Education
      </Button>
    </form>
  );
};