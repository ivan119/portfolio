<script setup lang="ts">
import { useRoute } from "vue-router";

import { usePosts } from "~/composables/usePosts";
import { isActiveClass } from "~/composables/useActiveClass";

interface AiContentItem {
  type: string;
  level?: number;
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface AiBlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: AiContentItem[];
}

const route = useRoute();
const postId = route.params.id as string;
const { fetchPostById, post } = usePosts();
await fetchPostById(postId);
definePageMeta({
  middleware: ["blog-active"],
});

// SEO for single post
const seoTitle = post?.title
  ? `${post.title} — Blog | Ivan Kelava`
  : "Blog Post — Ivan Kelava";
const seoDescription =
  post?.excerpt || "Read the latest article by Ivan Kelava.";
const seoImage = post?.coverImage || "/seo/IvanKelavaBlog1200x627.webp";
const seoImageAlt = post?.title
  ? `${post.title} cover image`
  : "Blog post cover image";
usePageSeo({
  title: seoTitle,
  description: seoDescription,
  image: seoImage,
  imageAlt: seoImageAlt,
  lang: "en",
});
</script>

<template>
  <!-- Loaded State -->

  <div
    :class="{ 'slide-enter-active': isActiveClass }"
    class="max-w-4xl mx-auto !px-3"
  >
    <!-- Breadcrumbs -->
    <Navigation-Breadcrumbs class="px-3" />
    <UIBanner v-if="post" title="" description="" class="-mx-0 md:-mx-6 mt-2">
      <UISingleBlogPost :post="post" />
    </UIBanner>
    <!-- Not Found State -->
    <div v-else class="container mx-auto px-4 py-16">
      <UIEmptyState
        title="Post not found"
        description="The blog post you're looking for doesn't exist or has been removed."
      >
        <BaseButton variant="primary" @click="$router.push('/blog')"
          >Back to Blog</BaseButton
        >
      </UIEmptyState>
    </div>
  </div>
</template>
