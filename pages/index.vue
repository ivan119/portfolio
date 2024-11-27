<script setup>
import BaseButton from '~/components/BaseButton.vue'
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-3xl md:text-4xl font-bold mb-3 no-animation">Ivan Kelava</h1>
    
    <article class="prose slide-enter-active flex flex-col gap-4 dark:prose-invert">
      <h4 class="text-xl md:text-2xl mb-2 text-gray-800 dark:text-gray-300">
          Hey, I am Ivan Kelava, senior frontend developer.
      </h4>
        
      <p class="flex items-center gap-1">
        Currently working at 
        <BaseButton 
          href="https://gauss.hr" 
          external
          icon="/images/gauss.svg"
        >
          Gauss
        </BaseButton>
        as team lead developer
      </p>
      
      <div class="flex">
        <BaseButton
          to="/about"
          variant="primary"
        >
          About
        </BaseButton>
      </div>
    </article>
  </div>
</template>
