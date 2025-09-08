import { defineEventHandler } from 'h3'
import { projects, allProjects, techStackData } from '~/server/data/projects'
import type { ProjectsResponse } from '~/types/project'

export default defineEventHandler((): ProjectsResponse => {
  return {
    techStackData,
    projects,
    allProjects,
  }
})


