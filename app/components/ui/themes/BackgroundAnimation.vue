<template>
  <TresCanvas
    class="background-animation"
    :clear-color="isDark ? '#091a28' : '#ffffff'"
    :alpha="true"
    :antialias="true"
    :window-size="{ width: 0, height: 0 }"
    v-if="isMounted"
  >
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <TresScene>
      <TresAmbientLight :intensity="0.5" />
      <TresPointLight :position="[10, 10, 10]" :intensity="1" />
      <TresMesh
        v-for="(particle, index) in particles"
        :key="index"
        :position="particle.position"
        :scale="particle.scale"
      >
        <TresSphereGeometry :args="[0.1, 16, 16]" />
        <TresMeshStandardMaterial
          :color="particle.color"
          :emissive="particle.color"
          :emissiveIntensity="isDark ? 0.7 : 0.4"
          :transparent="true"
          :opacity="0.8"
        />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>

<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useColorMode } from "#imports";

// Keep track of mounting state
const isMounted = ref(false);

// Dark mode detection
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

// Create particles using shallowRef for better performance
const particles = shallowRef([]);
const colors = [
  "#C53030", // Red
  "#DD6B20", // Orange
  "#D69E2E", // Yellow
  "#38A169", // Green
  "#3182CE", // Blue
  "#553C9A", // Indigo
  "#805AD5", // Violet
];
const maxParticles = 20; // Reduced for better performance

// Function to add a new particle
const addParticle = () => {
  if (particles.value.length >= maxParticles) return;

  const newParticles = [...particles.value];
  newParticles.push({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ],
    velocity: [
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
    ],
    scale: Math.random() * 0.5 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
  particles.value = newParticles;
};

// Animation loop - all runs on main thread
let animationId = null;
let isAnimating = false;
let lastFrameTime = 0;

const animate = (currentTime = 0) => {
  if (!isMounted.value || !isAnimating) return;

  // Calculate delta time for consistent animation speed
  const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 16.67 : 1; // Normalize to ~60fps
  lastFrameTime = currentTime || performance.now();

  const newParticles = [...particles.value];
  newParticles.forEach((particle) => {
    // Apply velocity with delta time normalization (ensures main thread consistency)
    particle.position[0] += particle.velocity[0] * deltaTime;
    particle.position[1] += particle.velocity[1] * deltaTime;
    particle.position[2] += particle.velocity[2] * deltaTime;

    // Bounce off boundaries
    for (let i = 0; i < 3; i++) {
      if (Math.abs(particle.position[i]) > 10) {
        particle.velocity[i] *= -1;
      }
    }
  });

  // Randomly add new particles (less frequently)
  if (Math.random() < 0.01 && particles.value.length < maxParticles) {
    const particlesCopy = [...newParticles];
    particlesCopy.push({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ],
      velocity: [
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
      ],
      scale: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    particles.value = particlesCopy;
  } else {
    particles.value = newParticles;
  }

  // Continue animation on main thread
  animationId = requestAnimationFrame(animate);
};

// Start animation function - ensures main thread execution
const startAnimation = () => {
  if (isAnimating) return;
  isAnimating = true;
  lastFrameTime = 0;
  // Use requestAnimationFrame to ensure we start on the main thread
  animationId = requestAnimationFrame(animate);
};

// Stop animation function - proper cleanup on main thread
const stopAnimation = () => {
  isAnimating = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  lastFrameTime = 0;
};

onMounted(() => {
  isMounted.value = true;

  // Initialize with some particles
  const initialParticles = [];
  for (let i = 0; i < 10; i++) {
    initialParticles.push({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ],
      velocity: [
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
      ],
      scale: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  particles.value = initialParticles;

  // Use nextTick + requestAnimationFrame to ensure main thread execution
  nextTick(() => {
    // Use requestAnimationFrame instead of setTimeout to keep on main thread
    requestAnimationFrame(() => {
      startAnimation();
    });
  });
});

onBeforeUnmount(() => {
  // First stop the animation
  stopAnimation();
  // Then mark component as unmounted
  isMounted.value = false;
});
</script>

<style scoped>
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: -1;
  pointer-events: none;
}
</style>
