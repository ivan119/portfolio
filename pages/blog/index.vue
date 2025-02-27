<script setup lang="ts">
import { computed } from "vue";
import aiBlogData from "~/data/aiBlogGenerated.json";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";

definePageMeta({
  pageTransition: false,
});

// Use the AI-generated blog posts
const posts = computed(() => aiBlogData.posts || []);

// Get the latest/featured post (first post)
const featuredPost = computed(() => posts.value[0] || null);

// Get the first image from the content if available
const getPostImage = (post: any) => {
  // For the AI Agents post, use our custom image
  if (post.id === "ai-agents-transforming-digital-landscape") {
    return "/images/blog/ai-agents/ai-digital-landscape.jpg";
  }

  // For other posts, try to find an image in the content
  const imageContent = post.content.find((item: any) => item.type === "image");
  return imageContent ? imageContent.src : "/images/blog/default-cover.jpg";
};

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
  <div class="!max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="max-w-7xl mx-auto" />

    <!-- Featured Post Section -->
    <div class="grid md:grid-cols-2 gap-12 mb-16 !slide-enter-active">
      <!-- Left: Featured Image -->
      <div v-if="featuredPost" class="relative">
        <NuxtLink :to="`blog/${featuredPost.id}`" class="block group">
          <div class="relative aspect-video overflow-hidden rounded-2xl">
            <NuxtImg
              :src="getPostImage(featuredPost)"
              :alt="featuredPost.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              format="webp"
              loading="lazy"
              width="800"
              height="450"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </NuxtLink>
      </div>

      <!-- Right: Featured Post Content -->
      <div class="flex flex-col justify-center">
        <span class="text-teal-500 dark:text-teal-400 font-medium mb-4"
          >Latest Post</span
        >
        <h1
          class="text-4xl font-bold mb-3 pb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
        >
          {{ featuredPost?.title }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-6 line-clamp-3">
          {{ featuredPost?.excerpt }}
        </p>
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold"
          >
            {{ featuredPost?.author.charAt(0) }}
          </div>
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ featuredPost?.author }}
            </div>
            <div class="text-sm text-gray-500">
              {{ formatDate(featuredPost?.date) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Posts Section -->
    <div class="mb-16">
      <AiGeneratedBlogs />
    </div>
  </div>
</template>
