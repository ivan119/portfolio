<script setup>
// Lazy load BaseButton since it's not needed immediately
const BaseButton = defineAsyncComponent(
  () => import("~/components/BaseButton.vue"),
);
</script>

<template>
  <div>
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Ivan Kelava</h1>

      <article class="flex flex-col gap-4 text-gray-800 dark:text-gray-300">
        <h4 class="text-xl md:text-2xl mb-2">
          Hey, I am Ivan Kelava, senior frontend developer.
        </h4>

        <p class="flex items-center gap-1">
          Currently working at
          <BaseButton
            href="https://gauss.hr"
            external
            icon="/images/gauss.svg"
            loading="lazy"
          >
            Gauss
          </BaseButton>
          as team lead developer
        </p>
        <div class="flex">
          <BaseButton to="/about" variant="primary"> About </BaseButton>
        </div>
      </article>
    </div>
    <MusicalKeys />
  </div>
</template>
