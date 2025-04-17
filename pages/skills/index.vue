<script setup>
import "devicon/devicon.min.css";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import HoverCard from "@/components/HoverCard.vue";
import ProjectCardNew from "@/components/ProjectCardNew.vue";
import SkillCardV2 from "~/components/SkillCardV2.vue";
import SkillCardV3 from "~/components/SkillCardV3.vue";

// Persist user preferences
const skillsVersion = useStorage("skills-version-preference", "v3");
const detailsVersion = useStorage(
  "skill-details-version-preference",
  "teleport",
);
const router = useRouter();

// Computed properties for version selection
const showVersion1 = computed(() => skillsVersion.value === "v1");
const showVersion2 = computed(() => skillsVersion.value === "v2");
const showVersion3 = computed(() => skillsVersion.value === "v3");
const showVersion4 = computed(() => skillsVersion.value === "v4");

// Check if using teleport version
const useTeleport = computed(() => detailsVersion.value === "teleport");
// Check if using row layout (no teleport, side by side)
const useRowLayout = computed(() => detailsVersion.value === "row");

// Version options
const versionOptions = [
  { id: "v1", name: "Classic", icon: "ph:layout-fill" },
  { id: "v2", name: "Modern", icon: "ph:layout-grid-fill" },
  { id: "v3", name: "Enhanced", icon: "ph:sparkle-fill" },
  { id: "v4", name: "Grid", icon: "ph:grid-four-fill" },
];

const detailsOptions = [
  { id: "inline", name: "Inline", icon: "ph:sidebar-fill" },
  { id: "teleport", name: "Overlay", icon: "ph:rectangle-fill" },
  { id: "row", name: "Row", icon: "ph:columns-fill" },
];

// Typewriter effect
const isTypingDescription = ref(false);
const isTypingExperience = ref(false);
const typedDescription = ref("");
const typedExperience = ref("");

// Selected framework showcase
const selectedSkill = ref(null);
const showFrameworkDetails = ref(false);

// Handle skill click to show framework details
const handleSkillClick = (skill) => {
  selectedSkill.value = skill;
  showFrameworkDetails.value = true;

  // Reset typewriter effects
  typedDescription.value = "";
  typedExperience.value = "";

  // Start typewriter effects with a slight delay
  setTimeout(() => {
    startTypewriterEffect();
  }, 500);
};

// Close framework details
const closeFrameworkDetails = () => {
  showFrameworkDetails.value = false;
  // Reset selected skill with a delay to allow fade-out animation
  setTimeout(() => {
    selectedSkill.value = null;
    typedDescription.value = "";
    typedExperience.value = "";
  }, 300);
};

// Typewriter effect function
const startTypewriterEffect = () => {
  if (!selectedSkill.value) return;

  // Start description typewriter
  isTypingDescription.value = true;
  let descIndex = 0;
  const descriptionText = selectedSkill.value.description;

  const descriptionTypewriter = setInterval(() => {
    if (descIndex < descriptionText.length) {
      typedDescription.value += descriptionText.charAt(descIndex);
      descIndex++;
    } else {
      clearInterval(descriptionTypewriter);
      isTypingDescription.value = false;

      // Start experience typewriter after description is done
      startExperienceTypewriter();
    }
  }, 20); // Typing speed
};

// Experience typewriter effect
const startExperienceTypewriter = () => {
  if (!selectedSkill.value) return;

  isTypingExperience.value = true;
  let expIndex = 0;
  const experienceText = `I've been working with ${selectedSkill.value.name} for ${selectedSkill.value.experience}. During this time, I've developed numerous projects leveraging its capabilities to deliver high-quality solutions.`;

  const experienceTypewriter = setInterval(() => {
    if (expIndex < experienceText.length) {
      typedExperience.value += experienceText.charAt(expIndex);
      expIndex++;
    } else {
      clearInterval(experienceTypewriter);
      isTypingExperience.value = false;
    }
  }, 15); // Slightly faster typing speed
};

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
    name: "WebStorm",
    icon: "devicon-webstorm-plain",
    category: "tools",
    proficiency: "Expert",
    description: "Powerful JavaScript IDE from JetBrains",
    experience: "3+ years",
    color: "text-blue-600",
  },
  {
    name: "Cursor",
    icon: "devicon-vscode-plain",
    category: "tools",
    proficiency: "Expert",
    description: "Advanced AI-powered code editor",
    experience: "1+ year",
    color: "text-blue-500",
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
const filteredByCategorySkills = computed(() => {
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
  return filteredByCategorySkills.value.length;
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

// Filtered skill collections for row layout
const filteredRowPreferredSkills = computed(() => {
  if (!selectedSkill.value || !useRowLayout.value) return preferredSkills;
  return preferredSkills.filter(
    (skill) => skill.name !== selectedSkill.value.name,
  );
});

const filteredRowExperiencedSkills = computed(() => {
  if (!selectedSkill.value || !useRowLayout.value) return experiencedSkills;
  return experiencedSkills.filter(
    (skill) => skill.name !== selectedSkill.value.name,
  );
});

// Container max width based on details visibility
const containerMaxWidth = computed(() => {
  if (useRowLayout.value && showFrameworkDetails.value) {
    return ""; // Remove max-width constraint for row layout
  }
  return "max-w-7xl";
});
</script>

<template>
  <div class="transition-all" :class="[containerMaxWidth, useRowLayout && showFrameworkDetails ? '!max-w-7xl' : '!p-3 md:p-0 mx-auto w-full']">
    <!-- Version Switcher -->
    <div class="flex justify-end items-center mb-8 gap-4">
      <!-- Layout Version -->
      <div
        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-lg inline-flex"
      >
        <button
          v-for="option in versionOptions"
          :key="option.id"
          @click="skillsVersion = option.id"
          :class="[
            'px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium flex items-center',
            skillsVersion === option.id
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
          ]"
        >
          <span>{{ option.name }}</span>
        </button>
      </div>

      <!-- Details Style -->
      <div
        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-lg inline-flex"
      >
        <button
          v-for="option in detailsOptions"
          :key="option.id"
          @click="detailsVersion = option.id"
          :class="[
            'px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium flex items-center',
            detailsVersion === option.id
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
          ]"
        >
          <span>{{ option.name }}</span>
        </button>
      </div>
    </div>

    <!-- Row Layout Container -->
    <div
      v-if="useRowLayout && showFrameworkDetails"
      class="flex flex-col lg:flex-row gap-6 w-full px-3 relative"
    >
      <!-- Background for the entire row container -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-blue-50/20 to-transparent dark:from-teal-900/20 dark:via-blue-900/10 dark:to-transparent rounded-3xl"></div>
        <!-- Light dots pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
      </div>
      
      <!-- Main Skills Column -->
      <div class="w-full lg:w-3/4 xl:w-4/5 flex-1 z-0 pt-4">
        <div
          v-show="showVersion1 || showVersion2 || showVersion3 || showVersion4"
          class="space-y-3"
        >
          <!-- Preferred Tech Stack -->
          <section class="space-y-4 relative overflow-hidden rounded-3xl p-6">
            <!-- Section background -->
            <div class="absolute inset-0 -z-10">
              <div class="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-blue-50/30 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent rounded-3xl"></div>
            </div>
            
            <h2
              class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Preferred Tech Stack
            </h2>
            <h3 class="text-lg">
              My go-to technologies for modern web development are:
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                v-for="skill in filteredRowPreferredSkills"
                :key="skill.name"
                @click.prevent="handleSkillClick(skill)"
                class="cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <SkillCardV3
                  :skill="{
                    title: skill.name,
                    description: skill.description,
                    link: '#',
                    categories: [skill.category],
                    tags: [{ name: skill.name, icon: skill.icon }],
                    proficiency: skill.proficiency,
                    experience: skill.experience,
                  }"
                  :colored="true"
                />
              </div>
            </div>
          </section>

          <!-- Experienced With -->
          <section class="space-y-4 relative overflow-hidden rounded-3xl p-6 mt-6">
            <!-- Section background -->
            <div class="absolute inset-0 -z-10">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-teal-50/30 to-transparent dark:from-blue-900/30 dark:via-teal-900/20 dark:to-transparent rounded-3xl"></div>
            </div>
            
            <h2
              class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Experienced With
            </h2>
            <h3 class="text-lg">
              Over the years, I have worked with or have experience using a
              variety of frameworks and tools, including:
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                v-for="skill in filteredRowExperiencedSkills"
                :key="skill.name"
                @click.prevent="handleSkillClick(skill)"
                class="cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <SkillCardV3
                  :skill="{
                    title: skill.name,
                    description: skill.description,
                    link: '#',
                    categories: [skill.category],
                    tags: [{ name: skill.name, icon: skill.icon }],
                    proficiency: skill.proficiency,
                    experience: skill.experience,
                  }"
                  :colored="true"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Framework Details Column -->
      <div
        class="w-full lg:w-1/4 xl:w-1/5 sticky top-0 h-fit max-h-screen overflow-y-auto flex-shrink-0 z-10 pt-4"
      >
        <div
          v-if="selectedSkill"
          class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden relative"
        >
          <!-- Decorative elements with matching opacity -->
          <div class="absolute inset-0 -z-10">
            <!-- Blurred gradient background -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-blue-50/80 to-white/95 dark:from-teal-900/90 dark:via-blue-900/80 dark:to-gray-800/95 rounded-3xl"
            ></div>
            
            <!-- Top decoration -->
            <div
              class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-t-3xl"
            ></div>
            
            <!-- Bottom decoration -->
            <div
              class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-b-3xl"
            ></div>
            
            <!-- Light dots pattern with matching opacity -->
            <div class="absolute inset-0 opacity-10">
              <div
                class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
              ></div>
            </div>
          </div>
          
          <!-- Framework Content -->
          <div class="pt-8 px-8 pb-12 relative z-1">
            <!-- Framework section title -->
            <h2
              class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-5"
            >
              Skill Details
            </h2>
            
            <!-- Framework Header with icon and gradient text -->
            <div class="relative mb-8">
              <!-- Badge indicator based on proficiency -->
              <div
                :class="[
                  'absolute -left-4 -top-4 text-xs font-bold text-white px-2 py-1 rounded-full shadow-md',
                  selectedSkill?.proficiency === 'Expert'
                    ? 'bg-emerald-500'
                    : selectedSkill?.proficiency === 'Advanced'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500',
                ]"
              >
                {{ selectedSkill?.proficiency }}
              </div>

              <div class="flex items-center">
                <div class="relative mr-5">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-blue-300/30 dark:from-teal-600/20 dark:to-blue-700/30 rounded-xl blur-sm"
                  ></div>
                  <i
                    :class="[
                      selectedSkill?.icon,
                      'text-5xl colored relative z-10 p-2',
                    ]"
                  ></i>
                </div>
                <div>
                  <h2
                    class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
                  >
                    {{ selectedSkill?.name }}
                  </h2>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ selectedSkill?.experience }} experience
                  </div>
                </div>
              </div>
            </div>

            <!-- Technology Details with enhanced styling -->
            <div class="space-y-8">
              <!-- Description with Typewriter Effect -->
              <div
                class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
              >
                <h3
                  class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
                >
                  About
                </h3>
                <p
                  class="text-gray-600 dark:text-gray-300 min-h-[3em] leading-relaxed"
                >
                  {{ typedDescription
                  }}<span v-if="isTypingDescription" class="typing-cursor"
                    >|</span
                  >
                </p>
              </div>
              
              <!-- Key Features -->
              <div class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm">
                <h3
                  class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
                >
                  Key Features
                </h3>
                <ul class="space-y-2">
                  <li
                    v-if="selectedSkill?.category === 'framework'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Modern and flexible architecture
                  </li>
                  <li
                    v-if="selectedSkill?.category === 'frontend'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Responsive UI development
                  </li>
                  <li
                    v-if="selectedSkill?.category === 'backend'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    High-performance server-side processing
                  </li>
                  <li
                    v-if="selectedSkill?.category === 'database'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Efficient data storage and retrieval
                  </li>
                  <li
                    v-if="selectedSkill?.category === 'language'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Type-safe and maintainable code
                  </li>
                  <li
                    v-if="selectedSkill?.category === 'mobile'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Cross-platform compatibility
                  </li>
                  <li
                    v-if="selectedSkill?.category === 'tools'"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Enhanced developer experience
                  </li>
                </ul>
              </div>

              <!-- Experience Showcase with Typewriter Effect -->
              <div
                class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
              >
                <h3
                  class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
                >
                  My Experience
                </h3>
                <p
                  class="text-gray-600 dark:text-gray-300 min-h-[5em] leading-relaxed"
                >
                  {{ typedExperience
                  }}<span v-if="isTypingExperience" class="typing-cursor">|</span>
                </p>
              </div>

              <!-- Close button -->
              <div class="mt-6 text-center">
                <button
                  @click="closeFrameworkDetails"
                  class="px-4 py-2 bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-full transition-colors duration-300 flex items-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Skills Content (when not using row layout) -->
    <div v-else class="w-full relative">
      <!-- VERSION 1 (CLASSIC) -->
      <article v-show="showVersion1">
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

      <!-- VERSION 2 (MODERN) -->
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
            <div
              v-for="skill in preferredSkills"
              :key="skill.name"
              @click.prevent="handleSkillClick(skill)"
            >
              <SkillCardV3
                :skill="{
                  title: skill.name,
                  description: skill.description,
                  link: '#',
                  categories: [skill.category],
                  tags: [{ name: skill.name, icon: skill.icon }],
                  proficiency: skill.proficiency,
                  experience: skill.experience,
                }"
                :colored="true"
              />
            </div>
          </div>
        </section>

        <!-- Experienced With -->
        <section class="space-y-4">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Experienced With
          </h2>
          <h3 class="text-lg">
            Over the years, I have worked with or have experience using a
            variety of frameworks and tools, including:
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="skill in experiencedSkills"
              :key="skill.name"
              @click.prevent="handleSkillClick(skill)"
            >
              <SkillCardV3
                :skill="{
                  title: skill.name,
                  description: skill.description,
                  link: '#',
                  categories: [skill.category],
                  tags: [{ name: skill.name, icon: skill.icon }],
                  proficiency: skill.proficiency,
                  experience: skill.experience,
                }"
                :colored="true"
              />
            </div>

          </div>
        </section>
      </div>

      <!-- VERSION 3 (ENHANCED) -->
      <div v-show="showVersion3" class="space-y-3">
        <!-- Hero Section with enhanced gradients -->
        <section class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-blue-50/50 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent rounded-3xl -z-10"
          ></div>
          <!-- Light dots pattern -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
            ></div>
          </div>
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
          <h2
            class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
          >
            Preferred Tech Stack
          </h2>
          <h3 class="text-lg">
            My go-to technologies for modern web development are:
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="skill in preferredSkills"
              :key="skill.name"
              @click.prevent="handleSkillClick(skill)"
              class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
            >
              <SkillCardV3
                :skill="{
                  title: skill.name,
                  description: skill.description,
                  link: '#',
                  categories: [skill.category],
                  tags: [{ name: skill.name, icon: skill.icon }],
                  proficiency: skill.proficiency,
                  experience: skill.experience,
                }"
                :colored="true"
              />
            </div>
          </div>
        </section>

        <!-- Experienced With -->
        <section class="space-y-4">
          <h2
            class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
          >
            Experienced With
          </h2>
          <h3 class="text-lg">
            Over the years, I have worked with or have experience using a
            variety of frameworks and tools, including:
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="skill in experiencedSkills"
              :key="skill.name"
              @click.prevent="handleSkillClick(skill)"
              class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
            >
              <SkillCardV3
                :skill="{
                  title: skill.name,
                  description: skill.description,
                  link: '#',
                  categories: [skill.category],
                  tags: [{ name: skill.name, icon: skill.icon }],
                  proficiency: skill.proficiency,
                  experience: skill.experience,
                }"
                :colored="true"
              />
            </div>
          </div>
        </section>
      </div>

      <!-- VERSION 4 (GRID) -->
      <div v-show="showVersion4" class="space-y-3">
        <!-- Hero Section with enhanced gradients -->
        <section class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-blue-50/50 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent rounded-3xl -z-10"
          ></div>
          <!-- Light dots pattern -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
            ></div>
          </div>
          <h1
            class="heading-1 font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-4"
          >
            Technical Skills Grid
          </h1>
          <p class="text-lg">
            A comprehensive overview of my technical expertise
          </p>
        </section>

        <!-- Combined grid of all skills -->
        <section class="space-y-4">
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <!-- Preferred Skills (with badge) -->
            <div
              v-for="skill in preferredSkills"
              :key="`preferred-${skill.name}`"
              @click.prevent="handleSkillClick(skill)"
              class="relative group"
            >
              <!-- Expert/Preferred Badge -->
              <div
                class="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm"
              >
                Preferred
              </div>

              <!-- Skill Card -->
              <div
                class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center h-full"
              >
                <i :class="[skill.icon, 'text-4xl mb-3', skill.color]"></i>
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ skill.name }}
                </h3>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ skill.proficiency }}
                </div>
              </div>
            </div>

            <!-- Experienced Skills -->
            <div
              v-for="skill in experiencedSkills"
              :key="`exp-${skill.name}`"
              @click.prevent="handleSkillClick(skill)"
              class="group"
            >
              <!-- Skill Card -->
              <div
                class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-white/20 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center h-full"
              >
                <i :class="[skill.icon, 'text-4xl mb-3', skill.color]"></i>
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ skill.name }}
                </h3>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ skill.proficiency }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Inline Framework Details (non-teleported version) -->
      <div
        v-if="
          !useTeleport && !useRowLayout && selectedSkill && showFrameworkDetails
        "
        class="fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 max-w-xl transform transition-all duration-500 overflow-y-auto z-50 border-l border-white/20 dark:border-gray-700/30 rounded-l-3xl"
      >
        <!-- Background with gradients and effects -->
        <div class="absolute inset-0 -z-10">
          <!-- Blurred gradient background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-blue-50/80 to-white/95 dark:from-teal-900/90 dark:via-blue-900/80 dark:to-gray-800/95 backdrop-blur-md rounded-l-3xl"
          ></div>

          <!-- Top decoration with subtle gradient -->
          <div
            class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-tl-3xl"
          ></div>

          <!-- Bottom decoration -->
          <div
            class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-bl-3xl"
          ></div>

          <!-- Light dots pattern -->
          <div class="absolute inset-0 opacity-30">
            <div
              class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
            ></div>
          </div>
        </div>

        <!-- Close Button with hover effect -->
        <button
          @click="closeFrameworkDetails"
          class="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 z-10 transition-all duration-300 hover:scale-110 hover:rotate-90 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Framework Content -->
        <div class="pt-8 px-8 pb-12 relative z-1">
          <!-- Framework Header with icon and gradient text -->
          <div class="relative mb-8">
            <!-- Badge indicator based on proficiency -->
            <div
              :class="[
                'absolute -left-4 -top-4 text-xs font-bold text-white px-2 py-1 rounded-full shadow-md',
                selectedSkill?.proficiency === 'Expert'
                  ? 'bg-emerald-500'
                  : selectedSkill?.proficiency === 'Advanced'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500',
              ]"
            >
              {{ selectedSkill?.proficiency }}
            </div>

            <div class="flex items-center">
              <div class="relative mr-5">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-blue-300/30 dark:from-teal-600/20 dark:to-blue-700/30 rounded-xl blur-sm"
                ></div>
                <i
                  :class="[
                    selectedSkill?.icon,
                    'text-5xl colored relative z-10 p-2',
                  ]"
                ></i>
              </div>
              <div>
                <h2
                  class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
                >
                  {{ selectedSkill?.name }}
                </h2>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ selectedSkill?.experience }} experience
                </div>
              </div>
            </div>
          </div>

          <!-- Technology Details with enhanced styling -->
          <div class="space-y-8">
            <!-- Description with Typewriter Effect -->
            <div
              class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
            >
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
              >
                About
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 min-h-[3em] leading-relaxed"
              >
                {{ typedDescription
                }}<span v-if="isTypingDescription" class="typing-cursor"
                  >|</span
                >
              </p>
            </div>

            <!-- Key Features -->
            <div class="relative">
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-3"
              >
                Key Features
              </h3>
              <ul class="space-y-2">
                <li
                  v-if="selectedSkill?.category === 'framework'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Modern and flexible architecture
                </li>
                <li
                  v-if="selectedSkill?.category === 'frontend'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Responsive UI development
                </li>
                <li
                  v-if="selectedSkill?.category === 'backend'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  High-performance server-side processing
                </li>
                <li
                  v-if="selectedSkill?.category === 'database'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Efficient data storage and retrieval
                </li>
                <li
                  v-if="selectedSkill?.category === 'language'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Type-safe and maintainable code
                </li>
                <li
                  v-if="selectedSkill?.category === 'mobile'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Cross-platform compatibility
                </li>
                <li
                  v-if="selectedSkill?.category === 'tools'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Enhanced developer experience
                </li>
              </ul>
            </div>

            <!-- Experience Showcase with Typewriter Effect -->
            <div
              class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
            >
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
              >
                My Experience
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 min-h-[5em] leading-relaxed"
              >
                {{ typedExperience
                }}<span v-if="isTypingExperience" class="typing-cursor">|</span>
              </p>
            </div>

            <!-- Related Projects -->
            <div class="relative">
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-3"
              >
                Related Projects
              </h3>
              <div
                class="bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
              >
                <p class="text-gray-600 dark:text-gray-300 italic mb-3">
                  Some of my projects using {{ selectedSkill?.name }}:
                </p>
                <ul class="space-y-2">
                  <li
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Project Dashboard
                  </li>
                  <li
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    E-commerce Platform
                  </li>
                  <li
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Content Management System
                  </li>
                </ul>
              </div>
            </div>

            <!-- View More Button with enhanced styling -->
            <div class="mt-8">
              <BaseButton
                variant="ghost"
                class="w-full justify-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-200/30 dark:border-teal-700/30 hover:from-teal-500/20 hover:to-blue-500/20 hover:scale-[1.01] transition-all duration-300 py-3 rounded-xl text-base font-medium"
                @click="router.push('/projects')"
              >
                <span class="mr-2">View Related Projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Framework Showcase Panel using Teleport (only used when teleport option is selected) -->
    <Teleport to="body" v-if="useTeleport">
      <div
        v-if="selectedSkill"
        :class="[
          'fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 max-w-xl transform transition-all duration-500 overflow-y-auto z-50',
          showFrameworkDetails ? 'translate-x-0' : 'translate-x-full',
        ]"
      >
        <!-- Background with gradients and effects -->
        <div class="absolute inset-0 -z-10">
          <!-- Blurred gradient background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-blue-50/80 to-white/95 dark:from-teal-900/90 dark:via-blue-900/80 dark:to-gray-800/95 backdrop-blur-md rounded-l-3xl"
          ></div>

          <!-- Top decoration with subtle gradient -->
          <div
            class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-tl-3xl"
          ></div>

          <!-- Bottom decoration -->
          <div
            class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-bl-3xl"
          ></div>

          <!-- Light dots pattern -->
          <div class="absolute inset-0 opacity-30">
            <div
              class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
            ></div>
          </div>
        </div>

        <!-- Border overlay -->
        <div
          class="absolute inset-0 border-l border-white/20 dark:border-gray-700/30 rounded-l-3xl"
        ></div>

        <!-- Close Button with hover effect -->
        <button
          @click="closeFrameworkDetails"
          class="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 z-10 transition-all duration-300 hover:scale-110 hover:rotate-90 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Framework Content -->
        <div class="pt-8 px-8 pb-12 relative z-1">
          <!-- Framework Header with icon and gradient text -->
          <div class="relative mb-8">
            <!-- Badge indicator based on proficiency -->
            <div
              :class="[
                'absolute -left-4 -top-4 text-xs font-bold text-white px-2 py-1 rounded-full shadow-md',
                selectedSkill?.proficiency === 'Expert'
                  ? 'bg-emerald-500'
                  : selectedSkill?.proficiency === 'Advanced'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500',
              ]"
            >
              {{ selectedSkill?.proficiency }}
            </div>

            <div class="flex items-center">
              <div class="relative mr-5">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-blue-300/30 dark:from-teal-600/20 dark:to-blue-700/30 rounded-xl blur-sm"
                ></div>
                <i
                  :class="[
                    selectedSkill?.icon,
                    'text-5xl colored relative z-10 p-2',
                  ]"
                ></i>
              </div>
              <div>
                <h2
                  class="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent"
                >
                  {{ selectedSkill?.name }}
                </h2>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ selectedSkill?.experience }} experience
                </div>
              </div>
            </div>
          </div>

          <!-- Technology Details with enhanced styling -->
          <div class="space-y-8">
            <!-- Description with Typewriter Effect -->
            <div
              class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
            >
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
              >
                About
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 min-h-[3em] leading-relaxed"
              >
                {{ typedDescription
                }}<span v-if="isTypingDescription" class="typing-cursor"
                  >|</span
                >
              </p>
            </div>

            <!-- Key Features -->
            <div class="relative">
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-3"
              >
                Key Features
              </h3>
              <ul class="space-y-2">
                <li
                  v-if="selectedSkill?.category === 'framework'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Modern and flexible architecture
                </li>
                <li
                  v-if="selectedSkill?.category === 'frontend'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Responsive UI development
                </li>
                <li
                  v-if="selectedSkill?.category === 'backend'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  High-performance server-side processing
                </li>
                <li
                  v-if="selectedSkill?.category === 'database'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Efficient data storage and retrieval
                </li>
                <li
                  v-if="selectedSkill?.category === 'language'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Type-safe and maintainable code
                </li>
                <li
                  v-if="selectedSkill?.category === 'mobile'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Cross-platform compatibility
                </li>
                <li
                  v-if="selectedSkill?.category === 'tools'"
                  class="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Enhanced developer experience
                </li>
              </ul>
            </div>

            <!-- Experience Showcase with Typewriter Effect -->
            <div
              class="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
            >
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-2"
              >
                My Experience
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 min-h-[5em] leading-relaxed"
              >
                {{ typedExperience
                }}<span v-if="isTypingExperience" class="typing-cursor">|</span>
              </p>
            </div>

            <!-- Related Projects -->
            <div class="relative">
              <h3
                class="text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-3"
              >
                Related Projects
              </h3>
              <div
                class="bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-white/50 dark:border-gray-700/50 shadow-sm"
              >
                <p class="text-gray-600 dark:text-gray-300 italic mb-3">
                  Some of my projects using {{ selectedSkill?.name }}:
                </p>
                <ul class="space-y-2">
                  <li
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Project Dashboard
                  </li>
                  <li
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    E-commerce Platform
                  </li>
                  <li
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Content Management System
                  </li>
                </ul>
              </div>
            </div>

            <!-- View More Button with enhanced styling -->
            <div class="mt-8">
              <BaseButton
                variant="ghost"
                class="w-full justify-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-200/30 dark:border-teal-700/30 hover:from-teal-500/20 hover:to-blue-500/20 hover:scale-[1.01] transition-all duration-300 py-3 rounded-xl text-base font-medium"
                @click="router.push('/projects')"
              >
                <span class="mr-2">View Related Projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Enhanced backdrop overlay with more subtle blur and gradient -->
      <div
        v-if="showFrameworkDetails"
        class="fixed inset-0 bg-gradient-to-br from-gray-900/60 to-black/70 backdrop-blur-sm z-40 transition-opacity duration-500"
        @click="closeFrameworkDetails"
      ></div>
    </Teleport>
  </div>
</template>

<style scoped>
.container-fluid {
  width: 100%;
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 1024px) {
  .container-fluid {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}

/* Row layout transitions */
.flex-col {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 1024px) {
  .flex-row > div {
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

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

/* Framework showcase animation */
.translate-x-0 {
  transform: translateX(0);
}

.translate-x-full {
  transform: translateX(100%);
}

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

/* Typewriter cursor animation */
.typing-cursor {
  display: inline-block;
  width: 2px;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Add min-heights to prevent layout shifting during typing */
.min-h-\[3em\] {
  min-height: 3em;
}

.min-h-\[5em\] {
  min-height: 5em;
}
</style>
