<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Insert Title Here",
  },
  description: {
    type: String,
    required: true,
    default: "Insert Description Here",
  },
});
</script>

<template>
  <section class="relative">
    <div
      class="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-blue-50/50 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent rounded-3xl -z-10"
    ></div>
    <!-- Light dots pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
      ></div>
    </div>
    <h1
      class="heading-1 font-bold bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-4"
    >
      {{ title }}
    </h1>
    <p class="text-lg">{{ description }}</p>
  </section>
</template>
