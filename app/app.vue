<script setup>
useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96",
    },
    { rel: "apple-touch-icon", href: "/favicon-180x180.png", sizes: "180x180" },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-48x48.png",
      sizes: "48x48",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-512x512.png",
      sizes: "512x512",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage class="container" />
  </NuxtLayout>
</template>
