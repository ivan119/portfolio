import { defineEventHandler } from 'h3'
import fs from 'node:fs'
import path from 'node:path'

const DATA_FILE = path.join(process.cwd(), 'data/aiBlogGenerated.json')

export default defineEventHandler(async () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { posts: [] }
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    const posts = (data.posts || []).concat(data.latest_post ? [data.latest_post] : [])

    const results = posts.map((post: any) => {
      const images = (post.content || []).filter((c: any) => c.type === 'image')
      const missing = images
        .map((img: any) => img.src)
        .filter((src: string) => {
          if (!src || !src.startsWith('/images/')) return false
          const filePath = path.join(process.cwd(), 'public', src)
          return !fs.existsSync(filePath)
        })
      return {
        id: post.id,
        title: post.title,
        missing,
        total: images.length
      }
    })

    return { posts: results }
  } catch (e) {
    console.error('images/status error', e)
    return { posts: [] }
  }
})


