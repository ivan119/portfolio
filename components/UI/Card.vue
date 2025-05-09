<script setup lang="ts">
interface Props {
  variant?: 'default' | 'skill' | 'project' | 'blog';
  hover?: boolean;
  gradient?: boolean;
  to?: string;
  href?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hover: true,
  gradient: true,
  loading: false
});

const cardClasses = computed(() => {
  const baseClasses = 'relative overflow-hidden transition-all duration-500 ease-in-out';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
    skill: 'flex flex-col items-center text-decoration-none',
    project: 'flex flex-col items-start text-left p-3',
    blog: 'flex flex-col space-y-4'
  };
  
  const hoverClasses = props.hover ? 'transform hover:-translate-y-1 hover:shadow-xl' : '';
  const gradientClasses = props.gradient ? 'border-2 border-transparent' : '';
  
  return `${baseClasses} ${variantClasses[props.variant]} ${hoverClasses} ${gradientClasses}`;
});

const cardStyle = computed(() => {
  if (!props.gradient) return {};
  
  return {
    background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #e2e8f0, #e2e8f0) border-box',
    borderRadius: '0.75rem'
  };
});

const hoverStyle = computed(() => {
  if (!props.gradient) return {};
  
  return {
    background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #4caf50) border-box',
    boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)'
  };
});
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : href ? 'a' : 'div'"
    :to="to"
    :href="href"
    :class="cardClasses"
    :style="cardStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div v-if="loading" class="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div class="h-full w-full flex items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-gray-400" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    </div>
    <slot v-else />
  </component>
</template>

<style>
@reference "tailwindcss";

/* Dark mode styles */
.dark .card {
  background: linear-gradient(#091a28, #091a28) padding-box,
              linear-gradient(45deg, #e2e8f0, #e2e8f0) border-box;
}

.dark .card:hover {
  background: linear-gradient(#091a28, #091a28) padding-box,
              linear-gradient(45deg, #2196f3, #4caf50) border-box;
  box-shadow: 0 0 15px rgba(33, 150, 243, 0.5);
}
</style> 