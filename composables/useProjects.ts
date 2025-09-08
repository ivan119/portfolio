import type { ProjectsResponse } from "~/types/project";

export const useProjects = async () => {
  const { data, error, pending, refresh } = await useFetch<ProjectsResponse>(
    "/api/projects",
    {
      key: "projects",
      server: true,
      default: () => ({
        techStackData: {},
        projects: [],
        allProjects: [],
      }),
    }
  );

  return {
    techStackData: computed(() => data.value?.techStackData || {}),
    projects: computed(() => data.value?.projects || []),
    allProjects: computed(() => data.value?.allProjects || []),
    error,
    pending,
    refresh,
  };
};
