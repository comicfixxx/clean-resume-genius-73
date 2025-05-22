
import React, { useEffect } from 'react';
import SeoKeywords from './SeoKeywords';
import SeoStructuredData from './SeoStructuredData';
import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
  title: string;
  description: string;
  type: 'home' | 'builder' | 'ats' | 'interview' | 'pricing' | 'career-tips' | 'about' | 'privacy' | 'terms' | 'cookies' | 'splash';
  canonicalUrl?: string;
  ogImage?: string;
}

const PageSEO: React.FC<PageSEOProps> = ({ 
  title, 
  description, 
  type, 
  canonicalUrl = window.location.href,
  ogImage = 'https://i.ibb.co/Lhv22VnH/image.png'
}) => {
  // Dynamic structured data based on page type
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "SXO Resume Builder",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      }
    };
    
    // Add different properties based on page type
    switch(type) {
      case 'home':
      case 'splash':
        return {
          ...baseData,
          "@type": "WebApplication",
          "description": "Create professional ATS-optimized resumes in minutes with our easy-to-use resume builder.",
          "potentialAction": {
            "@type": "UseAction",
            "target": "https://resume-builder.com/builder"
          }
        };
      case 'builder':
        return {
          ...baseData,
          "@type": "WebApplication",
          "description": "Use our interactive resume builder to create a professional, ATS-friendly resume.",
          "potentialAction": {
            "@type": "UseAction",
            "target": "https://resume-builder.com/builder"
          }
        };
      case 'ats':
        return {
          ...baseData,
          "@type": "WebApplication",
          "description": "Check if your resume is optimized for Applicant Tracking Systems (ATS).",
          "potentialAction": {
            "@type": "UseAction",
            "target": "https://resume-builder.com/ats-checker"
          }
        };
      case 'pricing':
        return {
          ...baseData,
          "@type": "Product",
          "description": "Professional resume building tools with transparent pricing plans.",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "499",
            "highPrice": "999",
            "priceCurrency": "INR",
            "offerCount": "3"
          }
        };
      default:
        return baseData;
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#1E3A8A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      </Helmet>
      
      {/* Update the type prop for SeoKeywords and SeoStructuredData components */}
      <SeoKeywords page={type as any} />
      <SeoStructuredData type={type as any} />
    </>
  );
};

export default PageSEO;
