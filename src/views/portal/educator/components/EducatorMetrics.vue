<script setup>
defineProps({
  totalStudents: Number,
  activeCodes: Number,
  avgProgress: String
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Total Students -->
    <div class="pixel-card border-l-4 border-l-pixel-moss">
      <p class="stat-label-pixel text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1">Total Students</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-black text-pixel-plum">{{ totalStudents }}</span>
        <span class="text-pixel-10 text-pixel-plum/30 font-black uppercase mb-1 tracking-widest">Active Personnel</span>
      </div>
    </div>

    <!-- Active Codes -->
    <div class="pixel-card border-l-4 border-l-pixel-violet">
      <p class="stat-label-pixel text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1">Active Units</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-black text-pixel-plum">{{ activeCodes }}</span>
        <span class="text-pixel-10 text-pixel-plum/30 font-black uppercase mb-1 tracking-widest">Operational Codes</span>
      </div>
    </div>

    <!-- Cohort Mastery -->
    <div class="pixel-card border-l-4 border-l-signal-gold">
      <p class="stat-label-pixel text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1">Cohort Mastery</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-black text-pixel-plum">{{ avgProgress }}</span>
        <span class="text-pixel-10 text-pixel-plum/30 font-black uppercase mb-1 tracking-widest">Avg Progress</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";
</style>
