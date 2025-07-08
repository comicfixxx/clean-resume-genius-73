
import { useEffect, useState, useCallback } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

// Custom hook to detect device type
export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsDesktop(width >= 1024);
      setIsPortrait(height > width);
      setIsLandscape(width > height);
      
      // Check for touch capability
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return { 
    isMobile, 
    isTablet, 
    isDesktop, 
    isPortrait,
    isLandscape,
    isTouchDevice 
  };
};

// Hook to apply different classes based on screen size
export const useResponsiveClasses = (
  mobileClasses: string,
  tabletClasses: string,
  desktopClasses: string
) => {
  const { isMobile, isTablet } = useDeviceDetect();
  
  if (isMobile) return mobileClasses;
  if (isTablet) return tabletClasses;
  return desktopClasses;
};

// Function to optimize images for different screen sizes
export const getResponsiveImageSrc = (
  baseImagePath: string,
  deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
) => {
  // Remove file extension
  const pathWithoutExtension = baseImagePath.substring(0, baseImagePath.lastIndexOf('.'));
  const extension = baseImagePath.substring(baseImagePath.lastIndexOf('.'));
  
  switch (deviceType) {
    case 'mobile':
      return `${pathWithoutExtension}-mobile${extension}`;
    case 'tablet':
      return `${pathWithoutExtension}-tablet${extension}`;
    default:
      return baseImagePath;
  }
};

// Custom hook for responsive font sizes
export const useResponsiveFontSize = (
  baseFontSize: number,
  scaleFactor: number = 0.2
): number => {
  const { breakpoint } = useBreakpoint();
  
  switch (breakpoint) {
    case 'xs':
      return baseFontSize * (1 - scaleFactor);
    case 'sm':
      return baseFontSize * (1 - scaleFactor * 0.5);
    case 'md':
      return baseFontSize;
    case 'lg':
      return baseFontSize * (1 + scaleFactor * 0.25);
    case 'xl':
    case '2xl':
      return baseFontSize * (1 + scaleFactor * 0.5);
    default:
      return baseFontSize;
  }
};

// Function to add preconnect links for performance
export const addPreconnectLinks = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
    
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = domain;
    document.head.appendChild(dnsLink);
  });
};

// Hook for handling container queries
export const useContainerQuery = (ref: React.RefObject<HTMLElement>, breakpoints: Record<string, number>) => {
  const [matches, setMatches] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      
      const width = entry.contentRect.width;
      const newMatches: Record<string, boolean> = {};
      
      Object.entries(breakpoints).forEach(([name, breakpoint]) => {
        newMatches[name] = width >= breakpoint;
      });
      
      setMatches(newMatches);
    });
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, breakpoints]);
  
  return matches;
};

// Optimize touch target size for mobile
export const optimizeTouchTarget = (element: HTMLElement | null) => {
  if (!element) return;
  
  const minSize = 44; // Minimum recommended touch target size in px
  const rect = element.getBoundingClientRect();
  
  if (rect.width < minSize || rect.height < minSize) {
    element.style.minWidth = `${minSize}px`;
    element.style.minHeight = `${minSize}px`;
  }
};

// Function to register a service worker for PWA capabilities
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      if (process.env.NODE_ENV === 'development') {
        console.log('Service worker registered:', registration);
      }
      return registration;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Service worker registration failed:', error);
      }
    }
  }
};

// Custom hook for lazy loading components
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useCallback((node: Element | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(node);
    
    return () => observer.disconnect();
  }, [threshold]);

  return [nodeRef, isVisible] as const;
};

// Hook to detect scroll position
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollPosition;
};
