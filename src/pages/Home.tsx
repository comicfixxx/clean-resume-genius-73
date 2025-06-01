
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PricingPlans } from "@/components/Pricing/PricingPlans";
import { Features } from "@/components/Features/Features";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { AffiliateSection } from "@/components/AffiliateProgram/AffiliateSection";
import { WhiteLabelRequestForm } from "@/components/WhiteLabel/WhiteLabelRequestForm";
import { DonationWidget } from "@/components/DonationWidget/DonationWidget";
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";

const Home = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen">
      <SeoKeywords page="home" />
      <SeoStructuredData type="home" />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Donation Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Free for Everyone</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our resume builder is completely free to use, supported by voluntary donations from our community.
          </p>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              When you download your resume, you'll have the option to make a small donation to help us keep this service free for everyone.
            </p>
            <p className="text-sm text-gray-500">
              No payment required • Donation optional • Always free
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate Program Section */}
      <AffiliateSection />

      {/* White Label Licensing Form */}
      <WhiteLabelRequestForm />

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Professional Resume?</h2>
          
          {/* Product Hunt Badge */}
          <div className="flex justify-center mb-8">
            <a 
              href="https://www.producthunt.com/posts/sxo-resume?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sxo&#0045;resume" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=594173&theme=light&t=1746111330161" 
                alt="SXO Resume - Professional resume builder | Product Hunt" 
                style={{ width: '250px', height: '54px' }} 
                width="250" 
                height="54" 
              />
            </a>
          </div>

          <div className="space-y-4">
            <div className="space-x-4">
              <Link to="/builder">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/ats-checker">
                <Button variant="outline" size="lg">Check ATS Score</Button>
              </Link>
            </div>
            
            <div className="mt-6 space-y-2">
              <div>
                <Link to="/career-tips" className="text-primary hover:underline">
                  View Career Tips & Resume Advice →
                </Link>
              </div>
              <div>
                <Link to="/about" className="text-primary hover:underline">
                  Meet Our Founder and Learn About Our Mission →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Widget */}
      <DonationWidget 
        config={{
          upiId: 'adnanmuhammad4393@okicici',
          name: 'Muhammed Adnan',
          amount: 99,
          position: 'bottom-right',
          primaryColor: '#8B5CF6',
          buttonText: 'Donate ₹99'
        }}
      />
    </div>
  );
};

export default Home;
