<template>
  <div class="max-w-4xl mx-auto p-6">
    <header class="mb-12 text-center">
      <div class="inline-block">
        <h1 class="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          AI Blog Generator
          <span class="text-sm ml-2 px-3 py-1 bg-purple-600/10 rounded-full text-purple-600 font-medium">v1.0</span>
        </h1>
        <div class="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      <p class="text-gray-300 mt-4 text-lg">Create next-gen blog posts with AI-powered assistance</p>
    </header>
    
    <div class="backdrop-blur-md bg-white/20 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
      <form @submit.prevent="generatePost" class="space-y-6">
        <div class="relative">
          <label for="prompt" class="block text-sm font-medium text-gray-200 mb-2 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Blog Post Topic
          </label>
          <div class="relative">
            <textarea
              id="prompt"
              v-model="prompt"
              rows="4"
              max-rows="4"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/30 backdrop-blur-sm transition-all duration-200"
              :placeholder="DEFAULT_PROMPT"
              aria-describedby="prompt-description"
            ></textarea>
            <div class="absolute right-3 bottom-3 text-xs text-gray-400">
              {{ prompt.length }}/500
            </div>
          </div>
          <p id="prompt-description" class="mt-2 text-sm text-gray-400 flex items-center">
            <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro tip: Be specific about technologies, trends, or concepts you want to cover
          </p>
        </div>
        
        <BaseButton
          type="submit"
          :loading="isLoading"
          class="w-full group relative overflow-hidden rounded-xl"
        >
          <span class="relative z-10">{{ isLoading ? 'Generating Magic...' : 'Generate Blog Post' }}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </BaseButton>
      </form>

      <div v-if="generatedContent" class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Generated Content
          </h2>
          <div class="flex gap-3">
            <BaseButton
              variant="secondary"
              size="sm"
              @click="copyContent"
              :disabled="!generatedContent"
              class="flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {{ copied ? 'Copied!' : 'Copy' }}
            </BaseButton>
            <BaseButton
              variant="secondary"
              size="sm"
              @click="regenerateContent"
              :disabled="isLoading"
              class="flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Regenerate
            </BaseButton>
          </div>
        </div>
        <div 
          class="prose prose-lg max-w-none bg-white/30 backdrop-blur-md p-8 rounded-xl border-2 border-gray-200 shadow-lg"
          v-html="formattedContent"
        >
        </div>
      </div>

      <!-- Add error message display -->
      <div 
        v-if="error" 
        class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500"
      >
        {{ error }}
      </div>

      <!-- Add image preview if post is generated -->
      <div v-if="currentPost" class="mt-6">
        <img 
          :src="currentPost.image" 
          :alt="currentPost.title"
          class="w-full h-48 object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const DEFAULT_PROMPT = 'Generate a detailed blog post about the latest technologies in web development, including frameworks, tools, and best practices.'

const prompt = ref(DEFAULT_PROMPT)
const generatedContent = ref('')
const isLoading = ref(false)
const copied = ref(false)
const error = ref<string | null>(null)
const currentPost = ref<BlogPost | null>(null)

const formattedContent = computed(() => {
  if (!generatedContent.value) return ''
  return generatedContent.value
    .split('\n')
    .map(line => `<p>${line}</p>`)
    .join('')
})

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(generatedContent.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const regenerateContent = () => {
  generatePost()
}

const generatePost = async () => {
  if (!prompt.value.trim()) return
  
  isLoading.value = true
  error.value = null
  
  try {
    const { data } = await useFetch('/api/blog/generate', {
      method: 'POST',
      body: {
        prompt: prompt.value
      }
    })

    if (data.value?.success && data.value?.post) {
      currentPost.value = data.value.post
      generatedContent.value = data.value.post.content
    } else {
      error.value = data.value?.error || 'Failed to generate blog post'
    }
  } catch (err) {
    console.error('Error generating blog post:', err)
    error.value = 'Failed to generate blog post'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.prose {
  @apply text-gray-200;
}

.prose p {
  @apply mb-4;
}

/* Add a subtle gradient background to the page */
:deep(body) {
  @apply bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen;
  background-image: 
    radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
}

/* Add glass morphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Add subtle animation for hover states */
.transition-all {
  @apply transform transition duration-200 ease-in-out;
}

textarea:focus {
  @apply shadow-lg scale-[1.02];
}
</style> 