import type { SkillsListResponse } from "../types/skills";
import { listSkills } from "../data/skills";

export default defineEventHandler((): SkillsListResponse => {
  return listSkills();
});
