
import * as React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setupLazyLoadImages, preloadCriticalResources } from '@/utils/performanceUtils';
import { addPreconnectLinks, registerServiceWorker } from '@/utils/responsiveUtils';
import PromoPopup from "@/components/PromoPopup";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy-loaded components for better initial load performance
const Home = React.lazy(() => import("@/pages/Home"));
import Index from "@/pages/Index";  // Direct import to debug React issue
const About = React.lazy(() => import("@/pages/About"));
const ATSChecker = React.lazy(() => import("@/pages/ATSChecker"));
const InterviewGuide = React.lazy(() => import("@/pages/InterviewGuide"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Cookies = React.lazy(() => import("@/pages/Cookies"));
const Error = React.lazy(() => import("@/pages/Error"));
const Splash = React.lazy(() => import("@/pages/Splash"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));
const CareerTips = React.lazy(() => import("@/pages/CareerTips"));

// Loading component for Suspense
const Loading = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Initialize QueryClient with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      gcTime: 5 * 60 * 1000, // Using gcTime instead of deprecated cacheTime
    },
  },
});

// Preload critical resources
const criticalResources = [
  '/favicon.svg',
  '/manifest.json',
];

// Important domains to preconnect to
const preconnectDomains = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://api.producthunt.com',
  'https://cdn.jsdelivr.net' // Added for QR code library
];

const App: React.FC = () => {
  const location = useLocation();
  
  // Set up performance optimizations when the app loads
  React.useEffect(() => {
    // Preload critical resources
    preloadCriticalResources(criticalResources);
    
    // Initialize lazy loading for images
    setupLazyLoadImages();
    
    // Add preconnect links for performance
    addPreconnectLinks(preconnectDomains);
    
    // Register service worker for PWA capabilities
    registerServiceWorker();
    
    // Add event listener for web vitals measurement
    if ('performance' in window && 'measure' in window.performance) {
      window.addEventListener('load', () => {
        // Use setTimeout to ensure this runs after initial rendering
        setTimeout(() => {
          const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationTiming) {
            // Performance metrics for monitoring (only in development)
            if (process.env.NODE_ENV === 'development') {
              console.log(`Time to first byte: ${navigationTiming.responseStart}ms`);
              console.log(`DOM Content Loaded: ${navigationTiming.domContentLoadedEventEnd}ms`);
              console.log(`Load event: ${navigationTiming.loadEventEnd}ms`);
            }
          }
        }, 0);
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <Toaster />
              <PromoPopup />
              <Navbar />
              <main 
                id="main-content" 
                className="flex-1 w-full max-w-full mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 safe-bottom gpu-accelerated"
              >
                <React.Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/builder" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/ats-checker" element={<ATSChecker />} />
                    <Route path="/interview-guide" element={<InterviewGuide />} />
                    <Route path="/career-tips" element={<CareerTips />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/splash" element={<Splash />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="*" element={<Error />} />
                  </Routes>
                </React.Suspense>
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
