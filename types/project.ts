export interface ProjectTag {
  name: string;
  icon?: string;
  gaussCMSlogo?: boolean;
  color?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  link: string;
  gaussCMSlogo?: boolean;
  tags: ProjectTag[];
  categories: string[];
  status: string;
  year: string;
}

export interface ProjectsResponse {
  techStackData: Record<string, { icon: string; url: string }>;
  projects: ProjectItem[];
  allProjects: ProjectItem[];
}

