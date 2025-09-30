<script setup lang="ts">
import SkillCardV3 from "~/components/SkillCardV3.vue";
import { useSkills } from "~/composables/skills/useSkills";

const showFrameworkDetails = ref(false);

// Get skills data from composable (server-side)
const { preferredSkills, experiencedSkills } = await useSkills();

usePageSeo({
  title: "Skills — Ivan Kelava",
  description:
    "Technical skills, tools, and frameworks Ivan Kelava uses for modern web development.",
  image: "/seo/IvanKelavaSkills1200x627.webp",
  imageAlt: "Ivan Kelava",
  lang: "en",
});

// Always open official site for experienced skills
import type { BasicSkill } from "~/types/skills";
const openOfficial = (skill: BasicSkill) => {
  if (skill?.url) {
    window.open(skill.url, "_blank");
  }
};

// Disable page transitions
definePageMeta({
  pageTransition: false,
});

const useBgDots = ref();
</script>

<template>
  <div
    :class="[
      showFrameworkDetails
        ? '!max-w-7xl'
        : '!p-3 pt-3 md:p-0 mx-auto w-full space-y-5 slide-enter-active',
    ]"
  >
    <UIBanner
      title="Technical Skills"
      description="Technologies and tools I've mastered throughout my journey"
    />

    <!-- Preferred Tech Stack -->
    <UIBanner
      title="Preferred Tech Stack"
      description="My go-to technologies for modern web development are:"
      :first-tag-is-h1="false"
    >
      <template #default>
        <section class="space-y-4">
          <UIEmptyState
            v-if="preferredSkills.length === 0"
            title="No preferred skills yet"
            description="They will appear here once available."
          />
          <div v-else class="skill-card-grid">
            <SkillCardV3
              v-for="skill in preferredSkills"
              :key="skill.name"
              @click.prevent="openOfficial(skill)"
              :use-bg-dots="useBgDots"
              class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
              :skill="{
                title: skill.name,
                description: skill.description || '',
                link: '#',
                categories: [skill.category || ''],
                tags: [{ name: skill.name, icon: skill.icon }],
                proficiency: skill.proficiency || '',
                experience: skill.experience || '',
              }"
              :colored="true"
            />
          </div>
        </section>
      </template>
    </UIBanner>
    <!-- Experienced With -->
    <UIBanner
      title="Experienced With"
      description="Over the years, I have worked with or have experience using a variety of frameworks and tools, including:"
      :first-tag-is-h1="false"
    >
      <template #default>
        <section class="space-y-4">
          <UIEmptyState
            v-if="experiencedSkills.length === 0"
            title="No experienced skills yet"
            description="They will appear here once available."
          />
          <div v-else class="skill-card-grid">
            <SkillCardV3
              v-for="skill in experiencedSkills"
              :key="skill.name"
              @click.prevent="openOfficial(skill)"
              class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
              :skill="{
                title: skill.name,
                description: skill.description || '',
                link: '#',
                categories: [skill.category || ''],
                tags: [{ name: skill.name, icon: skill.icon }],
                proficiency: skill.proficiency || '',
                experience: skill.experience || '',
              }"
              :colored="true"
              :showBgDots="false"
            />
          </div>
        </section>
      </template>
    </UIBanner>
  </div>
</template>

<style scoped>
.skill-card-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4;
}
.grid > div {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid > div:hover {
  transform: translateY(-4px);
}
</style>
