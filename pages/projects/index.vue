<script setup lang="ts">
import HoverCard from "@/components/HoverCard.vue";

// Define project interface
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

// Define tech stack with icons and links
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

const projects: Project[] = [
  {
    title: "GaussCMS",
    description: "A powerful Content Management System for creating, editing, and publishing content on websites and E-commerce platforms. Features include SEO optimization, multisite management, and multilingual support.",
    link: "https://gaussbox.com/modules-cms",
    tags: [
      { name: "Vue.js", icon: "devicon-vuejs-plain" },
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
      { name: "AdonisJS", icon: "devicon-adonisjs-original" }
    ],
    categories: ["CMS", "Enterprise"],
  },
  {
    title: "CeleroOne",
    description: "A comprehensive workforce management solution for mobile teams. Features include real-time planning, process management, team coordination, and integrated communication tools for both office and field workers.",
    link: "https://celero-one.com/en/",
    tags: [
      { name: "Vue.js", icon: "devicon-vuejs-plain" },
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "PHP", icon: "devicon-php-plain" }
    ],
    categories: ["SaaS", "Fintech"],
  },
];
// Define projects data
const allProject = [
  {
    name: "Invest in Croatia",
    description:
      "A government-backed platform for investors to explore business opportunities in Croatia. The site provides economic insights, legal frameworks, and available investment projects.",
    techStack: ["Nuxt.js", "Bootstrap", "JavaScript"],
    url: "https://investincroatia.hr/",
  },
  {
    name: "Celero One",
    description:
      "An advanced logistics platform built for drone delivery management, real-time tracking, and operational efficiency. It helps businesses automate and optimize drone fleets.",
    techStack: ["Nuxt.js", "Tailwind CSS", "JavaScript"],
    url: "https://celero-one.com/en/",
  },
  {
    name: "Wine Yard",
    description:
      "Wineyard is an expert system that measures humidity, pressure, temperature, and CO2 and manages air conditioning devices in the wine cellar, without the physical presence of the winemaker.",
    techStack: ["Nuxt.js", "Bootstrap", "JavaScript"],
    url: "https://wine-yard.net/en/homepage",
  },
];
</script>

<template>
  <article>
    <h1 class="heading-1">Projects</h1>
    <p class="text-lg mt-3">
      Projects where I served as Team Lead at
      <BaseButton href="https://gauss.hr/en" variant="link" external>
        Gauss
      </BaseButton>
      , leading development and architecture decisions.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mt-10">
      <HoverCard
        v-for="project in projects"
        :key="project.title"
        :category="project.categories[0]"
        size="lg"
      >
        <div class="flex flex-col h-full">
          <!-- Project Title -->
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-main-gradient transition-colors duration-300">
            {{ project.title }}
          </h2>

          <!-- Project Description -->
          <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
            {{ project.description }}
          </p>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in project.tags"
              :key="tag.name"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              <i :class="[tag.icon, 'mr-1']"></i>
              {{ tag.name }}
            </span>
          </div>

          <!-- View More Button -->
          <div class="mt-auto">
            <BaseButton
              :href="project.link"
              variant="ghost"
              external
            >
              View Project
            </BaseButton>
          </div>
        </div>
      </HoverCard>
    </div>

    <h2 class="heading-2 mt-16">Other Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <HoverCard
        v-for="project in allProject"
        :key="project.name"
        size="md"
      >
        <div class="flex flex-col h-full">
          <!-- Project Title -->
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-main-gradient transition-colors duration-300">
            {{ project.name }}
          </h3>

          <!-- Project Description -->
          <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
            {{ project.description }}
          </p>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              <i :class="[techStackData[tech]?.icon || '', 'mr-1']"></i>
              {{ tech }}
            </span>
          </div>

          <!-- View More Button -->
          <div class="mt-auto">
            <BaseButton
              :href="project.url"
              variant="ghost"
              external
            >
              View Project
            </BaseButton>
          </div>
        </div>
      </HoverCard>
    </div>
  </article>
</template>

<style scoped>
.heading-1 {
  @apply text-3xl font-bold text-gray-900 dark:text-white;
}

.heading-2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}
</style>
