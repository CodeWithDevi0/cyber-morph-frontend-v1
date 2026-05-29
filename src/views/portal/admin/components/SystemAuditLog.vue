<script setup>
defineProps({
  auditLogs: {
    type: Array,
    required: true
  },
  getStatusColor: {
    type: Function,
    required: true
  }
});
</script>

<template>
  <div class="animate-in fade-in slide-in-from-top-4 duration-500">
    <div class="pixel-card min-h-[600px]">
      <div class="flex items-center justify-between mb-10 border-b border-pixel-plum/5 pb-6">
        <h3 class="text-sm font-black tracking-widest text-pixel-plum/80 uppercase flex items-center gap-2 font-display">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
          System Event Audit Log
        </h3>
        <div class="flex gap-4">
          <select class="px-4 py-2 bg-pixel-plum/5 border border-pixel-plum/10 rounded text-xs font-bold focus:outline-none">
            <option>All Events</option>
            <option>Security Only</option>
            <option>Auth Events</option>
          </select>
          <button class="px-4 py-2 bg-pixel-plum text-white text-[10px] font-black uppercase tracking-widest rounded">Export PDF</button>
        </div>
      </div>

      <div class="space-y-1">
        <div v-for="log in auditLogs" :key="log.id" class="flex items-center justify-between p-4 hover:bg-pixel-plum/[0.03] rounded-lg transition-all group">
          <div class="flex items-center gap-6">
            <div class="w-2 h-2 rounded-full" :class="getStatusColor(log.status)"></div>
            <div class="flex flex-col">
              <span class="text-xs font-black text-pixel-plum uppercase tracking-tight">{{ log.action }}</span>
              <span class="text-[10px] font-bold text-pixel-plum/40 uppercase tracking-tighter">{{ log.timestamp }}</span>
            </div>
          </div>
          <div class="flex items-center gap-12">
            <div class="text-right">
              <p class="text-[10px] font-black text-pixel-plum/40 uppercase tracking-widest leading-none mb-1">Operator</p>
              <p class="text-xs font-bold text-pixel-violet uppercase">{{ log.user }}</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-all">
              <button class="text-pixel-10 font-black text-pixel-plum/40 uppercase hover:text-pixel-plum">Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../../assets/main.css";

.pixel-card {
  @apply bg-white/60 backdrop-blur-md border border-pixel-violet/10 p-6 rounded-xl shadow-pixel-soft;
}
</style>
