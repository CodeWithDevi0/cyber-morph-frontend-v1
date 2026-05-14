<script setup>
defineProps({
  systemStats: {
    type: Object,
    required: true
  },
  allUsers: {
    type: Array,
    required: true
  },
  auditLogs: {
    type: Array,
    required: true
  },
  getStatusColor: {
    type: Function,
    required: true
  }
});

defineEmits(['changeTab']);
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Operational Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="pixel-card bg-pixel-plum text-white shadow-pixel-hero border-none">
        <p class="stat-label-pixel !text-white/40">Network Identity Count</p>
        <p class="text-3xl font-black">{{ systemStats.totalUsers }}</p>
      </div>
      <div class="pixel-card border-l-4 border-l-pixel-violet">
        <p class="stat-label-pixel">Active Game Sessions</p>
        <p class="text-3xl font-black text-pixel-plum">{{ systemStats.activeSessions }}</p>
      </div>
      <div class="pixel-card border-l-4 border-l-byte-coral">
        <p class="stat-label-pixel">Security Breaches</p>
        <p class="text-3xl font-black text-byte-coral">0</p>
      </div>
      <div class="pixel-card border-l-4 border-l-pixel-moss">
        <p class="stat-label-pixel">System Uptime</p>
        <p class="text-3xl font-black text-pixel-moss">14d 2h</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      <!-- Left Column: Health & Roles -->
      <div class="space-y-8">
        <!-- 1. System Vital Monitors -->
        <div class="pixel-card">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Service Health Protocols
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="service in [
              { name: 'AUTH_GATEWAY', status: 'Online', color: 'bg-pixel-moss' },
              { name: 'SIM_ENGINE', status: 'Online', color: 'bg-pixel-moss' },
              { name: 'DATA_VAULT', status: 'Syncing', color: 'bg-signal-gold' },
              { name: 'EDGE_NODE', status: 'Online', color: 'bg-pixel-moss' }
            ]" :key="service.name" class="p-3 bg-pixel-plum/5 rounded border border-pixel-plum/5 flex items-center gap-3">
              <div class="w-2 h-2 rounded-full animate-pulse" :class="service.color"></div>
              <div>
                <p class="text-[9px] font-black text-pixel-plum/40 uppercase leading-none mb-1">{{ service.name }}</p>
                <p class="text-[11px] font-black text-pixel-plum uppercase tracking-tighter">{{ service.status }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. User Role Distribution -->
        <div class="pixel-card">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Network Role Allocation
          </h3>
          <div class="space-y-5">
            <div v-for="role in [
              { label: 'Level 1 Operatives', count: allUsers.filter(u => u.role === 'player').length, total: allUsers.length, color: 'bg-pixel-violet' },
              { label: 'Command Instructors', count: allUsers.filter(u => u.role === 'educator').length, total: allUsers.length, color: 'bg-signal-gold' },
              { label: 'System Oversight', count: allUsers.filter(u => u.role === 'admin').length, total: allUsers.length, color: 'bg-byte-coral' }
            ]" :key="role.label">
              <div class="flex justify-between text-[10px] font-black uppercase mb-2">
                <span class="text-pixel-plum/60">{{ role.label }}</span>
                <span class="text-pixel-plum">{{ role.count }}</span>
              </div>
              <div class="h-2 bg-pixel-plum/5 rounded-full overflow-hidden">
                <div class="h-full transition-all duration-1000" :class="role.color" :style="{ width: `${(role.count / role.total) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Heatmap -->
      <div class="space-y-8">
        <!-- 3. Global Activity Heatmap (Stylized) -->
        <div class="pixel-card bg-[#1a1c23] border-[#2d303e] h-full flex flex-col">
          <h3 class="text-xs font-black tracking-widest text-white/60 uppercase mb-6 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z"/></svg>
            Simulation Vector Map
          </h3>
          <div class="flex-1 min-h-[300px] bg-black/40 rounded border border-white/5 relative overflow-hidden group">
            <!-- Mock Grid / Map Pattern -->
            <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(circle, #7D5CFF 1px, transparent 1px); background-size: 20px 20px;"></div>
            
            <!-- Pulsing Activity Points -->
            <div v-for="point in [
              { t: '15%', l: '25%', c: 'bg-pixel-violet' },
              { t: '65%', l: '75%', c: 'bg-pixel-violet' },
              { t: '40%', l: '50%', c: 'bg-byte-coral' },
              { t: '80%', l: '20%', c: 'bg-signal-gold' },
              { t: '30%', l: '85%', c: 'bg-pixel-violet' }
            ]" :key="point.t" 
                 class="absolute w-3 h-3 rounded-full animate-ping opacity-75"
                 :class="point.c"
                 :style="{ top: point.t, left: point.l }"></div>
            
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] group-hover:text-white/60 transition-colors">Sector: ALPHA-9</p>
            </div>
          </div>
          <div class="mt-6 flex justify-between items-center text-[9px] font-black uppercase text-white/40">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 rounded-full bg-pixel-violet"></div> Home</span>
              <span class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 rounded-full bg-byte-coral"></div> Office</span>
              <span class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 rounded-full bg-signal-gold"></div> Cafe</span>
            </div>
            <span class="text-pixel-moss flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              Secure
            </span>
          </div>
        </div>
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
