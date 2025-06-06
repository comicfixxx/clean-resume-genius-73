
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const PricingPlans = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">Choose the plan that works best for you</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>Create a professional, ATS-optimized resume</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹399</span>
                <span className="text-gray-600 ml-2">($5)</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Professional resume templates
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Multiple download formats (PDF, DOCX, DOC)
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  ATS-optimized formatting
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Real-time preview
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ATS Checker</CardTitle>
              <CardDescription>Analyze your existing resume</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹59</span>
                <span className="text-gray-600 ml-2">($0.75)</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Detailed ATS compatibility score
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Keyword analysis
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Format optimization tips
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Instant feedback
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
