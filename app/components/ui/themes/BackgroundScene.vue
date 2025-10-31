// components/BackgroundScene.vue
<template>
  <div ref="sceneContainer" class="webgl-container"></div>
</template>

<script setup>
import * as THREE from "three";
import { useColorMode } from "#imports";

// Animation constants
const ANIMATION_SPEED = 0.01;
const PARTICLE_VELOCITY_FACTOR = 0.05;
const BOUNDARY_THRESHOLD = 25;
const ANIMATION_TIMEOUT_MULTIPLIER = 400;

// Configuration options that can be customized
const config = ref({
  particleColor: "#4a9eff", // Default dark mode particle color
  lightModeColor: "#C53030", // Project card border color for light mode (can be updated)
  particleCount: 120, // Number of particles
  connectionDistance: 8, // Max distance for particle connections
  connectionOpacity: 0.25, // Opacity of connections (increased for better visibility)
  connectionAnimDuration: 1.0, // Duration of connection animations in seconds
  pulseStrength: 2.0, // Strength of pulse effect when connecting
});

const sceneContainer = ref(null);
const colorMode = useColorMode();
let renderer, bgMaterial, particlesMaterial, connectionsMaterial;
let particlesMesh, connectionsMesh;
let particles = [];
let activeConnections = new Map(); // Track active connections between particles
let animationId = null; // Track animation frame ID for cleanup
let isAnimating = false; // Track animation state
let animationTimeouts = new Set(); // Track all setTimeout IDs for cleanup

// Function to update particle color externally
const updateParticleColor = (newColor, forLightMode = false) => {
  if (forLightMode) {
    config.value.lightModeColor = newColor;
  } else {
    config.value.particleColor = newColor;
  }

  if (particlesMaterial && connectionsMaterial) {
    updateMaterialColors();
  }
};

// Helper function to update material colors based on the current theme
const updateMaterialColors = () => {
  const isLight = colorMode.value === "light";
  const particleColor = isLight
    ? new THREE.Color(config.value.lightModeColor)
    : new THREE.Color(config.value.particleColor);

  if (particlesMaterial.uniforms && particlesMaterial.uniforms.color) {
    particlesMaterial.uniforms.color.value.set(particleColor);
  } else if (particlesMaterial.color) {
    particlesMaterial.color.set(particleColor);
  }

  if (connectionsMaterial.uniforms && connectionsMaterial.uniforms.color) {
    connectionsMaterial.uniforms.color.value.set(particleColor);
  } else if (connectionsMaterial.color) {
    connectionsMaterial.color.set(particleColor);
  }
};

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // Enable transparency
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Transparent background
  sceneContainer.value.appendChild(renderer.domElement);

  // Glowing Background with Smooth Gradient and Animation
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
    void main() {
      // Different colors for dark and light modes
      vec3 darkColor1 = vec3(0.05, 0.0, 0.3);
      vec3 darkColor2 = vec3(0.8, 0.1, 0.9);
      vec3 darkColor3 = vec3(0.2, 0.6, 1.0);

      vec3 lightColor1 = vec3(0.0, 0.2, 0.4);
      vec3 lightColor2 = vec3(0.4, 0.2, 0.6);
      vec3 lightColor3 = vec3(0.1, 0.3, 0.7);

      float glow = sin(vUv.x * 5.0 + time * 0.5) * 0.5 + 0.5;
      float glow2 = cos(vUv.y * 6.0 + time * 0.3) * 0.5 + 0.5;

      vec3 color1 = isLightMode ? lightColor1 : darkColor1;
      vec3 color2 = isLightMode ? lightColor2 : darkColor2;
      vec3 color3 = isLightMode ? lightColor3 : darkColor3;

      vec3 gradient = mix(color1, color2, glow);
      gradient = mix(gradient, color3, glow2);

      // Different opacity for dark and light modes
      float opacity = isLightMode ? 0.15 : 0.35;
      gl_FragColor = vec4(gradient, opacity);
    }
  `;

  bgMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0.0 },
      isLightMode: { value: colorMode.value === "light" },
    },
    transparent: true,
    depthWrite: false, // Add this to ensure proper transparency
  });

  // Adjust background plane to fit viewport perfectly
  const bgGeometry = new THREE.PlaneGeometry(200, 200); // Increased size
  const backgroundMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  backgroundMesh.position.z = -100; // Push further back
  // Ensure background fills viewport
  const distance = Math.abs(backgroundMesh.position.z);
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const height = 2 * Math.tan(vFov / 2) * distance;
  const width = height * camera.aspect;
  backgroundMesh.scale.set(width / 100, height / 100, 1);
  scene.add(backgroundMesh);

  // Create array to store particle positions and velocities
  particles = [];

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(config.value.particleCount * 3);
  const sizeArray = new Float32Array(config.value.particleCount); // For size animation
  const alphaArray = new Float32Array(config.value.particleCount); // For opacity animation

  for (let i = 0; i < config.value.particleCount; i++) {
    // Random position
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 50;

    // Store in array
    const index = i * 3;
    posArray[index] = x;
    posArray[index + 1] = y;
    posArray[index + 2] = z;

    // Default size and alpha values
    sizeArray[i] = 1.0; // Normalized size (will be multiplied by base size)
    alphaArray[i] = 1.0; // Normalized alpha (will affect particle opacity)

      // Store particle data for simulation
      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * PARTICLE_VELOCITY_FACTOR,
          (Math.random() - 0.5) * PARTICLE_VELOCITY_FACTOR,
          (Math.random() - 0.5) * PARTICLE_VELOCITY_FACTOR,
        ),
        index: i,
        size: 1.0, // Current size factor
        targetSize: 1.0, // Target size for animation
        sizeStartTime: 0, // Start time for size animation
        sizeDuration: 0, // Duration for size animation
        alpha: 1.0, // Current opacity factor
        targetAlpha: 1.0, // Target opacity for animation
        alphaStartTime: 0, // Start time for alpha animation
        alphaDuration: 0, // Duration for alpha animation
        connections: new Set(), // Track connections for this particle
      });
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3),
  );
  particlesGeometry.setAttribute(
    "size",
    new THREE.BufferAttribute(sizeArray, 1),
  );
  particlesGeometry.setAttribute(
    "alpha",
    new THREE.BufferAttribute(alphaArray, 1),
  );

  // Vertex shader that handles size and opacity animation
  const particleVertexShader = `
    attribute float size;
    attribute float alpha;
    varying float vAlpha;

    void main() {
      vAlpha = alpha;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * 0.3 * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  // Fragment shader for particles with glow effect
  const particleFragmentShader = `
    uniform vec3 color;
    uniform bool isLight;
    varying float vAlpha;

    void main() {
      // Calculate distance from center of point (0.5, 0.5)
      vec2 center = vec2(0.5, 0.5);
      float distance = length(gl_PointCoord - center) * 2.0;

      // Create soft circle with glowing edge
      float strength = 1.0 - smoothstep(0.2, 1.0, distance);

      // Adjust color brightness based on theme for better visibility
      vec3 finalColor = isLight ? mix(color, vec3(0.0, 0.0, 0.0), 0.3) : color;

      // Use the uniform color with alpha for glow
      gl_FragColor = vec4(finalColor, vAlpha * strength);
    }
  `;

  // Custom particle material with shaders
  particlesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(config.value.particleColor) },
      isLight: { value: colorMode.value === "light" },
    },
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Create connections with custom shader for animation
  const connectionVertexShader = `
    attribute float connectionAlpha;
    varying float vAlpha;

    void main() {
      vAlpha = connectionAlpha;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const connectionFragmentShader = `
    varying float vAlpha;
    uniform vec3 color;
    uniform bool isLight;

    void main() {
      // For light mode, we'll add a slight dark border to the connection lines
      // for better visibility against white background
      vec3 finalColor = isLight ? mix(color, vec3(0.0, 0.0, 0.0), 0.4) : color;
      gl_FragColor = vec4(finalColor, vAlpha);
    }
  `;

  // Empty initial connection geometry
  const connectionsGeometry = new THREE.BufferGeometry();

  connectionsMaterial = new THREE.ShaderMaterial({
    vertexShader: connectionVertexShader,
    fragmentShader: connectionFragmentShader,
    uniforms: {
      color: { value: new THREE.Color(config.value.particleColor) },
      isLight: { value: colorMode.value === "light" },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  connectionsMesh = new THREE.LineSegments(
    connectionsGeometry,
    connectionsMaterial,
  );
  scene.add(connectionsMesh);

  camera.position.z = 20;

  // Handle window resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", handleResize);

  // Update connections between particles
  const updateParticleConnections = () => {
    const positions = particlesMesh.geometry.attributes.position.array;
    const sizes = particlesMesh.geometry.attributes.size.array;
    const alphas = particlesMesh.geometry.attributes.alpha.array;
    const connections = [];
    const connectionAlphas = [];
    const currentConnections = new Map();

    // Update particle positions and animations
    particles.forEach((particle) => {
      // Update position
      particle.position.add(particle.velocity);

      // Boundary check
      if (Math.abs(particle.position.x) > BOUNDARY_THRESHOLD) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > BOUNDARY_THRESHOLD) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > BOUNDARY_THRESHOLD) particle.velocity.z *= -1;

      // Update position array
      const idx = particle.index * 3;
      positions[idx] = particle.position.x;
      positions[idx + 1] = particle.position.y;
      positions[idx + 2] = particle.position.z;

      // Animate size using time-based interpolation (runs on main thread)
      if (particle.sizeDuration > 0) {
        const elapsed = (Date.now() - particle.sizeStartTime) / 1000; // Convert to seconds
        const progress = Math.min(elapsed / particle.sizeDuration, 1.0);
        
        if (progress < 1.0) {
          // Interpolate between current and target size
          const startSize = particle.size === 1.0 ? particle.size : particle.size;
          particle.size = startSize + (particle.targetSize - startSize) * progress;
        } else {
          // Animation complete
          particle.size = particle.targetSize;
          particle.sizeDuration = 0;
        }
      }

      // Animate alpha using time-based interpolation (runs on main thread)
      if (particle.alphaDuration > 0) {
        const elapsed = (Date.now() - particle.alphaStartTime) / 1000; // Convert to seconds
        const progress = Math.min(elapsed / particle.alphaDuration, 1.0);
        
        if (progress < 1.0) {
          // Interpolate between current and target alpha
          const startAlpha = particle.alpha === 1.0 ? particle.alpha : particle.alpha;
          particle.alpha = startAlpha + (particle.targetAlpha - startAlpha) * progress;
        } else {
          // Animation complete
          particle.alpha = particle.targetAlpha;
          particle.alphaDuration = 0;
        }
      }

      // Update size and alpha arrays
      sizes[particle.index] = particle.size;
      alphas[particle.index] = particle.alpha;

      // Clear previous connections
      particle.connections.clear();
    });

    // Find connections and prepare animation if connections change
    for (let i = 0; i < particles.length; i++) {
      const particleA = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const particleB = particles[j];
        const distance = particleA.position.distanceTo(particleB.position);

        // If particles are close enough, create a connection
        if (distance < config.value.connectionDistance) {
          const connectionId = `${i}-${j}`;
          const reverseId = `${j}-${i}`;

          // Track connection
          particleA.connections.add(j);
          particleB.connections.add(i);

          // Store for comparison with previous frame
          currentConnections.set(connectionId, {
            particleA: i,
            particleB: j,
            distance: distance,
            age: activeConnections.has(connectionId)
              ? activeConnections.get(connectionId).age + 0.016
              : 0, // Approx 16ms per frame
          });

          // Animation: New connection forming
          if (
            !activeConnections.has(connectionId) &&
            !activeConnections.has(reverseId)
          ) {
            // Trigger "connect" animation on both particles
            triggerConnectAnimation(particleA);
            triggerConnectAnimation(particleB);
          }

          // Add connection to visual elements
          connections.push(
            particleA.position.x,
            particleA.position.y,
            particleA.position.z,
          );
          connections.push(
            particleB.position.x,
            particleB.position.y,
            particleB.position.z,
          );

          // Calculate connection opacity based on distance and age
          const ageOpacityFactor = Math.min(
            currentConnections.get(connectionId).age * 2,
            1.0,
          );
          const distanceOpacityFactor =
            1.0 - distance / config.value.connectionDistance;

          // Increase opacity for light mode to make connections more visible
          const isLight = colorMode.value === "light";
          const baseOpacity = isLight
            ? config.value.connectionOpacity * 2.5
            : config.value.connectionOpacity;
          const opacity =
            baseOpacity * distanceOpacityFactor * ageOpacityFactor;

          connectionAlphas.push(opacity, opacity); // One for each end of the line
        }
      }
    }

    // Check for broken connections to trigger animations
    activeConnections.forEach((connection, connectionId) => {
      if (!currentConnections.has(connectionId)) {
        // Connection broken, trigger "disconnect" animation on both particles
        triggerDisconnectAnimation(particles[connection.particleA]);
        triggerDisconnectAnimation(particles[connection.particleB]);
      }
    });

    // Update active connections tracker
    activeConnections = currentConnections;

    // Mark attributes for update
    particlesMesh.geometry.attributes.position.needsUpdate = true;
    particlesMesh.geometry.attributes.size.needsUpdate = true;
    particlesMesh.geometry.attributes.alpha.needsUpdate = true;

    // Update connections geometry
    connectionsMesh.geometry.dispose();
    connectionsMesh.geometry = new THREE.BufferGeometry();

    if (connections.length > 0) {
      connectionsMesh.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(connections, 3),
      );

      connectionsMesh.geometry.setAttribute(
        "connectionAlpha",
        new THREE.Float32BufferAttribute(connectionAlphas, 1),
      );
    }
  };

  // Animation when a new connection forms (time-based, runs on main thread)
  const triggerConnectAnimation = (particle) => {
    const now = Date.now();
    
    // Pulse effect - grow first
    const startSize = particle.size;
    particle.targetSize = config.value.pulseStrength;
    particle.sizeStartTime = now;
    particle.sizeDuration = config.value.connectionAnimDuration * 0.3;
    
    // Then return to normal (will be triggered in next phase)
    const returnToNormal = () => {
      if (particle && isAnimating) {
        particle.targetSize = 1.0;
        particle.sizeStartTime = Date.now();
        particle.sizeDuration = config.value.connectionAnimDuration * 0.7;
      }
    };
    
    // Use requestAnimationFrame callback instead of setTimeout to keep on main thread
    const scheduleReturn = () => {
      if (isAnimating) {
        const timeoutId = setTimeout(() => {
          animationTimeouts.delete(timeoutId);
          returnToNormal();
        }, config.value.connectionAnimDuration * 300);
        animationTimeouts.add(timeoutId);
      }
    };
    scheduleReturn();

    // Brief increase in brightness/opacity
    const startAlpha = particle.alpha;
    particle.targetAlpha = 1.5;
    particle.alphaStartTime = now;
    particle.alphaDuration = config.value.connectionAnimDuration * 0.2;
    
    // Then return to normal alpha
    const returnAlphaToNormal = () => {
      if (particle && isAnimating) {
        particle.targetAlpha = 1.0;
        particle.alphaStartTime = Date.now();
        particle.alphaDuration = config.value.connectionAnimDuration * 0.8;
      }
    };
    
    const scheduleAlphaReturn = () => {
      if (isAnimating) {
        const timeoutId = setTimeout(() => {
          animationTimeouts.delete(timeoutId);
          returnAlphaToNormal();
        }, config.value.connectionAnimDuration * 200);
        animationTimeouts.add(timeoutId);
      }
    };
    scheduleAlphaReturn();
  };

  // Animation when a connection breaks (time-based, runs on main thread)
  const triggerDisconnectAnimation = (particle) => {
    const now = Date.now();
    
    // Subtle shrink effect
    particle.targetSize = 0.7;
    particle.sizeStartTime = now;
    particle.sizeDuration = config.value.connectionAnimDuration * 0.5;
    
    // Then return to normal
    const returnToNormal = () => {
      if (particle && isAnimating) {
        particle.targetSize = 1.0;
        particle.sizeStartTime = Date.now();
        particle.sizeDuration = config.value.connectionAnimDuration * 0.5;
      }
    };
    
    const scheduleReturn = () => {
      if (isAnimating) {
        const timeoutId = setTimeout(() => {
          animationTimeouts.delete(timeoutId);
          returnToNormal();
        }, config.value.connectionAnimDuration * 500);
        animationTimeouts.add(timeoutId);
      }
    };
    scheduleReturn();

    // Brief decrease in brightness
    particle.targetAlpha = 0.6;
    particle.alphaStartTime = now;
    particle.alphaDuration = config.value.connectionAnimDuration * 0.4;
    
    // Then return to normal
    const returnAlphaToNormal = () => {
      if (particle && isAnimating) {
        particle.targetAlpha = 1.0;
        particle.alphaStartTime = Date.now();
        particle.alphaDuration = config.value.connectionAnimDuration * 0.6;
      }
    };
    
    const scheduleAlphaReturn = () => {
      if (isAnimating) {
        const timeoutId = setTimeout(() => {
          animationTimeouts.delete(timeoutId);
          returnAlphaToNormal();
        }, config.value.connectionAnimDuration * ANIMATION_TIMEOUT_MULTIPLIER);
        animationTimeouts.add(timeoutId);
      }
    };
    scheduleAlphaReturn();
  };

  const animate = () => {
    if (!isAnimating) return;
    
    animationId = requestAnimationFrame(animate);
    bgMaterial.uniforms.time.value += ANIMATION_SPEED;

    // Update particle connections (all runs on main thread)
    updateParticleConnections();

    renderer.render(scene, camera);
  };

  // Start animation
  isAnimating = true;
  animate();

  // Clean up on unmount
  return () => {
    // Stop animation first
    isAnimating = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // Cancel all pending timeouts (cleanup for main thread)
    animationTimeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    animationTimeouts.clear();
    
    // Cancel any pending timeouts
    particles.forEach((particle) => {
      delete particle.targetSize;
      delete particle.targetAlpha;
      delete particle.sizeStartTime;
      delete particle.sizeDuration;
      delete particle.alphaStartTime;
      delete particle.alphaDuration;
      delete particle.connections;
    });

    window.removeEventListener("resize", handleResize);
    scene.remove(backgroundMesh);
    scene.remove(particlesMesh);
    scene.remove(connectionsMesh);

    // Dispose of geometries and materials
    particlesMesh.geometry.dispose();
    connectionsMesh.geometry.dispose();
    bgMaterial.dispose();
    particlesMaterial.dispose();
    connectionsMaterial.dispose();

    renderer.dispose();
  };
});

// Watch for color mode changes and update materials
watch(
  () => colorMode.value,
  (newMode) => {
    if (bgMaterial && particlesMaterial && connectionsMaterial) {
      const isLight = newMode === "light";

      // Update shader uniforms
      bgMaterial.uniforms.isLightMode.value = isLight;

      if (
        connectionsMaterial.uniforms &&
        connectionsMaterial.uniforms.isLight
      ) {
        connectionsMaterial.uniforms.isLight.value = isLight;
      }

      if (particlesMaterial.uniforms && particlesMaterial.uniforms.isLight) {
        particlesMaterial.uniforms.isLight.value = isLight;
      }

      // Update particle and connection colors
      updateMaterialColors();
    }
  },
);

// Expose functions and config for external use
defineExpose({
  updateParticleColor,
  config,
  setProjectCardColor: (color) => updateParticleColor(color, true),
});
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
