
import { Heart, Coffee, Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PricingPlans = () => {
  const handleDonateClick = () => {
    // This will trigger the existing donation widget
    if (window.openDonationDialog) {
      window.openDonationDialog();
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Support Our Free Resume Builder</h2>
          <p className="mt-4 text-lg text-gray-600">Help us keep this tool free for everyone</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle>Small Donation</CardTitle>
              <CardDescription>Every bit helps!</CardDescription>
              <div className="mt-4">
                <span className="text-2xl font-bold">₹50+</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Support our mission to provide free resume building tools for job seekers
              </p>
              <Button onClick={handleDonateClick} className="w-full">
                Donate Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center border-primary">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Buy Us Coffee</CardTitle>
              <CardDescription>Fuel our development</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹200+</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Help us maintain and improve the platform with new features
              </p>
              <Button onClick={handleDonateClick} className="w-full">
                Donate Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Generous Support</CardTitle>
              <CardDescription>Make a big impact</CardDescription>
              <div className="mt-4">
                <span className="text-2xl font-bold">₹500+</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Enable us to add more templates and advanced features
              </p>
              <Button onClick={handleDonateClick} className="w-full">
                Donate Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            UPI ID: <strong>adnanmuhammad4393@okicici</strong>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            All donations help us keep this service free for everyone
          </p>
        </div>
      </div>
    </div>
  );
};
