<script setup>
import { mockClassAnalytics } from '@/api/mock'

// Simple SVG path generation for the trend line
const generatePath = () => {
  const points = mockClassAnalytics.weeklyHealth
  const width = 200
  const height = 40
  const step = width / (points.length - 1)
  
  return points.map((p, i) => {
    const x = i * step
    const y = height - (p / 100) * height
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
}
</script>

<template>
  <div class="pixel-card overflow-hidden">
    <div class="flex items-center justify-between mb-4 border-b border-pixel-plum/10 pb-3">
      <h3 class="text-[10px] font-black tracking-widest text-pixel-plum/60 uppercase flex items-center gap-2">
        <div class="w-1.5 h-1.5 bg-pixel-violet rounded-full"></div>
        Performance Trend
      </h3>
      <span class="text-[9px] font-bold text-pixel-plum/30 uppercase">7-Day Security Health</span>
    </div>

    <div class="h-16 flex items-end justify-center px-2">
      <svg class="w-full h-full overflow-visible" viewBox="0 0 200 40">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path 
          :d="generatePath()" 
          fill="none" 
          stroke="#8B5CF6" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        />
        <path 
          :d="generatePath() + ' L 200 40 L 0 40 Z'" 
          fill="url(#gradient)" 
        />
      </svg>
    </div>

    <div class="flex justify-between mt-3">
      <div v-for="i in 7" :key="i" class="w-1 h-1 rounded-full bg-pixel-plum/10"></div>
    </div>
    
    <div class="mt-4 flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-[9px] font-black text-pixel-plum/40 uppercase">Avg Mastery</span>
        <span class="text-lg font-black text-pixel-violet leading-none">85%</span>
      </div>
      <div class="text-right flex flex-col">
        <span class="text-[9px] font-black text-pixel-moss uppercase">Growth</span>
        <span class="text-lg font-black text-pixel-moss leading-none">+12%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
