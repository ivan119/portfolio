<script setup lang="ts">
import { computed } from "vue";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";
import { usePosts } from "~/composables/usePosts";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  date: string;
  category?: string;
  tags?: string[];
};

type BlogListCard = BlogPost & {
  category: string;
  tags: string[];
  content: any[];
};

definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});

const { fetchPosts, posts, featuredPost } = usePosts();
await fetchPosts();
// SEO (SSR only)
if (import.meta.server) {
  const seoPost = featuredPost.value;
  usePageSeo({
    title: "Blog — Ivan Kelava",
    description:
      seoPost?.excerpt ||
      "Latest articles and insights on web development, Vue, Nuxt, and more.",
    image: seoPost?.coverImage || "/logo.png",
    imageAlt: seoPost?.title
      ? `${seoPost.title} cover image`
      : "Blog cover image",
    lang: "en",
  });
}
</script>

<template>
  <div class="!max-w-7xl !p-3 md:p-0 mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="px-8 mb-3" />
    <template v-if="featuredPost && posts?.length > 0">
      <UIFeaturedPost
        :post="featuredPost"
        :image-url="featuredPost.coverImage || '/logo.png'"
        :use-bg-dots="true"
        class="mb-12 !slide-enter-active"
      />

      <div class="mb-12">
        <AiGeneratedBlogs :posts="posts" />
      </div>
    </template>
    <template v-else>
      <UIEmptyState
        title="No blog posts yet"
        description="AI-generated posts will appear here once available. Please check back soon."
      >
        <BaseButton variant="primary" @click="$router.push('/')">
          Go Home
        </BaseButton>
      </UIEmptyState>
    </template>
  </div>
</template>
