<script setup lang="ts">
import { computed } from "vue";
import aiBlogData from "~/data/aiBlogGenerated.json";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";

definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});

// Use the AI-generated blog posts
const posts = computed(() => aiBlogData.posts || []);

// Get the latest/featured post (first post)
const featuredPost = computed(() => aiBlogData.latest_post || {});

// Get the first image from the content if available
const getPostImage = (post: any) => {
  // For the AI Agents post, use our custom image
  if (post.id === "ai-agents-transforming-digital-landscape") {
    return "/images/blog/ai-agents/AI agents transforming the digital landscape..webp";
  }

  // For other posts, try to find an image in the content
  const imageContent = post.content.find((item: any) => item.type === "image");
  return imageContent ? imageContent.src : "/images/blog/default-cover.jpg";
};
</script>

<template>
  <div class="!max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="max-w-7xl mx-auto" />

    <UIFeaturedPost
      v-if="featuredPost"
      :post="featuredPost"
      :image-url="getPostImage(featuredPost)"
      :use-bg-dots="true"
      class="mb-16 mt-3 !slide-enter-active"
    />

    <!-- Blog Posts Section -->
    <div class="mb-16">
      <AiGeneratedBlogs />
    </div>
  </div>
</template>
