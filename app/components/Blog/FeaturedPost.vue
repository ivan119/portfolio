<script setup lang="ts">
interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  coverImage?: string; // 👈 include this since you’re now storing image URLs
}

const props = withDefaults(
  defineProps<{
    post: Post;
    imageUrl: string;
    useBgDots?: boolean;
    loading?: boolean;
  }>(),
  {
    useBgDots: false,
    loading: false,
  },
);

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
  <NuxtLink :to="`/blog/${post.id}`" class="group featured-link">
    <div class="featured-container">
      <!-- Dotted Background -->
      <div v-if="useBgDots" class="featured-dots">
        <div class="featured-dots-inner"></div>
      </div>

      <!-- Gradient Background -->
      <div class="featured-gradient"></div>

      <!-- Shine Effect -->
      <div class="featured-shine-wrap">
        <div class="shine-featured"></div>
      </div>

      <div class="featured-grid">
        <!-- Left: Featured Image -->
        <div class="featured-image">
          <div class="featured-image-wrap">
            <NuxtImg
              :src="post.coverImage"
              :alt="post.title"
              :style="{
                'view-transition-name': `post-image-${post.id}`,
              }"
              class="featured-image-img rounded-lg"
              format="webp"
              width="800"
              loading="eager"
              height="450"
              fetchpriority="high"
              custom
              v-slot="{ isLoaded, imgAttrs, src }"
            >
              <img
                v-if="isLoaded"
                v-bind="imgAttrs"
                :src="src"
                fetchpriority="high"
                :alt="post.title"
              />
              <div v-else class="w-full h-full">
                <UISkeletonImage
                  rounded="rounded-none"
                  aria-label="Loading featured post image"
                />
              </div>
            </NuxtImg>
            <div class="featured-image-overlay"></div>
          </div>
        </div>

        <!-- Right: Featured Post Content -->
        <div class="featured-content">
          <span class="featured-badge">Latest Post</span>
          <template v-if="!props.loading">
            <h1
              v-if="post"
              class="heading-1 featured-title text-main-gradient"
              :style="{ 'view-transition-name': `post-title-${post.id}` }"
            >
              {{ post.title }}
            </h1>
          </template>
          <template v-else>
            <!-- Skeleton, no view-transition-name -->
            <div
              class="h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse mb-3"
            ></div>
          </template>
          <p class="featured-excerpt">
            {{ post.excerpt }}
          </p>
          <UISignatureLogo :author="post.author" :date="post.date" size="md" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style>
/* Shine effect */
.shine-featured {
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

.group:hover .shine-featured {
  transform: rotate(30deg) translateX(50%);
  opacity: 1;
}

/* Structure + theming via @apply */
.featured-link {
  @apply block;
}

.featured-container {
  @apply relative p-4 md:p-8 transition-transform duration-500 rounded-3xl;
}
.featured-container:hover {
  transform: scale(1.02);
}

.featured-dots {
  @apply absolute inset-0 opacity-20 rounded-3xl;
}
.featured-dots-inner {
  @apply h-full w-full rounded-3xl bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px];
}

.featured-gradient {
  @apply absolute inset-0 rounded-3xl -z-10 bg-gradient-to-br from-red-200/80 via-blue-200/60 to-transparent dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent;
}

.featured-shine-wrap {
  @apply absolute inset-0 overflow-hidden rounded-3xl;
}

.featured-grid {
  @apply grid md:grid-cols-2 gap-12 relative;
}

.featured-image {
  @apply relative;
}
.featured-image-wrap {
  @apply relative aspect-video overflow-hidden rounded-2xl;
}
.featured-image-img {
  @apply w-full h-full object-cover transform transition-transform duration-500;
}
.group:hover .featured-image-img {
  @apply scale-105;
}
.featured-image-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 transition-opacity duration-300;
}
.group:hover .featured-image-overlay {
  @apply opacity-100;
}

.featured-content {
  @apply flex flex-col justify-center;
}
.featured-badge {
  @apply font-medium mb-4;
}
.featured-title {
  @apply font-bold mb-3 pb-3;
}
.featured-excerpt {
  @apply text-gray-600 dark:text-gray-400 text-lg mb-6 line-clamp-3;
}
</style>
