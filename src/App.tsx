
import React, { useEffect, lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setupLazyLoadImages, preloadCriticalResources } from '@/utils/performanceUtils';
import { addPreconnectLinks, registerServiceWorker } from '@/utils/responsiveUtils';

// Lazy-loaded components for better initial load performance
const Home = lazy(() => import("@/pages/Home"));
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const ATSChecker = lazy(() => import("@/pages/ATSChecker"));
const InterviewGuide = lazy(() => import("@/pages/InterviewGuide"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const Error = lazy(() => import("@/pages/Error"));
const Splash = lazy(() => import("@/pages/Splash"));
const CareerTips = lazy(() => import("@/pages/CareerTips"));

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
      gcTime: 5 * 60 * 1000,
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
  'https://cdn.jsdelivr.net'
];

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />
      <Navbar />
      <main 
        id="main-content" 
        className="flex-1 w-full max-w-full mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 safe-bottom gpu-accelerated"
      >
        <Suspense fallback={<Loading />}>
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
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  // Set up performance optimizations when the app loads
  useEffect(() => {
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
        setTimeout(() => {
          const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationTiming) {
            console.log(`Time to first byte: ${navigationTiming.responseStart}ms`);
            console.log(`DOM Content Loaded: ${navigationTiming.domContentLoadedEventEnd}ms`);
            console.log(`Load event: ${navigationTiming.loadEventEnd}ms`);
          }
        }, 0);
      });
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <AppContent />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
