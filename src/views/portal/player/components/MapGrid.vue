<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="map in maps"
        :key="map.id"
        @click="$emit('select', map.id)"
        class="relative overflow-hidden rounded-xl border-2 transition-all cursor-pointer group"
        :class="[
          selectedId === map.id
            ? 'border-pixel-violet ring-4 ring-pixel-violet/10 shadow-pixel-purple'
            : 'border-pixel-plum/10 hover:border-pixel-violet/40',
          !isUnlocked(map.id) ? 'grayscale opacity-75' : '',
        ]"
      >
        <!-- Map Image -->
        <div class="aspect-video bg-pixel-lavender/20 relative overflow-hidden">
          <img
            v-if="getMapImage(map.slug)"
            :src="getMapImage(map.slug)"
            :alt="map.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style="image-rendering: pixelated"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-pixel-plum/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-pixel-plum/20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </div>

          <!-- Locked Overlay -->
          <div
            v-if="!isUnlocked(map.id)"
            class="absolute inset-0 bg-pixel-plum/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            <span class="text-pixel-10 font-black uppercase tracking-widest">Locked</span>
          </div>

          <!-- Map Index Badge -->
          <div class="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-pixel-10 font-black text-pixel-plum shadow-sm">
            TARGET {{ map.id + 1 }}
          </div>
        </div>

        <!-- Map Info -->
        <div class="p-4 bg-white/50 backdrop-blur-sm">
          <div class="flex justify-between items-center mb-1">
            <h3 class="font-black text-pixel-plum font-display text-lg">{{ map.name }}</h3>
            <span v-if="isUnlocked(map.id)" class="text-pixel-9 font-black px-2 py-0.5 rounded-full bg-pixel-moss/10 text-pixel-moss border border-pixel-moss/20">READY</span>
          </div>
          <p class="text-xs text-pixel-plum/60 font-bold line-clamp-1">{{ map.difficulty }}</p>
        </div>
      </div>
    </div>

    <!-- Deployment Protocols -->
    <div class="pixel-card bg-pixel-violet/5 border-pixel-violet/10">
      <h4 class="text-xs font-black uppercase tracking-widest text-pixel-violet mb-4">Deployment Protocols</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex gap-4">
          <div class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-pixel-violet"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
          </div>
          <div>
            <p class="text-[11px] font-black text-pixel-plum uppercase mb-1">Live Simulation</p>
            <p class="text-[11px] text-pixel-plum/60 leading-relaxed font-bold">Encrypted connection required. Session data is synced to cloud upon extraction.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  maps: Array,
  selectedId: Number,
  progress: Number
})

defineEmits(['select'])

// Batch import all map images
const mapImages = import.meta.glob('@/assets/maps/*.png', { eager: true, import: 'default' })
const getMapImage = (slug) => mapImages[`/src/assets/maps/${slug}.png`] || ''

const isUnlocked = (mapId) => {
  return props.progress >= mapId
}
</script>

<style scoped>
@reference "../../../../assets/main.css";
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
</style>
