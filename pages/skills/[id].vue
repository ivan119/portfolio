<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const skillId = computed(() => route.params.id as string);
const skill = ref(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Fetch the skill data (SSR-friendly)
const fetchSkill = async () => {
  try {
    isLoading.value = true;
    const { data, error: fetchError } = await useFetch(`/api/skills/${skillId.value}`, {
      key: `skill-${skillId.value}`,
      server: true,
      default: () => ({ skill: null }),
    });

    if (fetchError.value) {
      throw fetchError.value;
    }

    skill.value = data.value?.skill || null;
    if (!skill.value) {
      error.value = `Skill "${skillId.value}" not found`;
    }
  } catch (err: any) {
    error.value = err?.message || "An error occurred loading this skill";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchSkill);

// Calculate years of experience
const yearsOfExperience = computed(() => {
  if (!skill.value?.yearStarted) return null;
  const currentYear = new Date().getFullYear();
  return currentYear - skill.value.yearStarted;
});

// Format experience text
const experienceText = computed(() => {
  if (!yearsOfExperience.value) return null;
  return yearsOfExperience.value === 1
    ? "1 year of experience"
    : `${yearsOfExperience.value} years of experience`;
});

// Navigate back to skills page
const goBack = () => {
  router.back();
};

// Disable page transitions
definePageMeta({
  pageTransition: false,
});
</script>

<template>
  <div class="!max-w-7xl">
    <!-- Loading state -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="inline-block w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="mt-4 text-xl">Loading skill details...</p>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center p-4"
    >
      <div class="max-w-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          {{ error }}
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          We couldn't find the skill information you're looking for.
        </p>
        <button
          @click="goBack"
          class="mt-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Return to Skills
        </button>
      </div>
    </div>

    <!-- Skill content -->
    <div v-else-if="skill" class="pb-16">
      <!-- Back navigation -->
      <div class="fixed top-6 left-6 z-10">
        <button
          @click="goBack"
          class="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur hover:bg-white dark:hover:bg-gray-700 transition-colors group"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </div>

      <!-- Hero section -->
      <div
        class="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white"
      >
        <div class="absolute inset-0 overflow-hidden opacity-10">
          <div
            class="absolute inset-0 pattern-dots pattern-gray-100 pattern-size-2 pattern-opacity-10"
          ></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <!-- Icon and name -->
            <div class="text-center md:text-left max-w-3xl">
              <div
                class="inline-block bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl mb-6"
              >
                <!-- Use either a large icon or a custom image -->
                <img
                  v-if="skill.image"
                  :src="skill.image"
                  :alt="`${skill.name} logo`"
                  class="w-32 h-32 md:w-48 md:h-48 object-contain"
                />
                <i
                  v-else
                  :class="['devicon text-9xl', skill.icon, 'colored']"
                ></i>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold mb-4">
                {{ skill.name }}
              </h1>

              <!-- Experience level and years -->
              <div
                class="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6"
              >
                <span
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium flex items-center',
                    skill.level === 'Expert'
                      ? 'bg-emerald-500 text-white'
                      : skill.level === 'Advanced'
                        ? 'bg-blue-500 text-white'
                        : 'bg-yellow-500 text-white',
                  ]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ skill.level || "Intermediate" }} Level
                </span>
                <span
                  v-if="experienceText"
                  class="px-4 py-2 bg-white/10 rounded-full text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1 inline-block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ experienceText }}
                </span>
              </div>

              <p class="text-xl md:text-2xl mb-6 text-gray-200">
                {{ skill.description }}
              </p>

              <!-- CTA button for documentation or website -->
              <a
                v-if="skill.url"
                :href="skill.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-lg font-medium"
              >
                <span>Official Documentation</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Wave divider -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="fill-current text-white dark:text-gray-900"
          >
            <path
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,218.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Detailed content section -->
      <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Main content -->
          <div class="lg:col-span-2">
            <!-- About section -->
            <section class="mb-12">
              <h2 class="text-3xl font-bold mb-6">About {{ skill.name }}</h2>
              <div class="prose prose-lg max-w-none dark:prose-invert">
                <p
                  v-if="skill.details && skill.details.length"
                  v-for="(paragraph, i) in skill.details"
                  :key="i"
                  class="mb-4"
                >
                  {{ paragraph }}
                </p>
              </div>
            </section>

            <!-- Code examples section (if available) -->
            <section
              v-if="skill.examples && skill.examples.length"
              class="mb-12"
            >
              <h2 class="text-3xl font-bold mb-6">Code Examples</h2>
              <div v-for="(example, i) in skill.examples" :key="i" class="mb-8">
                <h3 class="text-xl font-semibold mb-3">{{ example.title }}</h3>
                <p
                  v-if="example.description"
                  class="mb-3 text-gray-600 dark:text-gray-400"
                >
                  {{ example.description }}
                </p>
                <div class="bg-gray-900 rounded-lg overflow-hidden">
                  <pre
                    class="p-4 text-gray-100 overflow-x-auto text-sm font-mono"
                  ><code>{{ example.code }}</code></pre>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Key features -->
            <div
              v-if="skill.features && skill.features.length"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
            >
              <h3 class="text-xl font-bold mb-4">Key Features</h3>
              <ul class="space-y-3">
                <li
                  v-for="(feature, i) in skill.features"
                  :key="i"
                  class="flex items-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-teal-500 mt-0.5 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Related technologies -->
            <div
              v-if="skill.relatedTech && skill.relatedTech.length"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
            >
              <h3 class="text-xl font-bold mb-4">Related Technologies</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="tech in skill.relatedTech"
                  :key="tech.id"
                  :to="`/skills/${tech.id}`"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
                >
                  {{ tech.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- Learning resources -->
            <div
              v-if="skill.resources && skill.resources.length"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 class="text-xl font-bold mb-4">Learning Resources</h3>
              <ul class="space-y-3">
                <li
                  v-for="(resource, i) in skill.resources"
                  :key="i"
                  class="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
                >
                  <a
                    :href="resource.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    <h4 class="font-medium">{{ resource.title }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ resource.type }}
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional pattern dots utility class */
.pattern-dots {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: calc(10 * 1px) calc(10 * 1px);
}

/* Code block styles */
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5;
  tab-size: 2;
}

code {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}
</style>
