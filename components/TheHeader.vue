<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/50 border-b border-gray-800">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ivan K
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-300 hover:text-white transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Generate Button -->
        <div class="flex items-center space-x-4">
          <BaseButton
            to="/generate"
            variant="primary"
            class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group"
          >
            <span class="flex items-center">
              <svg 
                class="w-4 h-4 mr-2 group-hover:animate-spin" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              GENERATE
            </span>
          </BaseButton>

          <!-- Theme Toggle or Other Actions -->
          <ColorModeButton />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
]
</script>

<style scoped>
.router-link-active {
  @apply text-white font-medium;
}

/* Add gradient animation */
.bg-gradient-to-r {
  background-size: 200% auto;
  transition: background-position 0.3s ease-in-out;
}

.bg-gradient-to-r:hover {
  background-position: right center;
}
</style> 