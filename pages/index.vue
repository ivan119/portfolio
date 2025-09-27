<script setup>
usePageSeo({
  title: "Ivan Kelava",
  description:
    "Senior frontend developer from Osijek, Croatia. Over 5 years building user-friendly websites and platforms. Explore projects, skills, and get in touch.",
  image: "/logo.png",
  imageAlt: "Ivan Kelava",
  lang: "en",
});
</script>

<template>
  <article class="flex flex-col gap-6 slide-enter-active">
    <h1 class="heading-1">
      <span class="font-extrabold">Ivan Kelava</span>
    </h1>

    <div>
      <h2 class="heading-2">
        Hey, I'm
        <span class="font-extrabold text-main-gradient-animated"
          >Ivan Kelava</span
        >, <br />
        a senior frontend developer from Osijek, Croatia.
      </h2>
      <template v-if="false">
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
      </template>
    </div>

    <div class="mt-4 space-y-4 slide-enter-active">
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
        the beauty of nature through photography.
      </p>

      <p>
        Feel free to reach out if you'd like to collaborate, or just grab a
        drink! You can contact me through
        <BaseButton
          href="https://www.linkedin.com/in/kelava-ivan"
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

<style scoped>
.font-extrabold {
  animation: gradient-shift 3s ease infinite;
  background-size: 200% auto;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}
</style>
