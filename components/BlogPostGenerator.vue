<template>
  <div class="max-w-4xl mx-auto p-6">
    <header class="mb-12 text-center">
      <div class="inline-block">
        <h1 class="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 bg-clip-text text-transparent transition-all duration-500">
          AI Blog Generator
          <span class="text-sm ml-2 px-3 py-1 bg-purple-600/10 dark:bg-purple-600/20 rounded-full text-purple-600 dark:text-purple-400 font-medium hover:scale-105 transition-transform">v1.0</span>
        </h1>
        <div class="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform hover:scale-x-110 transition-transform duration-300"></div>
      </div>
      <p class="text-gray-700 dark:text-gray-300 mt-4 text-lg font-light tracking-wide">Create next-gen blog posts with AI-powered assistance</p>
    </header>
    
    <div class="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 p-8">
      <form @submit.prevent="generatePost" class="space-y-6">
        <div class="relative">
          <label for="prompt" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center group">
            <svg class="w-5 h-5 mr-2 text-blue-500 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-blue-500 dark:focus:border-purple-500 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              :placeholder="DEFAULT_PROMPT"
              aria-describedby="prompt-description"
            ></textarea>
            <div class="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
              {{ prompt.length }}/500
            </div>
          </div>
          <p id="prompt-description" class="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center group hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <svg class="w-4 h-4 mr-1 text-blue-500 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro tip: Be specific about technologies, trends, or concepts you want to cover
          </p>
        </div>
        
        <BaseButton
          type="submit"
          :loading="isLoading"
          class="w-full group relative overflow-hidden rounded-xl transform hover:scale-[1.02] transition-all duration-300"
        >
          <span class="relative z-10">{{ isLoading ? 'Generating Magic...' : 'Generate Blog Post' }}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient"></div>
        </BaseButton>

        <!-- Loading Progress Bar -->
        <div 
          v-if="isLoading" 
          class="relative pt-4"
        >
          <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700/50">
            <div
              :style="{ width: `${loadingProgress}%` }"
              class="transition-all duration-300 ease-out shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
            ></div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center font-medium">
            {{ Math.round(loadingProgress) }}% - This might take up to 30 seconds...
          </p>
        </div>
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
const loadingProgress = ref(0)
const loadingInterval = ref<NodeJS.Timeout | null>(null)
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

const startLoadingProgress = () => {
  loadingProgress.value = 0
  loadingInterval.value = setInterval(() => {
    if (loadingProgress.value < 90) { // Only go up to 90% automatically
      loadingProgress.value += Math.random() * 2 // Random increment for more natural feel
    }
  }, 300)
}

const stopLoadingProgress = () => {
  if (loadingInterval.value) {
    clearInterval(loadingInterval.value)
    loadingInterval.value = null
  }
  loadingProgress.value = 100 // Complete the progress
  setTimeout(() => {
    loadingProgress.value = 0 // Reset after animation
  }, 500)
}

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
  startLoadingProgress()
  
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
    stopLoadingProgress()
    isLoading.value = false
  }
}

// Cleanup on component unmount
onUnmounted(() => {
  if (loadingInterval.value) {
    clearInterval(loadingInterval.value)
  }
})
</script>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.prose {
  @apply text-gray-800 dark:text-gray-200;
}

.prose p {
  @apply mb-4;
}

/* Glass morphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Enhanced hover shadow */
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Add a subtle gradient background to the page */
:deep(body) {
  @apply bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen;
  background-image: 
    radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 50%);
}

/* Add subtle animation for hover states */
.transition-all {
  @apply transform transition duration-200 ease-in-out;
}

textarea:focus {
  @apply shadow-lg scale-[1.02] dark:shadow-purple-500/20;
}
</style> 