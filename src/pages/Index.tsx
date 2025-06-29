
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, User, Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PageSEO from "@/components/SEO/PageSEO";
import LinkedInOptimizationDialog from "@/components/LinkedInOptimization/LinkedInOptimizationDialog";
import ResponsiveContainer from "@/components/Layout/ResponsiveContainer";
import { useDeviceDetect } from "@/utils/responsiveUtils";
import { supabase } from "@/integrations/supabase/client";
import { checkDonationStatus } from "@/utils/donationUtils";

const Index = () => {
  const { toast } = useToast();
  const { isMobile, isTablet } = useDeviceDetect();
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      website: "",
      summary: ""
    },
    experience: [],
    education: [],
    skills: []
  });

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
  ];

  const handleSectionComplete = (section: string, data: any) => {
    console.log(`Section ${section} completed with data:`, data);
    setResumeData(prev => ({
      ...prev,
      [section]: section === "education" ? data.education : data
    }));
    toast({
      title: "Section saved",
      description: "Your changes have been saved successfully."
    });
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('resume_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
        console.log('Loaded saved resume data:', parsedData);
      }
    } catch (error) {
      console.error('Error loading saved resume data:', error);
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    if (Object.keys(resumeData.personal).length > 0 || resumeData.experience.length > 0 || resumeData.education.length > 0 || resumeData.skills.length > 0) {
      localStorage.setItem('resume_data', JSON.stringify(resumeData));
      console.log('Resume data saved to localStorage:', resumeData);
    }
  }, [resumeData]);

  // Check donation status on load
  useEffect(() => {
    const donated = checkDonationStatus();
    console.log('Donation status on load:', donated);
  }, []);

  const ResumePreview = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-primary flex items-center gap-2">
          Live Preview
        </h2>
      </div>
      <ResumePreviewer data={resumeData} isPaid={true} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <PageSEO 
        title="Resume Builder - Create Your 95% ATS-Optimized Resume"
        description="Use our interactive resume builder to create a professional, ATS-friendly resume guaranteed to achieve 95% compatibility with applicant tracking systems."
        type="builder"
      />
      
      <ResponsiveContainer maxWidth="7xl">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Link to="/">
              <Button variant="ghost" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {isMobile ? "Back" : "Back to Home"}
              </Button>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">Create Your Professional Resume</h1>
          <p className="text-sm sm:text-base text-secondary mb-4">Fill in your details below and get a 95% ATS-optimized resume</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/ats-checker">
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  ATS Score Checker
                </Button>
              </Link>
              <Link to="/interview-guide">
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"} 
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  Interview Tips
                </Button>
              </Link>
              <LinkedInOptimizationDialog />
            </div>
            <SocialLinks />
          </div>
        </header>

        <div className="sr-only" aria-hidden="true">
          <h2>Professional Resume Builder with ATS Optimization</h2>
          <p>
            Our resume builder helps you create professional resumes that are optimized for Applicant Tracking Systems (ATS).
            Focus on your job search while we handle the formatting and optimization to ensure your resume gets noticed by recruiters.
          </p>
          <h3>Key Resume Builder Features</h3>
          <ul>
            <li>ATS-friendly resume templates</li>
            <li>Keyword optimization for specific job descriptions</li>
            <li>Professional formatting that passes ATS scans</li>
            <li>Expert tips for each resume section</li>
            <li>Real-time resume preview as you type</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "outline"}
                      onClick={() => {
                        console.log(`Switching to section: ${section.id}`);
                        setActiveSection(section.id);
                      }}
                      className="flex items-center gap-1 sm:gap-2"
                      size={isMobile ? "sm" : "default"}
                    >
                      <Icon className="w-4 h-4" />
                      <span className={isMobile ? "text-xs" : ""}>{section.label}</span>
                    </Button>
                  );
                })}
              </div>

              <div className="space-y-6">
                {activeSection === "personal" && (
                  <PersonalInfoForm
                    isActive={true}
                    initialData={resumeData.personal}
                    onComplete={(data) => {
                      console.log('Personal info completed:', data);
                      handleSectionComplete("personal", data);
                    }}
                  />
                )}
                {activeSection === "experience" && (
                  <ExperienceForm
                    isActive={true}
                    onComplete={(data) => {
                      console.log('Experience completed:', data);
                      handleSectionComplete("experience", data);
                    }}
                  />
                )}
                {activeSection === "education" && (
                  <EducationForm
                    isActive={true}
                    onComplete={(data) => {
                      console.log('Education completed:', data);
                      handleSectionComplete("education", data);
                    }}
                  />
                )}
                {activeSection === "skills" && (
                  <SkillsForm
                    isActive={true}
                    onComplete={(data) => {
                      console.log('Skills completed:', data);
                      handleSectionComplete("skills", data);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-8 h-fit">
            <ResumePreview />
          </div>

          <div className="fixed bottom-4 right-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" className="rounded-full shadow-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
                <div className="overflow-auto h-full pb-safe">
                  <ResumePreview />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Add a donation widget container for the script to use */}
        <div id="donating-widget-container" className="hidden"></div>
      </ResponsiveContainer>
    </div>
  );
};

export default Index;
