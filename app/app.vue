<script setup>
useHead({
  link: [
    // --- Default favicon (Google looks for this first) ---
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
    // --- PNG variants for modern browsers ---
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-48x48.png",
      sizes: "48x48",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-512x512.png",
      sizes: "512x512",
    },
    // --- Apple devices (iOS Safari) ---
    {
      rel: "apple-touch-icon",
      href: "/favicon-180x180.png",
      sizes: "180x180",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage class="body-container" />
  </NuxtLayout>
</template>
