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
    "Articles by Ivan Kelava on software engineering, web development, artificial intelligence, and the ideas shaping modern technology.",
  image: "/seo/IvanKelavaBlog1200x627.webp",
  imageAlt: "Screenshot of Ivan Kelava's blog page",
  lang: "en",
});
</script>

<template>
  <div
    :class="{ 'slide-enter-active': isActiveClass }"
    class="!max-w-7xl !p-3 md:p-0 mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    <span class="hidden"></span>
    <Breadcrumbs class="px-4 md:px-8 mb-3" />
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
