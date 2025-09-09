<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Nothing here yet",
  },
  description: {
    type: String,
    default: "Check back soon or try again later.",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="empty-state">
    <div class="wrapper">
      <div class="icon" v-if="icon">
        <span :class="icon"></span>
      </div>
      <h3 class="title">{{ title }}</h3>
      <p class="desc" v-if="description">{{ description }}</p>
      <div class="actions">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
}

.wrapper {
  position: relative;
  width: 100%;
  max-width: 48rem;
  padding: 2rem;
  border-radius: 1rem;
  background: linear-gradient(
      to bottom right,
      rgba(20, 184, 166, 0.06),
      rgba(37, 99, 235, 0.06)
    );
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.wrapper:before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 1rem;
  pointer-events: none;
  background: linear-gradient(135deg, var(--main-gradient-from), var(--main-gradient-to));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  margin: 0 auto 0.75rem auto;
  background-image: var(--main-gradient);
  color: white;
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 1.25rem;
  background: linear-gradient(90deg, var(--main-gradient-from), var(--main-gradient-to));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.desc {
  text-align: center;
  margin-top: 0.5rem;
  color: rgb(100 116 139);
}

.actions {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

:deep(.btn-primary) {
  background-image: var(--main-gradient);
}
</style>
