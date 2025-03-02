<script setup>
import "devicon/devicon.min.css";

// Define all your skills data in one place
const allSkills = [
  { 
    name: "Nuxt.js", 
    icon: "devicon-nuxtjs-plain", 
    url: "https://nuxtjs.org/",
    category: "preferred" 
  },
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    category: "preferred"
  },
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    url: "https://tailwindcss.com/",
    category: "preferred"
  },
  { 
    name: "Vue", 
    icon: "devicon-vuejs-plain", 
    url: "https://vuejs.org/",
    category: "preferred" 
  },
  {
    name: "Bootstrap",
    icon: "devicon-bootstrap-plain",
    url: "https://getbootstrap.com/",
    category: "experienced"
  },
  {
    name: "Vuetify",
    icon: "devicon-vuetify-plain",
    url: "https://vuetifyjs.com/en/",
    category: "experienced"
  },
  {
    name: "React",
    icon: "devicon-react-original",
    url: "https://reactjs.org/",
    category: "experienced"
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-original-wordmark",
    url: "https://nextjs.org/",
    category: "experienced"
  },
  {
    name: "Angular",
    icon: "devicon-angularjs-plain",
    url: "https://angular.io/",
    category: "experienced"
  },
  { 
    name: "C++", 
    icon: "devicon-cplusplus-plain", 
    url: "https://isocpp.org/",
    category: "experienced" 
  },
  {
    name: "AdonisJS",
    icon: "devicon-adonisjs-plain",
    url: "https://adonisjs.com/",
    category: "experienced"
  },
  {
    name: "Prisma ORM",
    icon: "devicon-prisma-plain",
    url: "https://www.prisma.io/",
    category: "experienced"
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    url: "https://flutter.dev/",
    category: "experienced"
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    url: "https://www.mongodb.com/",
    category: "experienced"
  },
  {
    name: "SQL",
    icon: "devicon-mysql-plain",
    url: "https://www.w3schools.com/sql/",
    category: "experienced"
  },
  { 
    name: "PHP", 
    icon: "devicon-php-plain", 
    url: "https://www.php.net/",
    category: "experienced" 
  },
  {
    name: "Laravel",
    icon: "devicon-laravel-plain",
    url: "https://laravel.com/",
    category: "experienced"
  },
  {
    name: "Python",
    icon: "devicon-python-plain",
    url: "https://www.python.org/",
    category: "experienced"
  },
  {
    name: "Adobe XD",
    icon: "devicon-xd-plain",
    url: "https://www.adobe.com/products/xd.html",
    category: "experienced"
  },
  { 
    name: "Figma", 
    icon: "devicon-figma-plain", 
    url: "https://www.figma.com/",
    category: "experienced" 
  },
];

// Filter by category
const preferredSkills = allSkills.filter(skill => skill.category === "preferred");
const experiencedSkills = allSkills.filter(skill => skill.category === "experienced");

// Handle clicking on a skill
function navigateToSkill(skill) {
  // Could be implemented to navigate to a skill-specific page
  console.log(`Navigate to ${skill.name}`);
  // Example: if you wanted to add page navigation later
  // navigateTo(`/skills/${skill.name.toLowerCase().replace(/\s+/g, '-')}`);
}

definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    onBeforeLeave: () => {
      // This ensures view transitions work properly
      document.startViewTransition && document.startViewTransition();
    }
  },
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Page Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        My Technical Skills
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Technologies and tools I've mastered throughout my journey
      </p>
    </div>

    <!-- Preferred Tech Stack Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6">Preferred Tech Stack</h2>
      <p class="text-lg mb-8">My go-to technologies for modern web development are:</p>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="skill in preferredSkills" 
          :key="skill.name"
          @click="navigateToSkill(skill)"
          class="skill-card bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          :style="{ 'view-transition-name': `skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}` }"
        >
          <i :class="['devicon text-5xl mb-4', skill.icon, 'colored']"></i>
          <h3 class="text-lg font-bold">{{ skill.name }}</h3>
          <a 
            :href="skill.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-3 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            @click.stop
          >
            Learn more
          </a>
        </div>
      </div>
    </section>

    <!-- Experienced With Section -->
    <section>
      <h2 class="text-3xl font-bold mb-6">Experienced With</h2>
      <p class="text-lg mb-8">Over the years, I have worked with or have experience using a variety of frameworks and tools, including:</p>
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div 
          v-for="skill in experiencedSkills" 
          :key="skill.name"
          @click="navigateToSkill(skill)"
          class="skill-card bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow hover:shadow-md transition-all duration-300 cursor-pointer"
          :style="{ 'view-transition-name': `skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}` }"
        >
          <i :class="['devicon text-4xl mb-2', skill.icon, 'colored']"></i>
          <h3 class="text-base font-bold">{{ skill.name }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.skill-card:hover {
  transform: translateY(-5px);
}

.skill-card:hover i {
  transform: scale(1.1);
}

i {
  transition: transform 0.3s ease;
}
</style>
