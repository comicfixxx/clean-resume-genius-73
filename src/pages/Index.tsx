import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, Lightbulb } from "lucide-react";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { SimpleDownloadDialog } from "@/components/ResumeBuilder/SimpleDownloadDialog";
import { useToast } from "@/hooks/use-toast";
import { TutorialSection } from "@/components/ResumeBuilder/TutorialSection";
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";
import { triggerDownload } from "@/utils/simpleDownloadUtils";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
    objective: string;
  };
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: string[];
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    objective: "",
  },
  experience: [],
  education: [],
  skills: [],
};

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const { toast } = useToast();

  const updatePersonalInfo = useCallback(
    (info: ResumeData["personalInfo"]) => {
      setResumeData((prev) => ({ ...prev, personalInfo: info }));
    },
    []
  );

  const updateExperience = useCallback(
    (experience: ResumeData["experience"]) => {
      setResumeData((prev) => ({ ...prev, experience }));
    },
    []
  );

  const updateEducation = useCallback(
    (education: ResumeData["education"]) => {
      setResumeData((prev) => ({ ...prev, education }));
    },
    []
  );

  const updateSkills = useCallback(
    (skills: ResumeData["skills"]) => {
      setResumeData((prev) => ({ ...prev, skills }));
    },
    []
  );

  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const handleDownloadClick = () => {
    setShowDownloadDialog(true);
  };

  const handleDownloadSuccess = (format: string) => {
    triggerDownload(format);
    toast({
      title: "Thank you!",
      description: "Your download has started. Thanks for supporting our platform!",
    });
  };

  const experienceCount = resumeData.experience.length;
  const educationCount = resumeData.education.length;

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateExperienceItem = (
    index: number,
    updatedItem: ResumeData["experience"][number]
  ) => {
    setResumeData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = updatedItem;
      return { ...prev, experience: newExperience };
    });
  };

  const updateEducationItem = (
    index: number,
    updatedItem: ResumeData["education"][number]
  ) => {
    setResumeData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = updatedItem;
      return { ...prev, education: newEducation };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoKeywords page="builder" />
      <SeoStructuredData type="builder" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Builder
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Create your perfect resume in minutes - completely free!
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={handleDownloadClick}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>

        <TutorialSection />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-8">
            <PersonalInfoForm
              personalInfo={resumeData.personalInfo}
              updatePersonalInfo={updatePersonalInfo}
            />
            <ExperienceForm
              experience={resumeData.experience}
              updateExperience={updateExperience}
              addExperience={addExperience}
              removeExperience={removeExperience}
              updateExperienceItem={updateExperienceItem}
              experienceCount={experienceCount}
            />
            <EducationForm
              education={resumeData.education}
              updateEducation={updateEducation}
              addEducation={addEducation}
              removeEducation={removeEducation}
              updateEducationItem={updateEducationItem}
              educationCount={educationCount}
            />
            <SkillsForm skills={resumeData.skills} updateSkills={updateSkills} />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <ResumePreviewer data={resumeData} />
          </div>
        </div>
      </div>

      <SimpleDownloadDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        onSuccess={handleDownloadSuccess}
      />
    </div>
  );
};

export default Index;
