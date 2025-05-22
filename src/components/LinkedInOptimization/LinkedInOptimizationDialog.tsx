
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  linkedInUrl: z.string().url("Please enter a valid LinkedIn URL").includes("linkedin.com", {
    message: "URL must be from LinkedIn"
  }),
  additionalInfo: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const LinkedInOptimizationDialog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedInUrl: "",
      additionalInfo: ""
    }
  });

  // Validate form when values change
  form.watch(() => {
    const isValid = form.formState.isValid;
    if (isValid !== isFormValid) {
      setIsFormValid(isValid);
    }
  });

  const handleFormSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mqapgnlg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your LinkedIn profile optimization request has been submitted. Our team will contact you soon.",
        });
        form.reset();
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <Linkedin className="h-4 w-4" />
          LinkedIn Optimization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Linkedin className="h-5 w-5" />
            LinkedIn Profile Optimization Service
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Professional LinkedIn Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Our expert team will review and optimize your LinkedIn profile to increase your visibility to recruiters and improve your professional brand.
            </p>
          </div>
          
          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkedInUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.linkedin.com/in/yourprofile" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm">
                        Enter your full LinkedIn profile URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific areas you'd like us to focus on..."
                          className="h-24"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mobile-friendly-button" 
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="bg-green-50 text-green-700 p-3 rounded mt-4 text-sm flex items-center">
              <Bot className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Your LinkedIn profile optimization request has been submitted. We'll contact you soon!</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInOptimizationDialog;
