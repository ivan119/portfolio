<script setup>
import CompanyLink from '~/components/CompanyLink.vue'
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-3xl md:text-4xl font-bold mb-6 md:mb-10 no-animation">Ivan Kelava</h1>
    
    <article class="prose dark:prose-invert">
      <div class="flex flex-col gap-4">
        <h4 class="text-xl md:text-2xl mb-2 text-gray-800 dark:text-gray-300">
          Hey, I am Ivan Kelava, senior frontend developer.
        </h4>
        
        <p class="flex items-center gap-2">
          Currently working at 
          <CompanyLink 
            href="https://gauss.hr" 
            company="Gauss" 
            logo="/images/gauss.svg"
          />
          as team lead developer
        </p>
        
        <NuxtLink
          to="/about"
          class="text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
        >
          about
        </NuxtLink>
      </div>
    </article>
  </div>
</template>
