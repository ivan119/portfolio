<script setup lang="ts">
const { isLoading, progress } = useLoadingIndicator();

// Only show spinner if navigation takes longer than this threshold.
// Fast navigations (cached/prerendered pages) never flash the loader.
const THRESHOLD_MS = 693;

const isNavigating = ref(false);
const router = useRouter();
let showTimer: ReturnType<typeof setTimeout> | null = null;
let navigationStart = 0;

router.beforeEach(() => {
  navigationStart = Date.now();
  // Schedule the spinner to appear only after THRESHOLD_MS
  showTimer = setTimeout(() => {
    isNavigating.value = true;
  }, THRESHOLD_MS);
});

router.afterEach(() => {
  // Cancel the timer — if navigation finished before threshold, spinner never shows
  if (showTimer !== null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  // If spinner was already visible, keep it a tiny bit so it doesn't flash-disappear
  if (isNavigating.value) {
    const elapsed = Date.now() - navigationStart;
    const minVisibleMs = 400; // spinner visible for at least this long
    const remaining = Math.max(0, minVisibleMs - elapsed + THRESHOLD_MS);
    setTimeout(() => { isNavigating.value = false; }, remaining);
  }
});

router.onError(() => {
  if (showTimer !== null) { clearTimeout(showTimer); showTimer = null; }
  isNavigating.value = false;
});

// Show if slow navigation OR Nuxt's own indicator is active
const showLoader = computed(() => isNavigating.value || isLoading.value);

// Circumferences for the SVG arcs
const R1 = 46; // outer ring radius
const R2 = 34; // middle ring radius
const R3 = 22; // inner ring radius
const C1 = +(2 * Math.PI * R1).toFixed(2);
const C2 = +(2 * Math.PI * R2).toFixed(2);
const C3 = +(2 * Math.PI * R3).toFixed(2);
</script>

<template>
  <Transition name="page-loader">
    <div v-if="showLoader" class="page-loader-overlay" aria-label="Loading page" role="status">

      <!-- Background particles -->
      <div class="particles">
        <span v-for="i in 12" :key="i" class="particle" :style="`--i:${i}`" />
      </div>

      <!-- Glass card -->
      <div class="loader-card">

        <!-- Glow blob behind the spinner -->
        <div class="glow-blob" />

        <!-- Main spinner -->
        <div class="spinner-wrap">
          <svg class="spinner-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Gradient for arcs -->
              <linearGradient id="pg-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--main-gradient-from, #14b8a6)" />
                <stop offset="100%" stop-color="var(--main-gradient-to, #2563eb)" />
              </linearGradient>
              <linearGradient id="pg-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--main-gradient-to, #2563eb)" />
                <stop offset="100%" stop-color="var(--main-gradient-from, #14b8a6)" />
              </linearGradient>
              <!-- Glow filter -->
              <filter id="pg-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="pg-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <!-- Track rings -->
            <circle class="track" cx="60" cy="60" :r="R1" stroke-width="1.5" />
            <circle class="track" cx="60" cy="60" :r="R2" stroke-width="1.5" />
            <circle class="track" cx="60" cy="60" :r="R3" stroke-width="1.5" />

            <!-- Outer spinning arc (clockwise, fast) -->
            <circle
              class="arc arc-outer"
              cx="60" cy="60" :r="R1"
              stroke="url(#pg-grad1)"
              stroke-width="3"
              stroke-linecap="round"
              filter="url(#pg-glow)"
              :stroke-dasharray="`${C1 * 0.55} ${C1 * 0.45}`"
            />

            <!-- Middle spinning arc (counter-clockwise, medium) -->
            <circle
              class="arc arc-mid"
              cx="60" cy="60" :r="R2"
              stroke="url(#pg-grad2)"
              stroke-width="3"
              stroke-linecap="round"
              filter="url(#pg-glow)"
              :stroke-dasharray="`${C2 * 0.4} ${C2 * 0.6}`"
            />

            <!-- Inner spinning arc (clockwise, slow) -->
            <circle
              class="arc arc-inner"
              cx="60" cy="60" :r="R3"
              stroke="url(#pg-grad1)"
              stroke-width="3"
              stroke-linecap="round"
              filter="url(#pg-glow)"
              :stroke-dasharray="`${C3 * 0.3} ${C3 * 0.7}`"
            />

            <!-- Orbital dots -->
            <circle class="orb orb-1" cx="60" cy="14" r="3.5" fill="var(--main-gradient-from, #14b8a6)" filter="url(#pg-glow-strong)" />
            <circle class="orb orb-2" cx="60" cy="26" r="2.5" fill="var(--main-gradient-to, #2563eb)" filter="url(#pg-glow-strong)" />
            <circle class="orb orb-3" cx="60" cy="38" r="2" fill="var(--main-gradient-from, #14b8a6)" filter="url(#pg-glow-strong)" />

            <!-- Center pulsing core -->
            <circle class="core-outer" cx="60" cy="60" r="8" fill="url(#pg-grad1)" filter="url(#pg-glow-strong)" />
            <circle class="core-inner" cx="60" cy="60" r="4.5" fill="white" />
          </svg>
        </div>

        <!-- Progress bar -->
        <div class="progress-bar-wrap">
          <div class="progress-bar" :style="`width: ${progress}%`" />
        </div>

        <!-- Loading text -->
        <p class="loader-text">Loading<span class="dots"><span>.</span><span>.</span><span>.</span></span></p>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
/* ── Overlay ── */
.page-loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(9, 26, 40, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.page-loader-enter-active,
.page-loader-leave-active {
  transition: opacity 0.3s ease;
}
.page-loader-enter-from,
.page-loader-leave-to {
  opacity: 0;
}

/* ── Floating particles ── */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--main-gradient-from, #14b8a6);
  opacity: 0;
  left: calc(var(--i) * 8.33%);
  animation: float-up calc(2s + var(--i) * 0.3s) ease-in infinite;
  animation-delay: calc(var(--i) * 0.22s);
  box-shadow: 0 0 8px var(--main-gradient-from, #14b8a6);
}
.particle:nth-child(even) {
  background: var(--main-gradient-to, #2563eb);
  box-shadow: 0 0 8px var(--main-gradient-to, #2563eb);
  width: 3px;
  height: 3px;
}

@keyframes float-up {
  0%   { opacity: 0; transform: translateY(100vh) scale(0.5); }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.4; }
  100% { opacity: 0; transform: translateY(-10vh) scale(1); }
}

/* ── Glass card ── */
.loader-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 36px 40px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 0 60px rgba(20, 184, 166, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  animation: card-float 3s ease-in-out infinite;
}

@keyframes card-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

/* ── Glow blob ── */
.glow-blob {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--main-gradient-from, #14b8a6) 25%, transparent),
    transparent 70%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: blob-pulse 2.5s ease-in-out infinite;
}

@keyframes blob-pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.2); }
}

/* ── SVG Spinner ── */
.spinner-wrap {
  position: relative;
  width: 120px;
  height: 120px;
}

.spinner-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Track circles */
.track {
  stroke: rgba(255, 255, 255, 0.05);
  fill: none;
}

/* Animated arcs */
.arc {
  fill: none;
  transform-origin: 60px 60px;
}

.arc-outer {
  animation: spin-cw 1.6s linear infinite;
}
.arc-mid {
  animation: spin-ccw 2.2s linear infinite;
}
.arc-inner {
  animation: spin-cw 1s linear infinite;
}

/* Orbital dots — they orbit at their respective ring radii */
.orb {
  transform-origin: 60px 60px;
}
.orb-1 { animation: spin-cw  1.6s linear infinite; }
.orb-2 { animation: spin-ccw 2.2s linear infinite; }
.orb-3 { animation: spin-cw  1s   linear infinite; }

/* Core animations */
.core-outer {
  animation: core-pulse 1.4s ease-in-out infinite;
}
.core-inner {
  animation: core-inner-pulse 1.4s ease-in-out infinite;
}

@keyframes spin-cw  { to { transform: rotate(360deg);  } }
@keyframes spin-ccw { to { transform: rotate(-360deg); } }

@keyframes core-pulse {
  0%, 100% { r: 8;   opacity: 0.9; }
  50%       { r: 10;  opacity: 1;   }
}
@keyframes core-inner-pulse {
  0%, 100% { r: 4.5; opacity: 1; }
  50%       { r: 3;   opacity: 0.7; }
}

/* ── Progress bar ── */
.progress-bar-wrap {
  width: 120px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--main-gradient-from, #14b8a6),
    var(--main-gradient-to, #2563eb)
  );
  transition: width 0.15s ease;
  box-shadow: 0 0 8px var(--main-glow, #14b8a6);
}

/* ── Loading text ── */
.loader-text {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  user-select: none;
}

.dots span {
  display: inline-block;
  animation: dot-blink 1.2s ease-in-out infinite;
}
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-blink {
  0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
  40%            { opacity: 1;   transform: translateY(-3px); }
}
</style>
