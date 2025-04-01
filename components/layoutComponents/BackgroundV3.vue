<template>
  <div ref="sceneContainer" class="webgl-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as THREE from "three";
import { useColorMode } from "#imports";

// Configuration options
const config = ref({
  nodeCount: 42, // Sacred number
  pathCount: 60, // Increased for more complexity
  pulseSpeed: 0.618, // Golden ratio
  flowSpeed: 1.618, // Golden ratio
  nodeSize: 0.4,
  darkModeColor: "#9333ea", // Rich purple for mystical effect
  lightModeColor: "#6366f1",
  energyIntensity: 2.0,
  sacredSymbols: true,
});

const sceneContainer = ref(null);
const colorMode = useColorMode();
let renderer, scene, camera;
let neuralMaterial, energyMaterial, backgroundMaterial;
let nodes = [], energyPaths = [];

onMounted(() => {
  initScene();
  createBackground();
  createNeuralNetwork();
  animate();

  // Handle window resize
  window.addEventListener("resize", handleResize);

  // Cleanup on unmount
  return () => {
    window.removeEventListener("resize", handleResize);
    cleanup();
  };
});

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  sceneContainer.value.appendChild(renderer.domElement);
  
  camera.position.z = 25;
}

function createBackground() {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float time;
    uniform bool isLightMode;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;

    #define PI 3.14159265359

    // Enhanced noise function for mystical patterns
    float mysticNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = sin(dot(i, vec2(12.9898,78.233)) * 43758.5453123);
      float b = sin(dot(i + vec2(1.0, 0.0), vec2(12.9898,78.233)) * 43758.5453123);
      float c = sin(dot(i + vec2(0.0, 1.0), vec2(12.9898,78.233)) * 43758.5453123);
      float d = sin(dot(i + vec2(1.0, 1.0), vec2(12.9898,78.233)) * 43758.5453123);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    // Sacred geometry patterns
    float sacredGeometry(vec2 st, float time) {
      // Flower of Life pattern
      float r = length(st);
      float a = atan(st.y, st.x);
      
      float circles = 0.0;
      for(float i = 0.0; i < 6.0; i++) {
        float angle = i * PI / 3.0;
        vec2 pos = st - 0.5 * vec2(cos(angle), sin(angle));
        circles += smoothstep(0.1, 0.11, length(pos));
      }
      
      // Metatron's Cube
      float metatron = 0.0;
      for(float i = 0.0; i < 12.0; i++) {
        float angle = i * PI / 6.0;
        vec2 pos = st - 0.3 * vec2(cos(angle + time * 0.2), sin(angle + time * 0.2));
        metatron += smoothstep(0.05, 0.06, length(pos));
      }
      
      return circles * metatron;
    }

    void main() {
      vec2 st = vUv;
      st = st * 2.0 - 1.0;
      
      // Create mystical flow effect
      float flow = mysticNoise(st * 3.0 + time * 0.2);
      float sacred = sacredGeometry(st, time);
      
      // Divine light rays
      float rays = pow(abs(sin(atan(st.y, st.x) * 12.0 + time)), 3.0);
      
      // Energy vortex
      float vortex = length(st) - mysticNoise(st * 5.0 - time * 0.3);
      
      // Mix all effects
      vec3 color = mix(color1, color2, flow);
      color = mix(color, color3, sacred);
      color += rays * color2 * 0.3;
      color *= (1.0 - vortex * 0.5);
      
      // Add divine glow
      float glow = sin(time) * 0.5 + 0.5;
      color += color3 * glow * 0.2;
      
      float opacity = isLightMode ? 0.15 : 0.4;
      gl_FragColor = vec4(color, opacity);
    }
  `;

  backgroundMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      isLightMode: { value: colorMode.value === "light" },
      color1: { value: new THREE.Color(0x1a1a4f) }, // Deep mystical blue
      color2: { value: new THREE.Color(0x4a1a4f) }, // Rich purple
      color3: { value: new THREE.Color(0x1a4a4f) }, // Mystical teal
    },
    transparent: true,
    depthWrite: false,
  });

  const geometry = new THREE.PlaneGeometry(200, 200);
  const mesh = new THREE.Mesh(geometry, backgroundMaterial);
  mesh.position.z = -100;
  scene.add(mesh);

  // Ensure background fills viewport
  const distance = Math.abs(mesh.position.z);
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const height = 2 * Math.tan(vFov / 2) * distance;
  const width = height * camera.aspect;
  mesh.scale.set(width / 100, height / 100, 1);
}

function createNeuralNetwork() {
  const nodeGeometry = new THREE.SphereGeometry(config.value.nodeSize, 32, 32);
  
  // Enhanced node shader
  const nodeVertexShader = `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const nodeFragmentShader = `
    uniform vec3 color;
    uniform float time;
    uniform bool isLightMode;
    varying vec3 vPosition;
    
    void main() {
      // Divine pulse effect
      float pulse = sin(time * 1.618) * 0.5 + 0.5; // Golden ratio
      vec3 finalColor = color;
      float alpha = isLightMode ? 0.8 : 0.95;
      
      // Enhanced glow effect
      vec3 normal = normalize(vPosition);
      float intensity = pow(0.7 - dot(normal, vec3(0, 0, 1.0)), 3.0);
      
      // Add divine aura
      float aura = pow(0.8 - dot(normal, vec3(0, 0, 1.0)), 5.0);
      finalColor += color * intensity * pulse;
      finalColor += vec3(1, 1, 1) * aura * 0.3;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // Enhanced energy path shader
  const energyVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const energyFragmentShader = `
    uniform vec3 color;
    uniform float time;
    uniform bool isLightMode;
    varying vec2 vUv;
    
    void main() {
      // Create flowing energy effect
      float flow = fract(vUv.x - time * 1.618); // Golden ratio
      float intensity = smoothstep(0.0, 0.1, flow) * smoothstep(1.0, 0.9, flow);
      
      // Add mystical pulse
      float pulse = sin(time * 3.0 + vUv.x * 6.28) * 0.5 + 0.5;
      intensity *= (0.8 + pulse * 0.4);
      
      // Divine glow
      float glow = pow(intensity, 2.0) * 1.5;
      vec3 finalColor = color + vec3(0.2, 0.2, 0.4) * glow;
      
      float alpha = intensity * (isLightMode ? 0.6 : 0.8);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // Initialize materials properly
  neuralMaterial = new THREE.ShaderMaterial({
    vertexShader: nodeVertexShader,
    fragmentShader: nodeFragmentShader,
    uniforms: {
      color: { value: new THREE.Color(colorMode.value === "light" ? config.value.lightModeColor : config.value.darkModeColor) },
      time: { value: 0 },
      isLightMode: { value: colorMode.value === "light" }
    },
    transparent: true,
    depthWrite: false
  });

  energyMaterial = new THREE.ShaderMaterial({
    vertexShader: energyVertexShader,
    fragmentShader: energyFragmentShader,
    uniforms: {
      color: { value: new THREE.Color(colorMode.value === "light" ? config.value.lightModeColor : config.value.darkModeColor) },
      time: { value: 0 },
      isLightMode: { value: colorMode.value === "light" }
    },
    transparent: true,
    depthWrite: false
  });

  // Create sacred geometry pattern for node positions
  const nodePositions = [];
  for (let i = 0; i < config.value.nodeCount; i++) {
    const angle = (i / config.value.nodeCount) * Math.PI * 2;
    const radius = 20 + Math.sin(i * 1.618) * 10; // Golden ratio spiral
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = Math.sin(i * 1.618) * 10;
    nodePositions.push(new THREE.Vector3(x, y, z));
  }

  // Create nodes in sacred pattern
  nodes = nodePositions.map(pos => {
    const node = new THREE.Mesh(nodeGeometry, neuralMaterial);
    node.position.copy(pos);
    scene.add(node);
    return node;
  });

  // Create divine energy paths
  for (let i = 0; i < config.value.pathCount; i++) {
    const startNode = nodes[i % nodes.length];
    const endNode = nodes[(i + Math.floor(config.value.nodeCount / 3)) % nodes.length];
    
    const midPoint = new THREE.Vector3()
      .addVectors(startNode.position, endNode.position)
      .multiplyScalar(0.5);
    
    midPoint.z += Math.sin(i * 1.618) * 10; // Add golden ratio variation

    const curve = new THREE.QuadraticBezierCurve3(
      startNode.position,
      midPoint,
      endNode.position
    );

    const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
    const energyPath = new THREE.Mesh(geometry, energyMaterial);
    scene.add(energyPath);
    energyPaths.push(energyPath);
  }
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now() * 0.001;

  // Update materials
  backgroundMaterial.uniforms.time.value = time;
  neuralMaterial.uniforms.time.value = time;
  energyMaterial.uniforms.time.value = time * config.value.flowSpeed;

  // Animate nodes in divine pattern
  nodes.forEach((node, i) => {
    const angle = time * 0.2 + (i / nodes.length) * Math.PI * 2;
    const radius = 20 + Math.sin(time * 0.5 + i * 1.618) * 5;
    node.position.x += Math.sin(angle + i) * 0.02;
    node.position.y += Math.cos(angle + i) * 0.02;
    node.position.z += Math.sin(time + i * 1.618) * 0.01;
  });

  renderer.render(scene, camera);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function cleanup() {
  scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (object.material.length) {
        for (let material of object.material) material.dispose();
      } else {
        object.material.dispose();
      }
    }
  });
  renderer.dispose();
}

// Watch for color mode changes
watch(
  () => colorMode.value,
  (newMode) => {
    const isLight = newMode === "light";
    const color = new THREE.Color(isLight ? config.value.lightModeColor : config.value.darkModeColor);
    
    neuralMaterial.uniforms.isLightMode.value = isLight;
    neuralMaterial.uniforms.color.value = color;
    
    energyMaterial.uniforms.isLightMode.value = isLight;
    energyMaterial.uniforms.color.value = color;
    
    backgroundMaterial.uniforms.isLightMode.value = isLight;
  }
);
</script>

<style scoped>
.webgl-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style> 