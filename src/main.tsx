
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'
import { toast } from "@/hooks/use-toast"
import { applyMobileOptimizations, setupOrientationChangeHandler } from './utils/performanceUtils.ts'

// Security and performance initialization
const initializeApp = () => {
  // Initialize protection
  disableRightClick();
  
  // Apply mobile-specific optimizations
  applyMobileOptimizations();
  
  // Handle mobile orientation changes
  setupOrientationChangeHandler();
  
  // Enhanced screenshot and print prevention
  const preventScreenshot = (e: KeyboardEvent) => {
    const isScreenshotAttempt = 
      (e.key === 'PrintScreen') ||
      (e.metaKey && e.shiftKey && e.key === '3') ||
      (e.metaKey && e.shiftKey && e.key === '4') ||
      (e.metaKey && e.shiftKey && e.key === '5') ||
      (e.ctrlKey && e.key === 'PrintScreen');
    
    if (isScreenshotAttempt) {
      e.preventDefault();
      toast({
        title: "Content Protected",
        description: "This resume content is protected by copyright.",
        variant: "destructive"
      });
      return false;
    }
  };

  const preventPrintAndSave = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      
      const action = e.key === 'p' ? 'print' : 'save';
      toast({
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Feature Disabled`,
        description: "Please use the download button to save your resume.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Add event listeners with error handling
  try {
    document.addEventListener('keyup', preventScreenshot);
    document.addEventListener('keydown', preventPrintAndSave);
  } catch (error) {
    console.warn('Failed to add security event listeners:', error);
  }

  // iOS touch optimizations with error handling
  try {
    document.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS) {
      document.addEventListener('touchmove', function(e) {
        if ((e as any).scale !== 1) { e.preventDefault(); }
      }, { passive: false });
      
      document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
      document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
    }
  } catch (error) {
    console.warn('Failed to apply iOS optimizations:', error);
  }

  // Dynamic viewport height fix
  const setDocumentHeight = () => {
    try {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    } catch (error) {
      console.warn('Failed to set viewport height:', error);
    }
  };

  setDocumentHeight();
  window.addEventListener('resize', setDocumentHeight);
};

// Error handling for app initialization
try {
  initializeApp();
} catch (error) {
  console.error('Failed to initialize app:', error);
  // Continue with app render even if initialization fails
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

// Enhanced error boundary for the entire app
const renderApp = () => {
  try {
    createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    
    // Fallback error display
    root.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: system-ui;">
        <h1 style="color: #dc2626; margin-bottom: 16px;">Application Error</h1>
        <p style="color: #6b7280; margin-bottom: 16px;">Sorry, something went wrong. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
};

renderApp();
