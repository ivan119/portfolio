<!-- components/StarBackground.vue -->
<template>
  <group :rotation="[0, 0, Math.PI / 4]">
    <Points
      ref="points"
      :positions="sphere"
      frustum-culled
      :rotation="rotation"
    >
      <PointMaterial
        transparent
        color="#fff"
        size="0.002"
        :sizeAttenuation="true"
        :depthWrite="false"
      />
    </Points>
  </group>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Points, PointMaterial, Group } from "troisjs";
import * as THREE from "three";
import * as random from "maath/random";

const points = ref(null);
const rotation = ref([0, 0, 0]);
const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });

onMounted(() => {
  const animate = () => {
    rotation.value[0] -= 0.01;
    rotation.value[1] -= 0.007;
    requestAnimationFrame(animate);
  };
  animate();
});
</script>

<style scoped>
/* Add styles if needed */
</style>
