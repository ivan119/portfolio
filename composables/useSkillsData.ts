import { ref, computed } from 'vue';

// Store skills data in ref to make it accessible throughout the app
const allSkills = ref([]);

export function useSkillsData() {
  // Helper function to create a slug
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };
  
  // Set skills data - only call this once from the skills index page
  const setSkillsData = (preferred: any[], experienced: any[]) => {
    allSkills.value = [...preferred, ...experienced];
  };
  
  // Find a skill by slug
  const findSkillBySlug = (slug: string) => {
    return allSkills.value.find(s => createSlug(s.name) === slug);
  };
  
  return {
    allSkills,
    setSkillsData,
    findSkillBySlug,
    createSlug
  };
} 