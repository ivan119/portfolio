<script setup lang="ts">
import ProjectCardV3 from "@/components/ProjectCardV3.vue";

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
  status: string;
  year: string;
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
    categories: ["frontend"],
    status: "Completed",
    year: "2023"
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
    categories: ["fullstack"],
    status: "Completed",
    year: "2023"
  },
];

// Define projects data
const allProjects: Project[] = [
  {
    title: "Invest in Croatia",
    description: "A government-backed platform for investors to explore business opportunities in Croatia. The site provides economic insights, legal frameworks, and available investment projects.",
    link: "https://investincroatia.hr/",
    tags: [
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" }
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2022"
  },
  {
    title: "Wine Yard",
    description: "Wineyard is an expert system that measures humidity, pressure, temperature, and CO2 and manages air conditioning devices in the wine cellar, without the physical presence of the winemaker.",
    link: "https://wine-yard.net/en/homepage",
    tags: [
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" }
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2022"
  },
];
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-8">
    <!-- Hero Section -->
    <section class="relative rounded-3xl bg-gray-800/50 p-8 overflow-hidden">
      <!-- Glow effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-transparent"></div>
      <!-- Dots pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      <!-- Content -->
      <div class="relative z-10">
        <h1 class="text-4xl font-bold text-main-gradient-animated mb-4">
          Projects
        </h1>
        <p class="text-lg text-gray-300">
          Projects where I served as Team Lead at
          <BaseButton href="https://gauss.hr/en" variant="link" external class="text-teal-400 hover:text-teal-300">
            Gauss
          </BaseButton>
          , leading development and architecture decisions.
        </p>
      </div>
    </section>

    <!-- Main Projects -->
    <section class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCardV3
          v-for="project in projects"
          :key="project.title"
          :project="project"
          :colored="true"
        />
      </div>
    </section>

    <!-- Other Projects -->
    <section class="space-y-6">
      <h2 class="text-3xl font-bold text-main-gradient-animated">
        Other Projects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCardV3
          v-for="project in allProjects"
          :key="project.title"
          :project="project"
          :colored="true"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Improve scrollbars */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* Add glow effect to cards on hover */
.transform:hover {
  filter: drop-shadow(0 0 8px rgba(45, 212, 191, 0.1));
}
</style>
