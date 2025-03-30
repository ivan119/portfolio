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
    <OrbitControls :enabled="false" />
  </TresCanvas>
</template>

<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount, computed } from 'vue';
import { useColorMode } from '#imports';
import { OrbitControls } from '@tresjs/cientos';

// Keep track of mounting state
const isMounted = ref(false);

// Dark mode detection
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

// Create particles using shallowRef for better performance
const particles = shallowRef([]);
const colors = [
  '#C53030', // Red
  '#DD6B20', // Orange
  '#D69E2E', // Yellow
  '#38A169', // Green
  '#3182CE', // Blue
  '#553C9A', // Indigo
  '#805AD5', // Violet
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
      (Math.random() - 0.5) * 20
    ],
    velocity: [
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05
    ],
    scale: Math.random() * 0.5 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
  particles.value = newParticles;
};

// Animation loop
let animationId = null;
let isAnimating = false;

const animate = () => {
  if (!isMounted.value || !isAnimating) return;
  
  const newParticles = [...particles.value];
  newParticles.forEach((particle) => {
    particle.position[0] += particle.velocity[0];
    particle.position[1] += particle.velocity[1];
    particle.position[2] += particle.velocity[2];
    
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
        (Math.random() - 0.5) * 20
      ],
      velocity: [
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ],
      scale: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
    particles.value = particlesCopy;
  } else {
    particles.value = newParticles;
  }
  
  animationId = requestAnimationFrame(animate);
};

// Start animation function
const startAnimation = () => {
  if (isAnimating) return;
  isAnimating = true;
  animate();
};

// Stop animation function
const stopAnimation = () => {
  isAnimating = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
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
        (Math.random() - 0.5) * 20
      ],
      velocity: [
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ],
      scale: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  particles.value = initialParticles;
  
  // Use setTimeout to ensure the component is fully mounted
  setTimeout(() => {
    startAnimation();
  }, 100);
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