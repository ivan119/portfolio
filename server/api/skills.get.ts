import type { SkillsListResponse } from "../types/skills";
import { listSkills } from "../data/skills";

export default defineCachedEventHandler(
  (): SkillsListResponse => {
    return listSkills();
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
