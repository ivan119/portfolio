<script setup>
import "devicon/devicon.min.css";
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

// View mode preferences (enhanced, row)
const viewMode = useStorage('skills-v2-view-mode', 'enhanced');

// Navigation
const router = useRouter();

// Skills data
const preferredSkills = [
  // Your preferred skills array
];

const experiencedSkills = [
  // Your experienced skills array
];

// Helper functions
const navigateToSkill = (skill) => {
  const slug = skill.id || skill.name.toLowerCase().replace(/\s+/g, '-');
  router.push(`/skills/${slug}`);
};

const getShortDescription = (skill) => {
  if (!skill.description) return '';
  return skill.description.length > 80 
    ? skill.description.substring(0, 80) + '...' 
    : skill.description;
};

// Disable page transitions
definePageMeta({
  pageTransition: false
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- View mode toggle -->
    <div class="flex justify-center mb-12">
      <div class="bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg inline-flex">
        <button 
          v-for="mode in ['enhanced', 'row']" 
          :key="mode"
          @click="viewMode = mode"
          :class="[
            'px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium flex items-center',
            viewMode === mode ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <!-- Mode-specific icons -->
          <svg v-if="mode === 'enhanced'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
        </button>
      </div>
    </div>

    <!-- Skills Sections -->
    <div>
      <!-- Preferred Tech Stack Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-6 flex items-center justify-center sm:justify-start">
          <span class="inline-block p-2 bg-teal-100 dark:bg-teal-900 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </span>
          Preferred Tech Stack
        </h2>
        
        <!-- Enhanced View Mode (Cards) -->
        <div v-if="viewMode === 'enhanced'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="skill in preferredSkills" 
            :key="skill.name"
            class="skill-card group relative bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-between text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full overflow-hidden dotted-background"
            @click="navigateToSkill(skill)"
          >
            <!-- Background effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Content -->
            <div class="flex flex-col items-center flex-grow relative z-10">
              <div class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                <i :class="['devicon text-5xl', skill.icon, 'colored']"></i>
              </div>
              <h3 class="text-lg font-bold mb-2">{{ skill.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ getShortDescription(skill) }}
              </p>
            </div>
            
            <!-- Learn more -->
            <div class="mt-4 relative z-10 w-full pt-3 border-t border-gray-100 dark:border-gray-700">
              <span class="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors flex items-center justify-center font-medium">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        <!-- Row Mode -->
        <div v-else class="flex flex-wrap gap-3">
          <div 
            v-for="skill in preferredSkills" 
            :key="skill.name"
            @click="navigateToSkill(skill)"
            class="group inline-flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer dotted-background"
          >
            <div class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3 group-hover:scale-105 transition-transform duration-300">
              <i :class="['devicon text-2xl', skill.icon, 'colored']"></i>
            </div>
            <div class="flex flex-col">
              <span class="font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{{ skill.name }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Click to view details</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Experienced With Section -->
      <section>
        <h2 class="text-3xl font-bold mb-6 flex items-center justify-center sm:justify-start">
          <span class="inline-block p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </span>
          Experienced With
        </h2>
        
        <!-- Enhanced View Mode -->
        <div v-if="viewMode === 'enhanced'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div 
            v-for="skill in experiencedSkills" 
            :key="skill.name"
            @click="navigateToSkill(skill)"
            class="skill-card-mini group relative bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-between text-center shadow hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div class="flex flex-col items-center">
              <div class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-2 group-hover:scale-110 transition-transform duration-300">
                <i :class="['devicon text-3xl', skill.icon, 'colored']"></i>
              </div>
              <h3 class="text-base font-bold group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{{ skill.name }}</h3>
            </div>
          </div>
        </div>
        
        <!-- Row Mode -->
        <div v-else class="flex flex-wrap gap-2">
          <div 
            v-for="skill in experiencedSkills" 
            :key="skill.name"
            @click="navigateToSkill(skill)"
            class="group inline-flex items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <i :class="['devicon text-xl mr-2', skill.icon, 'colored']"></i>
            <span class="text-sm font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{{ skill.name }}</span>
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
  min-height: 180px;
}

.skill-card-mini {
  backface-visibility: hidden;
  position: relative;
  min-height: 120px;
}

.skill-card:hover,
.skill-card-mini:hover {
  transform: translateY(-2px);
}

.skill-card:hover i,
.skill-card-mini:hover i {
  transform: scale(1.1);
}

i {
  transition: transform 0.3s ease;
}

/* Dotted background similar to the first h1 */
.dotted-background {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 10px 10px;
}

/* Fancy hover effect for the cards */
.skill-card::before,
.skill-card-mini::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.05) 0%, rgba(255,255,255,0) 70%);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.skill-card:hover::before,
.skill-card-mini:hover::before {
  opacity: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

@media (max-width: 640px) {
  .skill-card {
    min-height: 200px;
  }
  
  .skill-card-mini {
    min-height: 140px;
  }
}
</style> 