<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-2xl text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-4">
        Hi <AnimatedWave /> I'm Ivan
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
        
        <Button
          @click="hideIntro"
          variant="primary"
        >
          portfolio
        </Button>
      </div>
      
      <GreetingMessage />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['hide-intro'])

const hideIntro = () => {
  emit('hide-intro')
}
</script>