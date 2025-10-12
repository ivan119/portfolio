import type { ProjectItem } from "~~/server/types/project";

export interface TechStackEntry {
  icon: string;
  url: string;
}

export const techStackData: Record<string, TechStackEntry> = {
  "Nuxt.js": { icon: "devicon-nuxtjs-plain", url: "https://nuxtjs.org/" },
  Bootstrap: {
    icon: "devicon-bootstrap-plain",
    url: "https://getbootstrap.com/",
  },
  JavaScript: {
    icon: "devicon-javascript-plain",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  "Tailwind CSS": {
    icon: "devicon-tailwindcss-plain",
    url: "https://tailwindcss.com/",
  },
};

export const projects: ProjectItem[] = [
  {
    slug: "gausscms",
    title: "GaussCMS",
    description:
      "A powerful Content Management System for creating, editing, and publishing content on websites and E-commerce platforms. Features include SEO optimization, multisite management, and multilingual support.",
    link: "https://gauss.hr/en/blog/cms-everything-you-need-to-know",
    longDescription:
      "GaussCMS is an enterprise-grade content platform that powers marketing sites and online stores across multiple brands and locales. As Core Team Lead and Maintainer (Nov 1, 2021 — Sep 30, 2025), I led Nuxt frontend architecture, shipped an authoring experience optimized for non-technical editors, and embedded SEO, analytics, and performance budgets to ensure excellent Core Web Vitals. The CMS provides easy content creation, centralized storage, role-based workflows (editor/admin/author), and one-click publishing, while keeping content separate from design for safe iteration.",
    company: "Gauss",
    roles: ["Core Team Lead", "Maintainer", "Frontend Architect"],
    responsibilities: [
      "Core team lead & maintainer (Nov 2021 – Sep 2025)",
      "Roadmap planning and prioritization with product/design",
      "Nuxt architecture, component library, and design system integration",
      "Code reviews, PR standards, and mentoring/onboarding",
      "CI/CD pipelines and release process ownership",
      "SEO meta, sitemap/robots automation, and redirects tooling",
      "Performance optimization (LCP/CLS budgets) and monitoring",
      "Role-based content workflows and permissions",
      "Documentation and internal knowledge base",
    ],
    features: [
      "Easy content creation (drag-and-drop editor)",
      "Centralized content storage",
      "Role-based workflows (editor/admin/author)",
      "Content publishing and redirects",
      "Multisite and multilingual management",
      "SEO-ready (titles, meta, URLs, structured data)",
      "Separation of content and design",
    ],
    metrics: [
      { label: "Largest Contentful Paint", value: "< 2.5s" },
      { label: "SEO pages indexed", value: "> 10k" },
    ],
    tags: [
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
      { name: "AdonisJS", icon: "devicon-adonisjs-original" },
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2023",
    timeline: "Core Team Lead & Maintainer — Nov 1, 2021 → Sep 30, 2025",
    allowPreview: true,
  },
  {
    slug: "celeroone",
    title: "CeleroOne",
    description:
      "AI‑assisted workforce management for international mobile teams: centralized tasks, comms, and field data collection.",
    link: "https://gauss.hr/en/celero-one",
    longDescription:
      "Celero One is a cloud platform built with Gauss in partnership with Celero Cloud GmbH to coordinate office and field teams across nations. The system centralizes task management, streamlines communication with AI‑assisted translation, and gives real‑time oversight for faster decisions. We delivered a scalable, user‑friendly experience with mobile access and big‑data tooling for surveys and analytics.",
    company: "Celero Cloud GmbH",
    roles: ["Frontend Team Lead", "Frontend Architect"],
    responsibilities: [
      "Frontend team lead (May 2021 – Sep 2025)",
      "Designed Nuxt frontend and component library",
      "Implemented centralized tasks and workflow UX",
      "Integrated AI‑assisted translation for cross‑border comms",
      "Built survey collection and analytics views",
      "Optimized mobile experience for field teams",
      "Collaborated on cloud architecture and performance",
    ],
    features: [
      "Centralized task management",
      "AI‑assisted translation",
      "Team communication channels",
      "Mobile access for field teams",
      "Survey collection and analytics",
      "Real‑time oversight dashboards",
    ],
    metrics: [
      { label: "Conducted market surveys", value: "> 1.1M" },
      { label: "Collected data points", value: "> 24M" },
      { label: "Active users", value: "2,500+" },
      { label: "Nations", value: "3" },
    ],
    tags: [
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "PHP", icon: "devicon-php-plain" },
      { name: "Chart.js", icon: "devicon-chartjs-plain" },
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2021 - 2025",
    timeline: "Frontend Team Lead — May 2021 → Sep 2025",
    allowPreview: false,
  },
];

export const allProjects: ProjectItem[] = [
  {
    slug: "delmerion-webshop",
    title: "Delmerion Webshop",
    description:
      "Premium beauty eCommerce built on GaussCMS with a polished catalog, brand highlights, promotions, and a seamless checkout.",
    link: "https://www.delmerion.hr/",
    gaussCMSlogo: true,
    longDescription:
      "Delmerion’s first online store brings premium skincare and haircare closer to customers nationwide. Built on GaussCMS (Gauss Box), the webshop focuses on brand storytelling, effortless navigation, and a conversion‑friendly purchase flow. The platform centralizes product management while ensuring a premium look and fast, accessible UX across devices.",
    company: "Delmerion d.o.o.",
    roles: ["Frontend Engineer", "Maintainer"],
    responsibilities: [
      "Implemented Nuxt storefront and component library",
      "Integrated with GaussCMS product/catalog workflows",
      "Optimized navigation, search, and PDP for conversion",
      "Applied performance and SEO best practices",
      "Maintained the project and migrated to the latest GaussCMS version",
    ],
    features: [
      "Product catalog with brand highlights",
      "Promotions and featured collections",
      "Responsive, accessible UI",
      "CMS‑driven pages and content",
      "Checkout flow aligned with brand",
    ],
    metrics: [
      { label: "New revenue channel", value: "1" },
      { label: "Showcased products", value: "~1,000" },
      { label: "Nationwide accessibility", value: "100%" },
      { label: "Average order value", value: "> €70" },
      { label: "Exclusive brands", value: "6" },
      { label: "Social followers", value: "7k+" },
    ],
    tags: [
      {
        name: "GaussCMS",
        gaussCMSlogo: true,
        color: "#00C2A8",
      },
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2022",
    timeline: "Launch — 2022 · Maintained and migrated to latest GaussCMS",
    allowPreview: false,
  },
  {
    slug: "sonic-pills",
    title: "Sonic Pills",
    description:
      "GaussCMS eCommerce for Sonic Pill® — sound‑therapy products with guided programs and a recommendation flow.",
    link: "https://sonicpills.com/",
    gaussCMSlogo: true,
    longDescription:
      "Sonic Pill® provides sound‑therapy programs and a physical product experience. The webshop, built on GaussCMS, promotes education (Science, How it works), guides users with a short questionnaire to the right program, and supports account login with free‑trial access codes from physical products.",
    company: "Sonic Group",
    roles: ["Frontend Engineer"],
    responsibilities: [
      "Implemented GaussCMS storefront and content pages",
      "Built questionnaire funnel for program recommendation",
      "Integrated free‑trial and code entry flows",
      "Delivered responsive, accessible UI and SEO setup",
    ],
    features: [
      "Program recommendation questionnaire",
      "Free trial and subscription messaging",
      "Physical product code redemption",
      "Science/Blog content sections",
      "Login and account access",
    ],
    tags: [
      {
        name: "GaussCMS",
        gaussCMSlogo: true,
        color: "#00C2A8",
      },
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2021",
    timeline: "Launch — 2021",
    allowPreview: false,
  },
  {
    slug: "invest-in-croatia",
    title: "Invest in Croatia",
    description:
      "A government-backed platform for investors to explore business opportunities in Croatia. The site provides economic insights, legal frameworks, and available investment projects.",
    link: "https://investincroatia.hr/",
    longDescription:
      "Informational portal for foreign and domestic investors: why invest in Croatia, business climate, incentives, transport infrastructure, and county/industry profiles. Includes news and announcements, events, and guidance for connecting with the Croatian Chamber of Economy’s Business Internationalization Centre.",
    company: "Croatian Chamber of Economy (HGK)",
    roles: ["Frontend Developer"],
    responsibilities: [
      "Implemented responsive pages and content sections (Why invest, How to invest, Where to invest)",
      "Built news/announcements listings and detail templates",
      "Ensured accessibility, SEO meta, and performance for static content",
      "Integrated multilingual-ready structure and consistent design system",
    ],
    features: [
      "Investment environment overview",
      "County and industry profiles",
      "News and announcements",
      "B2B/events information",
      "Contact and guidance for investors",
    ],
    tags: [
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2020",
    timeline: "My first comercial project — 2020",
    allowPreview: false,
  },
  {
    slug: "wineyard",
    title: "Wineyard",
    description:
      "IoT platform for precise wine cellar monitoring with real‑time telemetry, analytics, and automated recommendations.",
    link: "https://gauss.hr/en/products/wineyard",
    longDescription:
      "Wineyard enables remote supervision of storage and production conditions—humidity, temperature, pressure, and CO₂—backed by an IoT sensor network. The platform offers customizable dashboards, historical analytics, and alerting, plus AI‑assisted trend analysis and recommendations for proactive cellar management.",
    company: "Gauss",
    roles: ["Frontend Lead (solo)", "Frontend Engineer"],
    responsibilities: [
      "Led the frontend build solo using Nuxt + Vuetify",
      "Implemented real‑time dashboards with Chart.js",
      "Auth flows with nuxt-auth and role‑based access",
      "Device status, thresholds, and alert UX",
      "Responsive UI for tablets and desktop operators",
    ],
    features: [
      "IoT device network monitoring",
      "Customizable dashboard widgets",
      "Sensor telemetry, history, and analysis",
      "AI trend tracking and recommendations",
      "Company & cellar administration",
      "Thresholds, alerts, and response windows",
    ],
    metrics: [
      { label: "Specialized modules", value: "7" },
      { label: "Crucial live measurements", value: "3" },
      { label: "Useful features", value: "30+" },
      { label: "Winemaking system", value: "1" },
    ],
    tags: [
      { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "Vuetify", icon: "devicon-vuetify-plain" },
      { name: "Chart.js", icon: "devicon-chartjs-plain" },
    ],
    categories: ["frontend"],
    status: "Completed",
    year: "2021",
    timeline: "My second comercial project — 2020/2021",
    allowPreview: false,
  },
];
