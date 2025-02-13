<script setup>
const isButtonHovered = ref(false);

const buttonHover = (v) => {
  isButtonHovered.value = v;
};
</script>

<template>
  <article>
    <div v-if="true" class="flex flex-col gap-6">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Ivan Kelava</h1>

      <div class="flex flex-col md:gap-3 text-gray-800 dark:text-gray-300">
        <h2 class="text-xl md:text-2xl mb-2">
          Hey, I am Ivan Kelava, senior frontend developer.
        </h2>

        <h3 class="flex items-center gap-1">
          Currently working at
          <BaseButton href="https://gauss.hr/en" external>
            <template #icon>
              <dev-tools-icons-gauss-logo class="w-6 h-6 mr-1" />
            </template>
            Gauss
          </BaseButton>
        </h3>
        <h3 class="flex items-center flex-wrap gap-1">
          Core team lead and maintainer of
          <BaseButton
            href="https://gaussbox.com/modules-cms"
            external
            @mouseover="buttonHover(false)"
            @mouseleave="buttonHover(false)"
          >
            <template #icon>
              <dev-tools-icons-gauss-logo
                class="w-6 h-6 mr-1"
                :active-class="isButtonHovered"
              />
            </template>
            Gauss CMS
          </BaseButton>
        </h3>
      </div>
      <div class="mt-3">
        <p>
          I thrive on turning ideas into reality. Explore my portfolio to see
          the diverse range of projects I've brought to life. You can find my
          <base-button to="/projects" variant="link">
            projects list here.
          </base-button>
        </p>
      </div>
    </div>
    <template v-else>
      <landing-component />
    </template>
  </article>
</template>
