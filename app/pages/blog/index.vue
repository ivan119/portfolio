<script setup lang="ts">
import { usePosts } from "~/composables/usePosts";
import { isActiveClass } from "~/composables/useActiveClass";
const { fetchPosts, posts, featuredPost } = usePosts();
await fetchPosts();
definePageMeta({
  middleware: ["blog-active"],
});
usePageSeo({
  title: "Blog — Ivan Kelava",
  description:
    "Discover how AI agents are revolutionizing industries by automating complex tasks, improving decision-making, and enabling smarter human-machine collaboration in the evolving digital landscape.",
  image: "/seo/IvanKelavaBlog1200x627.webp",
  imageAlt: "Blog cover image",
  lang: "en",
});
</script>

<template>
  <div
    :class="{ 'slide-enter-active': isActiveClass }"
    class="!max-w-7xl !p-3 md:p-0 mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    <span class="hidden"></span>
    <LazyNavigationBreadcrumbs class="px-4 md:px-8 mb-3" />
    <template v-if="featuredPost && posts?.length > 0">
      <LazyFeaturedPost
        :post="featuredPost"
        :image-url="featuredPost.coverImage"
        class="mb-12"
      />

      <div class="mb-12">
        <LazyAiGeneratedBlogs :posts />
      </div>
    </template>
    <template v-else>
      <EmptyState
        title="No blog posts yet"
        description="AI-generated posts will appear here once available. Please check back soon."
      >
        <BaseButton variant="primary" @click="$router.push('/')">
          Go Home
        </BaseButton>
      </EmptyState>
    </template>
  </div>
</template>
