<script setup>
import { mockStudentDetails } from '@/api/mock'

defineProps({
  show: Boolean,
  student: Object
})

defineEmits(['close'])
</script>

<template>
  <div 
    v-if="show"
    class="fixed inset-0 z-[100] flex justify-end"
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-pixel-plum/40 backdrop-blur-sm animate-in fade-in duration-300"
      @click="$emit('close')"
    ></div>

    <!-- Panel -->
    <div 
      class="relative w-full max-w-md bg-white h-full shadow-2xl border-l-4 border-pixel-violet flex flex-col animate-in slide-in-from-right duration-500 ease-out"
    >
      <!-- Header -->
      <div class="p-6 bg-pixel-violet text-white relative overflow-hidden">
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Tactical Personnel File</span>
            <button @click="$emit('close')" class="hover:rotate-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <h2 class="text-3xl font-black font-display uppercase tracking-tight">{{ student?.username || mockStudentDetails.username }}</h2>
          <p class="text-xs font-black text-signal-gold uppercase tracking-widest mt-1">{{ mockStudentDetails.rank }}</p>
        </div>
        <!-- Decorative SVG background -->
        <svg class="absolute right-0 bottom-0 opacity-10 w-48 h-48 translate-x-12 translate-y-12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <!-- Core Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-pixel-violet/5 border border-pixel-violet/10">
            <p class="text-[9px] font-black text-pixel-plum/40 uppercase mb-1">Combat Credits</p>
            <p class="text-xl font-black text-pixel-violet font-mono">{{ student?.security_credits || 0 }}</p>
          </div>
          <div class="p-4 rounded-xl bg-pixel-moss/5 border border-pixel-moss/10">
            <p class="text-[9px] font-black text-pixel-plum/40 uppercase mb-1">Map Mastery</p>
            <p class="text-xl font-black text-pixel-moss">{{ student?.map_progress || 0 }}/4</p>
          </div>
        </div>

        <!-- Recent Engagement History -->
        <div>
          <h3 class="text-[10px] font-black text-pixel-plum/50 uppercase tracking-widest mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
            Recent Engagement History
          </h3>
          <div class="space-y-3">
            <div 
              v-for="session in mockStudentDetails.sessions" 
              :key="session.date"
              class="flex items-center justify-between p-3 rounded-lg border border-pixel-plum/5 bg-pixel-plum/[0.02]"
            >
              <div>
                <p class="text-[11px] font-black text-pixel-plum uppercase">{{ session.map }}</p>
                <p class="text-[9px] font-bold text-pixel-plum/30 uppercase">{{ session.date }} • {{ session.duration }}</p>
              </div>
              <div class="text-right">
                <p 
                  class="text-xs font-black uppercase"
                  :class="session.result === 'win' ? 'text-pixel-moss' : 'text-signal-red'"
                >
                  {{ session.credits > 0 ? '+' : '' }}{{ session.credits }} CR
                </p>
                <p class="text-[8px] font-black uppercase text-pixel-plum/30">{{ session.result }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Unlocked Threats -->
        <div>
          <h3 class="text-[10px] font-black text-pixel-plum/50 uppercase tracking-widest mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Mastered Threat Vectors
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="threat in mockStudentDetails.threatsUnlocked" 
              :key="threat"
              class="px-2.5 py-1 bg-pixel-violet/10 text-pixel-violet text-[9px] font-black rounded uppercase tracking-tight"
            >
              {{ threat }}
            </span>
          </div>
        </div>

        <!-- Areas for Improvement -->
        <div class="p-4 rounded-xl bg-signal-gold/10 border border-signal-gold/20">
          <h3 class="text-[10px] font-black text-signal-gold uppercase tracking-widest mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            Instructor Directives
          </h3>
          <p class="text-[11px] font-medium text-pixel-plum/70 italic leading-relaxed">
            Personnel shows vulnerability to {{ mockStudentDetails.weaknesses.join(' and ') }}. Recommend focused drills on Map 2.
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="p-6 border-t border-pixel-plum/10 flex gap-3">
        <button class="flex-1 bg-pixel-moss text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-pixel-soft hover:brightness-110 active:scale-95 transition-all">
          Issue Directive
        </button>
        <button class="px-4 border-2 border-pixel-plum/10 rounded-lg hover:bg-pixel-plum/5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5D4D7A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17h.01"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(93, 77, 122, 0.1);
  border-radius: 10px;
}
</style>
