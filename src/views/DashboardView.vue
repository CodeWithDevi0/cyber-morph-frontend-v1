<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 v-if="auth.isPlayer" class="text-4xl font-black tracking-tighter text-white">PLAYER_DASHBOARD<span class="text-neon-blue">.SYS</span></h1>
        <h1 v-else-if="auth.isEducator" class="text-4xl font-black tracking-tighter text-white">EDUCATOR_PORTAL<span class="text-neon-green">.SYS</span></h1>
        <h1 v-else class="text-4xl font-black tracking-tighter text-white">SYSTEM_ADMIN<span class="text-red-500">.ROOT</span></h1>
        <p class="text-xs text-white/40 uppercase tracking-[0.3em] mt-1">Authorized Access: {{ auth.username }}</p>
      </div>
      
      <div v-if="auth.isPlayer" class="flex gap-4">
        <button class="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Quick Play
        </button>
      </div>
    </div>

    <!-- 1. Player Dashboard Content -->
    <template v-if="auth.isPlayer">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="cyber-card group">
          <p class="stat-label">Security Credits</p>
          <div class="flex items-end gap-2">
            <span class="stat-value text-neon-blue group-hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.5)] transition-all">{{ auth.credits }}</span>
            <span class="text-xs text-white/30 font-bold mb-1">CREDITS</span>
          </div>
          <div class="mt-4 h-1 w-full bg-white/5 overflow-hidden">
            <div class="h-full bg-neon-blue transition-all duration-1000" :style="{ width: (auth.credits / 2000 * 100) + '%' }"></div>
          </div>
        </div>

        <div class="cyber-card group">
          <p class="stat-label">Map Progress</p>
          <div class="flex items-end gap-2">
            <span class="stat-value text-neon-green group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.5)] transition-all">{{ auth.progress }}/4</span>
            <span class="text-xs text-white/30 font-bold mb-1">MAPS UNLOCKED</span>
          </div>
          <div class="mt-4 h-1 w-full bg-white/5 overflow-hidden">
            <div class="h-full bg-neon-green transition-all duration-1000" :style="{ width: (auth.progress / 4 * 100) + '%' }"></div>
          </div>
        </div>

        <div class="cyber-card bg-neon-blue/5 border-neon-blue/40 flex flex-col justify-center text-center">
          <p class="text-[10px] uppercase font-black text-neon-blue mb-2 tracking-widest">Next Objective</p>
          <p class="text-lg font-black italic">{{ getNextMapName() }}</p>
          <button class="mt-4 text-xs font-bold text-white hover:text-neon-blue transition-colors underline decoration-neon-blue/30">View Mission Details</button>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="cyber-card">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-sm font-black tracking-widest text-white/80 uppercase">Recent Game Sessions</h3>
          <router-link to="/history" class="text-[10px] text-neon-blue hover:underline">VIEW ALL HISTORY</router-link>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-white/5">
                <th class="pb-3 text-[10px] uppercase text-white/40 tracking-widest">Map</th>
                <th class="pb-3 text-[10px] uppercase text-white/40 tracking-widest">Result</th>
                <th class="pb-3 text-[10px] uppercase text-white/40 tracking-widest text-right">Credits</th>
                <th class="pb-3 text-[10px] uppercase text-white/40 tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="session in mockSessions" :key="session.session_id" class="group hover:bg-white/5 transition-colors">
                <td class="py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full" :class="session.result === 'win' ? 'bg-neon-green' : 'bg-red-500'"></div>
                    <span class="text-sm font-bold">{{ session.map_name }}</span>
                  </div>
                </td>
                <td class="py-4">
                  <span class="text-[10px] px-2 py-0.5 border font-bold" 
                        :class="session.result === 'win' ? 'border-neon-green/30 text-neon-green bg-neon-green/5' : 'border-red-500/30 text-red-500 bg-red-500/5'">
                    {{ session.result.toUpperCase() }}
                  </span>
                </td>
                <td class="py-4 text-right">
                  <div class="flex flex-col items-end">
                    <span class="text-sm font-mono text-neon-green">+{{ session.credits_earned }}</span>
                    <span class="text-[9px] text-red-500/60 font-mono">-{{ session.credits_lost }}</span>
                  </div>
                </td>
                <td class="py-4 text-right text-[10px] text-white/40 font-mono">
                  {{ formatDate(session.played_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- 2. Educator View -->
    <div v-else-if="auth.isEducator" class="cyber-card border-neon-green/30 p-20 text-center">
      <div class="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#39ff14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      </div>
      <h2 class="text-3xl font-black text-white mb-2">CLASSROOM_MANAGEMENT</h2>
      <p class="text-white/50 max-w-md mx-auto mb-8">Access student performance data, generate classroom codes, and monitor simulation progress across your groups.</p>
      <button class="btn-primary !bg-neon-green">INITIALIZE PORTAL</button>
    </div>

    <!-- 3. Admin View -->
    <div v-else-if="auth.isAdmin" class="cyber-card border-red-500/30 p-20 text-center">
      <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h2 class="text-3xl font-black text-white mb-2">ROOT_ADMIN_ACCESS</h2>
      <p class="text-white/50 max-w-md mx-auto mb-8">System-wide audit logs, user role management, and global simulation parameters are available through this terminal.</p>
      <button class="btn-primary !bg-red-500">OPEN SYSTEM LOGS</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { mockSessions } from '@/api/mock';

const auth = useAuthStore();

const getNextMapName = () => {
  const maps = ["Home", "School", "Pisonet", "Public Park"];
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
