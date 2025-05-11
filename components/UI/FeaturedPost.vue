<script setup lang="ts">
interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const props = defineProps<{
  post: Post;
  imageUrl: string;
  useBgDots?: boolean;
}>();

// Format date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const doImageEffect = ref(false);
</script>

<template>
  <NuxtLink :to="`blog/${post.id}`" class="block group">
    <div
      class="relative p-4 md:p-8 transition-transform duration-500 hover:scale-[1.02] rounded-3xl"
    >
      <!-- Dotted Background -->
      <div v-if="useBgDots" class="absolute inset-0 opacity-10 rounded-3xl">
        <div
          class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] rounded-3xl"
        ></div>
      </div>

      <!-- Gradient Background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-blue-50/50 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent rounded-3xl -z-10"
      ></div>

      <!-- Shine Effect -->
      <div class="absolute inset-0 overflow-hidden rounded-3xl">
        <div class="shine"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 relative">
        <!-- Left: Featured Image -->
        <div class="relative">
          <div class="relative aspect-video overflow-hidden rounded-2xl">
            <NuxtImg
              :src="imageUrl"
              :alt="post.title"
              :style="{
                'view-transition-name': `post-image-${post.id}`,
              }"
              class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              format="webp"
              loading="lazy"
              width="800"
              height="450"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </div>

        <!-- Right: Featured Post Content -->
        <div class="flex flex-col justify-center">
          <span class="text-teal-500 dark:text-teal-400 font-medium mb-4"
            >Latest Post</span
          >
          <h1
            class="heading-1 font-bold mb-3 pb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-teal-500 group-hover:to-blue-500 dark:group-hover:from-teal-400 dark:group-hover:to-blue-400 transition-all duration-300"
            :style="{ 'view-transition-name': `post-title-${post.id}` }"
          >
            {{ post.title }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg mb-6 line-clamp-3">
            {{ post.excerpt }}
          </p>
          <UISignatureLogo :author="post.author" :date="post.date" size="md" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Shine effect */
.shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: rotate(30deg);
  transition:
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s;
  opacity: 0;
  pointer-events: none;
}

.group:hover .shine {
  transform: rotate(30deg) translateX(50%);
  opacity: 1;
}

/* Remove the gradient border effect since we don't want it */
</style>
