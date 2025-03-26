<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getSkillById } from "~/data/skills";

const route = useRoute();
const router = useRouter();
const skillId = computed(() => route.params.id);
const skill = ref(null);
const isLoading = ref(true);
const error = ref(null);
const activeTab = ref('overview');
const isHeaderVisible = ref(true);
const lastScrollY = ref(0);

// Fetch the skill data
onMounted(async () => {
  try {
    isLoading.value = true;
    skill.value = getSkillById(skillId.value);
    
    if (!skill.value) {
      error.value = `Skill "${skillId.value}" not found`;
    }
  } catch (err) {
    error.value = err.message || 'An error occurred loading this skill';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
  
  // Set up scroll listener for header visibility
  window.addEventListener('scroll', handleScroll);
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Handle scroll for hiding/showing header
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isHeaderVisible.value = lastScrollY.value > currentScrollY || currentScrollY < 50;
  lastScrollY.value = currentScrollY;
};

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
    ? '1 year of experience' 
    : `${yearsOfExperience.value} years of experience`;
});

// Navigate back to skills page
const goBack = () => {
  router.back();
};

// Disable page transitions
definePageMeta({
  pageTransition: false
});
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-xl">Loading skill details...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center p-4">
      <div class="max-w-md text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{{ error }}</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">We couldn't find the skill information you're looking for.</p>
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
      <!-- Floating header that shows/hides on scroll -->
      <header 
        class="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
        :class="isHeaderVisible ? 'translate-y-0' : '-translate-y-full'"
      >
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div class="flex items-center">
            <button 
              @click="goBack" 
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-3"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div class="flex items-center">
              <i :class="['devicon text-2xl mr-2', skill.icon, 'colored']"></i>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ skill.name }}</h1>
            </div>
          </div>
          
          <!-- Navigation tabs -->
          <nav class="hidden md:flex space-x-6">
            <button 
              v-for="tab in ['overview', 'features', 'examples', 'resources']" 
              :key="tab"
              @click="activeTab = tab"
              class="px-1 py-2 text-sm font-medium transition-colors relative"
              :class="activeTab === tab ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
            >
              {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
              <span 
                v-if="activeTab === tab" 
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full"
              ></span>
            </button>
          </nav>
          
          <!-- CTA button -->
          <a 
            v-if="skill.url" 
            :href="skill.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hidden md:inline-flex items-center px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <span>Documentation</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </header>

      <!-- Hero section with Nuxt.js branding colors -->
      <div class="relative bg-gradient-to-br from-[#00DC82] to-[#002E3B] dark:from-[#00DC82] dark:to-[#002E3B] text-white">
        <div class="absolute inset-0 overflow-hidden">
          <!-- Nuxt.js-inspired pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-full h-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                  <pattern id="nuxt-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" stroke-width="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#nuxt-pattern)" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <!-- Icon and name -->
            <div class="text-center md:text-left max-w-3xl">
              <div class="inline-block bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-500">
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
              
              <div class="space-y-6">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ skill.name }}</h1>
                
                <!-- Experience level and years -->
                <div class="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6">
                  <span 
                    :class="[
                      'px-4 py-2 rounded-full text-sm font-medium flex items-center',
                      skill.level === 'Expert' ? 'bg-emerald-500 text-white' :
                      skill.level === 'Advanced' ? 'bg-blue-500 text-white' :
                      'bg-yellow-500 text-white'
                    ]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {{ skill.level || 'Intermediate' }} Level
                  </span>
                  <span v-if="experienceText" class="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    {{ experienceText }}
                  </span>
                </div>
                
                <p class="text-xl md:text-2xl mb-6 text-gray-100">{{ skill.description }}</p>
                
                <!-- CTA buttons -->
                <div class="flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    v-if="skill.url" 
                    :href="skill.url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="inline-flex items-center px-6 py-3 bg-white text-[#00DC82] hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium"
                  >
                    <span>Official Documentation</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  
                  <button 
                    @click="goBack" 
                    class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-lg font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Back to Skills</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Wave divider -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="fill-current text-white dark:text-gray-900">
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,218.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <!-- Mobile tabs navigation -->
      <div class="md:hidden sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md">
        <div class="flex overflow-x-auto scrollbar-hide">
          <button 
            v-for="tab in ['overview', 'features', 'examples', 'resources']" 
            :key="tab"
            @click="activeTab = tab"
            class="flex-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="activeTab === tab ? 'text-[#00DC82] dark:text-[#00DC82]' : 'text-gray-600 dark:text-gray-400'"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
            <span 
              v-if="activeTab === tab" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00DC82] rounded-full"
            ></span>
          </button>
        </div>
      </div>

      <!-- Main content area -->
      <div class="max-w-7xl mx-auto px-4 py-12">
        <!-- Overview Tab -->
        <div v-show="activeTab === 'overview'">
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">About {{ skill.name }}</h2>
            
            <div class="prose prose-lg max-w-none dark:prose-invert">
              <div v-for="(paragraph, i) in skill.details" :key="i" class="mb-6">
                <p class="leading-relaxed">{{ paragraph }}</p>
              </div>
            </div>
            
            <!-- Projects section if available -->
            <div v-if="skill.projects && skill.projects.length" class="mt-16">
              <h3 class="text-2xl font-bold mb-6">Projects Built With {{ skill.name }}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                  v-for="(project, i) in skill.projects" 
                  :key="i"
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div class="relative h-48 overflow-hidden">
                    <img 
                      v-if="project.image" 
                      :src="project.image" 
                      :alt="project.name" 
                      class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div v-else class="w-full h-full bg-gradient-to-br from-[#00DC82] to-[#002E3B] flex items-center justify-center">
                      <i :class="['devicon text-6xl text-white', skill.icon]"></i>
                    </div>
                  </div>
                  
                  <div class="p-6">
                    <h4 class="text-xl font-bold mb-2 group-hover:text-[#00DC82] transition-colors">{{ project.name }}</h4>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
                    
                    <a 
                      v-if="project.url" 
                      :href="project.url" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-[#00DC82] hover:text-[#00b36a] font-medium"
                    >
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Related technologies section -->
          <section v-if="skill.relatedTech && skill.relatedTech.length" class="mb-16">
            <h2 class="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Related Technologies</h2>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <NuxtLink 
                v-for="tech in skill.relatedTech" 
                :key="tech.id" 
                :to="`/skills/${tech.id}`"
                class="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center shadow hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <i :class="[`devicon-${tech.id}-plain colored`, 'text-4xl mb-2']"></i>
                <h3 class="font-medium">{{ tech.name }}</h3>
              </NuxtLink>
            </div>
          </section>
        </div>
        
        <!-- Features Tab -->
        <div v-show="activeTab === 'features'">
          <section>
            <h2 class="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Key Features</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div 
                v-for="(feature, i) in skill.features" 
                :key="i"
                class="flex items-start"
              >
                <div class="flex-shrink-0 mt-1">
                  <div class="w-8 h-8 rounded-full bg-[#00DC82]/10 flex items-center justify-center text-[#00DC82]">
                    <span class="font-bold">{{ i + 1 }}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-lg">{{ feature }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <!-- Code Examples Tab -->
        <div v-show="activeTab === 'examples'">
          <section>
            <h2 class="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Code Examples</h2>
            
            <div v-if="skill.examples && skill.examples.length">
              <div 
                v-for="(example, i) in skill.examples" 
                :key="i"
                class="mb-12"
              >
                <h3 class="text-2xl font-bold mb-3">{{ example.title }}</h3>
                <p v-if="example.description" class="mb-4 text-gray-600 dark:text-gray-400">{{ example.description }}</p>
                
                <div class="relative">
                  <div class="absolute top-0 right-0 p-2">
                    <button 
                      class="p-2 rounded bg-[#00DC82] text-white text-xs hover:bg-[#00b36a] transition-colors"
                      @click="navigator.clipboard.writeText(example.code)"
                    >
                      Copy
                    </button>
                  </div>
                  <div class="bg-gray-900 rounded-lg overflow-hidden">
                    <pre class="p-4 text-gray-100 overflow-x-auto text-sm"><code>{{ example.code }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 class="mt-4 text-xl font-medium text-gray-600 dark:text-gray-400">No code examples available</h3>
              <p class="mt-2 text-gray-500 dark:text-gray-500">Check the documentation for code samples</p>
            </div>
          </section>
        </div>
        
        <!-- Resources Tab -->
        <div v-show="activeTab === 'resources'">
          <section>
            <h2 class="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Learning Resources</h2>
            
            <div v-if="skill.resources && skill.resources.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a 
                v-for="(resource, i) in skill.resources" 
                :key="i"
                :href="resource.url"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-[#00DC82]/10 flex items-center justify-center">
                      <svg v-if="resource.type.includes('Doc')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#00DC82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <svg v-else-if="resource.type.includes('Course')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#00DC82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#00DC82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5
</rewritten_file> 