<script setup lang="ts">
interface Tag {
  name: string;
  icon: string;
}

interface Skill {
  title: string;
  description: string;
  link: string;
  tags: Tag[];
  categories: string[];
  proficiency?: string;
  experience?: string;
}

const props = defineProps<{
  skill: Skill;
  colored?: boolean;
}>();

// Type for tech colors mapping
type TechColorMap = {
  [key: string]: string;
};

// Type for category colors mapping
type CategoryColorMap = {
  [key: string]: string[];
};

// Type for proficiency colors mapping
type ProficiencyColorMap = {
  [key: string]: string;
};

// Tech icon color mapping based on devicon brand colors
const getTechColor = (iconClass: string) => {
  const techColors: TechColorMap = {
    // Programming Languages
    'devicon-javascript': '#F7DF1E',
    'devicon-typescript': '#3178C6',
    'devicon-python': '#3776AB',
    'devicon-java': '#EA2D2E',
    'devicon-csharp': '#239120',
    'devicon-cplusplus': '#00599C',
    'devicon-php': '#777BB4',
    'devicon-ruby': '#CC342D',
    'devicon-go': '#00ADD8',
    'devicon-rust': '#000000',
    'devicon-kotlin': '#7F52FF',
    'devicon-swift': '#FA7343',
    'devicon-dart': '#0175C2',
    
    // Frontend Frameworks and Libraries
    'devicon-react': '#61DAFB',
    'devicon-vuejs': '#4FC08D',
    'devicon-angular': '#DD0031',
    'devicon-svelte': '#FF3E00',
    'devicon-nuxtjs': '#00DC82',
    'devicon-nextjs': '#000000',
    'devicon-jquery': '#0769AD',
    'devicon-tailwindcss': '#38B2AC',
    'devicon-bootstrap': '#7952B3',
    'devicon-sass': '#CC6699',
    'devicon-less': '#1D365D',
    'devicon-css3': '#1572B6',
    'devicon-html5': '#E34F26',
    
    // Backend and Frameworks
    'devicon-nodejs': '#339933',
    'devicon-express': '#000000',
    'devicon-nestjs': '#E0234E',
    'devicon-spring': '#6DB33F',
    'devicon-django': '#092E20',
    'devicon-flask': '#000000',
    'devicon-laravel': '#FF2D20',
    'devicon-rails': '#CC0000',
    'devicon-dotnetcore': '#512BD4',
    
    // Databases
    'devicon-mongodb': '#47A248',
    'devicon-mysql': '#4479A1',
    'devicon-postgresql': '#336791',
    'devicon-sqlite': '#003B57',
    'devicon-redis': '#DC382D',
    'devicon-oracle': '#F80000',
    'devicon-firebase': '#FFCA28',
    
    // DevOps and Tools
    'devicon-git': '#F05032',
    'devicon-github': '#181717',
    'devicon-gitlab': '#FCA121',
    'devicon-docker': '#2496ED',
    'devicon-kubernetes': '#326CE5',
    'devicon-jenkins': '#D24939',
    'devicon-azure': '#0089D6',
    'devicon-aws': '#232F3E',
    'devicon-googlecloud': '#4285F4',
    'devicon-heroku': '#430098',
    'devicon-nginx': '#269539',
    'devicon-apache': '#D22128',
    
    // Mobile
    'devicon-android': '#3DDC84',
    'devicon-ios': '#000000',
    'devicon-flutter': '#02569B',
    'devicon-reactnative': '#61DAFB',
    'devicon-xamarin': '#3498DB',
    
    // Others
    'devicon-figma': '#F24E1E',
    'devicon-photoshop': '#31A8FF',
    'devicon-illustrator': '#FF9A00',
    'devicon-xd': '#FF61F6',
    'devicon-sketch': '#F7B500',
    'devicon-vscode': '#007ACC',
    'devicon-intellij': '#000000',
    'devicon-webstorm': '#00ACC1',
    'devicon-vim': '#019733',
    'devicon-webpack': '#8DD6F9',
    'devicon-babel': '#F9DC3E',
    'devicon-electron': '#47848F',
    'devicon-graphql': '#E10098',
    'devicon-wordpress': '#21759B',
    'devicon-linux': '#FCC624',
    'devicon-bash': '#4EAA25'
  };

  // Extract the base name of the icon from classes like "devicon-react plain" or "devicon-react"
  const baseIconClass = iconClass.split(' ')[0];
  
  return techColors[baseIconClass] || getCategoryColor(props.skill.categories);
};

// Function to get icon classes with colored option
const getIconClasses = (icon: string) => {
  // Base class always included
  const classes = [icon, 'text-2xl transition-all duration-500 group-hover:text-4xl'];
  
  // If colored prop is true, add 'colored' class instead of using custom colors
  if (props.colored) {
    classes.push('colored');
  }
  
  return classes;
};

const getCategoryColor = (categories: string[]) => {
  if (categories.includes('Frontend')) return '#3B82F6';
  if (categories.includes('Backend')) return '#10B981';
  if (categories.includes('Full Stack')) return '#6366F1';
  if (categories.includes('language')) return '#F59E0B';
  if (categories.includes('database')) return '#EC4899';
  if (categories.includes('framework')) return '#8B5CF6';
  if (categories.includes('mobile')) return '#06B6D4';
  if (categories.includes('design')) return '#F43F5E';
  if (categories.includes('tools')) return '#9333EA';
  return '#6B7280';
};

const getGradientColors = (categories: string[]) => {
  const baseColor = getCategoryColor(categories);
  const colors: CategoryColorMap = {
    'Frontend': ['#3B82F6', '#60A5FA'],
    'Backend': ['#10B981', '#34D399'],
    'Full Stack': ['#6366F1', '#818CF8'],
    'language': ['#F59E0B', '#FBBF24'],
    'database': ['#EC4899', '#F472B6'],
    'framework': ['#8B5CF6', '#A78BFA'],
    'mobile': ['#06B6D4', '#22D3EE'],
    'design': ['#F43F5E', '#FB7185'],
    'tools': ['#9333EA', '#A855F7'],
    'default': ['#6B7280', '#9CA3AF']
  };

  const category = categories[0]?.toLowerCase() || 'default';
  return colors[category as keyof typeof colors] || colors.default;
};

const getProficiencyColor = (proficiency?: string) => {
  if (!proficiency) return '';
  const colors: ProficiencyColorMap = {
    'Expert': 'text-emerald-500',
    'Advanced': 'text-blue-500',
    'Intermediate': 'text-yellow-500',
    'Beginner': 'text-gray-500'
  };
  return colors[proficiency as keyof typeof colors] || colors['Intermediate'];
};

// Function to get tech icon color with fallback
const getIconColor = (tag: Tag) => {
  return getTechColor(tag.icon);
};
</script>

<template>
  <article
    class="skill-card relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    :style="{
      '--category-color': getCategoryColor(skill.categories),
      '--gradient-from': getGradientColors(skill.categories)[0],
      '--gradient-to': getGradientColors(skill.categories)[1]
    }"
  >
    <NuxtLink
      :to="skill.link"
      target="_blank"
      class="relative flex flex-col h-full"
    >
      <!-- Category Badge -->
      <div class="absolute top-2 right-2 z-10">
        <span
          class="px-2 py-0.5 text-xs font-medium rounded-full backdrop-blur-sm"
          :style="{
            background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
            color: 'white',
            boxShadow: `0 2px 4px ${getCategoryColor(skill.categories)}40`
          }"
        >
          {{ skill.categories[0] }}
        </span>
      </div>

      <!-- Icon Container with 3D Effect - Use Tech Original Color or colored class -->
      <div class="relative p-3 perspective-1000">
        <div 
          class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :style="{
            background: !colored && skill.tags[0] ? 
              `linear-gradient(135deg, ${getIconColor(skill.tags[0])}20, transparent)` : 
              `linear-gradient(135deg, ${getCategoryColor(skill.categories)}20, transparent)`
          }"
        ></div>
        <div class="icon-container transform-gpu transition-transform duration-300 group-hover:rotate-y-12">
          <i 
            v-if="skill.tags[0]?.icon"
            :class="getIconClasses(skill.tags[0].icon)"
            :style="colored ? {} : {
              color: getIconColor(skill.tags[0]),
              textShadow: `0 2px 4px ${getIconColor(skill.tags[0])}30`
            }"
            class="tech-icon"
          ></i>
        </div>
      </div>

      <!-- Title with Proficiency - Modified to use original tech colors or follow design theme -->
      <div class="px-3 mb-1">
        <h2 
          class="text-base font-semibold text-gray-900 dark:text-white transition-all duration-300 group-hover:translate-x-1"
          :style="colored ? {} : {
            color: skill.tags[0] ? getIconColor(skill.tags[0]) : 'inherit'
          }"
        >
          {{ skill.title }}
        </h2>
        <div class="flex items-center gap-2 mt-1">
          <span 
            v-if="skill.proficiency"
            :class="['text-xs font-medium', getProficiencyColor(skill.proficiency)]"
          >
            {{ skill.proficiency }}
          </span>
          <span 
            v-if="skill.experience"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            {{ skill.experience }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-xs text-gray-600 dark:text-gray-400 px-3 mb-2 flex-grow leading-relaxed line-clamp-2 overflow-hidden">
        {{ skill.description }}
      </p>

      <!-- Tech Stack with Tech Original Colors or themed colors -->
      <div class="flex flex-wrap gap-1 px-2 pb-2">
        <span
          v-for="tag in skill.tags"
          :key="tag.name"
          class="inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded transition-all duration-300 group-hover:scale-105"
          :style="colored ? {
            background: `${getCategoryColor(skill.categories)}15`,
            color: getCategoryColor(skill.categories),
            border: `1px solid ${getCategoryColor(skill.categories)}30`,
            boxShadow: `0 1px 2px ${getCategoryColor(skill.categories)}20`
          } : {
            background: `${getIconColor(tag)}15`,
            color: getIconColor(tag),
            border: `1px solid ${getIconColor(tag)}30`,
            boxShadow: `0 1px 2px ${getIconColor(tag)}20`
          }"
        >
          <i 
            :class="[tag.icon, colored ? 'colored text-xs' : 'text-xs']" 
            :style="colored ? {} : { color: getIconColor(tag) }"
          ></i>
          {{ tag.name }}
        </span>
      </div>

      <!-- Hover Indicator with Tech Color or themed colors -->
      <div 
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="{
          background: !colored && skill.tags[0] ? 
            `linear-gradient(to right, transparent, ${getIconColor(skill.tags[0])}, transparent)` :
            'linear-gradient(to right, transparent, var(--gradient-from), transparent)'
        }"
      ></div>

      <!-- Shine Effect -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="shine"></div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.skill-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1));
  transform-style: preserve-3d;
  height: 220px; /* Reduced height for better fit */
  z-index: 1;
}

.dark .skill-card {
  background: linear-gradient(to bottom, rgba(31,41,55,0.5), rgba(31,41,55,0.1));
  border-color: rgba(255, 255, 255, 0.05);
}

.skill-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dark .skill-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Adjust floating animation to maintain fixed height */
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
  }
}

/* Disable card animation to prevent movement affecting layout */
.skill-card:hover {
  animation: none;
}

.skill-card[data-proficiency="Expert"]:hover {
  animation: none;
}

/* Add a container to prevent overflow and keep cards at fixed positions */
.icon-container {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  height: 40px; /* Reduced height for icon container */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Add glow effect on hover */
.skill-card:hover::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(45deg, var(--gradient-from), var(--gradient-to));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.5;
}

/* Add shine effect */
.shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: rotate(30deg);
  transition: transform 0.6s ease;
  opacity: 0;
}

.group:hover .shine {
  transform: rotate(30deg) translateX(100%);
  opacity: 1;
}

/* Add pulse animation for expert level skills */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.skill-card[data-proficiency="Expert"]:hover {
  animation: pulse 2s infinite;
}

/* 3D Effect */
.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

/* Glass Effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Logo animations */
.tech-icon {
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.369s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

/* Give all icons a subtle grow pulse effect */
.group:hover .tech-icon {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

/* Animation keyframes */
@keyframes gentle-pulse {
  0% { 
    transform: scale(1); 
    filter: drop-shadow(0 0 2px currentColor);
  }
  100% { 
    transform: scale(1.1); 
    filter: drop-shadow(0 0 8px currentColor);
  }
}

/* Remove all other specific icon animations */
/* Different animation for different icon types */
.group:hover .tech-icon.devicon-javascript-plain,
.group:hover .tech-icon.devicon-typescript-plain,
.group:hover .tech-icon.devicon-python-plain,
.group:hover .tech-icon.devicon-php-plain,
.group:hover .tech-icon.devicon-ruby-plain,
.group:hover .tech-icon.devicon-java-plain,
.group:hover .tech-icon.devicon-csharp-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

/* Vue and Nuxt get unique wave animation instead of rotation */
.group:hover .tech-icon.devicon-vuejs-plain,
.group:hover .tech-icon.devicon-nuxtjs-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-react-plain,
.group:hover .tech-icon.devicon-angular-plain,
.group:hover .tech-icon.devicon-nextjs-plain,
.group:hover .tech-icon.devicon-svelte-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-docker-plain,
.group:hover .tech-icon.devicon-kubernetes-plain,
.group:hover .tech-icon.devicon-amazonwebservices-plain,
.group:hover .tech-icon.devicon-googlecloud-plain,
.group:hover .tech-icon.devicon-azure-plain,
.group:hover .tech-icon.devicon-firebase-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-html5-plain,
.group:hover .tech-icon.devicon-css3-plain,
.group:hover .tech-icon.devicon-sass-plain,
.group:hover .tech-icon.devicon-less-plain,
.group:hover .tech-icon.devicon-tailwindcss-plain,
.group:hover .tech-icon.devicon-bootstrap-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-git-plain,
.group:hover .tech-icon.devicon-github-plain,
.group:hover .tech-icon.devicon-gitlab-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-mongodb-plain,
.group:hover .tech-icon.devicon-mysql-plain,
.group:hover .tech-icon.devicon-postgresql-plain,
.group:hover .tech-icon.devicon-sqlite-plain,
.group:hover .tech-icon.devicon-redis-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-figma-plain,
.group:hover .tech-icon.devicon-xd-plain,
.group:hover .tech-icon.devicon-photoshop-plain,
.group:hover .tech-icon.devicon-illustrator-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}

.group:hover .tech-icon.devicon-vscode-plain,
.group:hover .tech-icon.devicon-webstorm-plain,
.group:hover .tech-icon.devicon-intellij-plain,
.group:hover .tech-icon.devicon-vim-plain {
  animation: gentle-pulse 0.369s ease-in-out infinite alternate;
}
</style> 