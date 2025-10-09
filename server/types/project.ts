export interface ProjectTag {
  name: string;
  icon?: string;
  gaussCMSlogo?: boolean;
  color?: string;
}

export interface ProjectItem {
  slug?: string;
  title: string;
  description: string;
  link: string;
  gaussCMSlogo?: boolean;
  tags: ProjectTag[];
  categories: string[];
  status: string;
  year: string;
  // Optional rich fields for detailed project pages
  coverImage?: string;
  longDescription?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
  gallery?: string[];
  roles?: string[];
  responsibilities?: string[];
  repo?: string;
  demo?: string;
  company?: string;
  highlights?: string[];
  allowPreview?: boolean;
  timeline?: string;
}

export interface ProjectsResponse {
  techStackData: Record<string, { icon: string; url: string }>;
  projects: ProjectItem[];
  allProjects: ProjectItem[];
}

