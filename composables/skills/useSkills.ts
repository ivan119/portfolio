export interface Skill {
  name: string;
  icon: string;
  category: string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  description: string;
  experience: string;
  color: string;
}

export const useSkills = () => {
  // Preferred Tech Stack
  const preferredSkills = ref<Skill[]>([
    {
      name: "Vue.js",
      icon: "devicon-vuejs-plain",
      category: "frontend",
      proficiency: "Expert",
      description: "Modern reactive framework for building user interfaces",
      experience: "4+ years",
      color: "text-emerald-500",
    },
    // ... rest of your preferred skills
  ]);

  // Experienced Skills
  const experiencedSkills = ref<Skill[]>([
    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      category: "language",
      proficiency: "Expert",
      description: "Core language for web development",
      experience: "5+ years",
      color: "text-yellow-500",
    },
    // ... rest of your experienced skills
  ]);

  // Navigation helper
  const router = useRouter();
  
  const navigateToSkill = (skill: Skill) => {
    const slug = skill.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/skills/${slug}`);
  };

  // Format skill for card display
  const formatSkillForCard = (skill: Skill) => {
    return {
      title: skill.name,
      description: skill.description,
      link: '#',
      categories: [skill.category],
      tags: [{ name: skill.name, icon: skill.icon }],
      proficiency: skill.proficiency,
      experience: skill.experience,
    };
  };

  return {
    preferredSkills,
    experiencedSkills,
    navigateToSkill,
    formatSkillForCard,
  };
}; 