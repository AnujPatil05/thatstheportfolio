export interface Project {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  featuredMetric: string;
  metricLabel: string;
  description: string;
  bulletPoints: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureNotes?: string;
  category: 'ai' | 'systems' | 'fullstack';
  sketchIcon: 'terminal' | 'radar' | 'cpu' | 'mic' | 'git';
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bulletPoints: string[];
  metrics: { value: string; label: string }[];
  tech: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  university: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  doodleTag?: string;
}

export interface Achievement {
  title: string;
  event: string;
  date: string;
  location?: string;
  description: string;
  badge: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  defaultSkill: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolioUrl: string;
  };
  summary: string;
  experience: Experience[];
  education: Education;
  skills: SkillCategory[];
  projects: Project[];
  achievements: Achievement[];
}

export type IterationId = '1' | '2' | '3' | '4' | '5';

export interface IterationConfig {
  id: IterationId;
  name: string;
  tagline: string;
  description: string;
  themeStyle: string;
  accentColor: string;
  keyCharacteristic: string;
}
