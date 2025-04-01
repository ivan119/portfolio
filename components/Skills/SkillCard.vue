<script setup lang="ts">
import { type PropType, computed, ref, onMounted } from "vue";
interface Skill {
  id?: string;
  name: string;
  icon: string;
  url: string;
  category?: string;
  proficiency?: string;
}

const props = defineProps({
  skill: {
    type: Object as PropType<Skill>,
    required: true,
    default: "",
  },
  variant: {
    type: String,
    default: "default", // 'default' or 'compact'
  },
  showCategory: {
    type: Boolean,
    default: false
  },
  showProficiency: {
    type: Boolean,
    default: false
  }
});

// Generate category color
const categoryColor = computed(() => {
  if (!props.skill.category) return '';
  
  const colors: Record<string, string> = {
    'frontend': 'bg-teal-500',
    'backend': 'bg-blue-500',
    'database': 'bg-amber-500',
    'design': 'bg-purple-500',
    'mobile': 'bg-emerald-500',
    'framework': 'bg-indigo-500',
    'language': 'bg-red-500',
    'tool': 'bg-gray-500'
  };
  
  const category = props.skill.category.toLowerCase();
  return colors[category] || 'bg-gray-500';
});

// Generate proficiency badge class
const proficiencyBadge = computed(() => {
  if (!props.skill.proficiency) return '';
  
  const badges: Record<string, string> = {
    'expert': 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900',
    'advanced': 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white',
    'intermediate': 'bg-gradient-to-r from-sky-400 to-blue-500 text-white',
    'beginner': 'bg-gradient-to-r from-slate-400 to-gray-500 text-white'
  };
  
  const proficiency = props.skill.proficiency.toLowerCase();
  return badges[proficiency] || 'bg-gray-500';
});

const emit = defineEmits(['click']);

// Generate a CSS variable name for view transitions
const transitionName = computed(() => {
  const skillId = props.skill.id || props.skill.name.toLowerCase().replace(/\s+/g, '-');
  return `--skill-transition-name: skill-${skillId}`;
});

// 3D tilt effect
const cardRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const tiltStyle = ref({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
});

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || !isHovering.value) return;
  
  const card = cardRef.value;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  tiltStyle.value.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  tiltStyle.value.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
};

const handleClick = () => {
  emit('click', props.skill);
};
</script>

<template>
  <div 
    ref="cardRef"
    class="skill-card"
    :class="[variant === 'compact' ? 'compact' : 'default']" 
    :style="[transitionName, isHovering ? tiltStyle : {}]"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div v-if="showCategory && skill.category" :class="['category-badge', categoryColor]">
      {{ skill.category }}
    </div>
    
    <div v-if="showProficiency && skill.proficiency" :class="['proficiency-badge', proficiencyBadge]">
      {{ skill.proficiency }}
    </div>
    
    <div class="skill-content">
      <div class="skill-icon-container">
        <i :class="['devicon', skill.icon, 'colored']"></i>
        <div class="icon-glow"></div>
      </div>
      <h2 class="heading-6">{{ skill.name }}</h2>
      
      <div class="learn-more" @click.stop>
        <a :href="skill.url" target="_blank" rel="noopener noreferrer">
          Learn more
        </a>
      </div>
      
      <div class="card-shine"></div>
    </div>
  </div>
</template>

<style scoped>
.category-badge {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 0 0.5rem 0 0.5rem;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
}

.skill-card.compact .category-badge {
  font-size: 0.5rem;
  padding: 1px 4px;
}

.proficiency-badge {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 0.5rem 0 0.5rem 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
}

.skill-card.compact .proficiency-badge {
  font-size: 0.5rem;
  padding: 1px 4px;
}

.skill-card {
  position: relative;
  view-transition-name: var(--skill-transition-name, none);
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: white;
  padding: 1.5rem;
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(4px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:root.dark .skill-card {
  background-color: rgb(31, 41, 55); /* dark mode background */
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skill-card.compact {
  padding: 0.75rem;
  min-height: 110px;
  border-radius: 0.5rem;
  transform-origin: center;
}

.skill-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.skill-card.default:hover {
  border-color: rgba(13, 148, 136, 0.3);
}

.skill-card:hover::before {
  opacity: 1;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, rgba(13, 148, 136, 0.2), rgba(37, 99, 235, 0.2));
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
}

/* Add a pulsing dot for expert/advanced skills */
.skill-card .skill-icon-container::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #0d9488;
  bottom: -2px;
  right: -2px;
  opacity: 0;
  transition: all 0.5s ease;
}

.skill-card:hover .skill-icon-container::after {
  opacity: 1;
  animation: pulse-dot 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

@keyframes pulse-dot {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0.8);
  }
}

.skill-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.skill-icon-container {
  position: relative;
  margin-bottom: 0.75rem;
  transform-style: preserve-3d;
  transform: translateZ(20px);
}

.skill-card i {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.skill-card.compact i {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.skill-card:hover i {
  transform: scale(1.2);
}

.icon-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.4) 0%, transparent 70%);
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: scale(0.5);
  z-index: 1;
}

.skill-card.compact .icon-glow {
  transform: scale(0.4);
}

.skill-card:hover .icon-glow {
  opacity: 0.8;
  transform: scale(1.2);
}

.skill-card h2 {
  font-weight: bold;
  font-size: 1.125rem;
  margin-top: 0.25rem;
  transition: transform 0.3s ease, color 0.3s ease;
  transform-style: preserve-3d;
  transform: translateZ(15px);
}

.skill-card.compact h2 {
  font-size: 0.875rem;
  margin-top: 0.125rem;
}

.skill-card:hover h2 {
  transform: translateZ(15px) scale(1.05);
  background: linear-gradient(to right, #0d9488, #2563eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.learn-more {
  margin-top: auto;
  font-size: 0.875rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.skill-card:hover .learn-more {
  opacity: 1;
  transform: translateY(0);
}

.learn-more a {
  color: #0d9488;
  text-decoration: none;
  font-weight: 500;
}

.learn-more a:hover {
  text-decoration: underline;
}

.card-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 3;
}

.skill-card:hover .card-shine {
  opacity: 1;
}
</style>
