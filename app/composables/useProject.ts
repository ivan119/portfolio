import type { ProjectItem } from "~~/server/types/project";

export function useProject() {
  const project: Ref<ProjectItem | null> = ref(null);

  const fetchProjectBySlug = async (slug: string) => {
    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid slug parameter",
      });
    }

    try {
      const { data } = await useFetch<ProjectItem | null>(
        `/api/projects?slug=${encodeURIComponent(slug)}`,
        { default: () => null },
      );
      project.value = data.value ?? null;
    } catch (error) {
      // Log error in development only
      if (import.meta.dev) {
        console.error("Error fetching project:", error);
      }
      // In production, errors are handled by Nuxt's error handling
      project.value = null;
    }
  };

  return { project, fetchProjectBySlug };
}



