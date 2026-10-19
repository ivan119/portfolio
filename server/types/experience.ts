export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  client?: string;
  location: string;
  period: string;
  current?: boolean;
  type?: string; // e.g. 'B2B', 'Full-time', 'Lead'
  highlights: string[];
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}
