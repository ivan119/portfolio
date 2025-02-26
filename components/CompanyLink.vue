<template>
  <a
    :href="href"
    target="_blank"
    class="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    <NuxtImg
      v-if="logo"
      :src="logo"
      :alt="company"
      class="w-4 h-4 rounded-sm"
      format="webp"
      loading="lazy"
      :width="16"
      :height="16"
    />
    <span>{{ company }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  company: string
  logo?: string
}>()
</script>
