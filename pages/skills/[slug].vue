<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { getSkillBySlug } from '~/data/skills';
import { marked } from 'marked';

// Set up page transition for view-transition API
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    onBeforeLeave: () => {
      // This ensures view transitions work properly
      document.startViewTransition && document.startViewTransition();
    }
  },
});

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const skill = computed(() => getSkillBySlug(slug.value));
const notFound = computed(() => !skill.value);

// Parse markdown content
const parsedContent = computed(() => {
  if (!skill.value?.content) return '';
  return marked(skill.value.content);
});
</script>

<template>
  <div v-if="notFound" class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-3xl font-bold mb-4">Skill Not Found</h1>
    <p class="mb-8">
      The skill you're looking for doesn't exist or has been removed.
    </p>
    <NuxtLink to="/skills" class="text-teal-500 hover:text-teal-600">
      &larr; Back to Skills
    </NuxtLink>
  </div>

  <div v-else-if="skill" class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <!-- Breadcrumbs -->
    <div class="mb-8 flex items-center text-sm text-gray-500">
      <NuxtLink to="/" class="hover:text-teal-600">Home</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink to="/skills" class="hover:text-teal-600">Skills</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
    </div>

    <!-- Skill Header -->
    <header class="mb-12 flex flex-col md:flex-row items-start md:items-center gap-8">
      <div 
        class="w-24 h-24 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center"
      >
        <i 
          :class="['devicon', skill.icon, 'colored', 'text-6xl']"
          :style="{ 'view-transition-name': `skill-icon-${skill.slug}` }"
        ></i>
      </div>
      
      <div class="flex-1">
        <h1 
          class="text-4xl font-bold mb-2"
          :style="{ 'view-transition-name': `skill-name-${skill.slug}` }"
        >
          {{ skill.name }}
        </h1>
        
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {{ skill.description }}
        </p>
        
        <div class="flex flex-wrap gap-4 items-center">
          <div v-if="skill.years" class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ skill.years }} years experience</span>
          </div>
          
          <NuxtLink 
            :to="skill.url" 
            target="_blank" 
            class="text-teal-500 hover:text-teal-600 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Documentation
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Expertise Level -->
    <div class="mb-12" v-if="skill.expertise">
      <h2 class="text-xl font-bold mb-3">Expertise Level</h2>
      <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          class="h-full bg-teal-500 rounded-full transition-all duration-1000" 
          :style="{ width: `${skill.expertise}%` }"
        ></div>
      </div>
      <div class="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
        <span>Expert</span>
      </div>
    </div>

    <!-- Projects -->
    <div class="mb-12" v-if="skill.projects && skill.projects.length > 0">
      <h2 class="text-xl font-bold mb-3">Projects Using {{ skill.name }}</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li v-for="project in skill.projects" :key="project.name">
          <NuxtLink 
            v-if="project.url" 
            :to="project.url"
            class="text-teal-500 hover:text-teal-600"
          >
            {{ project.name }}
          </NuxtLink>
          <span v-else>{{ project.name }}</span>
        </li>
      </ul>
    </div>

    <!-- Content -->
    <div v-if="parsedContent" class="prose dark:prose-invert max-w-none">
      <div v-html="parsedContent"></div>
    </div>

    <!-- Back to Skills -->
    <div class="mt-16 text-center">
      <NuxtLink
        to="/skills"
        class="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to All Skills
      </NuxtLink>
    </div>
  </div>
</template> 