<template>
  <div class="flex gap-4">
    <div class="px-4 py-2 bg-white/50 border border-pixel-plum/10 rounded-lg shadow-sm">
      <p class="text-pixel-9 uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Cleared</p>
      <p class="text-xl font-black text-pixel-moss font-mono">{{ stats.cleared }}</p>
    </div>
    <div class="px-4 py-2 bg-white/50 border border-pixel-plum/10 rounded-lg shadow-sm">
      <p class="text-pixel-9 uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Failed</p>
      <p class="text-xl font-black text-byte-coral font-mono">{{ stats.failed }}</p>
    </div>
    <div class="px-4 py-2 bg-white/50 border border-pixel-plum/10 rounded-lg shadow-sm">
      <p class="text-pixel-9 uppercase font-black text-pixel-plum/40 tracking-widest mb-1">Total Yield</p>
      <p class="text-xl font-black text-pixel-plum font-mono">{{ stats.totalCredits }} CR</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>
