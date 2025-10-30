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
      // ✅ Cache all Nuxt build assets for 1 year (safe, hashed filenames)
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      // ✅ Cache static HTML for 1 day (fast return visits, still refreshes daily)
      "/**": {
        headers: { "cache-control": "public, max-age=86400" },
      },
      // ✅ Fully prerender static pages
      "/": { prerender: true },
      "/projects": { prerender: true },
      "/skills": { prerender: true },
      "/blog": { prerender: true },
      // ✅ Blog posts: static regenerate once per day
      "/blog/**": { isr: 86400 }, // 24h revalidation interval
      // ✅ API caching
      "/api/**": { cache: { maxAge: 300, staleMaxAge: 86400 } },
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
  /*
  nitro: {
    routeRules: {
      '/api/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      }
    }
  } */
});
