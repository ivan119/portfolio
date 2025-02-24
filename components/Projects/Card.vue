<script setup lang="ts">
defineProps<{
  project: {
    name: string;
    description: string;
    techStack: string[];
    url: string;
  };
}>();

const techStackData: Record<string, { icon: string; url: string }> = {
  "Nuxt.js": { icon: "devicon-nuxtjs-plain", url: "https://nuxtjs.org/" },
  Bootstrap: {
    icon: "devicon-bootstrap-plain",
    url: "https://getbootstrap.com/",
  },
  JavaScript: {
    icon: "devicon-javascript-plain",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  "Tailwind CSS": {
    icon: "devicon-tailwindcss-plain",
    url: "https://tailwindcss.com/",
  },
};
</script>

<template>
  <NuxtLink :to="project.url" target="_blank" class="skill-card project-card">
    <h2 class="heading-2 font-semibold mb-2">{{ project.name }}</h2>
    <p class="text-gray-700 dark:text-gray-300 flex-grow">
      {{ project.description }}
    </p>
    <div class="mt-3 flex flex-wrap items-center gap-2">
      <BaseButton
        v-for="tech in project.techStack"
        :key="tech"
        :href="techStackData[tech]?.url"
        target="_blank"
        class="flex items-center text-sm bg-blue-500 px-2 py-1 rounded"
      >
        <i :class="[techStackData[tech]?.icon, 'colored mr-2']"></i>
        <span class="text-xs">
          {{ tech }}
        </span>
      </BaseButton>
    </div>
    <!--  <div>
      <BaseButton
        :href="project.url"
        target="_blank"
        class="mt-4 hover:underline w-auto"
      >
        Visit Project
      </BaseButton>
    </div>  -->
  </NuxtLink>
</template>

<style>
.project-card {
  @apply items-start text-left p-3;
}
</style>
