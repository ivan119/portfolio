<script setup lang="ts">
import { ref, onMounted } from "vue";
import aiBlogData from "~/data/aiBlogGenerated.json";

// Define the type for our AI blog posts based on the JSON structure
interface AiBlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  content: any[];
}

const posts = ref<AiBlogPost[]>(aiBlogData.posts);
const loading = ref(false);
const error = ref<string | null>(null);

// Format date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get the first image from the content if available
const getPostImage = (post: AiBlogPost) => {
  const imageContent = post.content.find(item => item.type === 'image');
  return imageContent ? imageContent.src : null;
};
</script>

<template>
  <div class="space-y-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Blog
      </h2>
    </div>

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
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <NuxtLink :to="`/blog/${post.id}`" class="block">
          <!-- Post Image -->
          <div v-if="getPostImage(post)" class="aspect-video w-full overflow-hidden">
            <NuxtImg 
              :src="getPostImage(post)" 
              :alt="post.title"
              class="w-full h-full object-cover"
              format="webp"
              loading="lazy"
              width="600"
              height="338"
            />
          </div>
          
          <div class="p-6">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
              >
                {{ tag }}
              </span>
            </div>

            <h3
              class="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2"
            >
              {{ post.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <div
              class="flex items-center text-sm text-gray-500 dark:text-gray-400"
            >
              <span>{{ formatDate(post.date) }}</span>
              <span class="mx-2">•</span>
              <span>{{ post.author }}</span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
