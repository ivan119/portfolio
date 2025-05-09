import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Chakra Frequency Colors
        "root-chakra": "#C53030", // C - Root (Red) - 256Hz
        "sacral-chakra": "#DD6B20", // D - Sacral (Orange) - 288Hz
        "solar-chakra": "#D69E2E", // E - Solar Plexus (Yellow) - 320Hz
        "heart-chakra": "#38A169", // F - Heart (Green) - 341Hz
        "throat-chakra": "#3182CE", // G - Throat (Blue) - 384Hz
        "third-eye-chakra": "#553C9A", // A - Third Eye (Indigo) - 448Hz
        "crown-chakra": "#805AD5", // B - Crown (Violet) - 480Hz

        // Accidentals (Mix of adjacent chakras)
        "c-sharp": "#B83280", // C#/Db - Blend of Root & Crown
        "d-flat": "#B83280",
        "d-sharp": "#C05621", // D#/Eb - Blend of Sacral & Solar
        "e-flat": "#C05621",
        "f-sharp": "#48BB78", // F#/Gb - Blend of Heart & Throat
        "g-flat": "#48BB78",
        "g-sharp": "#4299E1", // G#/Ab - Blend of Throat & Third Eye
        "a-flat": "#4299E1",
        "a-sharp": "#667EEA", // A#/Bb - Blend of Third Eye & Crown
        "b-flat": "#667EEA",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))',
        'gradient-secondary': 'linear-gradient(to right, rgb(16, 185, 129), rgb(6, 182, 212))',
      },
      transitionProperty: {
        scale: "transform",
        filter: "filter",
      },
      animation: {
        "pulse-gentle": "pulse-gentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "color-wave": "color-wave 8s ease-in-out infinite",
      },
      keyframes: {
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "color-wave": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config 