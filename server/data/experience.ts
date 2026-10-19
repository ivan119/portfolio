import type { ExperienceItem, EducationItem } from "../types/experience";

export const workExperience: ExperienceItem[] = [
  {
    id: "urgood",
    role: "Senior Software Engineer (B2B)",
    company: "Singular Design",
    client: "Urgood",
    location: "Remote",
    period: "06/2026 – Present",
    current: true,
    type: "B2B Contract",
    highlights: [
      "Full stack ownership across Nuxt frontend, legacy PHP backend, and iOS app, consistently keeping critical releases on track.",
      "Delivered the creator publishing beta 33% beyond the expected scope while modernizing legacy PHP services.",
      "Building an end-to-end creator platform: recommendation lists, rich media updates, and booking links for restaurants integrated with Resy and OpenTable.",
      "Architected recurring subscription payments via Stripe and resolved legacy HubSpot integration issues.",
      "Developing the iOS 1:1 mobile application while orchestrating major web releases.",
      "Leveraging an advanced AI-assisted engineering workflow (Google Antigravity, Claude Opus/Sonnet) to accelerate delivery across web, mobile, and backend.",
    ],
    technologies: [
      "Nuxt.js",
      "Vue.js",
      "TypeScript",
      "iOS",
      "PHP",
      "Stripe",
      "HubSpot",
      "Google Antigravity",
      "Claude",
    ],
  },
  {
    id: "everymatrix",
    role: "Software Engineer (Full-Stack)",
    company: "EveryMatrix",
    location: "Zagreb, Croatia (On-site)",
    period: "04/2026 – 05/2026",
    current: false,
    type: "Full-time",
    highlights: [
      "Resolved 18 critical bugs within 3 days of onboarding, rapidly getting up to speed on the codebase.",
      "Engineered and delivered a complex full-stack nested-list architectural feature.",
      "Optimized and prepped for launch a Vue NativeScript mobile app for real-time sports betting cash-out flows.",
      "Authored a comprehensive technical handover report detailing structural architecture and future improvements.",
    ],
    technologies: [
      "Vue.js",
      "NativeScript-Vue",
      "TypeScript",
      "Full-Stack",
      "Mobile",
    ],
  },
  {
    id: "gauss-lead",
    role: "Frontend Team / Tech Lead Developer",
    company: "Gauss Development",
    location: "Osijek, Croatia",
    period: "11/2021 – 09/2025",
    current: false,
    type: "Lead",
    highlights: [
      "Led and mentored a team of 5+ frontend engineers, establishing TypeScript architecture, component patterns, and state management standards.",
      "Architected frontend for CeleroOne — an enterprise SaaS workforce management platform; solved production-critical bugs that safeguarded key client retention.",
      "Core maintainer of GaussCMS (Nuxt + TypeScript), optimizing SSR, SEO performance, and headless workflows.",
      "Collaborated closely with CTO, backend, QA, and product leads to ship enterprise platforms on schedule.",
    ],
    technologies: [
      "Nuxt.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Enterprise SaaS",
      "Mentorship",
      "Architecture",
    ],
  },
  {
    id: "gauss-dev",
    role: "Frontend Developer",
    company: "Gauss Development",
    location: "Osijek, Croatia",
    period: "02/2020 – 11/2021",
    current: false,
    type: "Full-time",
    highlights: [
      "Built responsive, accessible Vue.js and Nuxt applications with strong Core Web Vitals and load-time performance.",
      "Integrated complex REST/GraphQL APIs and contributed foundational modules to internal CMS tooling.",
      "Promoted to Frontend Tech Lead based on technical consistency and leadership initiative.",
    ],
    technologies: [
      "Vue.js",
      "Nuxt.js",
      "JavaScript",
      "CSS3 / SCSS",
      "REST APIs",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "bootcamp",
    degree: "Junior Developer (Bootcamp Diploma)",
    institution: "CTK Rijeka, Bootcamp IT",
    period: "03/2019 – 06/2019",
    description: "Algorithms, data structures, OOP (C++), database modeling (MySQL), and web fundamentals.",
  },
  {
    id: "highschool",
    degree: "Mechanical Technician",
    institution: "Technical High School, Osijek",
    period: "09/2008 – 05/2012",
    description: "Fundamentals of machine systems, maintenance, precision safety, mechanical design, and technical drawing.",
  },
];

export const getWorkExperience = (): ExperienceItem[] => workExperience;
