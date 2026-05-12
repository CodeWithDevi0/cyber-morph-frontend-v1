<template>
  <div class="pixel-card sticky top-24 overflow-hidden p-0">
    <div class="aspect-video bg-pixel-plum/5 relative overflow-hidden border-b border-pixel-plum/10">
      <img 
        v-if="getMapImage(map.slug)" 
        :src="getMapImage(map.slug)" 
        :alt="map.name" 
        class="w-full h-full object-cover" 
        style="image-rendering: pixelated" 
      />
      <div class="absolute inset-0 bg-linear-to-t from-white/90 to-transparent"></div>
    </div>

    <div class="p-6 space-y-6">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-pixel-10 font-black px-2 py-0.5 bg-pixel-violet/10 text-pixel-violet rounded uppercase tracking-widest">
            {{ map.difficulty }}
          </span>
        </div>
        <h2 class="text-2xl font-black text-pixel-plum font-display uppercase tracking-tight">
          {{ map.name }}
        </h2>
        <p class="mt-3 text-sm font-bold text-pixel-plum/70 leading-relaxed">
          {{ map.description }}
        </p>
      </div>

      <div class="space-y-3 pt-4 border-t border-pixel-plum/5">
        <div class="flex justify-between text-xs font-bold">
          <span class="text-pixel-plum/40 uppercase">Potential Reward</span>
          <span class="text-pixel-moss">{{ map.credits_reward }} CR</span>
        </div>
      </div>

      <div v-if="error" class="p-3 bg-byte-coral/10 border border-byte-coral/20 rounded text-pixel-10 font-black text-byte-coral uppercase animate-bounce">
        {{ error }}
      </div>

      <button 
        @click="$emit('launch')" 
        :disabled="isLaunching" 
        class="w-full py-4 bg-pixel-violet text-white font-black font-display rounded-md shadow-pixel-hero hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <template v-if="isLaunching">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          INITIALIZING...
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          INITIALIZE MISSION
        </template>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  map: Object,
  isLaunching: Boolean,
  error: String
})

defineEmits(['launch'])

// Batch import all map images
const mapImages = import.meta.glob('@/assets/maps/*.png', { eager: true, import: 'default' })
const getMapImage = (slug) => mapImages[`/src/assets/maps/${slug}.png`] || ''
</script>

<style scoped>
@reference "../../../../assets/main.css";
</style>
