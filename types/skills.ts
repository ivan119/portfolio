export interface BasicSkill {
  id?: string;
  name: string;
  icon: string;
  category?: string;
  proficiency?: string;
  description?: string;
  experience?: string;
  color?: string;
  url?: string;
}

export interface RelatedTechItem {
  id: string;
  name: string;
}

export interface LearningResourceItem {
  title: string;
  type: string;
  url: string;
}

export interface CodeExampleItem {
  title: string;
  description?: string;
  code: string;
}

export interface DetailedSkill {
  id: string;
  name: string;
  icon: string;
  image?: string;
  url?: string;
  level?: string;
  yearStarted?: number;
  description?: string;
  details?: string[];
  features?: string[];
  relatedTech?: RelatedTechItem[];
  resources?: LearningResourceItem[];
  examples?: CodeExampleItem[];
}

export interface SkillsListResponse {
  preferredSkills: BasicSkill[];
  experiencedSkills: BasicSkill[];
  skills: BasicSkill[];
}

export interface SkillDetailResponse {
  skill: DetailedSkill | null;
}


