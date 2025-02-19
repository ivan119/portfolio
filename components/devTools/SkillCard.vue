<script setup lang="ts">
import { PropType } from "vue";
interface Skill {
  name: string;
  icon: string;
  url: string;
}
defineProps({
  skill: {
    type: Object as PropType<Skill>,
  },
});
</script>
<template>
  <BaseButton :to="skill.url" class="skill-card" external>
    <i :class="['devicon', skill.icon, 'colored']"></i>
    <h5 class="heading-5">{{ skill.name }}</h5>
  </BaseButton>
</template>
<style scoped>
.skill-card {
  @apply flex flex-col items-center text-center no-underline p-3 transition-all duration-500 ease-in-out relative;
  border: 2px solid transparent;
  border-radius: 0.75rem; /* Ensures rounded corners */
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #e2e8f0, #e2e8f0) border-box;
  transition:
    background 0.369s ease-in-out,
    box-shadow 0.369s ease-in-out;
}

.skill-card:hover {
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #2196f3, #4caf50) border-box;
  box-shadow: 0 0 15px rgba(33, 150, 243, 0.5); /* Soft glowing effect */
}
.dark .skill-card {
  background:
    linear-gradient(#091a28, #091a28) padding-box,
    linear-gradient(45deg, #e2e8f0, #e2e8f0) border-box;
}
.dark .skill-card:hover {
  background:
    linear-gradient(#091a28, #091a28) padding-box,
    linear-gradient(45deg, #2196f3, #4caf50) border-box;
  box-shadow: 0 0 15px rgba(33, 150, 243, 0.5); /* Soft glowing effect */
}
.skill-card i {
  @apply text-4xl mb-2;
}
</style>
