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
      <!-- Dashboard Snapshot -->
      <div class="space-y-6">
        <div class="pixel-card">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-8 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            Recent System Activity
          </h3>
          <div class="space-y-4">
            <div v-for="user in allUsers.slice(0, 3)" :key="user.id" class="flex items-center justify-between p-4 bg-pixel-plum/5 rounded-lg border border-pixel-plum/5">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded bg-pixel-violet/10 flex items-center justify-center text-pixel-violet font-black text-sm">
                  {{ user.username.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-black text-pixel-plum uppercase">{{ user.username }}</p>
                  <p class="text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">{{ user.role }} • {{ user.lastLogin }}</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-pixel-10 font-black uppercase px-2 py-0.5 rounded bg-pixel-moss/10 text-pixel-moss">Active</span>
              </div>
            </div>
          </div>
          <button @click="$emit('changeTab', 'users')" class="w-full mt-6 py-3 bg-pixel-plum/5 rounded text-xs font-black uppercase text-pixel-plum/60 hover:bg-pixel-plum/10 transition-all tracking-[0.2em]">
            Access User Registry
          </button>
        </div>
      </div>

      <!-- Audit Stream Snapshot -->
      <div class="space-y-6">
        <div class="pixel-card bg-pixel-plum/5 border-pixel-plum/10 border-t-4 border-t-pixel-plum">
          <h3 class="text-xs font-black tracking-widest text-pixel-plum/80 uppercase mb-6 flex items-center gap-2 font-display">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
            Recent System Events
          </h3>
          <div class="space-y-4">
            <div v-for="log in auditLogs.slice(0, 4)" :key="log.id" class="p-3 border-b border-pixel-plum/5 last:border-0 flex items-start gap-4">
              <div class="mt-1 w-1.5 h-1.5 rounded-full shrink-0" :class="getStatusColor(log.status)"></div>
              <div class="space-y-1">
                <p class="text-[11px] font-black text-pixel-plum tracking-tight leading-none uppercase">{{ log.action }}</p>
                <p class="text-pixel-10 font-bold text-pixel-plum/40 uppercase tracking-tighter">
                  User: <span class="text-pixel-violet">{{ log.user }}</span> • {{ log.timestamp }}
                </p>
              </div>
            </div>
          </div>
          <button @click="$emit('changeTab', 'audit')" class="w-full mt-6 py-2 border border-pixel-plum/10 rounded text-pixel-9 font-black uppercase text-pixel-plum/60 hover:bg-pixel-plum/5 transition-all tracking-widest">
            View Full System Logs
          </button>
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
