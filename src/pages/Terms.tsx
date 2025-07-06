
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">Terms & Conditions</h1>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. Services</h2>
            <p className="text-gray-600">
              SXO Resume provides resume building and ATS optimization services. By using our services,
              you agree to these terms and conditions. Our services include resume creation, ATS
              compatibility checking, and interview preparation resources.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. User Accounts</h2>
            <p className="text-gray-600">
              Users are responsible for maintaining the confidentiality of their account credentials
              and for all activities that occur under their account. You must provide accurate and
              complete information when creating an account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. Free Service</h2>
            <p className="text-gray-600">
              Our resume builder is completely free to use. You can create, edit, and download your resume 
              without any charges or subscription fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
            <p className="text-gray-600">
              All content, features, and functionality of our platform are owned by SXO Resume and
              are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. Affiliate Program</h2>
            <p className="text-gray-600">
              Partners can participate in our affiliate program by embedding our widget on their
              websites. Affiliates earn commissions for successful referrals. Contact us for more
              information about our affiliate program.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
