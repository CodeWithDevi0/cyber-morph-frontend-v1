<script setup>
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
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Operational Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="pixel-card bg-pixel-plum text-white shadow-pixel-hero border-none">
        <p class="stat-label-pixel font-black text-pixel-plum">Network Identity Count</p>
        <p class="text-3xl font-black text-pixel-plum">{{ systemStats.totalUsers }}</p>
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
