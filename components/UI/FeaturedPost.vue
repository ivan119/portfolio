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
  <NuxtLink
    :to="`blog/${post.id}`"
    @mouseover="doImageEffect = true"
    @mouseleave="doImageEffect = false"
    class="block"
  >
    <div
      class="relative p-4 md:p-8 transition-transform duration-500 hover:scale-[1.02]"
    >
      <!-- Dotted Background -->
      <div v-if="useBgDots" class="absolute inset-0 opacity-10">
        <div
          class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
        ></div>
      </div>

      <!-- Gradient Background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-blue-50/50 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent rounded-3xl -z-10"
      ></div>

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
              class="w-full h-full object-cover transform transition-transform duration-500"
              :class="{ 'scale-105': doImageEffect }"
              format="webp"
              loading="lazy"
              width="800"
              height="450"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent transition-opacity duration-300"
              :class="{
                'opacity-100': doImageEffect,
                'opacity-0': !doImageEffect,
              }"
            ></div>
          </div>
        </div>

        <!-- Right: Featured Post Content -->
        <div class="flex flex-col justify-center">
          <span class="text-teal-500 dark:text-teal-400 font-medium mb-4"
            >Latest Post</span
          >
          <h1
            class="heading-1 font-bold mb-3 pb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            :style="{ 'view-transition-name': `post-title-${post.id}` }"
          >
            {{ post.title }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg mb-6 line-clamp-3">
            {{ post.excerpt }}
          </p>
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold"
            >
              {{ post.author.charAt(0) }}
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                {{ post.author }}
              </div>
              <div class="text-sm text-gray-500">
                {{ formatDate(post.date) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Add transition for smooth hover effects */
.transform {
  transition: transform 0.5s ease;
}
</style>
