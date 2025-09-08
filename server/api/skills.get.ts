import { defineEventHandler } from 'h3'
import type { SkillsListResponse } from '~/types/skills'
import { listSkills } from '~/server/data/skills'

export default defineEventHandler((): SkillsListResponse => {
  return listSkills()
})


