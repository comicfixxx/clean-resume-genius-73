
import React, { useEffect, lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { setupLazyLoadImages, preloadCriticalResources } from '@/utils/performanceUtils';
import { addPreconnectLinks, registerServiceWorker } from '@/utils/responsiveUtils';

// Lazy-loaded components with error boundaries
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
const Pricing = lazy(() => import("@/pages/Pricing"));
const CareerTips = lazy(() => import("@/pages/CareerTips"));

// Enhanced loading component
const Loading = () => (
  <div className="flex justify-center items-center min-h-[60vh]" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Critical resources and domains
const criticalResources = ['/favicon.svg', '/manifest.json'];
const preconnectDomains = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://api.producthunt.com',
  'https://cdn.jsdelivr.net'
];

const App: React.FC = () => {
  useEffect(() => {
    // Initialize performance optimizations
    const initializeApp = async () => {
      try {
        await Promise.all([
          preloadCriticalResources(criticalResources),
          setupLazyLoadImages(),
          addPreconnectLinks(preconnectDomains),
          registerServiceWorker()
        ]);
      } catch (error) {
        console.error('Failed to initialize app optimizations:', error);
      }
    };

    initializeApp();
    
    // Performance monitoring
    const handleLoad = () => {
      setTimeout(() => {
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationTiming) {
          performanceMonitor.recordMetrics({
            loadTime: navigationTiming.loadEventEnd,
            renderTime: navigationTiming.domContentLoadedEventEnd - navigationTiming.responseStart
          });
        }
      }, 100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('load', handleLoad);
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <Toaster />
              <ErrorBoundary>
                <Navbar />
              </ErrorBoundary>
              
              <main 
                id="main-content" 
                className="flex-1 w-full max-w-full mx-auto px-2 xs:px-4 sm:px-6 lg:px-8"
                role="main"
              >
                <ErrorBoundary>
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
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="*" element={<Error />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
