
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
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
        </div>

        <PricingPlans />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Not sure which plan to choose?</h2>
          <Link to="/builder">
            <Button size="lg">Try Resume Builder Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
