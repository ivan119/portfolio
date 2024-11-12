<script setup lang="ts">
import { ref, onMounted } from "vue";

const showArt = ref(false);
const hasLoadedContent = ref(false);

// Content data
const personalInfo = {
  name: "Your Name",
  role: "Web Designer & Developer",
  experience: "5 years",
  currentWork: {
    company: "Gauss",
    url: "https://gauss.hr",
  },
  interests: ["Programming", "Working Out", "Running", "Music Production"],
};

const projects = [
  { id: 1, name: "Project 1", link: "/projects/1" },
  { id: 2, name: "Project 2", link: "/projects/2" },
  // Add more projects as needed
];

// Delayed load for smooth transitions
onMounted(() => {
  setTimeout(() => {
    hasLoadedContent.value = true;
  }, 100);
});

// Toggle 3D art visibility
const toggleArt = () => {
  showArt.value = !showArt.value;
};
</script>

<template>
  <div
    class="flex flex-col gap-8 fade-in"
    :class="{ 'is-loaded': hasLoadedContent }"
  >
    <!-- Container with same dimensions as 3D art -->
    <div class="h-[432px] relative">
      <!-- 3D Art Container -->
      <div
        v-if="showArt"
        class="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition-opacity duration-500"
      >
        <span class="text-gray-500 dark:text-gray-400">
          3D Art Coming Soon
        </span>
      </div>

      <!-- Personal Info Container -->
      <div
        v-else
        class="absolute inset-0 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col gap-6 overflow-hidden"
      >
        <!-- Intro Section -->
        <div class="space-y-4">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            Hello, world...
          </h1>
          <p class="text-xl text-gray-700 dark:text-gray-300">
            I'm a {{ personalInfo.role }}, working for the last
            {{ personalInfo.experience }}
            professionally in web development.
          </p>
        </div>

        <!-- Current Work -->
        <div class="text-lg text-gray-800 dark:text-gray-200">
          Currently working at
          <a
            :href="personalInfo.currentWork.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-red-900 dark:text-green-500 hover:underline group"
          >
            {{ personalInfo.currentWork.company }}
            <svg
              class="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>

        <!-- Projects Preview -->
        <div class="space-y-2">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Featured Projects
          </h2>
          <div class="flex gap-4">
            <NuxtLink
              v-for="project in projects"
              :key="project.id"
              :to="project.link"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {{ project.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Personal Interests -->
        <div class="mt-auto">
          <p class="text-gray-700 dark:text-gray-300">
            Besides programming, I enjoy
            <span
              v-for="(interest, index) in personalInfo.interests"
              :key="interest"
              class="text-red-900 dark:text-green-500"
            >
              {{ interest
              }}{{ index < personalInfo.interests.length - 1 ? ", " : "" }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex gap-4 items-center justify-center">
      <button
        @click="toggleArt"
        class="px-6 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
      >
        {{ showArt ? "Show Info" : "Show 3D Art" }}
      </button>
      <NuxtLink
        to="/about"
        class="px-6 py-2 bg-red-900 dark:bg-green-800 text-white rounded-lg hover:opacity-90 transition-all duration-200"
      >
        About
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-in.is-loaded {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth transitions between states */
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Prevent transition glitch */
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
