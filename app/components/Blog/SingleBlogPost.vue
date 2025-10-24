<script setup lang="ts">
import type { BlogPost } from "~~/server/types/blog";
const props = defineProps<{ post: BlogPost }>();

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
</script>

<template>
  <!-- Post Header -->
  <header class="mb-8">
    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in props.post?.tags || []"
        :key="tag"
        class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
      >
        {{ tag }}
      </span>
    </div>

    <h1
      class="text-4xl font-bold pb-6 text-main-gradient"
      :style="{
        'view-transition-name': `post-title-${props.post?.id}`,
      }"
    >
      {{ props.post?.title }}
    </h1>
    <UISignatureLogo
      :author="props.post?.author || ''"
      :date="props.post?.date || ''"
      size="md"
    />
  </header>

  <!-- Featured Image -->
  <div class="mb-12">
    <NuxtImg
      :src="props.post?.coverImage || ''"
      :alt="props.post?.title || ''"
      :style="{
        'view-transition-name': `post-image-${props.post?.id}`,
      }"
      format="webp"
      loading="eager"
      fetchpriority="high"
      :custom="true"
      v-slot="{ isLoaded, imgAttrs, src }"
    >
      <!-- Show the actual image when loaded -->
      <transition name="slide-fade">
        <img
          v-if="isLoaded"
          v-bind="imgAttrs"
          :src="src"
          fetchpriority="high"
          class="single-post"
          :alt="props.post.title"
        />
        <UISkeletonImage
          v-else
          rounded="lg"
          class="single-post"
          aria-label="Loading single post cover image"
        />
      </transition>
    </NuxtImg>
  </div>

  <!-- Post Content BUG IS HERE OBVIOUSLY WHEN IS FALSE ALL WORKS-->
  <article
    v-if="props.post?.content && props.post.content.length"
    class="prose prose-lg dark:prose-invert max-w-none"
  >
    <div v-for="(item, index) in props.post?.content || []" :key="index">
      <!-- Headings -->

      <component
        :is="`h${Number(item.level?.$numberInt) || 2}`"
        v-if="isHeading(item)"
        :class="getHeadingClass(Number(item.level?.$numberInt) || 2)"
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
          format="webp"
          loading="lazy"
          custom
          v-slot="{ isLoaded, imgAttrs, src }"
        >
          <!-- Show the actual image when loaded -->
          <transition name="slide-fade">
            <img
              v-if="isLoaded"
              v-bind="imgAttrs"
              :src="src"
              class="single-post"
              :alt="post.title"
            />
            <div v-else class="w-full h-full">
              <UISkeletonImage
                rounded="lg"
                class="single-post"
                :aria-label="`Loading post image_${index}`"
              />
            </div>
          </transition>
        </NuxtImg>
        <figcaption v-if="item.caption" class="text-center text-gray-500 mt-2">
          {{ item.caption }}
        </figcaption>
      </figure>
    </div>
  </article>
  <!-- Author Signature -->
  <div v-if="false" class="mt-10">
    <UISignatureLogo
      :author="props.post?.author || ''"
      :date="props.post?.date || ''"
      size="md"
    />
  </div>
  <!-- Back to Blog -->
  <div class="mt-16 text-center">
    <NuxtLink
      to="/blog"
      class="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all duration-300 ease-in-out group"
    >
      <svg
        class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transform transition-transform duration-300 ease-in-out group-hover:animate-bounce-left"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
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
</template>

<style scoped>
.single-post {
  @apply min-h-[132px] md:min-h-[260px] lg:min-h-[396px] max-h-[396px] rounded-lg w-full object-cover;
}
</style>
