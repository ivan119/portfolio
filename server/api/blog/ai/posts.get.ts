import fs from 'node:fs'
import path from 'node:path'

const AI_POSTS_FILE = path.join(process.cwd(), 'server/data/aiBlogGenerated.json')

export default defineCachedEventHandler(async () => {
  try {
    if (!fs.existsSync(AI_POSTS_FILE)) {
      return { posts: [], latest_post: null }
    }

    const data = JSON.parse(fs.readFileSync(AI_POSTS_FILE, 'utf-8'))
    return {
      posts: data.posts || [],
      latest_post: data.latest_post || null
    }
  } catch (error) {
    console.error('Error reading AI blog data:', error)
    return { posts: [], latest_post: null }
  }
}, {
  maxAge: 60 * 10, // 10 minutes
  swr: true
})


