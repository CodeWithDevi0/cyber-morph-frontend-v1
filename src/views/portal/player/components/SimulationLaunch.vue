<template>
  <div
    class="group relative overflow-hidden bg-pixel-plum rounded-xl p-8 text-white shadow-pixel-hero transition-all hover:scale-[1.01] active:scale-[0.99] h-full"
  >
    <!-- Decorative Background Pattern -->
    <div
      class="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 scale-150 pointer-events-none"
    >
      <svg width="400" height="400" viewBox="0 0 100 100">
        <path
          d="M10 10L90 90M90 10L10 90"
          stroke="currentColor"
          stroke-width="1"
          stroke-dasharray="2 2"
        />
      </svg>
    </div>

    <div class="relative z-10 h-full flex flex-col justify-between">
      <div>
        <span
          class="inline-block px-3 py-1 bg-white/20 rounded text-pixel-10 font-black uppercase tracking-[0.25em] mb-4"
        >
          Mission Ready
        </span>
        <h2 class="text-5xl font-black font-display uppercase tracking-tight mb-2">
          Deploy Simulation
        </h2>
        <p
          class="text-white/60 font-bold uppercase tracking-widest text-xs flex items-center gap-2"
        >
          Target Sector: <span class="text-signal-gold">{{ nextMapName }}</span>
        </p>
      </div>

      <div class="mt-12">
        <router-link
          to="/portal/mission-hub"
          class="inline-flex items-center gap-4 bg-white text-pixel-plum px-8 py-4 rounded-lg font-black font-display uppercase tracking-widest shadow-pixel-soft hover:bg-signal-gold hover:text-white transition-all group/btn"
        >
          <span>Initiate Launch</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="group-hover/btn:translate-x-2 transition-transform"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nextMapName: String
})
</script>
