
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'
import { toast } from "@/hooks/use-toast"
import { applyMobileOptimizations, setupOrientationChangeHandler } from './utils/performanceUtils.ts'

// Initialize protection in all environments
disableRightClick();

// Apply mobile-specific optimizations
applyMobileOptimizations();

// Handle mobile orientation changes
setupOrientationChangeHandler();

// More reliable screenshot detection with improved messaging
document.addEventListener('keyup', (e) => {
  // Enhanced screenshot detection across platforms
  const isScreenshotAttempt = 
    (e.key === 'PrintScreen') ||
    (e.metaKey && e.shiftKey && e.key === '3') || // Mac screenshot full
    (e.metaKey && e.shiftKey && e.key === '4') || // Mac screenshot area
    (e.metaKey && e.shiftKey && e.key === '5') || // Mac screen recording
    (e.ctrlKey && e.key === 'PrintScreen');       // Windows screenshot to clipboard
  
  if (isScreenshotAttempt) {
    e.preventDefault();
    toast({
      title: "Content Protected",
      description: "This resume content is protected by copyright.",
      variant: "destructive"
    });
    return false;
  }
});

// Improved print prevention with better error handling
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Print Feature Disabled",
      description: "Please use the download button to save your resume.",
      variant: "destructive"
    });
    return false;
  }
});

// Fix iOS touch events for better mobile experience
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Add iOS-specific viewport fixes
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
if (isIOS) {
  document.addEventListener('touchmove', function(e) {
    if ((e as any).scale !== 1) { e.preventDefault(); }
  }, { passive: false });
  
  // Add iOS safe area padding helper
  document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
  document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
}

// Prevent saving page via keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    toast({
      title: "Save Function Disabled",
      description: "Please use the download button to save your resume.",
      variant: "destructive"
    });
    return false;
  }
});

// Add dynamic viewport height fix for mobile browsers
const setDocumentHeight = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

// Set initial height
setDocumentHeight();

// Update on resize
window.addEventListener('resize', setDocumentHeight);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
