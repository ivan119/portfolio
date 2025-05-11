interface Skill {
  name: string;
  icon: string;
  category?: string;
  proficiency?: string;
  description?: string;
  experience?: string;
  color?: string;
  url?: string;
}

export const useSkills = () => {
  const preferredSkills: Skill[] = [
    {
      name: "Vue.js",
      icon: "devicon-vuejs-plain",
      category: "frontend",
      proficiency: "Expert",
      description: "Modern reactive framework for building user interfaces",
      experience: "4+ years",
      color: "text-emerald-500",
    },
    {
      name: "Nuxt.js",
      icon: "devicon-nuxtjs-plain",
      category: "framework",
      proficiency: "Expert",
      description: "Vue.js framework for building full-stack applications",
      experience: "3+ years",
      color: "text-green-500",
    },
    {
      name: "TypeScript",
      icon: "devicon-typescript-plain",
      category: "language",
      proficiency: "Expert",
      description: "Typed superset of JavaScript for scalable applications",
      experience: "3+ years",
      color: "text-blue-500",
    },
    {
      name: "Node.js",
      icon: "devicon-nodejs-plain",
      category: "backend",
      proficiency: "Expert",
      description: "JavaScript runtime for server-side development",
      experience: "4+ years",
      color: "text-green-600",
    },
    {
      name: "WebStorm",
      icon: "devicon-webstorm-plain",
      category: "tools",
      proficiency: "Expert",
      description: "Powerful JavaScript IDE from JetBrains",
      experience: "3+ years",
      color: "text-blue-600",
    },
    {
      name: "Cursor",
      icon: "devicon-vscode-plain",
      category: "tools",
      proficiency: "Expert",
      description: "Advanced AI-powered code editor",
      experience: "1+ year",
      color: "text-blue-500",
    },
    {
      name: "React",
      icon: "devicon-react-plain",
      category: "frontend",
      proficiency: "Advanced",
      description: "Library for building user interfaces",
      experience: "3+ years",
      color: "text-blue-400",
    },
    {
      name: "Next.js",
      icon: "devicon-nextjs-plain",
      category: "framework",
      proficiency: "Advanced",
      description: "React framework for production-grade applications",
      experience: "2+ years",
      color: "text-gray-800 dark:text-white",
    },
    {
      name: "TailwindCSS",
      icon: "devicon-tailwindcss-plain",
      category: "frontend",
      proficiency: "Expert",
      description: "Utility-first CSS framework",
      experience: "3+ years",
      color: "text-teal-500",
    },
    {
      name: "MongoDB",
      icon: "devicon-mongodb-plain",
      category: "database",
      proficiency: "Advanced",
      description: "NoSQL database for modern applications",
      experience: "3+ years",
      color: "text-green-500",
    },
  ];

  const skills: Skill[] = [
    {
      name: "Nuxt.js",
      icon: "devicon-nuxtjs-plain",
      url: "https://nuxtjs.org/",
    },
    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "Tailwind CSS",
      icon: "devicon-tailwindcss-plain",
      url: "https://tailwindcss.com/",
    },
    { name: "Vue", icon: "devicon-vuejs-plain", url: "https://vuejs.org/" },
    {
      name: "Bootstrap",
      icon: "devicon-bootstrap-plain",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Vuetify",
      icon: "devicon-vuetify-plain",
      url: "https://vuetifyjs.com/en/",
    },
    {
      name: "React",
      icon: "devicon-react-original",
      url: "https://reactjs.org/",
    },
    {
      name: "Next.js",
      icon: "devicon-nextjs-original-wordmark",
      url: "https://nextjs.org/",
    },
    {
      name: "Angular",
      icon: "devicon-angularjs-plain",
      url: "https://angular.io/",
    },
    {
      name: "C++",
      icon: "devicon-cplusplus-plain",
      url: "https://isocpp.org/",
    },
    {
      name: "AdonisJS",
      icon: "devicon-adonisjs-plain",
      url: "https://adonisjs.com/",
    },
    {
      name: "Prisma ORM",
      icon: "devicon-prisma-plain",
      url: "https://www.prisma.io/",
    },
    {
      name: "Flutter",
      icon: "devicon-flutter-plain",
      url: "https://flutter.dev/",
    },
    {
      name: "SQL",
      icon: "devicon-mysql-plain",
      url: "https://www.w3schools.com/sql/",
    },
    { name: "PHP", icon: "devicon-php-plain", url: "https://www.php.net/" },
    {
      name: "Laravel",
      icon: "devicon-laravel-plain",
      url: "https://laravel.com/",
    },
    {
      name: "Python",
      icon: "devicon-python-plain",
      url: "https://www.python.org/",
    },
    {
      name: "Adobe XD",
      icon: "devicon-xd-plain",
      url: "https://www.adobe.com/products/xd.html",
    },
    {
      name: "Figma",
      icon: "devicon-figma-plain",
      url: "https://www.figma.com/",
    },
  ];

  const experiencedSkills: Skill[] = [
    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      category: "language",
      proficiency: "Expert",
      description: "Core language for web development",
      experience: "5+ years",
      color: "text-yellow-500",
    },
    {
      name: "Python",
      icon: "devicon-python-plain",
      category: "language",
      proficiency: "Advanced",
      description: "Versatile language for backend and automation",
      experience: "3+ years",
      color: "text-blue-500",
    },
    {
      name: "PostgreSQL",
      icon: "devicon-postgresql-plain",
      category: "database",
      proficiency: "Advanced",
      description: "Robust relational database system",
      experience: "3+ years",
      color: "text-blue-400",
    },
    {
      name: "Redis",
      icon: "devicon-redis-plain",
      category: "database",
      proficiency: "Intermediate",
      description: "In-memory data structure store",
      experience: "2+ years",
      color: "text-red-500",
    },
    {
      name: "Docker",
      icon: "devicon-docker-plain",
      category: "backend",
      proficiency: "Advanced",
      description: "Container platform for applications",
      experience: "3+ years",
      color: "text-blue-500",
    },
    {
      name: "Git",
      icon: "devicon-git-plain",
      category: "backend",
      proficiency: "Expert",
      description: "Version control system",
      experience: "4+ years",
      color: "text-orange-500",
    },
  ];

  return {
    preferredSkills,
    skills,
    experiencedSkills,
  };
};
