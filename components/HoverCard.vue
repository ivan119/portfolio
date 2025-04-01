<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  showCategory: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: ''
  },
  style: {
    type: String,
    default: 'v1',
    validator: (value: string) => ['v1', 'v2', 'v3'].includes(value)
  }
});
</script>

<template>
  <!-- Style v1: Original with gradient and glow -->
  <div
    v-if="style === 'v1'"
    class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
  >
    <!-- Background gradient effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-50 dark:to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <!-- Shimmer effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
    
    <!-- Content slot -->
    <div class="relative p-6">
      <slot></slot>
    </div>

    <!-- Category badge -->
    <div v-if="showCategory && category" class="absolute top-4 right-4">
      <span class="px-2 py-1 text-xs font-medium rounded-full bg-[var(--main-gradient-from)]/10 text-[var(--main-gradient-from)] dark:bg-[var(--main-gradient-from)]/20 dark:text-[var(--main-gradient-from)]">
        {{ category }}
      </span>
    </div>
  </div>

  <!-- Style v2: Modern with border and category ribbon -->
  <div
    v-else-if="style === 'v2'"
    class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    :class="[
      size === 'lg' ? 'min-h-[300px]' : 'min-h-[200px]',
      showCategory ? 'pt-8' : ''
    ]"
  >
    <!-- Gradient Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :class="[
        category === 'Frontend' ? 'group-hover:from-blue-50 group-hover:to-blue-100/50 dark:group-hover:from-blue-950/50 dark:group-hover:to-blue-900/50' :
        category === 'Backend' ? 'group-hover:from-green-50 group-hover:to-green-100/50 dark:group-hover:from-green-950/50 dark:group-hover:to-green-900/50' :
        category === 'Database' ? 'group-hover:from-purple-50 group-hover:to-purple-100/50 dark:group-hover:from-purple-950/50 dark:group-hover:to-purple-900/50' :
        category === 'DevOps' ? 'group-hover:from-orange-50 group-hover:to-orange-100/50 dark:group-hover:from-orange-950/50 dark:group-hover:to-orange-900/50' :
        category === 'Mobile' ? 'group-hover:from-pink-50 group-hover:to-pink-100/50 dark:group-hover:from-pink-950/50 dark:group-hover:to-pink-900/50' :
        category === 'Design' ? 'group-hover:from-yellow-50 group-hover:to-yellow-100/50 dark:group-hover:from-yellow-950/50 dark:group-hover:to-yellow-900/50' :
        category === 'Testing' ? 'group-hover:from-red-50 group-hover:to-red-100/50 dark:group-hover:from-red-950/50 dark:group-hover:to-red-900/50' :
        'group-hover:from-gray-50 group-hover:to-gray-100/50 dark:group-hover:from-gray-950/50 dark:group-hover:to-gray-900/50'
      ]"
    ></div>

    <!-- Shimmer Effect -->
    <div
      class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-white/10"
    ></div>

    <!-- Category Badge -->
    <div
      v-if="showCategory && category"
      class="absolute -right-12 top-6 rotate-45 transform bg-gray-100 px-12 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
      :class="[
        category === 'Frontend' ? 'group-hover:bg-blue-100 group-hover:text-blue-800 dark:group-hover:bg-blue-900 dark:group-hover:text-blue-200' :
        category === 'Backend' ? 'group-hover:bg-green-100 group-hover:text-green-800 dark:group-hover:bg-green-900 dark:group-hover:text-green-200' :
        category === 'Database' ? 'group-hover:bg-purple-100 group-hover:text-purple-800 dark:group-hover:bg-purple-900 dark:group-hover:text-purple-200' :
        category === 'DevOps' ? 'group-hover:bg-orange-100 group-hover:text-orange-800 dark:group-hover:bg-orange-900 dark:group-hover:text-orange-200' :
        category === 'Mobile' ? 'group-hover:bg-pink-100 group-hover:text-pink-800 dark:group-hover:bg-pink-900 dark:group-hover:text-pink-200' :
        category === 'Design' ? 'group-hover:bg-yellow-100 group-hover:text-yellow-800 dark:group-hover:bg-yellow-900 dark:group-hover:text-yellow-200' :
        category === 'Testing' ? 'group-hover:bg-red-100 group-hover:text-red-800 dark:group-hover:bg-red-900 dark:group-hover:text-red-200' :
        'group-hover:bg-gray-100 group-hover:text-gray-800 dark:group-hover:bg-gray-900 dark:group-hover:text-gray-200'
      ]"
    >
      {{ category }}
    </div>

    <!-- Content -->
    <div class="relative">
      <slot></slot>
    </div>
  </div>

  <!-- Style v3: Minimal with icon focus -->
  <div
    v-else
    class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
  >
    <!-- Content -->
    <div class="relative flex flex-col items-center text-center">
      <slot></slot>
    </div>

    <!-- Category badge -->
    <div v-if="showCategory && category" class="absolute bottom-4 right-4">
      <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {{ category }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

:deep(.group-hover\:text-main-gradient) {
  @apply transition-colors duration-300;
}

:deep(.group:hover .group-hover\:text-main-gradient) {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}
</style> 