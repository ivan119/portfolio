<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="currentColor"
    fill="currentColor"
    viewBox="0 0 24 24"
    :class="[
      isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400',
      'transition-all duration-300'
    ]"
  >
    <!-- 2x2 grid of dots - dynamic positioning and size based on state -->
    <circle 
      :cx="isActive ? '6' : '8'" 
      :cy="isActive ? '6' : '8'" 
      :r="isActive ? '1.5' : '1'" 
      class="transition-all duration-300"
    />
    <circle 
      :cx="isActive ? '18' : '16'" 
      :cy="isActive ? '6' : '8'" 
      :r="isActive ? '1.5' : '1'" 
      class="transition-all duration-300"
    />
    <circle 
      :cx="isActive ? '6' : '8'" 
      :cy="isActive ? '18' : '16'" 
      :r="isActive ? '1.5' : '1'" 
      class="transition-all duration-300"
    />
    <circle 
      :cx="isActive ? '18' : '16'" 
      :cy="isActive ? '18' : '16'" 
      :r="isActive ? '1.5' : '1'" 
      class="transition-all duration-300"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  isActive?: boolean;
}

defineProps<Props>();
</script>
