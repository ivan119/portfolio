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

const getCategoryColor = (categories: string[]) => {
  if (categories.includes('Frontend')) return '#3B82F6';
  if (categories.includes('Backend')) return '#10B981';
  if (categories.includes('Full Stack')) return '#6366F1';
  return '#6B7280';
};
</script>

<template>
  <article
    class="skill-card relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    :style="{
      '--category-color': getCategoryColor(project.categories)
    }"
  >
    <NuxtLink
      :to="project.link"
      target="_blank"
      class="relative flex flex-col h-full"
    >
      <!-- Category Badge -->
      <div class="absolute top-2 right-2 z-10">
        <span
          class="px-2 py-0.5 text-xs font-medium rounded-full backdrop-blur-sm"
          :style="{
            backgroundColor: `${getCategoryColor(project.categories)}15`,
            color: getCategoryColor(project.categories),
            boxShadow: `0 2px 4px ${getCategoryColor(project.categories)}20`
          }"
        >
          {{ project.categories[0] }}
        </span>
      </div>

      <!-- Icon Container -->
      <div class="relative p-3">
        <div 
          class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :style="{
            background: `linear-gradient(135deg, ${getCategoryColor(project.categories)}10, transparent)`
          }"
        ></div>
        <i 
          :class="[project.tags[0]?.icon, 'text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3']"
          :style="{
            color: getCategoryColor(project.categories),
            textShadow: `0 2px 4px ${getCategoryColor(project.categories)}30`
          }"
        ></i>
      </div>

      <!-- Title -->
      <h2 
        class="text-base font-semibold text-gray-900 dark:text-white px-3 mb-1 transition-all duration-300 group-hover:text-[var(--category-color)] group-hover:translate-x-1"
      >
        {{ project.title }}
      </h2>

      <!-- Description -->
      <p class="text-xs text-gray-600 dark:text-gray-400 px-3 mb-2 flex-grow leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-1 px-2 pb-2">
        <span
          v-for="tag in project.tags"
          :key="tag.name"
          class="inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded transition-all duration-300 group-hover:scale-105"
          :style="{
            backgroundColor: `${getCategoryColor(project.categories)}15`,
            color: getCategoryColor(project.categories),
            boxShadow: `0 1px 2px ${getCategoryColor(project.categories)}10`
          }"
        >
          <i :class="[tag.icon, 'text-xs']"></i>
          {{ tag.name }}
        </span>
      </div>

      <!-- Hover Indicator -->
      <div 
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--category-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.skill-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1));
}

.dark .skill-card {
  background: linear-gradient(to bottom, rgba(31,41,55,0.5), rgba(31,41,55,0.1));
  border-color: rgba(255, 255, 255, 0.05);
}

.skill-card:hover {
  transform: translateY(-2px);
  border-color: var(--category-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .skill-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Add glow effect on hover */
.skill-card:hover::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(45deg, var(--category-color), var(--category-color));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.5;
}

/* Add subtle shine effect */
.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.skill-card:hover::before {
  transform: translateX(100%);
}
</style> 