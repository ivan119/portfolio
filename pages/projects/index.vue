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

// Define projects data
const projects = [
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
      Some of the projects I worked on or maintained while working at
      <BaseButton href="https://gauss.hr/en" variant="link" external>
        Gauss
      </BaseButton>
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mt-10">
      <ProjectsCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </article>
</template>
