
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award } from 'lucide-react';
import PageSEO from "@/components/SEO/PageSEO";

const Splash = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <PageSEO 
        title="Professional Resume Builder - Create ATS-Optimized Resumes"
        description="Build professional, ATS-friendly resumes that get you hired. Our resume builder ensures 95% compatibility with applicant tracking systems."
        type="splash"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-primary fill-current" />
              <span className="text-sm font-medium text-primary">Professional Resume Builder</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume in
            <span className="text-primary"> Minutes</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build a professional, ATS-optimized resume that gets you noticed by recruiters and hiring managers. 
            Our platform ensures 95% compatibility with applicant tracking systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/builder">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Building Your Resume
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/ats-checker">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Check ATS Score
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50,000+ Users</h3>
              <p className="text-gray-600">Trusted by professionals worldwide</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">95% ATS Score</h3>
              <p className="text-gray-600">Guaranteed compatibility with tracking systems</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Design</h3>
              <p className="text-gray-600">Beautiful, recruiter-approved templates</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-4">Ready to land your dream job?</p>
            <Link to="/builder">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                Get Started Now →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
