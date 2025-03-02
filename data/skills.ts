export interface Skill {
  name: string;
  icon: string;
  url: string;
  slug: string;
  expertise?: number;  // 1-100 for skill level
  years?: number;
  description?: string;
  projects?: { name: string; url?: string }[];
  content?: string;    // Detailed content (can be markdown)
}

export const preferredSkills: Skill[] = [
  { 
    name: "Nuxt.js", 
    icon: "devicon-nuxtjs-plain", 
    url: "https://nuxtjs.org/",
    slug: "nuxtjs",
    expertise: 90,
    years: 3,
    description: "My framework of choice for building modern web applications with Vue.js.",
    projects: [
      { name: "Portfolio Site", url: "/projects/portfolio" },
      { name: "Client Dashboard" }
    ],
    content: `
## Why I Choose Nuxt.js

Nuxt.js provides an incredible developer experience with features like:

- Automatic routing
- Server-side rendering
- Static site generation
- Easy API integration

### My Experience with Nuxt

I've been working with Nuxt.js for 3 years, building everything from small personal projects to large enterprise applications.
    `
  },
  // Add your other skills with similar details
];

export const experiencedSkills: Skill[] = [
  // Add your experienced skills with similar details
];

// Helper functions
export const getAllSkills = () => {
  return [...preferredSkills, ...experiencedSkills];
};

export const getSkillBySlug = (slug: string): Skill | undefined => {
  return getAllSkills().find(skill => skill.slug === slug);
}; 