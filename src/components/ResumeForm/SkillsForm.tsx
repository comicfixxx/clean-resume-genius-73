
import { useState, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Code, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillsFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
}

export const SkillsForm = memo(({ isActive, onComplete }: SkillsFormProps) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSkill = currentSkill.trim();
    
    if (skills.length >= 15) {
      toast({
        variant: "destructive",
        title: "Skills limit reached",
        description: "You can only add up to 15 skills."
      });
      return;
    }
    
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills(prev => [...prev, trimmedSkill]);
      setCurrentSkill("");
    } else if (skills.includes(trimmedSkill)) {
      toast({
        variant: "destructive",
        title: "Duplicate skill",
        description: "This skill is already in your list."
      });
    }
  }, [currentSkill, skills, toast]);

  const handleRemoveSkill = useCallback((skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onComplete(skills);
    
    // Show success toast
    toast({
      title: "Skills saved",
      description: `${skills.length} skills saved successfully.`,
      variant: "success"
    });
  }, [skills, onComplete, toast]);

  // Skip rendering if not active for performance
  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 content-visibility-auto">
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
              className="whitespace-nowrap"
            >
              Add Skill
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Press Enter to add a skill. Maximum 15 skills.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 min-h-16 p-2 border border-gray-200 rounded-md bg-gray-50">
          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground italic w-full text-center py-4">
              No skills added yet. Add your professional skills above.
            </p>
          )}
          
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-700 flex items-center gap-1 shadow-sm transition-all hover:bg-gray-50"
            >
              <span className="text-sm">{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-gray-400 hover:text-red-500 focus:outline-none rounded-full p-1"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full transition-all"
        disabled={skills.length === 0}
      >
        Save Skills
      </Button>
    </form>
  );
});

SkillsForm.displayName = 'SkillsForm';
