<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <article>
    <h1 class="heading-1">{{ title }}</h1>
    <p class="text-lg mt-3">{{ description }}</p>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 md:mt-10"
    >
      <dev-tools-skill-card
        v-for="skill in skills"
        :key="skill.name"
        :skill="skill"
      />
    </div>
  </article>
</template>
