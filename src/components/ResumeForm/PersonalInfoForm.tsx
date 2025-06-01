
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoFormProps {
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
  updatePersonalInfo: (info: PersonalInfoFormProps["personalInfo"]) => void;
}

export const PersonalInfoForm = ({ personalInfo, updatePersonalInfo }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
    } = {};
    
    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!personalInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (personalInfo.phone && !/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(personalInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store user information for payment flow
      if (personalInfo.email) localStorage.setItem('user_email', personalInfo.email);
      if (personalInfo.fullName) localStorage.setItem('user_name', personalInfo.fullName);
      if (personalInfo.phone) localStorage.setItem('user_phone', personalInfo.phone);
      
      toast({
        title: "Personal Information Saved",
        description: "Your personal information has been saved successfully.",
      });
    } else {
      toast({
        title: "Please fix the errors",
        description: "There are issues with your form that need to be fixed.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Personal Information
      </h2>
      
      <div className="space-y-4">
        <div className="form-group">
          <label htmlFor="fullName" className="text-sm font-medium text-primary flex items-center justify-between">
            <span>Full Name</span>
            {errors.fullName && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.fullName}
              </span>
            )}
          </label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ ...personalInfo, fullName: e.target.value })}
            placeholder="John Doe"
            className={`border-secondary focus:border-accent ${errors.fullName ? 'border-red-300' : ''}`}
            required
            aria-invalid={errors.fullName ? "true" : "false"}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-sm font-medium text-primary flex items-center justify-between">
            <span>Email</span>
            {errors.email && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </span>
            )}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ ...personalInfo, email: e.target.value })}
              className={`pl-10 border-secondary focus:border-accent ${errors.email ? 'border-red-300' : ''}`}
              placeholder="john@example.com"
              required
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="text-sm font-medium text-primary flex items-center justify-between">
            <span>Phone</span>
            {errors.phone && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </span>
            )}
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ ...personalInfo, phone: e.target.value })}
              className={`pl-10 border-secondary focus:border-accent ${errors.phone ? 'border-red-300' : ''}`}
              placeholder="+1 (555) 000-0000"
              aria-invalid={errors.phone ? "true" : "false"}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="text-sm font-medium text-primary">Address</label>
          <Input
            id="address"
            value={personalInfo.address}
            onChange={(e) => updatePersonalInfo({ ...personalInfo, address: e.target.value })}
            className="border-secondary focus:border-accent"
            placeholder="Your address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin" className="text-sm font-medium text-primary">LinkedIn</label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ ...personalInfo, linkedin: e.target.value })}
            className="border-secondary focus:border-accent"
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github" className="text-sm font-medium text-primary">GitHub</label>
          <Input
            id="github"
            value={personalInfo.github}
            onChange={(e) => updatePersonalInfo({ ...personalInfo, github: e.target.value })}
            className="border-secondary focus:border-accent"
            placeholder="github.com/yourusername"
          />
        </div>

        <div className="form-group">
          <label htmlFor="portfolio" className="text-sm font-medium text-primary">Portfolio Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="portfolio"
              value={personalInfo.portfolio}
              onChange={(e) => updatePersonalInfo({ ...personalInfo, portfolio: e.target.value })}
              className="pl-10 border-secondary focus:border-accent"
              placeholder="www.yourportfolio.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="objective" className="text-sm font-medium text-primary">Professional Objective</label>
          <Textarea
            id="objective"
            value={personalInfo.objective}
            onChange={(e) => updatePersonalInfo({ ...personalInfo, objective: e.target.value })}
            placeholder="Write a brief summary of your professional background and career objectives..."
            className="border-secondary focus:border-accent min-h-[120px]"
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Save Personal Information
        </Button>
      </div>
    </form>
  );
};
