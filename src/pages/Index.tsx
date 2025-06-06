
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
import { exportToFormat } from "@/utils/pdfExport";

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
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
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

  const handleDownloadClick = () => {
    setShowDownloadDialog(true);
  };

  const handleDownloadSuccess = async (format: string) => {
    try {
      await exportToFormat(format);
      toast({
        title: "Success!",
        description: "Your resume is downloading. Thank you for your support!",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

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

  const previewData = useMemo(() => ({
    personal: resumeData.personalInfo,
    experience: resumeData.experience,
    education: resumeData.education,
    skills: resumeData.skills,
  }), [resumeData]);

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
          
          <Button 
            onClick={handleDownloadClick}
            className="bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>
        </div>

        <TutorialSection />

        <div className="grid lg:grid-cols-2 gap-8">
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
              experienceCount={resumeData.experience.length}
            />
            <EducationForm
              education={resumeData.education}
              updateEducation={updateEducation}
              addEducation={addEducation}
              removeEducation={removeEducation}
              updateEducationItem={updateEducationItem}
              educationCount={resumeData.education.length}
            />
            <SkillsForm skills={resumeData.skills} updateSkills={updateSkills} />
          </div>

          <div className="lg:sticky lg:top-8">
            <ResumePreviewer data={previewData} />
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
