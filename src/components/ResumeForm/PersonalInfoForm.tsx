
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
  initialData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    website?: string;
    summary?: string;
  };
}

export const PersonalInfoForm = ({ isActive, onComplete, initialData = {} }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    website: initialData.website || "",
    summary: initialData.summary || ""
  });
  
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('resume_personal_info');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData
        }));
      }
    } catch (error) {
      console.error('Error loading saved personal info:', error);
    }
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (Object.values(formData).some(val => val)) {
      localStorage.setItem('resume_personal_info', JSON.stringify(formData));
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
    } = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (formData.phone && !/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store user information for payment flow
      if (formData.email) localStorage.setItem('user_email', formData.email);
      if (formData.fullName) localStorage.setItem('user_name', formData.fullName);
      if (formData.phone) localStorage.setItem('user_phone', formData.phone);
      
      onComplete(formData);
      
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
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
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
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className={`pl-10 border-secondary focus:border-accent ${errors.phone ? 'border-red-300' : ''}`}
              placeholder="+1 (555) 000-0000"
              aria-invalid={errors.phone ? "true" : "false"}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="website" className="text-sm font-medium text-primary">Website (Optional)</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="pl-10 border-secondary focus:border-accent"
              placeholder="www.johndoe.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="summary" className="text-sm font-medium text-primary">Professional Summary</label>
          <Textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
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
