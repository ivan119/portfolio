<script setup lang="ts">
const { data, refresh, pending } = await useFetch('/api/images/status', { server: false })

const generating = ref<string | null>(null)

async function generate(slug: string) {
  generating.value = slug
  try {
    await $fetch('/api/images/generate', {
      method: 'POST',
      body: { slug }
    })
    await refresh()
  } finally {
    generating.value = null
  }
}
</script>

<template>
  <div class="!max-w-5xl mx-auto px-4 py-10 space-y-6">
    <h1 class="heading-1">Image Status</h1>
    <p class="text-gray-600 dark:text-gray-400">Check missing blog images and generate placeholders.</p>

    <div v-if="pending">Loading...</div>

    <div v-else class="space-y-4">
      <div v-for="post in data?.posts" :key="post.id" class="border rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold">{{ post.title }}</h2>
            <p class="text-sm text-gray-500">ID: {{ post.id }}</p>
          </div>
          <button
            class="px-3 py-1.5 rounded bg-teal-600 text-white disabled:opacity-50"
            :disabled="generating === post.id"
            @click="generate(post.id)"
          >
            {{ generating === post.id ? 'Generating...' : 'Generate Placeholders' }}
          </button>
        </div>

        <div class="mt-3">
          <p class="text-sm">Missing: <span class="font-mono">{{ post.missing.length }}</span> / {{ post.total }}</p>
          <ul class="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc ml-5">
            <li v-for="m in post.missing" :key="m">{{ m }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


