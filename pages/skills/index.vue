<script setup>
import "devicon/devicon.min.css";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import HoverCard from "@/components/HoverCard.vue";
import ProjectCardNew from "@/components/ProjectCardNew.vue";
import ProjectCardV2 from "~/components/ProjectCardV2.vue";

// Persist user preference for version
const showVersion2 = useStorage("skills-version2-preference", true);
const router = useRouter();

// Preferred Tech Stack
const preferredSkills = [
  {
    name: "Vue.js",
    icon: "devicon-vuejs-plain",
    category: "frontend",
    proficiency: "Expert",
    description: "Modern reactive framework for building user interfaces",
    experience: "4+ years",
    color: "text-emerald-500",
  },
  {
    name: "Nuxt.js",
    icon: "devicon-nuxtjs-plain",
    category: "framework",
    proficiency: "Expert",
    description: "Vue.js framework for building full-stack applications",
    experience: "3+ years",
    color: "text-green-500",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    category: "language",
    proficiency: "Expert",
    description: "Typed superset of JavaScript for scalable applications",
    experience: "3+ years",
    color: "text-blue-500",
  },
  {
    name: "Node.js",
    icon: "devicon-nodejs-plain",
    category: "backend",
    proficiency: "Expert",
    description: "JavaScript runtime for server-side development",
    experience: "4+ years",
    color: "text-green-600",
  },
  {
    name: "React",
    icon: "devicon-react-plain",
    category: "frontend",
    proficiency: "Advanced",
    description: "Library for building user interfaces",
    experience: "3+ years",
    color: "text-blue-400",
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-plain",
    category: "framework",
    proficiency: "Advanced",
    description: "React framework for production-grade applications",
    experience: "2+ years",
    color: "text-gray-800 dark:text-white",
  },
  {
    name: "TailwindCSS",
    icon: "devicon-tailwindcss-plain",
    category: "frontend",
    proficiency: "Expert",
    description: "Utility-first CSS framework",
    experience: "3+ years",
    color: "text-teal-500",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    category: "database",
    proficiency: "Advanced",
    description: "NoSQL database for modern applications",
    experience: "3+ years",
    color: "text-green-500",
  },
];

// Filter functionality for the enhanced view
const selectedFilter = ref("all");
const categories = computed(() => {
  // Extract unique categories
  const uniqueCategories = [
    ...new Set(experiencedSkills.map((skill) => skill.category)),
  ];
  return ["all", ...uniqueCategories.sort()];
});

// Filtered skills based on selected category
const filteredExperiencedSkills = computed(() => {
  if (selectedFilter.value === "all") {
    return experiencedSkills;
  }
  return experiencedSkills.filter(
    (skill) =>
      skill.category?.toLowerCase() === selectedFilter.value.toLowerCase(),
  );
});

// Filter count
const filterCount = computed(() => {
  return filteredExperiencedSkills.value.length;
});

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

// Experienced Skills
const experiencedSkills = [
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    category: "language",
    proficiency: "Expert",
    description: "Core language for web development",
    experience: "5+ years",
    color: "text-yellow-500",
  },
  {
    name: "Python",
    icon: "devicon-python-plain",
    category: "language",
    proficiency: "Advanced",
    description: "Versatile language for backend and automation",
    experience: "3+ years",
    color: "text-blue-500",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain",
    category: "database",
    proficiency: "Advanced",
    description: "Robust relational database system",
    experience: "3+ years",
    color: "text-blue-400",
  },
  {
    name: "Redis",
    icon: "devicon-redis-plain",
    category: "database",
    proficiency: "Intermediate",
    description: "In-memory data structure store",
    experience: "2+ years",
    color: "text-red-500",
  },
  {
    name: "Docker",
    icon: "devicon-docker-plain",
    category: "backend",
    proficiency: "Advanced",
    description: "Container platform for applications",
    experience: "3+ years",
    color: "text-blue-500",
  },
  {
    name: "Git",
    icon: "devicon-git-plain",
    category: "backend",
    proficiency: "Expert",
    description: "Version control system",
    experience: "5+ years",
    color: "text-orange-500",
  },
  {
    name: "Sass",
    icon: "devicon-sass-plain",
    category: "frontend",
    proficiency: "Advanced",
    description: "CSS preprocessor scripting language",
    experience: "4+ years",
    color: "text-pink-500",
  },
  {
    name: "Webpack",
    icon: "devicon-webpack-plain",
    category: "frontend",
    proficiency: "Advanced",
    description: "Static module bundler",
    experience: "3+ years",
    color: "text-blue-500",
  },
  {
    name: "Jest",
    icon: "devicon-jest-plain",
    category: "framework",
    proficiency: "Advanced",
    description: "JavaScript testing framework",
    experience: "3+ years",
    color: "text-red-600",
  },
  {
    name: "GraphQL",
    icon: "devicon-graphql-plain",
    category: "backend",
    proficiency: "Intermediate",
    description: "API query language",
    experience: "2+ years",
    color: "text-pink-600",
  },
  {
    name: "AWS",
    icon: "devicon-amazonwebservices-plain",
    category: "backend",
    proficiency: "Advanced",
    description: "Cloud computing platform",
    experience: "3+ years",
    color: "text-orange-500",
  },
  {
    name: "Figma",
    icon: "devicon-figma-plain",
    category: "design",
    proficiency: "Advanced",
    description: "Design and prototyping tool",
    experience: "2+ years",
    color: "text-purple-500",
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    category: "mobile",
    proficiency: "Intermediate",
    description: "UI toolkit for mobile applications",
    experience: "1+ year",
    color: "text-blue-400",
  },
  {
    name: "React Native",
    icon: "devicon-react-plain",
    category: "mobile",
    proficiency: "Advanced",
    description: "Mobile app development framework",
    experience: "2+ years",
    color: "text-blue-500",
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

const cardStyle = ref("v1");
</script>

<template>
  <div class="max-w-7xl !p-3 md:p-0">
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
    <div v-show="showVersion2" class="space-y-3">
      <!-- Hero Section -->
      <section class="relative">
        <div
          class="absolute inset-0 bg-gradient-to-b from-teal-50 to-transparent dark:from-teal-900/20 dark:to-transparent rounded-3xl -z-10"
        ></div>
        <h1
          class="heading-1 font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-4"
        >
          Technical Skills
        </h1>
        <p class="text-lg">
          Technologies and tools I've mastered throughout my journey
        </p>
      </section>

      <!-- Preferred Tech Stack -->
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Preferred Tech Stack
        </h2>
        <h3 class="text-lg">
          My go-to technologies for modern web development are:
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProjectCardV2
            v-for="skill in preferredSkills"
            :key="skill.name"
            :project="{
              title: skill.name,
              description: skill.description,
              link: '#',
              categories: [skill.category],
              tags: [{ name: skill.name, icon: skill.icon }],
            }"
          />
        </div>
      </section>

      <!-- Experienced With -->
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Experienced With
        </h2>
        <h3 class="text-lg">
          Over the years, I have worked with or have experience using a variety
          of frameworks and tools, including:
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProjectCardV2
            v-for="skill in experiencedSkills"
            :key="skill.name"
            :project="{
              title: skill.name,
              description: skill.description,
              link: '#',
              categories: [skill.category],
              tags: [{ name: skill.name, icon: skill.icon }],
            }"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.grid > div {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid > div:hover {
  transform: translateY(-4px);
}

section {
  padding: 1rem;
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
}

/* Add subtle border on hover */
.group:hover {
  border: 1px solid var(--main-gradient-from);
}

/* Add glow effect on hover */
.group:hover::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    45deg,
    var(--main-gradient-from),
    var(--main-gradient-to)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Add pulse animation for expert level skills */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.group[data-proficiency="Expert"]:hover {
  animation: pulse 2s infinite;
}

/* Add shine effect */
.shine {
  position: relative;
  overflow: hidden;
}

.shine::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(30deg);
  animation: shine 6s linear infinite;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group:hover .shine::before {
  opacity: 1;
}

@keyframes shine {
  0% {
    transform: rotate(30deg) translateX(-100%);
  }
  100% {
    transform: rotate(30deg) translateX(100%);
  }
}

/* Add floating animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.group:hover {
  animation: float 3s ease-in-out infinite;
}
</style>
