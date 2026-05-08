<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { mockMaps } from '@/api/mock';

const auth = useAuthStore();

// Batch import all map images
const mapImages = import.meta.glob('@/assets/maps/*.png', { eager: true, import: 'default' });
const getMap = (slug) => mapImages[`/src/assets/maps/${slug}.png`] || '';

const selectedMapId = ref(0);

const selectedMap = computed(() => {
  return mockMaps.find(m => m.id === selectedMapId.value) || mockMaps[0];
});

const isMapUnlocked = (mapId) => {
  return auth.progress >= mapId;
};

const selectMap = (id) => {
  if (isMapUnlocked(id)) {
    selectedMapId.value = id;
  }
};

const launchSimulation = () => {
  alert(`INITIALIZING SIMULATION: ${selectedMap.value.name}\n\nNote: This would launch the external Godot simulation engine.`);
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">Mission Hub</h1>
        <p class="text-[10px] text-pixel-plum/60 uppercase font-black tracking-[0.25em] mt-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></span>
          Select Deployment Target
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
      <!-- Map Selection Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            v-for="map in mockMaps" 
            :key="map.id"
            @click="selectMap(map.id)"
            class="relative overflow-hidden rounded-xl border-2 transition-all cursor-pointer group"
            :class="[
              selectedMapId === map.id 
                ? 'border-pixel-violet ring-4 ring-pixel-violet/10 shadow-pixel-purple' 
                : 'border-pixel-plum/10 hover:border-pixel-violet/40',
              !isMapUnlocked(map.id) ? 'grayscale opacity-75' : ''
            ]"
          >
            <!-- Map Image -->
            <div class="aspect-video bg-pixel-lavender/20 relative overflow-hidden">
              <img 
                v-if="getMap(map.slug)" 
                :src="getMap(map.slug)" 
                :alt="map.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style="image-rendering: pixelated;"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-pixel-plum/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-pixel-plum/20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>

              <!-- Locked Overlay -->
              <div v-if="!isMapUnlocked(map.id)" class="absolute inset-0 bg-pixel-plum/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span class="text-[10px] font-black uppercase tracking-widest">Locked</span>
              </div>
              
              <!-- Map Index Badge -->
              <div class="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-black text-pixel-plum shadow-sm">
                TARGET {{ map.id + 1 }}
              </div>
            </div>

            <!-- Map Info -->
            <div class="p-4 bg-white/50 backdrop-blur-sm">
              <div class="flex justify-between items-center mb-1">
                <h3 class="font-black text-pixel-plum font-display text-lg">{{ map.name }}</h3>
                <span v-if="isMapUnlocked(map.id)" class="text-[9px] font-black px-2 py-0.5 rounded-full bg-pixel-moss/10 text-pixel-moss border border-pixel-moss/20">READY</span>
              </div>
              <p class="text-xs text-pixel-plum/60 font-bold line-clamp-1">{{ map.difficulty }}</p>
            </div>
          </div>
        </div>

        <!-- System Requirements / Training Info -->
        <div class="pixel-card bg-pixel-violet/5 border-pixel-violet/10">
          <h4 class="text-xs font-black uppercase tracking-widest text-pixel-violet mb-4">Deployment Protocols</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-pixel-violet"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <div>
                <p class="text-[11px] font-black text-pixel-plum uppercase mb-1">Live Simulation</p>
                <p class="text-[11px] text-pixel-plum/60 leading-relaxed font-bold">Encrypted connection required. Session data is synced to cloud upon extraction.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-pixel-sky"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p class="text-[11px] font-black text-pixel-plum uppercase mb-1">Real-time Feedback</p>
                <p class="text-[11px] text-pixel-plum/60 leading-relaxed font-bold">Attacker AI adapts to your defensive choices in real-time. Stay alert.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selection Details Sidebar -->
      <div class="space-y-6">
        <div class="pixel-card sticky top-24 overflow-hidden p-0">
          <div class="aspect-video bg-pixel-plum/5 relative overflow-hidden border-b border-pixel-plum/10">
            <img 
              v-if="getMap(selectedMap.slug)" 
              :src="getMap(selectedMap.slug)" 
              :alt="selectedMap.name"
              class="w-full h-full object-cover"
              style="image-rendering: pixelated;"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div>
          </div>
          
          <div class="p-6 space-y-6">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-[10px] font-black px-2 py-0.5 bg-pixel-violet/10 text-pixel-violet rounded uppercase tracking-widest">{{ selectedMap.difficulty }}</span>
                <span class="text-[10px] font-black px-2 py-0.5 bg-pixel-plum/5 text-pixel-plum/40 rounded uppercase tracking-widest">ID: 00{{ selectedMapId + 1 }}</span>
              </div>
              <h2 class="text-2xl font-black text-pixel-plum font-display uppercase tracking-tight">{{ selectedMap.name }}</h2>
              <p class="mt-3 text-sm font-bold text-pixel-plum/70 leading-relaxed">{{ selectedMap.description }}</p>
            </div>

            <div class="space-y-3 pt-4 border-t border-pixel-plum/5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-pixel-plum/40 uppercase">Potential Reward</span>
                <span class="text-pixel-moss">{{ selectedMap.credits_reward }} CR</span>
              </div>
              <div class="flex justify-between text-xs font-bold">
                <span class="text-pixel-plum/40 uppercase">Threat Level</span>
                <div class="flex gap-1">
                  <div v-for="i in 5" :key="i" class="w-2 h-2 rounded-full" :class="i <= (selectedMapId + 1) ? 'bg-byte-coral' : 'bg-pixel-plum/10'"></div>
                </div>
              </div>
            </div>

            <button 
              @click="launchSimulation"
              class="w-full py-4 bg-pixel-violet text-white font-black font-display rounded-md shadow-pixel-purple hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              INITIALIZE MISSION
            </button>
            <p class="text-[9px] text-center text-pixel-plum/40 uppercase font-bold tracking-widest">Ready for deployment</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
