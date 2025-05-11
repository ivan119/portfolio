<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import aiBlogData from "~/data/aiBlogGenerated.json";

const route = useRoute();
const postId = route.params.id as string;
console.log(postId, "postId");
// Find the post with the matching ID
const post = computed(() => {
  // If the requested post is the latest one, return it
  if (postId === aiBlogData.latest_post?.id) {
    return aiBlogData.latest_post;
  }

  // Otherwise, find it in the posts array
  return aiBlogData.posts.find((p) => p.id === postId) || null;
});

// If post not found, show 404
const notFound = ref(!post.value);

definePageMeta({
  pageTransition: false,
});
// Format date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper to determine content type
const isHeading = (item: any) => item.type === "heading";
const isParagraph = (item: any) => item.type === "paragraph";
const isImage = (item: any) => item.type === "image";

// Get heading level class
const getHeadingClass = (level: number) => {
  switch (level) {
    case 1:
      return "text-4xl font-bold mb-6";
    case 2:
      return "text-3xl font-bold mb-5 mt-8";
    case 3:
      return "text-2xl font-bold mb-4 mt-6";
    default:
      return "text-xl font-bold mb-3 mt-4";
  }
};

// Get the first image from the content if available
const getMainImage = (): string => {
  if (!post.value)
    return "/images/blog/ai-agents/AI agents transforming the digital landscape..webp";
  // Check if this is the latest post (AI Agents post)

  // For other posts, try to find an image in the content
  const imageItem = post.value.content.find((item) => item.type === "image");
  return imageItem && imageItem.src
    ? imageItem.src
    : "/images/blog/default-cover.jpg";
};

// Get the correct image source based on the post and image position
const getCorrectImageSrc = (item: any): string => {
  if (!post.value) return item.src || "";

  // If this is the AI Agents post, use our custom images
  if (post.value.id === "ai-agents-transforming-digital-landscape") {
    // Map the original image paths to our new images
    if (
      item.src === "/images/blog/ai-agents/ai-digital-landscape.jpg" ||
      item.src ===
        "/images/blog/ai-agents/AI agents transforming the digital landscape..webp"
    ) {
      return "/images/blog/ai-agents/AI agents transforming the digital landscape..webp";
    } else if (
      item.src === "/images/blog/ai-agents/ai-evolution-timeline.jpg" ||
      item.src ===
        "/images/blog/ai-agents/I agents seamlessly integrating into daily life and work..webp"
    ) {
      return "/images/blog/ai-agents/I agents seamlessly integrating into daily life and work..webp";
    } else if (
      item.src === "/images/blog/ai-agents/ai-industry-transformation.jpg" ||
      item.src ===
        "/images/blog/ai-agents/AI agents revolutionizing industries..webp"
    ) {
      return "/images/blog/ai-agents/AI agents revolutionizing industries..webp";
    } else if (
      item.src === "/images/blog/ai-agents/ai-future-collaboration.jpg" ||
      item.src ===
        "/images/blog/ai-agents/Emphasizing human-AI collaboration in various fields..webp"
    ) {
      return "/images/blog/ai-agents/Emphasizing human-AI collaboration in various fields..webp";
    }
  }

  // For other posts or if no match, return the original source
  return item.src || "";
};
</script>

<template>
  <div v-if="notFound" class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-3xl font-bold mb-4">Post Not Found</h1>
    <p class="mb-8">
      The blog post you're looking for doesn't exist or has been removed.
    </p>
    <NuxtLink to="/blog" class="text-teal-500 hover:text-teal-600">
      &larr; Back to Blog
    </NuxtLink>
  </div>

  <div v-else-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <!-- Breadcrumbs -->
    <Navigation-Breadcrumbs class="mb-8" />

    <!-- Post Header -->
    <header class="mb-8">
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
        >
          {{ tag }}
        </span>
      </div>

      <h1
        class="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
        :style="{ 'view-transition-name': `post-title-${post.id}` }"
      >
        {{ post.title }}
      </h1>

      <div class="flex items-center gap-4 mb-8">
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
    </header>

    <!-- Featured Image -->
    <div class="mb-12">
      <NuxtImg
        :src="getMainImage()"
        :alt="post.title"
        :style="{ 'view-transition-name': `post-image-${post.id}` }"
        class="rounded-lg w-full"
        format="webp"
        loading="eager"
        :width="1200"
        :height="675"
      />
    </div>

    <!-- Post Content -->
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <div v-for="(item, index) in post.content" :key="index">
        <!-- Headings -->
        <component
          :is="`h${item.level || 2}`"
          v-if="isHeading(item)"
          :class="getHeadingClass(item.level || 2)"
        >
          {{ item.content }}
        </component>

        <!-- Paragraphs -->
        <p v-else-if="isParagraph(item)" class="mb-6">
          {{ item.content }}
        </p>

        <!-- Images -->
        <figure v-else-if="isImage(item)" class="my-8">
          <NuxtImg
            :src="getCorrectImageSrc(item)"
            :alt="item.alt"
            class="rounded-lg w-full"
            format="webp"
            loading="lazy"
            :width="1024"
            :height="576"
          />
          <figcaption
            v-if="item.caption"
            class="text-center text-gray-500 mt-2"
          >
            {{ item.caption }}
          </figcaption>
        </figure>
      </div>
    </article>

    <!-- Back to Blog -->
    <div class="mt-16 text-center">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400 bg-clip-text font-medium hover:gap-3 transition-all duration-300 ease-in-out group"
      >
        <svg
          class="w-5 h-5 transform transition-transform duration-300 ease-in-out group-hover:animate-bounce-left"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#arrow-gradient)"
        >
          <defs>
            <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#14b8a6" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span class="text-transparent"> Back To Blog </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-left {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-4px);
  }
}

.animate-bounce-left {
  animation: bounce-left 1s ease-in-out infinite;
}
</style>
