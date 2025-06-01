
import { PricingPlans } from "@/components/Pricing/PricingPlans";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";

const Pricing = () => {
  return (
    <div className="min-h-screen py-16">
      <SeoKeywords page="pricing" />
      <SeoStructuredData type="pricing" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-xl text-gray-600">Help us keep resume building free for everyone</p>
          <p className="text-lg text-gray-500 mt-4">
            Our platform is completely free to use. Your donations help us maintain and improve our services.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Donation-Based Platform</h2>
          <p className="text-gray-600 mb-6">
            We believe everyone should have access to professional resume building tools. 
            That's why our platform is free for everyone, supported by voluntary donations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What You Get (Free)</h3>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• Professional resume templates</li>
                <li>• ATS optimization</li>
                <li>• Real-time preview</li>
                <li>• Multiple export formats</li>
                <li>• Career guidance</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">How Donations Help</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• Server maintenance</li>
                <li>• Feature development</li>
                <li>• Platform improvements</li>
                <li>• Customer support</li>
                <li>• Keeping it free for all</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to create your resume?</h2>
          <p className="text-gray-600 mb-6">Start building your professional resume now - completely free!</p>
          <Link to="/builder">
            <Button size="lg">Start Building Your Resume</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
