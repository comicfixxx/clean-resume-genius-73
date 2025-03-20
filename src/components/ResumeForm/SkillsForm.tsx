
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Code, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillsFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
}

export const SkillsForm = ({ isActive, onComplete }: SkillsFormProps) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length >= 15) {
      toast({
        variant: "destructive",
        title: "Skills limit reached",
        description: "You can only add up to 15 skills."
      });
      return;
    }
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills(prev => [...prev, currentSkill.trim()]);
      setCurrentSkill("");
    } else if (skills.includes(currentSkill.trim())) {
      toast({
        variant: "destructive",
        title: "Duplicate skill",
        description: "This skill is already in your list."
      });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(skills);
  };

  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" />
        Skills
      </h2>

      <div className="space-y-4">
        <div className="form-group">
          <label className="text-sm font-medium text-gray-700">Add Skills</label>
          <div className="flex gap-2">
            <Input
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Enter a skill"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              variant="outline"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 flex items-center gap-2"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-500 focus:outline-none"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Skills
      </Button>
    </form>
  );
};
