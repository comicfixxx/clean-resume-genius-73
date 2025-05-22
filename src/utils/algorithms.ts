// Resume Score Algorithm
export const calculateResumeScore = (resumeData: any): number => {
  if (!resumeData) return 0;
  
  let score = 0;
  const maxScore = 100;

  // Personal Info completeness (15%) - Critical for ATS identification
  if (resumeData.personal) {
    if (resumeData.personal.fullName?.trim()) score += 4;
    if (resumeData.personal.email?.trim()) score += 4;
    if (resumeData.personal.phone?.trim()) score += 4;
    if (resumeData.personal.website?.trim()) score += 3;
  }

  // Professional Summary (20%) - Important for ATS keyword density
  if (resumeData.personal?.summary) {
    const summary = resumeData.personal.summary.trim();
    if (summary.length > 0) {
      score += 10;
      // Additional points for comprehensive summary with keywords
      if (summary.length > 200) score += 10;
      else if (summary.length > 100) score += 5;
    }
  }

  // Experience quality (30%) - Most important for ATS evaluation
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    // Base points for having experience
    score += Math.min(resumeData.experience.length * 5, 10);

    // Check description quality and achievements/metrics
    let detailedDescriptionsCount = 0;
    let containsMetricsCount = 0;
    
    resumeData.experience.forEach((exp: any) => {
      if (exp?.description?.trim()?.length > 50) detailedDescriptionsCount++;
      
      // Enhanced check for metrics/achievements with more ATS-friendly terms
      if (exp?.description?.match(/\d+%|\d+ percent|increased|improved|reduced|achieved|delivered|managed|led|created|developed|implemented|built|designed|trained|mentored|coordinated|analyzed|evaluated|launched|established|streamlined/i)) {
        containsMetricsCount++;
      }
    });
    
    // Add points based on quality ratio
    const descQualityRatio = detailedDescriptionsCount / resumeData.experience.length;
    score += Math.round(descQualityRatio * 10);
    
    const metricsRatio = containsMetricsCount / resumeData.experience.length;
    score += Math.round(metricsRatio * 10);
  }

  // Education assessment (15%) - Standard section for ATS
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) {
    score += 10;
    const hasRecentEducation = resumeData.education.some((edu: any) => {
      if (!edu?.endDate) return true; // Current education
      const endYear = new Date(edu.endDate).getFullYear();
      return endYear >= new Date().getFullYear() - 5;
    });
    if (hasRecentEducation) score += 5;
  }

  // Skills evaluation (20%) - Critical for ATS keyword matching
  if (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) {
    // Basic points for having skills
    const skillPoints = Math.min(resumeData.skills.length * 2, 10);
    score += skillPoints;
    
    // Additional points for variety and relevance
    if (resumeData.skills.length >= 10) score += 5;
    if (resumeData.skills.length >= 5) score += 5;
  }

  // Ensure minimum 95% ATS compatibility for completed resumes (updated from 80%)
  if (score > 50) {
    const hasBasicElements = 
      resumeData.personal?.fullName && 
      resumeData.personal?.email && 
      resumeData.skills?.length > 0 && 
      (resumeData.experience?.length > 0 || resumeData.education?.length > 0);
      
    if (hasBasicElements) {
      // Boost score to at least 95 for completed resumes to reflect our guarantee
      score = Math.max(score, 95);
    }
  }

  return Math.min(score, maxScore);
};

// ATS Keyword Matching Algorithm - Enhanced for better accuracy
export const calculateATSMatch = (resumeText: string, jobDescription: string): number => {
  if (!resumeText?.trim() || !jobDescription?.trim()) return 0;

  const normalizeText = (text: string): string[] => {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  };

  // Extract all words
  const resumeWords = new Set(normalizeText(resumeText));
  const jobWords = normalizeText(jobDescription);
  
  // Important keywords get higher weight
  const uniqueJobWords = new Set(jobWords);
  const jobWordFrequency = jobWords.reduce((acc: Record<string, number>, word: string) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  // Calculate weighted match score
  let totalWeight = 0;
  let matchedWeight = 0;
  
  uniqueJobWords.forEach(word => {
    const frequency = jobWordFrequency[word];
    const weight = Math.min(frequency, 3); // Cap weight at 3 to prevent over-emphasis
    totalWeight += weight;
    
    if (resumeWords.has(word)) {
      matchedWeight += weight;
    }
  });

  return Math.round((matchedWeight / Math.max(totalWeight, 1)) * 100);
};

// Interview Question Generator Algorithm
export const generateInterviewQuestions = (skills: string[]): string[] => {
  if (!Array.isArray(skills) || skills.length === 0) return [];

  const questionTemplates = [
    "Can you describe a project where you used {skill}?",
    "What's your experience level with {skill}?",
    "How do you stay updated with the latest developments in {skill}?",
    "What challenges have you faced while working with {skill}?",
    "How would you explain {skill} to a non-technical person?"
  ];

  const questions = skills.flatMap(skill =>
    questionTemplates.map(template =>
      template.replace("{skill}", skill.trim())
    )
  );

  // Shuffle and limit questions
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(10, questions.length));
};

// Skill Relevance Algorithm - Improved with more industry categories
export const analyzeSkillRelevance = (
  skills: string[],
  jobTitle: string
): { relevant: string[], missing: string[] } => {
  if (!Array.isArray(skills) || !jobTitle?.trim()) {
    return { relevant: [], missing: [] };
  }

  const skillMappings: Record<string, string[]> = {
    "frontend developer": [
      "html",
      "css",
      "javascript",
      "react",
      "typescript",
      "responsive design",
      "git",
      "ui/ux",
      "webpack",
      "testing",
      "vue",
      "angular"
    ],
    "backend developer": [
      "nodejs",
      "python",
      "databases",
      "api design",
      "sql",
      "git",
      "server management",
      "cloud services",
      "java",
      "php",
      "c#",
      "express"
    ],
    "fullstack developer": [
      "html",
      "css",
      "javascript",
      "react",
      "nodejs",
      "databases",
      "git",
      "api",
      "typescript",
      "python",
      "docker",
      "cloud"
    ],
    "data scientist": [
      "python",
      "r",
      "machine learning",
      "statistics",
      "sql",
      "data visualization",
      "jupyter",
      "pandas",
      "numpy",
      "tensorflow",
      "scikit-learn",
      "big data"
    ],
    "project manager": [
      "agile",
      "scrum",
      "project planning",
      "stakeholder management",
      "risk management",
      "budgeting",
      "team leadership",
      "documentation",
      "jira",
      "communication"
    ],
    "ui/ux designer": [
      "figma",
      "sketch",
      "user research",
      "wireframing",
      "prototyping",
      "adobe xd",
      "usability testing",
      "interaction design",
      "responsive design",
      "accessibility"
    ],
    "devops engineer": [
      "docker",
      "kubernetes",
      "ci/cd",
      "aws",
      "azure",
      "terraform",
      "linux",
      "scripting",
      "monitoring",
      "networking",
      "security"
    ]
  };

  const normalizedJobTitle = jobTitle.toLowerCase().trim();
  
  // Find the best match for the job title
  let bestMatch = "";
  let highestMatchScore = 0;
  
  Object.keys(skillMappings).forEach(title => {
    if (normalizedJobTitle.includes(title)) {
      if (title.length > highestMatchScore) {
        highestMatchScore = title.length;
        bestMatch = title;
      }
    }
  });
  
  const requiredSkills = skillMappings[bestMatch] || [];
  const normalizedUserSkills = skills.map(skill => skill.toLowerCase().trim());

  const relevant = normalizedUserSkills.filter(skill =>
    requiredSkills.includes(skill)
  );

  const missing = requiredSkills.filter(skill =>
    !normalizedUserSkills.includes(skill)
  );

  return { relevant, missing };
};

// Add new export at the end of the file
export { generateKeralaReview, generateMultipleReviews } from './keralareviewGenerator';
