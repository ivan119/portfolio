// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    layoutTransition: {
      name: "slide",
      mode: "out-in",
    },
    head: {
      htmlAttrs: { lang: "en" },
      title: "Ivan K",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Ivan K Portfolio" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/logo32x32.png" }],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@tresjs/nuxt",
    "@nuxt/image",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },
});
