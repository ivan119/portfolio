import { defineEventHandler, getRouterParam } from 'h3'
import type { BlogPost } from '~/types/blog'
import fs from 'node:fs'
import path from 'node:path'

const POSTS_FILE = path.join(process.cwd(), 'data/posts.json')

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    if (!fs.existsSync(POSTS_FILE)) {
      throw new Error('Post not found')
    }

    const posts: BlogPost[] = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
    const post = posts.find(p => p.slug === slug)

    if (!post) {
      throw new Error('Post not found')
    }

    return {
      post
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Post not found'
    })
  }
}) 