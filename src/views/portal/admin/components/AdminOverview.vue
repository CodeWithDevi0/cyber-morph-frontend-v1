<script setup>
import { ref, computed } from 'vue'
import { mockAdmin } from '@/api/mock'

defineProps({
  systemStats: {
    type: Object,
    required: true,
  },
  allUsers: {
    type: Array,
    required: true,
  },
  auditLogs: {
    type: Array,
    required: true,
  },
  getStatusColor: {
    type: Function,
    required: true,
  },
})

defineEmits(['changeTab'])

const analytics = ref(mockAdmin.analytics)

const getThreatStatusColor = (status) => {
  switch (status) {
    case 'critical': return 'text-byte-coral';
    case 'warning': return 'text-signal-gold';
    case 'improving': return 'text-pixel-moss';
    case 'active': return 'text-pixel-violet';
    default: return 'text-pixel-plum/50';
  }
}

const getThreatBgColor = (status) => {
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
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Operational Metrics Grid with System Recommendations -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="pixel-card bg-pixel-plum text-white shadow-pixel-hero border-none">
        <p class="stat-label-pixel font-black text-pixel-plum">Network Identity Count</p>
        <p class="text-3xl font-black text-pixel-plum">{{ systemStats.totalUsers }}</p>
      </div>
      <div class="pixel-card border-l-4 border-l-pixel-violet">
        <p class="stat-label-pixel">Active Game Sessions</p>
        <p class="text-3xl font-black text-pixel-plum">{{ systemStats.activeSessions }}</p>
      </div>

      <!-- System Recommendations -->
      <div class="pixel-card sm:col-span-2 lg:col-span-2 flex flex-col justify-between">
        <div>
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-4 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            System Recommendations
          </h3>
          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="mt-0.5 w-4 h-4 text-byte-coral shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 8v4"/><path d="M12 16h.01"/><circle cx="12" cy="12" r="10"/></svg></div>
              <p class="text-[10px] font-bold text-pixel-plum/60 leading-normal uppercase">High fail rate in <span class="text-byte-coral">Public Park</span> map suggests difficulty spike is too high for current player base.</p>
            </div>
            <div class="flex gap-3">
              <div class="mt-0.5 w-4 h-4 text-pixel-moss shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <p class="text-[10px] font-bold text-pixel-plum/60 leading-normal uppercase">Password Attack defense has improved by <span class="text-pixel-moss">12%</span> this week following the new tutorial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Attack Failure Analytics -->
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
              <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded" :class="getThreatBgColor(threat.status) + ' ' + getThreatStatusColor(threat.status)">{{ threat.status }}</span>
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
  </div>
</template>

<style scoped>
@reference "../../../../assets/main.css";

.stat-label-pixel {
  @apply text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1;
}

.pixel-card {
  @apply bg-white/60 backdrop-blur-md border border-pixel-violet/10 p-6 rounded-xl shadow-pixel-soft;
}
</style>
