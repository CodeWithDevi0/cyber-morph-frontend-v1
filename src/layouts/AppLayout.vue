<template>
  <div class="min-h-screen bg-pixel-lilac text-pixel-plum font-sans selection:bg-pixel-violet/30 selection:text-pixel-plum">
    <!-- Navigation -->
    <NavBar class="fixed top-0 left-0 w-full z-1000" />

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
  @apply bg-pixel-lilac;
}

::-webkit-scrollbar-thumb {
  @apply bg-pixel-violet/20 border-2 border-pixel-lilac rounded-full hover:bg-pixel-violet/40 transition-colors;
}
</style>
