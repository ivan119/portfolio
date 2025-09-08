import { defineEventHandler, getRouterParam } from 'h3'
import type { SkillDetailResponse } from '~/types/skills'
import { findSkillById } from '~/server/data/skills'

export default defineEventHandler((event): SkillDetailResponse => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    return { skill: null }
  }

  const skill = findSkillById(slug)
  return { skill }
})


