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

export interface SkillsListResponse {
  preferredSkills: BasicSkill[];
  experiencedSkills: BasicSkill[];
}
