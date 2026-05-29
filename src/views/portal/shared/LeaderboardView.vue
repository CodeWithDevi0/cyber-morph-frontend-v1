<script setup>
import { ref, computed, watch } from 'vue';
import { mockLeaderboard } from '@/api/mock';

const maps = ['Overall', 'Home', 'Internet Cafe', 'Office', 'Public Park'];
const activeTab = ref('Overall');
const searchQuery = ref('');
const isSearching = ref(false); // New state for loading realism
const currentPage = ref(1);
const pageSize = 10;

// Reset page when tab changes
watch(activeTab, () => {
  currentPage.value = 1;
});

// Add a realistic delay to the search bar
watch(searchQuery, (newVal) => {
  if (newVal === '') {
    isSearching.value = false;
    currentPage.value = 1;
    return;
  }
  
  isSearching.value = true;
  // Simulate a network search delay of 600ms
  setTimeout(() => {
    isSearching.value = false;
    currentPage.value = 1;
  }, 600);
});

const filteredScores = computed(() => {
  const scores = activeTab.value === 'Overall' 
    ? [...mockLeaderboard] 
    : mockLeaderboard.filter(s => s.map_name === activeTab.value);
  
  return scores.sort((a, b) => b.total_score - a.total_score);
});

// The searched scores only return data if we are NOT currently "searching"
const searchedScores = computed(() => {
  if (isSearching.value) return []; // Show empty state while loading
  if (!searchQuery.value) return filteredScores.value;
  
  const q = searchQuery.value.toLowerCase();
  return filteredScores.value.filter(s => 
    s.username.toLowerCase().includes(q)
  );
});

const paginatedScores = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return searchedScores.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil((!searchQuery.value ? filteredScores.value.length : searchedScores.value.length) / pageSize));

// The podium should ALWAYS show the top 3 overall (not affected by search)
const topThree = computed(() => filteredScores.value.slice(0, 3));

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
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
      <div class="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-pixel-plum/10 pb-8 relative">
      <div class="z-10">
        <div class="flex items-center gap-4 mb-2">
          <div class="relative">
            <div class="w-3 h-3 rounded-full bg-signal-gold animate-ping absolute"></div>
            <div class="w-3 h-3 rounded-full bg-signal-gold relative"></div>
          </div>
          <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase drop-shadow-sm">
            Hall of Fame
          </h1>
        </div>
        <div class="flex flex-wrap items-center gap-y-2 text-pixel-10 text-pixel-plum/50 uppercase font-black tracking-[0.2em]">
          <div class="flex items-center">
            <span class="mr-2">Sector:</span>
            <span class="text-pixel-violet bg-pixel-violet/10 px-2 py-0.5 rounded border border-pixel-violet/20">{{ activeTab }}</span>
          </div>
          <span class="mx-3 opacity-30 hidden sm:inline">|</span> 
          <div class="flex items-center">
            <span class="mr-2">Metric:</span>
            <span class="text-signal-gold">Defense Score</span>
          </div>
          <span class="mx-3 opacity-30 hidden sm:inline">|</span> 
          <div class="flex items-center">
            <span class="mr-2">Records:</span>
            <span class="text-pixel-plum">{{ searchedScores.length }} Personnel Identified</span>
          </div>
        </div>
      </div>
      
      <div class="hidden lg:flex items-center gap-3 px-4 py-2 bg-pixel-plum/5 rounded-full border border-pixel-plum/10 self-start md:self-center">
        <div class="flex gap-1">
          <div v-for="i in 3" :key="i" class="w-1.5 h-4 bg-pixel-violet/40 rounded-full animate-bounce" :style="{ animationDelay: `${i * 150}ms` }"></div>
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest text-pixel-violet/70">Scanning Uplink...</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 border-b border-pixel-plum/10 pb-px overflow-x-auto no-scrollbar relative z-10">
      <button 
        v-for="map in maps" 
        :key="map"
        @click="activeTab = map"
        class="px-6 py-4 text-pixel-10 font-black uppercase tracking-[0.25em] transition-all relative group"
        :class="activeTab === map ? 'text-pixel-violet' : 'text-pixel-plum/40 hover:text-pixel-plum/70'"
      >
        {{ map }}
        <div v-if="activeTab === map" class="absolute bottom-0 left-0 right-0 h-1 bg-pixel-violet shadow-[0_0_12px_rgba(139,92,246,0.5)]"></div>
        <div v-else class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-pixel-violet/30 transition-all group-hover:w-full"></div>
      </button>
    </div>

    <div v-if="topThree.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 relative z-10">
      <div 
        v-for="(player, index) in topThree" 
        :key="player.score_id"
        class="bg-white/60 backdrop-blur-md border border-pixel-violet/10 rounded-xl shadow-pixel-soft relative flex flex-col items-center pt-12 pb-8 group transition-all hover:scale-[1.02]"
        :class="[
          index === 0 ? 'md:-translate-y-6 border-signal-gold/40 bg-gradient-to-b from-signal-gold/10 to-transparent order-1 md:order-2' : '',
          index === 1 ? 'order-2 md:order-1' : '',
          index === 2 ? 'order-3' : ''
        ]"
      >
        <div class="absolute -top-6 w-14 h-14 rounded-xl bg-white border-2 flex items-center justify-center font-black text-2xl shadow-pixel-soft z-20"
             :class="[
               index === 0 ? 'border-signal-gold text-signal-gold shadow-signal-gold/20' : 
               index === 1 ? 'border-pixel-lavender text-pixel-lavender' : 
               'border-byte-coral text-byte-coral'
             ]">
          <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="absolute -top-5 text-signal-gold drop-shadow-md"><path d="m12 1.5 3 6 7 1-5 5.5 1.5 7.5-6.5-3.5-6.5 3.5 1.5-7.5-5-5.5 7-1z"/></svg>
          {{ index + 1 }}
        </div>

        <div v-if="index === 0" class="absolute inset-0 bg-signal-gold/5 animate-pulse rounded-lg pointer-events-none"></div>

        <div class="w-20 h-20 rounded-full bg-pixel-plum/5 flex items-center justify-center mb-6 border-2 border-pixel-plum/10 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-pixel-plum/30"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <div v-if="index === 0" class="absolute -bottom-1 -right-1 bg-signal-gold p-1 rounded-full text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
        </div>

        <h3 class="text-xl font-black text-pixel-plum uppercase font-display group-hover:text-pixel-violet transition-colors tracking-tight">{{ player.username }}</h3>
        <div class="mt-1 mb-6 flex items-center gap-2">
          <span class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-[0.2em]">{{ player.map_name }}</span>
          <div class="w-1 h-1 rounded-full bg-pixel-plum/20"></div>
          <span class="text-[10px] font-black text-pixel-violet uppercase tracking-[0.2em]">Validated</span>
        </div>
        
        <div class="relative">
          <div class="absolute inset-0 bg-pixel-plum blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div class="relative px-6 py-2.5 bg-pixel-plum text-white rounded-lg font-mono font-black text-lg shadow-xl shadow-pixel-plum/20 border border-white/10">
            {{ player.total_score.toLocaleString() }} <span class="text-xs opacity-50 ml-1">PTS</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white/60 backdrop-blur-md border border-pixel-violet/10 rounded-xl shadow-pixel-soft overflow-hidden relative z-10 border-t-4 border-t-pixel-violet/30">
      <div class="p-6 border-b border-pixel-plum/10 bg-pixel-plum/[0.02] flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 class="text-pixel-10 font-black uppercase tracking-[0.3em] text-pixel-plum/70 flex items-center gap-3 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-pixel-violet"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
          Active Personnel Registry
        </h2>
        
        <div class="flex-1 max-w-sm w-full md:px-4">
          <div class="relative group">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="SEARCH OPERATOR..." 
              class="w-full bg-pixel-plum/5 border border-pixel-plum/10 rounded-lg py-2 pl-10 pr-4 text-[10px] font-black tracking-widest text-pixel-plum placeholder:text-pixel-plum/30 focus:outline-none focus:border-pixel-violet/50 focus:bg-pixel-violet/5 transition-all"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="absolute left-3 top-1/2 -translate-y-1/2 text-pixel-plum/30 group-focus-within:text-pixel-violet transition-colors"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        <div class="text-[10px] font-bold text-pixel-plum/30 uppercase tracking-widest shrink-0">
          Last Synchronized: <span class="text-pixel-plum/60">JUST NOW</span>
        </div>
      </div>
      
      <div class="overflow-x-auto min-h-[300px] relative">
        <div v-if="isSearching" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-20 transition-opacity">
           <div class="flex flex-col items-center gap-3">
             <div class="flex gap-2">
               <div class="w-2 h-2 bg-pixel-violet rounded-full animate-bounce" style="animation-delay: 0ms"></div>
               <div class="w-2 h-2 bg-pixel-violet rounded-full animate-bounce" style="animation-delay: 150ms"></div>
               <div class="w-2 h-2 bg-pixel-violet rounded-full animate-bounce" style="animation-delay: 300ms"></div>
             </div>
             <span class="text-[10px] font-black uppercase tracking-widest text-pixel-violet">Querying Database...</span>
           </div>
        </div>

        <table class="w-full text-left">
          <thead>
            <tr class="bg-pixel-plum/[0.01]">
              <th class="py-5 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-6 w-20">Rank</th>
              <th class="py-5 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-6">Operator Identity</th>
              <th class="py-5 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-6">Assigned Sector</th>
              <th class="py-5 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-6 text-right">Defense Rating</th>
              <th class="py-5 text-pixel-10 uppercase text-pixel-plum/50 font-black tracking-widest px-6 text-right">Timestamp</th>
            </tr>
          </thead>
          <transition-group name="list" tag="tbody" class="divide-y divide-pixel-plum/5">
            <tr 
              v-for="(player, index) in paginatedScores" 
              :key="player.score_id" 
              class="group hover:bg-pixel-violet/[0.03] transition-all"
              :class="activeTab === 'Overall' && searchQuery === '' && ((currentPage - 1) * pageSize + index) < 3 ? 'bg-pixel-plum/[0.02]' : ''"
            >
              <td class="py-5 px-6 font-black text-sm" :class="getRankColor((currentPage - 1) * pageSize + index)">
                #{{ (currentPage - 1) * pageSize + index + 1 }}
              </td>
              <td class="py-5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-pixel-plum/5 flex items-center justify-center text-pixel-plum/30 group-hover:bg-pixel-violet/10 group-hover:text-pixel-violet transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <span class="text-sm font-black text-pixel-plum group-hover:text-pixel-violet transition-colors">{{ player.username }}</span>
                </div>
              </td>
              <td class="py-5 px-6">
                <span class="text-[10px] font-black px-3 py-1.5 bg-pixel-plum/5 text-pixel-plum/50 rounded-full border border-pixel-plum/10 uppercase tracking-widest group-hover:border-pixel-violet/30 group-hover:text-pixel-violet/70 transition-colors">
                  {{ player.map_name }}
                </span>
              </td>
              <td class="py-5 px-6 text-right font-mono">
                <div class="inline-flex flex-col items-end">
                  <span class="text-sm font-black text-pixel-violet">{{ player.total_score.toLocaleString() }}</span>
                  <div class="w-12 h-1 bg-pixel-plum/5 rounded-full mt-1 overflow-hidden">
                    <div class="h-full bg-pixel-violet opacity-40" :style="{ width: `${(player.total_score / filteredScores[0].total_score) * 100}%` }"></div>
                  </div>
                </div>
              </td>
              <td class="py-5 px-6 text-right text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">
                {{ formatDate(player.recorded_at) }}
              </td>
            </tr>
          </transition-group>
        </table>
        
        <div v-if="!isSearching && paginatedScores.length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-pixel-plum/20 mb-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <p class="text-xs font-black uppercase tracking-widest text-pixel-plum/40">No Operators Found</p>
          <p class="text-[10px] font-bold uppercase tracking-tighter text-pixel-plum/30 mt-1">Adjust search parameters or sector filter</p>
        </div>
      </div>

      <div v-if="totalPages > 1 && !isSearching" class="p-4 border-t border-pixel-plum/10 bg-pixel-plum/[0.02] flex flex-col sm:flex-row items-center justify-center gap-4">
        <div class="flex items-center gap-2">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-pixel-plum/10 rounded-lg hover:bg-pixel-violet/10 hover:text-pixel-violet disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            Previous
          </button>
          
          <div class="flex gap-1">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="currentPage = page"
              class="w-8 h-8 flex items-center justify-center text-[10px] font-black border rounded-lg transition-all"
              :class="currentPage === page ? 'bg-pixel-violet border-pixel-violet text-white shadow-lg shadow-pixel-violet/30' : 'border-pixel-plum/10 text-pixel-plum/50 hover:border-pixel-violet/30 hover:text-pixel-violet'"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-pixel-plum/10 rounded-lg hover:bg-pixel-violet/10 hover:text-pixel-violet disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Table Row Smooth Animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>