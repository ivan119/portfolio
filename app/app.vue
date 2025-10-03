<script setup>
useHead({
  link: [
    {
      rel: "icon",
      type: "image/ico",
      href: "/favicon.ico",
      sizes: "96x96",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/ico",
      href: "/favicon-16x16.ico",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/ico",
      href: "/favicon96x96.ico",
      sizes: "96x96",
    },
    { rel: "apple-touch-icon", href: "/favicon-180x180.png", sizes: "180x180" },
    {
      rel: "icon",
      type: "image/ico",
      href: "/favicon-180x180.ico",
      sizes: "180x180",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/ico",
      href: "/favicon-48x48.ico",
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
    <NuxtPage class="body-container" />
  </NuxtLayout>
</template>
