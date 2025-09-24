<script setup lang="ts">
interface Props {
  author: string;
  date: string;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm",
});

// Format date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Size classes
const sizeClasses = {
  sm: {
    container: "gap-3",
    avatar: "w-8 h-8 text-sm",
    name: "text-sm",
    date: "text-xs",
  },
  md: {
    container: "gap-4",
    avatar: "w-10 h-10 text-base",
    name: "text-base",
    date: "text-sm",
  },
  lg: {
    container: "gap-5",
    avatar: "w-12 h-12 text-lg",
    name: "text-lg",
    date: "text-base",
  },
};
</script>

<template>
  <div class="flex items-center" :class="sizeClasses[size].container">
    <NuxtImg
      class="rounded-full"
      :class="sizeClasses[size].avatar"
      :src="'/favicon-48x48.png'"
      loading="eager"
      fetchpriority="high"
      :alt="author"
    />
    <div>
      <div
        class="font-medium text-gray-900 dark:text-white"
        :class="sizeClasses[size].name"
      >
        {{ author }}
      </div>
      <div class="text-gray-500" :class="sizeClasses[size].date">
        {{ formatDate(date) }}
      </div>
    </div>
  </div>
</template>
