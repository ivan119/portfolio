<script setup lang="ts">
import { ref, computed } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

import type { PreviewBlogPost } from "~~/server/types/blog";
// Accept posts from parent; fallback to empty array
const props = defineProps<{ posts?: PreviewBlogPost[] }>();
const posts = computed(() => props.posts || []);
const loading = ref(false);
const error = ref<string | null>(null);
const blogPostsTarget = useTemplateRef<HTMLDivElement>("blogPostsTarget");
const showBlogPosts = ref(false);
// Only show once the section comes into view
useIntersectionObserver(blogPostsTarget, ([entry], observer) => {
  if (entry?.isIntersecting) {
    showBlogPosts.value = true;
    observer.disconnect(); // stop observing after first trigger
  }
});
</script>

<template>
  <div class="space-y-8">
    <Banner
      ref="blogPostsTarget"
      class="md:pb-12"
      :class="{ invisible: !showBlogPosts }"
      title="Blog"
      description=""
      :first-tag-is-h1="false"
    >
      <template v-if="showBlogPosts" #default>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"
          ></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- Posts Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          <BlogPostCard
            v-for="(post, index) in posts"
            :key="post.id"
            :post
            :is-odd-index="index % 2 === 1"
          />
        </div>
      </template>
    </Banner>
  </div>
</template>
