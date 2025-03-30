// components/BackgroundScene.vue
<template>
  <div ref="sceneContainer" class="webgl-container"></div>
</template>

<script setup>
import { onMounted, ref, watch, shallowRef } from 'vue';
import * as THREE from 'three';
import { useColorMode } from '#imports';

// Configuration options that can be customized
const config = ref({
  particleColor: '#4a9eff', // Default particle color (can be changed)
  particleCount: 120,       // Number of particles
  connectionDistance: 8,    // Max distance for particle connections
  connectionOpacity: 0.15,   // Opacity of connections
  connectionAnimDuration: 1.0, // Duration of connection animations in seconds
  pulseStrength: 2.0        // Strength of pulse effect when connecting
});

const sceneContainer = ref(null);
const colorMode = useColorMode();
let renderer, bgMaterial, particlesMaterial, connectionsMaterial;
let particlesMesh, connectionsMesh;
let particles = [];
let activeConnections = new Map(); // Track active connections between particles

// Function to update particle color externally
const updateParticleColor = (newColor) => {
  config.value.particleColor = newColor;
  if (particlesMaterial) {
    particlesMaterial.color.set(newColor);
  }
  if (connectionsMaterial) {
    connectionsMaterial.color.set(newColor);
  }
};

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true // Enable transparency
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
      float opacity = isLightMode ? 0.2 : 0.4;
      gl_FragColor = vec4(gradient, opacity);
    }
  `;
  
  bgMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0.0 },
      isLightMode: { value: colorMode.value === 'light' }
    },
    transparent: true // Enable transparency in the shader
  });
  
  const bgGeometry = new THREE.PlaneGeometry(100, 100);
  const backgroundMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  backgroundMesh.position.z = -50;
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
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ),
      index: i,
      size: 1.0,            // Current size factor
      targetSize: 1.0,      // Target size for animation
      sizeDelta: 0.0,       // Size change rate
      alpha: 1.0,           // Current opacity factor
      targetAlpha: 1.0,     // Target opacity for animation
      alphaDelta: 0.0,      // Opacity change rate
      connections: new Set() // Track connections for this particle
    });
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
  particlesGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphaArray, 1));
  
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
    varying float vAlpha;
    
    void main() {
      // Calculate distance from center of point (0.5, 0.5)
      vec2 center = vec2(0.5, 0.5);
      float distance = length(gl_PointCoord - center) * 2.0;
      
      // Create soft circle with glowing edge
      float strength = 1.0 - smoothstep(0.2, 1.0, distance);
      vec3 color = vec3(vAlpha); // Use alpha as intensity for glow
      
      gl_FragColor = vec4(color, vAlpha * strength);
    }
  `;
  
  // Custom particle material with shaders
  particlesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(config.value.particleColor) }
    },
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
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
    
    void main() {
      gl_FragColor = vec4(color, vAlpha);
    }
  `;
  
  // Empty initial connection geometry
  const connectionsGeometry = new THREE.BufferGeometry();
  
  connectionsMaterial = new THREE.ShaderMaterial({
    vertexShader: connectionVertexShader,
    fragmentShader: connectionFragmentShader,
    uniforms: {
      color: { value: new THREE.Color(config.value.particleColor) }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  connectionsMesh = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
  scene.add(connectionsMesh);

  camera.position.z = 20;

  // Handle window resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  window.addEventListener('resize', handleResize);

  // Update connections between particles
  const updateParticleConnections = () => {
    const positions = particlesMesh.geometry.attributes.position.array;
    const sizes = particlesMesh.geometry.attributes.size.array;
    const alphas = particlesMesh.geometry.attributes.alpha.array;
    const connections = [];
    const connectionAlphas = [];
    const currentConnections = new Map();
    
    // Update particle positions and animations
    particles.forEach(particle => {
      // Update position
      particle.position.add(particle.velocity);
      
      // Boundary check
      if (Math.abs(particle.position.x) > 25) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 25) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 25) particle.velocity.z *= -1;
      
      // Update position array
      const idx = particle.index * 3;
      positions[idx] = particle.position.x;
      positions[idx + 1] = particle.position.y;
      positions[idx + 2] = particle.position.z;
      
      // Animate size and alpha
      if (particle.size !== particle.targetSize) {
        particle.size += particle.sizeDelta;
        if ((particle.sizeDelta > 0 && particle.size >= particle.targetSize) ||
            (particle.sizeDelta < 0 && particle.size <= particle.targetSize)) {
          particle.size = particle.targetSize;
          particle.sizeDelta = 0;
        }
      }
      
      if (particle.alpha !== particle.targetAlpha) {
        particle.alpha += particle.alphaDelta;
        if ((particle.alphaDelta > 0 && particle.alpha >= particle.targetAlpha) ||
            (particle.alphaDelta < 0 && particle.alpha <= particle.targetAlpha)) {
          particle.alpha = particle.targetAlpha;
          particle.alphaDelta = 0;
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
            age: activeConnections.has(connectionId) ? 
                 activeConnections.get(connectionId).age + 0.016 : 0 // Approx 16ms per frame
          });
          
          // Animation: New connection forming
          if (!activeConnections.has(connectionId) && !activeConnections.has(reverseId)) {
            // Trigger "connect" animation on both particles
            triggerConnectAnimation(particleA);
            triggerConnectAnimation(particleB);
          }
          
          // Add connection to visual elements
          connections.push(particleA.position.x, particleA.position.y, particleA.position.z);
          connections.push(particleB.position.x, particleB.position.y, particleB.position.z);
          
          // Calculate connection opacity based on distance and age
          const ageOpacityFactor = Math.min(currentConnections.get(connectionId).age * 2, 1.0);
          const distanceOpacityFactor = 1.0 - (distance / config.value.connectionDistance);
          const opacity = config.value.connectionOpacity * distanceOpacityFactor * ageOpacityFactor;
          
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
        'position', 
        new THREE.Float32BufferAttribute(connections, 3)
      );
      
      connectionsMesh.geometry.setAttribute(
        'connectionAlpha',
        new THREE.Float32BufferAttribute(connectionAlphas, 1)
      );
    }
  };
  
  // Animation when a new connection forms
  const triggerConnectAnimation = (particle) => {
    // Pulse effect - grow and then return to normal
    particle.targetSize = config.value.pulseStrength;
    particle.sizeDelta = (particle.targetSize - particle.size) / (60 * config.value.connectionAnimDuration * 0.3);
    
    // Schedule return to normal after a delay
    setTimeout(() => {
      if (particle) {
        particle.targetSize = 1.0;
        particle.sizeDelta = (particle.targetSize - particle.size) / (60 * config.value.connectionAnimDuration * 0.7);
      }
    }, config.value.connectionAnimDuration * 300);
    
    // Brief increase in brightness/opacity
    particle.targetAlpha = 1.5;
    particle.alphaDelta = (particle.targetAlpha - particle.alpha) / (60 * config.value.connectionAnimDuration * 0.2);
    
    // Schedule return to normal alpha
    setTimeout(() => {
      if (particle) {
        particle.targetAlpha = 1.0;
        particle.alphaDelta = (particle.targetAlpha - particle.alpha) / (60 * config.value.connectionAnimDuration * 0.8);
      }
    }, config.value.connectionAnimDuration * 200);
  };
  
  // Animation when a connection breaks
  const triggerDisconnectAnimation = (particle) => {
    // Subtle shrink effect
    particle.targetSize = 0.7;
    particle.sizeDelta = (particle.targetSize - particle.size) / (60 * config.value.connectionAnimDuration * 0.5);
    
    // Schedule return to normal
    setTimeout(() => {
      if (particle) {
        particle.targetSize = 1.0;
        particle.sizeDelta = (particle.targetSize - particle.size) / (60 * config.value.connectionAnimDuration * 0.5);
      }
    }, config.value.connectionAnimDuration * 500);
    
    // Brief decrease in brightness
    particle.targetAlpha = 0.6;
    particle.alphaDelta = (particle.targetAlpha - particle.alpha) / (60 * config.value.connectionAnimDuration * 0.4);
    
    // Schedule return to normal
    setTimeout(() => {
      if (particle) {
        particle.targetAlpha = 1.0;
        particle.alphaDelta = (particle.targetAlpha - particle.alpha) / (60 * config.value.connectionAnimDuration * 0.6);
      }
    }, config.value.connectionAnimDuration * 400);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    bgMaterial.uniforms.time.value += 0.01;
    
    // Update particle connections
    updateParticleConnections();
    
    renderer.render(scene, camera);
  };

  animate();
  
  // Clean up on unmount
  return () => {
    // Cancel any pending timeouts
    particles.forEach(particle => {
      delete particle.targetSize;
      delete particle.targetAlpha;
      delete particle.connections;
    });
    
    window.removeEventListener('resize', handleResize);
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
watch(() => colorMode.value, (newMode) => {
  if (bgMaterial && particlesMaterial && connectionsMaterial) {
    const isLight = newMode === 'light';
    
    // Update shader uniform
    bgMaterial.uniforms.isLightMode.value = isLight;
    
    // Update particles color based on current config
    const particleColor = isLight 
      ? new THREE.Color(config.value.particleColor).multiplyScalar(0.7) 
      : new THREE.Color(config.value.particleColor);
      
    particlesMaterial.uniforms.color.value.set(particleColor);
    connectionsMaterial.uniforms.color.value.set(particleColor);
    
    // Update opacity
    particlesMaterial.uniforms.opacity.value = isLight ? 0.35 : 0.55;
    connectionsMaterial.uniforms.opacity.value = isLight 
      ? config.value.connectionOpacity * 0.8 
      : config.value.connectionOpacity;
  }
});

// Expose updateParticleColor function
defineExpose({ updateParticleColor, config });
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