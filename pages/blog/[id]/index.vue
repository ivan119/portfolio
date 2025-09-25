<script setup lang="ts">
import { useRoute } from "vue-router";

import { usePosts } from "~/composables/usePosts";

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

const { fetchPostById } = usePosts();
const post = (await fetchPostById(
  route.params.id as string,
)) as AiBlogPost | null;

definePageMeta({
  pageTransition: false,
});
// Format date nicely
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
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
      return "text-3xl font-bold mb-5 mt-8 text-main-gradient";
    case 3:
      return "text-2xl font-bold mb-4 mt-6";
    default:
      return "text-xl font-bold mb-3 mt-4";
  }
};

// SEO for single post
const seoTitle = post?.title
  ? `${post.title} — Blog | Ivan Kelava`
  : "Blog Post — Ivan Kelava";
const seoDescription =
  post?.excerpt || "Read the latest article by Ivan Kelava.";
const seoImage = post?.coverImage || "/logo.png";
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
  <!-- Not Found State -->
  <div v-if="!post" class="container mx-auto px-4 py-16">
    <UIEmptyState
      title="Post not found"
      description="The blog post you're looking for doesn't exist or has been removed."
    >
      <BaseButton variant="primary" @click="$router.push('/blog')"
        >Back to Blog</BaseButton
      >
    </UIEmptyState>
  </div>

  <ClientOnly v-else>
    <!-- Loaded State -->
    <div class="max-w-4xl mx-auto !px-3">
      <!-- Breadcrumbs -->
      <Navigation-Breadcrumbs class="mb-8 px-3" />
      <UIBanner title="" description="" class="-mx-0 md:-mx-6">
        <!-- Post Header -->
        <header class="mb-8">
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in post?.tags || []"
              :key="tag"
              class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
            >
              {{ tag }}
            </span>
          </div>

          <h1
            class="text-4xl font-bold pb-6 text-main-gradient"
            :style="{
              'view-transition-name': `post-title-${post?.id || postId}`,
            }"
          >
            {{ post?.title }}
          </h1>

          <UISignatureLogo
            :author="post?.author || ''"
            :date="post?.date || ''"
            size="md"
          />
        </header>

        <!-- Featured Image -->
        <div class="mb-12">
          <NuxtImg
            :src="post?.coverImage || ''"
            :alt="post?.title || ''"
            :style="{
              'view-transition-name': `post-image-${post?.id || postId}`,
            }"
            class="rounded-lg w-full"
            format="webp"
            loading="eager"
            :width="1200"
            :height="675"
            fetchpriority="high"
          />
        </div>

        <!-- Post Content -->
        <article class="prose prose-lg dark:prose-invert max-w-none">
          <div v-for="(item, index) in post?.content || []" :key="index">
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
                :src="item.src"
                :alt="item.alt"
                class="rounded-lg w-full"
                format="webp"
                loading="eager"
                :width="1024"
                :height="576"
                fetchpriority="high"
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
            class="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all duration-300 ease-in-out group"
          >
            <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transform transition-transform duration-300 ease-in-out group-hover:animate-bounce-left"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-main-gradient">Back To Blog</span>
          </NuxtLink>
        </div>
      </UIBanner>
    </div>
  </ClientOnly>
</template>

<style scoped>
@keyframes bounce-left {
  0%,
  100% {
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
