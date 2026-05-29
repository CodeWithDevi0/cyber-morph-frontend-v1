<script setup>
import { ref } from 'vue'

const message = ref('')
const isSending = ref(false)

const handleBroadcast = () => {
  if (!message.value) return
  isSending.value = true
  setTimeout(() => {
    isSending.value = false
    message.value = ''
    alert('Broadcast Sent to All Personnel.')
  }, 1000)
}
</script>

<template>
  <div class="pixel-card bg-pixel-plum text-white">
    <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
      <h3 class="text-[10px] font-black tracking-widest text-white/60 uppercase flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z"/><path d="M10 12h.01"/><path d="M16 2v2"/><path d="M6 2v2"/><path d="M22 8v8"/></svg>
        System Broadcast
      </h3>
      <div class="flex gap-1">
        <div class="w-1.5 h-1.5 rounded-full bg-signal-red animate-ping"></div>
        <div class="text-[8px] font-black uppercase text-signal-red">Live Link</div>
      </div>
    </div>

    <div class="relative group">
      <textarea 
        v-model="message"
        placeholder="Enter directive for personnel..."
        class="w-full h-24 bg-black/30 border border-white/10 rounded-lg p-3 text-[11px] font-mono text-pixel-moss focus:outline-none focus:border-pixel-moss/50 transition-all placeholder:text-white/20 resize-none"
      ></textarea>
      
      <div class="absolute bottom-2 right-2 flex items-center gap-2">
        <span class="text-[9px] font-bold text-white/30 uppercase">{{ message.length }}/280</span>
      </div>
    </div>

    <button 
      @click="handleBroadcast"
      :disabled="!message || isSending"
      class="w-full mt-4 bg-pixel-moss py-2.5 rounded-lg text-[10px] font-black font-display uppercase tracking-[0.2em] shadow-pixel-soft hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <svg v-if="isSending" class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      <span>{{ isSending ? 'Transmitting...' : 'Initiate Broadcast' }}</span>
    </button>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

textarea::-webkit-scrollbar {
  width: 4px;
}
textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
