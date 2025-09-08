import { defineEventHandler, getRouterParam } from 'h3'
import fs from 'node:fs'
import path from 'node:path'

const AI_POSTS_FILE = path.join(process.cwd(), 'server/data/aiBlogGenerated.json')

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, message: 'Missing post id' })
    }

    if (!fs.existsSync(AI_POSTS_FILE)) {
      throw createError({ statusCode: 404, message: 'Post not found' })
    }

    const data = JSON.parse(fs.readFileSync(AI_POSTS_FILE, 'utf-8'))
    const post = (data.latest_post && data.latest_post.id === id)
      ? data.latest_post
      : (data.posts || []).find((p: any) => p.id === id)

    if (!post) {
      throw createError({ statusCode: 404, message: 'Post not found' })
    }

    return { post }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 500, message: error.message || 'Server error' })
  }
})


