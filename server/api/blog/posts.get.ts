import { defineEventHandler } from 'h3'
import type { BlogPost } from '~/types/blog'
import fs from 'node:fs'
import path from 'node:path'

const POSTS_FILE = path.join(process.cwd(), 'server/data/posts.json')

export default defineEventHandler(async () => {
  try {
    if (!fs.existsSync(POSTS_FILE)) {
      return {
        posts: []
      }
    }

    const posts: BlogPost[] = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
    return {
      posts
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      posts: []
    }
  }
}) 