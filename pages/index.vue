<script setup>
const isButtonHovered = ref(false);

const buttonHover = (v) => {
  isButtonHovered.value = v;
};
</script>

<template>
  <div>
    <div v-if="true" class="flex flex-col gap-6">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Ivan Kelava</h1>

      <article class="flex flex-col gap-4 text-gray-800 dark:text-gray-300">
        <h4 class="text-xl md:text-2xl mb-2">
          Hey, I am Ivan Kelava, senior frontend developer.
        </h4>

        <p class="flex items-center gap-1">
          Currently working at
          <BaseButton
            href="https://gauss.hr/en"
            external
            @mouseover="buttonHover(true)"
            @mouseleave="buttonHover(false)"
          >
            <template #icon>
              <dev-tools-icons-gauss-logo
                class="w-6 h-6 mr-1"
                :active-class="isButtonHovered"
              />
            </template>
            Gauss
          </BaseButton>
          as team lead developer
        </p>
        <div class="flex">
          <BaseButton to="/about" variant="primary"> About </BaseButton>
        </div>
      </article>
    </div>
    <template v-else>
      <landing-component />
    </template>
  </div>
</template>
