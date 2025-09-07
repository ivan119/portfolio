import { defineEventHandler, readBody } from 'h3'
import type { BlogPost, GeneratePostPayload, SavePostResponse } from '~/types/blog'
import { nanoid } from 'nanoid'
import { loadPosts, savePost } from '~/server/utils/fileSystem'
import { AIService } from '~/server/services/ai'
import path from 'node:path'
import { ImageAIService } from '~/server/services/imageAi'

const PLACEHOLDER_IMAGES = [
  'https://placehold.co/600x400/2563eb/ffffff?text=AI+Tech+Blog',
  'https://placehold.co/600x400/7c3aed/ffffff?text=Future+Tech',
  'https://placehold.co/600x400/2dd4bf/ffffff?text=Innovation'
]

const getRandomPlaceholder = () => {
  return PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)]
}

export default defineEventHandler(async (event): Promise<SavePostResponse> => {
  try {
    const body = await readBody(event)
    const { prompt } = body as GeneratePostPayload
    
    if (!prompt?.trim()) {
      return {
        success: false,
        error: 'Prompt is required'
      }
    }

    // Generate blog content using AI
    const generated = await AIService.generateBlogPost(prompt)
    
    if (!generated.success || !generated.title || !generated.content) {
      return {
        success: false,
        error: generated.error || 'Failed to generate content'
      }
    }

    // Create slug from title
    const slug = generated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 100)

    const newPost: BlogPost = {
      id: nanoid(),
      title: generated.title,
      content: generated.content,
      image: getRandomPlaceholder(),
      createdAt: new Date().toISOString(),
      slug,
      excerpt: (generated as any).excerpt,
      tags: (generated as any).tags,
      category: (generated as any).category,
      coverPrompt: (generated as any).coverPrompt
    }

    // Try to generate a cover image if we have a prompt and credentials
    if ((generated as any).coverPrompt) {
      try {
        const out = path.join(process.cwd(), 'public/images/blog', newPost.slug, 'hero.webp')
        await ImageAIService.generateCover((generated as any).coverPrompt, out)
        newPost.image = `/images/blog/${newPost.slug}/hero.webp`
      } catch (e) {
        console.warn('Cover generation failed, using placeholder')
      }
    }

    const posts = await loadPosts()
    await savePost([...posts, newPost])

    return {
      success: true,
      post: newPost
    }

  } catch (error) {
    console.error('Error generating blog post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate blog post'
    }
  }
}) 