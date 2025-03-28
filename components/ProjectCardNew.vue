<script setup lang="ts">
interface Tag {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
  tags: Tag[];
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
      class="p-6 flex flex-col flex-1"
    >
      <!-- Categories -->
      <div class="flex items-center gap-2 mb-4">
        <span
          v-for="category in project.categories"
          :key="category"
          class="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
        >
          {{ category }}
        </span>
      </div>

      <!-- Title -->
      <h2
        class="project-title text-2xl font-bold mb-3 text-gray-900 dark:text-white transition-all ease-linear duration-[369]"
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
          :key="tag.name"
          class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          <i :class="[tag.icon, 'colored']"></i>
          {{ tag.name }}
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.project-title {
  position: relative;
  transition: all 0.369s linear;
}

.group:hover .project-title {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: var(--main-gradient);
}
</style>
