<template>
  <div class="grid grid-cols-1 gap-6">
    <!-- Asset Hub -->
    <div class="pixel-card border-l-4 border-l-pixel-violet">
      <p class="stat-label-pixel">Security Credits</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-black text-pixel-plum">{{ credits }}</span>
        <span class="text-pixel-10 text-pixel-plum/40 font-black uppercase tracking-widest mb-1"
          >Total CR</span
        >
      </div>
      <div class="mt-3 h-1.5 w-full bg-pixel-plum/5 rounded-full overflow-hidden">
        <div
          class="h-full bg-pixel-violet transition-all duration-1000"
          :style="{ width: Math.min((credits / 2000) * 100, 100) + '%' }"
        ></div>
      </div>
    </div>

    <!-- Intel Mastery -->
    <div class="pixel-card border-l-4 border-l-byte-coral">
      <p class="stat-label-pixel">Intel Mastery</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-black text-pixel-plum">{{ unlockedThreats }}/12</span>
        <span class="text-pixel-10 text-pixel-plum/40 font-black uppercase tracking-widest mb-1"
          >Threats</span
        >
      </div>
      <div class="mt-3 h-1.5 w-full bg-pixel-plum/5 rounded-full overflow-hidden">
        <div 
          class="h-full bg-byte-coral transition-all duration-1000" 
          :style="{ width: (unlockedThreats / 12) * 100 + '%' }"
        ></div>
      </div>
    </div>

    <!-- Unit/Classroom Status -->
    <div class="pixel-card border-l-4 border-l-pixel-moss">
      <p class="stat-label-pixel">Unit Assignment</p>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-lg font-black text-pixel-plum uppercase tracking-tighter">{{ unitName }}</p>
          <p class="text-pixel-10 text-pixel-plum/40 font-black uppercase">Rank {{ rank }} In Sector</p>
        </div>
        <div class="w-10 h-10 rounded bg-pixel-moss/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            class="text-pixel-moss"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  credits: {
    type: Number,
    default: 0
  },
  unlockedThreats: {
    type: Number,
    default: 0
  },
  unitName: {
    type: String,
    default: 'Unassigned'
  },
  rank: {
    type: String,
    default: 'N/A'
  }
})
</script>

<style scoped>
@reference "../../../../assets/main.css";

.stat-label-pixel {
  @apply text-pixel-10 uppercase font-black tracking-[0.2em] text-pixel-plum/40 mb-2 ml-1;
}
</style>
