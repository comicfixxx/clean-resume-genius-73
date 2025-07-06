
import React from 'react';

interface SeoKeywordsProps {
  page?: 'home' | 'builder' | 'ats' | 'interview' | 'pricing' | 'career-tips';
}

const SeoKeywords: React.FC<SeoKeywordsProps> = ({ page = 'home' }) => {
  // Different keyword sets for different pages
  const keywords = {
    home: [
      "best resume builder", "free resume maker", "professional resume creator", 
      "ATS resume builder", "ATS friendly resume", "resume templates",
      "job application tools", "career advancement", "resume optimization",
      "job search help", "professional CV builder", "resume format guide",
      "career profile creator", "work history formatter", "job seeker tools"
    ],
    builder: [
      "resume sections", "resume skills list", "work experience format", 
      "education section template", "resume bullet points", "achievement statements",
      "resume action verbs", "professional summary examples", "resume objective samples",
      "resume header format", "contact information layout", "skills section optimization",
      "resume tailoring", "job description matching", "keyword optimization"
    ],
    ats: [
      "applicant tracking system", "ATS compatibility", "resume scanner", 
      "keyword optimization", "resume parsing", "ATS friendly format",
      "resume ranking factors", "resume screening", "application tracking",
      "resume scoring system", "ATS tips", "resume keyword density",
      "resume SEO", "resume ranking", "getting past ATS"
    ],
    interview: [
      "interview preparation", "common interview questions", "behavioral interview tips", 
      "STAR method responses", "salary negotiation", "interview attire",
      "virtual interview tips", "follow-up email templates", "interview thank you notes",
      "panel interview preparation", "technical interview guidance", "interview confidence",
      "answering difficult questions", "interview body language", "remote interview success"
    ],
    pricing: [
      "free resume builder", "no cost resume service", "free professional resume creator",
      "zero cost resume maker", "free resume templates", "free ATS resume checker",
      "free online resume builder", "no subscription resume tool", "free CV builder",
      "complimentary resume service", "free ATS checker", "free resume optimization",
      "free CV maker", "free resume writing tool", "free job application tools"
    ],
    'career-tips': [
      "resume writing advice", "resume format tips", "job interview preparation", 
      "interview questions and answers", "career development strategies", "job search tips",
      "professional resume guide", "cover letter tips", "career advancement advice",
      "job application strategies", "networking for job seekers", "LinkedIn profile optimization",
      "job market trends", "career change advice", "salary negotiation tips"
    ]
  };

  // Long-tail keywords that are relevant to all pages
  const longTailKeywords = [
    "how to make resume pass ATS system", "best resume format for job application 2023",
    "professional resume templates for career change", "optimize resume for applicant tracking system",
    "how to highlight skills on resume", "resume examples for entry level positions",
    "executive resume writing tips", "technical skills to include in resume",
    "remote job application resume format", "creative professional resume templates",
    "resume building tips from recruiters", "what to include in resume summary",
    "how to list achievements on resume", "industry-specific resume keywords",
    "one page resume vs two page resume", "how to explain employment gaps in resume",
    "resume action verbs for different industries", "how to quantify achievements on resume",
    "best fonts for ATS friendly resume", "resume formats that get interviews",
    "cover letter to complement resume", "resume customization for job applications",
    "how to make resume stand out to recruiters", "resume mistakes to avoid",
    "how to address career change in resume"
  ];
  
  // Industry-specific keywords
  const industryKeywords = [
    "IT resume template", "healthcare professional resume", "finance resume keywords",
    "marketing resume examples", "engineering resume format", "sales resume achievements",
    "customer service resume skills", "project management resume", "data science resume",
    "administrative assistant resume", "graphic design portfolio resume", "teaching resume format",
    "legal profession resume", "nonprofit resume examples", "government job application format",
    "construction resume skills", "hospitality industry resume", "retail management resume",
    "banking sector resume", "accounting resume certifications", "human resources resume keywords",
    "logistics resume examples", "manufacturing resume skills", "telecommunications resume format",
    "pharmaceutical industry resume", "real estate resume template"
  ];
  
  // Job level keywords
  const jobLevelKeywords = [
    "entry level resume format", "mid-career professional resume", "senior management resume",
    "C-level executive resume", "internship application resume", "graduate resume template",
    "career transition resume", "first job resume format", "experienced professional resume",
    "director level resume", "vice president resume example", "consultant resume format",
    "specialist resume template", "manager resume keywords", "supervisor resume skills"
  ];

  // Select the appropriate keyword set based on page
  const pageKeywords = keywords[page] || [];
  
  // Only include a subset of the long-tail and other keywords to avoid overwhelming
  const selectedLongTail = longTailKeywords.slice(0, 10);
  const selectedIndustry = industryKeywords.slice(0, 10);
  const selectedJobLevel = jobLevelKeywords.slice(0, 5);
  
  // Combine all keywords
  const allKeywords = [...pageKeywords, ...selectedLongTail, ...selectedIndustry, ...selectedJobLevel];
  
  return (
    <div className="seo-keywords sr-only" aria-hidden="true">
      <h2 className="sr-only">Related Resume Building Resources</h2>
      <ul className="sr-only">
        {allKeywords.map((keyword, index) => (
          <li key={index} className="sr-only">{keyword}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeoKeywords;
