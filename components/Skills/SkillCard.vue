<script setup lang="ts">
import { type PropType } from "vue";
interface Skill {
  name: string;
  icon: string;
  url: string;
}
defineProps({
  skill: {
    type: Object as PropType<Skill>,
    required: true,
    default: "",
  },
});
</script>
<template>
  <BaseButton :to="skill.url" class="skill-card" external>
    <i :class="['devicon', skill.icon, 'colored']"></i>
    <h2 class="heading-6">{{ skill.name }}</h2>
  </BaseButton>
</template>
<style scoped>
.skill-card i {
  @apply text-4xl mb-2;
}
</style>
