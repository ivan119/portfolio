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
    class="block group"
  >
    <article
      class="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl backdrop-blur-sm"
    >
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

      <!-- Image Container -->
      <div class="relative aspect-video overflow-hidden">
        <NuxtImg
          v-if="post.coverImage"
          :src="post.coverImage"
          :alt="post.title"
          :style="{ 'view-transition-name': `post-image-${post.id}` }"
          class="w-full h-full object-cover transform transition-transform duration-500"
          :class="{ 'scale-105': doImageEffect }"
          format="webp"
          loading="lazy"
          width="600"
          height="338"
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
      <div class="p-6">
        <h3
          class="heading-3 font-bold mb-2 text-main-gradient"
          :style="{ 'view-transition-name': `post-title-${post.id}` }"
        >
          {{ post.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {{ post.excerpt }}
        </p>
        <UISignatureLogo :author="post.author" :date="post.date" size="sm" />
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
article {
  transition: all 0.3s ease;
  background: transparent;
  /* Inset base border (light) to avoid halo on hover */
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.dark article {
  background: transparent;
  /* Inset base border (dark) */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

article:hover,
article:focus-within {
  transform: translateY(-4px);
  /* Hide inset border while gradient border shows */
  box-shadow:
    inset 0 0 0 1px transparent,
    0 8px 24px rgba(0, 0, 0, 0.16),
    0 2px 8px rgba(0, 0, 0, 0.1);
}
/* Gradient border effect (matches ProjectCardV3) */
article::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(
    45deg,
    var(--main-gradient-from),
    var(--main-gradient-to)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s;
  will-change: opacity;
}

article:hover::after,
article:focus-within::after {
  opacity: 1;
}
</style>
