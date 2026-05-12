<template>
  <div 
    class="pixel-card group relative flex flex-col items-center text-center p-8 transition-all"
    :class="[
      !threat.unlocked ? 'grayscale opacity-75' : 'hover:border-pixel-violet/40 hover:bg-white/80 hover:-translate-y-1',
    ]"
  >
    <!-- Lock Overlay -->
    <div v-if="!threat.unlocked" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-lg">
      <div class="w-12 h-12 bg-pixel-plum/10 rounded-lg flex items-center justify-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-pixel-plum/40"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <span class="text-pixel-10 font-black uppercase tracking-widest text-pixel-plum/40">Encrypted</span>
    </div>

    <!-- Icon Container -->
    <div 
      class="w-16 h-16 rounded-xl bg-pixel-plum/5 flex items-center justify-center mb-6 border border-pixel-plum/10 transition-colors"
      :class="threat.unlocked ? 'group-hover:bg-pixel-violet/10 group-hover:border-pixel-violet/20' : ''"
    >
      <!-- Rogue Software -->
      <svg v-if="threat.icon === 'box'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
      <!-- Password Attacks -->
      <svg v-else-if="threat.icon === 'key'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
      <!-- Phishing -->
      <svg v-else-if="threat.icon === 'mail'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      <!-- Malvertising -->
      <svg v-else-if="threat.icon === 'layout'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
      <!-- Malware -->
      <svg v-else-if="threat.icon === 'shield-alert'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <!-- Man-in-the-Middle -->
      <svg v-else-if="threat.icon === 'users'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <!-- DDoS -->
      <svg v-else-if="threat.icon === 'zap'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      <!-- Drive-By Download -->
      <svg v-else-if="threat.icon === 'download'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="iconColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </div>

    <h3 class="text-lg font-black text-pixel-plum uppercase font-display mb-2">{{ threat.name }}</h3>
    <p class="text-xs font-bold text-pixel-plum/60 leading-relaxed line-clamp-3">{{ threat.description }}</p>
    
    <div v-if="threat.unlocked" class="mt-6 pt-4 border-t border-pixel-plum/5 w-full">
      <button class="text-pixel-9 font-black uppercase tracking-[0.2em] text-pixel-violet hover:brightness-75 transition-all">
        Analyze Intelligence
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  threat: Object
})

const iconColor = computed(() => {
  return props.threat.unlocked ? 'text-pixel-violet' : 'text-pixel-plum/20'
})
</script>

<style scoped>
@reference "../../../../assets/main.css";
</style>
