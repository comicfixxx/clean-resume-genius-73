import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

export const FindBuilder = () => {
  const { toast } = useToast();
  const [builders, setBuilders] = useState([
    {
      name: "Muhammed Adnan",
      specialty: "Technical Resumes",
      experience: "1+ years",
      rating: 4.8,
      contact: "adnanmuhammad4393@gmail.com"
    },
    {
      name: "Muhammed Hamdan",
      specialty: "Creative Resumes",
      experience: "4+ Months",
      rating: 4.9,
      contact: "ramlapuliyottramla@gmail.com"
    }
  ]);

  const handleContactBuilder = (builderEmail: string) => {
    toast({
      title: "Contact Request Sent",
      description: `We'll connect you with the builder soon!`,
    });
  };

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Find Your Perfect Resume Builder</h2>
          <p className="text-gray-600">Connect with professional resume builders tailored to your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {builders.map((builder, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{builder.name}</CardTitle>
                <CardDescription>{builder.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Experience: {builder.experience}</p>
                  <p className="text-sm">Rating: {builder.rating}/5.0</p>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => handleContactBuilder(builder.contact)}
                  >
                    Contact Builder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle>Become a Resume Builder</CardTitle>
              <CardDescription>Join our network of professional resume builders</CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                action="https://formspree.io/f/mkgnyqdo" 
                method="POST"
                className="space-y-4"
                onSubmit={() => {
                  toast({
                    title: "Application Submitted",
                    description: "Our team will contact you soon!",
                  });
                }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input name="name" className="pl-10" placeholder="Your full name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input name="email" type="email" className="pl-10" placeholder="Your email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input name="phone" type="tel" className="pl-10" placeholder="Your phone number" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience & Expertise</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea 
                      name="message" 
                      className="pl-10 min-h-[100px]" 
                      placeholder="Tell us about your experience and expertise in resume building"
                      required 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
