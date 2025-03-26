<script setup>
import "devicon/devicon.min.css";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

// Persist user preference for version
const showVersion2 = useStorage("skills-version2-preference", true);
const router = useRouter();

// Original v1 skills data
const skills = [
  { name: "Nuxt.js", icon: "devicon-nuxtjs-plain", url: "https://nuxtjs.org/" },
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    url: "https://tailwindcss.com/",
  },
  { name: "Vue", icon: "devicon-vuejs-plain", url: "https://vuejs.org/" },
  {
    name: "Bootstrap",
    icon: "devicon-bootstrap-plain",
    url: "https://getbootstrap.com/",
  },
  {
    name: "Vuetify",
    icon: "devicon-vuetify-plain",
    url: "https://vuetifyjs.com/en/",
  },
  {
    name: "React",
    icon: "devicon-react-original",
    url: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-original-wordmark",
    url: "https://nextjs.org/",
  },
  {
    name: "Angular",
    icon: "devicon-angularjs-plain",
    url: "https://angular.io/",
  },
  { name: "C++", icon: "devicon-cplusplus-plain", url: "https://isocpp.org/" },
  {
    name: "AdonisJS",
    icon: "devicon-adonisjs-plain",
    url: "https://adonisjs.com/",
  },
  {
    name: "Prisma ORM",
    icon: "devicon-prisma-plain",
    url: "https://www.prisma.io/",
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    url: "https://flutter.dev/",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    url: "https://www.mongodb.com/",
  },
  {
    name: "SQL",
    icon: "devicon-mysql-plain",
    url: "https://www.w3schools.com/sql/",
  },
  { name: "PHP", icon: "devicon-php-plain", url: "https://www.php.net/" },
  {
    name: "Laravel",
    icon: "devicon-laravel-plain",
    url: "https://laravel.com/",
  },
  {
    name: "Python",
    icon: "devicon-python-plain",
    url: "https://www.python.org/",
  },
  {
    name: "Adobe XD",
    icon: "devicon-xd-plain",
    url: "https://www.adobe.com/products/xd.html",
  },
  { name: "Figma", icon: "devicon-figma-plain", url: "https://www.figma.com/" },
];

// Enhanced skills data with IDs for routing
const preferredSkills = [
  {
    id: "nuxtjs",
    name: "Nuxt.js",
    icon: "devicon-nuxtjs-plain",
    url: "https://nuxtjs.org/",
  },
  {
    id: "vuejs",
    name: "Vue.js",
    icon: "devicon-vuejs-plain",
    url: "https://vuejs.org/",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    url: "https://tailwindcss.com/",
  },
];

const experiencedSkills = [
  {
    id: "typescript",
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    url: "https://www.typescriptlang.org/",
  },
  {
    id: "react",
    name: "React",
    icon: "devicon-react-original",
    url: "https://reactjs.org/",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "devicon-nextjs-original-wordmark",
    url: "https://nextjs.org/",
  },
  {
    id: "angular",
    name: "Angular",
    icon: "devicon-angularjs-plain",
    url: "https://angular.io/",
  },
  {
    id: "adonisjs",
    name: "AdonisJS",
    icon: "devicon-adonisjs-plain",
    url: "https://adonisjs.com/",
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: "devicon-bootstrap-plain",
    url: "https://getbootstrap.com/",
  },
  {
    id: "vuetify",
    name: "Vuetify",
    icon: "devicon-vuetify-plain",
    url: "https://vuetifyjs.com/en/",
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    icon: "devicon-prisma-plain",
    url: "https://www.prisma.io/",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    url: "https://www.mongodb.com/",
  },
  {
    id: "sql",
    name: "SQL",
    icon: "devicon-mysql-plain",
    url: "https://www.w3schools.com/sql/",
  },
  {
    id: "python",
    name: "Python",
    icon: "devicon-python-plain",
    url: "https://www.python.org/",
  },
  {
    id: "php",
    name: "PHP",
    icon: "devicon-php-plain",
    url: "https://www.php.net/",
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: "devicon-flutter-plain",
    url: "https://flutter.dev/",
  },
  {
    id: "adobe-xd",
    name: "Adobe XD",
    icon: "devicon-xd-plain",
    url: "https://www.adobe.com/products/xd.html",
  },
  {
    id: "figma",
    name: "Figma",
    icon: "devicon-figma-plain",
    url: "https://www.figma.com/",
  },
];

// Add proficiency levels to skills for v2
const skillLevels = {
  "Nuxt.js": "Expert",
  "Vue.js": "Expert",
  JavaScript: "Expert",
  "Tailwind CSS": "Expert",
  React: "Advanced",
  "Next.js": "Advanced",
  TypeScript: "Advanced",
  MongoDB: "Advanced",
  SQL: "Advanced",
  Bootstrap: "Advanced",
  Laravel: "Intermediate",
  Python: "Intermediate",
  Flutter: "Intermediate",
  Angular: "Intermediate",
  PHP: "Intermediate",
  Figma: "Intermediate",
  "Adobe XD": "Intermediate",
  AdonisJS: "Intermediate",
  "Prisma ORM": "Intermediate",
  Vuetify: "Intermediate",
  "C++": "Intermediate",
};

// Navigate to skill detail page
const navigateToSkill = (skill) => {
  const slug = skill.id || skill.name.toLowerCase().replace(/\s+/g, "-");
  router.push(`/skills/${slug}`);
};

// Disable page transitions
definePageMeta({
  pageTransition: false,
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Version toggle -->
    <div class="flex justify-center mb-8">
      <div
        class="bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg inline-flex"
      >
        <button
          @click="showVersion2 = false"
          :class="[
            'px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium',
            !showVersion2
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
          ]"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            Classic View
          </span>
        </button>
        <button
          @click="showVersion2 = true"
          :class="[
            'px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium',
            showVersion2
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
          ]"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clip-rule="evenodd"
              />
            </svg>
            Enhanced View
          </span>
        </button>
      </div>
    </div>

    <!-- VERSION 1 (ORIGINAL) -->
    <article v-show="!showVersion2">
      <SkillsTechStack
        title="Preferred Tech Stack"
        description="My go-to technologies for modern web development are:"
        :skills="preferredSkills"
      />

      <SkillsTechStack
        class="mt-10"
        title="Experienced With"
        description="Over the years, I have worked with or have experience using a variety of frameworks and tools, including:"
        :skills="experiencedSkills"
      />
    </article>

    <!-- VERSION 2 (ENHANCED) -->
    <div v-show="showVersion2">
      <!-- Page Header -->
      <div class="mb-8">
        <h1
          class="heading-1 font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
        >
          My Technical Skills
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Technologies and tools I've mastered throughout my journey
        </p>
      </div>

      <!-- Preferred Tech Stack Section -->
      <section class="mb-16">
        <h2 class="heading-2 font-bold mb-3">Preferred Tech Stack</h2>
        <p class="text-lg mb-8">
          My go-to technologies for modern web development are:
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="(skill, index) in preferredSkills"
            :key="skill.name"
            class="skill-card bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-between text-center shadow-lg hover:shadow-xl transition-colors duration-300 cursor-pointer h-full"
            @click="navigateToSkill(skill)"
          >
            <!-- Experience level badge -->
            <div class="absolute top-2 right-2">
              <dev-tools-icons-star />
            </div>

            <!-- Main content wrapper -->
            <div class="flex flex-col items-center flex-grow">
              <i :class="['devicon text-5xl mb-4', skill.icon, 'colored']"></i>
              <h3 class="text-lg font-bold">{{ skill.name }}</h3>
            </div>

            <!-- Learn more link at the bottom -->
            <NuxtLink
              :href="skill.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
              @click.stop
            >
              Learn more
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Experienced With Section -->
      <section>
        <h2 class="text-3xl font-bold mb-6">Experienced With</h2>
        <p class="text-lg mb-8">
          Over the years, I have worked with or have experience using a variety
          of frameworks and tools, including:
        </p>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <div
            v-for="(skill, index) in experiencedSkills"
            :key="skill.name"
            class="skill-card bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-between text-center shadow hover:shadow-md transition-colors duration-300 cursor-pointer h-full"
            @click="navigateToSkill(skill)"
          >
            <!-- Main content wrapper -->
            <div class="flex flex-col items-center">
              <div class="relative">
                <i
                  :class="['devicon text-4xl mb-2', skill.icon, 'colored']"
                ></i>
              </div>
              <h3 class="text-base font-bold mt-3">{{ skill.name }}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  backface-visibility: hidden;
  position: relative;
  min-height: 132px; /* Ensure minimum height for consistency */
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-card:hover i {
  transform: scale(1.1);
}

i {
  transition: transform 0.3s ease;
}

/* Fancy hover effect for the cards */
.skill-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(20, 184, 166, 0.05) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.skill-card:hover::before {
  opacity: 1;
}

/* Add pointer cursor to indicate clickable */
.skill-card {
  cursor: pointer;
}
</style>
