import { projects, allProjects, techStackData } from "~/server/data/projects";
import type { ProjectsResponse } from "~/types/project";

export default defineCachedEventHandler(
  (): ProjectsResponse => {
    return {
      techStackData,
      projects,
      allProjects,
    };
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
