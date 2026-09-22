import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const markdownBlogDirectory = resolve("server/content/blog");
const markdownBlogFiles = readdirSync(markdownBlogDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
  .map((entry) => ({
    name: entry.name,
    source: readFileSync(resolve(markdownBlogDirectory, entry.name), "utf8"),
  }));
const markdownBlogRoutes = markdownBlogFiles.map(({ name, source }) => {
  const id = source.match(/^id:\s*["']?([^\n"']+)["']?\s*$/m)?.[1];
  return `/blog/${id || name.replace(/\.md$/, "")}`;
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: false, // Disable typeCheck to avoid vue-tsc lib file issues // TODO: find and fix error when typeCheck is true
  },
  sourcemap: {
    server: false,
    client: false,
  },
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
  compatibilityDate: "latest",
  experimental: {
    viewTransition: true,
    payloadExtraction: false,
  },
  vite: {
    optimizeDeps: {
      include: ["typewriter-effect/dist/core"],
    },
    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes("node_modules")) {
              if (id.includes("three")) return "three";
              if (id.includes("typewriter-effect")) return "typewriter";
              return "vendor";
            }
          },
        },
      },
    },
  },
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@vercel/speed-insights"
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
    quality: 99,
    format: ["webp"],
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
      ignore: ["icons/devicon/**"],
    },
    "~/components",
  ],
  nitro: {
    compressPublicAssets: true,
    virtual: {
      "#blog-content": () =>
        `export default ${JSON.stringify(Object.fromEntries(markdownBlogFiles.map(({ name, source }) => [name, source])))}`,
    },
    prerender: {
      crawlLinks: true,
      // Explicitly list every URL so Nitro prerenders them as full static HTML.
      // Dynamic routes (/blog/[id], /projects/[slug]) are NOT auto-discovered
      // by the crawler when links are inside lazy/async components — causing
      // Google to crawl empty shells and refuse to index them.
      routes: [
        // Static pages
        "/",
        "/blog",
        "/projects",
        "/skills",
        // Blog posts — add new post IDs here when published
        "/blog/ivan-with-claude",
        "/blog/evolution-of-frontend-architectures",
        "/blog/ai-agents-transforming-digital-landscape",
        "/blog/quantum-computing-ai-next-frontier",
        "/blog/federated-learning-privacy-preserving-ai",
        ...markdownBlogRoutes,
        // Project pages — add new slugs here when added
        "/projects/gausscms",
        "/projects/celeroone",
        "/projects/delmerion-webshop",
        "/projects/sonic-pills",
        "/projects/invest-in-croatia",
        "/projects/wineyard",
        // Other crawlable routes
        "/sitemap.xml",
        "/robots.txt",
      ],
    },
    routeRules: {
      // 1. Static Assets (1 Year Cache)
      "/_nuxt/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/favicon-48x48.png": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/blog/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      // 2. EVERYTHING ELSE: Prerender it!
      "/**": { prerender: true },
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
