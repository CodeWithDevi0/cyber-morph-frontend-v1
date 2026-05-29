<script setup>
import { mockClassAnalytics } from '@/api/mock'

const getMedalColor = (rank) => {
  if (rank === 1) return 'text-signal-gold bg-signal-gold/10 border-signal-gold/20'
  if (rank === 2) return 'text-pixel-plum/60 bg-pixel-plum/5 border-pixel-plum/10'
  return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
}
</script>

<template>
  <div class="pixel-card">
    <div class="flex items-center justify-between mb-4 border-b border-pixel-plum/10 pb-3">
      <h3 class="text-[10px] font-black tracking-widest text-pixel-plum/60 uppercase flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        Top Operators
      </h3>
    </div>

    <div class="space-y-3">
      <div 
        v-for="op in mockClassAnalytics.topOperators" 
        :key="op.username"
        class="flex items-center gap-3 p-2 rounded-lg border border-pixel-plum/5 hover:bg-pixel-violet/5 transition-colors group"
      >
        <div 
          class="w-8 h-8 rounded border flex items-center justify-center font-black font-display text-sm"
          :class="getMedalColor(op.rank)"
        >
          {{ op.rank }}
        </div>
        <div class="flex-1">
          <p class="text-[11px] font-black text-pixel-plum uppercase tracking-tight">{{ op.username }}</p>
          <div class="flex items-center gap-1.5 mt-0.5">
            <div class="h-1 bg-pixel-plum/10 rounded-full flex-1 overflow-hidden">
              <div 
                class="h-full bg-pixel-violet rounded-full transition-all duration-1000" 
                :style="{ width: (op.score / 2500) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[10px] font-black text-pixel-violet font-mono leading-none">{{ op.score }}</p>
          <p class="text-[8px] font-bold text-pixel-plum/30 uppercase mt-1">Credits</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
