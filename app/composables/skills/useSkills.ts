import type { SkillsListResponse, BasicSkill } from "~~/server/types/skills";

export const useSkills = async () => {
  const { data, error, pending, refresh } = await useFetch<SkillsListResponse>(
    "/api/skills",
    {
      key: "skills",
      server: true,
      default: () => ({
        preferredSkills: [],
        experiencedSkills: [],
        skills: [],
      }),
    },
  );

  return {
    preferredSkills: computed<BasicSkill[]>(
      () => data.value?.preferredSkills || [],
    ),
    experiencedSkills: computed<BasicSkill[]>(
      () => data.value?.experiencedSkills || [],
    ),
    skills: computed<BasicSkill[]>(() => data.value?.skills || []),
    error,
    pending,
    refresh,
  };
};
