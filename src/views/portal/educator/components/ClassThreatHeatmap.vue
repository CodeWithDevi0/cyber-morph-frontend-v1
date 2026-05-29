<script setup>
import { mockClassAnalytics } from '@/api/mock'

const getIntensity = (rate) => {
  if (rate > 70) return 'bg-signal-red/20 text-signal-red border-signal-red/30'
  if (rate > 40) return 'bg-signal-gold/20 text-signal-gold border-signal-gold/30'
  return 'bg-pixel-moss/20 text-pixel-moss border-pixel-moss/30'
}
</script>

<template>
  <div class="pixel-card overflow-hidden">
    <div class="flex items-center justify-between mb-4 border-b border-pixel-plum/10 pb-3">
      <h3 class="text-[10px] font-black tracking-widest text-pixel-plum/60 uppercase flex items-center gap-2">
        <div class="w-1.5 h-1.5 bg-signal-red rounded-full animate-pulse"></div>
        Threat Heatmap
      </h3>
      <span class="text-[9px] font-bold text-pixel-plum/30 uppercase">Class-Wide Failure Rate</span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div 
        v-for="threat in mockClassAnalytics.threatFailRates" 
        :key="threat.name"
        class="p-3 rounded-lg border flex flex-col gap-1 transition-all hover:scale-[1.02]"
        :class="getIntensity(threat.rate)"
      >
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-tight truncate">{{ threat.name }}</span>
          <svg 
            v-if="threat.trend === 'up'" 
            xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
          ><path d="m19 12-7-7-7 7"/><path d="M12 19V5"/></svg>
          <svg 
            v-else-if="threat.trend === 'down'" 
            xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
          ><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-xl font-black font-display leading-none">{{ threat.rate }}</span>
          <span class="text-[10px] font-bold opacity-70">%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
