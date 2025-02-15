<script setup>
const isButtonHovered = ref(false);

const buttonHover = (v) => {
  isButtonHovered.value = v;
};
</script>

<template>
  <article class="flex flex-col gap-6">
    <h1 class="text-3xl md:text-4xl font-bold mb-3">Ivan Kelava</h1>

    <div>
      <h2 class="text-xl md:text-2xl">
        Hey, I'm Ivan Kelava, a senior frontend developer
      </h2>

      <p class="flex items-center gap-2 flex-wrap mt-3">
        Currently working at
        <BaseButton href="https://gauss.hr/en" external>
          <template #icon>
            <dev-tools-icons-gauss-logo class="w-6 h-6 mr-1" />
          </template>
          Gauss
        </BaseButton>
      </p>

      <p class="flex items-center gap-2 flex-wrap">
        Core team lead and maintainer of
        <BaseButton href="https://gaussbox.com/modules-cms" external>
          <template #icon>
            <dev-tools-icons-gauss-logo class="w-6 h-6 mr-1" />
          </template>
          Gauss CMS
        </BaseButton>
      </p>
    </div>

    <div class="mt-4 space-y-4">
      <p>
        With over 5 years of experience in crafting user-friendly websites and
        large-scale platforms, I thrive on transforming innovative ideas into
        tangible realities. Explore my portfolio to discover the diverse range
        of projects I've brought to life. You can find my
        <BaseButton to="/projects" variant="link"
          >projects list here.</BaseButton
        >
      </p>
      <p>
        Besides frontend development, I have experience with backend
        technologies, making me a versatile full-stack developer. You can
        explore my technical stack
        <BaseButton variant="link" to="/skills"> here.</BaseButton>
      </p>
      <p>
        Outside of programming, I have experience producing music and capturing
        the beauty of nature through photography. Some of my photos can be found
        on my
        <BaseButton
          href="https://instagram.com/your_instagram"
          external
          variant="link"
          >Instagram.</BaseButton
        >
      </p>

      <p>
        Feel free to reach out if you'd like to collaborate, or just grab a
        drink! I'm always open to connecting with new people. You can contact me
        through
        <BaseButton
          href="https://linkedin.com/in/your_linkedin"
          external
          variant="link"
          >LinkedIn</BaseButton
        >
        or drop me an
        <BaseButton
          href="mailto:ivankelava991@gmail.com"
          external
          variant="link"
          >email here.</BaseButton
        >
      </p>
    </div>
  </article>
</template>
