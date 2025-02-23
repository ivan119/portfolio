<script setup lang="ts">
import { useDevToPosts } from "~/composables/useDevToPosts";
import { useAsyncData } from "#imports";
import type { DevToPost } from "~/composables/useDevToPosts";
import { computed } from "vue";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";

definePageMeta({
  pageTransition: true, // Disable the transition for this page
});
const { fetchPosts } = useDevToPosts();

const { data: posts, status } = await useAsyncData<DevToPost[]>(
  "blog-posts",
  fetchPosts,
);

// Get the latest/featured post (first post)
const featuredPost = computed(() => posts.value[0] || null);

// Get remaining posts
const remainingPosts = computed(() => posts.value.slice(1));
</script>

<template>
  <div class="!max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="max-w-7xl mx-auto" />

    <!-- Featured Post Section -->
    <div class="grid md:grid-cols-2 gap-12 mb-16 !slide-enter-active">
      <!-- Left: Featured Image -->
      <div v-if="featuredPost" class="relative">
        <NuxtLink :to="`/blog/${featuredPost.id}`" class="block group">
          <div class="relative aspect-video overflow-hidden rounded-2xl">
            <img
              :src="
                featuredPost.cover_image ||
                `https://picsum.photos/seed/${featuredPost.id}/800/600`
              "
              :alt="featuredPost.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </NuxtLink>
      </div>

      <!-- Right: Featured Post Content -->
      <div class="flex flex-col justify-center">
        <span class="text-teal-500 dark:text-teal-400 font-medium mb-4"
          >Latest Post</span
        >
        <h1
          class="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
        >
          {{ featuredPost?.title }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-6 line-clamp-3">
          {{ featuredPost?.description }}
        </p>
        <div class="flex items-center gap-4">
          <img
            :src="featuredPost?.user.profile_image"
            :alt="featuredPost?.user.name"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ featuredPost?.user.name }}
            </div>
            <div class="text-sm text-gray-500">
              {{
                new Date(featuredPost?.published_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Generated Posts Section -->
    <div v-if="false" class="mb-16">
      <AiGeneratedBlogs />
    </div>

    <!-- Generate Blog Post Button -->
    <div class="text-center mb-16">
      <BaseButton
        to="/blog/generate"
        class="group relative overflow-hidden rounded-xl px-8 py-3 text-lg transform hover:scale-[1.02] transition-all duration-300"
      >
        <span class="relative z-10 flex items-center gap-2">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Generate New Blog Post
        </span>
        <div
          class="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
        ></div>
      </BaseButton>
    </div>

    <!-- Recent Posts Grid -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Recent Posts
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogPost v-for="post in remainingPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>
