<script setup lang="ts">
import type { NuxtError } from "#app"; // NuxtError type for better type checking.

const props = defineProps({
  error: Object as () => NuxtError, // Define the error prop.
});
</script>

<template>
  <div
    class="container min-h-screen bg-white dark:bg-gray-900 mx-auto flex items-center justify-center px-4"
  >
    <div class="max-w-2xl w-full text-center">
      <!-- Error Code -->
      <div class="relative mb-8 animate-pulse">
        <h1
          class="text-[150px] font-bold leading-none opacity-10 dark:opacity-5"
        >
          {{ error?.statusCode || "404" }}
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
          >
            {{
              error?.statusCode === 404
                ? "Page Not Found"
                : "Something went wrong"
            }}
          </h2>
        </div>
      </div>

      <!-- Content with Slide Animation -->
      <div class="slide-enter-active">
        <!-- Error Message -->
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {{
            error?.message ||
            "We couldn't find the page you're looking for. Let's get you back on track."
          }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton to="/" variant="default"> Return Home </BaseButton>
          <BaseButton variant="default" @click="$router.back()">
            Go Back
          </BaseButton>
        </div>

        <!-- Helpful Links -->
        <div class="mt-12">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You might want to check out:
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <BaseButton
              v-for="link in ['/', '/blog', '/projects', '/contact']"
              :key="link"
              :to="link"
              variant="primary"
            >
              {{
                link === "/"
                  ? "Home"
                  : link.slice(1).charAt(0).toUpperCase() + link.slice(2)
              }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
