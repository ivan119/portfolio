<script setup lang="ts">
import { computed } from "vue";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";

definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});

// Fetch posts from server API (SSR-friendly + cached)
const { data } = await useFetch("/api/blog/ai/posts", {
  server: true,
  lazy: false,
  default: () => ({ posts: [], latest_post: null }),
});

const posts = computed(() => data.value?.posts || []);
const featuredPost = computed(() => data.value?.latest_post || null);

// Get the first image from the content if available
const getPostImage = (post: any) => {
  if (!post) return "/images/blog/default-cover.jpg";
  if (post.id === "ai-agents-transforming-digital-landscape") {
    return "/images/blog/ai-agents/AI agents transforming the digital landscape..webp";
  }
  const imageContent = post.content?.find((item: any) => item.type === "image");
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
      <AiGeneratedBlogs :posts="posts" />
    </div>
  </div>
</template>
