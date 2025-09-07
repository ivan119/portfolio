import { defineEventHandler, readBody } from 'h3'
import path from 'node:path'
import { ImageAIService } from '~/server/services/imageAi'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ slug: string; prompt: string }>(event)
  if (!body?.slug || !body?.prompt) return { ok: false, error: 'Missing fields' }
  const outPath = path.join(process.cwd(), 'public/images/blog', body.slug, 'hero.webp')
  try {
    const saved = await ImageAIService.generateCover(body.prompt, outPath)
    return { ok: true, path: saved.replace(process.cwd(), '').replace('\\', '/') }
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Failed to generate cover' }
  }
})


