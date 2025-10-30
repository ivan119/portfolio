<script setup lang="ts">
import { useSkills } from "~/composables/skills/useSkills";
import { useIntersectionObserver } from "@vueuse/core";

const showFrameworkDetails = ref(false);
const { preferredSkills, experiencedSkills } = await useSkills();
const showExperienced = ref(false);
const experiencedTarget = useTemplateRef<HTMLDivElement>("experiencedTarget");

usePageSeo({
  title: "Skills — Ivan Kelava",
  description:
    "Technical skills, tools, and frameworks Ivan Kelava uses for modern web development.",
  image: "/seo/IvanKelavaSkills1200x627.webp",
  imageAlt: "Ivan Kelava",
  lang: "en",
});

definePageMeta({
  pageTransition: false,
});

// Only show once the section comes into view
useIntersectionObserver(experiencedTarget, ([entry], observer) => {
  if (entry?.isIntersecting) {
    showExperienced.value = true;
    observer.disconnect(); // stop observing after first trigger
  }
});
</script>

<template>
  <div
    :class="[
      showFrameworkDetails
        ? '!max-w-7xl'
        : '!p-3 pt-3 md:p-0 mx-auto w-full space-y-5 slide-enter-active',
    ]"
  >
    <Banner
      title="Technical Skills"
      description="Technologies and tools I've mastered throughout my journey"
    />

    <!-- Preferred Tech Stack -->
    <Banner
      title="Preferred Tech Stack"
      description="My go-to technologies for modern web development are:"
      :first-tag-is-h1="false"
    >
      <template #default>
        <section class="space-y-4">
          <EmptyState
            v-if="preferredSkills.length === 0"
            title="No preferred skills yet"
            description="They will appear here once available."
          />
          <div v-else class="skill-card-grid">
            <SkillCardV3
              v-for="skill in preferredSkills"
              :key="skill.name"
              class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
              :skill="{
                title: skill.name,
                description: skill.description || '',
                link: '#',
                categories: [skill.category || ''],
                tags: [{ name: skill.name, icon: skill.icon }],
                proficiency: skill.proficiency || '',
                experience: skill.experience || '',
                url: skill.url || '',
                icon: skill.icon || '',
              }"
              :colored="true"
            />
          </div>
        </section>
      </template>
    </Banner>

    <!-- Experienced With -->
    <div ref="experiencedTarget">
      <Transition name="fade-slide" appear>
        <Banner
          v-if="showExperienced"
          title="Experienced With"
          description="Over the years, I have worked with or have experience using a variety of frameworks and tools, including:"
          :first-tag-is-h1="false"
        >
          <template #default>
            <section class="space-y-4">
              <EmptyState
                v-if="experiencedSkills.length === 0"
                title="No experienced skills yet"
                description="They will appear here once available."
              />
              <div v-else class="skill-card-grid">
                <SkillCardV3
                  v-for="skill in experiencedSkills"
                  :key="skill.name"
                  class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                  :skill="{
                    title: skill.name,
                    description: skill.description || '',
                    link: '#',
                    categories: [skill.category || ''],
                    tags: [{ name: skill.name, icon: skill.icon }],
                    proficiency: skill.proficiency || '',
                    experience: skill.experience || '',
                    url: skill.url || '',
                    icon: skill.icon || '',
                  }"
                  :colored="true"
                  :showBgDots="false"
                />
              </div>
            </section>
          </template>
        </Banner>
      </Transition>
    </div>
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
.fade-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
