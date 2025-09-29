<script setup lang="ts">
import type { NuxtError } from "#app";
import { useErrorView } from "~/composables/useErrorView";

const props = defineProps({
  error: Object as () => NuxtError,
});

const {
  // state
  isVisible,
  showContent,
  fakeAdminDetected,
  countdown,
  // computed
  errorCode,
  errorTitle,
  errorMessage,
  // ui helpers
  navigationLinks,
  getLinkDescription,
  // refs
  typeTarget,
} = useErrorView(props.error);
</script>
<template>
  <!-- Main Content -->
  <div
    class="relative z-10 container mx-auto px-4 py-16 min-h-screen flex items-center justify-center"
  >
    <div class="max-w-4xl w-full">
      <!-- Ultra Advanced Error Code Display -->
      <div class="text-center mb-16 perspective-1000">
        <div class="relative inline-block transform-gpu">
          <!-- Large background number with 3D effect -->
          <h1
            class="text-[200px] md:text-[300px] font-black leading-none text-gray-200/30 dark:text-gray-700/30 select-none transition-all duration-1000 transform-gpu"
            :class="{
              'opacity-100 scale-100 rotate-y-0': isVisible,
              'opacity-0 scale-75 rotate-y-12': !isVisible,
            }"
            style="text-shadow: 0 0 50px rgba(16, 185, 129, 0.3)"
          >
            {{ errorCode }}
          </h1>

          <!-- Floating holographic overlay content -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center relative z-20">
              <!-- Glowing title with advanced effects -->
              <h3
                class="text-3xl md:text-5xl font-black text-main-gradient mb-6 transition-all duration-700 delay-200 relative"
                :class="{
                  'opacity-100 translate-y-0 scale-100': showContent,
                  'opacity-0 translate-y-8 scale-95': !showContent,
                }"
              >
                <span class="relative inline-block">
                  {{ errorTitle }}
                  <!-- Holographic glow effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-emerald-400/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></div>
                </span>
              </h3>

              <!-- Enhanced message with glassmorphism -->
              <div
                class="relative max-w-2xl mx-auto transition-all duration-700 delay-400"
                :class="{
                  'opacity-100 translate-y-0': showContent,
                  'opacity-0 translate-y-8': !showContent,
                }"
              >
                <div
                  ref="typeTarget"
                  class="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed relative z-10 min-h-[2.5rem]"
                ></div>
                <!-- Subtle background glow -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-blue-50/30 to-emerald-50/30 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-emerald-900/20 rounded-2xl blur-2xl -z-10"
                ></div>
              </div>

              <!-- Easter Egg Countdown -->
              <div
                v-if="fakeAdminDetected && showContent"
                class="absolute -right-16 top-1/2 transform -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-red-50 via-red-100 to-red-50 dark:from-red-900/30 dark:via-red-800/20 dark:to-red-900/30 border border-red-200/60 dark:border-red-700/40 rounded-full shadow-2xl transition-all duration-700 delay-600 backdrop-blur-md overflow-hidden group flex items-center justify-center"
                :class="{
                  'opacity-100 translate-x-0 scale-100': showContent,
                  'opacity-0 translate-x-8 scale-95': !showContent,
                }"
              >
                <!-- Animated background pattern -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-red-400/5 to-red-600/5 dark:from-red-400/10 dark:to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <!-- Glow effect -->
                <div
                  class="absolute inset-0 bg-red-400/20 dark:bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150 group-hover:scale-100"
                ></div>

                <!-- Content container -->
                <div class="relative z-10 text-center px-2">
                  <!-- Clock icon with enhanced animation -->
                  <div class="flex items-center justify-center mb-2">
                    <div class="relative">
                      <span
                        class="text-red-500 dark:text-red-400 text-3xl animate-pulse group-hover:animate-bounce transition-all duration-300"
                        >⏰</span
                      >
                      <!-- Orbiting dots -->
                      <div class="absolute inset-0 animate-orbit">
                        <div
                          class="absolute top-0 left-1/2 w-1 h-1 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        ></div>
                        <div
                          class="absolute bottom-0 left-1/2 w-1 h-1 bg-red-400 rounded-full transform -translate-x-1/2 translate-y-1/2"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Border Loader Animation -->
                  <div class="relative w-24 h-24 mx-auto mb-4">
                    <!-- Background circle -->
                    <div
                      class="absolute inset-0 w-full h-full border-4 border-red-200/50 dark:border-red-800/50 rounded-full"
                    ></div>

                    <!-- Animated border loader -->
                    <div
                      class="absolute inset-0 w-full h-full border-4 border-transparent rounded-full"
                      :style="{
                        background: `conic-gradient(from 0deg, transparent ${(countdown / 5) * 360}deg, #ef4444 ${(countdown / 5) * 360}deg, #ef4444 360deg)`,
                      }"
                    ></div>

                    <!-- Center content -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <div class="text-center">
                        <div
                          class="text-lg font-bold text-red-600 dark:text-red-400"
                        >
                          {{ countdown }}s
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Status text -->
                  <p
                    class="text-red-600 dark:text-red-400 text-xs font-medium mb-2 opacity-80"
                  >
                    Redirecting...
                  </p>
                </div>

                <!-- Corner accent -->
                <div
                  class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-red-400/20 to-transparent rounded-bl-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ultra Advanced Action Section (hidden for admin routes) -->
      <div
        v-if="!fakeAdminDetected"
        class="text-center mb-16 transition-all duration-700 delay-600"
        :class="{
          'opacity-100 translate-y-0': showContent,
          'opacity-0 translate-y-8': !showContent,
        }"
      >
        <div
          v-if="false"
          class="flex flex-col sm:flex-row gap-6 justify-center mb-8"
        >
          <!-- Primary Action Button with Holographic Effects -->
          <BaseButton
            to="/"
            variant="default"
            class="group relative overflow-hidden px-6 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500 via-emerald-400 to-blue-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 border-0"
          >
            <!-- Animated background layers -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl scale-150 group-hover:scale-100"
            ></div>

            <!-- Floating particles inside button -->
            <div class="absolute inset-0 overflow-hidden rounded-xl">
              <div
                class="absolute top-1 left-2 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping"
              ></div>
              <div
                class="absolute bottom-1 right-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping delay-300"
              ></div>
            </div>

            <span class="relative z-10 flex items-center gap-2">
              <span class="text-xl animate-bounce">🏠</span>
              <span class="relative">
                Return Home
                <!-- Text glow effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-white to-emerald-200 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"
                ></div>
              </span>
            </span>
          </BaseButton>

          <!-- Secondary Action Button with Glassmorphism -->
          <BaseButton
            variant="default"
            @click="$router.back()"
            class="group relative px-6 py-3 text-lg font-semibold bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-emerald-200/50 dark:border-emerald-700/50 hover:border-emerald-400 dark:hover:border-emerald-500 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 backdrop-blur-md overflow-hidden"
          >
            <!-- Hover background effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <span class="relative z-10 flex items-center gap-2">
              <span class="text-xl animate-pulse">⬅️</span>
              <span class="relative">
                Go Back
                <!-- Text glow effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"
                ></div>
              </span>
            </span>
          </BaseButton>
        </div>
      </div>

      <!-- Navigation Links (hidden for admin routes) -->
      <div
        v-if="!fakeAdminDetected"
        class="transition-all duration-700 delay-800"
        :class="{
          'opacity-100 translate-y-0': showContent,
          'opacity-0 translate-y-8': !showContent,
        }"
      >
        <div class="text-center mb-8">
          <h3
            class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6"
          >
            Explore More Content
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <NuxtLink
              v-for="link in navigationLinks"
              :key="link.path"
              :to="link.path"
              class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600 transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900"
            >
              <!-- Background gradient on hover -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <!-- Content -->
              <div class="relative z-10 p-6 text-center">
                <!-- Icon with 3D effect -->
                <div class="relative mb-4 perspective-1000">
                  <div
                    class="text-4xl transform-gpu transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-110 min-h-[3rem] flex items-center justify-center bg-gradient-to-br from-emerald-100/50 to-blue-100/50 dark:from-emerald-800/30 dark:to-blue-800/30 rounded-2xl p-3"
                  >
                    {{ link.icon }}
                  </div>
                  <!-- Subtle glow effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"
                  ></div>
                </div>

                <!-- Label -->
                <span
                  class="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 block"
                >
                  {{ link.label }}
                </span>

                <!-- Subtle description -->
                <span
                  class="text-xs text-gray-500 dark:text-gray-400 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {{ getLinkDescription(link.path) }}
                </span>
              </div>

              <!-- Hover border effect -->
              <div
                class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-emerald-300/50 dark:group-hover:border-emerald-500/50 transition-all duration-300"
              ></div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Ultra Advanced Help Section -->
      <div
        class="text-center transition-all duration-700 delay-1000"
        :class="{
          'opacity-100 translate-y-0': showContent,
          'opacity-0 translate-y-8': !showContent,
        }"
      >
        <div
          class="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50 dark:from-emerald-900/30 dark:via-blue-900/30 dark:to-emerald-900/30 border border-emerald-200/60 dark:border-emerald-700/60 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 overflow-hidden"
        >
          <!-- Animated background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl scale-150 group-hover:scale-100"
          ></div>

          <!-- Floating particles -->
          <div class="absolute inset-0 overflow-hidden rounded-2xl">
            <div
              class="absolute top-2 left-4 w-1 h-1 bg-emerald-400/50 rounded-full animate-ping"
            ></div>
            <div
              class="absolute bottom-2 right-4 w-0.5 h-0.5 bg-blue-400/60 rounded-full animate-ping delay-300"
            ></div>
          </div>

          <span
            class="text-emerald-600 dark:text-emerald-400 text-xl animate-pulse group-hover:animate-bounce"
            >💡</span
          >
          <span
            class="text-sm font-medium text-emerald-700 dark:text-emerald-300 relative z-10"
          >
            Need help? Feel free to reach out via
            <a
              href="mailto:KelavaIvan@proton.me"
              class="underline hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors font-semibold"
            >
              email
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
