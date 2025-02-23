export interface AiBlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  description: string;
  tags: string[];
}

export const posts: AiBlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Vue 3 and TypeScript",
    content: "Content will be here...",
    createdAt: "2024-03-20",
    description: "Learn how to set up a new Vue 3 project with TypeScript and best practices",
    tags: ["Vue", "TypeScript", "Web Development"]
  },
  {
    id: "2",
    title: "Understanding Nuxt 3 Server Routes",
    content: "Content will be here...",
    createdAt: "2024-03-19",
    description: "Deep dive into Nuxt 3's server routes and API handling",
    tags: ["Nuxt", "Server", "API"]
  }
  // Add more sample posts as needed
]; 