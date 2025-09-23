<script setup>
import "devicon/devicon.min.css";
import SkillCardV3 from "~/components/SkillCardV3.vue";
import { useSkills } from "~/composables/skills/useSkills";

const showFrameworkDetails = ref(false);

// Get skills data from composable (server-side)
const { preferredSkills, skills, experiencedSkills } = await useSkills();

// Always open official site for experienced skills
const openOfficial = (skill) => {
  if (skill?.url) {
    window.open(skill.url, "_blank");
  }
};

// Disable page transitions
definePageMeta({
  pageTransition: false,
});
</script>

<template>
  <div
    :class="[
      showFrameworkDetails
        ? '!max-w-7xl'
        : '!p-3 md:p-0 mx-auto w-full space-y-5',
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
              class="cursor-pointer hover:scale-[1.03] transition-transform duration-300"
              :skill="{
                title: skill.name,
                description: skill.description,
                link: '#',
                categories: [skill.category],
                tags: [{ name: skill.name, icon: skill.icon }],
                proficiency: skill.proficiency,
                experience: skill.experience,
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
                description: skill.description,
                link: '#',
                categories: [skill.category],
                tags: [{ name: skill.name, icon: skill.icon }],
                proficiency: skill.proficiency,
                experience: skill.experience,
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

/* Add glow effect on hover */
.skill-card:hover::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(
    45deg,
    var(--main-gradient-from),
    var(--main-gradient-to)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Add pulse animation for expert level skills */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.group[data-proficiency="Expert"]:hover {
  animation: pulse 2s infinite;
}

/* Add shine effect */
.shine {
  position: relative;
  overflow: hidden;
}

.shine::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(30deg);
  animation: shine 6s linear infinite;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group:hover .shine::before {
  opacity: 1;
}

@keyframes shine {
  0% {
    transform: rotate(30deg) translateX(-100%);
  }
  100% {
    transform: rotate(30deg) translateX(100%);
  }
}

/* Add floating animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.group:hover {
  animation: float 3s ease-in-out infinite;
}

/* Framework showcase animation */
.translate-x-0 {
  transform: translateX(0);
}

.translate-x-full {
  transform: translateX(100%);
}

/* Improve scrollbars */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
