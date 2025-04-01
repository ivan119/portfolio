<template>
  <div 
    class="skill-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 relative overflow-hidden"
    :data-proficiency="skill.proficiency"
  >
    <!-- Card Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center">
        <i :class="[skill.icon, skill.color || 'text-gray-700 dark:text-gray-300', 'text-2xl']"></i>
        <h3 class="text-lg font-semibold ml-2 text-gray-900 dark:text-white">{{ skill.name }}</h3>
      </div>
      <div v-if="showProficiency" class="flex items-center">
        <span 
          class="text-xs px-2 py-1 rounded-full font-medium"
          :class="{
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300': skill.proficiency === 'Expert',
            'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300': skill.proficiency === 'Advanced',
            'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300': skill.proficiency === 'Intermediate'
          }"
        >
          {{ skill.proficiency }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
      {{ skill.description }}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between mt-auto">
      <div v-if="showCategory" class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
        {{ skill.category.charAt(0).toUpperCase() + skill.category.slice(1) }}
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        {{ skill.experience }}
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 dark:from-gray-800/0 dark:via-gray-800/0 dark:to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
</template>

<script setup>
defineProps({
  skill: {
    type: Object,
    required: true
  },
  showCategory: {
    type: Boolean,
    default: false
  },
  showProficiency: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default'
  }
});
</script>

<style scoped>
.skill-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}

/* Compact variant */
.skill-card[data-variant="compact"] {
  padding: 0.75rem;
}

.skill-card[data-variant="compact"] h3 {
  font-size: 0.875rem;
}

.skill-card[data-variant="compact"] i {
  font-size: 1.25rem;
}

/* Proficiency-based glow effects */
.skill-card[data-proficiency="Expert"]::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card[data-proficiency="Advanced"]::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover::before {
  opacity: 1;
}
</style> 