<script setup lang="ts">
interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  coverImage?: string;
  content: any[];
}

const props = defineProps<{
  post: Post;
  showBgDots?: boolean;
  isOddIndex?: boolean;
}>();

const doImageEffect = ref(false);

// Format date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <NuxtLink
    :to="`/blog/${post.id}`"
    @mouseover="doImageEffect = true"
    @mouseleave="doImageEffect = false"
    class="block group lg:min-h-[12rem]"
  >
    <article class="post-card">
      <!-- Dotted Background -->
      <div v-if="showBgDots" class="absolute inset-0 opacity-10">
        <div
          class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
        ></div>
      </div>

      <!-- Shine Effect -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="shine"></div>
      </div>

      <div
        :class="{ 'lg:flex-row-reverse': isOddIndex }"
        class="lg:flex h-full"
      >
        <!-- Image Container -->
        <div class="lg:w-1/2 relative aspect-video overflow-hidden">
          <NuxtImg
            :src="post?.coverImage || '/seo/IvanKelavaBlog1200x627.webp'"
            :alt="post.title"
            :style="{ 'view-transition-name': `post-image-${post.id}` }"
            class="w-full h-full object-cover transform transition-transform duration-500"
            :class="{ 'scale-105': doImageEffect }"
            format="webp"
            loading="eager"
            fetchpriority="high"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent transition-opacity duration-300"
            :class="{
              'opacity-100': doImageEffect,
              'opacity-0': !doImageEffect,
            }"
          ></div>
        </div>

        <!-- Content -->
        <div class="p-6 lg:flex lg:flex-col lg:w-1/2">
          <h3
            class="heading-3 font-bold mb-2 text-main-gradient flex-grow"
            :style="{ 'view-transition-name': `post-title-${post.id}` }"
          >
            {{ post.title }}
          </h3>
          <div>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {{ post.excerpt }}
            </p>
            <UISignatureLogo
              :author="post.author"
              :date="post.date"
              size="sm"
            />
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
