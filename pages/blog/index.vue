<script setup lang="ts">
import { useDevToPosts } from "~/composables/useDevToPosts";
import { useAsyncData } from "#imports";
import BlogPost from "~/components/BlogPost.vue";

definePageMeta({
  pageTransition: false,
});

const { fetchPosts } = useDevToPosts();

const { data: posts, status } = await useAsyncData<DevToPost[]>(
  "blog-posts",
  fetchPosts,
);
</script>

<template>
  <div class="!max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold mb-2">Developer Blog</h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Latest articles from the dev community
      </p>
    </div>

    <!-- Loading State -->
    <div
      v-if="status.loading"
      class="flex justify-center items-center min-h-[400px]"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <BlogPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
