import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Laptop, Shield, Clock } from "lucide-react";
import FAQSection from "@/components/FAQ/FAQSection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { PricingPlans } from "@/components/Pricing/PricingPlans";
import { FindBuilder } from "@/components/ResumeBuilder/FindBuilder";
import { TutorialSection } from "@/components/ResumeBuilder/TutorialSection";
import ResponsiveContainer from "@/components/Layout/ResponsiveContainer";
import PageSEO from "@/components/SEO/PageSEO";
import LinkedInOptimizationDialog from "@/components/LinkedInOptimization/LinkedInOptimizationDialog";
import { useResponsiveClasses, useDeviceDetect } from "@/utils/responsiveUtils";

const Splash = () => {
  const { isMobile } = useDeviceDetect();
  const heroTextClass = useResponsiveClasses(
    "text-3xl sm:text-4xl font-bold", // mobile
    "text-4xl sm:text-5xl font-bold", // tablet
    "text-5xl sm:text-6xl font-bold"  // desktop
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* SEO Enhancement */}
      <PageSEO 
        title="SXO Resume Builder - Create Professional ATS-Friendly Resumes Online"
        description="Build an ATS-optimized resume in minutes with our professional resume builder. Stand out to recruiters with keyword-optimized resumes and land your dream job faster."
        type="splash"
      />
      
      {/* Navigation Bar */}
      <nav className="w-full px-4 py-4 bg-white border-b z-50 shadow-sm">
        <ResponsiveContainer>
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-primary">
              Resume Builder
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <LinkedInOptimizationDialog />
              <Link to="/builder">
                <Button variant={isMobile ? "outline" : "default"} size={isMobile ? "sm" : "default"}>
                  {isMobile ? "Create" : "Create Resume"}
                </Button>
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        <ResponsiveContainer maxWidth="xl" className="space-y-8 sm:space-y-12">
          {/* Product Hunt Badge */}
          <div className="flex justify-center mb-6">
            <a 
              href="https://www.producthunt.com/posts/sxo-resume?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sxo&#0045;resume" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=594173&theme=light" 
                alt="SXO Resume - Professional resume builder | Product Hunt" 
                style={{ width: '250px', height: '54px' }} 
                width="250" 
                height="54" 
                loading="lazy"
              />
            </a>
          </div>

          {/* Hero Section */}
          <div className="space-y-4 sm:space-y-6 text-center">
            <h1 className={`${heroTextClass} text-primary tracking-tight`}>
              Create Your Professional Resume in Minutes
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Build an ATS-optimized resume that helps you stand out. Our intelligent system ensures your resume gets noticed by recruiters.
            </p>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              Make sure you pay the amount quickly; otherwise, the payment will fail, and you'll have to wait 7 days to get the amount credited back to your account.<br />
              Please ensure that you have made the payment through your UPI ID or number. Do not scan the QR code
            </p>
            <div className="pt-4">
              <SocialLinks />
            </div>
          </div>

          {/* Hidden SEO content for search engines */}
          <div className="sr-only" aria-hidden="true">
            <h2>Professional ATS Resume Builder for Job Seekers</h2>
            <p>
              SXO Resume Builder is the leading online platform for creating ATS-optimized resumes that help job seekers land interviews. Our professional templates are designed to pass through Applicant Tracking Systems while highlighting your skills and experience to recruiters.
            </p>
            <h3>Resume Builder Features</h3>
            <ul>
              <li>ATS-friendly resume templates that pass automated screening</li>
              <li>Keyword optimization tools for specific job descriptions</li>
              <li>Professional formatting with perfect ATS compatibility</li>
              <li>Expert content suggestions for each resume section</li>
              <li>ATS compatibility checker to test resume performance</li>
              <li>Professional resume templates for all career levels</li>
              <li>Resume builder for entry-level applicants and experienced professionals</li>
              <li>Industry-specific resume templates and examples</li>
              <li>One-page and two-page resume options for different careers</li>
              <li>Resume sections optimized for ATS scanning and human reviewers</li>
            </ul>
          </div>

          {/* Add Pricing Plans */}
          <PricingPlans />

          {/* Tutorial Section */}
          <TutorialSection />

          {/* Find Resume Builder Section */}
          <FindBuilder />

          {/* Why Use Our Online SXO Resume Builder Section */}
          <div className="py-8 sm:py-12 bg-white rounded-xl shadow-sm w-full mt-8 sm:mt-12">
            <ResponsiveContainer>
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Why use our online SXO Resume Builder?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-10">
                  <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Laptop className="h-5 sm:h-6 w-5 sm:w-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy to Use</h3>
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                      Intuitive interface that guides you through every step of creating your professional resume
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">ATS-Optimized</h3>
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                      Built to pass Applicant Tracking Systems with optimized formatting and keywords
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-5 sm:h-6 w-5 sm:w-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Time-Saving</h3>
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                      Create a professional resume in minutes with our pre-built templates and expert guidance
                    </p>
                  </div>
                </div>
              </div>
            </ResponsiveContainer>
          </div>

          {/* Review Section */}
          <div className="py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  What Our Users Say
                </h2>
                <div className="flex flex-col items-center">
                  <a 
                    href="https://www.producthunt.com/products/sxo-resume/reviews/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-[#EA532A] hover:bg-[#D84315] text-white">
                      Leave a Review on Product Hunt
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Program Section */}
          <div className="py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  Save with Referral Codes
                </h2>
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-4">Get 10% Off Your Purchase</h3>
                  <ul className="text-gray-600 text-left space-y-2 mb-4">
                    <li>• Use referral codes during checkout</li>
                    <li>• Save 10% on resume builder</li>
                    <li>• Save 10% on ATS checker</li>
                  </ul>
                  <p className="text-sm text-gray-500">
                    Enter your referral code at checkout to claim your discount
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection />

          <div className="pt-6 sm:pt-8 text-xs sm:text-sm text-gray-500">
            <p className="max-w-md mx-auto">Join thousands of job seekers who have successfully landed their dream jobs using our Resume Builder</p>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Add LinkedIn Optimization Section */}
      <div className="py-8 sm:py-12 bg-white rounded-xl shadow-sm w-full mt-6 sm:mt-8">
        <ResponsiveContainer>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Premium Add-on Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
              Take your professional profile to the next level with our expert services
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 sm:mt-6">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm max-w-md mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">LinkedIn Profile Optimization</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Our experts will review and optimize your LinkedIn profile to maximize visibility to recruiters.
                </p>
                <p className="text-lg font-bold text-primary mb-4">₹499</p>
                <LinkedInOptimizationDialog />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Splash;
