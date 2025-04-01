<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="['background-toggle', { 'is-active': isActive }]"
  >
    <!-- Base background icon -->
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    
    <!-- Grid layers -->
    <line x1="2" y1="8" x2="22" y2="8" class="grid-line" />
    <line x1="2" y1="16" x2="22" y2="16" class="grid-line" />
    <line x1="8" y1="2" x2="8" y2="22" class="grid-line" />
    <line x1="16" y1="2" x2="16" y2="22" class="grid-line" />
    
    <!-- Animated particles -->
    <circle 
      v-for="(dot, i) in dots" 
      :key="i" 
      :cx="dot.x" 
      :cy="dot.y" 
      :r="dot.size" 
      class="sparkle" 
      :style="{ 
        animationDelay: `${i * 0.2}s`,
        transformOrigin: `${dot.x}px ${dot.y}px`,
        opacity: isActive ? 1 : 0.3
      }"
    />
    
    <!-- Animated connections -->
    <line 
      v-for="(conn, i) in connections" 
      :key="`conn-${i}`"
      :x1="conn.x1" 
      :y1="conn.y1" 
      :x2="conn.x2" 
      :y2="conn.y2"
      class="connection"
      :style="{ 
        strokeWidth: conn.width,
        opacity: isActive ? 0.5 : 0.1,
        animationDelay: `${i * 0.15}s`
      }"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

// Create particle dots across the grid
const dots = [
  { x: 6, y: 6, size: 1.2 },
  { x: 14, y: 10, size: 1 },
  { x: 8, y: 15, size: 0.8 },
  { x: 17, y: 17, size: 1.1 },
  { x: 18, y: 6, size: 0.9 },
  { x: 12, y: 12, size: 1.3 }
];

// Create connections between some dots
const connections = [
  { x1: 6, y1: 6, x2: 14, y2: 10, width: 0.7 },
  { x1: 14, y1: 10, x2: 12, y2: 12, width: 0.5 },
  { x1: 12, y1: 12, x2: 8, y2: 15, width: 0.6 },
  { x1: 17, y1: 17, x2: 8, y2: 15, width: 0.5 },
  { x1: 18, y1: 6, x2: 14, y2: 10, width: 0.4 }
];
</script>

<style scoped>
.background-toggle {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.background-toggle.is-active {
  stroke: var(--accent-color, #4a9eff);
  filter: drop-shadow(0 0 2px rgba(74, 158, 255, 0.4));
  transform: scale(1.1) rotate(0deg);
}

.background-toggle:not(.is-active) {
  transform: scale(1) rotate(-5deg);
}

rect {
  stroke: currentColor;
  transition: stroke 0.3s ease, fill 0.3s ease;
}

.grid-line {
  stroke: currentColor;
  transition: stroke 0.3s ease, stroke-dasharray 0.5s ease;
  stroke-dasharray: 0;
  stroke-dashoffset: 0;
}

.is-active .grid-line {
  stroke-dasharray: 2 2;
  animation: dash 10s linear infinite;
}

.sparkle {
  fill: currentColor;
  animation: pulse 2s infinite;
  transition: opacity 0.3s ease, fill 0.3s ease;
}

.is-active .sparkle {
  fill: var(--accent-color, #4a9eff);
  filter: drop-shadow(0 0 2px rgba(74, 158, 255, 0.6));
}

.connection {
  stroke: currentColor;
  animation: fade 3s infinite;
  transition: all 0.3s ease;
}

.is-active .connection {
  stroke: var(--accent-color, #4a9eff);
  animation: glow 3s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
}

@keyframes fade {
  0% { opacity: 0.1; }
  50% { opacity: 0.5; }
  100% { opacity: 0.1; }
}

@keyframes glow {
  0% { opacity: 0.3; stroke-width: 0.3; }
  50% { opacity: 0.8; stroke-width: 0.6; }
  100% { opacity: 0.3; stroke-width: 0.3; }
}

@keyframes dash {
  to { stroke-dashoffset: 20; }
}
</style> 