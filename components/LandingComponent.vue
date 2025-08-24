<script setup>
import { ref } from "vue";

const isButtonHovered = ref(false);

const buttonHover = (v) => {
  isButtonHovered.value = v;
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-6">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Ivan Kelava</h1>

      <article
        class="flex flex-col gap-4 text-gray-700 dark:text-gray-200 max-w-lg"
      >
        <h4 class="text-2xl md:text-3xl mb-3 font-semibold">
          Hey, I am Ivan Kelava, a senior frontend developer.
        </h4>

        <p class="flex flex-col gap-2">
          Currently working at
          <BaseButton
            href="https://gauss.hr/en"
            external
            class="transition-colors duration-300"
            @mouseover="buttonHover(true)"
            @mouseleave="buttonHover(false)"
          >
            <template #icon>
              <dev-tools-icons-gauss-logo
                class="w-6 h-6 mr-1"
                :class="{ 'text-primary': isButtonHovered }"
              />
            </template>
            Gauss
          </BaseButton>
          as team lead developer, focusing on CMS development.
        </p>

        <p class="flex flex-col gap-2">
          Maintainer of
          <BaseButton
            href="https://gauss.hr/en/celero-one"
            external
            variant="default"
            class="text-blue-500 hover:underline"
          >
            Celeronone
          </BaseButton>
          and
          <BaseButton
            href="https://fondovi.eu"
            external
            variant="default"
            class="text-blue-500 hover:underline"
          >
            Fondovi </BaseButton
          >.
        </p>

        <p class="flex flex-col gap-2">
          Besides programming, in my free time, I enjoy producing music, working
          out, and photography. You can check out my photos on
          <BaseButton
            href="https://instagram.com/your_instagram"
            external
            variant="default"
            class="text-blue-500 hover:underline"
          >
            Instagram </BaseButton
          >.
        </p>

        <p class="flex flex-col gap-2">
          I also love traveling and exploring new places. If you're ever in
          Osijek, feel free to reach out!
        </p>

        <div class="flex gap-4 mt-4">
          <BaseButton to="/about" variant="primary" class="px-6 py-3 text-lg">
            Learn More About Me
          </BaseButton>
          <BaseButton
            href="https://linkedin.com/in/your_linkedin"
            external
            variant="secondary"
            class="px-6 py-3 text-lg"
          >
            Connect on LinkedIn
          </BaseButton>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.transition-colors {
  transition: color 0.3s ease;
}

.text-primary {
  color: #1a73e8; /* Example primary color */
}
</style>
