export interface Skill {
  name: string;
  icon: string;
  url: string;
  slug: string;
  expertise?: number; // 1-100 for skill level
  years?: number;
  description?: string;
  projects?: { name: string; url?: string }[];
  content?: string; // Detailed content (can be markdown)
}

export const allSkills = [
  {
    id: "nuxtjs",
    name: "Nuxt.js",
    icon: "devicon-nuxtjs-plain",
    image: "/images/skills/nuxtjs-large.webp", // Optional custom image
    url: "https://nuxtjs.org/",
    level: "Expert",
    yearStarted: 2019, // When you started using this technology
    description:
      "A powerful Vue framework for building modern web applications with server-side rendering and static site generation capabilities.",

    // Detailed paragraphs
    details: [
      "Nuxt.js is an intuitive and versatile framework built on top of Vue.js that simplifies the development of Vue applications. It provides a structured project architecture with automatic route configuration based on your file structure.",
      "One of the key strengths of Nuxt.js is its flexibility in rendering modes. It supports server-side rendering (SSR) for improved SEO and initial load performance, static site generation (SSG) for blazing-fast static sites, and client-side rendering when needed.",
      "The framework includes powerful features like automatic code splitting, middleware support, and a plugin system that makes it easy to extend functionality. Its modular architecture allows developers to add only what they need, keeping applications lightweight and performant.",
      "With Nuxt 3, the framework introduced a new Composition API support, TypeScript integration, and Nitro server engine, making it even more powerful for modern web development needs.",
    ],

    // Key features bullet points
    features: [
      "Server-Side Rendering for improved SEO",
      "File-based routing system",
      "Auto-imported components",
      "Dynamic API handling",
      "Built-in state management",
      "Static Site Generation capabilities",
      "TypeScript support",
      "Hot module replacement during development",
    ],

    // Related technologies (reference to other skills by ID)
    relatedTech: [
      { id: "vuejs", name: "Vue.js" },
      { id: "javascript", name: "JavaScript" },
      { id: "tailwindcss", name: "Tailwind CSS" },
    ],

    // Learning resources
    resources: [
      {
        title: "Nuxt.js Documentation",
        type: "Official Docs",
        url: "https://nuxt.com/docs",
      },
      {
        title: "Mastering Nuxt 3",
        type: "Online Course",
        url: "https://masteringnuxt.com/",
      },
      {
        title: "Learn Nuxt 3 From Scratch",
        type: "YouTube Tutorial",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    ],

    // Code examples
    examples: [
      {
        title: "Basic Page Component",
        description: "A simple Nuxt page component using the Composition API",
        code: `<script setup>
const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <h1>Welcome to my Nuxt app</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>`,
      },
    ],
  },

  // Add more skills with similar detailed structure
  {
    id: "javascript",
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    image: "/images/skills/javascript-large.webp", // You'll need to add this image
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    level: "Expert",
    yearStarted: 2018, // Adjust to when you started using JavaScript
    description:
      "The versatile programming language of the web that powers interactive websites and modern web applications.",

    // Detailed paragraphs
    details: [
      "JavaScript is the backbone of modern web development, allowing developers to create dynamic, interactive websites and web applications. As an ECMAScript-based language, it has evolved significantly since its creation in 1995, with annual specification updates bringing powerful new features.",

      "My expertise with JavaScript spans from core language fundamentals like closures, prototypes, and the event loop to modern ES6+ features including arrow functions, destructuring, async/await, and modules. I leverage these features to write clean, efficient, and maintainable code.",

      "Beyond frontend development, I've worked extensively with JavaScript in Node.js environments, building REST APIs, microservices, and server-side applications. This full-stack capability allows me to develop end-to-end solutions using a single language.",

      "I'm particularly passionate about JavaScript's functional programming aspects, favoring immutable data patterns, pure functions, and higher-order functions to create predictable and testable code. I stay current with the latest JavaScript features and best practices through continuous learning and community engagement.",
    ],

    // Key features bullet points
    features: [
      "Versatile language for both frontend and backend development",
      "Event-driven, non-blocking architecture",
      "Rich ecosystem of libraries and frameworks",
      "Asynchronous programming with Promises and async/await",
      "Functional programming capabilities",
      "Dynamic typing with modern type checking solutions",
      "JSON integration for seamless data handling",
      "Regular expression support for complex text operations",
    ],

    // Related technologies (reference to other skills by ID)
    relatedTech: [
      { id: "typescript", name: "TypeScript" },
      { id: "nodejs", name: "Node.js" },
      { id: "vuejs", name: "Vue.js" },
      { id: "react", name: "React" },
    ],

    // Learning resources
    resources: [
      {
        title: "JavaScript.info",
        type: "Complete Tutorial",
        url: "https://javascript.info/",
      },
      {
        title: "MDN Web Docs - JavaScript",
        type: "Official Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        title: "You Don't Know JS",
        type: "Book Series",
        url: "https://github.com/getify/You-Dont-Know-JS",
      },
      {
        title: "JavaScript 30",
        type: "Practical Challenges",
        url: "https://javascript30.com/",
      },
    ],

    // Code examples
    examples: [
      {
        title: "Modern Async/Await Pattern",
        description:
          "Handling asynchronous operations with async/await for cleaner code",
        code: `// Fetching data from an API with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Using the function with error handling
const displayUserProfile = async () => {
  try {
    const userData = await fetchUserData(123);
    
    // Update UI with user data
    document.getElementById('username').textContent = userData.name;
    document.getElementById('email').textContent = userData.email;
    
  } catch (error) {
    // Handle errors in the UI
    document.getElementById('error-message').textContent = 
      'Could not load user profile. Please try again later.';
  }
};`,
      },
      {
        title: "Array Manipulation with Modern JS",
        description: "Using ES6+ features to handle array operations",
        code: `// Sample data
const users = [
  { id: 1, name: 'Alice', role: 'admin', active: true },
  { id: 2, name: 'Bob', role: 'user', active: false },
  { id: 3, name: 'Charlie', role: 'user', active: true },
  { id: 4, name: 'Diana', role: 'manager', active: true },
  { id: 5, name: 'Edward', role: 'user', active: false }
];

// Get all active users
const activeUsers = users.filter(user => user.active);

// Get names of all admins
const adminNames = users
  .filter(user => user.role === 'admin')
  .map(user => user.name);

// Create a lookup object by ID
const userById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

// Count users by role
const userCountByRole = users.reduce((acc, user) => {
  acc[user.role] = (acc[user.role] || 0) + 1;
  return acc;
}, {});

// Find a specific user
const findUser = (id) => users.find(user => user.id === id);

// Check if all users are active
const allActive = users.every(user => user.active);

// Check if any user is an admin
const hasAdmin = users.some(user => user.role === 'admin');`,
      },
    ],
  },

  {
    id: "vuejs",
    name: "Vue.js",
    icon: "devicon-vuejs-plain",
    image: "/images/skills/vuejs-large.webp", // You'll need to add this image
    url: "https://vuejs.org/",
    level: "Expert",
    yearStarted: 2019, // Adjust to when you started using Vue.js
    description:
      "A progressive JavaScript framework for building user interfaces with a focus on simplicity, flexibility, and performance.",

    // Detailed paragraphs
    details: [
      "Vue.js has been my primary frontend framework of choice for years, offering the perfect balance of simplicity and power. What sets Vue apart is its approachable learning curve combined with the scalability to handle enterprise-level applications – allowing developers to adopt features incrementally as projects grow.",

      "I've worked extensively with both Vue 2 and Vue 3, embracing the evolution of the framework from the Options API to the more flexible Composition API. This transition has enabled more reusable logic, better TypeScript integration, and improved performance through features like the reactivity system overhaul and the virtual DOM optimizations.",

      "My Vue.js experience spans single-page applications (SPAs), progressive web apps (PWAs), and server-side rendered applications using Nuxt.js. I've implemented complex state management patterns with Vuex/Pinia, built responsive layouts with Vue's component system, and created intricate animations with Vue's transition system.",

      "What I particularly value about Vue is its opinionated-yet-flexible architecture that provides clear patterns for solving common problems while allowing developers the freedom to structure applications as needed. The vibrant ecosystem of libraries and tools, combined with excellent documentation, makes Vue a joy to work with every day.",
    ],

    // Key features bullet points
    features: [
      "Component-based architecture for building reusable UI elements",
      "Reactive data binding and computed properties",
      "Declarative rendering with template syntax",
      "Composition API for flexible code organization",
      "Transitions and animations system",
      "Vue Router for SPA navigation",
      "Vuex/Pinia for state management",
      "Excellent developer experience with Vue DevTools",
      "Lightweight and performant virtual DOM implementation",
    ],

    // Related technologies (reference to other skills by ID)
    relatedTech: [
      { id: "nuxtjs", name: "Nuxt.js" },
      { id: "javascript", name: "JavaScript" },
      { id: "tailwindcss", name: "Tailwind CSS" },
      { id: "typescript", name: "TypeScript" },
    ],

    // Learning resources
    resources: [
      {
        title: "Vue.js Documentation",
        type: "Official Docs",
        url: "https://vuejs.org/guide/introduction.html",
      },
      {
        title: "Vue Mastery",
        type: "Video Courses",
        url: "https://www.vuemastery.com/",
      },
      {
        title: "Vue School",
        type: "Interactive Lessons",
        url: "https://vueschool.io/",
      },
      {
        title: "Awesome Vue",
        type: "Curated Resources",
        url: "https://github.com/vuejs/awesome-vue",
      },
    ],

    // Code examples
    examples: [
      {
        title: "Vue 3 Component with Composition API",
        description: "A modern Vue 3 component using the Composition API",
        code: `<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive state
const count = ref(0)
const name = ref('Vue Developer')

// Computed property
const greeting = computed(() => {
  return count.value > 0
    ? \`Hello, \${name.value}! You clicked \${count.value} times.\`
    : \`Welcome, \${name.value}! Try clicking the button.\`
})

// Methods
function increment() {
  count.value++
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted!')
})
</script>

<template>
  <div class="card">
    <h2>{{ greeting }}</h2>
    
    <button @click="increment" class="btn">
      Increment
    </button>
    
    <input v-model="name" placeholder="Your name" />
  </div>
</template>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #f8f8f8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #33a06f;
}

input {
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  width: 100%;
}
</style>`,
      },
      {
        title: "Vue Component with Props and Events",
        description:
          "A reusable component that receives props and emits events",
        code: `<script setup>
import { computed } from 'vue'

// Props definition
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
})

// Emits definition
const emit = defineEmits(['add-to-cart', 'view-details'])

// Computed properties
const discountedPrice = computed(() => {
  if (!props.product.discount) return props.product.price
  return props.product.price * (1 - props.product.discount / 100)
})

// Methods
const addToCart = () => {
  emit('add-to-cart', props.product.id)
}

const viewDetails = () => {
  emit('view-details', props.product.id)
}
</script>

<template>
  <div class="product-card" :class="{ 'is-featured': featured }">
    <div class="product-badge" v-if="featured">Featured</div>
    <img :src="product.image" :alt="product.name" class="product-image" />
    
    <div class="product-info">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-price">
        <span :class="{ 'discounted': product.discount }">
          {{ discountedPrice.toFixed(2) }}€
        </span>
        <span class="original-price" v-if="product.discount">
          {{ product.price.toFixed(2) }}€
        </span>
      </div>
      
      <div class="product-actions">
        <button @click="addToCart" class="add-button">
          Add to Cart
        </button>
        <button @click="viewDetails" class="view-button">
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.is-featured {
  border: 2px solid #42b883;
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #42b883;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Other styles omitted for brevity */
</style>`,
      },
    ],
  },

  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    image: "/images/skills/tailwindcss-large.webp", // You'll need to add this image
    url: "https://tailwindcss.com/",
    level: "Expert",
    yearStarted: 2020, // Adjust based on your experience
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    
    // Detailed paragraphs
    details: [
      "Tailwind CSS has revolutionized the way I approach web styling by providing a comprehensive set of utility classes that enable rapid UI development without leaving HTML. This utility-first approach allows for maximum flexibility while maintaining design consistency.",
      
      "Unlike traditional CSS frameworks that provide pre-designed components, Tailwind gives you low-level utility classes that let you build completely custom designs without fighting the framework. The result is websites that look unique rather than generic templates.",
      
      "I particularly value Tailwind's approach to responsive design, with intuitive breakpoint prefixes (sm:, md:, lg:, etc.) that make building mobile-first layouts straightforward. The framework's thoughtful defaults for spacing, colors, typography, and more create a solid foundation while still being highly customizable through the tailwind.config.js file.",
      
      "With the introduction of features like Just-in-Time compilation, Tailwind has addressed previous concerns about file size, allowing developers to use the framework efficiently even in large-scale projects. The combination of performance, developer experience, and design flexibility makes Tailwind my preferred styling solution for modern web applications."
    ],
    
    // Key features bullet points
    features: [
      "Utility-first approach for maximum flexibility",
      "Mobile-first responsive design system",
      "JIT compiler for optimal production builds",
      "Extensive customization through configuration",
      "Dark mode support out of the box",
      "Built-in design system with consistent spacing, colors, and typography",
      "First-party plugins for forms, typography, and more",
      "PurgeCSS integration for minimal production builds"
    ],
    
    // Related technologies
    relatedTech: [
      { id: "nuxtjs", name: "Nuxt.js" },
      { id: "vuejs", name: "Vue.js" },
      { id: "javascript", name: "JavaScript" }
    ],
    
    // Learning resources
    resources: [
      {
        title: "Tailwind CSS Documentation",
        type: "Official Docs",
        url: "https://tailwindcss.com/docs"
      },
      {
        title: "Tailwind UI",
        type: "Component Library",
        url: "https://tailwindui.com/"
      },
      {
        title: "Tailwind CSS: From Zero to Production",
        type: "Video Series",
        url: "https://www.youtube.com/playlist?list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0"
      },
      {
        title: "Refactoring UI",
        type: "Design Book",
        url: "https://www.refactoringui.com/"
      }
    ],
    
    // Code examples
    examples: [
      {
        title: "Responsive Card Component",
        description: "A responsive card component using Tailwind CSS utilities",
        code: `<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" 
           src="/img/card-image.jpg" 
           alt="Modern building architecture">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        Company Retreat
      </div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-slate-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have the perfect location.
      </p>
      <div class="mt-4">
        <button class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Book now
        </button>
      </div>
    </div>
  </div>
</div>`
      },
      {
        title: "Tailwind with Vue Component",
        description: "Using Tailwind CSS with a Vue.js component",
        code: `<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
              <p>{{ description }}</p>
              <ul class="list-disc space-y-2">
                <li v-for="(item, index) in items" :key="index" class="flex items-start">
                  <span class="h-6 flex items-center sm:h-7">
                    <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <p class="ml-2">{{ item }}</p>
                </li>
              </ul>
              <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <button @click="count++" class="text-cyan-600 hover:text-cyan-700 transition-colors">
                  Clicks: {{ count }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Tailwind with Vue'
  },
  description: {
    type: String,
    default: 'Using Tailwind CSS with Vue components is a powerful combination.'
  },
  items: {
    type: Array,
    default: () => [
      'Clean, semantic component structure with Vue',
      'Beautiful styling with Tailwind utilities',
      'No need to write custom CSS'
    ]
  }
})

const count = ref(0)
</script>`
      }
    ]
  },
];

// Helper functions
export const getAllSkills = () => {
  return [...allSkills];
};

export const getSkillBySlug = (slug: string): Skill | undefined => {
  console.log(slug);
  return getAllSkills().find((skill) => skill.id === slug);
};
