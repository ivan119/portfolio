import type { ExperienceItem, EducationItem } from "../types/experience";
import { workExperience, education } from "../data/experience";

export interface ExperienceResponse {
  experience: ExperienceItem[];
  education: EducationItem[];
}

export default defineEventHandler((): ExperienceResponse => {
  return {
    experience: workExperience,
    education,
  };
});
