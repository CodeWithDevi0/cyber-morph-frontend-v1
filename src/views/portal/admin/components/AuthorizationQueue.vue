<script setup>
defineProps({
  pendingApprovals: {
    type: Array,
    required: true
  }
});

defineEmits(['approve', 'deny']);
</script>

<template>
  <div class="animate-in fade-in slide-in-from-right-4 duration-500">
    <div v-if="pendingApprovals.length === 0" class="pixel-card min-h-[400px] flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-pixel-moss/10 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-pixel-moss"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <h3 class="text-xl font-black text-pixel-plum uppercase tracking-tight">Queue Depleted</h3>
      <p class="text-xs font-bold text-pixel-plum/40 uppercase tracking-[0.2em] mt-2">All protocols are currently authorized.</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <div v-for="pending in pendingApprovals" :key="pending.id" class="pixel-card group">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-pixel-violet/10 rounded-lg flex items-center justify-center text-pixel-violet font-black text-2xl shadow-pixel-soft border border-pixel-violet/10">
              {{ pending.displayName.charAt(0) }}
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h4 class="text-lg font-black text-pixel-plum uppercase tracking-tight">{{ pending.displayName }}</h4>
                <span class="px-2 py-0.5 bg-signal-gold/10 text-signal-gold text-[9px] font-black uppercase tracking-widest rounded border border-signal-gold/20">Pending Validation</span>
              </div>
              <p class="text-xs font-bold text-pixel-plum/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="m22 9-10 7L2 9"/></svg>
                {{ pending.email }}
              </p>
              <div class="flex gap-2">
                <span class="text-pixel-9 font-black uppercase text-pixel-plum/30 bg-pixel-plum/5 px-2 py-1 rounded tracking-tighter">Applied: {{ pending.appliedAt }}</span>
                <span class="text-pixel-9 font-black uppercase text-pixel-plum/30 bg-pixel-plum/5 px-2 py-1 rounded tracking-tighter">Sector: Academic</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-pixel-plum/5 pt-6 md:pt-0">
            <button 
              @click="$emit('approve', pending.id)"
              class="flex-1 md:flex-none px-8 py-3 bg-pixel-moss text-white font-black uppercase font-display tracking-widest rounded-lg hover:brightness-110 shadow-pixel-soft transition-all transform active:scale-95"
            >
              Approve
            </button>
            <button 
              @click="$emit('deny', pending.id)"
              class="flex-1 md:flex-none px-8 py-3 bg-byte-coral/10 text-byte-coral border border-byte-coral/20 font-black uppercase font-display tracking-widest rounded-lg hover:bg-byte-coral/20 transition-all transform active:scale-95"
            >
              Deny
            </button>
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
