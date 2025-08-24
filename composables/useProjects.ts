interface Tag {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
  tags: Tag[];
  categories: string[];
  status: string;
  year: string;
}

interface TechStack {
  icon: string;
  url: string;
}

export const useProjects = () => {
  // Define tech stack with icons and links
  const techStackData: Record<string, TechStack> = {
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

  // Main projects
  const projects: Project[] = [
    {
      title: "GaussCMS",
      description:
        "A powerful Content Management System for creating, editing, and publishing content on websites and E-commerce platforms. Features include SEO optimization, multisite management, and multilingual support.",
      link: "https://gaussbox.com/modules-cms",
      tags: [
        { name: "Vue.js", icon: "devicon-vuejs-plain" },
        { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
        { name: "TypeScript", icon: "devicon-typescript-plain" },
        { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
        { name: "AdonisJS", icon: "devicon-adonisjs-original" },
      ],
      categories: ["frontend"],
      status: "Completed",
      year: "2023",
    },
    {
      title: "CeleroOne",
      description:
        "A comprehensive workforce management solution for mobile teams. Features include real-time planning, process management, team coordination, and integrated communication tools for both office and field workers.",
      link: "https://gauss.hr/en/celero-one",
      tags: [
        { name: "Vue.js", icon: "devicon-vuejs-plain" },
        { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
        { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
        { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
        { name: "MongoDB", icon: "devicon-mongodb-plain" },
        { name: "PHP", icon: "devicon-php-plain" },
      ],
      categories: ["fullstack"],
      status: "Completed",
      year: "2023",
    },
  ];

  // Other projects
  const allProjects: Project[] = [
    {
      title: "Invest in Croatia",
      description:
        "A government-backed platform for investors to explore business opportunities in Croatia. The site provides economic insights, legal frameworks, and available investment projects.",
      link: "https://investincroatia.hr/",
      tags: [
        { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
        { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
      ],
      categories: ["frontend"],
      status: "Completed",
      year: "2022",
    },
    {
      title: "Wine Yard",
      description:
        "Wineyard is an expert system that measures humidity, pressure, temperature, and CO2 and manages air conditioning devices in the wine cellar, without the physical presence of the winemaker.",
      link: "https://wine-yard.net/en/homepage",
      tags: [
        { name: "Nuxt.js", icon: "devicon-nuxtjs-plain" },
        { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
      ],
      categories: ["frontend"],
      status: "Completed",
      year: "2022",
    },
  ];

  return {
    techStackData,
    projects,
    allProjects,
  };
};
