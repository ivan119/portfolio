<script setup lang="ts">
interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  categories: string[];
}

defineProps<{
  project: Project;
}>();
</script>

<template>
  <article
    class="skill-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col"
  >
    <NuxtLink
      :to="project.link"
      target="_blank"
      class="block p-6 flex flex-col flex-1"
    >
      <!-- Categories -->
      <div class="flex items-center gap-2 mb-4">
        <span
          v-for="category in project.categories"
          :key="category"
          class="px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
        >
          {{ category }}
        </span>
      </div>

      <!-- Title -->
      <h2
        class="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors"
      >
        {{ project.title }}
      </h2>

      <!-- Description (Fixed Height) -->
      <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow min-h-[80px]">
        {{ project.description }}
      </p>

      <!-- Tech Tags -->
      <div class="flex flex-wrap gap-2 mt-auto">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {{ tag }}
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped></style>
