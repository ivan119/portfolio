interface Skill {
  name: string;
  icon: string;
  category?: string;
  proficiency?: string;
  description?: string;
  experience?: string;
  color?: string;
  url?: string;
  id?: string;
}

export const useSkills = () => {
  const preferredSkills: Skill[] = [
    {
      id: "vuejs",
      name: "Vue.js",
      icon: "devicon-vuejs-plain",
      category: "frontend",
      proficiency: "Expert",
      description: "Modern reactive framework for building user interfaces",
      experience: "4+ years",
      color: "text-emerald-500",
      url: "https://vuejs.org/",
    },
    {
      id: "nuxtjs",
      name: "Nuxt.js",
      icon: "devicon-nuxtjs-plain",
      category: "framework",
      proficiency: "Expert",
      description: "Vue.js framework for building full-stack applications",
      experience: "3+ years",
      color: "text-green-500",
      url: "https://nuxt.com/",
    },
    {
      id: "typescript",
      name: "TypeScript",
      icon: "devicon-typescript-plain",
      category: "language",
      proficiency: "Expert",
      description: "Typed superset of JavaScript for scalable applications",
      experience: "3+ years",
      color: "text-blue-500",
      url: "https://www.typescriptlang.org/",
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      category: "language",
      proficiency: "Expert",
      description: "Core language for the web",
      experience: "5+ years",
      color: "text-yellow-500",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      id: "webstorm",
      name: "WebStorm",
      icon: "devicon-webstorm-plain",
      category: "tools",
      proficiency: "Expert",
      description: "Powerful JavaScript IDE from JetBrains",
      experience: "3+ years",
      color: "text-blue-600",
      url: "https://www.jetbrains.com/webstorm/",
    },
    {
      id: "cursor",
      name: "Cursor",
      icon: "devicon-vscode-plain",
      category: "tools",
      proficiency: "Expert",
      description: "Advanced AI-powered code editor",
      experience: "1+ year",
      color: "text-blue-500",
      url: "https://www.cursor.com/",
    },
    {
      id: "tailwindcss",
      name: "Tailwind CSS",
      icon: "devicon-tailwindcss-plain",
      category: "frontend",
      proficiency: "Expert",
      description: "Utility-first CSS framework",
      experience: "3+ years",
      color: "text-teal-500",
      url: "https://tailwindcss.com/",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: "devicon-mongodb-plain",
      category: "database",
      proficiency: "Advanced",
      description: "NoSQL database for modern applications",
      experience: "3+ years",
      color: "text-green-500",
      url: "https://www.mongodb.com/",
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
    // Older experienced stack (restored - adjusted per request)
    {
      name: "MySQL",
      icon: "devicon-mysql-plain",
      category: "database",
      proficiency: "Advanced",
      description: "Popular open-source relational database",
      experience: "3+ years",
      color: "text-blue-500",
      url: "https://www.mysql.com/",
    },
    

    {
      name: "React",
      icon: "devicon-react-plain",
      category: "frontend",
      proficiency: "Advanced",
      description: "Library for building user interfaces",
      experience: "3+ years",
      color: "text-blue-400",
      url: "https://react.dev/",
    },
    {
      name: "Next.js",
      icon: "devicon-nextjs-plain",
      category: "framework",
      proficiency: "Advanced",
      description: "React framework for production-grade applications",
      experience: "2+ years",
      color: "text-gray-800 dark:text-white",
      url: "https://nextjs.org/",
    },
    {
      name: "Vuetify",
      icon: "devicon-vuetify-plain",
      category: "framework",
      proficiency: "Advanced",
      description: "Material Design component framework for Vue.js",
      experience: "2+ years",
      color: "text-indigo-500",
      url: "https://vuetifyjs.com/",
    },
    {
      name: "Bootstrap",
      icon: "devicon-bootstrap-plain",
      category: "frontend",
      proficiency: "Advanced",
      description: "CSS framework for responsive, mobile-first sites",
      experience: "3+ years",
      color: "text-purple-600",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Node.js",
      icon: "devicon-nodejs-plain",
      category: "backend",
      proficiency: "Advanced",
      description: "JavaScript runtime for server-side development",
      experience: "3+ years",
      color: "text-green-600",
      url: "https://nodejs.org/",
    },
    {
      name: "Figma",
      icon: "devicon-figma-plain",
      category: "design",
      proficiency: "Advanced",
      description: "Collaborative interface design tool",
      experience: "3+ years",
      color: "text-orange-500",
      url: "https://www.figma.com/",
    },
    {
      name: "Adobe XD",
      icon: "devicon-xd-plain",
      category: "design",
      proficiency: "Advanced",
      description: "UI/UX design and prototyping",
      experience: "2+ years",
      color: "text-pink-500",
      url: "https://www.adobe.com/products/xd.html",
    },
    {
      name: "Python",
      icon: "devicon-python-plain",
      category: "language",
      proficiency: "Advanced",
      description: "Versatile language for backend and automation",
      experience: "3+ years",
      color: "text-blue-500",
      url: "https://www.python.org/",
    },
    {
      name: "PHP",
      icon: "devicon-php-plain",
      category: "language",
      proficiency: "Advanced",
      description: "General-purpose scripting for web development",
      experience: "3+ years",
      color: "text-indigo-500",
      url: "https://www.php.net/",
    },
    {
      name: "C++",
      icon: "devicon-cplusplus-plain",
      category: "language",
      proficiency: "Advanced",
      description: "High-performance systems programming language",
      experience: "2+ years",
      color: "text-indigo-500",
      url: "https://isocpp.org/",
    },
    {
      name: "AdonisJS",
      icon: "devicon-adonisjs-plain",
      category: "framework",
      proficiency: "Advanced",
      description: "Node.js MVC framework",
      experience: "2+ years",
      color: "text-indigo-600",
      url: "https://adonisjs.com/",
    },
  ];

  return {
    preferredSkills,
    skills,
    experiencedSkills,
  };
};
