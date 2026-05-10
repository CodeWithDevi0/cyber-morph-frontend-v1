<script setup>
import { ref, computed } from 'vue';
import { mockLeaderboard } from '@/api/mock';

const maps = ['Overall', 'Home', 'Internet Cafe', 'Office', 'Public Park'];
const activeTab = ref('Overall');

const filteredScores = computed(() => {
  if (activeTab.value === 'Overall') {
    return [...mockLeaderboard].sort((a, b) => b.total_score - a.total_score);
  }
  return mockLeaderboard
    .filter(s => s.map_name === activeTab.value)
    .sort((a, b) => b.total_score - a.total_score);
});

const topThree = computed(() => filteredScores.value.slice(0, 3));
const otherScores = computed(() => filteredScores.value.slice(3));

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getRankColor = (index) => {
  if (index === 0) return 'text-signal-gold';
  if (index === 1) return 'text-pixel-lavender';
  if (index === 2) return 'text-byte-coral';
  return 'text-pixel-plum/40';
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Hall of Fame Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-pixel-plum/10 pb-6">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-signal-gold animate-pulse"></div>
          <h1 class="text-3xl font-black font-display tracking-tight text-pixel-plum uppercase">
            Hall of Fame
          </h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em] flex items-center gap-2">
          Sector: <span class="text-pixel-violet">{{ activeTab }}</span> 
          <span class="mx-1 opacity-30">|</span> 
          Metric: <span class="text-signal-gold">Defense Score</span>
          <span class="mx-1 opacity-30">|</span> 
          Records: <span class="text-pixel-plum">{{ filteredScores.length }} Personnel</span>
        </p>
      </div>
    </div>

    <!-- Map Tabs -->
    <div class="flex flex-wrap gap-2 border-b border-pixel-plum/10 pb-px overflow-x-auto no-scrollbar">
      <button 
        v-for="map in maps" 
        :key="map"
        @click="activeTab = map"
        class="px-6 py-3 text-pixel-10 font-black uppercase tracking-widest transition-all border-b-2"
        :class="activeTab === map 
          ? 'border-pixel-violet text-pixel-violet' 
          : 'border-transparent text-pixel-plum/40 hover:text-pixel-plum/70'"
      >
        {{ map }}
      </button>
    </div>

    <!-- Podium (Top 3) -->
    <div v-if="topThree.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div 
        v-for="(player, index) in topThree" 
        :key="player.score_id"
        class="pixel-card relative flex flex-col items-center pt-10 pb-6 group"
        :class="index === 0 ? 'md:-translate-y-4 border-signal-gold/30 bg-signal-gold/5' : ''"
      >
        <div class="absolute -top-5 w-12 h-12 rounded-lg bg-white border-2 flex items-center justify-center font-black text-xl shadow-pixel-soft"
             :class="[index === 0 ? 'border-signal-gold text-signal-gold' : index === 1 ? 'border-pixel-lavender text-pixel-lavender' : 'border-byte-coral text-byte-coral']">
          {{ index + 1 }}
        </div>
        <div class="w-16 h-16 rounded-full bg-pixel-plum/5 flex items-center justify-center mb-4 border border-pixel-plum/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-pixel-plum/20"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <h3 class="text-lg font-black text-pixel-plum uppercase font-display group-hover:text-pixel-violet transition-colors">{{ player.username }}</h3>
        <p class="text-xs font-bold text-pixel-plum/50 uppercase tracking-widest mb-4">{{ player.map_name }}</p>
        <div class="px-4 py-1.5 bg-pixel-plum text-white rounded font-mono font-black text-sm">{{ player.total_score }} PTS</div>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div class="pixel-card">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-pixel-plum/10">
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4">Rank</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4">Operator Identity</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4">Sector</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Defense Score</th>
              <th class="pb-4 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Recorded At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-pixel-plum/5">
            <tr v-for="(player, index) in (topThree.length > 0 ? otherScores : filteredScores)" :key="player.score_id" class="group hover:bg-pixel-violet/5 transition-colors">
              <td class="py-5 px-4 font-black text-sm" :class="getRankColor(topThree.length > 0 ? index + 3 : index)">
                #{{ topThree.length > 0 ? index + 4 : index + 1 }}
              </td>
              <td class="py-5 px-4"><span class="text-sm font-black text-pixel-plum">{{ player.username }}</span></td>
              <td class="py-5 px-4"><span class="text-pixel-9 font-black px-2 py-1 bg-pixel-plum/5 text-pixel-plum/60 rounded uppercase tracking-widest">{{ player.map_name }}</span></td>
              <td class="py-5 px-4 text-right"><span class="text-sm font-black font-mono text-pixel-violet">{{ player.total_score }}</span></td>
              <td class="py-5 px-4 text-right text-pixel-10 font-bold text-pixel-plum/40 uppercase">{{ formatDate(player.recorded_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
