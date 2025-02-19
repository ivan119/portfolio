<script setup>
import "devicon/devicon.min.css";

// Define your skills data
const skills = [
  { name: "Nuxt.js", icon: "devicon-nuxtjs-plain", url: "https://nuxtjs.org/" },
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
  { name: "C++", icon: "devicon-cplusplus-plain", url: "https://isocpp.org/" },
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
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    url: "https://www.mongodb.com/",
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
  { name: "Figma", icon: "devicon-figma-plain", url: "https://www.figma.com/" },
];

const preferredSkills = [
  { name: "Nuxt.js", icon: "devicon-nuxtjs-plain", url: "https://nuxtjs.org/" },
  { name: "Vue.js", icon: "devicon-vuejs-plain", url: "https://vuejs.org/" },

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
];

const experiencedSkills = [
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    url: "https://www.typescriptlang.org/",
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
    name: "AdonisJS",
    icon: "devicon-adonisjs-plain",
    url: "https://adonisjs.com/",
  },
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
    name: "Prisma ORM",
    icon: "devicon-prisma-plain",
    url: "https://www.prisma.io/",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    url: "https://www.mongodb.com/",
  },
  {
    name: "SQL",
    icon: "devicon-mysql-plain",
    url: "https://www.w3schools.com/sql/",
  },
  {
    name: "Python",
    icon: "devicon-python-plain",
    url: "https://www.python.org/",
  },
  { name: "PHP", icon: "devicon-php-plain", url: "https://www.php.net/" },
  {
    name: "Laravel",
    icon: "devicon-laravel-plain",
    url: "https://laravel.com/",
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    url: "https://flutter.dev/",
  },
  {
    name: "Adobe XD",
    icon: "devicon-xd-plain",
    url: "https://www.adobe.com/products/xd.html",
  },
  { name: "Figma", icon: "devicon-figma-plain", url: "https://www.figma.com/" },
];
</script>

<template>
  <article>
    <SkillsTechStack
      title="Preferred Tech Stack"
      description="My go-to technologies for modern web development are:"
      :skills="preferredSkills"
    />

    <SkillsTechStack
      class="mt-10"
      title="Experienced With"
      description="Over the years, I have worked with or have experience using a variety of frameworks and tools, including:"
      :skills="experiencedSkills"
    />
  </article>
</template>
