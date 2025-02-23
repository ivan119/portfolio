import fs from 'node:fs/promises'
import path from 'node:path'
import { sanitizeFilePath } from './security'

export const POSTS_DIR = path.join(process.cwd(), 'data')
export const POSTS_FILE = path.join(POSTS_DIR, 'posts.json')

export async function ensureDataDir() {
  try {
    await fs.access(POSTS_DIR)
  } catch {
    await fs.mkdir(POSTS_DIR, { recursive: true })
  }
}

export async function loadPosts() {
  try {
    await fs.access(POSTS_FILE)
    const data = await fs.readFile(POSTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function savePost(posts: any[]) {
  await ensureDataDir()
  await fs.writeFile(
    POSTS_FILE,
    JSON.stringify(posts, null, 2),
    { flag: 'w' }
  )
} 