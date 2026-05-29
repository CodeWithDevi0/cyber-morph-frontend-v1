<script setup>
import { ref, computed } from 'vue'
import { mockAdmin } from '@/api/mock'

const analytics = ref(mockAdmin.analytics)

const getStatusColor = (status) => {
  switch (status) {
    case 'critical': return 'text-byte-coral';
    case 'warning': return 'text-signal-gold';
    case 'improving': return 'text-pixel-moss';
    case 'active': return 'text-pixel-violet';
    default: return 'text-pixel-plum/50';
  }
}

const getBgColor = (status) => {
  switch (status) {
    case 'critical': return 'bg-byte-coral/10 border-byte-coral/20';
    case 'warning': return 'bg-signal-gold/10 border-signal-gold/20';
    case 'improving': return 'bg-pixel-moss/10 border-pixel-moss/20';
    case 'active': return 'bg-pixel-violet/10 border-pixel-violet/20';
    default: return 'bg-pixel-plum/5 border-pixel-plum/10';
  }
}

const sortedThreats = computed(() => {
  return [...analytics.value.threatFailRates].sort((a, b) => b.failureRate - a.failureRate)
})
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-2 border-pixel-plum/10 pb-8">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></div>
          <h1 class="text-4xl font-black font-display tracking-tighter text-pixel-plum uppercase">Performance Analytics</h1>
        </div>
        <p class="text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.3em] flex items-center gap-2">
          Protocol: <span class="text-pixel-violet">Tactical Oversight</span> 
          <span class="mx-1 opacity-30">|</span> 
          Global Data Nodes: <span class="text-pixel-plum">Active</span>
        </p>
      </div>

      <div class="flex gap-3">
        <button class="px-6 py-3 border-2 border-pixel-plum text-pixel-plum rounded-lg font-black text-xs uppercase tracking-widest hover:bg-pixel-plum hover:text-white transition-all transform active:scale-95">Export CSV</button>
        <button class="px-6 py-3 bg-pixel-plum text-white rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95">Refresh Data</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      <div class="space-y-8">
        <!-- 1. Global Vulnerability Index -->
        <div class="pixel-card">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 11-8-8-8 8"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
              Attack Failure Analytics
            </h3>
            <span class="text-[9px] font-black text-pixel-plum/30 uppercase tracking-widest">Failure Rate %</span>
          </div>

          <div class="space-y-6">
            <div v-for="threat in sortedThreats" :key="threat.id" class="group">
              <div class="flex justify-between items-end mb-2">
                <div class="flex flex-col">
                  <span class="text-xs font-black text-pixel-plum uppercase tracking-tight group-hover:text-pixel-violet transition-colors">{{ threat.name }}</span>
                  <span class="text-[9px] font-bold text-pixel-plum/40 uppercase tracking-tighter">Avg Response: {{ threat.avgResponseTime }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded" :class="getBgColor(threat.status) + ' ' + getStatusColor(threat.status)">{{ threat.status }}</span>
                  <span class="text-sm font-black text-pixel-plum">{{ threat.failureRate }}%</span>
                </div>
              </div>
              <div class="h-2 bg-pixel-plum/5 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,0,0,0.1)]" 
                  :class="threat.failureRate > 60 ? 'bg-byte-coral' : threat.failureRate > 40 ? 'bg-signal-gold' : 'bg-pixel-moss'" 
                  :style="{ width: `${threat.failureRate}%` }"
                ></div>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-pixel-violet/5 rounded-lg border border-pixel-violet/10">
            <p class="text-[10px] font-bold text-pixel-violet uppercase tracking-wider flex items-center gap-2 leading-relaxed">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Insight: Phishing and DDoS attacks show critical failure rates across the general population. Recommendation: Inject more training modules in early game levels.
            </p>
          </div>
        </div>

        <!-- 2. Map Performance Matrix -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="map in analytics.mapPerformance" :key="map.name" class="pixel-card">
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-sm font-black text-pixel-plum uppercase tracking-tighter">{{ map.name }}</h4>
              <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-pixel-plum/40 uppercase">Diff Rating</span>
                <span class="text-xs font-black text-pixel-plum">{{ map.difficultyRating }}/10</span>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-bold text-pixel-plum/50 uppercase">Completion Rate</span>
                <span class="text-xs font-black" :class="map.completionRate < 30 ? 'text-byte-coral' : 'text-pixel-moss'">{{ map.completionRate }}%</span>
              </div>
              <div class="h-1 bg-pixel-plum/5 rounded-full">
                <div class="h-full bg-pixel-violet transition-all duration-700" :style="{ width: `${map.completionRate}%` }"></div>
              </div>
              
              <div class="flex justify-between items-center pt-2">
                <span class="text-[10px] font-bold text-pixel-plum/50 uppercase">Avg Security Credits</span>
                <span class="text-xs font-black text-pixel-violet font-mono">{{ map.avgScore }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar: Live Simulation Stream -->
      <div class="space-y-8">
        <div class="pixel-card border-l-4 border-l-pixel-plum shadow-pixel-soft">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/60 uppercase mb-6 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Active Simulation Feed
          </h3>
          <div class="space-y-4">
            <div v-for="sim in analytics.liveSimulations" :key="sim.id" class="p-3 bg-pixel-plum/5 rounded border border-pixel-plum/10 hover:bg-pixel-plum/10 transition-colors">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <!-- Dynamic pulse color for simulation status -->
                  <div class="w-1.5 h-1.5 rounded-full animate-pulse" :class="sim.status === 'critical' ? 'bg-byte-coral' : sim.status === 'warning' ? 'bg-signal-gold' : 'bg-pixel-moss'"></div>
                  <span class="text-xs font-black uppercase tracking-tight text-pixel-plum">{{ sim.user }}</span>
                </div>
                <span class="text-[9px] font-black text-pixel-plum/50 uppercase">{{ sim.timeElapsed }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[9px] font-bold text-pixel-plum/60 uppercase">Map: {{ sim.map }}</span>
                <span class="text-[10px] font-black px-2 py-0.5 rounded bg-pixel-plum/5" :class="getStatusColor(sim.status)">Vital: {{ sim.health }}%</span>
              </div>
            </div>
          </div>
          <button class="w-full mt-6 py-2 bg-pixel-plum text-white hover:brightness-110 rounded text-[9px] font-black uppercase tracking-widest transition-all shadow-pixel-soft">Monitor All Sectors</button>
        </div>

        <div class="pixel-card">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            System Recommendations
          </h3>
          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="mt-1 w-4 h-4 text-byte-coral"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 8v4"/><path d="M12 16h.01"/><circle cx="12" cy="12" r="10"/></svg></div>
              <p class="text-[10px] font-bold text-pixel-plum/60 leading-relaxed uppercase">High fail rate in <span class="text-byte-coral">Public Park</span> map suggests difficulty spike is too high for current player base.</p>
            </div>
            <div class="flex gap-3">
              <div class="mt-1 w-4 h-4 text-pixel-moss"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <p class="text-[10px] font-bold text-pixel-plum/60 leading-relaxed uppercase">Password Attack defense has improved by <span class="text-pixel-moss">12%</span> this week following the new tutorial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.pixel-card {
  @apply bg-white/60 backdrop-blur-md border border-pixel-violet/10 p-6 rounded-xl shadow-pixel-soft;
}
</style>
