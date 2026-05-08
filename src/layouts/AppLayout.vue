<template>
  <div class="min-h-screen bg-cyber-dark text-white font-sans selection:bg-neon-blue/30 selection:text-white">
    <!-- Navigation -->
    <NavBar class="fixed top-0 left-0 w-full z-50" />

    <!-- Main Content Area -->
    <main class="pt-16 min-h-screen">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Transition for smooth view changes -->
        <router-view v-slot="{ Component }">
          <transition 
            name="fade" 
            mode="out-in"
            appear
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Scanline Overlay Effect -->
    <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<style>
@reference "@/assets/main.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Global Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-cyber-dark;
}

::-webkit-scrollbar-thumb {
  @apply bg-neon-blue/20 border-2 border-cyber-dark rounded-full hover:bg-neon-blue/40 transition-colors;
}
</style>
