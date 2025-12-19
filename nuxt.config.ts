// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Ivan Kelava",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  experimental: {
    viewTransition: true,
    renderJsonPayloads: true,
  },
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@vueuse/nuxt",
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
  image: {
    quality: 80,
    format: ["webp"],
    providers: {
      cloudinary: {
        baseURL: "https://res.cloudinary.com/dvthrmqlp/image/upload/",
      },
    },
  },
  ssr: true,
  components: [
    {
      path: "~/components/pages/",
      pathPrefix: false,
    },
    {
      path: "~/components/ui/",
      pathPrefix: false,
    },
    "~/components",
  ],
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      // 1. Keep long-term cache for static assets (hashed files)
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/favicon-48x48.png": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      // 2. Prerendered pages (Static at build time)
      "/": { prerender: true },
      "/projects": { prerender: true },
      "/skills": { prerender: true },
      // 3. BLOG: Disable Prerender AND shorten the Browser Cache
      "/blog": {
        prerender: false,
        headers: { "cache-control": "public, max-age=0, must-revalidate" }, // Browser must check server every time
      },
      "/blog/**": {
        prerender: false,
        headers: { "cache-control": "public, max-age=0, must-revalidate" },
      },
      // 4. Default for other pages (reduce from 24h to something safer)
      "/**": {
        headers: { "cache-control": "public, max-age=3600" }, // 1 hour
      },
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.ivankelava.me",
      quoteApiUrl: "https://api.quotable.io",
      techNewsApiUrl: "https://api.spaceflightnewsapi.net",
      factsApiUrl: "https://uselessfacts.jsph.pl",
      githubApiUrl: "https://api.github.com",
      blogGenerationEnabled: process.env.BLOG_GENERATION_ENABLED === "true",
      maxBlogTokens: Number(process.env.MAX_BLOG_TOKENS) || 1500,
    },
  },
});
