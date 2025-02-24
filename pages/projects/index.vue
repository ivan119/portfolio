<script setup lang="ts">
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

const projects = [
  {
    title: "GaussCMS",
    description: "A powerful Content Management System for creating, editing, and publishing content on websites and E-commerce platforms. Features include SEO optimization, multisite management, and multilingual support.",
    link: "https://gaussbox.com/modules-cms",
    tags: ["Vue.js", "TypeScript", "Node.js"],
    categories: ["CMS", "Enterprise"],
  },
  {
    title: "CeleroOne",
    description: "A comprehensive financial management platform that streamlines business operations. Features include automated accounting, real-time analytics, and integrated payment processing.",
    link: "https://celeroone.com",
    tags: ["React", "Node.js", "AWS"],
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
      <ProjectCardNew
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </div>

    <p class="text-gray-600 dark:text-gray-400 mt-8 text-center">
      More practice projects and experiments can be found on my 
      <BaseButton 
        href="https://github.com/ivan119" 
        variant="link" 
        external
        class="inline-flex items-center gap-2"
      >
        <i class="devicon-github-original"></i>
        GitHub
      </BaseButton>
    </p>
  </article>
</template>
