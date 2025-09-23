<script setup lang="ts">
import { computed } from "vue";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";
import { usePosts } from "~/composables/usePosts";

definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});

const { posts, latestPost, fetchPosts } = usePosts();

// Ensure posts are available (SSR + client)
await fetchPosts();

const featuredPost = computed(() => latestPost.value);
const allPosts = computed(() => posts.value);
</script>

<template>
  <div
    class="!max-w-7xl !p-3 md:p-0 mx-auto mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    <Navigation-Breadcrumbs class="max-w-7xl px-3 sm:px-0 mx-auto" />
    <template v-if="allPosts.length > 0">
      <UIFeaturedPost
        v-if="featuredPost"
        :post="featuredPost"
        :image-url="featuredPost.coverImage"
        :use-bg-dots="true"
        class="mb-16 mt-3 !slide-enter-active"
      />

      <!-- Blog Posts Section -->
      <div class="mb-16">
        <AiGeneratedBlogs :posts="allPosts" />
      </div>
    </template>
    <template v-else>
      <UIEmptyState
        title="No blog posts yet"
        description="AI-generated posts will appear here once available. Please check back soon."
      >
        <BaseButton variant="primary" @click="$router.push('/')"
          >Go Home</BaseButton
        >
      </UIEmptyState>
    </template>
  </div>
</template>
