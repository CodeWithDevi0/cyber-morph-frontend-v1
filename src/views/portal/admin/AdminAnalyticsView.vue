<script setup>
import { ref, computed } from 'vue'
import { mockAdmin } from '@/api/mock'
import VueApexCharts from 'vue3-apexcharts'

const analytics = ref(mockAdmin.analytics)

// --- FAKE DDA AI MONITORING CHARTS (100% UI) ---

// Chart 1: AI Difficulty Scaling vs Player Skill (Area Chart)
const ddaChartOptions = ref({
  chart: { type: 'area', height: 320, toolbar: { show: false }, fontFamily: 'inherit' },
  colors: ['#4ade80', '#fb7185'], // moss green, byte coral
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: { 
    categories: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6', 'Match 7'],
    labels: { style: { colors: '#a1a1aa', fontSize: '10px', fontWeight: 800, cssClass: 'uppercase tracking-widest' } }
  },
  yaxis: {
    max: 100,
    labels: { style: { colors: '#a1a1aa', fontSize: '10px', fontWeight: 800 } }
  },
  legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontWeight: 800 },
  tooltip: { theme: 'light' }
})

const ddaChartSeries = ref([
  { name: 'Player Skill Assessment', data: [31, 40, 28, 51, 42, 69, 75] },
  { name: 'AI Difficulty Multiplier', data: [20, 35, 45, 40, 55, 60, 78] }
])

// Chart 2: The 14-Dimension Observation Vector (Radar Chart)
const vectorChartOptions = ref({
  chart: { type: 'radar', height: 350, toolbar: { show: false }, fontFamily: 'inherit' },
  colors: ['#8b5cf6'], // pixel-violet
  stroke: { width: 2 },
  fill: { opacity: 0.2 },
  markers: { size: 4, hover: { size: 7 } },
  xaxis: {
    categories: ['Phishing Detection', 'DDoS Mitig.', 'False Positives', 'Reaction Speed', 'Credit Mngmt', 'Network Scan'],
    labels: {
      show: true,
      style: { colors: ['#4b5563', '#4b5563', '#4b5563', '#4b5563', '#4b5563', '#4b5563'], fontSize: '9px', fontWeight: 800, cssClass: 'uppercase tracking-tighter' }
    }
  },
  yaxis: { show: false, min: 0, max: 100 }
})

const vectorChartSeries = ref([
  { name: 'Current PPO State Vector', data: [80, 50, 30, 90, 60, 45] }
])


// --- ORIGINAL LOGIC ---
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

// --- NEW REFRESH LOGIC ---
const toast = ref({ show: false, message: '' })
const isRefreshing = ref(false)

const triggerToast = (msg, duration = 3000) => {
  toast.value = { show: true, message: msg }
  setTimeout(() => toast.value.show = false, duration)
}

const handleRefresh = () => {
  if (isRefreshing.value) return // Prevent spam clicking

  isRefreshing.value = true
  triggerToast('Refreshing AI Data Streams...', 2500) // Show toast for 2.5s

  // Simulate network delay...
  setTimeout(() => {
    // THE MAGIC TRICK: Randomly shift the chart data slightly to fake live updates!
    
    // 1. Shift DDA Line Chart data by a random amount (-5 to +5)
    ddaChartSeries.value[0].data = ddaChartSeries.value[0].data.map(val => Math.max(0, val + Math.floor(Math.random() * 11) - 5))
    ddaChartSeries.value[1].data = ddaChartSeries.value[1].data.map(val => Math.max(0, val + Math.floor(Math.random() * 11) - 5))

    // 2. Shift Vector Radar Chart data by a random amount (-10 to +10)
    vectorChartSeries.value[0].data = vectorChartSeries.value[0].data.map(val => Math.min(100, Math.max(0, val + Math.floor(Math.random() * 21) - 10)))

    // Show success and reset button
    triggerToast('Data Streams Synchronized.', 2000)
    isRefreshing.value = false
  }, 2500)
}
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
    
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform translate-y-10 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform translate-y-10 opacity-0">
      <div v-if="toast.show" class="fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-pixel-soft border-2 font-black text-xs uppercase tracking-widest z-50 flex items-center gap-3 bg-white text-pixel-moss border-pixel-moss">
        <div class="w-2 h-2 rounded-full animate-pulse bg-pixel-moss"></div>
        {{ toast.message }}
      </div>
    </transition>

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
        <button @click="triggerToast('Exporting Telemetry to CSV...')" class="px-6 py-3 border-2 border-pixel-plum text-pixel-plum rounded-lg font-black text-xs uppercase tracking-widest hover:bg-pixel-plum hover:text-white transition-all transform active:scale-95">Export CSV</button>
        <button 
  @click="handleRefresh" 
  :disabled="isRefreshing"
  :class="isRefreshing ? 'bg-pixel-plum/70 cursor-not-allowed' : 'bg-pixel-plum hover:brightness-110 transform active:scale-95'"
  class="px-6 py-3 text-white rounded-lg font-black text-xs uppercase tracking-widest shadow-pixel-soft transition-all w-48 flex justify-center items-center"
>
  {{ isRefreshing ? 'Refreshing...' : 'Refresh Data' }}
</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      <div class="space-y-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="pixel-card col-span-1 md:col-span-2">
             <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                Dynamic Difficulty (DDA) Engine Status
              </h3>
              <span class="text-[9px] font-black text-pixel-moss uppercase tracking-widest bg-pixel-moss/10 px-2 py-1 rounded border border-pixel-moss/20">PPO Model: Stable</span>
            </div>
            <VueApexCharts type="area" height="320" :options="ddaChartOptions" :series="ddaChartSeries" />
          </div>

          <div class="pixel-card">
             <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                AI Observation Vector
              </h3>
            </div>
            <VueApexCharts type="radar" height="300" :options="vectorChartOptions" :series="vectorChartSeries" />
          </div>

          <div class="pixel-card">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 11-8-8-8 8"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
                Attack Failure Analytics
              </h3>
            </div>

            <div class="space-y-6">
              <div v-for="threat in sortedThreats.slice(0, 4)" :key="threat.id" class="group">
                <div class="flex justify-between items-end mb-2">
                  <div class="flex flex-col">
                    <span class="text-xs font-black text-pixel-plum uppercase tracking-tight group-hover:text-pixel-violet transition-colors">{{ threat.name }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded" :class="getBgColor(threat.status) + ' ' + getStatusColor(threat.status)">{{ threat.status }}</span>
                    <span class="text-sm font-black text-pixel-plum">{{ threat.failureRate }}%</span>
                  </div>
                </div>
                <div class="h-2 bg-pixel-plum/5 rounded-full overflow-hidden">
                  <div class="h-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,0,0,0.1)]" :class="threat.failureRate > 60 ? 'bg-byte-coral' : threat.failureRate > 40 ? 'bg-signal-gold' : 'bg-pixel-moss'" :style="{ width: `${threat.failureRate}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

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
              <p class="text-[10px] font-bold text-pixel-plum/60 leading-relaxed uppercase">High fail rate in <span class="text-byte-coral">Public Park</span> suggests difficulty spike is too high for current player base.</p>
            </div>
            <div class="flex gap-3">
              <div class="mt-1 w-4 h-4 text-pixel-moss"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <p class="text-[10px] font-bold text-pixel-plum/60 leading-relaxed uppercase">Password Attack defense has improved by <span class="text-pixel-moss">12%</span> following model recalibration.</p>
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