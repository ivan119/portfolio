<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    index?: number;
  }>(),
  { label: "", index: 0 }
);

const baseClass =
  "inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border";

// Static variants to avoid Tailwind purging; includes your darkIndigoBackground utility
const variants: string[] = [
  // emerald
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60",
  // indigo (matches app/assets/css/themes.css .darkIndigoBackground)
  "darkIndigoBackground",
  // blue
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60",
  // amber
  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60",
  // rose
  "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/60",
  // violet
  "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/60",
  // teal
  "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/60",
  // fuchsia
  "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 border-fuchsia-200/60 dark:border-fuchsia-800/60",
];

const resolvedClass = computed(() => {
  const idx = Number(props.index ?? 0);
  const variant = variants[idx % variants.length] ?? variants[0];
  return [baseClass, variant];
});
</script>

<template>
  <span :class="resolvedClass">
    <slot>{{ props.label }}</slot>
  </span>
  
</template>

<style scoped></style>


