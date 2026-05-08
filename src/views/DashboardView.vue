<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-pixel-plum">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 v-if="auth.isPlayer" class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">Dashboard</h1>
        <h1 v-else-if="auth.isEducator" class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">Educator Portal</h1>
        <h1 v-else class="text-4xl font-black font-display tracking-tight text-pixel-plum uppercase">System Root</h1>
        <p class="text-[10px] text-pixel-plum/60 uppercase font-black tracking-[0.25em] mt-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-pixel-moss animate-pulse"></span>
          Active Session: {{ auth.username }}
        </p>
      </div>
      
      <div v-if="auth.isPlayer" class="flex gap-4">
        <button class="btn-pixel group px-6 py-2.5 bg-pixel-violet text-white font-black font-display text-sm flex items-center gap-2 rounded-md shadow-pixel-purple hover:brightness-105 transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-0.5 transition-transform"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Quick Launch
        </button>
      </div>
    </div>

    <!-- 1. Player Dashboard Content -->
    <template v-if="auth.isPlayer">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="pixel-card group border-l-4 border-l-pixel-violet">
          <p class="stat-label-pixel">Security Credits</p>
          <div class="flex items-end gap-2">
            <span class="text-4xl font-black text-pixel-plum group-hover:text-pixel-violet transition-colors">{{ auth.credits }}</span>
            <span class="text-[11px] text-pixel-plum/50 font-black mb-2 uppercase tracking-widest">Credits</span>
          </div>
          <div class="mt-4 h-2 w-full bg-pixel-plum/10 rounded-full overflow-hidden border border-pixel-plum/5">
            <div class="h-full bg-pixel-violet transition-all duration-1000 shadow-[0_0_8px_rgba(125,92,255,0.4)]" :style="{ width: Math.min((auth.credits / 2000 * 100), 100) + '%' }"></div>
          </div>
        </div>

        <div class="pixel-card group border-l-4 border-l-pixel-moss">
          <p class="stat-label-pixel">Map Progress</p>
          <div class="flex items-end gap-2">
            <span class="text-4xl font-black text-pixel-plum group-hover:text-pixel-moss transition-colors">{{ auth.progress }}/4</span>
            <span class="text-[11px] text-pixel-plum/50 font-black mb-2 uppercase tracking-widest">Unlocked</span>
          </div>
          <div class="mt-4 h-2 w-full bg-pixel-plum/10 rounded-full overflow-hidden border border-pixel-plum/5">
            <div class="h-full bg-pixel-moss transition-all duration-1000 shadow-[0_0_8px_rgba(143,221,138,0.4)]" :style="{ width: (auth.progress / 4 * 100) + '%' }"></div>
          </div>
        </div>

        <div class="pixel-card bg-pixel-violet/5 border-pixel-violet/20 flex flex-col justify-center text-center">
          <p class="text-[10px] uppercase font-black text-pixel-violet/70 mb-2 tracking-widest">Current Target</p>
          <p class="text-xl font-black text-pixel-plum font-display uppercase tracking-tight">{{ getNextMapName() }}</p>
          <button class="mt-4 text-[10px] font-black uppercase tracking-widest text-pixel-violet hover:brightness-75 transition-all">Mission Details</button>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="pixel-card">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-pixel-plum/10">
          <h3 class="text-xs font-black tracking-[0.2em] text-pixel-plum/80 uppercase font-display">Mission Logs</h3>
          <router-link to="/history" class="text-[10px] font-black text-pixel-violet hover:underline tracking-[0.15em] uppercase">Full History</router-link>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr>
                <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2">Map</th>
                <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2">Status</th>
                <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right">Yield</th>
                <th class="pb-4 text-[10px] uppercase text-pixel-plum/50 font-black tracking-widest px-2 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-pixel-plum/5">
              <tr v-for="session in mockSessions" :key="session.session_id" class="group hover:bg-pixel-violet/[0.03] transition-colors">
                <td class="py-5 px-2">
                  <div class="flex items-center gap-3">
                    <div class="w-2.5 h-2.5 rounded-sm shadow-sm" :class="session.result === 'win' ? 'bg-pixel-moss' : 'bg-byte-coral'"></div>
                    <span class="text-sm font-black text-pixel-plum/90">{{ session.map_name }}</span>
                  </div>
                </td>
                <td class="py-5 px-2">
                  <span class="text-[9px] px-2.5 py-1 border-2 rounded font-black tracking-widest uppercase" 
                        :class="session.result === 'win' ? 'border-pixel-moss/40 text-pixel-moss bg-pixel-moss/10' : 'border-byte-coral/40 text-byte-coral bg-byte-coral/10'">
                    {{ session.result === 'win' ? 'Cleared' : 'Failed' }}
                  </span>
                </td>
                <td class="py-5 px-2 text-right">
                  <div class="flex flex-col items-end">
                    <span class="text-sm font-black text-pixel-moss">+{{ session.credits_earned }}</span>
                    <span class="text-[9px] text-byte-coral/80 font-bold font-mono">-{{ session.credits_lost }}</span>
                  </div>
                </td>
                <td class="py-5 px-2 text-right text-[10px] text-pixel-plum/50 font-black font-mono">
                  {{ formatDate(session.played_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- 2. Educator View -->
    <div v-else-if="auth.isEducator" class="pixel-card border-pixel-moss/30 py-20 text-center">
      <div class="w-20 h-20 bg-pixel-moss/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-pixel-purple border border-pixel-moss/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-pixel-moss" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      </div>
      <h2 class="text-3xl font-black text-pixel-plum font-display mb-3 uppercase tracking-tight">Classroom Management</h2>
      <p class="text-pixel-plum/60 max-w-md mx-auto mb-10 font-bold text-sm leading-relaxed">Access student performance data, generate classroom codes, and monitor simulation progress across your groups.</p>
      <button class="px-10 py-3.5 bg-pixel-moss text-white font-black font-display rounded-md shadow-pixel-purple hover:brightness-105 transition-all uppercase tracking-widest text-sm">Initialize Portal</button>
    </div>

    <!-- 3. Admin View -->
    <div v-else-if="auth.isAdmin" class="pixel-card border-byte-coral/30 py-20 text-center">
      <div class="w-20 h-20 bg-byte-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-pixel-purple border border-byte-coral/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-byte-coral" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h2 class="text-3xl font-black text-pixel-plum font-display mb-3 uppercase tracking-tight">System Administration</h2>
      <p class="text-pixel-plum/60 max-w-md mx-auto mb-10 font-bold text-sm leading-relaxed">System-wide audit logs, user role management, and global simulation parameters are available through this terminal.</p>
      <button class="px-10 py-3.5 bg-byte-coral text-white font-black font-display rounded-md shadow-pixel-purple hover:brightness-105 transition-all uppercase tracking-widest text-sm">Open System Logs</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { mockSessions } from '@/api/mock';

const auth = useAuthStore();

const getNextMapName = () => {
  const maps = ["Home", "Internet Cafe", "Office", "Public Park"];
  return maps[auth.progress] || "All Levels Clear";
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
@reference "@/assets/main.css";

.stat-label-pixel {
  @apply text-[10px] uppercase font-black tracking-[0.2em] text-pixel-plum/60 mb-2 ml-1;
}
</style>
