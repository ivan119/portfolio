import type { ProjectItem } from "~~/server/types/project";

export function useProject() {
  const project: Ref<ProjectItem | null> = ref(null);

  const fetchProjectBySlug = async (slug: string) => {
    try {
      const { data } = await useFetch<ProjectItem | null>(
        `/api/projects?slug=${encodeURIComponent(slug)}`,
        { default: () => null },
      );
      project.value = data.value ?? null;
    } catch (error) {
      console.error("Error fetching project:", error);
      project.value = null;
    }
  };

  return { project, fetchProjectBySlug };
}



