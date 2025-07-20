import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Auto-dismiss after 15 seconds
      const dismissTimer = setTimeout(() => {
        setIsVisible(false);
      }, 15000);

      return () => clearTimeout(dismissTimer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919656778508", "_blank");
  };

  const handleProductHuntClick = () => {
    window.open("https://www.producthunt.com/@muhammad_adnan45", "_blank");
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 relative animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            Build Your Own AI SaaS Product
          </h2>
          
          <p className="text-muted-foreground text-base leading-relaxed">
            Have an AI startup idea? I'll turn it into a fully functional product — fast. 
            From concept to launch, done for you.
          </p>

          <div className="bg-muted/30 rounded-lg p-3 my-6">
            <p className="text-sm font-medium text-foreground">
              Contact: <span className="font-mono">+91 965677 8508</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Connect with Me
            </Button>
            <Button
              onClick={handleProductHuntClick}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              See My Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;