
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "@/components/Layout/ResponsiveContainer";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
      </div>
      
      <ResponsiveContainer maxWidth="xl">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-accent/10 text-accent animate-fade-in">
            <span className="relative">Professional Resume Builder</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 leading-tight tracking-tight animate-fade-in">
            Create Your Professional Resume Today
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
            Build an ATS-optimized resume that helps you stand out. Our intelligent system ensures your resume gets noticed by recruiters.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in delay-200">
            <Link to="/builder">
              <Button size="lg" className="px-8 py-6 text-base rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto">
                Create Resume
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="px-8 py-6 text-base rounded-xl border-2 hover:bg-primary/5 w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center items-center opacity-70">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">ATS Optimized</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">HR Approved</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium">Premium Templates</span>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};
