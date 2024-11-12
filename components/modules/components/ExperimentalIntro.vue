<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-2xl text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-4">
        Hi <span class="animate-wave">👋</span> I'm Ivan
      </h1>
      
      <p class="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
        I design/develop things on web.
      </p>
      
      <div class="flex gap-6 justify-center items-center">
        <a
          href="mailto:your-email@example.com"
          class="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          me
        </a>
        
        <button
          @click="hideIntro"
          class="text-lg hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300"
        >
          portfolio
        </button>
      </div>
      
      <ClientOnly>
        <p class="mt-12 text-sm text-gray-600 dark:text-gray-400">
          {{ greeting }}
        </p>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const emit = defineEmits(['hide-intro'])

const greeting = computed(() => {
  return colorMode.value === 'dark' 
    ? '✨ Nice evening!' 
    : '☀️ Have a good one!'
})

const hideIntro = () => {
  emit('hide-intro')
}
</script>

<style scoped>
.animate-wave {
  display: inline-block;
  animation: wave 2.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>