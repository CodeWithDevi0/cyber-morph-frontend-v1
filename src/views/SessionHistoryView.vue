<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { mockSessions } from '@/api/mock';

const auth = useAuthStore();

// Sort sessions by date (most recent first)
const sortedSessions = computed(() => {
  return [...mockSessions].sort((a, b) => new Date(b.played_at) - new Date(a.played_at));
});

const stats = computed(() => {
  const cleared = mockSessions.filter(s => s.result === 'win').length;
  const failed = mockSessions.length - cleared;
  const totalCredits = mockSessions.reduce((acc, s) => acc + (s.credits_earned - s.credits_lost), 0);
  
  return { cleared, failed, totalCredits };
});

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">Mission History</h1>
        <p class="text-[10px] text-pixel-plum/60 uppercase font-black tracking-[0.25em] mt-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-pixel-violet animate-pulse"></span>
          Personnel Record: {{ auth.username }}
        </p>
      </div>

      <!-- Stats Summary -->
      <div class="flex gap-4">
        <div class="px-4 py-2 bg-white/50 border border-pixel-plum/10 rounded-lg shadow-sm">
          <p class="text-[9px] uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Cleared</p>
          <p class="text-xl font-black text-pixel-moss font-mono">{{ stats.cleared }}</p>
        </div>
        <div class="px-4 py-2 bg-white/50 border border-pixel-plum/10 rounded-lg shadow-sm">
          <p class="text-[9px] uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Failed</p>
          <p class="text-xl font-black text-byte-coral font-mono">{{ stats.failed }}</p>
        </div>
        <div class="px-4 py-2 bg-white/50 border border-pixel-plum/10 rounded-lg shadow-sm">
          <p class="text-[9px] uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Total Yield</p>
          <p class="text-xl font-black text-pixel-plum font-mono">{{ stats.totalCredits }} CR</p>
        </div>
      </div>
    </div>

    <!-- History Table -->
    <div class="pixel-card">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-pixel-plum/10">
              <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-4">Mission Target</th>
              <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-4">Deployment Status</th>
              <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Credit Delta</th>
              <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Duration</th>
              <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-pixel-plum/5">
            <tr v-for="session in sortedSessions" :key="session.session_id" class="group hover:bg-pixel-violet/[0.03] transition-colors">
              <td class="py-5 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-sm shadow-sm" :class="session.result === 'win' ? 'bg-pixel-moss' : 'bg-byte-coral'"></div>
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-pixel-plum">{{ session.map_name }}</span>
                    <span class="text-[9px] text-pixel-plum/40 font-bold uppercase tracking-wider">Sector ID: 00{{ session.session_id.slice(0, 4) }}</span>
                  </div>
                </div>
              </td>
              <td class="py-5 px-4">
                <span class="text-[9px] px-3 py-1 border-2 rounded font-black tracking-widest uppercase" 
                      :class="session.result === 'win' ? 'border-pixel-moss/30 text-pixel-moss bg-pixel-moss/5' : 'border-byte-coral/30 text-byte-coral bg-byte-coral/5'">
                  {{ session.result === 'win' ? 'SUCCESS' : 'FAILURE' }}
                </span>
              </td>
              <td class="py-5 px-4 text-right">
                <div class="flex flex-col items-end">
                  <span class="text-sm font-black text-pixel-moss" v-if="session.credits_earned > 0">+{{ session.credits_earned }}</span>
                  <span class="text-[9px] text-byte-coral/70 font-bold font-mono" v-if="session.credits_lost > 0">-{{ session.credits_lost }}</span>
                  <span class="text-sm font-black text-pixel-plum/20" v-if="session.credits_earned === 0 && session.credits_lost === 0">0 CR</span>
                </div>
              </td>
              <td class="py-5 px-4 text-right text-xs font-bold text-pixel-plum/70 font-mono">
                {{ formatDuration(session.duration_seconds) }}
              </td>
              <td class="py-5 px-4 text-right">
                <div class="flex flex-col items-end">
                  <span class="text-xs font-bold text-pixel-plum/70">{{ formatDate(session.played_at) }}</span>
                  <span class="text-[10px] text-pixel-plum/40 font-black font-mono">{{ formatTime(session.played_at) }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="sortedSessions.length === 0" class="py-20 text-center">
        <p class="text-pixel-plum/40 font-black uppercase tracking-widest">No mission logs found in system database</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
