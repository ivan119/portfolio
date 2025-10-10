import { projects, allProjects, techStackData } from "../data/projects";
import type { ProjectsResponse, ProjectItem } from "../types/project";

export default defineCachedEventHandler(
  (event) => {
    const query = getQuery(event);
    const slug = (query.slug as string | undefined)?.toLowerCase();
    if (slug) {
      const merged: ProjectItem[] = [...projects, ...allProjects];
      const found = merged.find((p) => p.slug?.toLowerCase() === slug);
      if (!found)
        throw createError({
          statusCode: 404,
          statusMessage: "Project not found",
        });
      return found;
    }

    return {
      techStackData,
      projects,
      allProjects,
    } as ProjectsResponse;
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
