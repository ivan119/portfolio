import type { ExperienceItem, EducationItem } from "~~/server/types/experience";
import type { ExperienceResponse } from "~~/server/api/experience.get";

export const useExperience = async () => {
  const { data, error, pending, refresh } = await useFetch<ExperienceResponse>(
    "/api/experience",
    {
      key: "experience",
      server: true,
      default: () => ({
        experience: [],
        education: [],
      }),
    },
  );

  return {
    experience: computed<ExperienceItem[]>(() => data.value?.experience || []),
    education: computed<EducationItem[]>(() => data.value?.education || []),
    error,
    pending,
    refresh,
  };
};
