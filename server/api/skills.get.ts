import type { SkillsListResponse } from "~/types/skills";
import { listSkills } from "~/server/data/skills";

export default defineCachedEventHandler(
  (): SkillsListResponse => {
    return listSkills();
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
